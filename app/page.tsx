"use client";
import { useState, useEffect, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════
   RENEGADE SCRATCH — Competition-Grade Demo
   Chef Ann Foundation · Northern Virginia Private School MVP
   EMBA Innovation Project · Final Presentation Demo
   ══════════════════════════════════════════════════════════════ */

const C = {
  green: "#78BE20", gd: "#5A9A10", gDeep: "#3D7A0A", gPale: "#EDF7E0", gMist: "#F4FAF0",
  orange: "#F26522", oLight: "#FFF0E8",
  dk: "#1E1E1E", dark: "#2D2D2D", body: "#4A4A4A", mut: "#7A7A7A", sub: "#A0A0A0",
  bdr: "#E8E8E8", light: "#F5F5F5", off: "#FAFAF8", wh: "#FFFFFF",
  gold: "#F5A623", goldP: "#FFF9ED", blue: "#2B7BB9", blueP: "#EBF5FF", red: "#D0021B", redP: "#FFF0F2",
};
const F = `'Source Sans 3',-apple-system,sans-serif`;
const FD = `'Fraunces',Georgia,serif`;

const Styles = () => <style>{`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800;9..144,900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:${F};-webkit-font-smoothing:antialiased}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideR{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideD{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
@keyframes glow{0%,100%{box-shadow:0 0 8px rgba(242,101,34,0.2)}50%{box-shadow:0 0 24px rgba(242,101,34,0.5)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{0%{transform:scale(0.8);opacity:0}60%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
@keyframes ring{0%,100%{transform:rotate(0)}10%{transform:rotate(14deg)}20%{transform:rotate(-10deg)}30%{transform:rotate(6deg)}40%{transform:rotate(0)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.fu{animation:fadeUp .5s ease both}.fu1{animation-delay:.1s}.fu2{animation-delay:.2s}.fu3{animation-delay:.3s}.fu4{animation-delay:.4s}
.fi{animation:fadeIn .4s ease both}
.sr{animation:slideR .5s ease both}
.sd{animation:slideD .3s ease both}
.glow{animation:glow 2.5s ease-in-out infinite}
.pulse{animation:pulse 2s ease-in-out infinite}
.pop{animation:pop .4s ease both}
.ring{animation:ring .8s ease}
.shimmer{background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.08) 50%,transparent 100%);background-size:200% 100%;animation:shimmer 3s linear infinite}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:8px;border-radius:4px;background:${C.bdr};outline:none}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:${C.green};cursor:pointer;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.15)}
`}</style>;

const Logo = ({ s = 28 }) => <svg width={s} height={s} viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill={C.green}/><path d="M13 28c0-8 3-15 7-18 4 3 7 10 7 18" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M20 12v18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M15 22c2.5-1 7.5-1 10 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>;

const P = { name:"James Whitfield", title:"Director of Auxiliary Programs", school:"Potomac Ridge Academy", loc:"McLean, VA", students:410, newStudents:34, email:"j.whitfield@potomacridgeacademy.org" };

const O = {
  week:"April 20 – 24, 2026", theme:"Earth Week Harvest", emoji:"\u{1F33F}",
  tagline:"Farm-to-tray meals celebrating our planet — sourced from Virginia farms within 100 miles.",
  count:410, price:9.00,
  days:[
    {day:"Monday",entree:"Garden Veggie Lasagna with Basil Cream",side:"Roasted Shenandoah Beet & Arugula Salad",grain:"Housemade Garlic Focaccia",fruit:"Virginia Apple Cups",tags:["vegetarian","local"],img:"https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80"},
    {day:"Tuesday",entree:"Herb-Crusted Chicken Thighs",side:"Quinoa Pilaf with Butternut Squash",grain:"Scratch Cornbread Muffin",fruit:"Seasonal Berry Medley",tags:["protein","whole-grain"],img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80"},
    {day:"Wednesday",entree:"Chesapeake Fish Tacos with Cilantro-Lime Slaw",side:"Black Bean & Sweet Corn Salad",grain:"Housemade Flour Tortillas",fruit:"Fresh-Cut Mango",tags:["omega-3","scratch"],img:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80"},
    {day:"Thursday",entree:"Slow-Braised Beef Bolognese over Penne",side:"Caesar Salad with Scratch Croutons",grain:"Whole Wheat Penne",fruit:"Honeycrisp Apple Slices",tags:["comfort","whole-grain"],img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80"},
    {day:"Friday",entree:"BBQ Pulled Pork Sliders",side:"Rainbow Coleslaw",grain:"Potato Buns (Scratch-Baked)",fruit:"Watermelon Wedges",tags:["celebration","scratch"],img:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80"},
  ],
};

const upcoming = [
  {week:"Apr 27–May 1",theme:"\u{1F1FA}\u{1F1F8} Patriot's Plate",desc:"Red, white & blue comfort food honoring our nation's capital.",locked:false},
  {week:"May 4–8",theme:"\u{1F469}\u200D\u{1F373} Chef's Table",desc:"Staff-curated favorites voted on by students.",locked:false},
  {week:"May 11–15",theme:"\u{1F338} Garden Party",desc:"Celebrating spring with salads, grain bowls & fresh herbs.",locked:false},
];

const past = [
  {week:"Apr 14–18",theme:"\u{1F9EA} Finals Fuel",total:"$18,450",meals:410,sat:"97%"},
  {week:"Apr 7–11",theme:"\u{1F338} Cherry Blossom Menu",total:"$18,450",meals:410,sat:"99%"},
  {week:"Mar 31–Apr 4",theme:"\u{1F30D} World Cultures Week",total:"$18,270",meals:406,sat:"96%"},
];

const TM = {
  vegetarian:{l:"Vegetarian",c:C.green},local:{l:"Virginia Sourced",c:"#E65100"},
  protein:{l:"Protein Power",c:C.blue},"whole-grain":{l:"Whole Grain",c:"#8D6E27"},
  "omega-3":{l:"Omega-Rich",c:C.blue},scratch:{l:"Scratch-Made",c:C.orange},
  comfort:{l:"Comfort Classic",c:"#6D4C41"},celebration:{l:"Celebration",c:"#7B1FA2"},
};

const Tag = ({id}) => { const t=TM[id]; if(!t) return null; return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:`${t.c}14`,color:t.c}}><span style={{width:5,height:5,borderRadius:"50%",background:t.c,opacity:.6}}/>{t.l}</span>; };

const Cd = ({children,style={},className="",...p}) => <div className={className} style={{background:C.wh,borderRadius:14,border:`1px solid ${C.bdr}`,...style}} {...p}>{children}</div>;

const Ic = ({d,size=20,color=C.mut}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;

// ─── Sidebar ───
function Sidebar({active,onNav}) {
  const items = [
    {id:"dashboard",icon:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",label:"Dashboard"},
    {id:"review",icon:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",label:"Menu Review"},
    {id:"calendar",icon:"M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",label:"Calendar"},
    {id:"billing",icon:"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",label:"Billing"},
    {id:"reports",icon:"M18 20V10 M12 20V4 M6 20v-6",label:"Reports"},
  ];
  return (
    <div style={{width:240,background:C.dk,color:C.wh,display:"flex",flexDirection:"column",flexShrink:0,height:"100vh",position:"sticky",top:0}}>
      <div style={{padding:"24px 20px 20px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo s={32}/>
          <div><div style={{fontSize:14,fontWeight:800,color:C.wh}}>Renegade Scratch</div><div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em"}}>Chef Ann Foundation</div></div>
        </div>
      </div>
      <div style={{padding:"16px 10px",flex:1}}>
        {items.map(it => (
          <button key={it.id} onClick={()=>it.id==="dashboard"&&onNav("dashboard")} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"11px 14px",border:"none",background:active===it.id?"rgba(120,190,32,0.15)":"transparent",color:active===it.id?C.green:"rgba(255,255,255,0.5)",fontFamily:F,fontSize:14,fontWeight:600,borderRadius:10,cursor:"pointer",marginBottom:2,borderLeft:active===it.id?`3px solid ${C.green}`:"3px solid transparent",textAlign:"left",transition:"all .15s"}}>
            <Ic d={it.icon} size={18} color={active===it.id?C.green:"rgba(255,255,255,0.4)"}/>{it.label}
          </button>
        ))}
      </div>
      <div style={{padding:"16px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{padding:"16px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontSize:12,fontWeight:700,color:C.wh}}>Need Help?</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:4,lineHeight:1.4}}>Your Chef Ann advisor is available.</div>
          <button style={{marginTop:10,width:"100%",padding:"8px",borderRadius:8,border:"none",background:C.green,color:C.wh,fontFamily:F,fontSize:12,fontWeight:700,cursor:"pointer"}}>Contact Support</button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:16,padding:"8px 4px"}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},${C.gd})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:C.wh}}>JW</div>
          <div><div style={{fontSize:13,fontWeight:700,color:C.wh}}>James Whitfield</div><div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>{P.school}</div></div>
        </div>
      </div>
    </div>
  );
}

