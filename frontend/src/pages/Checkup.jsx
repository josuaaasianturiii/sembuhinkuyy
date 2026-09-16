import React, { useState, useEffect } from 'react';
import BodyMap, { DEFAULT_BODY_ZONES } from '../components/BodyMap';
import SymptomSelector from '../components/SymptomSelector';
import { fetchSymptoms, submitDiagnosis } from '../services/api';

// Icons
function ChevronRight({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronLeft({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function HeartIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CheckCircleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ActivityIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function NoteIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function SparkleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function InfoIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function RefreshIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.2" />
    </svg>
  );
}

// Severity Levels Configuration
const DURATION_OPTIONS = ["Hari ini saja", "1–2 hari", "3–5 hari", "1 minggu", "2–4 minggu", "Lebih dari sebulan"];
const SEV_CFG = {
  ringan: { label: "Ringan", color: "#059669", bg: "#D1FAE5", desc: "Masih bisa beraktivitas normal", bar: 1 },
  sedang: { label: "Sedang", color: "#D97706", bg: "#FEF3C7", desc: "Sedikit mengganggu aktivitas", bar: 2 },
  berat: { label: "Berat", color: "#F43F5E", bg: "#FFE4E6", desc: "Sangat mengganggu / tidak tertahankan", bar: 3 },
};

function SeveritySlider({ value = "ringan", onChange }) {
  const levels = ["ringan", "sedang", "berat"];
  const cur = SEV_CFG[value] || SEV_CFG.ringan;
  return (
    <div>
      <div className="relative h-2 rounded-full mb-3" style={{ backgroundColor: "#E2E8F0" }}>
        <div
          className="absolute left-0 top-0 h-2 rounded-full transition-all duration-300"
          style={{
            width: value === "ringan" ? "33%" : value === "sedang" ? "66%" : "100%",
            backgroundColor: cur.color,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md transition-all duration-300"
          style={{
            left: value === "ringan" ? "calc(33% - 10px)" : value === "sedang" ? "calc(66% - 10px)" : "calc(100% - 10px)",
            backgroundColor: cur.color,
          }}
        />
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={levels.indexOf(value)}
          onChange={(e) => onChange(levels[+e.target.value])}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between mb-2">
        {levels.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            className="text-xs font-700 transition-colors focus:outline-none"
            style={{ color: value === l ? SEV_CFG[l].color : "#CBD5E1" }}
          >
            {SEV_CFG[l].label}
          </button>
        ))}
      </div>
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-600"
        style={{ backgroundColor: cur.bg, color: cur.color }}
      >
        <div className="flex gap-0.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-3 rounded-full"
              style={{ backgroundColor: i <= cur.bar ? cur.color : cur.color + "30" }}
            />
          ))}
        </div>
        {cur.desc}
      </div>
    </div>
  );
}

/**
 * Checkup Main Flow Page Component
 * @param {Object} props
 * @param {() => void} props.onBackToHome
 * @param {(resultData: any, entries: any) => void} props.onCompleteDiagnosis
 */
