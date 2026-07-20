"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Play, Pause, RotateCcw, AlertTriangle, Info, Download, Printer, Copy, Share2, 
  Target, Globe2, Sparkles, HelpCircle, CheckCircle2, ChevronRight, BarChart3, LineChart as LineChartIcon
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Units & Conversions
type UnitSystem = "metric" | "imperial";

interface UnitConfig {
  speed: string;
  distance: string;
  height: string;
  gravity: string;
}

const UNIT_LABELS: Record<UnitSystem, UnitConfig> = {
  metric: { speed: "m/s", distance: "m", height: "m", gravity: "m/s²" },
  imperial: { speed: "ft/s", distance: "ft", height: "ft", gravity: "ft/s²" }
};

// Conversions to base SI (m, m/s, m/s², kg)
const CONVERSIONS = {
  speed: {
    "m/s": 1,
    "km/h": 1 / 3.6,
    "mph": 0.44704,
    "ft/s": 0.3048
  },
  distance: {
    "m": 1,
    "cm": 0.01,
    "ft": 0.3048,
    "in": 0.0254
  },
  gravity: {
    "m/s²": 1,
    "ft/s²": 0.3048
  }
};

// Conversions from base SI
const REVERSE_CONVERSIONS = {
  speed: {
    "m/s": 1,
    "km/h": 3.6,
    "mph": 2.23694,
    "ft/s": 3.28084
  },
  distance: {
    "m": 1,
    "cm": 100,
    "ft": 3.28084,
    "in": 39.3701
  },
  gravity: {
    "m/s²": 1,
    "ft/s²": 3.28084
  }
};

// Gravity Presets (in m/s²)
const GRAVITY_PRESETS = [
  { name: "Earth (9.81 m/s²)", value: 9.80665, key: "earth" },
  { name: "Moon (1.62 m/s²)", value: 1.62, key: "moon" },
  { name: "Mars (3.71 m/s²)", value: 3.71, key: "mars" },
  { name: "Jupiter (24.79 m/s²)", value: 24.79, key: "jupiter" },
  { name: "Venus (8.87 m/s²)", value: 8.87, key: "venus" },
  { name: "Mercury (3.70 m/s²)", value: 3.7, key: "mercury" },
  { name: "Saturn (10.44 m/s²)", value: 10.44, key: "saturn" }
];

// Projectile Presets
interface ProjectilePreset {
  name: string;
  mass: number; // kg
  area: number; // m²
  cd: number; // drag coefficient
}

const PROJECTILE_PRESETS: Record<string, ProjectilePreset> = {
  baseball: { name: "Baseball", mass: 0.145, area: 0.0043, cd: 0.3 },
  football: { name: "Football", mass: 0.415, area: 0.0227, cd: 0.25 },
  basketball: { name: "Basketball", mass: 0.62, area: 0.0452, cd: 0.5 },
  golfball: { name: "Golf Ball", mass: 0.0459, area: 0.00143, cd: 0.24 },
  bullet: { name: "Bullet (.223)", mass: 0.0036, area: 0.000025, cd: 0.15 },
  arrow: { name: "Arrow", mass: 0.025, area: 0.00005, cd: 0.2 },
  cannonball: { name: "Cannonball", mass: 10.0, area: 0.025, cd: 0.47 },
  soccerball: { name: "Soccer Ball", mass: 0.43, area: 0.038, cd: 0.25 },
  rocket: { name: "Model Rocket", mass: 0.25, area: 0.0012, cd: 0.4 }
};

interface TrajectoryPoint {
  x: number;
  y: number;
  t: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
}

