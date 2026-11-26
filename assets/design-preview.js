(() => {
  const layers = [...document.querySelectorAll('.design-backdrop img')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const sources = Array.from({ length: 7 }, (_, index) => {
    const image = new Image();
    image.src = `assets/images/hero-design-${index + 1}.png`;
    return image;
  });
  let current = 0;
  let active = 0;
  let timer;

  function advance() {
    const next = (current + 1) % sources.length;
    if (!sources[next].complete || !sources[next].naturalWidth) return;
    const incoming = layers[1 - active];
    incoming.src = sources[next].src;
    incoming.classList.add('is-active');
    layers[active].classList.remove('is-active');
    current = next;
    active = 1 - active;
  }

  function update() {
    clearInterval(timer);
    if (!reducedMotion.matches && !document.hidden) timer = setInterval(advance, 3000);
  }
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
})();
