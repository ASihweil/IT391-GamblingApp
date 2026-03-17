import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const categories = ["All", "Sports", "Campus Life", "Academic"];

const categoryIcons = {
  Sports: "🏈",
  "Campus Life": "🏛️",
  Academic: "📚",
};

// PLACEHOLDER: replace with API data
const mockBets = [
  { id: 1, category: "Sports",      question: "Will ISU Football win their next home game?",               options: [{ label: "Yes", percent: 62 }, { label: "No", percent: 38 }] },
  { id: 2, category: "Sports",      question: "Will ISU Men's Basketball make it to the NCAA tournament?",  options: [{ label: "Yes", percent: 47 }, { label: "No", percent: 53 }] },
  { id: 3, category: "Sports",      question: "Will ISU set a new attendance record this season?",          options: [{ label: "Yes", percent: 31 }, { label: "No", percent: 69 }] },
  { id: 4, category: "Campus Life", question: "Will Reggie get shot?",                                      options: [{ label: "Yes", percent: 67 }, { label: "No", percent: 33 }] },
  { id: 5, category: "Campus Life", question: "Will classes be cancelled due to weather this semester?",    options: [{ label: "Yes", percent: 55 }, { label: "No", percent: 45 }] },
  { id: 6, category: "Campus Life", question: "Will the construction finish this year?",                    options: [{ label: "Yes", percent: 19 }, { label: "No", percent: 81 }] },
  { id: 7, category: "Academic",    question: "Will Matthew Graduate this year?",                           options: [{ label: "Yes", percent: 40 }, { label: "No", percent: 60 }] },
  { id: 8, category: "Academic",    question: "Will average gpa be above a 3.2?",                           options: [{ label: "Yes", percent: 88 }, { label: "No", percent: 12 }] },
  { id: 9, category: "Academic",    question: "Will we finish this project?",                               options: [{ label: "Yes", percent: 50 }, { label: "No", percent: 50 }] },
];

function BetCard({ bet, onBet }) {
  return (
    <div className={styles.card}>
      <span className={styles.badge}>
        {categoryIcons[bet.category]} {bet.category}
      </span>
      <p className={styles.question}>{bet.question}</p>
      <div className={styles.options}>
        {bet.options.map((opt) => (
          <div key={opt.label} className={styles.optionRow}>
            <div className={styles.optionLeft}>
              <span className={styles.optionLabel}>{opt.label}</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${opt.percent}%` }} />
              </div>
            </div>
            <span className={`${styles.percent} ${opt.percent >= 50 ? styles.percentHigh : ""}`}>
              {opt.percent}%
            </span>
          </div>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <button className={styles.betBtn} onClick={() => onBet(bet)}>
          Place Bet
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [balance] = useState(1500); // PLACEHOLDER: logged-in user balance
  const [modal, setModal] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [toast, setToast] = useState(null);

  const filtered = activeCategory === "All"
    ? mockBets
    : mockBets.filter((b) => b.category === activeCategory);

  const grouped = ["Sports", "Campus Life", "Academic"].map((cat) => ({
    cat,
    bets: filtered.filter((b) => b.category === cat),
  }));

  const openModal = (bet) => { setModal(bet); setSelectedOption(null); setBetAmount(""); };

  const handleConfirm = () => {
    if (!selectedOption || !betAmount || +betAmount <= 0) return;
    // LOGIC NEEDED: POST bet to API, deduct balance, refresh odds
    setModal(null);
    setToast(`Bet placed! ${betAmount} coins on "${selectedOption}"`);
    setTimeout(() => setToast(null), 3000);
  };

  const payout = modal && selectedOption && betAmount
    ? Math.round(+betAmount / (modal.options.find((o) => o.label === selectedOption).percent / 100))
    : null;

  return (
    <div className={styles.page}>

      <nav className={styles.navbar}>
        <div className={styles.brand} onClick={() => navigate("/")}>
          REDBIRDBETS
        </div>
        <div className={styles.balanceChip}>
          🪙 <strong>{balance.toLocaleString()}</strong> coins
        </div>
      </nav>

      <div className={styles.hero}>
        <h1>What's your prediction?</h1>
        <p>Browse open markets, place bets, and climb the leaderboard.</p>
      </div>

      <div className={styles.filterRow}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ""}`}
          >
            {categoryIcons[cat] && <span style={{ marginRight: 5 }}>{categoryIcons[cat]}</span>}
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {grouped.map(({ cat, bets }) =>
          bets.length === 0 ? null : (
            <div key={cat} className={styles.section}>
              <div className={styles.sectionHeader}>
                <span>{categoryIcons[cat]}</span>
                <h2>{cat}</h2>
                <span className={styles.countBadge}>{bets.length} open</span>
              </div>
              <div className={styles.grid}>
                {bets.map((bet) => (
                  <BetCard key={bet.id} bet={bet} onBet={openModal} />
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {modal && (
        <div className={styles.overlay} onClick={() => setModal(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setModal(null)}>✕</button>
            <span className={styles.badge}>
              {categoryIcons[modal.category]} {modal.category}
            </span>
            <p className={styles.modalQuestion}>{modal.question}</p>

            <p className={styles.modalLabel}>Choose outcome</p>
            <div className={styles.modalOptions}>
              {modal.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setSelectedOption(opt.label)}
                  className={`${styles.optionBtn} ${selectedOption === opt.label ? styles.optionBtnActive : ""}`}
                >
                  <span>{opt.label}</span>
                  <span>{opt.percent}%</span>
                </button>
              ))}
            </div>

            <p className={styles.modalLabel}>Bet amount (coins)</p>
            <input
              type="number"
              placeholder="e.g. 100"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className={styles.amountInput}
            />

            {payout && (
              <div className={styles.payoutPreview}>
                <span>Potential payout</span>
                <strong>{payout.toLocaleString()} coins</strong>
              </div>
            )}

            <button
              onClick={handleConfirm}
              className={`${styles.confirmBtn} ${!(selectedOption && betAmount) ? styles.confirmBtnDisabled : ""}`}
            >
              Confirm Bet
            </button>
          </div>
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
