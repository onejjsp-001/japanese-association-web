(function () {
  "use strict";

  const ROUTE_KEYS = ["theme", "section", "category", "item", "entry", "view", "focus", "demo"];
  let listener = null;
  let currentRoute = { page: "home" };

  function cleanRoute(route = {}) {
    const clean = {};
    if (route.page === "home" || !route.theme) return { page: "home" };
    ROUTE_KEYS.forEach((key) => {
      const value = route[key];
      if (value !== undefined && value !== null && String(value).trim()) clean[key] = String(value);
    });
    return clean.theme ? clean : { page: "home" };
  }

  function parse(hash = window.location.hash) {
    const raw = String(hash || "").replace(/^#/, "");
    if (!raw || raw === "home") return { page: "home" };

    // 兼容旧版疑问表达锚点，进入后由统一路由替换为参数式 URL。
    if (raw.startsWith("questions-")) {
      return { theme: "question-expressions", section: decodeURIComponent(raw) };
    }
    if (/^(purpose|word|pattern|comparison|scene|mistake)-/.test(raw)) {
      return { theme: "question-expressions", entry: decodeURIComponent(raw) };
    }

    const params = new URLSearchParams(raw);
    const route = {};
    ROUTE_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) route[key] = value;
    });
    return cleanRoute(route);
  }

  function toHash(route = {}) {
    const clean = cleanRoute(route);
    if (clean.page === "home") return "#home";
    const params = new URLSearchParams();
    ROUTE_KEYS.forEach((key) => {
      if (clean[key]) params.set(key, clean[key]);
    });
    return `#${params.toString()}`;
  }

  function sameRoute(first, second) {
    return toHash(first) === toHash(second);
  }

  function emit(route) {
    currentRoute = cleanRoute(route);
    if (typeof listener === "function") listener({ ...currentRoute });
  }

  function commit(route, options = {}) {
    const clean = cleanRoute(route);
    const hash = toHash(clean);
    if (hash === window.location.hash) {
      currentRoute = clean;
      if (!options.silent) emit(clean);
      return;
    }
    const state = { appRoute: true, route: clean };
    if (options.replace) history.replaceState(state, "", hash);
    else history.pushState(state, "", hash);
    currentRoute = clean;
    if (!options.silent) emit(clean);
  }

  function routeChain(route) {
    const clean = cleanRoute(route);
    if (clean.page === "home") return [{ page: "home" }];
    const chain = [{ page: "home" }, { theme: clean.theme }];
    let base = { theme: clean.theme };

    if (clean.section) {
      base = { ...base, section: clean.section };
      chain.push({ ...base });
    }
    if (clean.category) {
      base = { ...base, category: clean.category };
      chain.push({ ...base });
    }
    if (clean.view) {
      base = { ...base, view: clean.view };
      chain.push({ ...base });
    }
    if (clean.item) {
      base = { ...base, item: clean.item };
      chain.push({ ...base });
    }
    if (clean.entry) {
      base = { ...base, entry: clean.entry };
      chain.push({ ...base });
    }
    if (clean.focus || clean.demo) {
      chain[chain.length - 1] = { ...chain[chain.length - 1], focus: clean.focus, demo: clean.demo };
    }
    return chain.filter((item, index, items) => index === 0 || !sameRoute(item, items[index - 1]));
  }

  function bootstrap(route) {
    const chain = routeChain(route);
    history.replaceState({ appRoute: true, route: chain[0] }, "", toHash(chain[0]));
    chain.slice(1).forEach((item) => {
      history.pushState({ appRoute: true, route: item }, "", toHash(item));
    });
    emit(chain[chain.length - 1]);
  }

  function start(onChange) {
    listener = onChange;
    const parsed = parse();
    if (!history.state?.appRoute) bootstrap(parsed);
    else emit(parsed);
    window.addEventListener("popstate", () => emit(parse()));
  }

  function back() {
    if (cleanRoute(currentRoute).page === "home") return;
    history.back();
  }

  function home(options = {}) {
    commit({ page: "home" }, options);
  }

  window.AppRouter = {
    start,
    parse,
    toHash,
    current: () => ({ ...currentRoute }),
    navigate: (route, options = {}) => commit(route, options),
    replace: (route, options = {}) => commit(route, { ...options, replace: true }),
    home,
    back,
    sameRoute
  };
})();
