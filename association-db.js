(function () {
  "use strict";

  const DB_NAME = "JapaneseAssociationDB";
  const DB_VERSION = 1;
  const NODE_STORE = "personalNodes";
  const LINK_STORE = "personalLinks";
  let databasePromise = null;

  function createId(prefix) {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
      return `${prefix}-${globalThis.crypto.randomUUID()}`;
    }
    const random = Math.random().toString(36).slice(2);
    return `${prefix}-${Date.now().toString(36)}-${random}`;
  }

  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("数据库操作失败。"));
    });
  }

  function transactionDone(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onabort = () => reject(transaction.error || new Error("数据库操作已取消。"));
      transaction.onerror = () => reject(transaction.error || new Error("数据库操作失败。"));
    });
  }

  function open() {
    if (databasePromise) return databasePromise;
    databasePromise = new Promise((resolve, reject) => {
      if (!("indexedDB" in globalThis)) {
        reject(new Error("当前浏览器不支持 IndexedDB，个人记录暂时无法保存。"));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(NODE_STORE)) {
          const nodes = db.createObjectStore(NODE_STORE, { keyPath: "id" });
          nodes.createIndex("updatedAt", "updatedAt", { unique: false });
          nodes.createIndex("createdAt", "createdAt", { unique: false });
        }
        if (!db.objectStoreNames.contains(LINK_STORE)) {
          const links = db.createObjectStore(LINK_STORE, { keyPath: "id" });
          links.createIndex("fromId", "fromId", { unique: false });
          links.createIndex("toId", "toId", { unique: false });
          links.createIndex("createdAt", "createdAt", { unique: false });
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close();
        resolve(db);
      };
      request.onerror = () => {
        databasePromise = null;
        reject(request.error || new Error("无法打开个人记录数据库。"));
      };
      request.onblocked = () => {
        databasePromise = null;
        reject(new Error("数据库正在被其他页面占用，请关闭其他页面后重试。"));
      };
    });
    return databasePromise;
  }

  function normalizeTags(tags) {
    const source = Array.isArray(tags) ? tags : String(tags || "").split(/[，,]/);
    return [...new Set(source.map((tag) => String(tag).trim()).filter(Boolean))].slice(0, 30);
  }

  function cleanNode(input, existing = null) {
    const now = new Date().toISOString();
    const text = String(input.text || "").trim();
    if (!text) throw new Error("日语内容不能为空。" );
    const allowedTypes = new Set(["word", "sentence", "event", "thought"]);
    const id = existing?.id || String(input.id || createId("node"));
    if (id.startsWith("system:") || id.startsWith("demo:")) {
      throw new Error("个人记录不能使用系统或演示数据的 ID。" );
    }
    return {
      id,
      type: allowedTypes.has(input.type) ? input.type : "sentence",
      text,
      reading: String(input.reading || "").trim(),
      meaning: String(input.meaning || "").trim(),
      tags: normalizeTags(input.tags),
      createdAt: existing?.createdAt || validDate(input.createdAt) || now,
      updatedAt: validDate(input.updatedAt) || now
    };
  }

  function cleanLink(input, existing = null) {
    const fromId = String(input.fromId || "").trim();
    const toId = String(input.toId || "").trim();
    if (!fromId || !toId) throw new Error("关联对象不完整。" );
    if (fromId === toId) throw new Error("不能把内容关联到它自己。" );
    return {
      id: existing?.id || String(input.id || createId("link")),
      fromId,
      toId,
      relation: String(input.relation || "相关内容").trim() || "相关内容",
      note: String(input.note || "").trim(),
      createdAt: existing?.createdAt || validDate(input.createdAt) || new Date().toISOString()
    };
  }

  function validDate(value) {
    if (!value || Number.isNaN(Date.parse(value))) return "";
    return new Date(value).toISOString();
  }

  function pairKey(link) {
    return [link.fromId, link.toId].sort().join("\u0000");
  }

  async function getAllNodes() {
    const db = await open();
    const tx = db.transaction(NODE_STORE, "readonly");
    return requestToPromise(tx.objectStore(NODE_STORE).getAll());
  }

  async function getAllLinks() {
    const db = await open();
    const tx = db.transaction(LINK_STORE, "readonly");
    return requestToPromise(tx.objectStore(LINK_STORE).getAll());
  }

  async function getAllData() {
    const [nodes, links] = await Promise.all([getAllNodes(), getAllLinks()]);
    return { nodes, links };
  }

  async function addNode(input) {
    const node = cleanNode(input);
    const db = await open();
    const tx = db.transaction(NODE_STORE, "readwrite");
    tx.objectStore(NODE_STORE).add(node);
    await transactionDone(tx);
    return node;
  }

  async function updateNode(id, patch) {
    const db = await open();
    const tx = db.transaction(NODE_STORE, "readwrite");
    const store = tx.objectStore(NODE_STORE);
    const current = await requestToPromise(store.get(id));
    if (!current) {
      tx.abort();
      throw new Error("没有找到要修改的个人记录。" );
    }
    const node = cleanNode({ ...current, ...patch, id, updatedAt: new Date().toISOString() }, current);
    store.put(node);
    await transactionDone(tx);
    return node;
  }

  async function deleteNode(id) {
    const db = await open();
    const tx = db.transaction([NODE_STORE, LINK_STORE], "readwrite");
    tx.objectStore(NODE_STORE).delete(id);
    const linkStore = tx.objectStore(LINK_STORE);
    const links = await requestToPromise(linkStore.getAll());
    links.forEach((link) => {
      if (link.fromId === id || link.toId === id) linkStore.delete(link.id);
    });
    await transactionDone(tx);
  }

  async function addLink(input) {
    const link = cleanLink(input);
    const db = await open();
    const tx = db.transaction(LINK_STORE, "readwrite");
    const store = tx.objectStore(LINK_STORE);
    const links = await requestToPromise(store.getAll());
    const duplicate = links.find((candidate) => pairKey(candidate) === pairKey(link));
    if (duplicate) {
      await transactionDone(tx);
      return { link: duplicate, duplicate: true };
    }
    store.add(link);
    await transactionDone(tx);
    return { link, duplicate: false };
  }

  async function deleteLink(id) {
    const db = await open();
    const tx = db.transaction(LINK_STORE, "readwrite");
    tx.objectStore(LINK_STORE).delete(id);
    await transactionDone(tx);
  }

  function validateImport(data) {
    if (!data || typeof data !== "object") throw new Error("导入文件不是有效的 JSON 数据。" );
    if (data.version !== 1) throw new Error("只支持版本为 1 的备份文件。" );
    if (!Array.isArray(data.nodes)) throw new Error("导入文件缺少 nodes 数组。" );
    if (!Array.isArray(data.links)) throw new Error("导入文件缺少 links 数组。" );

    const nodeIds = new Set();
    const nodes = data.nodes.map((node) => {
      if (!node || typeof node !== "object" || !node.id || !node.text) {
        throw new Error("导入文件中存在缺少 id 或 text 的个人记录。" );
      }
      const cleaned = cleanNode(node);
      if (nodeIds.has(cleaned.id)) throw new Error(`个人记录 ID 重复：${cleaned.id}`);
      nodeIds.add(cleaned.id);
      return cleaned;
    });

    const linkIds = new Set();
    const pairIds = new Set();
    const links = data.links.map((link) => {
      if (!link || typeof link !== "object" || !link.id || !link.fromId || !link.toId) {
        throw new Error("导入文件中存在字段不完整的关联。" );
      }
      const cleaned = cleanLink(link);
      if (cleaned.fromId.startsWith("system:") && cleaned.toId.startsWith("system:")) {
        throw new Error("个人关联不能只连接两个系统内容。" );
      }
      if (linkIds.has(cleaned.id)) throw new Error(`关联 ID 重复：${cleaned.id}`);
      linkIds.add(cleaned.id);
      const key = pairKey(cleaned);
      if (pairIds.has(key)) throw new Error("导入文件中存在重复关联。" );
      pairIds.add(key);
      return cleaned;
    });
    return { nodes, links };
  }

  async function importData(data, mode = "merge") {
    const incoming = validateImport(data);
    if (!new Set(["merge", "replace"]).has(mode)) throw new Error("不支持的导入方式。" );
    const incomingNodeIds = new Set(incoming.nodes.map((node) => node.id));
    const endpointExists = (id, knownIds) => id.startsWith("system:") || knownIds.has(id);
    let currentNodes = [];
    let currentLinks = [];

    if (mode === "replace") {
      const hasOrphan = incoming.links.some((link) =>
        !endpointExists(link.fromId, incomingNodeIds) || !endpointExists(link.toId, incomingNodeIds)
      );
      if (hasOrphan) throw new Error("导入文件中存在找不到对应个人记录的关联。" );
    } else {
      ({ nodes: currentNodes, links: currentLinks } = await getAllData());
      const mergedNodeIds = new Set([...currentNodes.map((node) => node.id), ...incomingNodeIds]);
      const hasOrphan = incoming.links.some((link) =>
        !endpointExists(link.fromId, mergedNodeIds) || !endpointExists(link.toId, mergedNodeIds)
      );
      if (hasOrphan) throw new Error("导入文件中存在找不到对应个人记录的关联。" );
    }

    const db = await open();
    const tx = db.transaction([NODE_STORE, LINK_STORE], "readwrite");
    const nodeStore = tx.objectStore(NODE_STORE);
    const linkStore = tx.objectStore(LINK_STORE);

    if (mode === "replace") {
      nodeStore.clear();
      linkStore.clear();
      incoming.nodes.forEach((node) => nodeStore.put(node));
      incoming.links.forEach((link) => linkStore.put(link));
    } else {
      const nodeMap = new Map(currentNodes.map((node) => [node.id, node]));
      incoming.nodes.forEach((node) => {
        const current = nodeMap.get(node.id);
        if (!current || Date.parse(node.updatedAt) > Date.parse(current.updatedAt)) {
          nodeStore.put(node);
        }
      });

      const knownPairs = new Set(currentLinks.map(pairKey));
      incoming.links.forEach((link) => {
        const key = pairKey(link);
        if (!knownPairs.has(key)) {
          linkStore.put(link);
          knownPairs.add(key);
        }
      });
    }

    await transactionDone(tx);
    return incoming;
  }

  async function exportData() {
    const { nodes, links } = await getAllData();
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      nodes,
      links
    };
  }

  window.AssociationDB = {
    DB_NAME,
    DB_VERSION,
    NODE_STORE,
    LINK_STORE,
    open,
    createId,
    getAllNodes,
    getAllLinks,
    getAllData,
    addNode,
    updateNode,
    deleteNode,
    addLink,
    deleteLink,
    validateImport,
    importData,
    exportData
  };
})();
