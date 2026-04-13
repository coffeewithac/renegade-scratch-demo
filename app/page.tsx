"use client";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════
   RENEGADE SCRATCH — Powered by Chef Ann Foundation
   School Ordering Portal Demo · Northern Virginia MVP
   
   Brand alignment: Chef Ann Foundation's bright green, white-forward,
   warm + mission-driven aesthetic. Clean, modern, trustworthy.
   ═══════════════════════════════════════════════════════════════════ */

// ─── CAF Brand Tokens ───
const C = {
  // Primary — CAF's signature bright green
  green: "#78BE20",
  greenDark: "#5A9A10",
  greenDeep: "#3D7A0A",
  greenPale: "#EDF7E0",
  greenMist: "#F4FAF0",
  // Accent — warm orange (used on CAF site for CTAs)
  orange: "#F26522",
  orangeLight: "#FFF0E8",
  // Neutrals — clean, professional
  black: "#1A1A1A",
  dark: "#2D2D2D",
  body: "#4A4A4A",
  muted: "#7A7A7A",
  subtle: "#A0A0A0",
  border: "#E5E5E5",
  light: "#F5F5F5",
  offWhite: "#FAFAFA",
  white: "#FFFFFF",
  // Utility accents
  gold: "#F5A623",
  goldPale: "#FFF9ED",
  blue: "#2B7BB9",
  bluePale: "#EBF5FF",
  red: "#D0021B",
  redPale: "#FFF0F2",
};

