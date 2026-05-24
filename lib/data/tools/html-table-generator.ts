import { ToolConfig } from './types';

export const htmlTableGeneratorConfig: ToolConfig = {
  slug: "html-table-generator",
  title: "HTML Table Generator",
  shortDescription: "Visually create, customize, and generate accessible and responsive HTML tables. Import CSV/JSON, configure zebra striping, sticky headers, borders, and colors, and export to HTML, JSX, Tailwind CSS, or Bootstrap.",
  category: "Generators",
  keywords: [
    "html table generator", "responsive table generator", "css table builder", "tailwind table generator",
    "bootstrap table generator", "markdown table converter", "csv to html table", "json to html table",
    "accessible table builder", "wysiwyg table creator", "semantic html tables", "excel to html table",
    "div table generator", "web development tools", "web design utility"
  ],

  longDescription: `
An **HTML Table Generator** is an essential visual utility for frontend developers, content creators, SEO specialists, data analysts, and web designers. In modern web development, representing structured tabular data efficiently while maintaining pixel-perfect styling, mobile responsiveness, semantic validity, and web accessibility can be complex. This tool simplifies that workflow, enabling you to build complex tabular grids visually and instantly generate clean, production-grade markup in standard HTML, React JSX, Tailwind CSS, Bootstrap, or Markdown.

---

### The Evolution of Tabular Data on the Web

In the early eras of web development, HTML tables were widely misused as layout grids for entire web page structures. This practice led to fragile, non-semantic code, and created massive accessibility barriers for users relying on assistive technologies. 

With the advent of modern CSS layouts like Flexbox and Grid, the \`<table>\` element reclaimed its rightful role: a specialized, semantic container exclusively dedicated to displaying multidimensional datasets. Whether you are presenting product pricing sheets, server logs, financial projections, analytics dashboard parameters, or comparison grids, semantic table elements communicate structure and relationships to search engines and screen readers alike.

Using this visual table generator ensures that your tables adhere to the latest Web Content Accessibility Guidelines (WCAG), render lightning-fast on mobile devices, and integrate easily with any component-based UI framework.

---

### Anatomy of a Semantic HTML Table

A properly structured table is more than just nested rows (\`<tr>\`) and data cells (\`<td>\`). True semantic HTML tables rely on a hierarchy of elements that group content logically:

1. **\`<table>\`**: The root wrapper that defines the start of tabular contents.
2. **\`<caption>\`**: Acts as the table's header or description, which is crucial for accessibility. It provides screen-reader users with immediate context about the table's purpose.
3. **\`<thead>\`**: Groups the header content. In desktop browsers, this enables table headers to remain visible when printing long tables spanning multiple pages.
4. **\`<tbody>\`**: Contains the core body data of the table.
5. **\`<tfoot>\`**: Houses the summary, totals, or footer notes.
6. **\`<th>\`**: Defines a header cell, which can represent a column or a row.
7. **\`<td>\`**: The standard data container cell.

Furthermore, accessible tables must employ the **\`scope\` attribute** on header cells (\`<th scope=\"col\">\` or \`<th scope=\"row\">\`). The \`scope\` attribute explicitly informs screen readers whether a header cell governs the column below it or the row to its right, facilitating seamless non-visual navigation. Our generator automatically writes these scope elements into the generated HTML.

---

### Designing Responsive and Mobile-Friendly Tables

One of the greatest challenges in responsive web design is fitting wide, multi-column tables onto narrow mobile viewports. If left unmanaged, tables force horizontal scrolling on the entire page or overflow their parent containers, ruining the user experience.

Our generator supports four distinct responsive modes to handle this:

#### 1. Standard Responsive (Container Scroll)
This wraps the table in a container with \`overflow-x: auto\`. The table maintains its layout proportions, but users can swipe horizontally to scroll through columns. This is the safest approach for highly complex datasets with many columns, where the grid layout must remain intact.

#### 2. Scrollable Table (Fixed Heights)
This fixes the height of the table and pins the headers using CSS sticky positioning. It is ideal for large datasets, allowing users to scroll vertically through hundreds of rows while keeping the headers constantly visible at the top.

#### 3. Stacked Mobile Layout
Using CSS media queries, this mode transforms table cells from table layout elements to block-level elements (\`display: block\`) on smaller viewports. Headers are hidden, and each cell is stacked vertically. To maintain context, CSS \`attr()\` functions or data properties can insert the header names dynamically next to the cell contents.

#### 4. Card-Style Mobile Layout
On mobile viewports, rows are collapsed into individual, visually isolated cards. Each card displays cell items in a structured list. On desktop viewports, they seamlessly expand back into a standard horizontal table layout. This is perfect for product comparisons or admin dashboards.

---

### Customizing Styles with Modern Frameworks

Designing raw CSS styles for tables can be tedious, requiring extensive reset overrides, border collapses, and padding adjustments. This generator compiles code for the industry's most popular styling frameworks:

#### Tailwind CSS Table Design
Tailwind CSS provides clean utility classes that style tables with zero bloat. By selecting the Tailwind tab, you receive code structured with classes like:
- \`table-auto\` or \`table-fixed\` for layout control.
- \`border-collapse\` to combine adjacent borders.
- \`divide-y divide-slate-200\` to draw thin divider lines between rows.
- \`bg-slate-50 even:bg-white\` for quick zebra-striping configurations.
- \`sticky top-0\` combined with \`z-10 bg-white\` for high-performance sticky headers.

#### Bootstrap Table Layouts
Bootstrap uses semantic class hierarchies like \`table\`, \`table-striped\`, \`table-bordered\`, \`table-hover\`, and \`table-sm\`. The Bootstrap exporter generates clean HTML utilizing these structural class systems, ensuring drop-in compatibility with any standard Bootstrap theme.

---

### Web Accessibility (A11y) & WCAG-Friendly Output

Accessibility should never be an afterthought. According to WCAG 2.1, tables must be navigable via keyboard commands and read correctly by screen readers (like JAWS, NVDA, or VoiceOver). Key factors integrated into our generator's core code output include:

- **Correct Use of Headers**: Headings are declared via \`<th>\`, never styled \`<td>\` cells.
- **Explicit Spanning**: When columns or rows are merged, \`colspan\` and \`rowspan\` attributes are computed dynamically, and the spanned cells are correctly omitted from the DOM to avoid skewing screen reader navigation vectors.
- **Color Contrast Guidelines**: Standard design configurations maintain proper contrast ratios between text and background colors, ensuring readability for users with low vision.
- **ARIA Roles**: Where custom JavaScript grids simulate table structures (e.g. div-based grids), appropriate ARIA roles like \`role=\"table\"\`, \`role=\"row\"\`, and \`role=\"cell\"\` are provided to describe the element relationships to assistive technologies.

---

### Visual Merging, Splitting, and Cell Management

Traditional table generation utilities limit you to plain rectangular grids. When designing pricing comparisons (where a single header spans three columns) or timetables (where an event spans two hours vertically), managing \`colspan\` and \`rowspan\` manually in HTML is error-prone. One misplaced index can corrupt the entire table structure.

Our **Visual Table Builder** features an intuitive interactive canvas. By selecting a cell, you can:
- **Merge Right**: Spans the cell horizontally across adjacent columns.
- **Merge Down**: Spans the cell vertically across multiple rows.
- **Split Cell**: Instantly dissolves any active spanning, restoring the cells back to a basic grid.

---

### Data Import & Export Workflows

Manual copy-pasting is slow and frustrating. The generator features an advanced parsing suite to automate raw data ingestion:
- **CSV & TSV**: Paste raw comma-separated or tab-separated variables (e.g., copied directly from Excel, Google Sheets, or LibreOffice Calc) and watch the generator instantly convert it into editable visual cells.
- **JSON Objects**: Import lists of JSON objects. The engine reads structural keys as table headers and values as row inputs.
- **Flexible Exporters**: Instantly download your generated structure as a raw HTML file, copy it as a reusable React component, copy markdown code for GitHub readmes, or download raw CSV spreadsheets.
  `,

  features: [
    "Interactive Visual Grid Editor with row and column addition, deletion, and reordering.",
    "Visual Merge & Split mechanics: Easily manage complex colspan and rowspan values with a click.",
    "Comprehensive Styling Controls: Fine-tune borders, padding, text alignments, hover states, and shadow effects.",
    "Framework Support: Generates pure semantic HTML, React JSX, Tailwind CSS, Bootstrap, and Markdown table syntax.",
    "Data Integration: Seamlessly import files or clipboard data formatted in CSV, TSV, JSON, and Excel grids.",
    "Live Responsive Preview: Toggle between Desktop, Tablet, and Mobile views in a resizable container frame.",
    "Predefined Templates: Standard layouts for pricing cards, product tables, schedules, dashboard reporting, and comparisons.",
    "History & Drafts: Automatic client-side drafts with a project history manager to save and reload work.",
    "Accessibility Audits: Built-in validation warning indicators for missing headers, captions, or invalid spans."
  ],

  useCases: [
    "Web Developers needing rapid Tailwind, JSX, or Bootstrap table snippets.",
    "Bloggers and Marketers wanting clean, SEO-friendly HTML tables for CMS platforms like WordPress or Webflow.",
    "Data Analysts converting raw JSON/CSV dumps into visually stunning web representations.",
    "Product Managers creating visual feature comparisons or subscription pricing tiers.",
    "Technical Writers generating Markdown tables for documentation repositories on GitHub.",
    "Students and Teachers mapping out class schedules, tables, and timetables."
  ],

  howToSteps: [
    "Set the initial grid size using the Row and Column sliders, or select one of our preloaded presets.",
    "Type data directly into the table cells. Click on any header cell to customize the column title.",
    "Select any cell to access the control panel. Use 'Merge Right' or 'Merge Down' to span columns or rows.",
    "Use the layout sidebar to choose colors, borders, font weights, zebra striping, and cell padding settings.",
    "Toggle the responsive preview buttons to see how the table renders on Desktop, Tablet, and Mobile devices.",
    "Switch the generated code framework tab (HTML, Tailwind, JSX, Markdown) to match your stack.",
    "Click 'Copy Code' or 'Download' to export your generated table. Save your draft locally if you want to edit it later."
  ],

  examples: [
    {
      title: "Pricing Comparison Table (Tailwind)",
      description: "Visual features pricing matrix with highlighted subscription packages styled in Tailwind CSS.",
      input: "Preset: Pricing Table (3 columns, 4 rows)",
      output: `<div class="overflow-x-auto rounded-lg shadow-md">
  <table class="w-full text-sm text-left text-slate-500 border-collapse">
    <thead class="text-xs text-white uppercase bg-[#518231]">
      <tr>
        <th scope="col" class="px-6 py-3">Feature</th>
        <th scope="col" class="px-6 py-3">Basic ($9/mo)</th>
        <th scope="col" class="px-6 py-3 bg-green-700">Pro ($29/mo)</th>
      </tr>
    </thead>
    <tbody class="bg-white">
      <tr class="border-b border-slate-100">
        <th scope="row" class="px-6 py-4 font-medium text-slate-900">Storage</th>
        <td class="px-6 py-4">10 GB</td>
        <td class="px-6 py-4 bg-green-50/30">100 GB</td>
      </tr>
      <tr class="border-b border-slate-100 bg-slate-50/50">
        <th scope="row" class="px-6 py-4 font-medium text-slate-900">Support</th>
        <td class="px-6 py-4">Email</td>
        <td class="px-6 py-4 bg-green-50/30">24/7 Priority</td>
      </tr>
    </tbody>
  </table>
</div>`
    },
    {
      title: "Markdown Table Syntax",
      description: "Simplified markdown table representation for readme documentation files.",
      input: "Export Format: Markdown",
      output: `| Product | Price | Stock | Rating |
| :--- | :---: | :---: | :---: |
| Wireless Headphones | $99.00 | In Stock | ⭐ 4.8 |
| Smart Watch | $199.50 | Out of Stock | ⭐ 4.5 |
| Bluetooth Speaker | $49.00 | Low Stock | ⭐ 4.2 |`
    },
    {
      title: "React JSX Semantic Table",
      description: "React component utilizing JSX layout standards, complete with accessibility properties.",
      input: "Format: React JSX",
      output: `import React from 'react';

export default function MyTable() {
  return (
    <div className="table-container">
      <table className="custom-table" aria-label="Product Analytics">
        <caption>Monthly Sales Figures</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Units Sold</th>
            <th scope="col">Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">January</th>
            <td>1,200</td>
            <td>$24,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}`
    }
  ],

  faq: [
    {
      question: "What is an HTML table generator?",
      answer: "An HTML table generator is an interactive visual tool that lets you design table structures, edit cells, customize border spacing, zebra stripes, padding, and colors, and copy the resulting HTML/CSS markup instantly."
    },
    {
      question: "How do I make my tables mobile-friendly?",
      answer: "You can use responsive table modes. The standard approach is wrapping the table in a container with 'overflow-x: auto' to enable horizontal swiping. Alternatively, you can stack rows into cards on smaller viewports using block displays."
    },
    {
      question: "Can I export my table directly into Tailwind CSS projects?",
      answer: "Yes, our exporter generates code compiled with Tailwind CSS utility classes. Simply switch to the 'Tailwind' tab to copy ready-to-paste responsive tables."
    },
    {
      question: "Is the generated HTML table markup accessible?",
      answer: "Yes, our tool generates semantic table structures including scope attributes (scope='col' and scope='row') for headers, captures captions, and formats tables using standard visual structures that assist screen readers."
    },
    {
      question: "How can I copy data from an Excel spreadsheet or Google Sheets?",
      answer: "Simply select your rows and columns in Excel or Google Sheets, copy them to your clipboard, click 'Import Data' in our tool, and paste them into the pasted data box. The tool automatically parses the tab-separated clipboard data."
    },
    {
      question: "How do I merge multiple cells together?",
      answer: "Click on any cell in our Visual Builder to select it. In the cell configuration menu, click 'Merge Right' to combine the cell with its right neighbor, or 'Merge Down' to combine it with the cell below."
    },
    {
      question: "Can I generate React components for Next.js?",
      answer: "Yes, the React JSX and Next.js exporter tabs generate fully valid, JSX-compliant code where HTML attributes are converted to React naming conventions (like class to className) and self-closing tags are resolved."
    },
    {
      question: "How can I make my table headers sticky during scrolling?",
      answer: "Toggle the 'Sticky Header' option in the styling panel. This applies sticky positioning styles to the header row so it pins to the top of the table container as you scroll."
    },
    {
      question: "Is my table data uploaded to a server?",
      answer: "No, all operations, including data imports, style changes, code generation, and project auto-saving, run locally in your browser. Your data is 100% private and secure."
    },
    {
      question: "Can I export my table to a Markdown file?",
      answer: "Yes. In the exports section, click the 'Markdown' tab to generate a standard GFM (GitHub Flavored Markdown) table code snippet, which you can easily paste into Markdown files."
    }
  ],

  relatedTools: [
    { name: "CSV Viewer", slug: "csv-viewer" },
    { name: "Markdown Previewer", slug: "markdown-previewer" },
    { name: "HTML Formatter & Validator", slug: "html-formatter" },
    { name: "CSS Beautifier", slug: "css-beautifier" },
    { name: "JSON Formatter & Validator", slug: "json-formatter" },
    { name: "API Mock Data Generator", slug: "api-mock-data-generator" }
  ]
};
