import { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

interface LoanWidgetProps {
  onCtaClick: () => void;
}

/* ----------------------------------------------------
   TRACKING HELPERS (same style as your PaymentPlans)
---------------------------------------------------- */
const trackGA = (event: string, label: string, payload?: Record<string, any>) => {
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", event, {
      event_category: "engagement",
      event_label: label,
      ...(payload || {}),
    });
  } else {
    // graceful fallback for dev
    // console.log("gtag missing:", event, label, payload);
  }
};

const trackMeta = (event: string, label: string, payload?: Record<string, any>) => {
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", event, { label, ...(payload || {}) });
  } else {
    // console.log("fbq missing:", event, label, payload);
  }
};

/* ----------------------------------------------------
   UTILS: EMI / Loan math & age / tenure helpers
   EMI formula:
     EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
   Reverse (Loan from EMI):
     P = EMI * (1 - (1 + r)^-n) / r
---------------------------------------------------- */
const monthlyRate = (annualRatePercent: number) => annualRatePercent / 100 / 12;

const emiFromLoan = (loan: number, annualRatePercent: number, years: number) => {
  if (loan <= 0) return 0;
  const r = monthlyRate(annualRatePercent);
  const n = years * 12;
  if (r === 0) return loan / n;
  const factor = Math.pow(1 + r, n);
  return (loan * r * factor) / (factor - 1);
};

const loanFromEmi = (emi: number, annualRatePercent: number, years: number) => {
  if (emi <= 0) return 0;
  const r = monthlyRate(annualRatePercent);
  const n = years * 12;
  if (r === 0) return emi * n;
  return emi * (1 - Math.pow(1 + r, -n)) / r;
};

const computeAge = (dobStr: string) => {
  if (!dobStr) return null;
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
};

const maxTenureByAge = (age: number | null, applicantType: "salaried" | "business") => {
  // Rules:
  // Salaried -> max age 60
  // Business -> max age 65
  // Max loan tenure allowed generally 30
  if (age === null) return 30;
  const retirementAge = applicantType === "salaried" ? 60 : 65;
  const remainingYears = Math.max(0, retirementAge - age);
  // clamp between 5 and 30
  return Math.min(Math.max(5, remainingYears), 30);
};

/* ----------------------------------------------------
   DEFAULTS / FOIR (configurable)
   We use conservative default FOIR values:
     Salaried = 0.55 (55%)
     Business = 0.45 (45%)
   These can be tuned later or made inputs.
---------------------------------------------------- */
const DEFAULTS = {
  INTEREST: 8, // %
  FOIR_SALARIED: 0.55,
  FOIR_BUSINESS: 0.45,
};

const formatINR = (n: number) =>
  n <= 0 ? "₹0" : n >= 1 ? `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}` : `₹${n.toFixed(0)}`;

