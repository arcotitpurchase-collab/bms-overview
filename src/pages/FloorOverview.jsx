import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Activity, Cpu } from "lucide-react";
import { clients } from "../data/bmsData";

export default function FloorOverview() {
  const { buildingId, floorId } = useParams();

  const floorNumber = Number(floorId);
  const startIndex = (floorNumber - 1) * 4;
  const floorClients = clients.slice(startIndex, startIndex + 4);

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/building/${buildingId}`}
              className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2.5 text-xs font-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> BACK
            </Link>
            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
                SCADA Floor Consoles
              </p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                {buildingId.toUpperCase()} - Floor {floorId}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              FLOOR ACTIVE
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        
        {/* Info Banner */}
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg mb-8">
          <span className="text-[10px] font-black text-[#004AAD] tracking-widest uppercase">Distribution Blueprint</span>
          <h2 className="text-xl font-black tracking-wide text-[#081F5C] uppercase mt-1">
            Floor {floorId} Tenant Distribution
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            Active electricity draw and subsystem logs mapped for the 4 tenant client zones on this floor.
          </p>
        </div>

        {/* 4 Client Zones Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {floorClients.map((client, index) => {
            const clientPowerKwh = 120 + index * 18;
            return (
              <Link
                key={client}
                to={`/building/${buildingId}/floor/${floorId}/client/${index + 1}`}
                className="group bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white hover-lift rounded shadow-lg relative flex flex-col justify-between"
              >
                {/* Visual panel header line */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-[#004AAD]" />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#05143C] p-2 border border-blue-900 rounded text-blue-200">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <span className="text-[9px] font-black text-[#00E5FF] tracking-wider uppercase bg-[#05143C] border border-blue-900 px-2 py-0.5">
                      ZONE {index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-black tracking-wide group-hover:text-blue-200 transition-colors mb-4">
                    {client}
                  </h3>

                  <div className="space-y-2 border-t border-blue-900/40 pt-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-blue-200 font-semibold">AHU / HVAC:</span>
                      <span className="font-extrabold text-emerald-400">Running</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-blue-200 font-semibold">Lighting Board:</span>
                      <span className="font-extrabold text-white">ON</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-blue-200 font-semibold">Power Load:</span>
                      <span className="font-extrabold text-white">{clientPowerKwh} kW</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-blue-900/40 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <Activity className="h-4 w-4" />
                    Healthy
                  </div>
                  <span className="text-[9px] font-black bg-[#004AAD] text-white px-2 py-1 border border-blue-400">
                    DIAGNOSTICS
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Console helper */}
        <div className="mt-8 bg-[#05143C] border-l-4 border-[#004AAD] p-5 text-white">
          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#00E5FF]" /> TECHNICAL MANUAL
          </h4>
          <p className="text-xs text-blue-200 mt-2 leading-relaxed">
            Selecting any of the tenant consoles above will open the specific zone telemetry drawer, revealing detailed logs on frequency, peak demand, room temperature, CO₂ parts-per-million, and energy performance metrics.
          </p>
        </div>

      </section>

      {/* Footer System Diagnostics */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Zone Feeders Connected</span>
          </div>
        </div>
      </footer>
      
    </main>
  );
}