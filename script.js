// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#menuBtn');
  const panel = document.querySelector('#mobilePanel');
  btn?.addEventListener('click', () => panel?.classList.toggle('hidden'));

  // Dropdown "Servicios"
  const services = document.querySelector('#services');
  const menu = document.querySelector('#servicesMenu');
  const toggle = document.querySelector('#servicesToggle');

  if (services && menu && toggle) {
    // Hover (desktop)
    services.addEventListener('mouseenter', () => menu.classList.remove('hidden'));
    services.addEventListener('mouseleave', () => menu.classList.add('hidden'));

    // Click (móvil/desktop)
    toggle.addEventListener('click', (e) => {
      e.preventDefault();                 // solo el botón toggle
      menu.classList.toggle('hidden');
    });

    // Cerrar al hacer click en un enlace del menú
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => menu.classList.add('hidden'));
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
    './images/inicio/logopedia-inicio-2.jpg',
    './images/inicio/logopedia-inicio-3.jpg'
  ];

  // Frases (mismo orden y cantidad que las imágenes)
  const captions = [
    'La vida',
    'El amor',
    'La salud'
  ];

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
    capEl.textContent = captions[i];

    // Re-lanzar animaciones opuestas
    animateOnce(imgEl.parentElement, 'is-animating'); // contenedor .hero-visual
    animateOnce(capEl, 'is-animating');
  }

  // Primera animación al cargar
  animateOnce(imgEl.parentElement, 'is-animating');
  animateOnce(capEl, 'is-animating');

  // Cambio automático
  setInterval(nextSlide, DURATION);
});
