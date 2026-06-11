// import { Zap } from "lucide-react";
// import { Link } from "react-router-dom";
// export default function MainOverview() {
//   const outgoing = [
//     { name: "OG-1", transformer: "TF-1" },
//     { name: "OG-2", transformer: "TF-2" },
//     { name: "OG-3", transformer: "TF-3" },
//     { name: "OG-4", transformer: "TF-4" },
//     { name: "OG-5", transformer: "TF-5" },
//     { name: "OG-6", transformer: "TF-6" },
//   ];

//   const transformers = [
//     { id: "TF-1", oilTemp: "54°C", windingTemp: "61°C", buchholz: "Healthy", load: "68%" },
//     { id: "TF-2", oilTemp: "52°C", windingTemp: "59°C", buchholz: "Healthy", load: "62%" },
//     { id: "TF-3", oilTemp: "55°C", windingTemp: "60°C", buchholz: "Healthy", load: "71%" },
//     { id: "TF-4", oilTemp: "53°C", windingTemp: "58°C", buchholz: "Healthy", load: "65%" },
//     { id: "TF-5", oilTemp: "56°C", windingTemp: "63°C", buchholz: "Healthy", load: "74%" },
//     { id: "TF-6", oilTemp: "51°C", windingTemp: "57°C", buchholz: "Healthy", load: "60%" },
//   ];

//   return (
//     <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
//       <header className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10 md:flex-row md:items-center md:justify-between">
//         <div>
//           <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-700">
//             ARCOT BMS COMMAND CENTER
//           </p>
//           <h1 className="mb-2 text-3xl font-black text-blue-950 sm:text-4xl">
//             HT Panel Single Line Diagram
//           </h1>
//           <span className="text-sm font-semibold text-slate-500 sm:text-base">
//             Source-1 / Source-2 to main bus, incomer, HT bus, outgoing feeders, and transformers
//           </span>
//         </div>
//         <strong className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
//           <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.16)]"></span>
//           LIVE
//         </strong>
//       </header>

//       <section className="mx-auto max-w-7xl rounded-2xl border border-blue-100 bg-white p-4 shadow-xl shadow-blue-950/10 sm:p-6">
//         <h2 className="mb-6 text-center text-lg font-black tracking-wide text-blue-950">
//           HT PANEL FLOW
//         </h2>

//         <div className="grid gap-4 md:grid-cols-2">
//           <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center">
//             <span className="text-xs font-black uppercase tracking-widest text-blue-700">Source-1</span>
//             <div className="mt-3 rounded-xl border border-blue-200 bg-white p-5 shadow-sm">
//               <Zap className="mx-auto mb-3 h-8 w-8 text-blue-600" />
//               <h3 className="text-2xl font-black text-blue-950">11kV</h3>
//               <p className="font-bold text-emerald-600">Healthy</p>
//             </div>
//           </div>

//           <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center">
//             <span className="text-xs font-black uppercase tracking-widest text-blue-700">Source-2</span>
//             <div className="mt-3 rounded-xl border border-blue-200 bg-white p-5 shadow-sm">
//               <Zap className="mx-auto mb-3 h-8 w-8 text-blue-600" />
//               <h3 className="text-2xl font-black text-blue-950">11kV</h3>
//               <p className="font-bold text-amber-600">Standby</p>
//             </div>
//           </div>
//         </div>

//         <div className="mx-auto my-4 h-10 w-1 rounded-full bg-blue-300"></div>

//         <div className="mx-auto max-w-sm rounded-2xl border border-blue-200 bg-blue-700 p-6 text-center text-white shadow-lg shadow-blue-900/20">
//           <h3 className="text-5xl font-black">M</h3>
//           <p className="mt-1 font-semibold text-blue-100">Main Bus / Bus Coupler</p>
//         </div>

//         <div className="mx-auto my-4 h-10 w-1 rounded-full bg-blue-300"></div>

//         <div className="mx-auto max-w-sm rounded-2xl border border-blue-100 bg-slate-50 p-5 text-center shadow-sm">
//           <h3 className="text-2xl font-black text-blue-950">INCOMER</h3>
//           <p className="mt-1 font-bold text-emerald-600">VCB ON</p>
//         </div>

