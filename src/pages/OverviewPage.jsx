import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OverviewPage() {
  const navigate = useNavigate();

  const initialFlow = [
    { key: "source", title: "33kV Source", sub: "Grid / DG Input", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
    { key: "feeder", title: "33kV Feeder", sub: "HT Feeder Panel", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
    { key: "transformer", title: "Transformers", sub: "33kV / 433V", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
    { key: "kiosk", title: "LT Kiosk", sub: "433V Panels", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
    { key: "busbar", title: "LT Busbar", sub: "Busduct", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
    { key: "pcc", title: "PCC Main", sub: "Wing Distribution", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
    { key: "wing1", title: "Wing 1", sub: "PCC 1 / PCC 2", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
    { key: "wing2", title: "Wing 2", sub: "PCC 3 / PCC 4", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
  ];

  const [flowData, setFlowData] = useState(initialFlow);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlowData((prev) =>
        prev.map((item) => {
          const incoming = Math.max(
            40,
            item.incoming + Math.floor(Math.random() * 21) - 10
          );

          const outgoing = Math.min(
            incoming - 5,
            Math.max(35, item.outgoing + Math.floor(Math.random() * 17) - 8)
          );

          return {
            ...item,
            incoming,
            outgoing,
            today: item.today + Math.floor(outgoing / 75),
            month: item.month + Math.floor(outgoing / 38),
          };
        })
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const totals = useMemo(() => {
    const incoming = flowData[0].incoming;
    const wing1 = flowData.find((x) => x.key === "wing1")?.outgoing || 0;
    const wing2 = flowData.find((x) => x.key === "wing2")?.outgoing || 0;
    const outgoing = wing1 + wing2;
    const loss = incoming - outgoing;
    const efficiency = Math.round((outgoing / incoming) * 100);
    const today = flowData.reduce((sum, x) => sum + x.today, 0);
    const month = flowData.reduce((sum, x) => sum + x.month, 0);

    return { incoming, outgoing, loss, efficiency, today, month, wing1, wing2 };
  }, [flowData]);

  const StatCard = ({ title, value, sub, tone = "cyan" }) => (
    <div className="relative overflow-hidden rounded-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-xl panel-active-glow p-5">
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${
          tone === "green"
            ? "bg-emerald-400/25"
            : tone === "amber"
            ? "bg-amber-400/25"
            : "bg-cyan-400/25"
        }`}
      />

      <span className="relative text-[10px] font-black text-blue-300 uppercase tracking-[0.22em]">
        {title}
      </span>

      <strong className="relative block mt-2 text-2xl font-black">
        {value}
      </strong>

      <span className="relative block mt-1 text-[10px] text-slate-300 uppercase">
        {sub}
      </span>
    </div>
  );

  const TrendChart = ({ title, data }) => {
    const max = Math.max(...data.map((x) => x.value));

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
        <h3 className="text-[#081F5C] font-black uppercase mb-5">{title}</h3>

        <div className="h-[240px] flex items-end gap-4 bg-slate-50 border border-slate-200 rounded-lg p-5">
          {data.map((x) => (
            <div
              key={x.label}
              className="flex-1 flex flex-col items-center justify-end gap-2 h-full"
            >
              <span className="text-[9px] text-[#004AAD] font-black">
                {Math.round(x.value / 1000)}k
              </span>

              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#081F5C] via-[#004AAD] to-cyan-400 shadow-[0_0_14px_rgba(0,229,255,0.35)]"
                style={{ height: `${Math.max(25, (x.value / max) * 185)}px` }}
              />

              <span className="text-[10px] font-black text-[#081F5C]">
                {x.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const InternalFlowChart = () => {
    const maxIncoming = Math.max(...flowData.map((item) => item.incoming));
    const chartHeight = 360;
    const chartWidth = 1000;

    const points = flowData.map((item, index) => {
      const x = 70 + index * 125;
      const outgoingY =
        chartHeight - 60 - (item.outgoing / maxIncoming) * 245;
      const incomingY =
        chartHeight - 60 - (item.incoming / maxIncoming) * 245;
      const lossY = chartHeight - 60 - ((item.incoming - item.outgoing) / maxIncoming) * 245;

      return {
        ...item,
        x,
        incomingY,
        outgoingY,
        lossY,
        loss: item.incoming - item.outgoing,
        efficiency: Math.round((item.outgoing / item.incoming) * 100),
      };
    });

    const outgoingPath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.outgoingY}`)
      .join(" ");

    const incomingPath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.incomingY}`)
      .join(" ");

    return (
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
        <div className="mb-6">
          <span className="text-[10px] font-black text-[#004AAD] uppercase tracking-[0.25em]">
            Flow Wise Internal Consumption
          </span>

          <h3 className="text-xl font-black text-[#081F5C] uppercase mt-1">
            Source to Wing Energy Transfer Chart
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Blue line shows incoming power, cyan line shows outgoing power, and
            amber markers show internal loss at each stage.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1050px] rounded-2xl bg-gradient-to-br from-[#081F5C] via-[#061746] to-[#020617] p-6">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-[390px]"
              fill="none"
            >
              <defs>
                <linearGradient id="incomingLine" x1="0" x2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#004AAD" />
                </linearGradient>

                <linearGradient id="outgoingLine" x1="0" x2="1">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  x2="980"
                  y1={60 + i * 55}
                  y2={60 + i * 55}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              ))}

              <path
                d={incomingPath}
                stroke="url(#incomingLine)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />

              <path
                d={outgoingPath}
                stroke="url(#outgoingLine)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
              />

              {points.map((p) => (
                <g key={p.key}>
                  <line
                    x1={p.x}
                    x2={p.x}
                    y1={p.incomingY}
                    y2={p.outgoingY}
                    stroke="#FBBF24"
                    strokeWidth="4"
                    strokeDasharray="5 5"
                  />

                  <circle cx={p.x} cy={p.incomingY} r="7" fill="#60A5FA" />
                  <circle cx={p.x} cy={p.outgoingY} r="8" fill="#00E5FF" />

                  <circle
                    cx={p.x}
                    cy={(p.incomingY + p.outgoingY) / 2}
                    r="10"
                    fill="#F59E0B"
                    opacity="0.95"
                  />

                  <text
                    x={p.x}
                    y={p.outgoingY - 18}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="800"
                    fill="#E0F2FE"
                  >
                    {p.outgoing}kW
                  </text>

                  <text
                    x={p.x}
                    y="330"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="900"
                    fill="#FFFFFF"
                  >
                    {p.title}
                  </text>

                  <text
                    x={p.x}
                    y="348"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#93C5FD"
                  >
                    Loss {p.loss}kW
                  </text>
                </g>
              ))}
            </svg>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                <span className="text-[9px] font-black text-blue-300 uppercase tracking-wide">
                  Incoming Line
                </span>
                <strong className="block text-white text-sm mt-1">
                  Power received by each stage
                </strong>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                <span className="text-[9px] font-black text-cyan-300 uppercase tracking-wide">
                  Outgoing Line
                </span>
                <strong className="block text-white text-sm mt-1">
                  Power transferred forward
                </strong>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                <span className="text-[9px] font-black text-amber-300 uppercase tracking-wide">
                  Amber Markers
                </span>
                <strong className="block text-white text-sm mt-1">
                  Internal power loss
                </strong>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-xl p-4">
                <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wide">
                  Live Refresh
                </span>
                <strong className="block text-white text-sm mt-1">
                  Updates every 5 seconds
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const dailyData = [
    { label: "Mon", value: 16400 },
    { label: "Tue", value: 17200 },
    { label: "Wed", value: 15800 },
    { label: "Thu", value: 18100 },
    { label: "Fri", value: 19200 },
    { label: "Sat", value: 14800 },
    { label: "Today", value: Math.round(totals.today / 8) },
  ];

  const monthlyData = [
    { label: "Jan", value: 420000 },
    { label: "Feb", value: 438000 },
    { label: "Mar", value: 451000 },
    { label: "Apr", value: 469000 },
    { label: "May", value: 481000 },
    { label: "Now", value: Math.round(totals.month / 8) },
  ];

  return (
    <div className="min-h-screen bg-[#EEF4FF]">
      <header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
        <div className="h-full mx-auto max-w-7xl flex justify-between items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-[26px] font-semibold tracking-[0.18em] uppercase">
              ARCOT <span className="text-[#67E8F9]">IIoT 1.0</span>
            </h1>

            <span className="text-[9px] uppercase tracking-[0.35em] text-blue-300">
              Complete Dashboard Overview
            </span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="h-[34px] px-4 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.15em]"
          >
            Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow">
          <span className="text-[10px] font-black text-[#004AAD] uppercase tracking-[0.25em]">
            BMS Command Center
          </span>

          <h2 className="text-2xl font-black text-[#081F5C] uppercase mt-1">
            Source to Wing Complete Consumption Overview
          </h2>
        </section>

        <section className="grid md:grid-cols-4 gap-4">
          <StatCard title="Total Incoming" value={`${totals.incoming} kW`} sub="Source input" />
          <StatCard title="Final Outgoing" value={`${totals.outgoing} kW`} sub="Wing load output" tone="green" />
          <StatCard title="Distribution Loss" value={`${totals.loss} kW`} sub="Internal losses" tone="amber" />
          <StatCard title="Efficiency" value={`${totals.efficiency}%`} sub="Power transfer" tone="green" />
        </section>

        <InternalFlowChart />

        <section className="grid lg:grid-cols-2 gap-6">
          <TrendChart title="Daily Consumption Overview" data={dailyData} />
          <TrendChart title="Monthly Consumption Overview" data={monthlyData} />
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-black text-[#081F5C] uppercase mb-5">
            Internal Breakdown Table
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="bg-[#081F5C] text-white">
                  <th className="p-3 text-left">Stage</th>
                  <th className="p-3 text-right">Incoming</th>
                  <th className="p-3 text-right">Outgoing</th>
                  <th className="p-3 text-right">Loss</th>
                  <th className="p-3 text-right">Today</th>
                  <th className="p-3 text-right">Month</th>
                </tr>
              </thead>

              <tbody>
                {flowData.map((item) => (
                  <tr key={item.key} className="border-b border-slate-200">
                    <td className="p-3 font-black text-[#081F5C]">
                      {item.title}
                    </td>
                    <td className="p-3 text-right">{item.incoming} kW</td>
                    <td className="p-3 text-right text-emerald-600 font-bold">
                      {item.outgoing} kW
                    </td>
                    <td className="p-3 text-right text-amber-600 font-bold">
                      {item.incoming - item.outgoing} kW
                    </td>
                    <td className="p-3 text-right">
                      {item.today.toLocaleString()} kWh
                    </td>
                    <td className="p-3 text-right">
                      {item.month.toLocaleString()} kWh
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}