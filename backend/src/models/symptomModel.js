import { query, testConnection } from '../config/database.js';

// ── Master Body Zones Configuration ──────────────────────────────────────────
const FALLBACK_BODY_ZONES = [
  {
    id: "head",
    label: "Kepala",
    emoji: "🧠",
    color: "#0D9488",
    colorMuted: "#CCFBF1",
    description: "Kepala & wajah termasuk otak, mata, telinga, hidung, dan mulut.",
    symptoms: [
      "Pusing / Vertigo", "Migrain", "Sakit Kepala Tegang", "Kepala Berdenyut",
      "Penglihatan Kabur", "Telinga Berdenging", "Hidung Tersumbat", "Sakit Gigi"
    ]
  },
  {
    id: "neck",
    label: "Leher",
    emoji: "🫁",
    color: "#7C3AED",
    colorMuted: "#EDE9FE",
    description: "Area leher termasuk tenggorokan, kelenjar getah bening, dan tulang leher.",
    symptoms: [
      "Nyeri Leher", "Kaku Leher", "Sulit Menelan", "Sakit Tenggorokan",
      "Kelenjar Bengkak", "Suara Serak", "Leher Pegal"
    ]
  },
  {
    id: "chest",
    label: "Dada",
    emoji: "❤️",
    color: "#F43F5E",
    colorMuted: "#FFE4E6",
    description: "Dada termasuk jantung, paru-paru, dan saluran pernapasan.",
    symptoms: [
      "Nyeri Dada", "Sesak Napas", "Jantung Berdebar", "Batuk Kering",
      "Batuk Berdahak", "Rasa Terbakar", "Dada Tertekan", "Napas Pendek"
    ]
  },
  {
    id: "abdomen",
    label: "Perut",
    emoji: "🫃",
    color: "#D97706",
    colorMuted: "#FEF3C7",
    description: "Perut termasuk lambung, usus, hati, dan organ pencernaan.",
    symptoms: [
      "Nyeri Perut", "Mual", "Muntah", "Diare", "Sembelit",
      "Kembung", "Mules", "Tidak Nafsu Makan", "Perut Begah"
    ]
  },
  {
    id: "leftArm",
    label: "Lengan Kiri",
    emoji: "💪",
    color: "#0284C7",
    colorMuted: "#E0F2FE",
    description: "Lengan kiri termasuk bahu, siku, pergelangan, dan jari tangan.",
    symptoms: [
      "Nyeri Lengan", "Kesemutan", "Mati Rasa", "Sendi Kaku",
      "Bengkak", "Lemah Otot", "Ngilu Sendi"
    ]
  },
  {
    id: "rightArm",
    label: "Lengan Kanan",
    emoji: "💪",
    color: "#0284C7",
    colorMuted: "#E0F2FE",
    description: "Lengan kanan termasuk bahu, siku, pergelangan, dan jari tangan.",
    symptoms: [
      "Nyeri Lengan", "Kesemutan", "Mati Rasa", "Sendi Kaku",
      "Bengkak", "Lemah Otot", "Ngilu Sendi"
    ]
  },
  {
    id: "leftLeg",
    label: "Kaki Kiri",
    emoji: "🦵",
    color: "#059669",
    colorMuted: "#D1FAE5",
    description: "Kaki kiri termasuk paha, lutut, betis, pergelangan, dan telapak kaki.",
    symptoms: [
      "Nyeri Kaki", "Kram Kaki", "Kaki Bengkak", "Kesemutan",
      "Lutut Sakit", "Nyeri Tumit", "Kaki Pegal", "Varises"
    ]
  },
  {
    id: "rightLeg",
    label: "Kaki Kanan",
    emoji: "🦵",
    color: "#059669",
    colorMuted: "#D1FAE5",
    description: "Kaki kanan termasuk paha, lutut, betis, pergelangan, dan telapak kaki.",
    symptoms: [
      "Nyeri Kaki", "Kram Kaki", "Kaki Bengkak", "Kesemutan",
      "Lutut Sakit", "Nyeri Tumit", "Kaki Pegal", "Varises"
    ]
  }
];