//         <div className="mx-auto my-4 h-10 w-1 rounded-full bg-blue-300"></div>

//         <div className="mb-5 rounded-full border border-blue-200 bg-blue-50 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.25em] text-blue-800">
//           HT BUS
//         </div>

//         <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
//           {outgoing.map((item) => (
//             <div className="rounded-xl border border-blue-100 bg-slate-50 p-4 text-center shadow-sm" key={item.name}>
//               <h3 className="text-xl font-black text-blue-950">{item.name}</h3>
//               <p className="text-sm font-semibold text-slate-500">To {item.transformer}</p>
//               <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
//                 ON
//               </span>
//             </div>
//           ))}
//         </div>

//         <p className="my-5 text-center text-sm font-bold uppercase tracking-wider text-slate-500">
//           OG-1 to OG-6 outgoing transformer feeders
//         </p>

//         <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
//           {transformers.map((tf) => (
//             <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-md shadow-blue-950/5" key={tf.id}>
//               <div className="mb-3 flex justify-center gap-2">
//                 <div className="h-12 w-5 rounded-full bg-blue-100 ring-1 ring-blue-200"></div>
//                 <div className="h-12 w-5 rounded-full bg-blue-100 ring-1 ring-blue-200"></div>
//               </div>

//               <h3 className="text-center text-xl font-black text-blue-950">{tf.id}</h3>
//               <p className="mb-3 text-center text-xs font-semibold text-slate-500">11kV / 433V Transformer</p>

//               <div className="flex justify-between border-t border-slate-100 py-2 text-xs">
//                 <span>Oil Temp</span>
//                 <strong className="text-blue-950">{tf.oilTemp}</strong>
//               </div>

//               <div className="flex justify-between border-t border-slate-100 py-2 text-xs">
//                 <span>Winding Temp</span>
//                 <strong className="text-blue-950">{tf.windingTemp}</strong>
//               </div>

//               <div className="flex justify-between border-t border-slate-100 py-2 text-xs">
//                 <span>Buchholz Relay</span>
//                 <strong className="text-emerald-600">{tf.buchholz}</strong>
//               </div>

//               <div className="flex justify-between border-t border-slate-100 py-2 text-xs">
//                 <span>Load</span>
//                 <strong className="text-blue-950">{tf.load}</strong>
//               </div>
//             </div>
//           ))}
//         </div>

        
//       </section>




// <div className="mx-auto max-w-7xl rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">


//   <div className="mx-auto mb-4 h-10 w-1 rounded-full bg-blue-300"></div>

//   <div className="mx-auto max-w-3xl rounded-2xl border border-blue-200 bg-white p-5 text-center">
//     <h3 className="text-2xl font-black text-blue-950">COMMON LT KIOSK</h3>
//     <p className="mt-1 text-sm font-semibold text-slate-500">
//       Receives 433V power from all 6 transformers
//     </p>

//     <div className="mt-4 grid grid-cols-3 gap-3">
//       <div className="rounded-xl bg-slate-50 p-3">
//         <p className="text-xs font-bold text-slate-500">Voltage</p>
//         <strong className="text-blue-950">433V</strong>
//       </div>
//       <div className="rounded-xl bg-slate-50 p-3">
//         <p className="text-xs font-bold text-slate-500">Current</p>
//         <strong className="text-blue-950">2430A</strong>
//       </div>
//       <div className="rounded-xl bg-slate-50 p-3">
//         <p className="text-xs font-bold text-slate-500">PF</p>
//         <strong className="text-blue-950">0.98</strong>
//       </div>
//     </div>
//   </div>

//   <div className="mx-auto my-4 h-10 w-1 rounded-full bg-blue-300"></div>

//   <div className="mx-auto max-w-4xl rounded-full border border-blue-200 bg-white px-5 py-3 text-center text-sm font-black uppercase tracking-widest text-blue-800">
//     COMMON LT BUSBAR
//   </div>


 

