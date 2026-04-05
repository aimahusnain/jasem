"use client"

import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TABS = ["Financial Dashboard", "Games Dashboard", "Financial Input", "Games Input"];

// ── FINANCIAL INPUT KPIs ──────────────────────────────────────────────
const finInputRows = [
  { kpi: "Deera Units Sold", category: "Sales", unit: "units" },
  { kpi: "Mushakhat Units Sold", category: "Sales", unit: "units" },
  { kpi: "Avg Order Value (AOV)", category: "Sales", unit: "AED" },
  { kpi: "Repeat Purchase Rate", category: "Sales", unit: "%" },
  { kpi: "B2B Revenue Generated", category: "B2B", unit: "AED" },
  { kpi: "B2B Meetings Booked", category: "B2B", unit: "count" },
  { kpi: "B2B Proposals Sent", category: "B2B", unit: "count" },
  { kpi: "B2B Contracts Signed (cumulative)", category: "B2B", unit: "count" },
  { kpi: "Est. Pipeline Value", category: "B2B", unit: "AED" },
  { kpi: "Diwan Jaming Episodes Published", category: "Content", unit: "count" },
  { kpi: "YouTube Monthly Total Views", category: "Content", unit: "views" },
  { kpi: "Instagram Reels Avg Views per Reel", category: "Content", unit: "views" },
  { kpi: "TikTok Avg Views per Video", category: "Content", unit: "views" },
  { kpi: "Content Output – Total Pieces Published", category: "Content", unit: "count" },
];

// ── GAMES INPUT KPIs ──────────────────────────────────────────────────
const gameInputRows = [
  { kpi: "Cumulative Downloads", category: "App Growth", unit: "count" },
  { kpi: "DAU – Daily Active Users (monthly avg)", category: "App Growth", unit: "users" },
  { kpi: "MAU – Monthly Active Users", category: "App Growth", unit: "users" },
  { kpi: "Stickiness Ratio (DAU/MAU)", category: "App Growth", unit: "%" },
  { kpi: "D1 Retention Rate", category: "Retention", unit: "%" },
  { kpi: "D7 Retention Rate", category: "Retention", unit: "%" },
  { kpi: "D30 Retention Rate", category: "Retention", unit: "%" },
  { kpi: "Avg Session Length", category: "Retention", unit: "min" },
  { kpi: "App Store Rating", category: "Retention", unit: "/ 5" },
  { kpi: "ARPU – Avg Revenue Per User", category: "Monetisation", unit: "AED" },
  { kpi: "LTV – Lifetime Value (est. 90-day)", category: "Monetisation", unit: "AED" },
  { kpi: "CAC – Customer Acquisition Cost", category: "Monetisation", unit: "AED" },
  { kpi: "CPI – Cost Per Install", category: "Paid", unit: "AED" },
  { kpi: "Total Ad Spend", category: "Paid", unit: "AED" },
  { kpi: "ROAS – Return on Ad Spend", category: "Paid", unit: "x" },
  { kpi: "CAC Blended", category: "Paid", unit: "AED" },
  { kpi: "CPM – Cost per 1,000 Impressions", category: "Paid", unit: "AED" },
  { kpi: "CTR – Click-Through Rate", category: "Paid", unit: "%" },
  { kpi: "Instagram New Followers", category: "Social", unit: "count" },
  { kpi: "TikTok New Followers", category: "Social", unit: "count" },
  { kpi: "YouTube New Subscribers", category: "Social", unit: "count" },
  { kpi: "Snapchat Story Views", category: "Social", unit: "count" },
  { kpi: "Snapchat Swipe-Up Rate", category: "Social", unit: "%" },
  { kpi: "Total New Followers (IG+TT+YT)", category: "Social", unit: "count" },
  { kpi: "Avg Engagement Rate (IG+TT blended)", category: "Social", unit: "%" },
  { kpi: "Influencer Total Impressions", category: "Social", unit: "count" },
  { kpi: "Gender – Male", category: "Demographics", unit: "%" },
  { kpi: "Gender – Female", category: "Demographics", unit: "%" },
];

const CAT_COLORS: Record<string, string> = {
  "Sales": "#378ADD",
  "B2B": "#1D9E75",
  "Content": "#7F77DD",
  "App Growth": "#378ADD",
  "Retention": "#7F77DD",
  "Monetisation": "#1D9E75",
  "Paid": "#EF9F27",
  "Social": "#D4537E",
  "Demographics": "#888780",
};