/* ----------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------- */
const LoanEligibilityWidget = ({ onCtaClick }: LoanWidgetProps) => {
  const [viewTracked, setViewTracked] = useState(false);

  /* ---------- Applicant A (primary) ---------- */
  const [applicantTypeA, setApplicantTypeA] = useState<"salaried" | "business">("salaried");
  const [dobA, setDobA] = useState<string>(""); // yyyy-mm-dd
  const [incomeA, setIncomeA] = useState<number | "">("");
  const [existingEmisA, setExistingEmisA] = useState<number | "">("");

  /* ---------- Co-applicant ---------- */
  const [hasCoApplicant, setHasCoApplicant] = useState(false);
  const [coOpen, setCoOpen] = useState(false);
  const [applicantTypeB, setApplicantTypeB] = useState<"salaried" | "business">("salaried");
  const [dobB, setDobB] = useState<string>("");
  const [incomeB, setIncomeB] = useState<number | "">("");
  const [existingEmisB, setExistingEmisB] = useState<number | "">("");

  /* ---------- Loan params ---------- */
  const [interestRate, setInterestRate] = useState<number>(DEFAULTS.INTEREST);
  const [tenureYears, setTenureYears] = useState<number | "">(""); // user-overridable
  const [propertyValue, setPropertyValue] = useState<number | "">("");

  /* ---------- UI state ---------- */
  const [openPanel, setOpenPanel] = useState<number | null>(0); // mimic accordion panels
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Calculated outputs ---------- */
  const [computed, setComputed] = useState({
    ageA: null as number | null,
    ageB: null as number | null,
    maxTenureA: 30,
    maxTenureB: 30,
    effectiveTenure: 30,
    maxEmiA: 0,
    maxEmiB: 0,
    totalMaxEmi: 0,
    loanEligibility: 0,
    propertyAffordability: 0,
    requiredDownPayment: 0,
    foirA: DEFAULTS.FOIR_SALARIED,
    foirB: DEFAULTS.FOIR_SALARIED,
  });

  /* ---------- Track view on mount / in-view ---------- */
  useEffect(() => {
    if (viewTracked) return;
    const el = containerRef.current;
    if (!el) {
      // fallback immediate
      trackGA("loan_widget_view", "loan_widget_mount");
      trackMeta("loan_widget_view", "loan_widget_mount");
      setViewTracked(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackGA("loan_widget_view", "loan_widget_inview");
          trackMeta("loan_widget_view", "loan_widget_inview");
          setViewTracked(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [viewTracked]);

  /* ---------- Recompute whenever relevant inputs change ---------- */
  useEffect(() => {
    const ageA = computeAge(dobA);
    const ageB = computeAge(dobB);

    const foirA = applicantTypeA === "salaried" ? DEFAULTS.FOIR_SALARIED : DEFAULTS.FOIR_BUSINESS;
    const foirB = applicantTypeB === "salaried" ? DEFAULTS.FOIR_SALARIED : DEFAULTS.FOIR_BUSINESS;

    const maxTenureA = maxTenureByAge(ageA, applicantTypeA);
    const maxTenureB = maxTenureByAge(ageB, applicantTypeB);

    // Effective tenure: if co-applicant present, use the younger applicant's remaining tenure (min)
    const autoEffectiveTenure = hasCoApplicant ? Math.min(maxTenureA, maxTenureB) : maxTenureA;
    // If user has manually provided tenureYears, prefer that (but clamp to allowed max)
    let effTenure = typeof tenureYears === "number" && tenureYears > 0 ? tenureYears : autoEffectiveTenure;
    effTenure = Math.min(effTenure, 30); // global absolute cap
    effTenure = Math.max(1, effTenure);

    // compute maxEMI per applicant
    const incA = typeof incomeA === "number" ? incomeA : 0;
    const incB = typeof incomeB === "number" ? incomeB : 0;
    const exA = typeof existingEmisA === "number" ? existingEmisA : 0;
    const exB = typeof existingEmisB === "number" ? existingEmisB : 0;

    const maxEmiA = Math.max(0, incA * foirA - exA);
    const maxEmiB = hasCoApplicant ? Math.max(0, incB * foirB - exB) : 0;
    const totalMaxEmi = maxEmiA + maxEmiB;

    // Convert EMI capacity to loan eligibility using loanFromEmi
    const loanEligibility = loanFromEmi(totalMaxEmi, interestRate, effTenure);

    // Property affordability = loan + (if user provided a property price, compute required down payment)
    const propVal = typeof propertyValue === "number" ? propertyValue : 0;
    const requiredDownPayment = propVal > 0 ? Math.max(0, propVal - loanEligibility) : 0;
    const propertyAffordability = propVal > 0 ? propVal : Math.round(loanEligibility + Math.max(0, incA * 6)); // fallback: assume user can arrange ~6 months net income as DP

    setComputed({
      ageA,
      ageB,
      maxTenureA,
      maxTenureB,
      effectiveTenure: effTenure,
      maxEmiA,
      maxEmiB,
      totalMaxEmi,
      loanEligibility,
      propertyAffordability,
      requiredDownPayment,
      foirA,
      foirB,
    });
  }, [
    applicantTypeA,
    applicantTypeB,
    dobA,
    dobB,
    incomeA,
    incomeB,
    existingEmisA,
    existingEmisB,
    interestRate,
    tenureYears,
    hasCoApplicant,
    propertyValue,
  ]);

  /* ---------- Input change tracker ---------- */
  const onInputChange = (field: string, value: any) => {
    trackGA("loan_input_change", field, { value });
    trackMeta("loan_input_change", field, { value });
  };

  /* ---------- CTA handler that also tracks ---------- */
  const handleCTA = () => {
    trackGA("loan_cta_click", "check_full_report", {
      loanEligibility: Math.round(computed.loanEligibility),
      maxEmi: Math.round(computed.totalMaxEmi),
    });
    trackMeta("loan_cta_click", "check_full_report", {
      loanEligibility: Math.round(computed.loanEligibility),
      maxEmi: Math.round(computed.totalMaxEmi),
    });
    onCtaClick();
  };

  /* ---------- Small helpers ---------- */
  const toggleCoApplicant = () => {
    setHasCoApplicant((s) => !s);
    setCoOpen((s) => !s);
    onInputChange("co_applicant_toggle", !hasCoApplicant);
  };

  return (
    <section id="loan-eligibility" className="py-20 lg:py-28 bg-background" ref={containerRef}>
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Loan Eligibility & <span className="text-primary">Affordability</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter details to estimate your maximum loan, EMI capability and required down payment.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT: Inputs (match style / cards) */}
          <div className="space-y-6">
            {/* Applicant Panel */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Applicant Details</h3>
                <button
                  className="text-sm text-muted-foreground"
                  onClick={() => setOpenPanel(openPanel === 0 ? null : 0)}
                >
                  {openPanel === 0 ? "Hide" : "Edit"}
                </button>
              </div>

              {openPanel === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-1">
                      <div className="text-sm font-medium">Applicant Type</div>
                      <select
                        value={applicantTypeA}
                        onChange={(e) => {
                          setApplicantTypeA(e.target.value as "salaried" | "business");
                          onInputChange("applicant_type", e.target.value);
                        }}
                        className="input"
                      >
                        <option value="salaried">Salaried</option>
                        <option value="business">Business / Self-employed</option>
                      </select>
                    </label>

                    <label className="space-y-1">
                      <div className="text-sm font-medium">Date of Birth</div>
                      <input
                        type="date"
                        value={dobA}
                        onChange={(e) => {
                          setDobA(e.target.value);
                          onInputChange("dobA", e.target.value);
                        }}
                        className="input"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-1">
                      <div className="text-sm font-medium">Monthly Net Income (₹)</div>
                      <input
                        type="number"
                        placeholder="e.g. 50000"
                        value={incomeA as any}
                        onChange={(e) => {
                          const v = e.target.value ? Number(e.target.value) : "";
                          setIncomeA(v);
                          onInputChange("incomeA", v);
                        }}
                        className="input"
                      />
                    </label>

                    <label className="space-y-1">
                      <div className="text-sm font-medium">Existing EMIs (₹)</div>
                      <input
                        type="number"
                        placeholder="0"
                        value={existingEmisA as any}
                        onChange={(e) => {
                          const v = e.target.value ? Number(e.target.value) : "";
                          setExistingEmisA(v);
                          onInputChange("existingEmisA", v);
                        }}
                        className="input"
                      />
                    </label>
                  </div>
                </div>
              )}

              {openPanel !== 0 && (
                <div className="text-sm text-muted-foreground">
                  <div>
                    Age: <strong>{computed.ageA ?? "-"}</strong> • FOIR:{" "}
                    <strong>{(computed.foirA * 100).toFixed(0)}%</strong> • Max tenure:{" "}
                    <strong>{computed.maxTenureA} yrs</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Co-applicant Panel */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Co-applicant</h3>
                <div className="flex items-center gap-3">
                  <label className="text-sm">Add co-applicant</label>
                  <input
                    type="checkbox"
                    checked={hasCoApplicant}
                    onChange={() => toggleCoApplicant()}
                    className="toggle"
                  />
                </div>
              </div>

              {hasCoApplicant && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-1">
                      <div className="text-sm font-medium">Applicant Type</div>
                      <select
                        value={applicantTypeB}
                        onChange={(e) => {
                          setApplicantTypeB(e.target.value as "salaried" | "business");
                          onInputChange("co_applicant_type", e.target.value);
                        }}
                        className="input"
                      >
                        <option value="salaried">Salaried</option>
                        <option value="business">Business / Self-employed</option>
                      </select>
                    </label>

                    <label className="space-y-1">
                      <div className="text-sm font-medium">Date of Birth</div>
                      <input
                        type="date"
                        value={dobB}
                        onChange={(e) => {
                          setDobB(e.target.value);
                          onInputChange("dobB", e.target.value);
                        }}
                        className="input"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <label className="space-y-1">
                      <div className="text-sm font-medium">Monthly Net Income (₹)</div>
                      <input
                        type="number"
                        placeholder="e.g. 40000"
                        value={incomeB as any}
                        onChange={(e) => {
                          const v = e.target.value ? Number(e.target.value) : "";
                          setIncomeB(v);
                          onInputChange("incomeB", v);
                        }}
                        className="input"
                      />
                    </label>

                    <label className="space-y-1">
                      <div className="text-sm font-medium">Existing EMIs (₹)</div>
                      <input
                        type="number"
                        placeholder="0"
                        value={existingEmisB as any}
                        onChange={(e) => {
                          const v = e.target.value ? Number(e.target.value) : "";
                          setExistingEmisB(v);
                          onInputChange("existingEmisB", v);
                        }}
                        className="input"
                      />
                    </label>
                  </div>
                </>
              )}

              {!hasCoApplicant && (
                <div className="text-sm text-muted-foreground">No co-applicant added.</div>
              )}
            </div>

            {/* Loan Parameters Panel */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Loan Parameters</h3>
                <button
                  className="text-sm text-muted-foreground"
                  onClick={() => setOpenPanel(openPanel === 2 ? null : 2)}
                >
                  {openPanel === 2 ? "Hide" : "Edit"}
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-1">
                    <div className="text-sm font-medium">Interest Rate (%)</div>
                    <input
                      type="number"
                      value={interestRate as any}
                      onChange={(e) => {
                        const v = e.target.value ? Number(e.target.value) : DEFAULTS.INTEREST;
                        setInterestRate(v);
                        onInputChange("interestRate", v);
                      }}
                      className="input"
                    />
                  </label>

                  <label className="space-y-1">
                    <div className="text-sm font-medium">Preferred Tenure (yrs)</div>
                    <input
                      type="number"
                      placeholder={`${computed.effectiveTenure}`}
                      value={tenureYears as any}
                      onChange={(e) => {
                        const v = e.target.value ? Number(e.target.value) : "";
                        setTenureYears(v);
                        onInputChange("tenureYears", v);
                      }}
                      className="input"
                    />
                    <div className="text-xs text-muted-foreground">
                      Auto-suggested: {Math.min(computed.maxTenureA, 30)} yrs (primary)
                      {hasCoApplicant ? ` • co-applicant max: ${computed.maxTenureB} yrs` : ""}
                    </div>
                  </label>
                </div>

                <label className="space-y-1">
                  <div className="text-sm font-medium">Property Value (₹) — optional</div>
                  <input
                    type="number"
                    placeholder="Enter target property price"
                    value={propertyValue as any}
                    onChange={(e) => {
                      const v = e.target.value ? Number(e.target.value) : "";
                      setPropertyValue(v);
                      onInputChange("propertyValue", v);
                    }}
                    className="input"
                  />
                </label>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-4">
              <CTAButtons onFormOpen={handleCTA} />
            </div>
          </div>

          {/* RIGHT: Output card (affordability summary) */}
          <div>
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold">Affordability Summary</h3>
                <div className="text-sm text-muted-foreground">Real-time estimate</div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/5 rounded-xl">
                    <div className="text-sm text-muted-foreground">Max EMI you can pay</div>
                    <div className="text-2xl font-semibold mt-2">{formatINR(Math.round(computed.totalMaxEmi || 0))}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      (Primary: {formatINR(Math.round(computed.maxEmiA))} {hasCoApplicant ? `• Co: ${formatINR(Math.round(computed.maxEmiB))}` : ""})
                    </div>
                  </div>

                  <div className="p-4 bg-muted/5 rounded-xl">
                    <div className="text-sm text-muted-foreground">Loan Eligibility</div>
                    <div className="text-2xl font-semibold mt-2">{formatINR(Math.round(computed.loanEligibility || 0))}</div>
                    <div className="text-xs text-muted-foreground mt-1">@ {interestRate}% for {computed.effectiveTenure} yrs</div>
                  </div>
                </div>

                <div className="p-4 bg-muted/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Property Affordability</div>
                      <div className="text-xl font-semibold mt-1">{formatINR(Math.round(computed.propertyAffordability || computed.loanEligibility || 0))}</div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      Suggested down payment: <br />
                      <strong>20% recommended</strong>
                    </div>
                  </div>

                  {propertyValue ? (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="text-sm text-muted-foreground">Target Price</div>
                      <div className="font-medium">{formatINR(propertyValue as number)}</div>

                      <div className="text-sm text-muted-foreground">Loan you can get</div>
                      <div className="font-medium">{formatINR(Math.round(computed.loanEligibility))}</div>

                      <div className="text-sm text-muted-foreground">Required Down Payment</div>
                      <div className="font-medium">{formatINR(Math.round(computed.requiredDownPayment))}</div>
                    </div>
                  ) : (
                    <div className="mt-4 text-sm text-muted-foreground">
                      Enter a property price to compute exact down payment required. Otherwise we assume you could target property worth up to the loan + ~6 months income as down payment fallback.
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-primary w-5 h-5 mt-1" />
                    <div>
                      <div className="text-sm text-muted-foreground">FOIR used</div>
                      <div className="font-medium">
                        Primary: {(computed.foirA * 100).toFixed(0)}% {hasCoApplicant ? `• Co-applicant: ${(computed.foirB * 100).toFixed(0)}%` : ""}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        These are conservative defaults. Banks may vary — final sanction depends on bank policy, documents & credit score.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Recommended next step</div>
                      <div className="font-semibold">Get detailed assessment & pre-approval</div>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleCTA();
                      }}
                    >
                      Check Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* small timeline-style note area (animated vertical line similar to PaymentPlans) */}
            <div className="relative mt-8 pl-8">
              <div className="absolute top-0 left-2 w-1 bg-primary/20 rounded-full timeline-line-small"></div>
              <div className="space-y-6">
                <div className="fade-stage">
                  <div className="text-sm font-medium">How we computed</div>
                  <div className="text-xs text-muted-foreground">
                    We calculate the maximum EMI allowed from FOIR (based on profile), subtract existing EMIs, then convert EMI capacity into loan amount using your selected interest rate & tenure.
                  </div>
                </div>

                <div className="fade-stage">
                  <div className="text-sm font-medium">Co-applicant impact</div>
                  <div className="text-xs text-muted-foreground">
                    Adding a co-applicant sums EMI capacity — often improving loan eligibility significantly. Tenure will be limited by the younger applicant's remaining working years.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STYLES & SIMPLE ANIMATIONS (keeps in-file like your example) */}
      <style>{`
        .timeline-line-small {
          height: 100%;
          transition: height 1.2s ease-out;
        }
        .fade-stage {
          opacity: 0;
          transform: translateY(18px);
          animation: fadeUpStageSmall 0.6s forwards ease-out;
        }
        @keyframes fadeUpStageSmall {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* basic helpers to match your design tokens - adapt to your project classes */
        .input {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: 0.65rem;
          border: 1px solid rgba(15,23,42,0.06);
          background: transparent;
          outline: none;
        }
        .input:focus {
          box-shadow: 0 0 0 4px rgba(99,102,241,0.06);
          border-color: rgba(99,102,241,0.6);
        }
        .toggle {
          width: 44px;
          height: 24px;
        }
        .btn {
          padding: 0.6rem 1rem;
          border-radius: 0.65rem;
        }
        .btn-primary {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          color: white;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
};

export default LoanEligibilityWidget;
