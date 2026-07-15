(function () {
  "use strict";

  const TYPE_LABELS = {
    word: "单词",
    sentence: "句子",
    event: "事件",
    thought: "想法"
  };
  const RELATIONS = ["相关内容", "让我想到", "使用场景", "相似表达", "相反内容", "发生地点", "自定义"];
  const DEMO_NODES = [
    { id: "demo:rain", type: "word", text: "雨", reading: "あめ", meaning: "雨", tags: ["演示数据"] },
    { id: "demo:umbrella", type: "word", text: "傘", reading: "かさ", meaning: "伞", tags: ["演示数据"] },
    { id: "demo:forgot-umbrella", type: "sentence", text: "傘を忘れました。", reading: "かさをわすれました", meaning: "忘记带伞了。", tags: ["演示数据"] }
  ];
  const DEMO_LINKS = [
    { id: "demo-link:rain-umbrella", fromId: "demo:rain", toId: "demo:umbrella", relation: "让我想到", note: "" },
    { id: "demo-link:umbrella-forgot", fromId: "demo:umbrella", toId: "demo:forgot-umbrella", relation: "相关表达", note: "" }
  ];

  const state = {
    context: null,
    nodes: [],
    links: [],
    systemNodes: [],
    nodeMap: new Map(),
    query: "",
    ready: false,
    loading: false,
    dbError: "",
    modalLastFocus: null,
    importedData: null
  };

  const theme = {
    id: "quick-association",
    title: "随手联想",
    japaneseTitle: "随手联想",
    reading: "ずいそうれんそう",
    meaning: "个人记录测试版",
    badge: "测试版",
    icon: "想",
    description: "记录、关联与个人备份",
    layout: "quick-association"
  };

  function utils() {
    return state.context?.utils || {
      escapeHTML(value) {
        return String(value ?? "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");
      },
      renderRubyText(text) {
        return this.escapeHTML(text);
      }
    };
  }

  function esc(value) {
    return utils().escapeHTML(value);
  }

  function ruby(text, reading = "", segments = []) {
    return utils().renderRubyText(text, reading, segments);
  }

  function normalize(value) {
    return String(value || "").normalize("NFKC").toLocaleLowerCase().trim();
  }

  function stableHash(value) {
    let hash = 2166136261;
    for (const char of String(value)) {
      hash ^= char.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function stablePart(value) {
    const plain = String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase()
      .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 24);
    return `${plain || "item"}-${stableHash(value)}`;
  }

  function addSystemNode(map, module, key, item, source, type = "system") {
    const text = item?.word || item?.japanese || item?.text || item?.title || "";
    if (!text) return;
    const reading = item?.reading || item?.kana || "";
    const meaning = item?.meaning || item?.chinese || item?.translation || "";
    const id = `system:${module}:${key || stablePart(text)}`;
    if (!map.has(id)) {
      map.set(id, {
        id,
        type,
        text,
        reading,
        meaning,
        tags: [source],
        source,
        system: true,
        segments: Array.isArray(item?.segments) ? item.segments : []
      });
    }
  }

  function buildSystemNodes() {
    const map = new Map();

    if (typeof LEARNING_DATA !== "undefined") {
      const dateTheme = LEARNING_DATA.find((item) => item.id === "date");
      (dateTheme?.categories || []).forEach((category) => {
        addSystemNode(map, "date", category.id, {
          japanese: category.japanese,
          kana: category.kana,
          chinese: category.chinese
        }, "日期");
        (category.sections || []).forEach((section) => {
          (section.items || []).forEach((item) => {
            addSystemNode(map, "date", `${category.id}:${stablePart(item.japanese)}`, item, "日期");
          });
        });
      });
    }

    if (typeof bodyAssociationData !== "undefined") {
      (bodyAssociationData.sections || []).forEach((section) => {
        (section.categories || []).forEach((category) => {
          addSystemNode(map, "body", `${section.id}:${category.id}`, {
            word: category.title,
            reading: category.reading,
            meaning: category.meaning
          }, "人体联想新版");
          const words = [
            ...(category.items || []),
            ...(category.vocabularyGroups || []).flatMap((group) => group.items || [])
          ];
          words.forEach((item) => {
            addSystemNode(map, "body", `${category.id}:${stablePart(item.word || item.text)}`, item, "人体联想新版");
          });
          const expressions = category.expressions
            || (typeof bodyAssociationExpressionData !== "undefined" ? bodyAssociationExpressionData[category.id] : [])
            || [];
          expressions.forEach((item) => {
            addSystemNode(map, "body", `${category.id}:expression:${stablePart(item.text)}`, item, "人体联想新版", "sentence");
          });
          (category.examples || []).forEach((item) => {
            addSystemNode(map, "body", `${category.id}:example:${stablePart(item.text || item.example)}`, {
              text: item.text || item.example,
              reading: item.reading || item.exampleReading,
              meaning: item.meaning || item.translation,
              segments: item.segments
            }, "人体联想新版", "sentence");
          });
        });
      });
    }

    if (typeof counterAssociationData !== "undefined") {
      Object.values(counterAssociationData.counters || {}).forEach((counter) => {
        addSystemNode(map, "counter", counter.id, {
          word: counter.counter,
          reading: counter.reading,
          meaning: counter.meaning
        }, "数量・量词");
        (counter.objects || []).forEach((item) => {
          addSystemNode(map, "counter", `${counter.id}:object:${stablePart(item.word || item.text)}`, item, "数量・量词");
        });
      });
    }

    if (typeof fruitAssociationData !== "undefined") {
      Object.values(fruitAssociationData.fruits || {}).forEach((fruit) => {
        addSystemNode(map, "fruit", fruit.id, fruit, "水果联想");
        (fruit.actions || []).forEach((item) => {
          addSystemNode(map, "fruit", `${fruit.id}:action:${stablePart(item.text)}`, item, "水果联想", "sentence");
        });
      });
    }

    return [...map.values()];
  }

  function ensureSupportUI() {
    if (!document.getElementById("associationBackdrop")) {
      const backdrop = document.createElement("div");
      backdrop.id = "associationBackdrop";
      backdrop.className = "association-backdrop";
      backdrop.hidden = true;
      backdrop.innerHTML = `
        <section class="association-modal" role="dialog" aria-modal="true" aria-labelledby="associationModalTitle" tabindex="-1">
          <header class="association-modal-header">
            <div>
              <p id="associationModalKicker">随手联想</p>
              <h2 id="associationModalTitle">快速记录</h2>
            </div>
            <button type="button" class="association-modal-close" data-association-close aria-label="关闭浮窗">×</button>
          </header>
          <div id="associationModalContent" class="association-modal-content"></div>
        </section>
      `;
      document.body.appendChild(backdrop);
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop || event.target.closest("[data-association-close]")) closeModal();
      });
    }

    if (!document.getElementById("associationFab")) {
      const fab = document.createElement("button");
      fab.id = "associationFab";
      fab.className = "association-fab";
      fab.type = "button";
      fab.hidden = true;
      fab.setAttribute("aria-label", "新建随手联想记录");
      fab.textContent = "+";
      fab.addEventListener("click", () => openEditor());
      document.body.appendChild(fab);
    }

    if (!document.getElementById("associationImportInput")) {
      const input = document.createElement("input");
      input.id = "associationImportInput";
      input.type = "file";
      input.accept = "application/json,.json";
      input.hidden = true;
      input.addEventListener("change", handleImportFile);
      document.body.appendChild(input);
    }

    if (!document.getElementById("associationToast")) {
      const toast = document.createElement("div");
      toast.id = "associationToast";
      toast.className = "association-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      toast.hidden = true;
      document.body.appendChild(toast);
    }
  }

  async function loadData() {
    if (state.loading) return;
    state.loading = true;
    state.dbError = "";
    try {
      const data = await window.AssociationDB.getAllData();
      state.nodes = data.nodes.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
      state.links = data.links.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      state.ready = true;
    } catch (error) {
      state.dbError = error?.message || "个人记录数据库暂时无法使用。";
      state.ready = true;
    } finally {
      state.loading = false;
      rebuildNodeMap();
      if (state.context?.container?.isConnected) renderHome();
    }
  }

  function rebuildNodeMap() {
    state.nodeMap = new Map([
      ...state.systemNodes.map((node) => [node.id, node]),
      ...state.nodes.map((node) => [node.id, node]),
      ...DEMO_NODES.map((node) => [node.id, { ...node, demo: true }])
    ]);
  }

  function render(context) {
    state.context = context;
    state.query = normalize(context.query);
    ensureSupportUI();
    document.getElementById("associationFab").hidden = false;
    context.container.onclick = handleHomeClick;
    context.container.className = "quick-association-home";
    if (!state.systemNodes.length) {
      state.systemNodes = buildSystemNodes();
      rebuildNodeMap();
    }
    renderHome();
    if (!state.ready && !state.loading) loadData();
  }

  function leave() {
    const fab = document.getElementById("associationFab");
    if (fab) fab.hidden = true;
    closeModal(false);
    state.context = null;
  }

  function renderHome() {
    if (!state.context) return;
    const { container, resultCount, emptyState } = state.context;
    const query = state.query;
    let html = renderToolbar();

    if (state.dbError) {
      html += `<div class="association-alert" role="alert"><strong>个人记录暂时无法保存</strong><span>${esc(state.dbError)}</span></div>`;
    }

    if (!state.ready) {
      html += `<div class="association-loading">正在读取个人记录…</div>`;
      container.innerHTML = html;
      resultCount.textContent = "正在准备随手联想";
      emptyState.hidden = true;
      return;
    }

    if (query) {
      const personal = searchPersonal(query);
      const systems = searchSystems(query);
      html += renderSearchSection("我的记录", personal, false);
      html += renderSearchSection("系统内容", systems, true);
      container.innerHTML = html;
      resultCount.textContent = `找到 ${personal.length} 条个人记录 · ${systems.length} 条系统内容`;
      emptyState.hidden = personal.length + systems.length !== 0;
      return;
    }

    if (!state.nodes.length) html += renderDemoSection();
    html += renderPersonalSection("最近记录", state.nodes.slice(0, 5), "还没有个人记录，点击右下角的＋开始记录。", "recent");
    html += renderPersonalSection("我的全部内容", state.nodes, "保存演示数据，或建立第一条自己的记录。", "all");
    html += renderRecentLinks();
    container.innerHTML = html;
    resultCount.textContent = state.nodes.length
      ? `${state.nodes.length} 条个人记录 · ${state.links.length} 个关联`
      : "测试版 · 记录保存在当前浏览器";
    emptyState.hidden = true;
  }

  function renderToolbar() {
    return `
      <section class="association-intro">
        <p>记录突然想到的单词、句子、事件和想法</p>
        <p class="association-storage-note">个人记录保存在当前浏览器中。更换设备或浏览器时，请使用导出和导入功能迁移数据。</p>
        <div class="association-toolbar" aria-label="随手联想操作">
          <button type="button" class="association-primary-button" data-association-action="new">＋ 新建记录</button>
          <button type="button" data-association-action="import">导入</button>
          <button type="button" data-association-action="export"${state.dbError ? " disabled" : ""}>导出</button>
        </div>
      </section>
    `;
  }

  function renderDemoSection() {
    return `
      <section class="association-section association-demo-section">
        <div class="association-section-heading">
          <div><span class="association-demo-badge">演示数据</span><h2>先看看记录如何关联</h2></div>
          <button type="button" data-association-action="save-demos"${state.dbError ? " disabled" : ""}>保存这些演示数据</button>
        </div>
        <div class="association-card-list">
          ${DEMO_NODES.map((node) => renderPersonalCard({ ...node, demo: true })).join("")}
        </div>
        <div class="association-demo-links">
          <span>${ruby("雨", "あめ")} <b>→</b> ${ruby("傘", "かさ")}<small>让我想到</small></span>
          <span>${ruby("傘", "かさ")} <b>→</b> ${ruby("傘を忘れました。", "かさをわすれました")}<small>相关表达</small></span>
        </div>
      </section>
    `;
  }

  function renderPersonalSection(title, nodes, emptyText, modifier) {
    return `
      <section class="association-section association-section--${modifier}">
        <div class="association-section-heading"><h2>${esc(title)}</h2><span>${nodes.length} 条</span></div>
        ${nodes.length
          ? `<div class="association-card-list">${nodes.map((node) => renderPersonalCard(node)).join("")}</div>`
          : `<p class="association-empty-copy">${esc(emptyText)}</p>`}
      </section>
    `;
  }

  function renderPersonalCard(node) {
    const links = node.demo
      ? DEMO_LINKS.filter((link) => link.fromId === node.id || link.toId === node.id)
      : state.links.filter((link) => link.fromId === node.id || link.toId === node.id);
    const created = node.createdAt ? formatDate(node.createdAt) : "尚未保存";
    return `
      <button type="button" class="association-record-card" data-association-node="${esc(node.id)}"${node.demo ? " data-demo-node=\"true\"" : ""}>
        <span class="association-record-topline">
          <span class="association-type-tag">${esc(TYPE_LABELS[node.type] || "记录")}</span>
          ${node.demo ? `<span class="association-demo-mini">演示数据</span>` : ""}
        </span>
        <strong class="association-record-japanese" lang="ja">${ruby(node.text, node.reading, node.segments)}</strong>
        ${node.meaning ? `<span class="association-record-meaning">${esc(node.meaning)}</span>` : ""}
        ${renderTags(node.tags)}
        <span class="association-record-meta"><span>关联 ${links.length} 项</span><time>${esc(created)}</time></span>
      </button>
    `;
  }

  function renderTags(tags = []) {
    if (!tags.length) return "";
    return `<span class="association-tag-list">${tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</span>`;
  }

  function renderRecentLinks() {
    return `
      <section class="association-section">
        <div class="association-section-heading"><h2>最近建立的关联</h2><span>${state.links.length} 个</span></div>
        ${state.links.length
          ? `<div class="association-recent-links">${state.links.slice(0, 6).map(renderRecentLink).join("")}</div>`
          : `<p class="association-empty-copy">建立关联后，会在这里显示最近的连接。</p>`}
      </section>
    `;
  }

  function renderRecentLink(link) {
    const from = state.nodeMap.get(link.fromId);
    const to = state.nodeMap.get(link.toId);
    if (!from || !to) return "";
    return `
      <button type="button" class="association-link-summary" data-association-node="${esc(link.fromId)}">
        <span lang="ja">${ruby(from.text, from.reading, from.segments)}</span>
        <b>→</b>
        <span lang="ja">${ruby(to.text, to.reading, to.segments)}</span>
        <small>${esc(link.relation)}${link.note ? ` · ${esc(link.note)}` : ""}</small>
      </button>
    `;
  }

  function searchPersonal(query) {
    return state.nodes.filter((node) => {
      const connected = state.links.filter((link) => link.fromId === node.id || link.toId === node.id);
      const linkText = connected.map((link) => {
        const otherId = link.fromId === node.id ? link.toId : link.fromId;
        const other = state.nodeMap.get(otherId);
        return [link.relation, link.note, other?.text, other?.reading, other?.meaning].filter(Boolean).join(" ");
      }).join(" ");
      return normalize([
        node.text,
        node.reading,
        node.meaning,
        TYPE_LABELS[node.type],
        ...(node.tags || []),
        linkText
      ].join(" ")).includes(query);
    });
  }

  function searchSystems(query) {
    return state.systemNodes.filter((node) => normalize([
      node.text,
      node.reading,
      node.meaning,
      node.source,
      ...(node.tags || [])
    ].join(" ")).includes(query)).slice(0, 40);
  }

  function renderSearchSection(title, nodes, system) {
    return `
      <section class="association-section association-search-section">
        <div class="association-section-heading"><h2>${esc(title)}</h2><span>${nodes.length} 条</span></div>
        ${nodes.length
          ? `<div class="${system ? "association-system-grid" : "association-card-list"}">${nodes.map((node) => system ? renderSystemCard(node) : renderPersonalCard(node)).join("")}</div>`
          : `<p class="association-empty-copy">没有匹配内容</p>`}
      </section>
    `;
  }

  function renderSystemCard(node, options = {}) {
    return `
      <button type="button" class="association-system-card${options.selected ? " is-selected" : ""}" data-association-node="${esc(node.id)}"${options.picker ? " data-picker-node=\"true\"" : ""}>
        <span class="association-system-source">${esc(node.source || "我的记录")}</span>
        <strong lang="ja">${ruby(node.text, node.reading, node.segments)}</strong>
        ${node.meaning ? `<span>${esc(node.meaning)}</span>` : ""}
        ${options.picker ? `<i aria-hidden="true">${options.selected ? "✓" : "+"}</i>` : ""}
      </button>
    `;
  }

  function handleHomeClick(event) {
    const action = event.target.closest("[data-association-action]")?.dataset.associationAction;
    if (action === "new") return openEditor();
    if (action === "import") return document.getElementById("associationImportInput").click();
    if (action === "export") return exportPersonalData();
    if (action === "save-demos") return saveDemos();
    const nodeButton = event.target.closest("[data-association-node]");
    if (nodeButton) openNodeDetail(nodeButton.dataset.associationNode, nodeButton.dataset.demoNode === "true");
  }

  function showModal(title, kicker, html, onReady) {
    ensureSupportUI();
    const backdrop = document.getElementById("associationBackdrop");
    state.modalLastFocus = document.activeElement;
    document.getElementById("associationModalTitle").textContent = title;
    document.getElementById("associationModalKicker").textContent = kicker;
    const content = document.getElementById("associationModalContent");
    content.innerHTML = html;
    backdrop.hidden = false;
    document.body.classList.add("modal-open");
    backdrop.querySelector(".association-modal").focus({ preventScroll: true });
    if (onReady) onReady(content);
  }

  function closeModal(restoreFocus = true) {
    const backdrop = document.getElementById("associationBackdrop");
    if (!backdrop || backdrop.hidden) return;
    backdrop.hidden = true;
    document.body.classList.remove("modal-open");
    document.getElementById("associationModalContent").replaceChildren();
    if (restoreFocus && state.modalLastFocus?.focus) state.modalLastFocus.focus();
    state.modalLastFocus = null;
  }

  function openEditor(node = null, options = {}) {
    if (state.dbError) {
      toast("个人记录数据库暂时不可用，无法保存。", true);
      return;
    }
    const editing = Boolean(node);
    const selected = new Set();
    const formTitle = editing ? "编辑记录" : options.fromId ? "新建内容并关联" : "快速记录";
    showModal(formTitle, "随手联想", `
      <form id="associationRecordForm" class="association-form">
        <fieldset>
          <legend>记录类型</legend>
          <div class="association-type-options">
            ${Object.entries(TYPE_LABELS).map(([value, label]) => `
              <label><input type="radio" name="type" value="${value}"${(node?.type || "sentence") === value ? " checked" : ""}><span>${label}</span></label>
            `).join("")}
          </div>
        </fieldset>
        <label><span>日语内容 <b>必填</b></span><textarea name="text" rows="3" required placeholder="傘を忘れました。">${esc(node?.text || "")}</textarea></label>
        <label><span>假名 <small>可以不填</small></span><input name="reading" value="${esc(node?.reading || "")}" placeholder="かさをわすれました"></label>
        <label><span>中文或备注 <small>可以不填</small></span><textarea name="meaning" rows="2" placeholder="忘记带伞了。">${esc(node?.meaning || "")}</textarea></label>
        <label><span>标签 <small>使用逗号分隔</small></span><input name="tags" value="${esc((node?.tags || []).join("、"))}" placeholder="雨天、生活、忘记东西"></label>
        ${!editing && !options.fromId ? `
          <div class="association-form-block">
            <span class="association-form-label">关联到 <small>可选择多个</small></span>
            <input id="associationLinkSearch" type="search" placeholder="搜索现有内容或我的记录" autocomplete="off">
            <div id="associationSelectedNodes" class="association-selected-nodes"></div>
            <div id="associationPickerResults" class="association-picker-results"></div>
          </div>
          <label><span>关联说明 <small>可以不填</small></span><input name="linkNote" placeholder="下雨时想到的句子"></label>
        ` : ""}
        <div class="association-form-actions">
          <button type="button" data-association-close>取消</button>
          <button type="submit" class="association-primary-button">保存</button>
        </div>
      </form>
    `, (content) => {
      const form = content.querySelector("#associationRecordForm");
      const search = content.querySelector("#associationLinkSearch");
      if (search) {
        const renderPicker = () => renderPickerResults(search.value, selected, "associationPickerResults", "associationSelectedNodes");
        search.addEventListener("input", renderPicker);
        content.querySelector("#associationPickerResults").addEventListener("click", (event) => {
          const button = event.target.closest("[data-picker-node]");
          if (!button) return;
          const id = button.dataset.associationNode;
          selected.has(id) ? selected.delete(id) : selected.add(id);
          renderPicker();
        });
        content.querySelector("#associationSelectedNodes").addEventListener("click", (event) => {
          const button = event.target.closest("[data-remove-selected]");
          if (!button) return;
          selected.delete(button.dataset.removeSelected);
          renderPicker();
        });
        renderPicker();
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        const values = new FormData(form);
        const payload = {
          type: values.get("type"),
          text: values.get("text"),
          reading: values.get("reading"),
          meaning: values.get("meaning"),
          tags: String(values.get("tags") || "").split(/[，,、]/)
        };
        try {
          let saved;
          if (editing) {
            saved = await AssociationDB.updateNode(node.id, payload);
          } else {
            saved = await AssociationDB.addNode(payload);
            if (options.fromId) {
              await AssociationDB.addLink({ fromId: options.fromId, toId: saved.id, relation: "相关内容", note: "" });
            } else {
              for (const targetId of selected) {
                await AssociationDB.addLink({
                  fromId: saved.id,
                  toId: targetId,
                  relation: "相关内容",
                  note: values.get("linkNote")
                });
              }
            }
          }
          await refreshData();
          closeModal(false);
          toast(editing ? "记录已更新。" : "记录已保存。" );
          if (options.fromId) openNodeDetail(options.fromId);
        } catch (error) {
          toast(error?.message || "保存失败，请稍后重试。", true);
          submit.disabled = false;
        }
      });
    });
  }

  function renderPickerResults(rawQuery, selected, resultId, selectedId, excludeId = "") {
    const query = normalize(rawQuery);
    const result = document.getElementById(resultId);
    const selectedBox = document.getElementById(selectedId);
    if (!result || !selectedBox) return;
    selectedBox.innerHTML = [...selected].map((id) => {
      const node = state.nodeMap.get(id);
      return node ? `<button type="button" data-remove-selected="${esc(id)}">${ruby(node.text, node.reading, node.segments)} <span>×</span></button>` : "";
    }).join("");

    if (!query) {
      result.innerHTML = `<p>输入日语、假名或中文开始搜索</p>`;
      return;
    }
    const personal = searchPersonal(query).filter((node) => node.id !== excludeId).slice(0, 8);
    const systems = searchSystems(query).filter((node) => node.id !== excludeId).slice(0, 12);
    result.innerHTML = `
      ${personal.length ? `<h4>我的记录</h4><div class="association-picker-grid">${personal.map((node) => renderSystemCard({ ...node, source: "我的记录" }, { picker: true, selected: selected.has(node.id) })).join("")}</div>` : ""}
      ${systems.length ? `<h4>系统内容</h4><div class="association-picker-grid">${systems.map((node) => renderSystemCard(node, { picker: true, selected: selected.has(node.id) })).join("")}</div>` : ""}
      ${!personal.length && !systems.length ? `<p>没有找到匹配内容</p>` : ""}
    `;
  }

  function openNodeDetail(id, demo = false) {
    const node = state.nodeMap.get(id);
    if (!node) return toast("没有找到这条内容。", true);
    const system = Boolean(node.system);
    const links = demo ? DEMO_LINKS : state.links;
    const outgoing = links.filter((link) => link.fromId === id);
    const incoming = links.filter((link) => link.toId === id);
    const timestamps = !system && !demo
      ? `<div class="association-timestamps"><span>创建：${esc(formatDateTime(node.createdAt))}</span><span>修改：${esc(formatDateTime(node.updatedAt))}</span></div>`
      : "";
    showModal(system ? "系统内容" : demo ? "演示数据" : "个人内容详情", node.source || "随手联想", `
      <article class="association-detail">
        <section class="association-detail-main">
          <span class="association-type-tag">${esc(system ? node.source : TYPE_LABELS[node.type] || "记录")}</span>
          <h3 lang="ja">${ruby(node.text, node.reading, node.segments)}</h3>
          ${node.meaning ? `<p>${esc(node.meaning)}</p>` : ""}
          ${renderTags(node.tags)}
        </section>
        ${renderLinkSection("我的关联", outgoing, id, false, demo)}
        ${renderLinkSection("被哪些内容关联", incoming, id, true, demo)}
        ${timestamps}
        <div class="association-detail-actions">
          ${!system && !demo ? `
            <button type="button" data-detail-action="add-link">添加关联</button>
            <button type="button" data-detail-action="edit">编辑</button>
            <button type="button" class="association-danger-button" data-detail-action="delete">删除</button>
          ` : demo ? `<button type="button" class="association-primary-button" data-detail-action="save-demos">保存这些演示数据</button>` : `<span class="association-readonly-note">系统内容为只读，不能编辑或删除</span>`}
        </div>
      </article>
    `, (content) => {
      content.addEventListener("click", async (event) => {
        const linked = event.target.closest("[data-linked-node]");
        if (linked) return openNodeDetail(linked.dataset.linkedNode, linked.dataset.demoNode === "true");
        const unlink = event.target.closest("[data-unlink]");
        if (unlink) {
          await AssociationDB.deleteLink(unlink.dataset.unlink);
          await refreshData();
          toast("关联已删除。" );
          return openNodeDetail(id);
        }
        const action = event.target.closest("[data-detail-action]")?.dataset.detailAction;
        if (action === "add-link") return openAddLink(id);
        if (action === "edit") return openEditor(node);
        if (action === "save-demos") {
          closeModal(false);
          return saveDemos();
        }
        if (action === "delete") {
          const confirmed = window.confirm("确定删除这条记录吗？\n\n与它相关的关联也会删除，但其他内容不会删除。");
          if (!confirmed) return;
          try {
            await AssociationDB.deleteNode(id);
            await refreshData();
            closeModal(false);
            toast("记录及相关关联已删除。" );
          } catch (error) {
            toast(error?.message || "删除失败。", true);
          }
        }
      });
    });
  }

  function renderLinkSection(title, links, currentId, reverse, demo) {
    return `
      <section class="association-detail-section">
        <div class="association-section-heading"><h3>${esc(title)}</h3><span>${links.length} 项</span></div>
        ${links.length ? `<div class="association-detail-links">${links.map((link) => {
          const otherId = reverse ? link.fromId : link.toId;
          const other = state.nodeMap.get(otherId);
          if (!other) return "";
          return `
            <div class="association-detail-link">
              <button type="button" data-linked-node="${esc(otherId)}"${demo ? " data-demo-node=\"true\"" : ""}>
                <strong lang="ja">${ruby(other.text, other.reading, other.segments)}</strong>
                ${other.meaning ? `<span>${esc(other.meaning)}</span>` : ""}
                <small>关系：${esc(link.relation)}${link.note ? `<br>${esc(link.note)}` : ""}</small>
              </button>
              ${!demo && !state.nodeMap.get(currentId)?.system ? `<button type="button" class="association-unlink" data-unlink="${esc(link.id)}" aria-label="删除这个关联">×</button>` : ""}
            </div>
          `;
        }).join("")}</div>` : `<p class="association-empty-copy">还没有内容</p>`}
      </section>
    `;
  }

  function openAddLink(fromId) {
    const selected = new Set();
    showModal("添加关联", "随手联想", `
      <form id="associationLinkForm" class="association-form">
        <div class="association-form-block">
          <span class="association-form-label">关联对象 <b>必填</b></span>
          <input id="associationTargetSearch" type="search" placeholder="搜索现有内容或我的记录" autocomplete="off">
          <div id="associationTargetSelected" class="association-selected-nodes"></div>
          <div id="associationTargetResults" class="association-picker-results"></div>
        </div>
        <label><span>关联关系</span><select name="relation">${RELATIONS.map((item) => `<option>${esc(item)}</option>`).join("")}</select></label>
        <label id="associationCustomRelation" hidden><span>自定义关系名称</span><input name="customRelation" placeholder="例如：旅行时会用到"></label>
        <label><span>简短备注 <small>可以不填</small></span><input name="note" placeholder="为什么会联想到它"></label>
        <button type="button" class="association-create-linked" data-create-linked>＋ 直接新建一条内容并建立关联</button>
        <div class="association-form-actions">
          <button type="button" data-back-detail>返回详情</button>
          <button type="submit" class="association-primary-button">保存关联</button>
        </div>
      </form>
    `, (content) => {
      const form = content.querySelector("#associationLinkForm");
      const search = content.querySelector("#associationTargetSearch");
      const renderPicker = () => renderPickerResults(search.value, selected, "associationTargetResults", "associationTargetSelected", fromId);
      search.addEventListener("input", renderPicker);
      content.querySelector("#associationTargetResults").addEventListener("click", (event) => {
        const button = event.target.closest("[data-picker-node]");
        if (!button) return;
        selected.clear();
        selected.add(button.dataset.associationNode);
        renderPicker();
      });
      content.querySelector("#associationTargetSelected").addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-selected]");
        if (button) {
          selected.delete(button.dataset.removeSelected);
          renderPicker();
        }
      });
      content.querySelector('[name="relation"]').addEventListener("change", (event) => {
        content.querySelector("#associationCustomRelation").hidden = event.target.value !== "自定义";
      });
      content.querySelector("[data-create-linked]").addEventListener("click", () => openEditor(null, { fromId }));
      content.querySelector("[data-back-detail]").addEventListener("click", () => openNodeDetail(fromId));
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const targetId = [...selected][0];
        if (!targetId) return toast("请先选择一个关联对象。", true);
        const values = new FormData(form);
        const relation = values.get("relation") === "自定义"
          ? String(values.get("customRelation") || "").trim()
          : values.get("relation");
        if (!relation) return toast("请输入自定义关系名称。", true);
        try {
          const result = await AssociationDB.addLink({ fromId, toId: targetId, relation, note: values.get("note") });
          await refreshData();
          toast(result.duplicate ? "这两个内容已经有关联。" : "关联已建立。", result.duplicate);
          openNodeDetail(fromId);
        } catch (error) {
          toast(error?.message || "关联保存失败。", true);
        }
      });
      renderPicker();
    });
  }

  async function refreshData() {
    const data = await AssociationDB.getAllData();
    state.nodes = data.nodes.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    state.links = data.links.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    rebuildNodeMap();
    renderHome();
  }

  async function saveDemos() {
    if (state.dbError) return toast("个人记录数据库暂时不可用。", true);
    try {
      const ids = new Map();
      for (const demo of DEMO_NODES) {
        const saved = await AssociationDB.addNode({ ...demo, id: undefined, tags: [] });
        ids.set(demo.id, saved.id);
      }
      for (const link of DEMO_LINKS) {
        await AssociationDB.addLink({
          fromId: ids.get(link.fromId),
          toId: ids.get(link.toId),
          relation: link.relation,
          note: link.note
        });
      }
      await refreshData();
      toast("三条演示数据已经保存。" );
    } catch (error) {
      toast(error?.message || "演示数据保存失败。", true);
    }
  }

  async function exportPersonalData() {
    try {
      const data = await AssociationDB.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);
      anchor.href = url;
      anchor.download = `japanese-associations-${date}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("个人数据已导出。" );
    } catch (error) {
      toast(error?.message || "导出失败。", true);
    }
  }

  async function handleImportFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const checked = AssociationDB.validateImport(data);
      state.importedData = data;
      showImportDialog(checked);
    } catch (error) {
      toast(error?.message || "无法读取这个 JSON 文件。", true);
    }
  }

  function showImportDialog(checked) {
    showModal("导入个人数据", "数据备份", `
      <form id="associationImportForm" class="association-form">
        <div class="association-import-summary"><strong>${checked.nodes.length}</strong> 条记录 · <strong>${checked.links.length}</strong> 个关联</div>
        <fieldset>
          <legend>导入方式</legend>
          <label class="association-import-option"><input type="radio" name="mode" value="merge" checked><span><b>合并数据</b><small>保留现有内容，同 ID 使用修改时间较新的记录</small></span></label>
          <label class="association-import-option"><input type="radio" name="mode" value="replace"><span><b>替换个人数据</b><small>清除当前个人记录后再导入</small></span></label>
        </fieldset>
        <div class="association-form-actions">
          <button type="button" data-association-close>取消</button>
          <button type="submit" class="association-primary-button">开始导入</button>
        </div>
      </form>
    `, (content) => {
      content.querySelector("#associationImportForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const mode = new FormData(form).get("mode");
        if (mode === "replace" && !window.confirm("确定替换全部个人数据吗？\n\n当前个人记录和关联会被清除，系统知识不会受到影响。")) return;
        const submit = form.querySelector('[type="submit"]');
        submit.disabled = true;
        try {
          await AssociationDB.importData(state.importedData, mode);
          await refreshData();
          closeModal(false);
          toast(mode === "replace" ? "个人数据已替换。" : "个人数据已合并。" );
        } catch (error) {
          toast(error?.message || "导入失败，原有数据没有被覆盖。", true);
          submit.disabled = false;
        }
      });
    });
  }

  function formatDate(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(new Date(value));
  }

  function formatDateTime(value) {
    if (!value) return "";
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  }

  let toastTimer = null;
  function toast(message, error = false) {
    ensureSupportUI();
    const element = document.getElementById("associationToast");
    clearTimeout(toastTimer);
    element.textContent = message;
    element.classList.toggle("is-error", error);
    element.hidden = false;
    toastTimer = setTimeout(() => { element.hidden = true; }, 2600);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.getElementById("associationBackdrop")?.hidden) closeModal();
  });

  window.AssociationModule = {
    theme,
    render,
    leave,
    closeModal,
    buildSystemNodes
  };
})();
