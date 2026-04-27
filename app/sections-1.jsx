/* Fancon — Sections */
const { useEffect: useEffectS, useRef: useRefS, useState: useStateS, useMemo: useMemoS } = React;
const { motion: m, useScroll: useScrollS, useTransform: useTransformS, AnimatePresence: AP } = window.framerMotion || window.Motion || {};

const _lite = () => !!(window.__fancon && window.__fancon.lite);

/* ==================== HERO (cinematic) ==================== */
function Hero(){
  const ref = useRefS(null);
  const [lite] = useStateS(() => _lite());
  const { scrollYProgress } = useScrollS({ target: ref, offset: ['start start', 'end start'] });

  // parallax layers — toned down on mobile/reduced-motion
  const yBg      = useTransformS(scrollYProgress, [0,1], ['0%', lite ? '6%'  : '18%']);
  const sBg      = useTransformS(scrollYProgress, [0,1], [1.06, lite ? 1.10 : 1.18]);
  const ySwirls  = useTransformS(scrollYProgress, [0,1], [0, lite ? -80  : -240]);
  const rSwirls  = useTransformS(scrollYProgress, [0,1], [0, lite ? 22   : 70]);
  const oContent = useTransformS(scrollYProgress, [0,.7], [1, 0]);
  const yContent = useTransformS(scrollYProgress, [0,1], [0, lite ? -60 : -160]);

  return (
    <section className="hero hero-cinema" id="hero" ref={ref}>
      {/* full-bleed background image with ken-burns */}
      <m.div className="hero-bg" style={{ y: yBg, scale: sBg }}>
        <img src="assets/hero.png" alt="" loading="eager" fetchpriority="high" />
      </m.div>
      <div className="hero-vignette" aria-hidden="true"></div>
      <div className="hero-grain" aria-hidden="true"></div>

      {/* lime orbital swirls behind type */}
      <m.svg
        className="hero-orbits"
        viewBox="0 0 1200 1200"
        fill="none"
        aria-hidden="true"
        style={{ y: ySwirls, rotate: rSwirls }}
      >
        <defs>
          <radialGradient id="hg1" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#c8e636" stopOpacity="0" />
            <stop offset="100%" stopColor="#c8e636" stopOpacity=".42" />
          </radialGradient>
        </defs>
        <circle cx="600" cy="600" r="580" stroke="url(#hg1)" strokeWidth="1" />
        <circle cx="600" cy="600" r="460" stroke="#c8e636" strokeOpacity=".15" strokeWidth="1" />
        <circle cx="600" cy="600" r="340" stroke="#c8e636" strokeOpacity=".08" strokeWidth="1" />
        <ellipse cx="600" cy="600" rx="560" ry="210" stroke="#c8e636" strokeOpacity=".10" strokeWidth="1" transform="rotate(-22 600 600)" />
        <ellipse cx="600" cy="600" rx="540" ry="170" stroke="#c8e636" strokeOpacity=".06" strokeWidth="1" transform="rotate(18 600 600)" />
        {!lite && (
          <m.circle cx="600" cy="20" r="4" fill="#c8e636"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '600px', originY: '600px' }} />
        )}
      </m.svg>

      {/* TOP META RAIL */}
      <m.div
        className="hero-meta"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: .8, ease: easeOutExpo }}
      >
        <div className="hero-meta-l">
          <span className="rec-dot"></span>
          <span>REC · 2026</span>
        </div>
        <div className="hero-meta-c">FANCON STUDIO — STORYTELLERS</div>
        <div className="hero-meta-r">
          <span>EST. 2024</span>
        </div>
      </m.div>

      {/* CENTERPIECE */}
      <m.div className="hero-stage" style={{ opacity: oContent, y: yContent }}>
        <m.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: .7, ease: easeOutExpo }}
        >
          <span className="hb-line"></span>
          <span>WEB3 · AI · MODERN BRANDS</span>
          <span className="hb-line"></span>
        </m.div>

        <h1 className="hero-display">
          <HeroLine words={['Creating']} delay={1.85} />
          <HeroLine words={['Creative']} delay={2.05} lime italic />
          <HeroLine words={['Experiences']} delay={2.25} />
        </h1>

        <m.p
          className="hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: .8, ease: easeOutExpo }}
        >
          A storytelling studio for filmmaking, photography, and events —
          built for the founders of <em>Web3</em>, <em>AI</em>, and <em>modern brands</em>.
        </m.p>

        <m.div
          className="hero-actions hero-actions-c"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.65, duration: .8, ease: easeOutExpo }}
        >
          <MagneticBtn className="btn btn-primary" onClick={() => goTo('work')}>
            View Work
            <span className="ic"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
          </MagneticBtn>
          <MagneticBtn className="btn btn-ghost" onClick={() => goTo('contact')}>
            Get in Touch
            <span className="ic"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
          </MagneticBtn>
        </m.div>

        <m.div
          className="hero-stats"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.85, duration: .8, ease: easeOutExpo }}
        >
          <Stat n="50+" label="Events Covered" />
          <span className="hs-div"></span>
          <Stat n="20+" label="Core Clients" />
          <span className="hs-div"></span>
          <Stat n="∞" label="Stories Told" lime />
        </m.div>
      </m.div>

      {/* SCROLL CUE bottom-left */}
      <m.div
        className="hero-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: .8 }}
      >
        <span className="hc-bar"></span>
        <span className="hc-label">SCROLL TO EXPLORE</span>
      </m.div>
    </section>
  );
}

