"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, BarChart3, BookOpen, ChefHat,
  Settings, Users, LayoutDashboard, FileText, Bell, Search,
  Menu, X, TrendingUp, Calendar, AlertCircle, PlayCircle,
  Wrench, FileSpreadsheet, Clock, Award, Target, ShieldCheck,
  Download, ExternalLink, Activity, Leaf, ArrowUpRight
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CHEF ANN FOUNDATION — Scratch Kitchen System
   Full Enterprise Demo · EMBA Presentation
   ═══════════════════════════════════════════════════════════════ */

// ─── Global Styles ───
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700;800;900&family=Fraunces:wght@400;600;700;800;900&display=swap');

    :root {
      --green-900: #1a3a2a;
      --green-800: #1f4d3a;
      --green-700: #2d6b4f;
      --green-600: #3a8a65;
      --green-500: #78BE20;
      --green-400: #8fcf44;
      --green-300: #b5e07a;
      --green-200: #d4edb5;
      --green-100: #edf7e0;
      --green-50: #f6fbf0;
      --gold: #d4a843;
      --gold-light: #f5ecd4;
      --gold-bg: #fdf8ed;
      --orange: #F26522;
      --orange-light: #fff0e8;
      --dark: #1a1a1a;
      --body: #3d3d3d;
      --muted: #6b6b6b;
      --subtle: #999;
      --border: #e2e2e2;
      --border-light: #f0f0f0;
      --bg: #fafaf8;
      --bg-light: #f5f5f3;
      --white: #ffffff;
      --font-display: 'Fraunces', Georgia, serif;
      --font-body: 'Source Sans 3', -apple-system, sans-serif;
      --radius: 12px;
      --radius-sm: 8px;
      --radius-lg: 20px;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
      --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
      --shadow-xl: 0 20px 60px rgba(0,0,0,0.15);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-body); color: var(--body); line-height: 1.6; background: var(--white); -webkit-font-smoothing: antialiased; }

    /* ─ Animations ─ */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @keyframes glow { 0%, 100% { box-shadow: 0 0 8px rgba(242,101,34,0.3); } 50% { box-shadow: 0 0 20px rgba(242,101,34,0.6); } }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes badgePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
    .fade-up { animation: fadeUp 0.6s ease both; }
    .fade-up-d1 { animation: fadeUp 0.6s ease 0.1s both; }
    .fade-up-d2 { animation: fadeUp 0.6s ease 0.2s both; }
    .fade-up-d3 { animation: fadeUp 0.6s ease 0.3s both; }
    .fade-up-d4 { animation: fadeUp 0.6s ease 0.4s both; }
    .fade-in { animation: fadeIn 0.5s ease both; }

    /* ─ Layout ─ */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
    .container-wide { max-width: 1400px; margin: 0 auto; padding: 0 40px; }

    /* ─ Typography ─ */
    h1, h2, h3, h4 { font-family: var(--font-display); color: var(--dark); line-height: 1.2; font-weight: 700; }

    /* ─ Buttons ─ */
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: var(--radius-sm); font-family: var(--font-body); font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; text-decoration: none; white-space: nowrap; }
    .btn-primary { background: var(--green-700); color: white; border-color: var(--green-700); }
    .btn-primary:hover { background: var(--green-800); border-color: var(--green-800); transform: translateY(-1px); box-shadow: var(--shadow-md); }
    .btn-orange { background: var(--orange); color: white; border-color: var(--orange); }
    .btn-orange:hover { background: #d9571a; border-color: #d9571a; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(242,101,34,0.3); }
    .btn-outline { background: transparent; color: var(--green-700); border-color: var(--green-700); }
    .btn-outline:hover { background: var(--green-700); color: white; }
    .btn-outline-white { background: transparent; color: white; border-color: rgba(255,255,255,0.4); }
    .btn-outline-white:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.6); }
    .btn-lg { padding: 16px 32px; font-size: 1.05rem; border-radius: var(--radius); }
    .btn-sm { padding: 8px 16px; font-size: 0.85rem; }
    .btn-gold { background: var(--gold); color: var(--green-900); border-color: var(--gold); }
    .btn-gold:hover { background: #c49a35; }
    .btn-ghost { background: none; border: none; color: var(--muted); padding: 8px; cursor: pointer; }
    .btn-ghost:hover { color: var(--dark); }
    .full-width { width: 100%; justify-content: center; }

    /* ─ Cards ─ */
    .card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; transition: all 0.2s; }
    .card:hover { box-shadow: var(--shadow-sm); }
    .card-green { background: var(--green-800); border-color: var(--green-800); color: white; }
    .card-green h3, .card-green h4 { color: white; }
    .card-light { background: var(--bg-light); border-color: var(--border-light); }

    /* ─ Badges & Pills ─ */
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge-green { background: var(--green-100); color: var(--green-700); }
    .badge-orange { background: var(--orange-light); color: var(--orange); }
    .badge-gold { background: var(--gold-light); color: #8a6d1b; }

    /* ─ Section Utility ─ */
    .section { padding: 100px 0; }
    .section-sm { padding: 60px 0; }
    .text-center { text-align: center; }
    .text-muted { color: var(--muted); }
    .mb-1 { margin-bottom: 8px; } .mb-2 { margin-bottom: 12px; } .mb-3 { margin-bottom: 16px; } .mb-4 { margin-bottom: 24px; } .mb-5 { margin-bottom: 32px; } .mb-6 { margin-bottom: 48px; }
    .mt-2 { margin-top: 12px; } .mt-3 { margin-top: 16px; } .mt-4 { margin-top: 24px; }
    .pb-3 { padding-bottom: 16px; }
    .gap-3 { gap: 16px; } .gap-4 { gap: 24px; }
    .flex-col { display: flex; flex-direction: column; }
    .flex-between { display: flex; justify-content: space-between; align-items: center; }
    .border-bottom { border-bottom: 1px solid var(--border); }

    /* ─ Grid System ─ */
    .grid { display: grid; gap: 20px; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
    .grid-5 { grid-template-columns: repeat(5, 1fr); }
    .grid-main-side { grid-template-columns: 1fr 380px; }

    /* ─ Progress ─ */
    .progress-track { height: 8px; background: var(--border-light); border-radius: 4px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
    .progress-fill.green { background: var(--green-500); }
    .progress-fill.gold { background: var(--gold); }

    /* ────────── PUBLIC SITE ────────── */
    .pub-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 40px; height: 72px; display: flex; align-items: center; justify-content: space-between; }
    .pub-nav .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .pub-nav .nav-links { display: flex; align-items: center; gap: 28px; }
    .pub-nav .nav-links a { text-decoration: none; color: var(--body); font-weight: 600; font-size: 0.95rem; transition: color 0.2s; }
    .pub-nav .nav-links a:hover { color: var(--green-700); }

    /* Hero */
    .hero { background: var(--green-900); color: white; padding: 100px 0 80px; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; top: 0; right: 0; width: 50%; height: 100%; background: url('https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1200&q=80') center/cover; opacity: 0.15; }
    .hero h1 { font-family: var(--font-display); font-size: 3.5rem; font-weight: 800; line-height: 1.1; max-width: 700px; color: white; margin-bottom: 24px; }
    .hero p { font-size: 1.2rem; line-height: 1.7; color: rgba(255,255,255,0.75); max-width: 560px; margin-bottom: 36px; }

    /* Product Cards */
    .product-card { padding: 32px; position: relative; overflow: hidden; }
    .product-card:hover { border-color: var(--green-500); transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .product-card .icon-wrap { width: 56px; height: 56px; border-radius: 14px; background: var(--green-100); color: var(--green-700); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    .product-card h3 { font-size: 1.3rem; margin-bottom: 10px; }
    .product-card p { color: var(--muted); font-size: 0.95rem; margin-bottom: 20px; line-height: 1.6; }
    .feature-list { list-style: none; }
    .feature-list li { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 0.9rem; color: var(--body); }

    /* Pricing */
    .pricing-card { text-align: center; padding: 40px 32px; position: relative; }
    .pricing-card.recommended { border: 2px solid var(--green-500); box-shadow: var(--shadow-lg); transform: scale(1.03); }
    .pricing-card .rec-badge { position: absolute; top: -1px; left: 50%; transform: translateX(-50%); background: var(--green-500); color: white; padding: 4px 20px; border-radius: 0 0 10px 10px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
    .pricing-card h3 { font-size: 1.4rem; margin: 16px 0 8px; }
    .pricing-card .price { font-size: 2rem; font-weight: 800; color: var(--green-700); margin-bottom: 24px; }

    /* ────────── PORTAL ────────── */
    .portal-wrap { display: flex; min-height: 100vh; background: var(--bg); }
    .sidebar { width: 280px; background: var(--green-900); color: white; display: flex; flex-direction: column; padding: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; flex-shrink: 0; }
    .sidebar .brand-area { padding: 24px 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .sidebar-nav { padding: 16px 12px; flex: 1; }
    .sidebar-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 16px; border: none; background: transparent; color: rgba(255,255,255,0.6); font-family: var(--font-body); font-size: 0.95rem; font-weight: 600; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.15s; text-align: left; margin-bottom: 2px; }
    .sidebar-btn:hover { color: white; background: rgba(255,255,255,0.08); }
    .sidebar-btn.active { color: white; background: rgba(120,190,32,0.2); border-left: 3px solid var(--green-500); }
    .portal-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .portal-topbar { height: 64px; background: var(--white); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; }
    .portal-topbar input { border: none; outline: none; font-family: var(--font-body); font-size: 0.95rem; width: 300px; color: var(--body); background: transparent; }
    .portal-content { padding: 32px; flex: 1; overflow-y: auto; }
    .icon-btn { width: 40px; height: 40px; border-radius: 10px; border: 1px solid var(--border); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; color: var(--muted); }
    .icon-btn:hover { border-color: var(--green-500); color: var(--green-700); }
    .badge-dot { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--orange); }
    .avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, var(--green-600), var(--green-800)); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; }

    /* KPI Cards */
    .kpi-card { text-align: center; padding: 24px 20px; }
    .kpi-label { font-size: 0.85rem; color: var(--muted); font-weight: 600; margin-bottom: 8px; }
    .kpi-value { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--dark); }
    .kpi-trend { display: inline-flex; align-items: center; gap: 4px; font-size: 0.8rem; font-weight: 700; margin-top: 8px; padding: 3px 10px; border-radius: 20px; }
    .kpi-trend.good { background: var(--green-100); color: var(--green-700); }
    .kpi-trend.warn { background: #fef3c7; color: #92400e; }

    /* Task List */
    .task-item { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--border-light); gap: 16px; }
    .task-module { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--green-600); }
    .task-item h4 { font-family: var(--font-body); font-size: 0.95rem; font-weight: 600; margin-top: 4px; }
    .task-meta { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .task-date { font-size: 0.85rem; color: var(--muted); }
    .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
    .status-pill.pending { background: #fef3c7; color: #92400e; }
    .status-pill.progress { background: var(--green-100); color: var(--green-700); }
    .status-pill.review { background: #dbeafe; color: #1e40af; }

    /* Action Banner */
    .action-banner { background: linear-gradient(135deg, var(--orange), #e05a18); border-radius: var(--radius-lg); padding: 28px 36px; display: flex; align-items: center; justify-content: space-between; gap: 24px; animation: glow 3s infinite; margin-bottom: 28px; }
    .action-banner h3 { color: white; font-size: 1.3rem; margin-bottom: 4px; }
    .action-banner p { color: rgba(255,255,255,0.85); font-size: 0.95rem; }
    .action-banner .btn { animation: pulse 2s infinite; font-size: 1.05rem; padding: 14px 32px; background: white; color: var(--orange); border-color: white; font-weight: 800; }
    .action-banner .btn:hover { transform: scale(1.05); }

    /* Asset List */
    .asset-list { list-style: none; }
    .asset-list li { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light); font-size: 0.9rem; font-weight: 500; cursor: pointer; }
    .asset-list li:hover { color: var(--green-700); }
    .asset-list li:last-child { border-bottom: none; }

    /* Eyebrow */
    .eyebrow { display: inline-block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--green-600); }

    /* Module Header */
    .module-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; padding-bottom: 24px; border-bottom: 1px solid var(--border); margin-bottom: 28px; }
    .module-header h1 { font-size: 2rem; margin: 8px 0 4px; }

    /* Tab Bar */
    .tab-bar { display: flex; gap: 32px; border-bottom: 2px solid var(--border-light); margin-bottom: 28px; }
    .tab-bar button { background: none; border: none; font-family: var(--font-body); font-size: 0.95rem; font-weight: 600; color: var(--muted); padding: 12px 0; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
    .tab-bar button.active { color: var(--green-700); border-color: var(--green-700); }
    .tab-bar button:hover { color: var(--green-700); }

    /* Support Widget */
    .support-widget { margin: 16px 12px; padding: 20px; border-radius: var(--radius); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); }
    .support-widget h4 { color: white; font-family: var(--font-body); font-size: 0.9rem; margin-bottom: 6px; }
    .support-widget p { color: rgba(255,255,255,0.5); font-size: 0.8rem; margin-bottom: 12px; }

    @media (max-width: 1024px) {
      .grid-3, .grid-4, .grid-5 { grid-template-columns: repeat(2, 1fr); }
      .grid-main-side { grid-template-columns: 1fr; }
      .hero h1 { font-size: 2.5rem; }
    }
    @media (max-width: 640px) {
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
      .hero h1 { font-size: 2rem; }
      .action-banner { flex-direction: column; text-align: center; }
    }
  `}</style>
);

// ─── Data ───
const products = [
  { icon: Settings, name: "ScratchReady", desc: "Planning and building kitchens designed for scratch cooking with trusted build partners.", features: ["Workflow design", "Equipment procurement", "Phased capital roadmaps"] },
  { icon: ChefHat, name: "ScratchAcademy", desc: "Building the professional workforce required for scratch cooking with certification pathways.", features: ["Culinary training", "Kitchen management", "Menu design systems"] },
  { icon: Users, name: "LeaderLab", desc: "Transformation strategy and implementation for district leaders and CFOs.", features: ["ROI analysis", "Policy guidance", "Change management"] },
  { icon: FileText, name: "ScratchOS", desc: "The playbooks, processes, and tools to run kitchens effectively at scale.", features: ["Kitchen playbooks", "Staffing models", "Procurement templates"] },
  { icon: BarChart3, name: "ScratchResults", desc: "Ongoing coaching, analytics, and support to solidify transformation.", features: ["KPI frameworks", "Peer benchmarking", "Expert helpdesk"] },
];

const bundles = [
  { name: "Starter Transformation", target: "Small Districts", price: "Custom", features: ["ScratchReady Lite", "ScratchAcademy", "ScratchOS"], rec: false },
  { name: "Kitchen Transformation", target: "Mid to Large Districts", price: "Custom", features: ["ScratchReady Premier", "ScratchAcademy", "ScratchOS", "ScratchResults (1 yr)"], rec: true },
  { name: "End-to-End System", target: "Large Districts", price: "Custom", features: ["ScratchReady Ultimate", "ScratchAcademy", "LeaderLab", "ScratchOS", "ScratchResults (Lifetime)"], rec: false },
];

const kpis = [
  { label: "Readiness Score", value: "84/100", trend: "+4 pts", status: "good" },
  { label: "Active Sites", value: "14", trend: "+2 this quarter", status: "good" },
  { label: "Staff Certified", value: "78%", trend: "+12% since Q1", status: "good" },
  { label: "Procurement Risk", value: "Moderate", trend: "2 items delayed", status: "warn" },
];

const tasks = [
  { id: 1, title: "Approve prep-line equipment package", module: "ScratchReady", status: "Pending Approval", statusClass: "pending", date: "Oct 12" },
  { id: 2, title: "Complete Manager Cohort 2 Certification", module: "ScratchAcademy", status: "In Progress", statusClass: "progress", date: "Oct 15" },
  { id: 3, title: "Finalize districtwide production flow", module: "ScratchOS", status: "In Review", statusClass: "review", date: "Oct 18" },
];

// ─── Reusable ───
const ProgressBar = ({ progress, label, color = "green" }) => (
  <div style={{ marginBottom: 18 }}>
    {label && (
      <div className="flex-between mb-2">
        <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{label}</span>
        <strong style={{ color: "var(--green-700)" }}>{progress}%</strong>
      </div>
    )}
    <div className="progress-track">
      <div className={`progress-fill ${color}`} style={{ width: `${progress}%` }} />
    </div>
  </div>
);

const ModuleHeader = ({ badge, title, subtitle }) => (
  <div className="module-header fade-up">
    <div>
      <span className="eyebrow mb-2">{badge}</span>
      <h1>{title}</h1>
      <p className="text-muted" style={{ maxWidth: 600 }}>{subtitle}</p>
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      <button className="btn btn-outline btn-sm">Export Report</button>
      <button className="btn btn-primary btn-sm">Request Support</button>
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE VIEWS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ScratchReady = () => {
  const bom = [
    { item: "Combi Ovens (Double Stack)", vendor: "Hobart", date: "Oct 12", status: "Procured", sc: "good" },
    { item: "60-Quart Floor Mixers", vendor: "Vulcan", date: "Oct 18", status: "Pending Approval", sc: "pending" },
    { item: "Blast Chillers", vendor: "Traulsen", date: "Nov 02", status: "In Transit", sc: "progress" },
  ];
  return (
    <div className="fade-in">
      <ModuleHeader badge="Design & Build" title="ScratchReady Command Center" subtitle="Manage phased capital roadmaps, equipment procurement, and trusted builder coordination." />
      <div className="grid grid-3 mb-4">
        {[
          { icon: Wrench, label: "Build Phase", val: "Phase 2", sub: "4 sites in active renovation" },
          { icon: FileSpreadsheet, label: "Capital Deployed", val: "$1.2M", sub: "Of $2.5M projected budget" },
          { icon: Clock, label: "Timeline Risk", val: "Moderate", sub: "2 procurement delays flagged", warn: true },
        ].map((s, i) => (
          <div className={`card fade-up-d${i + 1}`} key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: "0.85rem", fontWeight: 600, marginBottom: 10 }}>
              <s.icon size={16} /> {s.label}
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: s.warn ? "#d97706" : "var(--dark)", fontFamily: "var(--font-display)" }}>{s.val}</div>
            <p className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-main-side">
        <div className="card">
          <h3 className="border-bottom pb-3 mb-3">Equipment Procurement BOM</h3>
          <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "12px 0", fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>Equipment</th>
              <th style={{ padding: "12px 0", fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>Vendor</th>
              <th style={{ padding: "12px 0", fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>Est. Delivery</th>
              <th style={{ padding: "12px 0", fontSize: "0.85rem", color: "var(--muted)", fontWeight: 600 }}>Status</th>
            </tr></thead>
            <tbody>{bom.map((b, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "16px 0", fontWeight: 600 }}>{b.item}</td>
                <td style={{ padding: "16px 0" }} className="text-muted">{b.vendor}</td>
                <td style={{ padding: "16px 0" }} className="text-muted">{b.date}</td>
                <td style={{ padding: "16px 0" }}><span className={`status-pill ${b.sc}`}>{b.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="card card-light">
          <h3 className="border-bottom pb-3 mb-3">Design Standards</h3>
          <ul className="asset-list">
            {["Central Kitchen Layout V2", "Prep Flow Diagrams", "Plumbing Specs", "Electrical Load Req."].map((d, i) => (
              <li key={i}><FileText size={16} /> <span style={{ flex: 1 }}>{d}</span> <Download size={14} color="var(--muted)" /></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ScratchAcademy = () => (
  <div className="fade-in">
    <ModuleHeader badge="Workforce & Culinary Training" title="ScratchAcademy Learning System" subtitle="Track certification pathways, schedule onsite culinary labs, and manage kitchen staff enablement." />
    <div className="grid grid-main-side mb-4">
      <div className="card">
        <h3 className="mb-4">District Certification Pipeline</h3>
        <ProgressBar progress={92} label="Kitchen Staff Certification (Cohort 1)" />
        <ProgressBar progress={68} label="Kitchen Manager Masterclass" />
        <ProgressBar progress={35} label="District Nutrition Leaders Enablement" color="gold" />
      </div>
      <div className="card card-green" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <Award size={36} color="var(--gold)" style={{ marginBottom: 16 }} />
        <h3 style={{ fontSize: "1.8rem", marginBottom: 8 }}>31 Staff Certified</h3>
        <p style={{ opacity: 0.75, fontSize: "0.9rem", marginBottom: 20 }}>Across 14 active sites. 8 managers pending final review.</p>
        <button className="btn btn-gold full-width">View Certificates</button>
      </div>
    </div>
    <h3 className="mb-3 mt-4">Upcoming Live Labs & Workshops</h3>
    <div className="grid grid-3">
      {[
        { title: "Advanced Knife Skills Lab", date: "Monday, 9:00 AM MT", type: "Onsite" },
        { title: "Menu Design Systems", date: "Wednesday, 1:00 PM MT", type: "Virtual" },
        { title: "Manager Flow Control", date: "Friday, 10:00 AM MT", type: "Onsite" },
      ].map((c, i) => (
        <div className="card" key={i}>
          <div className="flex-between mb-3"><span className="badge badge-green">{c.type}</span><PlayCircle size={20} color="var(--muted)" /></div>
          <h4 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{c.title}</h4>
          <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>{c.date}</p>
          <button className="btn btn-outline btn-sm full-width">Register Team <ExternalLink size={14} /></button>
        </div>
      ))}
    </div>
  </div>
);

const LeaderLab = () => (
  <div className="fade-in">
    <ModuleHeader badge="Strategy & Leadership Advisory" title="LeaderLab Strategy Board" subtitle="Financial modeling, policy guidance, and transformation roadmap alignment for district leaders." />
    <div className="grid grid-4 mb-4">
      {[
        { Icon: Target, label: "Strategic Alignment", val: "On Track", c: "var(--green-500)" },
        { Icon: TrendingUp, label: "Projected ROI (3yr)", val: "+18.4%", c: "var(--green-700)" },
        { Icon: ShieldCheck, label: "Policy Compliance", val: "Reviewing", c: "#d97706" },
        { Icon: Users, label: "Stakeholder Buy-in", val: "High", c: "var(--green-700)" },
      ].map((m, i) => (
        <div className="card text-center" key={i}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><m.Icon size={28} color="var(--muted)" /></div>
          <p className="text-muted" style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 8 }}>{m.label}</p>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: m.c, fontFamily: "var(--font-display)" }}>{m.val}</div>
        </div>
      ))}
    </div>
    <div className="card">
      <h3 className="border-bottom pb-3 mb-4">Transformation Roadmap</h3>
      <div className="flex-col gap-4">
        {[
          { phase: "Phase 1: Financial Modeling & ROI Analysis", desc: "Completed Q1. District CFO approved capital allocation based on scratch operational savings.", active: false, done: true },
          { phase: "Phase 2: Procurement Strategy & Policy", desc: "Current phase. Aligning local vendor lists and rewriting district nutrition policies.", active: true, done: false },
          { phase: "Phase 3: Change Management Execution", desc: "Scheduled Q4. Parent communication plans and student engagement rollouts.", active: false, done: false },
        ].map((p, i) => (
          <div key={i} style={{ borderLeft: `3px solid ${p.done ? "var(--green-500)" : p.active ? "var(--green-500)" : "var(--border-light)"}`, paddingLeft: 20, opacity: p.done || p.active ? 1 : 0.5 }}>
            <h4 style={{ fontSize: "1.15rem" }}>{p.phase}</h4>
            <p className="text-muted mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ScratchOS = () => (
  <div className="fade-in">
    <ModuleHeader badge="Operational Systems" title="ScratchOS Operations Hub" subtitle="Central repository for playbooks, SOPs, menu cycles, and staffing models." />
    <div className="tab-bar">
      <button className="active">SOPs & Playbooks</button>
      <button>Staffing & HR</button>
      <button>Procurement</button>
      <button>Menus & Recipes</button>
    </div>
    <div className="grid grid-3">
      {[
        { title: "Morning Prep Sequence SOP", type: "PDF Playbook", update: "2 days ago", Icon: BookOpen },
        { title: "Station Cleaning Checklists", type: "Interactive Form", update: "1 week ago", Icon: FileText },
        { title: "Inventory Receiving Protocol", type: "Video SOP", update: "1 month ago", Icon: PlayCircle },
        { title: "Temperature Logging Standards", type: "PDF Playbook", update: "1 month ago", Icon: BookOpen },
        { title: "Waste Management & Composting", type: "Policy Doc", update: "2 months ago", Icon: FileText },
        { title: "Emergency Service Disruption", type: "PDF Playbook", update: "3 months ago", Icon: BookOpen },
      ].map((d, i) => (
        <div className="card" key={i} style={{ cursor: "pointer" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--green-100)", color: "var(--green-700)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <d.Icon size={24} />
          </div>
          <h4 style={{ fontSize: "1.05rem", marginBottom: 16 }}>{d.title}</h4>
          <div className="flex-between">
            <span className="badge badge-green">{d.type}</span>
            <span className="text-muted" style={{ fontSize: "0.8rem" }}>{d.update}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ScratchResults = () => (
  <div className="fade-in">
    <ModuleHeader badge="Performance & Support" title="ScratchResults Analytics" subtitle="Continuous improvement via KPI tracking, network benchmarking, and expert coaching." />
    <div className="grid grid-main-side mb-4">
      <div className="card">
        <div className="flex-between mb-4 pb-3 border-bottom">
          <h3 style={{ margin: 0 }}>Network Benchmarking</h3>
          <select style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid var(--border)", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}>
            <option>Vs. Similar Districts</option><option>Vs. State Average</option>
          </select>
        </div>
        {[
          { label: "Student Participation Rate", rank: "Top 15%", peerW: "60%", youW: "25%", youL: "55%", good: true },
          { label: "Cost Per Meal (Food)", rank: "Bottom 40%", peerW: "45%", youW: "15%", youL: "35%", good: false },
        ].map((b, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <div className="flex-between mb-2">
              <strong>{b.label}</strong>
              <span style={{ fontWeight: 700, color: b.good ? "var(--green-700)" : "#d97706" }}>{b.rank}</span>
            </div>
            <div style={{ height: 16, background: "var(--bg-light)", borderRadius: 8, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: b.peerW, background: "var(--border)", borderRight: "2px solid white" }} />
              <div style={{ position: "absolute", left: b.youL, top: 0, bottom: 0, width: b.youW, background: b.good ? "var(--green-500)" : "#f59e0b", borderRadius: 8, border: "2px solid white" }} />
            </div>
            {i === 0 && <p className="text-muted mt-2" style={{ fontSize: "0.8rem" }}>Your district (Green) vs Peer Median (Grey)</p>}
          </div>
        ))}
      </div>
      <div className="flex-col gap-4">
        <div className="card card-green" style={{ border: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, color: "var(--gold)" }}>
            <Activity size={24} /> <h3 style={{ color: "var(--gold)", margin: 0 }}>System Health</h3>
          </div>
          <div style={{ fontSize: "3rem", fontWeight: 800, fontFamily: "var(--font-display)", marginBottom: 8 }}>94/100</div>
          <p style={{ opacity: 0.75, fontSize: "0.9rem", marginBottom: 16 }}>Operations running efficiently. Focus: food waste at Site 3.</p>
          <button className="btn full-width" style={{ background: "rgba(255,255,255,0.1)", color: "white", borderColor: "rgba(255,255,255,0.2)" }}>View SLO Report</button>
        </div>
        <div className="card" style={{ background: "var(--gold-bg)", border: "1px solid var(--gold-light)" }}>
          <h3 style={{ marginBottom: 8 }}>Monthly Coaching Call</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--body)", marginBottom: 16 }}>Review KPIs with your dedicated implementation advisor.</p>
          <button className="btn btn-primary full-width">Schedule Call</button>
        </div>
      </div>
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PUBLIC SITE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PublicSite = ({ goPortal }) => (
  <div>
    {/* Nav */}
    <nav className="pub-nav">
      <div className="brand">
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--green-700)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Leaf size={22} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--dark)", lineHeight: 1.2 }}>Chef Ann Foundation</div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Scratch Kitchen System</div>
        </div>
      </div>
      <div className="nav-links">
        <a href="#platform">Platform</a>
        <a href="#products">Products</a>
        <a href="#programs">Programs</a>
        <button className="btn btn-outline btn-sm" onClick={goPortal}>Client Login</button>
        <button className="btn btn-primary btn-sm">Book Advisory Call</button>
      </div>
    </nav>

    {/* Hero */}
    <header className="hero">
      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div className="fade-up">
            <span className="badge badge-green" style={{ marginBottom: 20 }}>Enterprise Food Service Transformation</span>
            <h1>The operating system for scratch kitchen transformation.</h1>
            <p>From strategic capital planning to workforce certification and ongoing analytics. We provide the playbooks, processes, and tools to turn school cafeterias into high-performance scratch kitchens.</p>
            <div style={{ display: "flex", gap: 16, marginBottom: 48 }}>
              <button className="btn btn-orange btn-lg" onClick={goPortal} style={{ fontSize: "1.1rem" }}>
                View Demo Portal <ArrowRight size={20} />
              </button>
              <button className="btn btn-outline-white btn-lg">Explore Framework</button>
            </div>
            <div style={{ display: "flex", gap: 48 }}>
              {[
                { val: "48+", label: "Districts Live" },
                { val: "312", label: "Certified Kitchens" },
                { val: "86%", label: "Training Completion" },
              ].map((m, i) => (
                <div key={i}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-display)", color: "var(--green-400)" }}>{m.val}</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up-d2" style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800&q=80"
              alt="Scratch Kitchen"
              style={{ width: "100%", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)", objectFit: "cover", height: 420 }}
            />
            <div style={{
              position: "absolute", bottom: -20, left: -20, background: "var(--white)", borderRadius: "var(--radius)", padding: "20px 24px",
              boxShadow: "var(--shadow-lg)", maxWidth: 260,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: "0.8rem", fontWeight: 700, color: "var(--green-700)" }}>
                <BarChart3 size={16} /> Network Benchmark
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--dark)", marginBottom: 8 }}>Participation Rate</div>
              <div className="progress-track"><div className="progress-fill green" style={{ width: "74%" }} /></div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 6 }}>Top quartile performance</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Impact Bar */}
    <section style={{ background: "var(--green-700)", padding: "40px 0" }}>
      <div className="container-wide" style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
        {[
          { val: "5.9M", label: "Children Reached" },
          { val: "19,000+", label: "Schools Reached" },
          { val: "35,000+", label: "Food Professionals Trained" },
          { val: "Since 2009", label: "Transforming School Food" },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "var(--font-display)", color: "white" }}>{s.val}</div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Products */}
    <section id="products" className="section" style={{ background: "var(--bg)" }}>
      <div className="container-wide">
        <div className="text-center mb-6 fade-up">
          <span className="eyebrow mb-2" style={{ display: "block" }}>Our Platform</span>
          <h2 style={{ fontSize: "2.5rem", marginBottom: 12 }}>End-to-End Transformation Suite</h2>
          <p className="text-muted" style={{ maxWidth: 560, margin: "0 auto", fontSize: "1.1rem" }}>A repeatable system for promoting performance and continued transformation.</p>
        </div>
        <div className="grid grid-5">
          {products.map((p, i) => (
            <div className={`card product-card fade-up-d${Math.min(i + 1, 4)}`} key={i}>
              <div className="icon-wrap"><p.icon size={26} /></div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <ul className="feature-list">
                {p.features.map((f, j) => (
                  <li key={j}><CheckCircle2 size={15} color="var(--green-500)" /> {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Image break */}
    <section style={{
      height: 320,
      backgroundImage: "url('https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1400&q=80')",
      backgroundSize: "cover", backgroundPosition: "center 60%",
      position: "relative",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,58,42,0.85), rgba(26,58,42,0.5))" }} />
      <div className="container-wide" style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 500 }}>
          <h2 style={{ color: "white", fontSize: "2rem", marginBottom: 12 }}>Replacing ultraprocessed foods with meals cooked from scratch.</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem" }}>Kids today get nearly two-thirds of their calories from ultraprocessed foods. We're changing that — one kitchen at a time.</p>
        </div>
      </div>
    </section>

    {/* Pricing */}
    <section id="programs" className="section">
      <div className="container">
        <div className="text-center mb-6">
          <span className="eyebrow mb-2" style={{ display: "block" }}>Programs</span>
          <h2 style={{ fontSize: "2.5rem", marginBottom: 12 }}>Strategic Program Bundles</h2>
          <p className="text-muted" style={{ maxWidth: 480, margin: "0 auto", fontSize: "1.1rem" }}>Tailored rollout phases for districts of all sizes.</p>
        </div>
        <div className="grid grid-3" style={{ alignItems: "stretch" }}>
          {bundles.map((b, i) => (
            <div className={`card pricing-card ${b.rec ? "recommended" : ""}`} key={i}>
              {b.rec && <div className="rec-badge">Most Popular</div>}
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>{b.target}</p>
              <h3>{b.name}</h3>
              <div className="price">{b.price}</div>
              <ul className="feature-list" style={{ textAlign: "left" }}>
                {b.features.map((f, j) => (
                  <li key={j}><CheckCircle2 size={15} color="var(--green-500)" /> {f}</li>
                ))}
              </ul>
              <button className={`btn ${b.rec ? "btn-primary" : "btn-outline"} full-width`} style={{ marginTop: 24 }}>Start Evaluation</button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ background: "var(--green-900)", padding: "80px 0", textAlign: "center" }}>
      <div className="container">
        <h2 style={{ color: "white", fontSize: "2.5rem", marginBottom: 16 }}>Ready to Transform Your District?</h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 32px" }}>
          Join 48+ districts already serving scratch-cooked meals to millions of students.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button className="btn btn-orange btn-lg" onClick={goPortal}>View Demo Portal <ArrowRight size={18} /></button>
          <button className="btn btn-outline-white btn-lg">Book Advisory Call</button>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer style={{ background: "var(--dark)", padding: "40px 0", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
        <Leaf size={18} color="var(--green-500)" />
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>&copy; 2026 Chef Ann Foundation &middot; Scratch Kitchen System</span>
      </div>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", fontSize: "0.85rem" }}>
        {["Privacy", "Terms", "Support", "chefannfoundation.org"].map((l, i) => (
          <span key={i} style={{ color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
    </footer>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PORTAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PortalSite = ({ goPublic }) => {
  const [mod, setMod] = useState("Overview");

  const navItems = [
    { id: "Overview", Icon: LayoutDashboard, label: "Command Center" },
    { id: "ScratchReady", Icon: Settings, label: "ScratchReady" },
    { id: "ScratchAcademy", Icon: ChefHat, label: "ScratchAcademy" },
    { id: "LeaderLab", Icon: Users, label: "LeaderLab" },
    { id: "ScratchOS", Icon: FileText, label: "ScratchOS" },
    { id: "ScratchResults", Icon: BarChart3, label: "ScratchResults" },
  ];

  const renderModule = () => {
    switch (mod) {
      case "ScratchReady": return <ScratchReady />;
      case "ScratchAcademy": return <ScratchAcademy />;
      case "LeaderLab": return <LeaderLab />;
      case "ScratchOS": return <ScratchOS />;
      case "ScratchResults": return <ScratchResults />;
      default: return (
        <div className="fade-in">
          {/* ══ ACTION BANNER — Big & unmissable ══ */}
          <div className="action-banner">
            <div>
              <h3 style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <AlertCircle size={22} /> 3 Items Need Your Attention
              </h3>
              <p>Equipment approvals, certification deadlines, and a production flow review are waiting.</p>
            </div>
            <button className="btn" onClick={() => setMod("ScratchReady")}>
              Take Action Now <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Page Header */}
          <div className="flex-between mb-5 fade-up">
            <div>
              <h1 style={{ fontSize: "2rem" }}>District Command Center</h1>
              <p className="text-muted">Phase 2 Rollout &middot; 14 Sites &middot; Q3 Transformation Plan</p>
            </div>
            <button className="btn btn-primary"><Calendar size={18} /> Schedule QBR</button>
          </div>

          {/* KPIs */}
          <div className="grid grid-4 mb-5">
            {kpis.map((k, i) => (
              <div className={`card kpi-card fade-up-d${i + 1}`} key={i}>
                <p className="kpi-label">{k.label}</p>
                <div className="kpi-value">{k.value}</div>
                <div className={`kpi-trend ${k.status}`}>
                  {k.status === "warn" ? <AlertCircle size={14} /> : <TrendingUp size={14} />}
                  {k.trend}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-main-side">
            <div className="flex-col gap-4">
              {/* Chart */}
              <div className="card">
                <div className="flex-between border-bottom pb-3 mb-4">
                  <h3 style={{ margin: 0 }}>Transformation Progress by Site</h3>
                  <button className="btn btn-outline btn-sm">Export PDF</button>
                </div>
                <svg viewBox="0 0 500 180" style={{ width: "100%", height: 180 }}>
                  <line x1="0" y1="165" x2="500" y2="165" stroke="var(--border-light)" strokeWidth="1" />
                  {[
                    { x: 20, h: 80 }, { x: 75, h: 120 }, { x: 130, h: 60 },
                    { x: 185, h: 140 }, { x: 240, h: 90 }, { x: 295, h: 100 },
                    { x: 350, h: 40 }, { x: 405, h: 55 }, { x: 460, h: 30 },
                  ].map((b, i) => (
                    <rect key={i} x={b.x} y={165 - b.h} width={30} height={b.h} rx={4}
                      fill={i < 6 ? "var(--green-700)" : "var(--gold)"} opacity={i < 6 ? 1 : 0.7} />
                  ))}
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px", fontSize: "0.75rem", color: "var(--muted)", marginTop: 8 }}>
                  {Array.from({ length: 9 }, (_, i) => <span key={i}>Site {i + 1}</span>)}
                </div>
              </div>

              {/* Tasks */}
              <div className="card">
                <h3 className="border-bottom pb-3 mb-3">Active Workstreams</h3>
                {tasks.map(t => (
                  <div className="task-item" key={t.id}>
                    <div>
                      <span className="task-module">{t.module}</span>
                      <h4>{t.title}</h4>
                    </div>
                    <div className="task-meta">
                      <span className="task-date">{t.date}</span>
                      <span className={`status-pill ${t.statusClass}`}>{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-col gap-4">
              {/* Live Session */}
              <div className="card card-green" style={{ border: 0 }}>
                <PlayCircle size={32} color="var(--gold)" style={{ marginBottom: 16 }} />
                <h3 style={{ marginBottom: 8 }}>ScratchAcademy Live</h3>
                <p style={{ opacity: 0.75, fontSize: "0.9rem", marginBottom: 20 }}>Join the virtual session on Menu Design Systems & ROI.</p>
                <button className="btn btn-gold full-width">Join Session (Starts in 2h)</button>
              </div>

              {/* Assets */}
              <div className="card">
                <h3 className="border-bottom pb-3 mb-3">Recent Assets</h3>
                <ul className="asset-list">
                  {["Kitchen Design Standards.pdf", "Staffing Model Planner.xlsx", "Procurement Checklist.pdf", "Q2 Benchmarking Report.pdf"].map((a, i) => (
                    <li key={i}><FileText size={16} /> <span style={{ flex: 1 }}>{a}</span></li>
                  ))}
                </ul>
                <button className="btn btn-outline full-width mt-4">View Asset Library</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="portal-wrap">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand-area">
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={goPublic}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(120,190,32,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1rem", fontWeight: 900, color: "var(--green-400)" }}>JV</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "white", lineHeight: 1.2 }}>Jefferson Valley USD</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Client Portal</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(n => (
            <button key={n.id} className={`sidebar-btn ${mod === n.id ? "active" : ""}`} onClick={() => setMod(n.id)}>
              <n.Icon size={20} /> {n.label}
            </button>
          ))}
        </nav>

        <div className="support-widget">
          <h4>Need Expert Support?</h4>
          <p>Your Chef Ann advisor is available.</p>
          <button className="btn btn-primary btn-sm full-width">Open Ticket</button>
        </div>
      </aside>

      {/* Main */}
      <main className="portal-main">
        <header className="portal-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Search size={18} color="var(--muted)" />
            <input type="text" placeholder={`Search ${mod}...`} style={{ border: "none", outline: "none", fontFamily: "var(--font-body)", fontSize: "0.95rem", width: 300, color: "var(--body)", background: "transparent" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="icon-btn"><Bell size={20} /><span className="badge-dot" /></button>
            <div className="avatar">JV</div>
          </div>
        </header>
        <div className="portal-content">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP ROOT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  const [view, setView] = useState("public");
  return (
    <>
      <GlobalStyles />
      {view === "public"
        ? <PublicSite goPortal={() => setView("portal")} />
        : <PortalSite goPublic={() => setView("public")} />
      }
    </>
  );
}