//   <div className="mx-auto my-4 h-10 w-1 rounded-full bg-blue-300"></div>

//   <div className="grid gap-5 lg:grid-cols-2">
//     <Link
//       to="/building/sky-1"
//       className="block rounded-2xl bg-blue-700 p-5 text-center text-white transition hover:-translate-y-1 hover:bg-blue-800"
//     >
//       <h3 className="text-2xl font-black">SKY-1 BUILDING</h3>
//       <p className="mt-1 font-semibold text-blue-100">20 Floors / 40 Clients</p>
//       <span className="mt-3 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-black">
//         Open Building
//       </span>
//     </Link>

//     <Link
//       to="/building/sky-2"
//       className="block rounded-2xl bg-blue-700 p-5 text-center text-white transition hover:-translate-y-1 hover:bg-blue-800"
//     >
//       <h3 className="text-2xl font-black">SKY-2 BUILDING</h3>
//       <p className="mt-1 font-semibold text-blue-100">20 Floors / 40 Clients</p>
//       <span className="mt-3 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-black">
//         Open Building
//       </span>
//     </Link>
//   </div>
// </div>
//     </main>
//   );
// }






import { Zap, Gauge, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function MainOverview() {
  const outgoing = [
    { name: "OG-1", transformer: "TF-1" },
    { name: "OG-2", transformer: "TF-2" },
    { name: "OG-3", transformer: "TF-3" },
    { name: "OG-4", transformer: "TF-4" },
    { name: "OG-5", transformer: "TF-5" },
    { name: "OG-6", transformer: "TF-6" },
  ];

  const transformers = [
    { id: "TF-1", oilTemp: "54°C", windingTemp: "61°C", buchholz: "Healthy", load: "68%" },
    { id: "TF-2", oilTemp: "52°C", windingTemp: "59°C", buchholz: "Healthy", load: "62%" },
    { id: "TF-3", oilTemp: "55°C", windingTemp: "60°C", buchholz: "Healthy", load: "71%" },
    { id: "TF-4", oilTemp: "53°C", windingTemp: "58°C", buchholz: "Healthy", load: "65%" },
    { id: "TF-5", oilTemp: "56°C", windingTemp: "63°C", buchholz: "Healthy", load: "74%" },
    { id: "TF-6", oilTemp: "51°C", windingTemp: "57°C", buchholz: "Healthy", load: "60%" },
  ];

  const FlowLine = ({ label }) => (
    <div className="relative mx-auto my-6 flex h-20 w-full max-w-5xl items-center justify-center">
      <div className="relative h-full w-[6px] overflow-hidden rounded-full bg-blue-100 shadow-inner">
        <div className="absolute inset-0 bg-[#004AAD]" />
        <div className="power-drop power-drop-1" />
        <div className="power-drop power-drop-2" />
        <div className="power-drop power-drop-3" />
      </div>

      {label && (
        <span className="absolute left-[53%] top-1/2 -translate-y-1/2 rounded-full bg-[#004AAD] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
          {label}
        </span>
      )}
    </div>
  );

  const BluePanel = ({ children, className = "" }) => (
    <div
      className={`border border-[#2D6BFF] bg-[#004AAD] p-5 text-white shadow-[0_10px_25px_rgba(0,74,173,0.25)] ${className}`}
    >
      {children}
    </div>
  );

  const BusbarBox = ({ title, voltage }) => (
    <BluePanel className="mx-auto max-w-sm text-center">
      <div className="mb-4 flex justify-center">
        <div className="relative h-4 w-44 overflow-hidden rounded-full bg-white/30">
          <div className="absolute inset-0 bg-white" />
          <div className="busbar-energy" />
        </div>
      </div>

      <h3 className="text-3xl font-extrabold text-white">{title}</h3>

      <p className="mt-2 text-sm font-semibold text-blue-100">
        Power Distribution Bus
      </p>

      <span className="mt-3 inline-block rounded-full bg-white px-4 py-1 text-xs font-bold text-[#004AAD]">
        {voltage}
      </span>
    </BluePanel>
  );

  return (
    <main className="min-h-screen bg-white px-0 py-0  text-[#0B2545]">
      <header className="sticky top-0 z-50 bg-[#004AAD] px-8 py-5 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.25em] text-blue-100">
              ARCOT BMS COMMAND CENTER
            </p>
            <h1 className="mb-1 text-1xl font-extrabold tracking-tight text-white sm:text-3xl">
              Electrical Power Flow Dashboard
            </h1>
            <span className="text-sm font-medium text-blue-100">
              Source → HT Switchgear → Transformers → LT Kiosk → LT Busbar → Buildings
            </span>
          </div>

          <strong className="inline-flex w-fit items-center gap-2 bg-white px-4 py-2 text-sm font-extrabold text-[#004AAD]">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.16)]" />
            LIVE HEALTHY
          </strong>
        </div>
      </header>

      <section className="w-full bg-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 border-l-4 border-[#004AAD] bg-blue-50 px-5 py-4">
            <h2 className="text-xl font-extrabold tracking-tight text-[#003A8C]">
              Main Electrical Single Line Overview
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              A clear visual path from utility power source to building supply.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "SOURCE-1", status: "ACTIVE SUPPLY", color: "text-emerald-200" },
              { name: "SOURCE-2", status: "STANDBY SUPPLY", color: "text-yellow-200" },
            ].map((source) => (
              <BluePanel key={source.name} className="text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-100">
                  {source.name}
                </p>
                <Zap className="mx-auto my-4 h-10 w-10 text-white" />
                <h3 className="text-4xl font-extrabold text-white">11kV</h3>
                <p className={`mt-1 font-extrabold ${source.color}`}>{source.status}</p>
              </BluePanel>
            ))}
          </div>

          <FlowLine label="source supply" />

          <div className="mx-auto max-w-lg bg-[#082B7A] p-7 text-center text-white shadow-[0_16px_36px_rgba(0,74,173,0.3)]">
            <h3 className="text-6xl font-extrabold">M</h3>
            <p className="mt-1 font-extrabold uppercase tracking-wider text-blue-100">
              Main Bus / Source Coupler
            </p>
            <p className="mt-3 text-sm font-medium text-blue-100">
              Receives available source power and forwards it to the incoming breaker.
            </p>
          </div>

          <FlowLine label="to incomer" />

          <BluePanel className="mx-auto max-w-lg text-center">
            <Gauge className="mx-auto mb-3 h-10 w-10 text-white" />
            <h3 className="text-3xl font-extrabold text-white">INCOMING VCB BREAKER</h3>
            <p className="mt-1 font-extrabold text-emerald-200">BREAKER ON</p>
            <p className="mt-2 text-sm font-medium text-blue-100">
              Main protection and control point before HT busbar.
            </p>
          </BluePanel>

          <FlowLine label="feeds ht bus" />

          <BusbarBox title="HT BUSBAR" voltage="11kV" />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {outgoing.map((item) => (
              <div key={item.name} className="text-center">
                <div className="relative mx-auto h-12 w-[4px] overflow-hidden bg-[#004AAD]">
                  <div className="power-drop power-drop-2" />
                </div>

                <BluePanel className="p-4 text-center">
                  <h3 className="text-xl font-extrabold text-white">{item.name}</h3>
                  <p className="text-sm font-medium text-blue-100">
                    Outgoing to {item.transformer}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#004AAD]">
                    ON
                  </span>
                </BluePanel>
              </div>
            ))}
          </div>

          <FlowLine label="to transformers" />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {transformers.map((tf) => (
              <BluePanel key={tf.id} className="p-4">
                <div className="mb-3 flex h-16 items-center justify-center gap-2 bg-[#082B7A]">
                  <div className="h-11 w-6 rounded-full border-4 border-double border-white/90" />
                  <div className="h-11 w-6 rounded-full border-4 border-double border-white/90" />
                </div>

                <h3 className="text-center text-2xl font-extrabold text-white">{tf.id}</h3>
                <p className="mb-3 text-center text-xs font-semibold text-blue-100">
                  Converts 11kV to 433V
                </p>

                {[
                  ["Oil Temp", tf.oilTemp],
                  ["Winding", tf.windingTemp],
                  ["Buchholz", tf.buchholz],
                  ["Load", tf.load],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-t border-white/20 py-2 text-xs">
                    <span className="font-medium text-blue-100">{label}</span>
                    <strong className={value === "Healthy" ? "text-emerald-200" : "text-white"}>
                      {value}
                    </strong>
                  </div>
                ))}
              </BluePanel>
            ))}
          </div>

          <FlowLine label="433v output" />

          <BluePanel className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-extrabold text-white">COMMON LT KIOSK</h3>
            <p className="mt-1 text-sm font-medium text-blue-100">
              Receives 433V power from all six transformers.
            </p>
            <p className="mt-3 bg-white/10 p-3 text-xs font-extrabold text-blue-100">
              Main Low Voltage Distribution Center
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Voltage", "433V"],
                ["Current", "2430A"],
                ["PF", "0.98"],
              ].map(([label, value]) => (
                <div key={label} className="border border-blue-300 bg-[#0D5CDB] p-4">
                  <p className="text-xs font-semibold uppercase text-blue-100">{label}</p>
                  <strong className="text-2xl text-white">{value}</strong>
                </div>
              ))}
            </div>
          </BluePanel>

          <FlowLine label="to lt busbar" />

          <BusbarBox title="LT BUSBAR" voltage="433V" />

          <FlowLine label="building supply" />

          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { id: "sky-1", name: "SKY-1 BUILDING" },
              { id: "sky-2", name: "SKY-2 BUILDING" },
            ].map((building) => (
              <Link
                key={building.id}
                to={`/building/${building.id}`}
                className="group flex items-center gap-6 bg-[#004AAD] p-6 text-white shadow-[0_14px_35px_rgba(0,74,173,0.25)] transition hover:-translate-y-1"
              >
                <div className="grid h-56 w-36 grid-cols-4 gap-2 bg-[#082B7A] p-4">
                  {Array.from({ length: 48 }).map((_, index) => (
                    <span
                      key={index}
                      className="bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                    />
                  ))}
                </div>

                <div>
                  <Building2 className="mb-3 h-10 w-10 text-white" />
                  <h3 className="text-3xl font-extrabold text-white">{building.name}</h3>
                  <p className="mt-2 font-semibold text-blue-100">20 Floors / 40 Clients</p>
                  <p className="mt-1 text-sm font-semibold text-blue-100">
                    AHU • LDB • EMS Monitoring
                  </p>
                  <span className="mt-4 inline-block bg-white px-4 py-2 text-sm font-bold text-[#004AAD]">
                    Open Building
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>
        {`
          .power-drop {
            position: absolute;
            left: 50%;
            width: 6px;
            height: 22px;
            transform: translateX(-50%);
            border-radius: 999px;
            background: linear-gradient(to bottom, transparent, #67e8f9, white, #67e8f9, transparent);
            box-shadow:
              0 0 12px rgba(34, 211, 238, 1),
              0 0 24px rgba(34, 211, 238, 0.8);
            animation: powerFlow 1.4s linear infinite;
          }

          .power-drop-1 {
            animation-delay: 0s;
          }

          .power-drop-2 {
            animation-delay: 0.45s;
          }

          .power-drop-3 {
            animation-delay: 0.9s;
          }

          .busbar-energy {
            position: absolute;
            top: 0;
            left: -40%;
            height: 100%;
            width: 40%;
            background: linear-gradient(90deg, transparent, #67e8f9, white, #67e8f9, transparent);
            box-shadow: 0 0 20px rgba(34, 211, 238, 1);
            animation: busbarFlow 1.6s linear infinite;
          }

          @keyframes powerFlow {
            0% {
              top: -30px;
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            100% {
              top: 100%;
              opacity: 0;
            }
          }

          @keyframes busbarFlow {
            from {
              left: -40%;
            }
            to {
              left: 100%;
            }
          }
        `}
      </style>
    </main>
  );
}