import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Moon,
  Sun,
  Monitor,
  Menu,
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Printer,
  ExternalLink,
} from "lucide-react";
import "./styles.css";

const shelves = [
  {
    title: "Benefits",
    items: [
      [
        "High income and living standards",
        "GDP per person rose from a few hundred dollars at independence to among the highest in the world, funding housing, schools and healthcare.",
      ],
      [
        "Global trade hub",
        "A deep-water port, a major airport and open trade policy made the country a regional centre for shipping, finance and logistics.",
      ],
      [
        "Foreign investment and skilled jobs",
        "A stable legal system and clear rules drew multinational firms, bringing technology and better-paying work.",
      ],
      [
        "Public housing and savings",
        "HDB flats and the Central Provident Fund turned most residents into homeowners and long-term savers.",
      ],
      [
        "Fiscal strength",
        "Persistent budget discipline and large reserves give room to respond to crises.",
      ],
    ],
    takeaway:
      "Benefit in one line: openness plus strong institutions turned a tiny market into a global one.",
  },
  {
    title: "Challenges",
    items: [
      [
        "Ageing population and low births",
        "The fertility rate is far below replacement level, so the workforce grows slowly while healthcare costs rise.",
      ],
      [
        "Dependence on external demand",
        "Trade is several times the size of GDP, so global downturns hit hard.",
      ],
      [
        "Inequality and cost of living",
        "Housing, education and daily costs are high, and the gap between top and bottom incomes is a policy concern.",
      ],
      [
        "Reliance on foreign workers",
        "A large share of the workforce is non-resident, which raises questions about wages, productivity and social balance.",
      ],
      [
        "Scarce land, water and energy",
        "Almost all water, food and energy inputs depend on imports or costly technology.",
      ],
      [
        "Climate exposure",
        "A low-lying island faces sea-level rise and heat, and its carbon-intensive industry must change.",
      ],
    ],
    takeaway:
      "Challenge in one line: the same openness that created wealth also creates exposure.",
  },
  {
    title: "Strategies",
    items: [
      [
        "Move up the value chain",
        "Shift from labour-intensive manufacturing to electronics, biomedical science, finance and advanced services.",
      ],
      [
        "Skills for life",
        "SkillsFuture credits and retraining keep workers employable as technology changes.",
      ],
      [
        "Smart Nation and digital economy",
        "Public investment in data, payments, AI and digital government to raise productivity.",
      ],
      [
        "Diversify partners",
        "A wide network of free trade agreements spreads risk across many markets.",
      ],
      [
        "Secure resources",
        "Recycled NEWater, desalination, reservoirs and imports form the four national taps.",
      ],
      [
        "Green growth",
        "The Singapore Green Plan 2030 targets cleaner energy, greener buildings and a low-carbon future.",
      ],
      [
        "Support families and the vulnerable",
        "Targeted grants, taxes and transfers to share gains and ease ageing costs.",
      ],
    ],
    takeaway:
      "Strategy in one line: keep reinventing the economy before the old model runs out.",
  },
];

const timeline = [
  {
    year: 1965,
    gdp: 500,
    phase: "Survival",
    text: "Separation from Malaysia on 9 August 1965. Priorities: jobs, housing and defence. The Economic Development Board (1961) and Jurong Industrial Estate began drawing factories.",
  },
  {
    year: 1980,
    gdp: 4900,
    phase: "Industrial take-off",
    text: "Export manufacturing, port expansion and Singapore Airlines. Labour-intensive work gave way to higher-skill industry.",
  },
  {
    year: 1990,
    gdp: 12000,
    phase: "Regional hub",
    text: "Electronics, finance and shipping grew fast. Planning focused on becoming a regional headquarters for multinationals.",
  },
  {
    year: 2000,
    gdp: 23800,
    phase: "Knowledge economy",
    text: "After the Asian financial crisis, policy pushed biomedical science, services and innovation.",
  },
  {
    year: 2010,
    gdp: 47000,
    phase: "Rapid growth, new strains",
    text: "Strong post-crisis rebound, but rising costs, a larger foreign workforce and housing pressure became political issues.",
  },
  {
    year: 2020,
    gdp: 60700,
    phase: "Pandemic shock",
    text: "COVID-19 hit trade, tourism and aviation and the economy contracted by roughly 4 percent. Large support packages protected jobs and firms.",
  },
  {
    year: 2024,
    gdp: 94900,
    phase: "Strong rebound",
    text: "Output recovered above pre-pandemic levels, helped by finance, electronics and AI-related demand. GDP per person passed US$90,000.",
  },
  {
    year: 2025,
    gdp: 98800,
    phase: "Smart, green and ageing",
    text: "Growth stayed solid at about 5 percent, while Smart Nation, SkillsFuture and Green Plan 2030 aim to lift productivity as the population ages and trade tensions rise.",
  },
];

