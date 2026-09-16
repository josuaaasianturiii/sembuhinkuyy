import React, { useState } from 'react';

function SearchIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * SymptomSelector component rendering list of checkbox/button symptoms
 * @param {Object} props
 * @param {Object} props.activeZoneData - Zone metadata object (label, emoji, symptoms, description, color, etc.)
 * @param {Set<string>} props.selectedSymptoms - Currently selected symptom strings for this zone
 * @param {(symptom: string) => void} props.onToggleSymptom - Callback when toggling symptom check state
 */
export default function SymptomSelector({ activeZoneData, selectedSymptoms = new Set(), onToggleSymptom }) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!activeZoneData) {
    return null;
  }

  const symptomsList = activeZoneData.symptoms || [];
  const filteredSymptoms = symptomsList.filter((sym) =>
    !searchQuery || sym.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3.5">
      {/* Zone Header Banner */}
      <div
        className="bg-white rounded-3xl p-4 flex items-center gap-3 shadow-sm transition-all"
        style={{
          boxShadow: "0 2px 12px rgba(13,148,136,0.08)",
          borderLeft: `4px solid ${activeZoneData.color || '#0D9488'}`,
        }}
      >
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: activeZoneData.colorMuted || '#CCFBF1' }}
        >
          {activeZoneData.emoji || '🩺'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-sm font-800" style={{ color: "#1E293B" }}>
              {activeZoneData.label}
            </h2>
            {selectedSymptoms.size > 0 && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-700 text-white"
                style={{ backgroundColor: activeZoneData.color || '#0D9488' }}
              >
                {selectedSymptoms.size}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 truncate">
            {activeZoneData.description || 'Pilih gejala yang kamu rasakan pada bagian ini.'}
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border-2 transition-all focus-within:border-[#0D9488]"
        style={{ borderColor: "#E2E8F0" }}
      >
        <SearchIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          placeholder={`Cari gejala di area ${activeZoneData.label}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 text-sm bg-transparent focus:outline-none placeholder-slate-400"
          style={{ color: "#1E293B", fontFamily: "'Poppins', sans-serif" }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Symptom Selection Buttons Container */}
      <div
        className="bg-white rounded-3xl p-5 flex-1 min-h-[200px]"
        style={{ boxShadow: "0 2px 12px rgba(13,148,136,0.08)" }}
      >
        {filteredSymptoms.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            Tidak ada gejala yang cocok dengan "{searchQuery}"
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {filteredSymptoms.map((symptom) => {
              const isSelected = selectedSymptoms.has(symptom);
              return (
                <button
                  key={symptom}
                  onClick={() => onToggleSymptom(symptom)}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-500 border-2 transition-all duration-200 active:scale-95 focus:outline-none"
                  style={{
                    backgroundColor: isSelected ? (activeZoneData.color || '#0D9488') : '#FFFFFF',
                    borderColor: isSelected ? (activeZoneData.color || '#0D9488') : '#E2E8F0',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    boxShadow: isSelected
                      ? '0 3px 12px rgba(13,148,136,0.3)'
                      : '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      border: isSelected ? 'none' : '1.5px solid #CBD5E1',
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'transparent',
                    }}
                  >
                    {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  <span>{symptom}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
