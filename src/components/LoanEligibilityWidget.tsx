import { useEffect, useState, useRef } from "react";
import { CheckCircle, Info } from "lucide-react";
import CTAButtons from "@/components/CTAButtons";

interface LoanWidgetProps {
  onCtaClick: () => void;
}

/* ----------------------------------------------------
   TRACKING HELPERS
---------------------------------------------------- */
const trackGA = (event: string, label: string, payload?: Record<string, any>) => {
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", event, {
      event_category: "engagement",
      event_label: label,
      ...(payload || {}),
    });
  } else {
    // dev fallback (comment out in prod)
    // console.log("GA:", event, label, payload);
  }
};

const trackMeta = (event: string, label: string, payload?: Record<string, any>) => {
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", event, { label, ...(payload || {}) });
  } else {
    // console.log("Meta:", event, label, payload);
  }
};

/* ----------------------------------------------------
   MATH / HELPERS
---------------------------------------------------- */
const monthlyRate = (annualRatePercent: number) => annualRatePercent / 100 / 12;

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

const retirementAgeFor = (type: "salaried" | "business") => (type === "salaried" ? 60 : 65);

const maxTenureByAge = (age: number | null, type: "salaried" | "business") => {
  if (age === null) return 30;
  const retirementAge = retirementAgeFor(type);
  const remainingYears = Math.max(0, retirementAge - age);
  // clamp between 5 and 30
  return Math.min(Math.max(5, remainingYears), 30);
};

const DEFAULTS = {
  INTEREST: 8,
  FOIR_SALARIED: 0.55,
  FOIR_BUSINESS: 0.45,
};

