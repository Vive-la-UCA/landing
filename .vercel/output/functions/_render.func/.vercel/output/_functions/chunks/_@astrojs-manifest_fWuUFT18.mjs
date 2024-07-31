import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server_DcILUZVt.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Oozc_hRb.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"inline","content":"header[data-astro-cid-3ef6ksr2]{background:#036;background:linear-gradient(135deg,#036,#0055a5);color:#fff;padding:20px 0;text-align:center;box-shadow:0 4px 8px #0000001a}header[data-astro-cid-3ef6ksr2] .logo[data-astro-cid-3ef6ksr2]{max-width:150px;margin-bottom:10px}header[data-astro-cid-3ef6ksr2] p[data-astro-cid-3ef6ksr2]{margin:10px 0;font-size:1.2em}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2]{list-style:none;padding:0;display:flex;justify-content:center;margin-top:10px;flex-wrap:wrap}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]{margin:0 15px}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#fff;text-decoration:none;font-weight:700;transition:color .3s}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{color:#f90}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}.container{width:80%;margin:0 auto;padding:20px}body{font-family:Montserrat,sans-serif;margin:0;padding:0;box-sizing:border-box;color:#333}\n.card-instruction[data-astro-cid-7twfu3ya]{display:flex;flex-direction:row;align-items:start;justify-content:space-between;margin:50px;gap:50px}.details[data-astro-cid-7twfu3ya]{width:70%}.details[data-astro-cid-7twfu3ya] h2[data-astro-cid-7twfu3ya]{color:#f90;font-size:2.4rem;font-weight:700}.details[data-astro-cid-7twfu3ya] p[data-astro-cid-7twfu3ya]{color:#585858;font-size:1.2rem}.card-instruction[data-astro-cid-7twfu3ya] img[data-astro-cid-7twfu3ya]{width:30%;object-fit:cover;border-radius:30px}@media (max-width: 1024px){.card-instruction[data-astro-cid-7twfu3ya]{flex-direction:column;align-items:center;text-align:center}.details[data-astro-cid-7twfu3ya]{width:100%}.card-instruction[data-astro-cid-7twfu3ya] img[data-astro-cid-7twfu3ya]{width:80%;margin-top:20px}}@media (max-width: 768px){.card-instruction[data-astro-cid-7twfu3ya]{margin:20px;gap:20px}.details[data-astro-cid-7twfu3ya] h2[data-astro-cid-7twfu3ya]{font-size:2rem}.details[data-astro-cid-7twfu3ya] p[data-astro-cid-7twfu3ya]{font-size:1rem}.card-instruction[data-astro-cid-7twfu3ya] img[data-astro-cid-7twfu3ya]{width:100%}}@media (max-width: 480px){.details[data-astro-cid-7twfu3ya] h2[data-astro-cid-7twfu3ya]{font-size:1.8rem}.details[data-astro-cid-7twfu3ya] p[data-astro-cid-7twfu3ya]{font-size:.9rem}}section[data-astro-cid-cx7gdanv]{width:80%;margin:0% 10%;overflow:hidden}\n@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/instructions","isIndex":false,"type":"page","pattern":"^\\/Instructions\\/?$","segments":[[{"content":"Instructions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Instructions.astro","pathname":"/Instructions","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.EeK5pl82.js"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"inline","content":"header[data-astro-cid-3ef6ksr2]{background:#036;background:linear-gradient(135deg,#036,#0055a5);color:#fff;padding:20px 0;text-align:center;box-shadow:0 4px 8px #0000001a}header[data-astro-cid-3ef6ksr2] .logo[data-astro-cid-3ef6ksr2]{max-width:150px;margin-bottom:10px}header[data-astro-cid-3ef6ksr2] p[data-astro-cid-3ef6ksr2]{margin:10px 0;font-size:1.2em}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2]{list-style:none;padding:0;display:flex;justify-content:center;margin-top:10px;flex-wrap:wrap}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]{margin:0 15px}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#fff;text-decoration:none;font-weight:700;transition:color .3s}header[data-astro-cid-3ef6ksr2] nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{color:#f90}.astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}.container{width:80%;margin:0 auto;padding:20px}body{font-family:Montserrat,sans-serif;margin:0;padding:0;box-sizing:border-box;color:#333}\n"},{"type":"external","src":"/_astro/index.CjKIm6Zu.css"},{"type":"inline","content":"@keyframes astroFadeInOut{0%{opacity:1}to{opacity:0}}@keyframes astroFadeIn{0%{opacity:0}}@keyframes astroFadeOut{to{opacity:0}}@keyframes astroSlideFromRight{0%{transform:translate(100%)}}@keyframes astroSlideFromLeft{0%{transform:translate(-100%)}}@keyframes astroSlideToRight{to{transform:translate(100%)}}@keyframes astroSlideToLeft{to{transform:translate(-100%)}}@media (prefers-reduced-motion){::view-transition-group(*),::view-transition-old(*),::view-transition-new(*){animation:none!important}[data-astro-transition-scope]{animation:none!important}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Steps.astro",{"propagation":"in-tree","containsHead":false}],["/Users/bryan31542/Desktop/VIVEEEEE/landing/src/pages/Instructions.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/Instructions@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Introduction.astro",{"propagation":"in-tree","containsHead":false}],["/Users/bryan31542/Desktop/VIVEEEEE/landing/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/Instructions@_@astro":"pages/instructions.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/bryan31542/Desktop/VIVEEEEE/landing/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_CXsI5CxS.mjs","/src/pages/Instructions.astro":"chunks/Instructions_D9DT20fH.mjs","/src/pages/index.astro":"chunks/index_hS5dnWuw.mjs","\u0000@astrojs-manifest":"manifest_BNpkKIS6.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.EeK5pl82.js","/astro/hoisted.js?q=1":"_astro/hoisted.Oozc_hRb.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.CjKIm6Zu.css","/logo_vivelauca.ico","/apk/ViveLaUCA.apk","/_astro/hoisted.EeK5pl82.js","/_astro/hoisted.Oozc_hRb.js","/images/appabierta.jpg","/images/captura1.jpg","/images/captura2.jpg","/images/captura3.jpg","/images/instalando.jpg","/images/logoo.png","/images/notif.jpg","/images/permisos.jpg"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
