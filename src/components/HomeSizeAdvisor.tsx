// HomeSizeAdvisor_Clean.tsx — final clean production-ready component
// - No comfort UI/logic
// - Storage removed
// - 3 BHK Royale capacity = 3.5
// - Mobile-first, preview-ready for embedding on landing page

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Layers, Info } from "lucide-react";

type Recommendation = { type: string; size: string; rationale: string[] };
type Result = { primary: Recommendation; backup: Recommendation } | null;

const UNIT_CAPACITY: Record<string, number> = { "2 BHK": 2, "3 BHK": 3, "3 BHK Royale": 3.5 };

export default function HomeSizeAdvisor({ className = "" }: { className?: string }) {
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(0);
  const [elderly, setElderly] = useState<number>(0);
  const [wfh, setWfh] = useState<boolean>(false);
  const [guests, setGuests] = useState<string>("rare");
  const [result, setResult] = useState<Result>(null);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  const adultsRoomLabel = () => {
    const r = Math.max(1, Math.ceil(adults / 2));
    return r === 1 ? "1 Adult Room" : `${r} Adult Rooms`;
  };

  const kidsRoomLabel = () => {
    if (kids === 0) return "No Kid Room";
    const r = Math.ceil(kids / 2);
    return r === 1 ? "1 Kid Room" : `${r} Kid Rooms`;
  };

  const elderlyRoomLabel = () => {
    if (elderly === 0) return "No Elderly Room";
    const r = Math.ceil(elderly / 2);
    return r === 1 ? "1 Elderly Room" : `${r} Elderly Rooms`;
  };

  const guestsLabel = () =>
    guests === "rare" ? "Occasional Guests" : guests === "sometimes" ? "Guests sometimes" : "Frequent guests — extra room useful";

  const totalRoomsNeeded = () => Math.max(1, Math.ceil(adults / 2)) + Math.ceil(kids / 2) + Math.ceil(elderly / 2) + (wfh ? 1 : 0);

  const generateMultiUnitCombo = (required: number) => {
    const out: string[] = [];
    let rem = required;
    const push = (u: keyof typeof UNIT_CAPACITY) => {
      out.push(u);
      rem -= UNIT_CAPACITY[u];
    };
    while (rem > 0.001) {
      if (rem >= 3.5) push("3 BHK Royale");
      else if (rem >= 3) push("3 BHK");
      else push("2 BHK");
    }
    const counts: Record<string, number> = {};
    out.forEach((u) => (counts[u] = (counts[u] || 0) + 1));
    return Object.entries(counts).map(([u, c]) => (c === 1 ? u : `${c} × ${u}`));
  };

  const buildMultiUnitCombos = () => {
    const rooms = totalRoomsNeeded();
    if (rooms <= 4) return [];
    const combo = generateMultiUnitCombo(rooms);
    return combo.length ? [`Consider: ${combo.join(" + ")}`] : [];
  };

  const capacityFromComboString = (comboStr: string) => {
    const cleaned = comboStr.replace(/^Consider:\s*/, "");
    return cleaned.split(" + ").reduce((sum, p) => sum + (UNIT_CAPACITY[p.trim()] || 0), 0);
  };

  const calculateResult = () => {
    const rooms = totalRoomsNeeded();
    let primary: Recommendation = { type: "2 BHK", size: "883 sq.ft", rationale: [] };
    let backup: Recommendation = { type: "3 BHK", size: "1082 sq.ft", rationale: [] };

    if (rooms <= 2) {
      primary = { type: "2 BHK", size: "883 sq.ft", rationale: [] };
      backup = { type: "3 BHK", size: "1082 sq.ft", rationale: ["Future flexibility"] };
    } else if (rooms === 3) {
      primary = { type: "3 BHK", size: "1082 sq.ft", rationale: [] };
      backup = { type: "3 BHK Royale", size: "1756–1779 sq.ft", rationale: ["More spacious living"] };
    } else {
      primary = { type: "3 BHK Royale", size: "1756–1779 sq.ft", rationale: [] };
      backup = { type: "3 BHK", size: "1082 sq.ft", rationale: ["Compact alternative"] };
    }

    if (rooms > 4) {
      const combos = buildMultiUnitCombos();
      const pri = combos[0];
      if (pri) primary = { type: pri.replace(/^Consider:\s*/, ""), size: `${capacityFromComboString(pri)} room capacity`, rationale: [] };
    }

    const rationale: string[] = [];
    rationale.push(`Rooms needed: ${rooms}`);
    if (wfh) rationale.push("Includes workspace (WFH)");
    if (kids > 0) rationale.push("Kids require separate space");
    if (elderly > 0) rationale.push("Elderly accommodation recommended");
    if (guests === "frequent") rationale.push("Frequent guests — consider extra flexibility");

    primary.rationale = rationale;
    setResult({ primary, backup });
    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 260);
  };

  useEffect(() => {
    calculateResult();
  }, [adults, kids, elderly, wfh, guests]);

  const spacePressureScore = () => {
    const raw = totalRoomsNeeded();
    if (result && (result.primary.type.includes("×") || result.primary.type.includes("+"))) {
      const cap = capacityFromComboString(`Consider: ${result.primary.type}`);
      return Math.min(100, Math.round((raw / cap) * 100));
    }
    return Math.min(100, Math.round((raw / 4) * 100));
  };

  const bhkMeterValue = () => {
    if (!result) return 0;
    if (result.primary.type.includes("2 BHK")) return 33;
    if (result.primary.type.includes("3 BHK Royale")) return 100;
    return 66;
  };

  const resetForm = () => {
    setAdults(2);
    setKids(0);
    setElderly(0);
    setWfh(false);
    setGuests("rare");
    setResult(null);
  };

  return (
    <div className={`w-full flex justify-center bg-[#F5F7FA] p-4 md:p-8 ${className}`}>
      <Card className="w-full max-w-4xl p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold text-[#1A365D]">Home Size Advisor</CardTitle>
        </CardHeader>

        <CardContent className="md:flex md:gap-6 md:items-start">
          <div className="md:w-1/2 space-y-6">
            <div className="border rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2 text-[#2D3748]"><Users className="w-4 h-4" /> Household</h4>
                <span className="text-sm text-[#4A5568]">Enter composition</span>
              </div>

              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="text-sm text-[#4A5568] mb-1">Adults</label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                      <div className="min-w-[44px] text-center">{adults}</div>
                      <Button variant="outline" size="sm" onClick={() => setAdults(adults + 1)}>+</Button>
                      <div className="relative group ml-1">
                        <button type="button" className="cursor-pointer text-[#A0AEC0] text-xs p-1 rounded-full">
                          <Info className="w-3 h-3" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 left-0 top-8 z-10 whitespace-nowrap">{adultsRoomLabel()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-[#4A5568] mb-1">Kids</label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" onClick={() => setKids(Math.max(0, kids - 1))}>-</Button>
                      <div className="min-w-[44px] text-center">{kids}</div>
                      <Button variant="outline" size="sm" onClick={() => setKids(kids + 1)}>+</Button>
                      <div className="relative group ml-1">
                        <button type="button" className="cursor-pointer text-[#A0AEC0] text-xs p-1 rounded-full">
                          <Info className="w-3 h-3" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 left-0 top-8 z-10 whitespace-nowrap">{kidsRoomLabel()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-[#4A5568] mb-1">Elderly</label>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" onClick={() => setElderly(Math.max(0, elderly - 1))}>-</Button>
                      <div className="min-w-[44px] text-center">{elderly}</div>
                      <Button variant="outline" size="sm" onClick={() => setElderly(elderly + 1)}>+</Button>
                      <div className="relative group ml-1">
                        <button type="button" className="cursor-pointer text-[#A0AEC0] text-xs p-1 rounded-full">
                          <Info className="w-3 h-3" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 left-0 top-8 z-10 whitespace-nowrap">{elderlyRoomLabel()}</div>
                      </div>
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

              <div className="flex flex-col gap-3">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={wfh} onChange={() => setWfh(!wfh)} />
                  <span className="text-sm">Work from home</span>
                </label>

                <div>
                  <div className="text-sm text-[#4A5568] mb-2">Guest Frequency</div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant={guests === "rare" ? "default" : "outline"} onClick={() => setGuests("rare")}>Rarely</Button>
                    <Button variant={guests === "sometimes" ? "default" : "outline"} onClick={() => setGuests("sometimes")}>Sometimes</Button>
                    <Button variant={guests === "frequent" ? "default" : "outline"} onClick={() => setGuests("frequent")}>Frequently</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 h-12 bg-[#1A365D] text-white" onClick={resetForm}>Reset</Button>
            </div>
          </div>

          <div className="md:w-1/2 md:sticky md:top-6 h-fit mt-6 md:mt-0">
            <div className={`${fadeIn ? 'opacity-100 transition-opacity duration-300' : 'opacity-100'}`}>
              {result && (
                <div className="p-4 border rounded-xl bg-white shadow">
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
                        const eff = totalRoomsNeeded() + (guests === "frequent" ? 1 : 0);
                        const t = result.primary.type;
                        let isStretch = false;
                        if (t.includes("2 BHK") && eff > 2) isStretch = true;
                        if (t.includes("3 BHK") && !t.includes("Royale") && eff > 3) isStretch = true;
                        return isStretch ? <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs">Stretch Fit</span> : <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">Best Fit</span>;
                      })()}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div style={{ width: `${bhkMeterValue()}%` }} className="h-2 bg-gradient-to-r from-indigo-500 to-teal-400" />
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-[#4A5568]"><span>2 BHK</span><span>3 BHK</span><span>3 BHK Royale</span></div>
                  </div>

                  <div className="mt-4 text-sm text-[#4A5568]">
                    <ul className="list-disc list-inside space-y-1">
                      {result.primary.rationale.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    {buildMultiUnitCombos().length > 0 && (
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="text-sm font-semibold text-orange-800">Multi-Unit Recommendation</div>
                        <div className="text-sm text-orange-700 mt-1">{buildMultiUnitCombos()[0]}</div>
                      </div>
                    )}
                  </div>

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
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