const formatINR = (n: number) =>
  n <= 0 ? "₹0" : `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

/* ----------------------------------------------------
   COMPONENT
---------------------------------------------------- */
const LoanEligibilityWidget = ({ onCtaClick }: LoanWidgetProps) => {
  const [viewTracked, setViewTracked] = useState(false);

  // Primary applicant
  const [applicantTypeA, setApplicantTypeA] = useState<"salaried" | "business">("salaried");
  const [dobA, setDobA] = useState<string>("");
  const [incomeA, setIncomeA] = useState<number | "">("");
  const [existingEmisA, setExistingEmisA] = useState<number | "">("");

  // Co-applicant
  const [hasCoApplicant, setHasCoApplicant] = useState(false);
  const [applicantTypeB, setApplicantTypeB] = useState<"salaried" | "business">("salaried");
  const [dobB, setDobB] = useState<string>("");
  const [incomeB, setIncomeB] = useState<number | "">("");
  const [existingEmisB, setExistingEmisB] = useState<number | "">("");

  // Loan params
  const [interestRate, setInterestRate] = useState<number>(DEFAULTS.INTEREST);
  const [tenureYears, setTenureYears] = useState<number | "">(""); // controlled, will be number
  const [propertyValue, setPropertyValue] = useState<number | "">("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  // computed values
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

  /* Track view once */
  useEffect(() => {
    if (viewTracked) return;
    const el = containerRef.current;
    if (!el) {
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
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [viewTracked]);

  /* Auto-set tenure to permissible maximum (when relevant inputs change) */
  useEffect(() => {
    const ageA = computeAge(dobA);
    const ageB = computeAge(dobB);

    const maxA = maxTenureByAge(ageA, applicantTypeA);
    const maxB = hasCoApplicant ? maxTenureByAge(ageB, applicantTypeB) : maxA;

    const permissible = Math.min(maxA, maxB, 30);

    // if tenure empty or out-of-range, set to permissible maximium
    if (
      tenureYears === "" ||
      typeof tenureYears === "number" && (tenureYears > permissible || tenureYears < 5)
    ) {
      setTenureYears(permissible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dobA, dobB, applicantTypeA, applicantTypeB, hasCoApplicant]);

  /* Main calculations */
  useEffect(() => {
    const ageA = computeAge(dobA);
    const ageB = computeAge(dobB);

    const foirA = applicantTypeA === "salaried" ? DEFAULTS.FOIR_SALARIED : DEFAULTS.FOIR_BUSINESS;
    const foirB = applicantTypeB === "salaried" ? DEFAULTS.FOIR_SALARIED : DEFAULTS.FOIR_BUSINESS;

    const maxTenureA = maxTenureByAge(ageA, applicantTypeA);
    const maxTenureB = maxTenureByAge(ageB, applicantTypeB);

    const autoEffectiveTenure = hasCoApplicant ? Math.min(maxTenureA, maxTenureB) : maxTenureA;

    let eff = typeof tenureYears === "number" && tenureYears > 0 ? Math.min(tenureYears, 30) : autoEffectiveTenure;
    eff = Math.max(1, eff);

    const incA = typeof incomeA === "number" ? incomeA : 0;
    const incB = typeof incomeB === "number" ? incomeB : 0;
    const exA = typeof existingEmisA === "number" ? existingEmisA : 0;
    const exB = typeof existingEmisB === "number" ? existingEmisB : 0;

    const maxEmiA = Math.max(0, incA * foirA - exA);
    const maxEmiB = hasCoApplicant ? Math.max(0, incB * foirB - exB) : 0;

    const totalMaxEmi = maxEmiA + maxEmiB;
    const loanEligibility = loanFromEmi(totalMaxEmi, interestRate, eff);

    const propVal = typeof propertyValue === "number" ? propertyValue : 0;
    const requiredDP = propVal > 0 ? Math.max(0, propVal - loanEligibility) : 0;
    const propertyAff = propVal > 0 ? propVal : Math.round(loanEligibility + (incA * 6 || 0));

    setComputed({
      ageA,
      ageB,
      maxTenureA,
      maxTenureB,
      effectiveTenure: eff,
      maxEmiA,
      maxEmiB,
      totalMaxEmi,
      loanEligibility,
      propertyAffordability: propertyAff,
      requiredDownPayment: requiredDP,
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

  /* Input change tracking */
  const onInputChange = (field: string, value: any) => {
    trackGA("loan_input_change", field, { value });
    trackMeta("loan_input_change", field, { value });
  };

  /* CTA */
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

  /* Toggle co-applicant */
  const toggleCoApplicant = () => {
    setHasCoApplicant((s) => !s);
    onInputChange("co_applicant_toggle", !hasCoApplicant);
  };

  /* Helper: retirement progress percent (0..100) */
  const retirementProgress = (age: number | null, type: "salaried" | "business") => {
    if (age === null) return 0;
    const retire = retirementAgeFor(type);
    const pct = Math.min(100, Math.max(0, (age / retire) * 100));
    return Math.round(pct);
  };

  const yearsLeftToWork = (age: number | null, type: "salaried" | "business") => {
    if (age === null) return null;
    const retire = retirementAgeFor(type);
    return Math.max(0, retire - age);
  };

  // compute slider max allowed
  const sliderMax = hasCoApplicant ? Math.min(computed.maxTenureA, computed.maxTenureB) : computed.maxTenureA;
  const sliderMin = 5;

  return (
    <section id="loan-eligibility" className="py-20 lg:py-28 bg-background" ref={containerRef}>
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Loan Eligibility & <span className="text-primary">Affordability</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter a few details and we’ll estimate maximum loan, EMI capability and down payment required.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT: Inputs */}
          <div className="space-y-6">

            {/* Applicant Card */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Applicant Details</h3>
                <div className="text-sm text-muted-foreground">Primary</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <div className="text-sm font-medium">Applicant Type</div>
                  <select
                    value={applicantTypeA}
                    onChange={(e) => {
                      setApplicantTypeA(e.target.value as "salaried" | "business");
                      onInputChange("applicant_typeA", e.target.value);
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

              <div className="grid grid-cols-2 gap-3 mt-3">
                <label className="space-y-1">
                  <div className="text-sm font-medium">Monthly Net Income (₹)</div>
                  <input
                    type="number"
                    placeholder="eg. 50000"
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

              {/* Retirement progress & years left */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Retirement progress (Primary)</div>
                  <div className="text-sm font-medium">
                    {computed.ageA ?? "-"} yrs
                  </div>
                </div>
                <div className="w-full bg-muted/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 bg-primary rounded-full transition-all"
                    style={{ width: `${retirementProgress(computed.ageA, applicantTypeA)}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Years left to work: <strong>{yearsLeftToWork(computed.ageA, applicantTypeA) ?? "-"}</strong> yrs
                </div>
              </div>
            </div>

            {/* Co-applicant Card */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">Co-applicant</h3>
                <div className="flex items-center gap-3">
                  <label className="text-sm">Add co-applicant</label>
                  <input
                    type="checkbox"
                    checked={hasCoApplicant}
                    onChange={toggleCoApplicant}
                    className="toggle"
                  />
                </div>
              </div>

              {hasCoApplicant ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="space-y-1">
                      <div className="text-sm font-medium">Applicant Type</div>
                      <select
                        value={applicantTypeB}
                        onChange={(e) => {
                          setApplicantTypeB(e.target.value as "salaried" | "business");
                          onInputChange("applicantTypeB", e.target.value);
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
                        placeholder="eg. 40000"
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

                  {/* Co-applicant retirement progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-muted-foreground">Retirement progress (Co-applicant)</div>
                      <div className="text-sm font-medium">
                        {computed.ageB ?? "-"} yrs
                      </div>
                    </div>
                    <div className="w-full bg-muted/10 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-primary rounded-full transition-all"
                        style={{ width: `${retirementProgress(computed.ageB, applicantTypeB)}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Years left to work: <strong>{yearsLeftToWork(computed.ageB, applicantTypeB) ?? "-"}</strong> yrs
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No co-applicant added.</div>
              )}
            </div>

            {/* Loan Parameters (includes slider for tenure) */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Loan Parameters</h3>
                <div className="text-sm text-muted-foreground">Default interest: 8%</div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* Interest */}
                  <label className="space-y-1">
                    <div className="text-sm font-medium">Interest Rate (%)</div>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => {
                        const v = Number(e.target.value) || DEFAULTS.INTEREST;
                        setInterestRate(v);
                        onInputChange("interestRate", v);
                      }}
                      className="input"
                    />
                  </label>

                  {/* Tenure number input (clamped) */}
                  <label className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Preferred Tenure (yrs)</div>
                      <div title="Info" className="text-muted-foreground">
                        <Info size={14} />
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <input
                        type="number"
                        min={sliderMin}
                        max={sliderMax}
                        value={tenureYears as any}
                        onChange={(e) => {
                          let v: number | "" = e.target.value ? Number(e.target.value) : "";
                          if (v === "") {
                            setTenureYears("");
                            onInputChange("tenureYears", "");
                            return;
                          }
                          // clamp
                          if (v < sliderMin) v = sliderMin;
                          if (v > sliderMax) v = sliderMax;
                          setTenureYears(v);
                          onInputChange("tenureYears", v);
                        }}
                        className="input"
                        style={{ width: "6.5rem" }}
                      />

                      {/* Slider */}
                      <input
                        type="range"
                        min={sliderMin}
                        max={sliderMax}
                        step={1}
                        value={typeof tenureYears === "number" ? tenureYears : sliderMax}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setTenureYears(v);
                          onInputChange("tenureSlider", v);
                        }}
                        className="w-full"
                      />
                    </div>

                    {/* Helping text */}
                    <div className="text-xs text-muted-foreground mt-2 leading-relaxed bg-muted/20 p-3 rounded-lg">
                      <strong>Maximum permissible tenure:</strong>{" "}
                      <strong>{sliderMax}</strong> years.
                      <br />
                      <strong>Why:</strong> Tenure is limited by retirement rules —{" "}
                      <strong>salaried</strong> till age 60 and{" "}
                      <strong>business</strong> till age 65. If you add a co-applicant,
                      the younger applicant's limit applies. Lenders also apply an
                      absolute cap of 30 years. Minimum practical tenure used is 5 years.
                      <br />
                      <span className="text-muted-foreground/70">
                        The tenure field defaults to the maximum allowed. You can reduce it using the slider or number input.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Property value */}
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

          {/* RIGHT: Output */}
          <div>
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold">Affordability Summary</h3>
                <div className="text-sm text-muted-foreground">Real-time estimate</div>
              </div>

              <div className="space-y-4">
                {/* Max EMI & Loan */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/5 rounded-xl">
                    <div className="text-sm text-muted-foreground">Max EMI you can pay</div>
                    <div className="text-2xl font-semibold mt-2">{formatINR(Math.round(computed.totalMaxEmi))}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Primary: {formatINR(Math.round(computed.maxEmiA))} {hasCoApplicant && <>• Co: {formatINR(Math.round(computed.maxEmiB))}</>}
                    </div>
                  </div>

                  <div className="p-4 bg-muted/5 rounded-xl">
                    <div className="text-sm text-muted-foreground">Loan Eligibility</div>
                    <div className="text-2xl font-semibold mt-2">{formatINR(Math.round(computed.loanEligibility))}</div>
                    <div className="text-xs text-muted-foreground mt-1">@ {interestRate}% for {computed.effectiveTenure} yrs</div>
                  </div>
                </div>

                {/* Property affordability */}
                <div className="p-4 bg-muted/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Property Affordability</div>
                      <div className="text-xl font-semibold mt-1">{formatINR(Math.round(computed.propertyAffordability))}</div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      Suggested down payment: <strong>20% recommended</strong>
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

                {/* FOIR */}
                <div className="p-4 border rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-primary w-5 h-5 mt-1" />
                    <div>
                      <div className="text-sm text-muted-foreground">FOIR used</div>
                      <div className="font-medium">
                        Primary: {(computed.foirA * 100).toFixed(0)}% {hasCoApplicant && <>• Co-applicant: {(computed.foirB * 100).toFixed(0)}%</>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">These are conservative defaults — banks may vary based on credit score & policy.</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Recommended next step</div>
                      <div className="font-semibold">Get detailed assessment & pre-approval</div>
                    </div>
                    <button className="btn btn-primary" onClick={handleCTA}>Check Full Report</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="relative mt-8 pl-8">
              <div className="absolute top-0 left-2 w-1 bg-primary/20 rounded-full timeline-line-small" />
              <div className="space-y-6">
                <div className="fade-stage">
                  <div className="text-sm font-medium">How we computed</div>
                  <div className="text-xs text-muted-foreground">
                    We calculate allowable EMI from FOIR (based on profile), subtract existing EMIs, then convert EMI capacity into loan amount using the selected interest rate & tenure.
                  </div>
                </div>
                <div className="fade-stage">
                  <div className="text-sm font-medium">Co-applicant impact</div>
                  <div className="text-xs text-muted-foreground">
                    Adding a co-applicant sums EMI capacity often significantly increasing loan eligibility. Tenure will be limited by the younger applicant's permissible tenure.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Styles (kept local to component) */}
      <style>{`
        .timeline-line-small { height: 100%; transition: height 1.2s ease-out; }
        .fade-stage { opacity: 0; transform: translateY(18px); animation: fadeUpStageSmall 0.6s forwards ease-out; }
        @keyframes fadeUpStageSmall { to { opacity: 1; transform: translateY(0); } }

        .input {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: 0.65rem;
          border: 1px solid rgba(15,23,42,0.06);
          background: transparent;
          outline: none;
        }
        .input:focus { box-shadow: 0 0 0 4px rgba(99,102,241,0.06); border-color: rgba(99,102,241,0.6); }

        .toggle { width: 44px; height: 24px; }
        .btn { padding: 0.6rem 1rem; border-radius: 0.65rem; }
        .btn-primary { background: linear-gradient(90deg, #4f46e5, #7c3aed); color: white; font-weight: 600; }

        /* simple slider style (native will be used on mobile) */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: linear-gradient(to right, #c7d2fe, #f0f9ff);
          border-radius: 999px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px; border-radius: 50%; background: #4f46e5; box-shadow: 0 2px 6px rgba(79,70,229,0.25);
        }
      `}</style>
    </section>
  );
};

export default LoanEligibilityWidget;
