"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { 
  Binary, 
  Settings, 
  RefreshCw, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  History, 
  HelpCircle,
  Play,
  Cpu,
  Database,
  Grid,
  FileText,
  ToggleLeft,
  ChevronRight,
  ArrowRight,
  Info
} from "lucide-react";

interface BinaryCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

export function BinaryCalculatorView({ calcDef, locale }: BinaryCalculatorViewProps) {
  const t = useTranslations("BinaryCalculator");

  // Tab State
  const [activeTab, setActiveTab] = useState<"arithmetic" | "bitwise" | "converter" | "programmer" | "ascii" | "boolean" | "float">("arithmetic");

  // Global Configs
  const [bitSize, setBitSize] = useState<8 | 16 | 32 | 64>(16);
  const [isSigned, setIsSigned] = useState<boolean>(false);

  // Arithmetic State
  const [num1, setNum1] = useState<string>("1010"); // 10
  const [num2, setNum2] = useState<string>("0110"); // 6
  const [arithOp, setArithOp] = useState<"+" | "-" | "*" | "/" | "%">("+");
  const [arithError, setArithError] = useState<string>("");

  // Bitwise State
  const [bitNum1, setBitNum1] = useState<string>("1100");
  const [bitNum2, setBitNum2] = useState<string>("1010");
  const [bitwiseOp, setBitwiseOp] = useState<"AND" | "OR" | "XOR" | "NOT" | "NAND" | "NOR" | "XNOR" | "LSHIFT" | "RSHIFT">("AND");
  const [shiftAmount, setShiftAmount] = useState<number>(1);
  const [bitwiseError, setBitwiseError] = useState<string>("");

  // Converter State
  const [convVal, setConvVal] = useState<string>("10.101");
  const [convType, setConvType] = useState<"bin" | "dec" | "hex" | "oct">("bin");
  const [convError, setConvError] = useState<string>("");

  // Programmer State
  const [programmerInput, setProgrammerInput] = useState<string>("42");
  const [programmerBase, setProgrammerBase] = useState<"bin" | "dec" | "hex" | "oct">("dec");
  const [progError, setProgError] = useState<string>("");

  // ASCII State
  const [asciiText, setAsciiText] = useState<string>("Binary");
  const [asciiBin, setAsciiBin] = useState<string>("01000010 01101001 01101110 01100001 01110010 01111001");

  // Floating Point State
  const [floatValue, setFloatValue] = useState<string>("12.375");

  // History State
  const [history, setHistory] = useState<{ id: string; type: string; expression: string; result: string; timestamp: string }[]>([]);
  const [copiedId, setCopiedId] = useState<string>("");

  // Local Storage Load
  useEffect(() => {
    try {
      const stored = localStorage.getItem("binary_calculator_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to History
  const saveToHistory = (type: string, expression: string, result: string) => {
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      expression,
      result,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    const updated = [newItem, ...history].slice(0, 30);
    setHistory(updated);
    try {
      localStorage.setItem("binary_calculator_history", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("binary_calculator_history");
    } catch (e) {
      console.error(e);
    }
  };

  // Helper: Copy logic
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  // Helper: Export functions
  const exportHistory = (format: "txt" | "json" | "csv") => {
    let content = "";
    let mimeType = "text/plain";
    let filename = `binary-calculator-history.${format}`;

    if (format === "txt") {
      content = "Binary Calculator Run History\n=========================\n\n";
      history.forEach(item => {
        content += `[${item.timestamp}] (${item.type}) ${item.expression} = ${item.result}\n`;
      });
    } else if (format === "json") {
      content = JSON.stringify(history, null, 2);
      mimeType = "application/json";
    } else if (format === "csv") {
      content = "Timestamp,Type,Expression,Result\n";
      history.forEach(item => {
        content += `"${item.timestamp}","${item.type}","${item.expression}","${item.result}"\n`;
      });
      mimeType = "text/csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper: Binary Validation
  const isValidBinary = (str: string, allowFraction = true) => {
    if (allowFraction) {
      return /^[01]+(\.[01]+)?$/.test(str);
    }
    return /^[01]+$/.test(str);
  };

  // Helper: Parse Binary to Float/Integer
  const parseBin = (binStr: string): number => {
    if (!binStr.includes(".")) {
      return parseInt(binStr, 2);
    }
    const [intPart, fracPart] = binStr.split(".");
    let val = parseInt(intPart, 2);
    for (let i = 0; i < fracPart.length; i++) {
      if (fracPart[i] === "1") {
        val += Math.pow(2, -(i + 1));
      }
    }
    return val;
  };

  // Helper: Convert Number to Binary string (signed or unsigned)
  const toBinString = (num: number, width: number, signed: boolean, fractionDigits = 0): string => {
    if (num < 0 && signed) {
      // Two's complement for negative number
      const maxVal = Math.pow(2, width);
      const positiveVal = maxVal + num;
      let bin = (positiveVal >>> 0).toString(2);
      if (bin.length > width) {
        bin = bin.substring(bin.length - width);
      } else {
        bin = bin.padStart(width, "1");
      }
      return bin;
    }

    if (num < 0) {
      return "-" + Math.abs(num).toString(2);
    }

    const intVal = Math.floor(num);
    let intBin = intVal.toString(2);
    
    // Pad integer part for alignment in register displays
    if (intBin.length < width && !signed) {
      // Don't enforce padding for general conversion, only limit if it exceeds
      // For arithmetic we pad to bit size
    } else if (intBin.length > width) {
      intBin = intBin.substring(intBin.length - width);
    }

    const fracVal = num - intVal;
    if (fracVal > 0 && fractionDigits > 0) {
      let fracBin = "";
      let temp = fracVal;
      for (let i = 0; i < fractionDigits; i++) {
        temp *= 2;
        if (temp >= 1) {
          fracBin += "1";
          temp -= 1;
        } else {
          fracBin += "0";
        }
        if (temp === 0) break;
      }
      return `${intBin}.${fracBin}`;
    }

    return intBin;
  };

  // Helper: Bit Grouping formatter
  const formatBitString = (binStr: string, groupSize = 4): string => {
    if (!binStr) return "";
    const isNegativeSign = binStr.startsWith("-");
    const cleaned = isNegativeSign ? binStr.substring(1) : binStr;
    const parts = cleaned.split(".");
    const intPart = parts[0];

    // Left pad integer part to group boundary
    const rem = intPart.length % groupSize;
    const paddedInt = rem > 0 ? "0".repeat(groupSize - rem) + intPart : intPart;

    const chunks = [];
    for (let i = 0; i < paddedInt.length; i += groupSize) {
      chunks.push(paddedInt.substring(i, i + groupSize));
    }
    
    let formatted = (isNegativeSign ? "-" : "") + chunks.join(" ");
    if (parts[1]) {
      // Format fractional part (pad right to group boundaries)
      const fracPart = parts[1];
      const fracRem = fracPart.length % groupSize;
      const paddedFrac = fracRem > 0 ? fracPart + "0".repeat(groupSize - fracRem) : fracPart;
      const fracChunks = [];
      for (let i = 0; i < paddedFrac.length; i += groupSize) {
        fracChunks.push(paddedFrac.substring(i, i + groupSize));
      }
      formatted += "." + fracChunks.join(" ");
    }
    return formatted;
  };

  // Helper: 2's Complement explanation generator
  const getTwosComplementExplanation = (val: number, width: number): { steps: string[]; binary: string } => {
    const steps: string[] = [];
    const absVal = Math.abs(val);
    const binAbs = absVal.toString(2).padStart(width, "0");
    steps.push(`1. Convert absolute value ${absVal} to binary: ${binAbs}`);
    
    // Invert bits
    const inverted = binAbs.split("").map(b => b === "0" ? "1" : "0").join("");
    steps.push(`2. Invert all bits (One's Complement): ${inverted}`);
    
    // Add 1
    const intVal = parseInt(inverted, 2) + 1;
    const twosBin = (intVal >>> 0).toString(2).padStart(width, "0").slice(-width);
    steps.push(`3. Add 1 to the LSB (Least Significant Bit): ${twosBin}`);
    
    return { steps, binary: twosBin };
  };

  // --------------------------------------------------------
  // TABS 1: ARITHMETIC LOGIC
  // --------------------------------------------------------
  const arithmeticResult = useMemo(() => {
    setArithError("");
    if (!num1 || !num2) return null;
    if (!isValidBinary(num1) || !isValidBinary(num2)) {
      setArithError(t("invalidBinary") || "Invalid binary format.");
      return null;
    }

    const n1 = parseBin(num1);
    const n2 = parseBin(num2);

    let resVal = 0;
    switch (arithOp) {
      case "+": resVal = n1 + n2; break;
      case "-": resVal = n1 - n2; break;
      case "*": resVal = n1 * n2; break;
      case "/": 
        if (n2 === 0) {
          setArithError("Division by zero error.");
          return null;
        }
        resVal = n1 / n2; 
        break;
      case "%": 
        if (n2 === 0) {
          setArithError("Modulo by zero error.");
          return null;
        }
        resVal = n1 % n2; 
        break;
    }

    // Limit value based on bit bounds if signed/unsigned is set
    const maxUnsigned = Math.pow(2, bitSize) - 1;
    const minSigned = -Math.pow(2, bitSize - 1);
    const maxSigned = Math.pow(2, bitSize - 1) - 1;

    let displayRes = resVal;
    if (isSigned) {
      if (resVal < minSigned || resVal > maxSigned) {
        // Handle arithmetic wrap-around
        const mod = Math.pow(2, bitSize);
        displayRes = ((resVal + Math.pow(2, bitSize - 1)) % mod);
        if (displayRes < 0) displayRes += mod;
        displayRes -= Math.pow(2, bitSize - 1);
      }
    } else {
      if (resVal < 0 || resVal > maxUnsigned) {
        const mod = Math.pow(2, bitSize);
        displayRes = resVal % mod;
        if (displayRes < 0) displayRes += mod;
      }
    }

    const binRes = toBinString(displayRes, bitSize, isSigned, arithOp === "/" ? 4 : 0);
    const decRes = displayRes.toString(10);
    const hexRes = Math.floor(displayRes).toString(16).toUpperCase();
    const octRes = Math.floor(displayRes).toString(8);

    // Step by step calculation carries
    const carries: string[] = [];
    const steps: string[] = [];

    if (arithOp === "+") {
      const len1 = num1.split(".")[0].length;
      const len2 = num2.split(".")[0].length;
      const maxLen = Math.max(len1, len2);
      const paddedN1 = num1.split(".")[0].padStart(maxLen, "0");
      const paddedN2 = num2.split(".")[0].padStart(maxLen, "0");
      
      let carry = 0;
      const carryArr = Array(maxLen + 1).fill(0);
      for (let i = maxLen - 1; i >= 0; i--) {
        const sum = parseInt(paddedN1[i]) + parseInt(paddedN2[i]) + carry;
        if (sum >= 2) {
          carry = 1;
          carryArr[i] = 1;
        } else {
          carry = 0;
        }
      }
      carries.push(`Carry row:  ${carryArr.join("")}`);
      steps.push(`Binary Addition Steps:`);
      steps.push(`  ${paddedN1}  (${n1})`);
      steps.push(`+ ${paddedN2}  (${n2})`);
      steps.push(`-`.repeat(maxLen + 4));
      steps.push(`  ${binRes}  (${decRes})`);
    } else if (arithOp === "-") {
      steps.push(`Binary Subtraction (${n1} - ${n2}):`);
      if (isSigned && n2 > 0) {
        const twos = getTwosComplementExplanation(-n2, bitSize);
        steps.push(`Subtracting ${n2} is equivalent to adding its two's complement equivalent:`);
        twos.steps.forEach(s => steps.push(`  ${s}`));
        steps.push(`Now add ${num1} and ${twos.binary}:`);
        steps.push(`  ${num1.padStart(bitSize, "0")}  (${n1})`);
        steps.push(`+ ${twos.binary}  (-${n2})`);
        steps.push(`-`.repeat(bitSize + 4));
        steps.push(`  ${binRes}  (${decRes}) (Ignored overflow bit if any)`);
      } else {
        steps.push(`Straight column subtraction with borrows:`);
        steps.push(`  ${num1}  (${n1})`);
        steps.push(`- ${num2}  (${n2})`);
        steps.push(`-`.repeat(Math.max(num1.length, num2.length) + 4));
        steps.push(`  ${binRes}  (${decRes})`);
      }
    } else {
      steps.push(`Decimal Equivalence: ${n1} ${arithOp} ${n2} = ${resVal}`);
      steps.push(`Result converted to Binary = ${binRes}`);
    }

    return {
      bin: binRes,
      dec: decRes,
      hex: hexRes,
      oct: octRes,
      carries,
      steps
    };
  }, [num1, num2, arithOp, bitSize, isSigned, t]);

  // Trigger Save on calculation change
  useEffect(() => {
    if (arithmeticResult) {
      const expr = `${num1} ${arithOp} ${num2}`;
      const existing = history.find(h => h.expression === expr && h.type === "Arithmetic");
      if (!existing) {
        saveToHistory("Arithmetic", expr, arithmeticResult.bin);
      }
    }
  }, [arithmeticResult]);


  // --------------------------------------------------------
  // TABS 2: BITWISE LOGIC
  // --------------------------------------------------------
  const bitwiseResult = useMemo(() => {
    setBitwiseError("");
    if (!bitNum1 || (bitwiseOp !== "NOT" && !bitNum2)) return null;
    if (!isValidBinary(bitNum1, false) || (bitwiseOp !== "NOT" && !isValidBinary(bitNum2, false))) {
      setBitwiseError("Bitwise operations only support standard integer binary strings (no decimals).");
      return null;
    }

    const padded1 = bitNum1.padStart(bitSize, "0").slice(-bitSize);
    const padded2 = bitNum2.padStart(bitSize, "0").slice(-bitSize);

    const n1 = parseInt(padded1, 2);
    const n2 = parseInt(padded2, 2);

    let res = 0;
    const steps: string[] = [];
    steps.push(`Bitwise operation ${bitwiseOp} on ${bitSize}-bit registers:`);
    steps.push(`A: ${padded1}  (Decimal: ${n1})`);
    if (bitwiseOp !== "NOT") {
      steps.push(`B: ${padded2}  (Decimal: ${n2})`);
    }

    switch (bitwiseOp) {
      case "AND":
        res = n1 & n2;
        break;
      case "OR":
        res = n1 | n2;
        break;
      case "XOR":
        res = n1 ^ n2;
        break;
      case "NOT":
        res = ~n1;
        break;
      case "NAND":
        res = ~(n1 & n2);
        break;
      case "NOR":
        res = ~(n1 | n2);
        break;
      case "XNOR":
        res = ~(n1 ^ n2);
        break;
      case "LSHIFT":
        res = n1 << shiftAmount;
        steps.push(`Shift Left by ${shiftAmount} bits:`);
        break;
      case "RSHIFT":
        res = isSigned ? (n1 >> shiftAmount) : (n1 >>> shiftAmount);
        steps.push(`Shift Right by ${shiftAmount} bits (Preserves sign: ${isSigned ? "Yes" : "No"}):`);
        break;
    }

    // Mask to fit bitSize register
    const mask = (Math.pow(2, bitSize) - 1) >>> 0;
    const maskedRes = (res & mask) >>> 0;
    const binStr = maskedRes.toString(2).padStart(bitSize, "0");

    steps.push(`-`.repeat(bitSize + 6));
    steps.push(`R: ${binStr}  (Decimal: ${maskedRes})`);

    // Bit-by-bit comparison details
    const bitExplanations: string[] = [];
    if (bitwiseOp !== "NOT" && bitwiseOp !== "LSHIFT" && bitwiseOp !== "RSHIFT") {
      bitExplanations.push("Bit-by-Bit Logic Breakdown:");
      for (let i = 0; i < bitSize; i++) {
        const b1 = padded1[i];
        const b2 = padded2[i];
        const r = binStr[i];
        bitExplanations.push(`  Bit [${bitSize - 1 - i}]: ${b1} ${bitwiseOp} ${b2} = ${r}`);
      }
    }

    return {
      bin: binStr,
      dec: maskedRes.toString(10),
      hex: maskedRes.toString(16).toUpperCase(),
      steps,
      bitExplanations
    };
  }, [bitNum1, bitNum2, bitwiseOp, shiftAmount, bitSize, isSigned]);

  // Trigger Save on bitwise calculation change
  useEffect(() => {
    if (bitwiseResult) {
      const expr = bitwiseOp === "NOT" ? `NOT ${bitNum1}` : 
                   (bitwiseOp === "LSHIFT" || bitwiseOp === "RSHIFT") ? `${bitNum1} ${bitwiseOp} ${shiftAmount}` :
                   `${bitNum1} ${bitwiseOp} ${bitNum2}`;
      const existing = history.find(h => h.expression === expr && h.type === "Bitwise");
      if (!existing) {
        saveToHistory("Bitwise", expr, bitwiseResult.bin);
      }
    }
  }, [bitwiseResult]);


  // --------------------------------------------------------
  // TABS 3: NUMBER SYSTEM CONVERTER
  // --------------------------------------------------------
  const converterResults = useMemo(() => {
    setConvError("");
    if (!convVal) return null;

    let decNum = 0;
    const steps: string[] = [];

    try {
      if (convType === "bin") {
        if (!isValidBinary(convVal)) {
          setConvError("Invalid Binary format.");
          return null;
        }
        decNum = parseBin(convVal);
        steps.push(`Converting Binary ${convVal} to base values:`);
        if (convVal.includes(".")) {
          const [intP, fracP] = convVal.split(".");
          steps.push(`1. Integer part: ${intP} = ${parseInt(intP, 2)}`);
          let fracSum = 0;
          let expr = "";
          for (let i = 0; i < fracP.length; i++) {
            if (fracP[i] === "1") {
              const weight = Math.pow(2, -(i + 1));
              fracSum += weight;
              expr += `+ 2^-${i+1} (${weight}) `;
            }
          }
          steps.push(`2. Fractional part: .${fracP} = ${expr.substring(2)} = ${fracSum}`);
        } else {
          steps.push(`Multiply each digit by its power of 2 positional weight:`);
          const reversed = convVal.split("").reverse();
          const parts = reversed.map((digit, index) => {
            if (digit === "1") {
              return `2^${index} (${Math.pow(2, index)})`;
            }
            return null;
          }).filter(Boolean);
          steps.push(`  Sum of values: ${parts.join(" + ")} = ${decNum}`);
        }
      } else if (convType === "dec") {
        if (isNaN(Number(convVal))) {
          setConvError("Invalid Decimal format.");
          return null;
        }
        decNum = Number(convVal);
        steps.push(`Converting Decimal ${convVal} to other systems:`);
        steps.push(`1. Convert integer part ${Math.floor(decNum)} using division by base.`);
        if (decNum % 1 !== 0) {
          steps.push(`2. Convert fractional part ${decNum % 1} using multiplication by 2.`);
        }
      } else if (convType === "hex") {
        if (!/^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(convVal)) {
          setConvError("Invalid Hexadecimal format.");
          return null;
        }
        const [intP, fracP] = convVal.split(".");
        decNum = parseInt(intP, 16);
        if (fracP) {
          for (let i = 0; i < fracP.length; i++) {
            const hexDigitVal = parseInt(fracP[i], 16);
            decNum += hexDigitVal * Math.pow(16, -(i + 1));
          }
        }
        steps.push(`Converting Hexadecimal ${convVal} to decimal:`);
        steps.push(`Positional hex weights sum: ${decNum}`);
      } else if (convType === "oct") {
        if (!/^[0-7]+(\.[0-7]+)?$/.test(convVal)) {
          setConvError("Invalid Octal format.");
          return null;
        }
        const [intP, fracP] = convVal.split(".");
        decNum = parseInt(intP, 8);
        if (fracP) {
          for (let i = 0; i < fracP.length; i++) {
            const octDigitVal = parseInt(fracP[i], 8);
            decNum += octDigitVal * Math.pow(8, -(i + 1));
          }
        }
        steps.push(`Converting Octal ${convVal} to decimal:`);
        steps.push(`Positional octal weights sum: ${decNum}`);
      }
    } catch (e) {
      setConvError("Parsing error: check your characters.");
      return null;
    }

    const binOutput = toBinString(decNum, 8, false, 6);
    const decOutput = decNum.toString();
    const hexOutput = decNum % 1 === 0 ? decNum.toString(16).toUpperCase() : Math.floor(decNum).toString(16).toUpperCase() + "." + Math.round((decNum % 1) * 256).toString(16).toUpperCase();
    const octOutput = decNum % 1 === 0 ? decNum.toString(8) : Math.floor(decNum).toString(8) + "." + Math.round((decNum % 1) * 64).toString(8);

    return {
      bin: binOutput,
      dec: decOutput,
      hex: hexOutput.replace(/\.0+$/, ""),
      oct: octOutput.replace(/\.0+$/, ""),
      steps
    };
  }, [convVal, convType]);


  // --------------------------------------------------------
  // TABS 4: PROGRAMMER MODE (ACTIVE BIT GRID)
  // --------------------------------------------------------
  const programmerResults = useMemo(() => {
    setProgError("");
    if (!programmerInput) return null;

    let decVal = 0;
    try {
      if (programmerBase === "bin") {
        if (!isValidBinary(programmerInput, false)) {
          setProgError("Invalid binary integer.");
          return null;
        }
        decVal = parseInt(programmerInput, 2);
      } else if (programmerBase === "dec") {
        if (isNaN(Number(programmerInput)) || programmerInput.includes(".")) {
          setProgError("Invalid decimal integer.");
          return null;
        }
        decVal = parseInt(programmerInput, 10);
      } else if (programmerBase === "hex") {
        if (!/^[0-9A-Fa-f]+$/.test(programmerInput)) {
          setProgError("Invalid hex integer.");
          return null;
        }
        decVal = parseInt(programmerInput, 16);
      } else if (programmerBase === "oct") {
        if (!/^[0-7]+$/.test(programmerInput)) {
          setProgError("Invalid octal integer.");
          return null;
        }
        decVal = parseInt(programmerInput, 8);
      }
    } catch (e) {
      setProgError("Input parse error.");
      return null;
    }

    // Limit value to bit width
    const maxVal = Math.pow(2, bitSize);
    let masked = decVal;
    if (isSigned) {
      const minSigned = -Math.pow(2, bitSize - 1);
      const maxSigned = Math.pow(2, bitSize - 1) - 1;
      if (decVal < minSigned || decVal > maxSigned) {
        masked = ((decVal + Math.pow(2, bitSize - 1)) % maxVal);
        if (masked < 0) masked += maxVal;
        masked -= Math.pow(2, bitSize - 1);
      }
    } else {
      masked = decVal % maxVal;
      if (masked < 0) masked += maxVal;
    }

    const binStr = toBinString(masked, bitSize, isSigned);
    const decStr = masked.toString();
    const hexStr = (masked >>> 0).toString(16).toUpperCase();
    const octStr = (masked >>> 0).toString(8);

    return {
      bin: binStr,
      dec: decStr,
      hex: hexStr,
      oct: octStr,
      rawDec: masked
    };
  }, [programmerInput, programmerBase, bitSize, isSigned]);

  // Click on active bit in grid to toggle it
  const toggleBit = (index: number) => {
    if (!programmerResults) return;
    const bits = programmerResults.bin.split("");
    bits[index] = bits[index] === "0" ? "1" : "0";
    const newBin = bits.join("");
    setProgrammerInput(newBin);
    setProgrammerBase("bin");
  };


  // --------------------------------------------------------
  // TABS 5: ASCII / CHARACTER SUPPORT
  // --------------------------------------------------------
  // Real-time ASCII text to binary
  useEffect(() => {
    if (activeTab === "ascii") {
      let binResult = "";
      for (let i = 0; i < asciiText.length; i++) {
        const binChar = asciiText.charCodeAt(i).toString(2).padStart(8, "0");
        binResult += binChar + " ";
      }
      setAsciiBin(binResult.trim());
    }
  }, [asciiText, activeTab]);

  // Real-time ASCII binary to text
  const handleAsciiBinChange = (val: string) => {
    setAsciiBin(val);
    const cleaned = val.replace(/[^01\s]/g, "");
    const groups = cleaned.split(/\s+/);
    let textResult = "";
    groups.forEach(g => {
      if (g.length > 0) {
        const code = parseInt(g, 2);
        if (!isNaN(code)) {
          textResult += String.fromCharCode(code);
        }
      }
    });
    setAsciiText(textResult);
  };


  // --------------------------------------------------------
  // TABS 6: BOOLEAN LOGIC LEARNING
  // --------------------------------------------------------
  const [selectedGate, setSelectedGate] = useState<"AND" | "OR" | "XOR" | "NOT" | "NAND" | "NOR" | "XNOR">("AND");
  const truthTables = {
    AND: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 1 },
    ],
    OR: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 1 },
    ],
    XOR: [
      { a: 0, b: 0, out: 0 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 },
    ],
    NOT: [
      { a: 0, out: 1 },
      { a: 1, out: 0 },
    ],
    NAND: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 1 },
      { a: 1, b: 0, out: 1 },
      { a: 1, b: 1, out: 0 },
    ],
    NOR: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 0 },
    ],
    XNOR: [
      { a: 0, b: 0, out: 1 },
      { a: 0, b: 1, out: 0 },
      { a: 1, b: 0, out: 0 },
      { a: 1, b: 1, out: 1 },
    ]
  };

  const gateDescriptions = {
    AND: "The Output is 1 only when BOTH input A and input B are 1. It acts as logical multiplication.",
    OR: "The Output is 1 when EITHER input A or input B (or both) are 1. It acts as logical addition.",
    XOR: "The Output is 1 when the inputs are DIFFERENT. If inputs are identical, the output is 0.",
    NOT: "The Inverter gate. It flips the input bit: 0 becomes 1, and 1 becomes 0.",
    NAND: "Negated AND gate. The Output is 0 only when both inputs are 1. Universal logic gate.",
    NOR: "Negated OR gate. The Output is 1 only when both inputs are 0.",
    XNOR: "Equivalence gate. The Output is 1 when inputs are identical."
  };


  // --------------------------------------------------------
  // TABS 7: FLOATING POINT IEEE-754 VISUALIZER
  // --------------------------------------------------------
  const ieeeFloatResult = useMemo(() => {
    const fVal = parseFloat(floatValue);
    if (isNaN(fVal)) return null;

    // Get 32-bit float memory layout in JS
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, fVal, false); // big-endian
    const intVal = view.getInt32(0, false);

    const bin32 = (intVal >>> 0).toString(2).padStart(32, "0");
    const signBit = bin32[0];
    const exponentBits = bin32.substring(1, 9);
    const fractionBits = bin32.substring(9);

    const signText = signBit === "1" ? "Negative (-)" : "Positive (+)";
    const biasedExp = parseInt(exponentBits, 2);
    const unbiasedExp = biasedExp - 127;
    
    // Calculate Mantissa decimal equivalence
    let mantissaSum = 1.0;
    if (biasedExp === 0) mantissaSum = 0.0; // subnormal
    for (let i = 0; i < fractionBits.length; i++) {
      if (fractionBits[i] === "1") {
        mantissaSum += Math.pow(2, -(i + 1));
      }
    }

    const steps = [
      `Sign Bit: ${signBit} (${signText})`,
      `Biased Exponent: ${exponentBits} (Decimal: ${biasedExp}, Unbiased: ${biasedExp} - 127 = ${unbiasedExp})`,
      `Fraction / Mantissa: ${fractionBits} (Decimal multiplier: ${mantissaSum.toFixed(6)})`,
      `Reconstructed value: (-1)^${signBit} * ${mantissaSum.toFixed(6)} * 2^${unbiasedExp} = ${fVal}`
    ];

    return {
      sign: signBit,
      exponent: exponentBits,
      fraction: fractionBits,
      fullBin: bin32,
      steps
    };
  }, [floatValue]);


  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100">
      
      {/* HEADER SECTION (Digital Electronics / CPU aesthetic) */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/5 text-emerald-400">
            <Binary size={30} className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {t("title") || "Binary Calculator"} 
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">CS-Engine</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">{t("desc") || "Advanced Base-2 Math & Bitwise Logic Toolkit"}</p>
          </div>
        </div>

        {/* Global toggles (bit size & signed) */}
        <div className="flex flex-wrap gap-3 items-center bg-slate-950 p-2 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 px-2">
            <Cpu size={14} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-400">Word:</span>
            {[8, 16, 32, 64].map(size => (
              <button 
                key={size} 
                onClick={() => setBitSize(size as any)}
                className={`px-2 py-1 text-xs font-mono font-bold rounded-lg transition-all ${bitSize === size ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
              >
                {size}b
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <button 
            onClick={() => setIsSigned(!isSigned)}
            className="flex items-center gap-2 px-2 py-1 hover:bg-slate-900 rounded-lg transition-colors text-xs font-semibold"
          >
            <span className={isSigned ? "text-emerald-400" : "text-slate-400"}>
              {isSigned ? "Signed (2's Complement)" : "Unsigned Mode"}
            </span>
            <div className={`w-7 h-4 rounded-full p-0.5 transition-colors ${isSigned ? "bg-emerald-500" : "bg-slate-800"}`}>
              <div className={`w-3 h-3 rounded-full bg-slate-950 transition-transform ${isSigned ? "translate-x-3" : "translate-x-0"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="bg-slate-950 border-b border-slate-850 px-4 md:px-8 overflow-x-auto flex gap-1 scrollbar-thin">
        {[
          { id: "arithmetic", label: "Arithmetic", icon: PlusMinus },
          { id: "bitwise", label: "Bitwise Logic", icon: Grid },
          { id: "converter", label: "Base Converter", icon: RefreshCw },
          { id: "programmer", label: "Bit Register", icon: Database },
          { id: "ascii", label: "ASCII / Text", icon: FileText },
          { id: "boolean", label: "Truth Tables", icon: ToggleLeft },
          { id: "float", label: "Floating Point", icon: Cpu }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-4 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 shrink-0 ${activeTab === tab.id ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-400 hover:text-slate-200"}`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MAIN VIEW AREA */}
      <div className="p-6 md:p-8">
        
        {/* TAB 1: ARITHMETIC */}
        {activeTab === "arithmetic" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Binary Arithmetic
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Binary Value 1</label>
                  <input 
                    type="text" 
                    value={num1}
                    onChange={(e) => setNum1(e.target.value.replace(/[^01.]/g, ""))}
                    placeholder="e.g. 1010"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-emerald-400 tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {num1 && <span className="text-[10px] text-slate-500 font-mono mt-1 block">Decimal equivalent: {parseBin(num1)}</span>}
                </div>

                <div className="flex gap-2 justify-between">
                  {["+", "-", "*", "/", "%"].map((op) => (
                    <button
                      key={op}
                      onClick={() => setArithOp(op as any)}
                      className={`flex-1 py-3 text-lg font-mono font-bold rounded-xl transition-all border ${arithOp === op ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700"}`}
                    >
                      {op}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Binary Value 2</label>
                  <input 
                    type="text" 
                    value={num2}
                    onChange={(e) => setNum2(e.target.value.replace(/[^01.]/g, ""))}
                    placeholder="e.g. 0110"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-emerald-400 tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {num2 && <span className="text-[10px] text-slate-500 font-mono mt-1 block">Decimal equivalent: {parseBin(num2)}</span>}
                </div>

                {arithError && (
                  <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold rounded-xl">
                    {arithError}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Live Register Outputs
              </h3>

              {!arithmeticResult ? (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl opacity-50">
                  <Binary size={48} className="mb-2 text-slate-500" />
                  <p className="text-sm font-semibold">{t("waiting") || "Awaiting valid inputs..."}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Visual Bit display */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-2">CPU Register Bit Array</span>
                    <div className="flex flex-wrap gap-1">
                      {arithmeticResult.bin.split("").map((bit, idx) => (
                        <div 
                          key={idx} 
                          className={`w-7 h-9 rounded-md flex flex-col items-center justify-center border transition-all ${bit === "1" ? "bg-emerald-500/10 border-emerald-500/45 text-emerald-400 font-bold" : "bg-slate-900 border-slate-800 text-slate-600"}`}
                        >
                          <span className="text-xs">{bit}</span>
                          <span className="text-[8px] opacity-40 font-mono">{arithmeticResult.bin.length - 1 - idx}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Binary</span>
                        <button 
                          onClick={() => handleCopy(arithmeticResult.bin, "arithBin")}
                          className="text-slate-500 hover:text-white"
                        >
                          {copiedId === "arithBin" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="text-base font-bold font-mono text-emerald-400 break-all">{formatBitString(arithmeticResult.bin)}</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Decimal (Int)</span>
                        <button 
                          onClick={() => handleCopy(arithmeticResult.dec, "arithDec")}
                          className="text-slate-500 hover:text-white"
                        >
                          {copiedId === "arithDec" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="text-base font-bold font-mono text-white">{arithmeticResult.dec}</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Hexadecimal</span>
                        <button 
                          onClick={() => handleCopy(arithmeticResult.hex, "arithHex")}
                          className="text-slate-500 hover:text-white"
                        >
                          {copiedId === "arithHex" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="text-base font-bold font-mono text-white">0x{arithmeticResult.hex}</div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Octal</span>
                        <button 
                          onClick={() => handleCopy(arithmeticResult.oct, "arithOct")}
                          className="text-slate-500 hover:text-white"
                        >
                          {copiedId === "arithOct" ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="text-base font-bold font-mono text-white">0o{arithmeticResult.oct}</div>
                    </div>
                  </div>

                  {/* Step by step panel */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">{t("explanation") || "Step-by-Step Explanation"}</span>
                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-2 overflow-x-auto whitespace-pre">
                      {arithmeticResult.carries.map((c, i) => (
                        <div key={i} className="text-emerald-500/80">{c}</div>
                      ))}
                      {arithmeticResult.steps.map((step, i) => (
                        <div key={i}>{step}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BITWISE LOGIC */}
        {activeTab === "bitwise" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Bitwise Gate Operations
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input A (Binary)</label>
                  <input 
                    type="text" 
                    value={bitNum1}
                    onChange={(e) => setBitNum1(e.target.value.replace(/[^01]/g, ""))}
                    placeholder="e.g. 1100"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-emerald-400 tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["AND", "OR", "XOR", "NOT", "NAND", "NOR", "XNOR", "LSHIFT", "RSHIFT"].map((op) => (
                    <button
                      key={op}
                      onClick={() => setBitwiseOp(op as any)}
                      className={`py-2 text-xs font-bold font-mono rounded-lg border transition-all ${bitwiseOp === op ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700"}`}
                    >
                      {op}
                    </button>
                  ))}
                </div>

                {(bitwiseOp === "LSHIFT" || bitwiseOp === "RSHIFT") && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shift Amount</label>
                    <input 
                      type="number" 
                      min="1"
                      max={bitSize - 1}
                      value={shiftAmount}
                      onChange={(e) => setShiftAmount(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                )}

                {bitwiseOp !== "NOT" && bitwiseOp !== "LSHIFT" && bitwiseOp !== "RSHIFT" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input B (Binary)</label>
                    <input 
                      type="text" 
                      value={bitNum2}
                      onChange={(e) => setBitNum2(e.target.value.replace(/[^01]/g, ""))}
                      placeholder="e.g. 1010"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-emerald-400 tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                )}

                {bitwiseError && (
                  <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold rounded-xl">
                    {bitwiseError}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Logic Register Map
              </h3>

              {!bitwiseResult ? (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl opacity-50">
                  <Binary size={48} className="mb-2 text-slate-500" />
                  <p className="text-sm font-semibold">Awaiting valid binary inputs...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Gate grid visualizer */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Parallel Bit registers</span>
                      <span className="text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-emerald-400 font-mono">Operation: {bitwiseOp}</span>
                    </div>

                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-6 text-xs text-slate-500">A</span>
                        <div className="flex gap-0.5 overflow-x-auto">
                          {bitNum1.padStart(bitSize, "0").slice(-bitSize).split("").map((b, i) => (
                            <div key={i} className={`w-5 h-7 rounded border flex items-center justify-center text-xs ${b === "1" ? "bg-slate-900 border-emerald-500/20 text-emerald-400" : "bg-slate-900 border-slate-850 text-slate-600"}`}>{b}</div>
                          ))}
                        </div>
                      </div>

                      {bitwiseOp !== "NOT" && bitwiseOp !== "LSHIFT" && bitwiseOp !== "RSHIFT" && (
                        <div className="flex items-center gap-2">
                          <span className="w-6 text-xs text-slate-500">B</span>
                          <div className="flex gap-0.5 overflow-x-auto">
                            {bitNum2.padStart(bitSize, "0").slice(-bitSize).split("").map((b, i) => (
                              <div key={i} className={`w-5 h-7 rounded border flex items-center justify-center text-xs ${b === "1" ? "bg-slate-900 border-emerald-500/20 text-emerald-400" : "bg-slate-900 border-slate-850 text-slate-600"}`}>{b}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="h-px bg-slate-850 my-2" />

                      <div className="flex items-center gap-2">
                        <span className="w-6 text-xs text-emerald-400">R</span>
                        <div className="flex gap-0.5 overflow-x-auto">
                          {bitwiseResult.bin.split("").map((b, i) => (
                            <div key={i} className={`w-5 h-7 rounded border flex items-center justify-center text-xs font-bold ${b === "1" ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" : "bg-slate-900 border-slate-800 text-slate-600"}`}>{b}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Result (Binary)</span>
                      <div className="text-base font-bold font-mono text-emerald-400 break-all">{formatBitString(bitwiseResult.bin)}</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Result (Decimal)</span>
                      <div className="text-base font-bold font-mono text-white">{bitwiseResult.dec}</div>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Logical Verification</span>
                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 font-mono text-xs text-slate-400 max-h-48 overflow-y-auto space-y-1">
                      {bitwiseResult.steps.map((s, idx) => (
                        <div key={idx}>{s}</div>
                      ))}
                      {bitwiseResult.bitExplanations.map((e, idx) => (
                        <div key={idx} className="pl-2">{e}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: BASE CONVERTER */}
        {activeTab === "converter" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Base Conversion
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Source System</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["bin", "dec", "hex", "oct"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setConvType(t as any)}
                        className={`py-2 text-xs font-bold font-mono rounded-lg border uppercase transition-all ${convType === t ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input Value (Allows fraction decimals)</label>
                  <input 
                    type="text" 
                    value={convVal}
                    onChange={(e) => setConvVal(e.target.value)}
                    placeholder="e.g. 1010.101"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-emerald-400 tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {convError && (
                  <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold rounded-xl">
                    {convError}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Multi-System Equivalences
              </h3>

              {!converterResults ? (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl opacity-50">
                  <Binary size={48} className="mb-2 text-slate-500" />
                  <p className="text-sm font-semibold">Enter a value to convert...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="border-b md:border-b-0 md:border-r border-slate-850 pb-4 md:pb-0 md:pr-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Binary Representation</span>
                        <div className="text-lg font-bold font-mono text-emerald-400 mt-1 break-all">{formatBitString(converterResults.bin)}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Decimal Value</span>
                        <div className="text-lg font-bold font-mono text-white mt-1 break-all">{converterResults.dec}</div>
                      </div>

                    </div>
                    
                    <div className="h-px bg-slate-850" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="border-b md:border-b-0 md:border-r border-slate-850 pb-4 md:pb-0 md:pr-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Hexadecimal (0x)</span>
                        <div className="text-lg font-bold font-mono text-white mt-1 break-all">0x{converterResults.hex}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Octal (0o)</span>
                        <div className="text-lg font-bold font-mono text-white mt-1 break-all">0o{converterResults.oct}</div>
                      </div>

                    </div>
                  </div>

                  {/* Base equivalence visual table */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Positional Weights Conversion Steps</span>
                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-1">
                      {converterResults.steps.map((s, idx) => (
                        <div key={idx}>{s}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: BIT REGISTER (PROGRAMMER) */}
        {activeTab === "programmer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Bit Register Controller
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {["bin", "dec", "hex", "oct"].map((base) => (
                    <button
                      key={base}
                      onClick={() => setProgrammerBase(base as any)}
                      className={`py-2 text-xs font-bold font-mono rounded-lg border uppercase transition-all ${programmerBase === base ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700"}`}
                    >
                      {base}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input Value (Integers only)</label>
                  <input 
                    type="text" 
                    value={programmerInput}
                    onChange={(e) => setProgrammerInput(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-white tracking-wider focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {progError && (
                  <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold rounded-xl">
                    {progError}
                  </div>
                )}

                <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Word Size Bounds:</span>
                    <span className="font-mono text-slate-500">2^{bitSize} bits</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Min Signed Value:</span>
                    <span className="font-mono text-rose-400">-{Math.pow(2, bitSize - 1)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Max Signed Value:</span>
                    <span className="font-mono text-emerald-400">+{Math.pow(2, bitSize - 1) - 1}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Live Bit Register Map (Click bits to toggle)
              </h3>

              {!programmerResults ? (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl opacity-50">
                  <Binary size={48} className="mb-2 text-slate-500" />
                  <p className="text-sm font-semibold">Enter a value to display register...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Interactive register display */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Register Visual Grid</span>
                      <span className="text-xs text-slate-400 font-mono">Index starts at 0 (Right)</span>
                    </div>

                    <div className="grid grid-cols-8 md:grid-cols-16 gap-1 bg-slate-900 p-3 rounded-xl border border-slate-850">
                      {programmerResults.bin.split("").map((bit, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleBit(idx)}
                          className={`h-10 border transition-all rounded flex flex-col items-center justify-center font-mono ${bit === "1" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700"}`}
                        >
                          <span className="text-xs font-bold leading-none">{bit}</span>
                          <span className="text-[7px] leading-none opacity-45 mt-1">{programmerResults.bin.length - 1 - idx}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">BIN</span>
                      <div className="text-sm font-bold font-mono text-emerald-400 break-all">{formatBitString(programmerResults.bin)}</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">DEC</span>
                      <div className="text-sm font-bold font-mono text-white break-all">{programmerResults.dec}</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">HEX</span>
                      <div className="text-sm font-bold font-mono text-white break-all">0x{programmerResults.hex}</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-center">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">OCT</span>
                      <div className="text-sm font-bold font-mono text-white break-all">0o{programmerResults.oct}</div>
                    </div>
                  </div>

                  {/* CPU Register visualization (registers mapping) */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">CPU Memory / Byte Boundary Alignment</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                      <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex justify-between items-center">
                        <span>Byte [0] (Lower):</span>
                        <span className="font-bold text-white">{formatBitString(programmerResults.bin.substring(programmerResults.bin.length - 8))}</span>
                      </div>
                      {bitSize >= 16 && (
                        <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg flex justify-between items-center">
                          <span>Byte [1] (Upper):</span>
                          <span className="font-bold text-white">{formatBitString(programmerResults.bin.substring(programmerResults.bin.length - 16, programmerResults.bin.length - 8))}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: ASCII / CHARACTER SUPPORT */}
        {activeTab === "ascii" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Text to Binary (ASCII Encoding)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input Characters (Standard text)</label>
                  <textarea 
                    value={asciiText}
                    onChange={(e) => setAsciiText(e.target.value)}
                    rows={4}
                    placeholder="Type words here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-bold text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Each character translates directly into its 8-bit ASCII equivalent binary code.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Binary to Text (ASCII Decoding)
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Input Binary Chunks (Space separated)</label>
                  <textarea 
                    value={asciiBin}
                    onChange={(e) => handleAsciiBinChange(e.target.value)}
                    rows={4}
                    placeholder="e.g. 01000010 01101001 01101110 01100001 01110010 01111001"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-emerald-400 tracking-wider focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Character preview list */}
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Byte-to-Char Mapping Preview</span>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto font-mono text-xs">
                    {asciiBin.trim().split(/\s+/).map((byte, i) => {
                      if (byte.length !== 8) return null;
                      const code = parseInt(byte, 2);
                      const char = isNaN(code) ? "?" : String.fromCharCode(code);
                      return (
                        <div key={i} className="bg-slate-900 border border-slate-850 px-2 py-1 rounded flex gap-1">
                          <span className="text-slate-500">{char}</span>
                          <span className="text-emerald-400 font-bold">{byte}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BOOLEAN LOGIC LEARNING */}
        {activeTab === "boolean" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Logic Gates Selector
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.keys(truthTables).map((gate) => (
                  <button
                    key={gate}
                    onClick={() => setSelectedGate(gate as any)}
                    className={`py-3 text-xs font-bold rounded-xl border transition-all ${selectedGate === gate ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-black" : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700"}`}
                  >
                    {gate} Gate
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 p-5 border border-slate-850 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Gate Description</span>
                <p className="text-sm text-slate-350 leading-relaxed">{gateDescriptions[selectedGate]}</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Truth Table
              </h3>

              <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden shadow-inner">
                <table className="w-full text-left font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 text-xs border-b border-slate-850">
                      <th className="p-4 font-bold uppercase tracking-wider">Input A</th>
                      {selectedGate !== "NOT" && <th className="p-4 font-bold uppercase tracking-wider">Input B</th>}
                      <th className="p-4 font-bold uppercase tracking-wider text-emerald-400">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {truthTables[selectedGate].map((row: any, i: number) => (
                      <tr key={i} className="border-b border-slate-900 last:border-0 hover:bg-slate-900/50 text-sm">
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded font-bold ${row.a === 1 ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-500"}`}>{row.a}</span>
                        </td>
                        {selectedGate !== "NOT" && (
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded font-bold ${row.b === 1 ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-500"}`}>{row.b}</span>
                          </td>
                        )}
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded font-bold ${row.out === 1 ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" : "bg-slate-900 text-slate-500"}`}>{row.out}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: FLOATING POINT IEEE-754 */}
        {activeTab === "float" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> IEEE-754 Single Precision
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Decimal Fraction (float)</label>
                  <input 
                    type="text" 
                    value={floatValue}
                    onChange={(e) => setFloatValue(e.target.value)}
                    placeholder="e.g. 12.375"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono font-bold text-lg text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded inline-block" />
                    <span className="text-slate-400 font-semibold">Sign Bit (1 bit):</span>
                    <span className="text-slate-500 ml-auto font-mono">Bit [31]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded inline-block" />
                    <span className="text-slate-400 font-semibold">Biased Exponent (8 bits):</span>
                    <span className="text-slate-500 ml-auto font-mono">Bits [30-23]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded inline-block" />
                    <span className="text-slate-400 font-semibold">Mantissa / Fraction (23 bits):</span>
                    <span className="text-slate-500 ml-auto font-mono">Bits [22-0]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-4 bg-emerald-500 rounded-full inline-block" /> Bit Layout Visualizer
              </h3>

              {!ieeeFloatResult ? (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl opacity-50">
                  <Binary size={48} className="mb-2 text-slate-500" />
                  <p className="text-sm font-semibold">Enter a fraction to visualize float representation...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Floating Point color map visualizer */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">32-Bit Floating Point Memory Structure</span>
                    
                    <div className="flex flex-col gap-2 font-mono">
                      
                      {/* Visual segmented bar */}
                      <div className="h-8 rounded-lg overflow-hidden flex text-xs font-black shadow-inner">
                        <div className="bg-red-500 flex items-center justify-center text-slate-950 w-[3.1%]">
                          {ieeeFloatResult.sign}
                        </div>
                        <div className="bg-blue-500 flex items-center justify-center text-slate-950 w-[25%] border-l border-slate-900/20">
                          {ieeeFloatResult.exponent}
                        </div>
                        <div className="bg-yellow-500 flex items-center justify-center text-slate-950 w-[71.9%] border-l border-slate-900/20 truncate px-1">
                          {ieeeFloatResult.fraction}
                        </div>
                      </div>

                      {/* Segmentation details */}
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold mt-2">
                        <div className="text-red-400">Sign [1b]</div>
                        <div className="text-blue-400">Exponent [8b]</div>
                        <div className="text-yellow-400">Mantissa [23b]</div>
                      </div>

                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3">Reconstruction Equations</span>
                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-1">
                      {ieeeFloatResult.steps.map((s, idx) => (
                        <div key={idx}>{s}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* LOWER PANEL: COPY AND EXPORT FEATURES / HISTORY */}
      <div className="bg-slate-950 border-t border-slate-850 p-6 md:p-8 flex flex-col md:flex-row gap-8 justify-between items-start">
        
        {/* Run history list */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <History size={16} className="text-slate-400" /> Run History Log
            </h4>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 size={12} /> Clear Log
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-slate-500 font-mono italic">No recent calculations recorded.</p>
          ) : (
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
              {history.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-850 rounded-xl p-3 flex justify-between items-center text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-500 border border-slate-850 font-bold mr-2 uppercase">{item.type}</span>
                    <span className="text-slate-350">{item.expression}</span>
                    <span className="text-slate-500 mx-2">=</span>
                    <span className="text-emerald-400 font-bold">{item.result}</span>
                  </div>
                  <span className="text-[9px] text-slate-600">{item.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export options */}
        <div className="w-full md:w-60 bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-4 shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Export Data</span>
          <div className="grid grid-cols-3 gap-2">
            {(["txt", "json", "csv"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => exportHistory(fmt)}
                className="py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:border-slate-600 transition-colors uppercase"
              >
                {fmt}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 leading-normal">
            Downloads your calculations history locally to your PC.
          </p>
        </div>

      </div>

    </div>
  );
}

// Simple Helper Component
function PlusMinus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
      <path d="M5 19h14" />
    </svg>
  );
}
