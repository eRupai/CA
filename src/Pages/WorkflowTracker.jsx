import { useState, useEffect } from "react";

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap');

    :root {
      --bg: #F8F4EE;
      --bg2: #F0EAE0;
      --text: #111111;
      --text2: #6F6A64;
      --text3: #A8A39C;
      --accent: #9B6B43;
      --accent-line: #C6A16E;
      --dark: #111111;
      --dark2: #1A1714;
      --border: #E2D9CC;
      --white: #FFFFFF;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px;
      background: var(--dark); color: white;
      font-family: 'Inter', sans-serif; font-size: 10px;
      letter-spacing: 0.22em; text-transform: uppercase; font-weight: 600;
      border: none; padding: 14px 30px; cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-primary:hover { background: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(155,107,67,0.28); }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--text2);
      font-family: 'Inter', sans-serif; font-size: 10px;
      letter-spacing: 0.22em; text-transform: uppercase;
      border-bottom: 1px solid var(--border); padding-bottom: 2px;
      cursor: pointer; text-decoration: none;
      transition: all 0.3s ease;
    }
    .btn-outline:hover { color: var(--accent); border-color: var(--accent); }

    .nav-link {
      font-family: 'Inter', sans-serif; font-size: 10.5px;
      letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none;
      color: var(--text2); transition: color 0.25s ease; padding-bottom: 2px;
    }
    .nav-link:hover { color: var(--accent); }
    .nav-link.active { color: var(--text); border-bottom: 1.5px solid var(--text); }

    .panel-btn:hover { background: var(--accent) !important; transform: translateY(-2px); }
    .panel-btn { transition: all 0.3s ease !important; }

    .collection-card:hover img { transform: scale(1.05); }
    .shop-btn { transition: all 0.3s ease; }
    .shop-btn:hover { background: var(--accent) !important; border-color: var(--accent) !important; }

    .grain-overlay {
      position: fixed; inset: 0; pointer-events: none; z-index: 9999;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.028;
    }

    /* Mobile nav drawer */
    .mobile-nav-overlay {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(17,13,8,0.5); backdrop-filter: blur(4px);
    }
    .mobile-nav-drawer {
      position: fixed; top: 0; right: 0; bottom: 0; width: min(320px, 85vw);
      background: #F8F4EE; z-index: 201; padding: 24px;
      display: flex; flex-direction: column; gap: 8px;
      box-shadow: -8px 0 40px rgba(0,0,0,0.15);
      transform: translateX(0); transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
    }

    /* Horizontal scroll panels on mobile */
    .panels-scroll-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .panels-scroll-wrapper::-webkit-scrollbar { display: none; }

    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .hamburger-btn { display: flex !important; }
      .hero-split { flex-direction: column !important; }
      .hero-img-side { width: 100% !important; height: 55vw !important; min-height: 220px !important; max-height: 340px !important; }
      .hero-content { padding: 32px 20px !important; }
      .hero-chips { flex-direction: column !important; gap: 0 !important; }
      .hero-chip-divider { display: none !important; }
      .trust-bar-grid { grid-template-columns: 1fr 1fr !important; }
      .trust-bar-item { border-right: none !important; border-bottom: 1px solid #E2D9CC; padding: 14px 12px !important; }
      .trust-bar-item:nth-child(odd) { border-right: 1px solid #E2D9CC !important; }
      .trust-bar-item:nth-child(3), .trust-bar-item:nth-child(4) { border-bottom: none; }
      .panels-inner { min-width: max-content; height: 420px !important; }
      .panel-item-active { flex: 0 0 280px !important; }
      .panel-item-inactive { flex: 0 0 64px !important; }
      .collections-grid { grid-template-columns: 1fr !important; }
      .collection-card-item { height: 300px !important; }
      .why-section { margin: 0 0 60px !important; }
      .why-content { padding: 56px 28px !important; }
      .testimonials-grid { grid-template-columns: 1fr !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 40px 20px !important; }
      .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; padding: 16px 20px !important; }
      .footer-divider { margin: 0 20px !important; }
      .section-pad { padding: 60px 20px !important; }
      .panels-header { padding: 0 20px 36px !important; }
      .header-pad { padding: 0 20px !important; }
      .announcement { font-size: 9px !important; letter-spacing: 0.18em !important; }
      .hero-btns { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
    }

    @media (min-width: 769px) {
      .hamburger-btn { display: none !important; }
      .desktop-nav { display: flex !important; }
    }
  `}</style>
);

const PRODUCTS = [
  { name: "Classic Belt", price: "Rs. 9,600", original: "Rs. 10,600", sale: true, tag: "Bestseller", img: "https://images.unsplash.com/photo-1624222247344-550fb60fe8ff?w=800&q=90", desc: "Full-grain leather, hand-stitched edges, solid brass hardware.", accent: "#9B6B43" },
  { name: "The Monarch Wallet", price: "Rs. 5,800", original: null, sale: false, tag: "New", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=90", desc: "Slim card-slot design. Ages beautifully with use.", accent: "#5C7A8A" },
  { name: "Men's Dress Belt", price: "Rs. 9,100", original: "Rs. 10,100", sale: true, tag: "Sale", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=90", desc: "Polished finish, tapered profile — made for dress occasions.", accent: "#4A7260" },
  { name: "Heavy Duty Belt", price: "Rs. 10,100", original: "Rs. 11,600", sale: true, tag: "Sale", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=90", desc: "8–9 oz veg-tan leather. Built to last decades.", accent: "#7A4A40" },
  { name: "Artisan Keyholder", price: "Rs. 3,200", original: null, sale: false, tag: "New", img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=90", desc: "Compact, hand-burnished leather keyholder with brass ring.", accent: "#8B7040" },
  { name: "Bifold Classic", price: "Rs. 6,400", original: "Rs. 7,200", sale: true, tag: "Sale", img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=90", desc: "Traditional bifold with currency slot and 6 card pockets.", accent: "#4A5C7A" },
];

const STORY_SLIDES = [
  { img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=85", heading: "Built by Hand", body: "Every cut, stitch, and burnish is done by us — a husband and wife team in Northern Kentucky. No factories, no shortcuts." },
  { img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=900&q=85", heading: "Full-Grain Leather Only", body: "We source the top layer of the hide — the strongest, most durable, and most beautiful part. It develops a rich patina that tells your story." },
  { img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=900&q=85", heading: "Lifetime Quality Promise", body: "We stand behind every piece. If something goes wrong through normal use, we'll repair or replace it. Period." },
];

const Logo = ({ size = 28, dark = true }) => (
  <svg width={size} height={size * 0.64} viewBox="0 0 28 18" fill="none">
    <path d="M14 0L28 10H21L14 18L7 10H0L14 0Z" fill={dark ? "#111111" : "#F8F4EE"} opacity="0.92" />
    <path d="M14 5L22 11H17L14 15L11 11H6L14 5Z" fill={dark ? "#F8F4EE" : "#111111"} />
  </svg>
);

const Arr = ({ dir = "right", size = 16 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    {dir === "right" ? <path d="M5 12h14M12 5l7 7-7 7" /> : <path d="M19 12H5M12 19l-7-7 7-7" />}
  </svg>
);

function StoryModal({ open, onClose }) {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; setSlide(0); }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const go = (dir) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => { setSlide(s => (s + dir + STORY_SLIDES.length) % STORY_SLIDES.length); setFading(false); }, 220);
  };
  if (!open) return null;
  const s = STORY_SLIDES[slide];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:16, background:"rgba(17,13,8,0.88)", backdropFilter:"blur(16px)" }} onClick={onClose}>
      <div style={{ background:"#F8F4EE", width:"100%", maxWidth:680, display:"flex", flexDirection:"column", maxHeight:"92vh", overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
        {/* Image row — stacks on top on mobile */}
        <div style={{ position:"relative", height:200, flexShrink:0, overflow:"hidden" }}>
          <img src={s.img} alt={s.heading} style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.75) contrast(1.05)", opacity:fading?0:1, transition:"opacity 0.22s" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(17,13,8,0.7) 0%, transparent 55%)" }} />
          <div style={{ position:"absolute", bottom:14, left:0, right:0, display:"flex", justifyContent:"center", gap:6 }}>
            {STORY_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} style={{ width:i===slide?22:6, height:6, borderRadius:99, background:i===slide?"#C6A16E":"rgba(255,255,255,0.35)", border:"none", cursor:"pointer", transition:"all 0.3s" }} />
            ))}
          </div>
        </div>
        {/* Content */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"28px 28px 24px", overflowY:"auto", background:"#F8F4EE" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Logo size={20} />
              <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:"#6F6A64", fontWeight:600 }}>Asad</span>
            </div>
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#A8A39C", fontSize:20, lineHeight:1, padding:"4px 8px" }}>✕</button>
          </div>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:9, letterSpacing:"0.4em", textTransform:"uppercase", color:"#9B6B43", marginBottom:8 }}>Our Story</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:26, color:"#111111", marginBottom:12, lineHeight:1.15, fontWeight:500, opacity:fading?0:1, transition:"opacity 0.22s" }}>{s.heading}</h2>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:13.5, color:"#6F6A64", lineHeight:1.85, opacity:fading?0:1, transition:"opacity 0.22s" }}>{s.body}</p>
          <div style={{ marginTop:20, paddingTop:18, borderTop:"1px solid #E2D9CC", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", textAlign:"center", gap:8 }}>
            {[["2019","Founded"],["100%","Handmade"],["∞","Guarantee"]].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:22, color:"#111111", fontWeight:500 }}>{v}</div>
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"#A8A39C", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:16, paddingTop:14, borderTop:"1px solid #E2D9CC" }}>
            <button onClick={() => go(-1)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.24em", textTransform:"uppercase", color:"#A8A39C", display:"flex", alignItems:"center", gap:6, padding:"8px 4px" }}><Arr dir="left" size={12} /> Prev</button>
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:"#C6A16E" }}>{slide+1} / {STORY_SLIDES.length}</span>
            <button onClick={() => go(1)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.24em", textTransform:"uppercase", color:"#A8A39C", display:"flex", alignItems:"center", gap:6, padding:"8px 4px" }}>Next <Arr size={12} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductPanels() {
  const [active, setActive] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ width:"100%", background:"#111111", padding:"80px 0 0" }}>
      <div className="panels-header" style={{ padding:"0 48px 48px" }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.38em", textTransform:"uppercase", color:"#C6A16E", marginBottom:10 }}>Handpicked For You</p>
        <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(26px, 3vw, 48px)", color:"white", margin:0, fontWeight:400 }}>Our Collections</h2>
      </div>
      <div className="panels-scroll-wrapper">
        <div className="panels-inner" style={{ display:"flex", height:"clamp(380px, 50vw, 560px)", width:"100%" }}>
          {PRODUCTS.map((p, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                className={isActive ? "panel-item-active" : "panel-item-inactive"}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  flex: isActive ? "4 1 0" : "1 1 0",
                  transition: "flex 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  minWidth: isMobile ? (isActive ? 280 : 64) : 60,
                  maxWidth: isMobile ? (isActive ? 280 : 64) : "none",
                  flexShrink: 0,
                }}
              >
                <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", transform: isActive ? "scale(1.04)" : "scale(1.12)", transition:"transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)", filter: isActive ? "brightness(0.75) contrast(1.05) saturate(0.9)" : "brightness(0.38) saturate(0.5)" }} />
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, rgba(17,13,8,0.95) 0%, rgba(17,13,8,0.15) 50%, transparent 100%)` }} />
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(to right, rgba(17,13,8,0.5) 0%, transparent 60%)` }} />
                <span style={{ position:"absolute", top:16, left:16, fontFamily:"'Inter', sans-serif", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:700, background: p.tag==="New" ? "#9B6B43" : p.tag==="Bestseller" ? "#111111" : "#4A5C7A", color:"white", padding:"4px 10px", opacity: isActive ? 1 : 0, transition:"opacity 0.3s", border: p.tag==="Bestseller" ? "1px solid #C6A16E" : "none" }}>{p.tag}</span>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding: isActive ? "24px 24px 32px" : "20px 0 32px", transition:"padding 0.4s" }}>
                  {!isActive && (
                    <div style={{ writingMode:"vertical-rl", textOrientation:"mixed", fontFamily:"'Cormorant Garamond', serif", fontSize:13, color:"rgba(255,255,255,0.65)", letterSpacing:"0.08em", transform:"rotate(180deg)", alignSelf:"center", marginBottom:8, fontStyle:"italic" }}>{p.name}</div>
                  )}
                  {isActive && (
                    <div>
                      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:9, letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:6 }}>{p.tag}</p>
                      <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(18px,2vw,28px)", color:"white", marginBottom:6, lineHeight:1.2, fontWeight:400 }}>{p.name}</h3>
                      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:14, lineHeight:1.75, maxWidth:260 }}>{p.desc}</p>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                        <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:19, color: p.sale ? "#C6A16E" : "white", fontWeight:500 }}>{p.price}</span>
                        {p.original && <span style={{ fontFamily:"'Inter', sans-serif", fontSize:12, color:"rgba(255,255,255,0.25)", textDecoration:"line-through" }}>{p.original}</span>}
                      </div>
                      <button className="panel-btn" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F8F4EE", color:"#111111", fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, border:"none", padding:"11px 20px", cursor:"pointer" }}>
                        Shop Now <Arr size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(to right, ${p.accent}, #C6A16E)`, transform: isActive ? "scaleX(1)" : "scaleX(0)", transformOrigin:"left", transition:"transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s" }} />
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile scroll hint */}
      <div style={{ display:"flex", justifyContent:"center", padding:"14px 0 0", gap:6 }}>
        {PRODUCTS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width:i===active?20:5, height:5, borderRadius:99, background:i===active?"#C6A16E":"rgba(255,255,255,0.2)", border:"none", cursor:"pointer", transition:"all 0.3s" }} />
        ))}
      </div>
    </section>
  );
}