const questions = [
  {
    question: "In which year did Singapore become an independent country?",
    options: ["1959", "1963", "1965", "1971"],
    answer: 2,
    explanation: "Singapore separated from Malaysia on 9 August 1965.",
  },
  {
    question:
      "Which agency was set up in 1961 to attract investment and industry?",
    options: [
      "Economic Development Board",
      "Housing and Development Board",
      "Monetary Authority",
      "Land Transport Authority",
    ],
    answer: 0,
    explanation:
      "The EDB led the push for industrial estates and foreign investors.",
  },
  {
    question:
      "Which pair best describes the biggest long-term population challenge?",
    options: [
      "Rapid youth growth and low density",
      "Ageing and low birth rates",
      "Falling life expectancy",
      "Mass emigration",
    ],
    answer: 1,
    explanation:
      "Low fertility and longer lives mean a shrinking share of working-age residents.",
  },
  {
    question: "What do the “four national taps” refer to?",
    options: [
      "Four ports",
      "Four central banks",
      "Four water sources",
      "Four trade treaties",
    ],
    answer: 2,
    explanation:
      "Imported water, local catchment, NEWater and desalinated water.",
  },
  {
    question:
      "Which programme helps workers pay for retraining throughout their careers?",
    options: ["SkillsFuture", "CPF Life", "Baby Bonus", "MediSave"],
    answer: 0,
    explanation:
      "SkillsFuture, launched in 2015, gives credits and courses for lifelong learning.",
  },
];

const gallery = [
  {
    title: "Trade and port",
    text: "Open trade and a deep-water hub link Singapore to the world.",
    image:
      "https://www.gocomet.com/blog/wp-content/uploads/2023/10/singapore1_16.9-1200x675-1.jpg",
    fallback: "Container port and cargo cranes",
  },
  {
    title: "Public housing",
    text: "HDB flats and CPF savings made most residents homeowners.",
    image:
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1000&q=85",
    fallback: "Singapore public housing blocks",
  },
  {
    title: "Water security",
    text: "Four national taps: imports, catchment, NEWater and desalination.",
    image:
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=1000&q=85",
    fallback: "Reservoir water landscape",
  },
  {
    title: "Smart and green",
    text: "Smart Nation and the Green Plan 2030 aim for growth that lasts.",
    image:
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1000&q=85",
    fallback: "Singapore skyline with greenery",
  },
];

