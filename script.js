// Dropdown "Servicios" (hover en desktop + click accesible)
document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelector('#services');
  const menu = document.querySelector('#servicesMenu');
  const toggle = document.querySelector('#servicesToggle');

  if (services && menu && toggle) {
    // Hover (desktop)
    services.addEventListener('mouseenter', () => {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    });
    services.addEventListener('mouseleave', () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    });

    // Click (fallback / accesible)
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isHidden));
    });

    // Cerrar al hacer click en un enlace del menú
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

// === Hero: rotar imágenes + frases centradas ===
document.addEventListener('DOMContentLoaded', () => {
  const imgEl = document.getElementById('heroSlide');
  const capEl = document.getElementById('heroCaption');
  if (!imgEl || !capEl) return;

  // Rutas de tus imágenes (en ./images/inicio/)
  const slides = [
    './images/inicio/logopedia-inicio-1.jpg',
    './images/inicio/psicologia-inicio-1.jpg',
    './images/inicio/logopedia-inicio-2.jpg',
    './images/inicio/psicologia-inicio-2.jpg'
  ];

  // Frases (mismo orden y cantidad que las imágenes)
  const captions = ['La vida', 'Paz', 'El amor', 'La salud'];
  const alts     = ['Logopedia inicio 1', 'Psicología inicio 1', 'Logopedia inicio 2', 'Psicología inicio 2'];

  // Pre-cargar imágenes
  slides.forEach(src => { const im = new Image(); im.src = src; });

  let i = 0;
  const DURATION = 5000; // ms entre cambios (ajusta a tu gusto)

  // helper para reiniciar animación
  function animateOnce(el, className) {
    el.classList.remove(className);
    void el.offsetWidth; // fuerza reflow
    el.classList.add(className);
  }

  function nextSlide() {
    i = (i + 1) % slides.length;
    imgEl.src = slides[i];
    imgEl.alt = alts[i];
    capEl.textContent = captions[i];
    capEl.setAttribute('aria-label', captions[i]);

    // Re-lanzar animaciones opuestas
    animateOnce(imgEl.parentElement, 'is-animating'); // contenedor .hero-visual
    animateOnce(capEl, 'is-animating');
  }

  // Inicial coherente al cargar
  imgEl.src = slides[0];
  imgEl.alt = alts[0];
  capEl.textContent = captions[0];
  capEl.setAttribute('aria-label', captions[0]);

  // Primera animación al cargar
  animateOnce(imgEl.parentElement, 'is-animating');
  animateOnce(capEl, 'is-animating');

  // Cambio automático
  setInterval(nextSlide, DURATION);
});