// ── SAMPLE DASHBOARD DATA ─────────────────────────────────────────────
const finKpis = [
  { label: "Deera Units Sold", value: "1,240" },
  { label: "Mushakhat Units Sold", value: "870" },
  { label: "Avg Order Value", value: "AED 320" },
  { label: "B2B Revenue", value: "AED 148,200" },
  { label: "Contracts Signed", value: "7" },
  { label: "Pipeline Value", value: "AED 390,000" },
];

const contentKpis = [
  { label: "Episodes Published", value: "4" },
  { label: "YT Monthly Views", value: "62,400" },
  { label: "IG Reels Avg Views", value: "18,300" },
  { label: "TT Avg Views", value: "34,100" },
  { label: "Total Pieces Out", value: "38" },
];

const b2bFunnel = [
  { stage: "Meetings", value: 18 },
  { stage: "Proposals", value: 12 },
  { stage: "Pipeline", value: 8 },
  { stage: "Signed", value: 5 },
];

const gameKpis = [
  { label: "Cumulative Downloads", value: "84,500" },
  { label: "DAU", value: "3,200" },
  { label: "MAU", value: "21,400" },
  { label: "Stickiness Ratio", value: "14.9%" },
  { label: "D7 Retention", value: "38%" },
  { label: "App Store Rating", value: "4.6 / 5" },
  { label: "ARPU", value: "AED 12.4" },
  { label: "LTV (90-day)", value: "AED 88" },
  { label: "CPI", value: "AED 3.20" },
  { label: "ROAS", value: "3.8x" },
  { label: "Total Ad Spend", value: "AED 22,000" },
  { label: "Avg Engagement Rate", value: "6.2%" },
];

const retentionData = [
  { day: "D1", rate: 62 },
  { day: "D7", rate: 38 },
  { day: "D30", rate: 21 },
];

const genderData = [
  { name: "Male", value: 58 },
  { name: "Female", value: 42 },
];

const socialData = [
  { platform: "Instagram", followers: 1200 },
  { platform: "TikTok", followers: 2100 },
  { platform: "YouTube", followers: 450 },
  { platform: "Snapchat", followers: 680 },
];

const GENDER_COLORS = ["#378ADD", "#D4537E"];

// ── TYPES ───────────────────────────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string;
  unit?: string;
}

interface SectionLabelProps {
  text: string;
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

interface InputSheetProps {
  rows: Array<{ kpi: string; category: string; unit: string }>;
  week: number;
  setWeek: (week: number) => void;
  values: Record<number, string>;
  setValues: (values: Record<number, string>) => void;
}

// ── SHARED COMPONENTS ─────────────────────────────────────────────────
function KpiCard({ label, value, unit }: KpiCardProps) {
  const formatValue = (val: string, unit?: string) => {
    if (!val || val === "-") return "-";

    const numVal = parseFloat(val);

    // Handle percentage
    if (unit === "%") {
      return `${val}%`;
    }

    // Handle currency (AED)
    if (unit === "AED") {
      return `AED ${Number(val).toLocaleString()}`;
    }

    // Handle ratings
    if (unit === "/ 5") {
      return `${val} / 5`;
    }

    // Handle multipliers
    if (unit === "x") {
      return `${val}x`;
    }

    // Handle large numbers with commas
    if (["units", "count", "users", "views", "followers"].includes(unit || "")) {
      return Number(val).toLocaleString();
    }

    // Default: just return the value
    return val;
  };

  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 500 }}>{formatValue(value, unit)}</div>
    </div>
  );
}

function SectionLabel({ text }: SectionLabelProps) {
  return (
    <div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: 1, margin: "20px 0 10px" }}>
      {text}
    </div>
  );
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

