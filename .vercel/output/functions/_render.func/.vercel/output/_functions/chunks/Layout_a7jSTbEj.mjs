import { k as createComponent, l as renderTemplate, m as maybeRenderHead, n as addAttribute, o as createAstro, t as renderSlot, q as renderComponent, u as renderHead } from './astro/server_DcILUZVt.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                                */

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <div class="container" data-aos="fade-down" data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2> <img src="images/logoo.png" alt="Vive la UCA Logo" class="logo" data-astro-cid-3ef6ksr2> </a> <p data-astro-cid-3ef6ksr2>Explorá tu futuro universitario</p> <nav data-astro-cid-3ef6ksr2> <ul data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/" data-astro-cid-3ef6ksr2>Descargar</a></li> <li data-astro-cid-3ef6ksr2><a href="/Instructions" data-astro-cid-3ef6ksr2>Instrucciones</a></li> </ul> </nav> </div> </header> `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="logo_vivelauca.svg"><meta name="generator"', '><link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"><title>', "</title>", "</head> <body> ", " ", " ", '  <script src="https://unpkg.com/aos@next/dist/aos.js"><\/script> <script>\n      AOS.init();\n    <\/script> </body> </html>'])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]));
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