export default function AsadLeather() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const openModal = (e) => { e && e.preventDefault(); setModalOpen(true); setMobileNavOpen(false); };
  const navItems = ["Home", "Shop", "Our Story", "Terms of Service", "Contact"];

  return (
    <>
      <FontLink />
      <div className="grain-overlay" />
      <div style={{ fontFamily:"'Inter', sans-serif", background:"#F8F4EE", color:"#111111", minHeight:"100vh", overflowX:"hidden" }}>

        {/* Announcement */}
        <div className="announcement" style={{ background:"#111111", color:"rgba(255,255,255,0.65)", fontFamily:"'Inter', sans-serif", fontSize:10.5, textAlign:"center", padding:"8px 16px", letterSpacing:"0.26em", textTransform:"uppercase" }}>
          Free shipping on orders over ₹7,000 · Lifetime guarantee
        </div>

        {/* Navbar */}
        <header style={{ position:"sticky", top:0, zIndex:100, background: scrolled ? "rgba(248,244,238,0.82)" : "rgba(248,244,238,0.95)", borderBottom:`1px solid #E2D9CC`, backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", transition:"background 0.35s" }}>
          <div className="header-pad" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 48px", height:64 }}>
            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
              <Logo size={26} />
              <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#111111" }}>Asad</span>
            </div>

            {/* Desktop Nav */}
            <nav className="desktop-nav" style={{ display:"flex", gap:32 }}>
              {navItems.map(item => (
                <a key={item} href="#" className={`nav-link ${item==="Home" ? "active" : ""}`} onClick={item==="Our Story" ? openModal : undefined}>{item}</a>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="desktop-nav" style={{ alignItems:"center", gap:20 }}>
              <button style={{ background:"none", border:"none", cursor:"pointer", color:"#6F6A64", fontFamily:"'Inter', sans-serif", fontSize:10.5, letterSpacing:"0.18em", textTransform:"uppercase" }}>Log in</button>
              <button style={{ background:"#111111", border:"none", cursor:"pointer", color:"white", fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:600, padding:"9px 20px", display:"flex", alignItems:"center", gap:8, transition:"all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background="#9B6B43"; e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#111111"; e.currentTarget.style.transform="none"; }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Cart
              </button>
            </div>

            {/* Mobile Right: Cart + Hamburger */}
            <div className="hamburger-btn" style={{ display:"none", alignItems:"center", gap:12 }}>
              <button style={{ background:"none", border:"none", cursor:"pointer", color:"#111111", padding:"6px" }} aria-label="Cart">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </button>
              <button onClick={() => setMobileNavOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", color:"#111111", display:"flex", flexDirection:"column", gap:5, padding:"6px" }} aria-label="Menu">
                <span style={{ display:"block", width:22, height:1.5, background:"#111111" }} />
                <span style={{ display:"block", width:16, height:1.5, background:"#111111" }} />
                <span style={{ display:"block", width:22, height:1.5, background:"#111111" }} />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileNavOpen && (
          <>
            <div className="mobile-nav-overlay" onClick={() => setMobileNavOpen(false)} />
            <div className="mobile-nav-drawer">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Logo size={22} />
                  <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:16, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600 }}>Asad</span>
                </div>
                <button onClick={() => setMobileNavOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#A8A39C", fontSize:22, lineHeight:1, padding:"4px 8px" }}>✕</button>
              </div>
              {navItems.map(item => (
                <a key={item} href="#" onClick={item==="Our Story" ? openModal : () => setMobileNavOpen(false)}
                  style={{ fontFamily:"'Inter', sans-serif", fontSize:11, letterSpacing:"0.22em", textTransform:"uppercase", color:"#111111", textDecoration:"none", padding:"14px 0", borderBottom:"1px solid #E2D9CC", display:"block" }}>
                  {item}
                </a>
              ))}
              <div style={{ marginTop:24, display:"flex", flexDirection:"column", gap:12 }}>
                <button style={{ background:"none", border:"1px solid #E2D9CC", cursor:"pointer", color:"#6F6A64", fontFamily:"'Inter', sans-serif", fontSize:10.5, letterSpacing:"0.18em", textTransform:"uppercase", padding:"12px" }}>Log in</button>
              </div>
            </div>
          </>
        )}

        {/* Hero — split layout on desktop, stacked on mobile */}
        <section style={{ position:"relative", minHeight:"88vh", display:"flex", alignItems:"stretch", overflow:"hidden", width:"100%" }}>
          <div className="hero-split" style={{ display:"flex", width:"100%", flexDirection:"row" }}>
            {/* Left content */}
            <div className="hero-content" style={{ width:"52%", display:"flex", alignItems:"center", padding:"80px 48px", background:"linear-gradient(155deg,#F8F4EE 0%,#EADBC8 100%)", position:"relative", zIndex:1 }}>
              <div style={{ maxWidth:520, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)", transition:"all 1.1s cubic-bezier(0.16,1,0.3,1)" }}>
                <p style={{ fontFamily:"'Inter', sans-serif", fontSize:9.5, letterSpacing:"0.44em", textTransform:"uppercase", color:"#9B6B43", marginBottom:18, display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ display:"inline-block", width:36, height:1, background:"#C6A16E" }} />
                  Handmade in Northern Kentucky
                </p>
                <h1 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(36px,5.5vw,72px)", color:"#111111", lineHeight:1.02, marginBottom:18, fontWeight:400 }}>
                  Leather Goods<br />
                  <em style={{ fontStyle:"italic", color:"#9B6B43" }}>Built to Last.</em>
                </h1>
                <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"clamp(13px,1.5vw,14.5px)", color:"#6F6A64", lineHeight:1.8, marginBottom:28, fontWeight:300 }}>
                  Every belt and wallet is cut, stitched, and burnished by hand — by a husband and wife team who care deeply about the craft.
                </p>

                {/* Lead time chip */}
                <div className="hero-chips" style={{ display:"inline-flex", alignItems:"center", gap:24, background:"rgba(255,255,255,0.75)", border:"1px solid rgba(198,161,110,0.35)", padding:"14px 20px", marginBottom:32, backdropFilter:"blur(8px)", flexWrap:"wrap" }}>
                  {[["Belts","2 weeks"],["Wallets","5–6 weeks"]].map(([k,v], i) => (
                    <div key={k} style={{ display:"flex", alignItems:"center", gap:20 }}>
                      {i > 0 && <div className="hero-chip-divider" style={{ width:1, height:28, background:"#E2D9CC" }} />}
                      <div>
                        <div style={{ fontFamily:"'Inter', sans-serif", fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase", color:"#A8A39C", marginBottom:2 }}>{k}</div>
                        <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, color:"#111111", fontWeight:500 }}>{v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hero-btns" style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                  <button className="btn-primary" onClick={openModal}>Discover Our Story <Arr size={13} /></button>
                  <a href="#panels" className="btn-outline">Shop Now <Arr size={13} /></a>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="hero-img-side" style={{ width:"48%", position:"relative", overflow:"hidden", minHeight:400 }}>
              <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&q=85" alt="hero leather" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.75) contrast(1.05) saturate(0.85)" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, #F8F4EE 0%, rgba(248,244,238,0.4) 15%, transparent 35%)" }} />
            </div>
          </div>

          {/* Scroll hint — hidden on mobile */}
          <div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, color:"#A8A39C" }}>
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:8.5, letterSpacing:"0.32em", textTransform:"uppercase" }}></span>
            <div style={{ width:1, height:28, background:"#C6A16E", opacity:0.5 }} />
          </div>
        </section>

        {/* Trust Bar */}
        <div style={{ background:"linear-gradient(90deg,#F8F4EE,#EADBC8,#F8F4EE)", borderTop:"1px solid #E2D9CC", borderBottom:"1px solid #E2D9CC" }}>
          <div className="trust-bar-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", padding:"16px 48px" }}>
            {[["🇮🇳","Indian Craftsmanship"],["✂️","Single Artisan"],["⭐","Lifetime Guarantee"],["📦","Free Shipping ₹7k+"]].map(([icon, label]) => (
              <div key={label} className="trust-bar-item" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px 8px", borderRight:"1px solid #E2D9CC" }}>
                <span style={{ fontSize:15 }}>{icon}</span>
                <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"clamp(9px,1.1vw,10px)", letterSpacing:"0.18em", textTransform:"uppercase", color:"#6F6A64" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Panels */}
        <div id="panels">
          <ProductPanels />
        </div>

        {/* Collections */}
        <section className="section-pad" style={{ padding:"80px 48px", background:"#F8F4EE" }}>
          <div style={{ textAlign:"center", marginBottom:44 }}>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:9.5, letterSpacing:"0.32em", textTransform:"uppercase", color:"#A8A39C", marginBottom:10 }}>Browse By Category</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(24px,3vw,44px)", color:"#111111", margin:0, fontWeight:400 }}>Collections</h2>
            <div style={{ width:40, height:1.5, background:"#C6A16E", margin:"12px auto 0" }} />
          </div>
          <div className="collections-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[
              { label:"Belts & More", sub:"Dress belts, work belts & accessories", img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=85" },
              { label:"Wallets", sub:"Card holders, bifolds & slim carry", img:"https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&q=85" },
            ].map(c => (
              <div key={c.label} className="collection-card collection-card-item" style={{ position:"relative", overflow:"hidden", height:420, cursor:"pointer" }}>
                <img src={c.img} alt={c.label} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)", filter:"brightness(0.75) contrast(1.05)" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(17,13,8,0.82) 0%, rgba(17,13,8,0.08) 55%, transparent 100%)" }} />
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"24px 24px 28px" }}>
                  <p style={{ fontFamily:"'Inter', sans-serif", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)", marginBottom:8 }}>{c.sub}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                    <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(20px,3vw,28px)", color:"white", margin:0, fontWeight:400 }}>{c.label}</h3>
                    <span className="shop-btn" style={{ fontFamily:"'Inter', sans-serif", fontSize:9.5, letterSpacing:"0.2em", textTransform:"uppercase", color:"white", border:"1px solid rgba(198,161,110,0.55)", padding:"8px 16px", cursor:"pointer" }}>Shop →</span>
                  </div>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"linear-gradient(to right, #9B6B43, #C6A16E)" }} />
              </div>
            ))}
          </div>
        </section>

        {/* Why Section */}
        <section className="why-section" style={{ position:"relative", overflow:"hidden", margin:"0 48px 80px" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=85')", backgroundSize:"cover", backgroundPosition:"center", filter:"brightness(0.75) contrast(1.05)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,rgba(17,13,8,0.9) 0%,rgba(17,13,8,0.5) 55%,transparent 100%)" }} />
          <div className="why-content" style={{ position:"relative", padding:"88px 64px", maxWidth:560 }}>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:9.5, letterSpacing:"0.38em", textTransform:"uppercase", color:"#C6A16E", marginBottom:12 }}>The Asad Difference</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(24px,3vw,44px)", color:"white", marginBottom:12, lineHeight:1.12, fontWeight:400 }}>Why Choose<br />Our Products?</h2>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.82, marginBottom:32, fontWeight:300 }}>We build leather goods the old-fashioned way — with patience, skill, and genuine love for the craft.</p>
            <button className="btn-primary" onClick={openModal} style={{ background:"#9B6B43" }}>Learn More <Arr size={13} /></button>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background:"#F0EAE0", borderTop:"1px solid #E2D9CC", borderBottom:"1px solid #E2D9CC", padding:"clamp(40px,6vw,64px) clamp(20px,4vw,48px)" }}>
          <p style={{ fontFamily:"'Inter', sans-serif", fontSize:9.5, letterSpacing:"0.32em", textTransform:"uppercase", color:"#A8A39C", textAlign:"center", marginBottom:8 }}>What Our Customers Say</p>
          <div style={{ width:40, height:1.5, background:"#C6A16E", margin:"0 auto 40px" }} />
          <div className="testimonials-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, maxWidth:1200, margin:"0 auto" }}>
            {[
              { quote:"The belt is absolutely stunning. You can feel the quality immediately.", name:"James R.", stars:5 },
              { quote:"My wallet is 3 years old and looks better now than day one. Worth every penny.", name:"Sarah M.", stars:5 },
              { quote:"Ordered a custom belt — communication was great, shipped on time. 10/10.", name:"Derek P.", stars:5 },
            ].map(t => (
              <div key={t.name} style={{ background:"white", border:"1px solid #E2D9CC", padding:"24px 22px" }}>
                <div style={{ display:"flex", gap:2, marginBottom:14 }}>
                  {Array(t.stars).fill(0).map((_,j) => <span key={j} style={{ color:"#C6A16E", fontSize:14 }}>★</span>)}
                </div>
                <p style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:15.5, color:"#6F6A64", lineHeight:1.85, fontStyle:"italic", marginBottom:18 }}>"{t.quote}"</p>
                <p style={{ fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:"#A8A39C" }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background:"#EADBC8", borderTop:"1px solid #E2D9CC" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1.5fr", gap:64, padding:"56px 48px 40px" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <Logo size={24} />
                <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:18, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#111111" }}>Asad</span>
              </div>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:13.5, fontWeight:500, color:"#111111", marginBottom:14 }}>Subscribe for exclusive news and deals!</p>
              <div style={{ display:"flex" }}>
                <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                  style={{ flex:1, border:"1px solid #D6CABD", borderRight:"none", fontFamily:"'Inter', sans-serif", fontSize:13, padding:"10px 14px", background:"white", color:"#44403c", outline:"none", minWidth:0 }} />
                <button onClick={() => { if (email) setSubscribed(true); }}
                  style={{ background:"#111111", color:"white", border:"none", fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, padding:"10px 16px", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.3s ease", flexShrink:0 }}
                  onMouseEnter={e => { e.currentTarget.style.background="#9B6B43"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#111111"; }}>
                  {subscribed ? "✓ Done" : "Subscribe"}
                </button>
              </div>
              {subscribed && <p style={{ fontFamily:"'Inter', sans-serif", fontSize:12, color:"#9B6B43", marginTop:8 }}>Thanks! You're on the list.</p>}
            </div>

            <div>
              <h3 style={{ fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:"#6F6A64", fontWeight:600, marginBottom:18 }}>Quick Links</h3>
              {["Contact","Terms of Service","Why Our Products?"].map(link => (
                <div key={link} style={{ marginBottom:14 }}>
                  <a href="#" onClick={link==="Why Our Products?" ? openModal : undefined}
                    style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:"#44403c", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={e => e.target.style.color="#9B6B43"}
                    onMouseLeave={e => e.target.style.color="#44403c"}>{link}</a>
                </div>
              ))}
            </div>

            <div>
              <h3 style={{ fontFamily:"'Inter', sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:"#6F6A64", fontWeight:600, marginBottom:18 }}>About the Shop</h3>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:"#57534e", lineHeight:1.8, marginBottom:10, fontWeight:300 }}>Asad is a locally owned business in Northern Kentucky, founded in 2019 and dedicated to producing the highest quality leather goods.</p>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:"#57534e", lineHeight:1.8, fontWeight:300 }}>Each product is crafted and handmade by a single craftsman. We are intentional about every detail.</p>
            </div>
          </div>

          <div className="footer-divider" style={{ borderTop:"1px solid #D6CABD", margin:"0 48px" }} />

          <div className="footer-bottom" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 48px", flexWrap:"wrap", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <select style={{ fontFamily:"'Inter', sans-serif", fontSize:12, color:"#44403c", border:"1px solid #D6CABD", background:"white", padding:"6px 24px 6px 10px", outline:"none", cursor:"pointer" }}>
                <option>India (INR ₹)</option>
                <option>United States (USD $)</option>
              </select>
              <div style={{ display:"flex", gap:3, flexWrap:"wrap" }}>
                {[["AMEX","#016FD0","white"],["GPay","#f8f8f8","#5F6368"],["MC","#EB001B","white"],["PP","#003087","white"],["VISA","#1A1F71","white"]].map(([t,bg,c]) => (
                  <span key={t} style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, fontFamily:"'Inter', sans-serif", background:bg, color:c, minWidth:32, height:20, padding:"0 4px", borderRadius:3, border:"1px solid #D6CABD" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              {["Facebook","Instagram","YouTube"].map(s => (
                <a key={s} href="#" style={{ color:"#A8A39C", textDecoration:"none", fontFamily:"'Inter', sans-serif", fontSize:11, letterSpacing:"0.1em", transition:"color 0.2s" }}
                  onMouseEnter={e => e.target.style.color="#9B6B43"}
                  onMouseLeave={e => e.target.style.color="#A8A39C"}>{s[0]}</a>
              ))}
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:"#A8A39C", margin:0 }}>© 2026, Asad Leather</p>
            </div>
          </div>
        </footer>

        <StoryModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </>
  );
}