import React from 'react';

// Default metadata for body zones matching Figma design system
export const DEFAULT_BODY_ZONES = [
  { id: "head", label: "Kepala", emoji: "🧠", color: "#0D9488", colorMuted: "#CCFBF1", symptoms: ["Pusing / Vertigo", "Migrain", "Sakit Kepala Tegang", "Kepala Berdenyut", "Penglihatan Kabur", "Telinga Berdenging", "Hidung Tersumbat", "Sakit Gigi"], description: "Kepala & wajah termasuk otak, mata, telinga, hidung, dan mulut." },
  { id: "neck", label: "Leher", emoji: "🫁", color: "#7C3AED", colorMuted: "#EDE9FE", symptoms: ["Nyeri Leher", "Kaku Leher", "Sulit Menelan", "Sakit Tenggorokan", "Kelenjar Bengkak", "Suara Serak", "Leher Pegal"], description: "Area leher termasuk tenggorokan, kelenjar getah bening, dan tulang leher." },
  { id: "chest", label: "Dada", emoji: "❤️", color: "#F43F5E", colorMuted: "#FFE4E6", symptoms: ["Nyeri Dada", "Sesak Napas", "Jantung Berdebar", "Batuk Kering", "Batuk Berdahak", "Rasa Terbakar", "Dada Tertekan", "Napas Pendek"], description: "Dada termasuk jantung, paru-paru, dan saluran pernapasan." },
  { id: "abdomen", label: "Perut", emoji: "🫃", color: "#D97706", colorMuted: "#FEF3C7", symptoms: ["Nyeri Perut", "Mual", "Muntah", "Diare", "Sembelit", "Kembung", "Mules", "Tidak Nafsu Makan", "Perut Begah"], description: "Perut termasuk lambung, usus, hati, dan organ pencernaan." },
  { id: "leftArm", label: "Lengan Kiri", emoji: "💪", color: "#0284C7", colorMuted: "#E0F2FE", symptoms: ["Nyeri Lengan", "Kesemutan", "Mati Rasa", "Sendi Kaku", "Bengkak", "Lemah Otot", "Ngilu Sendi"], description: "Lengan kiri termasuk bahu, siku, pergelangan, dan jari tangan." },
  { id: "rightArm", label: "Lengan Kanan", emoji: "💪", color: "#0284C7", colorMuted: "#E0F2FE", symptoms: ["Nyeri Lengan", "Kesemutan", "Mati Rasa", "Sendi Kaku", "Bengkak", "Lemah Otot", "Ngilu Sendi"], description: "Lengan kanan termasuk bahu, siku, pergelangan, dan jari tangan." },
  { id: "leftLeg", label: "Kaki Kiri", emoji: "🦵", color: "#059669", colorMuted: "#D1FAE5", symptoms: ["Nyeri Kaki", "Kram Kaki", "Kaki Bengkak", "Kesemutan", "Lutut Sakit", "Nyeri Tumit", "Kaki Pegal", "Varises"], description: "Kaki kiri termasuk paha, lutut, betis, pergelangan, dan telapak kaki." },
  { id: "rightLeg", label: "Kaki Kanan", emoji: "🦵", color: "#059669", colorMuted: "#D1FAE5", symptoms: ["Nyeri Kaki", "Kram Kaki", "Kaki Bengkak", "Kesemutan", "Lutut Sakit", "Nyeri Tumit", "Kaki Pegal", "Varises"], description: "Kaki kanan termasuk paha, lutut, betis, pergelangan, dan telapak kaki." },
];

/**
 * Interactive Body Map SVG Component extracted from Figma UI
 * @param {Object} props
 * @param {string|null} props.activeZone - Currently focused body zone ID
 * @param {Set<string>} props.selectedZones - Set of body zone IDs with active symptom selections
 * @param {(id: string) => void} props.onZoneClick - Callback when user clicks a body zone
 * @param {Array} [props.bodyZones] - Custom body zones data list
 */
