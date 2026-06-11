// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Fan, Lightbulb, Gauge, Thermometer, Zap } from "lucide-react";
// import { clients } from "../data/bmsData";

// function MetricRow({ label, value, tone = "default" }) {
//   const valueClass = tone === "healthy" ? "text-emerald-600" : "text-blue-950";

//   return (
//     <div className="flex items-center justify-between border-t border-slate-100 py-3 text-sm">
//       <span className="font-semibold text-slate-500">{label}</span>
//       <strong className={`font-black ${valueClass}`}>{value}</strong>
//     </div>
//   );
// }

// export default function ClientOverview() {
//   const { buildingId, floorId, clientId } = useParams();
//   const clientName = clients[Number(clientId) - 1] || "Client";

//   return (
//     <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
//       <header className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10 md:flex-row md:items-center">
//         <Link
//           to={`/building/${buildingId}/floor/${floorId}`}
//           className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
//         >
//           <ArrowLeft className="h-5 w-5" /> Back
//         </Link>

//         <div>
//           <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-700">Client Monitoring</p>
//           <h1 className="mb-2 text-3xl font-black text-blue-950 sm:text-4xl">{clientName}</h1>
//           <span className="text-sm font-semibold text-slate-500 sm:text-base">
//             {buildingId.toUpperCase()} / Floor {floorId}
//           </span>
//         </div>
//       </header>

//       <section className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 rounded-2xl bg-blue-700 p-6 text-white shadow-xl shadow-blue-950/20 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-100">Current Status</p>
//           <h2 className="text-2xl font-black">All Systems Healthy</h2>
//         </div>
//         <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-black text-blue-700">
//           LIVE
//         </span>
//       </section>

//       <section className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
//         <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10">
//           <Fan className="mb-4 h-10 w-10 text-blue-700" />
//           <h3 className="mb-3 text-xl font-black text-blue-950">AHU / Chillers</h3>
//           <MetricRow label="AHU-1" value="Running" tone="healthy" />
//           <MetricRow label="AHU-2" value="Running" tone="healthy" />
//           <MetricRow label="Supply Temp" value="22°C" />
//           <MetricRow label="Humidity" value="48%" />
//         </div>

//         <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10">
//           <Lightbulb className="mb-4 h-10 w-10 text-blue-700" />
//           <h3 className="mb-3 text-xl font-black text-blue-950">LDB / Lighting</h3>
//           <MetricRow label="Zone A" value="ON" />
//           <MetricRow label="Zone B" value="ON" />
//           <MetricRow label="Zone C" value="OFF" />
//           <MetricRow label="Lighting Load" value="64%" />
//         </div>

//         <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10">
//           <Gauge className="mb-4 h-10 w-10 text-blue-700" />
//           <h3 className="mb-3 text-xl font-black text-blue-950">EMS / Energy</h3>
//           <MetricRow label="kWh" value="2,430" />
//           <MetricRow label="kW" value="128" />
//           <MetricRow label="PF" value="0.96" />
//           <MetricRow label="Voltage" value="415V" />
//           <MetricRow label="Current" value="186A" />
//         </div>

//         <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10">
//           <Thermometer className="mb-4 h-10 w-10 text-blue-700" />
//           <h3 className="mb-3 text-xl font-black text-blue-950">Comfort Status</h3>
//           <MetricRow label="Room Temp" value="23°C" />
//           <MetricRow label="CO₂" value="620 ppm" />
//           <MetricRow label="Air Quality" value="Good" tone="healthy" />
//         </div>

//         <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10">
//           <Zap className="mb-4 h-10 w-10 text-blue-700" />
//           <h3 className="mb-3 text-xl font-black text-blue-950">Power Quality</h3>
//           <MetricRow label="Frequency" value="50 Hz" />
//           <MetricRow label="Demand" value="142 kVA" />
//           <MetricRow label="Alarm" value="None" tone="healthy" />
//         </div>
//       </section>
//     </main>
//   );
// }




import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Fan, Lightbulb, Gauge, Thermometer, Zap } from "lucide-react";
import { clients } from "../data/bmsData";

function MetricRow({ label, value, tone = "default" }) {
  const valueClass = tone === "healthy" ? "text-cyan-200" : "text-white";

  return (
    <div className="flex items-center justify-between border-t border-white/20 py-3 text-sm">
      <span className="font-medium text-blue-100">{label}</span>
      <strong className={`font-black ${valueClass}`}>{value}</strong>
    </div>
  );
}

