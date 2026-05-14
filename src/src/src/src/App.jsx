import React, { useState } from "react";

const materials = [
  {
    id: "L33",
    title: "Gingival Crevicular Fluid",
    subtitle: "GCF, fungsi, mekanisme, komposisi, biomarker, dan metode pengambilan.",
  },
  {
    id: "L34",
    title: "Sistem Imunitas Rongga Mulut",
    subtitle: "Barier mukosa, saliva, GCF, tonsil, dan respons imun oral.",
  },
  {
    id: "L35",
    title: "Resident of Oral Microflora",
    subtitle: "Flora oral, distribusi, perlekatan, metabolisme, dan halitosis.",
  },
];

const summaries = {
  L33: {
    title: "Gingival Crevicular Fluid",
    text: "Gingival Crevicular Fluid atau GCF adalah cairan fisiologis yang berada di sulkus gingiva. GCF berasal dari kapiler darah, meningkat saat inflamasi, dan dapat digunakan sebagai indikator status jaringan periodontal.",
    points: [
      "GCF terdapat pada sulkus gingiva sehat maupun inflamasi.",
      "Volume GCF meningkat pada inflamasi gingiva.",
      "Fungsi GCF: pertahanan, pembersih, pelekat, dan penanda inflamasi.",
      "Metode pengambilan GCF dapat menggunakan paper strip.",
    ],
  },
  L34: {
    title: "Sistem Imunitas Rongga Mulut",
    text: "Sistem imun rongga mulut berfungsi melindungi gigi, gingiva, rahang, dan mukosa oral dari infeksi. Pertahanan terdiri dari barier anatomi, saliva, sel imun, tonsil, dan antibodi.",
    points: [
      "Mukosa oral adalah barier pertama terhadap mikroba.",
      "Saliva mengandung agen antimikroba dan sIgA.",
      "Tonsil berperan menangkap antigen dan menghasilkan respons imun.",
      "GCF membawa komponen imun ke sulkus gingiva.",
    ],
  },
  L35: {
    title: "Resident of Oral Microflora",
    text: "Mikroflora oral adalah kumpulan mikroorganisme yang hidup pada jaringan keras dan lunak rongga mulut. Flora normal dapat melindungi tubuh, tetapi dapat menjadi patogen pada kondisi tertentu.",
    points: [
      "Rongga mulut memiliki lebih dari 700 spesies bakteri.",
      "Resident flora adalah flora normal yang menetap.",
      "Dorsum lidah menjadi sumber utama VSC penyebab halitosis.",
      "S. mutans berperan penting dalam karies.",
    ],
  },
};

