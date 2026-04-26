/* Fancon — Chrome / overlays / utilities */
const { useEffect, useRef, useState, useCallback } = React;
const {
  motion, useScroll, useTransform, useMotionValue, useSpring,
  AnimatePresence, useInView, useMotionValueEvent, useReducedMotion
} = window.framerMotion || window.Motion || {};

/* ---- helpers ---- */
const easeOutExpo = [0.16, 1, 0.3, 1];
const easeOutQuart = [0.25, 1, 0.5, 1];
const isTouchDevice = () => (window.__fancon && window.__fancon.isTouch);
const goTo = (id, extra = 0) => {
  if (window.fanconScrollTo) window.fanconScrollTo(id, extra);
  else {
    const el = (typeof id === 'string') ? document.getElementById(id) : id;
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ====== LOADER ====== */
function Loader({ done }){
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="loader"
          initial={{ opacity:1 }}
          exit={{ opacity:0, transition:{ duration:.5, ease:easeOutExpo } }}
        >
          <motion.div
            className="loader-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo }}
          />
          <motion.div
            className="loader-mark"
            initial={{ opacity:0, y: 10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: .4, duration: .6 }}
          >
            <span className="dot"></span>
            <span>FANCON / LOADING</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ====== CUSTOM CURSOR (desktop only) ====== */
function Cursor(){
  const x = useMotionValue(-50);
  const y = useMotionValue(-50);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: .25 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: .25 });
  const [hover, setHover] = useState(false);
  const [enabled] = useState(() => !isTouchDevice());

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const onOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      const interactive = t.closest('a, button, [data-cursor="hover"], .vcard, .svc, .cpill, .fp, .player-play, .nav-cta, .arrow-pill');
      setHover(!!interactive);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      className={"cursor" + (hover ? " hover" : "")}
      style={{ x: sx, y: sy }}
    />
  );
}

/* ====== TOP PROGRESS BAR ====== */
function TopProgress(){
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: .25 });
  return <motion.div className="progress" style={{ scaleX: sx }} />;
}

/* ====== SIDE DOTS / SECTION INDEX ====== */
const SECTIONS = [
  { id: 'hero', label: '01 / Intro' },
  { id: 'work', label: '02 / Work' },
  { id: 'studio', label: '03 / Studio' },
  { id: 'services', label: '04 / Services' },
  { id: 'clients', label: '05 / Clients' },
  { id: 'contact', label: '06 / Contact' },
];

function SideDots({ active }){
  return (
    <div className="sidedots" aria-hidden="true">
      {SECTIONS.map((s) => (
        <button key={s.id} className={s.id === active ? 'active' : ''} onClick={() => goTo(s.id)} aria-label={s.label}>
          <span className="label">{s.label}</span>
          <span className="dotmark"></span>
        </button>
      ))}
    </div>
  );
}

