export interface StatsResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];
  min: number;
  max: number;
  range: number;
  q1: number;
  q3: number;
  iqr: number;
  variancePop: number;
  varianceSample: number;
  stdDevPop: number;
  stdDevSample: number;
  stdErr: number;
  skewness: number | null;
  kurtosis: number | null;
  sortedData: number[];
  histogramData: { binMin: number; binMax: number; count: number; mid: number }[];
  normalCurveData: { x: number; y: number }[];
  sumOfSquaresPop: number;
  sumOfSquaresSample: number;
}

export async function calculateStats(input: string): Promise<StatsResult | { error: string }> {
  // Wrap in promise to avoid blocking UI immediately, acts like an async web worker wrapper
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // Parse input: handle commas, spaces, newlines
        const rawValues = input
          .replace(/[^\d.,\-eE]/g, ' ') // Allow numbers, dots, commas, negative signs, exponent
          .split(/[\s,]+/)
          .map((s) => Number(s.trim()))
          .filter((n) => !isNaN(n) && n !== null);
          
        const strValues = input.split(/[\s,]+/).map(s => s.trim()).filter(s => s !== '');
        const data = strValues.map(s => Number(s)).filter(n => !isNaN(n));

        if (data.length < 2) {
          return resolve({ error: "Please enter at least 2 valid numbers." });
        }

        const count = data.length;
        const sortedData = [...data].sort((a, b) => a - b);
        
        const sum = data.reduce((acc, val) => acc + val, 0);
        const mean = sum / count;

        // Median
        const mid = Math.floor(count / 2);
        const median = count % 2 === 0 ? (sortedData[mid - 1] + sortedData[mid]) / 2 : sortedData[mid];

        // Mode
        const frequencyMap: Record<number, number> = {};
        let maxFreq = 0;
        data.forEach((val) => {
          frequencyMap[val] = (frequencyMap[val] || 0) + 1;
          if (frequencyMap[val] > maxFreq) maxFreq = frequencyMap[val];
        });
        const mode = Object.keys(frequencyMap)
          .map(Number)
          .filter((k) => frequencyMap[k] === maxFreq);

        const min = sortedData[0];
        const max = sortedData[count - 1];
        const range = max - min;

        // Quartiles (Tukey's method)
        const getMedian = (arr: number[]) => {
          if (arr.length === 0) return 0;
          const m = Math.floor(arr.length / 2);
          return arr.length % 2 === 0 ? (arr[m - 1] + arr[m]) / 2 : arr[m];
        };
        const lowerHalf = sortedData.slice(0, Math.floor(count / 2));
        const upperHalf = sortedData.slice(Math.ceil(count / 2));
        const q1 = getMedian(lowerHalf);
        const q3 = getMedian(upperHalf);
        const iqr = q3 - q1;

        // Variation and Standard Deviation
        let sumSquaredDifferences = 0;
        let sumCubedDifferences = 0;
        let sumFourthDifferences = 0;

        for (let i = 0; i < count; i++) {
          const diff = data[i] - mean;
          sumSquaredDifferences += diff * diff;
          sumCubedDifferences += Math.pow(diff, 3);
          sumFourthDifferences += Math.pow(diff, 4);
        }

        const variancePop = sumSquaredDifferences / count;
        const varianceSample = sumSquaredDifferences / (count - 1);
        const stdDevPop = Math.sqrt(variancePop);
        const stdDevSample = Math.sqrt(varianceSample);
        const stdErr = stdDevSample / Math.sqrt(count);

        // Skewness (Sample)
        let skewness = null;
        if (count > 2 && stdDevSample > 0) {
           skewness = (count * sumCubedDifferences) / ((count - 1) * (count - 2) * Math.pow(stdDevSample, 3));
        }

        // Kurtosis (Sample Excess Kurtosis)
        let kurtosis = null;
        if (count > 3 && stdDevSample > 0) {
          const n = count;
          const s = stdDevSample;
          const k1 = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
          const k2 = sumFourthDifferences / Math.pow(s, 4);
          const k3 = (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
          kurtosis = k1 * k2 - k3;
        }

        // Histogram Data (Sturges' formula calculation)
        const k = Math.ceil(1 + 3.322 * Math.log10(count)) || 5; 
        const binWidth = range === 0 ? 1 : range / k;
        const histogramData: { binMin: number; binMax: number; count: number; mid: number }[] = [];
        for (let i = 0; i < k; i++) {
          const binMin = min + i * binWidth;
          const binMax = i === k - 1 ? max : min + (i + 1) * binWidth;
          histogramData.push({
            binMin,
            binMax,
            mid: binMin + binWidth / 2,
            count: 0
          });
        }
        
        sortedData.forEach(val => {
          for (let i = 0; i < k; i++) {
            if (val >= histogramData[i].binMin && (val < histogramData[i].binMax || (i === k - 1 && val === histogramData[i].binMax))) {
              histogramData[i].count++;
              break;
            }
          }
        });

        // Normal Curve Data
        const normalCurveData = [];
        const curvePoints = 50;
        const curveMin = mean - 3 * stdDevSample;
        const curveMax = mean + 3 * stdDevSample;
        const curveStep = (curveMax - curveMin) / curvePoints;
        
        for (let i = 0; i <= curvePoints; i++) {
          const x = curveMin + i * curveStep;
          if (stdDevSample === 0) break;
          const exponent = -Math.pow((x - mean) / stdDevSample, 2) / 2;
          const y = (1 / (stdDevSample * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
          normalCurveData.push({ x, y });
        }

        resolve({
          count,
          sum,
          mean,
          median,
          mode,
          min,
          max,
          range,
          q1,
          q3,
          iqr,
          variancePop,
          varianceSample,
          stdDevPop,
          stdDevSample,
          stdErr,
          skewness,
          kurtosis,
          sortedData,
          histogramData,
          normalCurveData,
          sumOfSquaresPop: sumSquaredDifferences,
          sumOfSquaresSample: sumSquaredDifferences
        });
      } catch (err: any) {
        resolve({ error: "Calculation failed: " + err.message });
      }
    }, 10); // Small timeout to free the main thread momentarily
  });
}