export default function BodyMap({ activeZone, selectedZones = new Set(), onZoneClick, bodyZones = DEFAULT_BODY_ZONES }) {
  const findZone = (id) => bodyZones.find((z) => z.id === id) || DEFAULT_BODY_ZONES.find((z) => z.id === id);

  const getColor = (id) => {
    const z = findZone(id);
    const primaryColor = z?.color || "#0D9488";
    return activeZone === id ? primaryColor : selectedZones.has(id) ? primaryColor + "99" : "#CBD5E1";
  };

  const getOpacity = (id) => (activeZone === id ? 1 : selectedZones.has(id) ? 0.8 : 0.38);

  const getStroke = (id) => {
    const z = findZone(id);
    return activeZone === id || selectedZones.has(id) ? (z?.color || "#0D9488") : "#94A3B8";
  };

  const getStrokeWidth = (id) => (activeZone === id || selectedZones.has(id) ? 2.5 : 1.2);

  const ZoneGroup = ({ id, children }) => (
    <g
      className="cursor-pointer transition-all duration-200 hover:opacity-90"
      onClick={() => onZoneClick(id)}
      style={{
        filter: activeZone === id ? `drop-shadow(0 0 8px ${getStroke(id)}A0)` : "none",
      }}
    >
      {children}
    </g>
  );

  return (
    <div className="w-full flex items-center justify-center p-2">
      <svg viewBox="0 0 200 480" className="w-full h-full max-h-[440px] select-none">
        {/* Leher */}
        <ZoneGroup id="neck">
          <rect
            x="86" y="72" width="28" height="28" rx="6"
            fill={getColor("neck")} opacity={getOpacity("neck")}
            stroke={getStroke("neck")} strokeWidth={getStrokeWidth("neck")}
          />
        </ZoneGroup>

        {/* Kepala */}
        <ZoneGroup id="head">
          <ellipse
            cx="100" cy="46" rx="30" ry="36"
            fill={getColor("head")} opacity={getOpacity("head")}
            stroke={getStroke("head")} strokeWidth={getStrokeWidth("head")}
          />
          {/* Facial detail overlays */}
          <ellipse cx="91" cy="42" rx="4" ry="4.5" fill="white" opacity="0.3" style={{ pointerEvents: "none" }} />
          <ellipse cx="109" cy="42" rx="4" ry="4.5" fill="white" opacity="0.3" style={{ pointerEvents: "none" }} />
          <path d="M92 56 Q100 62 108 56" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" style={{ pointerEvents: "none" }} />
        </ZoneGroup>

        {/* Dada */}
        <ZoneGroup id="chest">
          <path
            d="M68 100 Q62 96 60 110 L58 160 Q58 168 68 170 L132 170 Q142 168 142 160 L140 110 Q138 96 132 100 Z"
            fill={getColor("chest")} opacity={getOpacity("chest")}
            stroke={getStroke("chest")} strokeWidth={getStrokeWidth("chest")}
          />
        </ZoneGroup>

        {/* Perut */}
        <ZoneGroup id="abdomen">
          <path
            d="M60 170 L58 230 Q58 242 70 244 L130 244 Q142 242 142 230 L140 170 Z"
            fill={getColor("abdomen")} opacity={getOpacity("abdomen")}
            stroke={getStroke("abdomen")} strokeWidth={getStrokeWidth("abdomen")}
          />
        </ZoneGroup>

        {/* Lengan Kiri */}
        <ZoneGroup id="leftArm">
          <path
            d="M58 100 Q46 104 42 116 L36 200 Q35 210 42 212 L52 212 Q58 210 60 200 L64 120 Q66 108 68 100 Z"
            fill={getColor("leftArm")} opacity={getOpacity("leftArm")}
            stroke={getStroke("leftArm")} strokeWidth={getStrokeWidth("leftArm")}
          />
          <ellipse
            cx="46" cy="222" rx="9" ry="13"
            fill={getColor("leftArm")} opacity={getOpacity("leftArm")}
            stroke={getStroke("leftArm")} strokeWidth={getStrokeWidth("leftArm")}
          />
        </ZoneGroup>

        {/* Lengan Kanan */}
        <ZoneGroup id="rightArm">
          <path
            d="M142 100 Q154 104 158 116 L164 200 Q165 210 158 212 L148 212 Q142 210 140 200 L136 120 Q134 108 132 100 Z"
            fill={getColor("rightArm")} opacity={getOpacity("rightArm")}
            stroke={getStroke("rightArm")} strokeWidth={getStrokeWidth("rightArm")}
          />
          <ellipse
            cx="154" cy="222" rx="9" ry="13"
            fill={getColor("rightArm")} opacity={getOpacity("rightArm")}
            stroke={getStroke("rightArm")} strokeWidth={getStrokeWidth("rightArm")}
          />
        </ZoneGroup>

        {/* Pinggul Divider */}
        <rect x="62" y="240" width="76" height="20" rx="4" fill="#E2E8F0" opacity="0.4" />

        {/* Kaki Kiri */}
        <ZoneGroup id="leftLeg">
          <path
            d="M62 256 L60 350 Q59 362 68 366 L82 366 Q90 362 90 350 L92 270 Q92 258 88 256 Z"
            fill={getColor("leftLeg")} opacity={getOpacity("leftLeg")}
            stroke={getStroke("leftLeg")} strokeWidth={getStrokeWidth("leftLeg")}
          />
          <path
            d="M62 370 Q65 376 76 378 Q85 378 90 374 L88 368 Q82 372 70 371 Z"
            fill={getColor("leftLeg")} opacity={getOpacity("leftLeg")}
            stroke={getStroke("leftLeg")} strokeWidth={getStrokeWidth("leftLeg")}
          />
        </ZoneGroup>

        {/* Kaki Kanan */}
        <ZoneGroup id="rightLeg">
          <path
            d="M138 256 L140 350 Q141 362 132 366 L118 366 Q110 362 110 350 L108 270 Q108 258 112 256 Z"
            fill={getColor("rightLeg")} opacity={getOpacity("rightLeg")}
            stroke={getStroke("rightLeg")} strokeWidth={getStrokeWidth("rightLeg")}
          />
          <path
            d="M138 370 Q135 376 124 378 Q115 378 110 374 L112 368 Q118 372 130 371 Z"
            fill={getColor("rightLeg")} opacity={getOpacity("rightLeg")}
            stroke={getStroke("rightLeg")} strokeWidth={getStrokeWidth("rightLeg")}
          />
        </ZoneGroup>

        {/* Labels Overlay */}
        {[
          { id: "head", x: 100, y: 48, label: "Kepala" },
          { id: "neck", x: 100, y: 89, label: "Leher" },
          { id: "chest", x: 100, y: 136, label: "Dada" },
          { id: "abdomen", x: 100, y: 207, label: "Perut" },
          { id: "leftArm", x: 47, y: 156, label: "Lengan" },
          { id: "rightArm", x: 153, y: 156, label: "Lengan" },
          { id: "leftLeg", x: 76, y: 310, label: "Kaki" },
          { id: "rightLeg", x: 124, y: 310, label: "Kaki" },
        ].map(({ id, x, y, label }) => (
          <text
            key={id}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="7"
            fontFamily="Poppins, sans-serif"
            fontWeight="600"
            fill="white"
            opacity={activeZone === id || selectedZones.has(id) ? 0.95 : 0.55}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