function BluePanel({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden border border-blue-800/30 bg-gradient-to-br from-[#082B7A] via-[#004AAD] to-[#0B5ED7] p-6 text-white shadow-[0_20px_45px_rgba(0,74,173,0.35)] ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,1)]" />
      {children}
    </div>
  );
}

export default function ClientOverview() {
  const { buildingId, floorId, clientId } = useParams();
  const clientName = clients[Number(clientId) - 1] || "Client";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f4f9ff] via-white to-[#eef6ff] px-0 py-0 text-[#0B2545]">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#081F5C] via-[#004AAD] to-[#2563EB] px-8 py-5 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center">
          <Link
            to={`/building/${buildingId}/floor/${floorId}`}
            className="inline-flex w-fit items-center gap-2 bg-white px-4 py-3 text-sm font-black text-[#004AAD]"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </Link>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-blue-100">
              Client Monitoring
            </p>
            <h1 className="mb-1 text-3xl font-black text-white sm:text-4xl">
              {clientName}
            </h1>
            <span className="text-sm font-medium text-blue-100">
              {buildingId.toUpperCase()} / Floor {floorId}
            </span>
          </div>
        </div>
      </header>

      <section className="w-full px-8 py-8">
        <div className="mx-auto max-w-7xl">
          <section className="mb-6 bg-gradient-to-r from-[#081F5C] via-[#004AAD] to-[#2563EB] p-6 text-white shadow-[0_14px_35px_rgba(0,74,173,0.25)] sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-blue-100">
                Current Status
              </p>
              <h2 className="text-2xl font-black text-white">All Systems Healthy</h2>
            </div>
            <span className="mt-4 inline-flex w-fit bg-cyan-300 px-4 py-2 text-sm font-black text-[#081F5C] shadow-[0_0_18px_rgba(34,211,238,0.8)] sm:mt-0">
              LIVE
            </span>
          </section>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <BluePanel>
              <Fan className="mb-4 h-10 w-10 text-cyan-200" />
              <h3 className="mb-3 text-xl font-black text-white">AHU / Chillers</h3>
              <MetricRow label="AHU-1" value="Running" tone="healthy" />
              <MetricRow label="AHU-2" value="Running" tone="healthy" />
              <MetricRow label="Supply Temp" value="22°C" />
              <MetricRow label="Humidity" value="48%" />
            </BluePanel>

            <BluePanel>
              <Lightbulb className="mb-4 h-10 w-10 text-cyan-200" />
              <h3 className="mb-3 text-xl font-black text-white">LDB / Lighting</h3>
              <MetricRow label="Zone A" value="ON" />
              <MetricRow label="Zone B" value="ON" />
              <MetricRow label="Zone C" value="OFF" />
              <MetricRow label="Lighting Load" value="64%" />
            </BluePanel>

            <BluePanel>
              <Gauge className="mb-4 h-10 w-10 text-cyan-200" />
              <h3 className="mb-3 text-xl font-black text-white">EMS / Energy</h3>
              <MetricRow label="kWh" value="2,430" />
              <MetricRow label="kW" value="128" />
              <MetricRow label="PF" value="0.96" />
              <MetricRow label="Voltage" value="415V" />
              <MetricRow label="Current" value="186A" />
            </BluePanel>

            <BluePanel>
              <Thermometer className="mb-4 h-10 w-10 text-cyan-200" />
              <h3 className="mb-3 text-xl font-black text-white">Comfort Status</h3>
              <MetricRow label="Room Temp" value="23°C" />
              <MetricRow label="CO₂" value="620 ppm" />
              <MetricRow label="Air Quality" value="Good" tone="healthy" />
            </BluePanel>

            <BluePanel>
              <Zap className="mb-4 h-10 w-10 text-cyan-200" />
              <h3 className="mb-3 text-xl font-black text-white">Power Quality</h3>
              <MetricRow label="Frequency" value="50 Hz" />
              <MetricRow label="Demand" value="142 kVA" />
              <MetricRow label="Alarm" value="None" tone="healthy" />
            </BluePanel>
          </section>
        </div>
      </section>
    </main>
  );
}