export default function Checkup({ onBackToHome, onCompleteDiagnosis }) {
  const [subStep, setSubStep] = useState("bodymap"); // 'bodymap' | 'detail'
  const [bodyZones, setBodyZones] = useState(DEFAULT_BODY_ZONES);
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [selectedSymptomsMap, setSelectedSymptomsMap] = useState(new Map());
  const [symptomEntries, setSymptomEntries] = useState([]);
  const [expandedEntryId, setExpandedEntryId] = useState(null);

  // Async States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch body zones from backend on mount
  useEffect(() => {
    let isMounted = true;
    fetchSymptoms()
      .then((data) => {
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setBodyZones(data);
        }
      })
      .catch((err) => {
        console.warn('Backend symptoms fetch failed, using default body zones.', err);
      });
    return () => { isMounted = false; };
  }, []);

  const selectedZoneIds = new Set(selectedSymptomsMap.keys());
  const totalSelectedCount = [...selectedSymptomsMap.values()].reduce((sum, set) => sum + set.size, 0);

  // Toggle symptom selection
  const handleToggleSymptom = (zoneId, symptomName) => {
    setSelectedSymptomsMap((prevMap) => {
      const nextMap = new Map(prevMap);
      const set = new Set(nextMap.get(zoneId) || []);
      if (set.has(symptomName)) {
        set.delete(symptomName);
      } else {
        set.add(symptomName);
      }

      if (set.size > 0) {
        nextMap.set(zoneId, set);
      } else {
        nextMap.delete(zoneId);
      }
      return nextMap;
    });
  };

  // Move from BodyMap step to Detail step
  const handleProceedToDetail = () => {
    const builtEntries = [];
    selectedSymptomsMap.forEach((symptomsSet, zoneId) => {
      const zone = bodyZones.find((z) => z.id === zoneId) || DEFAULT_BODY_ZONES.find((z) => z.id === zoneId);
      symptomsSet.forEach((symptomLabel) => {
        builtEntries.push({
          id: `${zoneId}-${symptomLabel}`,
          label: symptomLabel,
          zone: zone ? zone.label : zoneId,
          zoneColor: zone ? zone.color : "#0D9488",
          zoneEmoji: zone ? zone.emoji : "🩺",
          duration: "1–2 hari", // Default initial duration
          severity: "ringan", // Default initial severity
          notes: "",
        });
      });
    });

    setSymptomEntries(builtEntries);
    if (builtEntries.length > 0) {
      setExpandedEntryId(builtEntries[0].id);
    }
    setSubStep("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Update symptom entry attributes (duration, severity, notes)
  const handleUpdateEntry = (id, patch) => {
    setSymptomEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  // Submit Diagnosis to API backend
  const handleSubmitDiagnosis = async () => {
    if (symptomEntries.length === 0) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const resultData = await submitDiagnosis(symptomEntries);
      setIsLoading(false);
      onCompleteDiagnosis(resultData, symptomEntries);
    } catch (err) {
      setIsLoading(false);
      setErrorMsg(err.message || "Gagal menghubungkan ke server API. Harap periksa jaringan.");
    }
  };

  const activeZoneData = activeZoneId
    ? bodyZones.find((z) => z.id === activeZoneId) || DEFAULT_BODY_ZONES.find((z) => z.id === activeZoneId)
    : null;

  const activeSelectedSet = activeZoneId ? (selectedSymptomsMap.get(activeZoneId) || new Set()) : new Set();

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center flex flex-col items-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full border-4 border-teal-100 border-t-[#0D9488] animate-spin mb-4" />
            <h3 className="text-lg font-800 text-slate-800 mb-2">Menganalisis Gejala...</h3>
            <p className="text-xs text-slate-400">
              Sistem backend sedang mencocokkan keluhanmu dengan database medis.
            </p>
          </div>
        </div>
      )}

      {/* SubStep 1: Body Map Selection */}
      {subStep === "bodymap" && (
        <div className="flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6 flex flex-col gap-4 flex-1">
            <div>
              <h1 className="text-xl md:text-2xl font-800" style={{ color: "#1E293B" }}>
                Pilih Area Tubuh yang Terasa Tidak Nyaman
              </h1>
              <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
                Sentuh area pada gambar untuk memilih gejala yang relevan.
              </p>
            </div>

            <div className="flex-1 grid lg:grid-cols-[400px_1fr] gap-5">
              {/* Left Column: Interactive Body Map SVG */}
              <div
                className="bg-white rounded-3xl flex flex-col"
                style={{ boxShadow: "0 2px 16px rgba(13,148,136,0.08)" }}
              >
                <div className="flex-1 flex items-center justify-center px-4 pt-4 min-h-[360px]">
                  <BodyMap
                    activeZone={activeZoneId}
                    selectedZones={selectedZoneIds}
                    onZoneClick={(id) => setActiveZoneId((prev) => (prev === id ? null : id))}
                    bodyZones={bodyZones}
                  />
                </div>
                <div
                  className="mx-4 mb-3 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
                  style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
                >
                  <InfoIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <p className="text-xs text-slate-400">
                    {activeZoneId
                      ? `Area ${activeZoneData?.label} dipilih — pilih gejala di panel kanan`
                      : "Ketuk area tubuh yang terasa tidak nyaman"}
                  </p>
                </div>
              </div>

              {/* Right Column: Symptom Selector Component */}
              <div className="flex flex-col gap-3">
                {!activeZoneId ? (
                  <div
                    className="flex-1 bg-white rounded-3xl flex flex-col items-center justify-center p-10 text-center min-h-[300px]"
                    style={{ boxShadow: "0 2px 16px rgba(13,148,136,0.08)" }}
                  >
                    <div
                      className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: "#CCFBF1" }}
                    >
                      <HeartIcon className="w-8 h-8 text-[#0D9488]" />
                    </div>
                    <h3 className="text-base font-700 mb-2" style={{ color: "#1E293B" }}>
                      Pilih Area Tubuh
                    </h3>
                    <p className="text-sm leading-relaxed max-w-xs text-slate-400">
                      Klik salah satu bagian tubuh pada gambar untuk melihat daftar gejala yang dapat kamu pilih.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {bodyZones.slice(0, 5).map((z) => (
                        <button
                          key={z.id}
                          type="button"
                          onClick={() => setActiveZoneId(z.id)}
                          className="px-3.5 py-2 rounded-full text-xs font-600 border-2 transition-all hover:scale-105 active:scale-95"
                          style={{
                            borderColor: (z.color || '#0D9488') + "60",
                            color: z.color || '#0D9488',
                            backgroundColor: z.colorMuted || '#CCFBF1',
                          }}
                        >
                          {z.emoji} {z.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <SymptomSelector
                    activeZoneData={activeZoneData}
                    selectedSymptoms={activeSelectedSet}
                    onToggleSymptom={(symLabel) => handleToggleSymptom(activeZoneId, symLabel)}
                  />
                )}
              </div>
            </div>

            {/* Bottom Bar: Selected Symptoms Summary Pills */}
            {totalSelectedCount > 0 && (
              <div
                className="bg-white rounded-2xl px-5 py-3 flex flex-wrap items-center gap-3"
                style={{ border: "1px solid #CCFBF1" }}
              >
                <span className="text-xs font-700 uppercase text-slate-400">Dipilih ({totalSelectedCount}):</span>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {[...selectedSymptomsMap.entries()].flatMap(([zid, syms]) => {
                    const z = bodyZones.find((bz) => bz.id === zid) || DEFAULT_BODY_ZONES.find((bz) => bz.id === zid);
                    return [...syms].map((s) => (
                      <span
                        key={`${zid}-${s}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-600 text-white"
                        style={{ backgroundColor: z?.color || "#0D9488" }}
                      >
                        {z?.emoji} {s}
                        <button
                          type="button"
                          onClick={() => handleToggleSymptom(zid, s)}
                          className="hover:opacity-70 ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ));
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Navigation Footer */}
          <div
            className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200"
            style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBackToHome}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-600 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>
              <button
                type="button"
                onClick={handleProceedToDetail}
                disabled={totalSelectedCount === 0}
                className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-700 text-white transition-all active:scale-95"
                style={{
                  background: totalSelectedCount > 0 ? "linear-gradient(135deg,#0D9488,#14B8A6)" : "#E2E8F0",
                  color: totalSelectedCount > 0 ? "white" : "#94A3B8",
                  boxShadow: totalSelectedCount > 0 ? "0 4px 16px rgba(13,148,136,0.35)" : "none",
                  cursor: totalSelectedCount > 0 ? "pointer" : "not-allowed",
                }}
              >
                Lanjutkan <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SubStep 2: Symptom Detail Configuration */}
      {subStep === "detail" && (
        <div className="flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6 flex flex-col gap-4 flex-1">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-rose-800 text-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangleIcon className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSubmitDiagnosis}
                  className="px-3 py-1.5 bg-rose-600 text-white text-xs font-700 rounded-full hover:bg-rose-700"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
              <div className="flex flex-col gap-4">
                {/* Header Card */}
                <div className="bg-white rounded-3xl p-6" style={{ boxShadow: "0 2px 12px rgba(13,148,136,0.07)" }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-xl font-800 mb-1" style={{ color: "#1E293B" }}>
                        Detail Gejala Kamu
                      </h1>
                      <p className="text-sm text-slate-400">
                        Lengkapi durasi dan tingkat keparahan agar analisis backend lebih akurat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Symptom Config Cards */}
                {symptomEntries.map((entry, i) => {
                  const sev = SEV_CFG[entry.severity] || SEV_CFG.ringan;
                  const isExpanded = expandedEntryId === entry.id;

                  return (
                    <div
                      key={entry.id}
                      className="bg-white rounded-3xl overflow-hidden transition-all duration-300"
                      style={{
                        boxShadow: isExpanded
                          ? "0 8px 32px rgba(13,148,136,0.12)"
                          : "0 2px 12px rgba(13,148,136,0.06)",
                        border: isExpanded ? `2px solid ${entry.zoneColor}22` : "2px solid transparent",
                      }}
                    >
                      <div className="flex items-center gap-4 p-5">
                        <button
                          type="button"
                          onClick={() => setExpandedEntryId(isExpanded ? null : entry.id)}
                          className="flex items-center gap-4 flex-1 min-w-0 text-left focus:outline-none"
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-800 flex-shrink-0"
                            style={{ backgroundColor: entry.zoneColor, color: "white" }}
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <span className="text-sm font-700" style={{ color: "#1E293B" }}>
                                {entry.label}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-600"
                                style={{ backgroundColor: entry.zoneColor + "18", color: entry.zoneColor }}
                              >
                                {entry.zoneEmoji} {entry.zone}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <ClockIcon className="w-3 h-3" /> {entry.duration}
                              </span>
                              <span>·</span>
                              <span className="font-600" style={{ color: sev.color }}>
                                {sev.label}
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="px-5 pb-6 space-y-6 border-t border-slate-100 pt-5">
                          {/* Duration Selector */}
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <ClockIcon className="w-4 h-4 text-[#0D9488]" />
                              <p className="text-sm font-700" style={{ color: "#1E293B" }}>
                                Sudah berapa lama?
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {DURATION_OPTIONS.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => handleUpdateEntry(entry.id, { duration: opt })}
                                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-600 border-2 transition-all active:scale-95"
                                  style={{
                                    backgroundColor: entry.duration === opt ? "#0D9488" : "#F8FAFC",
                                    borderColor: entry.duration === opt ? "#0D9488" : "#E2E8F0",
                                    color: entry.duration === opt ? "white" : "#475569",
                                  }}
                                >
                                  {entry.duration === opt && <CheckCircleIcon className="w-3.5 h-3.5" />}
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Severity Slider */}
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <ActivityIcon className="w-4 h-4 text-[#0D9488]" />
                              <p className="text-sm font-700" style={{ color: "#1E293B" }}>
                                Seberapa parah?
                              </p>
                            </div>
                            <SeveritySlider
                              value={entry.severity}
                              onChange={(v) => handleUpdateEntry(entry.id, { severity: v })}
                            />
                          </div>

                          {/* Optional Notes */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <NoteIcon className="w-4 h-4 text-[#0D9488]" />
                              <p className="text-sm font-700" style={{ color: "#1E293B" }}>
                                Catatan <span className="font-400 text-slate-400">(opsional)</span>
                              </p>
                            </div>
                            <textarea
                              rows={2}
                              value={entry.notes}
                              onChange={(e) => handleUpdateEntry(entry.id, { notes: e.target.value })}
                              placeholder={`cth. "${entry.label} terasa semakin memburuk pada malam hari..."`}
                              className="w-full px-4 py-3 text-sm rounded-2xl border-2 resize-none focus:outline-none focus:border-[#0D9488] placeholder-slate-300 transition-all text-slate-800 border-slate-200"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Summary */}
              <div className="lg:sticky lg:top-20 lg:self-start flex flex-col gap-4">
                <div
                  className="bg-white rounded-3xl overflow-hidden"
                  style={{ boxShadow: "0 4px 24px rgba(13,148,136,0.1)" }}
                >
                  <div className="p-5 border-b border-slate-100">
                    <h3 className="text-sm font-800" style={{ color: "#1E293B" }}>
                      Ringkasan Keluhan
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {symptomEntries.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: e.zoneColor }}
                        >
                          <CheckCircleIcon className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-700" style={{ color: "#1E293B" }}>
                            {e.label}
                          </p>
                          <div className="flex gap-1.5 mt-0.5 text-xs text-slate-400">
                            <span>{e.duration}</span>
                            <span>·</span>
                            <span className="font-600" style={{ color: SEV_CFG[e.severity]?.color }}>
                              {SEV_CFG[e.severity]?.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitDiagnosis}
                  className="hidden lg:flex w-full items-center justify-center gap-2.5 py-4 rounded-full text-sm font-700 text-white transition-all active:scale-95 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg,#0D9488,#14B8A6)",
                    boxShadow: "0 6px 24px rgba(13,148,136,0.38)",
                  }}
                >
                  <SparkleIcon className="w-4 h-4" /> Analisis Keluhan <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div
            className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200"
            style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSubStep("bodymap")}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-600 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>
              <button
                type="button"
                onClick={handleSubmitDiagnosis}
                className="flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-700 text-white transition-all active:scale-95 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#0D9488,#14B8A6)",
                  boxShadow: "0 4px 16px rgba(13,148,136,0.38)",
                }}
              >
                <SparkleIcon className="w-4 h-4" /> Analisis Keluhan <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
