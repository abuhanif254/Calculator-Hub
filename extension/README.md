# Nexus Calculator & Converter Hub — Browser Extension (Manifest V3)

Official browser extension for Google Chrome, Microsoft Edge, Brave, and other Chromium browsers, connecting users directly to [Nexus Calculator Hub](https://www.nexuscalculator.net).

---

## Features

1. **Smart Scientific & Standard Calculator**:
   - Fast arithmetic with keyboard shortcuts (`Enter` to calculate, `Esc` to clear, `⌫` to backspace).
   - Real-time expression preview and syntax validation.
   - 25-item local calculation history with one-click restoration and copy-to-clipboard.
   - Scientific operations (`√`, `^`, `%`, `π`, `e`, parentheses).

2. **Smart Multi-Category Unit Converter**:
   - **Length**: Meters, Kilometers, Centimeters, Millimeters, Inches, Feet, Yards, Miles.
   - **Weight / Mass**: Kilograms, Grams, Milligrams, Pounds, Ounces, Metric Tons.
   - **Temperature**: Celsius, Fahrenheit, Kelvin.
   - **Speed**: km/h, mph, m/s, Knots.
   - **Digital Storage**: Bytes, KB, MB, GB, TB.
   - One-click unit swapping and live equivalence formula display.

3. **Quick Developer Utilities**:
   - **JSON Formatter & Minifier**: Instant syntax validation with indentation or minification.
   - **Base64 Encoder & Decoder**: Text and payload translation.
   - **Unix Epoch Clock**: Live counter for seconds, milliseconds, and UTC string with 1-click copy.
   - **UUID v4 Generator**: Fast cryptographically random UUID generation.

4. **Nexus Hub Quick Search**:
   - Instant search across 100+ calculators (Mortgage, Auto Loan, Compound Interest, BMI, Calorie, Percentage, Tax, etc.).
   - One-click direct link to the calculation tool on `nexuscalculator.net`.

5. **Omnibox Address Bar Integration**:
   - Type `nx` in your browser address bar and press `Space` or `Tab`.
   - Type any math expression (e.g. `nx 1200 * 1.07^5` or `nx 500 / 4`) to see the live calculated answer.
   - Type any tool keyword (e.g. `nx mortgage` or `nx bmi`) to open the calculator directly.

---

## Local Development & Testing

### How to Load Unpacked in Google Chrome / Brave:
1. Open Google Chrome or Brave and navigate to `chrome://extensions/`.
2. Toggle on **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left corner.
4. Select the `extension/` folder inside the `Calculator-Hub` repository.
5. The extension icon will appear in your browser extensions toolbar! Click to pin it.

### How to Load Unpacked in Microsoft Edge:
1. Open Microsoft Edge and navigate to `edge://extensions/`.
2. Turn on **Developer mode** in the left sidebar.
3. Click **Load unpacked** at the top.
4. Select the `extension/` folder.

---

## Packaging for Store Submission

To create a production-ready `.zip` archive ready for store upload:

```bash
npm run extension:pack
```

This generates `dist-extension/nexus-calculator-extension-v1.0.0.zip` (compressed and optimized).

---

## Publishing Checklist

### Google Chrome Web Store:
1. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2. Pay the one-time $5 developer registration fee (if not already registered).
3. Click **New Item** and upload `dist-extension/nexus-calculator-extension-v1.0.0.zip`.
4. Fill in store listing details:
   - **Title**: Nexus Calculator & Converter Hub
   - **Summary**: Smart scientific calculator, unit converter, dev tools, and instant access to 100+ tools on nexuscalculator.net.
   - **Category**: Productivity / Tools.
   - **Privacy Policy**: Link to `https://www.nexuscalculator.net/en/privacy-policy`.
5. Submit for review (Manifest V3 with zero tracking reviews typically approve within 24–48 hours).

### Microsoft Edge Add-ons:
1. Go to the [Microsoft Partner Center](https://partner.microsoft.com/dashboard/microsoftedge).
2. Click **Create new extension** and upload the same `.zip` file.
3. Complete listing details and submit.
