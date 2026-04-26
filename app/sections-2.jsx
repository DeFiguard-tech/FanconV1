/* Fancon — Sections 2 (Services, Clients, CTA, Footer, VideoModal) */
const { useState: useS2, useRef: useR2, useEffect: useE2 } = React;
const { motion: m2, useScroll: uScr2, useTransform: uTr2, AnimatePresence: AP2 } = window.framerMotion || window.Motion || {};

/* ==================== SERVICES — editorial 9-tile grid ==================== */
const SERVICES = [
  { n:'01', title:'Videography',      body:'Cinematic brand films, highlight reels, and documentary-style storytelling.' },
  { n:'02', title:'Photography',      body:'Editorial and event photography that captures energy and culture.' },
  { n:'03', title:'Editing & Post',   body:'Color grading, sound design, and polished post-production.' },
  { n:'04', title:'Art Direction',    body:'Creative vision and visual strategy across every touchpoint.' },
  { n:'05', title:'Storytelling',     body:'Narrative development that translates ideas into memorable content.' },
  { n:'06', title:'Podcast Shoots',   body:'Multi-camera production with professional lighting and sound.' },
  { n:'07', title:'Animation',        body:'Motion graphics that bring ideas to life with movement.' },
  { n:'08', title:'Event Management', body:'Full production — stages, activations, and brand experiences.' },
  { n:'09', title:'Booth Production', body:'Conference booth design that commands attention.' },
];

function ServiceTile({ s, i }){
  const ref = useR2(null);
  const [shown, setShown] = useS2(false);
  useE2(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0){
        setShown(true);
      } else {
        raf = requestAnimationFrame(check);
      }
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, []);
  const delay = (i % 3) * 80 + Math.floor(i/3) * 40;
  return (
    <div
      ref={ref}
      className="svc"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      <span className="num">{s.n}</span>
      <a className="arrow-mini" href="#contact" aria-label={"Get in touch about " + s.title} onClick={(e) => { e.preventDefault(); goTo('contact'); }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
      </a>
      <h4>{s.title}</h4>
      <p>{s.body}</p>
    </div>
  );
}

