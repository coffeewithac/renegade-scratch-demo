"use client";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   RENEGADE SCRATCH — Ordering Portal Demo
   Chef Ann Foundation · Northern Virginia MVP · EMBA Presentation
   ═══════════════════════════════════════════════════════════════ */

const C = {
  green: "#78BE20", greenDark: "#5A9A10", greenDeep: "#3D7A0A",
  greenPale: "#EDF7E0", greenMist: "#F4FAF0",
  orange: "#F26522", orangeLight: "#FFF0E8",
  dark: "#2D2D2D", body: "#4A4A4A", muted: "#7A7A7A", subtle: "#A0A0A0",
  border: "#E5E5E5", light: "#F5F5F5", offWhite: "#FAFAFA", white: "#FFFFFF",
  gold: "#F5A623", goldPale: "#FFF9ED",
  blue: "#2B7BB9", bluePale: "#EBF5FF",
  red: "#D0021B", redPale: "#FFF0F2",
};
const font = `'Source Sans 3', -apple-system, sans-serif`;

const Logo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill={C.green} />
    <path d="M13 28c0-8 3-15 7-18 4 3 7 10 7 18" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M20 12v18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 22c2.5-1 7.5-1 10 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const persona = { name: "James Whitfield", title: "Director of Auxiliary Programs", school: "Potomac Ridge Academy", location: "McLean, VA", students: 410, newStudents: 34, email: "j.whitfield@potomacridgeacademy.org" };

