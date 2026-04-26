/* Fancon — App entry */
const { useState: useSA, useEffect: useEA, useRef: useRA } = React;

/* ---- global helpers exposed for cross-file use ---- */
window.fanconScrollTo = function(target, extraOffset = 0){
  const el = (typeof target === 'string') ? document.getElementById(target) : target;
  if (!el && target !== 0) return;
  const navEl = document.querySelector('.nav');
  const navH = navEl ? navEl.getBoundingClientRect().height : 72;
  const offset = -(navH + 8 + extraOffset);
  if (window.__lenis){
    if (target === 0) window.__lenis.scrollTo(0);
    else window.__lenis.scrollTo(el, { offset });
  } else {
    if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' });
    else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
};

/* environment flags (set once at boot) */
(function(){
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.matchMedia('(max-width: 900px)').matches;
  window.__fancon = { isTouch, reduced, isSmall, lite: isTouch || reduced || isSmall };
  document.documentElement.classList.toggle('is-touch', isTouch);
  document.documentElement.classList.toggle('is-reduced', reduced);
})();

function App(){
  const [loaded, setLoaded] = useSA(false);
  const [active, setActive] = useSA('hero');
  const [modalItem, setModalItem] = useSA(null);

  /* ---- Lenis smooth scroll ---- */
  useEA(() => {
    if (!window.Lenis) return;
    const isTouch = window.__fancon && window.__fancon.isTouch;
    const lenis = new window.Lenis({
      duration: isTouch ? 0.95 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,         // native momentum on touch feels better than smoothed touch
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
    });
    window.__lenis = lenis;
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); window.__lenis = null; };
  }, []);

  /* ---- loader ---- */
  useEA(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  /* ---- active section observer ---- */
  useEA(() => {
    const ids = ['hero','work','studio','services','clients','contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loaded]);

  /* ---- keep --vh in sync (mobile address-bar shrink) ---- */
  useEA(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  return (
    <React.Fragment>
      <Loader done={loaded} />
      <Cursor />
      <TopProgress />
      <SideDots active={active} />
      <Nav active={active} />

      <main>
        <Hero />
        <Work onPlay={setModalItem} />
        <About />
        <Services />
        <Clients />
        <CTA />
      </main>
      <Footer />

      <VideoModal item={modalItem} onClose={() => setModalItem(null)} />
    </React.Fragment>
  );
}

/* mount */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
