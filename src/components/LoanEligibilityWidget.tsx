import { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
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
  }
};

const trackMeta = (event: string, label: string, payload?: Record<string, any>) => {
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", event, { label, ...(payload || {}) });
  }
};

/* ----------------------------------------------------
   UTILS
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

const maxTenureByAge = (age: number | null, type: "salaried" | "business") => {
  if (age === null) return 30;
  const retirementAge = type === "salaried" ? 60 : 65;
  const remainingYears = Math.max(0, retirementAge - age);
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
   MAIN COMPONENT
---------------------------------------------------- */
const LoanEligibilityWidget = ({ onCtaClick }: LoanWidgetProps) => {
  const [viewTracked, setViewTracked] = useState(false);

  /* Applicant A */
  const [applicantTypeA, setApplicantTypeA] =
    useState<"salaried" | "business">("salaried");
  const [dobA, setDobA] = useState<string>("");
  const [incomeA, setIncomeA] = useState<number | "">("");
  const [existingEmisA, setExistingEmisA] = useState<number | "">("");

  /* Co-applicant */
  const [hasCoApplicant, setHasCoApplicant] = useState(false);
  const [applicantTypeB, setApplicantTypeB] =
    useState<"salaried" | "business">("salaried");
  const [dobB, setDobB] = useState<string>("");
  const [incomeB, setIncomeB] = useState<number | "">("");
  const [existingEmisB, setExistingEmisB] = useState<number | "">("");

  /* Loan parameters */
  const [interestRate, setInterestRate] = useState(DEFAULTS.INTEREST);
  const [tenureYears, setTenureYears] = useState<number | "">("");
  const [propertyValue, setPropertyValue] = useState<number | "">("");

  const [openPanel, setOpenPanel] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* Calculated values */
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

  /* ----------------------------------------------------
     AUTO-SET TENURE BASED ON AGE LIMITS (NEW!)
  ---------------------------------------------------- */
  useEffect(() => {
    const ageA = computeAge(dobA);
    const ageB = computeAge(dobB);

    const maxA = maxTenureByAge(ageA, applicantTypeA);
    const maxB = hasCoApplicant
      ? maxTenureByAge(ageB, applicantTypeB)
      : maxA;

    const permissible = Math.min(maxA, maxB, 30);

    // Auto-set tenure only if blank OR exceeds permissible
    if (
      tenureYears === "" ||
      (typeof tenureYears === "number" && tenureYears > permissible)
    ) {
      setTenureYears(permissible);
    }
  }, [dobA, dobB, applicantTypeA, applicantTypeB, hasCoApplicant]);

  /* ----------------------------------------------------
     MAIN CALCULATION
  ---------------------------------------------------- */
  useEffect(() => {
    const ageA = computeAge(dobA);
    const ageB = computeAge(dobB);

    const foirA =
      applicantTypeA === "salaried"
        ? DEFAULTS.FOIR_SALARIED
        : DEFAULTS.FOIR_BUSINESS;
    const foirB =
      applicantTypeB === "salaried"
        ? DEFAULTS.FOIR_SALARIED
        : DEFAULTS.FOIR_BUSINESS;

    const maxTenureA = maxTenureByAge(ageA, applicantTypeA);
    const maxTenureB = maxTenureByAge(ageB, applicantTypeB);

    const autoEffectiveTenure = hasCoApplicant
      ? Math.min(maxTenureA, maxTenureB)
      : maxTenureA;

    let eff = typeof tenureYears === "number" && tenureYears > 0
      ? Math.min(tenureYears, 30)
      : autoEffectiveTenure;

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
    const requiredDP =
      propVal > 0 ? Math.max(0, propVal - loanEligibility) : 0;

    const propertyAff =
      propVal > 0 ? propVal : loanEligibility + (incA * 6 || 0);

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

  /* ----------------------------------------------------
     INPUT TRACKING
  ---------------------------------------------------- */
  const onInputChange = (field: string, value: any) => {
    trackGA("loan_input_change", field, { value });
    trackMeta("loan_input_change", field, { value });
  };

  /* ----------------------------------------------------
     CTA TRACKING
  ---------------------------------------------------- */
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

  /* ----------------------------------------------------
     TOGGLE CO-APPLICANT
  ---------------------------------------------------- */
  const toggleCoApplicant = () => {
    setHasCoApplicant((s) => !s);
    onInputChange("co_applicant_toggle", !hasCoApplicant);
  };

  /* ----------------------------------------------------
     UI + STYLING
  ---------------------------------------------------- */
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

          {/* LEFT: Inputs */}
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

                  {/* Applicant Type + DOB */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Applicant Type */}
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

                    {/* DOB */}
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

                  {/* Income + Existing EMIs */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Income */}
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

                    {/* Existing EMIs */}
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
                  Age: <strong>{computed.ageA ?? "-"}</strong> •
                  FOIR: <strong>{(computed.foirA * 100).toFixed(0)}%</strong> •
                  Max tenure: <strong>{computed.maxTenureA} yrs</strong>
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
                  {/* Type + DOB */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Type */}
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

                    {/* DOB */}
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

                  {/* Income + EMIs */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {/* income */}
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

                    {/* existing EMIs */}
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

                {/* rate + tenure */}
                <div className="grid grid-cols-2 gap-3">

                  {/* Interest */}
                  <label className="space-y-1">
                    <div className="text-sm font-medium">Interest Rate (%)</div>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setInterestRate(v);
                        onInputChange("interestRate", v);
                      }}
                      className="input"
                    />
                  </label>

                  {/* Tenure */}
                  <label className="space-y-1">
                    <div className="text-sm font-medium">Preferred Tenure (yrs)</div>
                    <input
                      type="number"
                      value={tenureYears as any}
                      onChange={(e) => {
                        const v = e.target.value ? Number(e.target.value) : "";
                        setTenureYears(v);
                        onInputChange("tenureYears", v);
                      }}
                      className="input"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      Max allowed:{" "}
                      {hasCoApplicant
                        ? Math.min(computed.maxTenureA, computed.maxTenureB)
                        : computed.maxTenureA
                      }{" "}
                      yrs
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

          {/* RIGHT: Output Summary */}
          <div>
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold">Affordability Summary</h3>
                <div className="text-sm text-muted-foreground">
                  Real-time estimate
                </div>
              </div>

              <div className="space-y-4">

                {/* Max EMI & Loan Eligibility */}
                <div className="grid grid-cols-2 gap-4">

                  {/* EMi */}
                  <div className="p-4 bg-muted/5 rounded-xl">
                    <div className="text-sm text-muted-foreground">
                      Max EMI you can pay
                    </div>
                    <div className="text-2xl font-semibold mt-2">
                      {formatINR(Math.round(computed.totalMaxEmi))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Primary: {formatINR(computed.maxEmiA)}{" "}
                      {hasCoApplicant && <> • Co: {formatINR(computed.maxEmiB)}</>}
                    </div>
                  </div>

                  {/* Loan eligibility */}
                  <div className="p-4 bg-muted/5 rounded-xl">
                    <div className="text-sm text-muted-foreground">Loan Eligibility</div>
                    <div className="text-2xl font-semibold mt-2">
                      {formatINR(Math.round(computed.loanEligibility))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      @{interestRate}% for {computed.effectiveTenure} yrs
                    </div>
                  </div>
                </div>

                {/* Property affordability */}
                <div className="p-4 bg-muted/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Property Affordability
                      </div>
                      <div className="text-xl font-semibold mt-1">
                        {formatINR(Math.round(computed.propertyAffordability))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground text-right">
                      Suggested down payment:
                      <br />
                      <strong>20% recommended</strong>
                    </div>
                  </div>

                  {/* Detailed DP calculation */}
                  {propertyValue ? (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="text-sm text-muted-foreground">Target Price</div>
                      <div className="font-medium">
                        {formatINR(propertyValue as number)}
                      </div>

                      <div className="text-sm text-muted-foreground">Loan you can get</div>
                      <div className="font-medium">
                        {formatINR(Math.round(computed.loanEligibility))}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Required Down Payment
                      </div>
                      <div className="font-medium">
                        {formatINR(Math.round(computed.requiredDownPayment))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 text-sm text-muted-foreground">
                      Enter a property price to compute exact down payment required.
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
                        Primary: {(computed.foirA * 100).toFixed(0)}%{" "}
                        {hasCoApplicant &&
                          <> • Co-applicant: {(computed.foirB * 100).toFixed(0)}%</>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Conservative defaults. Banks may vary.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final CTA */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Recommended next step
                      </div>
                      <div className="font-semibold">
                        Get detailed assessment & pre-approval
                      </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleCTA}>
                      Check Full Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="relative mt-8 pl-8">
              <div className="absolute top-0 left-2 w-1 bg-primary/20 rounded-full timeline-line-small"></div>
              <div className="space-y-6">
                <div className="fade-stage">
                  <div className="text-sm font-medium">How we computed</div>
                  <div className="text-xs text-muted-foreground">
                    Loan is calculated by converting EMI capacity
                    into total eligibility, using interest rate and tenure.
                  </div>
                </div>

                <div className="fade-stage">
                  <div className="text-sm font-medium">Co-applicant impact</div>
                  <div className="text-xs text-muted-foreground">
                    Adds EMI capacity and raises total eligibility.
                    Tenure limited by younger applicant.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Styles */}
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
        .input {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: 0.65rem;
          border: 1px solid rgba(15,23,42,0.06);
        }
        .input:focus {
          box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
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
