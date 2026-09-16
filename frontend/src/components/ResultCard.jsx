import React from 'react';

function StarIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

function CheckCircleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/**
 * ResultCard component representing a single matched health condition
 * @param {Object} props
 * @param {Object} props.condition - Condition data (name, category, matchPct, severity, summary, symptoms)
 * @param {number} props.index - Rank position index
 * @param {boolean} props.isSelected - Whether card is currently selected
 * @param {() => void} props.onSelect - Selection click handler
 */
export default function ResultCard({ condition, index = 0, isSelected = false, onSelect }) {
  if (!condition) return null;

  const { name, category, matchPct, severity, summary } = condition;

  const sevColor = severity === "rendah" ? "#059669" : severity === "sedang" ? "#D97706" : "#F43F5E";
  const sevBg = severity === "rendah" ? "#D1FAE5" : severity === "sedang" ? "#FEF3C7" : "#FFE4E6";
  const sevLabel = severity === "rendah" ? "Risiko Rendah" : severity === "sedang" ? "Risiko Sedang" : "Perlu Perhatian";
  const barColor = matchPct >= 70 ? "#0D9488" : matchPct >= 50 ? "#D97706" : "#94A3B8";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left bg-white rounded-3xl p-5 transition-all duration-300 focus:outline-none"
      style={{
        boxShadow: isSelected
          ? "0 8px 32px rgba(13,148,136,0.18)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        border: isSelected ? "2px solid #0D9488" : "2px solid transparent",
        transform: isSelected ? "translateY(-1px)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-800 flex-shrink-0"
            style={{
              backgroundColor: index === 0 ? "#0D9488" : "#F1F5F9",
              color: index === 0 ? "white" : "#94A3B8",
            }}
          >
            {index === 0 ? <StarIcon className="w-4 h-4" /> : index + 1}
          </div>
          <div>
            <p className="text-sm font-800" style={{ color: "#1E293B" }}>
              {name}
            </p>
            <p className="text-xs" style={{ color: "#94A3B8" }}>
              {category}
            </p>
          </div>
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-700 flex-shrink-0"
          style={{ backgroundColor: sevBg, color: sevColor }}
        >
          {sevLabel}
        </span>
      </div>

      {/* Match Score Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-600" style={{ color: "#94A3B8" }}>
            Kesesuaian Gejala
          </span>
          {index === 0 && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-700"
              style={{ backgroundColor: "#CCFBF1", color: "#0D9488" }}
            >
              <SparkleIcon className="w-3 h-3" />
              Paling Cocok
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F1F5F9" }}>
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${matchPct}%`, backgroundColor: barColor }}
            />
          </div>
          <span className="text-sm font-800 w-10 text-right" style={{ color: barColor }}>
            {matchPct}%
          </span>
        </div>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>
        {summary}
      </p>

      {isSelected && (
        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #CCFBF1" }}>
          <CheckCircleIcon className="w-4 h-4 text-[#0D9488]" />
          <span className="text-xs font-700" style={{ color: "#0D9488" }}>
            Menampilkan rekomendasi untuk kondisi ini
          </span>
        </div>
      )}
    </button>
  );
}
