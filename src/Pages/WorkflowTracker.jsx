import { useState, useEffect, useRef } from "react";

/* ─── INJECT FONTS + CUSTOM KEYFRAMES ─── */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

:root {
  --navy:     #0B1D45;
  --navy-m:   #162D6B;
  --navy-s:   #2050A0;
  --gold:     #C8A44A;
  --gold-l:   #E2BA68;
  --gold-p:   #FEF8EE;
  --text:     #1A2A48;
  --text-m:   #4A5670;
  --text-l:   #7A8499;
  --border:   rgba(11,29,69,.08);
  --bg:       #F5F7FC;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

@keyframes fadeUp    { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
@keyframes slideL    { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
@keyframes slideR    { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
@keyframes scaleIn   { from { opacity:0; transform:scale(.88); } to { opacity:1; transform:scale(1); } }
@keyframes floatY    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
@keyframes floatX    { 0%,100% { transform:translateX(0); } 50% { transform:translateX(8px); } }
@keyframes pulse2    { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(.92); } }
@keyframes ticker    { from { transform:translateX(0); } to { transform:translateX(-50%); } }
@keyframes spin      { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
@keyframes shimmer   { 0% { background-position:-600px 0; } 100% { background-position:600px 0; } }
@keyframes borderGlow { 0%,100% { box-shadow:0 0 0 0 rgba(200,164,74,.3); } 50% { box-shadow:0 0 0 8px rgba(200,164,74,0); } }
@keyframes gradShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
@keyframes countUp   { from { opacity:0; transform:translateY(20px) scale(.8); } to { opacity:1; transform:translateY(0) scale(1); } }
@keyframes waveIn    { from { clip-path:inset(0 100% 0 0); } to { clip-path:inset(0 0% 0 0); } }

.a0  { animation: fadeUp .6s ease both; }
.a1  { animation: fadeUp .6s .12s ease both; opacity:0; }
.a2  { animation: fadeUp .6s .22s ease both; opacity:0; }
.a3  { animation: fadeUp .6s .34s ease both; opacity:0; }
.a4  { animation: fadeUp .6s .48s ease both; opacity:0; }
.a5  { animation: fadeUp .6s .60s ease both; opacity:0; }
.aL  { animation: slideL .7s ease both; }
.aR  { animation: slideR .7s ease both; }
.aSc { animation: scaleIn .5s ease both; }

.reveal  { opacity:0; transform:translateY(26px); transition:opacity .65s ease,transform .65s ease; }
.reveal.vis { opacity:1; transform:translateY(0); }

.ticker-run { display:flex; gap:56px; animation:ticker 38s linear infinite; white-space:nowrap; }

/* nav link */
.nl { position:relative; padding:7px 14px; color:var(--text-m); font-size:13.5px; font-weight:500; transition:color .2s; text-decoration:none; }
.nl::after { content:''; position:absolute; bottom:0; left:14px; right:14px; height:2px; background:linear-gradient(90deg,var(--gold),var(--gold-l)); transform:scaleX(0); transition:transform .25s cubic-bezier(.34,1.56,.64,1); border-radius:1px; }
.nl:hover { color:var(--navy); }
.nl:hover::after { transform:scaleX(1); }

/* card hover lift */
.card-lift { transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, border-color .3s ease; }
.card-lift:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(11,29,69,.13); border-color:rgba(200,164,74,.3)!important; }

/* service card */
.svc-card { position:relative; overflow:hidden; }
.svc-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--gold),var(--gold-l)); transform:scaleX(0); transform-origin:left; transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
.svc-card:hover::before { transform:scaleX(1); }
.svc-card:hover .svc-icon { background:linear-gradient(135deg,var(--gold),var(--gold-l))!important; color:var(--navy)!important; transform:rotate(8deg) scale(1.1); }
.svc-icon { transition:all .3s cubic-bezier(.34,1.56,.64,1); }

/* gold btn glow */
.btn-gold { background:linear-gradient(135deg,var(--gold) 0%,var(--gold-l) 100%); transition:all .3s; box-shadow:0 6px 22px rgba(200,164,74,.35); }
.btn-gold:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 14px 36px rgba(200,164,74,.5); }

/* navy btn */
.btn-navy { background:linear-gradient(135deg,var(--navy),var(--navy-s)); transition:all .3s; box-shadow:0 6px 22px rgba(11,29,69,.25); }
.btn-navy:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 14px 36px rgba(11,29,69,.4); }

/* floating pill */
.fpill { display:flex; align-items:center; gap:9px; padding:13px 22px; border-radius:50px; font-size:13.5px; font-weight:700; text-decoration:none; transition:all .3s; white-space:nowrap; }

/* faq */
.faqb { overflow:hidden; transition:max-height .42s cubic-bezier(.4,0,.2,1); }

/* bar fill */
.bar-fill { height:100%; border-radius:50px; background:linear-gradient(90deg,var(--navy-s),var(--gold)); width:0; transition:width 1.4s cubic-bezier(.25,.8,.25,1); }

/* glass */
.glass { background:rgba(255,255,255,.72); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); }