// ─── Top Bar ───
function TopBar({title,sub,showNotif=false,onNotifClick=()=>{}}) {
  return (
    <div style={{height:64,borderBottom:`1px solid ${C.bdr}`,padding:"0 36px",display:"flex",alignItems:"center",justifyContent:"space-between",background:C.wh,position:"sticky",top:0,zIndex:50}}>
      <div><div style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:FD}}>{title}</div>{sub&&<div style={{fontSize:12,color:C.mut,marginTop:1}}>{sub}</div>}</div>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        {showNotif&&<button onClick={onNotifClick} className="ring" style={{position:"relative",background:"none",border:`1px solid ${C.bdr}`,borderRadius:10,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <Ic d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0" size={20} color={C.mut}/>
          <div style={{position:"absolute",top:6,right:6,width:10,height:10,borderRadius:"50%",background:C.orange,border:"2px solid white"}}/>
        </button>}
        <div style={{fontSize:13,color:C.mut}}>{new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</div>
      </div>
    </div>
  );
}

// ─── Notification Toast ───
function Toast({show,onAction}) {
  if(!show) return null;
  return (
    <div className="sr" style={{position:"fixed",top:80,right:24,zIndex:200,width:420,borderRadius:16,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.05)",background:C.wh}}>
      <div style={{background:`linear-gradient(135deg,${C.orange},#E05A18)`,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>{"\u{1F514}"}</span>
          <span style={{color:C.wh,fontSize:12,fontWeight:800,textTransform:"uppercase",letterSpacing:"0.06em"}}>New Notification</span>
        </div>
        <span style={{color:"rgba(255,255,255,0.7)",fontSize:11}}>Just now</span>
      </div>
      <div style={{padding:"18px 20px"}}>
        <div style={{fontSize:15,fontWeight:700,color:C.dark,marginBottom:6}}>Your {O.emoji} {O.theme} menu is ready</div>
        <div style={{fontSize:13,color:C.body,lineHeight:1.5,marginBottom:14}}>Review and confirm your 5-day scratch-cooked menu for {O.week}. {P.students} meals/day at ${O.price.toFixed(2)}/meal.</div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onAction} style={{flex:1,padding:"10px",borderRadius:8,border:"none",background:C.orange,color:C.wh,fontFamily:F,fontSize:13,fontWeight:700,cursor:"pointer"}}>Review Menu &rarr;</button>
          <button style={{padding:"10px 16px",borderRadius:8,border:`1px solid ${C.bdr}`,background:C.wh,color:C.mut,fontFamily:F,fontSize:13,fontWeight:600,cursor:"pointer"}}>Later</button>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 1 — Dashboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function DashScreen({onReview}) {
  const [toast,setToast]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setToast(true),2000);return()=>clearTimeout(t);},[]);

  return (
    <div style={{flex:1,background:C.off,overflow:"auto"}}>
      <TopBar title="Dashboard" sub={`${P.school} · ${P.loc} · ${P.students} students`} showNotif onNotifClick={()=>onReview()}/>
      <Toast show={toast} onAction={onReview}/>
      <div style={{padding:"28px 36px 60px"}}>
        {/* Hero Banner */}
        <div className="fu" style={{borderRadius:20,overflow:"hidden",marginBottom:28,position:"relative",height:200,background:`linear-gradient(135deg,${C.gDeep},${C.gd})`}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"url(https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&q=80)",backgroundSize:"cover",backgroundPosition:"center 35%",opacity:.18}}/>
          <div className="shimmer" style={{position:"absolute",inset:0}}/>
          <div style={{position:"relative",padding:"40px 44px",display:"flex",justifyContent:"space-between",alignItems:"center",height:"100%"}}>
            <div>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.55)",fontWeight:500}}>Good morning, James</div>
              <h1 style={{fontSize:32,fontWeight:900,color:C.wh,margin:"6px 0 10px",fontFamily:FD,letterSpacing:"-.02em"}}>Welcome to Renegade Scratch</h1>
              <div style={{fontSize:14,color:"rgba(255,255,255,0.65)",lineHeight:1.5,maxWidth:440}}>Your scratch-cooked meal portal. Review menus, manage orders, and track the impact of real food on your students.</div>
            </div>
            <div style={{display:"flex",gap:16}}>
              {[{v:"36,900",l:"Meals Served",i:"\u{1F37D}\uFE0F"},{v:"100%",l:"Scratch Score",i:"\u{1F331}"},{v:"98%",l:"Satisfaction",i:"\u2B50"}].map((s,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.1)",backdropFilter:"blur(12px)",borderRadius:14,padding:"18px 22px",textAlign:"center",minWidth:110,border:"1px solid rgba(255,255,255,0.08)"}}>
                  <div style={{fontSize:22,marginBottom:6}}>{s.i}</div>
                  <div style={{fontSize:24,fontWeight:900,color:C.wh,fontFamily:FD}}>{s.v}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginTop:4,fontWeight:600}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Card */}
        <Cd className="fu fu1 glow" onClick={onReview} style={{border:`3px solid ${C.orange}`,cursor:"pointer",marginBottom:28,overflow:"hidden"}}>
          <div style={{background:`linear-gradient(135deg,${C.orange},#E05A18)`,padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:18}}>{"\u{1F6A8}"}</span>
              <span style={{color:C.wh,fontSize:13,fontWeight:800,textTransform:"uppercase",letterSpacing:".06em"}}>Action Required — Confirm Your Upcoming Menu</span>
            </div>
            <span style={{color:"rgba(255,255,255,0.7)",fontSize:12}}>Due Thursday, April 17</span>
          </div>
          <div style={{padding:"24px 28px",display:"flex",alignItems:"center",gap:24}}>
            <div style={{width:100,height:100,borderRadius:16,backgroundImage:"url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=300&q=80)",backgroundSize:"cover",backgroundPosition:"center",flexShrink:0,border:`3px solid ${C.gPale}`}}/>
            <div style={{flex:1}}>
              <h3 style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:FD,margin:"0 0 6px"}}>{O.emoji} {O.theme} — {O.week}</h3>
              <p style={{fontSize:14,color:C.body,lineHeight:1.5,margin:"0 0 12px"}}>5-day scratch-cooked menu · {P.students} meals/day · ${O.price.toFixed(2)}/meal · 100% whole ingredients</p>
              <div style={{display:"flex",gap:8}}>
                {["5-Day Menu","100% Scratch","Virginia Sourced"].map((b,i)=><span key={i} style={{padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,background:i===0?C.gPale:i===1?C.oLight:C.goldP,color:i===0?C.gDeep:i===1?C.orange:"#9A7B10"}}>{b}</span>)}
              </div>
            </div>
            <button className="pulse" style={{background:C.orange,color:C.wh,border:"none",borderRadius:14,padding:"18px 36px",fontSize:16,fontWeight:800,fontFamily:F,cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(242,101,34,0.3)"}}>Review Menu &rarr;</button>
          </div>
        </Cd>

        {/* Two columns: Recent Orders + Upcoming */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          <Cd className="fu fu2" style={{padding:"24px 28px"}}>
            <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:FD,margin:"0 0 18px"}}>Recent Deliveries</h3>
            {past.map((o,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:i<2?`1px solid ${C.bdr}`:"none"}}>
                <div><div style={{fontSize:15,fontWeight:700,color:C.dark}}>{o.theme}</div><div style={{fontSize:12,color:C.mut,marginTop:2}}>{o.week} · {o.meals} meals/day</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:C.body}}>{o.total}</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,justifyContent:"flex-end"}}><span style={{padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:C.gPale,color:C.gd}}>&check; Delivered</span><span style={{fontSize:11,color:C.mut}}>{o.sat} sat.</span></div></div>
              </div>
            ))}
          </Cd>
          <Cd className="fu fu3" style={{padding:"24px 28px"}}>
            <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:FD,margin:"0 0 18px"}}>Upcoming Menus</h3>
            {upcoming.map((u,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0",borderBottom:i<2?`1px solid ${C.bdr}`:"none"}}>
                <div><div style={{fontSize:15,fontWeight:700,color:C.dark}}>{u.theme}</div><div style={{fontSize:12,color:C.mut,marginTop:2}}>{u.week}</div><div style={{fontSize:12,color:C.body,marginTop:3,lineHeight:1.4,maxWidth:280}}>{u.desc}</div></div>
                <span style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,background:C.goldP,color:"#9A7B10",whiteSpace:"nowrap"}}>Pending</span>
              </div>
            ))}
          </Cd>
        </div>

        {/* Impact row */}
        <Cd className="fu fu4" style={{marginTop:24,padding:"24px 28px",background:C.gPale,border:`1px solid ${C.green}25`,display:"flex",gap:24,alignItems:"center"}}>
          <div style={{width:90,height:90,borderRadius:18,backgroundImage:"url(https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=300&q=80)",backgroundSize:"cover",backgroundPosition:"center",flexShrink:0,border:`3px solid ${C.wh}`}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:18,fontWeight:800,color:C.gDeep,fontFamily:FD}}>Your Impact This School Year</div>
            <div style={{fontSize:14,color:C.body,lineHeight:1.6,marginTop:6}}>Potomac Ridge has served <strong>36,900 scratch-cooked meals</strong> since September — 100% made from whole ingredients. That's <strong>zero ultraprocessed foods</strong> reaching your students. Parent satisfaction is at <strong>98%</strong>, the highest in school history.</div>
          </div>
          <div style={{textAlign:"center",flexShrink:0,padding:"0 16px"}}>
            <div style={{fontSize:42,fontWeight:900,color:C.gDeep,fontFamily:FD}}>0</div>
            <div style={{fontSize:12,fontWeight:700,color:C.gd,marginTop:2}}>Ultraprocessed<br/>Items Served</div>
          </div>
        </Cd>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 2 — Menu Review
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ReviewScreen({onAdjust,onBack}) {
  const [openDay,setOpenDay]=useState(0);
  const wt=O.count*O.price*5;
  return (
    <div style={{flex:1,background:C.off,overflow:"auto"}}>
      <TopBar title={`${O.emoji} ${O.theme}`} sub={`Week of ${O.week} · ${P.school}`}/>
      <div style={{padding:"28px 36px 60px"}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontFamily:F,fontSize:14,fontWeight:600,color:C.mut,cursor:"pointer",padding:0,marginBottom:24}}>&larr; Back to Dashboard</button>

        {/* Menu Hero */}
        <Cd className="fu" style={{marginBottom:28,border:"none",overflow:"hidden",background:`linear-gradient(135deg,${C.gDeep},${C.green})`}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 400px",minHeight:220}}>
            <div style={{padding:"36px 40px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{display:"inline-block",padding:"5px 14px",borderRadius:20,background:"rgba(255,255,255,0.15)",color:C.wh,fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:14,alignSelf:"flex-start"}}>Week of Apr 20–24, 2026</div>
              <h2 style={{margin:"0 0 10px",fontSize:34,fontWeight:900,color:C.wh,fontFamily:FD,letterSpacing:"-.02em"}}>{O.emoji} {O.theme}</h2>
              <p style={{margin:"0 0 28px",fontSize:15,color:"rgba(255,255,255,0.75)",lineHeight:1.6,maxWidth:460}}>{O.tagline}</p>
              <div style={{display:"flex",gap:36}}>
                {[{l:"Daily Count",v:O.count},{l:"Per Meal",v:`$${O.price.toFixed(2)}`},{l:"Weekly Total",v:`$${wt.toLocaleString("en-US",{minimumFractionDigits:2})}`}].map((d,i)=>(
                  <div key={i}><div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:600}}>{d.l}</div><div style={{fontSize:24,fontWeight:900,color:C.wh,marginTop:4,fontFamily:FD}}>{d.v}</div></div>
                ))}
              </div>
            </div>
            <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&q=80)",backgroundSize:"cover",backgroundPosition:"center",position:"relative"}}>
              <div style={{position:"absolute",inset:0,background:`linear-gradient(to right,${C.gDeep},transparent 50%)`}}/>
            </div>
          </div>
        </Cd>

        {/* Day Cards */}
        <h3 style={{fontSize:13,fontWeight:700,color:C.mut,textTransform:"uppercase",letterSpacing:".08em",margin:"0 0 14px"}}>Daily Menus</h3>
        {O.days.map((d,i)=>{
          const isO=openDay===i;
          return(
            <Cd key={i} style={{marginBottom:10,cursor:"pointer",borderColor:isO?C.green:C.bdr,boxShadow:isO?"0 6px 24px rgba(0,0,0,0.06)":"none",transition:"all .2s",overflow:"hidden"}} onClick={()=>setOpenDay(isO?-1:i)}>
              <div style={{padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div style={{width:64,height:64,borderRadius:14,backgroundImage:`url(${d.img})`,backgroundSize:"cover",backgroundPosition:"center",flexShrink:0,border:isO?`3px solid ${C.green}`:`3px solid ${C.bdr}`,transition:"all .2s"}}/>
                  <div style={{width:48,height:48,borderRadius:10,background:isO?C.green:C.light,color:isO?C.wh:C.dark,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .2s"}}>{d.day.slice(0,3).toUpperCase()}</div>
                  <div><div style={{fontSize:17,fontWeight:700,color:C.dark}}>{d.entree}</div><div style={{display:"flex",gap:6,marginTop:5,flexWrap:"wrap"}}>{d.tags.map(t=><Tag key={t} id={t}/>)}</div></div>
                </div>
                <svg width="18" height="18" viewBox="0 0 16 16" style={{transform:isO?"rotate(180deg)":"rotate(0)",transition:"transform .2s",flexShrink:0}}><path d="M4 6l4 4 4-4" stroke={C.mut} strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
              </div>
              {isO&&(
                <div style={{padding:"0 24px 20px",borderTop:`1px solid ${C.bdr}`}}>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,paddingTop:16}}>
                    {[{l:"Entr\u00E9e",v:d.entree,ic:"\u{1F37D}\uFE0F"},{l:"Side",v:d.side,ic:"\u{1F957}"},{l:"Grain",v:d.grain,ic:"\u{1F35E}"},{l:"Fruit",v:d.fruit,ic:"\u{1F34E}"}].map((it,j)=>(
                      <div key={j} style={{background:C.light,borderRadius:10,padding:"14px 16px"}}><div style={{fontSize:11,color:C.mut,fontWeight:600,marginBottom:5}}>{it.ic} {it.l}</div><div style={{fontSize:14,fontWeight:600,color:C.dark,lineHeight:1.4}}>{it.v}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </Cd>
          );
        })}

        {/* Enrollment Alert */}
        <Cd className="glow" style={{marginTop:28,padding:"28px 32px",border:`3px solid ${C.orange}`,background:`linear-gradient(135deg,${C.oLight},#fff)`,display:"flex",alignItems:"center",gap:24}}>
          <div style={{width:64,height:64,borderRadius:16,background:C.orange,color:C.wh,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{"\u{1F4C8}"}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:20,fontWeight:800,color:C.dark,fontFamily:FD}}>Enrollment Surge — {P.newStudents} New Students</div>
            <div style={{fontSize:14,color:C.body,marginTop:6,lineHeight:1.6}}>Potomac Ridge reports <strong>{P.newStudents} new families enrolled</strong> since your last order. The scratch-cooked meal program is being cited as a <strong>key enrollment factor</strong>. Your meal count needs updating before confirming.</div>
          </div>
          <button className="pulse" onClick={onAdjust} style={{background:C.orange,color:C.wh,border:"none",borderRadius:14,padding:"18px 40px",fontSize:17,fontWeight:800,fontFamily:F,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,boxShadow:"0 6px 24px rgba(242,101,34,0.3)"}}>Update Meals &rarr;</button>
        </Cd>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 3 — Adjust
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AdjustScreen({onConfirm,onBack}) {
  const [count,setCount]=useState(P.students);
  const [anim,setAnim]=useState(P.students);
  const [note,setNote]=useState("");
  const sug=P.students+P.newStudents;
  const wt=count*O.price*5;
  const diff=count-P.students;

  useEffect(()=>{if(anim!==count){const t=setTimeout(()=>setAnim(p=>p+(p<count?1:-1)),8);return()=>clearTimeout(t);}},[ anim,count]);

  return(
    <div style={{flex:1,background:C.off,overflow:"auto"}}>
      <TopBar title="Adjust Meal Count" sub={`${O.emoji} ${O.theme} · ${O.week}`}/>
      <div style={{padding:"28px 36px 60px"}}>
        <button onClick={onBack} style={{background:"none",border:"none",fontFamily:F,fontSize:14,fontWeight:600,color:C.mut,cursor:"pointer",padding:0,marginBottom:28}}>&larr; Back to Menu Review</button>

        <div style={{display:"grid",gridTemplateColumns:"1fr 400px",gap:28}}>
          <div>
            {/* Enrollment Story */}
            <Cd className="fu" style={{padding:"28px 32px",marginBottom:24,background:`linear-gradient(135deg,${C.oLight},#fff)`,border:`2px solid ${C.orange}40`,overflow:"hidden",position:"relative"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:18}}>
                <div style={{width:56,height:56,borderRadius:14,background:C.orange,color:C.wh,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{"\u{1F4C8}"}</div>
                <div>
                  <div style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:FD}}>Your Meal Program Is Driving Enrollment</div>
                  <div style={{fontSize:14,color:C.body,marginTop:6,lineHeight:1.6}}>Potomac Ridge has enrolled <strong>{P.newStudents} new students</strong> this quarter. Families specifically cite the <strong>scratch-cooked meal program</strong> as a deciding factor. This is your food working as marketing.</div>
                  <div style={{display:"flex",gap:12,marginTop:16}}>
                    <div style={{padding:"10px 18px",borderRadius:10,background:C.wh,border:`1px solid ${C.bdr}`,textAlign:"center"}}><div style={{fontSize:22,fontWeight:900,color:C.orange,fontFamily:FD}}>+{P.newStudents}</div><div style={{fontSize:11,color:C.mut,marginTop:2}}>New Students</div></div>
                    <div style={{padding:"10px 18px",borderRadius:10,background:C.wh,border:`1px solid ${C.bdr}`,textAlign:"center"}}><div style={{fontSize:22,fontWeight:900,color:C.gDeep,fontFamily:FD}}>+8.3%</div><div style={{fontSize:11,color:C.mut,marginTop:2}}>Enrollment Growth</div></div>
                    <div style={{padding:"10px 18px",borderRadius:10,background:C.wh,border:`1px solid ${C.bdr}`,textAlign:"center"}}><div style={{fontSize:22,fontWeight:900,color:C.blue,fontFamily:FD}}>98%</div><div style={{fontSize:11,color:C.mut,marginTop:2}}>Parent Satisfaction</div></div>
                  </div>
                </div>
              </div>
              <button onClick={()=>setCount(sug)} style={{marginTop:20,width:"100%",padding:"14px",borderRadius:10,border:"none",background:C.orange,color:C.wh,fontFamily:F,fontSize:15,fontWeight:800,cursor:"pointer"}}>Apply Suggested Count: {sug} meals/day</button>
            </Cd>

            {/* Counter */}
            <Cd className="fu fu1" style={{padding:"36px 32px",marginBottom:24}}>
              <label style={{fontSize:12,fontWeight:700,color:C.mut,textTransform:"uppercase",letterSpacing:".06em"}}>Daily Meal Count</label>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:36,marginTop:28,marginBottom:32}}>
                <button onClick={()=>setCount(Math.max(100,count-10))} style={{width:58,height:58,borderRadius:14,border:`2px solid ${C.bdr}`,background:C.wh,fontSize:26,fontWeight:700,cursor:"pointer",color:C.dark,fontFamily:F,display:"flex",alignItems:"center",justifyContent:"center"}}>&minus;</button>
                <div style={{textAlign:"center",minWidth:150}}>
                  <div style={{fontSize:80,fontWeight:900,color:count>P.students?C.gDeep:C.dark,letterSpacing:"-.03em",lineHeight:1,fontVariantNumeric:"tabular-nums",fontFamily:FD,transition:"color .3s"}}>{anim}</div>
                  <div style={{fontSize:14,color:C.mut,marginTop:10}}>meals per day</div>
                </div>
                <button onClick={()=>setCount(count+10)} style={{width:58,height:58,borderRadius:14,border:`2px solid ${C.green}`,background:C.gPale,fontSize:26,fontWeight:700,cursor:"pointer",color:C.gd,fontFamily:F,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
              </div>
              <input type="range" min={300} max={600} value={count} onChange={e=>setCount(parseInt(e.target.value))}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.sub,marginTop:10}}><span>300</span><span style={{color:C.mut,fontWeight:600}}>Previous: {P.students}</span><span>600</span></div>
              {diff!==0&&(
                <div style={{marginTop:22,padding:"16px 20px",borderRadius:12,background:diff>0?C.gPale:C.redP,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:15,fontWeight:700,color:diff>0?C.gDeep:C.red}}>{diff>0?"+":""}{diff} meals/day vs. previous week</span>
                  <span style={{fontSize:16,fontWeight:900,color:diff>0?C.gDeep:C.red,fontFamily:FD}}>{diff>0?"+":""}${(diff*O.price*5).toLocaleString("en-US",{minimumFractionDigits:2})}/wk</span>
                </div>
              )}
            </Cd>

            <Cd className="fu fu2" style={{padding:"24px 28px"}}>
              <label style={{fontSize:12,fontWeight:700,color:C.mut,textTransform:"uppercase",letterSpacing:".06em"}}>Special Instructions</label>
              <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g., 5 students with nut allergies in Ms. Patel's 3rd grade class..." style={{width:"100%",marginTop:12,padding:16,border:`1px solid ${C.bdr}`,borderRadius:10,fontFamily:F,fontSize:14,color:C.body,resize:"vertical",minHeight:80,boxSizing:"border-box",outline:"none"}}/>
            </Cd>
          </div>

          {/* Sticky Summary */}
          <div>
            <Cd className="fu fu2" style={{padding:"28px",position:"sticky",top:96}}>
              <h3 style={{fontSize:18,fontWeight:800,color:C.dark,fontFamily:FD,margin:"0 0 20px"}}>Order Summary</h3>
              <div style={{width:"100%",height:140,borderRadius:14,backgroundImage:"url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&q=80)",backgroundSize:"cover",backgroundPosition:"center",marginBottom:20}}/>
              {[{l:"Menu",v:`${O.emoji} ${O.theme}`},{l:"Week",v:O.week},{l:"Daily Count",v:`${count} meals`},{l:"Price/Meal",v:`$${O.price.toFixed(2)}`},{l:"Daily Subtotal",v:`$${(count*O.price).toLocaleString("en-US",{minimumFractionDigits:2})}`}].map((r,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.bdr}`,fontSize:14}}><span style={{color:C.mut}}>{r.l}</span><span style={{fontWeight:600,color:C.dark}}>{r.v}</span></div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:18,marginTop:6,fontSize:24,fontWeight:900}}>
                <span style={{color:C.dark}}>Weekly Total</span>
                <span style={{color:C.green,fontFamily:FD}}>${wt.toLocaleString("en-US",{minimumFractionDigits:2})}</span>
              </div>
              <button onClick={()=>onConfirm(count)} style={{background:C.green,color:C.wh,border:"none",borderRadius:12,padding:"18px",fontSize:17,fontWeight:800,fontFamily:F,cursor:"pointer",width:"100%",marginTop:24,transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background=C.gd} onMouseLeave={e=>e.currentTarget.style.background=C.green}>Confirm Order — ${wt.toLocaleString("en-US",{minimumFractionDigits:2})}</button>
              <button onClick={onBack} style={{background:"transparent",color:C.mut,border:`2px solid ${C.bdr}`,borderRadius:12,padding:"14px",fontSize:14,fontWeight:700,fontFamily:F,cursor:"pointer",width:"100%",marginTop:10}}>Cancel</button>
            </Cd>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREEN 4 — Confirmation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ConfirmScreen({finalCount,onReset}) {
  const [show,setShow]=useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),200);},[]);
  const wt=finalCount*O.price*5;

  return(
    <div style={{flex:1,background:`linear-gradient(180deg,${C.gMist} 0%,${C.off} 40%)`,overflow:"auto"}}>
      <TopBar title="Order Confirmed" sub={`${O.emoji} ${O.theme} · ${O.week}`}/>
      <div style={{padding:"48px 36px 60px",maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",opacity:show?1:0,transform:show?"scale(1)":"scale(0.96)",transition:"all .6s cubic-bezier(0.4,0,0.2,1)"}}>
          <div className="pop" style={{width:88,height:88,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},${C.gd})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 28px",boxShadow:`0 12px 40px ${C.green}40`}}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h1 style={{fontSize:38,fontWeight:900,color:C.dark,fontFamily:FD,letterSpacing:"-.02em",margin:"0 0 10px"}}>Order Confirmed!</h1>
          <p style={{fontSize:16,color:C.mut,lineHeight:1.6,maxWidth:500,margin:"0 auto 36px"}}>Your <strong style={{color:C.gDeep}}>{O.emoji} {O.theme}</strong> menu is locked in. Confirmation sent to <strong>{P.email}</strong>.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          {/* Order Details */}
          <Cd className="fu" style={{padding:"28px"}}>
            <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:FD,margin:"0 0 18px"}}>Order Details</h3>
            {[{l:"School",v:P.school},{l:"Menu",v:`${O.emoji} ${O.theme}`},{l:"Week",v:O.week},{l:"Daily Meals",v:finalCount},{l:"Weekly Total",v:`$${wt.toLocaleString("en-US",{minimumFractionDigits:2})}`},{l:"Confirmation #",v:"RS-2026-04172"}].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:i<5?`1px solid ${C.bdr}`:"none",fontSize:14}}><span style={{color:C.mut}}>{r.l}</span><span style={{fontWeight:700,color:C.dark}}>{r.v}</span></div>
            ))}
          </Cd>

          {/* Delivery & News */}
          <div className="fu fu1" style={{display:"flex",flexDirection:"column",gap:16}}>
            <Cd style={{padding:"20px 24px",background:C.gPale,border:`1px solid ${C.green}30`,fontSize:14,color:C.body,lineHeight:1.6}}>
              <strong style={{color:C.gDeep}}>{"\u{1F69A}"} Delivery Details</strong><br/>Meals prepared at the <strong>Renegade Scratch Cooking Complex</strong> in Fairfax, VA. Fresh delivery to Potomac Ridge Academy every morning at 10:30 AM. Your liaison: <strong>Chef Maria Gonzalez</strong>.
            </Cd>
            <Cd style={{padding:"20px 24px",background:C.blueP,border:`1px solid ${C.blue}20`,fontSize:14,color:C.body,lineHeight:1.6}}>
              <strong style={{color:C.blue}}>{"\u{1F3DB}\uFE0F"} Capitol Connection</strong><br/>Senator Warner's office has scheduled a <strong>farm-to-school tour</strong> of the Fairfax Cooking Complex on <strong>May 8th</strong>. Potomac Ridge has been invited as a featured partner school. Details to follow.
            </Cd>
            <Cd style={{padding:"20px 24px",background:C.goldP,border:`1px solid ${C.gold}30`,fontSize:14,color:C.body,lineHeight:1.6}}>
              <strong style={{color:"#8D6E10"}}>{"\u{1F4F0}"} Coming Up</strong><br/>Next week's menu is <strong>{"\u{1F1FA}\u{1F1F8}"} Patriot's Plate</strong> — red, white & blue comfort food honoring our nation's capital. Review opens Monday.
            </Cd>
          </div>
        </div>

        {/* Upcoming weeks */}
        <h3 style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:FD,margin:"36px 0 16px"}}>Your Menu Calendar</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          <Cd style={{padding:"20px",borderColor:C.green,background:C.gPale}}>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:C.green,color:C.wh}}>Confirmed</span>
            <div style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:FD,marginTop:12}}>{O.emoji} {O.theme}</div>
            <div style={{fontSize:12,color:C.mut,marginTop:4}}>Apr 20–24 · {finalCount} meals/day</div>
          </Cd>
          {upcoming.map((u,i)=>(
            <Cd key={i} style={{padding:"20px"}}>
              <span style={{padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:C.goldP,color:"#9A7B10"}}>Pending</span>
              <div style={{fontSize:16,fontWeight:800,color:C.dark,fontFamily:FD,marginTop:12}}>{u.theme}</div>
              <div style={{fontSize:12,color:C.mut,marginTop:4}}>{u.week}</div>
              <div style={{fontSize:12,color:C.body,marginTop:6,lineHeight:1.4}}>{u.desc}</div>
            </Cd>
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:36}}>
          <button onClick={onReset} style={{background:"transparent",color:C.mut,border:`2px solid ${C.bdr}`,borderRadius:12,padding:"14px 36px",fontSize:15,fontWeight:700,fontFamily:F,cursor:"pointer"}}>&#x21BA; Restart Demo</button>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  const [screen,setScreen]=useState("dashboard");
  const [finalCount,setFinalCount]=useState(410);
  const go=useCallback((s)=>{setScreen(s);},[]);

  return(
    <div style={{fontFamily:F,display:"flex",height:"100vh",overflow:"hidden"}}>
      <Styles/>
      <Sidebar active={screen==="dashboard"?"dashboard":"review"} onNav={go}/>
      {screen==="dashboard"&&<DashScreen onReview={()=>go("review")}/>}
      {screen==="review"&&<ReviewScreen onAdjust={()=>go("adjust")} onBack={()=>go("dashboard")}/>}
      {screen==="adjust"&&<AdjustScreen onConfirm={c=>{setFinalCount(c);go("confirmed");}} onBack={()=>go("review")}/>}
      {screen==="confirmed"&&<ConfirmScreen finalCount={finalCount} onReset={()=>go("dashboard")}/>}
    </div>
  );
}
