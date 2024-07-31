import { k as createComponent, l as renderTemplate, m as maybeRenderHead, n as addAttribute, o as createAstro, p as renderTransition, q as renderComponent } from './astro/server_DcILUZVt.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './Layout_a7jSTbEj.mjs';
import 'clsx';
/* empty css                                */
/* empty css                         */

const $$Astro = createAstro();
const $$Instruction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Instruction;
  const { title, description, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="card-instruction" data-aos="fade-up" data-astro-cid-7twfu3ya> <div class="details" data-aos="fade-right" data-astro-cid-7twfu3ya> <h2 data-astro-cid-7twfu3ya>${title}</h2> <p data-astro-cid-7twfu3ya> ${description} </p> </div> ${image && renderTemplate`<img${addAttribute(image, "src")} alt="Instruction image" data-aos="fade-left" data-astro-cid-7twfu3ya>`} </article> `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Instruction.astro", void 0);

const $$Steps = createComponent(($$result, $$props, $$slots) => {
  const instructions = [
    {
      title: "1. Ubic\xE1 el archivo APK",
      description: "Una vez finalice la descarga de la aplicaci\xF3n, abr\xED el historial de descargas de tu navegador. Tambi\xE9n podes encontrar el enlace al archivo en la barra de notificaciones de tu tel\xE9fono.",
      image: "/images/notif.jpg"
    },
    {
      title: "2. Conced\xE9 los permisos",
      description: 'Si te aparece un mensaje de advertencia, da clic en Configuraci\xF3n y otorg\xE1 permiso a tu navegador para instalar aplicaciones de fuentes desconocidas. Deb\xE9s habilitar la opci\xF3n "Permitir desde esta fuente".',
      image: "/images/permisos.jpg"
    },
    {
      title: "3. Instal\xE1 la aplicaci\xF3n",
      description: "Complet\xE1 el proceso de instalaci\xF3n y cuando finalice, da click para abrir la app y conced\xE9 todos los permisos necesarios",
      image: "/images/instalando.jpg"
    },
    {
      title: "4. Explor\xE1",
      description: "Disfrut\xE1 tu recorrido (tip: no olvid\xE9s permitir el uso de tu ubicaci\xF3n y habilitar el GPS)."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-cx7gdanv${addAttribute(renderTransition($$result, "xtyvxsxj"), "data-astro-transition-scope")}> ${instructions.map((instrucciones) => renderTemplate`${renderComponent($$result, "Instruction", $$Instruction, { "title": instrucciones.title, "description": instrucciones.description, "image": instrucciones.image, "data-astro-cid-cx7gdanv": true })}`)} </section> `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Steps.astro", "self");

const $$Instructions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Viva La UCA" })} ${renderComponent($$result, "Steps", $$Steps, {})} `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/pages/Instructions.astro", void 0);

const $$file = "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/pages/Instructions.astro";
const $$url = "/Instructions";

export { $$Instructions as default, $$file as file, $$url as url };