/* hero mesh bg */
.mesh-bg { background:radial-gradient(ellipse at 20% 50%,rgba(200,164,74,.07) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(11,29,69,.06) 0%,transparent 55%),radial-gradient(ellipse at 60% 80%,rgba(32,80,160,.05) 0%,transparent 50%),linear-gradient(140deg,#EEF2FF 0%,#FAFBFF 45%,#F0F4FF 100%); }

/* noise overlay */
.noise::after { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); opacity:.4; pointer-events:none; border-radius:inherit; }

/* diagonal section divider */
.diag-top { clip-path:polygon(0 6%,100% 0,100% 100%,0 100%); margin-top:-40px; padding-top:80px; }
.diag-bot { clip-path:polygon(0 0,100% 0,100% 94%,0 100%); padding-bottom:80px; margin-bottom:-40px; }

/* shimmer skeleton */
.skeleton { background:linear-gradient(90deg,#eef2ff 25%,#dde6ff 50%,#eef2ff 75%); background-size:600px 100%; animation:shimmer 1.6s infinite linear; }

/* testimonial quote */
.testi-quote { position:relative; }
.testi-quote::before { content:'"'; position:absolute; top:-12px; left:-6px; font-size:72px; line-height:1; color:rgba(200,164,74,.18); font-family:'Cormorant Garamond',serif; pointer-events:none; }

/* gradient text */
.grad-text { background:linear-gradient(135deg,var(--gold),var(--gold-l)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

/* animated border */
.anim-border { background:conic-gradient(from 0deg,var(--gold),var(--gold-l),var(--gold)); animation:spin 4s linear infinite; }

/* section headline */
.sec-h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,4vw,3.4rem); font-weight:700; color:var(--navy); line-height:1.1; }

/* ── RESPONSIVE ── */
@media(max-width:1100px) { .hero-r { display:none!important; } }
@media(max-width:768px) {
  .top-bar { display:none!important; }
  .nav-main { height:60px!important; }
  .ticker-mt { margin-top:60px!important; }
  .sec { padding:60px 0!important; }
  .wrap { padding:0 1.2rem!important; }
  .stats-g { grid-template-columns:1fr 1fr!important; }
  .why-g { grid-template-columns:1fr!important; }
  .svc-g { grid-template-columns:1fr!important; }
  .form2 { grid-template-columns:1fr!important; }
  .appt-g { grid-template-columns:1fr!important; }
  .faq-g { grid-template-columns:1fr!important; }
  .contact-g { grid-template-columns:1fr!important; }
  .footer-g { grid-template-columns:1fr 1fr!important; }
  .blog-g { grid-template-columns:1fr!important; }
  .skills-g { grid-template-columns:1fr!important; }
  .calc-g { grid-template-columns:1fr!important; }
  .vmv-g { grid-template-columns:1fr!important; }
  .team-row { flex-direction:column!important; }
  .float-lbl { display:none!important; }
  .fpill { padding:14px!important; width:52px!important; height:52px!important; justify-content:center!important; border-radius:50%!important; }
  .cta-row { flex-direction:column!important; align-items:center!important; }
  .ab-left,.ab-right { display:none!important; }
}
@media(max-width:480px) {
  .stats-g { grid-template-columns:1fr!important; }
  .footer-g { grid-template-columns:1fr!important; }
  .testi-g { grid-template-columns:1fr!important; }
}
`;

/* ═══ DATA ═══ */
const PHONE = "9935663377";
const PHONE_DISPLAY = "9935663377";
const EMAIL = "carishi@gmail.com";
const CITY = "Sitapur, Uttar Pradesh";
const ADDR = "Civil Lines, Sitapur, Uttar Pradesh – 261001";
const MAPS_URL = "https://maps.google.com/?q=Sitapur,Uttar Pradesh";

const IMG = {
  hero: "https://randomuser.me/api/portraits/men/32.jpg",
  team: ["https://randomuser.me/api/portraits/men/32.jpg", "https://randomuser.me/api/portraits/men/45.jpg"],
  testi: ["https://randomuser.me/api/portraits/men/41.jpg","https://randomuser.me/api/portraits/men/22.jpg","https://randomuser.me/api/portraits/women/34.jpg","https://randomuser.me/api/portraits/men/55.jpg"],
};

const SLIDES = [
  { tag:"32 Years of Trusted Excellence", h:"Your Trusted CA Partner for Every Financial Need", sub:"Expert chartered accountancy for individuals, startups, MSMEs & corporates. GST · ITR · Audit · Company Registration.", pts:["Client-Centric Approach","Commitment to Excellence","32+ Years of Industry Expertise"], b1:"Book Free Consultation", b2:"Our Services" },
  { tag:"Comprehensive Tax & Compliance", h:"Stress-Free Tax Filing & Business Compliance",    sub:"From ITR filing to GST returns, TDS, audit assurance — we handle every requirement so you focus on growth.", pts:["Income Tax & GST Experts","Audit & Assurance Services","Payroll & Bookkeeping"], b1:"Start ITR Filing", b2:"View Services" },
  { tag:"Startups · MSMEs · Foreign Companies", h:"Expert Advisory for Every Stage of Business", sub:"Incorporating a startup, setting up a foreign subsidiary, or seeking MSME benefits — we have the solutions.", pts:["Startup & DPIIT Registration","Foreign Company Incorporation","MSME / Udyam Registration"], b1:"Get Started Today", b2:"Learn More" },
];

const SERVICES = [
  ["fa-file-invoice-dollar","Income Tax Return Filing","Expert ITR filing for salaried individuals, business owners, NRIs, and HUFs — all forms, fast turnaround."],
  ["fa-receipt","GST Registration & Filing","End-to-end GST: registration, monthly/quarterly returns, annual return (GSTR-9), and GST audit."],
  ["fa-building","Company Registration","Pvt. Ltd., LLP, OPC, Proprietorship — full incorporation with MCA portal management."],
  ["fa-globe","Foreign Company Registration","RoC registration for foreign corporations entering India. Subsidiary, liaison & project office setup."],
  ["fa-industry","MSME / Udyam Registration","Udyam registration to avail government subsidies, tax benefits, and MSME scheme protections."],
  ["fa-trademark","Trademark Registration","Protect your brand identity with trademark filing, monitoring, and renewal services."],
  ["fa-search-dollar","Audit & Assurance","Statutory, internal, tax and concurrent audit with comprehensive reporting and compliance."],
  ["fa-percent","TDS Filing","Accurate TDS deduction, timely deposit and return filing — Form 24Q, 26Q, 27Q covered."],
  ["fa-book","Accounting & Bookkeeping","Monthly ledger, P&L, balance sheet, and financial reporting for all business sizes."],
  ["fa-file-alt","ROC / Annual Filings","Annual returns, event-based MCA filings, director DIN/DSC compliance — fully managed."],
  ["fa-users-cog","Payroll Management","Complete payroll including salary structuring, PF, ESI, and TDS on salary."],
  ["fa-chart-line","Financial Consulting","Strategic planning, business restructuring, investment advisory and cash flow management."],
  ["fa-rocket","Startup Compliance","DPIIT registration, angel tax exemption, startup India benefits and regulatory roadmap."],
  ["fa-exchange-alt","Corporate Finance","Project finance, working capital advisory, due diligence, and valuation services."],
  ["fa-shield-alt","Internal Audit","Risk assessment, fraud detection, process improvement and operational efficiency review."],
  ["fa-id-badge","ESI & EPF Compliance","Employee welfare scheme registration, monthly filings and ongoing compliance."],
  ["fa-ship","IEC Registration","Import Export Code registration for businesses expanding into international trade."],
  ["fa-lightbulb","Tax Planning & Advisory","Tax structuring, DTAA advisory, and transfer pricing for optimal efficiency."],
  ["fa-file-contract","Document Drafting","Legally precise contracts, agreements, MoUs and business documents."],
  ["fa-random","Corporate Restructuring","Mergers, acquisitions, demergers, and corporate valuations with expert guidance."],
];

const WHY = [
  ["fa-user-graduate","Expert CA Team","Qualified CAs with deep specialization in tax law, audit, and corporate compliance."],
  ["fa-bolt","24–48 Hr Turnaround","Most returns and filings completed within 24-48 hours of receiving your documents."],
  ["fa-tag","Transparent Pricing","Competitive, fixed-fee pricing with zero hidden charges — know your costs upfront."],
  ["fa-shield-alt","100% Confidential","Your financial data is fully encrypted and never shared with any third party."],
  ["fa-headset","Round-the-Clock Support","WhatsApp, email and phone support available 7 days a week for urgent queries."],
  ["fa-globe-asia","International Expertise","DTAA, FEMA advisory, transfer pricing and foreign company setup handled in-house."],
  ["fa-handshake","Long-Term Relationships","We build lasting partnerships — 98% of our clients continue with us year after year."],
  ["fa-award","32+ Years Experience","Over three decades of expertise across tax, audit and corporate services."],
];

const SKILLS = [
  ["Highly Professional Work", 99],["Maintain High Standards of Competence", 98],
  ["Always Honest to Our Clients", 100],["Respect Client's Confidentiality", 100],["Maintaining Code of Ethics", 100],
];

const VMV = [
  ["👁","Vision","To become one of the most trusted and professional organizations fulfilling clients' all requirements related to taxation laws in India and abroad."],
  ["🎯","Mission","To allow our clients to focus on their core business activity by undertaking all taxation compliance and accounting needs under a single roof."],
  ["💎","Values","To consistently exceed client expectations through teamwork, professionalism, personalized service, specialization, and experience."],
];

const TESTIS = [
  ["Pravesh Kumar","Business Owner, Lucknow","CA Rishi helped me handle accounts for my startup — not only tax advisory but practical solutions to real business problems. Every employee is helpful and knowledgeable. Personally recommend for any income tax or accounting need.",0],
  ["Ashutosh Singh","IT Professional, Sitapur","Highly recommend this firm. CA Rishi is professional and round-the-clock active for support. Every member is humble and deals politely. They support critical problems in the utmost manner.",1],
  ["Komal Agrawal","Director, Agrawal Enterprises","I know this firm for 4 years and their services are remarkable. Amazing professionals with vast experience in direct & indirect taxation and financial reporting.",2],
  ["Rajesh Verma","Director, TechVentures Pvt. Ltd.","Their team handled our company's GST and ITR filing seamlessly. Always responsive, knowledgeable, and ahead of deadlines. Working with them for 5 years and never disappointed.",3],
];

const FAQS = [
  ["How do I file my Income Tax Return?","Share your PAN, Form 16, and bank statements with us. Our team prepares and e-files your ITR within 24-48 hours. We handle all forms — ITR-1 to ITR-6 for individuals, firms, and companies."],
  ["Is GST registration mandatory for my business?","Mandatory if turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services). For inter-state supply or e-commerce, it's mandatory regardless of turnover."],
  ["Can a foreigner register a company in India?","Yes. Foreign nationals can incorporate a Private Limited Company in India. We handle RBI filings, FDI compliance, and all ROC registration formalities."],
  ["Do you assist startups?","Absolutely — DPIIT registration, angel tax exemption, financial planning, tax structuring, and ongoing compliance — a complete startup package."],
  ["What is the tax audit limit?","Business turnover exceeds ₹1 crore (₹10 crore if cash transactions below 5%). For professionals, the limit is ₹50 lakhs."],
  ["What are your fees?","ITR filing from ₹499, GST filing packages from ₹999/month, company registration from ₹6,999. We provide a detailed quote after the initial discussion."],
  ["Do you handle international tax compliance?","Yes — DTAA advisory, transfer pricing, FEMA compliance, foreign remittances, and IEC registration are all handled in-house."],
  ["How long does company registration take?","Private Limited Company: 7-10 working days. LLP: 5-7 days. We manage DSC, DIN, name approval, MOA/AOA drafting, and COI issuance."],
];

const BLOGS = [
  ["fa-file-invoice-dollar","Income Tax","May 12, 2026","6 min","New vs Old Tax Regime: Which Saves More for FY 2025-26?","A comprehensive comparison to help you pick the regime that minimises your tax liability based on income and investments."],
  ["fa-receipt","GST","May 11, 2026","4 min","GSTR-9 Annual Return: Complete Guide for FY 2024-25","Everything you need to file GSTR-9 on time — eligibility, deadlines, reconciliation tips, and penalty avoidance."],
  ["fa-globe","International","Nov 5, 2025","7 min","Starting a Company in India as a Foreigner: Step-by-Step","Foreign nationals, US companies, and NRIs — here's how to set up an Indian subsidiary or branch legally."],
];

const fmt = n => Math.round(n).toLocaleString("en-IN");

/* ═══ HOOKS ═══ */
function useIsMobile(bp = 768) {
  const [is, setIs] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const h = () => setIs(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return is;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("vis"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ═══ ROOT ═══ */
export default function CAHomepage() {
  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = STYLE;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#FAFBFF", color:"var(--text)" }}>
      <Navbar />
      <Ticker />
      <Hero />
      <QuickStats />
      <About />
      <Services />
      <WhyUs />
      <SkillBars />
      <VMVSection />
      <Calculator />
      <Appointment />
      <Testimonials />
      <FAQSection />
      <BlogSection />
      <CTA />
      <Contact />
      <Footer />
      <FloatingBtns />
    </div>
  );
}

/* ═══ NAVBAR ═══ */
function Navbar() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [["Home","#hero"],["About","#about"],["Tax Calc","#calculator"],["Blog","#blog"],["Contact","#contact"]];
  const svcLinks = ["Income Tax","GST Services","Audit & Assurance","Company Registration","Foreign Company","TDS Filing","Payroll","MSME Registration","Trademark","ROC Filing"];

  const navBg = scrolled
    ? "rgba(255,255,255,.97)"
    : "rgba(255,255,255,.92)";
  const navShadow = scrolled ? "0 2px 30px rgba(11,29,69,.1)" : "none";

  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,
      background:navBg, backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)",
      borderBottom:scrolled?"1px solid var(--border)":"1px solid transparent",
      boxShadow:navShadow, transition:"all .35s cubic-bezier(.4,0,.2,1)" }}>

      {/* Top strip */}
      <div className="top-bar" style={{ background:"linear-gradient(90deg,var(--navy) 0%,var(--navy-m) 100%)",
        padding:"6px 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:6 }}>
        <div style={{ display:"flex", gap:22, flexWrap:"wrap" }}>
          {[["fa-map-marker-alt", CITY],["fa-phone", PHONE_DISPLAY],["fa-envelope", EMAIL]].map(([ic,t])=>(
            <span key={t} style={{ color:"rgba(255,255,255,.7)", fontSize:11.5, display:"flex", alignItems:"center", gap:5 }}>
              <i className={`fas ${ic}`} style={{ color:"var(--gold-l)", fontSize:10 }} /> {t}
            </span>
          ))}
        </div>
        <span style={{ color:"rgba(255,255,255,.4)", fontSize:11 }}>Mon–Sun: 10:00 AM – 8:30 PM</span>
      </div>

      {/* Main bar */}
      <div className="nav-main wrap" style={{ maxWidth:1400, margin:"0 auto", display:"flex",
        alignItems:"center", justifyContent:"space-between", height:72, padding:"0 2rem" }}>

        {/* Logo */}
        <a href="#" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", flexShrink:0 }}>
          <div style={{ position:"relative", width:46, height:46, flexShrink:0 }}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,var(--navy),var(--navy-s))",
              borderRadius:12, boxShadow:"0 4px 18px rgba(11,29,69,.25)" }} />
            <div style={{ position:"absolute", inset:2, background:"linear-gradient(135deg,var(--navy-m),var(--navy))",
              borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:17, color:"var(--gold-l)", letterSpacing:.5 }}>CA</span>
            </div>
          </div>
          <div>
            <strong style={{ display:"block", fontFamily:"'Cormorant Garamond',serif",
              fontSize:isMobile?15:19, fontWeight:700, color:"var(--navy)", lineHeight:1.1 }}>
              {isMobile ? "Rishi & Co." : "CA Rishi & Associates"}
            </strong>
            <span style={{ display:"block", fontSize:9.5, color:"var(--gold)",
              letterSpacing:"1.8px", textTransform:"uppercase", fontWeight:600 }}>
              Chartered Accountants · Since 1992
            </span>
          </div>
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display:"flex", alignItems:"center", listStyle:"none", gap:0, margin:0, padding:0 }}>
            {links.map(([l,h])=>(
              <li key={l}><a href={h} className="nl">{l}</a></li>
            ))}
            <li style={{ position:"relative" }}
              onMouseEnter={e=>{ const d=e.currentTarget.querySelector(".sdd"); if(d){d.style.opacity="1";d.style.visibility="visible";d.style.transform="translateY(0)";} }}
              onMouseLeave={e=>{ const d=e.currentTarget.querySelector(".sdd"); if(d){d.style.opacity="0";d.style.visibility="hidden";d.style.transform="translateY(-10px)";} }}>
              <a href="#services" className="nl">Services ▾</a>
              <div className="sdd" style={{ position:"absolute",top:"100%",left:0,background:"var(--white)",
                border:"1px solid var(--border)",borderRadius:14,minWidth:220,padding:"10px 0",
                opacity:0,visibility:"hidden",transform:"translateY(-10px)",transition:"all .22s cubic-bezier(.4,0,.2,1)",
                boxShadow:"0 24px 60px rgba(11,29,69,.13)",zIndex:300 }}>
                {svcLinks.map(s=>(
                  <a key={s} href="#services" style={{ display:"flex",alignItems:"center",gap:8,padding:"9px 18px",
                    fontSize:13, color:"var(--text-m)", textDecoration:"none", transition:"all .15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="var(--bg)";e.currentTarget.style.color="var(--navy)";e.currentTarget.style.paddingLeft="24px"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="none";e.currentTarget.style.color="var(--text-m)";e.currentTarget.style.paddingLeft="18px"; }}>
                    <span style={{ width:4,height:4,borderRadius:"50%",background:"var(--gold)",flexShrink:0 }} />
                    {s}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        )}

        {/* Desktop actions */}
        {!isMobile && (
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <a href={`https://wa.me/91${PHONE}`}
              style={{ width:38,height:38,background:"#25D366",borderRadius:"50%",display:"flex",
                alignItems:"center",justifyContent:"center",color:"white",textDecoration:"none",fontSize:18,
                transition:"all .25s", boxShadow:"0 4px 14px rgba(37,211,102,.3)" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.15) rotate(-5deg)";e.currentTarget.style.boxShadow="0 6px 20px rgba(37,211,102,.45)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 14px rgba(37,211,102,.3)"; }}>
              <i className="fab fa-whatsapp" />
            </a>
            <a href={`tel:+91${PHONE}`}
              style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 15px",
                border:"1.5px solid var(--border)",borderRadius:10,color:"var(--navy)",
                textDecoration:"none",fontSize:12.5,fontWeight:600,transition:"all .22s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--navy)";e.currentTarget.style.background="var(--bg)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="none"; }}>
              <i className="fas fa-phone" style={{ fontSize:11 }} /> Call Now
            </a>
            <a href="#appointment"
              style={{ padding:"9px 22px",borderRadius:10,color:"#fff",fontSize:12.5,fontWeight:700,
                textDecoration:"none",whiteSpace:"nowrap",letterSpacing:.2 }} className="btn-navy ">
              Free Consultation
            </a>
          </div>
        )}

        {/* Mobile icons */}
        {isMobile && (
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <a href={`https://wa.me/91${PHONE}`}
              style={{ width:36,height:36,background:"#25D366",borderRadius:"50%",display:"flex",
                alignItems:"center",justifyContent:"center",color:"white",textDecoration:"none",fontSize:17 }}>
              <i className="fab fa-whatsapp" />
            </a>
            <button onClick={()=>setMenu(m=>!m)}
              style={{ background:"none",border:"1.5px solid var(--border)",borderRadius:9,
                cursor:"pointer",padding:"7px 8px",display:"flex",flexDirection:"column",gap:5 }}>
              {[0,1,2].map(i=>(
                <span key={i} style={{ display:"block",width:20,height:2,background:"var(--navy)",borderRadius:2,
                  transition:"all .3s",
                  transform: menu?(i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"scale(0)"):"none",
                  opacity: menu&&i===1?0:1 }} />
              ))}
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && menu && (
        <div style={{ background:"white",borderTop:"1px solid var(--border)",
          boxShadow:"0 20px 50px rgba(11,29,69,.12)", animation:"fadeIn .2s ease" }}>
          {[["Home","#hero"],["About Us","#about"],["Services","#services"],["Tax Calculator","#calculator"],
            ["Book Appointment","#appointment"],["Blog","#blog"],["Contact","#contact"]].map(([l,h])=>(
            <a key={l} href={h} onClick={()=>setMenu(false)}
              style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"13px 20px",color:"var(--text)",textDecoration:"none",
                fontSize:14.5,fontWeight:500,borderBottom:"1px solid var(--border)" }}>
              {l} <i className="fas fa-chevron-right" style={{ fontSize:11,color:"var(--text-l)" }} />
            </a>
          ))}
          <div style={{ padding:"14px 20px",display:"flex",gap:10 }}>
            <a href={`tel:+91${PHONE}`}
              style={{ flex:1,textAlign:"center",padding:"11px",borderRadius:9,
                background:"var(--navy)",color:"white",textDecoration:"none",fontSize:13,fontWeight:700 }}>
              📞 Call Now
            </a>
            <a href="#appointment" onClick={()=>setMenu(false)}
              style={{ flex:1,textAlign:"center",padding:"11px",borderRadius:9,
                background:"var(--gold)",color:"var(--navy)",textDecoration:"none",fontSize:13,fontWeight:700 }}>
              Book Consult
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══ TICKER ═══ */
function Ticker() {
  const items = [
    ["📢","ITR Filing Open","FY 2024-25 — File before deadline"],
    ["🔔","GST Annual Return","GSTR-9 filing due — Don't miss"],
    ["✅","Budget 2025","Key tax changes — Contact us for advisory"],
    ["💼","MSME Benefits","Register now and avail subsidies"],
    ["🌏","Foreign Company","Setting up in India? We handle all RoC/RBI"],
    ["📊","TDS Q4 Returns","Due date approaching — File now"],
    ["🚀","Startup India","DPIIT recognition & angel tax exemption"],
  ];
  return (
    <div className="ticker-mt" style={{ marginTop:116, background:"linear-gradient(90deg,var(--navy),var(--navy-m))", padding:"9px 0", overflow:"hidden" }}>
      <div className="ticker-run">
        {[...items,...items].map(([e,em,t],i)=>(
          <span key={i} style={{ color:"rgba(255,255,255,.55)",fontSize:12,flexShrink:0,display:"flex",alignItems:"center",gap:7 }}>
            <span style={{ fontSize:14 }}>{e}</span>
            <em style={{ color:"var(--gold-l)",fontStyle:"normal",fontWeight:700,letterSpacing:.3 }}>{em}:</em>
            <span>{t}</span>
            <span style={{ color:"rgba(255,255,255,.2)",marginLeft:14 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  const [cur, setCur] = useState(0);
  const [key, setKey] = useState(0);
  const [imgErr, setImgErr] = useState(false);
  const isMobile = useIsMobile(1100);

  useEffect(() => {
    const id = setInterval(() => { setCur(c=>(c+1)%SLIDES.length); setKey(k=>k+1); }, 7000);
    return () => clearInterval(id);
  }, []);

  const s = SLIDES[cur];

  return (
    <section id="hero" style={{ minHeight:isMobile?"auto":"92vh", position:"relative", overflow:"hidden",
      display:"flex", alignItems:"center", paddingTop:isMobile?16:0 }} className="mesh-bg">

      {/* Decorative circles */}
      {[600,430,280].map((sz,i)=>(
        <div key={i} style={{ position:"absolute", top:"50%", left:"58%",
          transform:"translate(-50%,-50%)", width:sz, height:sz, borderRadius:"50%",
          border:`1px solid rgba(11,29,69,${.025+i*.012})`, pointerEvents:"none",
          animation:`spin ${60+i*15}s linear infinite` }} />
      ))}

      {/* Corner gradient blob */}
      <div style={{ position:"absolute", top:-140, right:-100, width:520, height:520, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(200,164,74,.09) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-100, left:-80, width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(11,29,69,.05) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div className="wrap" style={{ maxWidth:1400, margin:"0 auto",
        padding:isMobile?"4rem 1.2rem 3rem":"5rem 2rem 4rem",
        display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr",
        gap:isMobile?"2rem":"4rem", alignItems:"center", position:"relative", zIndex:2, width:"100%" }}>

        {/* LEFT */}
        <div key={`l${key}`}>
          <div className="a0" style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",
            background:"rgba(200,164,74,.1)",border:"1px solid rgba(200,164,74,.25)",
            borderRadius:50,color:"var(--gold)",fontSize:11.5,fontWeight:700,letterSpacing:"1px",
            textTransform:"uppercase",marginBottom:"1.3rem" }}>
            <span style={{ width:6,height:6,background:"var(--gold)",borderRadius:"50%",animation:"pulse2 2s infinite" }} />
            {s.tag}
          </div>

          <h1 className="a1" style={{ fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(2.4rem,4.2vw,4.4rem)",fontWeight:700,color:"var(--navy)",
            lineHeight:1.1,marginBottom:"1.1rem",letterSpacing:"-.5px" }}>
            {s.h.split(" ").map((w,i)=>
              i===1||i===2
                ? <em key={i} style={{ color:"var(--gold)",fontStyle:"italic" }}>{w} </em>
                : <span key={i}>{w} </span>
            )}
          </h1>

          <p className="a2" style={{ fontSize:15.5,color:"var(--text-m)",lineHeight:1.82,maxWidth:490,marginBottom:"1.8rem" }}>
            {s.sub}
          </p>

          <div className="a3" style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:"2rem" }}>
            {s.pts.map(pt=>(
              <div key={pt} style={{ display:"flex",alignItems:"center",gap:11 }}>
                <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,
                  background:"linear-gradient(135deg,var(--gold),var(--gold-l))",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  boxShadow:"0 2px 8px rgba(200,164,74,.35)" }}>
                  <i className="fas fa-check" style={{ fontSize:8,color:"var(--navy)" }} />
                </div>
                <span style={{ fontSize:14,color:"var(--text)",fontWeight:500 }}>{pt}</span>
              </div>
            ))}
          </div>

          <div className="a4" style={{ display:"flex",flexWrap:"wrap",gap:13,marginBottom:".8rem" }}>
            <a href="#appointment" className="btn-navy"
              style={{ padding:"13px 28px",borderRadius:11,color:"white",fontSize:14,fontWeight:700,
                textDecoration:"none",display:"inline-flex",alignItems:"center",gap:9 }}>
              <i className="far fa-calendar-check" /> {s.b1}
            </a>
            <a href="#services"
              style={{ padding:"13px 28px",borderRadius:11,color:"var(--navy)",fontSize:14,fontWeight:600,
                textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8,
                background:"white",border:"1.5px solid var(--border)",
                transition:"all .25s",boxShadow:"0 4px 16px rgba(11,29,69,.06)" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.background="var(--gold-p)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="white"; }}>
              {s.b2} <i className="fas fa-arrow-right" style={{ fontSize:11 }} />
            </a>
          </div>

          {/* Dots */}
          <div className="a4" style={{ display:"flex",gap:8,marginTop:"2rem" }}>
            {SLIDES.map((_,i)=>(
              <button key={i} onClick={()=>{ setCur(i);setKey(k=>k+1); }}
                style={{ width:i===cur?30:8,height:8,borderRadius:50,border:"none",cursor:"pointer",
                  background:i===cur?"var(--gold)":"rgba(11,29,69,.15)",transition:"all .38s cubic-bezier(.34,1.56,.64,1)" }} />
            ))}
          </div>

          {/* Trust badges */}
          <div className="a5" style={{ display:"flex",flexWrap:"wrap",gap:12,marginTop:"2rem" }}>
            {[["fa-certificate","ICAI Member","Reg. No. 123456"],["fa-award","32+ Years","Experience"],["fa-users","2000+ Clients","Served"]].map(([ic,s1,s2])=>(
              <div key={s1} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 16px",
                background:"white",border:"1px solid var(--border)",borderRadius:12,
                boxShadow:"0 4px 16px rgba(11,29,69,.06)",transition:"all .28s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(200,164,74,.3)";e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="none"; }}>
                <div style={{ width:34,height:34,borderRadius:9,background:"rgba(11,29,69,.06)",
                  display:"flex",alignItems:"center",justifyContent:"center",color:"var(--navy-s)",fontSize:15 }}>
                  <i className={`fas ${ic}`} />
                </div>
                <div>
                  <strong style={{ display:"block",color:"var(--navy)",fontSize:13,fontWeight:700,lineHeight:1 }}>{s1}</strong>
                  <span style={{ fontSize:11,color:"var(--text-l)" }}>{s2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — photo */}
        {!isMobile && (
          <div key={`r${key}`} className="aR hero-r" style={{ position:"relative" }}>
            {/* ICAI pill */}
            <div style={{ position:"absolute",top:-12,left:24,zIndex:10,
              background:"linear-gradient(135deg,var(--gold),var(--gold-l))",
              borderRadius:50,padding:"8px 18px",boxShadow:"0 6px 20px rgba(200,164,74,.35)",
              animation:"floatX 4s ease-in-out infinite" }}>
              <span style={{ fontSize:12,fontWeight:700,color:"var(--navy)" }}>✓ ICAI Certified</span>
            </div>

            <div style={{ borderRadius:28,overflow:"hidden",background:"white",
              border:"1px solid var(--border)",boxShadow:"0 30px 80px rgba(11,29,69,.16)",
              aspectRatio:"3/4",maxHeight:580,position:"relative" }}>
              {!imgErr ? (
                <img src={IMG.hero} alt="CA Rishi"
                  onError={()=>setImgErr(true)}
                  style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center" }} />
              ) : (
                <div style={{ width:"100%",height:"100%",minHeight:460,
                  background:"linear-gradient(160deg,var(--bg),#dde6ff)",
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14 }}>
                  <div style={{ width:110,height:110,borderRadius:"50%",
                    background:"linear-gradient(135deg,var(--navy),var(--navy-s))",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    animation:"floatY 3s ease-in-out infinite",boxShadow:"0 20px 50px rgba(11,29,69,.3)" }}>
                    <i className="fas fa-user-tie" style={{ fontSize:46,color:"rgba(255,255,255,.85)" }} />
                  </div>
                  <p style={{ color:"var(--text-l)",fontSize:13,fontWeight:500 }}>CA Rishi</p>
                </div>
              )}
              {/* Gradient overlay */}
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"42%",
                background:"linear-gradient(transparent,rgba(11,29,69,.78))",
                display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"22px 24px" }}>
                <strong style={{ color:"var(--gold-l)",fontSize:18,fontFamily:"'Cormorant Garamond',serif",fontWeight:700 }}>
                  CA Rishi
                </strong>
                <span style={{ color:"rgba(255,255,255,.72)",fontSize:12.5 }}>Founder & Senior Partner</span>
                <div style={{ display:"flex",gap:6,marginTop:8 }}>
                  {["fa-linkedin-in","fa-whatsapp","fa-envelope"].map(ic=>(
                    <div key={ic} style={{ width:28,height:28,borderRadius:7,background:"rgba(255,255,255,.12)",
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"rgba(255,255,255,.8)" }}>
                      <i className={`fa${ic.includes("whatsapp")||ic.includes("linkedin")?"b":"s"} ${ic}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Float badge – years */}
            <div style={{ position:"absolute",bottom:88,left:-26,background:"white",
              borderRadius:16,padding:"14px 20px",boxShadow:"0 12px 40px rgba(11,29,69,.15)",
              border:"1px solid var(--border)",animation:"floatY 3.5s ease-in-out infinite",backdropFilter:"blur(12px)" }}>
              <strong style={{ display:"block",fontSize:28,fontWeight:700,color:"var(--navy)",
                fontFamily:"'Cormorant Garamond',serif",lineHeight:1 }}>32+</strong>
              <span style={{ fontSize:11,color:"var(--text-l)" }}>Years Expertise</span>
            </div>

            {/* Float badge – clients */}
            <div style={{ position:"absolute",top:44,right:-26,background:"white",
              borderRadius:16,padding:"14px 20px",boxShadow:"0 12px 40px rgba(11,29,69,.15)",
              border:"1px solid var(--border)",animation:"floatY 4.2s ease-in-out infinite .8s",backdropFilter:"blur(12px)" }}>
              <strong style={{ display:"block",fontSize:28,fontWeight:700,color:"var(--navy)",
                fontFamily:"'Cormorant Garamond',serif",lineHeight:1 }}>2000+</strong>
              <span style={{ fontSize:11,color:"var(--text-l)" }}>Happy Clients</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══ QUICK STATS ═══ */
function QuickStats() {
  const ref = useRef(null);
  const [anim, setAnim] = useState(false);
  const [counts, setCounts] = useState([0,0,0,0]);
  const targets = [32, 2000, 98, 20];
  const labels = ["Years Experience","Happy Clients","Client Satisfaction","Expert Services"];
  const icons = ["fa-history","fa-users","fa-smile-beam","fa-briefcase"];
  const suffs = ["+","+","%","+"];

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!anim){
        setAnim(true);
        targets.forEach((t,i)=>{
          let c=0; const step=Math.ceil(t/55);
          const id=setInterval(()=>{ c=Math.min(c+step,t); setCounts(p=>{const n=[...p];n[i]=c;return n;}); if(c>=t)clearInterval(id); },18);
        });
      }
    },{threshold:.2});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[anim]);

  return (
    <div ref={ref} style={{ background:"linear-gradient(135deg,var(--navy) 0%,var(--navy-m) 50%,var(--navy) 100%)",
      padding:"60px 2rem", position:"relative", overflow:"hidden" }}>
      {/* bg pattern */}
      <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(200,164,74,.06) 1px,transparent 1px)",
        backgroundSize:"32px 32px",pointerEvents:"none" }} />
      <div className="stats-g" style={{ maxWidth:1400,margin:"0 auto",display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",gap:0,position:"relative",zIndex:2 }}>
        {counts.map((c,i)=>(
          <div key={i} style={{ textAlign:"center",padding:"24px 16px",
            borderRight:i<3?"1px solid rgba(255,255,255,.06)":"none",position:"relative" }}>
            <div style={{ width:52,height:52,borderRadius:14,
              background:"rgba(200,164,74,.1)",border:"1px solid rgba(200,164,74,.18)",
              display:"flex",alignItems:"center",justifyContent:"center",
              margin:"0 auto 14px",color:"var(--gold)",fontSize:22,
              transition:"all .3s" }}>
              <i className={`fas ${icons[i]}`} />
            </div>
            <strong style={{ display:"block",fontSize:38,fontFamily:"'Cormorant Garamond',serif",
              fontWeight:700,color:"var(--gold-l)",lineHeight:1,
              animation:anim?`countUp .6s ${i*.1}s ease both`:undefined }}>
              {c}{suffs[i]}
            </strong>
            <span style={{ fontSize:12.5,color:"rgba(255,255,255,.45)",marginTop:5,display:"block",letterSpacing:.4 }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ ABOUT ═══ */
function About() {
  const ref = useReveal();
  const isMobile = useIsMobile();

  return (
    <section id="about" ref={ref} className="reveal sec" style={{ background:"white",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?"2.5rem":"5rem",alignItems:"center" }}>

          {/* Left photo */}
          <div style={{ position:"relative" }}>
            <div style={{ borderRadius:24,overflow:"hidden",background:"var(--bg)",
              border:"1px solid var(--border)",aspectRatio:"3/4",maxHeight:isMobile?280:500,position:"relative",
              boxShadow:"0 24px 60px rgba(11,29,69,.1)" }}>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="CA Rishi"
                onError={e=>{ e.target.style.display="none"; e.target.nextSibling&&(e.target.nextSibling.style.display="flex"); }}
                style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top" }} />
              <div style={{ display:"none",width:"100%",height:"100%",
                alignItems:"center",justifyContent:"center",
                background:"linear-gradient(135deg,var(--navy),var(--navy-s))" }}>
                <i className="fas fa-user-tie" style={{ fontSize:80,color:"rgba(255,255,255,.2)" }} />
              </div>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"38%",
                background:"linear-gradient(transparent,rgba(11,29,69,.8))",
                display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"18px 20px" }}>
                <strong style={{ color:"var(--gold-l)",fontSize:16,fontFamily:"'Cormorant Garamond',serif",fontWeight:700 }}>
                  CA Rishi & Associates
                </strong>
                <span style={{ color:"rgba(255,255,255,.65)",fontSize:12 }}>Established 1992 · {CITY}</span>
              </div>
            </div>

            {/* Floating decorative badges */}
            <div className="ab-left" style={{ position:"absolute",left:-28,top:40,
              background:"linear-gradient(135deg,var(--gold),var(--gold-l))",
              borderRadius:18,padding:"20px 24px",textAlign:"center",
              boxShadow:"0 14px 34px rgba(200,164,74,.3)",animation:"floatY 4s ease-in-out infinite" }}>
              <strong style={{ display:"block",fontSize:38,fontWeight:700,color:"var(--navy)",
                fontFamily:"'Cormorant Garamond',serif",lineHeight:1 }}>32+</strong>
              <span style={{ fontSize:10.5,color:"rgba(11,31,58,.7)",fontWeight:700,textTransform:"uppercase",letterSpacing:1 }}>
                Years Excellence
              </span>
            </div>
            <div className="ab-right" style={{ position:"absolute",right:-28,bottom:110,background:"white",
              borderRadius:16,padding:"16px 20px",border:"1px solid var(--border)",
              minWidth:162,boxShadow:"0 14px 36px rgba(11,29,69,.1)",textAlign:"center",
              animation:"floatY 3.5s ease-in-out infinite .5s" }}>
              <strong style={{ display:"block",fontSize:11,color:"var(--text-l)",fontWeight:500,marginBottom:4,textTransform:"uppercase",letterSpacing:1 }}>Established</strong>
              <strong style={{ fontSize:24,color:"var(--navy)",fontFamily:"'Cormorant Garamond',serif" }}>Since 1992</strong>
            </div>
          </div>

          {/* Right content */}
          <div>
            <Tag>Welcome to Our Firm</Tag>
            <h2 className="sec-h2" style={{ marginBottom:".8rem" }}>
              {CITY}'s Most <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Trusted</em> CA Practice
            </h2>
            <Divider />
            <p style={{ color:"var(--text-m)",lineHeight:1.88,marginBottom:"1rem",fontSize:15 }}>
              <strong>CA Rishi & Associates</strong> is a professionally managed chartered accountancy firm
              established in 1992. Our team of distinguished CAs, corporate financial advisors and tax consultants
              delivers specialized services geared to offer sound financial advice and proactive personalized support.
            </p>
            <p style={{ color:"var(--text-m)",lineHeight:1.88,fontSize:15,marginBottom:"1.6rem" }}>
              Based in <strong>Sitapur, Uttar Pradesh</strong>, we serve individuals, startups, MSMEs, and corporates
              across the region and beyond — covering all taxation compliance and accounting needs under a single roof.
            </p>

            {/* Commitments grid */}
            <div style={{ background:"var(--bg)",borderRadius:16,padding:"20px 24px",
              border:"1px solid var(--border)",marginBottom:"1.8rem" }}>
              <p style={{ fontSize:12,fontWeight:700,color:"var(--navy)",textTransform:"uppercase",letterSpacing:1,marginBottom:12 }}>
                Our Commitments:
              </p>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 16px" }}>
                {["Place Client Interest First","Uphold Honesty & Integrity","Continuous Service Quality","Excellence at All Times","Staff & Client Education","Strict Confidentiality"].map(c=>(
                  <div key={c} style={{ display:"flex",alignItems:"flex-start",gap:8 }}>
                    <i className="fas fa-check-circle" style={{ color:"var(--gold)",fontSize:13,marginTop:2,flexShrink:0 }} />
                    <span style={{ fontSize:12.5,color:"var(--text-m)",lineHeight:1.55 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team cards */}
            <div className="team-row" style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
              {[["CA Rishi","Founder & Senior Partner",0],["CA Pradeep Kumar","Tax & Compliance Head",1]].map(([name,role,idx])=>(
                <div key={name} style={{ display:"flex",alignItems:"center",gap:12,padding:"13px 17px",
                  background:idx===0?"linear-gradient(135deg,var(--navy),var(--navy-m))":"var(--bg)",
                  borderRadius:14,border:`1px solid ${idx===0?"transparent":"var(--border)"}`,flex:1,minWidth:190,
                  boxShadow:idx===0?"0 8px 28px rgba(11,29,69,.2)":"var(--shadow)" }}>
                  <div style={{ width:52,height:52,borderRadius:"50%",flexShrink:0,overflow:"hidden",
                    border:`2px solid ${idx===0?"rgba(200,164,74,.4)":"var(--border)"}`,
                    boxShadow:"0 3px 12px rgba(11,29,69,.12)" }}>
                    <img src={IMG.team[idx]} alt={name}
                      onError={e=>{ e.target.style.display="none"; }}
                      style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                  </div>
                  <div>
                    <strong style={{ display:"block",fontSize:13,fontWeight:700,color:idx===0?"var(--gold-l)":"var(--navy)" }}>{name}</strong>
                    <span style={{ fontSize:11.5,color:idx===0?"rgba(255,255,255,.55)":"var(--text-l)" }}>{role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ SERVICES ═══ */
function Services() {
  const ref = useReveal();
  return (
    <section id="services" ref={ref} className="reveal sec" style={{ background:"var(--bg)",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <Tag>What We Offer</Tag>
          <h2 className="sec-h2" style={{ marginBottom:"1rem" }}>
            Comprehensive <em style={{ color:"var(--gold)",fontStyle:"italic" }}>CA Services</em>
          </h2>
          <p style={{ fontSize:15,color:"var(--text-m)",lineHeight:1.78,maxWidth:580,margin:"0 auto" }}>
            20+ specialized services covering every financial, tax, and compliance requirement — for individuals,
            startups, MSMEs, corporates, and foreign companies.
          </p>
        </div>
        <div className="svc-g" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16 }}>
          {SERVICES.map(([ic,title,desc])=>(
            <div key={title} className="svc-card card-lift"
              style={{ background:"white",border:"1px solid var(--border)",borderRadius:18,padding:"24px",cursor:"pointer" }}>
              <div className="svc-icon" style={{ width:50,height:50,borderRadius:13,display:"flex",
                alignItems:"center",justifyContent:"center",background:"rgba(11,29,69,.05)",
                marginBottom:14,fontSize:21,color:"var(--navy-s)",flexShrink:0 }}>
                <i className={`fas ${ic}`} />
              </div>
              <h3 style={{ fontSize:14.5,fontWeight:700,color:"var(--navy)",marginBottom:7,lineHeight:1.3 }}>{title}</h3>
              <p style={{ fontSize:12.5,color:"var(--text-m)",lineHeight:1.68,marginBottom:14 }}>{desc}</p>
              <a href="#appointment" style={{ fontSize:12.5,color:"var(--gold)",fontWeight:700,
                textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6,transition:"gap .2s" }}
                onMouseEnter={e=>e.currentTarget.style.gap="11px"}
                onMouseLeave={e=>e.currentTarget.style.gap="6px"}>
                Enquire Now <i className="fas fa-arrow-right" style={{ fontSize:10 }} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ WHY CHOOSE US ═══ */
function WhyUs() {
  const ref = useReveal();
  return (
    <section id="why" ref={ref} className="reveal sec" style={{ background:"white",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <Tag>Why Choose Us</Tag>
          <h2 className="sec-h2" style={{ marginBottom:"1rem" }}>
            Why Clients <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Trust Us</em> Year After Year
          </h2>
        </div>
        <div className="why-g" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:18 }}>
          {WHY.map(([ic,title,desc],idx)=>(
            <div key={title} className="card-lift"
              style={{ padding:"26px",background:"var(--bg)",borderRadius:18,border:"1px solid var(--border)",
                transition:"all .3s",cursor:"default",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:0,right:0,width:80,height:80,borderRadius:"0 0 0 80px",
                background:`rgba(200,164,74,${.04+idx*.005})`,pointerEvents:"none" }} />
              <div style={{ width:50,height:50,borderRadius:14,marginBottom:14,fontSize:22,
                background:"rgba(11,29,69,.05)",color:"var(--navy-s)",display:"flex",alignItems:"center",justifyContent:"center",
                transition:"all .3s",flexShrink:0 }}>
                <i className={`fas ${ic}`} />
              </div>
              <h4 style={{ fontSize:15,fontWeight:700,color:"var(--navy)",marginBottom:7 }}>{title}</h4>
              <p style={{ fontSize:13,color:"var(--text-m)",lineHeight:1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ SKILL BARS ═══ */
function SkillBars() {
  const ref = useRef(null);
  const [anim, setAnim] = useState(false);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!anim){
        setAnim(true);
        setTimeout(()=>{
          document.querySelectorAll(".bar-fill").forEach(b=>{ b.style.width=b.dataset.w; });
        },120);
      }
    },{threshold:.2});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[anim]);

  return (
    <section ref={ref} className="sec diag-top" style={{ background:"linear-gradient(135deg,var(--bg),#E8EEF8)",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div className="skills-g" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
          <div>
            <Tag>Our Standards</Tag>
            <h2 className="sec-h2" style={{ marginBottom:"1rem" }}>
              Excellence in <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Every Engagement</em>
            </h2>
            <Divider />
            <p style={{ color:"var(--text-m)",lineHeight:1.88,fontSize:15 }}>
              Our performance metrics reflect our commitment to professional standards, client satisfaction,
              and ethical practice — consistently maintained over 32 years.
            </p>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:22 }}>
            {SKILLS.map(([label,pct])=>(
              <div key={label}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                  <span style={{ fontSize:13.5,fontWeight:600,color:"var(--navy)" }}>{label}</span>
                  <span style={{ fontSize:14,fontWeight:700,color:"var(--gold)",
                    fontFamily:"'Cormorant Garamond',serif" }}>{pct}%</span>
                </div>
                <div style={{ height:8,background:"rgba(11,29,69,.08)",borderRadius:50,overflow:"hidden" }}>
                  <div className="bar-fill" data-w={`${pct}%`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ VMV ═══ */
function VMVSection() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal sec" style={{ background:"white",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <Tag>Our Philosophy</Tag>
          <h2 className="sec-h2">Vision, Mission & <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Values</em></h2>
        </div>
        <div className="vmv-g" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }}>
          {VMV.map(([icon,title,text],i)=>(
            <div key={title} className="card-lift"
              style={{ padding:"36px 30px",borderRadius:22,textAlign:"center",cursor:"default",transition:"transform .3s",
                background:i===1?"linear-gradient(135deg,var(--navy),var(--navy-m))":"var(--bg)",
                border:`1px solid ${i===1?"transparent":"var(--border)"}`,
                boxShadow:i===1?"0 24px 60px rgba(11,29,69,.2)":"var(--shadow)" }}>
              <div style={{ fontSize:40,marginBottom:16,animation:`floatY ${3.5+i*.5}s ease-in-out infinite ${i*.3}s` }}>{icon}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:25,fontWeight:700,marginBottom:14,
                color:i===1?"var(--gold-l)":"var(--navy)" }}>{title}</h3>
              <p style={{ fontSize:14,lineHeight:1.82,color:i===1?"rgba(255,255,255,.72)":"var(--text-m)" }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CALCULATOR ═══ */
function Calculator() {
  const ref = useReveal();
  const [tab, setTab] = useState("itr");
  const [itr, setItr] = useState({ income:"",regime:"new",ded:"0" });
  const [gst, setGst] = useState({ amount:"",rate:"18",type:"exclusive" });
  const [emi, setEmi] = useState({ P:"",r:"",n:"" });

  const itrCalc=()=>{
    const inc=parseFloat(itr.income)||0,ded=itr.regime==="old"?(parseFloat(itr.ded)||0):0;
    const tx=Math.max(0,inc-ded);let tax=0;
    if(itr.regime==="new"){if(tx<=300000)tax=0;else if(tx<=700000)tax=(tx-300000)*.05;else if(tx<=1000000)tax=20000+(tx-700000)*.1;else if(tx<=1200000)tax=50000+(tx-1000000)*.15;else if(tx<=1500000)tax=80000+(tx-1200000)*.2;else tax=140000+(tx-1500000)*.3;if(tx<=700000)tax=0;}
    else{if(tx<=250000)tax=0;else if(tx<=500000)tax=(tx-250000)*.05;else if(tx<=1000000)tax=12500+(tx-500000)*.2;else tax=112500+(tx-1000000)*.3;if(tx<=500000)tax=0;}
    const cess=tax*.04;return{inc,ded,tx,tax,cess,total:tax+cess};
  };
  const gstCalc=()=>{
    const amt=parseFloat(gst.amount)||0,rate=parseFloat(gst.rate)||18;let g,base,tot;
    if(gst.type==="exclusive"){base=amt;g=amt*rate/100;tot=amt+g;}else{tot=amt;base=amt*100/(100+rate);g=amt-base;}
    return{g,base,tot,cgst:g/2,sgst:g/2,rate};
  };
  const emiCalc=()=>{
    const P=parseFloat(emi.P)||0,r=(parseFloat(emi.r)||0)/1200,n=parseInt(emi.n)||0;
    if(!P||!r||!n)return null;
    const e=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
    return{e,total:e*n,interest:e*n-P,P};
  };
  const ir=itrCalc(),gr=gstCalc(),er=emiCalc();
  const inp={width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10,
    fontSize:14,color:"var(--text)",background:"white",outline:"none",fontFamily:"'DM Sans',sans-serif",
    transition:"border-color .2s"};

  return (
    <section id="calculator" ref={ref} className="reveal sec" style={{ background:"var(--bg)",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ textAlign:"center",marginBottom:"2.5rem" }}>
          <Tag>Tax Tools</Tag>
          <h2 className="sec-h2" style={{ marginBottom:".8rem" }}>
            Free Tax <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Calculators</em>
          </h2>
          <p style={{ fontSize:15,color:"var(--text-m)",maxWidth:480,margin:"0 auto" }}>
            Estimate your income tax, GST amounts, and EMIs instantly — no sign-up required.
          </p>
        </div>
        <div style={{ display:"flex",gap:8,marginBottom:"2.5rem",flexWrap:"wrap" }}>
          {[["itr","Income Tax"],["gst","GST Calculator"],["emi","EMI Calculator"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              padding:"10px 24px",borderRadius:10,
              border:`1.5px solid ${tab===k?"var(--navy)":"var(--border)"}`,
              background:tab===k?"var(--navy)":"white",
              fontSize:13.5,fontWeight:600,color:tab===k?"white":"var(--text-m)",
              cursor:"pointer",transition:"all .22s cubic-bezier(.34,1.56,.64,1)",
              boxShadow:tab===k?"0 6px 20px rgba(11,29,69,.25)":"none" }}>{l}</button>
          ))}
        </div>

        {tab==="itr" && (
          <div className="calc-g" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"start" }}>
            <div>
              <CG lbl="Annual Income (₹)"><input type="number" placeholder="e.g. 800000" value={itr.income} onChange={e=>setItr(p=>({...p,income:e.target.value}))} style={inp} /></CG>
              <CG lbl="Tax Regime"><select value={itr.regime} onChange={e=>setItr(p=>({...p,regime:e.target.value}))} style={inp}><option value="new">New Regime (Default)</option><option value="old">Old Regime</option></select></CG>
              <CG lbl="Deductions 80C/D etc. (₹)"><input type="number" placeholder="e.g. 150000" value={itr.ded} onChange={e=>setItr(p=>({...p,ded:e.target.value}))} style={inp} /></CG>
            </div>
            <CalcBox title="Estimated Tax Payable" big={`₹ ${fmt(ir.total)}`}>
              <CR l="Gross Income" v={`₹ ${fmt(ir.inc)}`} />{ir.ded>0&&<CR l="Deductions" v={`-₹ ${fmt(ir.ded)}`} />}
              <CR l="Taxable Income" v={`₹ ${fmt(ir.tx)}`} /><CR l="Base Tax" v={`₹ ${fmt(ir.tax)}`} />
              <CR l="Health & Edu Cess (4%)" v={`₹ ${fmt(ir.cess)}`} /><CR l="Total Tax" v={`₹ ${fmt(ir.total)}`} total />
            </CalcBox>
          </div>
        )}
        {tab==="gst" && (
          <div className="calc-g" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"start" }}>
            <div>
              <CG lbl="Amount (₹)"><input type="number" placeholder="e.g. 10000" value={gst.amount} onChange={e=>setGst(p=>({...p,amount:e.target.value}))} style={inp} /></CG>
              <CG lbl="GST Rate"><select value={gst.rate} onChange={e=>setGst(p=>({...p,rate:e.target.value}))} style={inp}>{["5","12","18","28"].map(r=><option key={r} value={r}>{r}%</option>)}</select></CG>
              <CG lbl="Type"><select value={gst.type} onChange={e=>setGst(p=>({...p,type:e.target.value}))} style={inp}><option value="exclusive">Add GST (Exclusive)</option><option value="inclusive">Remove GST (Inclusive)</option></select></CG>
            </div>
            <CalcBox title="GST Amount" big={`₹ ${fmt(gr.g)}`}>
              <CR l="Base Amount" v={`₹ ${fmt(gr.base)}`} /><CR l={`CGST (${gr.rate/2}%)`} v={`₹ ${fmt(gr.cgst)}`} />
              <CR l={`SGST (${gr.rate/2}%)`} v={`₹ ${fmt(gr.sgst)}`} /><CR l="Total Amount" v={`₹ ${fmt(gr.tot)}`} total />
            </CalcBox>
          </div>
        )}
        {tab==="emi" && (
          <div className="calc-g" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"start" }}>
            <div>
              <CG lbl="Loan Amount (₹)"><input type="number" placeholder="e.g. 500000" value={emi.P} onChange={e=>setEmi(p=>({...p,P:e.target.value}))} style={inp} /></CG>
              <CG lbl="Annual Interest Rate (%)"><input type="number" placeholder="e.g. 10.5" value={emi.r} step=".1" onChange={e=>setEmi(p=>({...p,r:e.target.value}))} style={inp} /></CG>
              <CG lbl="Tenure (Months)"><input type="number" placeholder="e.g. 60" value={emi.n} onChange={e=>setEmi(p=>({...p,n:e.target.value}))} style={inp} /></CG>
            </div>
            <CalcBox title="Monthly EMI" big={er?`₹ ${fmt(er.e)}`:"₹ 0"}>
              {er&&<><CR l="Principal" v={`₹ ${fmt(er.P)}`} /><CR l="Total Interest" v={`₹ ${fmt(er.interest)}`} />
              <CR l="Total Payable" v={`₹ ${fmt(er.total)}`} /><CR l="Monthly EMI" v={`₹ ${fmt(er.e)}`} total /></>}
            </CalcBox>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══ APPOINTMENT ═══ */
function Appointment() {
  const ref = useReveal();
  const inp={width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10,
    fontSize:14,color:"var(--text)",background:"white",outline:"none",fontFamily:"'DM Sans',sans-serif"};
  return (
    <section id="appointment" ref={ref} className="reveal sec" style={{ background:"white",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div className="appt-g" style={{ display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:"4rem" }}>
          <div>
            <Tag>Book a Consultation</Tag>
            <h2 className="sec-h2" style={{ marginBottom:"1rem" }}>
              Schedule Your <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Free Consultation</em>
            </h2>
            <Divider />
            <p style={{ color:"var(--text-m)",lineHeight:1.88,marginBottom:"2rem",fontSize:15 }}>
              First consultation is always free. Speak with our CA experts at your convenience — in-person,
              video call, or WhatsApp.
            </p>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {[["fab fa-whatsapp","rgba(37,211,102,.08)","#25D366","WhatsApp Consultation",`Available 7 days · +91 ${PHONE_DISPLAY}`],
                ["fab fa-google","rgba(66,133,244,.08)","#4285F4","Google Meet Video Call","Schedule at your convenience"],
                ["fas fa-building","rgba(11,29,69,.05)","var(--navy)","In-Person Visit",ADDR]].map(([ic,bg,cl,t,sub])=>(
                <div key={t} className="card-lift" style={{ display:"flex",alignItems:"center",gap:13,padding:"14px 18px",
                  background:bg,borderRadius:14,border:"1px solid var(--border)" }}>
                  <div style={{ width:42,height:42,borderRadius:10,background:"rgba(255,255,255,.9)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:cl,flexShrink:0 }}>
                    <i className={ic} />
                  </div>
                  <div>
                    <strong style={{ display:"block",fontSize:13.5,color:"var(--navy)",fontWeight:700 }}>{t}</strong>
                    <span style={{ fontSize:12,color:"var(--text-l)" }}>{sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"white",borderRadius:22,padding:36,
            boxShadow:"0 20px 60px rgba(11,29,69,.1)",border:"1px solid var(--border)" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.7rem",color:"var(--navy)",marginBottom:"1.4rem",fontWeight:700 }}>
              Book Your Appointment
            </h3>
            <div className="form2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:13 }}>
              <FG lbl="Full Name *"><input type="text" placeholder="Your full name" style={inp} /></FG>
              <FG lbl="Phone *"><input type="tel" placeholder="+91 XXXXX XXXXX" style={inp} /></FG>
            </div>
            <div className="form2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:13 }}>
              <FG lbl="Email"><input type="email" placeholder="your@email.com" style={inp} /></FG>
              <FG lbl="Preferred Date"><input type="date" style={inp} /></FG>
            </div>
            <div className="form2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:13 }}>
              <FG lbl="Preferred Time"><input type="time" style={inp} /></FG>
              <FG lbl="Mode"><select style={inp}>{["In-Person","Google Meet","Zoom","WhatsApp"].map(o=><option key={o}>{o}</option>)}</select></FG>
            </div>
            <FG lbl="Service Required">
              <select style={inp}>
                {["-- Select Service --","Income Tax / ITR Filing","GST Registration & Returns","Company Registration","Audit & Assurance","Foreign Company Setup","Startup Compliance","TDS Filing","Trademark","Other"].map(o=><option key={o}>{o}</option>)}
              </select>
            </FG>
            <FG lbl="Message / Query">
              <textarea placeholder="Briefly describe your requirement..." style={{ ...inp,resize:"vertical",minHeight:86 }} />
            </FG>
            <button className="btn-navy"
              style={{ width:"100%",padding:"15px",borderRadius:12,color:"white",fontSize:15,fontWeight:700,
                border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9 }}
              onClick={()=>alert("Thank you! We will confirm your appointment within 2 hours.")}>
              <i className="far fa-calendar-check" /> Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
function Testimonials() {
  const ref = useReveal();
  const [imgErrors, setImgErrors] = useState({});
  const handleErr = k => setImgErrors(p=>({...p,[k]:true}));

  return (
    <section id="reviews" ref={ref} className="reveal sec"
      style={{ background:"linear-gradient(160deg,var(--bg) 0%,#E8EEF8 100%)",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <Tag>Client Reviews</Tag>
          <h2 className="sec-h2">What Our Clients <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Say</em></h2>
          <p style={{ color:"var(--text-m)",maxWidth:520,margin:"1rem auto 0",fontSize:15,lineHeight:1.75 }}>
            Trusted by thousands of individuals, businesses, and startups across Uttar Pradesh since 1992.
          </p>
        </div>
        <div className="testi-g" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20 }}>
          {TESTIS.map(([name,role,text,imgIdx])=>(
            <div key={name} className="card-lift"
              style={{ background:"white",borderRadius:20,padding:"28px 26px",
                border:"1px solid var(--border)",display:"flex",flexDirection:"column",
                boxShadow:"0 8px 28px rgba(11,29,69,.06)" }}>
              <div style={{ display:"flex",gap:3,color:"var(--gold)",fontSize:13,marginBottom:16 }}>
                {[0,1,2,3,4].map(i=><i key={i} className="fas fa-star" />)}
              </div>
              <div className="testi-quote" style={{ flex:1,marginBottom:20 }}>
                <p style={{ fontSize:13.5,color:"var(--text-m)",lineHeight:1.82,fontStyle:"italic" }}>
                  {text}
                </p>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:13,borderTop:"1px solid var(--border)",paddingTop:16 }}>
                <div style={{ width:50,height:50,borderRadius:"50%",flexShrink:0,overflow:"hidden",
                  border:"2.5px solid rgba(200,164,74,.3)",boxShadow:"0 3px 12px rgba(11,29,69,.1)" }}>
                  {!imgErrors[imgIdx] ? (
                    <img src={IMG.testi[imgIdx]} alt={name}
                      onError={()=>handleErr(imgIdx)}
                      style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                  ) : (
                    <div style={{ width:"100%",height:"100%",
                      background:"linear-gradient(135deg,var(--navy),var(--navy-s))",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:"var(--gold-l)",fontWeight:700,fontSize:16 }}>
                      {name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                    </div>
                  )}
                </div>
                <div>
                  <strong style={{ display:"block",fontSize:14,fontWeight:700,color:"var(--navy)" }}>{name}</strong>
                  <span style={{ fontSize:11.5,color:"var(--text-l)" }}>{role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
function FAQSection() {
  const ref = useReveal();
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" ref={ref} className="reveal sec" style={{ background:"white",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div className="faq-g" style={{ display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:"4rem",alignItems:"start" }}>
          <div>
            <Tag>Common Questions</Tag>
            <h2 className="sec-h2" style={{ marginBottom:"1rem" }}>
              Frequently Asked <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Questions</em>
            </h2>
            <Divider />
            <p style={{ color:"var(--text-m)",lineHeight:1.88,fontSize:15,marginBottom:"2rem" }}>
              Answers to the most common queries about tax filing, GST, company registration, and our services.
            </p>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              <a href={`https://wa.me/91${PHONE}`}
                style={{ display:"inline-flex",alignItems:"center",gap:9,padding:"12px 22px",borderRadius:11,
                  background:"#25D366",color:"white",fontSize:13.5,fontWeight:700,textDecoration:"none",
                  width:"fit-content",transition:"all .25s",boxShadow:"0 6px 20px rgba(37,211,102,.3)" }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                <i className="fab fa-whatsapp" /> Ask on WhatsApp
              </a>
              <a href={`tel:+91${PHONE}`}
                style={{ display:"inline-flex",alignItems:"center",gap:9,padding:"12px 22px",borderRadius:11,
                  border:"1.5px solid var(--border)",color:"var(--navy)",fontSize:13.5,fontWeight:600,
                  textDecoration:"none",width:"fit-content",transition:"all .22s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--navy)";e.currentTarget.style.background="var(--bg)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="none"; }}>
                <i className="fas fa-phone" style={{ fontSize:12 }} /> Call: {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div>
            {FAQS.map(([q,a],i)=>(
              <div key={i} style={{ borderBottom:"1px solid var(--border)" }}>
                <button onClick={()=>setOpen(open===i?null:i)}
                  style={{ width:"100%",textAlign:"left",padding:"18px 0",
                    background:"none",border:"none",display:"flex",justifyContent:"space-between",
                    alignItems:"center",gap:14,fontSize:14,fontWeight:600,
                    color:open===i?"var(--gold)":"var(--navy)",cursor:"pointer",transition:"color .2s" }}>
                  {q}
                  <span style={{ width:30,height:30,borderRadius:"50%",flexShrink:0,display:"flex",
                    alignItems:"center",justifyContent:"center",fontSize:12,transition:"all .32s cubic-bezier(.34,1.56,.64,1)",
                    background:open===i?"var(--gold)":"var(--bg)",
                    color:open===i?"white":"var(--gold)",
                    transform:open===i?"rotate(45deg)":"none" }}>
                    <i className="fas fa-plus" />
                  </span>
                </button>
                <div className="faqb" style={{ maxHeight:open===i?"300px":"0" }}>
                  <div style={{ padding:"0 0 18px",fontSize:13.5,color:"var(--text-m)",lineHeight:1.82 }}>{a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ BLOG ═══ */
function BlogSection() {
  const ref = useReveal();
  return (
    <section id="blog" ref={ref} className="reveal sec" style={{ background:"var(--bg)",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16,marginBottom:"3rem" }}>
          <div>
            <Tag>Latest Insights</Tag>
            <h2 className="sec-h2">Tax <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Updates</em> & Expert Guides</h2>
          </div>
          <a href="#" style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"11px 22px",
            border:"1.5px solid var(--border)",borderRadius:11,color:"var(--navy)",fontSize:13.5,
            fontWeight:600,textDecoration:"none",background:"white",transition:"all .22s",whiteSpace:"nowrap" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--navy)";e.currentTarget.style.background="var(--bg)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="white"; }}>
            View All <i className="fas fa-arrow-right" style={{ fontSize:11 }} />
          </a>
        </div>
        <div className="blog-g" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:22 }}>
          {BLOGS.map(([ic,cat,date,read,title,desc])=>(
            <div key={title} className="card-lift"
              style={{ background:"white",borderRadius:20,overflow:"hidden",border:"1px solid var(--border)",cursor:"pointer" }}>
              <div style={{ height:185,background:"linear-gradient(135deg,var(--navy),var(--navy-m))",
                display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
                {/* bg dots */}
                <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(200,164,74,.08) 1px,transparent 1px)",backgroundSize:"24px 24px" }} />
                <i className={`fas ${ic}`} style={{ fontSize:52,color:"rgba(200,164,74,.4)",position:"relative",zIndex:1 }} />
                <span style={{ position:"absolute",top:14,left:14,background:"linear-gradient(135deg,var(--gold),var(--gold-l))",
                  color:"var(--navy)",fontSize:10.5,fontWeight:700,padding:"5px 13px",borderRadius:50,letterSpacing:.6 }}>{cat}</span>
                <span style={{ position:"absolute",bottom:14,right:14,background:"rgba(255,255,255,.12)",
                  backdropFilter:"blur(10px)",color:"rgba(255,255,255,.8)",fontSize:11,padding:"5px 12px",borderRadius:50 }}>{read} read</span>
              </div>
              <div style={{ padding:"22px 24px" }}>
                <div style={{ fontSize:11.5,color:"var(--text-l)",marginBottom:9,display:"flex",alignItems:"center",gap:5 }}>
                  <i className="far fa-calendar" style={{ fontSize:10 }} /> {date}
                </div>
                <h3 style={{ fontSize:15.5,fontWeight:700,color:"var(--navy)",marginBottom:9,lineHeight:1.42,fontFamily:"'Cormorant Garamond',serif" }}>{title}</h3>
                <p style={{ fontSize:13,color:"var(--text-m)",lineHeight:1.68,marginBottom:15 }}>{desc}</p>
                <a href="#" style={{ fontSize:12.5,color:"var(--gold)",fontWeight:700,textDecoration:"none",
                  display:"inline-flex",alignItems:"center",gap:6,transition:"gap .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.gap="11px"}
                  onMouseLeave={e=>e.currentTarget.style.gap="6px"}>
                  Read More <i className="fas fa-arrow-right" style={{ fontSize:10 }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CTA() {
  return (
    <section style={{ background:"linear-gradient(135deg,var(--navy) 0%,var(--navy-m) 50%,var(--navy) 100%)",
      padding:"88px 2rem",textAlign:"center",position:"relative",overflow:"hidden" }}>
      {/* Animated blobs */}
      <div style={{ position:"absolute",top:-140,right:-100,width:500,height:500,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(200,164,74,.1) 0%,transparent 70%)",animation:"floatY 6s ease-in-out infinite" }} />
      <div style={{ position:"absolute",bottom:-100,left:-80,width:360,height:360,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(32,80,160,.15) 0%,transparent 70%)",animation:"floatY 5s ease-in-out infinite 1s" }} />
      {/* Dot grid */}
      <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none" }} />
      <div style={{ position:"relative",zIndex:2,maxWidth:700,margin:"0 auto" }}>
        <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"7px 18px",
          background:"rgba(200,164,74,.12)",border:"1px solid rgba(200,164,74,.28)",
          borderRadius:50,color:"var(--gold-l)",fontSize:12,fontWeight:600,letterSpacing:1,
          textTransform:"uppercase",marginBottom:"1.5rem" }}>
          <span style={{ width:6,height:6,background:"var(--gold)",borderRadius:"50%",animation:"pulse2 2s infinite" }} />
          Free Consultation Available
        </div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,4.5vw,3.2rem)",
          fontWeight:700,color:"white",marginBottom:"1rem",lineHeight:1.12 }}>
          Worried About Your Business Compliance?
        </h2>
        <p style={{ fontSize:15.5,color:"rgba(255,255,255,.65)",marginBottom:"2.8rem",lineHeight:1.8 }}>
          Let CA Rishi's expert team handle all your tax and compliance requirements.
          Contact us today for a free, no-obligation consultation.
        </p>
        <div className="cta-row" style={{ display:"flex",flexWrap:"wrap",gap:13,justifyContent:"center" }}>
          <a href="#appointment" className="btn-gold"
            style={{ padding:"15px 32px",borderRadius:13,color:"var(--navy)",fontSize:14.5,fontWeight:700,
              textDecoration:"none",display:"inline-flex",alignItems:"center",gap:9 }}>
            <i className="far fa-calendar-check" /> Book Free Consultation
          </a>
          <a href={`https://wa.me/91${PHONE}`}
            style={{ padding:"15px 32px",borderRadius:13,color:"white",background:"#25D366",
              fontSize:14.5,fontWeight:700,textDecoration:"none",transition:"all .3s",
              display:"inline-flex",alignItems:"center",gap:9,boxShadow:"0 6px 22px rgba(37,211,102,.3)" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(37,211,102,.45)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 6px 22px rgba(37,211,102,.3)"; }}>
            <i className="fab fa-whatsapp" style={{ fontSize:17 }} /> WhatsApp Us Now
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══ CONTACT ═══ */
function Contact() {
  const ref = useReveal();
  const inp={width:"100%",padding:"12px 16px",border:"1.5px solid var(--border)",borderRadius:10,
    fontSize:14,color:"var(--text)",background:"var(--bg)",outline:"none",fontFamily:"'DM Sans',sans-serif"};
  return (
    <section id="contact" ref={ref} className="reveal sec" style={{ background:"white",padding:"100px 0" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div className="contact-g" style={{ display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:"4rem" }}>
          <div>
            <Tag>Get In Touch</Tag>
            <h2 className="sec-h2" style={{ marginBottom:"1rem" }}>
              Visit or Call <em style={{ color:"var(--gold)",fontStyle:"italic" }}>Our Office</em>
            </h2>
            <Divider />
            <p style={{ color:"var(--text-m)",lineHeight:1.88,marginBottom:"2rem",fontSize:15 }}>
              Available Monday to Sunday, 10 AM to 8:30 PM. Walk in anytime or schedule a call.
            </p>
            <div style={{ display:"flex",flexDirection:"column",gap:18,marginBottom:"2rem" }}>
              {[["fa-map-marker-alt","Office",ADDR,null],
                ["fa-phone","Phone",PHONE_DISPLAY,`tel:+91${PHONE}`],
                ["fa-envelope","Email",EMAIL,`mailto:${EMAIL}`],
                ["fa-clock","Hours","Mon – Sun: 10:00 AM – 8:30 PM",null]].map(([ic,lbl,val,href])=>(
                <div key={lbl} style={{ display:"flex",gap:14,alignItems:"flex-start" }}>
                  <div style={{ width:44,height:44,background:"var(--bg)",border:"1px solid var(--border)",
                    borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:17,color:"var(--navy-s)",flexShrink:0 }}>
                    <i className={`fas ${ic}`} />
                  </div>
                  <div>
                    <strong style={{ display:"block",fontSize:11.5,color:"var(--text-l)",fontWeight:600,
                      marginBottom:3,textTransform:"uppercase",letterSpacing:.6 }}>{lbl}</strong>
                    {href?<a href={href} style={{ fontSize:14.5,color:"var(--navy)",fontWeight:600,textDecoration:"none" }}>{val}</a>
                      :<span style={{ fontSize:14,color:"var(--navy)",fontWeight:500,display:"block",lineHeight:1.55 }}>{val}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex",gap:9,flexWrap:"wrap",marginBottom:"1.5rem" }}>
              {[["fab fa-whatsapp","WhatsApp","#25D366","white",`https://wa.me/91${PHONE}`],
                ["fas fa-phone","Call Now","var(--navy)","white",`tel:+91${PHONE}`],
                ["fas fa-envelope","Email","var(--gold-p)","var(--navy)",`mailto:${EMAIL}`]].map(([ic,l,bg,cl,href])=>(
                <a key={l} href={href}
                  style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"10px 17px",
                    borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none",background:bg,color:cl,
                    transition:"transform .22s",border:l==="Email"?"1px solid rgba(200,164,74,.3)":"none" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                  <i className={ic} /> {l}
                </a>
              ))}
            </div>
            <div onClick={()=>window.open(MAPS_URL,"_blank")}
              style={{ height:180,background:"var(--bg)",borderRadius:16,border:"1px solid var(--border)",
                display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                gap:9,color:"var(--text-l)",fontSize:14,cursor:"pointer",transition:"all .25s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)";e.currentTarget.style.background="var(--gold-p)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text-l)";e.currentTarget.style.background="var(--bg)"; }}>
              <i className="fas fa-map-marked-alt" style={{ fontSize:32 }} />
              <span style={{ fontWeight:600 }}>Click to Open Google Maps</span>
              <span style={{ fontSize:12 }}>{CITY} – 261001</span>
            </div>
          </div>

          <div style={{ background:"var(--bg)",borderRadius:22,padding:36,border:"1px solid var(--border)" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",color:"var(--navy)",marginBottom:"1.4rem",fontWeight:700 }}>
              Send Us a Message
            </h3>
            <div className="form2" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:13 }}>
              <FG lbl="Your Name"><input type="text" placeholder="Full name" style={inp} /></FG>
              <FG lbl="Phone"><input type="tel" placeholder="+91 XXXXX XXXXX" style={inp} /></FG>
            </div>
            <FG lbl="Email Address"><input type="email" placeholder="your@email.com" style={inp} /></FG>
            <FG lbl="Service">
              <select style={inp}>
                {["-- Select Service --","Income Tax / ITR","GST Services","Company Registration","Audit & Assurance","Foreign Company","Startup Compliance","Other"].map(o=><option key={o}>{o}</option>)}
              </select>
            </FG>
            <FG lbl="Your Message">
              <textarea placeholder="How can we help you?" style={{ ...inp,resize:"vertical",minHeight:100 }} />
            </FG>
            <button className="btn-navy"
              style={{ width:"100%",padding:"15px",borderRadius:12,color:"white",fontSize:15,fontWeight:700,
                border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9 }}
              onClick={()=>alert("Thank you! We will respond within 24 hours.")}>
              <i className="fas fa-paper-plane" /> Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  const lnk={fontSize:13,color:"rgba(255,255,255,.38)",textDecoration:"none",display:"block",padding:"4px 0",transition:"color .18s"};
  const hov=e=>e.target.style.color="var(--gold-l)";
  const out=e=>e.target.style.color="rgba(255,255,255,.38)";
  return (
    <footer style={{ background:"linear-gradient(135deg,var(--navy) 0%,var(--navy-m) 100%)",
      borderTop:"1px solid rgba(255,255,255,.04)" }}>
      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"68px 2rem 44px" }}>
        <div className="footer-g" style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.5fr",gap:"2.5rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:"1.1rem" }}>
              <div style={{ width:46,height:46,borderRadius:12,
                background:"linear-gradient(135deg,var(--gold),var(--gold-l))",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:18,color:"var(--navy)" }}>CA</div>
              <div>
                <strong style={{ display:"block",fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,color:"white" }}>
                  CA Rishi & Associates
                </strong>
                <span style={{ fontSize:10,color:"var(--gold-l)",letterSpacing:"1.5px",textTransform:"uppercase" }}>Chartered Accountants</span>
              </div>
            </div>
            <p style={{ fontSize:13,color:"rgba(255,255,255,.42)",lineHeight:1.8,marginBottom:10 }}>
              ICAI registered CA firm providing comprehensive tax, audit, and financial services since 1992. Serving {CITY} and across India.
            </p>
            <p style={{ fontSize:11.5,color:"rgba(255,255,255,.22)",marginBottom:"1rem" }}>ICAI Reg. No: FRN 123456E</p>
            <div style={{ display:"flex",gap:7,flexWrap:"wrap" }}>
              {["fab fa-facebook-f","fab fa-instagram","fab fa-linkedin-in","fab fa-youtube","fab fa-whatsapp"].map((ic,i)=>(
                <a key={i} href="#" style={{ width:34,height:34,borderRadius:9,background:"rgba(255,255,255,.05)",
                  border:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",
                  color:"rgba(255,255,255,.4)",fontSize:13,textDecoration:"none",transition:"all .22s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(200,164,74,.15)";e.currentTarget.style.color="var(--gold-l)";e.currentTarget.style.borderColor="rgba(200,164,74,.28)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.color="rgba(255,255,255,.4)";e.currentTarget.style.borderColor="rgba(255,255,255,.08)"; }}>
                  <i className={ic} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize:12.5,fontWeight:700,color:"white",textTransform:"uppercase",letterSpacing:1,marginBottom:"1rem" }}>Quick Links</h4>
            <ul style={{ listStyle:"none" }}>
              {[["Home","#hero"],["About Us","#about"],["Services","#services"],["Tax Calculator","#calculator"],["Book Appointment","#appointment"],["Blog","#blog"],["Contact","#contact"]].map(([l,href])=>(
                <li key={l}><a href={href} style={lnk} onMouseEnter={hov} onMouseLeave={out}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize:12.5,fontWeight:700,color:"white",textTransform:"uppercase",letterSpacing:1,marginBottom:"1rem" }}>Services</h4>
            <ul style={{ listStyle:"none" }}>
              {["Income Tax Return","GST Filing","Company Registration","Audit & Assurance","TDS Filing","Foreign Company","Startup Compliance","Trademark","Payroll"].map(l=>(
                <li key={l}><a href="#services" style={lnk} onMouseEnter={hov} onMouseLeave={out}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize:12.5,fontWeight:700,color:"white",textTransform:"uppercase",letterSpacing:1,marginBottom:"1rem" }}>Newsletter</h4>
            <p style={{ fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:"1rem",lineHeight:1.75 }}>
              Tax tips, deadline reminders & budget updates in your inbox.
            </p>
            <div style={{ display:"flex" }}>
              <input type="email" placeholder="Your email address"
                style={{ flex:1,padding:"11px 14px",background:"rgba(255,255,255,.06)",
                  border:"1px solid rgba(255,255,255,.1)",borderRight:"none",
                  borderRadius:"9px 0 0 9px",color:"white",fontSize:13,
                  outline:"none",fontFamily:"'DM Sans',sans-serif" }} />
              <button style={{ padding:"11px 16px",background:"linear-gradient(135deg,var(--gold),var(--gold-l))",border:"none",
                borderRadius:"0 9px 9px 0",color:"var(--navy)",fontWeight:700,fontSize:13,cursor:"pointer" }}>
                Go
              </button>
            </div>
            <div style={{ marginTop:"1.3rem",padding:"15px 17px",background:"rgba(200,164,74,.07)",
              border:"1px solid rgba(200,164,74,.12)",borderRadius:12 }}>
              <p style={{ fontSize:12,color:"rgba(255,255,255,.48)",marginBottom:5 }}>📍 {ADDR}</p>
              <p style={{ fontSize:12,color:"rgba(255,255,255,.48)",marginBottom:5 }}>📞 {PHONE_DISPLAY}</p>
              <p style={{ fontSize:12,color:"rgba(255,255,255,.48)" }}>🕐 Mon–Sun: 10 AM – 8:30 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth:1400,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.05)",padding:"18px 0",
          display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
          <p style={{ fontSize:12,color:"rgba(255,255,255,.25)" }}>
            © 2025 CA Rishi & Associates. Chartered Accountants. All rights reserved.
          </p>
          <div style={{ display:"flex",gap:18,flexWrap:"wrap" }}>
            {["Privacy Policy","Terms & Conditions","Disclaimer"].map(l=>(
              <a key={l} href="#" style={{ fontSize:12,color:"rgba(255,255,255,.25)",textDecoration:"none",transition:"color .18s" }}
                onMouseEnter={e=>e.target.style.color="var(--gold-l)"}
                onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.25)"}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══ FLOATING BUTTONS ═══ */
function FloatingBtns() {
  return (
    <div style={{ position:"fixed",bottom:24,right:24,zIndex:900,display:"flex",flexDirection:"column",gap:11,alignItems:"flex-end" }}>
      <a href={`https://wa.me/91${PHONE}`} className="fpill"
        style={{ background:"#25D366",color:"white",boxShadow:"0 8px 28px rgba(37,211,102,.4)" }}
        onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px) scale(1.05)";e.currentTarget.style.boxShadow="0 14px 38px rgba(37,211,102,.5)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 28px rgba(37,211,102,.4)"; }}>
        <i className="fab fa-whatsapp" style={{ fontSize:19 }} />
        <span className="float-lbl">WhatsApp Us</span>
      </a>
      <a href={`tel:+91${PHONE}`} className="fpill"
        style={{ background:"var(--navy)",color:"white",border:"1px solid rgba(255,255,255,.12)",boxShadow:"0 8px 28px rgba(11,29,69,.28)" }}
        onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px) scale(1.05)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform="none"; }}>
        <i className="fas fa-phone" style={{ fontSize:15 }} />
        <span className="float-lbl">Call Now</span>
      </a>
    </div>
  );
}

/* ═══ ATOMS ═══ */
function Tag({ children }) {
  return (
    <div style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"5px 15px",borderRadius:50,
      fontSize:11.5,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:"1rem",
      background:"rgba(200,164,74,.1)",color:"var(--gold)",border:"1px solid rgba(200,164,74,.22)" }}>
      {children}
    </div>
  );
}
function Divider() {
  return <div style={{ width:52,height:3,background:"linear-gradient(90deg,var(--gold),var(--gold-l))",borderRadius:2,margin:"1rem 0" }} />;
}
function CG({ lbl, children }) {
  return (
    <div style={{ marginBottom:"1.1rem" }}>
      <label style={{ display:"block",fontSize:13,fontWeight:600,color:"var(--navy)",marginBottom:5 }}>{lbl}</label>
      {children}
    </div>
  );
}
function CalcBox({ title, big, children }) {
  return (
    <div style={{ background:"linear-gradient(155deg,var(--navy) 0%,var(--navy-m) 100%)",
      borderRadius:22,padding:"32px 28px",textAlign:"center",
      boxShadow:"0 24px 60px rgba(11,29,69,.18)",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:-50,right:-50,width:200,height:200,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(200,164,74,.08) 0%,transparent 70%)" }} />
      <p style={{ color:"rgba(255,255,255,.55)",fontSize:13.5,marginBottom:8,position:"relative" }}>{title}</p>
      <div style={{ fontSize:46,fontFamily:"'Cormorant Garamond',serif",fontWeight:700,
        color:"var(--gold-l)",lineHeight:1,marginBottom:24,position:"relative" }}>{big}</div>
      <div style={{ textAlign:"left",position:"relative" }}>{children}</div>
    </div>
  );
}
function CR({ l, v, total }) {
  return (
    <div style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",
      borderBottom:"1px solid rgba(255,255,255,.06)",fontSize:13 }}>
      <span style={{ color:total?"var(--gold-l)":"rgba(255,255,255,.46)",fontWeight:total?700:400 }}>{l}</span>
      <span style={{ color:total?"var(--gold-l)":"white",fontWeight:total?700:500 }}>{v}</span>
    </div>
  );
}
function FG({ lbl, children }) {
  return (
    <div style={{ marginBottom:"1rem" }}>
      <label style={{ display:"block",fontSize:11.5,fontWeight:700,color:"var(--navy)",
        marginBottom:5,textTransform:"uppercase",letterSpacing:.5 }}>{lbl}</label>
      {children}
    </div>
  );
}