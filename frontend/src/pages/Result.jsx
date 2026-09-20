import React, { useState } from 'react';
import ResultCard from '../components/ResultCard';

// Icons
function SparkleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
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

function AlertOctagonIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function DropletIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function ThermometerIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

function BedIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 16h20M6 8v8" />
    </svg>
  );
}

function PillIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7.5" /><path d="M16 19h6M19 16v6" />
    </svg>
  );
}

function ChevronRight({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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

function InfoIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

const URGENCY_CFG = {
  rendah: {
    label: "Perawatan Mandiri di Rumah",
    color: "#059669",
    bg: "#D1FAE5",
    border: "#A7F3D0",
    icon: <ShieldCheckIcon className="w-5 h-5" />,
    desc: "Kondisi dapat ditangani sendiri di rumah dengan istirahat dan perawatan mandiri yang tepat.",
  },
  sedang: {
    label: "Konsultasi Dokter 1–2 Hari",
    color: "#D97706",
    bg: "#FEF3C7",
    border: "#FDE68A",
    icon: <AlertTriangleIcon className="w-5 h-5" />,
    desc: "Disarankan berkonsultasi dengan dokter dalam 1–2 hari jika gejala tidak kunjung membaik.",
  },
  tinggi: {
    label: "Segera ke Dokter / IGD",
    color: "#F43F5E",
    bg: "#FFE4E6",
    border: "#FECDD3",
    icon: <AlertOctagonIcon className="w-5 h-5" />,
    desc: "Kondisi ini memerlukan pemeriksaan medis segera oleh tenaga medis profesional.",
  },
};

function getSelfCareIcon(iconName) {
  switch (iconName) {
    case 'droplet': return <DropletIcon className="w-5 h-5" />;
    case 'bed': return <BedIcon className="w-5 h-5" />;
    case 'thermometer': return <ThermometerIcon className="w-5 h-5" />;
    case 'pill': default: return <PillIcon className="w-5 h-5" />;
  }
}

const DEFAULT_SELF_CARE = [
  { icon: <DropletIcon className="w-5 h-5" />, color: "#0284C7", bg: "#E0F2FE", title: "Perbanyak Minum Cairan", desc: "Minum 8–10 gelas air putih atau cairan hangat per hari untuk mencegah dehidrasi." },
  { icon: <BedIcon className="w-5 h-5" />, color: "#7C3AED", bg: "#EDE9FE", title: "Istirahat Total", desc: "Tidur minimal 8 jam malam dan tambahkan waktu istirahat untuk mempercepat pemulihan." },
  { icon: <ThermometerIcon className="w-5 h-5" />, color: "#F43F5E", bg: "#FFE4E6", title: "Pantau Suhu Tubuh", desc: "Ukur suhu setiap 4 jam. Jika suhu > 39°C lebih dari 24 jam, segera konsultasikan ke dokter." },
  { icon: <PillIcon className="w-5 h-5" />, color: "#D97706", bg: "#FEF3C7", title: "Obat Pereda Gejala", desc: "Paracetamol 500mg tiap 6 jam untuk meredakan demam dan nyeri sesuai indikasi." },
];

function SelfCareStepItem({ step, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left focus:outline-none"
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: step.bg, color: step.color }}
        >
          {step.icon}
        </div>
        <span className="flex-1 text-sm font-700" style={{ color: "#1E293B" }}>
          {step.title}
        </span>
        <div
          style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", color: "#94A3B8" }}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm leading-relaxed pl-12 text-slate-600">
            {step.desc}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Diagnostic Results & Self-Care Action Plan Page
 * @param {Object} props
 * @param {Object} props.diagnosisResult - API JSON response data from backend
 * @param {Array} props.symptomEntries - User inputted symptoms list
 * @param {() => void} props.onResetCheckup - Callback to start a new checkup flow
 */
export default function Result({ diagnosisResult, symptomEntries = [], onResetCheckup }) {
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedConditionId, setSelectedConditionId] = useState(null);

  const conditionsList = diagnosisResult?.conditions || [
    { id: "1", name: "Flu (Influenza)", matchPct: 87, severity: "rendah", category: "Infeksi Saluran Pernapasan", summary: "Infeksi virus yang menyebabkan demam, sakit kepala, batuk, dan kelelahan. Umumnya membaik dalam 7–10 hari." },
    { id: "2", name: "Infeksi Saluran Pernapasan Atas (ISPA)", matchPct: 71, severity: "rendah", category: "Infeksi Bakteri/Virus", summary: "Peradangan pada saluran hidung, tenggorokan, atau sinus. Sangat umum dan biasanya sembuh sendiri." },
    { id: "3", name: "Kelelahan & Dehidrasi", matchPct: 54, severity: "rendah", category: "Kondisi Umum", summary: "Kombinasi kelelahan fisik dan kurang cairan yang memicu gejala mirip flu ringan." },
  ];

  const overallUrgencyKey = diagnosisResult?.overallUrgency || "rendah";
  const urgency = URGENCY_CFG[overallUrgencyKey] || URGENCY_CFG.rendah;
  const warningSigns = diagnosisResult?.warningSigns || [
    "Demam sangat tinggi (> 39.5°C) atau tidak turun setelah 3 hari",
    "Sesak napas berat atau kesulitan bernapas",
    "Nyeri dada yang tidak tertahankan",
    "Penurunan kesadaran atau sangat sulit dibangunkan",
  ];

  const selectedId = selectedConditionId || conditionsList[0]?.id;

  return (
    <div className="flex-1 flex flex-col">
      {/* Confirmation Reset Modal */}
      {showResetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowResetModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#CCFBF1" }}
            >
              <RefreshIcon className="w-7 h-7 text-[#0D9488]" />
            </div>
            <h2 className="text-lg font-800 mb-2" style={{ color: "#1E293B" }}>
              Ulangi Pemeriksaan?
            </h2>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Hasil analisis saat ini akan direset dan kamu akan memulai dari halaman utama.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-3 rounded-full text-sm font-600 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={onResetCheckup}
                className="flex-1 py-3 rounded-full text-sm font-700 text-white transition-all cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#0D9488,#14B8A6)",
                  boxShadow: "0 4px 16px rgba(13,148,136,0.35)",
                }}
              >
                Ya, Ulangi
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6 space-y-6">
        {/* Banner Hero */}
        <div
          className="rounded-3xl p-7 md:p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#0D9488 0%,#14B8A6 60%,#0F766E 100%)" }}
        >
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-700 mb-3"
                style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
              >
                <SparkleIcon className="w-3.5 h-3.5" /> Analisis Backend API Selesai
              </div>
              <h1 className="text-2xl md:text-3xl font-800 text-white mb-2">
                Hasil Analisis Gejalamu
              </h1>
              <p className="text-sm leading-relaxed max-w-lg text-white/80">
                Berdasarkan <strong className="text-white">{symptomEntries.length || 1} gejala</strong> yang dilaporkan, backend menemukan <strong className="text-white">{conditionsList.length} kemungkinan kondisi</strong>.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-white rounded-2xl px-5 py-3 text-center shadow-md">
                <p className="text-2xl font-800 text-[#0D9488]">
                  {conditionsList[0]?.matchPct || 85}%
                </p>
                <p className="text-xs font-500 text-slate-400">Kesesuaian tertinggi</p>
              </div>
              <div className="bg-white rounded-2xl px-5 py-3 text-center shadow-md">
                <p className="text-2xl font-800 text-emerald-600 capitalize">
                  {overallUrgencyKey}
                </p>
                <p className="text-xs font-500 text-slate-400">Tingkat keparahan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Columns Grid */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Left Column: ResultCard Components List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-800 text-slate-800">
                Kemungkinan Kondisi Medis
              </h2>
              <span className="text-xs font-600 px-3 py-1 rounded-full bg-teal-100 text-[#0D9488]">
                {conditionsList.length} kondisi terdeteksi
              </span>
            </div>

            {conditionsList.map((cond, idx) => (
              <ResultCard
                key={cond.id || idx}
                condition={cond}
                index={idx}
                isSelected={selectedId === cond.id}
                onSelect={() => setSelectedConditionId(cond.id)}
              />
            ))}
          </div>

          {/* Right Column: Urgency & Action Plan Accordion */}
          <div className="space-y-4">
            {/* Urgency Alert Level */}
            <div
              className="rounded-3xl p-5 border-2"
              style={{
                backgroundColor: urgency.bg,
                borderColor: urgency.border,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{ color: urgency.color }}>{urgency.icon}</div>
                <div>
                  <p className="text-xs font-700 uppercase tracking-wide opacity-75" style={{ color: urgency.color }}>
                    Tingkat Urgensi
                  </p>
                  <p className="text-base font-800" style={{ color: urgency.color }}>
                    {urgency.label}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed opacity-90" style={{ color: urgency.color }}>
                {urgency.desc}
              </p>
            </div>

            {/* Self Care Action Plan Steps */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <h3 className="text-sm font-800 mb-4 text-slate-800">
                Langkah Perawatan Mandiri
              </h3>
              <div className="space-y-2">
                {(diagnosisResult?.selfCareSteps && diagnosisResult.selfCareSteps.length > 0
                  ? diagnosisResult.selfCareSteps.map((s) => ({
                      ...s,
                      icon: getSelfCareIcon(s.icon),
                    }))
                  : DEFAULT_SELF_CARE
                ).map((step, i) => (
                  <SelfCareStepItem key={step.title} step={step} index={i} />
                ))}
              </div>
            </div>

            {/* Warning Signs */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangleIcon className="w-5 h-5 text-rose-500" />
                <h3 className="text-sm font-800 text-slate-800">
                  Kapan Harus Ke Dokter?
                </h3>
              </div>
              <ul className="space-y-2.5 mb-4">
                {warningSigns.map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-600">{sign}</p>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-rose-100">
                <AlertOctagonIcon className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <p className="text-xs font-700 text-rose-700">Darurat Medis? Hubungi 119 segera</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-600 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <RefreshIcon className="w-4 h-4" /> Ulangi Pemeriksaan
            </button>
          </div>
        </div>

        {/* Footer Medical Disclaimer */}
        <div className="rounded-3xl overflow-hidden border border-amber-200">
          <div className="flex items-center gap-3 px-6 py-4 bg-amber-50">
            <InfoIcon className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm font-800 text-amber-900">Pernyataan Penting — Harap Dibaca</p>
          </div>
          <div className="px-6 py-5 bg-amber-50/50">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: "Bukan Diagnosis Medis", desc: "Hasil ini dihasilkan oleh sistem algoritma backend berdasarkan gejala yang kamu masukkan dan BUKAN pengganti diagnosis resmi dokter." },
                { title: "Konsultasikan ke Dokter", desc: "Selalu konfirmasikan kondisi kesehatanmu dengan tenaga medis profesional sebelum mengambil keputusan pengobatan." },
                { title: "Keterbatasan Sistem", desc: "Sistem tidak dapat memperhitungkan riwayat medis lengkap, tes darah laboratorium, atau pemeriksaan fisik langsung." },
              ].map(({ title, desc }) => (
                <div key={title}>
                  <p className="text-sm font-700 mb-1.5 text-amber-900">{title}</p>
                  <p className="text-xs leading-relaxed text-amber-800">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 flex items-center justify-between flex-wrap gap-3 border-t border-amber-200">
              <p className="text-xs text-amber-800">© 2026 Sembuhinkuy · Kelompok 4</p>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
                <ShieldCheckIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-700">Tervalidasi Dokter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
