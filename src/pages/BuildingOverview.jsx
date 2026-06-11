// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Fan, Lightbulb, Gauge } from "lucide-react";
// import { buildings, systemSummary } from "../data/bmsData";

// function MetricRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between border-t border-slate-100 py-3 text-sm">
//       <span className="font-semibold text-slate-500">{label}</span>
//       <strong className="font-black text-blue-950">{value}</strong>
//     </div>
//   );
// }

// export default function BuildingOverview() {
//   const { buildingId } = useParams();
//   const building = buildings.find((item) => item.id === buildingId);

//   if (!building) {
//     return (
//       <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
//         <section className="mx-auto max-w-xl rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-xl shadow-blue-950/10">
//           <h2 className="text-2xl font-black text-blue-950">Building not found</h2>
//           <Link
//             to="/"
//             className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
//           >
//             Back to main overview
//           </Link>
//         </section>
//       </main>
//     );
//   }

//   const floors = Array.from({ length: building.floors }, (_, i) => building.floors - i);

//   return (
//     <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
//       <header className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10 md:flex-row md:items-center">
//         <Link
//           to="/"
//           className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
//         >
//           <ArrowLeft className="h-5 w-5" /> Back
//         </Link>

//         <div>
//           <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-700">Building Overview</p>
//           <h1 className="mb-2 text-3xl font-black text-blue-950 sm:text-4xl">{building.name}</h1>
//           <span className="text-sm font-semibold text-slate-500 sm:text-base">
//             Select any floor to view 4 client zones and monitoring data
//           </span>
//         </div>
//       </header>

//       <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
//         <aside className="rounded-2xl border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/10">
//           <h2 className="mb-4 text-2xl font-black text-blue-950">{building.floors} Floors</h2>

//           <div className="grid max-h-[760px] gap-2 overflow-y-auto pr-1">
//             {floors.map((floor) => (
//               <Link
//                 to={`/building/${building.id}/floor/${floor}`}
//                 className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 font-black text-blue-950 transition hover:border-blue-400 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-200"
//                 key={floor}
//               >
//                 <span>{floor}F</span>
//                 <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.14)]"></span>
//               </Link>
//             ))}
//           </div>
//         </aside>

//         <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/10">
//           <div className="mb-5">
//             <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-700">Live Systems</p>
//             <h2 className="text-2xl font-black text-blue-950">{building.name} Monitoring</h2>
//           </div>

//           <div className="grid gap-4 md:grid-cols-3">
//             <div className="rounded-2xl border border-blue-100 bg-slate-50 p-5">
//               <Fan className="mb-4 h-9 w-9 text-blue-700" />
//               <h3 className="mb-3 text-xl font-black text-blue-950">{systemSummary.ahu.title}</h3>
//               <MetricRow label="Running" value={systemSummary.ahu.running} />
//               <MetricRow label="Stopped" value={systemSummary.ahu.stopped} />
//               <MetricRow label="Temperature" value={systemSummary.ahu.temperature} />
//               <MetricRow label="Humidity" value={systemSummary.ahu.humidity} />
//             </div>

//             <div className="rounded-2xl border border-blue-100 bg-slate-50 p-5">
//               <Lightbulb className="mb-4 h-9 w-9 text-blue-700" />
//               <h3 className="mb-3 text-xl font-black text-blue-950">{systemSummary.ldb.title}</h3>
//               <MetricRow label="Lights ON" value={systemSummary.ldb.on} />
//               <MetricRow label="Lights OFF" value={systemSummary.ldb.off} />
//               <MetricRow label="Load" value={systemSummary.ldb.load} />
//             </div>

//             <div className="rounded-2xl border border-blue-100 bg-slate-50 p-5">
//               <Gauge className="mb-4 h-9 w-9 text-blue-700" />
//               <h3 className="mb-3 text-xl font-black text-blue-950">{systemSummary.ems.title}</h3>
//               <MetricRow label="kWh" value={systemSummary.ems.kwh} />
//               <MetricRow label="kW" value={systemSummary.ems.kw} />
//               <MetricRow label="PF" value={systemSummary.ems.pf} />
//               <MetricRow label="Voltage" value={systemSummary.ems.voltage} />
//               <MetricRow label="Amps" value={systemSummary.ems.amps} />
//             </div>
//           </div>
//         </section>
//       </section>
//     </main>
//   );
// }



