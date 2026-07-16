(function () {
  "use strict";

  if (typeof QUESTION_EXPRESSIONS_DATA === "undefined") return;

  const data = QUESTION_EXPRESSIONS_DATA;
  const sectionIds = new Set([
    "questions-overview",
    "questions-purposes",
    "questions-words",
    "questions-patterns",
    "questions-comparisons",
    "questions-scenes",
    "questions-mistakes"
  ]);
  const sectionLabels = [
    ["questions-overview", "总览"],
    ["questions-purposes", "提问目的"],
    ["questions-words", "疑问词"],
    ["questions-patterns", "句型"],
    ["questions-comparisons", "语气对比"],
    ["questions-scenes", "场景"],
    ["questions-mistakes", "常见错误"]
  ];
  const state = {
    context: null,
    entryMap: new Map(),
    aliasMap: new Map(),
    searchItems: [],
    observer: null,
    active: false,
    manualEntryUntil: 0,
    restoreTimer: null
  };

  function escapeHTML(value) {
    const helper = state.context?.utils?.escapeHTML;
    if (helper) return helper(value);
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFKC")
      .toLocaleLowerCase()
      .replace(/[\s、。，．・／/！？!?「」『』（）()［］\[\]：:；;～~ー]/g, "");
  }

  function resolveId(id) {
    return state.aliasMap.get(id) || id;
  }

  function buildIndexes() {
    state.entryMap.clear();
    state.aliasMap.clear();
    state.searchItems = [];
    (data.extraAnchors || []).forEach((anchor) => {
      const alias = Array.isArray(anchor) ? anchor[0] : anchor.id;
      const target = Array.isArray(anchor) ? anchor[1] : anchor.targetId;
      if (alias && target && alias !== target) state.aliasMap.set(alias, target);
    });

    const groups = [
      ["提问目的", data.purposes],
      ["疑问词", data.questionWords],
      ["疑问句型", data.questionPatterns],
      ["语气对比", data.comparisons],
      ["场景", data.scenes],
      ["常见错误", data.mistakes]
    ];
    groups.forEach(([category, items]) => {
      (items || []).forEach((item) => {
        state.entryMap.set(item.id, item);
        state.searchItems.push({ category, item });
      });
    });
  }

  function isQuestionHash(hash = window.location.hash) {
    const id = decodeURIComponent(String(hash || "").replace(/^#/, ""));
    return Boolean(id && (sectionIds.has(id) || state.entryMap.has(resolveId(id))));
  }

  function renderTags(values, className = "qe-tag") {
    return (values || []).map((value) => `<span class="${className}">${escapeHTML(value)}</span>`).join("");
  }

  function renderRelated(ids) {
    const links = (ids || []).map((rawId) => {
      const id = resolveId(rawId);
      const target = state.entryMap.get(id);
      if (!target) return "";
      return `<button class="qe-related-link" type="button" data-qe-target="${escapeHTML(id)}">${escapeHTML(target.title)}</button>`;
    }).join("");
    return links ? `<div class="qe-related"><span>相关条目</span><div>${links}</div></div>` : "";
  }

  function renderExamples(examples) {
    const labels = { standard: "标准礼貌", casual: "日常口语", formal: "更正式" };
    return `<div class="qe-examples">${Object.entries(labels).map(([key, label]) => {
      const rows = (examples?.[key] || []).map((example) => `
        <div class="qe-example-row">
          <p lang="ja">${escapeHTML(example.japanese)}</p>
          <span>${escapeHTML(example.chinese)}</span>
        </div>`).join("");
      return rows ? `<section><h4>${label}</h4>${rows}</section>` : "";
    }).join("")}</div>`;
  }

  function renderEntryCard(entry) {
    const register = data.registerLevels?.[entry.registerLevel] || "";
    const registerGuide = {
      1: ["客户、上司、面试与正式书面场合", "郑重、谨慎，心理距离较远"],
      2: ["陌生人、老师及一般礼貌会话", "礼貌、中性，不预设亲密关系"],
      3: ["同事、熟人及轻松的服务会话", "柔和、自然，保留基本礼貌"],
      4: ["朋友、家人及关系亲近的人", "直接、亲近，不适合正式对象"],
      5: ["仅限特定亲近关系或需要强烈追问时", "强硬，可能让对方感到被质问"]
    }[entry.registerLevel] || ["根据上下文判断", "保持中性语气"];
    return `
      <article class="qe-entry" id="${escapeHTML(entry.id)}" data-qe-entry>
        <header class="qe-entry-header">
          <div>
            <p class="qe-entry-type">${escapeHTML(entry.type === "purpose" ? "提问目的" : entry.type === "question-word" ? "疑问词" : "疑问句型")}</p>
            <h3 lang="ja">${escapeHTML(entry.title)}</h3>
            <p class="qe-entry-subtitle">${escapeHTML(entry.subtitle)}</p>
          </div>
          ${register ? `<span class="qe-register qe-register-${entry.registerLevel}">${escapeHTML(register)}</span>` : ""}
        </header>
        <p class="qe-summary">${escapeHTML(entry.summary)}</p>
        <div class="qe-formula"><span>结构</span><strong lang="ja">${escapeHTML(entry.formula)}</strong></div>
        <div class="qe-meta-tags">${renderTags([entry.purposeCategory, entry.structureCategory, ...(entry.tags || [])].filter(Boolean))}</div>
        <dl class="qe-register-guide">
          <div><dt>适合对象与场景</dt><dd>${escapeHTML(registerGuide[0])}</dd></div>
          <div><dt>给对方的感觉</dt><dd>${escapeHTML(registerGuide[1])}</dd></div>
        </dl>
        ${renderExamples(entry.examples)}
        ${(entry.collocations || []).length ? `<section class="qe-mini-section"><h4>常用搭配</h4><div class="qe-collocations">${renderTags(entry.collocations, "qe-collocation")}</div></section>` : ""}
        ${(entry.contrasts || []).length ? `<section class="qe-mini-section"><h4>容易混淆</h4><ul>${entry.contrasts.map((text) => `<li>${escapeHTML(text)}</li>`).join("")}</ul></section>` : ""}
        ${(entry.mistakes || []).length ? `<section class="qe-mini-section qe-entry-warning"><h4>常见偏差</h4><ul>${entry.mistakes.map((text) => `<li>${escapeHTML(text)}</li>`).join("")}</ul></section>` : ""}
        ${renderRelated(entry.relatedIds)}
      </article>`;
  }

  function renderComparison(comparison) {
    return `
      <article class="qe-comparison" id="${escapeHTML(comparison.id)}" data-qe-entry>
        <div class="qe-card-heading"><div><span>${escapeHTML(comparison.category)}</span><h3 lang="ja">${escapeHTML(comparison.title)}</h3></div></div>
        <p class="qe-summary">${escapeHTML(comparison.summary)}</p>
        <div class="qe-table-scroll" tabindex="0" aria-label="${escapeHTML(comparison.title)}对比表，可横向滚动">
          <table><thead><tr><th>表达</th><th>语体</th><th>核心作用</th><th>听感</th><th>适合场景</th></tr></thead>
          <tbody>${(comparison.rows || []).map((row) => `<tr>${row.map((cell, index) => `<${index === 0 ? "th" : "td"}${index === 0 ? ' scope="row" lang="ja"' : ""}>${escapeHTML(cell)}</${index === 0 ? "th" : "td"}>`).join("")}</tr>`).join("")}</tbody></table>
        </div>
        <p class="qe-recommendation"><strong>使用建议：</strong>${escapeHTML(comparison.recommendation)}</p>
        ${renderRelated(comparison.relatedIds)}
      </article>`;
  }

  function renderScene(scene) {
    return `
      <article class="qe-scene" id="${escapeHTML(scene.id)}" data-qe-entry>
        <div class="qe-card-heading"><div><span>使用场景</span><h3>${escapeHTML(scene.title)}</h3></div>${renderTags(scene.purposes)}</div>
        <p class="qe-summary">${escapeHTML(scene.summary)}</p>
        <div class="qe-scene-expressions">${(scene.expressions || []).map(([japanese, chinese, register, targetId]) => `
          <button type="button" data-qe-target="${escapeHTML(resolveId(targetId))}">
            <span><strong lang="ja">${escapeHTML(japanese)}</strong><small>${escapeHTML(chinese)}</small></span>
            <em>${escapeHTML(register)}</em>
          </button>`).join("")}</div>
        <p class="qe-unnatural"><strong>避免含糊：</strong>${escapeHTML(scene.unnatural)}</p>
      </article>`;
  }

  function renderMistake(mistake) {
    return `
      <article class="qe-mistake" id="${escapeHTML(mistake.id)}" data-qe-entry>
        <div class="qe-card-heading"><div><span>${escapeHTML(mistake.category)}</span><h3>${escapeHTML(mistake.title)}</h3></div></div>
        <div class="qe-correction-grid">
          <div class="is-unnatural"><span>不自然</span><p lang="ja">${escapeHTML(mistake.unnatural)}</p></div>
          <div class="is-natural"><span>更自然</span><p lang="ja">${escapeHTML(mistake.natural)}</p></div>
        </div>
        <dl class="qe-mistake-notes">
          <div><dt>原因</dt><dd>${escapeHTML(mistake.reason)}</dd></div>
          <div><dt>听感</dt><dd>${escapeHTML(mistake.feeling)}</dd></div>
          <div><dt>建议</dt><dd>${escapeHTML(mistake.recommended)}</dd></div>
        </dl>
        ${renderRelated(mistake.relatedIds)}
      </article>`;
  }

  function renderMap() {
    return `<div class="qe-map-groups">${(data.mapGroups || []).map((group) => `
      <section class="qe-map-group">
        <h3>${escapeHTML(group.title)}</h3>
        <div>${(group.items || []).map(([label, targetId]) => `<button type="button" data-qe-target="${escapeHTML(resolveId(targetId))}">${escapeHTML(label)}</button>`).join("")}</div>
      </section>`).join("")}</div>`;
  }

  function categoryJumps(items, key = "purposeCategory") {
    const seen = new Set();
    return (items || []).flatMap((item) => {
      const label = key === "title" ? item.title : item[key];
      if (!label || seen.has(label)) return [];
      seen.add(label);
      return [[label, item.id]];
    });
  }

  function renderSection(id, eyebrow, title, description, body, jumps = []) {
    return `<section class="qe-section" id="${id}">
      <header class="qe-section-heading"><p>${eyebrow}</p><h2>${title}</h2><span>${description}</span></header>
      ${jumps.length ? `<nav class="qe-section-jumps" aria-label="${escapeHTML(title)}分类">${jumps.map(([label, targetId]) => `<button type="button" data-qe-target="${escapeHTML(targetId)}">${escapeHTML(label)}</button>`).join("")}</nav>` : ""}
      ${body}
    </section>`;
  }

  function renderShell() {
    const nav = sectionLabels.map(([id, label]) => `<button type="button" data-qe-target="${id}">${label}</button>`).join("");
    const entryGrid = (items) => `<div class="qe-entry-grid">${items.map(renderEntryCard).join("")}</div>`;
    const main = [
      renderSection("questions-purposes", "START WITH INTENT", "按提问目的查", "先确定你想从对方那里得到什么信息。", entryGrid(data.purposes), categoryJumps(data.purposes)),
      renderSection("questions-words", "QUESTION WORDS", "疑问词与助词", "同一个疑问词，助词变化会改变句子焦点。", entryGrid(data.questionWords), categoryJumps(data.questionWords)),
      renderSection("questions-patterns", "SENTENCE PATTERNS", "疑问句型", "从确认、邀请、请求到委婉追问，按实际口语功能选择。", entryGrid(data.questionPatterns), categoryJumps(data.questionPatterns)),
      renderSection("questions-comparisons", "NUANCE", "语气与近义对比", "把容易混用的表达放在同一张表里看距离感和适用场景。", `<div class="qe-stack">${data.comparisons.map(renderComparison).join("")}</div>`, categoryJumps(data.comparisons, "category")),
      renderSection("questions-scenes", "SITUATIONS", "按场景查", "直接查看常见场景中可以开口使用的疑问表达。", `<div class="qe-scene-grid">${data.scenes.map(renderScene).join("")}</div>`, categoryJumps(data.scenes, "title")),
      renderSection("questions-mistakes", "COMMON PITFALLS", "常见错误", "关注翻译腔、助词、距离感与过度直接的问题。", `<div class="qe-mistake-grid">${data.mistakes.map(renderMistake).join("")}</div>`, categoryJumps(data.mistakes, "category"))
    ].join("");

    return `
      <div class="question-encyclopedia">
        <header class="qe-hero" id="questions-overview">
          <div class="qe-hero-copy">
            <p class="qe-kicker">QUERY REFERENCE · 疑問表現</p>
            <h1>${escapeHTML(data.title)}</h1>
            <p class="qe-subtitle">${escapeHTML(data.subtitle)}</p>
            <p class="qe-intro">${escapeHTML(data.intro)}</p>
          </div>
          <label class="qe-search" for="qeSearch">
            <span aria-hidden="true"></span>
            <input id="qeSearch" type="search" autocomplete="off" inputmode="search" placeholder="搜索疑问词、句型、中文意思或场景" />
            <kbd>⌘ K</kbd>
          </label>
          <p id="qeSearchStatus" class="qe-search-status" aria-live="polite"></p>
          <div id="qeSearchResults" class="qe-search-results" hidden></div>
          <div class="qe-frequency"><span>高频入口</span><div>${(data.highFrequency || []).map((item) => `<button type="button" data-qe-target="${escapeHTML(resolveId(item.targetId))}">${escapeHTML(item.label)}</button>`).join("")}</div></div>
        </header>
        <nav class="qe-nav" aria-label="百科章节">${nav}</nav>
        <section class="qe-map" aria-labelledby="qeMapTitle"><header><p>QUESTION MAP</p><h2 id="qeMapTitle">疑问表达地图</h2><span>按“想问什么”进入，不需要从头阅读。</span></header>${renderMap()}</section>
        <div class="qe-content-layout">
          <main class="qe-main">${main}</main>
          <aside class="qe-toc" aria-label="页面目录"><div><strong>页面目录</strong>${nav}</div></aside>
        </div>
      </div>`;
  }

  function collectText(item) {
    const examples = item.examples ? Object.values(item.examples).flat().flatMap((example) => [example.japanese, example.chinese]) : [];
    const comparisonRows = (item.rows || []).flat();
    const sceneExpressions = (item.expressions || []).flat();
    return {
      title: [item.title],
      formula: [item.formula],
      tags: [item.purposeCategory, item.structureCategory, ...(item.tags || [])],
      searchTerms: item.searchTerms || [],
      chinese: [item.subtitle, item.summary, item.reason, item.feeling, item.recommended, item.recommendation, item.category],
      related: [...(item.collocations || []), ...(item.contrasts || []), ...(item.mistakes || []), ...comparisonRows, ...sceneExpressions, item.natural, item.unnatural],
      examples
    };
  }

  function scoreSearch(item, rawQuery) {
    const query = normalize(rawQuery);
    if (!query) return null;
    const fields = collectText(item);
    const normalized = (values) => values.filter(Boolean).map(normalize);
    const titles = normalized(fields.title);
    const titleCores = normalized(fields.title.map((value) => String(value).replace(/[（(][^）)]*[）)]/g, "")));
    const formulas = normalized(fields.formula);
    const tags = normalized(fields.tags);
    const searchTerms = normalized(fields.searchTerms);
    const chinese = normalized(fields.chinese);
    const related = normalized(fields.related);
    const examples = normalized(fields.examples);
    let score = 0;
    let reason = "";
    if (titles.some((value) => value === query) || titleCores.some((value) => value === query)) [score, reason] = [1000, "标题完全匹配"];
    else if (formulas.some((value) => value === query)) [score, reason] = [960, "疑问词或句型完全匹配"];
    else if (titles.some((value) => value.startsWith(query))) [score, reason] = [920, "标题开头匹配"];
    else if (titles.some((value) => value.includes(query))) [score, reason] = [860, "标题匹配"];
    else if (formulas.some((value) => value.includes(query))) [score, reason] = [760, "结构匹配"];
    else if (tags.some((value) => value === query)) [score, reason] = [700, "标签完全匹配"];
    else if (tags.some((value) => value.includes(query))) [score, reason] = [620, "标签匹配"];
    else if (chinese.some((value) => value.includes(query))) [score, reason] = [450, "中文说明匹配"];
    else if (searchTerms.some((value) => value.includes(query))) [score, reason] = [400, "搜索关键词匹配"];
    else if (related.some((value) => value.includes(query))) [score, reason] = [300, "搭配或相关内容匹配"];
    else if (query.length > 1 && examples.some((value) => value.includes(query))) [score, reason] = [100, "例句匹配"];
    return score ? { score, reason } : null;
  }

  function searchData(query) {
    if (!state.searchItems.length) buildIndexes();
    return state.searchItems.map(({ category, item }) => {
      const match = scoreSearch(item, query);
      return match ? { category, item, ...match } : null;
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.item.title.length - b.item.title.length).slice(0, 30);
  }

  function updateSearch(query) {
    const resultsElement = state.context?.container.querySelector("#qeSearchResults");
    const status = state.context?.container.querySelector("#qeSearchStatus");
    if (!resultsElement || !status) return;
    const cleanQuery = String(query || "").trim();
    if (!cleanQuery) {
      resultsElement.hidden = true;
      resultsElement.replaceChildren();
      status.textContent = "";
      return;
    }
    const matches = searchData(cleanQuery);
    status.textContent = matches.length ? `找到 ${matches.length} 个相关条目，标题与结构匹配优先。` : "没有找到相关条目。";
    resultsElement.hidden = false;
    resultsElement.innerHTML = matches.length ? matches.map(({ category, item, reason }) => `
      <button type="button" data-qe-target="${escapeHTML(resolveId(item.id))}">
        <span class="qe-search-result-category">${escapeHTML(category)} · ${escapeHTML(reason)}</span>
        <strong lang="ja">${escapeHTML(item.title)}</strong>
        <small>${escapeHTML(item.subtitle || item.summary || item.natural || "")}</small>
        ${item.formula ? `<em lang="ja">${escapeHTML(item.formula)}</em>` : ""}
      </button>`).join("") : `<p class="qe-no-results">换一个疑问词、中文目的或场景再试试。</p>`;
  }

  function updateActiveNav(id) {
    const container = state.context?.container;
    if (!container) return;
    container.querySelectorAll(".qe-nav [data-qe-target]").forEach((button) => button.classList.toggle("is-active", button.dataset.qeTarget === id));
  }

  function scrollToTarget(rawId, options = {}) {
    const id = resolveId(rawId);
    const target = document.getElementById(id);
    if (!target) return false;
    if (options.push !== false && window.location.hash !== `#${id}`) {
      history.replaceState({ ...(history.state || {}), questionScrollY: window.scrollY }, "", window.location.href);
      history.pushState({ questionModule: true }, "", `#${id}`);
    }
    target.scrollIntoView({ behavior: options.instant ? "auto" : "smooth", block: "start" });
    if (sectionIds.has(id)) updateActiveNav(id);
    if (target.matches("[data-qe-entry]")) {
      state.manualEntryUntil = Date.now() + 1600;
      target.classList.remove("is-highlighted");
      requestAnimationFrame(() => target.classList.add("is-highlighted"));
      window.setTimeout(() => target.classList.remove("is-highlighted"), 1800);
    }
    return true;
  }

  function handleClick(event) {
    const targetButton = event.target.closest("[data-qe-target]");
    if (targetButton) {
      scrollToTarget(targetButton.dataset.qeTarget);
      state.context?.container.querySelector(".qe-toc")?.classList.remove("is-open");
      return;
    }
    const toggle = event.target.closest("[data-qe-toc-toggle]");
    if (toggle) {
      const toc = state.context?.container.querySelector(".qe-toc");
      const isOpen = toc?.classList.toggle("is-open") || false;
      toggle.setAttribute("aria-expanded", String(isOpen));
    }
  }

  function handleInput(event) {
    if (event.target.id === "qeSearch") updateSearch(event.target.value);
  }

  function handleKeydown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k" && state.active) {
      event.preventDefault();
      state.context?.container.querySelector("#qeSearch")?.focus();
    }
  }

  function observeSections() {
    state.observer?.disconnect();
    if (!("IntersectionObserver" in window)) return;
    state.observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        updateActiveNav(visible.target.id);
        if (Date.now() > state.manualEntryUntil && window.location.hash !== `#${visible.target.id}`) {
          history.replaceState({ ...(history.state || {}), questionModule: true, questionScrollY: window.scrollY }, "", `#${visible.target.id}`);
        }
      }
    }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.15, 0.4] });
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) state.observer.observe(element);
    });
  }

  function render(context) {
    leave({ preserveHash: true });
    state.context = context;
    state.active = true;
    buildIndexes();
    context.resultCount.textContent = "";
    context.emptyState.hidden = true;
    context.container.className = "branch-list question-encyclopedia-host";
    context.container.innerHTML = renderShell();
    context.container.addEventListener("click", handleClick);
    context.container.addEventListener("input", handleInput);
    document.addEventListener("keydown", handleKeydown);
    observeSections();

    requestAnimationFrame(() => {
      const id = resolveId(decodeURIComponent(window.location.hash.replace(/^#/, "")));
      if (isQuestionHash(`#${id}`)) {
        scrollToTarget(id, { push: false, instant: true });
        state.restoreTimer = window.setTimeout(() => {
          if (state.active && window.location.hash === `#${id}`) scrollToTarget(id, { push: false, instant: true });
        }, 180);
      }
      else {
        history.pushState({ questionModule: true }, "", "#questions-overview");
        window.scrollTo(0, 0);
        updateActiveNav("questions-overview");
      }
    });
  }

  function leave(options = {}) {
    if (!state.active) return;
    state.observer?.disconnect();
    state.observer = null;
    window.clearTimeout(state.restoreTimer);
    state.restoreTimer = null;
    state.context?.container.removeEventListener("click", handleClick);
    state.context?.container.removeEventListener("input", handleInput);
    document.removeEventListener("keydown", handleKeydown);
    state.active = false;
    if (!options.preserveHash && isQuestionHash()) {
      history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    }
    state.context = null;
  }

  window.addEventListener("popstate", (event) => {
    if (!state.active) return;
    if (isQuestionHash()) {
      const id = resolveId(decodeURIComponent(window.location.hash.slice(1)));
      requestAnimationFrame(() => {
        if (Number.isFinite(event.state?.questionScrollY)) window.scrollTo(0, event.state.questionScrollY);
        else scrollToTarget(id, { push: false, instant: true });
      });
    } else {
      state.context?.showHome?.({ fromHistory: true });
    }
  });

  buildIndexes();
  window.QuestionExpressionsModule = {
    theme: data,
    render,
    leave,
    isQuestionHash,
    searchData,
    navigateTo: scrollToTarget
  };
})();