/* per-character masked-reveal headline line */
function HeroLine({ words, delay = 0, lime, italic }){
  const text = Array.isArray(words) ? words.join(' ') : String(words);
  const chars = [...text];
  return (
    <span className={"hl " + (lime ? 'lime ' : '') + (italic ? 'italic' : '')}>
      <span className="hl-mask">
        {chars.map((c, i) => (
          <m.span
            key={i}
            className="hl-c"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              delay: delay + i * 0.022,
              duration: 0.95,
              ease: easeOutExpo,
            }}
          >
            {c === ' ' ? ' ' : c}
          </m.span>
        ))}
      </span>
    </span>
  );
}

function Stat({ n, label, lime }){
  const ref = useRefS(null);
  const [val, setVal] = useStateS(typeof n === 'string' && /^\d/.test(n) ? '0' : n);
  useEffectS(() => {
    if (typeof n !== 'string' || !/^\d/.test(n)) return;
    const target = parseInt(n, 10);
    const suffix = n.replace(/^\d+/, '');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          const dur = 1200;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const cur = Math.round(eased * target);
            setVal(cur + suffix);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      });
    }, { threshold: .3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [n]);
  return (
    <div className="stat" ref={ref}>
      <div className="num">{lime ? <em>{val}</em> : val}</div>
      <div className="lab">{label}</div>
    </div>
  );
}

