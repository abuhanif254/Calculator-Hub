"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { InlineMath, BlockMath } from '@/app/components/KatexMath';
import 'katex/dist/katex.min.css';
import { 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  HelpCircle, 
  Info, 
  Clock, 
  Layers,
  Database,
  ArrowRightLeft
} from 'lucide-react';

interface VolumeCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

// Volume Unit Conversion factors to/from Cubic Meters (m³)
const VOLUME_UNIT_FACTORS: Record<string, { label: string; toM3: number }> = {
  m3: { label: "Cubic Meters (m³)", toM3: 1 },
  dm3: { label: "Cubic Decimeters (dm³)", toM3: 0.001 },
  cm3: { label: "Cubic Centimeters (cm³ / cc)", toM3: 1e-6 },
  mm3: { label: "Cubic Millimeters (mm³)", toM3: 1e-9 },
  in3: { label: "Cubic Inches (in³)", toM3: 1.6387064e-5 },
  ft3: { label: "Cubic Feet (ft³)", toM3: 0.028316846592 },
  yd3: { label: "Cubic Yards (yd³)", toM3: 0.764554857984 },
  liters: { label: "Liters (L)", toM3: 0.001 },
  milliliters: { label: "Milliliters (mL)", toM3: 1e-6 },
  gallons_us: { label: "US Gallons (gal)", toM3: 0.003785411784 },
  gallons_uk: { label: "Imperial Gallons (imp gal)", toM3: 0.00454609 }
};

// Linear Unit Conversion factors to Meters (m)
const LINEAR_UNIT_FACTORS: Record<string, { label: string; toMeters: number }> = {
  m: { label: "Meters (m)", toMeters: 1 },
  dm: { label: "Decimeters (dm)", toMeters: 0.1 },
  cm: { label: "Centimeters (cm)", toMeters: 0.01 },
  mm: { label: "Millimeters (mm)", toMeters: 0.001 },
  in: { label: "Inches (in)", toMeters: 0.0254 },
  ft: { label: "Feet (ft)", toMeters: 0.3048 },
  yd: { label: "Yards (yd)", toMeters: 0.9144 }
};

const PRESETS = [
  { 
    name: "Standard Swimming Pool", 
    shape: "rectangular_prism", 
    values: { length: "10", width: "5", height: "1.5" },
    units: { length: "m", width: "m", height: "m" },
    outUnit: "liters",
    description: "Average family size swimming pool. Uses Rectangular Prism shape." 
  },
  { 
    name: "Fuel Storage Tank", 
    shape: "cylinder", 
    values: { radius: "1.2", height: "4.5" },
    units: { radius: "m", height: "m" },
    outUnit: "gallons_us",
    description: "Standard horizontal cylindrical fuel tank. Uses Cylinder shape." 
  },
  { 
    name: "Shipping Container (40ft)", 
    shape: "rectangular_prism", 
    values: { length: "40", width: "8", height: "8.5" },
    units: { length: "ft", width: "ft", height: "ft" },
    outUnit: "ft3",
    description: "Standard 40-foot High Cube shipping container capacity." 
  },
  { 
    name: "Water Barrel (55 Gal)", 
    shape: "cylinder", 
    values: { radius: "11.25", height: "35" },
    units: { radius: "in", height: "in" },
    outUnit: "gallons_us",
    description: "Standard 55-gallon steel storage drum." 
  },
  { 
    name: "Concrete Pillar Pad", 
    shape: "cylinder", 
    values: { radius: "8", height: "4" },
    units: { radius: "in", height: "ft" },
    outUnit: "yd3",
    description: "Concrete foundation support pad. Uses Cylinder shape." 
  },
  { 
    name: "Basketball Volume", 
    shape: "sphere", 
    values: { radius: "4.75" },
    units: { radius: "in" },
    outUnit: "liters",
    description: "Standard size 7 basketball volume." 
  }
];

