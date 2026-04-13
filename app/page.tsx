"use client";

import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   RENEGADE SCRATCH — School Ordering Portal Demo
   Northern Virginia Private School MVP
   Chef Ann Foundation → For-Profit Arm
   ═══════════════════════════════════════════════════════ */

const C = {
  forest: "#1B5E20", forestMid: "#2E7D32", forestLight: "#4CAF50",
  warmRed: "#BF360C", warmRedBright: "#E64A19",
  cream: "#FFFAF4", gold: "#F9A825", goldPale: "#FFF8E1",
  charcoal: "#1E1E1E", body: "#3E3830", warmGray: "#7D756C",
  border: "#E6DFD6", lightBg: "#F7F3EE", white: "#FFFFFF",
  sage: "#E3EDDF", coral: "#FF6F42", coralPale: "#FFF0EA",
};

const font = `'DM Sans', 'Segoe UI', system-ui, sans-serif`;

const persona = {
  name: "James Whitfield",
  title: "Director of Auxiliary Programs",
  school: "Potomac Ridge Academy",
  location: "McLean, VA",
  students: 410,
  newStudents: 34,
  email: "j.whitfield@potomacridgeacademy.org",
};

const upcomingOrder = {
  week: "April 20 – 24, 2026",
  theme: "\u{1F30E} Earth Week Harvest",
  tagline: "Farm-to-tray meals celebrating our planet — sourced from Virginia farms within 100 miles.",
  currentCount: 410,
  pricePerMeal: 9.25,
  days: [
    { day: "Monday", entree: "Garden Veggie Lasagna with Basil Cream", side: "Roasted Shenandoah Beet & Arugula Salad", grain: "Housemade Garlic Focaccia", fruit: "Virginia Apple Cups", tags: ["vegetarian", "local-hero"] },
    { day: "Tuesday", entree: "Herb-Crusted Chicken Thighs", side: "Quinoa Pilaf with Butternut Squash", grain: "Scratch Cornbread Muffin", fruit: "Seasonal Berry Medley", tags: ["protein-power", "whole-grain"] },
    { day: "Wednesday", entree: "Chesapeake Fish Tacos with Cilantro-Lime Slaw", side: "Black Bean & Sweet Corn Salad", grain: "Housemade Flour Tortillas", fruit: "Fresh-Cut Mango", tags: ["omega-rich", "scratch-tortilla"] },
    { day: "Thursday", entree: "Slow-Braised Beef Bolognese over Penne", side: "Caesar Salad with Scratch Croutons", grain: "Whole Wheat Penne", fruit: "Honeycrisp Apple Slices", tags: ["comfort", "whole-grain"] },
    { day: "Friday", entree: "BBQ Pulled Pork Sliders", side: "Rainbow Coleslaw", grain: "Potato Buns (Scratch-Baked)", fruit: "Watermelon Wedges", tags: ["friday-fave", "celebration"] },
  ],
};

const pastOrders = [
  { week: "Apr 14–18", theme: "\u{1F9EA} Finals Fuel", meals: 410, total: "$18,962.50" },
  { week: "Apr 7–11", theme: "\u{1F338} Cherry Blossom Menu", meals: 410, total: "$18,962.50" },
  { week: "Mar 31–Apr 4", theme: "\u{1F3AD} World Cultures Week", meals: 406, total: "$18,777.50" },
];

const tagColors: Record<string, { bg: string; text: string; label: string }> = {
  vegetarian: { bg: "#E8F5E9", text: "#2E7D32", label: "Vegetarian" },
  "local-hero": { bg: "#FFF3E0", text: "#E65100", label: "Local Hero" },
  "protein-power": { bg: "#FCE4EC", text: "#C62828", label: "Protein Power" },
  "whole-grain": { bg: "#FFF8E1", text: "#F57F17", label: "Whole Grain" },
  "omega-rich": { bg: "#E3F2FD", text: "#1565C0", label: "Omega-Rich" },
  "scratch-tortilla": { bg: "#FFF3E0", text: "#BF360C", label: "Scratch-Made" },
  comfort: { bg: "#EFEBE9", text: "#4E342E", label: "Comfort Classic" },
  "friday-fave": { bg: "#F3E5F5", text: "#7B1FA2", label: "Friday Fave" },
  celebration: { bg: "#FFF8E1", text: "#F57F17", label: "Celebration" },
};