/* ==================== ABOUT / STUDIO ==================== */
function About(){
  const ref = useRefS(null);
  const [lite] = useStateS(() => _lite());
  const { scrollYProgress } = useScrollS({ target: ref, offset: ['start end', 'end start'] });
  const yCollage = useTransformS(scrollYProgress, [0,1], lite ? ['0%','0%']  : ['8%','-8%']);
  const yT1      = useTransformS(scrollYProgress, [0,1], lite ? [0,0]        : [60, -40]);
  const yT2      = useTransformS(scrollYProgress, [0,1], lite ? [0,0]        : [20, -10]);
  const yT3      = useTransformS(scrollYProgress, [0,1], lite ? [0,0]        : [40, -20]);
  const yT4      = useTransformS(scrollYProgress, [0,1], lite ? [0,0]        : [0, -30]);

  return (
    <section className="about" id="studio" ref={ref}>
      <div className="wrap">
        <div className="about-grid">
          <div>
            <FadeUpV><div className="eyebrow">EST. 2024</div></FadeUpV>
            <h2>
              <RevealLineV delay={.05}>We make</RevealLineV><br/>
              <RevealLineV delay={.18}>visuals people</RevealLineV><br/>
              <RevealLineV delay={.30} className="">remember<em>.</em></RevealLineV>
            </h2>
            <FadeUpV delay={.4}>
              <p>Fancon is a storytelling studio working across events, filmmaking, photography, and creative direction. We partner with founders, brands, and communities to turn ideas into unforgettable stories and experiences.</p>
            </FadeUpV>
            <FadeUpV delay={.55}>
              <div className="author">
                <div>
                  <img className="sig" src="assets/signature.png" alt="Swapneel signature" />
                  <div className="who">FOUNDER, FANCON</div>
                </div>
                <div className="badge">
                  <div className="b-inner"><img src="assets/logo.png" alt="" /></div>
                  <svg viewBox="0 0 120 120">
                    <defs>
                      <path id="circ-text" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                    </defs>
                    <text fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#a9aa9f" letterSpacing="3">
                      <textPath href="#circ-text">STORYTELLING STUDIO • FANCON • STORYTELLING STUDIO • FANCON • </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </FadeUpV>
          </div>

          <m.div className="about-collage" style={{ y: yCollage }}>
            <m.div className="tile t1" style={{ y: yT1 }}>
              <img src="assets/about_crowd.png" alt="" loading="lazy" />
            </m.div>
            <m.div className="tile t2" style={{ y: yT2 }}>
              <img src="assets/about_camera.png" alt="" loading="lazy" />
            </m.div>
            <m.div className="tile t3" style={{ y: yT3 }}>
              <img src="assets/about_lens.png" alt="" loading="lazy" />
            </m.div>
            <m.div className="tile t4" style={{ y: yT4 }}>
              <div className="quote">Create<br/>experiences<br/><b>people remember.</b></div>
            </m.div>
            <div className="vcaption">GREAT EXPERIENCES COME TOGETHER</div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

/* ==================== WORK (sticky title + cards) ==================== */
/* Video sources:
 *   src      → local mp4 in /assets/videos (plays inline in modal + as card poster)
 *   driveId  → Google Drive file ID, embedded via /preview iframe in modal
 */
const WORK_ITEMS = [
  /* — Event Recaps — */
  { id:1, cat:'event', corner:'EVENT FILM · TOKEN2049 DUBAI', label:'Event Film',
    title:'Galaxy', sub:'Token2049 Dubai', runtime:'02:36',
    img:'assets/work_galaxy.jpg',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/galaxy.mp4' },

  { id:2, cat:'event', corner:'SUMMIT · GREECE 2023', label:'Summit Recap',
    title:'Future of Humanity', sub:'Summit · Greece', runtime:'03:12',
    img:'assets/work_humanity.png',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/humanity.mp4' },

  { id:3, cat:'event', corner:'HIGHLIGHT REEL · TOKEN2049', label:'Highlight Reel',
    title:'Accountable', sub:'Token2049 Recap', runtime:'01:42',
    img:'assets/work_accountable.png',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/accountable.mp4' },

  { id:4, cat:'event', corner:'NFT LAUNCH · BANGKOK', label:'NFT Launch',
    title:'Beyond Graf', sub:'Launch Party', runtime:'01:30',
    img:'assets/videos/covers/beyond-graf.jpg',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/beyond-graf.mp4' },

  { id:5, cat:'event', corner:'BRAND FILM · BANGKOK', label:'Brand Film',
    title:'Magiceden', sub:'Bobblehaus Drop', runtime:'02:14',
    img:'assets/work_magiceden.png',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/magiceden.mp4' },

  /* — Interviews — */
  { id:6, cat:'interview', corner:'INTERVIEW · BITCOIN MIAMI', label:'Interview · Bitcoin Miami',
    title:'Michael Saylor', sub:'Bitcoin Miami', runtime:'04:32',
    img:'assets/work_saylor.png',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/saylor.mp4' },

  { id:7, cat:'interview', corner:'INTERVIEW · TOKEN2049 DUBAI', label:'Interview · Token2049',
    title:'Investcon', sub:'StationX × Token2049', runtime:'02:08',
    img:'assets/work_investcon.png',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/investcon.mp4' },

  /* — Launch Videos — */
  { id:8, cat:'explainer', corner:'LAUNCH FILM · ALEO', label:'Launch Film',
    title:'Aleo', sub:'Launch Explainer', runtime:'00:54',
    img:'assets/videos/covers/aleo.jpg',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/aleo.mp4' },

  { id:9, cat:'explainer', corner:'INTRO FILM · KAITO', label:'Intro Film',
    title:'Kaito', sub:'Intro Video', runtime:'01:12',
    img:'assets/videos/covers/kaito.jpg',
    src:'https://pub-d6d89f9162314d25aa972928430e153a.r2.dev/kaito.mp4' },
];

function Work({ onPlay }){
  const [filter, setFilter] = useStateS('all');
  const items = WORK_ITEMS.filter(w => filter === 'all' || w.cat === filter);

  return (
    <section className="work-wrap" id="work">
      <div className="wrap">
        <div className="work-grid-shell">
          <aside className="work-sticky">
            <FadeUpV><div className="eyebrow">SELECTED WORK</div></FadeUpV>
            <div className="work-head">
              <h2>
                <RevealLineV delay={.05}>Stories</RevealLineV><br/>
                <RevealLineV delay={.18}>worth</RevealLineV><br/>
                <RevealLineV delay={.30} className=""><em>watching.</em></RevealLineV>
              </h2>
              <FadeUpV delay={.4}>
                <p>A small selection of recent films, recaps, and launch pieces. Press play.</p>
              </FadeUpV>
            </div>
            <FadeUpV delay={.5}>
              <div className="work-pills" role="tablist">
                {[
                  ['all','All'],
                  ['event','Event Recaps'],
                  ['interview','Interviews'],
                  ['explainer','Launch Videos'],
                ].map(([k,l]) => (
                  <button key={k} role="tab" aria-selected={filter===k} className={"fp" + (filter===k ? ' active' : '')} onClick={() => setFilter(k)}>{l}</button>
                ))}
              </div>
            </FadeUpV>
          </aside>

          <div className="work-cards">
            {items.map((w, i) => (
              <WorkCard key={w.id} w={w} i={i} onPlay={onPlay} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ w, i, onPlay }){
  const ref = useRefS(null);
  const vidRef = useRefS(null);
  const [lite] = useStateS(() => _lite());
  const [hover, setHover] = useStateS(false);
  const { scrollYProgress } = useScrollS({ target: ref, offset: ['start end', 'end start'] });
  const yThumb = useTransformS(scrollYProgress, [0,1], lite ? ['0%','0%'] : ['-8%', '8%']);

  // hover-preview for local-video cards
  useEffectS(() => {
    const v = vidRef.current;
    if (!v || !w.src) return;
    if (hover && !lite){
      v.currentTime = 0;
      const p = v.play(); if (p && p.catch) p.catch(()=>{});
    } else {
      v.pause();
      try { v.currentTime = 0; } catch(_){}
    }
  }, [hover, lite, w.src]);

  return (
    <m.article
      ref={ref}
      className={"vcard" + (w.src ? " vcard-local" : "")}
      initial={{ opacity:0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: .9, delay: i * .05, ease: easeOutExpo }}
      whileHover={lite ? undefined : { scale: 1.01 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onPlay(w)}
    >
      <m.div className="thumb" style={{ y: yThumb }}>
        {w.src ? (
          <video
            ref={vidRef}
            src={w.src}
            muted
            playsInline
            preload="metadata"
            loop
            poster={w.img || undefined}
          />
        ) : (
          <img src={w.img} alt="" loading="lazy" />
        )}
      </m.div>
      <span className="corner">{w.corner}</span>
      <button className="play" aria-label={"Play " + w.title}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 7,20 20,12"/></svg>
      </button>
      <div className="meta">
        <div className="meta-text">
          <h4>{w.title}</h4>
          {w.sub ? <div className="sub">{w.sub}</div> : null}
        </div>
        <span className="runtime">{w.runtime}</span>
      </div>
    </m.article>
  );
}

Object.assign(window, { Hero, HeroLine, About, Work, Stat, WorkCard, WORK_ITEMS });