/* ====== NAV with MOBILE DRAWER ====== */
function Nav({ active }){
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body when drawer open
  useEffect(() => {
    if (open){
      document.body.style.overflow = 'hidden';
      if (window.__lenis && window.__lenis.stop) window.__lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.__lenis && window.__lenis.start) window.__lenis.start();
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // close on ESC + on resize past breakpoint
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onResize = () => { if (window.innerWidth > 1024) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, []);

  const desktopLink = (id, label) => (
    <a href={"#"+id} className={active === id ? 'active' : ''} onClick={(e) => {
      e.preventDefault(); goTo(id);
    }}>{label}</a>
  );

  const drawerLinks = [
    ['work','Work'], ['studio','Studio'], ['services','Services'], ['clients','Clients'], ['contact','Contact'],
  ];

  return (
    <React.Fragment>
      <header className={"nav" + (scrolled ? " scrolled" : "") + (open ? " is-open" : "")}>
        <div className="wrap nav-inner">
          <a href="#hero" className="brand" onClick={(e) => { e.preventDefault(); goTo(0); }}>
            <div className="brand-mark"><img src="assets/logo.png" alt="Fancon" /></div>
            <div className="brand-name">Fancon<span className="dot">.</span></div>
          </a>

          <nav className="nav-links">
            {desktopLink('work','Work')}
            {desktopLink('studio','Studio')}
            {desktopLink('services','Services')}
            {desktopLink('contact','Contact')}
            <a href="https://t.me/Swapneel25" target="_blank" rel="noopener" className="nav-cta" aria-label="Message on Telegram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </a>
          </nav>

          <button
            className={"nav-burger" + (open ? " open" : "")}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span></span><span></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            className="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .35, ease: easeOutExpo }}
          >
            <motion.div
              className="drawer-panel"
              initial={{ y: '-6%' }}
              animate={{ y: 0 }}
              exit={{ y: '-4%', opacity: 0 }}
              transition={{ duration: .55, ease: easeOutExpo }}
            >
              <div className="drawer-meta">
                <span className="rec-dot"></span>
                <span>FANCON · MENU</span>
              </div>
              <ul className="drawer-list">
                {drawerLinks.map(([id, label], i) => (
                  <motion.li
                    key={id}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: .12 + i * .06, duration: .65, ease: easeOutExpo }}
                  >
                    <a
                      href={"#"+id}
                      className={active === id ? 'active' : ''}
                      onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goTo(id), 240); }}
                    >
                      <span className="dlabel">{label}</span>
                      <span className="dnum">0{i+1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="drawer-foot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .5, duration: .7, ease: easeOutExpo }}
              >
                <a href="mailto:bizdev@fancon.xyz">bizdev@fancon.xyz</a>
                <div className="drawer-socials">
                  <a href="https://t.me/Swapneel25" target="_blank" rel="noopener">Telegram ↗</a>
                  <a href="https://x.com/Fanconxyz" target="_blank" rel="noopener">X ↗</a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}

/* ====== MAGNETIC BUTTON (desktop only — graceful on touch) ====== */
function MagneticBtn({ children, className, onClick, strength = 18 }){
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });
  const enabled = !isTouchDevice();

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width/2;
    const cy = r.top + r.height/2;
    x.set((e.clientX - cx) / (r.width/2) * strength);
    y.set((e.clientY - cy) / (r.height/2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={enabled ? { x: sx, y: sy } : undefined}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

/* ====== REVEAL TEXT (line-by-line mask) ====== */
function RevealLine({ children, delay = 0, className = '' }){
  return (
    <span className={"word " + className}>
      <motion.span
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: .9, delay, ease: easeOutExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({ children, delay = 0, y = 30, className, once = true }){
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .9, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

/* In-view variants for sections farther down */
function RevealLineV({ children, delay = 0, className = '' }){
  return (
    <span className={"word " + className}>
      <motion.span
        initial={{ y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: .9, delay, ease: easeOutExpo }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUpV({ children, delay = 0, y = 30, className }){
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: .9, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

/* ====== CINEMATIC MARQUEE STRIP (between sections) ====== */
function MarqueeStrip(){
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] });
  const x  = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const xR = useTransform(scrollYProgress, [0, 1], ['-12%', '0%']);

  const items = [
    'CINEMATIC FILMMAKING',
    'EVENT COVERAGE',
    'BRAND STORYTELLING',
    'WEB3 · AI · MODERN BRANDS',
    'PHOTOGRAPHY',
    'POST-PRODUCTION',
    'CREATIVE DIRECTION',
  ];
  const sep = <span className="m-sep" aria-hidden="true">✦</span>;
  const row = (k) => (
    <div className="m-row" key={k}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <span>{it}</span>
          {sep}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section className="strip" ref={ref} aria-hidden="true">
      <motion.div className="strip-track" style={{ x }}>
        <div className="m-line m-line-1">
          {row('a')}{row('b')}
        </div>
      </motion.div>
      <motion.div className="strip-track strip-track-rev" style={{ x: xR }}>
        <div className="m-line m-line-2">
          {row('c')}{row('d')}
        </div>
      </motion.div>
    </section>
  );
}

/* ====== EXPORT ====== */
Object.assign(window, {
  Loader, Cursor, TopProgress, SideDots, Nav,
  MagneticBtn, RevealLine, FadeUp, RevealLineV, FadeUpV,
  MarqueeStrip,
  SECTIONS, easeOutExpo, easeOutQuart, goTo,
});
