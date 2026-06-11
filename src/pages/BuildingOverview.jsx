import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Fan, Lightbulb, Gauge, Cpu, Activity } from "lucide-react";
import { buildings, systemSummary } from "../data/bmsData";

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-blue-900/30 py-3 text-sm">
      <span className="font-semibold text-blue-200">{label}</span>
      <strong className="font-extrabold text-white text-base">{value}</strong>
    </div>
  );
}

function SystemConsolePanel({ title, icon: Icon, children }) {
  return (
    <div className="bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
      {/* Decorative metal panel top line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#004AAD]" />
      
      <div>
        <div className="flex items-center gap-3 mb-5 border-b border-blue-900/50 pb-3">
          <div className="bg-[#05143C] p-2 border border-[#004AAD] rounded text-[#00E5FF]">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-black tracking-widest uppercase">{title}</h3>
        </div>
        <div className="space-y-1">
          {children}
        </div>
      </div>
      
      <div className="mt-6 border-t border-blue-900/40 pt-3 flex items-center justify-between">
        <span className="text-[9px] font-bold text-blue-300 uppercase">TELEM STATUS</span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ONLINE
        </span>
      </div>
    </div>
  );
}

export default function BuildingOverview() {
  const { buildingId } = useParams();
  const building = buildings.find((item) => item.id === buildingId);

  if (!building) {
    return (
      <main className="min-h-screen bg-white px-6 py-10 flex flex-col justify-center items-center">
        <div className="bg-[#081F5C] border-2 border-[#004AAD] p-8 text-center text-white max-w-md shadow-2xl rounded">
          <h2 className="text-2xl font-black mb-2">Building Console Offline</h2>
          <p className="text-xs text-blue-200 mb-6">Requested building identifier is not registered in the SCADA configuration.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#004AAD] border border-blue-400 text-white font-black text-sm px-6 py-2.5 hover:bg-[#003b8a] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> BACK TO COMMAND CENTER
          </Link>
        </div>
      </main>
    );
  }

  const floors = Array.from({ length: building.floors }, (_, i) => building.floors - i);

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2.5 text-xs font-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> BACK
            </Link>
            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
                SCADA Digital Twin Consoles
              </p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                {building.name} Overview
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              BUILDING HEALTHY
            </span>
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          
          {/* Left Column: Skyscraper Stack */}
          <div className="flex flex-col">
            <div className="bg-[#081F5C] border-2 border-[#004AAD] p-5 text-white shadow-lg flex flex-col h-[780px] overflow-hidden">
              
              {/* Helipad design */}
              <div className="text-center pb-3 border-b border-blue-900/60 shrink-0">
                <span className="text-[9px] font-black tracking-widest text-blue-300 uppercase">Physical Stack Console</span>
                <h2 className="text-lg font-black tracking-wider mt-1">{building.floors} LEVELS REGISTERED</h2>
              </div>
              
              {/* Scrollable vertical building slices */}
              <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-2">
                {floors.map((floor) => (
                  <Link
                    key={floor}
                    to={`/building/${building.id}/floor/${floor}`}
                    className="flex items-center justify-between bg-[#05143C] border border-blue-900 p-3 hover-lift text-white group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#004AAD] flex items-center justify-center font-extrabold text-xs text-white border border-blue-400 shrink-0">
                        {floor}F
                      </div>
                      <div>
                        <span className="text-[9px] text-blue-300 font-bold block uppercase">FLOOR UNIT</span>
                        <strong className="text-sm font-extrabold tracking-wide">Level {floor}</strong>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">HEALTHY</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Building Ground Base decoration */}
              <div className="mt-4 pt-3 border-t border-blue-900/60 shrink-0 text-center text-xs text-blue-300 font-semibold uppercase tracking-wider">
                Ground Terminal Base
              </div>

            </div>
          </div>

          {/* Right Column: Building-Wide Metrics console */}
          <div className="flex flex-col space-y-6">
            
            {/* Context Heading */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg">
              <span className="text-[10px] font-black text-[#004AAD] tracking-widest uppercase">System Telemetry Dashboard</span>
              <h2 className="text-xl font-black tracking-wide text-[#081F5C] uppercase mt-1">
                {building.name} Real-time System Consoles
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Aggregate real-time metrics showing overall operational health, ambient metrics, and energy demands of {building.name}.
              </p>
            </div>

            {/* Instrument Panels Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              
              {/* HVAC console */}
              <SystemConsolePanel title={systemSummary.ahu.title} icon={Fan}>
                <MetricRow label="Running AHUs" value={`${systemSummary.ahu.running} Units`} />
                <MetricRow label="Stopped AHUs" value={`${systemSummary.ahu.stopped} Units`} />
                <MetricRow label="Avg Temperature" value={systemSummary.ahu.temperature} />
                <MetricRow label="Avg Humidity" value={systemSummary.ahu.humidity} />
              </SystemConsolePanel>

              {/* Lighting console */}
              <SystemConsolePanel title={systemSummary.ldb.title} icon={Lightbulb}>
                <MetricRow label="Lights Active" value={`${systemSummary.ldb.on} zones`} />
                <MetricRow label="Lights Inactive" value={`${systemSummary.ldb.off} zones`} />
                <MetricRow label="Lighting Load Factor" value={systemSummary.ldb.load} />
              </SystemConsolePanel>

              {/* Energy Monitor console */}
              <SystemConsolePanel title={systemSummary.ems.title} icon={Gauge}>
                <MetricRow label="Energy Used (kWh)" value={systemSummary.ems.kwh} />
                <MetricRow label="Current Demand" value={`${systemSummary.ems.kw} kW`} />
                <MetricRow label="Power Factor (PF)" value={systemSummary.ems.pf} />
                <MetricRow label="Voltage Supply" value={systemSummary.ems.voltage} />
                <MetricRow label="Amperage Draw" value={systemSummary.ems.amps} />
              </SystemConsolePanel>

            </div>

            {/* Guide Info */}
            <div className="bg-[#05143C] border-l-4 border-[#004AAD] p-5 text-white">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#00E5FF]" /> INSTRUCTION
              </h4>
              <p className="text-xs text-blue-200 mt-2 leading-relaxed">
                Click any floor level panel in the left skyscraper column to drill down. You can check the sub-distribution breakers, individual tenant zones, client loads, comfort levels, and power quality.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer System Diagnostics */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Telemetry Online</span>
          </div>
        </div>
      </footer>
      
    </main>
  );
}
