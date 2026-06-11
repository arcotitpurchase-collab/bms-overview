import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Fan, Lightbulb, Gauge, Thermometer, Zap, Cpu, CheckCircle } from "lucide-react";
import { clients } from "../data/bmsData";

function MetricRow({ label, value, tone = "default" }) {
  const valueClass = tone === "healthy" ? "text-emerald-400" : "text-white";

  return (
    <div className="flex items-center justify-between border-b border-blue-900/30 py-3 text-sm">
      <span className="font-semibold text-blue-200">{label}</span>
      <strong className={`font-extrabold ${valueClass} text-base`}>{value}</strong>
    </div>
  );
}

function InstrumentPanel({ title, icon: Icon, children }) {
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
        <span className="text-[9px] font-bold text-blue-300 uppercase">FEEDER TELEMETRY</span>
        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ONLINE
        </span>
      </div>
    </div>
  );
}

export default function ClientOverview() {
  const { buildingId, floorId, clientId } = useParams();
  const clientName = clients[Number(clientId) - 1] || "Client";

  return (
    <main className="min-h-screen bg-white text-[#081F5C] flex flex-col font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#081F5C] border-b-4 border-[#004AAD] px-6 py-4 text-white shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/building/${buildingId}/floor/${floorId}`}
              className="inline-flex items-center gap-2 bg-[#004AAD] hover:bg-[#003b8a] text-white border border-blue-400 px-4 py-2.5 text-xs font-black transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> BACK
            </Link>
            <div>
              <p className="text-[9px] font-black tracking-[0.3em] text-blue-300 uppercase">
                SCADA Client Console
              </p>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                {clientName}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#05143C] border border-[#004AAD] px-3.5 py-1.5 text-xs font-extrabold tracking-wider text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              {buildingId.toUpperCase()} - LEVEL {floorId}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        
        {/* Status Banner */}
        <div className="bg-[#081F5C] border-2 border-[#004AAD] p-6 text-white shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#05143C] p-3 border border-blue-900 rounded-full text-emerald-400">
              <CheckCircle className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] font-black text-blue-300 tracking-wider block uppercase">SYSTEM INTEGRITY LOG</span>
              <h2 className="text-2xl font-black mt-0.5">All Subsystems Operational</h2>
            </div>
          </div>
          <span className="bg-[#004AAD] border border-blue-400 text-white text-xs font-black px-4 py-2 tracking-widest uppercase inline-block text-center shadow">
            LIVE FEEDS
          </span>
        </div>

        {/* 5 Instrument Panels Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* AHU / Chillers */}
          <InstrumentPanel title="AHU / Chillers" icon={Fan}>
            <MetricRow label="AHU-1 State" value="Running" tone="healthy" />
            <MetricRow label="AHU-2 State" value="Running" tone="healthy" />
            <MetricRow label="Chilled Water Supply Temp" value="22°C" />
            <MetricRow label="Return Loop Humidity" value="48%" />
          </InstrumentPanel>

          {/* LDB / Lighting */}
          <InstrumentPanel title="LDB / Lighting" icon={Lightbulb}>
            <MetricRow label="Lighting Zone A" value="ON" />
            <MetricRow label="Lighting Zone B" value="ON" />
            <MetricRow label="Lighting Zone C" value="OFF" />
            <MetricRow label="Lighting Board Load" value="64%" />
          </InstrumentPanel>

          {/* EMS / Energy */}
          <InstrumentPanel title="EMS / Energy" icon={Gauge}>
            <MetricRow label="Active Energy Draw" value="2,430 kWh" />
            <MetricRow label="Real-time Demand" value="128 kW" />
            <MetricRow label="Current Power Factor" value="0.96" />
            <MetricRow label="Bus Voltage Supply" value="415 V" />
            <MetricRow label="Average Current Draw" value="186 A" />
          </InstrumentPanel>

          {/* Comfort Status */}
          <InstrumentPanel title="Comfort Status" icon={Thermometer}>
            <MetricRow label="Ambient Room Temp" value="23°C" />
            <MetricRow label="CO₂ Concentration" value="620 ppm" />
            <MetricRow label="Air Quality Index (AQI)" value="Good" tone="healthy" />
          </InstrumentPanel>

          {/* Power Quality */}
          <InstrumentPanel title="Power Quality" icon={Zap}>
            <MetricRow label="Grid Frequency" value="50 Hz" />
            <MetricRow label="Apparent Demand" value="142 kVA" />
            <MetricRow label="System Fault Alarm" value="None" tone="healthy" />
          </InstrumentPanel>

        </div>

        {/* Diagnostics helper info */}
        <div className="mt-8 bg-[#05143C] border-l-4 border-[#004AAD] p-5 text-white">
          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#00E5FF]" /> SCADA INSTRUMENTS DIAGNOSTIC
          </h4>
          <p className="text-xs text-blue-200 mt-2 leading-relaxed">
            Telemetry is polled continuously. This panel displays localized electrical distribution data specifically isolated to the {clientName} console grid. Report anomalies directly to the facility command desk.
          </p>
        </div>

      </section>

      {/* Footer System Diagnostics */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6 px-6 text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 font-semibold">
          <p>© 2026 Arcot Industries. All systems operational.</p>
          <div className="flex items-center gap-2 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Telemetry Calibrated</span>
          </div>
        </div>
      </footer>
      
    </main>
  );
}