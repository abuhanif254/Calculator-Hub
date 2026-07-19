"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Eye, 
  Clock, 
  AlertTriangle, 
  Info, 
  MapPin, 
  Car, 
  CheckCircle, 
  Calendar,
  School,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { CalculatorDef } from "@/lib/types";

// ==========================================
// CONSTANTS & CONVERSIONS
// ==========================================
const cmToInches = (cm: number) => cm / 2.54;
const inchesToCm = (inches: number) => inches * 2.54;
const cToF = (c: number) => (c * 9/5) + 32;
const fToC = (f: number) => ((f - 32) * 5) / 9;
const kmhToMph = (kmh: number) => kmh / 1.60934;
const mphToKmh = (mph: number) => mph * 1.60934;

export function SnowDayCalculatorView({ calcDef, locale }: { calcDef?: CalculatorDef; locale?: string }) {
  const t = useTranslations("SnowDayCalculator");
  const [isMounted, setIsMounted] = useState(false);

  // Core Weather Inputs
  const [snowfall, setSnowfall] = useState(6); // default 6 inches
  const [snowfallUnit, setSnowfallUnit] = useState<"in" | "cm">("in");
  const [temperature, setTemperature] = useState(28); // default 28 F
  const [tempUnit, setTempUnit] = useState<"F" | "C">("F");
  const [windSpeed, setWindSpeed] = useState(15); // default 15 mph
  const [windUnit, setWindUnit] = useState<"mph" | "kmh">("mph");
  const [roadCondition, setRoadCondition] = useState<"excellent" | "good" | "fair" | "poor" | "dangerous">("poor");
  const [iceProbability, setIceProbability] = useState<"low" | "medium" | "high">("medium");
  const [prevAccumulation, setPrevAccumulation] = useState(2); // default 2 inches
  const [prevAccumulationUnit, setPrevAccumulationUnit] = useState<"in" | "cm">("in");

  // Core School Inputs
  const [schoolType, setSchoolType] = useState<"elementary" | "middle" | "high" | "university">("elementary");
  const [areaType, setAreaType] = useState<"urban" | "suburban" | "rural">("suburban");
  const [transportation, setTransportation] = useState<"walking" | "bus" | "car" | "public">("bus");
  
  // Timing
  const [snowStart, setSnowStart] = useState("04:00");
  const [snowEnd, setSnowEnd] = useState("13:00");

  // Advanced Settings
  const [snowDensity, setSnowDensity] = useState<"wet" | "dry" | "mixed">("mixed");
  const [visibility, setVisibility] = useState<"excellent" | "moderate" | "poor" | "dangerous">("moderate");
  const [freezingRain, setFreezingRain] = useState<"none" | "light" | "heavy">("light");
  const [blackIceRisk, setBlackIceRisk] = useState<"low" | "medium" | "high">("medium");
  const [roadSalt, setRoadSalt] = useState<boolean>(true);
  const [districtSensitivity, setDistrictSensitivity] = useState<"low" | "medium" | "high">("medium");

  // Active Tab for inputs panel
  const [activeTab, setActiveTab] = useState<"weather" | "school" | "advanced">("weather");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset helper
  const handleReset = () => {
    setSnowfall(6);
    setSnowfallUnit("in");
    setTemperature(28);
    setTempUnit("F");
    setWindSpeed(15);
    setWindUnit("mph");
    setRoadCondition("poor");
    setIceProbability("medium");
    setPrevAccumulation(2);
    setPrevAccumulationUnit("in");
    setSchoolType("elementary");
    setAreaType("suburban");
    setTransportation("bus");
    setSnowStart("04:00");
    setSnowEnd("13:00");
    setSnowDensity("mixed");
    setVisibility("moderate");
    setFreezingRain("light");
    setBlackIceRisk("medium");
    setRoadSalt(true);
    setDistrictSensitivity("medium");
  };

  // Convert inputs to imperial for internal math
  const internalInches = useMemo(() => {
    return snowfallUnit === "cm" ? cmToInches(snowfall) : snowfall;
  }, [snowfall, snowfallUnit]);

  const internalPrevInches = useMemo(() => {
    return prevAccumulationUnit === "cm" ? cmToInches(prevAccumulation) : prevAccumulation;
  }, [prevAccumulation, prevAccumulationUnit]);

  const internalTempF = useMemo(() => {
    return tempUnit === "C" ? cToF(temperature) : temperature;
  }, [temperature, tempUnit]);

  const internalWindMph = useMemo(() => {
    return windUnit === "kmh" ? kmhToMph(windSpeed) : windSpeed;
  }, [windSpeed, windUnit]);

  // Dynamic wind chill calculation
  const windChillF = useMemo(() => {
    if (internalTempF > 50 || internalWindMph < 3) return internalTempF;
    return Math.round(
      35.74 + 
      0.6215 * internalTempF - 
      35.75 * Math.pow(internalWindMph, 0.16) + 
      0.4275 * internalTempF * Math.pow(internalWindMph, 0.16)
    );
  }, [internalTempF, internalWindMph]);

  const displayWindChill = useMemo(() => {
    return tempUnit === "C" ? Math.round(fToC(windChillF)) : windChillF;
  }, [windChillF, tempUnit]);

  // Main Calculation Logic
  const results = useMemo(() => {
    let score = 0;
    const details = {
      snowContribution: 0,
      tempWindContribution: 0,
      roadContribution: 0,
      iceHazardsContribution: 0,
      schoolDistrictContribution: 0,
    };

    // 1. SNOW ACCUMULATION (Baseline Score)
    // Combined Snow = Forecasted + 50% of Previous (previous means roads already bad or piles blocking visibility)
    const combinedSnow = internalInches + (internalPrevInches * 0.5);
    let snowBase = 0;
    
    // Sensitivity adjusts how much snow is needed
    // High sensitivity (Southern/Coastal areas): 2 inches = 100% baseline
    // Medium sensitivity (Standard Midwest/Northeast): 5-6 inches = 100% baseline
    // Low sensitivity (Northern/Mountain/Canada): 10-12 inches = 100% baseline
    if (districtSensitivity === "high") {
      snowBase = Math.min(100, combinedSnow * 45);
    } else if (districtSensitivity === "low") {
      snowBase = Math.min(100, combinedSnow * 9);
    } else {
      snowBase = Math.min(100, combinedSnow * 18);
    }
    score += snowBase;
    details.snowContribution = Math.round(snowBase);

    // 2. TEMPERATURE & WIND CHILL MODIFIERS
    let tempMod = 0;
    if (internalTempF > 36) {
      tempMod -= 35; // rapid melting, rain mix
    } else if (internalTempF > 32) {
      tempMod -= 15; // wet slush, melting soon
    } else if (internalTempF >= 18) {
      tempMod += 10; // optimal freezing temperature, snow sticks
    } else if (internalTempF < 10 || windChillF < -15) {
      tempMod += 25; // extreme cold, diesel fuel gels (bus failure), frostbite danger
    }
    score += tempMod;
    details.tempWindContribution = Math.round(Math.max(-25, Math.min(30, tempMod)));

    // 3. ROAD CONDITIONS & SALT MODIFIERS
    let roadMod = 0;
    switch (roadCondition) {
      case "excellent": roadMod -= 15; break;
      case "good": roadMod -= 5; break;
      case "fair": roadMod += 5; break;
      case "poor": roadMod += 20; break;
      case "dangerous": roadMod += 35; break;
    }
    if (roadSalt) {
      roadMod -= 12; // salting reduces probability as ice melts
    }
    score += roadMod;
    details.roadContribution = Math.round(roadMod);

    // 4. ICE, FREEZING RAIN & BLACK ICE MODIFIERS
    let iceMod = 0;
    if (freezingRain === "heavy") {
      iceMod += 45; // extreme danger
    } else if (freezingRain === "light") {
      iceMod += 20;
    }

    if (blackIceRisk === "high") {
      iceMod += 20;
    } else if (blackIceRisk === "medium") {
      iceMod += 8;
    }

    if (iceProbability === "high") {
      iceMod += 15;
    } else if (iceProbability === "medium") {
      iceMod += 5;
    }

    // Density
    if (snowDensity === "wet") {
      iceMod += 10; // heavy wet snow downs branches and wires
    }
    score += iceMod;
    details.iceHazardsContribution = Math.round(iceMod);

    // 5. SCHOOL TYPE, AREA TYPE, TRANSPORTATION
    let schoolDistrictMod = 0;
    // Area Type
    if (areaType === "rural") {
      schoolDistrictMod += 15; // rural dirt roads are cleared last, long bus runs
    } else if (areaType === "urban") {
      schoolDistrictMod -= 10; // cleared very fast, walking distance or public transit
    }

    // School level
    if (schoolType === "elementary") {
      schoolDistrictMod += 8; // small children waiting outside is a liability
    } else if (schoolType === "university") {
      schoolDistrictMod -= 25; // campuses have dorms, rarely close
    }

    // Transportation
    if (transportation === "bus" || transportation === "walking") {
      schoolDistrictMod += 8;
    } else if (transportation === "public") {
      schoolDistrictMod -= 12;
    }

    // Visibility
    if (visibility === "dangerous") {
      schoolDistrictMod += 20;
    } else if (visibility === "poor") {
      schoolDistrictMod += 10;
    }

    // Timing (Starts right before/during school commute hours: 5am - 9am)
    const [startH] = snowStart.split(":").map(Number);
    const [endH] = snowEnd.split(":").map(Number);
    if (startH >= 4 && startH <= 8) {
      schoolDistrictMod += 15; // hits right when buses head out
    } else if (endH <= 4) {
      schoolDistrictMod -= 15; // snow ends overnight, plows have time
    }

    score += schoolDistrictMod;
    details.schoolDistrictContribution = Math.round(schoolDistrictMod);

    // Clamp score 0 to 100
    const probability = Math.max(0, Math.min(100, Math.round(score)));

    // Risk level classification
    let riskLevel: "Very Low" | "Low" | "Moderate" | "High" | "Very High" | "Extreme" = "Very Low";
    let riskColor = "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
    let riskProgress = "bg-emerald-500";
    if (probability >= 90) {
      riskLevel = "Extreme";
      riskColor = "text-purple-500 border-purple-500/20 bg-purple-500/10";
      riskProgress = "bg-purple-500";
    } else if (probability >= 70) {
      riskLevel = "Very High";
      riskColor = "text-rose-500 border-rose-500/20 bg-rose-500/10 animate-[pulse_2s_infinite]";
      riskProgress = "bg-rose-500";
    } else if (probability >= 45) {
      riskLevel = "High";
      riskColor = "text-orange-500 border-orange-500/20 bg-orange-500/10";
      riskProgress = "bg-orange-500";
    } else if (probability >= 25) {
      riskLevel = "Moderate";
      riskColor = "text-amber-500 border-amber-500/20 bg-amber-500/10";
      riskProgress = "bg-amber-500";
    } else if (probability >= 10) {
      riskLevel = "Low";
      riskColor = "text-blue-500 border-blue-500/20 bg-blue-500/10";
      riskProgress = "bg-blue-500";
    }

    // Dynamic Recommendation
    let recommendation = "";
    if (probability >= 85) {
      recommendation = "Cancelation is almost certain. Expect school districts to announce closure tonight or early tomorrow morning. Prepare alternative child care.";
    } else if (probability >= 65) {
      recommendation = "High probability of closure. Keep devices charged, check local news alerts frequently, and prepare for a potential remote learning or snow day.";
    } else if (probability >= 40) {
      recommendation = "A delayed opening is highly likely, with a moderate chance of a full snow day closure. Decisions will depend on local plow effectiveness.";
    } else if (probability >= 20) {
      recommendation = "Low probability of a full closure. Roads might be slick early, so budget extra travel time, but expect classes to run as scheduled.";
    } else {
      recommendation = "School is almost guaranteed to stay open. Standard winter dress is recommended. Commutes will be normal.";
    }

    // Travel Risk summary
    let travelRisk = "";
    if (roadCondition === "dangerous" || freezingRain === "heavy" || blackIceRisk === "high") {
      travelRisk = "Dangerous road travel. Severe gridlock, high accident probability, and restricted bus transportation.";
    } else if (roadCondition === "poor" || visibility === "poor" || freezingRain === "light") {
      travelRisk = "Hazardous conditions. Expect slippery spots, reduced speed limits, and bus transit delays.";
    } else {
      travelRisk = "Standard winter driving rules apply. Clear visibility and mostly salted, wet, or slushy roads.";
    }

    // Likelihood summary
    let likelihood = "";
    if (schoolType === "university") {
      likelihood = "Universities generally stay open as students live on campus. Closure likelihood is lower than public K-12 schools.";
    } else if (areaType === "rural") {
      likelihood = "Rural school districts close much faster than urban schools because secondary country roads are plowed last.";
    } else {
      likelihood = "Standard suburban district response. Buses and major arterials are prioritized, keeping the threshold average.";
    }

    // Weather Summary
    const snowText = `${snowfall} ${snowfallUnit}`;
    const tempText = `${temperature}°${tempUnit}`;
    const windText = `${windSpeed} ${windUnit}`;
    let weatherSummary = `Forecast details call for ${snowText} of snow at ${tempText} with wind gusts of ${windText}. `;
    if (freezingRain !== "none") weatherSummary += `Additionally, freezing rain will generate icy glazing. `;
    if (roadSalt) weatherSummary += `Salt trucks are currently active.`;

    return {
      probability,
      riskLevel,
      riskColor,
      riskProgress,
      recommendation,
      travelRisk,
      likelihood,
      weatherSummary,
      details,
      combinedSnow
    };
  }, [
    internalInches,
    internalPrevInches,
    internalTempF,
    internalWindMph,
    windChillF,
    roadCondition,
    roadSalt,
    freezingRain,
    blackIceRisk,
    iceProbability,
    snowDensity,
    areaType,
    schoolType,
    transportation,
    visibility,
    snowStart,
    snowEnd,
    districtSensitivity,
    snowfall,
    snowfallUnit,
    temperature,
    tempUnit,
    windSpeed,
    windUnit
  ]);

  // Chart data: Snowfall vs typical threshold
  const thresholdVal = useMemo(() => {
    if (districtSensitivity === "high") return 2; // Southern closure threshold
    if (districtSensitivity === "low") return 10; // Northern closure threshold
    return 5; // Standard threshold
  }, [districtSensitivity]);

  const snowfallChartData = [
    { name: "Forecast", amount: Number(internalInches.toFixed(1)) },
    { name: "Previous", amount: Number(internalPrevInches.toFixed(1)) },
    { name: "District Closure Threshold", amount: thresholdVal }
  ];

  // Chart data: Risk breakdown factor weights
  const riskBreakdownData = [
    { name: "Snowfall", weight: Math.max(0, results.details.snowContribution) },
    { name: "Temp/Wind", weight: Math.max(0, results.details.tempWindContribution) },
    { name: "Road Conditions", weight: Math.max(0, results.details.roadContribution) },
    { name: "Ice Hazards", weight: Math.max(0, results.details.iceHazardsContribution) },
    { name: "District & timing", weight: Math.max(0, results.details.schoolDistrictContribution) }
  ];

  // CSS Snowfall particles rate based on forecast
  const snowParticles = useMemo(() => {
    const rate = Math.min(80, Math.max(10, Math.round(internalInches * 7)));
    return Array.from({ length: rate }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${4 + Math.random() * 6}s`,
      size: `${2 + Math.random() * 5}px`,
      opacity: 0.2 + Math.random() * 0.6
    }));
  }, [internalInches]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden font-sans text-slate-100 max-w-6xl mx-auto snow-day-calculator-dark-theme">
      
      <style dangerouslySetInnerHTML={{__html: `
        .snow-day-calculator-dark-theme input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),
        .snow-day-calculator-dark-theme select,
        .snow-day-calculator-dark-theme textarea {
          color: #f1f5f9 !important;
          background-color: #0f172a !important;
          border-color: #1e293b !important;
        }
        
        .snow-day-calculator-dark-theme input[type="time"]::-webkit-datetime-edit-fields-wrapper,
        .snow-day-calculator-dark-theme input[type="time"]::-webkit-datetime-edit-text,
        .snow-day-calculator-dark-theme input[type="time"]::-webkit-datetime-edit-hour-field,
        .snow-day-calculator-dark-theme input[type="time"]::-webkit-datetime-edit-minute-field,
        .snow-day-calculator-dark-theme input[type="time"]::-webkit-datetime-edit-ampm-field {
          color: #f1f5f9 !important;
        }
      `}} />
      
      {/* Dynamic Animated CSS Snowfall Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-3xl">
        {snowParticles.map((flake) => (
          <div
            key={flake.id}
            className="absolute bg-white rounded-full animate-fall"
            style={{
              left: flake.left,
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              width: flake.size,
              height: flake.size,
              opacity: flake.opacity,
              top: "-10px"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ==========================================
            LEFT PANEL: INPUT FORMS & TABS
           ========================================== */}
        <div className="w-full lg:w-7/12 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CloudSnow className="text-blue-400 animate-pulse" size={24} />
                Weather Variables & Settings
              </h2>
              <p className="text-xs text-slate-400">Configure regional & atmospheric forecasting factors</p>
            </div>
            <button 
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              title="Reset to default values"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-800/50 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("weather")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "weather"
                  ? "bg-[#518231] text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              1. Weather & Ice
            </button>
            <button
              onClick={() => setActiveTab("school")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "school"
                  ? "bg-[#518231] text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              2. District & Transport
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "advanced"
                  ? "bg-[#518231] text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              3. Advanced Settings
            </button>
          </div>

          {/* TAB CONTENT: WEATHER & ICE */}
          {activeTab === "weather" && (
            <div className="space-y-6">
              {/* Snowfall Forecast */}
              <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CloudSnow size={16} className="text-blue-400" />
                    Snowfall Forecast
                  </label>
                  <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    <button
                      onClick={() => {
                        if (snowfallUnit === "cm") {
                          setSnowfallUnit("in");
                          setSnowfall(Math.round(cmToInches(snowfall)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${snowfallUnit === "in" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      Inches
                    </button>
                    <button
                      onClick={() => {
                        if (snowfallUnit === "in") {
                          setSnowfallUnit("cm");
                          setSnowfall(Math.round(inchesToCm(snowfall)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${snowfallUnit === "cm" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      cm
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={snowfallUnit === "in" ? 30 : 75}
                  step="1"
                  value={snowfall}
                  onChange={(e) => setSnowfall(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>0 {snowfallUnit}</span>
                  <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-sm">
                    {snowfall} {snowfallUnit}
                  </span>
                  <span>{snowfallUnit === "in" ? 30 : 75} {snowfallUnit}</span>
                </div>
              </div>

              {/* Temperature */}
              <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Thermometer size={16} className="text-rose-400" />
                    Temperature
                  </label>
                  <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    <button
                      onClick={() => {
                        if (tempUnit === "C") {
                          setTempUnit("F");
                          setTemperature(Math.round(cToF(temperature)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${tempUnit === "F" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      °F
                    </button>
                    <button
                      onClick={() => {
                        if (tempUnit === "F") {
                          setTempUnit("C");
                          setTemperature(Math.round(fToC(temperature)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${tempUnit === "C" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      °C
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min={tempUnit === "F" ? -20 : -30}
                  max={tempUnit === "F" ? 50 : 10}
                  step="1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>{tempUnit === "F" ? "-20°F" : "-30°C"}</span>
                  <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-sm">
                    {temperature}°{tempUnit} (Wind Chill: {displayWindChill}°{tempUnit})
                  </span>
                  <span>{tempUnit === "F" ? "50°F" : "10°C"}</span>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Wind size={16} className="text-slate-400" />
                    Wind Speed
                  </label>
                  <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    <button
                      onClick={() => {
                        if (windUnit === "kmh") {
                          setWindUnit("mph");
                          setWindSpeed(Math.round(kmhToMph(windSpeed)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${windUnit === "mph" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      mph
                    </button>
                    <button
                      onClick={() => {
                        if (windUnit === "mph") {
                          setWindUnit("kmh");
                          setWindSpeed(Math.round(mphToKmh(windSpeed)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${windUnit === "kmh" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      km/h
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={windUnit === "mph" ? 50 : 80}
                  step="1"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>0 {windUnit}</span>
                  <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-sm">
                    {windSpeed} {windUnit}
                  </span>
                  <span>{windUnit === "mph" ? 50 : 80} {windUnit}</span>
                </div>
              </div>

              {/* Road Condition & Ice Probability in 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Road Conditions</label>
                  <select
                    value={roadCondition}
                    onChange={(e: any) => setRoadCondition(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="excellent">Excellent (Dry & Salted)</option>
                    <option className="bg-slate-900 text-slate-100" value="good">Good (Wet & Bare)</option>
                    <option className="bg-slate-900 text-slate-100" value="fair">Fair (Slushy patches)</option>
                    <option className="bg-slate-900 text-slate-100" value="poor">Poor (Snow-covered/slick)</option>
                    <option className="bg-slate-900 text-slate-100" value="dangerous">Dangerous (Deep snow/ice)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">General Icing Risk</label>
                  <select
                    value={iceProbability}
                    onChange={(e: any) => setIceProbability(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="low">Low Probability</option>
                    <option className="bg-slate-900 text-slate-100" value="medium">Medium Probability</option>
                    <option className="bg-slate-900 text-slate-100" value="high">High Probability</option>
                  </select>
                </div>
              </div>

              {/* Previous Snow Accumulation */}
              <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CloudSnow size={16} className="text-[#6fa844]" />
                    Previous Snow Accumulation (On Ground)
                  </label>
                  <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    <button
                      onClick={() => {
                        if (prevAccumulationUnit === "cm") {
                          setPrevAccumulationUnit("in");
                          setPrevAccumulation(Math.round(cmToInches(prevAccumulation)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${prevAccumulationUnit === "in" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      Inches
                    </button>
                    <button
                      onClick={() => {
                        if (prevAccumulationUnit === "in") {
                          setPrevAccumulationUnit("cm");
                          setPrevAccumulation(Math.round(inchesToCm(prevAccumulation)));
                        }
                      }}
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${prevAccumulationUnit === "cm" ? "bg-[#518231] text-white" : "text-slate-400"}`}
                    >
                      cm
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={prevAccumulationUnit === "in" ? 20 : 50}
                  step="1"
                  value={prevAccumulation}
                  onChange={(e) => setPrevAccumulation(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>0 {prevAccumulationUnit}</span>
                  <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-sm">
                    {prevAccumulation} {prevAccumulationUnit}
                  </span>
                  <span>{prevAccumulationUnit === "in" ? 20 : 50} {prevAccumulationUnit}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SCHOOL & DISTRICT */}
          {activeTab === "school" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-1">
                    <School size={16} className="text-slate-400" />
                    School Type
                  </label>
                  <select
                    value={schoolType}
                    onChange={(e: any) => setSchoolType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="elementary">Elementary School</option>
                    <option className="bg-slate-900 text-slate-100" value="middle">Middle School</option>
                    <option className="bg-slate-900 text-slate-100" value="high">High School</option>
                    <option className="bg-slate-900 text-slate-100" value="university">University / College</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Elementary schools close more easily due to toddler walking safety</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-1">
                    <MapPin size={16} className="text-slate-400" />
                    Area / Terrain Type
                  </label>
                  <select
                    value={areaType}
                    onChange={(e: any) => setAreaType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="urban">Urban (City Center)</option>
                    <option className="bg-slate-900 text-slate-100" value="suburban">Suburban</option>
                    <option className="bg-slate-900 text-slate-100" value="rural">Rural (Country roads)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Rural areas have unpaved/secondary roads cleared last</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-1">
                    <Car size={16} className="text-slate-400" />
                    Primary Transportation
                  </label>
                  <select
                    value={transportation}
                    onChange={(e: any) => setTransportation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="walking">Walking / Pedestrian</option>
                    <option className="bg-slate-900 text-slate-100" value="bus">School Bus Routes</option>
                    <option className="bg-slate-900 text-slate-100" value="car">Personal Vehicles</option>
                    <option className="bg-slate-900 text-slate-100" value="public">Public Transport (Subway/City Bus)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-1">
                    <TrendingUp size={16} className="text-slate-400" />
                    District Sensitivity
                  </label>
                  <select
                    value={districtSensitivity}
                    onChange={(e: any) => setDistrictSensitivity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="low">Low Sensitivity (Canada, Northern US)</option>
                    <option className="bg-slate-900 text-slate-100" value="medium">Medium Sensitivity (Mid-Atlantic, Midwest)</option>
                    <option className="bg-slate-900 text-slate-100" value="high">High Sensitivity (Southern US, UK)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Areas with fewer snowplows close for minor accumulations</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: ADVANCED SETTINGS */}
          {activeTab === "advanced" && (
            <div className="space-y-6">
              {/* Timing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-1">
                    <Clock size={16} className="text-slate-400" />
                    Snow Start Time
                  </label>
                  <input
                    type="time" style={{ colorScheme: "dark" }} value={snowStart}
                    onChange={(e) => setSnowStart(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center gap-1">
                    <Clock size={16} className="text-slate-400" />
                    Snow End Time
                  </label>
                  <input
                    type="time" style={{ colorScheme: "dark" }} value={snowEnd}
                    onChange={(e) => setSnowEnd(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 -mt-2">Snow starting between 5:00 AM - 9:00 AM heavily disrupts bus loading.</p>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Snow Density</label>
                  <select
                    value={snowDensity}
                    onChange={(e: any) => setSnowDensity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="dry">Dry Snow (Fluffy, drifts easily)</option>
                    <option className="bg-slate-900 text-slate-100" value="wet">Wet Snow (Heavy, downs power lines)</option>
                    <option className="bg-slate-900 text-slate-100" value="mixed">Mixed Snow (Sleet/Slush)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Visibility</label>
                  <select
                    value={visibility}
                    onChange={(e: any) => setVisibility(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="excellent">Excellent (Clear Sight)</option>
                    <option className="bg-slate-900 text-slate-100" value="moderate">Moderate (Some drifting)</option>
                    <option className="bg-slate-900 text-slate-100" value="poor">Poor (Blizzard conditions)</option>
                    <option className="bg-slate-900 text-slate-100" value="dangerous">Dangerous (Whiteout)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Freezing Rain / Sleet</label>
                  <select
                    value={freezingRain}
                    onChange={(e: any) => setFreezingRain(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="none">None (Pure snow)</option>
                    <option className="bg-slate-900 text-slate-100" value="light">Light (Glaze / Ice mix)</option>
                    <option className="bg-slate-900 text-slate-100" value="heavy">Heavy (Ice storm potential)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Black Ice Risk</label>
                  <select
                    value={blackIceRisk}
                    onChange={(e: any) => setBlackIceRisk(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#518231] text-slate-200 transition-colors"
                  >
                    <option className="bg-slate-900 text-slate-100" value="low">Low Risk</option>
                    <option className="bg-slate-900 text-slate-100" value="medium">Medium Risk</option>
                    <option className="bg-slate-900 text-slate-100" value="high">High Risk (Sudden freeze)</option>
                  </select>
                </div>
              </div>

              {/* Road Salt Applied */}
              <div className="flex items-center justify-between bg-slate-900/50 p-4 border border-slate-800 rounded-xl">
                <div>
                  <label className="block text-sm font-bold text-white">Road Salt & Plows Active</label>
                  <p className="text-xs text-slate-400 mt-0.5">Are local transportation crews actively salting and plowing?</p>
                </div>
                <button
                  onClick={() => setRoadSalt(!roadSalt)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    roadSalt ? "bg-[#518231]" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      roadSalt ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* E-E-A-T API Note */}
          <div className="mt-6 flex items-start gap-2 bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
            <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400 leading-normal">
              <strong>Offline Mode Active:</strong> Calculations are currently processed in-browser. Future releases will support localized weather API lookup based on GPS or ZIP code, and district profile integration.
            </p>
          </div>
        </div>

        {/* ==========================================
            RIGHT PANEL: DYNAMIC RESULTS CARD
           ========================================== */}
        <div className="w-full lg:w-5/12 space-y-6">
          
          {/* Main gauge score card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl shadow-2xl">
            <div className="absolute top-0 right-0 p-3">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${results.riskColor}`}>
                {results.riskLevel} Risk
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-300 mb-4 uppercase tracking-wider">Closure Estimate</h3>

            {/* Circular Gauge Diagram */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Background Track Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="75"
                    stroke="#1e293b"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Active Gradient track circle */}
                  <circle
                    cx="88"
                    cy="88"
                    r="75"
                    stroke="url(#probabilityGradient)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={471.2}
                    strokeDashoffset={471.2 - (471.2 * results.probability) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="probabilityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score percentage text */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {results.probability}%
                  </span>
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">
                    Probability
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendation block */}
            <div className="border-t border-slate-800/80 pt-4 mt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommendation</h4>
              <p className="text-sm text-white leading-relaxed">
                {results.recommendation}
              </p>
            </div>
          </div>

          {/* Metrics & Breakdown accordion */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-1">
              <AlertTriangle size={16} className="text-yellow-500" />
              Safety & Logistics Breakdown
            </h4>

            <div className="space-y-4">
              <div className="border-l-2 border-[#518231] pl-3 py-1">
                <span className="text-xs font-bold text-[#6fa844] uppercase tracking-wider block">Travel Risk Rating</span>
                <p className="text-xs text-slate-300 mt-1">{results.travelRisk}</p>
              </div>

              <div className="border-l-2 border-indigo-500 pl-3 py-1">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">District Factor</span>
                <p className="text-xs text-slate-300 mt-1">{results.likelihood}</p>
              </div>

              <div className="border-l-2 border-blue-500 pl-3 py-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Weather Summary</span>
                <p className="text-xs text-slate-300 mt-1">{results.weatherSummary}</p>
              </div>
            </div>
          </div>

          {/* ==========================================
              CHARTS PANEL: RECHARTS VISUALIZATIONS
             ========================================== */}
          {isMounted ? (
            <div className="space-y-6">
              {/* Chart 1: Snowfall comparison bar chart */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#6fa844]" />
                  Snowfall Accumulation vs. Typical Closure Threshold
                </h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={snowfallChartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }}
                        labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                        itemStyle={{ color: "#f8fafc" }}
                      />
                      <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                        {snowfallChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 2 ? "#e11d48" : index === 1 ? "#10b981" : "#3b82f6"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  * Threshold represents the typical snowfall accumulation required for a school closure in your selected district sensitivity model.
                </p>
              </div>

              {/* Chart 2: Contributing Factors weights bar chart */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-xl">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#6fa844]" />
                  Contributing Risk Factor Distribution
                </h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={riskBreakdownData}
                      layout="vertical"
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid stroke="#1e293b" horizontal={false} />
                      <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} />
                      <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={80} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px" }}
                        labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                        itemStyle={{ color: "#f8fafc" }}
                      />
                      <Bar dataKey="weight" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                  * Displays relative contribution weight of each factor category (Atmospheric, timing, roads, district types) to the final calculated probability score.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-44 bg-slate-900 border border-slate-850 rounded-2xl animate-pulse" />
          )}

        </div>

      </div>

      {/* Global CSS injected for snowfall animation */}
      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      `}</style>

    </div>
  );
}
