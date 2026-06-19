// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function OverviewPage() {
//   const navigate = useNavigate();

//   const initialFlow = [
//     { key: "source", title: "33kV Source", sub: "Grid / DG Input", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
//     { key: "feeder", title: "33kV Feeder", sub: "HT Feeder Panel", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
//     { key: "transformer", title: "Transformers", sub: "33kV / 433V", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
//     { key: "kiosk", title: "LT Kiosk", sub: "433V Panels", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
//     { key: "busbar", title: "LT Busbar", sub: "Busduct", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
//     { key: "pcc", title: "PCC Main", sub: "Wing Distribution", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
//     { key: "wing1", title: "Wing 1", sub: "PCC 1 / PCC 2", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
//     { key: "wing2", title: "Wing 2", sub: "PCC 3 / PCC 4", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
//   ];

//   const [flowData, setFlowData] = useState(initialFlow);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setFlowData((prev) =>
//         prev.map((item) => {
//           const incoming = Math.max(
//             40,
//             item.incoming + Math.floor(Math.random() * 21) - 10
//           );

//           const outgoing = Math.min(
//             incoming - 5,
//             Math.max(35, item.outgoing + Math.floor(Math.random() * 17) - 8)
//           );

//           return {
//             ...item,
//             incoming,
//             outgoing,
//             today: item.today + Math.floor(outgoing / 75),
//             month: item.month + Math.floor(outgoing / 38),
//           };
//         })
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const totals = useMemo(() => {
//     const incoming = flowData[0].incoming;
//     const wing1 = flowData.find((x) => x.key === "wing1")?.outgoing || 0;
//     const wing2 = flowData.find((x) => x.key === "wing2")?.outgoing || 0;
//     const outgoing = wing1 + wing2;
//     const loss = incoming - outgoing;
//     const efficiency = Math.round((outgoing / incoming) * 100);
//     const today = flowData.reduce((sum, x) => sum + x.today, 0);
//     const month = flowData.reduce((sum, x) => sum + x.month, 0);

//     return { incoming, outgoing, loss, efficiency, today, month, wing1, wing2 };
//   }, [flowData]);

//   const StatCard = ({ title, value, sub, tone = "cyan" }) => (
//     <div className="relative overflow-hidden rounded-xl bg-[#081F5C] border-2 border-[#004AAD] text-white shadow-xl panel-active-glow p-5">
//       <div
//         className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl ${
//           tone === "green"
//             ? "bg-emerald-400/25"
//             : tone === "amber"
//             ? "bg-amber-400/25"
//             : "bg-cyan-400/25"
//         }`}
//       />

//       <span className="relative text-[10px] font-black text-blue-300 uppercase tracking-[0.22em]">
//         {title}
//       </span>

//       <strong className="relative block mt-2 text-2xl font-black">
//         {value}
//       </strong>

//       <span className="relative block mt-1 text-[10px] text-slate-300 uppercase">
//         {sub}
//       </span>
//     </div>
//   );

//   const TrendChart = ({ title, data }) => {
//     const max = Math.max(...data.map((x) => x.value));

//     return (
//       <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
//         <h3 className="text-[#081F5C] font-black uppercase mb-5">{title}</h3>

//         <div className="h-[240px] flex items-end gap-4 bg-slate-50 border border-slate-200 rounded-lg p-5">
//           {data.map((x) => (
//             <div
//               key={x.label}
//               className="flex-1 flex flex-col items-center justify-end gap-2 h-full"
//             >
//               <span className="text-[9px] text-[#004AAD] font-black">
//                 {Math.round(x.value / 1000)}k
//               </span>

//               <div
//                 className="w-full rounded-t-lg bg-gradient-to-t from-[#081F5C] via-[#004AAD] to-cyan-400 shadow-[0_0_14px_rgba(0,229,255,0.35)]"
//                 style={{ height: `${Math.max(25, (x.value / max) * 185)}px` }}
//               />

//               <span className="text-[10px] font-black text-[#081F5C]">
//                 {x.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const InternalFlowChart = () => {
//     const maxIncoming = Math.max(...flowData.map((item) => item.incoming));
//     const chartHeight = 360;
//     const chartWidth = 1000;

//     const points = flowData.map((item, index) => {
//       const x = 70 + index * 125;
//       const outgoingY =
//         chartHeight - 60 - (item.outgoing / maxIncoming) * 245;
//       const incomingY =
//         chartHeight - 60 - (item.incoming / maxIncoming) * 245;
//       const lossY = chartHeight - 60 - ((item.incoming - item.outgoing) / maxIncoming) * 245;

//       return {
//         ...item,
//         x,
//         incomingY,
//         outgoingY,
//         lossY,
//         loss: item.incoming - item.outgoing,
//         efficiency: Math.round((item.outgoing / item.incoming) * 100),
//       };
//     });

//     const outgoingPath = points
//       .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.outgoingY}`)
//       .join(" ");

//     const incomingPath = points
//       .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.incomingY}`)
//       .join(" ");

//     return (
//       <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
//         <div className="mb-6">
//           <span className="text-[10px] font-black text-[#004AAD] uppercase tracking-[0.25em]">
//             Flow Wise Internal Consumption
//           </span>

//           <h3 className="text-xl font-black text-[#081F5C] uppercase mt-1">
//             Source to Wing Energy Transfer Chart
//           </h3>

//           <p className="text-xs text-slate-500 mt-1">
//             Blue line shows incoming power, cyan line shows outgoing power, and
//             amber markers show internal loss at each stage.
//           </p>
//         </div>

//         <div className="overflow-x-auto">
//           <div className="min-w-[1050px] rounded-2xl bg-gradient-to-br from-[#081F5C] via-[#061746] to-[#020617] p-6">
//             <svg
//               viewBox={`0 0 ${chartWidth} ${chartHeight}`}
//               className="w-full h-[390px]"
//               fill="none"
//             >
//               <defs>
//                 <linearGradient id="incomingLine" x1="0" x2="1">
//                   <stop offset="0%" stopColor="#60A5FA" />
//                   <stop offset="100%" stopColor="#004AAD" />
//                 </linearGradient>

//                 <linearGradient id="outgoingLine" x1="0" x2="1">
//                   <stop offset="0%" stopColor="#00E5FF" />
//                   <stop offset="100%" stopColor="#34D399" />
//                 </linearGradient>

//                 <filter id="glow">
//                   <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                   <feMerge>
//                     <feMergeNode in="coloredBlur" />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               </defs>

//               {[0, 1, 2, 3, 4].map((i) => (
//                 <line
//                   key={i}
//                   x1="40"
//                   x2="980"
//                   y1={60 + i * 55}
//                   y2={60 + i * 55}
//                   stroke="rgba(255,255,255,0.08)"
//                   strokeWidth="1"
//                 />
//               ))}

//               <path
//                 d={incomingPath}
//                 stroke="url(#incomingLine)"
//                 strokeWidth="6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 opacity="0.8"
//               />

//               <path
//                 d={outgoingPath}
//                 stroke="url(#outgoingLine)"
//                 strokeWidth="7"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 filter="url(#glow)"
//               />

//               {points.map((p) => (
//                 <g key={p.key}>
//                   <line
//                     x1={p.x}
//                     x2={p.x}
//                     y1={p.incomingY}
//                     y2={p.outgoingY}
//                     stroke="#FBBF24"
//                     strokeWidth="4"
//                     strokeDasharray="5 5"
//                   />

//                   <circle cx={p.x} cy={p.incomingY} r="7" fill="#60A5FA" />
//                   <circle cx={p.x} cy={p.outgoingY} r="8" fill="#00E5FF" />

//                   <circle
//                     cx={p.x}
//                     cy={(p.incomingY + p.outgoingY) / 2}
//                     r="10"
//                     fill="#F59E0B"
//                     opacity="0.95"
//                   />

//                   <text
//                     x={p.x}
//                     y={p.outgoingY - 18}
//                     textAnchor="middle"
//                     fontSize="12"
//                     fontWeight="800"
//                     fill="#E0F2FE"
//                   >
//                     {p.outgoing}kW
//                   </text>

//                   <text
//                     x={p.x}
//                     y="330"
//                     textAnchor="middle"
//                     fontSize="11"
//                     fontWeight="900"
//                     fill="#FFFFFF"
//                   >
//                     {p.title}
//                   </text>

//                   <text
//                     x={p.x}
//                     y="348"
//                     textAnchor="middle"
//                     fontSize="10"
//                     fontWeight="700"
//                     fill="#93C5FD"
//                   >
//                     Loss {p.loss}kW
//                   </text>
//                 </g>
//               ))}
//             </svg>

//             <div className="grid grid-cols-4 gap-4 mt-4">
//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-blue-300 uppercase tracking-wide">
//                   Incoming Line
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Power received by each stage
//                 </strong>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-cyan-300 uppercase tracking-wide">
//                   Outgoing Line
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Power transferred forward
//                 </strong>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-amber-300 uppercase tracking-wide">
//                   Amber Markers
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Internal power loss
//                 </strong>
//               </div>

//               <div className="bg-white/10 border border-white/10 rounded-xl p-4">
//                 <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wide">
//                   Live Refresh
//                 </span>
//                 <strong className="block text-white text-sm mt-1">
//                   Updates every 5 seconds
//                 </strong>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   };

//   const dailyData = [
//     { label: "Mon", value: 16400 },
//     { label: "Tue", value: 17200 },
//     { label: "Wed", value: 15800 },
//     { label: "Thu", value: 18100 },
//     { label: "Fri", value: 19200 },
//     { label: "Sat", value: 14800 },
//     { label: "Today", value: Math.round(totals.today / 8) },
//   ];

//   const monthlyData = [
//     { label: "Jan", value: 420000 },
//     { label: "Feb", value: 438000 },
//     { label: "Mar", value: 451000 },
//     { label: "Apr", value: 469000 },
//     { label: "May", value: 481000 },
//     { label: "Now", value: Math.round(totals.month / 8) },
//   ];

//   return (
//     <div className="min-h-screen bg-[#EEF4FF]">
//       <header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
//         <div className="h-full mx-auto max-w-7xl flex justify-between items-center">
//           <div onClick={() => navigate("/")} className="cursor-pointer">
//             <h1 className="text-[26px] font-semibold tracking-[0.18em] uppercase">
//               ARCOT <span className="text-[#67E8F9]">IIoT 1.0</span>
//             </h1>

//             <span className="text-[9px] uppercase tracking-[0.35em] text-blue-300">
//               Complete Dashboard Overview
//             </span>
//           </div>

//           <button
//             onClick={() => navigate("/")}
//             className="h-[34px] px-4 bg-[#004AAD] border border-cyan-400 text-white text-[10px] font-black uppercase tracking-[0.15em]"
//           >
//             Dashboard
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto p-6 space-y-6">
//         <section className="bg-white border border-slate-200 rounded-xl p-5 shadow">
//           <span className="text-[10px] font-black text-[#004AAD] uppercase tracking-[0.25em]">
//             BMS Command Center
//           </span>

//           <h2 className="text-2xl font-black text-[#081F5C] uppercase mt-1">
//             Source to Wing Complete Consumption Overview
//           </h2>
//         </section>

//         <section className="grid md:grid-cols-4 gap-4">
//           <StatCard title="Total Incoming" value={`${totals.incoming} kW`} sub="Source input" />
//           <StatCard title="Final Outgoing" value={`${totals.outgoing} kW`} sub="Wing load output" tone="green" />
//           <StatCard title="Distribution Loss" value={`${totals.loss} kW`} sub="Internal losses" tone="amber" />
//           <StatCard title="Efficiency" value={`${totals.efficiency}%`} sub="Power transfer" tone="green" />
//         </section>

//         <InternalFlowChart />

//         <section className="grid lg:grid-cols-2 gap-6">
//           <TrendChart title="Daily Consumption Overview" data={dailyData} />
//           <TrendChart title="Monthly Consumption Overview" data={monthlyData} />
//         </section>

//         <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
//           <h3 className="text-lg font-black text-[#081F5C] uppercase mb-5">
//             Internal Breakdown Table
//           </h3>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[900px] text-sm">
//               <thead>
//                 <tr className="bg-[#081F5C] text-white">
//                   <th className="p-3 text-left">Stage</th>
//                   <th className="p-3 text-right">Incoming</th>
//                   <th className="p-3 text-right">Outgoing</th>
//                   <th className="p-3 text-right">Loss</th>
//                   <th className="p-3 text-right">Today</th>
//                   <th className="p-3 text-right">Month</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {flowData.map((item) => (
//                   <tr key={item.key} className="border-b border-slate-200">
//                     <td className="p-3 font-black text-[#081F5C]">
//                       {item.title}
//                     </td>
//                     <td className="p-3 text-right">{item.incoming} kW</td>
//                     <td className="p-3 text-right text-emerald-600 font-bold">
//                       {item.outgoing} kW
//                     </td>
//                     <td className="p-3 text-right text-amber-600 font-bold">
//                       {item.incoming - item.outgoing} kW
//                     </td>
//                     <td className="p-3 text-right">
//                       {item.today.toLocaleString()} kWh
//                     </td>
//                     <td className="p-3 text-right">
//                       {item.month.toLocaleString()} kWh
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }





import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OverviewPage() {
  const navigate = useNavigate();

  const initialFlow = [
    { key: "source", title: "33kV Source", short: "SRC", sub: "Grid / DG Input", incoming: 1120, outgoing: 1085, today: 18420, month: 486500 },
    { key: "feeder", title: "33kV Feeder", short: "FDR", sub: "HT Feeder Panel", incoming: 1085, outgoing: 1040, today: 17680, month: 462300 },
    { key: "transformer", title: "Transformers", short: "TRF", sub: "33kV / 433V", incoming: 1040, outgoing: 980, today: 16940, month: 441900 },
    { key: "kiosk", title: "LT Kiosk", short: "KSK", sub: "433V Panels", incoming: 980, outgoing: 935, today: 15720, month: 408700 },
    { key: "busbar", title: "LT Busbar", short: "BUS", sub: "Busduct", incoming: 935, outgoing: 900, today: 14980, month: 392100 },
    { key: "pcc", title: "PCC Main", short: "PCC", sub: "Wing Distribution", incoming: 900, outgoing: 850, today: 14160, month: 366400 },
    { key: "wing1", title: "Wing 1", short: "W1", sub: "PCC 1 / PCC 2", incoming: 425, outgoing: 402, today: 7080, month: 181000 },
    { key: "wing2", title: "Wing 2", short: "W2", sub: "PCC 3 / PCC 4", incoming: 425, outgoing: 410, today: 7420, month: 190400 },
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

  const maxOutgoing = Math.max(...flowData.map((x) => x.outgoing));
  const flowChartData = flowData.slice(0, 5);

  const PanelCard = ({ title, children, className = "" }) => (
    <section
      className={`relative rounded-[22px] bg-white border border-slate-200 shadow-[0_14px_35px_rgba(8,31,92,0.08)] ${className}`}
    >
      <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 w-[70%] max-w-[320px] rounded-lg bg-[#081F5C] border border-[#004AAD] px-4 py-2.5 text-center shadow-md">
        <h3 className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.08em] text-white">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );

  const Gauge = ({ value, label }) => {
    const safeValue = Math.min(Math.max(value, 0), 100);

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-[135px] h-[76px] overflow-hidden">
          <div className="absolute inset-0 rounded-t-full border-[20px] border-b-0 border-slate-100" />
          <div
            className="absolute inset-0 rounded-t-full border-[20px] border-b-0 border-[#004AAD]"
            style={{
              clipPath: `polygon(0 0, ${safeValue * 2}% 0, ${safeValue * 2}% 100%, 0 100%)`,
            }}
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[30px] font-normal text-[#081F5C]">
            {safeValue}%
          </div>
        </div>

        <p className="mt-3 text-center text-[12px] font-medium text-slate-700">
          {label}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#EEF4FF]">
      <header className="sticky top-0 z-[1000] h-[72px] bg-[#081F5C] border-b-4 border-[#004AAD] px-4 text-white shadow-md">
        <div className="h-full mx-auto max-w-7xl flex justify-between items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-[24px] md:text-[26px] font-semibold tracking-[0.18em] uppercase">
              ARCOT <span className="text-[#67E8F9]">IIoT 1.0</span>
            </h1>

            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.32em] text-blue-300">
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

      <main className="max-w-[1380px] mx-auto px-5 md:px-6 py-7">
        <section className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-[26px] md:text-[32px] font-bold text-[#081F5C] uppercase tracking-[0.03em]">
              BMS Analysis Report
            </h2>
            <p className="mt-1 text-[12px] md:text-[13px] font-medium text-slate-500">
              Live source to wing power monitoring overview
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-7 mb-8 pt-4">
          <PanelCard title="Energy Flow Growth" className="p-6 min-h-[330px]">
            <div className="pt-8 h-[260px]">
              <svg viewBox="0 0 430 245" className="w-full h-full">
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="42"
                    x2="400"
                    y1={35 + i * 40}
                    y2={35 + i * 40}
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                  />
                ))}

                <polyline
                  points={flowChartData
                    .map((d, i) => `${65 + i * 82},${220 - (d.outgoing / maxOutgoing) * 165}`)
                    .join(" ")}
                  fill="none"
                  stroke="#004AAD"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {flowChartData.map((d, i) => {
                  const y = 220 - (d.outgoing / maxOutgoing) * 165;

                  return (
                    <g key={d.key}>
                      <rect
                        x={57 + i * 82}
                        y={y - 8}
                        width="16"
                        height="16"
                        rx="3"
                        fill="#081F5C"
                      />
                      <text
                        x={65 + i * 82}
                        y={y - 16}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#004AAD"
                      >
                        {d.outgoing}
                      </text>
                      <text
                        x={65 + i * 82}
                        y="238"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#081F5C"
                      >
                        {d.short}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </PanelCard>

          <PanelCard title="Consumption Breakdown" className="p-6 min-h-[330px]">
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-[170px_1fr] items-center gap-5 min-h-[235px]">
              <div className="mx-auto w-[160px] h-[160px] rounded-full bg-[conic-gradient(#67E8F9_0_24%,#004AAD_24%_48%,#081F5C_48%_70%,#60A5FA_70%_86%,#CBD5E1_86%_100%)] shadow-inner" />

              <div className="space-y-2.5">
                {[
                  ["24%", "33kV Source"],
                  ["24%", "33kV Feeder"],
                  ["22%", "Transformers"],
                  ["16%", "LT Kiosk"],
                  ["14%", "LT Busbar"],
                ].map(([v, label]) => (
                  <div key={label} className="grid grid-cols-[50px_1fr] items-center gap-3 text-[13px]">
                    <strong className="rounded-md bg-blue-50 py-1 text-center text-[#081F5C] font-semibold">
                      {v}
                    </strong>
                    <span className="font-medium text-slate-600">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[12px] text-slate-500 leading-relaxed">
              Real-time power distribution from HT source to LT busbar and wing level output.
            </p>
          </PanelCard>

          <PanelCard title="Demand Trends" className="p-6 min-h-[330px]">
            <div className="pt-10 h-[260px] flex items-end justify-between gap-4">
              {flowChartData.map((d) => (
                <div key={d.key} className="flex-1 text-center">
                  <div className="mb-2 text-[18px] font-semibold text-[#081F5C]">
                    {d.short}
                  </div>

                  <div
                    className="mx-auto w-full max-w-[46px] rounded-t-md bg-[#004AAD] shadow-[0_0_14px_rgba(0,74,173,0.22)] transition-all duration-500"
                    style={{
                      height: `${Math.max(55, (d.outgoing / maxOutgoing) * 160)}px`,
                    }}
                  />

                  <p className="mt-2 text-[10px] font-bold text-slate-600">
                    {d.outgoing}kW
                  </p>
                </div>
              ))}
            </div>
          </PanelCard>
        </section>

        <PanelCard title="Distribution Share" className="mb-8 p-6">
          <div className="pt-12 grid grid-cols-2 md:grid-cols-5 gap-6">
            <Gauge value={totals.efficiency} label="Efficiency" />
            <Gauge value={Math.round((totals.wing1 / totals.outgoing) * 100)} label="Wing 1" />
            <Gauge value={Math.round((totals.wing2 / totals.outgoing) * 100)} label="Wing 2" />
            <Gauge value={Math.round((totals.loss / totals.incoming) * 100)} label="Loss" />
            <Gauge value={100} label="Live System" />
          </div>
        </PanelCard>

       <div className="relative pt-5">
  <PanelCard title="Live Monitoring Summary" className="p-0">
    <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center">
      {[
        ["Total Incoming", `${totals.incoming} kW`],
        ["Final Outgoing", `${totals.outgoing} kW`],
        ["Distribution Loss", `${totals.loss} kW`],
        ["Efficiency", `${totals.efficiency}%`],
        ["Today", `${totals.today.toLocaleString()} kWh`],
        ["Month", `${totals.month.toLocaleString()} kWh`],
      ].map(([label, value]) => (
        <div
          key={label}
          className="min-h-[130px] px-4 py-6 flex flex-col items-center justify-center"
        >
          <p className="text-[12px] font-medium text-slate-600">
            {label}
          </p>
          <h2 className="mt-3 text-[22px] md:text-[24px] font-bold text-[#004AAD] leading-tight">
            {value}
          </h2>
        </div>
      ))}
    </div>
  </PanelCard>
</div>
      </main>
    </div>
  );
}