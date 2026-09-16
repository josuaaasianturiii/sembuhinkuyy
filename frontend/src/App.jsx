import React, { useState } from 'react';
import Home from './pages/Home';
import Checkup from './pages/Checkup';
import Result from './pages/Result';

// Header Icons
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

function ChevronRight({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function HomeIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

const STEPS = [
  { id: "home", label: "Beranda" },
  { id: "checkup", label: "Pengecekan Gejala" },
  { id: "result", label: "Hasil Analisis" },
];

function Navbar({ activeStep, onNavigateHome }) {
  const currentIdx = STEPS.findIndex((s) => s.id === activeStep);

  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 focus:outline-none group cursor-pointer"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ backgroundColor: "#0D9488" }}
          >
            <CrossHeartIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-800 text-sm" style={{ color: "#1E293B" }}>
            <span style={{ color: "#0D9488" }}>Sembuhin</span>kuy
          </span>
        </button>

        <nav className="hidden sm:flex items-center gap-2 text-xs font-500 text-slate-400">
          {STEPS.map((step, i) => {
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <span key={step.id} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
                <button
                  type="button"
                  onClick={isPast ? onNavigateHome : undefined}
                  className="flex items-center gap-1 transition-colors focus:outline-none"
                  style={{
                    color: isCurrent ? "#0D9488" : isPast ? "#475569" : "#CBD5E1",
                    fontWeight: isCurrent ? 700 : 500,
                    cursor: isPast ? "pointer" : "default",
                  }}
                >
                  {i === 0 && <HomeIcon className="w-3.5 h-3.5" />}
                  {step.label}
                </button>
              </span>
            );
          })}
        </nav>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-600"
          style={{ backgroundColor: "#CCFBF1", color: "#0D9488" }}
        >
          Langkah {currentIdx + 1} dari {STEPS.length}
        </div>
      </div>
    </header>
  );
}

function ProgressBar({ activeStep }) {
  const idx = STEPS.findIndex((s) => s.id === activeStep);
  const pct = Math.round(((idx + 1) / STEPS.length) * 100);

  return (
    <div className="h-1 bg-slate-200">
      <div
        className="h-1 transition-all duration-700"
        style={{ width: `${pct}%`, background: "linear-gradient(90deg, #0D9488, #14B8A6)" }}
      />
    </div>
  );
}

/**
 * Root Frontend Application Container
 */
export default function App() {
  const [activeStep, setActiveStep] = useState("home"); // 'home' | 'checkup' | 'result'
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [symptomEntries, setSymptomEntries] = useState([]);

  const navigateTo = (step) => {
    setActiveStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartCheckup = () => {
    navigateTo("checkup");
  };

  const handleCompleteDiagnosis = (resultData, entries) => {
    setDiagnosisResult(resultData);
    setSymptomEntries(entries);
    navigateTo("result");
  };

  const handleResetCheckup = () => {
    setDiagnosisResult(null);
    setSymptomEntries([]);
    navigateTo("home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {activeStep !== "home" && (
        <>
          <Navbar activeStep={activeStep} onNavigateHome={handleResetCheckup} />
          <ProgressBar activeStep={activeStep} />
        </>
      )}

      <main className="flex-1 flex flex-col">
        {activeStep === "home" && (
          <Home onStart={handleStartCheckup} />
        )}

        {activeStep === "checkup" && (
          <Checkup
            onBackToHome={handleResetCheckup}
            onCompleteDiagnosis={handleCompleteDiagnosis}
          />
        )}

        {activeStep === "result" && (
          <Result
            diagnosisResult={diagnosisResult}
            symptomEntries={symptomEntries}
            onResetCheckup={handleResetCheckup}
          />
        )}
      </main>
    </div>
  );
}
