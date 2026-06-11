// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Building2, Activity } from "lucide-react";
// import { clients } from "../data/bmsData";

// export default function FloorOverview() {
//   const { buildingId, floorId } = useParams();

//   return (
//     <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
//       <header className="mx-auto mb-6 flex max-w-7xl flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10 md:flex-row md:items-center">
//         <Link
//           to={`/building/${buildingId}`}
//           className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-black text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
//         >
//           <ArrowLeft className="h-5 w-5" /> Back
//         </Link>

//         <div>
//           <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-700">Floor Overview</p>
//           <h1 className="mb-2 text-3xl font-black text-blue-950 sm:text-4xl">
//             {buildingId.toUpperCase()} - Floor {floorId}
//           </h1>
//           <span className="text-sm font-semibold text-slate-500 sm:text-base">4 client zones monitoring</span>
//         </div>
//       </header>

//       <section className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
//         {clients.map((client, index) => (
//           <Link
//             to={`/building/${buildingId}/floor/${floorId}/client/${index + 1}`}
//             className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/10 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-blue-950/20 focus:outline-none focus:ring-4 focus:ring-blue-200"
//             key={client}
//           >
//             <Building2 className="mb-4 h-10 w-10 text-blue-700" />
//             <h3 className="mb-5 text-2xl font-black text-blue-950">{client}</h3>

//             <div className="flex items-center justify-between border-t border-slate-100 py-3 text-sm">
//               <span className="font-semibold text-slate-500">AHU</span>
//               <strong className="font-black text-emerald-600">Running</strong>
//             </div>

//             <div className="flex items-center justify-between border-t border-slate-100 py-3 text-sm">
//               <span className="font-semibold text-slate-500">Lighting</span>
//               <strong className="font-black text-blue-950">ON</strong>
//             </div>

//             <div className="flex items-center justify-between border-t border-slate-100 py-3 text-sm">
//               <span className="font-semibold text-slate-500">Power</span>
//               <strong className="font-black text-blue-950">{120 + index * 18} kW</strong>
//             </div>

//             <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 ring-1 ring-emerald-200">
//               <Activity className="h-4 w-4" />
//               Healthy
//             </div>
//           </Link>
//         ))}
//       </section>
//     </main>
//   );
// }




import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Activity } from "lucide-react";
import { clients } from "../data/bmsData";

export default function FloorOverview() {
  const { buildingId, floorId } = useParams();

  const floorNumber = Number(floorId);
  const startIndex = (floorNumber - 1) * 4;
  const floorClients = clients.slice(startIndex, startIndex + 4);

  return (
    <main className="min-h-screen bg-white px-0 py-0 text-[#0B2545]">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#081F5C] to-[#004AAD] px-8 py-5 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center">
          <Link
            to={`/building/${buildingId}`}
            className="inline-flex w-fit items-center gap-2 bg-white px-4 py-3 text-sm font-black text-[#004AAD]"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Link>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-white/80">
              Floor Overview
            </p>

            <h1 className="mb-1 text-3xl font-black text-white sm:text-4xl">
              {buildingId.toUpperCase()} - Floor {floorId}
            </h1>

            <span className="text-sm font-medium text-white/80">
              4 Client Zones Monitoring
            </span>
          </div>
        </div>
      </header>

      <section className="w-full bg-white px-8 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 border-l-4 border-[#004AAD] bg-white px-5 py-4 shadow-[0_8px_25px_rgba(0,74,173,0.12)]">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-[#004AAD]">
              Active Client Zones
            </p>

            <h2 className="text-2xl font-black text-[#081F5C]">
              Floor {floorId} Monitoring Dashboard
            </h2>
          </div>

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {floorClients.map((client, index) => {
              const cardColor = index % 2 === 0 ? "bg-[#081F5C]" : "bg-[#004AAD]";

              return (
                <Link
                  key={client}
                  to={`/building/${buildingId}/floor/${floorId}/client/${index + 1}`}
                  className={`${cardColor} relative overflow-hidden p-6 text-white shadow-[0_18px_45px_rgba(0,74,173,0.28)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,74,173,0.4)]`}
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-white/70" />

                  <Building2 className="mb-4 h-10 w-10 text-white" />

                  <h3 className="mb-5 text-2xl font-black text-white">
                    {client}
                  </h3>

                  <div className="flex items-center justify-between border-t border-white/20 py-3 text-sm">
                    <span className="font-medium text-white/80">AHU</span>
                    <strong className="font-black text-white">Running</strong>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/20 py-3 text-sm">
                    <span className="font-medium text-white/80">Lighting</span>
                    <strong className="font-black text-white">ON</strong>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/20 py-3 text-sm">
                    <span className="font-medium text-white/80">Power</span>
                    <strong className="font-black text-white">
                      {120 + index * 18} kW
                    </strong>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 bg-white px-4 py-2 text-sm font-black text-[#004AAD]">
                    <Activity className="h-4 w-4" />
                    Healthy
                  </div>
                </Link>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}