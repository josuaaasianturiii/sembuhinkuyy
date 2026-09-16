import { query, testConnection } from '../config/database.js';

// ── Fallback Knowledge Base Data (Used if Database is unavailable) ─────────────
const FALLBACK_BODY_ZONES = [
  {
    id: 'head',
    label: 'Kepala',
    emoji: '🧠',
    color: '#0D9488',
    colorMuted: '#CCFBF1',
    description: 'Kepala & wajah termasuk otak, mata, telinga, hidung, dan mulut.',
    symptoms: [
      'Pusing / Vertigo', 'Migrain', 'Sakit Kepala Tegang', 'Kepala Berdenyut',
      'Penglihatan Kabur', 'Telinga Berdenging', 'Hidung Tersumbat', 'Sakit Gigi'
    ]
  },
  {
    id: 'neck',
    label: 'Leher',
    emoji: '🫁',
    color: '#7C3AED',
    colorMuted: '#EDE9FE',
    description: 'Area leher termasuk tenggorokan, kelenjar getah bening, dan tulang leher.',
    symptoms: [
      'Nyeri Leher', 'Kaku Leher', 'Sulit Menelan', 'Sakit Tenggorokan',
      'Kelenjar Bengkak', 'Suara Serak', 'Leher Pegal'
    ]
  },
  {
    id: 'chest',
    label: 'Dada',
    emoji: '❤️',
    color: '#F43F5E',
    colorMuted: '#FFE4E6',
    description: 'Dada termasuk jantung, paru-paru, dan saluran pernapasan.',
    symptoms: [
      'Nyeri Dada', 'Sesak Napas', 'Jantung Berdebar', 'Batuk Kering',
      'Batuk Berdahak', 'Rasa Terbakar', 'Dada Tertekan', 'Napas Pendek'
    ]
  },
  {
    id: 'abdomen',
    label: 'Perut',
    emoji: '🫃',
    color: '#D97706',
    colorMuted: '#FEF3C7',
    description: 'Perut termasuk lambung, usus, hati, dan organ pencernaan.',
    symptoms: [
      'Nyeri Perut', 'Mual', 'Muntah', 'Diare', 'Sembelit',
      'Kembung', 'Mules', 'Tidak Nafsu Makan', 'Perut Begah'
    ]
  },
  {
    id: 'leftArm',
    label: 'Lengan Kiri',
    emoji: '💪',
    color: '#0284C7',
    colorMuted: '#E0F2FE',
    description: 'Lengan kiri termasuk bahu, siku, pergelangan, dan jari tangan.',
    symptoms: [
      'Nyeri Lengan', 'Kesemutan', 'Mati Rasa', 'Sendi Kaku',
      'Bengkak', 'Lemah Otot', 'Ngilu Sendi'
    ]
  },
  {
    id: 'rightArm',
    label: 'Lengan Kanan',
    emoji: '💪',
    color: '#0284C7',
    colorMuted: '#E0F2FE',
    description: 'Lengan kanan termasuk bahu, siku, pergelangan, dan jari tangan.',
    symptoms: [
      'Nyeri Lengan', 'Kesemutan', 'Mati Rasa', 'Sendi Kaku',
      'Bengkak', 'Lemah Otot', 'Ngilu Sendi'
    ]
  },
  {
    id: 'leftLeg',
    label: 'Kaki Kiri',
    emoji: '🦵',
    color: '#059669',
    colorMuted: '#D1FAE5',
    description: 'Kaki kiri termasuk paha, lutut, betis, pergelangan, dan telapak kaki.',
    symptoms: [
      'Nyeri Kaki', 'Kram Kaki', 'Kaki Bengkak', 'Kesemutan',
      'Lutut Sakit', 'Nyeri Tumit', 'Kaki Pegal', 'Varises'
    ]
  },
  {
    id: 'rightLeg',
    label: 'Kaki Kanan',
    emoji: '🦵',
    color: '#059669',
    colorMuted: '#D1FAE5',
    description: 'Kaki kanan termasuk paha, lutut, betis, pergelangan, dan telapak kaki.',
    symptoms: [
      'Nyeri Kaki', 'Kram Kaki', 'Kaki Bengkak', 'Kesemutan',
      'Lutut Sakit', 'Nyeri Tumit', 'Kaki Pegal', 'Varises'
    ]
  }
];

