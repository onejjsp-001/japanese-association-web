(function () {
  "use strict";

  const elements = {
    app: document.getElementById("app"),
    backButton: document.getElementById("backButton"),
    brand: document.querySelector(".brand"),
    homeView: document.getElementById("homeView"),
    topicView: document.getElementById("topicView"),
    themeGrid: document.getElementById("themeGrid"),
    homeSearchInput: document.getElementById("homeSearchInput"),
    homeSearchStatus: document.getElementById("homeSearchStatus"),
    homeSearchResults: document.getElementById("homeSearchResults"),
    clearHomeSearchButton: document.getElementById("clearHomeSearchButton"),
    topicJapanese: document.getElementById("topicJapanese"),
    topicTitle: document.getElementById("topicTitle"),
    topicIcon: document.getElementById("topicIcon"),
    searchInput: document.getElementById("searchInput"),
    resultCount: document.getElementById("resultCount"),
    branchList: document.getElementById("branchList"),
    emptyState: document.getElementById("emptyState"),
    clearSearchButton: document.getElementById("clearSearchButton"),
    modalBackdrop: document.getElementById("modalBackdrop"),
    categoryModal: document.getElementById("categoryModal"),
    modalTitle: document.getElementById("modalTitle"),
    modalKana: document.getElementById("modalKana"),
    modalChinese: document.getElementById("modalChinese"),
    modalContent: document.getElementById("modalContent"),
    modalCloseButton: document.getElementById("modalCloseButton")
  };

  let activeTheme = null;
  let activeQuery = "";
  let lastFocusedElement = null;
  let homeSearchExpanded = false;
  const hasCounterModule = typeof counterAssociationData !== "undefined";
  const associationTheme = window.AssociationModule?.theme || null;
  const questionExpressionsTheme = window.QuestionExpressionsModule?.theme || null;
  const ALL_THEMES = [
    ...LEARNING_DATA,
    bodyAssociationData,
    ...(hasCounterModule ? [counterAssociationData] : []),
    fruitAssociationData,
    ...(associationTheme ? [associationTheme] : []),
    ...(questionExpressionsTheme ? [questionExpressionsTheme] : [])
  ];

  function normalize(value) {
    return String(value || "").toLocaleLowerCase();
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function comparableJapanese(value) {
    return String(value || "").normalize("NFKC").replace(/[\s・･、。,.!！?？]/g, "").toLocaleLowerCase();
  }

  function renderRubyText(text, reading = "", segments = []) {
    if (Array.isArray(segments) && segments.length) {
      return segments.map((segment) => {
        const segmentText = escapeHTML(segment.text);
        const segmentReading = segment.reading || "";
        if (!segmentReading || comparableJapanese(segment.text) === comparableJapanese(segmentReading)) {
          return segmentText;
        }
        return `<ruby>${segmentText}<rt>${escapeHTML(segmentReading)}</rt></ruby>`;
      }).join("");
    }

    const safeText = escapeHTML(text);
    if (!reading || comparableJapanese(text) === comparableJapanese(reading)) return safeText;
    return `<ruby>${safeText}<rt>${escapeHTML(reading)}</rt></ruby>`;
  }

  window.SiteUtils = { normalize, escapeHTML, comparableJapanese, renderRubyText };

  function getThemeJapanese(theme) {
    const parts = String(theme.japaneseTitle || "").split("·").map((part) => part.trim());
    return {
      text: theme.id === "body-association"
        ? "人体联想"
        : theme.id === "counter-association"
          ? theme.japaneseTitle
          : (parts[0] || theme.title),
      reading: theme.reading || parts[1] || ""
    };
  }

  function itemText(item) {
    const nestedItems = [
      ...(item.items || []),
      ...(item.expressions || []),
      ...(item.examples || []),
      ...(item.vocabularyGroups || []).flatMap((group) => group.items || [])
    ];
    return [
      item.japanese,
      item.kana,
      item.chinese,
      item.word,
      item.reading,
      item.meaning,
      item.description,
      item.example,
      item.exampleReading,
      item.translation,
      item.title,
      item.text,
      item.tip,
      ...(item.collocations || []),
      ...(item.searchTerms || []),
      ...(item.segments || []).flatMap((segment) => [segment.text, segment.reading]),
      ...nestedItems.map((entry) => itemText(entry))
    ].filter(Boolean).join(" ");
  }

  function itemMatches(item, query) {
    return normalize(itemText(item)).includes(query);
  }

  function getWordDisplay(word) {
    return {
      japanese: word.japanese || word.word,
      kana: word.kana || word.reading,
      chinese: word.chinese || word.meaning
    };
  }

  function findEncyclopediaMatch(word, query) {
    if (!word || word.displayType !== "encyclopedia" || !query) return null;

    for (const category of word.categories || []) {
      for (const group of category.groups || []) {
        const item = (group.items || []).find((entry) => itemMatches(entry, query));
        if (item) return { word, category, group, item };
      }
      if (itemMatches(category, query)) return { word, category, group: null, item: null };
    }

    return itemMatches(word, query) ? { word, category: null, group: null, item: null } : null;
  }

  function findGlobalEncyclopediaMatch(query) {
    if (!query) return null;
    for (const theme of LEARNING_DATA) {
      for (const branch of theme.branches || []) {
        for (const word of branch.words || []) {
          const match = findEncyclopediaMatch(word, query);
          if (match) return { ...match, theme };
        }
      }
    }
    return null;
  }

  function wordMatches(word, query) {
    if (!query) return true;
    if (word.displayType === "encyclopedia") return Boolean(findEncyclopediaMatch(word, query));
    return [word, ...(word.related || []), ...(word.sentences || [])]
      .some((item) => itemMatches(item, query));
  }

  function categoryMatches(category, query) {
    if (!query || itemMatches(category, query)) return true;
    return (category.sections || []).some((section) =>
      (section.items || []).some((item) => itemMatches(item, query))
    );
  }

  function findBodyAssociationMatch(query) {
    if (!query) return null;

    for (const section of bodyAssociationData.sections || []) {
      for (const category of section.categories || []) {
        const vocabularyItems = [
          ...(category.items || []),
          ...(category.vocabularyGroups || []).flatMap((group) => group.items || [])
        ];
        const item = vocabularyItems.find((entry) => itemMatches(entry, query));
        const expression = getBodyAssociationExpressions(category)
          .find((entry) => itemMatches(entry, query));
        const example = (category.examples || []).find((entry) => itemMatches(entry, query));
        if (item || expression || example || itemMatches(category, query)) {
          return {
            theme: bodyAssociationData,
            section,
            category,
            item: item || null,
            expression: expression || null,
            example: example || null
          };
        }
      }
      if (itemMatches(section, query)) {
        return { theme: bodyAssociationData, section, category: null, item: null };
      }
    }

    return itemMatches(bodyAssociationData, query)
      ? { theme: bodyAssociationData, section: bodyAssociationData.sections[0], category: null, item: null }
      : null;
  }

  function getBodyAssociationExpressions(category) {
    return category.expressions || bodyAssociationExpressionData[category.id] || [];
  }

  function getCounterList() {
    if (!hasCounterModule) return [];
    return Object.values(counterAssociationData.counters || {});
  }

  function getCounterById(counterId) {
    if (!hasCounterModule) return null;
    return counterAssociationData.counters?.[counterId] || null;
  }

  function getCounterCategory(categoryId) {
    if (!hasCounterModule) return null;
    return counterAssociationData.categories.find((category) => category.id === categoryId) || null;
  }

  function counterSearchText(counter) {
    const category = getCounterCategory(counter.categoryId);
    const questions = counter.questions || (counter.question ? [counter.question] : []);
    return [
      counter.counter,
      counter.reading,
      counter.meaning,
      counter.usage,
      counter.tip,
      category?.title,
      category?.reading,
      category?.meaning,
      category?.summary,
      ...(counter.searchTerms || []),
      ...(counter.objects || []).map((item) => itemText(item)),
      ...(counter.counts || []).map((item) => itemText(item)),
      ...(counter.specialCounts || []).map((item) => itemText(item)),
      ...questions.map((item) => itemText(item)),
      ...(counter.examples || []).map((item) => itemText(item))
    ].filter(Boolean).join(" ");
  }

  function findCounterMatch(query) {
    if (!query) return null;

    for (const counter of getCounterList()) {
      const object = (counter.objects || []).find((item) => itemMatches(item, query));
      const count = [...(counter.counts || []), ...(counter.specialCounts || [])]
        .find((item) => itemMatches(item, query));
      const question = (counter.questions || (counter.question ? [counter.question] : []))
        .find((item) => itemMatches(item, query));
      const example = (counter.examples || []).find((item) => itemMatches(item, query));
      if (object || count || question || example || normalize(counterSearchText(counter)).includes(query)) {
        return { counter, object: object || null, count: count || null, question: question || null, example: example || null };
      }
    }
    return null;
  }

  function searchCounterModule(query) {
    if (!query) return [];
    return getCounterList().map((counter) => {
      const object = (counter.objects || []).find((item) => itemMatches(item, query));
      const count = [...(counter.counts || []), ...(counter.specialCounts || [])]
        .find((item) => itemMatches(item, query));
      const question = (counter.questions || (counter.question ? [counter.question] : []))
        .find((item) => itemMatches(item, query));
      const example = (counter.examples || []).find((item) => itemMatches(item, query));
      const matched = object || count || question || example || normalize(counterSearchText(counter)).includes(query);
      return matched ? { counter, object: object || null, count: count || null, question: question || null, example: example || null } : null;
    }).filter(Boolean);
  }

  function getFruitList() {
    return Object.values(fruitAssociationData.fruits || {});
  }

  function getFruitById(fruitId) {
    return fruitAssociationData.fruits?.[fruitId] || null;
  }

  function getFruitCategory(categoryId) {
    return fruitAssociationData.categories.find((category) => category.id === categoryId) || null;
  }

  function fruitSearchText(fruit) {
    const category = getFruitCategory(fruit.categoryId);
    return [
      fruit.word,
      fruit.reading,
      fruit.meaning,
      fruit.tip,
      ...(fruit.tags || []),
      category?.title,
      category?.reading,
      category?.meaning,
      ...(fruit.parts || []).map((item) => itemText(item)),
      ...(fruit.tastes || []).map((item) => itemText(item)),
      ...(fruit.actions || []).map((item) => itemText(item)),
      ...(fruit.counters || []).map((item) => itemText(item)),
      ...(fruit.examples || []).map((item) => itemText(item))
    ].filter(Boolean).join(" ");
  }

  function findFruitMatch(query) {
    if (!query) return null;

    for (const fruit of getFruitList()) {
      for (const [section, items] of [
        ["parts", fruit.parts || []],
        ["tastes", fruit.tastes || []],
        ["actions", fruit.actions || []],
        ["counters", fruit.counters || []],
        ["examples", fruit.examples || []]
      ]) {
        const item = items.find((entry) => itemMatches(entry, query));
        if (item) return { type: "fruit", fruit, section, item };
      }
      if (normalize(fruitSearchText(fruit)).includes(query)) {
        return { type: "fruit", fruit, section: "fruit", item: null };
      }
    }

    for (const group of fruitAssociationData.commonExpressions || []) {
      const item = (group.items || []).find((entry) => itemMatches(entry, query));
      if (item || itemMatches(group, query)) return { type: "common", group, item: item || null };
    }
    return null;
  }

  function searchFruitModule(query) {
    if (!query) return [];
    const matches = getFruitList().map((fruit) => {
      const detail = findFruitItemMatch(fruit, query);
      return detail || normalize(fruitSearchText(fruit)).includes(query)
        ? { type: "fruit", fruit, detail: detail || null }
        : null;
    }).filter(Boolean);

    (fruitAssociationData.commonExpressions || []).forEach((group) => {
      const item = (group.items || []).find((entry) => itemMatches(entry, query));
      if (item || itemMatches(group, query)) matches.push({ type: "common", group, detail: item || null });
    });
    return matches;
  }

  function findFruitItemMatch(fruit, query) {
    for (const [section, items] of [
      ["parts", fruit.parts || []],
      ["tastes", fruit.tastes || []],
      ["actions", fruit.actions || []],
      ["counters", fruit.counters || []],
      ["examples", fruit.examples || []]
    ]) {
      const item = items.find((entry) => itemMatches(entry, query));
      if (item) return { section, item };
    }
    return null;
  }

  function createSearchResultCard(result, includeSource = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "unified-search-result";
    button.dataset.searchRoute = JSON.stringify(result.route);
    button.innerHTML = `
      <span class="unified-search-result-topline">
        <span>${escapeHTML(result.reason)}</span>
        ${includeSource ? `<small>来源：${escapeHTML(result.source)}</small>` : ""}
      </span>
      <strong lang="ja">${renderRubyText(result.title, result.reading)}</strong>
      ${result.meaning ? `<span class="unified-search-result-meaning">${escapeHTML(result.meaning)}</span>` : ""}
      <span class="unified-search-result-arrow" aria-hidden="true">→</span>
    `;
    return button;
  }

  function appendSearchGroup(container, title, items, limit, includeSource) {
    if (!items.length) return 0;
    const section = document.createElement("section");
    section.className = "unified-search-group";
    const heading = document.createElement("div");
    heading.className = "unified-search-group-heading";
    const headingTitle = document.createElement("h3");
    headingTitle.textContent = title;
    const count = document.createElement("span");
    count.textContent = `${items.length} 条`;
    heading.append(headingTitle, count);
    const list = document.createElement("div");
    list.className = "unified-search-list";
    items.slice(0, limit).forEach((item) => list.appendChild(createSearchResultCard(item, includeSource)));
    section.append(heading, list);
    container.appendChild(section);
    return Math.max(0, items.length - limit);
  }

  function renderSearchResults(container, result, options = {}) {
    const initialLimits = result.shortQuery
      ? { core: 10, related: 6, examples: 0 }
      : { core: 12, related: 10, examples: 6 };
    const expanded = Boolean(options.expanded);
    const limits = expanded
      ? { core: result.groups.core.length, related: result.groups.related.length, examples: result.groups.examples.length }
      : initialLimits;
    const fragment = document.createDocumentFragment();
    let hiddenCount = 0;
    hiddenCount += appendSearchGroup(fragment, "核心条目", result.groups.core, limits.core, options.includeSource);
    hiddenCount += appendSearchGroup(fragment, "相关表达", result.groups.related, limits.related, options.includeSource);
    if (!result.shortQuery || expanded) {
      hiddenCount += appendSearchGroup(fragment, "例句与详细说明中出现", result.groups.examples, limits.examples, options.includeSource);
    } else {
      hiddenCount += result.groups.examples.length;
    }

    if (!result.total) {
      const empty = document.createElement("p");
      empty.className = "unified-search-empty";
      empty.textContent = "没有找到相关内容，试试更具体的日语、假名或中文词。";
      fragment.appendChild(empty);
    } else if (result.shortQuery) {
      const note = document.createElement("p");
      note.className = "unified-search-note";
      note.textContent = "单字符搜索优先显示标题、假名和标签，已降低例句全文的权重。";
      fragment.appendChild(note);
    }

    if (hiddenCount > 0) {
      const more = document.createElement("button");
      more.type = "button";
      more.className = "unified-search-more";
      more.dataset.searchMore = options.scope || "module";
      more.textContent = `显示更多（还有 ${hiddenCount} 条）`;
      fragment.appendChild(more);
    }
    container.replaceChildren(fragment);
  }

  function renderHomeSearch(rawQuery = elements.homeSearchInput.value) {
    const query = String(rawQuery || "").trim();
    elements.clearHomeSearchButton.hidden = !query;
    if (!query) {
      elements.homeSearchResults.hidden = true;
      elements.homeSearchResults.replaceChildren();
      elements.homeSearchStatus.textContent = "";
      homeSearchExpanded = false;
      return;
    }
    const result = window.GlobalSearch.search(query);
    elements.homeSearchResults.hidden = false;
    elements.homeSearchStatus.textContent = result.total
      ? `找到 ${result.total} 条结果，核心词条优先。`
      : "没有找到相关内容。";
    renderSearchResults(elements.homeSearchResults, result, {
      expanded: homeSearchExpanded,
      includeSource: true,
      scope: "home"
    });
  }

  function createThemeCard(theme, featured = false) {
    const themeJapanese = getThemeJapanese(theme);
    const card = document.createElement("button");
    card.type = "button";
    card.className = `theme-card theme-card-${theme.id}${featured ? " theme-card--featured" : " theme-card--compact"}`;
    card.dataset.themeId = theme.id;
    card.setAttribute("aria-label", `进入${theme.title}主题，${theme.description}`);
    card.innerHTML = `
      ${theme.badge ? `<span class="body-association-home-badge">${escapeHTML(theme.id === "body-association" ? "联想学习" : theme.badge)}</span>` : ""}
      <span class="body-association-home-copy">
        <span class="body-association-home-title" lang="ja">${renderRubyText(themeJapanese.text, themeJapanese.reading)}</span>
        <span class="body-association-home-meaning">${escapeHTML(theme.meaning || theme.description)}</span>
      </span>
      <span class="theme-icon" aria-hidden="true">${escapeHTML(theme.icon)}</span>
      <span class="theme-arrow" aria-hidden="true"><span>→</span></span>
    `;
    card.addEventListener("click", () => window.AppRouter.navigate({ theme: theme.id }));
    return card;
  }

  function createThemeCards() {
    const visibleThemes = ALL_THEMES.filter((theme) => theme.id !== "body");
    const groups = [
      {
        title: "快速查询",
        description: "先找到需要的词、读法或句型",
        ids: ["question-expressions", "date", "counter-association"],
        featuredId: "question-expressions"
      },
      {
        title: "联想学习",
        description: "从一个主题继续展开相关词和表达",
        ids: ["body-association", "fruit-association"]
      },
      {
        title: "我的内容",
        description: "记录自己的词、句子和联想关系",
        ids: ["quick-association"]
      }
    ];
    const fragment = document.createDocumentFragment();
    groups.forEach((group) => {
      const themes = group.ids.map((id) => visibleThemes.find((theme) => theme.id === id)).filter(Boolean);
      if (!themes.length) return;
      const section = document.createElement("section");
      section.className = `home-module-section home-module-section--${group.ids[0]}`;
      const heading = document.createElement("div");
      heading.className = "home-module-heading";
      const copy = document.createElement("div");
      const title = document.createElement("h2");
      title.textContent = group.title;
      const description = document.createElement("p");
      description.textContent = group.description;
      copy.append(title, description);
      const count = document.createElement("span");
      count.textContent = `${themes.length} 个入口`;
      heading.append(copy, count);
      const grid = document.createElement("div");
      grid.className = "theme-grid";
      themes.forEach((theme) => grid.appendChild(createThemeCard(theme, theme.id === group.featuredId)));
      section.append(heading, grid);
      fragment.appendChild(section);
    });
    elements.themeGrid.replaceChildren(fragment);
  }

  function openTheme(themeId, initialQuery = "") {
    const theme = ALL_THEMES.find((item) => item.id === themeId);
    if (!theme) return;

    closeModal(false);
    if (activeTheme?.id === "question-expressions" && theme.id !== "question-expressions") {
      window.QuestionExpressionsModule?.leave();
    }
    if (activeTheme?.id === "quick-association" && theme.id !== "quick-association") {
      window.AssociationModule?.leave();
    }
    activeTheme = theme;
    activeQuery = "";
    const themeJapanese = getThemeJapanese(theme);
    elements.topicJapanese.innerHTML = renderRubyText(themeJapanese.text, themeJapanese.reading);
    elements.topicTitle.textContent = theme.title;
    elements.topicIcon.textContent = theme.icon;
    elements.searchInput.value = initialQuery;
    elements.searchInput.placeholder = theme.id === "counter-association"
      ? "搜索物品、量词或读法"
      : theme.id === "fruit-association"
        ? "搜索水果、味道、动作或中文"
        : theme.id === "quick-association"
          ? "搜索日语、假名、中文、标签或关联"
        : theme.id === "question-expressions"
          ? "搜索疑问词、句型、中文意思或使用场景"
          : "搜索词根、联想说法或句子";
    document.documentElement.dataset.theme = theme.id;
    elements.homeView.hidden = true;
    elements.topicView.hidden = false;
    elements.backButton.hidden = false;
    renderActiveTheme(initialQuery);
    window.scrollTo(0, 0);
    elements.app.focus({ preventScroll: true });
  }

  function showHome() {
    if (activeTheme?.id === "quick-association") window.AssociationModule?.leave();
    if (activeTheme?.id === "question-expressions") window.QuestionExpressionsModule?.leave();
    closeModal(false);
    activeTheme = null;
    activeQuery = "";
    delete document.documentElement.dataset.theme;
    elements.topicView.hidden = true;
    elements.homeView.hidden = false;
    elements.backButton.hidden = true;
    elements.searchInput.value = "";
    window.scrollTo(0, 0);
    elements.app.focus({ preventScroll: true });
  }

  function renderActiveTheme(rawQuery) {
    if (!activeTheme) return;
    activeQuery = normalize(rawQuery.trim());
    if (activeTheme.layout !== "question-encyclopedia") elements.branchList.className = "branch-list";

    if (activeQuery && !["quick-association", "question-encyclopedia"].includes(activeTheme.layout)) {
      renderModuleSearchResults(rawQuery);
    } else if (activeTheme.layout === "modal-categories") {
      renderCategoryCards(activeQuery);
    } else if (activeTheme.layout === "body-association") {
      renderBodyAssociationLanding(activeQuery);
    } else if (activeTheme.layout === "counter-association") {
      renderCounterHome(activeQuery);
    } else if (activeTheme.layout === "fruit-association") {
      renderFruitHome(activeQuery);
    } else if (activeTheme.layout === "quick-association") {
      window.AssociationModule?.render({
        container: elements.branchList,
        resultCount: elements.resultCount,
        emptyState: elements.emptyState,
        query: rawQuery,
        utils: window.SiteUtils
      });
    } else if (activeTheme.layout === "question-encyclopedia") {
      window.QuestionExpressionsModule?.render({
        container: elements.branchList,
        resultCount: elements.resultCount,
        emptyState: elements.emptyState,
        utils: window.SiteUtils,
        showHome
      });
    } else {
      renderBranches(activeQuery);
    }
  }

  function renderModuleSearchResults(rawQuery, expanded = false) {
    const result = window.GlobalSearch.search(rawQuery, { themeId: activeTheme.id });
    const wrapper = document.createElement("section");
    wrapper.className = "module-search-results";
    renderSearchResults(wrapper, result, {
      expanded,
      includeSource: false,
      scope: "module"
    });
    elements.branchList.className = "branch-list module-search-results-host";
    elements.branchList.replaceChildren(wrapper);
    elements.resultCount.textContent = result.total
      ? `找到 ${result.total} 条结果 · 不会自动打开，请选择需要的内容`
      : "没有找到相关内容";
    elements.emptyState.hidden = true;
  }

  function renderCounterHome(query) {
    const wrapper = document.createElement("div");
    wrapper.className = "counter-home";

    if (query) {
      const matches = searchCounterModule(query);
      const results = document.createElement("section");
      results.className = "counter-search-results";
      const heading = document.createElement("h2");
      heading.className = "counter-section-title";
      heading.textContent = "反查结果";
      const grid = document.createElement("div");
      grid.className = "counter-search-result-grid";

      matches.forEach((match) => {
        const { counter, object, count, question } = match;
        const focusItem = object || count || question;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "counter-search-result-card";
        button.dataset.counterId = counter.id;
        button.dataset.counterCategoryId = counter.categoryId;
        button.setAttribute("aria-label", `打开量词${counter.counter}详情`);
        button.innerHTML = `
          <span class="counter-result-match" lang="ja">${focusItem
            ? renderRubyText(focusItem.word || focusItem.text, focusItem.reading, focusItem.segments)
            : renderRubyText(counter.counter, counter.reading)}</span>
          <span class="counter-result-recommend">推荐量词：<strong lang="ja">${renderRubyText(counter.counter, counter.reading)}</strong></span>
          <span class="counter-result-use">${escapeHTML(counter.meaning)}</span>
        `;
        grid.appendChild(button);
      });

      results.append(heading, grid);
      wrapper.appendChild(results);
      elements.branchList.className = "counter-home-wrap";
      elements.branchList.replaceChildren(wrapper);
      elements.emptyState.hidden = matches.length !== 0;
      elements.resultCount.textContent = matches.length
        ? `找到 ${matches.length} 个推荐量词 · 正在打开详情`
        : "没有找到对应的常用量词";
      return;
    }

    wrapper.append(renderCounterQuickGrid(), renderCounterCategoryGrid());
    elements.branchList.className = "counter-home-wrap";
    elements.branchList.replaceChildren(wrapper);
    elements.emptyState.hidden = true;
    elements.resultCount.textContent = "第一阶段 · 12 个常用量词";
  }

  function renderCounterQuickGrid() {
    const section = document.createElement("section");
    section.className = "counter-home-section";
    const heading = document.createElement("h2");
    heading.className = "counter-section-title";
    heading.textContent = "常用量词";
    const grid = document.createElement("div");
    grid.className = "counter-quick-grid";

    getCounterList().forEach((counter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "counter-quick-card";
      button.dataset.counterId = counter.id;
      button.dataset.counterCategoryId = counter.categoryId;
      button.setAttribute("aria-label", `查看量词${counter.counter}：${counter.meaning}`);
      button.innerHTML = `
        <span class="counter-quick-word" lang="ja">${renderRubyText(counter.counter, counter.reading)}</span>
        <span class="counter-quick-meaning">${escapeHTML(counter.meaning)}</span>
      `;
      grid.appendChild(button);
    });

    section.append(heading, grid);
    return section;
  }

  function renderCounterCategoryGrid() {
    const section = document.createElement("section");
    section.className = "counter-home-section";
    const heading = document.createElement("h2");
    heading.className = "counter-section-title";
    heading.textContent = "按场景查看";
    const grid = document.createElement("div");
    grid.className = "counter-category-grid";

    counterAssociationData.categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "counter-category-card";
      button.dataset.counterCategoryId = category.id;
      button.setAttribute("aria-label", `打开量词分类：${category.title}`);
      button.innerHTML = `
        <span class="counter-category-title" lang="ja">${renderRubyText(category.title, category.reading)}</span>
        <span class="counter-category-summary" lang="ja">${escapeHTML(category.summary)}</span>
        <span class="counter-category-meaning">${escapeHTML(category.meaning)}</span>
        <span class="counter-category-open" aria-hidden="true">＋</span>
      `;
      grid.appendChild(button);
    });

    section.append(heading, grid);
    return section;
  }

  function renderFruitHome(query) {
    const wrapper = document.createElement("div");
    wrapper.className = "fruit-home";

    if (query) {
      const matches = searchFruitModule(query);
      const section = document.createElement("section");
      section.className = "fruit-home-section";
      const heading = document.createElement("h2");
      heading.className = "fruit-section-title";
      heading.textContent = "搜索结果";
      const grid = document.createElement("div");
      grid.className = "fruit-search-result-grid";

      matches.forEach((match) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "fruit-search-result-card";
        if (match.type === "fruit") {
          const focus = match.detail?.item;
          button.dataset.fruitId = match.fruit.id;
          button.dataset.fruitCategoryId = match.fruit.categoryId;
          button.setAttribute("aria-label", `打开水果${match.fruit.word}详情`);
          button.innerHTML = `
            <span class="fruit-result-match" lang="ja">${focus
              ? renderRubyText(focus.word || focus.text, focus.reading, focus.segments)
              : renderRubyText(match.fruit.word, match.fruit.reading)}</span>
            <span class="fruit-result-recommend">相关水果：<strong lang="ja">${renderRubyText(match.fruit.word, match.fruit.reading)}</strong></span>
            <span class="fruit-result-meaning">${escapeHTML(match.fruit.meaning)}</span>
          `;
        } else {
          button.dataset.fruitView = "common";
          button.setAttribute("aria-label", "打开水果常用表达");
          button.innerHTML = `
            <span class="fruit-result-match" lang="ja">${match.detail
              ? renderRubyText(match.detail.text, match.detail.reading, match.detail.segments)
              : renderRubyText(match.group.title, match.group.reading)}</span>
            <span class="fruit-result-recommend">常用表达</span>
            <span class="fruit-result-meaning">${escapeHTML(match.group.meaning)}</span>
          `;
        }
        grid.appendChild(button);
      });

      section.append(heading, grid);
      wrapper.appendChild(section);
      elements.branchList.className = "fruit-home-wrap";
      elements.branchList.replaceChildren(wrapper);
      elements.emptyState.hidden = matches.length !== 0;
      elements.resultCount.textContent = matches.length
        ? `找到 ${matches.length} 个水果联想 · 正在打开详情`
        : "没有找到相关水果或表达";
      return;
    }

    wrapper.append(renderFruitQuickGrid(), renderFruitCategoryGrid(), renderFruitCommonEntry());
    elements.branchList.className = "fruit-home-wrap";
    elements.branchList.replaceChildren(wrapper);
    elements.emptyState.hidden = true;
    elements.resultCount.textContent = "第一阶段 · 20 种常见水果";
  }

  function renderFruitQuickGrid() {
    const section = document.createElement("section");
    section.className = "fruit-home-section";
    const heading = document.createElement("h2");
    heading.className = "fruit-section-title";
    heading.textContent = "常见水果";
    const grid = document.createElement("div");
    grid.className = "fruit-quick-grid";
    fruitAssociationData.quickFruitIds.forEach((fruitId) => {
      const fruit = getFruitById(fruitId);
      if (!fruit) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "fruit-quick-card";
      button.dataset.fruitId = fruit.id;
      button.dataset.fruitCategoryId = fruit.categoryId;
      button.setAttribute("aria-label", `查看水果${fruit.word}：${fruit.meaning}`);
      button.innerHTML = `
        <span class="fruit-quick-word" lang="ja">${renderRubyText(fruit.word, fruit.reading)}</span>
        <span class="fruit-quick-meaning">${escapeHTML(fruit.meaning)}</span>
      `;
      grid.appendChild(button);
    });
    section.append(heading, grid);
    return section;
  }

  function renderFruitCategoryGrid() {
    const section = document.createElement("section");
    section.className = "fruit-home-section";
    const heading = document.createElement("h2");
    heading.className = "fruit-section-title";
    heading.textContent = "按类型查看";
    const grid = document.createElement("div");
    grid.className = "fruit-category-grid";
    fruitAssociationData.categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "fruit-category-card";
      button.dataset.fruitCategoryId = category.id;
      button.setAttribute("aria-label", `打开水果分类：${category.title}`);
      button.innerHTML = `
        <span class="fruit-category-title" lang="ja">${renderRubyText(category.title, category.reading)}</span>
        <span class="fruit-category-meaning">${escapeHTML(category.meaning)}</span>
        <span class="fruit-category-count">${category.fruitIds.length} 种</span>
        <span class="fruit-category-open" aria-hidden="true">＋</span>
      `;
      grid.appendChild(button);
    });
    section.append(heading, grid);
    return section;
  }

  function renderFruitCommonEntry() {
    const section = document.createElement("section");
    section.className = "fruit-home-section fruit-common-entry-section";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "fruit-common-entry";
    button.dataset.fruitView = "common";
    button.setAttribute("aria-label", "打开水果常用表达");
    button.innerHTML = `
      <span>
        <strong>常用表达</strong>
        <small>购买 · 吃水果 · 味道与状态</small>
      </span>
      <span aria-hidden="true">→</span>
    `;
    section.appendChild(button);
    return section;
  }

  function renderBodyAssociationLanding(query) {
    const match = query ? findBodyAssociationMatch(query) : null;
    const matchingSections = query
      ? activeTheme.sections.filter((section) => match?.section?.id === section.id)
      : activeTheme.sections;
    const hasResult = matchingSections.length > 0;
    const wrapper = document.createElement("div");
    wrapper.className = "body-association-stage-inner";

    matchingSections.forEach((section) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `body-association-stage-card${query && match?.section?.id === section.id ? " is-match" : ""}`;
      button.dataset.bodySectionId = section.id;
      button.setAttribute("aria-label", `打开${section.meaning}联想浮窗`);
      button.innerHTML = `
        <span class="body-association-stage-word" lang="ja">${renderRubyText(section.title, section.reading)}</span>
        <span class="body-association-stage-meaning">${escapeHTML(section.meaning)}</span>
        <span class="body-association-stage-open" aria-hidden="true">＋</span>
      `;
      button.addEventListener("click", () => window.AppRouter.navigate({
        theme: "body-association",
        section: section.id
      }));
      wrapper.appendChild(button);
    });

    if (!query && hasResult) {
      const note = document.createElement("p");
      note.className = "body-association-stage-note";
      note.textContent = "已完成头部、上肢、躯干、下肢、身体内部与全身状态的日常联想。";
      wrapper.appendChild(note);
    }

    elements.branchList.className = "body-association-stage";
    elements.branchList.replaceChildren(wrapper);
    elements.emptyState.hidden = hasResult;
    elements.resultCount.textContent = query
      ? hasResult ? `找到 ${matchingSections.length} 个人体联想 · 点击查看` : "没有找到人体联想"
      : `本阶段开放 ${activeTheme.sections.length} 个主题`;
  }

  function renderCategoryCards(query) {
    const matchingCategories = activeTheme.categories.filter((category) =>
      categoryMatches(category, query)
    );
    const fragment = document.createDocumentFragment();

    matchingCategories.forEach((category) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "category-card";
      card.dataset.categoryId = category.id;
      card.setAttribute("aria-label", `打开${category.japanese}分类浮窗`);
      card.innerHTML = `
        <span class="category-japanese" lang="ja">${renderRubyText(category.japanese, category.kana)}</span>
        <span class="category-chinese">${escapeHTML(category.chinese)}</span>
        <span class="category-open" aria-hidden="true">＋</span>
      `;
      card.addEventListener("click", () => window.AppRouter.navigate({
        theme: activeTheme.id,
        category: category.id
      }));
      fragment.appendChild(card);
    });

    elements.branchList.className = "category-grid";
    elements.branchList.replaceChildren(fragment);
    elements.emptyState.hidden = matchingCategories.length !== 0;
    elements.resultCount.textContent = query
      ? `找到 ${matchingCategories.length} 个相关分类 · 点击查看`
      : `共 ${matchingCategories.length} 个分类 · 点击方块查看表格`;
  }

  function renderBranches(query) {
    const fragment = document.createDocumentFragment();
    let matchCount = 0;

    activeTheme.branches.forEach((branch) => {
      const matchingWords = branch.words.filter((word) => wordMatches(word, query));
      if (matchingWords.length === 0) return;

      matchCount += matchingWords.length;
      const section = document.createElement("section");
      section.className = "branch";
      section.setAttribute("aria-labelledby", `branch-${branch.id}`);

      const header = document.createElement("div");
      header.className = "branch-header";
      header.innerHTML = `
        <span class="branch-dot" aria-hidden="true"></span>
        <h2 id="branch-${branch.id}">${branch.name}</h2>
        <span class="branch-line" aria-hidden="true"></span>
      `;

      const wordList = document.createElement("div");
      wordList.className = "word-list";
      matchingWords.forEach((word) => {
        const originalIndex = branch.words.indexOf(word);
        wordList.appendChild(
          word.displayType === "encyclopedia"
            ? createEncyclopediaEntry(word, query)
            : createWordCard(word, `${branch.id}-${originalIndex}`, query)
        );
      });

      section.append(header, wordList);
      fragment.appendChild(section);
    });

    elements.branchList.className = "branch-list";
    elements.branchList.replaceChildren(fragment);
    elements.emptyState.hidden = matchCount !== 0;
    elements.resultCount.textContent = query
      ? `找到 ${matchCount} 组联想`
      : `共 ${matchCount} 个词根 · 点击展开联想说法`;
  }

  function createEncyclopediaEntry(word, query) {
    const display = getWordDisplay(word);
    const card = document.createElement("article");
    card.className = `word-card word-card--encyclopedia${query ? " is-match" : ""}`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "encyclopedia-entry";
    button.setAttribute("aria-label", `打开人体百科：${display.japanese}`);
    button.innerHTML = `
      <span class="word-japanese" lang="ja">${renderRubyText(display.japanese, display.kana)}</span>
      <span class="word-chinese">${escapeHTML(display.chinese)}</span>
      <span class="category-open" aria-hidden="true">＋</span>
    `;
    button.addEventListener("click", () => window.AppRouter.navigate({
      theme: "body",
      item: "head-encyclopedia"
    }));
    card.appendChild(button);
    return card;
  }

  function showModal(focusClose = true) {
    if (elements.modalBackdrop.hidden) lastFocusedElement = document.activeElement;
    elements.modalBackdrop.hidden = false;
    document.body.classList.add("modal-open");
    if (focusClose) elements.modalCloseButton.focus();
  }

  function openCategoryModal(category, query) {
    elements.categoryModal.classList.remove("modal-sheet--encyclopedia");
    elements.categoryModal.classList.remove("modal-sheet--body-association");
    elements.categoryModal.classList.remove("modal-sheet--counter");
    elements.categoryModal.classList.remove("modal-sheet--fruit");
    elements.modalKana.lang = "ja";
    elements.modalKana.textContent = "";
    elements.modalTitle.innerHTML = renderRubyText(category.japanese, category.kana);
    elements.modalChinese.textContent = category.chinese;

    const fragment = document.createDocumentFragment();
    category.sections.forEach((section) => {
      fragment.appendChild(createModalSection(section, query));
    });
    elements.modalContent.replaceChildren(fragment);
    showModal();

    const firstMatch = elements.modalContent.querySelector(".is-match");
    if (firstMatch) firstMatch.scrollIntoView({ block: "center" });
  }

  function createModalSection(section, query) {
    const sectionElement = document.createElement("section");
    sectionElement.className = `modal-section modal-section--${section.type}`;

    if (section.title) {
      const title = document.createElement("h3");
      title.textContent = section.title;
      sectionElement.appendChild(title);
    }

    if (section.type === "calendar") {
      sectionElement.appendChild(createCalendar(section, query));
      return sectionElement;
    }

    const grid = document.createElement("div");
    grid.className = `modal-grid modal-grid--${section.type}${section.compact ? " is-compact" : ""}`;
    grid.style.setProperty("--grid-columns", section.columns || 2);
    grid.style.setProperty("--mobile-columns", section.mobileColumns || 2);
    section.items.forEach((item) => grid.appendChild(createModalCell(item, query)));
    sectionElement.appendChild(grid);
    return sectionElement;
  }

  function createModalCell(item, query, extraClass = "") {
    const cell = document.createElement("div");
    const matched = query && itemMatches(item, query);
    cell.className = `modal-cell${extraClass ? ` ${extraClass}` : ""}${matched ? " is-match" : ""}`;
    cell.innerHTML = `
      <span class="modal-cell-japanese" lang="ja">${renderRubyText(item.japanese, item.kana)}</span>
      <span class="modal-cell-chinese">${escapeHTML(item.chinese)}</span>
    `;
    return cell;
  }

  function createCalendar(section, query) {
    const scroller = document.createElement("div");
    scroller.className = "calendar-scroll";
    const calendar = document.createElement("div");
    calendar.className = "calendar-grid";

    section.weekdays.forEach((weekday) => {
      const header = document.createElement("div");
      header.className = "calendar-weekday";
      header.lang = "ja";
      header.textContent = weekday;
      calendar.appendChild(header);
    });

    section.items.forEach((item) => {
      const cell = createModalCell(item, query, "calendar-day");
      const chinese = cell.querySelector(".modal-cell-chinese");
      if (chinese) chinese.remove();
      calendar.appendChild(cell);
    });

    scroller.appendChild(calendar);
    return scroller;
  }

  function openCounterModal(categoryId, counterId = "", query = "") {
    const category = getCounterCategory(categoryId);
    const counter = getCounterById(counterId);
    if (!category || (counterId && !counter)) return;

    elements.categoryModal.classList.remove("modal-sheet--encyclopedia");
    elements.categoryModal.classList.remove("modal-sheet--body-association");
    elements.categoryModal.classList.remove("modal-sheet--fruit");
    elements.categoryModal.classList.add("modal-sheet--counter");
    elements.modalKana.lang = "zh-CN";
    elements.modalKana.textContent = "常用量词";
    elements.modalTitle.innerHTML = renderRubyText(counterAssociationData.japaneseTitle, counterAssociationData.reading);
    elements.modalChinese.textContent = counterAssociationData.meaning;
    renderCounterModal(category, counter, query);
    showModal(false);
    elements.categoryModal.focus({ preventScroll: true });
    highlightCounterMatch(query);
  }

  function renderCounterModal(category, counter, query = "") {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(renderCounterBreadcrumb(category, counter));

    if (!counter) {
      const overview = document.createElement("section");
      overview.className = "counter-modal-overview";
      const heading = document.createElement("div");
      heading.className = "counter-detail-heading";
      heading.innerHTML = `
        <h3 lang="ja">${renderRubyText(category.title, category.reading)}</h3>
        <p>${escapeHTML(category.meaning)}</p>
      `;
      const grid = document.createElement("div");
      grid.className = "counter-modal-counter-grid";
      category.counterIds.forEach((counterId) => {
        const item = getCounterById(counterId);
        if (!item) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `counter-modal-counter-card${query && normalize(counterSearchText(item)).includes(normalize(query)) ? " is-match" : ""}`;
        button.dataset.counterId = item.id;
        button.dataset.counterCategoryId = category.id;
        button.setAttribute("aria-label", `查看量词${item.counter}详情`);
        button.innerHTML = `
          <span class="counter-modal-counter-word" lang="ja">${renderRubyText(item.counter, item.reading)}</span>
          <span class="counter-modal-counter-meaning">${escapeHTML(item.meaning)}</span>
          <span class="counter-modal-counter-open" aria-hidden="true">→</span>
        `;
        grid.appendChild(button);
      });
      overview.append(heading, grid);
      fragment.appendChild(overview);
      elements.modalContent.replaceChildren(fragment);
      return;
    }

    const heading = document.createElement("div");
    heading.className = "counter-detail-heading counter-detail-heading--counter";
    heading.innerHTML = `
      <h3 lang="ja">${renderRubyText(counter.counter, counter.reading)}</h3>
      <p>${escapeHTML(counter.usage)}</p>
    `;
    fragment.appendChild(heading);
    fragment.appendChild(renderCounterObjectGrid(counter, query));
    fragment.appendChild(renderCounterNumberGrid(counter, query));
    const question = renderCounterQuestion(counter, query);
    if (question) fragment.appendChild(question);
    const examples = renderCounterExamples(counter, query);
    if (examples) fragment.appendChild(examples);
    if (counter.tip) {
      const tip = document.createElement("p");
      tip.className = "counter-tip";
      tip.textContent = counter.tip;
      fragment.appendChild(tip);
    }
    elements.modalContent.replaceChildren(fragment);
  }

  function renderCounterBreadcrumb(category, counter) {
    const scroller = document.createElement("div");
    scroller.className = "counter-breadcrumb-scroll";
    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "counter-breadcrumb";
    breadcrumb.setAttribute("aria-label", "数量与量词位置");

    const root = document.createElement("button");
    root.type = "button";
    root.dataset.counterView = "root";
    root.textContent = counterAssociationData.meaning;
    breadcrumb.appendChild(root);

    const separator = () => {
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.textContent = "›";
      return span;
    };

    breadcrumb.appendChild(separator());
    if (counter) {
      const categoryButton = document.createElement("button");
      categoryButton.type = "button";
      categoryButton.dataset.counterView = "category";
      categoryButton.dataset.counterCategoryId = category.id;
      categoryButton.innerHTML = renderRubyText(category.title, category.reading);
      breadcrumb.append(categoryButton, separator());
      const current = document.createElement("strong");
      current.lang = "ja";
      current.innerHTML = renderRubyText(counter.counter, counter.reading);
      breadcrumb.appendChild(current);
    } else {
      const current = document.createElement("strong");
      current.lang = "ja";
      current.innerHTML = renderRubyText(category.title, category.reading);
      breadcrumb.appendChild(current);
    }

    scroller.appendChild(breadcrumb);
    return scroller;
  }

  function createCounterSection(titleText, className) {
    const section = document.createElement("section");
    section.className = `counter-detail-section ${className}`;
    const title = document.createElement("h4");
    title.textContent = titleText;
    section.appendChild(title);
    return section;
  }

  function renderCounterObjectGrid(counter, query) {
    const section = createCounterSection("用来数什么", "counter-objects");
    const grid = document.createElement("div");
    grid.className = "counter-object-grid";
    const normalizedQuery = normalize(query);
    (counter.objects || []).forEach((object) => {
      const matched = Boolean(normalizedQuery && itemMatches(object, normalizedQuery));
      const button = document.createElement("button");
      button.type = "button";
      button.className = `counter-object-card${matched ? " is-match" : ""}`;
      button.dataset.counterObject = object.word;
      button.innerHTML = `
        <span class="counter-object-word" lang="ja">${renderRubyText(object.word, object.reading)}</span>
        <span class="counter-object-meaning">${escapeHTML(object.meaning)}</span>
      `;
      grid.appendChild(button);
    });
    section.appendChild(grid);
    return section;
  }

  function renderCounterNumberGrid(counter, query) {
    const section = createCounterSection("数量表", "counter-numbers");
    const grid = document.createElement("div");
    grid.className = "counter-number-grid";
    const normalizedQuery = normalize(query);
    (counter.counts || []).forEach((count) => {
      const matched = Boolean(normalizedQuery && itemMatches(count, normalizedQuery));
      const card = document.createElement("article");
      card.className = `counter-count-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <span class="counter-count-word" lang="ja">${renderRubyText(count.text, count.reading)}</span>
        ${count.irregular ? '<span class="counter-irregular-tag">音变</span>' : ""}
      `;
      grid.appendChild(card);
    });
    section.appendChild(grid);

    if (counter.specialCounts?.length) {
      const specialTitle = document.createElement("h5");
      specialTitle.className = "counter-special-title";
      specialTitle.textContent = "特殊读法";
      const specialGrid = document.createElement("div");
      specialGrid.className = "counter-special-grid";
      counter.specialCounts.forEach((count) => {
        const matched = Boolean(normalizedQuery && itemMatches(count, normalizedQuery));
        const card = document.createElement("article");
        card.className = `counter-count-card counter-count-card--special${matched ? " is-match" : ""}`;
        card.innerHTML = `
          <span class="counter-count-word" lang="ja">${renderRubyText(count.text, count.reading)}</span>
          <span class="counter-count-meaning">${escapeHTML(count.meaning || "")}</span>
          <span class="counter-irregular-tag">特殊</span>
        `;
        specialGrid.appendChild(card);
      });
      section.append(specialTitle, specialGrid);
    }
    return section;
  }

  function renderCounterQuestion(counter, query) {
    const questions = counter.questions || (counter.question ? [counter.question] : []);
    if (!questions.length) return null;
    const section = createCounterSection("提问形式", "counter-questions");
    const list = document.createElement("div");
    list.className = "counter-question-list";
    const normalizedQuery = normalize(query);

    questions.forEach((question) => {
      const matched = Boolean(normalizedQuery && itemMatches(question, normalizedQuery));
      const card = document.createElement("article");
      card.className = `counter-question-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <div class="counter-question-main">
          <span class="counter-question-word" lang="ja">${renderRubyText(question.text, question.reading)}</span>
          <span class="counter-question-meaning">${escapeHTML(question.meaning)}</span>
        </div>
        ${question.example ? `
          <p class="counter-question-example" lang="ja">${renderRubyText(question.example, "", question.segments)}</p>
          <p class="counter-question-translation">${escapeHTML(question.exampleMeaning || "")}</p>
        ` : ""}
      `;
      list.appendChild(card);
    });
    section.appendChild(list);
    return section;
  }

  function renderCounterExamples(counter, query) {
    if (!counter.examples?.length) return null;
    const section = createCounterSection("日常例句", "counter-examples");
    const list = document.createElement("div");
    list.className = "counter-example-list";
    const normalizedQuery = normalize(query);
    counter.examples.forEach((example) => {
      const matched = Boolean(normalizedQuery && itemMatches(example, normalizedQuery));
      const card = document.createElement("article");
      card.className = `counter-example-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <p class="counter-example-sentence" lang="ja">${renderRubyText(example.text, example.reading, example.segments)}</p>
        <p class="counter-example-translation">${escapeHTML(example.meaning)}</p>
      `;
      list.appendChild(card);
    });
    section.appendChild(list);
    return section;
  }

  function highlightCounterMatch(query) {
    if (!query) return;
    requestAnimationFrame(() => {
      const match = elements.modalContent.querySelector(
        ".counter-object-card.is-match, .counter-count-card.is-match, .counter-question-card.is-match, .counter-example-card.is-match, .counter-modal-counter-card.is-match"
      );
      if (!match) return;
      match.classList.add("search-highlight");
      match.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => match.classList.remove("search-highlight"), 1800);
    });
  }

  function openFruitModal(categoryId = "", fruitId = "", query = "", view = "") {
    const category = categoryId ? getFruitCategory(categoryId) : null;
    const fruit = fruitId ? getFruitById(fruitId) : null;
    if (view !== "common" && (!category || (fruitId && !fruit))) return;

    elements.categoryModal.classList.remove("modal-sheet--encyclopedia");
    elements.categoryModal.classList.remove("modal-sheet--body-association");
    elements.categoryModal.classList.remove("modal-sheet--counter");
    elements.categoryModal.classList.add("modal-sheet--fruit");
    elements.modalKana.lang = "zh-CN";
    elements.modalKana.textContent = "水果联想";
    elements.modalTitle.innerHTML = renderRubyText(fruitAssociationData.japaneseTitle, fruitAssociationData.reading);
    elements.modalChinese.textContent = fruitAssociationData.meaning;
    renderFruitModal(category, fruit, query, view);
    showModal(false);
    elements.categoryModal.focus({ preventScroll: true });
    highlightFruitMatch(query);
  }

  function renderFruitModal(category, fruit, query = "", view = "") {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(renderFruitBreadcrumb(category, fruit, view));

    if (view === "common") {
      fragment.appendChild(renderFruitCommonExpressions(query));
      elements.modalContent.replaceChildren(fragment);
      return;
    }

    if (!fruit) {
      const heading = document.createElement("div");
      heading.className = "fruit-detail-heading";
      heading.innerHTML = `
        <h3 lang="ja">${renderRubyText(category.title, category.reading)}</h3>
        <p>${escapeHTML(category.meaning)}</p>
      `;
      const grid = document.createElement("div");
      grid.className = "fruit-modal-fruit-grid";
      category.fruitIds.forEach((fruitId) => {
        const item = getFruitById(fruitId);
        if (!item) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `fruit-modal-fruit-card${query && normalize(fruitSearchText(item)).includes(normalize(query)) ? " is-match" : ""}`;
        button.dataset.fruitId = item.id;
        button.dataset.fruitCategoryId = category.id;
        button.setAttribute("aria-label", `查看水果${item.word}详情`);
        button.innerHTML = `
          <span class="fruit-modal-fruit-word" lang="ja">${renderRubyText(item.word, item.reading)}</span>
          <span class="fruit-modal-fruit-meaning">${escapeHTML(item.meaning)}</span>
          <span class="fruit-modal-fruit-open" aria-hidden="true">→</span>
        `;
        grid.appendChild(button);
      });
      fragment.append(heading, grid);
      elements.modalContent.replaceChildren(fragment);
      return;
    }

    const heading = document.createElement("div");
    heading.className = "fruit-detail-heading fruit-detail-heading--fruit";
    heading.innerHTML = `
      <h3 lang="ja">${renderRubyText(fruit.word, fruit.reading)}</h3>
      <p>${escapeHTML(fruit.meaning)}</p>
      ${(fruit.tags || []).length ? `<div class="fruit-tag-list">${fruit.tags.slice(0, 2).map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div>` : ""}
    `;
    fragment.appendChild(heading);

    const parts = renderFruitItemGrid("外观与组成", "fruit-parts", fruit.parts, query);
    const tastes = renderFruitItemGrid("味道与状态", "fruit-tastes", fruit.tastes, query);
    const actions = renderFruitItemGrid("常用动作", "fruit-actions", fruit.actions, query);
    const counters = renderFruitCounters(fruit, query);
    const examples = renderFruitExamples(fruit, query);
    if (parts) fragment.appendChild(parts);
    if (tastes) fragment.appendChild(tastes);
    if (actions) fragment.appendChild(actions);
    if (counters) fragment.appendChild(counters);
    if (examples) fragment.appendChild(examples);
    if (fruit.tip) {
      const tip = document.createElement("p");
      tip.className = "fruit-tip";
      tip.textContent = fruit.tip;
      fragment.appendChild(tip);
    }
    elements.modalContent.replaceChildren(fragment);
  }

  function renderFruitBreadcrumb(category, fruit, view) {
    const scroller = document.createElement("div");
    scroller.className = "fruit-breadcrumb-scroll";
    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "fruit-breadcrumb";
    breadcrumb.setAttribute("aria-label", "水果联想位置");

    const root = document.createElement("button");
    root.type = "button";
    root.dataset.fruitView = "root";
    root.textContent = fruitAssociationData.meaning;
    breadcrumb.appendChild(root);

    const separator = () => {
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.textContent = "›";
      return span;
    };
    breadcrumb.appendChild(separator());

    if (view === "common") {
      const current = document.createElement("strong");
      current.textContent = "常用表达";
      breadcrumb.appendChild(current);
    } else if (fruit) {
      const categoryButton = document.createElement("button");
      categoryButton.type = "button";
      categoryButton.dataset.fruitView = "category";
      categoryButton.dataset.fruitCategoryId = category.id;
      categoryButton.innerHTML = renderRubyText(category.title, category.reading);
      const current = document.createElement("strong");
      current.lang = "ja";
      current.innerHTML = renderRubyText(fruit.word, fruit.reading);
      breadcrumb.append(categoryButton, separator(), current);
    } else {
      const current = document.createElement("strong");
      current.lang = "ja";
      current.innerHTML = renderRubyText(category.title, category.reading);
      breadcrumb.appendChild(current);
    }

    scroller.appendChild(breadcrumb);
    return scroller;
  }

  function createFruitSection(titleText, className) {
    const section = document.createElement("section");
    section.className = `fruit-detail-section ${className}`;
    const title = document.createElement("h4");
    title.textContent = titleText;
    section.appendChild(title);
    return section;
  }

  function renderFruitItemGrid(titleText, className, items = [], query = "") {
    if (!items?.length) return null;
    const section = createFruitSection(titleText, className);
    const grid = document.createElement("div");
    grid.className = "fruit-item-grid";
    const normalizedQuery = normalize(query);
    items.forEach((item) => {
      const matched = Boolean(normalizedQuery && itemMatches(item, normalizedQuery));
      const card = document.createElement("article");
      card.className = `fruit-detail-item-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <span class="fruit-detail-item-word" lang="ja">${renderRubyText(item.word, item.reading, item.segments)}</span>
        <span class="fruit-detail-item-meaning">${escapeHTML(item.meaning)}</span>
      `;
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function renderFruitCounters(fruit, query = "") {
    if (!fruit.counters?.length) return null;
    const section = createFruitSection("常用数量表达", "fruit-counters");
    const grid = document.createElement("div");
    grid.className = "fruit-counter-grid";
    const normalizedQuery = normalize(query);
    fruit.counters.forEach((counter) => {
      const matched = Boolean(normalizedQuery && itemMatches(counter, normalizedQuery));
      const card = document.createElement("article");
      card.className = `fruit-counter-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <span class="fruit-counter-word" lang="ja">${renderRubyText(counter.text, counter.reading, counter.segments)}</span>
        <span class="fruit-counter-meaning">${escapeHTML(counter.meaning)}</span>
      `;
      const linkedCounter = counter.counterId ? getCounterById(counter.counterId) : null;
      if (linkedCounter) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "fruit-counter-link";
        button.dataset.fruitCounterLink = linkedCounter.id;
        button.dataset.counterCategoryId = linkedCounter.categoryId;
        button.textContent = `查看「${linkedCounter.counter}」`;
        card.appendChild(button);
      }
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function renderFruitExamples(fruit, query = "") {
    if (!fruit.examples?.length) return null;
    const section = createFruitSection("日常例句", "fruit-examples");
    const list = document.createElement("div");
    list.className = "fruit-example-list";
    const normalizedQuery = normalize(query);
    fruit.examples.forEach((example) => {
      const matched = Boolean(normalizedQuery && itemMatches(example, normalizedQuery));
      const card = document.createElement("article");
      card.className = `fruit-example-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <p class="fruit-example-sentence" lang="ja">${renderRubyText(example.text, example.reading, example.segments)}</p>
        <p class="fruit-example-translation">${escapeHTML(example.meaning)}</p>
      `;
      list.appendChild(card);
    });
    section.appendChild(list);
    return section;
  }

  function renderFruitCommonExpressions(query = "") {
    const wrapper = document.createElement("section");
    wrapper.className = "fruit-common-expressions";
    const heading = document.createElement("div");
    heading.className = "fruit-detail-heading";
    heading.innerHTML = "<h3>常用表达</h3><p>购买、处理和描述水果时直接使用</p>";
    wrapper.appendChild(heading);
    const normalizedQuery = normalize(query);

    (fruitAssociationData.commonExpressions || []).forEach((group) => {
      const section = createFruitSection(group.meaning, "fruit-common-group");
      const list = document.createElement("div");
      list.className = "fruit-common-expression-list";
      (group.items || []).forEach((item) => {
        const matched = Boolean(normalizedQuery && itemMatches(item, normalizedQuery));
        const card = document.createElement("article");
        card.className = `fruit-common-expression-card${matched ? " is-match" : ""}`;
        card.innerHTML = `
          <p class="fruit-common-expression-text" lang="ja">${renderRubyText(item.text, item.reading, item.segments)}</p>
          <p class="fruit-common-expression-meaning">${escapeHTML(item.meaning)}</p>
        `;
        list.appendChild(card);
      });
      section.appendChild(list);
      wrapper.appendChild(section);
    });
    return wrapper;
  }

  function highlightFruitMatch(query) {
    if (!query) return;
    requestAnimationFrame(() => {
      const match = elements.modalContent.querySelector(
        ".fruit-detail-item-card.is-match, .fruit-counter-card.is-match, .fruit-example-card.is-match, .fruit-common-expression-card.is-match, .fruit-modal-fruit-card.is-match"
      );
      if (!match) return;
      match.classList.add("search-highlight");
      match.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => match.classList.remove("search-highlight"), 1800);
    });
  }

  function openBodyAssociationModal(section, categoryId = "", query = "") {
    elements.categoryModal.classList.remove("modal-sheet--encyclopedia");
    elements.categoryModal.classList.remove("modal-sheet--counter");
    elements.categoryModal.classList.remove("modal-sheet--fruit");
    elements.categoryModal.classList.add("modal-sheet--body-association");
    elements.modalKana.lang = "zh-CN";
    elements.modalKana.textContent = "人体联想";
    elements.modalTitle.innerHTML = renderRubyText(section.title, section.reading);
    elements.modalChinese.textContent = section.meaning;

    renderBodyAssociationModal(section, categoryId, query);
    showModal(false);
    elements.categoryModal.focus({ preventScroll: true });
    highlightBodyAssociationMatch(query);
  }

  function renderBodyAssociationModal(section, categoryId, query) {
    const category = section.categories.find((item) => item.id === categoryId);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createBodyAssociationBreadcrumb(section, category));

    if (!category) {
      const overview = document.createElement("section");
      overview.className = "body-association-overview";
      const title = document.createElement("h3");
      title.textContent = `${section.meaning}联想`;
      const grid = document.createElement("div");
      grid.className = "body-association-category-grid";

      section.categories.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `body-association-category-card${query && itemMatches(item, normalize(query)) ? " is-match" : ""}`;
        button.dataset.bodyCategoryId = item.id;
        button.setAttribute("aria-label", `查看人体联想：${item.meaning}`);
        button.innerHTML = `
          <span class="body-association-category-word" lang="ja">${renderRubyText(item.title, item.reading)}</span>
          <span class="body-association-category-meaning">${escapeHTML(item.meaning)}</span>
          <span class="body-association-category-arrow" aria-hidden="true">→</span>
        `;
        button.addEventListener("click", () => window.AppRouter.navigate({
          theme: "body-association",
          section: section.id,
          category: item.id
        }));
        grid.appendChild(button);
      });

      overview.append(title, grid);
      fragment.appendChild(overview);
      elements.modalContent.replaceChildren(fragment);
      return;
    }

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "body-association-back";
    backButton.innerHTML = `<span aria-hidden="true">←</span><span>返回${escapeHTML(section.meaning)}总览</span>`;
    backButton.addEventListener("click", () => window.AppRouter.back());
    fragment.appendChild(backButton);

    const heading = document.createElement("div");
    heading.className = "body-association-detail-heading";
    heading.innerHTML = `
      <h3 lang="ja">${renderRubyText(category.title, category.reading)}</h3>
      <p>${escapeHTML(category.meaning)}</p>
    `;
    fragment.appendChild(heading);

    const vocabulary = createBodyAssociationVocabulary(category, query);
    const expressions = createBodyAssociationExpressions(category, query);
    const examples = createBodyAssociationExamples(category, query);

    if (category.compactVocabulary || category.examples?.length) {
      fragment.append(vocabulary, expressions);
      if (category.tip) fragment.appendChild(createBodyAssociationTip(category.tip));
      if (examples) fragment.appendChild(examples);
    } else {
      // 保持既有“頭・顔”主题的显示顺序和展开方式不变。
      fragment.append(expressions, vocabulary);
    }
    elements.modalContent.replaceChildren(fragment);
  }

  function createBodyAssociationBreadcrumb(section, category) {
    const scroller = document.createElement("div");
    scroller.className = "body-association-breadcrumb-scroll";
    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "body-association-breadcrumb";
    breadcrumb.setAttribute("aria-label", "人体联想位置");
    breadcrumb.innerHTML = `
      <span lang="ja">${renderRubyText("人体联想", bodyAssociationData.reading)}</span>
      <span aria-hidden="true">›</span>
      <span lang="ja">${renderRubyText(section.title, section.reading)}</span>
      ${category ? `<span aria-hidden="true">›</span><strong lang="ja">${renderRubyText(category.title, category.reading)}</strong>` : ""}
    `;
    scroller.appendChild(breadcrumb);
    return scroller;
  }

  function createBodyAssociationExpressions(category, query) {
    const section = document.createElement("section");
    section.className = "body-association-expressions";
    const title = document.createElement("h4");
    title.textContent = "常用表达";
    const grid = document.createElement("div");
    grid.className = "body-association-expression-grid";
    const normalizedQuery = normalize(query);

    getBodyAssociationExpressions(category).forEach((expression) => {
      const matched = Boolean(normalizedQuery && itemMatches(expression, normalizedQuery));
      const card = document.createElement("div");
      card.className = `body-association-expression-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <span class="body-association-expression-text" lang="ja">${renderRubyText(expression.text, expression.reading, expression.segments)}</span>
        <span class="body-association-expression-meaning">${escapeHTML(expression.meaning)}</span>
      `;
      grid.appendChild(card);
    });

    section.append(title, grid);
    return section;
  }

  function createBodyAssociationVocabulary(category, query) {
    const section = document.createElement("section");
    section.className = "body-association-vocabulary";
    const title = document.createElement("h4");
    title.textContent = "日常词汇";
    section.appendChild(title);

    const groups = category.vocabularyGroups?.length
      ? category.vocabularyGroups
      : [{ title: "", items: category.items || [] }];

    groups.forEach((group) => {
      if (group.title) {
        const groupTitle = document.createElement("h5");
        groupTitle.className = "body-association-vocabulary-group-title";
        groupTitle.textContent = group.title;
        section.appendChild(groupTitle);
      }

      const grid = document.createElement("div");
      grid.className = "body-association-word-grid";
      (group.items || []).forEach((item, index) => {
        grid.appendChild(
          category.compactVocabulary
            ? createBodyAssociationCompactWordCard(item, query)
            : createBodyAssociationWordCard(item, category.id, index, query)
        );
      });
      section.appendChild(grid);
    });

    return section;
  }

  function createBodyAssociationCompactWordCard(item, query) {
    const matched = Boolean(query && itemMatches(item, normalize(query)));
    const card = document.createElement("article");
    card.className = `body-association-word-card body-association-word-card--compact${matched ? " is-match" : ""}`;
    card.innerHTML = `
      <span class="body-association-word" lang="ja">${renderRubyText(item.word, item.reading, item.segments)}</span>
      <span class="body-association-meaning">${escapeHTML(item.meaning)}</span>
    `;
    return card;
  }

  function createBodyAssociationExamples(category, query) {
    if (!category.examples?.length) return null;
    const section = document.createElement("section");
    section.className = "body-association-examples";
    const title = document.createElement("h4");
    title.textContent = "例句";
    const list = document.createElement("div");
    list.className = "body-association-example-list";

    category.examples.forEach((example) => {
      const matched = Boolean(query && itemMatches(example, normalize(query)));
      const card = document.createElement("article");
      card.className = `body-association-example-card${matched ? " is-match" : ""}`;
      card.innerHTML = `
        <p class="body-association-example-sentence" lang="ja">${renderRubyText(example.text, example.reading, example.segments)}</p>
        <p class="body-association-example-translation">${escapeHTML(example.meaning)}</p>
      `;
      list.appendChild(card);
    });

    section.append(title, list);
    return section;
  }

  function createBodyAssociationTip(text) {
    const tip = document.createElement("p");
    tip.className = "body-association-tip";
    tip.textContent = text;
    return tip;
  }

  function createBodyAssociationWordCard(item, categoryId, index, query) {
    const id = `body-association-${categoryId}-${item.id || index}`;
    const matched = Boolean(query && itemMatches(item, normalize(query)));
    const card = document.createElement("article");
    card.className = `body-association-word-card${matched ? " is-match" : ""}`;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "body-association-word-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", `${id}-detail`);
    toggle.innerHTML = `
      <span class="body-association-word" lang="ja">${renderRubyText(item.word, item.reading)}</span>
      <span class="body-association-meaning">${escapeHTML(item.meaning)}</span>
      <span class="body-association-expand" aria-hidden="true"></span>
    `;

    const detail = document.createElement("div");
    detail.id = `${id}-detail`;
    detail.className = "body-association-card-detail";
    detail.innerHTML = `
      <div class="body-association-card-detail-inner">
        <p class="body-association-detail-label">说明</p>
        <p class="body-association-description">${escapeHTML(item.description)}</p>
        <p class="body-association-detail-label">常见搭配</p>
        <div class="body-association-collocations">
          ${(item.collocations || []).map((entry) => `<span lang="ja">${escapeHTML(entry)}</span>`).join("")}
        </div>
        <p class="body-association-detail-label">例句</p>
        <p class="body-association-example" lang="ja">${renderRubyText(item.example, item.exampleReading)}</p>
        <p class="body-association-translation">${escapeHTML(item.translation)}</p>
      </div>
    `;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
    });
    card.append(toggle, detail);
    return card;
  }

  function highlightBodyAssociationMatch(query) {
    if (!query) return;
    requestAnimationFrame(() => {
      const match = elements.modalContent.querySelector(".body-association-expression-card.is-match, .body-association-word-card.is-match, .body-association-example-card.is-match, .body-association-category-card.is-match");
      if (!match) return;
      match.classList.add("search-highlight");
      match.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => match.classList.remove("search-highlight"), 1800);
    });
  }

  function openEncyclopediaModal(word, categoryId = "", query = "") {
    const display = getWordDisplay(word);
    elements.categoryModal.classList.remove("modal-sheet--body-association");
    elements.categoryModal.classList.remove("modal-sheet--counter");
    elements.categoryModal.classList.remove("modal-sheet--fruit");
    elements.categoryModal.classList.add("modal-sheet--encyclopedia");
    elements.modalKana.lang = "zh-CN";
    elements.modalKana.textContent = "人体百科";
    elements.modalTitle.innerHTML = renderRubyText(display.japanese, display.kana);
    elements.modalChinese.textContent = display.chinese;
    renderEncyclopedia(word, categoryId, query);
    showModal(false);
    elements.categoryModal.focus({ preventScroll: true });
    highlightEncyclopediaMatch(query);
  }

  function renderEncyclopedia(word, categoryId, query) {
    const category = (word.categories || []).find((item) => item.id === categoryId);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createBreadcrumb(word, category));

    if (!category) {
      const section = document.createElement("section");
      section.className = "encyclopedia-overview";
      const title = document.createElement("h3");
      title.textContent = "头部有什么";

      const grid = document.createElement("div");
      grid.className = "encyclopedia-category-grid";
      word.categories.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `encyclopedia-category-card${query && itemMatches(item, normalize(query)) ? " is-match" : ""}`;
        button.setAttribute("aria-label", `查看${item.meaning}`);
        button.innerHTML = `
          <span class="encyclopedia-category-title" lang="ja">${renderRubyText(item.title, item.reading)}</span>
          <span class="encyclopedia-category-meaning">${escapeHTML(item.meaning)}</span>
          <span class="encyclopedia-category-arrow" aria-hidden="true">→</span>
        `;
        button.addEventListener("click", () => window.AppRouter.navigate({
          theme: "body",
          item: "head-encyclopedia",
          category: item.id
        }));
        grid.appendChild(button);
      });

      section.append(title, grid);
      fragment.appendChild(section);
      elements.modalContent.replaceChildren(fragment);
      return;
    }

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "encyclopedia-back";
    backButton.innerHTML = `<span aria-hidden="true">←</span><span>返回头部总览</span>`;
    backButton.addEventListener("click", () => window.AppRouter.back());
    fragment.appendChild(backButton);

    const heading = document.createElement("div");
    heading.className = "encyclopedia-detail-heading";
    heading.innerHTML = `
      <h3 lang="ja">${renderRubyText(category.title, category.reading)}</h3>
      <p>${escapeHTML(category.meaning)}</p>
    `;
    fragment.appendChild(heading);

    category.groups.forEach((group, groupIndex) => {
      const section = document.createElement("section");
      section.className = "encyclopedia-group";
      const title = document.createElement("h4");
      title.textContent = group.title;
      const grid = document.createElement("div");
      grid.className = "encyclopedia-word-grid";
      group.items.forEach((item, itemIndex) => {
        grid.appendChild(createEncyclopediaWordCard(item, category.id, groupIndex, itemIndex, query));
      });
      section.append(title, grid);
      fragment.appendChild(section);
    });

    elements.modalContent.replaceChildren(fragment);
  }

  function createBreadcrumb(word, category) {
    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "encyclopedia-breadcrumb";
    breadcrumb.setAttribute("aria-label", "百科位置");
    breadcrumb.innerHTML = `
      <span>人体</span>
      <span aria-hidden="true">›</span>
      <span lang="ja">${renderRubyText(word.word, word.reading)}</span>
      ${category ? `<span aria-hidden="true">›</span><strong lang="ja">${renderRubyText(category.title, category.reading)}</strong>` : ""}
    `;
    return breadcrumb;
  }

  function createEncyclopediaWordCard(item, categoryId, groupIndex, itemIndex, query) {
    const id = `encyclopedia-${categoryId}-${groupIndex}-${itemIndex}`;
    const matched = Boolean(query && itemMatches(item, normalize(query)));
    const card = document.createElement("article");
    card.className = `encyclopedia-word-card${matched ? " is-match" : ""}`;
    card.dataset.searchText = normalize(itemText(item));

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "encyclopedia-word-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", `${id}-detail`);
    toggle.innerHTML = `
      ${item.level ? `<span class="encyclopedia-level encyclopedia-level--${item.level === "进阶" ? "advanced" : "basic"}">${escapeHTML(item.level)}</span>` : ""}
      <span class="encyclopedia-word" lang="ja">${renderRubyText(item.word, item.reading)}</span>
      <span class="encyclopedia-meaning">${escapeHTML(item.meaning)}</span>
      <span class="encyclopedia-expand" aria-hidden="true"></span>
    `;

    const detail = document.createElement("div");
    detail.id = `${id}-detail`;
    detail.className = "encyclopedia-card-detail";
    detail.innerHTML = `
      <div class="encyclopedia-card-detail-inner">
        <p class="encyclopedia-detail-label">说明</p>
        <p class="encyclopedia-description">${escapeHTML(item.description)}</p>
        <p class="encyclopedia-detail-label">例句</p>
        <p class="encyclopedia-example" lang="ja">${renderRubyText(item.example, item.exampleReading)}</p>
        <p class="encyclopedia-translation">${escapeHTML(item.translation)}</p>
      </div>
    `;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
    });
    card.append(toggle, detail);
    return card;
  }

  function highlightEncyclopediaMatch(query) {
    if (!query) return;
    requestAnimationFrame(() => {
      const firstMatch = elements.modalContent.querySelector(".encyclopedia-word-card.is-match, .encyclopedia-category-card.is-match");
      if (!firstMatch) return;
      firstMatch.classList.add("search-highlight");
      firstMatch.scrollIntoView({ block: "center", behavior: "smooth" });
      window.setTimeout(() => firstMatch.classList.remove("search-highlight"), 1800);
    });
  }

  function closeModal(restoreFocus = true) {
    if (elements.modalBackdrop.hidden) return;
    elements.modalBackdrop.hidden = true;
    document.body.classList.remove("modal-open");
    elements.categoryModal.classList.remove("modal-sheet--encyclopedia");
    elements.categoryModal.classList.remove("modal-sheet--body-association");
    elements.categoryModal.classList.remove("modal-sheet--counter");
    elements.categoryModal.classList.remove("modal-sheet--fruit");
    elements.modalContent.replaceChildren();
    if (restoreFocus && lastFocusedElement) lastFocusedElement.focus();
    lastFocusedElement = null;
  }

  function requestModalClose() {
    const route = window.AppRouter.current();
    const hasDetail = Boolean(route.section || route.category || route.item || route.view);
    if (route.theme === activeTheme?.id && hasDetail) window.AppRouter.back();
    else closeModal();
  }

  function applyRoute(route) {
    if (!route.theme) {
      showHome();
      return;
    }

    const theme = ALL_THEMES.find((item) => item.id === route.theme);
    if (!theme) {
      window.AppRouter.replace({ page: "home" }, { silent: true });
      showHome();
      return;
    }

    if (theme.id === "question-expressions" && activeTheme?.id === theme.id && window.QuestionExpressionsModule?.isActive?.()) {
      window.QuestionExpressionsModule.applyRoute(route);
      return;
    }

    if (activeTheme?.id === theme.id) closeModal(false);
    else openTheme(theme.id);
    const focus = route.focus || "";

    if (theme.id === "question-expressions") {
      window.QuestionExpressionsModule?.applyRoute(route);
      return;
    }

    if (theme.id === "quick-association") {
      window.AssociationModule?.applyRoute?.(route);
      return;
    }

    if (theme.id === "date" && route.category) {
      const category = theme.categories.find((item) => item.id === route.category);
      if (category) openCategoryModal(category, focus);
      else window.AppRouter.replace({ theme: theme.id }, { silent: true });
      return;
    }

    if (theme.id === "body-association" && route.section) {
      const section = bodyAssociationData.sections.find((item) => item.id === route.section);
      const category = section?.categories.find((item) => item.id === route.category);
      if (section && (!route.category || category)) openBodyAssociationModal(section, category?.id || "", focus);
      else window.AppRouter.replace({ theme: theme.id }, { silent: true });
      return;
    }

    if (theme.id === "counter-association" && (route.category || route.item)) {
      const counter = route.item ? getCounterById(route.item) : null;
      const categoryId = route.category || counter?.categoryId;
      const category = getCounterCategory(categoryId);
      if (category && (!route.item || counter)) openCounterModal(category.id, counter?.id || "", focus);
      else window.AppRouter.replace({ theme: theme.id }, { silent: true });
      return;
    }

    if (theme.id === "fruit-association" && (route.category || route.item || route.view)) {
      if (route.view === "common") {
        openFruitModal("", "", focus, "common");
        return;
      }
      const fruit = route.item ? getFruitById(route.item) : null;
      const categoryId = route.category || fruit?.categoryId;
      const category = getFruitCategory(categoryId);
      if (category && (!route.item || fruit)) openFruitModal(category.id, fruit?.id || "", focus);
      else window.AppRouter.replace({ theme: theme.id }, { silent: true });
      return;
    }

    if (theme.id === "body" && route.item === "head-encyclopedia") {
      const word = theme.branches.flatMap((branch) => branch.words || []).find((item) => item.displayType === "encyclopedia");
      const category = word?.categories?.find((item) => item.id === route.category);
      if (word && (!route.category || category)) openEncyclopediaModal(word, category?.id || "", focus);
      else window.AppRouter.replace({ theme: theme.id }, { silent: true });
    }
  }

  function createWordCard(word, id, query) {
    const card = document.createElement("article");
    card.className = "word-card";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "word-toggle";
    toggle.setAttribute("aria-expanded", String(Boolean(query)));
    toggle.setAttribute("aria-controls", `association-${id}`);
    toggle.innerHTML = `
      <span class="word-japanese" lang="ja">${renderRubyText(word.japanese, word.kana)}</span>
      <span class="word-chinese">${escapeHTML(word.chinese)}</span>
      <span class="expand-mark" aria-hidden="true"></span>
    `;

    const panel = document.createElement("div");
    panel.className = "association-panel";
    panel.id = `association-${id}`;
    panel.innerHTML = `
      <div class="association-inner">
        <div class="association-content">
          <p class="panel-label">联想说法</p>
          <div class="related-grid">
            ${(word.related || []).map((item) => createRelatedItem(item, query)).join("")}
          </div>
          <p class="panel-label sentence-heading">照搬着说</p>
          <div class="sentence-list">
            ${(word.sentences || []).map((item) => createSentence(item, query)).join("")}
          </div>
        </div>
      </div>
    `;

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isExpanded));
    });

    card.append(toggle, panel);
    return card;
  }

  function createRelatedItem(item, query) {
    const matched = query && itemMatches(item, query) ? " is-match" : "";
    return `
      <div class="related-item${matched}">
        <span class="related-japanese" lang="ja">${renderRubyText(item.japanese, item.kana)}</span>
        <span class="related-chinese">${escapeHTML(item.chinese)}</span>
      </div>
    `;
  }

  function createSentence(item, query) {
    const matched = query && itemMatches(item, query) ? " is-match" : "";
    return `
      <div class="sentence-item${matched}">
        <p class="sentence-japanese" lang="ja">${renderRubyText(item.japanese, item.kana)}</p>
        <p class="sentence-chinese">${escapeHTML(item.chinese)}</p>
      </div>
    `;
  }

  elements.searchInput.addEventListener("input", (event) => {
    renderActiveTheme(event.target.value);
  });

  elements.clearSearchButton.addEventListener("click", () => {
    elements.searchInput.value = "";
    renderActiveTheme("");
    elements.searchInput.focus();
  });

  elements.homeSearchInput.addEventListener("input", (event) => {
    homeSearchExpanded = false;
    renderHomeSearch(event.target.value);
  });
  elements.clearHomeSearchButton.addEventListener("click", () => {
    elements.homeSearchInput.value = "";
    renderHomeSearch("");
    elements.homeSearchInput.focus();
  });
  elements.homeSearchResults.addEventListener("click", (event) => {
    const result = event.target.closest("[data-search-route]");
    if (result) {
      window.AppRouter.navigate(JSON.parse(result.dataset.searchRoute));
      return;
    }
    if (event.target.closest('[data-search-more="home"]')) {
      homeSearchExpanded = true;
      renderHomeSearch();
    }
  });

  elements.branchList.addEventListener("click", (event) => {
    const searchResult = event.target.closest("[data-search-route]");
    if (searchResult) {
      window.AppRouter.navigate(JSON.parse(searchResult.dataset.searchRoute));
      return;
    }
    const moreButton = event.target.closest('[data-search-more="module"]');
    if (moreButton) {
      renderModuleSearchResults(elements.searchInput.value, true);
      return;
    }

    if (activeTheme?.id === "counter-association") {
      const counterButton = event.target.closest("[data-counter-id]");
      if (counterButton) {
        window.AppRouter.navigate({
          theme: "counter-association",
          category: counterButton.dataset.counterCategoryId,
          item: counterButton.dataset.counterId
        });
        return;
      }
      const categoryButton = event.target.closest("[data-counter-category-id]");
      if (categoryButton) window.AppRouter.navigate({
        theme: "counter-association",
        category: categoryButton.dataset.counterCategoryId
      });
      return;
    }

    if (activeTheme?.id === "fruit-association") {
      const commonButton = event.target.closest('[data-fruit-view="common"]');
      if (commonButton) {
        window.AppRouter.navigate({ theme: "fruit-association", view: "common" });
        return;
      }
      const fruitButton = event.target.closest("[data-fruit-id]");
      if (fruitButton) {
        window.AppRouter.navigate({
          theme: "fruit-association",
          category: fruitButton.dataset.fruitCategoryId,
          item: fruitButton.dataset.fruitId
        });
        return;
      }
      const categoryButton = event.target.closest("[data-fruit-category-id]");
      if (categoryButton) window.AppRouter.navigate({
        theme: "fruit-association",
        category: categoryButton.dataset.fruitCategoryId
      });
    }
  });

  elements.modalContent.addEventListener("click", (event) => {
    if (elements.categoryModal.classList.contains("modal-sheet--fruit")) {
      const viewButton = event.target.closest("[data-fruit-view]");
      if (viewButton?.dataset.fruitView === "root") {
        window.AppRouter.back();
        return;
      }
      if (viewButton?.dataset.fruitView === "category") {
        window.AppRouter.navigate({
          theme: "fruit-association",
          category: viewButton.dataset.fruitCategoryId
        });
        return;
      }

      const fruitButton = event.target.closest("[data-fruit-id]");
      if (fruitButton) {
        window.AppRouter.navigate({
          theme: "fruit-association",
          category: fruitButton.dataset.fruitCategoryId,
          item: fruitButton.dataset.fruitId
        });
        return;
      }

      const counterLink = event.target.closest("[data-fruit-counter-link]");
      if (counterLink && hasCounterModule) {
        const linkedCounter = getCounterById(counterLink.dataset.fruitCounterLink);
        if (linkedCounter) {
          window.AppRouter.navigate({
            theme: "counter-association",
            category: linkedCounter.categoryId,
            item: linkedCounter.id
          });
        }
      }
      return;
    }

    if (!elements.categoryModal.classList.contains("modal-sheet--counter")) return;

    const viewButton = event.target.closest("[data-counter-view]");
    if (viewButton?.dataset.counterView === "root") {
      window.AppRouter.back();
      return;
    }
    if (viewButton?.dataset.counterView === "category") {
      window.AppRouter.navigate({
        theme: "counter-association",
        category: viewButton.dataset.counterCategoryId
      });
      return;
    }

    const counterButton = event.target.closest("[data-counter-id]");
    if (counterButton) {
      window.AppRouter.navigate({
        theme: "counter-association",
        category: counterButton.dataset.counterCategoryId,
        item: counterButton.dataset.counterId
      });
      return;
    }

    const objectButton = event.target.closest(".counter-object-card");
    if (objectButton) objectButton.classList.toggle("is-selected");
  });

  elements.modalCloseButton.addEventListener("click", requestModalClose);
  elements.modalBackdrop.addEventListener("click", (event) => {
    if (event.target === elements.modalBackdrop) requestModalClose();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.modalBackdrop.hidden) requestModalClose();
  });
  elements.backButton.addEventListener("click", () => window.AppRouter.back());
  elements.brand.addEventListener("click", (event) => {
    event.preventDefault();
    window.AppRouter.home();
  });

  createThemeCards();
  window.AppRouter.start(applyRoute);
})();
