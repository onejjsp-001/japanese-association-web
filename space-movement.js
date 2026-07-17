(function () {
  "use strict";

  if (typeof spaceMovementData === "undefined") return;

  const data = spaceMovementData;
  const itemMap = new Map();
  const sectionMap = new Map();
  const state = {
    context: null,
    active: false,
    container: null
  };

  data.sections.forEach((section) => {
    sectionMap.set(section.id, section);
    section.items.forEach((entry) => itemMap.set(entry.id, { entry, section }));
  });

  function siteUtils() {
    return state.context?.utils || window.SiteUtils;
  }

  function escapeHTML(value) {
    return siteUtils().escapeHTML(value);
  }

  function ruby(text, reading = "", segments = []) {
    return siteUtils().renderRubyText(text, reading, segments);
  }

  function createRouteButton(className, route, html, ariaLabel = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.dataset.smRoute = JSON.stringify({ theme: data.id, ...route });
    if (ariaLabel) button.setAttribute("aria-label", ariaLabel);
    button.innerHTML = html;
    return button;
  }

  function createSectionHeading(kicker, title, description = "", trailing = "") {
    const heading = document.createElement("div");
    heading.className = "sm-section-heading";
    heading.innerHTML = `
      <div>
        <p>${escapeHTML(kicker)}</p>
        <h2>${escapeHTML(title)}</h2>
        ${description ? `<span>${escapeHTML(description)}</span>` : ""}
      </div>
      ${trailing ? `<small>${escapeHTML(trailing)}</small>` : ""}
    `;
    return heading;
  }

  function renderPhrase(entry) {
    if (typeof entry === "string") return escapeHTML(entry);
    return ruby(entry.text, entry.reading, entry.segments);
  }

  function createExpressionCard(entry, compact = false) {
    const card = document.createElement("article");
    card.className = `sm-expression-card${compact ? " is-compact" : ""}`;
    card.innerHTML = `
      <p lang="ja">${ruby(entry.text, entry.reading, entry.segments)}</p>
      ${entry.meaning ? `<span>${escapeHTML(entry.meaning)}</span>` : ""}
    `;
    return card;
  }

  function renderHome() {
    if (!state.context) return;
    const wrapper = document.createElement("div");
    wrapper.className = "sm-home";

    const intro = document.createElement("section");
    intro.className = "sm-intro";
    intro.innerHTML = `
      <p class="sm-kicker">SPACE → DIRECTION → MOVEMENT</p>
      <h2 lang="ja">${ruby(data.japaneseTitle, data.reading)}</h2>
      <p>${escapeHTML(data.meaning)}</p>
      <div class="sm-cognitive-path" aria-label="学习联想路径">
        <span>空间关系</span><i aria-hidden="true">→</i>
        <span>方位词</span><i aria-hidden="true">→</i>
        <span>助词</span><i aria-hidden="true">→</i>
        <span>移动动词</span><i aria-hidden="true">→</i>
        <span>完整句子</span>
      </div>
    `;
    wrapper.appendChild(intro);

    const intentSection = document.createElement("section");
    intentSection.className = "sm-home-section";
    intentSection.appendChild(createSectionHeading("QUICK START", "我现在想查什么？", "从日常目的直接进入相关内容"));
    const intentGrid = document.createElement("div");
    intentGrid.className = "sm-intent-grid";
    data.intents.forEach((intent) => {
      intentGrid.appendChild(createRouteButton(
        "sm-intent-card",
        intent.route,
        `
          <strong lang="ja">${ruby(intent.title, intent.reading)}</strong>
          <span>${escapeHTML(intent.meaning)}</span>
          <i aria-hidden="true">→</i>
        `,
        `查看${intent.meaning}`
      ));
    });
    intentSection.appendChild(intentGrid);
    wrapper.appendChild(intentSection);

    const positionSection = document.createElement("section");
    positionSection.className = "sm-home-section";
    positionSection.appendChild(createSectionHeading("POSITION MAP", "空间关系图", "以“基准物”为中心点击查看方位"));
    const positionMap = document.createElement("div");
    positionMap.className = "sm-position-map";
    const center = document.createElement("div");
    center.className = "sm-position-center";
    center.innerHTML = `<span>基准物</span><small>もの</small>`;
    positionMap.appendChild(center);
    data.positionMap.forEach((node) => {
      positionMap.appendChild(createRouteButton(
        `sm-position-node is-${node.className}`,
        { section: "directions", item: node.itemId },
        `<span lang="ja">${ruby(node.label, node.reading)}</span>`,
        `查看方位词${node.label}`
      ));
    });
    positionSection.appendChild(positionMap);
    wrapper.appendChild(positionSection);

    const pathSection = document.createElement("section");
    pathSection.className = "sm-home-section";
    pathSection.appendChild(createSectionHeading("MOVEMENT PATH", "移动路径图", "把起点、经过、方向和到达点连起来"));
    const path = document.createElement("div");
    path.className = "sm-path";
    data.pathNodes.forEach((node, index) => {
      path.appendChild(createRouteButton(
        "sm-path-node",
        { section: "particles", item: node.itemId },
        `
          <small>${escapeHTML(node.label)}</small>
          <strong lang="ja">${ruby(node.particle, node.reading)}</strong>
        `,
        `查看${node.label}助词${node.particle}`
      ));
      if (index < data.pathNodes.length - 1) {
        const arrow = document.createElement("span");
        arrow.className = "sm-path-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        path.appendChild(arrow);
      }
    });
    pathSection.appendChild(path);
    wrapper.appendChild(pathSection);

    const categorySection = document.createElement("section");
    categorySection.className = "sm-home-section";
    categorySection.appendChild(createSectionHeading("8 SECTIONS", "分类入口", "从静态位置到动态移动", `${data.sections.length} 个分类`));
    const categoryGrid = document.createElement("div");
    categoryGrid.className = "sm-category-grid";
    data.sections.forEach((section, index) => {
      categoryGrid.appendChild(createRouteButton(
        "sm-category-card",
        { section: section.id },
        `
          <span class="sm-category-number">${String(index + 1).padStart(2, "0")}</span>
          <strong lang="ja">${ruby(section.japaneseTitle, section.reading)}</strong>
          <b>${escapeHTML(section.title)}</b>
          <small>${escapeHTML(section.meaning)}</small>
          <i aria-hidden="true">→</i>
        `,
        `进入${section.title}`
      ));
    });
    categorySection.appendChild(categoryGrid);
    wrapper.appendChild(categorySection);

    const frequencySection = document.createElement("section");
    frequencySection.className = "sm-home-section";
    frequencySection.appendChild(createSectionHeading("SAY IT NOW", "高频表达", "问路、确认方向和换乘时直接使用"));
    const frequencyList = document.createElement("div");
    frequencyList.className = "sm-expression-list";
    data.highFrequency.forEach((entry) => frequencyList.appendChild(createExpressionCard(entry)));
    frequencySection.appendChild(frequencyList);
    wrapper.appendChild(frequencySection);

    state.context.container.className = "branch-list sm-host";
    state.context.container.replaceChildren(wrapper);
    state.context.resultCount.textContent = `${data.sections.length} 个分类 · ${itemMap.size} 个核心条目`;
    state.context.emptyState.hidden = true;
    window.scrollTo(0, 0);
  }

  function renderComparisonCard(comparison) {
    const card = document.createElement("article");
    card.className = "sm-comparison-card";
    const entries = comparison.entries.map((entry) => `
      <div>
          <strong lang="ja">${ruby(entry.title, entry.reading)}</strong>
        <span>${escapeHTML(entry.note)}</span>
      </div>
    `).join("");
    card.innerHTML = `
      <h3 lang="ja">${escapeHTML(comparison.title)}</h3>
      <p>${escapeHTML(comparison.summary)}</p>
      <div class="sm-comparison-entries">${entries}</div>
    `;
    return card;
  }

  function renderSection(section) {
    if (!state.context) return;
    const wrapper = document.createElement("div");
    wrapper.className = "sm-section-page";

    const back = document.createElement("button");
    back.type = "button";
    back.className = "sm-page-back";
    back.dataset.smBack = "true";
    back.innerHTML = `<span aria-hidden="true">←</span><span>返回模块首页</span>`;
    wrapper.appendChild(back);

    const hero = document.createElement("section");
    hero.className = "sm-section-hero";
    hero.innerHTML = `
      <p>場所・方向・移動</p>
      <h2 lang="ja">${ruby(section.japaneseTitle, section.reading)}</h2>
      <strong>${escapeHTML(section.title)}</strong>
      <span>${escapeHTML(section.summary)}</span>
    `;
    wrapper.appendChild(hero);

    const comparisonItems = data.comparisons.filter((comparison) => comparison.sectionIds.includes(section.id));
    if (comparisonItems.length) {
      const compareSection = document.createElement("section");
      compareSection.className = "sm-section-block";
      compareSection.appendChild(createSectionHeading("COMPARE", "重点对比", "先分清容易混淆的空间画面"));
      const compareGrid = document.createElement("div");
      compareGrid.className = "sm-comparison-grid";
      comparisonItems.forEach((comparison) => compareGrid.appendChild(renderComparisonCard(comparison)));
      compareSection.appendChild(compareGrid);
      wrapper.appendChild(compareSection);
    }

    const itemSection = document.createElement("section");
    itemSection.className = "sm-section-block";
    itemSection.appendChild(createSectionHeading(
      section.id === "scenes" ? "SCENARIOS" : "CORE ENTRIES",
      section.id === "scenes" ? "日常场景" : "核心条目",
      "点击条目查看动作画面、搭配、例句和关联内容",
      `${section.items.length} 条`
    ));
    const grid = document.createElement("div");
    grid.className = "sm-item-grid";
    section.items.forEach((entry) => {
      const meta = entry.type === "scene"
        ? "场景"
        : entry.type === "particle"
          ? "助词路径"
          : entry.motion
            ? "移动动作"
            : "空间词";
      grid.appendChild(createRouteButton(
        "sm-item-card",
        { section: section.id, item: entry.id },
        `
          <span class="sm-item-meta">${escapeHTML(meta)}</span>
          <strong lang="ja">${ruby(entry.title, entry.reading)}</strong>
          <b>${escapeHTML(entry.meaning)}</b>
          <p>${escapeHTML(entry.summary)}</p>
          <i aria-hidden="true">＋</i>
        `,
        `查看${entry.title}：${entry.meaning}`
      ));
    });
    itemSection.appendChild(grid);
    wrapper.appendChild(itemSection);

    state.context.container.className = "branch-list sm-host";
    state.context.container.replaceChildren(wrapper);
    state.context.resultCount.textContent = `${section.title} · ${section.items.length} 个条目`;
    state.context.emptyState.hidden = true;
    window.scrollTo(0, 0);
  }

  function createDetailSection(title, className = "") {
    const section = document.createElement("section");
    section.className = `sm-detail-section${className ? ` ${className}` : ""}`;
    const heading = document.createElement("h3");
    heading.textContent = title;
    section.appendChild(heading);
    return section;
  }

  function appendPhraseGrid(parent, entries, className = "sm-token-grid") {
    if (!entries?.length) return;
    const grid = document.createElement("div");
    grid.className = className;
    entries.forEach((entry) => {
      const card = document.createElement("div");
      card.innerHTML = `
        <span lang="ja">${renderPhrase(entry)}</span>
        ${typeof entry === "object" && entry.meaning ? `<small>${escapeHTML(entry.meaning)}</small>` : ""}
      `;
      grid.appendChild(card);
    });
    parent.appendChild(grid);
  }

  function appendExamples(parent, examples, className = "sm-detail-examples") {
    if (!examples?.length) return;
    const list = document.createElement("div");
    list.className = className;
    examples.forEach((entry) => list.appendChild(createExpressionCard(entry)));
    parent.appendChild(list);
  }

  function appendSceneContent(fragment, entry) {
    if (entry.ask?.length) {
      const ask = createDetailSection("我可以怎么问");
      appendExamples(ask, entry.ask);
      fragment.appendChild(ask);
    }
    if (entry.answers?.length) {
      const answers = createDetailSection("对方可能怎么回答");
      appendExamples(answers, entry.answers);
      fragment.appendChild(answers);
    }
    if (entry.collocations?.length) {
      const keywords = createDetailSection("关键词");
      appendPhraseGrid(keywords, entry.collocations);
      fragment.appendChild(keywords);
    }
    if (entry.formalLevel) {
      const tone = createDetailSection("语气区别");
      const note = document.createElement("p");
      note.className = "sm-detail-note";
      note.textContent = entry.formalLevel;
      tone.appendChild(note);
      fragment.appendChild(tone);
    }
    if (entry.examples?.length) {
      const copy = createDetailSection("可以直接照搬的句子");
      appendExamples(copy, entry.examples);
      fragment.appendChild(copy);
    }
  }

  function appendRelatedContent(fragment, entry) {
    const related = (entry.relatedIds || []).map((id) => itemMap.get(id)).filter(Boolean);
    if (related.length) {
      const section = createDetailSection("相关条目");
      const grid = document.createElement("div");
      grid.className = "sm-related-grid";
      related.forEach(({ entry: relatedEntry, section: relatedSection }) => {
        grid.appendChild(createRouteButton(
          "sm-related-card",
          { section: relatedSection.id, item: relatedEntry.id },
          `
            <strong lang="ja">${ruby(relatedEntry.title, relatedEntry.reading)}</strong>
            <span>${escapeHTML(relatedEntry.meaning)}</span>
            <i aria-hidden="true">→</i>
          `,
          `查看相关条目${relatedEntry.title}`
        ));
      });
      section.appendChild(grid);
      fragment.appendChild(section);
    }

    if (entry.crossLinks?.length) {
      const section = createDetailSection("跨模块关联");
      const grid = document.createElement("div");
      grid.className = "sm-cross-link-grid";
      entry.crossLinks.forEach((link) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "sm-cross-link";
        button.dataset.smRoute = JSON.stringify(link.route);
        button.innerHTML = `<span>${escapeHTML(link.label)}</span><i aria-hidden="true">→</i>`;
        grid.appendChild(button);
      });
      section.appendChild(grid);
      fragment.appendChild(section);
    }
  }

  function openItemModal(section, entry) {
    const backdrop = document.getElementById("modalBackdrop");
    const modal = document.getElementById("categoryModal");
    const title = document.getElementById("modalTitle");
    const kana = document.getElementById("modalKana");
    const chinese = document.getElementById("modalChinese");
    const content = document.getElementById("modalContent");
    if (!backdrop || !modal || !title || !kana || !chinese || !content) return;

    modal.classList.add("modal-sheet--space");
    kana.lang = "ja";
    kana.textContent = section.title;
    title.innerHTML = ruby(entry.title, entry.reading);
    chinese.textContent = entry.meaning;

    const fragment = document.createDocumentFragment();
    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "sm-breadcrumb";
    breadcrumb.setAttribute("aria-label", "空间、方位与移动当前位置");
    const rootButton = createRouteButton("sm-breadcrumb-button", {}, "空间、方位与移动", "返回模块首页");
    const sectionButton = createRouteButton(
      "sm-breadcrumb-button",
      { section: section.id },
      escapeHTML(section.title),
      `返回${section.title}`
    );
    const current = document.createElement("strong");
    current.lang = "ja";
    current.innerHTML = ruby(entry.title, entry.reading);
    breadcrumb.append(rootButton, document.createTextNode("›"), sectionButton, document.createTextNode("›"), current);
    fragment.appendChild(breadcrumb);

    const overview = document.createElement("section");
    overview.className = "sm-detail-overview";
    overview.innerHTML = `
      <span class="sm-detail-type">${escapeHTML(entry.type === "scene" ? "场景" : entry.type === "particle" ? "助词路径" : "核心条目")}</span>
      <p>${escapeHTML(entry.summary)}</p>
      ${entry.formalLevel && entry.type !== "scene" ? `<small>正式程度：${escapeHTML(entry.formalLevel)}</small>` : ""}
    `;
    fragment.appendChild(overview);

    if (entry.motion) {
      const motion = createDetailSection("移动画面", "sm-motion-section");
      const visual = document.createElement("div");
      visual.className = "sm-motion-visual";
      visual.innerHTML = `<span>当前位置</span><i aria-hidden="true">→</i><strong>${escapeHTML(entry.motion)}</strong>`;
      motion.appendChild(visual);
      fragment.appendChild(motion);
    }

    if (entry.distinction) {
      const distinction = createDetailSection("使用区别");
      const note = document.createElement("p");
      note.className = "sm-detail-note";
      note.textContent = entry.distinction;
      distinction.appendChild(note);
      fragment.appendChild(distinction);
    }

    if (entry.type === "scene") {
      appendSceneContent(fragment, entry);
    } else {
      if (entry.particles?.length) {
        const particleSection = createDetailSection("常用助词");
        appendPhraseGrid(particleSection, entry.particles);
        fragment.appendChild(particleSection);
      }
      if (entry.collocations?.length) {
        const collocationSection = createDetailSection("常见搭配");
        appendPhraseGrid(collocationSection, entry.collocations);
        fragment.appendChild(collocationSection);
      }
      if (entry.examples?.length) {
        const exampleSection = createDetailSection("自然例句");
        appendExamples(exampleSection, entry.examples);
        fragment.appendChild(exampleSection);
      }
    }

    appendRelatedContent(fragment, entry);
    content.replaceChildren(fragment);
    backdrop.hidden = false;
    document.body.classList.add("modal-open");
    modal.focus({ preventScroll: true });
    content.scrollTop = 0;
  }

  function closeOwnModal() {
    const backdrop = document.getElementById("modalBackdrop");
    const modal = document.getElementById("categoryModal");
    const content = document.getElementById("modalContent");
    if (!modal?.classList.contains("modal-sheet--space")) return;
    backdrop.hidden = true;
    modal.classList.remove("modal-sheet--space");
    content.replaceChildren();
    document.body.classList.remove("modal-open");
  }

  function handleRouteClick(event) {
    const back = event.target.closest("[data-sm-back]");
    if (back) {
      window.AppRouter.back();
      return;
    }
    const button = event.target.closest("[data-sm-route]");
    if (!button) return;
    try {
      window.AppRouter.navigate(JSON.parse(button.dataset.smRoute));
    } catch {
      window.AppRouter.navigate({ theme: data.id });
    }
  }

  function render(context) {
    if (state.container) state.container.removeEventListener("click", handleRouteClick);
    document.getElementById("modalContent")?.removeEventListener("click", handleRouteClick);
    state.context = context;
    state.container = context.container;
    state.active = true;
    state.container.addEventListener("click", handleRouteClick);
    document.getElementById("modalContent")?.addEventListener("click", handleRouteClick);
    renderHome();
  }

  function applyRoute(route = {}, options = {}) {
    if (!state.active) return;
    const section = route.section ? sectionMap.get(route.section) : null;
    if (route.section && !section) {
      window.AppRouter.replace({ theme: data.id });
      return;
    }

    if (route.item) {
      const match = itemMap.get(route.item);
      if (!section || !match || match.section.id !== section.id) {
        window.AppRouter.replace({ theme: data.id });
        return;
      }
      if (!options.preserveBackground) renderSection(section);
      openItemModal(section, match.entry);
      return;
    }

    closeOwnModal();
    if (options.preserveBackground) return;
    if (section) renderSection(section);
    else renderHome();
  }

  function leave() {
    if (state.container) state.container.removeEventListener("click", handleRouteClick);
    document.getElementById("modalContent")?.removeEventListener("click", handleRouteClick);
    closeOwnModal();
    state.context = null;
    state.container = null;
    state.active = false;
  }

  window.SpaceMovementModule = {
    theme: data,
    render,
    applyRoute,
    leave,
    isActive: () => state.active,
    getItemCount: () => itemMap.size
  };
})();