// ── INPUT SHEET ───────────────────────────────────────────────────────
function InputSheet({ rows, week, setWeek, values, setValues }: InputSheetProps) {
  const categories = [...new Set(rows.map((r: { category: string }) => r.category))];

  const handleChange = (index: number, value: string) => {
    setValues({ ...values, [index]: value });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Week number</span>
        <input type="number" value={week} onChange={e => setWeek(Number(e.target.value))}
          style={{ width: 72, padding: "6px 10px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 13 }} />
        <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", background: "var(--color-background-secondary)", padding: "4px 10px", borderRadius: 6 }}>
          Save as: Week_{week}.xlsx
        </span>
      </div>

      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: CAT_COLORS[cat], display: "inline-block" }}></span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)" }}>{cat}</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid var(--color-border-secondary)" }}>
                <th style={{ textAlign: "left", padding: "6px 12px", color: "var(--color-text-secondary)", fontWeight: 500 }}>KPI</th>
                <th style={{ textAlign: "center", padding: "6px 12px", color: "var(--color-text-secondary)", fontWeight: 500, width: 80 }}>Unit</th>
                <th style={{ textAlign: "center", padding: "6px 12px", color: "var(--color-text-secondary)", fontWeight: 500, width: 140, background: "#EAF3DE" }}>Actual value</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row: { kpi: string; category: string; unit: string }, i: number) => row.category !== cat ? null : (
                <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                  <td style={{ padding: "7px 12px", color: "var(--color-text-primary)" }}>{row.kpi}</td>
                  <td style={{ padding: "7px 12px", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 12 }}>{row.unit}</td>
                  <td style={{ padding: "7px 12px", background: "#EAF3DE" }}>
                    <input placeholder="Enter value" value={values[i] || ""}
                      onChange={e => handleChange(i, e.target.value)}
                      style={{ width: "100%", textAlign: "center", border: "none", background: "transparent", fontSize: 13, color: "var(--color-text-primary)", outline: "none" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const [week, setWeek] = useState(5);

  // Default values for Financial KPIs
  const defaultFinValues: Record<number, string> = {
    0: "1240",   // Deera Units Sold
    1: "870",    // Mushakhat Units Sold
    2: "320",    // Avg Order Value (AOV)
    3: "28",     // Repeat Purchase Rate
    4: "148200", // B2B Revenue Generated
    5: "18",     // B2B Meetings Booked
    6: "12",     // B2B Proposals Sent
    7: "7",      // B2B Contracts Signed
    8: "390000", // Est. Pipeline Value
    9: "4",      // Diwan Jaming Episodes Published
    10: "62400", // YouTube Monthly Total Views
    11: "18300", // Instagram Reels Avg Views per Reel
    12: "34100", // TikTok Avg Views per Video
    13: "38",    // Content Output – Total Pieces Published
  };

  // Default values for Games KPIs
  const defaultGameValues: Record<number, string> = {
    0: "84500",    // Cumulative Downloads
    1: "3200",     // DAU
    2: "21400",    // MAU
    3: "14.9",     // Stickiness Ratio
    4: "62",       // D1 Retention Rate
    5: "38",       // D7 Retention Rate
    6: "21",       // D30 Retention Rate
    7: "8.5",      // Avg Session Length
    8: "4.6",      // App Store Rating
    9: "12.4",     // ARPU
    10: "88",      // LTV
    11: "8.2",     // CAC
    12: "3.20",    // CPI
    13: "22000",   // Total Ad Spend
    14: "3.8",     // ROAS
    15: "6.80",    // CAC Blended
    16: "15.20",   // CPM
    17: "4.2",     // CTR
    18: "1200",    // Instagram New Followers
    19: "2100",    // TikTok New Followers
    20: "450",     // YouTube New Subscribers
    21: "680",     // Snapchat Story Views
    22: "8.5",     // Snapchat Swipe-Up Rate
    23: "3750",    // Total New Followers
    24: "6.2",     // Avg Engagement Rate
    25: "125000",  // Influencer Total Impressions
    26: "58",      // Gender – Male
    27: "42",      // Gender – Female
  };

  const [finValues, setFinValues] = useState<Record<number, string>>(defaultFinValues);
  const [gameValues, setGameValues] = useState<Record<number, string>>(defaultGameValues);

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)", paddingBottom: "2rem" }}>
      <div style={{ padding: "16px 20px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: "8px 16px", borderRadius: "8px 8px 0 0", border: "0.5px solid",
              borderColor: tab === i ? "var(--color-border-secondary)" : "transparent",
              borderBottom: tab === i ? "0.5px solid var(--color-background-primary)" : "none",
              background: tab === i ? "var(--color-background-primary)" : "transparent",
              color: tab === i ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              fontSize: 13, fontWeight: tab === i ? 500 : 400, cursor: "pointer", whiteSpace: "nowrap"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>

        {/* ── FINANCIAL DASHBOARD ── */}
        {tab === 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 500 }}>Financial dashboard</div>
              <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)" }}>Week {week}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 16 }}>Actuals only · Shared with investors</div>

            <SectionLabel text="Sales" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 8 }}>
              {finInputRows.slice(0, 4).map((row, i) => (
                <KpiCard key={i} label={row.kpi} value={finValues[i] || "-"} unit={row.unit} />
              ))}
            </div>

            <SectionLabel text="B2B" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
              {finInputRows.slice(4, 9).map((row, i) => (
                <KpiCard key={i + 4} label={row.kpi} value={finValues[i + 4] || "-"} unit={row.unit} />
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <ChartCard title="B2B pipeline funnel">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={[
                    { stage: "Meetings", value: Number(finValues[5]) || 0 },
                    { stage: "Proposals", value: Number(finValues[6]) || 0 },
                    { stage: "Pipeline", value: Number(finValues[8]) || 0 },
                    { stage: "Signed", value: Number(finValues[7]) || 0 },
                  ]} layout="vertical" barSize={16}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="stage" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                    <Bar dataKey="value" fill="#1D9E75" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Units sold by product">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={[
                    { name: "Deera", v: Number(finValues[0]) || 0 },
                    { name: "Mushakhat", v: Number(finValues[1]) || 0 }
                  ]} barSize={40}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip formatter={(v: number) => v.toLocaleString()} />
                    <Bar dataKey="v" fill="#378ADD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <SectionLabel text="Content" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
              {finInputRows.slice(9).map((row, i) => (
                <KpiCard key={i + 9} label={row.kpi} value={finValues[i + 9] || "-"} unit={row.unit} />
              ))}
            </div>
          </div>
        )}

        {/* ── GAMES DASHBOARD ── */}
        {tab === 1 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 18, fontWeight: 500 }}>Games dashboard</div>
              <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)" }}>Week {week}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 16 }}>Actuals only · Shared with investors</div>

            <SectionLabel text="App growth & retention" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 16 }}>
              {gameInputRows.slice(0, 9).map((row, i) => (
                <KpiCard key={i} label={row.kpi} value={gameValues[i] || "-"} unit={row.unit} />
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <ChartCard title="Retention curve">
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={[
                    { day: "D1", rate: Number(gameValues[4]) || 0 },
                    { day: "D7", rate: Number(gameValues[5]) || 0 },
                    { day: "D30", rate: Number(gameValues[6]) || 0 },
                  ]}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip formatter={v => `${v}%`} />
                    <Bar dataKey="rate" fill="#7F77DD" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Gender split">
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#378ADD", display: "inline-block" }}></span>Male {gameValues[26] || "-"}%</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#D4537E", display: "inline-block" }}></span>Female {gameValues[27] || "-"}%</span>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={[
                      { name: "Male", value: Number(gameValues[26]) || 0 },
                      { name: "Female", value: Number(gameValues[27]) || 0 },
                    ]} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                      {GENDER_COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                    </Pie>
                    <Tooltip formatter={v => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <SectionLabel text="Monetisation & paid" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 16 }}>
              {gameInputRows.slice(9, 18).map((row, i) => (
                <KpiCard key={i + 9} label={row.kpi} value={gameValues[i + 9] || "-"} unit={row.unit} />
              ))}
            </div>

            <SectionLabel text="Social media growth" />
            <ChartCard title="New followers by platform">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={[
                  { platform: "Instagram", followers: Number(gameValues[18]) || 0 },
                  { platform: "TikTok", followers: Number(gameValues[19]) || 0 },
                  { platform: "YouTube", followers: Number(gameValues[20]) || 0 },
                  { platform: "Snapchat", followers: Number(gameValues[21]) || 0 },
                ]} barSize={36}>
                  <XAxis dataKey="platform" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v: number) => v.toLocaleString()} />
                  <Bar dataKey="followers" fill="#D4537E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <SectionLabel text="Demographics" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 16 }}>
              {gameInputRows.slice(24).map((row, i) => (
                <KpiCard key={i + 24} label={row.kpi} value={gameValues[i + 24] || "-"} unit={row.unit} />
              ))}
            </div>
          </div>
        )}

        {/* ── FINANCIAL INPUT ── */}
        {tab === 2 && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Financial input sheet</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 20 }}>
              Team enters actual values only. Dashboard auto-calculates.
            </div>
            <InputSheet rows={finInputRows} week={week} setWeek={setWeek} values={finValues} setValues={setFinValues} />
          </div>
        )}

        {/* ── GAMES INPUT ── */}
        {tab === 3 && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>Games input sheet</div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 20 }}>
              Team enters actual values only. Dashboard auto-calculates.
            </div>
            <InputSheet rows={gameInputRows} week={week} setWeek={setWeek} values={gameValues} setValues={setGameValues} />
          </div>
        )}

      </div>
    </div>
  );
}