function ThemeControl({ theme, setTheme }) {
  const options = [
    { id: "system", label: "System", Icon: Monitor },
    { id: "light", label: "Light", Icon: Sun },
    { id: "dark", label: "Dark", Icon: Moon },
  ];
  return (
    <div className="theme-control" aria-label="Choose colour theme">
      {options.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={theme === id ? "theme-choice active" : "theme-choice"}
          onClick={() => setTheme(id)}
          aria-pressed={theme === id}
          title={`${label} theme`}
        >
          <Icon size={15} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("sg-theme") || "system";
    } catch {
      return "system";
    }
  });
  const [shelf, setShelf] = useState(0);
  const [yearIndex, setYearIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem("sg-best") || 0);
    } catch {
      return 0;
    }
  });
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sg-notes") || "[]");
    } catch {
      return [];
    }
  });
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ kind: "", text: "" });
  const [sending, setSending] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("sg-theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("sg-notes", JSON.stringify(notes));
    } catch {}
  }, [notes]);

  const current = timeline[yearIndex];
  const chartPoints = useMemo(() => {
    const left = 42,
      right = 500,
      top = 18,
      bottom = 220;
    return timeline.map((item, i) => ({
      x: left + ((right - left) * i) / (timeline.length - 1),
      y:
        bottom -
        ((Math.log(item.gdp) - Math.log(300)) /
          (Math.log(100000) - Math.log(300))) *
          (bottom - top),
    }));
  }, []);
  const chartLine = chartPoints
    .map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`)
    .join(" ");

  function chooseAnswer(index) {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[questionIndex].answer) setScore((s) => s + 1);
  }
  function nextQuestion() {
    if (questionIndex === questions.length - 1) {
      const finalScore = score;
      if (finalScore > best) {
        setBest(finalScore);
        try {
          localStorage.setItem("sg-best", String(finalScore));
        } catch {}
      }
      setFinished(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
    }
  }
  function restartQuiz() {
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  async function submitNote(event) {
    event.preventDefault();
    const cleanName = name.trim(),
      cleanMessage = message.trim();
    if (!cleanName)
      return setStatus({ kind: "error", text: "Enter your name." });
    if (cleanMessage.length < 3)
      return setStatus({
        kind: "error",
        text: "Write a comment of at least a few characters.",
      });
    setSending(true);
    setStatus({ kind: "", text: "" });
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, message: cleanMessage }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Could not send your note.");
      const note = {
        name: cleanName,
        message: cleanMessage,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      setNotes((currentNotes) => [note, ...currentNotes].slice(0, 50));
      setName("");
      setMessage("");
      setStatus({
        kind: "success",
        text: "Your note was sent to the Telegram group.",
      });
    } catch (error) {
      setStatus({ kind: "error", text: error.message });
    } finally {
      setSending(false);
    }
  }

  const nav = [
    ["Explore", "#explore"],
    ["Pictures", "#gallery"],
    ["Timeline", "#timeline"],
    ["Quiz", "#quiz"],
    ["Visitors", "#visitors"],
    ["Sources", "#sources"],
  ];
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">SG</span>
            <span>
              FIELD NOTES <small>ECONOMY / 01</small>
            </span>
          </a>
          <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="top-actions">
            <ThemeControl theme={theme} setTheme={setTheme} />
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenu((v) => !v)}
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> RESEARCH PRESENTATION{" "}
              <span className="eyebrow-line" /> SINGAPORE
            </div>
            <h1>
              Singapore’s Economic Development
              <span className="title-period">.</span>
            </h1>
            <p className="hero-lead">
              Benefits, challenges and strategies — how a small island with few
              natural resources became one of the world’s richest economies,
              what that growth costs, and how it plans to stay ahead.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#explore">
                Explore the research <ArrowDown size={16} />
              </a>
              <button className="button ghost" onClick={() => window.print()}>
                <Printer size={16} /> Print presentation
              </button>
            </div>
            <div className="hero-meta">
              <span>PREPARED BY BUNLENG</span>
              <span>•</span>
              <span>ECONOMIC DEVELOPMENT STUDY</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1500&q=90"
              alt="Singapore Marina Bay skyline at dusk"
            />
            <div className="image-label">
              <span>01 / THE CITY-STATE</span>
              <span>MARINA BAY, SINGAPORE</span>
            </div>
            <div className="visual-stamp">
              SG
              <br />
              <small>1965—2025</small>
            </div>
          </div>
          <div className="hero-stats">
            <div>
              <strong>1965</strong>
              <span>Year of independence</span>
            </div>
            <div>
              <strong>~US$500 → ~US$99k</strong>
              <span>GDP per person, 1965 to 2025 (rounded)</span>
            </div>
            <div>
              <strong>~735 km²</strong>
              <span>Land area — space is a constant limit</span>
            </div>
          </div>
        </section>

        <section id="explore" className="section">
          <div className="section-heading">
            <div>
              <div className="kicker">01 / THE RESEARCH</div>
              <h2>Three sides of growth.</h2>
            </div>
            <p>
              Three shelves, one for each part of the research question. Select
              a topic to explore its key points.
            </p>
          </div>
          <div className="research-layout">
            <div
              className="shelf-tabs"
              role="tablist"
              aria-label="Research topics"
            >
              {shelves.map((item, i) => (
                <button
                  key={item.title}
                  role="tab"
                  aria-selected={shelf === i}
                  onClick={() => setShelf(i)}
                >
                  <span>0{i + 1}</span>
                  {item.title}
                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>
            <div className="shelf-panel" role="tabpanel">
              <div className="shelf-panel-top">
                <span>KEY FINDINGS / 0{shelf + 1}</span>
                <span>
                  {String(shelves[shelf].items.length).padStart(2, "0")} POINTS
                </span>
              </div>
              <div className="research-items">
                {shelves[shelf].items.map(([title, body], i) => (
                  <article className="research-item" key={title}>
                    <span className="item-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="takeaway">
                <span>IN SUMMARY</span>
                {shelves[shelf].takeaway}
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="section-heading">
            <div>
              <div className="kicker">02 / VISUAL CONTEXT</div>
              <h2>A City In Motion.</h2>
            </div>
            <p className="sub">
              Four scenes that stand for the research: trade, housing, water and
              the green and digital future.
            </p>
          </div>
          <div className="gallery-grid">
            {gallery.map((item, i) => (
              <figure
                className={`gallery-card gallery-${i + 1}`}
                key={item.title}
              >
                <div className="gallery-image">
                  <img
                    src={item.image}
                    alt={item.fallback}
                    loading="lazy"
                    onError={(e) => {
                      // Instead of hiding it into a blank space, show the alt text as a fallback badge
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      parent.classList.add("image-fallback");
                      parent.innerHTML += `<div style="padding: 20px; background: #333; color: #fff; text-align: center; font-size: 14px;">Image unavailable: ${item.fallback}</div>`;
                    }}
                  />
                  <span>0{i + 1}</span>
                </div>
                <figcaption>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="timeline" className="section">
          <div className="section-heading">
            <div>
              <div className="kicker">03 / SIX DECADES</div>
              <h2>The long climb.</h2>
            </div>
            <p>
              Move through the timeline to see how policy shifted as income
              rose. GDP per person is rounded and approximate, in current US
              dollars.
            </p>
          </div>
          <div className="timeline-card">
            <div className="timeline-copy">
              <div className="timeline-label">SELECT A MILESTONE</div>
              <div className="timeline-year">
                {current.year}
                <span>.</span>
              </div>
              <div className="timeline-gdp">
                GDP PER PERSON{" "}
                <strong>≈ US${current.gdp.toLocaleString("en-US")}</strong>
              </div>
              <h3>{current.phase}</h3>
              <p>{current.text}</p>
              <input
                className="timeline-range"
                type="range"
                min="0"
                max="7"
                step="1"
                value={yearIndex}
                onChange={(e) => setYearIndex(Number(e.target.value))}
                aria-label="Choose a year"
              />
              <div className="timeline-ticks">
                {timeline.map((t, i) => (
                  <button
                    key={t.year}
                    className={i === yearIndex ? "selected" : ""}
                    onClick={() => setYearIndex(i)}
                  >
                    {t.year}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-wrap">
              <div className="chart-heading">
                <span>GDP PER CAPITA / CURRENT US$</span>
                <span>1965 — 2025</span>
              </div>
              <svg
                viewBox="0 0 520 260"
                role="img"
                aria-label="Line chart of Singapore GDP per person rising from about 500 dollars in 1965 to about 99,000 in 2025"
              >
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity=".22"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                {[50, 100, 150, 200].map((y) => (
                  <line
                    key={y}
                    x1="42"
                    x2="500"
                    y1={y}
                    y2={y}
                    stroke="var(--line)"
                    strokeDasharray="3 7"
                  />
                ))}
                <path
                  d={`${chartLine} L 500 220 L 42 220 Z`}
                  fill="url(#chartFill)"
                />
                <path
                  d={chartLine}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {chartPoints.map((p, i) => (
                  <g key={i}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={i === yearIndex ? 7 : 4}
                      fill={
                        i === yearIndex
                          ? "var(--accent-strong)"
                          : "var(--accent)"
                      }
                      stroke="var(--panel)"
                      strokeWidth="2"
                    />
                    <text
                      x={p.x}
                      y="245"
                      textAnchor="middle"
                      fill="var(--muted)"
                      fontSize="10"
                    >
                      {timeline[i].year}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="chart-footnote">
                Source basis: World Bank series (2024 and 2025 as published in
                2026), rounded. Later revisions are possible.
              </div>
            </div>
          </div>
        </section>

        <section id="quiz" className="section quiz-section">
          <div className="section-heading">
            <div>
              <div className="kicker">04 / TEST YOURSELF</div>
              <h2>What did you pick up?</h2>
            </div>
            <p>
              Five questions drawn from the research. See how many you get
              right.
            </p>
          </div>
          <div className="quiz-card">
            {!finished ? (
              <>
                <div className="quiz-top">
                  <span>VISITOR CHALLENGE</span>
                  <span>
                    QUESTION {String(questionIndex + 1).padStart(2, "0")} / 05
                  </span>
                </div>
                <div className="quiz-progress">
                  <span
                    style={{
                      width: `${((questionIndex + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>
                <h3>{questions[questionIndex].question}</h3>
                <div className="answer-list">
                  {questions[questionIndex].options.map((option, i) => (
                    <button
                      key={option}
                      disabled={selected !== null}
                      className={`answer-option ${selected === i ? (i === questions[questionIndex].answer ? "correct" : "incorrect") : selected !== null && i === questions[questionIndex].answer ? "reveal-correct" : ""}`}
                      onClick={() => chooseAnswer(i)}
                    >
                      <span>{String.fromCharCode(65 + i)}</span>
                      {option}
                      {selected !== null &&
                        i === questions[questionIndex].answer && (
                          <CheckCircle2 size={18} />
                        )}
                    </button>
                  ))}
                </div>
                {selected !== null && (
                  <div className="answer-feedback">
                    <strong>
                      {selected === questions[questionIndex].answer
                        ? "Correct."
                        : "Not quite."}
                    </strong>{" "}
                    {questions[questionIndex].explanation}
                  </div>
                )}
                <div className="quiz-bottom">
                  <span>{score} CORRECT SO FAR</span>
                  <button
                    className="button primary"
                    disabled={selected === null}
                    onClick={nextQuestion}
                  >
                    {questionIndex === questions.length - 1
                      ? "See my score"
                      : "Next question"}{" "}
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="quiz-result">
                <div className="kicker">YOUR RESULT</div>
                <div className="score-number">
                  {score}
                  <span>/ 5</span>
                </div>
                <h3>
                  {score === 5
                    ? "Perfect. You could run this stall."
                    : score >= 3
                      ? "Good result. Keep exploring."
                      : "Take another look around."}
                </h3>
                <p>
                  {score === 5
                    ? "You have a strong grasp of the key milestones and policies."
                    : score >= 3
                      ? "Read the Challenges shelf again for the rest."
                      : "Walk the shelves once more and try again."}
                </p>
                <div className="best-score">
                  BEST SCORE IN THIS BROWSER{" "}
                  <strong>{Math.max(best, score)} / 5</strong>
                </div>
                <button className="button primary" onClick={restartQuiz}>
                  Try again <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="visitors" className="section visitor-section">
          <div className="section-heading">
            <div>
              <div className="kicker">05 / JOIN THE CONVERSATION</div>
              <h2>Visitor notebook.</h2>
            </div>
            <p>
              Leave a question or comment for the researcher. New notes are
              forwarded to the project’s Telegram group.
            </p>
          </div>
          <div className="visitor-layout">
            <form className="notebook-form" onSubmit={submitNote}>
              <div className="form-header">
                <span>LEAVE A NOTE</span>
                <span>
                  <span className="live-dot" /> GROUP DELIVERY
                </span>
              </div>
              <label>
                Your name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={40}
                  autoComplete="name"
                  placeholder="How should we address you?"
                />
              </label>
              <label>
                Your comment or question
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  maxLength={300}
                  placeholder="Share a thought, question or suggestion…"
                />
              </label>
              <div className="form-foot">
                <span>{message.length}/300 characters</span>
                <button
                  className="button primary"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send note"} <Send size={15} />
                </button>
              </div>
              {status.text && (
                <p className={`form-status ${status.kind}`} role="status">
                  {status.kind === "success" ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}{" "}
                  {status.text}
                </p>
              )}
              <p className="privacy-note">
                Your note and name will be shared with members of the project
                Telegram group. Please do not include private or sensitive
                information.
              </p>
            </form>
            <div className="notes-column">
              <div className="notes-heading">
                <span>RECENT NOTES</span>
                <span>{notes.length} ON THIS DEVICE</span>
              </div>
              {notes.length ? (
                notes.slice(0, 8).map((note, i) => (
                  <article className="visitor-note" key={`${note.date}-${i}`}>
                    <div className="note-avatar">
                      {note.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h3>{note.name}</h3>
                      <p>{note.message}</p>
                      <time>{note.date}</time>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-notes">
                  <span>✳</span>
                  <p>
                    No notes on this device yet.
                    <br />
                    Be the first visitor to leave one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="sources" className="section sources-section">
          <div className="section-heading">
            <div>
              <div className="kicker">06 / FURTHER READING</div>
              <h2>Sources & notes.</h2>
            </div>
            <p>
              Replace or extend these with the exact references from your own
              paper before presenting.
            </p>
          </div>
          <ol className="source-list">
            <li>
              <span>01</span>
              <div>
                <strong>World Bank</strong>
                <p>
                  World Development Indicators: GDP per capita (current US$,
                  1965 to 2025) and trade as a share of GDP, Singapore.
                </p>
                <a
                  href="https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=SG"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open data <ExternalLink size={13} />
                </a>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Singapore Department of Statistics</strong>
                <p>Population, labour force and national accounts releases.</p>
                <a
                  href="https://www.singstat.gov.sg/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open website <ExternalLink size={13} />
                </a>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>
                  Economic Development Board and Ministry of Trade and Industry
                </strong>
                <p>
                  Economic Strategy Review and industry transformation reports.
                </p>
                <a
                  href="https://www.edb.gov.sg/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open website <ExternalLink size={13} />
                </a>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Lee Kuan Yew</strong>
                <p>
                  <i>
                    From Third World to First: The Singapore Story, 1965–2000.
                  </i>
                </p>
              </div>
            </li>
            <li>
              <span>05</span>
              <div>
                <strong>Ministry of Sustainability and the Environment</strong>
                <p>
                  Singapore Green Plan 2030 and water supply (the four national
                  taps).
                </p>
                <a
                  href="https://www.greenplan.gov.sg/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open website <ExternalLink size={13} />
                </a>
              </div>
            </li>
          </ol>
          <p className="source-caution">
            Figures are rounded and for study display. Verify each number
            against your cited source before submission.
          </p>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span>SINGAPORE / ECONOMIC DEVELOPMENT</span>
          <span>RESEARCH PRESENTATION · 1965—2025</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