// ── Medical Knowledge Base (Comprehensive Rules for All Body Zones) ─────
const MEDICAL_KNOWLEDGE_BASE = [
  // ── AREA KEPALA (HEAD) ──────────────────────────────────────────────────────
  {
    id: 'head-1',
    name: 'Sakit Kepala Tegang (Tension Headache)',
    category: 'Neurologi & Otot',
    severity: 'rendah',
    zone: 'head',
    summary: 'Sakit kepala akibat ketegangan otot leher dan kulit kepala. Sering dipicu oleh stres, kelelahan, postur tubuh buruk, atau menatap layar terlalu lama.',
    keySymptoms: ['sakit kepala tegang', 'pusing', 'leher pegal', 'kaku leher', 'pusing / vertigo'],
    selfCare: [
      { title: 'Kompres Hangat/Dingin', desc: 'Tempelkan kompres hangat di area leher belakang atau kompres dingin di dahi selama 15 menit.', icon: 'thermometer', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Istirahatkan Mata & Otot', desc: 'Kurangi penggunaan layar digital, hindari cahaya sangat terang, dan lakukan peregangan leher perlahan.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Pijat Lembut Pelipis', desc: 'Pijat melingkar perlahan di area pelipis dan leher belakang untuk meredakan ketegangan otot.', icon: 'pill', color: '#0D9488', bg: '#CCFBF1' }
    ]
  },
  {
    id: 'head-2',
    name: 'Migrain (Sakit Kepala Berdenyut)',
    category: 'Neurologi',
    severity: 'sedang',
    zone: 'head',
    summary: 'Sakit kepala berdenyut intens yang biasanya mengenai satu sisi kepala, sering disertai sensasi mual, sensitif terhadap cahaya atau suara.',
    keySymptoms: ['migrain', 'kepala berdenyut', 'penglihatan kabur', 'mual', 'pusing / vertigo', 'muntah', 'pusing'],
    selfCare: [
      { title: 'Istirahat di Kamar Gelap & Tenang', desc: 'Matikan lampu dan jauhi suara bising. Tidur sejenak sangat membantu meredakan serangan migrain.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Kompres Dingin di Dahi', desc: 'Gunakan kain dingin atau kantong es yang dibungkus kain lembut pada dahi atau belakang leher.', icon: 'thermometer', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Cukupi Hidrasi Air Putih', desc: 'Minum air putih sedikit demi sedikit untuk mencegah dehidrasi yang dapat memperparah migrain.', icon: 'droplet', color: '#059669', bg: '#D1FAE5' }
    ]
  },
  {
    id: 'head-3',
    name: 'Vertigo (Gangguan Keseimbangan Telinga Dalam)',
    category: 'Otologi & Neurologi',
    severity: 'sedang',
    zone: 'head',
    summary: 'Sensasi berputar atau melayang yang dipicu oleh gangguan sistem keseimbangan telinga dalam atau saraf otak.',
    keySymptoms: ['pusing / vertigo', 'telinga berdenging', 'penglihatan kabur', 'mual', 'muntah', 'pusing'],
    selfCare: [
      { title: 'Hindari Gerakan Kepala Mendadak', desc: 'Duduk sejenak sebelum bangun tidur dan ubah posisi kepala secara perlahan.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Fokuskan Pandangan', desc: 'Saat sensasi berputar muncul, duduk tenang dan fokuskan mata pada satu titik objek diam.', icon: 'pill', color: '#0D9488', bg: '#CCFBF1' },
      { title: 'Tunda Aktivitas Berat', desc: 'Hindari mengemudi kendaraan atau mengoperasikan mesin hingga sensasi berputar reda sepenuhnya.', icon: 'thermometer', color: '#F43F5E', bg: '#FFE4E6' }
    ]
  },
  {
    id: 'head-4',
    name: 'Sinusitis & Rhinitis Alergi',
    category: 'Infeksi THT',
    severity: 'rendah',
    zone: 'head',
    summary: 'Peradangan pada dinding rongga sinus atau hidung yang memicu hidung tersumbat, rasa tertekan di wajah/dahi, pusing, dan lendir terakumulasi.',
    keySymptoms: ['hidung tersumbat', 'sakit kepala tegang', 'pusing / vertigo', 'sakit tenggorokan', 'pusing'],
    selfCare: [
      { title: 'Hirup Uap Air Hangat', desc: 'Hirup uap dari mangkuk berisi air hangat atau gunakan humidifier ruangan untuk melonggarkan sinus.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Banyak Minum Air Hangat', desc: 'Minum air hangat membantu mengencerkan lendir dan melembabkan saluran hidung.', icon: 'pill', color: '#0D9488', bg: '#CCFBF1' }
    ]
  },
  {
    id: 'head-5',
    name: 'Infeksi / Gangguan Gigi & Mulut (Pulpitis)',
    category: 'Kesehatan Gigi & Mulut',
    severity: 'rendah',
    zone: 'head',
    summary: 'Peradangan pada saraf gigi atau gusi yang menimbulkan rasa nyeri berdenyut menjalar hingga ke kepala dan telinga.',
    keySymptoms: ['sakit gigi', 'kepala berdenyut', 'pusing', 'sakit kepala tegang', 'kelenjar bengkak'],
    selfCare: [
      { title: 'Kumur Air Garam Hangat', desc: 'Berkumur dengan air garam hangat untuk mengurangi peradangan gusi dan membersihkan sisa makanan.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Kompres Dingin di Pipi', desc: 'Tempelkan kompres dingin di pipi luar area gigi yang sakit selama 10–15 menit.', icon: 'thermometer', color: '#7C3AED', bg: '#EDE9FE' }
    ]
  },

  // ── AREA LEHER (NECK) ───────────────────────────────────────────────────────
  {
    id: 'neck-1',
    name: 'Faringitis / Laringitis (Radang Tenggorokan)',
    category: 'Infeksi THT',
    severity: 'rendah',
    zone: 'neck',
    summary: 'Peradangan pada saluran tenggorokan atau pita suara akibat infeksi virus/bakteri. Menyebabkan sakit saat menelan dan suara serak.',
    keySymptoms: ['sakit tenggorokan', 'sulit menelan', 'suara serak', 'kelenjar bengkak', 'batuk kering'],
    selfCare: [
      { title: 'Kumur Air Garam Hangat', desc: 'Larutkan 1/2 sendok teh garam dalam segelas air hangat, kumur di tenggorokan 3 kali sehari.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Istirahatkan Pita Suara', desc: 'Kurangi berbicara berlebihan dan hindari berbisik karena justru menegang pita suara.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Minum Cairan Hangat', desc: 'Konsumsi teh hangat dengan madu dan lemon untuk menenangkan jaringan tenggorokan.', icon: 'pill', color: '#D97706', bg: '#FEF3C7' }
    ]
  },
  {
    id: 'neck-2',
    name: 'Tonsilitis (Radang Amandel)',
    category: 'Infeksi THT',
    severity: 'sedang',
    zone: 'neck',
    summary: 'Pembengkakan dan peradangan pada amandel di pangkal leher yang menimbulkan sakit menelan hebat dan kelenjar getah bening membesar.',
    keySymptoms: ['kelenjar bengkak', 'sulit menelan', 'sakit tenggorokan', 'nyeri leher', 'suara serak'],
    selfCare: [
      { title: 'Makanan Bertekstur Lembut', desc: 'Pilih makanan lunak seperti bubur atau sup hangat yang tidak mengiritasi amandel.', icon: 'pill', color: '#0D9488', bg: '#CCFBF1' },
      { title: 'Jaga Kelembaban Tenggorokan', desc: 'Minum air hangat berkala dan hindari makanan pedas, berminyak, atau keras.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' }
    ]
  },
  {
    id: 'neck-3',
    name: 'Kaku Otot Leher (Cervical Muscle Strain)',
    category: 'Muskuloskeletal',
    severity: 'rendah',
    zone: 'neck',
    summary: 'Ketegangan atau kram pada otot leher akibat posisi tidur buruk, postur tubuh salah saat bekerja, atau tarikan otot mendadak.',
    keySymptoms: ['kaku leher', 'nyeri leher', 'leher pegal', 'sakit kepala tegang'],
    selfCare: [
      { title: 'Peregangan Leher Perlahan', desc: 'Melelahkan otot leher dengan menengok perlahan ke kiri dan kanan tanpa dipaksa.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Kompres Hangat Leher', desc: 'Gunakan handuk hangat di area leher yang kaku selama 15–20 menit untuk memperlancar sirkulasi darah.', icon: 'thermometer', color: '#D97706', bg: '#FEF3C7' }
    ]
  },

  // ── AREA DADA (CHEST) ───────────────────────────────────────────────────────
  {
    id: 'chest-1',
    name: 'GERD / Refluks Asam Lambung (Heartburn)',
    category: 'Gastrointestinal & Dada',
    severity: 'sedang',
    zone: 'chest',
    summary: 'Naiknya asam lambung ke kerongkongan yang menimbulkan sensasi rasa terbakar di dada (heartburn), dada tertekan, mual, dan batuk kering.',
    keySymptoms: ['rasa terbakar', 'dada tertekan', 'nyeri dada', 'batuk kering', 'mual', 'mules', 'kembung', 'perut begah'],
    selfCare: [
      { title: 'Hindari Berbaring Setelah Makan', desc: 'Beri jeda minimal 3 jam antara waktu makan dan waktu tidur agar asam lambung tidak naik.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Makan Porsi Kecil tapi Sering', desc: 'Hindari makan terlalu kenyang dan batasi konsumsi makanan pedas, tinggi lemak, atau bersoda.', icon: 'pill', color: '#D97706', bg: '#FEF3C7' },
      { title: 'Tinggikan Bantal Kepala', desc: 'Gunakan bantal ekstra (15-20 cm) saat tidur agar posisi kepala dan dada lebih tinggi dari perut.', icon: 'thermometer', color: '#0D9488', bg: '#CCFBF1' }
    ]
  },
  {
    id: 'chest-2',
    name: 'Bronkitis / Infeksi Saluran Napas Bawah',
    category: 'Respirasi',
    severity: 'sedang',
    zone: 'chest',
    summary: 'Peradangan pada saluran pernapasan bronkus paru-paru yang menyebabkan batuk berdahak intens, dada terasa panas/nyeri saat batuk, dan sesak napas.',
    keySymptoms: ['batuk berdahak', 'sesak napas', 'dada tertekan', 'napas pendek', 'nyeri dada'],
    selfCare: [
      { title: 'Perbanyak Minum Air Hangat', desc: 'Cairan hangat membantu mengencerkan dahak kental agar lebih mudah dikeluarkan saat batuk.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Gunakan Humidifier / Uap Hangat', desc: 'Hirup uap air hangat untuk melembabkan saluran pernapasan yang teriritasi.', icon: 'thermometer', color: '#059669', bg: '#D1FAE5' },
      { title: 'Hindari Asap Rokok & Polusi', desc: 'Jauhi paparan asap rokok, debu, dan bahan kimia berbau tajam.', icon: 'pill', color: '#F43F5E', bg: '#FFE4E6' }
    ]
  },
  {
    id: 'chest-3',
    name: 'Asma Ringan – Sedang (Penyempitan Saluran Napas)',
    category: 'Respirasi',
    severity: 'sedang',
    zone: 'chest',
    summary: 'Penyempitan dan pembengkakan saluran pernapasan yang menimbulkan gejala sesak napas, dada tertekan, napas pendek, dan napas mengi/berbunyi.',
    keySymptoms: ['sesak napas', 'napas pendek', 'dada tertekan', 'batuk kering', 'jantung berdebar'],
    selfCare: [
      { title: 'Duduk Tegak & Tenang', desc: 'Saat sesak napas datang, duduk tegak dan atur napas perlahan. Hindari berbaring terlentang.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Hindari Pemicu Alergi', desc: 'Jauhi udara dingin, debu, bulu hewan peliharaan, atau serbuk sari tanaman.', icon: 'pill', color: '#0D9488', bg: '#CCFBF1' }
    ]
  },
  {
    id: 'chest-4',
    name: 'Angina Pektoris / Gejala Penyakit Jantung (Evaluasi Medis Darurat)',
    category: 'Kardiovaskular',
    severity: 'tinggi',
    zone: 'chest',
    summary: 'Sensasi nyeri dada hebat seperti tertindih beban berat yang dapat menjalar ke leher atau lengan, disertai jantung berdebar. Memerlukan penanganan segera.',
    keySymptoms: ['nyeri dada', 'jantung berdebar', 'dada tertekan', 'napas pendek', 'sesak napas', 'kesemutan', 'mati rasa'],
    selfCare: [
      { title: 'Hentikan Seluruh Aktivitas Fisik', desc: 'Segera duduk atau berbaring dalam posisi setengah duduk yang nyaman. Jangan memaksakan diri.', icon: 'bed', color: '#F43F5E', bg: '#FFE4E6' },
      { title: 'Longgarkan Pakaian Terikat', desc: 'Buka kancing kerah baju atau kelonggarkan ikat pinggang untuk mempermudah pernapasan.', icon: 'thermometer', color: '#D97706', bg: '#FEF3C7' },
      { title: 'Hubungi Bantuan Darurat 119', desc: 'Jika nyeri dada berlangsung >10 menit dan disertai keringat dingin, segera bawa ke IGD rumah sakit.', icon: 'pill', color: '#E11D48', bg: '#FFE4E6' }
    ]
  },
  {
    id: 'chest-5',
    name: 'Nyeri Otot Dada / Costochondritis',
    category: 'Muskuloskeletal Dada',
    severity: 'rendah',
    zone: 'chest',
    summary: 'Peradangan pada tulang rawan yang menghubungkan tulang rusuk dengan tulang dada. Nyeri memburuk saat bernapas dalam atau menekan dada.',
    keySymptoms: ['nyeri dada', 'dada tertekan', 'rasa terbakar'],
    selfCare: [
      { title: 'Kompres Hangat Dada', desc: 'Gunakan kompres hangat di area tulang dada yang nyeri selama 15 menit.', icon: 'thermometer', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Hindari Olahraga Berat Sementara', desc: 'Batasi gerakan mengangkat beban atau olah tubuh bagian atas hingga nyeri membaik.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' }
    ]
  },

  // ── AREA PERUT (ABDOMEN) ───────────────────────────────────────────────────
  {
    id: 'abd-1',
    name: 'Dispepsia / Sakit Maag (Gastritis)',
    category: 'Gastrointestinal',
    severity: 'rendah',
    zone: 'abdomen',
    summary: 'Peradangan atau iritasi pada dinding lambung yang menimbulkan rasa mual, mules di ulu hati, kembung, dan perut begah.',
    keySymptoms: ['nyeri perut', 'mual', 'muntah', 'kembung', 'mules', 'perut begah', 'tidak nafsu makan'],
    selfCare: [
      { title: 'Pola Makan Teratur', desc: 'Makan porsi kecil namun sering (4-5 kali sehari) dan hindari membiarkan lambung kosong terlalu lama.', icon: 'pill', color: '#D97706', bg: '#FEF3C7' },
      { title: 'Hindari Makanan Iritan', desc: 'Batasi konsumsi cabai, cuka, makanan berminyak, kopi, dan minuman bersoda.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' }
    ]
  },
  {
    id: 'abd-2',
    name: 'Gastroenteritis / Diare Akut',
    category: 'Infeksi Pencernaan',
    severity: 'sedang',
    zone: 'abdomen',
    summary: 'Infeksi kuman/virus pada usus yang menyebabkan buang air besar cair berulang, kram perut, mual, dan risiko dehidrasi.',
    keySymptoms: ['diare', 'nyeri perut', 'mual', 'muntah', 'mules', 'kembung', 'tidak nafsu makan'],
    selfCare: [
      { title: 'Minum Oralit / Larutan Rehidrasi', desc: 'Konsumsi oralit setiap kali selesai buang air besar cair untuk menggantikan cairan & elektrolit.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Konsumsi Diet BRAT', desc: 'Makan pisang, nasi tim, saus apel, dan roti tawar yang lembut bagi pencernaan.', icon: 'pill', color: '#059669', bg: '#D1FAE5' }
    ]
  },
  {
    id: 'abd-3',
    name: 'Konstipasi / Sembelit',
    category: 'Gastrointestinal',
    severity: 'rendah',
    zone: 'abdomen',
    summary: 'Kesulitan buang air besar akibat usus menyerap terlalu banyak air dari makanan, menyebabkan feses keras dan perut terasa penuh/kembung.',
    keySymptoms: ['sembelit', 'kembung', 'perut begah', 'nyeri perut', 'mules'],
    selfCare: [
      { title: 'Tingkatkan Asupan Serat', desc: 'Perbanyak konsumsi sayuran hijau, buah-buahan (seperti pepaya & buah naga), serta biji-bijian.', icon: 'pill', color: '#059669', bg: '#D1FAE5' },
      { title: 'Minum Banyak Air Putih', desc: 'Minum minimal 2-2.5 liter air putih setiap hari untuk melembutkan tekstur feses.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' }
    ]
  },
  {
    id: 'abd-4',
    name: 'Kecurigaan Apendisitis (Radang Usus Buntu)',
    category: 'Gawat Darurat Bedah',
    severity: 'tinggi',
    zone: 'abdomen',
    summary: 'Peradangan akut pada usus buntu yang menimbulkan nyeri samar di ulu hati yang berpindah dan menghebat di perut kanan bawah, disertai mual dan demam.',
    keySymptoms: ['nyeri perut', 'mual', 'muntah', 'tidak nafsu makan', 'mules'],
    selfCare: [
      { title: 'Segera Konsultasi Dokter / IGD', desc: 'Hindari memijat perut atau minum obat pencahar. Segera periksakan diri ke dokter atau IGD.', icon: 'pill', color: '#F43F5E', bg: '#FFE4E6' }
    ]
  },

  // ── AREA LENGAN (ARMS) ─────────────────────────────────────────────────────
  {
    id: 'arm-1',
    name: 'Tendinitis & Kelelahan Otot Lengan (Muscle Fatigue)',
    category: 'Muskuloskeletal',
    severity: 'rendah',
    zone: 'leftArm',
    summary: 'Peradangan pada tendon atau ketegangan serat otot lengan akibat mengangkat beban berat atau gerakan berulang.',
    keySymptoms: ['nyeri lengan', 'lemah otot', 'sendi kaku', 'ngilu sendi'],
    selfCare: [
      { title: 'Istirahatkan Lengan', desc: 'Kurangi aktivitas fisik berat atau gerakan berulang pada lengan yang sakit selama 48 jam.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Kompres Es', desc: 'Tempelkan kantong es yang dibungkus kain pada area otot yang nyeri selama 15 menit.', icon: 'thermometer', color: '#0284C7', bg: '#E0F2FE' }
    ]
  },
  {
    id: 'arm-2',
    name: 'Carpal Tunnel Syndrome (CTS)',
    category: 'Neurologi Tangan',
    severity: 'sedang',
    zone: 'rightArm',
    summary: 'Penekanan pada saraf medianus di pergelangan tangan yang memicu rasa kesemutan, mati rasa, dan kelemahan pada jari-jari tangan.',
    keySymptoms: ['kesemutan', 'mati rasa', 'nyeri lengan', 'lemah otot', 'sendi kaku'],
    selfCare: [
      { title: 'Gunakan Wrist Splint / Penyangga', desc: 'Gunakan penyangga pergelangan tangan saat tidur atau beraktivitas untuk mengurangi penekanan saraf.', icon: 'pill', color: '#0D9488', bg: '#CCFBF1' },
      { title: 'Lakukan Peregangan Pergelangan', desc: 'Tekuk pergelangan tangan perlahan ke atas dan bawah setiap 30 menit bekerja.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' }
    ]
  },

  // ── AREA KAKI (LEGS) ───────────────────────────────────────────────────────
  {
    id: 'leg-1',
    name: 'Kram Otot & Kelelahan Kaki (Leg Cramp / Muscle Strain)',
    category: 'Muskuloskeletal Kaki',
    severity: 'rendah',
    zone: 'leftLeg',
    summary: 'Kontraksi otot mendadak yang terasa sangat nyeri pada betis atau paha, sering dipicu oleh dehidrasi, kelelahan, atau kurang elektrolit.',
    keySymptoms: ['kram kaki', 'nyeri kaki', 'kaki pegal', 'kesemutan'],
    selfCare: [
      { title: 'Peregangan Otot Betis', desc: 'Luruskan kaki dan tarik jemari kaki ke arah tubuh perlahan hingga otot betis merenggang.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Cukupi Elektrolit & Air Putih', desc: 'Minum air putih secukupnya dan makan buah kaya kalium seperti pisang.', icon: 'droplet', color: '#059669', bg: '#D1FAE5' }
    ]
  },
  {
    id: 'leg-2',
    name: 'Gout Arthritis (Radang Sendi Asam Urat)',
    category: 'Reumatologi',
    severity: 'sedang',
    zone: 'rightLeg',
    summary: 'Penumpukan kristal asam urat pada persendian (seperti jempol kaki atau lutut) yang menimbulkan sensasi nyeri tajam, bengkak, dan panas.',
    keySymptoms: ['lutut sakit', 'nyeri tumit', 'bengkak', 'kaki bengkak', 'ngilu sendi', 'nyeri kaki'],
    selfCare: [
      { title: 'Tinggikan Posisi Kaki', desc: 'Sangga kaki dengan bantal saat berbaring untuk mengurangi pembengkakan sendi.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Batasi Makanan Tinggi Purin', desc: 'Hindari konsumsi jeroan, daging merah, seafood, dan minuman beralkohol.', icon: 'pill', color: '#D97706', bg: '#FEF3C7' }
    ]
  },
  {
    id: 'leg-3',
    name: 'Plantar Fasciitis (Nyeri Tumit & Telapak Kaki)',
    category: 'Muskuloskeletal Kaki',
    severity: 'rendah',
    zone: 'leftLeg',
    summary: 'Peradangan pada pita jaringan tebal di telapak kaki yang memicu nyeri menusuk pada tumit, terutama saat langkah pertama di pagi hari.',
    keySymptoms: ['nyeri tumit', 'nyeri kaki', 'kaki pegal'],
    selfCare: [
      { title: 'Pijat Bola Golf / Botol Dingin', desc: 'Gulingkan telapak kaki di atas botol air dingin/es selama 10 menit untuk melepaskan ketegangan plantar.', icon: 'thermometer', color: '#0284C7', bg: '#E0F2FE' },
      { title: 'Gunakan Alas Kaki Empuk', desc: 'Gunakan sepatu dengan bantalan tumit yang baik dan hindari berjalan tanpa alas kaki di permukaan keras.', icon: 'pill', color: '#0D9488', bg: '#CCFBF1' }
    ]
  },

  // ── GENERAL FALLBACK CONDITIONS ──────────────────────────────────────────────
  {
    id: 'gen-1',
    name: 'Flu (Influenza)',
    category: 'Infeksi Saluran Pernapasan',
    severity: 'rendah',
    zone: 'head',
    summary: 'Infeksi virus sistemik yang menyebabkan demam, pusing, batuk, leher pegal, dan kelelahan tubuh.',
    keySymptoms: ['pusing / vertigo', 'batuk kering', 'batuk berdahak', 'sakit tenggorokan', 'hidung tersumbat', 'mual', 'muntah'],
    selfCare: [
      { title: 'Istirahat Cukup', desc: 'Tidur 8-9 jam per hari untuk membantu imun membasmi virus.', icon: 'bed', color: '#7C3AED', bg: '#EDE9FE' },
      { title: 'Cukupi Asupan Cairan', desc: 'Minum air putih dan kuah sup hangat secara teratur.', icon: 'droplet', color: '#0284C7', bg: '#E0F2FE' }
    ]
  }
];

const DEFAULT_WARNING_SIGNS = [
  'Demam sangat tinggi (> 39.5°C) atau tidak turun lebih dari 3 hari berturut-turut',
  'Sesak napas berat, bibir kebiruan, atau kesulitan bernapas saat berbicara',
  'Nyeri dada menjalar ke leher/lengan disertai keringat dingin hebat',
  'Penurunan kesadaran, kebingungan berat, atau sangat sulit dibangunkan',
  'Tanda dehidrasi berat: tidak buang air kecil > 8 jam, bibir sangat kering',
  'Muntah berulang tanpa bisa masuk cairan sedikitpun'
];

/**
 * Initialize database tables if PostgreSQL connection is present
 */
export const initDatabaseSchema = async () => {
  const isConnected = await testConnection();
  if (!isConnected) return;

  try {
    await query(`
      CREATE TABLE IF NOT EXISTS symptoms (
        id SERIAL PRIMARY KEY,
        zone_id VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS diseases (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        severity VARCHAR(20) CHECK (severity IN ('rendah', 'sedang', 'tinggi')),
        summary TEXT NOT NULL,
        zone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('[DB Schema] Tables verified successfully.');
  } catch (err) {
    console.error('[DB Schema Error] Table initialization error:', err.message);
  }
};

/**
 * Fetch body zones and symptoms list
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
    console.warn('[Model Warning] DB query failed, using memory fallback:', err.message);
    return FALLBACK_BODY_ZONES;
  }
};

/**
 * Core Symptom Matching Logic with Weighted Scoring for All Body Areas
 * @param {Array<{label: string, zone?: string, duration?: string, severity?: string} | string>} selectedSymptoms 
 */
export const matchConditionsFromSymptoms = async (selectedSymptoms) => {
  if (!selectedSymptoms || !Array.isArray(selectedSymptoms) || selectedSymptoms.length === 0) {
    return {
      conditions: [],
      overallUrgency: 'rendah',
      selfCareSteps: MEDICAL_KNOWLEDGE_BASE[0].selfCare,
      warningSigns: DEFAULT_WARNING_SIGNS,
    };
  }

  // Extract user symptoms normalized to lowercase
  const userSymptomsNormalized = selectedSymptoms.map((s) => {
    if (typeof s === 'string') {
      return {
        label: s.toLowerCase().trim(),
        zone: '',
        severity: 'ringan',
        duration: '',
      };
    }
    return {
      label: (s.label || s.name || String(s)).toLowerCase().trim(),
      zone: s.zone ? String(s.zone).toLowerCase() : '',
      severity: s.severity ? String(s.severity).toLowerCase() : 'ringan',
      duration: s.duration || '',
    };
  });

  const userLabels = userSymptomsNormalized.map((s) => s.label);

  // Score each condition in knowledge base
  const scoredConditions = MEDICAL_KNOWLEDGE_BASE.map((condition) => {
    let matchScore = 0;
    const matchedKeySymptoms = [];

    condition.keySymptoms.forEach((keySym) => {
      const keySymLower = keySym.toLowerCase();
      // Check if user reported this key symptom
      const matchFound = userSymptomsNormalized.find((uSym) =>
        uSym.label.includes(keySymLower) || keySymLower.includes(uSym.label)
      );

      if (matchFound) {
        matchedKeySymptoms.push(keySym);
        // Base points per matched symptom
        let points = 25;

        // Additional severity weight
        if (matchFound.severity === 'berat') points += 15;
        if (matchFound.severity === 'sedang') points += 8;

        matchScore += points;
      }
    });

    // Special bonus for High-Risk Cardiac matches when 'Nyeri Dada' + 'Jantung Berdebar' are present
    if (
      condition.id === 'chest-4' &&
      userLabels.some((l) => l.includes('nyeri dada')) &&
      userLabels.some((l) => l.includes('jantung berdebar'))
    ) {
      matchScore += 30;
    }

    // Special bonus for Appendicitis when 'Nyeri Perut' + 'Mual' / 'Muntah' are present
    if (
      condition.id === 'abd-4' &&
      userLabels.some((l) => l.includes('nyeri perut')) &&
      userLabels.some((l) => l.includes('mual') || l.includes('muntah'))
    ) {
      matchScore += 20;
    }

    // Calculate match percentage
    let matchPct = 0;
    if (matchedKeySymptoms.length > 0) {
      const ratio = matchedKeySymptoms.length / condition.keySymptoms.length;
      matchPct = Math.round((ratio * 50) + matchScore);
      // Floor threshold for matching condition
      matchPct = Math.max(matchPct, 52 + (matchedKeySymptoms.length * 10));
    } else {
      // Small base score if unrelated
      matchPct = Math.floor(Math.random() * 10) + 15;
    }

    // Clamp between 15% and 96%
    matchPct = Math.min(Math.max(matchPct, 15), 96);

    return {
      id: condition.id,
      name: condition.name,
      category: condition.category,
      severity: condition.severity,
      matchPct,
      summary: condition.summary,
      matchedSymptoms: matchedKeySymptoms.length > 0 ? matchedKeySymptoms : ['Gejala umum'],
      selfCare: condition.selfCare,
      zone: condition.zone,
    };
  });

  // Sort descending by match percentage
  scoredConditions.sort((a, b) => b.matchPct - a.matchPct);

  // Filter to only conditions that actually matched at least 1 key symptom (if any exists)
  let filteredConditions = scoredConditions.filter((c) => c.matchedSymptoms[0] !== 'Gejala umum');
  if (filteredConditions.length === 0) {
    filteredConditions = scoredConditions.slice(0, 3);
  } else {
    filteredConditions = filteredConditions.slice(0, 4);
  }

  // Determine top condition
  const topCondition = filteredConditions[0];

  // Evaluate Overall Urgency
  const hasSevereUserSelection = userSymptomsNormalized.some(
    (s) => s.severity === 'berat' || (s.label.includes('nyeri dada') && s.severity !== 'ringan') || s.label.includes('sesak napas')
  );

  let overallUrgency = 'rendah';
  if (hasSevereUserSelection || (topCondition && topCondition.severity === 'tinggi')) {
    overallUrgency = 'tinggi';
  } else if (topCondition && topCondition.severity === 'sedang') {
    overallUrgency = 'sedang';
  }

  // Pick self-care steps from top condition if available, else default
  const selfCareSteps = topCondition?.selfCare || MEDICAL_KNOWLEDGE_BASE[0].selfCare;

  // Tailor warning signs according to primary zone
  let warningSigns = DEFAULT_WARNING_SIGNS;
  if (topCondition?.zone === 'chest' || userLabels.some((l) => l.includes('dada') || l.includes('napas'))) {
    warningSigns = [
      'Nyeri dada hebat tertekan atau menjalar ke leher, bahu, atau lengan kiri',
      'Sesak napas mendadak disertai jantung berdebar kencang atau keringat dingin',
      'Pingsan, bibir/kuku terlihat kebiruan, atau sulit bernapas saat posisi duduk',
      'Demam tinggi >39°C disertai batuk darah'
    ];
  } else if (topCondition?.zone === 'head' || userLabels.some((l) => l.includes('kepala') || l.includes('pusing') || l.includes('gigi'))) {
    warningSigns = [
      'Sakit kepala hebat yang muncul mendadak secara tiba-tiba (seperti petir)',
      'Sakit kepala disertai leher kaku, muntah menyembur, atau gangguan bicara',
      'Penglihatan ganda, lumpuh pada separuh wajah/anggota gerak tubuh',
      'Sensasi berputar (vertigo) hebat yang tidak kunjung mereda >24 jam'
    ];
  } else if (topCondition?.zone === 'neck' || userLabels.some((l) => l.includes('tenggorokan') || l.includes('menelan'))) {
    warningSigns = [
      'Kesulitan bernapas atau tidak bisa menelan ludah sama sekali',
      'Pembengkakan hebat di leher hingga sulit membuka mulut',
      'Demam tinggi >39°C disertai bercak putih/nanah pada amandel',
      'Suara serak menetap lebih dari 2 minggu berturut-turut'
    ];
  } else if (topCondition?.zone === 'abdomen' || userLabels.some((l) => l.includes('perut') || l.includes('mual') || l.includes('muntah') || l.includes('diare'))) {
    warningSigns = [
      'Nyeri perut kanan bawah mendadak yang memburuk saat batuk/berjalan',
      'Muntah darah atau buang air besar berwarna hitam pekat / berdarah',
      'Tanda dehidrasi berat: bibir sangat kering, lemas hebat, tidak Kencing >8 jam',
      'Perut terasa keras kaku seperti papan bila disentuh'
    ];
  }

  return {
    conditions: filteredConditions.map(({ selfCare, zone, ...rest }) => rest),
    overallUrgency,
    selfCareSteps,
    warningSigns,
  };
};