const font = `'Source Sans 3', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

// CAF Logo SVG (simplified mark — green leaf/spoon motif)
const CAFLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill={C.green} />
    <path d="M13 28c0-8 3-15 7-18 4 3 7 10 7 18" stroke={C.white} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M20 12v18" stroke={C.white} strokeWidth="2" strokeLinecap="round" />
    <path d="M15 22c2.5-1 7.5-1 10 0" stroke={C.white} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Data ───
const persona = {
  name: "James Whitfield",
  title: "Director of Auxiliary Programs",
  school: "Potomac Ridge Academy",
  location: "McLean, VA",
  students: 410,
  newStudents: 34,
  email: "j.whitfield@potomacridgeacademy.org",
};

const order = {
  week: "April 20 – 24, 2026",
  theme: "Earth Week Harvest",
  emoji: "\u{1F33F}",
  tagline: "Farm-to-tray meals celebrating our planet — sourced from Virginia farms within 100 miles.",
  count: 410,
  price: 9.00,
  days: [
    { day: "Monday", entree: "Garden Veggie Lasagna with Basil Cream", side: "Roasted Shenandoah Beet & Arugula Salad", grain: "Housemade Garlic Focaccia", fruit: "Virginia Apple Cups", tags: ["vegetarian", "local"] },
    { day: "Tuesday", entree: "Herb-Crusted Chicken Thighs", side: "Quinoa Pilaf with Butternut Squash", grain: "Scratch Cornbread Muffin", fruit: "Seasonal Berry Medley", tags: ["protein", "whole-grain"] },
    { day: "Wednesday", entree: "Chesapeake Fish Tacos with Cilantro-Lime Slaw", side: "Black Bean & Sweet Corn Salad", grain: "Housemade Flour Tortillas", fruit: "Fresh-Cut Mango", tags: ["omega-3", "scratch"] },
    { day: "Thursday", entree: "Slow-Braised Beef Bolognese over Penne", side: "Caesar Salad with Scratch Croutons", grain: "Whole Wheat Penne", fruit: "Honeycrisp Apple Slices", tags: ["comfort", "whole-grain"] },
    { day: "Friday", entree: "BBQ Pulled Pork Sliders", side: "Rainbow Coleslaw", grain: "Potato Buns (Scratch-Baked)", fruit: "Watermelon Wedges", tags: ["celebration", "scratch"] },
  ],
};

const history = [
  { week: "Apr 14–18", theme: "\u{1F9EA} Finals Fuel", total: "$18,450.00" },
  { week: "Apr 7–11", theme: "\u{1F338} Cherry Blossom Menu", total: "$18,450.00" },
  { week: "Mar 31–Apr 4", theme: "\u{1F30D} World Cultures Week", total: "$18,270.00" },
];

const tagMeta = {
  vegetarian: { label: "Vegetarian", color: C.green },
  local: { label: "Virginia Sourced", color: "#E65100" },
  protein: { label: "Protein Power", color: C.blue },
  "whole-grain": { label: "Whole Grain", color: "#8D6E27" },
  "omega-3": { label: "Omega-Rich", color: C.blue },
  scratch: { label: "Scratch-Made", color: C.orange },
  comfort: { label: "Comfort Classic", color: "#6D4C41" },
  celebration: { label: "Celebration", color: "#7B1FA2" },
};

// ─── Shared Components ───
const Tag = ({ id }: { id: string }) => {
  const t = (tagMeta as Record<string, { label: string; color: string }>)[id];
  if (!t) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: `${t.color}12`, color: t.color, letterSpacing: "0.01em",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.color, opacity: 0.7 }} />
      {t.label}
    </span>
  );
};

const Card = ({ children, style = {}, ...props }: { children: React.ReactNode; style?: React.CSSProperties; [key: string]: unknown }) => (
  <div style={{
    background: C.white, borderRadius: 12,
    border: `1px solid ${C.border}`,
    ...style,
  }} {...props}>{children}</div>
);

// ─── Navigation ───
function NavBar({ screen }) {
  return (
    <div style={{
      background: C.white,
      borderBottom: `1px solid ${C.border}`,
      padding: "0 32px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: font,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <CAFLogo size={32} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.dark, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            Renegade Scratch
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1 }}>
            Powered by Chef Ann Foundation
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {screen !== "dashboard" && (
          <div style={{ position: "relative", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div style={{
              position: "absolute", top: -3, right: -5, width: 14, height: 14, borderRadius: "50%",
              background: C.orange, fontSize: 8, fontWeight: 800, color: C.white,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>1</div>
          </div>
        )}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: C.white, cursor: "pointer",
        }}>JW</div>
      </div>
    </div>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <div style={{
      borderTop: `1px solid ${C.border}`, padding: "24px 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: font, fontSize: 12, color: C.subtle,
      flexWrap: "wrap", gap: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <CAFLogo size={18} />
        <span>&copy; 2026 Chef Ann Foundation &middot; Renegade Scratch</span>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <span style={{ cursor: "pointer" }}>Privacy</span>
        <span style={{ cursor: "pointer" }}>Terms</span>
        <span style={{ cursor: "pointer" }}>Support</span>
        <span style={{ cursor: "pointer" }}>chefannfoundation.org</span>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 1 — Dashboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Dashboard({ onOpen }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 400); }, []);

  return (
    <div style={{
      fontFamily: font, background: C.offWhite,
      minHeight: "calc(100vh - 60px)",
      padding: "40px 24px 60px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 600 }}>
        {/* Greeting */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 14, color: C.muted, margin: "0 0 4px", fontWeight: 500 }}>Good morning, James</p>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: C.dark, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            Your Dashboard
          </h1>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>
            {persona.school} &middot; {persona.location} &middot; {persona.students} students
          </p>
        </div>

        {/* Notification */}
        <Card style={{
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(-16px)",
          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
          border: `2px solid ${C.orange}`,
          cursor: "pointer",
          marginBottom: 24,
        }} onClick={onOpen}>
          <div style={{
            background: C.orange, padding: "10px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ color: C.white, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Action Required
            </span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Just now</span>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: C.dark }}>
              Confirm Your Upcoming Menu
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: 14, color: C.body, lineHeight: 1.6 }}>
              Your <strong style={{ color: C.greenDark }}>{order.emoji} {order.theme}</strong> menu for {order.week} is ready for review. Please confirm by <strong>Thursday, April 17</strong>.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{
                  padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  background: C.greenPale, color: C.greenDark,
                }}>5-Day Menu</span>
                <span style={{
                  padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  background: C.goldPale, color: "#9A7B10",
                }}>{persona.students} Meals/Day</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.orange }}>Review &rarr;</span>
            </div>
          </div>
        </Card>

        {/* Impact + Stats Row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12,
          marginBottom: 28,
        }}>
          {[
            { label: "This Month", value: "$18,450", sub: "2,050 meals served", icon: "\u{1F4CA}" },
            { label: "Parent Satisfaction", value: "98%", sub: "Spring survey", icon: "\u{2B50}" },
            { label: "Scratch Score", value: "100%", sub: "Zero processed items", icon: "\u{1F331}" },
          ].map((s, i) => (
            <Card key={i} style={{
              padding: "18px 14px", textAlign: "center",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)",
              transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${0.2 + i * 0.1}s`,
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.dark }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.body, marginTop: 3 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Mission Banner */}
        <Card style={{
          padding: "20px 24px", marginBottom: 28,
          background: C.greenPale, border: `1px solid ${C.green}30`,
          display: "flex", gap: 16, alignItems: "center",
          opacity: vis ? 1 : 0,
          transition: "opacity 0.5s 0.5s",
        }}>
          <div style={{ fontSize: 32, flexShrink: 0 }}>{"\u{1F3EB}"}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.greenDeep }}>Your Impact This Year</div>
            <div style={{ fontSize: 13, color: C.body, lineHeight: 1.5, marginTop: 2 }}>
              Potomac Ridge has served <strong>36,900 scratch-cooked meals</strong> since September — 100% made from whole ingredients. That's <strong>zero ultraprocessed foods</strong> reaching your students.
            </div>
          </div>
        </Card>

        {/* Recent */}
        <h3 style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>
          Recent Deliveries
        </h3>
        {history.map((o, i) => (
          <Card key={i} style={{
            marginBottom: 8, padding: "14px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            opacity: vis ? 1 : 0, transition: `opacity 0.4s ${0.5 + i * 0.1}s`,
          }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{o.theme}</span>
              <span style={{ fontSize: 12, color: C.muted, marginLeft: 10 }}>{o.week}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.body }}>{o.total}</span>
              <span style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                background: C.greenPale, color: C.greenDark,
              }}>&check; Delivered</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 2 — Menu Review
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function MenuReview({ onAdjust, onBack }) {
  const [openDay, setOpenDay] = useState(0);
  const weekTotal = order.count * order.price * 5;

  return (
    <div style={{
      fontFamily: font, background: C.offWhite,
      minHeight: "calc(100vh - 60px)",
      padding: "32px 24px 80px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 640 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontFamily: font,
          fontSize: 13, fontWeight: 600, color: C.muted, cursor: "pointer", padding: 0, marginBottom: 20,
        }}>&larr; Back to Dashboard</button>

        {/* Hero */}
        <Card style={{
          marginBottom: 20, border: "none", overflow: "hidden",
          background: `linear-gradient(135deg, ${C.greenDeep} 0%, ${C.greenDark} 50%, ${C.green} 100%)`,
        }}>
          {/* Image strip */}
          <div style={{
            height: 140, position: "relative",
            backgroundImage: `url(https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800&q=80)`,
            backgroundSize: "cover", backgroundPosition: "center 40%",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(61,122,10,0.6), rgba(61,122,10,0.9))",
            }} />
            <div style={{ position: "relative", padding: "24px 28px" }}>
              <div style={{
                display: "inline-block", padding: "4px 12px", borderRadius: 20,
                background: "rgba(255,255,255,0.2)", color: C.white,
                fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                marginBottom: 10, backdropFilter: "blur(8px)",
              }}>Week of Apr 20–24</div>
              <h2 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: C.white, letterSpacing: "-0.02em" }}>
                {order.emoji} {order.theme}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, maxWidth: 420 }}>
                {order.tagline}
              </p>
            </div>
          </div>
          {/* Stats strip */}
          <div style={{
            padding: "16px 28px", display: "flex", gap: 28,
            background: "rgba(0,0,0,0.15)",
          }}>
            {[
              { label: "Daily Count", val: order.count },
              { label: "Per Meal", val: `$${order.price.toFixed(2)}` },
              { label: "Weekly Total", val: `$${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
            ].map((d, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{d.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.white, marginTop: 2 }}>{d.val}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Days */}
        <h3 style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "24px 0 12px" }}>
          Daily Menus
        </h3>
        {order.days.map((d, i) => {
          const isOpen = openDay === i;
          return (
            <Card key={i} style={{
              marginBottom: 8, cursor: "pointer",
              boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,0.06)" : "none",
              borderColor: isOpen ? C.green : C.border,
              transition: "all 0.2s",
            }} onClick={() => setOpenDay(isOpen ? -1 : i)}>
              <div style={{
                padding: "14px 20px", display: "flex",
                alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: isOpen ? C.green : C.light,
                    color: isOpen ? C.white : C.dark,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, transition: "all 0.2s",
                  }}>{d.day.slice(0, 3).toUpperCase()}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>{d.entree}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                      {d.tags.map(t => <Tag key={t} id={t} />)}
                    </div>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s", flexShrink: 0,
                }}>
                  <path d="M4 6l4 4 4-4" stroke={C.muted} strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>
              {isOpen && (
                <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 14 }}>
                    {[
                      { label: "Entr\u00E9e", val: d.entree, icon: "\u{1F37D}\uFE0F" },
                      { label: "Side", val: d.side, icon: "\u{1F957}" },
                      { label: "Grain", val: d.grain, icon: "\u{1F35E}" },
                      { label: "Fruit", val: d.fruit, icon: "\u{1F34E}" },
                    ].map((item, j) => (
                      <div key={j} style={{ background: C.light, borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 4 }}>
                          {item.icon} {item.label}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, lineHeight: 1.4 }}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {/* Enrollment Nudge */}
        <Card style={{
          padding: "20px 24px", marginTop: 24,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: C.goldPale, border: `1px solid ${C.gold}40`,
          flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>
              Enrollment Update Available
            </div>
            <div style={{ fontSize: 13, color: C.body, marginTop: 4, lineHeight: 1.5 }}>
              Potomac Ridge reports <strong>34 new students</strong> since your last order. Time to adjust?
            </div>
          </div>
          <button onClick={onAdjust} style={{
            background: C.green, color: C.white, border: "none", borderRadius: 8,
            padding: "12px 24px", fontSize: 14, fontWeight: 700, fontFamily: font,
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.greenDark}
            onMouseLeave={e => e.currentTarget.style.background = C.green}
          >Adjust Meals &rarr;</button>
        </Card>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 3 — Adjust Meals
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Adjust({ onConfirm, onBack }) {
  const [count, setCount] = useState(persona.students);
  const [animCount, setAnimCount] = useState(persona.students);
  const [note, setNote] = useState("");
  const suggested = persona.students + persona.newStudents;
  const weekTotal = count * order.price * 5;
  const diff = count - persona.students;

  useEffect(() => {
    if (animCount !== count) {
      const t = setTimeout(() => setAnimCount(p => p + (p < count ? 1 : -1)), 8);
      return () => clearTimeout(t);
    }
  }, [animCount, count]);

  return (
    <div style={{
      fontFamily: font, background: C.offWhite,
      minHeight: "calc(100vh - 60px)",
      padding: "32px 24px 80px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 540 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontFamily: font,
          fontSize: 13, fontWeight: 600, color: C.muted, cursor: "pointer", padding: 0, marginBottom: 24,
        }}>&larr; Back to Menu Review</button>

        <h2 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 700, color: C.dark, letterSpacing: "-0.02em" }}>
          Adjust Meal Count
        </h2>
        <p style={{ margin: "0 0 28px", fontSize: 14, color: C.muted, lineHeight: 1.5 }}>
          Update daily meals for the week of {order.week}.
        </p>

        {/* Alert */}
        <Card style={{
          padding: "20px 24px", marginBottom: 24,
          background: C.orangeLight, border: `1px solid ${C.orange}30`,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: C.orange, color: C.white,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>{"\u{1F4C8}"}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Enrollment Increase Detected</div>
              <div style={{ fontSize: 13, color: C.body, marginTop: 3, lineHeight: 1.5 }}>
                Potomac Ridge Academy has <strong>34 new students</strong> enrolled. Word is spreading — families are citing the scratch-cooked meal program as a key enrollment factor.
              </div>
            </div>
          </div>
          <button onClick={() => setCount(suggested)} style={{
            background: "transparent", color: C.orange, border: `2px solid ${C.orange}`,
            borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700,
            fontFamily: font, cursor: "pointer", marginTop: 14, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.orange; e.currentTarget.style.color = C.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.orange; }}
          >Apply Suggested: {suggested} meals/day</button>
        </Card>

        {/* Counter */}
        <Card style={{ padding: "28px 24px", marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Daily Meal Count
          </label>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 28, marginTop: 20, marginBottom: 24,
          }}>
            <button onClick={() => setCount(Math.max(100, count - 10))} style={{
              width: 50, height: 50, borderRadius: 12, border: `2px solid ${C.border}`,
              background: C.white, fontSize: 22, fontWeight: 700, cursor: "pointer",
              color: C.dark, fontFamily: font,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>&minus;</button>
            <div style={{ textAlign: "center", minWidth: 130 }}>
              <div style={{
                fontSize: 60, fontWeight: 800, color: C.dark,
                letterSpacing: "-0.03em", lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}>{animCount}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>meals per day</div>
            </div>
            <button onClick={() => setCount(count + 10)} style={{
              width: 50, height: 50, borderRadius: 12, border: `2px solid ${C.green}`,
              background: C.greenPale, fontSize: 22, fontWeight: 700, cursor: "pointer",
              color: C.greenDark, fontFamily: font,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>+</button>
          </div>

          <input type="range" min={200} max={600} value={count}
            onChange={e => setCount(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: C.green, height: 6 }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.subtle, marginTop: 6 }}>
            <span>200</span>
            <span style={{ color: C.muted, fontWeight: 600 }}>Previous: {persona.students}</span>
            <span>600</span>
          </div>

          {diff !== 0 && (
            <div style={{
              marginTop: 18, padding: "12px 16px", borderRadius: 10,
              background: diff > 0 ? C.greenPale : C.redPale,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: diff > 0 ? C.greenDeep : C.red }}>
                {diff > 0 ? "+" : ""}{diff} meals/day vs. last week
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: diff > 0 ? C.greenDeep : C.red }}>
                {diff > 0 ? "+" : ""}${(diff * order.price * 5).toLocaleString("en-US", { minimumFractionDigits: 2 })} / week
              </span>
            </div>
          )}
        </Card>

        {/* Summary */}
        <Card style={{ padding: "24px", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.dark }}>Order Summary</h3>
          {[
            { l: "Menu", v: `${order.emoji} ${order.theme}` },
            { l: "Week", v: order.week },
            { l: "Daily Count", v: `${count} meals` },
            { l: "Price Per Meal", v: `$${order.price.toFixed(2)}` },
            { l: "Daily Subtotal", v: `$${(count * order.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "9px 0",
              borderBottom: `1px solid ${C.border}`, fontSize: 14,
            }}>
              <span style={{ color: C.muted }}>{r.l}</span>
              <span style={{ fontWeight: 600, color: C.dark }}>{r.v}</span>
            </div>
          ))}
          <div style={{
            display: "flex", justifyContent: "space-between",
            paddingTop: 16, marginTop: 4, fontSize: 20, fontWeight: 800,
          }}>
            <span style={{ color: C.dark }}>Weekly Total</span>
            <span style={{ color: C.green }}>${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>
        </Card>

        {/* Note */}
        <Card style={{ padding: "20px 24px", marginBottom: 28 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Special Instructions (Optional)
          </label>
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="e.g., 5 students with nut allergies in Ms. Patel's 3rd grade class..."
            style={{
              width: "100%", marginTop: 10, padding: 14, border: `1px solid ${C.border}`,
              borderRadius: 10, fontFamily: font, fontSize: 14, color: C.body,
              resize: "vertical", minHeight: 70, boxSizing: "border-box", outline: "none",
            }}
          />
        </Card>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onBack} style={{
            background: "transparent", color: C.muted, border: `2px solid ${C.border}`,
            borderRadius: 8, padding: "14px 24px", fontSize: 15, fontWeight: 700,
            fontFamily: font, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={() => onConfirm(count)} style={{
            background: C.green, color: C.white, border: "none", borderRadius: 8,
            padding: "14px 24px", fontSize: 16, fontWeight: 700, fontFamily: font,
            cursor: "pointer", flex: 1, transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = C.greenDark}
            onMouseLeave={e => e.currentTarget.style.background = C.green}
          >Confirm Order &mdash; ${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</button>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 4 — Confirmation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Confirmation({ finalCount, onReset }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);
  const weekTotal = finalCount * order.price * 5;

  return (
    <div style={{
      fontFamily: font,
      background: `linear-gradient(180deg, ${C.greenMist} 0%, ${C.offWhite} 50%)`,
      minHeight: "calc(100vh - 60px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "48px 24px",
    }}>
      <div style={{
        textAlign: "center", maxWidth: 500,
        opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.96)",
        transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", color: C.white,
          boxShadow: `0 8px 28px ${C.green}40`,
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 800, color: C.dark, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Order Confirmed
        </h1>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.6, margin: "0 0 32px" }}>
          Your <strong style={{ color: C.greenDark }}>{order.emoji} {order.theme}</strong> menu is locked in. Confirmation sent to <strong>{persona.email}</strong>.
        </p>

        <Card style={{ padding: "24px", textAlign: "left", marginBottom: 20 }}>
          {[
            { l: "School", v: persona.school },
            { l: "Menu", v: `${order.emoji} ${order.theme}` },
            { l: "Week", v: order.week },
            { l: "Daily Meals", v: finalCount },
            { l: "Weekly Total", v: `$${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
            { l: "Confirmation #", v: "RS-2026-04172" },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "10px 0",
              borderBottom: i < 5 ? `1px solid ${C.border}` : "none", fontSize: 14,
            }}>
              <span style={{ color: C.muted }}>{r.l}</span>
              <span style={{ fontWeight: 700, color: C.dark }}>{r.v}</span>
            </div>
          ))}
        </Card>

        <Card style={{
          padding: "16px 20px", background: C.greenPale,
          border: `1px solid ${C.green}30`,
          fontSize: 13, color: C.body, lineHeight: 1.6, textAlign: "left",
          marginBottom: 16,
        }}>
          <strong style={{ color: C.greenDeep }}>{"\u{1F69A}"} Delivery Details:</strong> Meals prepared at the <strong>Renegade Scratch Cooking Complex</strong> in Fairfax, VA. Fresh delivery to Potomac Ridge Academy every morning at 10:30 AM. Your liaison: <strong>Chef Maria Gonzalez</strong>.
        </Card>

        <Card style={{
          padding: "16px 20px", background: C.bluePale,
          border: `1px solid ${C.blue}25`,
          fontSize: 13, color: C.body, lineHeight: 1.6, textAlign: "left",
          marginBottom: 28,
        }}>
          <strong style={{ color: C.blue }}>{"\u{1F3DB}\uFE0F"} Upcoming:</strong> Senator Warner's office has scheduled a <strong>farm-to-school tour</strong> of the Fairfax Cooking Complex on <strong>May 8th</strong>. Potomac Ridge has been invited as a featured partner school. Details to follow.
        </Card>

        <button onClick={onReset} style={{
          background: "transparent", color: C.muted, border: `2px solid ${C.border}`,
          borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 700,
          fontFamily: font, cursor: "pointer",
        }}>&#x21BA; Restart Demo</button>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [finalCount, setFinalCount] = useState(410);

  return (
    <div style={{ fontFamily: font, background: C.offWhite, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <NavBar screen={screen} />
      <div style={{ flex: 1 }}>
        {screen === "dashboard" && <Dashboard onOpen={() => setScreen("review")} />}
        {screen === "review" && <MenuReview onAdjust={() => setScreen("adjust")} onBack={() => setScreen("dashboard")} />}
        {screen === "adjust" && <Adjust onConfirm={c => { setFinalCount(c); setScreen("confirmed"); }} onBack={() => setScreen("review")} />}
        {screen === "confirmed" && <Confirmation finalCount={finalCount} onReset={() => setScreen("dashboard")} />}
      </div>
      <Footer />
    </div>
  );
}