const order = {
  week: "April 20 – 24, 2026", theme: "Earth Week Harvest", emoji: "\u{1F33F}",
  tagline: "Farm-to-tray meals celebrating our planet — sourced from Virginia farms within 100 miles.",
  count: 410, price: 9.00,
  days: [
    { day: "Monday", entree: "Garden Veggie Lasagna with Basil Cream", side: "Roasted Shenandoah Beet & Arugula Salad", grain: "Housemade Garlic Focaccia", fruit: "Virginia Apple Cups", tags: ["vegetarian", "local"], img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80" },
    { day: "Tuesday", entree: "Herb-Crusted Chicken Thighs", side: "Quinoa Pilaf with Butternut Squash", grain: "Scratch Cornbread Muffin", fruit: "Seasonal Berry Medley", tags: ["protein", "whole-grain"], img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&q=80" },
    { day: "Wednesday", entree: "Chesapeake Fish Tacos with Cilantro-Lime Slaw", side: "Black Bean & Sweet Corn Salad", grain: "Housemade Flour Tortillas", fruit: "Fresh-Cut Mango", tags: ["omega-3", "scratch"], img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80" },
    { day: "Thursday", entree: "Slow-Braised Beef Bolognese over Penne", side: "Caesar Salad with Scratch Croutons", grain: "Whole Wheat Penne", fruit: "Honeycrisp Apple Slices", tags: ["comfort", "whole-grain"], img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
    { day: "Friday", entree: "BBQ Pulled Pork Sliders", side: "Rainbow Coleslaw", grain: "Potato Buns (Scratch-Baked)", fruit: "Watermelon Wedges", tags: ["celebration", "scratch"], img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80" },
  ],
};

const pastOrders = [
  { week: "Apr 14–18", theme: "\u{1F9EA} Finals Fuel", total: "$18,450.00" },
  { week: "Apr 7–11", theme: "\u{1F338} Cherry Blossom Menu", total: "$18,450.00" },
  { week: "Mar 31–Apr 4", theme: "\u{1F30D} World Cultures Week", total: "$18,270.00" },
];

const tagMeta = {
  vegetarian: { label: "Vegetarian", color: C.green }, local: { label: "Virginia Sourced", color: "#E65100" },
  protein: { label: "Protein Power", color: C.blue }, "whole-grain": { label: "Whole Grain", color: "#8D6E27" },
  "omega-3": { label: "Omega-Rich", color: C.blue }, scratch: { label: "Scratch-Made", color: C.orange },
  comfort: { label: "Comfort Classic", color: "#6D4C41" }, celebration: { label: "Celebration", color: "#7B1FA2" },
};

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800;900&family=Fraunces:wght@400;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: ${font}; -webkit-font-smoothing: antialiased; }
    @keyframes glow { 0%,100% { box-shadow: 0 0 12px rgba(242,101,34,0.25); } 50% { box-shadow: 0 0 28px rgba(242,101,34,0.55); } }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
    .fade-up { animation: fadeUp 0.5s ease both; }
    .fade-d1 { animation-delay: 0.1s; } .fade-d2 { animation-delay: 0.2s; } .fade-d3 { animation-delay: 0.3s; }
    .glow-border { animation: glow 2.5s ease-in-out infinite; }
    .pulse-btn { animation: pulse 2s ease-in-out infinite; }
    .slide-in { animation: slideIn 0.4s ease both; }
  `}</style>
);

const Tag = ({ id }) => {
  const t = tagMeta[id]; if (!t) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: `${t.color}14`, color: t.color }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: t.color, opacity: 0.6 }} />{t.label}</span>;
};

const Card = ({ children, style = {}, className = "", ...p }) => (
  <div className={className} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, ...style }} {...p}>{children}</div>
);

// ─── Nav ───
function Nav({ screen }) {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: font, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)", backgroundColor: "rgba(255,255,255,0.95)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Logo size={36} />
        <div><div style={{ fontSize: 16, fontWeight: 800, color: C.dark, lineHeight: 1.2 }}>Renegade Scratch</div><div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Powered by Chef Ann Foundation</div></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.muted, cursor: "pointer" }}>Menu Calendar</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.muted, cursor: "pointer" }}>Billing</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: C.muted, cursor: "pointer" }}>Support</span>
        {screen !== "dashboard" && (
          <div style={{ position: "relative", cursor: "pointer" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            <div style={{ position: "absolute", top: -4, right: -6, width: 16, height: 16, borderRadius: "50%", background: C.orange, fontSize: 9, fontWeight: 800, color: C.white, display: "flex", alignItems: "center", justifyContent: "center" }}>1</div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: C.white }}>JW</div>
          <div><div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>James Whitfield</div><div style={{ fontSize: 11, color: C.muted }}>{persona.school}</div></div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: font, fontSize: 12, color: C.subtle }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Logo size={16} /><span>&copy; 2026 Chef Ann Foundation &middot; Renegade Scratch</span></div>
      <div style={{ display: "flex", gap: 20 }}>{["Privacy", "Terms", "Support", "chefannfoundation.org"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}</div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 1 — Dashboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Dashboard({ onOpen }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 300); }, []);

  return (
    <div style={{ fontFamily: font, background: C.offWhite, minHeight: "calc(100vh - 64px)", padding: "0 0 60px" }}>
      {/* Hero banner with photo */}
      <div style={{ background: `linear-gradient(135deg, ${C.greenDeep}, ${C.greenDark})`, padding: "48px 48px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", backgroundImage: "url(https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=900&q=80)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", fontWeight: 500, marginBottom: 6 }}>Good morning, James</p>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: C.white, margin: "0 0 8px", letterSpacing: "-0.02em", fontFamily: "'Fraunces', Georgia, serif" }}>Your Dashboard</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", margin: 0 }}>{persona.school} &middot; {persona.location} &middot; {persona.students} students enrolled</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>
        {/* ═══ ACTION REQUIRED — GIANT, GLOWING, UNMISSABLE ═══ */}
        <Card className="glow-border fade-up" style={{
          marginTop: -28, position: "relative", zIndex: 10,
          border: `3px solid ${C.orange}`, cursor: "pointer",
          overflow: "hidden",
        }} onClick={onOpen}>
          <div style={{ background: `linear-gradient(135deg, ${C.orange}, #E05A18)`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{"\u{1F6A8}"}</span>
              <span style={{ color: C.white, fontSize: 14, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>Action Required — Confirm Your Upcoming Menu</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Due by Thursday, April 17</span>
          </div>
          <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: C.dark, fontFamily: "'Fraunces', Georgia, serif" }}>
                {order.emoji} {order.theme} — Week of {order.week}
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: 15, color: C.body, lineHeight: 1.6 }}>
                Your curated 5-day scratch-cooked menu is ready for review. {persona.students} meals per day at ${order.price.toFixed(2)}/meal.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: C.greenPale, color: C.greenDark }}>5-Day Menu</span>
                <span style={{ padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: C.goldPale, color: "#9A7B10" }}>{persona.students} Meals/Day</span>
                <span style={{ padding: "5px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: C.orangeLight, color: C.orange }}>100% Scratch</span>
              </div>
            </div>
            <button className="pulse-btn" style={{
              background: C.orange, color: C.white, border: "none", borderRadius: 12,
              padding: "18px 36px", fontSize: 17, fontWeight: 800, fontFamily: font,
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              boxShadow: `0 4px 16px rgba(242,101,34,0.3)`,
            }}>
              Review Menu &rarr;
            </button>
          </div>
        </Card>

        {/* Stats + Impact — two column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "This Month", value: "$18,450", sub: "2,050 meals served", icon: "\u{1F4CA}" },
              { label: "Parent Satisfaction", value: "98%", sub: "Spring survey", icon: "\u{2B50}" },
              { label: "Scratch Score", value: "100%", sub: "Zero processed", icon: "\u{1F331}" },
            ].map((s, i) => (
              <Card key={i} className={`fade-up fade-d${i + 1}`} style={{ padding: "22px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: C.dark, fontFamily: "'Fraunces', Georgia, serif" }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.body, marginTop: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.sub}</div>
              </Card>
            ))}
          </div>
          {/* Impact */}
          <Card className="fade-up fade-d3" style={{ padding: "24px 28px", background: C.greenPale, border: `1px solid ${C.green}30`, display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, backgroundImage: "url(https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=300&q=80)", backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.greenDeep, fontFamily: "'Fraunces', Georgia, serif" }}>Your Impact This Year</div>
              <div style={{ fontSize: 14, color: C.body, lineHeight: 1.6, marginTop: 6 }}>
                Potomac Ridge has served <strong>36,900 scratch-cooked meals</strong> since September — 100% made from whole ingredients. <strong>Zero ultraprocessed foods</strong> reaching your students.
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Deliveries */}
        <h3 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "32px 0 12px" }}>Recent Deliveries</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {pastOrders.map((o, i) => (
            <Card key={i} className={`fade-up fade-d${i + 1}`} style={{ padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{o.theme}</div><div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{o.week}</div></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: C.body }}>{o.total}</div><span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: C.greenPale, color: C.greenDark }}>&check; Delivered</span></div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 2 — Menu Review
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function MenuReview({ onAdjust, onBack }) {
  const [openDay, setOpenDay] = useState(0);
  const wt = order.count * order.price * 5;

  return (
    <div style={{ fontFamily: font, background: C.offWhite, minHeight: "calc(100vh - 64px)", padding: "32px 48px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontFamily: font, fontSize: 14, fontWeight: 600, color: C.muted, cursor: "pointer", padding: 0, marginBottom: 24 }}>&larr; Back to Dashboard</button>

        {/* Hero with photo */}
        <Card className="fade-up" style={{ marginBottom: 24, border: "none", overflow: "hidden", background: `linear-gradient(135deg, ${C.greenDeep}, ${C.green})` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px" }}>
            <div style={{ padding: "36px 40px" }}>
              <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, background: "rgba(255,255,255,0.2)", color: C.white, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Week of Apr 20–24</div>
              <h2 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 800, color: C.white, letterSpacing: "-0.02em", fontFamily: "'Fraunces', Georgia, serif" }}>{order.emoji} {order.theme}</h2>
              <p style={{ margin: "0 0 28px", fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, maxWidth: 480 }}>{order.tagline}</p>
              <div style={{ display: "flex", gap: 32 }}>
                {[{ l: "Daily Count", v: order.count }, { l: "Per Meal", v: `$${order.price.toFixed(2)}` }, { l: "Weekly Total", v: `$${wt.toLocaleString("en-US", { minimumFractionDigits: 2 })}` }].map((d, i) => (
                  <div key={i}><div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{d.l}</div><div style={{ fontSize: 22, fontWeight: 800, color: C.white, marginTop: 4 }}>{d.v}</div></div>
                ))}
              </div>
            </div>
            <div style={{ backgroundImage: "url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&q=80)", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(61,122,10,0.9), transparent 40%)" }} />
            </div>
          </div>
        </Card>

        {/* Day cards — full width grid */}
        <h3 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 14px" }}>Daily Menus — Click to Expand</h3>
        {order.days.map((d, i) => {
          const isOpen = openDay === i;
          return (
            <Card key={i} className="slide-in" style={{ marginBottom: 10, cursor: "pointer", borderColor: isOpen ? C.green : C.border, boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.06)" : "none", transition: "all 0.2s", overflow: "hidden" }} onClick={() => setOpenDay(isOpen ? -1 : i)}>
              <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, backgroundImage: `url(${d.img})`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0, border: isOpen ? `2px solid ${C.green}` : "2px solid transparent", transition: "all 0.2s" }} />
                  <div style={{ width: 50, height: 50, borderRadius: 10, background: isOpen ? C.green : C.light, color: isOpen ? C.white : C.dark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, transition: "all 0.2s" }}>{d.day.slice(0, 3).toUpperCase()}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.dark }}>{d.entree}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>{d.tags.map(t => <Tag key={t} id={t} />)}</div>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 16 16" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}><path d="M4 6l4 4 4-4" stroke={C.muted} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
              </div>
              {isOpen && (
                <div style={{ padding: "0 24px 20px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, paddingTop: 16 }}>
                    {[{ label: "Entr\u00E9e", val: d.entree, icon: "\u{1F37D}\uFE0F" }, { label: "Side", val: d.side, icon: "\u{1F957}" }, { label: "Grain", val: d.grain, icon: "\u{1F35E}" }, { label: "Fruit", val: d.fruit, icon: "\u{1F34E}" }].map((item, j) => (
                      <div key={j} style={{ background: C.light, borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 5 }}>{item.icon} {item.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.dark, lineHeight: 1.4 }}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {/* ═══ ENROLLMENT ALERT — BIG & PROMINENT ═══ */}
        <Card className="glow-border" style={{ padding: "28px 32px", marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", background: `linear-gradient(135deg, ${C.orangeLight}, #FFF)`, border: `3px solid ${C.orange}`, gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flex: 1 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: C.orange, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{"\u{1F4C8}"}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.dark, fontFamily: "'Fraunces', Georgia, serif" }}>Enrollment Increase — 34 New Students</div>
              <div style={{ fontSize: 14, color: C.body, marginTop: 4, lineHeight: 1.5 }}>Potomac Ridge reports <strong>34 new families enrolled</strong> since your last order. The scratch-cooked meal program is being cited as a key enrollment factor. <strong>Your meal count needs updating.</strong></div>
            </div>
          </div>
          <button className="pulse-btn" onClick={onAdjust} style={{ background: C.orange, color: C.white, border: "none", borderRadius: 12, padding: "18px 36px", fontSize: 17, fontWeight: 800, fontFamily: font, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 4px 16px rgba(242,101,34,0.3)" }}>
            Adjust Meals &rarr;
          </button>
        </Card>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 3 — Adjust Meals
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Adjust({ onConfirm, onBack }) {
  const [count, setCount] = useState(persona.students);
  const [anim, setAnim] = useState(persona.students);
  const [note, setNote] = useState("");
  const suggested = persona.students + persona.newStudents;
  const wt = count * order.price * 5;
  const diff = count - persona.students;

  useEffect(() => { if (anim !== count) { const t = setTimeout(() => setAnim(p => p + (p < count ? 1 : -1)), 8); return () => clearTimeout(t); } }, [anim, count]);

  return (
    <div style={{ fontFamily: font, background: C.offWhite, minHeight: "calc(100vh - 64px)", padding: "32px 48px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontFamily: font, fontSize: 14, fontWeight: 600, color: C.muted, cursor: "pointer", padding: 0, marginBottom: 28 }}>&larr; Back to Menu Review</button>

        <h2 style={{ margin: "0 0 6px", fontSize: 30, fontWeight: 800, color: C.dark, letterSpacing: "-0.02em", fontFamily: "'Fraunces', Georgia, serif" }}>Adjust Meal Count</h2>
        <p style={{ margin: "0 0 32px", fontSize: 15, color: C.muted }}>Update daily meals for the week of {order.week}.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
          <div>
            {/* Enrollment alert */}
            <Card className="fade-up" style={{ padding: "24px 28px", marginBottom: 24, background: C.orangeLight, border: `2px solid ${C.orange}40` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: C.orange, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{"\u{1F4C8}"}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.dark }}>Enrollment Increase Detected</div>
                  <div style={{ fontSize: 14, color: C.body, marginTop: 4, lineHeight: 1.6 }}>Potomac Ridge has <strong>34 new students</strong>. Families are citing the meal program as a key enrollment factor.</div>
                </div>
              </div>
              <button onClick={() => setCount(suggested)} style={{ background: C.orange, color: C.white, border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 700, fontFamily: font, cursor: "pointer", marginTop: 16, width: "100%" }}>Apply Suggested: {suggested} meals/day</button>
            </Card>

            {/* Counter */}
            <Card className="fade-up fade-d1" style={{ padding: "32px 28px", marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Daily Meal Count</label>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginTop: 24, marginBottom: 28 }}>
                <button onClick={() => setCount(Math.max(100, count - 10))} style={{ width: 56, height: 56, borderRadius: 14, border: `2px solid ${C.border}`, background: C.white, fontSize: 24, fontWeight: 700, cursor: "pointer", color: C.dark, fontFamily: font, display: "flex", alignItems: "center", justifyContent: "center" }}>&minus;</button>
                <div style={{ textAlign: "center", minWidth: 140 }}>
                  <div style={{ fontSize: 72, fontWeight: 900, color: C.dark, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "'Fraunces', Georgia, serif" }}>{anim}</div>
                  <div style={{ fontSize: 14, color: C.muted, marginTop: 8 }}>meals per day</div>
                </div>
                <button onClick={() => setCount(count + 10)} style={{ width: 56, height: 56, borderRadius: 14, border: `2px solid ${C.green}`, background: C.greenPale, fontSize: 24, fontWeight: 700, cursor: "pointer", color: C.greenDark, fontFamily: font, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              <input type="range" min={200} max={600} value={count} onChange={e => setCount(parseInt(e.target.value))} style={{ width: "100%", accentColor: C.green, height: 8 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.subtle, marginTop: 8 }}><span>200</span><span style={{ color: C.muted, fontWeight: 600 }}>Previous: {persona.students}</span><span>600</span></div>
              {diff !== 0 && (
                <div style={{ marginTop: 20, padding: "14px 18px", borderRadius: 12, background: diff > 0 ? C.greenPale : C.redPale, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: diff > 0 ? C.greenDeep : C.red }}>{diff > 0 ? "+" : ""}{diff} meals/day</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: diff > 0 ? C.greenDeep : C.red }}>{diff > 0 ? "+" : ""}${(diff * order.price * 5).toLocaleString("en-US", { minimumFractionDigits: 2 })}/wk</span>
                </div>
              )}
            </Card>

            {/* Note */}
            <Card className="fade-up fade-d2" style={{ padding: "22px 28px" }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Special Instructions (Optional)</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="e.g., 5 students with nut allergies in Ms. Patel's 3rd grade class..." style={{ width: "100%", marginTop: 12, padding: 16, border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: font, fontSize: 14, color: C.body, resize: "vertical", minHeight: 80, boxSizing: "border-box", outline: "none" }} />
            </Card>
          </div>

          {/* Summary sidebar */}
          <div>
            <Card className="fade-up fade-d2" style={{ padding: "28px", position: "sticky", top: 96 }}>
              <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: C.dark, fontFamily: "'Fraunces', Georgia, serif" }}>Order Summary</h3>
              {[{ l: "Menu", v: `${order.emoji} ${order.theme}` }, { l: "Week", v: order.week }, { l: "Daily Count", v: `${count} meals` }, { l: "Price/Meal", v: `$${order.price.toFixed(2)}` }, { l: "Daily Subtotal", v: `$${(count * order.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}` }].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}`, fontSize: 14 }}>
                  <span style={{ color: C.muted }}>{r.l}</span><span style={{ fontWeight: 600, color: C.dark }}>{r.v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, marginTop: 4, fontSize: 22, fontWeight: 900 }}>
                <span style={{ color: C.dark }}>Weekly Total</span>
                <span style={{ color: C.green, fontFamily: "'Fraunces', Georgia, serif" }}>${wt.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <button onClick={() => onConfirm(count)} style={{ background: C.green, color: C.white, border: "none", borderRadius: 10, padding: "16px 24px", fontSize: 17, fontWeight: 800, fontFamily: font, cursor: "pointer", width: "100%", marginTop: 24, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.greenDark} onMouseLeave={e => e.currentTarget.style.background = C.green}
              >Confirm Order</button>
              <button onClick={onBack} style={{ background: "transparent", color: C.muted, border: `2px solid ${C.border}`, borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, fontFamily: font, cursor: "pointer", width: "100%", marginTop: 10 }}>Cancel</button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 4 — Confirmation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Confirmation({ finalCount, onReset }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);
  const wt = finalCount * order.price * 5;

  return (
    <div style={{ fontFamily: font, background: `linear-gradient(180deg, ${C.greenMist} 0%, ${C.offWhite} 50%)`, minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px" }}>
      <div style={{ textAlign: "center", maxWidth: 620, opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.96)", transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", color: C.white, boxShadow: `0 8px 32px ${C.green}40` }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: C.dark, margin: "0 0 10px", letterSpacing: "-0.02em", fontFamily: "'Fraunces', Georgia, serif" }}>Order Confirmed</h1>
        <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.6, margin: "0 0 36px" }}>Your <strong style={{ color: C.greenDark }}>{order.emoji} {order.theme}</strong> menu is locked in. Confirmation sent to <strong>{persona.email}</strong>.</p>

        <Card style={{ padding: "28px", textAlign: "left", marginBottom: 20 }}>
          {[{ l: "School", v: persona.school }, { l: "Menu", v: `${order.emoji} ${order.theme}` }, { l: "Week", v: order.week }, { l: "Daily Meals", v: finalCount }, { l: "Weekly Total", v: `$${wt.toLocaleString("en-US", { minimumFractionDigits: 2 })}` }, { l: "Confirmation #", v: "RS-2026-04172" }].map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none", fontSize: 15 }}>
              <span style={{ color: C.muted }}>{r.l}</span><span style={{ fontWeight: 700, color: C.dark }}>{r.v}</span>
            </div>
          ))}
        </Card>

        <Card style={{ padding: "18px 24px", background: C.greenPale, border: `1px solid ${C.green}30`, fontSize: 14, color: C.body, lineHeight: 1.6, textAlign: "left", marginBottom: 16 }}>
          <strong style={{ color: C.greenDeep }}>{"\u{1F69A}"} Delivery Details:</strong> Meals prepared at the <strong>Renegade Scratch Cooking Complex</strong> in Fairfax, VA. Fresh delivery to Potomac Ridge Academy every morning at 10:30 AM. Your liaison: <strong>Chef Maria Gonzalez</strong>.
        </Card>

        <Card style={{ padding: "18px 24px", background: C.bluePale, border: `1px solid ${C.blue}25`, fontSize: 14, color: C.body, lineHeight: 1.6, textAlign: "left", marginBottom: 32 }}>
          <strong style={{ color: C.blue }}>{"\u{1F3DB}\uFE0F"} Upcoming:</strong> Senator Warner's office has scheduled a <strong>farm-to-school tour</strong> of the Fairfax Cooking Complex on <strong>May 8th</strong>. Potomac Ridge has been invited as a featured partner school.
        </Card>

        <button onClick={onReset} style={{ background: "transparent", color: C.muted, border: `2px solid ${C.border}`, borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 700, fontFamily: font, cursor: "pointer" }}>&#x21BA; Restart Demo</button>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [finalCount, setFinalCount] = useState(410);
  const go = (s) => { window.scrollTo?.(0, 0); setScreen(s); };

  return (
    <div style={{ fontFamily: font, background: C.offWhite, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Styles />
      <Nav screen={screen} />
      <div style={{ flex: 1 }}>
        {screen === "dashboard" && <Dashboard onOpen={() => go("review")} />}
        {screen === "review" && <MenuReview onAdjust={() => go("adjust")} onBack={() => go("dashboard")} />}
        {screen === "adjust" && <Adjust onConfirm={c => { setFinalCount(c); go("confirmed"); }} onBack={() => go("review")} />}
        {screen === "confirmed" && <Confirmation finalCount={finalCount} onReset={() => go("dashboard")} />}
      </div>
      <Footer />
    </div>
  );
}
