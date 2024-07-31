import { k as createComponent, l as renderTemplate, m as maybeRenderHead, n as addAttribute, p as renderTransition, q as renderComponent } from './astro/server_DcILUZVt.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './Layout_a7jSTbEj.mjs';
import 'clsx';
/* empty css                         */
/* empty css                         */

const $$Introduction = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="intro" data-astro-cid-aybbmsmj> <div class="container" data-astro-cid-aybbmsmj${addAttribute(renderTransition($$result, "4f3b3vs7"), "data-astro-transition-scope")}> <h2 data-astro-cid-aybbmsmj>Conocé nuestra app</h2> <p data-astro-cid-aybbmsmj>
Descubrí lo que la UCA tiene para
      ofrecerte. Navegá por nuestro campus y aprendé sobre los recursos a tu disposición.
</p> <a href="#download" class="btn" data-astro-cid-aybbmsmj>Descargar ahora</a> </div> </section> `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Introduction.astro", "self");

const $$Features = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="features" data-astro-cid-vnivfuh2> <div class="container" data-astro-cid-vnivfuh2> <h2 data-aos="fade-up" data-astro-cid-vnivfuh2>Características principales</h2> <div class="features-grid" data-astro-cid-vnivfuh2> <div class="feature" data-aos="zoom-in" data-astro-cid-vnivfuh2> <i class="fas fa-map-marked-alt" data-astro-cid-vnivfuh2></i> <h3 data-astro-cid-vnivfuh2>Rutas populares</h3> <p data-astro-cid-vnivfuh2>
Recorré las rutas más destacadas de nuestro campus y aprende sobre la
          UCA.
</p> </div> <div class="feature" data-aos="zoom-in" data-aos-delay="200" data-astro-cid-vnivfuh2> <i class="fas fa-landmark" data-astro-cid-vnivfuh2></i> <h3 data-astro-cid-vnivfuh2>Lugares populares</h3> <p data-astro-cid-vnivfuh2>
Descubrí los lugares clave de nuestro campus, como el Centro Monseñor
          Romero.
</p> </div> <div class="feature" data-aos="zoom-in" data-aos-delay="400" data-astro-cid-vnivfuh2> <i class="fas fa-award" data-astro-cid-vnivfuh2></i> <h3 data-astro-cid-vnivfuh2>Insignias y logros</h3> <p data-astro-cid-vnivfuh2>
Ganá insignias mientras explorás y compartí tus logros con tus amigos.
</p> </div> </div> </div> </section> `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Features.astro", void 0);

const $$Screenshots = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="screenshots" data-astro-cid-hlpinaev> <div class="container" data-astro-cid-hlpinaev> <h2 data-aos="fade-up" data-astro-cid-hlpinaev>Capturas de pantalla</h2> <div class="gallery" data-astro-cid-hlpinaev> <img src="images/captura1.jpg" alt="Screenshot 1" data-aos="flip-left" data-astro-cid-hlpinaev> <img src="images/captura2.jpg" alt="Screenshot 2" data-aos="flip-left" data-aos-delay="200" data-astro-cid-hlpinaev> <img src="images/captura3.jpg" alt="Screenshot 3" data-aos="flip-left" data-aos-delay="400" data-astro-cid-hlpinaev> </div> </div> </section> `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Screenshots.astro", void 0);

const $$Download = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="download" data-astro-cid-ddbcycih> <div class="container" data-aos="fade-up" data-astro-cid-ddbcycih> <h2 data-astro-cid-ddbcycih>Descargá la app</h2> <p data-astro-cid-ddbcycih>Disponible para Android. Empezá tu aventura universitaria hoy mismo.</p> <a href="apk/ViveLaUCA.apk" class="btn" id="downloadButton" data-astro-cid-ddbcycih>Descargar ahora</a> <div id="progressContainer" style="display: none;" data-astro-cid-ddbcycih> <div id="progressBar" style="width: 0%; height: 20px; background: #ff9900; border-radius: 5px;" data-astro-cid-ddbcycih></div> </div> <p id="progressText" style="display: none;" data-astro-cid-ddbcycih>Descargando... 0%</p> <p id="errorText" style="display: none; color: red;" data-astro-cid-ddbcycih></p> <button id="retryButton" style="display: none;" class="btn" data-astro-cid-ddbcycih>Reintentar descarga</button> </div> </section> <!-- Modal --> <div id="downloadModal" class="modal" style="display: none;" data-astro-cid-ddbcycih> <div class="modal-content" data-astro-cid-ddbcycih> <span class="close" data-astro-cid-ddbcycih>&times;</span> <p data-astro-cid-ddbcycih>
La descarga ha finalizado. ¿Desea ver las instrucciones de instalación?
</p> <button id="instructionsButton" class="btn" data-astro-cid-ddbcycih>Ver instrucciones</button> </div> </div>  `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Download.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <div class="container" data-aos="fade-up" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; 2024 Vive la UCA. Todos los derechos reservados.</p> <div class="social-media" data-astro-cid-sz7xmlte> <a href="#" data-astro-cid-sz7xmlte><i class="fab fa-facebook-f" data-astro-cid-sz7xmlte></i></a> <a href="#" data-astro-cid-sz7xmlte><i class="fab fa-twitter" data-astro-cid-sz7xmlte></i></a> <a href="#" data-astro-cid-sz7xmlte><i class="fab fa-instagram" data-astro-cid-sz7xmlte></i></a> </div> </div> </footer> `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/components/Footer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Viva La UCA" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Introduction", $$Introduction, {})} ${renderComponent($$result2, "Features", $$Features, {})} ${renderComponent($$result2, "Screenshots", $$Screenshots, {})} ${renderComponent($$result2, "Download", $$Download, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/pages/index.astro", void 0);

const $$file = "/Users/bryan31542/Desktop/VIVEEEEE/landing/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
