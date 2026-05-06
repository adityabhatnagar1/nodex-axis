  import { useState, useEffect, useRef } from "react";
  import axisLogo from "../assets/axis.png";

  // ── DATA ────────────────────────────────────────────────────────────────────


  // ── CONTEXT STREAM ─────────────────────────────────────────────
  const CONTEXT_STREAM = [
  {
    time: "07:40",
    label: "Sleep Duration",
    value: "5h 20m detected",
    status: "poor",
  },
  {
    time: "08:10",
    label: "Morning Device Usage",
    value: "Phone opened within 3 min of waking",
    status: "warning",
  },
  {
    time: "09:00",
    label: "Breakfast Status",
    value: "Meal skipped",
    status: "poor",
  },
  {
    time: "11:30",
    label: "Hydration Level",
    value: "Low water intake detected",
    status: "warning",
  },
  {
    time: "13:20",
    label: "Sedentary Duration",
    value: "3h 10m sitting streak",
    status: "poor",
  },
  {
    time: "15:45",
    label: "Stress Pattern",
    value: "Elevated during study block",
    status: "warning",
  },
  {
    time: "18:30",
    label: "Food Ordering Activity",
    value: "Delivery application opened",
    status: "high",
  },
  {
    time: "22:50",
    label: "Late-Night Screen Use",
    value: "Continuous device activity detected",
    status: "high",
  },
  {
    time: "23:10",
    label: "Snack Event",
    value: "High sugar intake probability",
    status: "poor",
  },
];

  // ── MEAL EVENTS ────────────────────────────────────────────────
  const MEAL_EVENTS = [
  {
    time: "08:55",
    meal: "Breakfast",
    event: "Breakfast skipped",
    quality: "poor",
  },
  {
    time: "10:30",
    meal: "Hydration",
    event: "Water intake logged",
    quality: "good",
  },
  {
    time: "11:00",
    meal: "Movement",
    event: "Short walking activity detected",
    quality: "good",
  },
  {
    time: "12:40",
    meal: "Snack",
    event: "Tea + biscuits consumed",
    quality: "warning",
  },
  {
    time: "14:20",
    meal: "Lunch",
    event: "Lunch timing delayed",
    quality: "warning",
  },
  {
    time: "16:00",
    meal: "Snack",
    event: "Protein-based snack logged",
    quality: "good",
  },
  {
    time: "17:50",
    meal: "Snack",
    event: "Chips + soft drink detected",
    quality: "poor",
  },
  {
    time: "20:15",
    meal: "Dinner",
    event: "Restaurant order detected",
    quality: "warning",
  },
  {
    time: "20:30",
    meal: "Dinner",
    event: "Home meal alternative logged",
    quality: "good",
  },
  {
    time: "22:00",
    meal: "Device Usage",
    event: "Reduced screen activity",
    quality: "good",
  },
  {
    time: "23:15",
    meal: "Late Snack",
    event: "High-sugar snack consumed",
    quality: "poor",
  },
];

  // ── HABIT TRIGGERS ─────────────────────────────────────────────
  const HABIT_TRIGGERS = [
  {
    trigger: "Poor sleep",
    impact: "Higher impulsive eating probability",
  },
  {
    trigger: "Skipped breakfast",
    impact: "Late-day sugar cravings increased",
  },
  {
    trigger: "Low hydration",
    impact: "Meal irregularity correlation detected",
  },
  {
    trigger: "Long sedentary streaks",
    impact: "Snack frequency elevated",
  },
  {
    trigger: "Stress-heavy work blocks",
    impact: "Fast-food ordering likelihood increased",
  },
  {
    trigger: "Late-night phone usage",
    impact: "Midnight snacking risk elevated",
  },
];

  // ── AI INSIGHTS ────────────────────────────────────────────────
  const INSIGHT_OUTPUTS = [
    "Late-night phone use and skipped breakfast were the strongest predictors of impulsive snacking in today’s behavioral profile.",
    "Breakfast consistency is poor across recent behavioral patterns.",
    "Hydration and meal timing appear strongly linked.",
    "Late-night screen usage predicts junk food ordering behavior.",
    "Best eating window occurs after hydration and light morning movement.",
  ];

  const BAR_DATA = [
    { hour: "08h", focus: 20, dist: 70 },
    { hour: "09h", focus: 30, dist: 60 },
    { hour: "10h", focus: 45, dist: 45 },
    { hour: "11h", focus: 60, dist: 30 },
    { hour: "12h", focus: 50, dist: 40 },
    { hour: "13h", focus: 75, dist: 20 },
    { hour: "14h", focus: 80, dist: 15 },
    { hour: "15h", focus: 40, dist: 55 },
    { hour: "16h", focus: 30, dist: 65 },
    { hour: "17h", focus: 65, dist: 25 },
    { hour: "18h", focus: 70, dist: 20 },
    { hour: "19h", focus: 35, dist: 55 },
    { hour: "20h", focus: 60, dist: 30 },
  ];

  const LOGS = [
  {
    ts: "07:40",
    event: "sleep_analysis",
    data: "duration=5h20m quality=poor",
  },
  {
    ts: "08:10",
    event: "device_activity",
    data: "screen_on within_3m_of_waking",
  },
  {
    ts: "09:00",
    event: "meal_pattern",
    data: "breakfast_skipped",
  },
  {
    ts: "11:30",
    event: "hydration_monitor",
    data: "low_water_intake",
  },
  {
    ts: "13:20",
    event: "sedentary_detection",
    data: "sitting_streak=3h10m",
  },
  {
    ts: "15:45",
    event: "stress_signal",
    data: "elevated_focus_load_detected",
  },
  {
    ts: "17:50",
    event: "food_event",
    data: "high_salt_high_sugar_snack",
  },
  {
    ts: "18:30",
    event: "delivery_app_usage",
    data: "food_ordering_intent_detected",
  },
  {
    ts: "22:50",
    event: "late_night_screen_activity",
    data: "continuous_usage_detected",
  },
  {
    ts: "23:15",
    event: "nutrition_risk",
    data: "late_night_sugar_consumption",
  },
];


  const CANNED_RESPONSES = {
  default: {
    text:
      "Behavioral analysis indicates irregular meal timing, elevated late-night screen exposure, and inconsistent hydration patterns. Risk signals increase significantly during prolonged sedentary periods and stress-heavy study sessions.",

    sources: 12,

    insight:
      "Nutritional stability improves noticeably on days with earlier hydration and reduced late-night device activity.",
  },

  analyze: {
    text:
      "Full-day nutrition analysis complete. The highest behavioral risk windows occurred between 15:00–18:00 and after 22:30, where stress signals, prolonged sitting, and screen activity aligned with unhealthy eating behavior.",

    sources: 24,

    insight:
      "The strongest negative pattern detected was the combination of poor sleep, skipped breakfast, and late-night phone usage.",
  },

  craving: {
    text:
      "Craving-risk prediction indicates elevated impulsive snacking probability during late afternoon sedentary blocks and nighttime device usage periods. High-sugar consumption risk increases after prolonged cognitive workload.",

    sources: 18,

    insight:
      "Short movement breaks and earlier protein intake may significantly reduce evening craving intensity.",
  },

  breakfast: {
    text:
      "Breakfast inconsistency appears strongly linked to unstable energy levels, delayed lunch timing, and increased junk-food probability later in the day. Morning meal skipping correlates with higher snack frequency.",

    sources: 14,

    insight:
      "Even small morning nutrition intake improves overall meal stability across the day.",
  },

  hydration: {
    text:
      "Hydration tracking indicates below-optimal water intake during the first half of the day. Reduced hydration levels appear correlated with irregular meal timing and higher processed snack consumption.",

    sources: 11,

    insight:
      "Earlier hydration habits consistently reduce afternoon fatigue and impulsive eating behavior.",
  },

  mealplan: {
    text:
      "Recommended nutrition adjustments include earlier breakfast timing, structured hydration intervals, and replacing late-evening processed snacks with protein-based alternatives. Behavioral patterns suggest improved consistency when meals occur within stable time windows.",

    sources: 16,

    insight:
      "The system predicts the highest adherence probability with smaller, repeatable meal corrections instead of aggressive dietary changes.",
  },

  nutritionMode: {
    text:
      "Nutrition Mode activated. Behavioral signals including meal timing, stress spikes, hydration quality, and sedentary duration are now being continuously monitored for nutritional risk prediction.",

    sources: 20,

    insight:
      "Real-time behavioral awareness increases the likelihood of interrupting impulsive eating patterns before they occur.",
  },
};

  // ── HOOKS ───────────────────────────────────────────────────────────────────
  function useTypewriter(text, speed = 18, active = false) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
      if (!active) {
        setDisplayed("");
        setDone(false);
        return;
      }
      setDisplayed("");
      setDone(false);
      let i = 0;
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(id);
    }, [text, active]);
    return { displayed, done };
  }

  // ── SUB-COMPONENTS ──────────────────────────────────────────────────────────
  function ScoreRing({ score }) {
    const r = 38,
      cx = 44,
      cy = 44;
    const circ = 2 * Math.PI * r;
    const offset = circ - (score / 100) * circ;
    return (
      <svg width="88" height="88" style={{ display: "block" }}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#111111"
          strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "44px 44px",
            transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)",
          }}
        />
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          fontFamily="'DM Mono', monospace"
          fontSize="16"
          fontWeight="700"
          fill="#111111"
        >
          {score}
        </text>
      </svg>
    );
  }

  function BarChart({ data, animate }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 2,
          height: 60,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {data.map((d, i) => (
          <div
            key={d.hour}
            style={{
              width: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: "#111111",
                  height: animate ? `${d.focus * 0.35}px` : 0,
                  transition: `height 0.5s ease ${i * 0.03}s`,
                  minHeight: 1,
                }}
              />

              <div
                style={{
                  width: "100%",
                  background: "#d1d5db",
                  height: animate ? `${d.dist * 0.22}px` : 0,
                  transition: `height 0.5s ease ${i * 0.03 + 0.1}s`,
                  minHeight: 1,
                }}
              />
            </div>

            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 6,
                color: "#9ca3af",
                transform: "rotate(-45deg)",
                marginTop: 2,
              }}
            >
              {d.hour}
            </span>
          </div>
        ))}
      </div>
    );
  }

  function SystemMessage({ msg, isLatest }) {
    const { displayed, done } = useTypewriter(msg.text, 14, isLatest);
    const text = isLatest ? displayed : msg.text;
    const showInsight = isLatest ? done : true;

    return (
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          animation: "fadeSlideUp 0.35s ease both",
        }}
      >
        <img
          src={axisLogo}
          alt="Axis"
          style={{
            height: 34,
            width: 34,
            objectFit: "contain",
            flexShrink: 0,
            marginTop: 2,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#9ca3af",
              marginBottom: 6,
            }}
          >
            ▸ generated from {msg.sources} behavioral signals
            {msg.sources > 1 ? "s" : ""}
          </div>
          <div
            style={{
              background: "#f7f7f7",
              border: "1px solid #e5e7eb",
              padding: "16px 18px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 3,
                height: "100%",
                background: "#111111",
              }}
            />
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#111111",
                margin: 0,
                paddingLeft: 4,
              }}
            >
              {text}
              {isLatest && !done && (
                <span
                  style={{
                    animation: "blink 1s step-end infinite",
                    fontWeight: 700,
                  }}
                >
                  _
                </span>
              )}
            </p>
            {showInsight && msg.insight && (
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: "1px solid #e5e7eb",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  animation: "fadeSlideUp 0.4s ease both",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: 11,
                    color: "#6b7280",
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  ◈ INSIGHT
                </span>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: 12,
                    color: "#374151",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {msg.insight}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function UserMessage({ text }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          animation: "fadeSlideUp 0.25s ease both",
        }}
      >
        <div
          style={{
            background: "#111111",
            color: "#fff",
            padding: "10px 16px",
            fontFamily: "'Libre Baskerville', serif",
            fontSize: 13,
            maxWidth: "70%",
            lineHeight: 1.5,
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  // ── MAIN APP ─────────────────────────────────────────────────────────────────
  export default function AxisDemo({ onBack }) {
    const [messages, setMessages] = useState([
      { role: "user", text: "Analyze my eating patterns for today" },
      { role: "system", ...CANNED_RESPONSES.default },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [focusMode, setFocusMode] = useState(false);
    const calculateHealthScore = () => {
      let score = 100;

      // negative signals
      score -= 10; // skipped breakfast
      score -= 8;  // low hydration
      score -= 12; // late-night snacking
      score -= 10; // sedentary streak
      score -= 8;  // fast food ordering
      score -= 6;  // stress eating

      // positive signals
      score += 5; // hydration logged
      score += 5; // walking activity
      score += 5; // healthier snack

      return Math.max(0, Math.min(score, 100));
    };

const score = calculateHealthScore();
    const [chartAnimate, setChartAnimate] = useState(false);
    const [logsOpen, setLogsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("chat"); // "chat" | "graph" | "logs"
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
      setTimeout(() => setChartAnimate(true), 400);
    }, []);

    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function send(text) {
    if (!text.trim()) return;

    const cleanText = text.toLowerCase().trim();

    // Add user message instantly
    const userMsg = {
      role: "user",
      text: text.trim(),
    };

    setMessages((p) => [...p, userMsg]);

    setInput("");
    setLoading(true);

    // Fake thinking delay so it feels real
    setTimeout(() => {
      let response;

      // ── ANALYZE ─────────────────────
      if (
        cleanText.includes("analyze") ||
        cleanText.includes("day") ||
        cleanText.includes("habit")
      ) {
        response = CANNED_RESPONSES.analyze;
      }

      // ── CRAVINGS ─────────────────────
      else if (
        cleanText.includes("craving") ||
        cleanText.includes("snack") ||
        cleanText.includes("junk")
      ) {
        response = CANNED_RESPONSES.craving;
      }

      // ── BREAKFAST ─────────────────────
      else if (
        cleanText.includes("breakfast") ||
        cleanText.includes("morning")
      ) {
        response = CANNED_RESPONSES.breakfast;
      }

      // ── HYDRATION ─────────────────────
      else if (
        cleanText.includes("hydration") ||
        cleanText.includes("water")
      ) {
        response = CANNED_RESPONSES.hydration;
      }

      // ── MEAL PLAN ─────────────────────
      else if (
        cleanText.includes("meal plan") ||
        cleanText.includes("diet") ||
        cleanText.includes("healthy")
      ) {
        response = CANNED_RESPONSES.mealplan;
      }

      // ── NUTRITION MODE ─────────────────────
      else if (
        cleanText.includes("nutrition mode") ||
        cleanText.includes("monitor")
      ) {
        response = CANNED_RESPONSES.nutritionMode;
      }

      // ── DEFAULT ─────────────────────
      else {
        response = CANNED_RESPONSES.default;
      }

      setMessages((p) => [
        ...p,
        {
          role: "system",
          ...response,
        },
      ]);

      setLoading(false);

    }, 900);

    }


    function handleAnalyze() {
      send("Analyze my eating patterns");
    }
    function handleFocus() {
      setFocusMode((p) => !p);
      send("Start nutrition mode");
    }

    const S = styles(focusMode);

    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <div style={S.shell}>
          {/* ── TOP BAR ── */}
          <header style={S.topbar}>
            <div style={S.topbarLeft}>
              <img
                src={axisLogo}
                alt="Axis"
                style={{
                  height: 28,
                  width: 28,
                  objectFit: "contain",
                }}
              />
              <span style={S.appName}>NodeX Axis</span>

              <button
                onClick={onBack}
                style={{
                  marginLeft: 12,
                  fontSize: 11,
                  border: "1px solid #e5e7eb",
                  padding: "4px 10px",
                  cursor: "pointer",
                  background: "transparent",
                }}
              >
                ← Back
              </button>
            </div>
            <div style={S.badges}>
              <Badge dot="#22c55e" label="Local" />
              <Badge icon="🔒" label="Private" />
              <Badge icon="⚡" label="Live" accent />
              <span style={S.deviceLabel}>Behavioral Nutrition Engine Active</span>
            </div>
          </header>

          {/* ── BODY ── */}
          <div style={S.body}>
            {/* ── CHAT COLUMN ── */}
            <div style={S.chatCol}>
              {/* Tab row (mobile only concept, visible always) */}
              <div style={S.tabRow}>
                {["chat", "graph", "logs"].map((t) => (
                  <button
                    key={t}
                    style={S.tab(activeTab === t)}
                    onClick={() => setActiveTab(t)}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>

              {activeTab === "chat" && (
                <div style={S.chatScroll}>
                  <div style={S.chatInner}>
                    {messages.map((m, i) =>
                      m.role === "user" ? (
                        <UserMessage key={i} text={m.text} />
                      ) : (
                        <SystemMessage
                          key={i}
                          msg={m}
                          isLatest={i === messages.length - 1}
                        />
                      ),
                    )}
                    {loading && (
                      <div
                        style={{ display: "flex", gap: 12, alignItems: "center" }}
                      >
                        <img
                          src={axisLogo}
                          alt="Axis"
                          style={{
                            height: 28,
                            width: 28,
                            objectFit: "contain",
                          }}
                        />
                        <div style={S.loadingDots}>
                          <span style={{ animationDelay: "0s" }}>●</span>
                          <span style={{ animationDelay: "0.2s" }}>●</span>
                          <span style={{ animationDelay: "0.4s" }}>●</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Action buttons */}
                  <div style={S.actionRow}>
  <button
    style={S.actionBtn}
    onClick={() => send("Analyze my habits")}
  >
    ◈ ANALYZE MY HABITS
  </button>

  <button
    style={S.actionBtn}
    onClick={() => send("Predict cravings")}
  >
    ◆ PREDICT CRAVINGS
  </button>

  <button
    style={S.actionBtn}
    onClick={() => send("Generate healthier meal plan")}
  >
    ◎ GENERATE HEALTHIER PLAN
  </button>
</div>
                </div>
              )}

              {activeTab === "graph" && (
                <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
                  <div style={S.sectionLabel}>BEHAVIORAL PATTERNS</div>
                  <div style={{ marginTop: 16, marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                      <div
                        style={{ display: "flex", gap: 6, alignItems: "center" }}
                      >
                        <div
                          style={{ width: 10, height: 10, background: "#111111" }}
                        />
                        <span style={S.mono11}>Healthy</span>
                      </div>
                      <div
                        style={{ display: "flex", gap: 6, alignItems: "center" }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            background: "#e5e7eb",
                            border: "1px solid #d1d5db",
                          }}
                        />
                        <span style={S.mono11}>Risky</span>
                      </div>
                    </div>
                    <BarChart data={BAR_DATA} animate={chartAnimate} />
                  </div>
                  <div style={{ marginTop: 28 }}>
                    <div style={S.sectionLabel}>NUTRITION RISK WINDOWS</div>
                    {BAR_DATA.map((d) => (
                      <div
                        key={d.hour}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginTop: 10,
                        }}
                      >
                        <span style={{ ...S.mono11, width: 28 }}>{d.hour}</span>
                        <div
                          style={{
                            flex: 1,
                            height: 6,
                            background: "#f3f4f6",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${d.focus}%`,
                              background: "#111111",
                              transition: "width 1s ease",
                            }}
                          />
                        </div>
                        <span style={S.mono11}>{d.focus}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "logs" && (
                <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
                  <div style={S.sectionLabel}>NUTRITION EVENT LOGS</div>
                  <div
                    style={{
                      marginTop: 12,
                      background: "#f7f7f7",
                      border: "1px solid #e5e7eb",
                      padding: 16,
                    }}
                  >
                    {LOGS.map((l, i) => (
                      <div
                        key={i}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11,
                          lineHeight: 1.8,
                          color: "#374151",
                          borderBottom:
                            i < LOGS.length - 1 ? "1px solid #e5e7eb" : "none",
                          paddingBottom: 8,
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ color: "#9ca3af" }}>[{l.ts}]</span>{" "}
                        <span style={{ color: "#111111", fontWeight: 700 }}>
                          {l.event}
                        </span>{" "}
                        <span style={{ color: "#6b7280" }}>{l.data}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input bar */}
              {activeTab === "chat" && (
                <div style={S.inputWrap}>
                  <div style={S.inputBox}>
                    <input
                      ref={inputRef}
                      style={S.input}
                      placeholder="Ask about nutrition patterns…"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send(input)}
                      disabled={loading}
                    />
                    <button
                      style={S.sendBtn}
                      onClick={() => send(input)}
                      disabled={loading || !input.trim()}
                    >
                      ▶
                    </button>
                  </div>
                  <div style={S.inputHint}>
                    ENTER TO SEND · LOCAL MODEL · ZERO CLOUD
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT PANEL ── */}
            <aside style={S.rightPanel}>
              {/* Score */}
              <div style={S.card}>
                <div style={S.sectionLabel}>HEALTH HABIT INDEX</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 12,
                  }}
                >
                  <ScoreRing score={score} />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: 28,
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      72
                    </div>
                    <div style={S.mono11}>/ 100 HEALTH SCORE</div>
                    <div style={{ marginTop: 8 }}>
                      <div
                        style={{ height: 3, width: 120, background: "#e5e7eb" }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: "72%",
                            background: "#111111",
                            transition: "width 1.2s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div style={S.card}>
                <div style={S.sectionLabel}>NUTRITION TIMELINE</div>

                <div style={{ marginTop: 12 }}>
                  {CONTEXT_STREAM.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "8px 0",
                        borderBottom:
                          i < CONTEXT_STREAM.length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 4,
                        }}
                      >
                        <span style={S.mono11}>{item.label}</span>
                        <span style={S.mono11}>{item.time}</span>
                      </div>

                      <div
                        style={{
                          fontFamily: "'Libre Baskerville', serif",
                          fontSize: 12,
                          color: "#111111",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            <div style={S.card}>
              <div style={S.sectionLabel}>MEAL EVENTS</div>

              <div style={{ marginTop: 12 }}>
                {MEAL_EVENTS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "8px 0",
                      borderBottom:
                        i < MEAL_EVENTS.length - 1
                          ? "1px solid #f3f4f6"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={S.mono11}>{item.meal}</span>
                      <span style={S.mono11}>{item.time}</span>
                    </div>

                    <div
                      style={{
                        marginTop: 4,
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: 12,
                        color: "#111111",
                      }}
                    >
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={S.card}>
    <div style={S.sectionLabel}>HABIT TRIGGERS</div>

    <div style={{ marginTop: 12 }}>
      {HABIT_TRIGGERS.map((item, i) => (
        <div
          key={i}
          style={{
            padding: "8px 0",
            borderBottom:
              i < HABIT_TRIGGERS.length - 1
                ? "1px solid #f3f4f6"
                : "none",
          }}
        >
          <div
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: 12,
              color: "#111111",
              marginBottom: 4,
            }}
          >
            {item.trigger}
          </div>

          <div style={S.mono11}>
            {item.impact}
          </div>
        </div>
      ))}
    </div>
  </div>

              {/* AI Insight */}
              <div style={{ ...S.card, borderLeft: "3px solid #111111" }}>
                <div style={S.sectionLabel}>◈ SYSTEM INSIGHT</div>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: 12,
                    lineHeight: 1.7,
                    color: "#374151",
                    margin: "10px 0 0",
                  }}
                >
                  {INSIGHT_OUTPUTS[0]}
                </p>
              </div>


              {/* Mini chart in right panel */}
              <div style={S.card}>
                <div style={S.sectionLabel}>MEAL STABILITY vs RISK</div>
                <div style={{ marginTop: 12 }}>
                  <BarChart data={BAR_DATA} animate={chartAnimate} />
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, background: "#111111" }} />
                    <span style={S.mono11}>Healthy</span>
                  </div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        background: "#e5e7eb",
                        border: "1px solid #d1d5db",
                      }}
                    />
                    <span style={S.mono11}>Risky</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }

  // ── BADGE ───────────────────────────────────────────────────────────────────
  function Badge({ dot, icon, label, accent }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          background: "#f7f7f7",
          border: "1px solid #e5e7eb",
          padding: "3px 8px",
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: accent ? "#2563eb" : "#6b7280",
        }}
      >
        {dot && (
          <div
            style={{ width: 6, height: 6, borderRadius: 3, background: dot }}
          />
        )}
        {icon && <span style={{ fontSize: 10 }}>{icon}</span>}
        {label}
      </div>
    );
  }

  // ── STYLES ───────────────────────────────────────────────────────────────────
  function styles(focusMode) {
    return {
      shell: {
        minHeight: "100vh",
        background: focusMode ? "#fafafa" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Mono', monospace",
        transition: "background 0.4s ease",
      },
      topbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: 52,
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 50,
      },
      topbarLeft: { display: "flex", alignItems: "center", gap: 10 },
      logoBox: {
        width: 28,
        height: 28,
        background: "#111111",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        fontWeight: 700,
      },
      appName: {
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#111111",
      },
      badges: { display: "flex", alignItems: "center", gap: 8 },
      deviceLabel: {
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: "#9ca3af",
        marginLeft: 4,
      },
      body: {
        flex: 1,
        display: "flex",
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        minHeight: 0,
      },
      chatCol: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        borderRight: "1px solid #e5e7eb",
      },
      tabRow: {
        display: "flex",
        borderBottom: "1px solid #e5e7eb",
        flexShrink: 0,
      },
      tab: (active) => ({
        flex: 1,
        padding: "10px 0",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.1em",
        background: active ? "#111111" : "transparent",
        color: active ? "#fff" : "#9ca3af",
        border: "none",
        cursor: "pointer",
        borderRight: "1px solid #e5e7eb",
        transition: "all 0.15s ease",
      }),
      chatScroll: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      },
      chatInner: {
        flex: 1,
        overflowY: "auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      },
      actionRow: {
        display: "flex",
        gap: 8,
        padding: "12px 24px",
        borderTop: "1px solid #e5e7eb",
        flexShrink: 0,
      },
      actionBtn: {
        flex: 1,
        padding: "9px 12px",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        background: "transparent",
        border: "1px solid #111111",
        color: "#111111",
        cursor: "pointer",
        transition: "all 0.15s ease",
      },
      inputWrap: {
        padding: "12px 24px 16px",
        borderTop: "1px solid #e5e7eb",
        flexShrink: 0,
        background: "#fff",
      },
      inputBox: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #e5e7eb",
        background: "#f7f7f7",
        transition: "border-color 0.15s",
      },
      input: {
        flex: 1,
        background: "transparent",
        border: "none",
        outline: "none",
        padding: "11px 14px",
        fontFamily: "'DM Mono', monospace",
        fontSize: 13,
        color: "#111111",
      },
      sendBtn: {
        padding: "11px 16px",
        background: "#111111",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: 12,
        transition: "opacity 0.15s",
      },
      inputHint: {
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: "#9ca3af",
        marginTop: 6,
        letterSpacing: "0.08em",
        textAlign: "center",
      },
      rightPanel: {
        width: 280,
        flexShrink: 0,
        overflowY: "auto",
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: "#fafafa",
      },
      card: {
        background: "#fff",
        border: "1px solid #e5e7eb",
        padding: "14px 14px",
      },
      sectionLabel: {
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "#6b7280",
      },
      mono11: {
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: "#9ca3af",
      },
      nxDot: {
        width: 28,
        height: 28,
        background: "#111111",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: "#fff",
      },
      loadingDots: {
        display: "flex",
        gap: 6,
        fontFamily: "'DM Mono', monospace",
        fontSize: 18,
        color: "#9ca3af",
      },
    };
  }

  // ── GLOBAL CSS ────────────────────────────────────────────────────────────────
  const GLOBAL_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #e5e7eb; }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .loadingDots span {
      animation: blink 1.2s step-end infinite;
    }
  `;
