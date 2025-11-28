// /components/HomeSizeAdvisor.tsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Briefcase, HeartHandshake, Layers } from "lucide-react";

type Recommendation = {
  type: string;
  size: string;
  rationale: string[];
};

type Result = {
  primary: Recommendation;
  backup: Recommendation;
} | null;

type Props = {
  gaEnabled?: boolean;
  fbEnabled?: boolean;
  trackGA?: (event: string, payload?: any) => void;
  trackFB?: (event: string, payload?: any) => void;
  className?: string;
};

/* Unit capacities — how many 'rooms' each unit supplies */
const UNIT_CAPACITY: Record<string, number> = {
  "2 BHK": 2,
  "3 BHK": 3,
  "3 BHK Royale": 4,
};

export default function HomeSizeAdvisor({
  gaEnabled = false,
  fbEnabled = false,
  trackGA,
  trackFB,
  className = "",
}: Props): JSX.Element {
  // Inputs
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(0);
  const [elderly, setElderly] = useState<number>(0);
  const [wfh, setWfh] = useState<boolean>(false);
  const [guests, setGuests] = useState<string>("rare"); // rare | sometimes | frequent
  const [storage, setStorage] = useState<string>("medium"); // low | medium | high
  const [comfort, setComfort] = useState<number>(50); // 0-100
  const [result, setResult] = useState<Result>(null);

  // Tracking helpers (fall back to global gtag/fbq if present)
  const _trackGA = trackGA ?? ((event: string, payload?: any) => {
    if (gaEnabled && typeof (window as any).gtag === "function") (window as any).gtag("event", event, payload || {});
  });
  const _trackFB = trackFB ?? ((event: string, payload?: any) => {
    if (fbEnabled && typeof (window as any).fbq === "function") (window as any).fbq("track", event, payload || {});
  });

  // Labels (simple functions to avoid stale closures)
  const adultsRoomLabel = () => {
    const rooms = Math.max(1, Math.ceil(adults / 2));
    return rooms === 1 ? "1 Adult Room" : `${rooms} Adult Rooms`;
  };
  const kidsRoomLabel = () => {
    if (kids === 0) return "No Kid Room";
    if (kids === 1) return "1 Kid Room";
    return "2 Kid Rooms";
  };
  const elderlyRoomLabel = () => {
    if (elderly === 0) return "No Elderly Room";
    const rooms = Math.ceil(elderly / 2);
    return rooms === 1 ? "1 Elderly Room" : `${rooms} Elderly Room(s)`;
  };
  const guestsLabel = () => {
    if (guests === "rare") return "Occasional Guests";
    if (guests === "sometimes") return "Guests sometimes (flexible)";
    return "Frequent guests — extra room recommended";
  };

  // Map people to raw rooms needed
  const totalRoomsNeeded = () => {
    let rooms = 0;
    rooms += Math.max(1, Math.ceil(adults / 2)); // adults pair into rooms
    rooms += kids === 0 ? 0 : kids === 1 ? 1 : 2;
    rooms += Math.ceil(elderly / 2);
    rooms += wfh ? 1 : 0;
    return rooms;
  };

  /* ---------------- Multi-unit builder (Option C: usability-optimized) ---------------- */
  function generateMultiUnitCombo(required: number) {
    const parts: string[] = [];
    let rem = required;

    const pushUnit = (unit: keyof typeof UNIT_CAPACITY) => {
      parts.push(unit);
      rem -= UNIT_CAPACITY[unit];
    };

    while (rem > 0) {
      if (rem >= 4) {
        pushUnit("3 BHK Royale");
        continue;
      }
      if (rem === 3) {
        pushUnit("3 BHK");
        continue;
      }
      if (rem === 2) {
        pushUnit("2 BHK");
        continue;
      }
      if (rem === 1) {
        // realistically, add a 2 BHK
        pushUnit("2 BHK");
        continue;
      }
      break;
    }

    // compress counts
    const counts: Record<string, number> = {};
    parts.forEach((p) => (counts[p] = (counts[p] || 0) + 1));
    return Object.entries(counts).map(([unit, c]) => (c === 1 ? unit : `${c} × ${unit}`));
  }

  const buildMultiUnitCombos = () => {
    const rooms = totalRoomsNeeded();
    if (rooms <= 4) return [];
    const combo = generateMultiUnitCombo(rooms);
    return combo.length ? [`Consider: ${combo.join(" + ")}`] : [];
  };

  const capacityFromComboString = (comboStr: string) => {
    if (!comboStr) return 0;
    const cleaned = comboStr.replace(/^Consider:\s*/, "");
    const parts = cleaned.split(" + ").map((p) => p.trim());
    return parts.reduce((sum, p) => sum + (UNIT_CAPACITY[p] || 0), 0);
  };

  /* ---------------- Recommendation engine (hybrid) ---------------- */
  const calculateResult = () => {
    const roomsNeeded = totalRoomsNeeded();

    // boost factors from comfort/storage/guests
    let boost = 0;
    if (comfort > 70) boost += 1;
    if (storage === "high") boost += 1;
    if (guests === "frequent") boost += 1;

    const effectiveRooms = roomsNeeded + boost;

    let primary: Recommendation = { type: "2 BHK", size: "883 sq.ft", rationale: [] };
    let backup: Recommendation = { type: "3 BHK", size: "1082 sq.ft", rationale: [] };

    // single-unit mapping
    if (effectiveRooms <= 2) {
      primary = { type: "2 BHK", size: "883 sq.ft", rationale: [] };
      backup = { type: "3 BHK", size: "1082 sq.ft", rationale: ["Upgrade for future flexibility"] };
    } else if (effectiveRooms === 3) {
      primary = { type: "3 BHK", size: "1082 sq.ft", rationale: [] };
      backup = { type: "3 BHK Royale", size: "1756–1779 sq.ft", rationale: ["More generous living area"] };
    } else {
      // effectiveRooms >= 4
      primary = { type: "3 BHK Royale", size: "1756–1779 sq.ft", rationale: [] };
      backup = { type: "3 BHK", size: "1082 sq.ft", rationale: ["Compact alternative"] };
    }

    // Hybrid override to multi-unit primary when effectiveRooms > 4
    if (effectiveRooms > 4) {
      const combos = buildMultiUnitCombos();
      const primaryCombo = combos[0] || "";
      if (primaryCombo) {
        const cap = capacityFromComboString(primaryCombo);
        primary = {
          type: primaryCombo.replace(/^Consider:\s*/, ""),
          size: `${cap} room capacity`,
          rationale: [],
        };
      }
    }

    // Build rationale bullets (merged, not replacing)
    const rationale: string[] = [];
    rationale.push(`Rooms needed (raw): ${roomsNeeded}`);
    if (wfh) rationale.push("Dedicated workspace recommended");
    if (kids > 0) rationale.push("Separate room(s) for kids recommended");
    if (elderly > 0) rationale.push("Elderly accommodation recommended (accessible)");
    if (comfort > 70) rationale.push("High comfort preference — consider larger space");
    if (comfort < 40) rationale.push("Low comfort preference — compact living preferred");
    if (storage === "high") rationale.push("High storage needs — consider extra storage");
    if (guests === "frequent") rationale.push("Frequent guests — guest room recommended");

    primary.rationale = rationale;

    setResult({ primary, backup });

    // Analytics events
    _trackGA("advisor_calculated", { roomsNeeded, effectiveRooms, primary: primary.type });
    _trackFB("AdvisorCalculated", { roomsNeeded, effectiveRooms, primary: primary.type });
  };

  // Recompute when inputs change
  useEffect(() => {
    calculateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adults, kids, elderly, wfh, guests, storage, comfort]);

  /* ---------------- UI helpers ---------------- */
  const bhkMeterValue = () => {
    if (!result) return 0;
    if (result.primary.type.includes("2 BHK")) return 33;
    if (result.primary.type.includes("3 BHK") && !result.primary.type.includes("Royale")) return 66;
    return 100;
  };

  const spacePressureScore = () => {
    const rooms = totalRoomsNeeded();
    // if primary is a combo, use its capacity
    if (result && (result.primary.type.includes("+") || result.primary.type.includes("×"))) {
      const cap = capacityFromComboString(`Consider: ${result.primary.type}`);
      if (cap > 0) return Math.min(100, Math.round((rooms / cap) * 100));
    }
    const maxCap = UNIT_CAPACITY["3 BHK Royale"];
    return Math.min(100, Math.round((rooms / maxCap) * 100));
  };

  /* Reset & manual refresh */
  const resetForm = () => {
    setAdults(2);
    setKids(0);
    setElderly(0);
    setWfh(false);
    setGuests("rare");
    setStorage("medium");
    setComfort(50);
    setResult(null);
    _trackGA("advisor_reset");
    _trackFB("AdvisorReset");
  };

  const manualRefresh = () => {
    calculateResult();
    _trackGA("advisor_manual_refresh");
    _trackFB("AdvisorManualRefresh");
  };

  /* ---------------- Render ---------------- */
  return (
    <div className={`w-full flex justify-center bg-[#F5F7FA] p-8 ${className}`}>
      <Card className="w-full max-w-4xl p-6 rounded-2xl shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-[#1A365D]">
            PropYouLike — Home Size Advisor (Provident Sunworth City)
          </CardTitle>
        </CardHeader>

        <CardContent className="md:flex md:gap-6 md:items-start">
          {/* LEFT: inputs */}
          <div className="md:w-1/2 space-y-6">
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2 text-[#2D3748]"><Users className="w-4 h-4" /> Household</h4>
                <span className="text-sm text-[#4A5568]">Enter composition</span>
              </div>

              <div className="mt-3 space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm text-[#4A5568]">Adults</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="sm" onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                      <div className="w-10 text-center">{adults}</div>
                      <Button variant="outline" size="sm" onClick={() => setAdults(adults + 1)}>+</Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-[#4A5568]">Kids</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="sm" onClick={() => setKids(Math.max(0, kids - 1))}>-</Button>
                      <div className="w-10 text-center">{kids}</div>
                      <Button variant="outline" size="sm" onClick={() => setKids(kids + 1)}>+</Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-[#4A5568]">Elderly</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="sm" onClick={() => setElderly(Math.max(0, elderly - 1))}>-</Button>
                      <div className="w-10 text-center">{elderly}</div>
                      <Button variant="outline" size="sm" onClick={() => setElderly(elderly + 1)}>+</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-3 bg-white space-y-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <h4 className="font-medium text-[#2D3748]">Lifestyle</h4>
              </div>
              <div>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={wfh} onChange={() => setWfh(!wfh)} />
                  <span className="text-sm ml-2">Work from home</span>
                </label>
              </div>

              <div>
                <div className="text-sm text-[#4A5568] mb-1">Guest Frequency</div>
                <div className="flex gap-2">
                  <Button variant={guests === "rare" ? "default" : "outline"} onClick={() => setGuests("rare")}>Rarely</Button>
                  <Button variant={guests === "sometimes" ? "default" : "outline"} onClick={() => setGuests("sometimes")}>Sometimes</Button>
                  <Button variant={guests === "frequent" ? "default" : "outline"} onClick={() => setGuests("frequent")}>Frequently</Button>
                </div>
              </div>

              <div>
                <div className="text-sm text-[#4A5568] mb-1">Storage Needs <span className="text-xs text-gray-400">(Low / Medium / High)</span></div>
                <div className="flex gap-2">
                  <Button variant={storage === "low" ? "default" : "outline"} onClick={() => setStorage("low")}>Low</Button>
                  <Button variant={storage === "medium" ? "default" : "outline"} onClick={() => setStorage("medium")}>Medium</Button>
                  <Button variant={storage === "high" ? "default" : "outline"} onClick={() => setStorage("high")}>High</Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4" />
                <h4 className="font-medium text-[#2D3748]">Comfort vs Space</h4>
              </div>
              <div className="mt-3">
                <Slider value={[comfort]} onValueChange={(v: number[]) => setComfort(v[0])} max={100} />
                <div className="text-xs text-[#4A5568] mt-2">{comfort < 40 ? "Compact" : comfort < 70 ? "Balanced" : "Prefer more spacious"}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 h-12 bg-[#1A365D] text-white" onClick={resetForm}>Reset</Button>
              <Button className="flex-1 h-12" onClick={manualRefresh}>Refresh</Button>
            </div>
          </div>

          {/* RIGHT: recommendation */}
          <div className="md:w-1/2 md:sticky md:top-6 h-fit mt-6 md:mt-0">
            <AnimatePresence>
              {result && (
                <motion.div
                  key={result.primary.type}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="p-4 border rounded-xl bg-white shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Layers className="w-5 h-5 text-[#2D3748]" />
                      <div>
                        <div className="text-sm text-[#4A5568]">Recommended Unit</div>
                        <div className="text-lg font-semibold text-[#1A365D]">{result.primary.type}</div>
                        <div className="text-xs text-[#718096]">{result.primary.size}</div>
                      </div>
                    </div>

                    <div>
                      {(() => {
                        const eff = totalRoomsNeeded() + (comfort > 70 ? 1 : 0) + (storage === "high" ? 1 : 0) + (guests === "frequent" ? 1 : 0);
                        const t = result.primary.type;
                        let isStretch = false;
                        if (t.includes("2 BHK") && eff > 2) isStretch = true;
                        if (t.includes("3 BHK") && !t.includes("Royale") && eff > 3) isStretch = true;
                        return isStretch ? <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs">Stretch Fit</span> : <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">Best Fit</span>;
                      })()}
                    </div>
                  </div>

                  {/* BHK meter */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div style={{ width: `${bhkMeterValue()}%` }} className="h-2 bg-gradient-to-r from-indigo-500 to-teal-400" />
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-[#4A5568]"><span>2 BHK</span><span>3 BHK</span><span>3 BHK Royale</span></div>
                  </div>

                  {/* Rationale */}
                  <div className="mt-4 text-sm text-[#4A5568]">
                    <ul className="list-disc list-inside space-y-1">
                      {result.primary.rationale.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Multi-unit suggestion */}
                  <div className="mt-4">
                    {buildMultiUnitCombos().length > 0 && (
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="text-sm font-semibold text-orange-800">Multi-Unit Recommendation</div>
                        <div className="text-sm text-orange-700 mt-1">{buildMultiUnitCombos()[0]}</div>
                      </div>
                    )}
                  </div>

                  {/* Space Pressure */}
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-[#2D3748]">Space Pressure Score</div>
                      <div className="text-sm text-[#4A5568]">{spacePressureScore()}%</div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div style={{ width: `${spacePressureScore()}%` }} className={`h-2 ${spacePressureScore() < 60 ? "bg-green-500" : spacePressureScore() < 90 ? "bg-yellow-500" : "bg-red-500"}`} />
                    </div>

                    {spacePressureScore() >= 100 ? (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                        Your needs exceed available capacity even when considering suggested combos. Consider revising needs or exploring additional inventory.
                      </div>
                    ) : null}
                  </div>

                  {/* Needs summary */}
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <div className="text-sm font-medium text-[#2D3748] mb-2">Needs Summary</div>
                    <ul className="text-sm text-[#4A5568] space-y-1 list-disc list-inside">
                      <li>Adults: {adults} — {adultsRoomLabel()}</li>
                      <li>Kids: {kids} — {kidsRoomLabel()}</li>
                      <li>Elderly: {elderly} — {elderlyRoomLabel()}</li>
                      <li>WFH: {wfh ? "Yes" : "No"}</li>
                      <li>Guests: {guestsLabel()}</li>
                      <li className="font-semibold">Total rooms needed: {totalRoomsNeeded()}</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