const FALLBACK_DISEASES = [
  {
    id: '1',
    name: 'Flu (Influenza)',
    category: 'Infeksi Saluran Pernapasan',
    severity: 'rendah',
    baseMatchPct: 85,
    summary: 'Infeksi virus yang menyebabkan demam, sakit kepala, batuk, dan kelelahan. Umumnya membaik dalam 7–10 hari.',
    symptoms: ['demam', 'pusing', 'migrain', 'sakit kepala tegang', 'batuk kering', 'batuk berdahak', 'mual', 'lemas', 'sakit tenggorokan', 'hidung tersumbat']
  },
  {
    id: '2',
    name: 'Infeksi Saluran Pernapasan Atas (ISPA)',
    category: 'Infeksi Bakteri/Virus',
    severity: 'rendah',
    baseMatchPct: 70,
    summary: 'Peradangan pada saluran hidung, tenggorokan, atau sinus. Sangat umum dan biasanya sembuh sendiri.',
    symptoms: ['sakit tenggorokan', 'batuk kering', 'batuk berdahak', 'hidung tersumbat', 'pusing', 'suara serak']
  },
  {
    id: '3',
    name: 'Dispepsia / Asam Lambung (GERD)',
    category: 'Gangguan Pencernaan',
    severity: 'sedang',
    baseMatchPct: 65,
    summary: 'Iritasi atau peningkatan asam pada lambung yang dapat menimbulkan mual, kembung, dan rasa terbakar di dada.',
    symptoms: ['nyeri perut', 'mual', 'muntah', 'kembung', 'mules', 'rasa terbakar', 'tidak nafsu makan', 'perut begah']
  },
  {
    id: '4',
    name: 'Kelelahan & Dehidrasi',
    category: 'Kondisi Umum',
    severity: 'rendah',
    baseMatchPct: 55,
    summary: 'Kombinasi kelelahan fisik dan kurang cairan yang memicu pusing, pegal, dan lemas.',
    symptoms: ['pusing / vertigo', 'sakit kepala tegang', 'mual', 'lemas', 'kaki pegal', 'leher pegal']
  },
  {
    id: '5',
    name: 'Demam Tifoid (Tifus)',
    category: 'Infeksi Bakteri',
    severity: 'tinggi',
    baseMatchPct: 35,
    summary: 'Infeksi bakteri Salmonella typhi yang memerlukan diagnosis dan penanganan dari dokter.',
    symptoms: ['demam', 'mual', 'muntah', 'diare', 'sembelit', 'nyeri perut', 'lemas']
  }
];

const FALLBACK_SELF_CARE = [
  {
    id: 'c1',
    title: 'Perbanyak Minum Cairan',
    desc: 'Minum 8–10 gelas air putih atau cairan hangat per hari untuk mencegah dehidrasi dan mengencerkan dahak.',
    icon: 'droplet',
    color: '#0284C7',
    bg: '#E0F2FE'
  },
  {
    id: 'c2',
    title: 'Istirahat Total',
    desc: 'Tidur minimal 8 jam malam dan tambahkan waktu istirahat untuk memberi kesempatan tubuh memulihkan imun.',
    icon: 'bed',
    color: '#7C3AED',
    bg: '#EDE9FE'
  },
  {
    id: 'c3',
    title: 'Pantau Suhu Tubuh',
    desc: 'Ukur suhu setiap 4 jam. Jika suhu > 39°C lebih dari 24 jam atau tidak mereda, konsultasikan ke dokter.',
    icon: 'thermometer',
    color: '#F43F5E',
    bg: '#FFE4E6'
  },
  {
    id: 'c4',
    title: 'Obat Pereda Gejala',
    desc: 'Konsumsi Paracetamol 500mg tiap 6 jam untuk demam dan nyeri sesuai indikasi dan aturan pakai.',
    icon: 'pill',
    color: '#D97706',
    bg: '#FEF3C7'
  }
];

const FALLBACK_WARNING_SIGNS = [
  'Demam sangat tinggi (> 39.5°C) atau tidak turun setelah 3 hari berturut-turut',
  'Sesak napas berat atau kesulitan bernapas',
  'Nyeri dada tajam atau terasa tertekan',
  'Penurunan kesadaran, kebingungan, atau sulit dibangunkan',
  'Tanda dehidrasi berat: tidak BAK > 8 jam, bibir sangat pecah-pecah',
  'Muntah berulang atau BAB berwarna hitam/berdarah'
];

/**
 * Initialize database schema tables if PostgreSQL is connected
 */