const questions = {
  L33: [
    {
      q: "Seorang pasien gingivitis mengalami peningkatan cairan pada sulkus gingiva. Mekanisme yang paling tepat adalah:",
      options: [
        "Peningkatan permeabilitas vaskular akibat inflamasi",
        "Penurunan jumlah leukosit",
        "Peningkatan mineralisasi enamel",
        "Aktivasi ameloblas",
        "Penurunan aliran darah gingiva",
      ],
      answer: 0,
      explain: "Inflamasi meningkatkan permeabilitas pembuluh darah sehingga cairan lebih mudah keluar ke sulkus sebagai GCF.",
    },
    {
      q: "Metode pengambilan GCF yang menggunakan paper strip disebut:",
      options: [
        "Microcapillary technique",
        "Absorption technique",
        "Intracrevicular washing",
        "Biopsy technique",
        "Culture technique",
      ],
      answer: 1,
      explain: "Absorption technique menggunakan paper strip untuk menyerap GCF.",
    },
  ],
  L34: [
    {
      q: "Komponen saliva yang berperan mencegah perlekatan bakteri seperti S. mutans adalah:",
      options: ["sIgA", "Hemoglobin", "Kolagen", "Amelogenin", "Dentin"],
      answer: 0,
      explain: "sIgA menghambat adhesi bakteri dan virus pada permukaan mukosa dan gigi.",
    },
  ],
  L35: [
    {
      q: "Mikroorganisme yang menetap sebagai flora normal rongga mulut disebut:",
      options: ["Transien", "Resident", "Patogen obligat", "Steril", "Eksogen"],
      answer: 1,
      explain: "Resident atau indigenous flora adalah flora normal tetap di rongga mulut.",
    },
  ],
};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  function openMaterial(id) {
    setSelectedMaterial(id);
    setPage("material");
  }

  function startQuiz(id, random = false) {
    const source = questions[id] || [];
    const prepared = random ? shuffleArray(source) : source;
    setSelectedMaterial(id);
    setQuiz(prepared);
    setAnswers(Array(prepared.length).fill(null));
    setIndex(0);
    setShowResult(false);
    setPage("quiz");
  }

  function chooseAnswer(optionIndex) {
    if (answers[index] !== null) return;
    const copy = [...answers];
    copy[index] = optionIndex;
    setAnswers(copy);
  }

  function nextQuestion() {
    if (index < quiz.length - 1) {
      setIndex(index + 1);
    } else {
      setShowResult(true);
    }
  }

  if (page === "material") {
    const material = summaries[selectedMaterial];

    return (
      <div style={styles.page}>
        <button style={styles.backButton} onClick={() => setPage("home")}>
          ← Dashboard
        </button>

        <div style={styles.card}>
          <h1>{selectedMaterial} · {material.title}</h1>
          <p style={styles.paragraph}>{material.text}</p>

          <h2>Poin Penting</h2>
          <ul>
            {material.points.map((point, i) => (
              <li key={i} style={styles.listItem}>{point}</li>
            ))}
          </ul>

          <h2>Pendalaman Materi</h2>
          <p style={styles.paragraph}>
            Pahami kata kunci, hubungan mekanisme, dan implikasi klinis dari materi ini.
            Dalam soal CBT, jawaban biasanya tidak hanya menanyakan definisi, tetapi juga
            hubungan sebab-akibat, proses, dan kondisi klinis.
          </p>

          <button style={styles.primaryButton} onClick={() => startQuiz(selectedMaterial)}>
            Mulai Latihan
          </button>
        </div>
      </div>
    );
  }

  if (page === "quiz") {
    const current = quiz[index];
    const selected = answers[index];

    if (showResult) {
      const score = answers.reduce((total, answer, i) => {
        return total + (answer === quiz[i].answer ? 1 : 0);
      }, 0);

      return (
        <div style={styles.page}>
          <button style={styles.backButton} onClick={() => setPage("home")}>
            ← Dashboard
          </button>

          <div style={styles.card}>
            <h1>Hasil Quiz</h1>
            <p style={styles.score}>Skor: {score}/{quiz.length}</p>

            <h2>Review Jawaban</h2>
            {quiz.map((item, i) => (
              <div key={i} style={styles.reviewBox}>
                <strong>{i + 1}. {item.q}</strong>
                <p>Jawaban benar: {item.options[item.answer]}</p>
                <p>{item.explain}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div style={styles.page}>
        <button style={styles.backButton} onClick={() => setPage("home")}>
          ← Dashboard
        </button>

        <div style={styles.card}>
          <p style={styles.badge}>Soal {index + 1}/{quiz.length}</p>
          <h1>{current.q}</h1>

          {current.options.map((option, i) => {
            const isCorrect = selected !== null && i === current.answer;
            const isWrong = selected === i && selected !== current.answer;

            return (
              <button
                key={i}
                onClick={() => chooseAnswer(i)}
                style={{
                  ...styles.option,
                  background: isCorrect ? "#dcfce7" : isWrong ? "#fee2e2" : "#f1f5f9",
                  borderColor: isCorrect ? "#22c55e" : isWrong ? "#ef4444" : "#e2e8f0",
                }}
              >
                {String.fromCharCode(65 + i)}. {option}
              </button>
            );
          })}

          {selected !== null && (
            <div style={styles.explainBox}>
              <strong>Pembahasan:</strong>
              <p>{current.explain}</p>
            </div>
          )}

          <button
            style={{
              ...styles.primaryButton,
              opacity: selected === null ? 0.5 : 1,
            }}
            disabled={selected === null}
            onClick={nextQuestion}
          >
            {index === quiz.length - 1 ? "Lihat Hasil" : "Berikutnya"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>WT 4 GOOOO!!!</h1>
        <p style={styles.heroSubtitle}>Bismillah wetee</p>
      </div>

      <h2 style={styles.sectionTitle}>Pilih Materi</h2>

      <div style={styles.grid}>
        {materials.map((m) => (
          <div key={m.id} style={styles.materialCard}>
            <div style={styles.materialId}>{m.id}</div>
            <h2>{m.title}</h2>
            <p>{m.subtitle}</p>

            <div style={styles.buttonGrid}>
              <button style={styles.secondaryButton} onClick={() => openMaterial(m.id)}>
                Materi
              </button>
              <button style={styles.primaryButtonSmall} onClick={() => startQuiz(m.id)}>
                Latihan
              </button>
              <button style={styles.darkButton} onClick={() => startQuiz(m.id, true)}>
                Acak
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px",
    background: "#f8fafc",
    color: "#0f172a",
  },
  hero: {
    background: "linear-gradient(135deg, #1d4ed8, #0f172a)",
    borderRadius: "32px",
    padding: "48px",
    color: "white",
    marginBottom: "32px",
  },
  heroTitle: {
    fontSize: "52px",
    margin: 0,
  },
  heroSubtitle: {
    fontSize: "24px",
    marginTop: "12px",
  },
  sectionTitle: {
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  materialCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 1px 4px rgba(15, 23, 42, 0.06)",
  },
  materialId: {
    width: "52px",
    height: "52px",
    borderRadius: "16px",
    background: "#2563eb",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    marginTop: "20px",
  },
  primaryButton: {
    background: "#2563eb",
    color: "white",
    border: 0,
    padding: "14px 20px",
    borderRadius: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
  },
  primaryButtonSmall: {
    background: "#2563eb",
    color: "white",
    border: 0,
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  secondaryButton: {
    background: "white",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  darkButton: {
    background: "#0f172a",
    color: "white",
    border: 0,
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  backButton: {
    background: "transparent",
    border: 0,
    color: "#2563eb",
    fontWeight: "bold",
    marginBottom: "20px",
    cursor: "pointer",
  },
  card: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "28px",
    padding: "32px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  paragraph: {
    lineHeight: 1.7,
    color: "#475569",
  },
  listItem: {
    marginBottom: "10px",
    lineHeight: 1.6,
  },
  badge: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  option: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "18px",
    borderRadius: "16px",
    border: "2px solid #e2e8f0",
    marginBottom: "12px",
    cursor: "pointer",
    fontSize: "16px",
  },
  explainBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "16px",
    marginTop: "16px",
  },
  score: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2563eb",
  },
  reviewBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "16px",
    marginBottom: "12px",
  },
};