import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Fan, Lightbulb, Gauge } from "lucide-react";
import { buildings, systemSummary } from "../data/bmsData";

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-t border-white/20 py-3 text-sm">
      <span className="font-semibold text-blue-100">{label}</span>
      <strong className="font-black text-white">{value}</strong>
    </div>
  );
}

function BluePanel({ children, className = "" }) {
  return (
    <div
      className={`border border-[#2D6BFF] bg-[#004AAD] p-5 text-white shadow-[0_10px_25px_rgba(0,74,173,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function BuildingOverview() {
  const { buildingId } = useParams();
  const building = buildings.find((item) => item.id === buildingId);

  if (!building) {
    return (
      <main className="min-h-screen bg-white px-4 py-8 text-[#0B2545]">
        <section className="mx-auto max-w-xl bg-[#004AAD] p-8 text-center text-white shadow-[0_14px_35px_rgba(0,74,173,0.25)]">
          <h2 className="text-2xl font-black text-white">Building not found</h2>
          <Link
            to="/"
            className="mt-5 inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-black text-[#004AAD]"
          >
            Back to main overview
          </Link>
        </section>
      </main>
    );
  }

  const floors = Array.from({ length: building.floors }, (_, i) => building.floors - i);

  return (
    <main className="min-h-screen bg-white px-0 py-0  text-[#0B2545]">
      <header className="sticky top-0 z-50 bg-[#004AAD] px-8 py-5 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 bg-white px-4 py-3 text-sm font-black text-[#004AAD]"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </Link>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-blue-100">
              Building Overview
            </p>
            <h1 className="mb-1 text-3xl font-black text-white sm:text-4xl">
              {building.name}
            </h1>
            <span className="text-sm font-medium text-blue-100">
              Select any floor to view 4 client zones and monitoring data
            </span>
          </div>
        </div>
      </header>

      <section className="w-full bg-white px-8 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="border border-[#2D6BFF] bg-[#004AAD] p-5 text-white shadow-[0_10px_25px_rgba(0,74,173,0.25)]">
            <h2 className="mb-4 text-2xl font-black text-white">
              {building.floors} Floors
            </h2>

            <div className="grid max-h-[760px] gap-2 overflow-y-auto pr-1">
              {floors.map((floor) => (
                <Link
                  to={`/building/${building.id}/floor/${floor}`}
                  className="flex items-center justify-between bg-white px-4 py-3 font-black text-[#004AAD] transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  key={floor}
                >
                  <span>{floor}F</span>
                  <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.14)]"></span>
                </Link>
              ))}
            </div>
          </aside>

          <section className="border border-blue-200 bg-white p-5 shadow-lg shadow-blue-100">
            <div className="mb-5 border-l-4 border-[#004AAD] bg-blue-50 px-5 py-4">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#004AAD]">
                Live Systems
              </p>
              <h2 className="text-2xl font-black text-[#003A8C]">
                {building.name} Monitoring
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <BluePanel>
                <Fan className="mb-4 h-9 w-9 text-white" />
                <h3 className="mb-3 text-xl font-black text-white">
                  {systemSummary.ahu.title}
                </h3>
                <MetricRow label="Running" value={systemSummary.ahu.running} />
                <MetricRow label="Stopped" value={systemSummary.ahu.stopped} />
                <MetricRow label="Temperature" value={systemSummary.ahu.temperature} />
                <MetricRow label="Humidity" value={systemSummary.ahu.humidity} />
              </BluePanel>

              <BluePanel>
                <Lightbulb className="mb-4 h-9 w-9 text-white" />
                <h3 className="mb-3 text-xl font-black text-white">
                  {systemSummary.ldb.title}
                </h3>
                <MetricRow label="Lights ON" value={systemSummary.ldb.on} />
                <MetricRow label="Lights OFF" value={systemSummary.ldb.off} />
                <MetricRow label="Load" value={systemSummary.ldb.load} />
              </BluePanel>

              <BluePanel>
                <Gauge className="mb-4 h-9 w-9 text-white" />
                <h3 className="mb-3 text-xl font-black text-white">
                  {systemSummary.ems.title}
                </h3>
                <MetricRow label="kWh" value={systemSummary.ems.kwh} />
                <MetricRow label="kW" value={systemSummary.ems.kw} />
                <MetricRow label="PF" value={systemSummary.ems.pf} />
                <MetricRow label="Voltage" value={systemSummary.ems.voltage} />
                <MetricRow label="Amps" value={systemSummary.ems.amps} />
              </BluePanel>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