const pill = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-block", padding: "3px 10px", borderRadius: 20,
  fontSize: 11, fontWeight: 600, background: bg, color,
});

const cardStyle: React.CSSProperties = {
  background: C.white, borderRadius: 14,
  border: `1px solid ${C.border}`, overflow: "hidden",
};

const btnPrimary: React.CSSProperties = {
  background: C.forest, color: C.white, border: "none", borderRadius: 10,
  padding: "14px 32px", fontSize: 15, fontWeight: 700, fontFamily: font,
  cursor: "pointer", transition: "all 0.2s",
};

const btnSecondary: React.CSSProperties = {
  background: "transparent", color: C.forest, border: `2px solid ${C.forest}`,
  borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 700,
  fontFamily: font, cursor: "pointer",
};

function TopNav({ screen }: { screen: string }) {
  return (
    <div style={{
      background: C.charcoal, padding: "0 32px", height: 56,
      display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: font,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `linear-gradient(135deg, ${C.forest}, ${C.forestLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 900, color: C.white,
        }}>R</div>
        <span style={{ color: C.white, fontSize: 16, fontWeight: 700 }}>Renegade Scratch</span>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginLeft: 4 }}>School Portal</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {screen !== "notification" && (
          <div style={{ position: "relative", cursor: "pointer" }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 20 }}>&#x1F514;</span>
            <div style={{
              position: "absolute", top: -4, right: -6, width: 16, height: 16,
              borderRadius: "50%", background: C.coral, fontSize: 9, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center", color: C.white,
            }}>1</div>
          </div>
        )}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.warmRed}, ${C.coral})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: C.white, cursor: "pointer",
        }}>JW</div>
      </div>
    </div>
  );
}

function DashboardScreen({ onOpen }: { onOpen: () => void }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 500); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      minHeight: "calc(100vh - 56px)", background: `linear-gradient(180deg, ${C.lightBg} 0%, ${C.cream} 100%)`,
      fontFamily: font, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px",
    }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontSize: 14, color: C.warmGray, fontWeight: 500, marginBottom: 6 }}>Good morning, James</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.charcoal, margin: 0, letterSpacing: "-0.02em" }}>
          Your Dashboard
        </h1>
        <p style={{ color: C.warmGray, fontSize: 14, margin: "8px 0 0" }}>
          {persona.school} &middot; {persona.location} &middot; {persona.students} students enrolled
        </p>
      </div>

      <div style={{
        ...cardStyle, width: "100%", maxWidth: 560,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(-20px)",
        transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        border: `2px solid ${C.coral}`, boxShadow: "0 8px 32px rgba(191,54,12,0.12)",
        cursor: "pointer",
      }} onClick={onOpen}>
        <div style={{
          background: `linear-gradient(135deg, ${C.coral}, ${C.warmRedBright})`,
          padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>&#x1F4CB;</span>
            <span style={{ color: C.white, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Action Required
            </span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>Just now</span>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 700, color: C.charcoal }}>
            Confirm Your Upcoming Menu
          </h3>
          <p style={{ margin: "0 0 14px", fontSize: 14, color: C.warmGray, lineHeight: 1.5 }}>
            Your <strong>{upcomingOrder.theme}</strong> menu for the week of {upcomingOrder.week} is ready for review. Please confirm meal counts by <strong>Thursday, April 17</strong>.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={pill(C.sage, C.forest)}>5-Day Menu</span>
              <span style={pill(C.goldPale, "#B8860B")}>{persona.students} Meals/Day</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.coral }}>Review &rarr;</span>
          </div>
        </div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14,
        width: "100%", maxWidth: 560, marginTop: 22,
      }}>
        {[
          { label: "This Month", value: "$18,962", sub: "2,050 meals served", icon: "\u{1F4CA}" },
          { label: "Parent Satisfaction", value: "98%", sub: "Spring survey", icon: "\u2B50" },
          { label: "Scratch Score", value: "100%", sub: "Zero processed items", icon: "\u{1F525}" },
        ].map((s, i) => (
          <div key={i} style={{
            ...cardStyle, padding: "16px 14px", textAlign: "center",
            opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)",
            transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s`,
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.charcoal }}>{s.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.body, marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 10, color: C.warmGray, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 560, marginTop: 28 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: C.warmGray, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
          Recent Deliveries
        </h3>
        {pastOrders.map((o, i) => (
          <div key={i} style={{
            ...cardStyle, marginBottom: 8, padding: "13px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            opacity: vis ? 1 : 0, transition: `opacity 0.4s ${0.5 + i * 0.1}s`,
          }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{o.theme}</span>
              <span style={{ fontSize: 12, color: C.warmGray, marginLeft: 10 }}>{o.week}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.body }}>{o.total}</span>
              <span style={pill("#E8F5E9", C.forest)}>&#x2713; Delivered</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuReviewScreen({ onAdjust, onBack }: { onAdjust: () => void; onBack: () => void }) {
  const [openDay, setOpenDay] = useState(0);
  const weekTotal = upcomingOrder.currentCount * upcomingOrder.pricePerMeal * 5;

  return (
    <div style={{
      minHeight: "calc(100vh - 56px)", background: C.cream, fontFamily: font,
      padding: "32px 24px 80px", display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 620 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontFamily: font,
          fontSize: 13, fontWeight: 600, color: C.warmGray, cursor: "pointer", padding: 0, marginBottom: 20,
        }}>&larr; Back to Dashboard</button>

        <div style={{
          ...cardStyle, padding: "28px", border: "none",
          background: `linear-gradient(135deg, ${C.forest} 0%, ${C.forestMid} 100%)`,
          color: C.white, marginBottom: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 38, marginBottom: 8 }}>&#x1F30E;</div>
              <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>
                Earth Week Harvest
              </h2>
              <p style={{ margin: 0, fontSize: 14, opacity: 0.85, lineHeight: 1.5, maxWidth: 380 }}>
                {upcomingOrder.tagline}
              </p>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.15)", borderRadius: 12,
              padding: "12px 16px", textAlign: "center",
            }}>
              <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Week of</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>Apr 20–24</div>
            </div>
          </div>
          <div style={{
            marginTop: 20, display: "flex", gap: 20,
            borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 16,
          }}>
            {[
              { label: "Daily Count", val: upcomingOrder.currentCount },
              { label: "Per Meal", val: `$${upcomingOrder.pricePerMeal.toFixed(2)}` },
              { label: "Weekly Total", val: `$${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 11, opacity: 0.65 }}>{d.label}</span>
                <strong style={{ fontSize: 18, marginTop: 2 }}>{d.val}</strong>
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: C.warmGray, textTransform: "uppercase", letterSpacing: "0.06em", margin: "24px 0 12px" }}>
          This Week&apos;s Menu
        </h3>
        {upcomingOrder.days.map((d, i) => {
          const isOpen = openDay === i;
          return (
            <div key={i} style={{
              ...cardStyle, marginBottom: 10, cursor: "pointer",
              boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
              transition: "box-shadow 0.2s",
            }} onClick={() => setOpenDay(isOpen ? -1 : i)}>
              <div style={{
                padding: "14px 20px", display: "flex",
                alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: isOpen ? C.forest : C.lightBg,
                    color: isOpen ? C.white : C.charcoal,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, transition: "all 0.2s",
                  }}>{d.day.slice(0, 3).toUpperCase()}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>{d.entree}</div>
                    <div style={{ fontSize: 12, color: C.warmGray, marginTop: 2 }}>
                      {d.tags.map(t => tagColors[t]?.label || t).join("  \u00B7  ")}
                    </div>
                  </div>
                </div>
                <span style={{
                  fontSize: 18, color: C.warmGray,
                  transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s",
                  display: "inline-block",
                }}>&blacktriangledown;</span>
              </div>
              {isOpen && (
                <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 14 }}>
                    {[
                      { label: "Entr\u00E9e", val: d.entree, icon: "\u{1F37D}" },
                      { label: "Side", val: d.side, icon: "\u{1F957}" },
                      { label: "Grain", val: d.grain, icon: "\u{1F35E}" },
                      { label: "Fruit", val: d.fruit, icon: "\u{1F34E}" },
                    ].map((item, j) => (
                      <div key={j} style={{ background: C.lightBg, borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ fontSize: 11, color: C.warmGray, fontWeight: 600, marginBottom: 4 }}>
                          {item.icon} {item.label}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.charcoal, lineHeight: 1.4 }}>{item.val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                    {d.tags.map((t, k) => {
                      const tc = tagColors[t];
                      return tc ? <span key={k} style={pill(tc.bg, tc.text)}>{tc.label}</span> : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div style={{
          ...cardStyle, padding: "20px 24px", marginTop: 24,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: C.goldPale, border: `1px solid ${C.gold}`, flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.charcoal }}>
              &#x1F4E2; Enrollment Update Available
            </div>
            <div style={{ fontSize: 13, color: C.warmGray, marginTop: 3 }}>
              Potomac Ridge reports <strong>34 new students</strong> since your last order. Time to adjust?
            </div>
          </div>
          <button onClick={onAdjust} style={{ ...btnPrimary, whiteSpace: "nowrap", flexShrink: 0 }}>
            Adjust Meals &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

function AdjustScreen({ onConfirm, onBack }: { onConfirm: (count: number) => void; onBack: () => void }) {
  const [count, setCount] = useState(persona.students);
  const [animCount, setAnimCount] = useState(persona.students);
  const [note, setNote] = useState("");
  const suggested = persona.students + persona.newStudents;
  const weekTotal = count * upcomingOrder.pricePerMeal * 5;
  const diff = count - persona.students;

  useEffect(() => {
    if (animCount !== count) {
      const t = setTimeout(() => setAnimCount(prev => prev + (prev < count ? 1 : -1)), 8);
      return () => clearTimeout(t);
    }
  }, [animCount, count]);

  return (
    <div style={{
      minHeight: "calc(100vh - 56px)", background: C.cream, fontFamily: font,
      padding: "32px 24px 80px", display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 540 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", fontFamily: font,
          fontSize: 13, fontWeight: 600, color: C.warmGray, cursor: "pointer", padding: 0, marginBottom: 24,
        }}>&larr; Back to Menu Review</button>

        <h2 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: C.charcoal, letterSpacing: "-0.02em" }}>
          Adjust Meal Count
        </h2>
        <p style={{ margin: "0 0 28px", fontSize: 14, color: C.warmGray, lineHeight: 1.5 }}>
          Update your daily meal count for the week of {upcomingOrder.week}.
        </p>

        <div style={{
          ...cardStyle, padding: "20px 24px", marginBottom: 24,
          background: `linear-gradient(135deg, ${C.coralPale}, #FFF)`,
          border: `1px solid ${C.coral}`,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: C.coral, color: C.white,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>&#x1F4C8;</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.charcoal }}>Enrollment Increase Detected</div>
              <div style={{ fontSize: 13, color: C.warmGray, marginTop: 2, lineHeight: 1.5 }}>
                Potomac Ridge Academy has <strong>34 new students</strong> enrolled since your last order.
                Your current daily count is <strong>410</strong>. Word is spreading — families are citing the meal program as a key enrollment factor.
              </div>
            </div>
          </div>
          <button onClick={() => setCount(suggested)} style={{
            ...btnSecondary, marginTop: 14, padding: "10px 20px", fontSize: 13,
            borderColor: C.coral, color: C.coral,
          }}>
            Apply Suggested Count: {suggested} meals/day
          </button>
        </div>

        <div style={{ ...cardStyle, padding: "28px 24px", marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.warmGray, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Daily Meal Count
          </label>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 24, marginTop: 16, marginBottom: 20,
          }}>
            <button onClick={() => setCount(Math.max(100, count - 10))} style={{
              width: 48, height: 48, borderRadius: 12, border: `2px solid ${C.border}`,
              background: C.white, fontSize: 22, fontWeight: 700, cursor: "pointer", color: C.charcoal,
              display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font,
            }}>&minus;</button>
            <div style={{ textAlign: "center", minWidth: 120 }}>
              <div style={{
                fontSize: 56, fontWeight: 900, color: C.charcoal,
                letterSpacing: "-0.03em", lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}>{animCount}</div>
              <div style={{ fontSize: 12, color: C.warmGray, marginTop: 4 }}>meals per day</div>
            </div>
            <button onClick={() => setCount(count + 10)} style={{
              width: 48, height: 48, borderRadius: 12, border: `2px solid ${C.forest}`,
              background: C.sage, fontSize: 22, fontWeight: 700, cursor: "pointer", color: C.forest,
              display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font,
            }}>+</button>
          </div>

          <input type="range" min={200} max={600} value={count}
            onChange={e => setCount(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: C.forest, height: 6 }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.warmGray, marginTop: 6 }}>
            <span>200</span>
            <span>Previous: {persona.students}</span>
            <span>600</span>
          </div>

          {diff !== 0 && (
            <div style={{
              marginTop: 16, padding: "12px 16px", borderRadius: 10,
              background: diff > 0 ? C.sage : C.coralPale,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: diff > 0 ? C.forest : C.warmRed }}>
                {diff > 0 ? "+" : ""}{diff} meals/day vs. last week
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: diff > 0 ? C.forest : C.warmRed }}>
                {diff > 0 ? "+" : ""}${(diff * upcomingOrder.pricePerMeal * 5).toLocaleString("en-US", { minimumFractionDigits: 2 })} / week
              </span>
            </div>
          )}
        </div>

        <div style={{ ...cardStyle, padding: "24px", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: C.charcoal }}>Order Summary</h3>
          {[
            { l: "Menu", v: upcomingOrder.theme },
            { l: "Week", v: upcomingOrder.week },
            { l: "Daily Count", v: `${count} meals` },
            { l: "Price Per Meal", v: `$${upcomingOrder.pricePerMeal.toFixed(2)}` },
            { l: "Daily Subtotal", v: `$${(count * upcomingOrder.pricePerMeal).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "8px 0",
              borderBottom: `1px solid ${C.border}`, fontSize: 14,
            }}>
              <span style={{ color: C.warmGray }}>{r.l}</span>
              <span style={{ fontWeight: 600, color: C.charcoal }}>{r.v}</span>
            </div>
          ))}
          <div style={{
            display: "flex", justifyContent: "space-between",
            paddingTop: 14, marginTop: 4, fontSize: 18, fontWeight: 800,
          }}>
            <span style={{ color: C.charcoal }}>Weekly Total</span>
            <span style={{ color: C.forest }}>${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div style={{ ...cardStyle, padding: "20px 24px", marginBottom: 28 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.warmGray, textTransform: "uppercase", letterSpacing: "0.06em" }}>
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
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onBack} style={btnSecondary}>Cancel</button>
          <button onClick={() => onConfirm(count)} style={{ ...btnPrimary, flex: 1, fontSize: 16 }}>
            Confirm Order &mdash; ${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmationScreen({ finalCount, onReset }: { finalCount: number; onReset: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t); }, []);
  const weekTotal = finalCount * upcomingOrder.pricePerMeal * 5;

  return (
    <div style={{
      minHeight: "calc(100vh - 56px)",
      background: `linear-gradient(180deg, ${C.sage} 0%, ${C.cream} 50%)`,
      fontFamily: font, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "48px 24px",
    }}>
      <div style={{
        textAlign: "center", maxWidth: 480,
        opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.95)",
        transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%", background: C.forest,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", fontSize: 36, color: C.white,
          boxShadow: "0 8px 32px rgba(27,94,32,0.3)",
        }}>&#x2713;</div>

        <h1 style={{ fontSize: 30, fontWeight: 900, color: C.charcoal, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Order Confirmed!
        </h1>
        <p style={{ fontSize: 15, color: C.warmGray, lineHeight: 1.6, margin: "0 0 32px" }}>
          Your <strong>{upcomingOrder.theme}</strong> menu has been confirmed. A confirmation has been sent to <strong>{persona.email}</strong>.
        </p>

        <div style={{ ...cardStyle, padding: "24px", textAlign: "left", marginBottom: 28 }}>
          {[
            { l: "School", v: persona.school },
            { l: "Menu", v: "\u{1F30E} Earth Week Harvest" },
            { l: "Week", v: upcomingOrder.week },
            { l: "Daily Meals", v: finalCount },
            { l: "Weekly Total", v: `$${weekTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
            { l: "Confirmation #", v: "RS-2026-04172" },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", padding: "10px 0",
              borderBottom: i < 5 ? `1px solid ${C.border}` : "none", fontSize: 14,
            }}>
              <span style={{ color: C.warmGray }}>{r.l}</span>
              <span style={{ fontWeight: 700, color: C.charcoal }}>{r.v}</span>
            </div>
          ))}
        </div>

        <div style={{
          ...cardStyle, padding: "16px 20px", background: C.goldPale,
          border: `1px solid ${C.gold}`, fontSize: 13, color: C.body,
          lineHeight: 1.5, textAlign: "left", marginBottom: 28,
        }}>
          <strong>&#x1F4C5; Next Steps:</strong> Meals will be prepared at the Renegade Scratch Cooking Complex in Fairfax, VA and delivered fresh to Potomac Ridge Academy starting Monday at 10:30 AM. Your delivery liaison is <strong>Chef Maria Gonzalez</strong>.
        </div>

        <div style={{
          ...cardStyle, padding: "16px 20px", background: "#F3E8FD",
          border: "1px solid #CE93D8", fontSize: 13, color: C.body,
          lineHeight: 1.5, textAlign: "left", marginBottom: 28,
        }}>
          <strong>&#x1F3DB; Coming Up:</strong> Senator Warner&apos;s office has scheduled a farm-to-school tour of the Fairfax Cooking Complex on <strong>May 8th</strong>. Potomac Ridge has been invited as a featured partner school. Details to follow.
        </div>

        <button onClick={onReset} style={btnSecondary}>&#x21BA; Restart Demo</button>
      </div>
    </div>
  );
}

export default function RenegadeScratchDemo() {
  const [screen, setScreen] = useState("dashboard");
  const [finalCount, setFinalCount] = useState(410);

  return (
    <div style={{ fontFamily: font, background: C.cream, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <TopNav screen={screen} />
      {screen === "dashboard" && <DashboardScreen onOpen={() => setScreen("review")} />}
      {screen === "review" && <MenuReviewScreen onAdjust={() => setScreen("adjust")} onBack={() => setScreen("dashboard")} />}
      {screen === "adjust" && <AdjustScreen onConfirm={(c) => { setFinalCount(c); setScreen("confirmed"); }} onBack={() => setScreen("review")} />}
      {screen === "confirmed" && <ConfirmationScreen finalCount={finalCount} onReset={() => setScreen("dashboard")} />}
    </div>
  );
}