function Services(){
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="services-intro">
          <FadeUpV><div className="eyebrow">— WHAT WE DO</div></FadeUpV>
          <h3>
            <RevealLineV delay={.05}>Full-spectrum</RevealLineV><br/>
            <RevealLineV delay={.18}>creative <em>services.</em></RevealLineV>
          </h3>
          <FadeUpV delay={.35}>
            <p>End-to-end production for brands that move culture forward.</p>
          </FadeUpV>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <ServiceTile key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== CLIENTS ==================== */
const CLIENTS = ['Mesh','RedotPay','Galaxy','Accountable','Sonic Labs','Rialo','Yellow'];

function Clients(){
  return (
    <section className="clients" id="clients">
      <div className="wrap">
        <div className="clients-head">
          <FadeUpV><div className="eyebrow">TRUSTED BY</div></FadeUpV>
          <h3>
            <RevealLineV delay={.05}>Our</RevealLineV><br/>
            <RevealLineV delay={.18} className="">clients<em>.</em></RevealLineV>
          </h3>
          <FadeUpV delay={.35}>
            <p>Building stories for the most ambitious teams in Web3.</p>
          </FadeUpV>
        </div>
        <div className="client-pills">
          {CLIENTS.map((c, i) => (
            <m2.span
              key={c}
              className="cpill"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: .6, delay: i * .06, ease: easeOutExpo }}
            >
              {c}
            </m2.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== CTA — matches screenshot ==================== */
function CTA(){
  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <div className="cta-inner">
          <FadeUpV><div className="eyebrow">— NOW BOOKING</div></FadeUpV>
          <h3>
            <RevealLineV delay={.05}>Let's create something</RevealLineV><br/>
            <RevealLineV delay={.18}><em>unforgettable</em></RevealLineV>
          </h3>
          <FadeUpV delay={.4}>
            <p className="cta-lede">Currently open to new projects and collaborations around the biggest Web3 events.</p>
          </FadeUpV>
          <FadeUpV delay={.5}>
            <div className="tag-pills">
              {['CONSENSUS','TOKEN2049','DEVCON'].map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </FadeUpV>
          <FadeUpV delay={.6}>
            <div className="cta-row">
              <MagneticBtn className="btn btn-primary" onClick={() => window.location.href='mailto:bizdev@fancon.xyz'}>
                Get in Touch <span className="ic"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
              </MagneticBtn>
              <MagneticBtn className="btn btn-ghost" onClick={() => window.open('https://drive.google.com/drive/folders/1de594ad2ErAyJ-UI-QjZIrl_Z2cbEbr7','_blank','noopener')}>
                Full Portfolio <span className="ic"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M9 7h8v8"/></svg></span>
              </MagneticBtn>
            </div>
          </FadeUpV>
          <FadeUpV delay={.75}>
            <div className="cta-mail">OR EMAIL US AT &nbsp; <a href="mailto:bizdev@fancon.xyz">bizdev@fancon.xyz</a></div>
          </FadeUpV>
        </div>
      </div>
    </section>
  );
}

/* ==================== FOOTER ==================== */
function Footer(){
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-col foot-brand-col">
            <div className="brand">
              <div className="brand-mark"><img src="assets/logo.png" alt="" /></div>
              <div className="brand-name">Fancon<span className="dot">.</span></div>
            </div>
            <p className="foot-blurb">A storytelling studio creating experiences for the builders of Web3, AI, and modern brands.</p>
          </div>
          <div className="foot-col">
            <h5>Studio</h5>
            <a href="#studio" onClick={(e) => navTo(e, 'studio')}>About</a>
            <a href="#work" onClick={(e) => navTo(e, 'work')}>Work</a>
            <a href="#services" onClick={(e) => navTo(e, 'services')}>Services</a>
            <a href="#clients" onClick={(e) => navTo(e, 'clients')}>Clients</a>
          </div>
          <div className="foot-col">
            <h5>Connect</h5>
            <a href="https://t.me/Swapneel25" target="_blank" rel="noopener">Telegram ↗</a>
            <a href="https://x.com/Fanconxyz" target="_blank" rel="noopener">X / Twitter ↗</a>
            <a href="https://hexagonal-fountain-393.notion.site/Highlight-your-brand-in-motion-during-Web3-s-biggest-week-2e959ecd33a5800d8f39ef62b8c4b68e" target="_blank" rel="noopener">Notion ↗</a>
            <a href="https://drive.google.com/drive/folders/1de594ad2ErAyJ-UI-QjZIrl_Z2cbEbr7" target="_blank" rel="noopener">Portfolio ↗</a>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <a href="mailto:bizdev@fancon.xyz">bizdev@fancon.xyz</a>
            <a href="#contact" onClick={(e) => navTo(e, 'contact')}>Get in touch</a>
          </div>
        </div>
        <div className="foot-bottom">
          <small>© 2026 Fancon® — Storytelling Studio.</small>
          <small>STORYTELLING / SINCE 2024</small>
        </div>
      </div>
    </footer>
  );
}

function navTo(e, id){
  e.preventDefault();
  if (window.fanconScrollTo) window.fanconScrollTo(id);
  else { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
}

/* ==================== VIDEO MODAL ==================== */
function VideoModal({ item, onClose }){
  useE2(() => {
    if (!item) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    if (window.__lenis && window.__lenis.stop) window.__lenis.stop();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (window.__lenis && window.__lenis.start) window.__lenis.start();
    };
  }, [item, onClose]);

  const renderPlayer = (w) => {
    if (w.src){
      return (
        <video
          className="vmodal-video"
          src={w.src}
          controls
          autoPlay
          playsInline
          preload="auto"
          poster={w.img || undefined}
        />
      );
    }
    if (w.driveId){
      const isFolder = w.driveType === 'folder';
      const url = isFolder
        ? `https://drive.google.com/embeddedfolderview?id=${w.driveId}#grid`
        : `https://drive.google.com/file/d/${w.driveId}/preview`;
      return (
        <iframe
          className="vmodal-iframe"
          src={url}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          title={w.title}
        />
      );
    }
    return (
      <div className="vmodal-empty">
        {w.title} · {w.runtime}
      </div>
    );
  };

  return (
    <AP2>
      {item && (
        <m2.div
          key="vmodal"
          className="vmodal-bg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: .35, ease: easeOutExpo }}
          onClick={onClose}
        >
          <m2.div
            className="vmodal-shell"
            initial={{ scale: .94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: .96, opacity: 0 }}
            transition={{ duration: .45, ease: easeOutExpo }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vmodal-meta">
              <span className="vm-label">{item.label}</span>
              <div className="vm-title-wrap">
                <h3 className="vm-title">{item.title}</h3>
                {item.sub ? <div className="vm-sub">{item.sub}</div> : null}
              </div>
              <span className="vm-runtime">{item.runtime}</span>
            </div>
            <div className="vmodal-card">
              {renderPlayer(item)}
            </div>
            <button className="vmodal-close" onClick={onClose} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6l12 12 M18 6l-12 12"/></svg>
            </button>
          </m2.div>
        </m2.div>
      )}
    </AP2>
  );
}

Object.assign(window, { Services, Clients, CTA, Footer, VideoModal });
