import React from 'react';

function CrossHeartIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <rect x="12" y="4" width="8" height="24" rx="4" fill="currentColor" />
      <rect x="4" y="12" width="24" height="8" rx="4" fill="currentColor" />
      <circle cx="16" cy="22" r="3" fill="white" opacity="0.4" />
      <circle cx="13" cy="14" r="1.5" fill="white" opacity="0.6" />
      <circle cx="19" cy="14" r="1.5" fill="white" opacity="0.6" />
      <path d="M13 17.5 Q16 20 19 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
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

function SparkleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
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

/**
 * Home Landing Page component
 * @param {Object} props
 * @param {() => void} props.onStart - Callback to navigate to Checkup page
 */
export default function Home({ onStart }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
        {/* Decorative ambient background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #0D9488, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #14B8A6, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-xl">
          {/* Logo Brand Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: "#0D9488",
                boxShadow: "0 8px 24px rgba(13,148,136,0.35)",
              }}
            >
              <CrossHeartIcon className="w-9 h-9 text-white" />
            </div>
            <span className="text-3xl font-800" style={{ color: "#1E293B" }}>
              <span style={{ color: "#0D9488" }}>Sembuhin</span>kuy
            </span>
          </div>

          {/* Tagline Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-700 mb-6"
            style={{ backgroundColor: "#CCFBF1", color: "#0D9488" }}
          >
            <SparkleIcon className="w-3.5 h-3.5" />
            Panduan kesehatan awal yang cepat & akurat
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl font-800 leading-tight mb-5" style={{ color: "#1E293B" }}>
            Lagi ngerasa <span style={{ color: "#0D9488" }}>kurang enak badan</span>?{" "}
            <span style={{ color: "#0D9488" }}>Cek gejalanya</span> di sini dulu yuk.
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: "#475569" }}>
            Dapatkan gambaran awal kondisi kesehatanmu dalam hitungan menit — beserta tips perawatan mandiri yang bisa langsung kamu terapkan di rumah.
          </p>

          {/* CTA Button */}
          <button
            onClick={onStart}
            type="button"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-700 text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
              boxShadow: "0 6px 24px rgba(13,148,136,0.4)",
            }}
          >
            <HeartIcon className="w-5 h-5" />
            Mulai Cek Keluhan Sekarang
          </button>

          {/* Statistics Grid */}
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            {[
              { value: "1.2 Juta+", label: "Pengguna aktif" },
              { value: "94.7%", label: "Akurasi analisis" },
              { value: "< 2 Menit", label: "Hasil cepat" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl font-800" style={{ color: "#0D9488" }}>{value}</p>
                <p className="text-xs font-500 text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Bottom Banner */}
      <div style={{ backgroundColor: "#FEF3DD", borderTop: "1px solid #FDE8C0" }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-start gap-3">
          <InfoIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
          <p className="text-xs leading-relaxed text-amber-900">
            Sembuhinkuy memberikan <strong>panduan awal</strong> berdasarkan gejala yang kamu masukkan. Hasil ini <strong>bukan pengganti diagnosis dokter</strong>. Untuk kondisi darurat medis, hubungi <strong>119</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
