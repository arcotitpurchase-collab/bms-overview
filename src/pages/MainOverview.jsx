import React from "react";
import { Link } from "react-router-dom";
import { Zap, Gauge, Activity, Cpu, ArrowDown, ShieldAlert } from "lucide-react";

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

  // Helper component for animated vertical lines
  const VerticalConnector = ({ height = "h-12", label = "" }) => (
    <div className="flex flex-col items-center w-full">
      <div className={`flow-line-vertical ${height}`}>
        <div className="flow-pulse-vertical" />
      </div>
      {label && (
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#004AAD] mt-1">
          {label}
        </span>
      )}
    </div>
  );

  // Helper component for busbar equipment blocks
  const BusbarBlock = ({ name, voltage }) => (
    <div className="w-full max-w-4xl mx-auto my-4 busbar-glow-bg border-2 border-[#004AAD] p-4 text-center rounded shadow-lg relative">
      <div className="busbar-glow-element" />
      <div className="relative z-10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-black text-blue-200 tracking-wider">SYSTEM BUSBAR ACTIVE</span>
        </div>
        <h3 className="text-xl font-black text-white tracking-widest">{name}</h3>
        <span className="bg-[#004AAD] border border-blue-400 text-white text-xs font-extrabold px-3 py-1 rounded">
          {voltage}
        </span>
      </div>
    </div>
  );

  // Helper component for building tower UI
  const BuildingTower = ({ id, name, floors, clients }) => (
    <Link
      to={`/building/${id}`}
      className="group flex flex-col md:flex-row items-center gap-6 bg-[#081F5C] border-2 border-[#004AAD] p-6 hover-lift text-white rounded shadow-xl w-full"
    >
      {/* Tower Graphic */}
      <div className="relative w-28 h-56 bg-[#05143C] border border-blue-900 rounded-t p-2 flex flex-col justify-between overflow-hidden shadow-inner shrink-0">
        {/* Sky antenna */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#004AAD]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
        
        {/* Helipad glow */}
        <div className="h-[2px] w-full bg-[#004AAD] shadow-[0_0_10px_#00E5FF]" />

        {/* Windows layout representing 20 floors */}
        <div className="grid grid-cols-4 gap-1.5 h-44 overflow-hidden py-1">
          {Array.from({ length: 48 }).map((_, idx) => (
            <span
              key={idx}
              className="h-2 rounded-sm transition-colors duration-300 bg-white/10 group-hover:bg-[#00E5FF]/40 shadow-[0_0_2px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_4px_rgba(0,229,255,0.4)]"
            />
          ))}
        </div>

        {/* Tower Base */}
        <div className="h-2 w-full bg-[#004AAD]" />
      </div>

      {/* Info details */}
      <div className="flex-1 text-center md:text-left">
        <span className="text-[10px] font-black tracking-widest text-blue-300 uppercase">
          Digital Twin Node
        </span>
        <h3 className="text-2xl font-black text-white tracking-wide mt-1 group-hover:text-blue-200 transition-colors">
          {name}
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-left">
          <div className="bg-[#05143C] p-2 border border-blue-950">
            <span className="text-[9px] text-blue-300 font-bold block">HEIGHT</span>
            <strong className="text-sm font-extrabold">{floors} FLOORS</strong>
          </div>
          <div className="bg-[#05143C] p-2 border border-blue-950">
            <span className="text-[9px] text-blue-300 font-bold block">TENANTS</span>
            <strong className="text-sm font-extrabold">{clients} ZONES</strong>
          </div>
        </div>
        <p className="mt-3 text-xs text-blue-100 font-medium leading-relaxed">
          Click tower console to view floor blueprints and active HVAC / EMS energy telemetry.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 bg-[#004AAD] text-white text-xs font-black px-4 py-2 hover:bg-[#003b8a] transition-colors border border-blue-400">
          ENTER CONSOLE
        </span>
      </div>
    </Link>
  );

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      
      {/* SCADA Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#004AAD] p-2 rounded shadow">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
                Enterprise Building Management System
              </p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                BMS Command Control Overview
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              SCADA CONNECTED
            </span>
          </div>
        </div>
      </header>

      {/* Main Single Line Diagram Console */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <div className="bg-slate-50 border border-slate-200 p-6 md:p-10 shadow-inner rounded-lg">
          
          {/* Section Heading */}
          <div className="mb-8 border-b-2 border-slate-200 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-[#081F5C] tracking-wide uppercase">
                Electrical Mimic Single Line Diagram (SLD)
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Visualizing physical power distribution path from incoming utility feeders to end-user tenants.
              </p>
            </div>
            <strong className="text-xs bg-[#081F5C] text-white px-3 py-1 font-bold">11kV / 433V GRID</strong>
          </div>

          {/* 1. SOURCE SECTION */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Source 1 */}
            <div className="bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative">
              <div className="absolute top-2 right-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
              </div>
              <span className="text-[10px] font-black text-blue-300 tracking-wider block uppercase">POWER UTILITY SOURCE</span>
              <h3 className="text-xl font-black mt-1">SOURCE-1 (MAINGRID)</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="bg-[#05143C] p-3 border border-blue-900 rounded">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black block tracking-wide">11.0 kV</span>
                  <span className="text-xs font-bold text-emerald-400">ACTIVE FEEDER</span>
                </div>
              </div>
            </div>

            {/* Source 2 */}
            <div className="bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-lg relative opacity-90">
              <div className="absolute top-2 right-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#fbbf24]" />
              </div>
              <span className="text-[10px] font-black text-blue-300 tracking-wider block uppercase">BACKUP GENERATOR SOURCE</span>
              <h3 className="text-xl font-black mt-1">SOURCE-2 (DG STANDBY)</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="bg-[#05143C] p-3 border border-blue-900 rounded">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black block tracking-wide">11.0 kV</span>
                  <span className="text-xs font-bold text-amber-300">STANDBY MODE</span>
                </div>
              </div>
            </div>

          </div>

          <VerticalConnector height="h-14" label="Grid Infeed Lines" />

          {/* 2. MAIN BUS / SOURCE COUPLER */}
          <div className="max-w-xl mx-auto bg-[#081F5C] border-2 border-[#004AAD] p-5 text-center text-white shadow-md relative">
            <span className="text-[9px] font-black tracking-widest text-blue-200 uppercase block">BUS COUPLING CONSOLE</span>
            <div className="flex justify-center items-center gap-4 my-2">
              <div className="h-1.5 w-16 bg-[#004AAD] relative overflow-hidden">
                <div className="flow-pulse-horizontal" />
              </div>
              <div className="bg-[#05143C] border border-blue-800 p-2.5 rounded-full font-black text-sm tracking-widest px-4">
                M
              </div>
              <div className="h-1.5 w-16 bg-[#004AAD] relative overflow-hidden">
                <div className="flow-pulse-horizontal animate-delay-300" />
              </div>
            </div>
            <h4 className="text-md font-black tracking-wider text-white">MAIN BUS / SOURCE COUPLER</h4>
            <p className="text-xs text-blue-200 mt-1 font-medium">Automatic transfer switch active between grid input lines</p>
          </div>

          <VerticalConnector height="h-10" />

          {/* 3. INCOMING VCB BREAKER */}
          <div className="max-w-xl mx-auto bg-[#004AAD] border-2 border-blue-400 p-5 text-center text-white shadow-md">
            <span className="text-[9px] font-black tracking-widest text-blue-100 uppercase block">SAFETY INTERLOCK SWITCH</span>
            <div className="flex items-center justify-center gap-2 my-2 text-emerald-400">
              <Activity className="h-5 w-5 animate-pulse" />
              <strong className="text-lg font-black tracking-widest">INCOMING VCB BREAKER</strong>
            </div>
            <span className="inline-block bg-[#081F5C] text-emerald-400 border border-blue-900 text-xs font-black px-4 py-1.5 uppercase">
              BREAKER STATUS: ON
            </span>
          </div>

          <VerticalConnector height="h-12" label="Switchgear Feeder Bus" />

          {/* 4. HT BUSBAR (EQUIPMENT BLOCK) */}
          <BusbarBlock name="HT BUSBAR (11kV SWG)" voltage="11kV" />

          {/* Connectors to Outgoing Feeders */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-6 h-10 px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-center h-full">
                <div className="flow-line-vertical h-full">
                  <div className="flow-pulse-vertical" />
                </div>
              </div>
            ))}
          </div>

          {/* 5. OUTGOING FEEDERS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 max-w-5xl mx-auto">
            {outgoing.map((item) => (
              <div
                key={item.name}
                className="bg-[#081F5C] border border-[#004AAD] p-4 text-center text-white shadow"
              >
                <span className="text-[9px] font-bold text-blue-300 block">FEEDER</span>
                <strong className="text-lg font-black block tracking-wider mt-1">{item.name}</strong>
                <p className="text-[10px] text-blue-100 font-bold mt-1">To {item.transformer}</p>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                  <span className="text-xs font-black">ON</span>
                </div>
              </div>
            ))}
          </div>

          {/* Connectors to Transformers */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-6 h-12 px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-center h-full">
                <div className="flow-line-vertical h-full">
                  <div className="flow-pulse-vertical" />
                </div>
              </div>
            ))}
          </div>

          {/* 6. TRANSFORMERS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 max-w-6xl mx-auto">
            {transformers.map((tf) => (
              <div
                key={tf.id}
                className="bg-[#081F5C] border-2 border-[#004AAD] p-4 text-white shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* SCADA Transformer coils visual */}
                  <div className="mb-3 flex justify-center items-center">
                    <svg className="w-14 h-8 text-blue-300" viewBox="0 0 60 30" fill="none">
                      <circle cx="20" cy="15" r="12" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="40" cy="15" r="12" stroke="currentColor" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <strong className="text-lg font-black block text-center tracking-widest">{tf.id}</strong>
                  <span className="text-[9px] font-bold text-blue-300 text-center block uppercase">11kV / 433V TX</span>
                </div>

                <div className="mt-4 space-y-2 border-t border-blue-900 pt-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-blue-200">Oil Temp:</span>
                    <span className="font-extrabold text-white">{tf.oilTemp}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-blue-200">Wind Temp:</span>
                    <span className="font-extrabold text-white">{tf.windingTemp}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-blue-200">Relay:</span>
                    <span className="font-extrabold text-emerald-400">{tf.buchholz}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-blue-200">Load:</span>
                    <span className="font-extrabold text-white">{tf.load}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connectors to LT Kiosk */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-6 h-14 px-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-center h-full">
                <div className="flow-line-vertical h-full">
                  <div className="flow-pulse-vertical" />
                </div>
              </div>
            ))}
          </div>

          {/* 7. COMMON LT KIOSK */}
          <div className="max-w-4xl mx-auto bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-xl">
            <div className="text-center">
              <span className="text-[10px] font-black text-blue-300 tracking-wider block uppercase">STEP-DOWN COMBINER PANEL</span>
              <h3 className="text-2xl font-black tracking-widest text-white mt-1">COMMON LT KIOSK</h3>
              <p className="text-xs text-blue-200 mt-1 font-semibold">Collects stepped-down 433V lines from all 6 transformers</p>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-blue-900 pt-4">
              <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
                <span className="text-[10px] text-blue-200 block font-bold">BUSBAR VOLTAGE</span>
                <strong className="text-2xl font-black text-white block mt-1">433 V</strong>
              </div>
              <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
                <span className="text-[10px] text-blue-200 block font-bold">TOTAL CURRENT</span>
                <strong className="text-2xl font-black text-white block mt-1">2430 A</strong>
              </div>
              <div className="bg-[#05143C] border border-blue-900 p-4 text-center">
                <span className="text-[10px] text-blue-200 block font-bold">POWER FACTOR (PF)</span>
                <strong className="text-2xl font-black text-white block mt-1">0.98</strong>
              </div>
            </div>
          </div>

          <VerticalConnector height="h-10" />

          {/* 8. LT BUSBAR */}
          <BusbarBlock name="COMMON LT BUSBAR (433V)" voltage="433V" />

          <VerticalConnector height="h-14" label="Building Distribution Lines" />

          {/* 9. SKY-1 / SKY-2 BUILDINGS */}
          <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
            <BuildingTower id="sky-1" name="SKY-1 BUILDING" floors={20} clients={40} />
            <BuildingTower id="sky-2" name="SKY-2 BUILDING" floors={20} clients={40} />
          </div>

        </div>
      </section>

      {/* Footer System Diagnostics */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><ShieldAlert className="w-4 h-4 text-emerald-600" /> System Integrity: 100%</span>
            <span>Refreshed: Live Telemetry</span>
          </div>
        </div>
      </footer>
      
    </main>
  );
}