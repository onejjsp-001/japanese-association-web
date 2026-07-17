(function () {
  "use strict";

  let records = null;

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFKC")
      .toLocaleLowerCase()
      .replace(/[\s・･、。,.!！?？「」『』（）()[\]【】：:；;～~ー]/g, "");
  }

  function textOf(item) {
    if (!item) return "";
    if (typeof item === "string" || typeof item === "number") return String(item);
    return [
      item.word,
      item.japanese,
      item.text,
      item.title,
      item.reading,
      item.kana,
      item.meaning,
      item.chinese,
      item.translation,
      item.description,
      item.example,
      item.exampleMeaning,
      item.motion,
      item.distinction,
      item.formalLevel,
      ...(item.aliases || []),
      ...(item.particles || []),
      ...(item.searchTerms || []),
      ...(item.segments || []).flatMap((segment) => [segment.text, segment.reading])
    ].filter(Boolean).join(" ");
  }

  function addRecord(list, record) {
    const title = record.title || "";
    if (!title || !record.themeId) return;
    list.push({
      id: record.id || `${record.themeId}:${list.length}`,
      themeId: record.themeId,
      source: record.source || record.themeId,
      importance: Number(record.importance || 0),
      title,
      reading: record.reading || "",
      meaning: record.meaning || "",
      summary: record.summary || record.meaning || "",
      tags: (record.tags || []).filter(Boolean),
      searchTerms: [...(record.aliases || []), ...(record.searchTerms || [])].filter(Boolean),
      collocations: (record.collocations || []).map(textOf).filter(Boolean),
      details: (record.details || []).map(textOf).filter(Boolean),
      examples: (record.examples || []).map(textOf).filter(Boolean),
      route: { ...record.route, theme: record.themeId }
    });
  }

  function buildDateIndex(list) {
    const theme = typeof LEARNING_DATA === "undefined"
      ? null
      : LEARNING_DATA.find((item) => item.id === "date");
    if (!theme) return;
    (theme.categories || []).forEach((category) => {
      addRecord(list, {
        id: `date:${category.id}`,
        themeId: "date",
        source: "日期",
        importance: 80,
        title: category.japanese,
        reading: category.kana,
        meaning: category.chinese,
        tags: ["日期", category.displayType],
        route: { category: category.id }
      });
      (category.sections || []).forEach((section) => {
        (section.items || []).forEach((item, index) => {
          addRecord(list, {
            id: `date:${category.id}:${index}:${item.japanese}`,
            themeId: "date",
            source: "日期",
            importance: 60,
            title: item.japanese,
            reading: item.kana,
            meaning: item.chinese,
            tags: ["日期", section.title],
            route: { category: category.id, focus: item.japanese }
          });
        });
      });
    });
  }

  function buildBodyIndex(list) {
    if (typeof bodyAssociationData === "undefined") return;
    (bodyAssociationData.sections || []).forEach((section) => {
      addRecord(list, {
        id: `body:${section.id}`,
        themeId: "body-association",
        source: "人体联想",
        importance: 80,
        title: section.title,
        reading: section.reading,
        meaning: section.meaning,
        tags: ["人体", "身体部位"],
        route: { section: section.id }
      });
      (section.categories || []).forEach((category) => {
        const baseRoute = { section: section.id, category: category.id };
        addRecord(list, {
          id: `body:${section.id}:${category.id}`,
          themeId: "body-association",
          source: "人体联想",
          importance: 85,
          title: category.title,
          reading: category.reading,
          meaning: category.meaning,
          summary: category.tip,
          tags: ["人体", section.meaning],
          searchTerms: category.searchTerms,
          collocations: category.expressions,
          route: baseRoute
        });
        const vocabulary = [
          ...(category.items || []),
          ...(category.vocabularyGroups || []).flatMap((group) => group.items || [])
        ];
        vocabulary.forEach((item, index) => addRecord(list, {
          id: `body:${category.id}:word:${item.id || index}`,
          themeId: "body-association",
          source: "人体联想",
          importance: 70,
          title: item.word || item.text,
          reading: item.reading,
          meaning: item.meaning,
          summary: item.description,
          tags: ["人体", category.meaning, item.level],
          searchTerms: item.searchTerms,
          collocations: item.collocations,
          details: [item.description],
          examples: [item.example, item.translation],
          route: { ...baseRoute, focus: item.word || item.text }
        }));
        const expressions = category.expressions
          || (typeof bodyAssociationExpressionData !== "undefined" ? bodyAssociationExpressionData[category.id] : [])
          || [];
        expressions.forEach((item, index) => addRecord(list, {
          id: `body:${category.id}:expression:${index}`,
          themeId: "body-association",
          source: "人体联想",
          title: item.text || item.word,
          reading: item.reading,
          meaning: item.meaning,
          tags: ["人体", "常用表达", category.meaning],
          searchTerms: item.searchTerms,
          route: { ...baseRoute, focus: item.text || item.word }
        }));
        (category.examples || []).forEach((item, index) => addRecord(list, {
          id: `body:${category.id}:example:${index}`,
          themeId: "body-association",
          source: "人体联想",
          title: item.text || item.example,
          reading: item.reading || item.exampleReading,
          meaning: item.meaning || item.translation,
          tags: ["人体", "例句", category.meaning],
          route: { ...baseRoute, focus: item.text || item.example }
        }));
      });
    });
  }

  function buildCounterIndex(list) {
    if (typeof counterAssociationData === "undefined") return;
    const categoryMap = new Map((counterAssociationData.categories || []).map((category) => [category.id, category]));
    Object.values(counterAssociationData.counters || {}).forEach((counter) => {
      const category = categoryMap.get(counter.categoryId);
      const route = { category: counter.categoryId, item: counter.id };
      addRecord(list, {
        id: `counter:${counter.id}`,
        themeId: "counter-association",
        source: "数量与量词",
        importance: 90,
        title: counter.counter,
        reading: counter.reading,
        meaning: counter.meaning,
        summary: counter.usage,
        tags: ["量词", category?.meaning, category?.title],
        searchTerms: counter.searchTerms,
        collocations: counter.objects,
        details: [counter.tip],
        examples: counter.examples,
        route
      });
      [
        ["object", counter.objects || []],
        ["count", [...(counter.counts || []), ...(counter.specialCounts || [])]],
        ["question", counter.questions || (counter.question ? [counter.question] : [])]
      ].forEach(([kind, items]) => items.forEach((item, index) => addRecord(list, {
        id: `counter:${counter.id}:${kind}:${index}`,
        themeId: "counter-association",
        source: "数量与量词",
        title: item.word || item.text,
        reading: item.reading,
        meaning: item.meaning || `${counter.meaning}的数量表达`,
        tags: ["量词", counter.counter, category?.meaning],
        searchTerms: item.searchTerms,
        examples: [item.example, item.exampleMeaning],
        route: { ...route, focus: item.word || item.text }
      })));
    });
  }

  function buildFruitIndex(list) {
    if (typeof fruitAssociationData === "undefined") return;
    const categoryMap = new Map((fruitAssociationData.categories || []).map((category) => [category.id, category]));
    Object.values(fruitAssociationData.fruits || {}).forEach((fruit) => {
      const category = categoryMap.get(fruit.categoryId);
      const route = { category: fruit.categoryId, item: fruit.id };
      addRecord(list, {
        id: `fruit:${fruit.id}`,
        themeId: "fruit-association",
        source: "水果联想",
        importance: 100,
        title: fruit.word,
        reading: fruit.reading,
        meaning: fruit.meaning,
        summary: fruit.tip,
        tags: ["水果", category?.meaning, ...(fruit.tags || [])],
        route
      });
      [
        ["part", fruit.parts || []],
        ["taste", fruit.tastes || []],
        ["action", fruit.actions || []],
        ["counter", fruit.counters || []]
      ].forEach(([kind, items]) => items.forEach((item, index) => addRecord(list, {
        id: `fruit:${fruit.id}:${kind}:${index}`,
        themeId: "fruit-association",
        source: "水果联想",
        title: item.word || item.text,
        reading: item.reading,
        meaning: item.meaning,
        tags: ["水果", fruit.meaning, category?.meaning],
        searchTerms: item.searchTerms,
        route: { ...route, focus: item.word || item.text }
      })));
      (fruit.examples || []).forEach((item, index) => addRecord(list, {
        id: `fruit:${fruit.id}:example:${index}`,
        themeId: "fruit-association",
        source: "水果联想",
        title: item.text,
        reading: item.reading,
        meaning: item.meaning,
        tags: ["水果", fruit.meaning, "例句"],
        route: { ...route, focus: item.text }
      }));
    });
    (fruitAssociationData.commonExpressions || []).forEach((group) => {
      (group.items || []).forEach((item, index) => addRecord(list, {
        id: `fruit:common:${group.id}:${index}`,
        themeId: "fruit-association",
        source: "水果联想",
        title: item.text,
        reading: item.reading,
        meaning: item.meaning,
        tags: ["水果", "常用表达", group.meaning],
        searchTerms: item.searchTerms,
        route: { view: "common", focus: item.text }
      }));
    });
  }

  function buildSpaceMovementIndex(list) {
    if (typeof spaceMovementData === "undefined") return;
    (spaceMovementData.sections || []).forEach((section) => {
      addRecord(list, {
        id: `space:${section.id}`,
        themeId: "space-movement",
        source: "空间、方位与移动",
        importance: 82,
        title: section.japaneseTitle,
        reading: section.reading,
        meaning: section.title,
        summary: section.meaning,
        tags: ["空间", "方位", "移动", "问路", section.title],
        searchTerms: [section.meaning, section.summary],
        route: { section: section.id }
      });

      (section.items || []).forEach((entry) => {
        addRecord(list, {
          id: `space:${section.id}:${entry.id}`,
          themeId: "space-movement",
          source: "空间、方位与移动",
          importance: entry.type === "scene" ? 99 : entry.type === "particle" ? 98 : 95,
          title: entry.title,
          reading: entry.reading,
          meaning: entry.meaning,
          summary: entry.summary,
          aliases: entry.aliases,
          tags: [
            "空间",
            "方位",
            "移动",
            section.title,
            section.meaning,
            entry.type === "scene" ? "问路场景" : entry.type === "particle" ? "助词路径" : "核心词汇",
            ...(entry.tags || [])
          ],
          searchTerms: [
            ...(entry.searchTerms || []),
            ...(entry.particles || []),
            ...(entry.crossLinks || []).map((link) => link.label)
          ],
          collocations: entry.collocations,
          details: [entry.motion, entry.distinction, entry.formalLevel],
          examples: [
            ...(entry.examples || []),
            ...(entry.ask || []),
            ...(entry.answers || []),
            ...(entry.copyPhrases || [])
          ],
          route: { section: section.id, item: entry.id }
        });
      });
    });
  }

  function buildQuestionIndex(list) {
    if (typeof QUESTION_EXPRESSIONS_DATA === "undefined") return;
    const groups = [
      ["questions-purposes", "提问目的", QUESTION_EXPRESSIONS_DATA.purposes],
      ["questions-words", "疑问词", QUESTION_EXPRESSIONS_DATA.questionWords],
      ["questions-patterns", "疑问句型", QUESTION_EXPRESSIONS_DATA.questionPatterns],
      ["questions-comparisons", "语气对比", QUESTION_EXPRESSIONS_DATA.comparisons],
      ["questions-scenes", "真实场景", QUESTION_EXPRESSIONS_DATA.scenes],
      ["questions-mistakes", "常见错误", QUESTION_EXPRESSIONS_DATA.mistakes]
    ];
    groups.forEach(([section, source, items]) => {
      (items || []).forEach((item) => addRecord(list, {
        id: `questions:${item.id}`,
        themeId: "question-expressions",
        source: `疑问表达百科 · ${source}`,
        importance: 90,
        title: item.title,
        reading: item.reading,
        meaning: item.subtitle || item.summary || item.natural,
        summary: item.summary || item.reason,
        tags: [source, item.purposeCategory, item.structureCategory, item.category, ...(item.tags || [])],
        searchTerms: item.searchTerms,
        collocations: [...(item.collocations || []), ...(item.contrasts || [])],
        details: [item.reason, item.feeling, item.recommended, item.recommendation, ...(item.mistakes || []), ...(item.rows || []).flat()],
        examples: item.examples ? Object.values(item.examples).flat() : (item.expressions || []).flat(),
        route: { section, entry: item.id }
      }));
    });
  }

  function buildIndex() {
    const list = [];
    buildDateIndex(list);
    buildBodyIndex(list);
    buildCounterIndex(list);
    buildFruitIndex(list);
    buildSpaceMovementIndex(list);
    buildQuestionIndex(list);
    records = list;
    return list;
  }

  function matchAny(values, query, mode = "includes") {
    return values.some((value) => {
      const normalized = normalize(value);
      return mode === "exact"
        ? normalized === query
        : mode === "starts"
          ? normalized.startsWith(query)
          : normalized.includes(query);
    });
  }

  function scoreRecord(record, rawQuery) {
    const query = normalize(rawQuery);
    if (!query) return null;
    const title = normalize(record.title);
    const titleCore = normalize(String(record.title).replace(/[（(][^）)]*[）)]/g, ""));
    const reading = normalize(record.reading);
    const meanings = [record.meaning, record.summary].filter(Boolean);
    const shortQuery = [...query].length === 1;

    if (title === query || titleCore === query) return { score: 1000, reason: "核心词条", group: "core" };
    if (reading && reading === query) return { score: 950, reason: "假名完全匹配", group: "core" };
    if (matchAny(meanings, query, "exact")) return { score: 900, reason: "中文核心词匹配", group: "core" };
    if (title.startsWith(query) || titleCore.startsWith(query)) return { score: 820, reason: "日语标题匹配", group: "core" };
    if (reading && reading.startsWith(query)) return { score: 780, reason: "假名开头匹配", group: "core" };
    if (matchAny(meanings, query)) return { score: 650, reason: "中文释义匹配", group: "core" };
    if (matchAny([...record.tags, ...record.searchTerms], query)) return { score: 520, reason: "标签或别名匹配", group: "related" };
    if (matchAny(record.collocations, query, shortQuery ? "exact" : "includes")) {
      return { score: 340, reason: "常用搭配匹配", group: "related" };
    }
    if (!shortQuery && matchAny([...record.details, ...record.examples], query)) {
      return { score: 120, reason: "例句或说明中出现", group: "examples" };
    }
    return null;
  }

  function search(rawQuery, options = {}) {
    const query = String(rawQuery || "").trim();
    if (!query) return { query, total: 0, groups: { core: [], related: [], examples: [] }, shortQuery: false };
    const list = records || buildIndex();
    const matches = list.map((record) => {
      if (options.themeId && record.themeId !== options.themeId) return null;
      const match = scoreRecord(record, query);
      return match ? { ...record, ...match } : null;
    }).filter(Boolean).sort((first, second) =>
      second.score - first.score
      || second.importance - first.importance
      || first.title.length - second.title.length
      || first.source.localeCompare(second.source)
    );
    const unique = [];
    const seen = new Set();
    matches.forEach((match) => {
      const key = `${match.themeId}:${match.title}:${JSON.stringify(match.route)}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(match);
      }
    });
    return {
      query,
      total: unique.length,
      shortQuery: [...normalize(query)].length === 1,
      groups: {
        core: unique.filter((item) => item.group === "core"),
        related: unique.filter((item) => item.group === "related"),
        examples: unique.filter((item) => item.group === "examples")
      }
    };
  }

  window.GlobalSearch = {
    search,
    scoreRecord,
    rebuild() {
      records = null;
      return buildIndex();
    },
    getRecords() {
      return [...(records || buildIndex())];
    }
  };
})();