export const initDatabaseSchema = async () => {
  const isConnected = await testConnection();
  if (!isConnected) return;

  try {
    // Create Symptoms table
    await query(`
      CREATE TABLE IF NOT EXISTS symptoms (
        id SERIAL PRIMARY KEY,
        zone_id VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Diseases table
    await query(`
      CREATE TABLE IF NOT EXISTS diseases (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        severity VARCHAR(20) CHECK (severity IN ('rendah', 'sedang', 'tinggi')),
        summary TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Disease Symptoms Junction Table
    await query(`
      CREATE TABLE IF NOT EXISTS disease_symptoms (
        disease_id INT REFERENCES diseases(id) ON DELETE CASCADE,
        symptom_name VARCHAR(100) NOT NULL,
        weight INT DEFAULT 1,
        PRIMARY KEY (disease_id, symptom_name)
      );
    `);

    console.log('[DB Schema] Database tables checked/initialized successfully.');
  } catch (err) {
    console.error('[DB Schema Error] Failed to initialize tables:', err.message);
  }
};

/**
 * Fetch body zones and associated symptoms from Database or Fallback
 */
export const getBodyZonesAndSymptoms = async () => {
  const isConnected = await testConnection();
  if (!isConnected) {
    return FALLBACK_BODY_ZONES;
  }

  try {
    const res = await query('SELECT zone_id, name FROM symptoms ORDER BY zone_id, name');
    if (res.rows.length === 0) {
      return FALLBACK_BODY_ZONES;
    }

    // Group database rows by zone_id
    const zoneMap = new Map();
    FALLBACK_BODY_ZONES.forEach((z) => {
      zoneMap.set(z.id, { ...z, symptoms: [] });
    });

    res.rows.forEach((row) => {
      if (zoneMap.has(row.zone_id)) {
        zoneMap.get(row.zone_id).symptoms.push(row.name);
      }
    });

    return Array.from(zoneMap.values());
  } catch (err) {
    console.warn('[Model Warning] Falling back to memory body zones:', err.message);
    return FALLBACK_BODY_ZONES;
  }
};

/**
 * Match user selected symptoms against disease rules
 * @param {Array<{label: string, duration?: string, severity?: string}>} selectedSymptoms 
 */
export const matchConditionsFromSymptoms = async (selectedSymptoms) => {
  if (!selectedSymptoms || selectedSymptoms.length === 0) {
    return {
      conditions: [],
      overallUrgency: 'rendah',
      selfCareSteps: FALLBACK_SELF_CARE,
      warningSigns: FALLBACK_WARNING_SIGNS,
    };
  }

  const userSymptomLabels = selectedSymptoms.map((s) => (s.label || s).toLowerCase());
  const isConnected = await testConnection();

  let diseaseList = FALLBACK_DISEASES;

  if (isConnected) {
    try {
      const res = await query('SELECT * FROM diseases ORDER BY id');
      if (res.rows.length > 0) {
        // Fetch junction symptoms for each disease
        const diseasesWithSymptoms = await Promise.all(
          res.rows.map(async (d) => {
            const symRes = await query('SELECT symptom_name FROM disease_symptoms WHERE disease_id = $1', [d.id]);
            return {
              ...d,
              id: String(d.id),
              symptoms: symRes.rows.map((r) => r.symptom_name.toLowerCase()),
              baseMatchPct: d.severity === 'tinggi' ? 35 : d.severity === 'sedang' ? 65 : 80,
            };
          })
        );
        diseaseList = diseasesWithSymptoms;
      }
    } catch (err) {
      console.warn('[Model Warning] Error querying PostgreSQL diseases, using fallback rules:', err.message);
    }
  }

  // Calculate matching percentages based on symptom overlap
  const scoredConditions = diseaseList.map((disease) => {
    const matchedSymptoms = disease.symptoms.filter((ds) =>
      userSymptomLabels.some((us) => us.includes(ds) || ds.includes(us))
    );

    // Calculate match score
    const overlapRatio = disease.symptoms.length > 0 ? matchedSymptoms.length / disease.symptoms.length : 0;
    const countBonus = matchedSymptoms.length * 15;
    let matchPct = Math.round((overlapRatio * 50) + countBonus);

    // Add base adjustments
    if (matchedSymptoms.length > 0) {
      matchPct = Math.max(matchPct, 40);
    } else {
      matchPct = Math.max(Math.floor(disease.baseMatchPct / 2), 15);
    }

    matchPct = Math.min(matchPct, 96);

    return {
      id: String(disease.id),
      name: disease.name,
      category: disease.category,
      severity: disease.severity,
      matchPct,
      summary: disease.summary,
      matchedSymptoms: matchedSymptoms.length > 0 ? matchedSymptoms : ['Gejala umum'],
    };
  });

  // Sort conditions descending by match percentage
  scoredConditions.sort((a, b) => b.matchPct - a.matchPct);

  // Determine top urgency based on top condition and user severity selections
  const hasSevereSymptom = selectedSymptoms.some((s) => s.severity === 'berat');
  const topCondition = scoredConditions[0];

  let overallUrgency = 'rendah';
  if (hasSevereSymptom || (topCondition && topCondition.severity === 'tinggi')) {
    overallUrgency = 'tinggi';
  } else if (topCondition && topCondition.severity === 'sedang') {
    overallUrgency = 'sedang';
  }

  return {
    conditions: scoredConditions,
    overallUrgency,
    selfCareSteps: FALLBACK_SELF_CARE,
    warningSigns: FALLBACK_WARNING_SIGNS,
  };
};