export function VolumeCalculatorView({ calcDef }: VolumeCalculatorViewProps) {
  // Shape selected
  const [shape, setShape] = useState<string>("rectangular_prism");
  // Preset selected
  const [activePreset, setActivePreset] = useState<string>("");
  // Output unit
  const [outputUnit, setOutputUnit] = useState<string>("m3");
  // Numeric precision
  const [precision, setPrecision] = useState<number>(4);

  // Toggle between entering Radius or Diameter
  const [dimensionMode, setDimensionMode] = useState<'radius' | 'diameter'>('radius');

  // Multi-input state store
  const [inputs, setInputs] = useState<Record<string, string>>({
    a: "5",          // cube side, ellipsoid a, capsule radius, etc.
    length: "10",    // prism/pyramid length
    width: "5",      // prism/pyramid width
    height: "3",     // prism/cylinder/cone height
    radius: "2",     // cylinder/sphere/cone radius
    innerRadius: "1.5", // hollow cylinder/sphere inner radius
    outerRadius: "2.5", // hollow cylinder/sphere outer radius
    topRadius: "1",    // frustum top radius
    bottomRadius: "2", // frustum bottom radius
    majorRadius: "4",  // torus major radius R
    minorRadius: "1",  // torus minor radius r
    baseArea: "25",    // pyramid base area
    b: "4",            // ellipsoid b, prism base
    c: "3"             // ellipsoid c
  });

  // Units for each input field
  const [inputUnits, setInputUnits] = useState<Record<string, string>>({
    a: "m",
    length: "m",
    width: "m",
    height: "m",
    radius: "m",
    innerRadius: "m",
    outerRadius: "m",
    topRadius: "m",
    bottomRadius: "m",
    majorRadius: "m",
    minorRadius: "m",
    b: "m",
    c: "m"
  });

  // Calculation Results
  const [result, setResult] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Clipboard copies
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [copiedData, setCopiedData] = useState(false);

  // History list
  const [history, setHistory] = useState<any[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("volume-calculator-history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update input parameter values
  const handleInputChange = (field: string, val: string) => {
    setInputs(prev => ({ ...prev, [field]: val }));
    setActivePreset("");
  };

  const handleUnitChange = (field: string, val: string) => {
    setInputUnits(prev => ({ ...prev, [field]: val }));
    setActivePreset("");
  };

  // Preset loader
  const handlePresetSelect = (presetName: string) => {
    setActivePreset(presetName);
    if (!presetName) return;

    const preset = PRESETS.find(p => p.name === presetName);
    if (preset) {
      setShape(preset.shape);
      setOutputUnit(preset.outUnit);
      
      // Load preset values
      Object.entries(preset.values).forEach(([k, v]) => {
        setInputs(prev => ({ ...prev, [k]: v }));
      });
      // Load preset units
      Object.entries(preset.units).forEach(([k, v]) => {
        setInputUnits(prev => ({ ...prev, [k]: v }));
      });
    }
  };

  // Mathematical volume calculation logic
  const calculate = () => {
    setValidationError(null);
    
    // Helper to get normalized meter value
    const getMeterValue = (field: string): number => {
      const valStr = inputs[field];
      if (!valStr) return NaN;
      const num = Number(valStr);
      if (isNaN(num) || num < 0) return NaN;
      
      const unit = inputUnits[field] || "m";
      const factor = LINEAR_UNIT_FACTORS[unit]?.toMeters ?? 1;
      return num * factor;
    };

    try {
      let vM3 = 0; // calculated volume in cubic meters (m³)
      let steps: any[] = [];
      let formulaLatex = "";
      let shapeLabel = "";

      // 1. CUBE
      if (shape === "cube") {
        const a = getMeterValue("a");
        if (isNaN(a) || a <= 0) {
          setValidationError("Edge length (a) must be a positive number.");
          return;
        }
        vM3 = Math.pow(a, 3);
        shapeLabel = "Cube";
        formulaLatex = "V = a^3";
        steps = [
          { desc: "Use the formula for the volume of a cube:", latex: "V = a^3" },
          { desc: "Substitute edge length (in meters):", latex: `V = (${a.toFixed(4)}\\text{ m})^3` },
          { desc: "Solve for volume:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 2. RECTANGULAR PRISM
      else if (shape === "rectangular_prism") {
        const l = getMeterValue("length");
        const w = getMeterValue("width");
        const h = getMeterValue("height");

        if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
          setValidationError("Length, width, and height must be positive numbers.");
          return;
        }
        vM3 = l * w * h;
        shapeLabel = "Rectangular Prism";
        formulaLatex = "V = l \\cdot w \\cdot h";
        steps = [
          { desc: "Volume of a rectangular prism formula:", latex: "V = l \\cdot w \\cdot h" },
          { desc: "Substitute converted dimensions:", latex: `V = ${l.toFixed(4)}\\text{ m} \\cdot ${w.toFixed(4)}\\text{ m} \\cdot ${h.toFixed(4)}\\text{ m}` },
          { desc: "Calculate volume:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 3. CYLINDER
      else if (shape === "cylinder") {
        let r = getMeterValue("radius");
        const h = getMeterValue("height");

        if (dimensionMode === "diameter") {
          const d = getMeterValue("radius");
          r = d / 2;
        }

        if (isNaN(r) || r <= 0 || isNaN(h) || h <= 0) {
          setValidationError("Radius/Diameter and height must be positive numbers.");
          return;
        }
        vM3 = Math.PI * Math.pow(r, 2) * h;
        shapeLabel = "Cylinder";
        formulaLatex = "V = \\pi r^2 h";
        steps = [
          { desc: "Volume of a cylinder formula:", latex: "V = \\pi r^2 h" },
          { desc: "Substitute radius and height (in meters):", latex: `V = \\pi \\cdot (${r.toFixed(4)}\\text{ m})^2 \\cdot ${h.toFixed(4)}\\text{ m}` },
          { desc: "Solve for volume:", latex: `V = \\pi \\cdot ${Math.pow(r, 2).toFixed(6)} \\cdot ${h.toFixed(4)} = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 4. SPHERE
      else if (shape === "sphere") {
        let r = getMeterValue("radius");
        if (dimensionMode === "diameter") {
          const d = getMeterValue("radius");
          r = d / 2;
        }

        if (isNaN(r) || r <= 0) {
          setValidationError("Radius/Diameter must be a positive number.");
          return;
        }
        vM3 = (4 / 3) * Math.PI * Math.pow(r, 3);
        shapeLabel = "Sphere";
        formulaLatex = "V = \\frac{4}{3} \\pi r^3";
        steps = [
          { desc: "Volume of a sphere formula:", latex: "V = \\frac{4}{3} \\pi r^3" },
          { desc: "Substitute radius (in meters):", latex: `V = \\frac{4}{3} \\pi \\cdot (${r.toFixed(4)}\\text{ m})^3` },
          { desc: "Calculate volume:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 5. CONE
      else if (shape === "cone") {
        let r = getMeterValue("radius");
        const h = getMeterValue("height");
        if (dimensionMode === "diameter") {
          const d = getMeterValue("radius");
          r = d / 2;
        }

        if (isNaN(r) || r <= 0 || isNaN(h) || h <= 0) {
          setValidationError("Radius/Diameter and height must be positive numbers.");
          return;
        }
        vM3 = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
        shapeLabel = "Cone";
        formulaLatex = "V = \\frac{1}{3} \\pi r^2 h";
        steps = [
          { desc: "Volume of a cone formula:", latex: "V = \\frac{1}{3} \\pi r^2 h" },
          { desc: "Substitute values:", latex: `V = \\frac{1}{3} \\pi \\cdot (${r.toFixed(4)}\\text{ m})^2 \\cdot ${h.toFixed(4)}\\text{ m}` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 6. PYRAMID
      else if (shape === "pyramid") {
        const l = getMeterValue("length");
        const w = getMeterValue("width");
        const h = getMeterValue("height");

        if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
          setValidationError("Base dimensions and height must be positive numbers.");
          return;
        }
        const baseArea = l * w;
        vM3 = (1 / 3) * baseArea * h;
        shapeLabel = "Pyramid";
        formulaLatex = "V = \\frac{1}{3} A_{base} h = \\frac{1}{3} (l \\cdot w) h";
        steps = [
          { desc: "Volume of a pyramid formula:", latex: "V = \\frac{1}{3} \\cdot \\text{Base Area} \\cdot h" },
          { desc: "Calculate base area (l * w):", latex: `A_{base} = ${l.toFixed(4)}\\text{ m} \\cdot ${w.toFixed(4)}\\text{ m} = ${baseArea.toFixed(4)}\\text{ m}^2` },
          { desc: "Substitute base area and height:", latex: `V = \\frac{1}{3} \\cdot ${baseArea.toFixed(4)}\\text{ m}^2 \\cdot ${h.toFixed(4)}\\text{ m}` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 7. TRIANGULAR PRISM
      else if (shape === "triangular_prism") {
        const b = getMeterValue("b"); // triangle base
        const hBase = getMeterValue("a"); // triangle height
        const H = getMeterValue("height"); // prism height

        if (isNaN(b) || b <= 0 || isNaN(hBase) || hBase <= 0 || isNaN(H) || H <= 0) {
          setValidationError("Base width, base height, and prism height must be positive numbers.");
          return;
        }
        const baseArea = 0.5 * b * hBase;
        vM3 = baseArea * H;
        shapeLabel = "Triangular Prism";
        formulaLatex = "V = A_{base} \\cdot H = \\left(\\frac{1}{2} b \\cdot h_{base}\\right) H";
        steps = [
          { desc: "Volume of a triangular prism formula:", latex: "V = \\text{Base Area} \\cdot H" },
          { desc: "Calculate triangular base area:", latex: `A_{base} = \\frac{1}{2} \\cdot ${b.toFixed(4)}\\text{ m} \\cdot ${hBase.toFixed(4)}\\text{ m} = ${baseArea.toFixed(4)}\\text{ m}^2` },
          { desc: "Substitute base area and prism height:", latex: `V = ${baseArea.toFixed(4)}\\text{ m}^2 \\cdot ${H.toFixed(4)}\\text{ m}` },
          { desc: "Calculate volume:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 8. ELLIPSOID
      else if (shape === "ellipsoid") {
        const a = getMeterValue("a");
        const b = getMeterValue("b");
        const c = getMeterValue("c");

        if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
          setValidationError("All three semi-axes (a, b, c) must be positive numbers.");
          return;
        }
        vM3 = (4 / 3) * Math.PI * a * b * c;
        shapeLabel = "Ellipsoid";
        formulaLatex = "V = \\frac{4}{3} \\pi a b c";
        steps = [
          { desc: "Volume of an ellipsoid formula:", latex: "V = \\frac{4}{3} \\pi a b c" },
          { desc: "Substitute semi-axes:", latex: `V = \\frac{4}{3} \\pi \\cdot ${a.toFixed(4)}\\text{ m} \\cdot ${b.toFixed(4)}\\text{ m} \\cdot ${c.toFixed(4)}\\text{ m}` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 9. CAPSULE
      else if (shape === "capsule") {
        let r = getMeterValue("radius");
        const h = getMeterValue("height");
        if (dimensionMode === "diameter") {
          const d = getMeterValue("radius");
          r = d / 2;
        }

        if (isNaN(r) || r <= 0 || isNaN(h) || h <= 0) {
          setValidationError("Radius/Diameter and cylinder height must be positive numbers.");
          return;
        }
        // Capsule volume = cylinder volume + sphere volume
        const cylinderVol = Math.PI * Math.pow(r, 2) * h;
        const sphereVol = (4 / 3) * Math.PI * Math.pow(r, 3);
        vM3 = cylinderVol + sphereVol;
        shapeLabel = "Capsule";
        formulaLatex = "V = \\pi r^2 \\left(\\frac{4}{3} r + h\\right)";
        steps = [
          { desc: "A capsule is formed by a cylinder and a sphere. The formula is:", latex: "V = \\pi r^2 h_{cyl} + \\frac{4}{3} \\pi r^3" },
          { desc: "Calculate cylinder portion volume:", latex: `V_{cyl} = \\pi \\cdot (${r.toFixed(4)}\\text{ m})^2 \\cdot ${h.toFixed(4)}\\text{ m} = ${cylinderVol.toFixed(6)}\\text{ m}^3` },
          { desc: "Calculate hemispherical caps (sphere portion) volume:", latex: `V_{sphere} = \\frac{4}{3} \\pi \\cdot (${r.toFixed(4)}\\text{ m})^3 = ${sphereVol.toFixed(6)}\\text{ m}^3` },
          { desc: "Sum the volumes:", latex: `V = V_{cyl} + V_{sphere} = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 10. TORUS
      else if (shape === "torus") {
        const R = getMeterValue("majorRadius");
        const r = getMeterValue("minorRadius");

        if (isNaN(R) || R <= 0 || isNaN(r) || r <= 0) {
          setValidationError("Major radius (R) and minor radius (r) must be positive numbers.");
          return;
        }
        if (r >= R) {
          setValidationError("Minor radius (r) must be strictly less than major radius (R).");
          return;
        }
        vM3 = 2 * Math.pow(Math.PI, 2) * R * Math.pow(r, 2);
        shapeLabel = "Torus";
        formulaLatex = "V = 2 \\pi^2 R r^2";
        steps = [
          { desc: "Volume of a torus formula:", latex: "V = 2 \\pi^2 R r^2" },
          { desc: "Substitute major radius R and minor radius r:", latex: `V = 2 \\pi^2 \\cdot ${R.toFixed(4)}\\text{ m} \\cdot (${r.toFixed(4)}\\text{ m})^2` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 11. HEMISPHERE
      else if (shape === "hemisphere") {
        let r = getMeterValue("radius");
        if (dimensionMode === "diameter") {
          const d = getMeterValue("radius");
          r = d / 2;
        }

        if (isNaN(r) || r <= 0) {
          setValidationError("Radius/Diameter must be a positive number.");
          return;
        }
        vM3 = (2 / 3) * Math.PI * Math.pow(r, 3);
        shapeLabel = "Hemisphere";
        formulaLatex = "V = \\frac{2}{3} \\pi r^3";
        steps = [
          { desc: "Volume of a hemisphere formula:", latex: "V = \\frac{2}{3} \\pi r^3" },
          { desc: "Substitute radius (in meters):", latex: `V = \\frac{2}{3} \\pi \\cdot (${r.toFixed(4)}\\text{ m})^3` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 12. FRUSTUM
      else if (shape === "frustum") {
        let R = getMeterValue("bottomRadius");
        let r = getMeterValue("topRadius");
        const h = getMeterValue("height");

        if (dimensionMode === "diameter") {
          R = getMeterValue("bottomRadius") / 2;
          r = getMeterValue("topRadius") / 2;
        }

        if (isNaN(R) || R <= 0 || isNaN(r) || r <= 0 || isNaN(h) || h <= 0) {
          setValidationError("Top radius, bottom radius, and height must be positive numbers.");
          return;
        }
        vM3 = (1 / 3) * Math.PI * h * (Math.pow(R, 2) + R * r + Math.pow(r, 2));
        shapeLabel = "Cone Frustum";
        formulaLatex = "V = \\frac{1}{3} \\pi h (R^2 + Rr + r^2)";
        steps = [
          { desc: "Volume of a conical frustum formula:", latex: "V = \\frac{1}{3} \\pi h (R^2 + R \\cdot r + r^2)" },
          { desc: "Substitute bottom radius R, top radius r, and height h:", latex: `V = \\frac{1}{3} \\pi \\cdot ${h.toFixed(4)}\\text{ m} \\cdot ((${R.toFixed(4)})^2 + ${R.toFixed(4)} \\cdot ${r.toFixed(4)} + (${r.toFixed(4)})^2)` },
          { desc: "Calculate term product:", latex: `R^2 + R \\cdot r + r^2 = ${(Math.pow(R, 2) + R * r + Math.pow(r, 2)).toFixed(6)}\\text{ m}^2` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 13. HOLLOW CYLINDER
      else if (shape === "hollow_cylinder") {
        let R = getMeterValue("outerRadius");
        let r = getMeterValue("innerRadius");
        const h = getMeterValue("height");

        if (dimensionMode === "diameter") {
          R = getMeterValue("outerRadius") / 2;
          r = getMeterValue("innerRadius") / 2;
        }

        if (isNaN(R) || R <= 0 || isNaN(r) || r <= 0 || isNaN(h) || h <= 0) {
          setValidationError("Outer and inner radius/diameter, and height must be positive numbers.");
          return;
        }
        if (r >= R) {
          setValidationError("Inner radius must be strictly less than outer radius.");
          return;
        }
        vM3 = Math.PI * (Math.pow(R, 2) - Math.pow(r, 2)) * h;
        shapeLabel = "Hollow Cylinder";
        formulaLatex = "V = \\pi (R^2 - r^2) h";
        steps = [
          { desc: "Volume of a hollow cylinder formula:", latex: "V = \\pi (R^2 - r^2) h" },
          { desc: "Substitute outer radius R, inner radius r, and height h:", latex: `V = \\pi \\cdot ((${R.toFixed(4)}\\text{ m})^2 - (${r.toFixed(4)}\\text{ m})^2) \\cdot ${h.toFixed(4)}\\text{ m}` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // 14. HOLLOW SPHERE
      else if (shape === "hollow_sphere") {
        let R = getMeterValue("outerRadius");
        let r = getMeterValue("innerRadius");

        if (dimensionMode === "diameter") {
          R = getMeterValue("outerRadius") / 2;
          r = getMeterValue("innerRadius") / 2;
        }

        if (isNaN(R) || R <= 0 || isNaN(r) || r <= 0) {
          setValidationError("Outer and inner radius/diameter must be positive numbers.");
          return;
        }
        if (r >= R) {
          setValidationError("Inner radius must be strictly less than outer radius.");
          return;
        }
        vM3 = (4 / 3) * Math.PI * (Math.pow(R, 3) - Math.pow(r, 3));
        shapeLabel = "Hollow Sphere";
        formulaLatex = "V = \\frac{4}{3} \\pi (R^3 - r^3)";
        steps = [
          { desc: "Volume of a hollow sphere formula:", latex: "V = \\frac{4}{3} \\pi (R^3 - r^3)" },
          { desc: "Substitute outer radius R and inner radius r:", latex: `V = \\frac{4}{3} \\pi \\cdot ((${R.toFixed(4)}\\text{ m})^3 - (${r.toFixed(4)}\\text{ m})^3)` },
          { desc: "Solve:", latex: `V = ${vM3.toFixed(6)}\\text{ m}^3` }
        ];
      }

      // Convert m3 result value to target output volume unit
      const factorOut = VOLUME_UNIT_FACTORS[outputUnit]?.toM3 ?? 1;
      const convertedVolume = vM3 / factorOut;

      // Add final conversion step to math steps
      steps.push({
        desc: `Convert calculated volume to desired output unit (${VOLUME_UNIT_FACTORS[outputUnit]?.label}):`,
        latex: `V = \\frac{${vM3.toFixed(6)}\\text{ m}^3}{${factorOut.toExponential(4)}\\text{ m}^3/\\text{unit}} = ${convertedVolume.toLocaleString(undefined, { maximumFractionDigits: precision })}\\text{ ${outputUnit}}`
      });

      setResult({
        value: convertedVolume,
        unit: outputUnit,
        steps,
        formulaLatex
      });

      // Save calculation item into local history
      const historyItem = {
        id: Date.now(),
        shape,
        shapeTitle: shapeLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        summary: `${shapeLabel}: ${convertedVolume.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${outputUnit}`,
        presetName: activePreset || "Custom Dimensions",
        details: {
          inputs: { ...inputs },
          inputUnits: { ...inputUnits },
          dimensionMode,
          outputUnit
        }
      };

      const updatedHistory = [historyItem, ...history.slice(0, 19)];
      setHistory(updatedHistory);
      localStorage.setItem("volume-calculator-history", JSON.stringify(updatedHistory));

    } catch (err) {
      console.error(err);
      setValidationError("Calculation error. Check that all fields contain valid numerical inputs.");
    }
  };

  // Re-run whenever relevant state fields update
  useEffect(() => {
    calculate();
  }, [shape, inputs, inputUnits, outputUnit, dimensionMode, precision]);

  // Restore history item
  const restoreHistory = (item: any) => {
    setShape(item.shape);
    setInputs(item.details.inputs);
    setInputUnits(item.details.inputUnits);
    setDimensionMode(item.details.dimensionMode);
    setOutputUnit(item.details.outputUnit);
    setActivePreset(item.presetName === "Custom Dimensions" ? "" : item.presetName);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("volume-calculator-history");
  };

  // Copy result utility
  const handleCopy = (text: string, type: 'result' | 'formula' | 'data') => {
    navigator.clipboard.writeText(text);
    if (type === 'result') {
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    } else if (type === 'formula') {
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    } else if (type === 'data') {
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    }
  };

  // Download output summary
  const downloadReport = (format: 'txt' | 'csv' | 'json') => {
    if (!result) return;

    if (format === 'txt') {
      let txt = "====================================================\n";
      txt += `          VOLUME CALCULATION REPORT (${shape.toUpperCase()})  \n`;
      txt += "====================================================\n";
      txt += `Shape type: ${shape.replace('_', ' ')}\n`;
      txt += `Date: ${new Date().toLocaleString()}\n`;
      txt += `Preset: ${activePreset || "Custom Dimensions"}\n\n`;
      txt += "INPUT DIMENSIONS:\n";
      
      const fields = getActiveFields(shape);
      fields.forEach(f => {
        txt += `- ${f.label}: ${inputs[f.key]} ${inputUnits[f.key]}\n`;
      });
      txt += `\nOUTPUT RESULT: ${result.value.toLocaleString(undefined, { maximumFractionDigits: precision })} ${outputUnit}\n`;
      txt += "====================================================\n";
      
      const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `volume-${shape}-report.txt`;
      link.click();
    } 
    
    else if (format === 'csv') {
      let csv = "Variable,Value,Unit\n";
      const fields = getActiveFields(shape);
      fields.forEach(f => {
        csv += `${f.label},${inputs[f.key]},${inputUnits[f.key]}\n`;
      });
      csv += `Calculated Volume,${result.value},${outputUnit}\n`;

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `volume-${shape}-data.csv`;
      link.click();
    } 
    
    else if (format === 'json') {
      const data = {
        shape,
        presetName: activePreset,
        inputs: { ...inputs },
        inputUnits: { ...inputUnits },
        outputUnit,
        calculatedVolume: result.value
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `volume-${shape}-specification.json`;
      link.click();
    }
  };

  // Helper to get input fields that are active for the selected shape
  const getActiveFields = (currentShape: string) => {
    switch (currentShape) {
      case "cube":
        return [{ key: "a", label: "Edge Length (a)" }];
      case "rectangular_prism":
        return [
          { key: "length", label: "Length (l)" },
          { key: "width", label: "Width (w)" },
          { key: "height", label: "Height (h)" }
        ];
      case "cylinder":
      case "cone":
      case "capsule":
        return [
          { key: "radius", label: dimensionMode === "radius" ? "Radius (r)" : "Diameter (d)" },
          { key: "height", label: "Height (h)" }
        ];
      case "sphere":
      case "hemisphere":
        return [
          { key: "radius", label: dimensionMode === "radius" ? "Radius (r)" : "Diameter (d)" }
        ];
      case "pyramid":
        return [
          { key: "length", label: "Base Length (l)" },
          { key: "width", label: "Base Width (w)" },
          { key: "height", label: "Height (h)" }
        ];
      case "triangular_prism":
        return [
          { key: "b", label: "Triangle Base (b)" },
          { key: "a", label: "Triangle Height (h)" },
          { key: "height", label: "Prism Height (H)" }
        ];
      case "ellipsoid":
        return [
          { key: "a", label: "Semi-axis a" },
          { key: "b", label: "Semi-axis b" },
          { key: "c", label: "Semi-axis c" }
        ];
      case "torus":
        return [
          { key: "majorRadius", label: "Major Radius (R)" },
          { key: "minorRadius", label: "Minor Radius (r)" }
        ];
      case "frustum":
        return [
          { key: "bottomRadius", label: dimensionMode === "radius" ? "Bottom Radius (R)" : "Bottom Diameter (D)" },
          { key: "topRadius", label: dimensionMode === "radius" ? "Top Radius (r)" : "Top Diameter (d)" },
          { key: "height", label: "Height (h)" }
        ];
      case "hollow_cylinder":
        return [
          { key: "outerRadius", label: dimensionMode === "radius" ? "Outer Radius (R)" : "Outer Diameter (D)" },
          { key: "innerRadius", label: dimensionMode === "radius" ? "Inner Radius (r)" : "Inner Diameter (d)" },
          { key: "height", label: "Height (h)" }
        ];
      case "hollow_sphere":
        return [
          { key: "outerRadius", label: dimensionMode === "radius" ? "Outer Radius (R)" : "Outer Diameter (D)" },
          { key: "innerRadius", label: dimensionMode === "radius" ? "Inner Radius (r)" : "Inner Diameter (d)" }
        ];
      default:
        return [];
    }
  };

  const activeFields = useMemo(() => getActiveFields(shape), [shape, dimensionMode]);

  // Render SVG geometric shapes diagrams
  const renderShapeDiagram = () => {
    const strokeColor = "#3b82f6";
    const fillColor = "rgba(59, 130, 246, 0.1)";

    switch (shape) {
      case "cube":
        return (
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            {/* Draw 3D Isometric Cube */}
            <path d="M 50,20 L 80,35 L 80,65 L 50,80 L 20,65 L 20,35 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M 50,20 L 50,80" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M 20,35 L 50,50 L 80,35" stroke={strokeColor} strokeWidth="1.5" fill="none" />
            {/* Dimension label */}
            <text x="30" y="77" className="text-[8px] font-bold fill-slate-500">a</text>
            <text x="68" y="77" className="text-[8px] font-bold fill-slate-500">a</text>
            <text x="54" y="53" className="text-[8px] font-bold fill-slate-500">a</text>
          </svg>
        );
      case "rectangular_prism":
        return (
          <svg viewBox="0 0 100 100" className="w-44 h-40">
            {/* Isometric Cuboid */}
            <path d="M 50,25 L 85,38 L 85,62 L 50,75 L 15,62 L 15,38 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M 50,25 L 50,75" stroke={strokeColor} strokeWidth="1.5" />
            <path d="M 15,38 L 50,50 L 85,38" stroke={strokeColor} strokeWidth="1.5" fill="none" />
            {/* Labels */}
            <text x="25" y="73" className="text-[8px] font-bold fill-slate-500">Length (l)</text>
            <text x="68" y="73" className="text-[8px] font-bold fill-slate-500">Width (w)</text>
            <text x="54" y="55" className="text-[8px] font-bold fill-slate-500">Height (h)</text>
          </svg>
        );
      case "cylinder":
        return (
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            {/* Top Ellipse */}
            <ellipse cx="50" cy="25" rx="30" ry="10" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            {/* Body */}
            <path d="M 20,25 L 20,75 A 30,10 0 0,0 80,75 L 80,25" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <ellipse cx="50" cy="75" rx="30" ry="10" stroke={strokeColor} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
            {/* Radius & Height lines */}
            <line x1="50" y1="25" x2="80" y2="25" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="85" y1="25" x2="85" y2="75" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="62" y="21" className="text-[8px] font-bold fill-red-500">r</text>
            <text x="89" y="53" className="text-[8px] font-bold fill-emerald-500">h</text>
          </svg>
        );
      case "sphere":
        return (
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            <circle cx="50" cy="50" r="35" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            {/* 3D elliptical contour */}
            <ellipse cx="50" cy="50" rx="35" ry="10" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <line x1="50" y1="50" x2="85" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="65" y="45" className="text-[8px] font-bold fill-red-500">r</text>
          </svg>
        );
      case "cone":
        return (
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            <path d="M 50,15 L 20,75 A 30,10 0 0,0 80,75 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <ellipse cx="50" cy="75" rx="30" ry="10" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
            {/* Height & Radius */}
            <line x1="50" y1="15" x2="50" y2="75" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="50" y1="75" x2="80" y2="75" stroke="#ef4444" strokeWidth="1.5" />
            <text x="65" y="71" className="text-[8px] font-bold fill-red-500">r</text>
            <text x="42" y="45" className="text-[8px] font-bold fill-emerald-500">h</text>
          </svg>
        );
      case "pyramid":
        return (
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            {/* Square base, perspective */}
            <path d="M 50,15 L 15,65 L 55,75 L 85,65 Z" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M 50,15 L 55,75" stroke={strokeColor} strokeWidth="1.5" />
            {/* Height line */}
            <line x1="50" y1="15" x2="50" y2="67" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="42" y="42" className="text-[8px] font-bold fill-emerald-500">h</text>
            <text x="32" y="75" className="text-[8px] font-bold fill-slate-500">l</text>
            <text x="73" y="73" className="text-[8px] font-bold fill-slate-500">w</text>
          </svg>
        );
      case "torus":
        return (
          <svg viewBox="0 0 100 100" className="w-40 h-40">
            {/* Torus visual ring */}
            <circle cx="50" cy="50" r="38" fill="none" stroke={strokeColor} strokeWidth="10" className="opacity-15" />
            <circle cx="50" cy="50" r="38" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="50" y1="50" x2="78" y2="50" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="78" y1="50" x2="88" y2="50" stroke="#ef4444" strokeWidth="1.5" />
            <text x="60" y="44" className="text-[8px] font-bold fill-emerald-500">R</text>
            <text x="82" y="44" className="text-[8px] font-bold fill-red-500">r</text>
          </svg>
        );
      default:
        return (
          <div className="w-40 h-40 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center border border-dashed border-blue-200">
            <Layers className="w-12 h-12 text-blue-400" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden font-sans">
      
      {/* Top Header Card Banner */}
      <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
            <Layers className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {calcDef.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Instant 3D Volume Computations, Cross-Unit Conversions & Math Explanations
            </p>
          </div>
        </div>
      </div>

      {/* Shapes selection carousel grid */}
      <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
          Select Geometric 3D Shape
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {[
            { key: "rectangular_prism", label: "Prism" },
            { key: "cube", label: "Cube" },
            { key: "cylinder", label: "Cylinder" },
            { key: "sphere", label: "Sphere" },
            { key: "cone", label: "Cone" },
            { key: "pyramid", label: "Pyramid" },
            { key: "triangular_prism", label: "Tri. Prism" },
            { key: "ellipsoid", label: "Ellipsoid" },
            { key: "capsule", label: "Capsule" },
            { key: "torus", label: "Torus" },
            { key: "hemisphere", label: "Hemisphere" },
            { key: "frustum", label: "Frustum" },
            { key: "hollow_cylinder", label: "Hollow Cyl." },
            { key: "hollow_sphere", label: "Hollow Sph." }
          ].map((item) => (
            <button 
              key={item.key}
              onClick={() => {
                setShape(item.key);
                setResult(null);
              }}
              className={`py-2 px-3 rounded-xl font-bold text-xs border text-center transition-all ${
                shape === item.key 
                  ? 'border-blue-600 bg-blue-50/50 text-blue-600 dark:border-blue-400 dark:bg-slate-800 dark:text-blue-400' 
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid content */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Input Fields Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Preset Selector */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>Real-world presets</span>
            </label>
            <select
              value={activePreset}
              onChange={(e) => handlePresetSelect(e.target.value)}
              className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none font-semibold text-sm transition-all shadow-sm"
            >
              <option value="">-- Custom Dimension values --</option>
              {PRESETS.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            {activePreset && (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                {PRESETS.find(p => p.name === activePreset)?.description}
              </p>
            )}
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-4 flex gap-2">
              <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-red-800 dark:text-red-300">{validationError}</span>
            </div>
          )}

          {/* Dimension Configuration Mode (Radius vs Diameter) */}
          {["cylinder", "cone", "sphere", "capsule", "hemisphere", "frustum", "hollow_cylinder", "hollow_sphere"].includes(shape) && (
            <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setDimensionMode('radius')}
                className={`flex-1 py-1.5 text-center font-bold text-xs rounded-lg transition-all ${
                  dimensionMode === 'radius' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Use Radius (r)
              </button>
              <button
                onClick={() => setDimensionMode('diameter')}
                className={`flex-1 py-1.5 text-center font-bold text-xs rounded-lg transition-all ${
                  dimensionMode === 'diameter' 
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Use Diameter (d)
              </button>
            </div>
          )}

          {/* Active inputs fields */}
          <div className="space-y-4">
            {activeFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {field.label}
                  </label>
                  <select 
                    value={inputUnits[field.key] || "m"}
                    onChange={(e) => handleUnitChange(field.key, e.target.value)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-transparent border-0 outline-none cursor-pointer"
                  >
                    {Object.entries(LINEAR_UNIT_FACTORS).map(([uk, uv]) => (
                      <option key={uk} value={uk}>{uv.label}</option>
                    ))}
                  </select>
                </div>
                <input 
                  type="number" 
                  step="any"
                  value={inputs[field.key] ?? ""}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full h-12 px-4 bg-slate-50/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all shadow-sm text-lg font-semibold"
                />
              </div>
            ))}
          </div>

          {/* Configuration Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Output Volume Unit
              </label>
              <select
                value={outputUnit}
                onChange={(e) => setOutputUnit(e.target.value)}
                className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold text-sm outline-none transition-all shadow-sm"
              >
                {Object.entries(VOLUME_UNIT_FACTORS).map(([uk, uv]) => (
                  <option key={uk} value={uk}>{uv.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Precision Decimals
              </label>
              <select
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold text-sm outline-none transition-all shadow-sm"
              >
                {[0, 1, 2, 3, 4, 5, 6, 8].map(p => (
                  <option key={p} value={p}>{p} decimals</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => {
                setInputs({
                  a: "5", length: "10", width: "5", height: "3", radius: "2",
                  innerRadius: "1.5", outerRadius: "2.5", topRadius: "1", bottomRadius: "2",
                  majorRadius: "4", minorRadius: "1", baseArea: "25", b: "4", c: "3"
                });
                setInputUnits({
                  a: "m", length: "m", width: "m", height: "m", radius: "m",
                  innerRadius: "m", outerRadius: "m", topRadius: "m", bottomRadius: "m",
                  majorRadius: "m", minorRadius: "m", b: "m", c: "m"
                });
                setDimensionMode("radius");
                setActivePreset("");
                setResult(null);
                setValidationError(null);
              }}
              className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset parameters</span>
            </button>
          </div>

          {/* Local Calculation History list */}
          {history.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent calculations</span>
                <button 
                  onClick={clearHistory}
                  className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => restoreHistory(item)}
                    className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer shadow-xs transition-all text-xs flex justify-between items-start gap-2"
                  >
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {item.shapeTitle} <span className="font-normal text-slate-400">({item.timestamp})</span>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-0.5 font-medium line-clamp-1">{item.summary}</div>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      {item.presetName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Preview/Results Panel */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/20 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/60 min-h-[500px] flex flex-col justify-between gap-8">
          
          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 py-16">
              <Layers className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4 animate-pulse" />
              <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">Awaiting parameters</h4>
              <p className="text-sm max-w-xs">Fill out the variables on the left panel to trigger 3D volume calculations.</p>
            </div>
          ) : (
            <div className="space-y-8 flex-1 flex flex-col justify-between">
              
              {/* Primary Results Display */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-1">
                      Calculated Volume
                    </span>
                    <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight break-all">
                      {result.value.toLocaleString(undefined, { 
                        maximumFractionDigits: precision,
                        minimumFractionDigits: 0
                      })}
                      <span className="text-lg md:text-2xl font-bold text-slate-500 dark:text-slate-400 ml-2">
                        {outputUnit}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy(result.value.toString(), 'result')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition-colors shadow-xs"
                    title="Copy volume value"
                  >
                    {copiedResult ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Dynamic Shape diagram visualization */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm relative">
                <div className="absolute left-6 top-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Shape Geometry
                  </h3>
                </div>
                <div className="py-6 flex items-center justify-center">
                  {renderShapeDiagram()}
                </div>
              </div>

              {/* Step-by-Step equations derivation */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  <span>Step-by-Step math derivation</span>
                </h3>

                <div className="space-y-4">
                  {result.steps.map((step: any, index: number) => (
                    <div key={index} className="space-y-1.5 border-l-2 border-slate-100 dark:border-slate-800 pl-4 py-0.5">
                      {step.desc && (
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {step.desc}
                        </p>
                      )}
                      <div className="bg-slate-50/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 overflow-x-auto text-slate-800 dark:text-slate-200 font-serif flex justify-start items-center">
                        <BlockMath math={step.latex} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy / Downloads controls panel */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Export calculation data
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => downloadReport('txt')}
                    className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-750 transition-all text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>TXT Report</span>
                  </button>
                  <button 
                    onClick={() => downloadReport('csv')}
                    className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-750 transition-all text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV Table</span>
                  </button>
                  <button 
                    onClick={() => downloadReport('json')}
                    className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-750 transition-all text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON Spec</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