export function ProjectileMotionCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

  // Units choice
  const [speedUnit, setSpeedUnit] = useState("m/s");
  const [distanceUnit, setDistanceUnit] = useState("m");
  const [heightUnit, setHeightUnit] = useState("m");
  const [gravityUnit, setGravityUnit] = useState("m/s²");

  // Core Inputs (Values are stored in user-chosen display units)
  const [launchSpeed, setLaunchSpeed] = useState<number>(20);
  const [launchAngle, setLaunchAngle] = useState<number>(45);
  const [initialHeight, setInitialHeight] = useState<number>(0);
  
  // Gravity Options
  const [gravityPreset, setGravityPreset] = useState("earth");
  const [customGravity, setCustomGravity] = useState<number>(9.80665);

  // Air Resistance Options
  const [airResistanceEnabled, setAirResistanceEnabled] = useState(false);
  const [projectileType, setProjectileType] = useState("baseball");
  const [customMass, setCustomMass] = useState<number>(0.145);
  const [customArea, setCustomArea] = useState<number>(0.0043);
  const [customCd, setCustomCd] = useState<number>(0.3);

  // Extra modes
  const [activeTab, setActiveTab] = useState<"visuals" | "explanation" | "planets" | "sensitivity" | "practice">("visuals");
  const [targetModeEnabled, setTargetModeEnabled] = useState(false);
  const [targetDistance, setTargetDistance] = useState<number>(35);
  const [targetHeight, setTargetHeight] = useState<number>(0);

  // Animation Playback States
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0); // 0.25, 0.5, 1, 2
  const [currentTime, setCurrentTime] = useState<number>(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Graph state: Hover/Pointer coordinates
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState<{
    q: string;
    correctAnswer: number;
    units: string;
    type: "range" | "height" | "time";
    args: any;
  } | null>(null);
  const [quizUserAnswer, setQuizUserAnswer] = useState<string>("");
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // Copy state
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Sync unit labels when unit system toggles
  useEffect(() => {
    if (unitSystem === "metric") {
      setSpeedUnit("m/s");
      setDistanceUnit("m");
      setHeightUnit("m");
      setGravityUnit("m/s²");
    } else {
      setSpeedUnit("ft/s");
      setDistanceUnit("ft");
      setHeightUnit("ft");
      setGravityUnit("ft/s²");
    }
  }, [unitSystem]);

  useEffect(() => {
    setIsClient(true);
    generateQuiz();
    // Parse URL parameters
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("v")) setLaunchSpeed(Number(params.get("v")));
      if (params.get("a")) setLaunchAngle(Number(params.get("a")));
      if (params.get("h")) setInitialHeight(Number(params.get("h")));
      if (params.get("drag")) setAirResistanceEnabled(params.get("drag") === "true");
      if (params.get("system")) setUnitSystem(params.get("system") === "imperial" ? "imperial" : "metric");
    }
  }, []);

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Convert inputs to SI internally
  const siInputs = useMemo(() => {
    const v0 = launchSpeed * (CONVERSIONS.speed[speedUnit as keyof typeof CONVERSIONS.speed] || 1);
    const h0 = initialHeight * (CONVERSIONS.distance[heightUnit as keyof typeof CONVERSIONS.distance] || 1);
    const thetaRad = (launchAngle * Math.PI) / 180;
    
    let gSI = customGravity;
    if (gravityPreset !== "custom") {
      const found = GRAVITY_PRESETS.find(p => p.key === gravityPreset);
      if (found) gSI = found.value;
    } else {
      // Custom gravity from display unit
      gSI = customGravity * (CONVERSIONS.gravity[gravityUnit as keyof typeof CONVERSIONS.gravity] || 1);
    }

    // Drag Parameters
    let mass = customMass;
    let area = customArea;
    let cd = customCd;
    if (projectileType !== "custom") {
      const found = PROJECTILE_PRESETS[projectileType];
      if (found) {
        mass = found.mass;
        area = found.area;
        cd = found.cd;
      }
    }

    return { v0, h0, thetaRad, g: gSI, drag: airResistanceEnabled, mass, area, cd };
  }, [
    launchSpeed, speedUnit, initialHeight, heightUnit, launchAngle,
    gravityPreset, customGravity, gravityUnit, airResistanceEnabled,
    projectileType, customMass, customArea, customCd
  ]);

  // Target coordinates in SI
  const siTarget = useMemo(() => {
    const targetX = targetDistance * (CONVERSIONS.distance[distanceUnit as keyof typeof CONVERSIONS.distance] || 1);
    const targetY = targetHeight * (CONVERSIONS.distance[distanceUnit as keyof typeof CONVERSIONS.distance] || 1);
    return { x: targetX, y: targetY };
  }, [targetDistance, targetHeight, distanceUnit]);

  // Helper numerical simulation: RK4 Integrator
  // Simulates full trajectory and outputs points
  const computeTrajectory = (v0: number, h0: number, thetaRad: number, g: number, drag: boolean, mass: number, area: number, cd: number): TrajectoryPoint[] => {
    const points: TrajectoryPoint[] = [];
    const dt = 0.005; // High resolution timestep

    let t = 0;
    let x = 0;
    let y = h0;
    let vx = v0 * Math.cos(thetaRad);
    let vy = v0 * Math.sin(thetaRad);

    const rho = 1.225; // standard air density kg/m³

    points.push({ x, y, t, vx, vy, ax: 0, ay: -g });

    while (y >= 0 && t < 100) { // Limit flight time to prevent loop hanging
      let ax = 0;
      let ay = -g;

      if (drag) {
        const v = Math.sqrt(vx * vx + vy * vy);
        const dragForce = 0.5 * rho * cd * area * v * v;
        const dragAcc = dragForce / mass;
        if (v > 0) {
          ax = -dragAcc * (vx / v);
          ay = -g - dragAcc * (vy / v);
        }
      }

      // RK4 update equations
      // k1
      const dx1 = vx * dt;
      const dy1 = vy * dt;
      const dvx1 = ax * dt;
      const dvy1 = ay * dt;

      // k2
      const vx2 = vx + dvx1 * 0.5;
      const vy2 = vy + dvy1 * 0.5;
      let ax2 = 0;
      let ay2 = -g;
      if (drag) {
        const v2 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
        const dragAcc2 = (0.5 * rho * cd * area * v2 * v2) / mass;
        if (v2 > 0) {
          ax2 = -dragAcc2 * (vx2 / v2);
          ay2 = -g - dragAcc2 * (vy2 / v2);
        }
      }
      const dx2 = vx2 * dt;
      const dy2 = vy2 * dt;
      const dvx2 = ax2 * dt;
      const dvy2 = ay2 * dt;

      // k3
      const vx3 = vx + dvx2 * 0.5;
      const vy3 = vy + dvy2 * 0.5;
      let ax3 = 0;
      let ay3 = -g;
      if (drag) {
        const v3 = Math.sqrt(vx3 * vx3 + vy3 * vy3);
        const dragAcc3 = (0.5 * rho * cd * area * v3 * v3) / mass;
        if (v3 > 0) {
          ax3 = -dragAcc3 * (vx3 / v3);
          ay3 = -g - dragAcc3 * (vy3 / v3);
        }
      }
      const dx3 = vx3 * dt;
      const dy3 = vy3 * dt;
      const dvx3 = ax3 * dt;
      const dvy3 = ay3 * dt;

      // k4
      const vx4 = vx + dvx3;
      const vy4 = vy + dvy3;
      let ax4 = 0;
      let ay4 = -g;
      if (drag) {
        const v4 = Math.sqrt(vx4 * vx4 + vy4 * vy4);
        const dragAcc4 = (0.5 * rho * cd * area * v4 * v4) / mass;
        if (v4 > 0) {
          ax4 = -dragAcc4 * (vx4 / v4);
          ay4 = -g - dragAcc4 * (vy4 / v4);
        }
      }
      const dx4 = vx4 * dt;
      const dy4 = vy4 * dt;
      const dvx4 = ax4 * dt;
      const dvy4 = ay4 * dt;

      // Final step updates
      x += (dx1 + 2 * dx2 + 2 * dx3 + dx4) / 6;
      y += (dy1 + 2 * dy2 + 2 * dy3 + dy4) / 6;
      vx += (dvx1 + 2 * dvx2 + 2 * dvx3 + dvx4) / 6;
      vy += (dvy1 + 2 * dvy2 + 2 * dvy3 + dvy4) / 6;
      t += dt;

      points.push({ x, y, t, vx, vy, ax, ay });
    }

    // Clamp final point to ground level (y=0) via interpolation
    if (points.length > 1 && points[points.length - 1].y < 0) {
      const p1 = points[points.length - 2];
      const p2 = points[points.length - 1];
      const fraction = -p1.y / (p2.y - p1.y);
      const finalX = p1.x + fraction * (p2.x - p1.x);
      const finalT = p1.t + fraction * (p2.t - p1.t);
      const finalVx = p1.vx + fraction * (p2.vx - p1.vx);
      const finalVy = p1.vy + fraction * (p2.vy - p1.vy);

      points[points.length - 1] = {
        x: finalX,
        y: 0,
        t: finalT,
        vx: finalVx,
        vy: finalVy,
        ax: p1.ax,
        ay: p1.ay
      };
    }

    return points;
  };

  // Trajectory Calculations
  const trajectory = useMemo(() => {
    return computeTrajectory(
      siInputs.v0,
      siInputs.h0,
      siInputs.thetaRad,
      siInputs.g,
      siInputs.drag,
      siInputs.mass,
      siInputs.area,
      siInputs.cd
    );
  }, [siInputs]);

  // Calculations & Results
  const results = useMemo(() => {
    const points = trajectory;
    const finalPt = points[points.length - 1];
    
    // Find Peak Height
    let maxH = siInputs.h0;
    let tPeak = 0;
    points.forEach(pt => {
      if (pt.y > maxH) {
        maxH = pt.y;
        tPeak = pt.t;
      }
    });

    const flightTime = finalPt.t;
    const range = finalPt.x;
    const impactSpeed = Math.sqrt(finalPt.vx * finalPt.vx + finalPt.vy * finalPt.vy);
    const impactAngle = Math.atan2(Math.abs(finalPt.vy), finalPt.vx) * (180 / Math.PI);

    // Launch energies
    const launchKe = 0.5 * siInputs.mass * siInputs.v0 * siInputs.v0;
    const launchPe = siInputs.mass * siInputs.g * siInputs.h0;
    const totalLaunchEnergy = launchKe + launchPe;

    // Landing energies
    const landingKe = 0.5 * siInputs.mass * impactSpeed * impactSpeed;
    const landingPe = 0; // ground level

    // Target Hit check: Find closest distance to target coordinates
    let minTargetDist = Infinity;
    points.forEach(pt => {
      const d = Math.sqrt((pt.x - siTarget.x) ** 2 + (pt.y - siTarget.y) ** 2);
      if (d < minTargetDist) {
        minTargetDist = d;
      }
    });

    const isHit = minTargetDist <= 0.6; // 60cm target hitbox tolerance

    return {
      maxHeight: maxH,
      peakTime: tPeak,
      flightTime,
      range,
      impactSpeed,
      impactAngle,
      launchKe,
      launchPe,
      totalLaunchEnergy,
      landingKe,
      landingPe,
      isHit,
      minTargetDist
    };
  }, [trajectory, siInputs, siTarget]);

  // Target angle optimization
  const optimalAngle = useMemo(() => {
    // Analytics standard angle optimization for vacuum
    const v = siInputs.v0;
    const h = siInputs.h0;
    const g = siInputs.g;
    
    let vacuumOptAngle = 45;
    if (h > 0) {
      // optimal launch angle: csc_inv(sqrt(2 + 2gh/v²))
      const factor = 2 + (2 * g * h) / (v * v);
      const angleRad = Math.asin(1 / Math.sqrt(factor));
      vacuumOptAngle = angleRad * (180 / Math.PI);
    }

    // Numerical optimization for air resistance (sweep from 0 to 90 degrees)
    let bestAngle = vacuumOptAngle;
    if (siInputs.drag) {
      let maxRange = -Infinity;
      for (let angle = 1; angle < 90; angle += 0.5) {
        const rad = (angle * Math.PI) / 180;
        const pts = computeTrajectory(v, h, rad, g, true, siInputs.mass, siInputs.area, siInputs.cd);
        const r = pts[pts.length - 1].x;
        if (r > maxRange) {
          maxRange = r;
          bestAngle = angle;
        }
      }
    }

    return {
      angle: bestAngle,
      vMaxAngle: 90 // Peak height is always achieved at straight 90 degrees
    };
  }, [siInputs]);

  // Planet comparison trajectories
  const planetTrajectories = useMemo(() => {
    return GRAVITY_PRESETS.map(planet => {
      const pts = computeTrajectory(
        siInputs.v0,
        siInputs.h0,
        siInputs.thetaRad,
        planet.value,
        siInputs.drag,
        siInputs.mass,
        siInputs.area,
        siInputs.cd
      );
      return {
        name: planet.name.split(" ")[0],
        points: pts,
        range: pts[pts.length - 1].x,
        maxHeight: Math.max(...pts.map(p => p.y))
      };
    });
  }, [siInputs]);

  // Sensitivity Analysis calculations (Range vs launch Angle)
  const sensitivityData = useMemo(() => {
    const data = [];
    for (let angle = 0; angle <= 90; angle += 3) {
      const rad = (angle * Math.PI) / 180;
      const pts = computeTrajectory(
        siInputs.v0,
        siInputs.h0,
        rad,
        siInputs.g,
        siInputs.drag,
        siInputs.mass,
        siInputs.area,
        siInputs.cd
      );
      const rangeSI = pts[pts.length - 1].x;
      const displayRange = rangeSI * (REVERSE_CONVERSIONS.distance[distanceUnit as keyof typeof REVERSE_CONVERSIONS.distance] || 1);
      data.push({
        angle,
        Range: Number(displayRange.toFixed(2))
      });
    }
    return data;
  }, [siInputs, distanceUnit]);

  // Interactive Graph Zoom / Scale Calculations
  // Find dynamic viewBox size based on trajectory range
  const graphLimits = useMemo(() => {
    const maxRange = Math.max(results.range, targetModeEnabled ? siTarget.x : 0, 5);
    const maxHeight = Math.max(results.maxHeight, targetModeEnabled ? siTarget.y : 0, 5);
    
    // pad borders
    return {
      xMax: maxRange * 1.15,
      yMax: maxHeight * 1.25
    };
  }, [results, targetModeEnabled, siTarget]);

  // SVG Coordinates transformations
  const graphWidth = 500;
  const graphHeight = 280;

  const toSvgX = (xSI: number) => {
    return (xSI / graphLimits.xMax) * (graphWidth - 60) + 40;
  };

  const toSvgY = (ySI: number) => {
    return graphHeight - 40 - (ySI / graphLimits.yMax) * (graphHeight - 60);
  };

  // Convert SVG coordinates back to SI
  const toSiX = (svgX: number) => {
    return ((svgX - 40) / (graphWidth - 60)) * graphLimits.xMax;
  };

  const toSiY = (svgY: number) => {
    return ((graphHeight - 40 - svgY) / (graphHeight - 60)) * graphLimits.yMax;
  };

  // Animation Playback Effect
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      const tick = (now: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = now;
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setCurrentTime(prev => {
          const nextVal = prev + delta * playbackSpeed;
          if (nextVal >= results.flightTime) {
            setIsPlaying(false);
            return results.flightTime;
          }
          return nextVal;
        });

        animationRef.current = requestAnimationFrame(tick);
      };
      animationRef.current = requestAnimationFrame(tick);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      lastTimeRef.current = null;
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, playbackSpeed, results.flightTime]);

  const currentPoint = useMemo(() => {
    // Find closest simulated point to currentTime
    const pts = trajectory;
    let closest = pts[0];
    let minDist = Infinity;
    pts.forEach(pt => {
      const diff = Math.abs(pt.t - currentTime);
      if (diff < minDist) {
        minDist = diff;
        closest = pt;
      }
    });
    return closest;
  }, [trajectory, currentTime]);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      // Scale to SVG viewport coordinates (0 to 500, 0 to 280)
      const svgX = (relativeX / rect.width) * graphWidth;
      const svgY = (relativeY / rect.height) * graphHeight;

      if (svgX >= 40 && svgX <= graphWidth - 20 && svgY >= 20 && svgY <= graphHeight - 40) {
        const xSI = toSiX(svgX);
        const ySI = toSiY(svgY);
        setHoverCoords({ x: xSI, y: ySI });
      } else {
        setHoverCoords(null);
      }
    }
  };

  const handlePointerLeave = () => {
    setHoverCoords(null);
  };

  // Unit display helpers
  const speedLabel = UNIT_LABELS[unitSystem].speed;
  const distanceLabel = UNIT_LABELS[unitSystem].distance;
  const heightLabel = UNIT_LABELS[unitSystem].height;
  const gravityLabel = UNIT_LABELS[unitSystem].gravity;

  const displayVal = (valSI: number, type: "speed" | "distance" | "height" | "gravity") => {
    let unit = "";
    let rate = 1;
    if (type === "speed") {
      unit = speedUnit;
      rate = REVERSE_CONVERSIONS.speed[speedUnit as keyof typeof REVERSE_CONVERSIONS.speed] || 1;
    } else if (type === "distance") {
      unit = distanceUnit;
      rate = REVERSE_CONVERSIONS.distance[distanceUnit as keyof typeof REVERSE_CONVERSIONS.distance] || 1;
    } else if (type === "height") {
      unit = heightUnit;
      rate = REVERSE_CONVERSIONS.distance[heightUnit as keyof typeof REVERSE_CONVERSIONS.distance] || 1;
    } else {
      unit = gravityUnit;
      rate = REVERSE_CONVERSIONS.gravity[gravityUnit as keyof typeof REVERSE_CONVERSIONS.gravity] || 1;
    }
    return `${(valSI * rate).toFixed(2)} ${unit}`;
  };

  // Share Scenario URL
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?v=${launchSpeed}&a=${launchAngle}&h=${initialHeight}&drag=${airResistanceEnabled}&system=${unitSystem}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        triggerNotification("success", "Shareable projectile parameters link copied!");
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Copy Results to Clipboard
  const handleCopyResults = () => {
    const text = `Projectile Motion Calculation Summary
----------------------------------------------
Launch Speed: ${launchSpeed} ${speedUnit}
Launch Angle: ${launchAngle}°
Initial Height: ${initialHeight} ${heightUnit}
Gravity: ${gravityPreset === "custom" ? customGravity : gravityPreset} ${gravityUnit}
Air Resistance: ${airResistanceEnabled ? `Enabled (${projectileType})` : "Disabled"}

Results:
Horizontal Range: ${displayVal(results.range, "distance")}
Maximum Height: ${displayVal(results.maxHeight, "height")}
Time of Flight: ${results.flightTime.toFixed(3)} s
Impact Speed: ${displayVal(results.impactSpeed, "speed")}
Impact Angle: ${results.impactAngle.toFixed(1)}°
Energy at Launch: ${results.totalLaunchEnergy.toFixed(2)} J`;

    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation parameters text summary copied!");
    });
  };

  // Print PDF Layout
  const handlePrint = () => {
    window.print();
  };

  // Export SVG Trajectory Graph as PNG
  const handleExportPNG = () => {
    if (svgRef.current) {
      const svgString = new XMLSerializer().serializeToString(svgRef.current);
      const canvas = document.createElement("canvas");
      canvas.width = svgRef.current.clientWidth * 2;
      canvas.height = svgRef.current.clientHeight * 2;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img = new Image();
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
        img.onload = () => {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = "projectile-trajectory-plot.png";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          triggerNotification("success", "PNG Trajectory Graph downloaded!");
        };
      }
    }
  };

  // Physics Quiz generator
  const generateQuiz = () => {
    const questions: { q: string; correctAnswer: number; units: string; type: "range" | "height" | "time"; args: any }[] = [
      {
        q: "Calculate the horizontal range of a ball launched from ground level (h0 = 0) at a speed of 10 m/s and an angle of 45° under standard Earth gravity (9.81 m/s²).",
        correctAnswer: 10.19,
        units: "m",
        type: "range",
        args: { v0: 10, angle: 45, h0: 0, g: 9.81 }
      },
      {
        q: "Find the maximum height reached by a projectile launched from ground level at 20 m/s and a launch angle of 30° on Earth (g = 9.81 m/s²).",
        correctAnswer: 5.10,
        units: "m",
        type: "height",
        args: { v0: 20, angle: 30, h0: 0, g: 9.81 }
      },
      {
        q: "Determine the total time of flight of an arrow launched from an initial height of 5 meters at a speed of 15 m/s at an angle of 0° (perfectly horizontal) on Earth.",
        correctAnswer: 1.01,
        units: "s",
        type: "time",
        args: { v0: 15, angle: 0, h0: 5, g: 9.81 }
      },
      {
        q: "Calculate the horizontal range of a golf ball launched on the Moon (g = 1.62 m/s²) from ground level at a speed of 40 m/s and a launch angle of 45°.",
        correctAnswer: 987.65,
        units: "m",
        type: "range",
        args: { v0: 40, angle: 45, h0: 0, g: 1.62 }
      }
    ];

    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    setQuizQuestion(randomQ);
    setQuizUserAnswer("");
    setQuizChecked(false);
  };

  const handleCheckQuiz = () => {
    if (!quizQuestion) return;
    const userVal = parseFloat(quizUserAnswer);
    const diff = Math.abs(userVal - quizQuestion.correctAnswer);
    const tolerance = quizQuestion.type === "time" ? 0.05 : 0.5; // Allow minor rounding differences
    
    setQuizIsCorrect(diff <= tolerance);
    setQuizChecked(true);
  };

  return (
    <div className="w-full">
      {/* Notifications banner */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all duration-300 animate-slide-in ${
          notification.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200" 
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
        }`}>
          <CheckCircle2 size={18} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="text-[#518231]" />
                  Kinematics Parameters
                </h2>
                <p className="text-sm text-slate-500 mt-1">Configure launch angles, speed, and environmental constants</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setUnitSystem("metric")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    unitSystem === "metric" ? "bg-white dark:bg-slate-700 text-[#518231] shadow-sm" : "text-slate-500"
                  }`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem("imperial")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    unitSystem === "imperial" ? "bg-white dark:bg-slate-700 text-[#518231] shadow-sm" : "text-slate-500"
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>

            {/* Parameter Sliders & Number Fields */}
            <div className="space-y-6">
              
              {/* Launch Speed */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    Launch Velocity (v₀)
                    <InfoTooltip text="Initial velocity of the projectile relative to the launch point." />
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    <input
                      type="number"
                      value={launchSpeed}
                      onChange={(e) => setLaunchSpeed(Number(e.target.value))}
                      className="w-16 bg-transparent text-right font-bold focus:outline-none text-slate-900 dark:text-white"
                    />
                    <span className="text-xs text-slate-400 font-bold">{speedUnit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="150"
                  step="0.5"
                  value={launchSpeed}
                  onChange={(e) => setLaunchSpeed(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Launch Angle */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    Launch Angle (θ)
                    <InfoTooltip text="The angle above horizontal the projectile is launched (0° to 90°)." />
                  </span>
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    <input
                      type="number"
                      value={launchAngle}
                      onChange={(e) => setLaunchAngle(Math.min(90, Math.max(0, Number(e.target.value))))}
                      className="w-12 bg-transparent text-right font-bold focus:outline-none text-slate-900 dark:text-white"
                    />
                    <span className="text-xs text-slate-400 font-bold">°</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="1"
                  value={launchAngle}
                  onChange={(e) => setLaunchAngle(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Initial Height */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    Initial Height (h₀)
                    <InfoTooltip text="Elevation of the launch point relative to the ground floor target." />
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    <input
                      type="number"
                      value={initialHeight}
                      onChange={(e) => setInitialHeight(Number(e.target.value))}
                      className="w-16 bg-transparent text-right font-bold focus:outline-none text-slate-900 dark:text-white"
                    />
                    <span className="text-xs text-slate-400 font-bold">{heightUnit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="1"
                  value={initialHeight}
                  onChange={(e) => setInitialHeight(Number(e.target.value))}
                  className="w-full accent-[#518231] cursor-pointer"
                />
              </div>

              {/* Gravity Constants */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gravity & Environment</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Select Planet</label>
                    <select
                      value={gravityPreset}
                      onChange={(e) => setGravityPreset(e.target.value)}
                      className="block w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#518231]"
                    >
                      {GRAVITY_PRESETS.map(p => (
                        <option key={p.key} value={p.key} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{p.name}</option>
                      ))}
                      <option value="custom" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Custom Gravity</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Gravity Value ({gravityUnit})</label>
                    <input
                      type="number"
                      step="0.01"
                      disabled={gravityPreset !== "custom"}
                      value={gravityPreset === "custom" ? customGravity : GRAVITY_PRESETS.find(p => p.key === gravityPreset)?.value || 9.81}
                      onChange={(e) => setCustomGravity(Math.max(0.1, Number(e.target.value)))}
                      className="block w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white disabled:bg-slate-100/70 dark:disabled:bg-slate-950/60 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:border-slate-200/50 dark:disabled:border-slate-800/80 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#518231]"
                    />
                  </div>
                </div>
              </div>

              {/* Air Resistance Options */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Air Resistance / Fluid Drag</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={airResistanceEnabled}
                      onChange={(e) => setAirResistanceEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:bg-slate-800 peer-checked:bg-[#518231]"></div>
                  </label>
                </div>

                {airResistanceEnabled && (
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 animate-fade-in space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Projectile Type</label>
                        <select
                          value={projectileType}
                          onChange={(e) => setProjectileType(e.target.value)}
                          className="block w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        >
                          {Object.keys(PROJECTILE_PRESETS).map(key => (
                            <option key={key} value={key} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{PROJECTILE_PRESETS[key].name}</option>
                          ))}
                          <option value="custom" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Custom Parameters</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Mass (kg)</label>
                        <input
                          type="number"
                          step="0.001"
                          disabled={projectileType !== "custom"}
                          value={projectileType === "custom" ? customMass : PROJECTILE_PRESETS[projectileType]?.mass || 0.145}
                          onChange={(e) => setCustomMass(Math.max(0.001, Number(e.target.value)))}
                          className="block w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white disabled:bg-slate-100/70 dark:disabled:bg-slate-950/60 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:border-slate-200/50 dark:disabled:border-slate-800/80 disabled:cursor-not-allowed focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Cross Area (m²)</label>
                        <input
                          type="number"
                          step="0.0001"
                          disabled={projectileType !== "custom"}
                          value={projectileType === "custom" ? customArea : PROJECTILE_PRESETS[projectileType]?.area || 0.004}
                          onChange={(e) => setCustomArea(Math.max(0.0001, Number(e.target.value)))}
                          className="block w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white disabled:bg-slate-100/70 dark:disabled:bg-slate-950/60 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:border-slate-200/50 dark:disabled:border-slate-800/80 disabled:cursor-not-allowed focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Drag Coefficient (Cd)</label>
                        <input
                          type="number"
                          step="0.01"
                          disabled={projectileType !== "custom"}
                          value={projectileType === "custom" ? customCd : PROJECTILE_PRESETS[projectileType]?.cd || 0.3}
                          onChange={(e) => setCustomCd(Math.max(0.01, Number(e.target.value)))}
                          className="block w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white disabled:bg-slate-100/70 dark:disabled:bg-slate-950/60 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:border-slate-200/50 dark:disabled:border-slate-800/80 disabled:cursor-not-allowed focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Target Hit Simulator toggles */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Target size={14} className="text-red-500" />
                    Target Hit Simulator
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={targetModeEnabled}
                      onChange={(e) => setTargetModeEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:bg-slate-800 peer-checked:bg-[#518231]"></div>
                  </label>
                </div>

                {targetModeEnabled && (
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Target Distance ({distanceUnit})</label>
                      <input
                        type="number"
                        value={targetDistance}
                        onChange={(e) => setTargetDistance(Math.max(1, Number(e.target.value)))}
                        className="block w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Target Height ({distanceUnit})</label>
                      <input
                        type="number"
                        value={targetHeight}
                        onChange={(e) => setTargetHeight(Math.max(0, Number(e.target.value)))}
                        className="block w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Visualisation Trajectory, Statistics Cards & Tabs */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
          
          {/* Dashboard Trajectory Plot SVG Graph */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            
            {/* Header info */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Globe2 size={13} className="text-[#518231]" />
                Interactive Trajectory Graph
              </span>
              <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-lg text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Live Mode</span>
              </div>
            </div>

            {/* Render Canvas/SVG Trajectory Plot */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-2.5 relative">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                className="w-full h-auto cursor-crosshair select-none"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                {/* Horizontal grid lines */}
                {[0.25, 0.5, 0.75].map((ratio, idx) => (
                  <line
                    key={idx}
                    x1="40"
                    y1={graphHeight - 40 - ratio * (graphHeight - 60)}
                    x2={graphWidth - 20}
                    y2={graphHeight - 40 - ratio * (graphHeight - 60)}
                    stroke="#1e293b"
                    strokeDasharray="2 3"
                  />
                ))}
                
                {/* Ground floor line */}
                <line x1="30" y1={graphHeight - 40} x2={graphWidth - 10} y2={graphHeight - 40} stroke="#334155" strokeWidth="2.5" />

                {/* Trajectory path line */}
                <path
                  d={trajectory.map((p, i) => `${i === 0 ? "M" : "L"} ${toSvgX(p.x)} ${toSvgY(p.y)}`).join(" ")}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Target Circle (Hit Simulator) */}
                {targetModeEnabled && (
                  <g>
                    <circle
                      cx={toSvgX(siTarget.x)}
                      cy={toSvgY(siTarget.y)}
                      r="10"
                      fill="none"
                      stroke={results.isHit ? "#10b981" : "#ef4444"}
                      strokeWidth="2"
                      className="animate-ping"
                      style={{ transformOrigin: `${toSvgX(siTarget.x)}px ${toSvgY(siTarget.y)}px` }}
                    />
                    <circle
                      cx={toSvgX(siTarget.x)}
                      cy={toSvgY(siTarget.y)}
                      r="6"
                      fill={results.isHit ? "#10b981" : "#ef4444"}
                    />
                  </g>
                )}

                {/* Key Plot markers (Launch, Peak, Landing) */}
                {/* Launch Marker */}
                <circle cx={toSvgX(0)} cy={toSvgY(siInputs.h0)} r="4" fill="#3b82f6" />
                
                {/* Peak height marker */}
                <circle cx={toSvgX(trajectory.find(p => p.y === results.maxHeight)?.x || 0)} cy={toSvgY(results.maxHeight)} r="4" fill="#f59e0b" />

                {/* Impact landing marker */}
                <circle cx={toSvgX(results.range)} cy={toSvgY(0)} r="4" fill="#ef4444" />

                {/* Animated project object ball */}
                <circle
                  cx={toSvgX(currentPoint.x)}
                  cy={toSvgY(currentPoint.y)}
                  r="7"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  className="shadow-lg"
                />

                {/* Pointer Hover Info popup */}
                {hoverCoords && (
                  <g>
                    <line x1={toSvgX(hoverCoords.x)} y1="10" x2={toSvgX(hoverCoords.x)} y2={graphHeight - 45} stroke="#334155" strokeDasharray="2 2" />
                    <line x1="35" y1={toSvgY(hoverCoords.y)} x2={graphWidth - 15} y2={toSvgY(hoverCoords.y)} stroke="#334155" strokeDasharray="2 2" />
                    <circle cx={toSvgX(hoverCoords.x)} cy={toSvgY(hoverCoords.y)} r="3" fill="#ffffff" />
                  </g>
                )}

                {/* Axis Labels */}
                <text x={graphWidth - 60} y={graphHeight - 15} fill="#64748b" fontSize="10" fontWeight="bold">Range ({distanceLabel})</text>
                <text x="15" y="20" fill="#64748b" fontSize="10" fontWeight="bold" transform={`rotate(90, 15, 20)`}>Height</text>
              </svg>

              {/* Cursor coordinates indicator overlay */}
              {hoverCoords && (
                <div className="absolute top-4 left-4 bg-slate-900/95 border border-slate-800 p-2 rounded-xl text-[10px] space-y-0.5 pointer-events-none">
                  <div>X: {displayVal(hoverCoords.x, "distance")}</div>
                  <div>Y: {displayVal(hoverCoords.y, "height")}</div>
                </div>
              )}
            </div>

            {/* Animation Controls Panel */}
            <div className="mt-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#518231] hover:bg-[#436a28] text-white p-2.5 rounded-xl transition-colors"
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2.5 rounded-xl transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
              </div>

              {/* Speed control segmented buttons */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Slow-Mo:</span>
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-xl">
                  {[
                    { label: "0.25x", value: 0.25 },
                    { label: "0.5x", value: 0.5 },
                    { label: "1x", value: 1.0 },
                    { label: "2x", value: 2.0 }
                  ].map((speedOpt) => (
                    <button
                      key={speedOpt.value}
                      type="button"
                      onClick={() => setPlaybackSpeed(speedOpt.value)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all ${
                        playbackSpeed === speedOpt.value
                          ? "bg-[#518231] text-white shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {speedOpt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Range status for target */}
              {targetModeEnabled && (
                <div className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 ${
                  results.isHit ? "bg-green-950/40 border-green-800 text-green-400" : "bg-red-950/40 border-red-800 text-red-400"
                }`}>
                  <Target size={12} />
                  {results.isHit ? "TARGET HIT!" : `MISS: ${displayVal(results.minTargetDist, "distance")}`}
                </div>
              )}
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <QuickStatCard title="Max Height" val={displayVal(results.maxHeight, "height")} color="text-amber-400" />
              <QuickStatCard title="Total Range" val={displayVal(results.range, "distance")} color="text-emerald-400" />
              <QuickStatCard title="Flight Time" val={`${results.flightTime.toFixed(2)} s`} color="text-blue-400" />
              <QuickStatCard title="Impact Speed" val={displayVal(results.impactSpeed, "speed")} color="text-red-400" />
            </div>

            {/* Print, Export PNG, Copy buttons */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Share2 size={13} />
                Share Link
              </button>
              <button
                type="button"
                onClick={handleCopyResults}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Copy size={13} />
                Copy text
              </button>
              <button
                type="button"
                onClick={handleExportPNG}
                className="flex items-center justify-center gap-1.5 bg-[#518231] hover:bg-[#436a28] text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-[#436a28]"
              >
                <Download size={13} />
                Export PNG
              </button>
            </div>
          </div>

          {/* Interactive Multi-feature tabs panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Headers */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1 flex-wrap">
              {(["visuals", "explanation", "planets", "sensitivity", "practice"] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                    activeTab === tab
                      ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                  }`}
                >
                  {tab === "visuals" ? "Dashboard" : tab}
                </button>
              ))}
            </div>

            {/* Tab contents */}
            <div className="p-6">
              
              {/* Tab 1: Dashboard details */}
              {activeTab === "visuals" && (
                <div className="space-y-4 text-sm">
                  <h4 className="font-bold text-slate-900 dark:text-white">Calculated Variables Breakdown</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs font-semibold block">Time to reach peak:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{results.peakTime.toFixed(3)} seconds</span>
                    </div>
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs font-semibold block">Impact angle:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{results.impactAngle.toFixed(1)}°</span>
                    </div>
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs font-semibold block">Launch kinetic energy:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{results.launchKe.toFixed(2)} J</span>
                    </div>
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-slate-400 text-xs font-semibold block">Launch potential energy:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{results.launchPe.toFixed(2)} J</span>
                    </div>
                  </div>

                  <div className="bg-[#518231]/5 border border-[#518231]/20 p-4 rounded-2xl flex items-start gap-2.5">
                    <Sparkles className="text-[#518231] shrink-0 mt-0.5" size={16} />
                    <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Angle Suggestion:</strong> The optimal launch angle for maximum horizontal range with current settings is <strong className="text-slate-900 dark:text-white">{optimalAngle.angle.toFixed(1)}°</strong>.
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Equations & Step by step */}
              {activeTab === "explanation" && (
                <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Derivations & Kinetic Formulas</h4>
                  <p>In a vacuum, the motion of a projectile is described by independent horizontal and vertical equations:</p>
                  
                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl font-mono text-slate-800 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800 space-y-2">
                    <div>1. Horizontal Distance: x(t) = v₀ · cos(θ) · t</div>
                    <div>2. Vertical Height: y(t) = h₀ + v₀ · sin(θ) · t - 0.5 · g · t²</div>
                  </div>

                  <h5 className="font-bold text-slate-800 dark:text-white mt-4">Step-by-step Solution:</h5>
                  <div className="space-y-3">
                    <div className="border-l-2 border-[#518231] pl-3">
                      <strong>1. Resolve Initial Velocity Components:</strong>
                      <div>v_x0 = {launchSpeed} · cos({launchAngle}°) = {(launchSpeed * Math.cos((launchAngle * Math.PI) / 180)).toFixed(2)} {speedUnit}</div>
                      <div>v_y0 = {launchSpeed} · sin({launchAngle}°) = {(launchSpeed * Math.sin((launchAngle * Math.PI) / 180)).toFixed(2)} {speedUnit}</div>
                    </div>
                    <div className="border-l-2 border-[#518231] pl-3">
                      <strong>2. Maximum Height reached:</strong>
                      <div>y_max = h₀ + (v_y0)² / (2g) = {initialHeight} + ({(launchSpeed * Math.sin((launchAngle * Math.PI) / 180)).toFixed(2)})² / (2 · {siInputs.g.toFixed(2)}) = {results.maxHeight.toFixed(2)} {heightUnit}</div>
                    </div>
                    <div className="border-l-2 border-[#518231] pl-3">
                      <strong>3. Time of flight:</strong>
                      <div>Solves the quadratic equation: y(t) = 0. Flight time is computed as {results.flightTime.toFixed(3)} seconds.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Planets mode comparison */}
              {activeTab === "planets" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Planet Trajectory Comparison</h4>
                  <p className="text-xs text-slate-500">Compare launch horizontal ranges and heights across gravity fields of different planets:</p>
                  
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {planetTrajectories.map((planet, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{planet.name}</span>
                        <div className="text-right">
                          <div>Range: <strong className="text-slate-900 dark:text-white">{displayVal(planet.range, "distance")}</strong></div>
                          <div className="text-[10px] text-slate-400">Peak Height: {displayVal(planet.maxHeight, "height")}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Sensitivity analysis chart */}
              {activeTab === "sensitivity" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sensitivity Graph (Range vs Launch Angle)</h4>
                  <p className="text-xs text-slate-500">Shows how the horizontal range varies based on changes in the launch angle (from 0° to 90°):</p>
                  
                  {isClient ? (
                    <div className="h-48 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sensitivityData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="angle" label={{ value: "Angle (°)", position: "insideBottom", offset: -5 }} />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="Range" stroke="#10b981" strokeWidth={2.5} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
                  )}
                </div>
              )}

              {/* Tab 5: Practice Mode Quiz */}
              {activeTab === "practice" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Practice Mode / Physics Quiz</h4>
                  
                  {quizQuestion && (
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{quizQuestion.q}</p>
                      
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.01"
                          value={quizUserAnswer}
                          onChange={(e) => setQuizUserAnswer(e.target.value)}
                          placeholder="Your answer"
                          className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleCheckQuiz}
                          className="bg-[#518231] hover:bg-[#436a28] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                        >
                          Submit
                        </button>
                      </div>

                      {quizChecked && (
                        <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                          quizIsCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
                        }`}>
                          {quizIsCorrect ? (
                            <>
                              <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                              <span>Correct! The answer is approximately {quizQuestion.correctAnswer} {quizQuestion.units}.</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle size={16} className="text-red-600 shrink-0" />
                              <span>Incorrect. Correct answer is {quizQuestion.correctAnswer} {quizQuestion.units}. Try again!</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={generateQuiz}
                    className="flex items-center gap-1 text-xs font-bold text-[#518231] hover:underline"
                  >
                    Next Question
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-component stat card
interface QuickStatCardProps {
  title: string;
  val: string;
  color: string;
}

function QuickStatCard({ title, val, color }: QuickStatCardProps) {
  return (
    <div className="bg-slate-800/40 border border-slate-800/60 p-3 rounded-2xl flex flex-col justify-between">
      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{title}</span>
      <div className={`text-xs sm:text-sm font-black mt-1.5 ${color}`}>{val}</div>
    </div>
  );
}

// Tooltip helper
interface InfoTooltipProps {
  text: string;
}

function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <div className="group relative inline-block text-slate-400 hover:text-slate-600 cursor-pointer">
      <Info size={13} />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl pointer-events-none z-50 leading-relaxed font-normal">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
      </div>
    </div>
  );
}
