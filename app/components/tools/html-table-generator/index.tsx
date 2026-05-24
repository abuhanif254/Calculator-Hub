"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Plus, Trash2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Maximize2, Minimize2, Monitor, Tablet, Smartphone, Copy, Check,
  Download, RotateCcw, FileSpreadsheet, FileJson, AlertCircle, Save,
  Search, ArrowUpDown, LayoutGrid, Undo
} from 'lucide-react';

interface Cell {
  id: string;
  content: string;
  colSpan: number;
  rowSpan: number;
  isMerged: boolean;
  mergedInto?: [number, number]; // [rowIndex, colIndex]
}

interface ColumnHeader {
  id: string;
  text: string;
  width?: string; // e.g., 'auto', '120px', '25%'
}

interface TableRow {
  id: string;
  cells: Cell[];
}

interface SavedProject {
  id: string;
  name: string;
  updatedAt: string;
  headers: ColumnHeader[];
  rows: TableRow[];
  tableCaption: string;
  showHeader: boolean;
  showFooter: boolean;
  responsiveMode: 'standard' | 'scrollable' | 'stacked' | 'card';
  borderStyle: 'none' | 'outline' | 'all' | 'horizontal' | 'vertical';
  paddingSize: 'compact' | 'comfortable' | 'spacious';
  alignment: 'left' | 'center' | 'right';
  fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  zebraStriping: 'none' | 'odd' | 'even';
  hoverEffects: boolean;
  stickyHeader: boolean;
  stickyFirstColumn: boolean;
  roundedCorners: boolean;
  shadowType: 'none' | 'sm' | 'md' | 'lg';
  headerBgColor: string;
  headerTextColor: string;
  rowBgColor: string;
  rowTextColor: string;
  altRowBgColor: string;
  borderColor: string;
  customColorsEnabled: boolean;
}

interface TablePreset {
  name: string;
  headers: string[];
  rows: string[][];
  borderStyle: string;
  paddingSize: string;
  zebraStriping: string;
  hoverEffects: boolean;
  customColorsEnabled: boolean;
  headerBgColor?: string;
  headerTextColor?: string;
  rowBgColor?: string;
  rowTextColor?: string;
  altRowBgColor?: string;
  borderColor?: string;
  shadowType?: string;
  roundedCorners?: boolean;
}

// 8 Beautiful Presets
const PRESETS: Record<string, TablePreset> = {
  pricing: {
    name: "Pricing Table",
    headers: ["Package", "Basic Plan", "Pro Plan", "Enterprise"],
    rows: [
      ["Monthly Price", "$9.99", "$29.99", "$99.99"],
      ["Storage Space", "10 GB Cloud", "100 GB Cloud", "1 TB Dedicated"],
      ["Email Accounts", "5 Accounts", "Unlimited", "Unlimited"],
      ["Priority Support", "❌ No", "✔️ 24/7 Email", "✔️ 24/7 Phone & Slack"],
      ["API Integration", "❌ No", "✔️ Rest API Only", "✔️ Custom Integrations"]
    ],
    borderStyle: "outline",
    paddingSize: "comfortable",
    zebraStriping: "none",
    hoverEffects: true,
    customColorsEnabled: true,
    headerBgColor: "#518231",
    headerTextColor: "#ffffff",
    rowBgColor: "#ffffff",
    rowTextColor: "#1e293b",
    altRowBgColor: "#f8fafc",
    borderColor: "#e2e8f0",
    shadowType: "md",
    roundedCorners: true
  },
  comparison: {
    name: "Product Comparison",
    headers: ["Specs / Features", "iPhone 15 Pro", "Galaxy S24 Ultra", "Pixel 8 Pro"],
    rows: [
      ["Screen Size", '6.1" OLED', '6.8" AMOLED', '6.7" OLED'],
      ["Camera Megapixels", "48 MP Main", "200 MP Main", "50 MP Main"],
      ["Battery Capacity", "3,274 mAh", "5,000 mAh", "5,050 mAh"],
      ["Processor", "A17 Pro Chip", "Snapdragon 8 Gen 3", "Google Tensor G3"],
      ["Operating System", "iOS 17", "Android 14 (OneUI)", "Android 14 (Stock)"]
    ],
    borderStyle: "all",
    paddingSize: "comfortable",
    zebraStriping: "odd",
    hoverEffects: true,
    customColorsEnabled: false,
    shadowType: "sm",
    roundedCorners: false
  },
  catalog: {
    name: "Product Catalog",
    headers: ["SKU", "Item Description", "Category", "Inventory", "Unit Cost"],
    rows: [
      ["APP-109", "Premium Wireless Earbuds", "Electronics", "240 items", "$49.50"],
      ["HOM-551", "Ergonomic Memory Foam Pillow", "Home Goods", "85 items", "$22.00"],
      ["OFF-312", "Bamboo Desktop Organizer", "Office", "12 items", "$18.75"],
      ["SPO-903", "Stainless Insulated Tumbler", "Sports & Outdoors", "410 items", "$9.90"]
    ],
    borderStyle: "horizontal",
    paddingSize: "compact",
    zebraStriping: "even",
    hoverEffects: true,
    customColorsEnabled: false,
    shadowType: "none",
    roundedCorners: false
  },
  financial: {
    name: "Financial Summary",
    headers: ["Quarter", "Total Revenue", "Operating Expenses", "Net Cashflow", "Profit Margin"],
    rows: [
      ["Q1 2026", "$182,500", "$94,200", "+$88,300", "48.3%"],
      ["Q2 2026", "$204,100", "$110,800", "+$93,300", "45.7%"],
      ["Q3 2026", "$198,000", "$101,500", "+$96,500", "48.7%"],
      ["Q4 2026", "$245,600", "$125,000", "+$120,600", "49.1%"],
      ["Total (YTD)", "$830,200", "$431,500", "+$398,700", "48.0%"]
    ],
    borderStyle: "horizontal",
    paddingSize: "comfortable",
    zebraStriping: "none",
    hoverEffects: true,
    customColorsEnabled: true,
    headerBgColor: "#0f172a",
    headerTextColor: "#ffffff",
    rowBgColor: "#ffffff",
    rowTextColor: "#0f172a",
    altRowBgColor: "#f1f5f9",
    borderColor: "#cbd5e1",
    shadowType: "sm",
    roundedCorners: true
  },
  timetable: {
    name: "School Timetable",
    headers: ["Period / Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rows: [
      ["09:00 - 10:15", "Mathematics", "Biology Lab", "English Literature", "World History", "Physics Lecture"],
      ["10:15 - 10:45", "Coffee Break", "Coffee Break", "Coffee Break", "Coffee Break", "Coffee Break"],
      ["10:45 - 12:00", "Computer Science", "Physics Seminar", "Chemistry Practicum", "Creative Writing", "Physical Education"],
      ["12:00 - 13:00", "Lunch Hour", "Lunch Hour", "Lunch Hour", "Lunch Hour", "Lunch Hour"],
      ["13:00 - 14:15", "Statistics", "Art Appreciation", "Library Hours", "Social Studies", "Team Project Presentation"]
    ],
    borderStyle: "all",
    paddingSize: "comfortable",
    zebraStriping: "none",
    hoverEffects: false,
    customColorsEnabled: true,
    headerBgColor: "#3b82f6",
    headerTextColor: "#ffffff",
    rowBgColor: "#ffffff",
    rowTextColor: "#1e293b",
    altRowBgColor: "#eff6ff",
    borderColor: "#93c5fd",
    shadowType: "md",
    roundedCorners: true
  },
  analytics: {
    name: "Analytics Traffic",
    headers: ["Page URL", "Monthly Pageviews", "Unique Users", "Avg. Time on Page", "Bounce Rate"],
    rows: [
      ["/home", "142,500", "98,300", "1m 45s", "41.2%"],
      ["/tools/json-formatter", "84,100", "64,200", "3m 12s", "24.5%"],
      ["/tools/api-mock-data-generator", "55,200", "41,000", "4m 50s", "18.3%"],
      ["/tools/html-table-generator", "32,900", "25,100", "5m 24s", "15.9%"],
      ["/blog/responsive-design", "12,400", "8,900", "2m 10s", "72.4%"]
    ],
    borderStyle: "vertical",
    paddingSize: "compact",
    zebraStriping: "even",
    hoverEffects: true,
    customColorsEnabled: false,
    shadowType: "none",
    roundedCorners: false
  },
  admin: {
    name: "Admin Dashboard Users",
    headers: ["User Account", "Designated Role", "System Status", "Security Level", "Last Activity"],
    rows: [
      ["Alice Vance", "Administrator", "Active", "Level 5", "Just Now"],
      ["Robert Miller", "Content Editor", "Active", "Level 3", "12 Mins Ago"],
      ["Sarah Jenkins", "Database Manager", "Maintenance", "Level 4", "1 Hour Ago"],
      ["Thomas Crate", "Security Analyst", "Suspended", "Level 4", "2 Days Ago"]
    ],
    borderStyle: "outline",
    paddingSize: "spacious",
    zebraStriping: "odd",
    hoverEffects: true,
    customColorsEnabled: true,
    headerBgColor: "#0284c7",
    headerTextColor: "#ffffff",
    rowBgColor: "#ffffff",
    rowTextColor: "#0f172a",
    altRowBgColor: "#f0f9ff",
    borderColor: "#e0f2fe",
    shadowType: "lg",
    roundedCorners: true
  },
  seo: {
    name: "SEO Competitor Matrix",
    headers: ["Target Website", "Domain Rating (DR)", "Referring Domains", "Monthly Organic Hits", "Core Keywords"],
    rows: [
      ["Our Platform (nexuscalculator.net)", "68", "12,400", "450K clicks", "4,200 top 10"],
      ["Competitor Alpha Site", "72", "28,500", "620K clicks", "5,100 top 10"],
      ["Competitor Beta Site", "54", "4,100", "110K clicks", "1,400 top 10"],
      ["Competitor Gamma Directory", "45", "1,800", "45K clicks", "600 top 10"]
    ],
    borderStyle: "all",
    paddingSize: "comfortable",
    zebraStriping: "none",
    hoverEffects: true,
    customColorsEnabled: false,
    shadowType: "md",
    roundedCorners: true
  }
};

const DEFAULT_HEADERS: ColumnHeader[] = [
  { id: "col-0", text: "Product Name" },
  { id: "col-1", text: "Category" },
  { id: "col-2", text: "Status" },
  { id: "col-3", text: "Price" }
];

const DEFAULT_ROWS: TableRow[] = [
  {
    id: "row-0",
    cells: [
      { id: "cell-0-0", content: "Wireless Earbuds", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-0-1", content: "Electronics", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-0-2", content: "In Stock", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-0-3", content: "$59.99", colSpan: 1, rowSpan: 1, isMerged: false }
    ]
  },
  {
    id: "row-1",
    cells: [
      { id: "cell-1-0", content: "Running Shoes", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-1-1", content: "Apparel", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-1-2", content: "In Stock", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-1-3", content: "$89.50", colSpan: 1, rowSpan: 1, isMerged: false }
    ]
  },
  {
    id: "row-2",
    cells: [
      { id: "cell-2-0", content: "Ergonomic Desk", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-2-1", content: "Furniture", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-2-2", content: "Out of Stock", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-2-3", content: "$299.00", colSpan: 1, rowSpan: 1, isMerged: false }
    ]
  },
  {
    id: "row-3",
    cells: [
      { id: "cell-3-0", content: "Smart Watch", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-3-1", content: "Electronics", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-3-2", content: "Low Stock", colSpan: 1, rowSpan: 1, isMerged: false },
      { id: "cell-3-3", content: "$189.99", colSpan: 1, rowSpan: 1, isMerged: false }
    ]
  }
];

export function HtmlTableGeneratorTool() {

  // Basic table sizes
  const [colsCount, setColsCount] = useState(4);
  const [rowsCount, setRowsCount] = useState(4);

  // Core Data State
  const [headers, setHeaders] = useState<ColumnHeader[]>(DEFAULT_HEADERS);
  const [rows, setRows] = useState<TableRow[]>(DEFAULT_ROWS);
  
  // Table Options
  const [tableCaption, setTableCaption] = useState("Sales Overview");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [responsiveMode, setResponsiveMode] = useState<'standard' | 'scrollable' | 'stacked' | 'card'>('standard');

  // Styling Details
  const [borderStyle, setBorderStyle] = useState<'none' | 'outline' | 'all' | 'horizontal' | 'vertical'>('all');
  const [paddingSize, setPaddingSize] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [fontSize, setFontSize] = useState<'xs' | 'sm' | 'base' | 'lg' | 'xl'>('base');
  const [fontWeight, setFontWeight] = useState<'normal' | 'medium' | 'semibold' | 'bold'>('normal');
  const [zebraStriping, setZebraStriping] = useState<'none' | 'odd' | 'even'>('odd');
  const [hoverEffects, setHoverEffects] = useState(true);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [stickyFirstColumn, setStickyFirstColumn] = useState(false);
  const [roundedCorners, setRoundedCorners] = useState(true);
  const [shadowType, setShadowType] = useState<'none' | 'sm' | 'md' | 'lg'>('sm');

  // Color Palette Selection
  const [customColorsEnabled, setCustomColorsEnabled] = useState(false);
  const [headerBgColor, setHeaderBgColor] = useState('#518231');
  const [headerTextColor, setHeaderTextColor] = useState('#ffffff');
  const [rowBgColor, setRowBgColor] = useState('#ffffff');
  const [rowTextColor, setRowTextColor] = useState('#0f172a');
  const [altRowBgColor, setAltRowBgColor] = useState('#f8fafc');
  const [borderColor, setBorderColor] = useState('#cbd5e1');

  // Interactive Selection State
  const [activeCell, setActiveCell] = useState<{ r: number, c: number } | null>(null);
  
  // Preview Responsive state
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewSearch, setPreviewSearch] = useState('');
  const [previewSortCol, setPreviewSortCol] = useState<number | null>(null);
  const [previewSortAsc, setPreviewSortAsc] = useState(true);
  const [previewPage, setPreviewPage] = useState(1);
  const itemsPerPage = 3;

  // Framework output selection
  const [activeTab, setActiveTab] = useState<'html' | 'tailwind' | 'jsx' | 'bootstrap' | 'markdown' | 'json' | 'csv'>('html');
  const [copied, setCopied] = useState(false);

  // History & Projects Management
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [newProjectName, setNewProjectName] = useState("");

  // Import State
  const [importText, setImportText] = useState("");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Validation Warnings
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // ────────────────────────────────────────────────────────
  // INIT DEFAULT DATA OR REHYDRATE FROM LOCALSTORAGE
  // ────────────────────────────────────────────────────────
  
  // Build Grid from sizes
  const buildInitialGrid = (rCount: number, cCount: number) => {
    const hArr = Array.from({ length: cCount }).map((_, i) => ({
      id: `col-${i}-${Date.now()}`,
      text: i === 0 ? "Product Name" : i === 1 ? "Category" : i === 2 ? "Status" : `Metric ${i}`
    }));

    const defaultCellValues = [
      ["Wireless Earbuds", "Electronics", "In Stock", "$59.99"],
      ["Running Shoes", "Apparel", "In Stock", "$89.50"],
      ["Ergonomic Desk", "Furniture", "Out of Stock", "$299.00"],
      ["Smart Watch", "Electronics", "Low Stock", "$189.99"]
    ];

    const rArr = Array.from({ length: rCount }).map((_, rIdx) => {
      const cells = Array.from({ length: cCount }).map((_, cIdx) => ({
        id: `cell-${rIdx}-${cIdx}-${Date.now()}`,
        content: defaultCellValues[rIdx]?.[cIdx] ?? `Value ${rIdx + 1},${cIdx + 1}`,
        colSpan: 1,
        rowSpan: 1,
        isMerged: false
      }));
      return {
        id: `row-${rIdx}-${Date.now()}`,
        cells
      };
    });

    setHeaders(hArr);
    setRows(rArr);
  };

  // Rehydrate on load
  useEffect(() => {
    // 1) Try to restore autosaved draft
    const autosave = localStorage.getItem('html_table_generator_autosave');
    if (autosave) {
      try {
        const parsed = JSON.parse(autosave);
        setHeaders(parsed.headers);
        setRows(parsed.rows);
        setTableCaption(parsed.tableCaption);
        setShowHeader(parsed.showHeader);
        setShowFooter(parsed.showFooter);
        setResponsiveMode(parsed.responsiveMode);
        setBorderStyle(parsed.borderStyle);
        setPaddingSize(parsed.paddingSize);
        setAlignment(parsed.alignment);
        setFontSize(parsed.fontSize);
        setFontWeight(parsed.fontWeight);
        setZebraStriping(parsed.zebraStriping);
        setHoverEffects(parsed.hoverEffects);
        setStickyHeader(parsed.stickyHeader);
        setStickyFirstColumn(parsed.stickyFirstColumn);
        setRoundedCorners(parsed.roundedCorners);
        setShadowType(parsed.shadowType);
        setCustomColorsEnabled(parsed.customColorsEnabled);
        setHeaderBgColor(parsed.headerBgColor);
        setHeaderTextColor(parsed.headerTextColor);
        setRowBgColor(parsed.rowBgColor);
        setRowTextColor(parsed.rowTextColor);
        setAltRowBgColor(parsed.altRowBgColor);
        setBorderColor(parsed.borderColor);
        setRowsCount(parsed.rows.length);
        setColsCount(parsed.headers.length);
      } catch (e) {
        // Fallback is implicit since state is already DEFAULT_HEADERS/DEFAULT_ROWS
      }
    }

    // 2) Load saved projects
    const projects = localStorage.getItem('html_table_generator_projects');
    if (projects) {
      try {
        setSavedProjects(JSON.parse(projects));
      } catch (e) {}
    }
  }, []);

  // Autosave when data state changes
  useEffect(() => {
    if (rows.length === 0 || headers.length === 0) return;
    const saveState = {
      headers, rows, tableCaption, showHeader, showFooter, responsiveMode,
      borderStyle, paddingSize, alignment, fontSize, fontWeight, zebraStriping,
      hoverEffects, stickyHeader, stickyFirstColumn, roundedCorners, shadowType,
      customColorsEnabled, headerBgColor, headerTextColor, rowBgColor, rowTextColor,
      altRowBgColor, borderColor
    };
    localStorage.setItem('html_table_generator_autosave', JSON.stringify(saveState));
    
    // Check validation errors dynamically
    runValidation();
  }, [
    headers, rows, tableCaption, showHeader, showFooter, responsiveMode,
    borderStyle, paddingSize, alignment, fontSize, fontWeight, zebraStriping,
    hoverEffects, stickyHeader, stickyFirstColumn, roundedCorners, shadowType,
    customColorsEnabled, headerBgColor, headerTextColor, rowBgColor, rowTextColor,
    altRowBgColor, borderColor
  ]);

  // ────────────────────────────────────────────────────────
  // PRESETS LOADER
  // ────────────────────────────────────────────────────────
  const handleApplyPreset = (key: keyof typeof PRESETS) => {
    const preset = PRESETS[key];
    const newHeaders = preset.headers.map((h, i) => ({
      id: `col-${i}-${Date.now()}`,
      text: h
    }));

    const newRows = preset.rows.map((rowArr, rIdx) => {
      const cells = rowArr.map((cellStr, cIdx) => ({
        id: `cell-${rIdx}-${cIdx}-${Date.now()}`,
        content: cellStr,
        colSpan: 1,
        rowSpan: 1,
        isMerged: false
      }));
      return {
        id: `row-${rIdx}-${Date.now()}`,
        cells
      };
    });

    setHeaders(newHeaders);
    setRows(newRows);
    setColsCount(preset.headers.length);
    setRowsCount(preset.rows.length);
    setTableCaption(preset.name);
    setBorderStyle(preset.borderStyle as any);
    setPaddingSize(preset.paddingSize as any);
    setZebraStriping(preset.zebraStriping as any);
    setHoverEffects(preset.hoverEffects);
    setShadowType((preset.shadowType as any) ?? 'sm');
    setRoundedCorners(preset.roundedCorners ?? true);
    setCustomColorsEnabled(preset.customColorsEnabled);
    if (preset.customColorsEnabled) {
      setHeaderBgColor(preset.headerBgColor ?? '#518231');
      setHeaderTextColor(preset.headerTextColor ?? '#ffffff');
      setRowBgColor(preset.rowBgColor ?? '#ffffff');
      setRowTextColor(preset.rowTextColor ?? '#0f172a');
      setAltRowBgColor(preset.altRowBgColor ?? '#f8fafc');
      setBorderColor(preset.borderColor ?? '#cbd5e1');
    }
    setActiveCell(null);
  };

  // ────────────────────────────────────────────────────────
  // VALIDATION MECHANISM
  // ────────────────────────────────────────────────────────
  const runValidation = () => {
    const warnings: string[] = [];
    
    // Check for empty headers
    const hasEmptyHeader = headers.some(h => !h.text.trim());
    if (hasEmptyHeader) {
      warnings.push("A11y Warning: One or more column headers are empty. Screen readers might fail to announce data accurately.");
    }

    // Check for lack of caption
    if (!tableCaption.trim()) {
      warnings.push("A11y Recommendation: Missing table caption. Captions help assistive technologies announce table summaries.");
    }

    // Check for merges causing broken structures
    let totalCellCount = 0;
    let mergedCount = 0;
    rows.forEach(r => {
      r.cells.forEach(c => {
        totalCellCount++;
        if (c.isMerged) mergedCount++;
      });
    });

    if (mergedCount > 0) {
      warnings.push(`Grid Notice: Table features ${mergedCount} merged positions. Accessible tables should keep merges minimal to avoid screen-reader navigation bugs.`);
    }

    setValidationErrors(warnings);
  };

  // ────────────────────────────────────────────────────────
  // GRID STRUCTURE MODIFICATIONS
  // ────────────────────────────────────────────────────────

  // Apply row modifications
  const handleUpdateRowsCols = (newR: number, newC: number) => {
    if (newR <= 0 || newC <= 0) return;
    
    // Adjust Columns
    let currentHeaders = [...headers];
    if (newC > colsCount) {
      // Add columns
      for (let i = colsCount; i < newC; i++) {
        currentHeaders.push({ id: `col-${i}-${Date.now()}`, text: `Column ${i + 1}` });
      }
    } else if (newC < colsCount) {
      // Remove columns
      currentHeaders = currentHeaders.slice(0, newC);
    }

    // Adjust Rows
    let currentRows = [...rows];
    if (newR > rowsCount) {
      // Add rows
      for (let r = rowsCount; r < newR; r++) {
        const cells = Array.from({ length: newC }).map((_, cIdx) => ({
          id: `cell-${r}-${cIdx}-${Date.now()}`,
          content: "",
          colSpan: 1,
          rowSpan: 1,
          isMerged: false
        }));
        currentRows.push({ id: `row-${r}-${Date.now()}`, cells });
      }
    } else if (newR < rowsCount) {
      // Remove rows
      currentRows = currentRows.slice(0, newR);
    }

    // Adapt cells in remaining rows to column resizing
    currentRows = currentRows.map((row, rIdx) => {
      let cells = [...row.cells];
      if (newC > colsCount) {
        // Appending empty cells
        for (let c = colsCount; c < newC; c++) {
          cells.push({
            id: `cell-${rIdx}-${c}-${Date.now()}`,
            content: "",
            colSpan: 1,
            rowSpan: 1,
            isMerged: false
          });
        }
      } else if (newC < colsCount) {
        cells = cells.slice(0, newC);
      }
      return { ...row, cells };
    });

    setHeaders(currentHeaders);
    setRows(currentRows);
    setColsCount(newC);
    setRowsCount(newR);
    setActiveCell(null);
  };

  // Add Row Above/Below
  const addRow = (index: number, position: 'above' | 'below') => {
    const targetIdx = position === 'above' ? index : index + 1;
    const newCells = Array.from({ length: colsCount }).map((_, cIdx) => ({
      id: `cell-new-${cIdx}-${Date.now()}`,
      content: "",
      colSpan: 1,
      rowSpan: 1,
      isMerged: false
    }));
    
    const newRow = { id: `row-new-${Date.now()}`, cells: newCells };
    const updatedRows = [...rows];
    updatedRows.splice(targetIdx, 0, newRow);
    setRows(updatedRows);
    setRowsCount(prev => prev + 1);
    setActiveCell(null);
  };

  // Remove Row
  const removeRow = (index: number) => {
    if (rowsCount <= 1) return;
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    setRowsCount(prev => prev - 1);
    setActiveCell(null);
  };

  // Move Row Up/Down
  const moveRow = (index: number, direction: 'up' | 'down') => {
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= rows.length) return;
    const updated = [...rows];
    const temp = updated[index];
    updated[index] = updated[swapWith];
    updated[swapWith] = temp;
    setRows(updated);
    setActiveCell(null);
  };

  // Add Column Left/Right
  const addColumn = (index: number, position: 'left' | 'right') => {
    const targetIdx = position === 'left' ? index : index + 1;
    
    // Header
    const newHeader = { id: `col-new-${Date.now()}`, text: `Column ${colsCount + 1}` };
    const updatedHeaders = [...headers];
    updatedHeaders.splice(targetIdx, 0, newHeader);
    
    // Rows
    const updatedRows = rows.map((row, rIdx) => {
      const cells = [...row.cells];
      cells.splice(targetIdx, 0, {
        id: `cell-new-${rIdx}-${Date.now()}`,
        content: "",
        colSpan: 1,
        rowSpan: 1,
        isMerged: false
      });
      return { ...row, cells };
    });

    setHeaders(updatedHeaders);
    setRows(updatedRows);
    setColsCount(prev => prev + 1);
    setActiveCell(null);
  };

  // Remove Column
  const removeColumn = (index: number) => {
    if (colsCount <= 1) return;
    const updatedHeaders = headers.filter((_, i) => i !== index);
    const updatedRows = rows.map(row => {
      const cells = row.cells.filter((_, i) => i !== index);
      return { ...row, cells };
    });
    setHeaders(updatedHeaders);
    setRows(updatedRows);
    setColsCount(prev => prev - 1);
    setActiveCell(null);
  };

  // Move Column Left/Right
  const moveColumn = (index: number, direction: 'left' | 'right') => {
    const swapWith = direction === 'left' ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= headers.length) return;
    
    // Headers
    const updatedHeaders = [...headers];
    const tempH = updatedHeaders[index];
    updatedHeaders[index] = updatedHeaders[swapWith];
    updatedHeaders[swapWith] = tempH;

    // Cells
    const updatedRows = rows.map(row => {
      const cells = [...row.cells];
      const tempC = cells[index];
      cells[index] = cells[swapWith];
      cells[swapWith] = tempC;
      return { ...row, cells };
    });

    setHeaders(updatedHeaders);
    setRows(updatedRows);
    setActiveCell(null);
  };

  // ────────────────────────────────────────────────────────
  // CELL MERGING OPERATIONS
  // ────────────────────────────────────────────────────────

  // Merge Right: merges active cell with neighbor to its right
  const mergeRight = (r: number, c: number) => {
    const cell = rows[r].cells[c];
    const rightNeighborCol = c + cell.colSpan;
    if (rightNeighborCol >= colsCount) return; // boundary check

    const rightNeighbor = rows[r].cells[rightNeighborCol];
    if (rightNeighbor.isMerged) return; // already merged somewhere

    const updatedRows = [...rows];
    // Add neighbor's colSpan to current
    const targetCell = { ...updatedRows[r].cells[c] };
    targetCell.colSpan += rightNeighbor.colSpan;
    updatedRows[r].cells[c] = targetCell;

    // Hide merged cell(s)
    for (let i = 0; i < rightNeighbor.colSpan; i++) {
      const hiddenCell = { ...updatedRows[r].cells[rightNeighborCol + i] };
      hiddenCell.isMerged = true;
      hiddenCell.mergedInto = [r, c];
      updatedRows[r].cells[rightNeighborCol + i] = hiddenCell;
    }

    setRows(updatedRows);
  };

  // Merge Down: merges active cell with neighbor below
  const mergeDown = (r: number, c: number) => {
    const cell = rows[r].cells[c];
    const bottomNeighborRow = r + cell.rowSpan;
    if (bottomNeighborRow >= rowsCount) return; // boundary check

    const bottomNeighbor = rows[bottomNeighborRow].cells[c];
    if (bottomNeighbor.isMerged) return;

    const updatedRows = [...rows];
    // Add neighbor's rowSpan to current
    const targetCell = { ...updatedRows[r].cells[c] };
    targetCell.rowSpan += bottomNeighbor.rowSpan;
    updatedRows[r].cells[c] = targetCell;

    // Hide merged cell(s)
    for (let i = 0; i < bottomNeighbor.rowSpan; i++) {
      const hiddenCell = { ...updatedRows[bottomNeighborRow + i].cells[c] };
      hiddenCell.isMerged = true;
      hiddenCell.mergedInto = [r, c];
      updatedRows[bottomNeighborRow + i].cells[c] = hiddenCell;
    }

    setRows(updatedRows);
  };

  // Split Cell: clears spans on active cell and resets spanned blocks
  const splitCell = (r: number, c: number) => {
    const cell = rows[r].cells[c];
    if (cell.colSpan === 1 && cell.rowSpan === 1) return;

    const updatedRows = [...rows];
    
    // Find all cells that were merged into this one and restore them
    for (let rowIdx = r; rowIdx < r + cell.rowSpan; rowIdx++) {
      for (let colIdx = c; colIdx < c + cell.colSpan; colIdx++) {
        const current = { ...updatedRows[rowIdx].cells[colIdx] };
        current.colSpan = 1;
        current.rowSpan = 1;
        current.isMerged = false;
        current.mergedInto = undefined;
        updatedRows[rowIdx].cells[colIdx] = current;
      }
    }

    setRows(updatedRows);
  };

  // ────────────────────────────────────────────────────────
  // CELLS EDITING
  // ────────────────────────────────────────────────────────
  const updateCellContent = (r: number, c: number, text: string) => {
    const updated = [...rows];
    updated[r].cells[c] = { ...updated[r].cells[c], content: text };
    setRows(updated);
  };

  const updateHeaderContent = (c: number, text: string) => {
    const updated = [...headers];
    updated[c] = { ...updated[c], text };
    setHeaders(updated);
  };

  // ────────────────────────────────────────────────────────
  // CODE GENERATOR ENGINES
  // ────────────────────────────────────────────────────────

  // Compute CSS spacing based on padding setting
  const getPaddingPx = () => {
    if (paddingSize === 'compact') return '6px 12px';
    if (paddingSize === 'spacious') return '16px 24px';
    return '12px 20px';
  };

  const getPaddingTailwind = () => {
    if (paddingSize === 'compact') return 'px-3 py-1.5';
    if (paddingSize === 'spacious') return 'px-6 py-4.5';
    return 'px-5 py-3';
  };

  const getBorderCssStyle = () => {
    if (borderStyle === 'none') return 'border: none;';
    if (borderStyle === 'outline') return `border: 1px solid ${customColorsEnabled ? borderColor : '#e2e8f0'};`;
    return '';
  };

  const getBorderClassTailwind = () => {
    if (borderStyle === 'none') return '';
    if (borderStyle === 'outline') return 'border border-slate-200 dark:border-slate-800';
    if (borderStyle === 'all') return 'border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800';
    return 'divide-y divide-slate-200 dark:divide-slate-800';
  };

  // 1) PURE HTML + INLINE CSS STYLES
  const generatePureHTMLCode = () => {
    const pad = getPaddingPx();
    const borderCol = customColorsEnabled ? borderColor : '#cbd5e1';
    const textCol = customColorsEnabled ? rowTextColor : '#0f172a';
    const bgCol = customColorsEnabled ? rowBgColor : '#ffffff';
    const hBg = customColorsEnabled ? headerBgColor : '#f1f5f9';
    const hText = customColorsEnabled ? headerTextColor : '#0f172a';
    const fontSz = fontSize === 'xs' ? '12px' : fontSize === 'sm' ? '14px' : fontSize === 'lg' ? '18px' : fontSize === 'xl' ? '20px' : '16px';
    const fontWt = fontWeight === 'bold' ? '700' : fontWeight === 'semibold' ? '600' : fontWeight === 'medium' ? '500' : '400';
    const tableAlign = alignment === 'center' ? 'margin: 0 auto;' : alignment === 'right' ? 'margin-left: auto; margin-right: 0;' : '';

    let html = `<!-- HTML Table generated by Nexus HTML Table Generator -->\n`;
    
    // Wrapper based on responsive mode
    if (responsiveMode === 'standard') {
      html += `<div style="overflow-x: auto; width: 100%; font-size: ${fontSz}; font-weight: ${fontWt};">\n`;
    } else {
      html += `<div style="width: 100%; font-size: ${fontSz}; font-weight: ${fontWt};">\n`;
    }

    let borderCollapseStyle = `border-collapse: collapse; width: 100%; text-align: ${alignment}; ${tableAlign}`;
    if (roundedCorners) borderCollapseStyle += ' border-radius: 8px; overflow: hidden;';
    if (shadowType !== 'none') {
      const sh = shadowType === 'sm' ? '0 1px 3px rgba(0,0,0,0.1)' : shadowType === 'md' ? '0 4px 6px rgba(0,0,0,0.1)' : '0 10px 15px rgba(0,0,0,0.1)';
      borderCollapseStyle += ` box-shadow: ${sh};`;
    }

    html += `  <table style="${borderCollapseStyle}">\n`;

    if (tableCaption) {
      html += `    <caption style="padding: 10px; font-weight: 600; color: #64748b;">${tableCaption}</caption>\n`;
    }

    // Head
    if (showHeader) {
      html += `    <thead>\n      <tr style="background-color: ${hBg}; color: ${hText}; font-weight: bold;">\n`;
      headers.forEach(h => {
        let thStyle = `padding: ${pad}; border: 1px solid ${borderCol}; text-align: ${alignment};`;
        if (stickyHeader) thStyle += ' position: sticky; top: 0;';
        html += `        <th scope="col" style="${thStyle}">${h.text}</th>\n`;
      });
      html += `      </tr>\n    </thead>\n`;
    }

    // Body
    html += `    <tbody>\n`;
    rows.forEach((row, rIdx) => {
      let rowBg = bgCol;
      if (zebraStriping === 'odd' && rIdx % 2 !== 0) {
        rowBg = customColorsEnabled ? altRowBgColor : '#f8fafc';
      } else if (zebraStriping === 'even' && rIdx % 2 === 0) {
        rowBg = customColorsEnabled ? altRowBgColor : '#f8fafc';
      }

      html += `      <tr style="background-color: ${rowBg}; color: ${textCol}; transition: background-color 0.2s;">\n`;
      row.cells.forEach((cell, cIdx) => {
        if (cell.isMerged) return;

        let thScope = cIdx === 0 && stickyFirstColumn ? ' scope="row"' : '';
        let cellTagName = cIdx === 0 && stickyFirstColumn ? 'th' : 'td';
        
        let cellStyle = `padding: ${pad}; border: 1px solid ${borderCol}; text-align: ${alignment};`;
        if (cIdx === 0 && stickyFirstColumn) {
          cellStyle += ` position: sticky; left: 0; background-color: ${rowBg}; z-index: 1;`;
        }

        const spanAttrs = [];
        if (cell.colSpan > 1) spanAttrs.push(`colspan="${cell.colSpan}"`);
        if (cell.rowSpan > 1) spanAttrs.push(`rowspan="${cell.rowSpan}"`);
        const spanStr = spanAttrs.length > 0 ? ' ' + spanAttrs.join(' ') : '';

        html += `        <${cellTagName}${thScope}${spanStr} style="${cellStyle}">${cell.content || '&nbsp;'}</${cellTagName}>\n`;
      });
      html += `      </tr>\n`;
    });
    html += `    </tbody>\n`;

    // Footer
    if (showFooter) {
      html += `    <tfoot>\n      <tr style="background-color: ${hBg}; color: ${hText}; font-weight: bold;">\n`;
      headers.forEach(h => {
        html += `        <th scope="col" style="padding: ${pad}; border: 1px solid ${borderCol}; text-align: ${alignment};">${h.text}</th>\n`;
      });
      html += `      </tr>\n    </tfoot>\n`;
    }

    html += `  </table>\n</div>`;
    return html;
  };

  // 2) TAILWIND CSS STRUCTURE
  const generateTailwindCode = () => {
    const pad = getPaddingTailwind();
    const alignClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left';
    const textSzClass = fontSize === 'xs' ? 'text-xs' : fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : fontSize === 'xl' ? 'text-xl' : 'text-base';
    const fontWtClass = fontWeight === 'bold' ? 'font-bold' : fontWeight === 'semibold' ? 'font-semibold' : fontWeight === 'medium' ? 'font-medium' : 'font-normal';
    const borderClass = getBorderClassTailwind();
    const shadowClass = shadowType === 'sm' ? 'shadow-sm' : shadowType === 'md' ? 'shadow-md' : shadowType === 'lg' ? 'shadow-lg' : '';
    const roundedClass = roundedCorners ? 'rounded-xl overflow-hidden' : '';

    let html = `<!-- Styled with Tailwind CSS -->\n`;
    
    // Container wrapper
    let wrapperClasses = `${textSzClass} ${fontWtClass}`;
    if (responsiveMode === 'standard') wrapperClasses += ' overflow-x-auto w-full';
    if (roundedClass) wrapperClasses += ` ${roundedClass}`;
    if (shadowClass) wrapperClasses += ` ${shadowClass}`;
    if (borderStyle === 'outline' || borderStyle === 'all') wrapperClasses += ' border border-slate-200 dark:border-slate-800';

    html += `<div class="${wrapperClasses.trim()}">\n`;
    html += `  <table class="w-full border-collapse ${alignClass}">\n`;

    if (tableCaption) {
      html += `    <caption class="p-3 text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">${tableCaption}</caption>\n`;
    }

    // Head
    if (showHeader) {
      let theadStyle = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200";
      if (customColorsEnabled) theadStyle = `bg-[${headerBgColor}] text-[${headerTextColor}]`;
      html += `    <thead class="${theadStyle} text-xs uppercase font-bold">\n      <tr>\n`;
      headers.forEach(h => {
        let thClasses = `${pad} border-slate-200 dark:border-slate-700`;
        if (borderStyle === 'all') thClasses += ' border';
        if (borderStyle === 'horizontal' || borderStyle === 'vertical') thClasses += ' border-b';
        if (borderStyle === 'vertical') thClasses += ' border-x';
        if (stickyHeader) thClasses += ' sticky top-0 z-10';
        
        let customBgStyle = customColorsEnabled ? ` style="background-color: ${headerBgColor}; color: ${headerTextColor};"` : '';
        html += `        <th scope="col" class="${thClasses}"${customBgStyle}>${h.text}</th>\n`;
      });
      html += `      </tr>\n    </thead>\n`;
    }

    // Body
    html += `    <tbody class="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 divide-y divide-slate-200 dark:divide-slate-800">\n`;
    rows.forEach((row, rIdx) => {
      let trClass = "";
      if (zebraStriping === 'odd' && rIdx % 2 !== 0) {
        trClass = "bg-slate-50/50 dark:bg-slate-800/30";
      } else if (zebraStriping === 'even' && rIdx % 2 === 0) {
        trClass = "bg-slate-50/50 dark:bg-slate-800/30";
      }
      if (hoverEffects) {
        trClass += " hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors";
      }

      html += `      <tr class="${trClass.trim()}">\n`;
      row.cells.forEach((cell, cIdx) => {
        if (cell.isMerged) return;

        let cellClasses = `${pad} border-slate-200 dark:border-slate-800`;
        if (borderStyle === 'all') cellClasses += ' border';
        if (borderStyle === 'vertical') cellClasses += ' border-x';

        let cellTagName = cIdx === 0 && stickyFirstColumn ? 'th' : 'td';
        let thScope = cIdx === 0 && stickyFirstColumn ? ' scope="row"' : '';
        
        if (cIdx === 0 && stickyFirstColumn) {
          cellClasses += ' sticky left-0 z-10 font-semibold bg-white dark:bg-slate-900 border-r';
        }

        const spanAttrs = [];
        if (cell.colSpan > 1) spanAttrs.push(`colspan="${cell.colSpan}"`);
        if (cell.rowSpan > 1) spanAttrs.push(`rowspan="${cell.rowSpan}"`);
        const spanStr = spanAttrs.length > 0 ? ' ' + spanAttrs.join(' ') : '';

        let inlineStyleStr = "";
        if (customColorsEnabled) {
          let cellBg = rIdx % 2 !== 0 && zebraStriping === 'odd' ? altRowBgColor : rIdx % 2 === 0 && zebraStriping === 'even' ? altRowBgColor : rowBgColor;
          inlineStyleStr = ` style="background-color: ${cellBg}; color: ${rowTextColor}; border-color: ${borderColor};"`;
        }

        html += `        <${cellTagName}${thScope}${spanStr} class="${cellClasses}"${inlineStyleStr}>${cell.content || '&nbsp;'}</${cellTagName}>\n`;
      });
      html += `      </tr>\n`;
    });
    html += `    </tbody>\n`;

    // Footer
    if (showFooter) {
      let tfootStyle = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold";
      if (customColorsEnabled) tfootStyle = `bg-[${headerBgColor}] text-[${headerTextColor}] font-semibold`;
      html += `    <tfoot class="${tfootStyle}">\n      <tr>\n`;
      headers.forEach(h => {
        let thClasses = `${pad} border-slate-200 dark:border-slate-800`;
        if (borderStyle === 'all') thClasses += ' border';
        if (borderStyle === 'vertical') thClasses += ' border-x';
        
        let customBgStyle = customColorsEnabled ? ` style="background-color: ${headerBgColor}; color: ${headerTextColor};"` : '';
        html += `        <th scope="col" class="${thClasses}"${customBgStyle}>${h.text}</th>\n`;
      });
      html += `      </tr>\n    </tfoot>\n`;
    }

    html += `  </table>\n</div>`;
    return html;
  };

  // 3) REACT JSX SYNTAX
  const generateJSXCode = () => {
    let rawTailwind = generateTailwindCode();
    // Strip Tailwind comments and replace class= with className=
    let jsx = rawTailwind
      .replace(/<!--[\s\S]*?-->\n/g, '')
      .replace(/class=/g, 'className=')
      // fix colspan and rowspan
      .replace(/colspan=/g, 'colSpan=')
      .replace(/rowspan=/g, 'rowSpan=');

    return `import React from 'react';\n\nexport function GeneratedTable() {\n  return (\n    ${jsx.split('\n').join('\n    ')}\n  );\n}`;
  };

  // 4) BOOTSTRAP CODING
  const generateBootstrapCode = () => {
    let bootClass = "table";
    if (borderStyle === 'all') bootClass += " table-bordered";
    if (borderStyle === 'none') bootClass += " table-borderless";
    if (zebraStriping !== 'none') bootClass += " table-striped";
    if (hoverEffects) bootClass += " table-hover";
    if (paddingSize === 'compact') bootClass += " table-sm";

    let html = `<!-- Bootstrap Structured Table -->\n`;
    if (responsiveMode === 'standard') {
      html += `<div class="table-responsive">\n`;
    }
    
    html += `  <table class="${bootClass}">\n`;
    if (tableCaption) {
      html += `    <caption>${tableCaption}</caption>\n`;
    }
    
    if (showHeader) {
      html += `    <thead class="table-dark">\n      <tr>\n`;
      headers.forEach(h => {
        html += `        <th scope="col">${h.text}</th>\n`;
      });
      html += `      </tr>\n    </thead>\n`;
    }

    html += `    <tbody>\n`;
    rows.forEach(row => {
      html += `      <tr>\n`;
      row.cells.forEach(cell => {
        if (cell.isMerged) return;
        const spanAttrs = [];
        if (cell.colSpan > 1) spanAttrs.push(`colspan="${cell.colSpan}"`);
        if (cell.rowSpan > 1) spanAttrs.push(`rowspan="${cell.rowSpan}"`);
        const spanStr = spanAttrs.length > 0 ? ' ' + spanAttrs.join(' ') : '';
        html += `        <td${spanStr}>${cell.content}</td>\n`;
      });
      html += `      </tr>\n`;
    });
    html += `    </tbody>\n`;

    if (showFooter) {
      html += `    <tfoot>\n      <tr>\n`;
      headers.forEach(h => {
        html += `        <th>${h.text}</th>\n`;
      });
      html += `      </tr>\n    </tfoot>\n`;
    }

    html += `  </table>\n`;
    if (responsiveMode === 'standard') {
      html += `</div>`;
    }
    return html;
  };

  // 5) MARKDOWN CODING (Simplified flat representation due to markdown limits)
  const generateMarkdownCode = () => {
    let md = "";
    
    // Headers
    md += "| " + headers.map(h => h.text).join(" | ") + " |\n";
    
    // Separators
    md += "| " + headers.map(() => {
      if (alignment === 'center') return ":---:";
      if (alignment === 'right') return "---:";
      return ":---";
    }).join(" | ") + " |\n";

    // Body (Markdown doesn't support colSpan/rowSpan natively, so we render flat cells or placeholders)
    rows.forEach(row => {
      md += "| " + row.cells.map(cell => {
        if (cell.isMerged) {
          return "(merged)";
        }
        return cell.content || " ";
      }).join(" | ") + " |\n";
    });

    return md;
  };

  // 6) CSV FORMAT
  const generateCSVCode = () => {
    let csv = headers.map(h => `"${h.text.replace(/"/g, '""')}"`).join(",") + "\n";
    rows.forEach(row => {
      csv += row.cells.map(c => `"${c.content.replace(/"/g, '""')}"`).join(",") + "\n";
    });
    return csv;
  };

  // 7) JSON FORMAT
  const generateJSONCode = () => {
    const list = rows.map(row => {
      const obj: Record<string, string> = {};
      headers.forEach((h, hIdx) => {
        obj[h.text] = row.cells[hIdx]?.content ?? "";
      });
      return obj;
    });
    return JSON.stringify(list, null, 2);
  };

  // Switch active export tabs
  const getCompiledCode = () => {
    switch (activeTab) {
      case 'html': return generatePureHTMLCode();
      case 'tailwind': return generateTailwindCode();
      case 'jsx': return generateJSXCode();
      case 'bootstrap': return generateBootstrapCode();
      case 'markdown': return generateMarkdownCode();
      case 'csv': return generateCSVCode();
      case 'json': return generateJSONCode();
      default: return "";
    }
  };

  // Copy Clipboard Trigger
  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCompiledCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // File Download Trigger
  const handleDownloadFile = () => {
    let content = getCompiledCode();
    let filename = `table-generator.${activeTab === 'jsx' ? 'jsx' : activeTab === 'markdown' ? 'md' : activeTab}`;
    let mime = 'text/plain';
    if (activeTab === 'html' || activeTab === 'bootstrap' || activeTab === 'tailwind') mime = 'text/html';
    if (activeTab === 'csv') mime = 'text/csv';
    if (activeTab === 'json') mime = 'application/json';

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ────────────────────────────────────────────────────────
  // DATA PARSE & IMPORT CONTROLLERS
  // ────────────────────────────────────────────────────────
  const handleImportData = () => {
    const trimmed = importText.trim();
    if (!trimmed) return;

    try {
      let parsedHeaders: string[] = [];
      let parsedRows: string[][] = [];

      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        // JSON format
        const json = JSON.parse(trimmed);
        if (Array.isArray(json)) {
          if (json.length === 0) throw new Error("JSON array is empty");
          const first = json[0];
          if (Array.isArray(first)) {
            parsedHeaders = first.map(String);
            parsedRows = json.slice(1).map(r => Array.isArray(r) ? r.map(String) : []);
          } else if (typeof first === 'object') {
            parsedHeaders = Object.keys(first);
            parsedRows = json.map((obj: any) => parsedHeaders.map(h => obj[h] !== undefined ? String(obj[h]) : ''));
          }
        }
      } else {
        // Delimited columns (CSV/TSV/Excel Clipboard)
        const lines = trimmed.split(/\r?\n/).filter(line => line.length > 0);
        if (lines.length === 0) throw new Error("Empty rows text");

        const hasTab = lines[0].includes('\t');
        const hasSemicolon = lines[0].includes(';');
        const separator = hasTab ? '\t' : hasSemicolon ? ';' : ',';

        const parseLine = (line: string) => {
          const result: string[] = [];
          let current = "";
          let insideQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === separator && !insideQuotes) {
              result.push(current.trim().replace(/^"|"$/g, ''));
              current = "";
            } else {
              current += char;
            }
          }
          result.push(current.trim().replace(/^"|"$/g, ''));
          return result;
        };

        parsedHeaders = parseLine(lines[0]);
        parsedRows = lines.slice(1).map(l => parseLine(l));
      }

      if (parsedHeaders.length === 0) throw new Error("Could not extract table headers.");

      const newColsCount = parsedHeaders.length;
      const newRowsCount = parsedRows.length || 1;

      const newHeaders = parsedHeaders.map((h, i) => ({
        id: `col-${i}-${Date.now()}`,
        text: h || `Column ${i + 1}`
      }));

      const newRows = Array.from({ length: newRowsCount }).map((_, rIdx) => {
        const cells = Array.from({ length: newColsCount }).map((_, cIdx) => ({
          id: `cell-${rIdx}-${cIdx}-${Date.now()}`,
          content: parsedRows[rIdx]?.[cIdx] ?? "",
          colSpan: 1,
          rowSpan: 1,
          isMerged: false
        }));
        return {
          id: `row-${rIdx}-${Date.now()}`,
          cells
        };
      });

      setHeaders(newHeaders);
      setRows(newRows);
      setColsCount(newColsCount);
      setRowsCount(newRowsCount);
      setActiveCell(null);
      setIsImportModalOpen(false);
      setImportText("");
    } catch (e: any) {
      alert("Invalid Import Data: " + e.message);
    }
  };

  // ────────────────────────────────────────────────────────
  // PROJECTS HISTORY AND SAVING CONTROLLERS
  // ────────────────────────────────────────────────────────
  const saveProject = () => {
    if (!newProjectName.trim()) {
      alert("Please specify a draft project name.");
      return;
    }

    const newProject: SavedProject = {
      id: `project-${Date.now()}`,
      name: newProjectName.trim(),
      updatedAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      headers, rows, tableCaption, showHeader, showFooter, responsiveMode,
      borderStyle, paddingSize, alignment, fontSize, fontWeight, zebraStriping,
      hoverEffects, stickyHeader, stickyFirstColumn, roundedCorners, shadowType,
      customColorsEnabled, headerBgColor, headerTextColor, rowBgColor, rowTextColor,
      altRowBgColor, borderColor
    };

    const updated = [newProject, ...savedProjects];
    setSavedProjects(updated);
    localStorage.setItem('html_table_generator_projects', JSON.stringify(updated));
    setNewProjectName("");
  };

  const loadProject = (project: SavedProject) => {
    setHeaders(project.headers);
    setRows(project.rows);
    setTableCaption(project.tableCaption);
    setShowHeader(project.showHeader);
    setShowFooter(project.showFooter);
    setResponsiveMode(project.responsiveMode);
    setBorderStyle(project.borderStyle);
    setPaddingSize(project.paddingSize);
    setAlignment(project.alignment);
    setFontSize(project.fontSize);
    setFontWeight(project.fontWeight);
    setZebraStriping(project.zebraStriping);
    setHoverEffects(project.hoverEffects);
    setStickyHeader(project.stickyHeader);
    setStickyFirstColumn(project.stickyFirstColumn);
    setRoundedCorners(project.roundedCorners);
    setShadowType(project.shadowType);
    setCustomColorsEnabled(project.customColorsEnabled);
    setHeaderBgColor(project.headerBgColor);
    setHeaderTextColor(project.headerTextColor);
    setRowBgColor(project.rowBgColor);
    setRowTextColor(project.rowTextColor);
    setAltRowBgColor(project.altRowBgColor);
    setBorderColor(project.borderColor);
    setRowsCount(project.rows.length);
    setColsCount(project.headers.length);
    setActiveCell(null);
  };

  const deleteProject = (id: string) => {
    const updated = savedProjects.filter(p => p.id !== id);
    setSavedProjects(updated);
    localStorage.setItem('html_table_generator_projects', JSON.stringify(updated));
  };

  // ────────────────────────────────────────────────────────
  // LIVE PREVIEW SIMULATOR FILTER / SORT DATA
  // ────────────────────────────────────────────────────────
  const filteredAndSortedRows = useMemo(() => {
    let result = [...rows];
    
    // Simulate Search filter
    if (previewSearch.trim()) {
      const query = previewSearch.toLowerCase();
      result = result.filter(row =>
        row.cells.some(cell => cell.content.toLowerCase().includes(query))
      );
    }

    // Simulate Sorting
    if (previewSortCol !== null) {
      result.sort((a, b) => {
        const valA = a.cells[previewSortCol]?.content ?? "";
        const valB = b.cells[previewSortCol]?.content ?? "";
        
        // Simple numeric vs alpha sorting
        const numA = parseFloat(valA.replace(/[^0-9.-]/g, ''));
        const numB = parseFloat(valB.replace(/[^0-9.-]/g, ''));
        
        if (!isNaN(numA) && !isNaN(numB)) {
          return previewSortAsc ? numA - numB : numB - numA;
        }
        return previewSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    return result;
  }, [rows, previewSearch, previewSortCol, previewSortAsc]);

  // Page paginated values
  const paginatedRows = useMemo(() => {
    const startIdx = (previewPage - 1) * itemsPerPage;
    return filteredAndSortedRows.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredAndSortedRows, previewPage]);

  const maxPages = Math.ceil(filteredAndSortedRows.length / itemsPerPage);

  // Clear all configurations back to basic default
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all modifications?")) {
      buildInitialGrid(4, 4);
      setTableCaption("Sales Overview");
      setShowHeader(true);
      setShowFooter(false);
      setBorderStyle("all");
      setPaddingSize("comfortable");
      setZebraStriping("odd");
      setHoverEffects(true);
      setCustomColorsEnabled(false);
      setShadowType("sm");
      setRoundedCorners(true);
      setActiveCell(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-slate-800 dark:text-slate-100">
      
      {/* ────────────────────────────────────────────────────────
          PRESET DESIGNS SELECTOR
          ──────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
          <LayoutGrid className="text-[#518231]" size={20} /> Presets & Templates
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(PRESETS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleApplyPreset(key as any)}
              className="p-3 bg-white dark:bg-slate-800 hover:border-[#518231] hover:text-[#518231] border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-center transition-all shadow-sm flex flex-col items-center justify-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#518231]" />
              <span className="truncate w-full">{val.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main split builder dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ────────────────────────────────────────────────────────
            LEFT WORKSPACE CONTROLS & EDITORS (4 columns)
            ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          {/* Table Geometry Control */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 text-sm uppercase tracking-wide">
              1. Grid Geometry
            </h4>
            
            {/* Dimensions Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  <span>Rows count ({rowsCount})</span>
                </div>
                <input
                  type="range" min="1" max="15" value={rowsCount}
                  onChange={(e) => handleUpdateRowsCols(parseInt(e.target.value), colsCount)}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  <span>Columns count ({colsCount})</span>
                </div>
                <input
                  type="range" min="1" max="8" value={colsCount}
                  onChange={(e) => handleUpdateRowsCols(rowsCount, parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <FileSpreadsheet size={14} /> Import CSV / JSON
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                title="Reset modifications"
              >
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

          {/* Active Selection cell editor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 text-sm uppercase tracking-wide flex justify-between items-center">
              <span>2. Visual Cell Editor</span>
              {activeCell && (
                <span className="text-[10px] font-bold bg-[#518231]/10 text-[#518231] px-2 py-0.5 rounded-full uppercase">
                  Cell R{activeCell.r + 1} C{activeCell.c + 1}
                </span>
              )}
            </h4>

            {activeCell ? (
              <div className="space-y-4">
                {/* Content input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Cell content</label>
                  <textarea
                    rows={2}
                    value={rows[activeCell.r].cells[activeCell.c].content}
                    onChange={(e) => updateCellContent(activeCell.r, activeCell.c, e.target.value)}
                    className="w-full p-3 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#518231] bg-slate-50 dark:bg-slate-950"
                    placeholder="Enter cell text..."
                  />
                </div>

                {/* Spans Merges controllers */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => mergeRight(activeCell.r, activeCell.c)}
                    disabled={activeCell.c + rows[activeCell.r].cells[activeCell.c].colSpan >= colsCount}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-slate-50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    Merge Right
                  </button>
                  <button
                    onClick={() => mergeDown(activeCell.r, activeCell.c)}
                    disabled={activeCell.r + rows[activeCell.r].cells[activeCell.c].rowSpan >= rowsCount}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-slate-50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    Merge Down
                  </button>
                  <button
                    onClick={() => splitCell(activeCell.r, activeCell.c)}
                    disabled={rows[activeCell.r].cells[activeCell.c].colSpan === 1 && rows[activeCell.r].cells[activeCell.c].rowSpan === 1}
                    className="col-span-2 p-2.5 bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 disabled:opacity-40 disabled:hover:bg-[#518231]/10 rounded-xl text-xs font-semibold transition-all"
                  >
                    Split Merged Cell
                  </button>
                </div>

                {/* Grid modifiers */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase">Insert/Delete</span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    <button onClick={() => addRow(activeCell.r, 'above')} className="flex items-center gap-1 p-1.5 hover:text-[#518231] transition-colors"><Plus size={14} /> Row Above</button>
                    <button onClick={() => addRow(activeCell.r, 'below')} className="flex items-center gap-1 p-1.5 hover:text-[#518231] transition-colors"><Plus size={14} /> Row Below</button>
                    <button onClick={() => addColumn(activeCell.c, 'left')} className="flex items-center gap-1 p-1.5 hover:text-[#518231] transition-colors"><Plus size={14} /> Col Left</button>
                    <button onClick={() => addColumn(activeCell.c, 'right')} className="flex items-center gap-1 p-1.5 hover:text-[#518231] transition-colors"><Plus size={14} /> Col Right</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800 pt-2 text-xs font-medium">
                    <button onClick={() => removeRow(activeCell.r)} className="flex items-center gap-1 p-1.5 text-red-500 hover:text-red-600"><Trash2 size={14} /> Delete Row</button>
                    <button onClick={() => removeColumn(activeCell.c)} className="flex items-center gap-1 p-1.5 text-red-500 hover:text-red-600"><Trash2 size={14} /> Delete Col</button>
                  </div>
                </div>

                {/* Row/Col Reordering */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase">Move / Reorder</span>
                  <div className="grid grid-cols-4 gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <button onClick={() => moveRow(activeCell.r, 'up')} className="p-1 border border-slate-100 dark:border-slate-800 rounded hover:bg-slate-50 flex items-center justify-center gap-0.5"><ChevronUp size={14} /> Row</button>
                    <button onClick={() => moveRow(activeCell.r, 'down')} className="p-1 border border-slate-100 dark:border-slate-800 rounded hover:bg-slate-50 flex items-center justify-center gap-0.5"><ChevronDown size={14} /> Row</button>
                    <button onClick={() => moveColumn(activeCell.c, 'left')} className="p-1 border border-slate-100 dark:border-slate-800 rounded hover:bg-slate-50 flex items-center justify-center gap-0.5"><ChevronLeft size={14} /> Col</button>
                    <button onClick={() => moveColumn(activeCell.c, 'right')} className="p-1 border border-slate-100 dark:border-slate-800 rounded hover:bg-slate-50 flex items-center justify-center gap-0.5"><ChevronRight size={14} /> Col</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-slate-400 dark:text-slate-500">
                <AlertCircle className="mx-auto mb-2 opacity-50" size={24} />
                Click on any cell inside the visual grid to access inline edits, merges, and column/row controls.
              </div>
            )}
          </div>

          {/* Table Customization (Styles and layout) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 text-sm uppercase tracking-wide">
              3. Custom styles
            </h4>

            {/* Title / Caption */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Table Caption</label>
              <input
                type="text"
                value={tableCaption}
                onChange={(e) => setTableCaption(e.target.value)}
                className="w-full p-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#518231] bg-slate-50 dark:bg-slate-950"
                placeholder="Table description..."
              />
            </div>

            {/* Toggle components headers/footers */}
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showHeader} onChange={() => setShowHeader(!showHeader)} className="rounded text-[#518231] focus:ring-[#518231] accent-[#518231]" />
                Show Header
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showFooter} onChange={() => setShowFooter(!showFooter)} className="rounded text-[#518231] focus:ring-[#518231] accent-[#518231]" />
                Show Footer
              </label>
            </div>

            {/* Borders styling */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Borders Style</label>
              <select
                value={borderStyle}
                onChange={(e) => setBorderStyle(e.target.value as any)}
                className="w-full p-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none bg-slate-50 dark:bg-slate-950"
              >
                <option value="all">Borders All (Grid)</option>
                <option value="horizontal">Horizontal Gridlines</option>
                <option value="vertical">Vertical Gridlines</option>
                <option value="outline">Outer Border Only</option>
                <option value="none">No Borders</option>
              </select>
            </div>

            {/* Cell padding size */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Cell Padding / Spacing</label>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'comfortable', 'spacious'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPaddingSize(p)}
                    className={`p-2 border rounded-xl text-xs font-semibold capitalize transition-all ${
                      paddingSize === p
                        ? 'border-[#518231] bg-[#518231]/5 text-[#518231]'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Zebra Striping */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Zebra Striping</label>
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'odd', 'even'] as const).map(z => (
                  <button
                    key={z}
                    onClick={() => setZebraStriping(z)}
                    className={`p-2 border rounded-xl text-xs font-semibold capitalize transition-all ${
                      zebraStriping === z
                        ? 'border-[#518231] bg-[#518231]/5 text-[#518231]'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Alignment */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Text Alignment</label>
              <div className="grid grid-cols-3 gap-2">
                {(['left', 'center', 'right'] as const).map(a => (
                  <button
                    key={a}
                    onClick={() => setAlignment(a)}
                    className={`p-2 border rounded-xl text-xs font-semibold capitalize transition-all ${
                      alignment === a
                        ? 'border-[#518231] bg-[#518231]/5 text-[#518231]'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive layouts mode */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Responsive Mode</label>
              <select
                value={responsiveMode}
                onChange={(e) => setResponsiveMode(e.target.value as any)}
                className="w-full p-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none bg-slate-50 dark:bg-slate-950"
              >
                <option value="standard">Standard (Horizontal Scroll)</option>
                <option value="scrollable">Fixed Header Scroll (Fixed Heights)</option>
                <option value="stacked">Stacked Rows (Vertical blocks on Mobile)</option>
                <option value="card">Card Layouts (Rows to Cards on Mobile)</option>
              </select>
            </div>

            {/* Advanced switches */}
            <div className="space-y-3 pt-2 text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={hoverEffects} onChange={() => setHoverEffects(!hoverEffects)} className="rounded text-[#518231] accent-[#518231]" />
                Zebra row hover effects
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={stickyHeader} onChange={() => setStickyHeader(!stickyHeader)} className="rounded text-[#518231] accent-[#518231]" />
                Sticky fixed header row
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={stickyFirstColumn} onChange={() => setStickyFirstColumn(!stickyFirstColumn)} className="rounded text-[#518231] accent-[#518231]" />
                Sticky first column scroll
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={roundedCorners} onChange={() => setRoundedCorners(!roundedCorners)} className="rounded text-[#518231] accent-[#518231]" />
                Rounded table corners
              </label>
            </div>
          </div>

          {/* Color Customization panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">
                4. Colors & Theme
              </h4>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#518231]">
                <input type="checkbox" checked={customColorsEnabled} onChange={() => setCustomColorsEnabled(!customColorsEnabled)} className="rounded text-[#518231] accent-[#518231]" />
                Enable Custom
              </label>
            </div>

            {customColorsEnabled ? (
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-500 mb-1">Header BG</label>
                  <div className="flex gap-1.5 items-center">
                    <input type="color" value={headerBgColor} onChange={(e) => setHeaderBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={headerBgColor} onChange={(e) => setHeaderBgColor(e.target.value)} className="w-full p-1 border border-slate-200 dark:border-slate-700 rounded text-center text-[10px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Header Text</label>
                  <div className="flex gap-1.5 items-center">
                    <input type="color" value={headerTextColor} onChange={(e) => setHeaderTextColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={headerTextColor} onChange={(e) => setHeaderTextColor(e.target.value)} className="w-full p-1 border border-slate-200 dark:border-slate-700 rounded text-center text-[10px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Row BG</label>
                  <div className="flex gap-1.5 items-center">
                    <input type="color" value={rowBgColor} onChange={(e) => setRowBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={rowBgColor} onChange={(e) => setRowBgColor(e.target.value)} className="w-full p-1 border border-slate-200 dark:border-slate-700 rounded text-center text-[10px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Row Text</label>
                  <div className="flex gap-1.5 items-center">
                    <input type="color" value={rowTextColor} onChange={(e) => setRowTextColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={rowTextColor} onChange={(e) => setRowTextColor(e.target.value)} className="w-full p-1 border border-slate-200 dark:border-slate-700 rounded text-center text-[10px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Zebra BG</label>
                  <div className="flex gap-1.5 items-center">
                    <input type="color" value={altRowBgColor} onChange={(e) => setAltRowBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={altRowBgColor} onChange={(e) => setAltRowBgColor(e.target.value)} className="w-full p-1 border border-slate-200 dark:border-slate-700 rounded text-center text-[10px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Border Line</label>
                  <div className="flex gap-1.5 items-center">
                    <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="w-full p-1 border border-slate-200 dark:border-slate-700 rounded text-center text-[10px]" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-xs text-slate-400 dark:text-slate-500">
                Custom theme colors are currently disabled. The generator defaults to professional theme-aware classes.
              </div>
            )}
          </div>

          {/* Validation Audits Warnings log */}
          {validationErrors.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-2xl p-5 shadow-sm space-y-2">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wide flex items-center gap-1.5">
                <AlertCircle size={14} /> Validation Audit Logs
              </h4>
              <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1.5 list-disc pl-4">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Draft history and projects */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 text-sm uppercase tracking-wide">
              5. Drafts & History
            </h4>

            {/* Save current project */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Draft project name..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="flex-1 p-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#518231] bg-slate-50 dark:bg-slate-950"
              />
              <button
                onClick={saveProject}
                className="px-3 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Save size={14} /> Save Draft
              </button>
            </div>

            {/* Saved project list */}
            {savedProjects.length > 0 ? (
              <div className="space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar pr-1">
                {savedProjects.map(proj => (
                  <div key={proj.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-850">
                    <div className="flex-1 min-w-0 pr-2">
                      <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{proj.name}</span>
                      <span className="block text-[9px] text-slate-400">{proj.updatedAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => loadProject(proj)}
                        className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-[#518231]"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="p-1 hover:text-red-500 rounded text-slate-400"
                        title="Delete draft"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2 text-xs text-slate-400 dark:text-slate-500">
                No saved drafts yet. Enter a name above to bookmark your layouts in local storage.
              </div>
            )}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────
            RIGHT AREA: LIVE VISUAL PREVIEW & GENERATED CODE SNIPPETS
            ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* Visual Canvas table preview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            
            {/* Header controls for previews */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Visual Builder Canvas</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">Double click cells/headers to rename</span>
              </div>

              {/* Devices size simulator switcher */}
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-inner">
                {(['desktop', 'tablet', 'mobile'] as const).map(device => (
                  <button
                    key={device}
                    onClick={() => setPreviewDevice(device)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      previewDevice === device
                        ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {device === 'desktop' && <Monitor size={14} />}
                    {device === 'tablet' && <Tablet size={14} />}
                    {device === 'mobile' && <Smartphone size={14} />}
                    <span className="capitalize hidden sm:inline">{device}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Device Frame simulator */}
            <div className="w-full flex justify-center bg-slate-100 dark:bg-slate-950 p-2 sm:p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850">
              <div
                style={{
                  width: previewDevice === 'mobile' ? '375px' : previewDevice === 'tablet' ? '768px' : '100%',
                  transition: 'width 0.3s ease'
                }}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-850 p-2 sm:p-5 overflow-hidden"
              >
                
                {/* Visual Canvas table container */}
                <div className="overflow-x-auto w-full custom-scrollbar pb-2">
                  <table
                    className={`w-full border-collapse ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'} ${roundedCorners ? 'rounded-lg overflow-hidden' : ''}`}
                    style={{
                      border: borderStyle === 'outline' || borderStyle === 'all' ? `1px solid ${customColorsEnabled ? borderColor : '#cbd5e1'}` : 'none',
                    }}
                  >
                    {tableCaption && (
                      <caption className="p-3 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/20">{tableCaption}</caption>
                    )}

                    {/* Table headers */}
                    {showHeader && (
                      <thead
                        style={{
                          backgroundColor: customColorsEnabled ? headerBgColor : undefined,
                          color: customColorsEnabled ? headerTextColor : undefined,
                        }}
                        className={`text-xs uppercase font-bold border-b border-slate-200 dark:border-slate-700 ${
                          !customColorsEnabled ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : ''
                        }`}
                      >
                        <tr>
                          {headers.map((h, hIdx) => (
                            <th
                              key={h.id}
                              style={{
                                padding: getPaddingPx(),
                                border: borderStyle === 'all' ? `1px solid ${customColorsEnabled ? borderColor : '#e2e8f0'}` : undefined,
                                borderBottom: `2px solid ${customColorsEnabled ? borderColor : '#cbd5e1'}`,
                              }}
                              className="relative group min-w-[120px]"
                            >
                              {/* Rename input */}
                              <input
                                type="text"
                                value={h.text}
                                onChange={(e) => updateHeaderContent(hIdx, e.target.value)}
                                className="w-full bg-transparent font-bold border-0 focus:outline-none focus:ring-1 focus:ring-[#518231] rounded px-1 py-0.5 text-center uppercase tracking-wider"
                              />

                              {/* Hover controls columns delete/moves */}
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-0.5 bg-slate-900 text-white rounded shadow px-1 py-0.5 z-10 text-[9px]">
                                <button onClick={() => moveColumn(hIdx, 'left')} className="p-0.5 hover:text-[#518231]"><ChevronLeft size={10} /></button>
                                <button onClick={() => removeColumn(hIdx)} className="p-0.5 hover:text-red-400"><Trash2 size={10} /></button>
                                <button onClick={() => moveColumn(hIdx, 'right')} className="p-0.5 hover:text-[#518231]"><ChevronRight size={10} /></button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}

                    {/* Table Body rows */}
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {rows.map((row, rIdx) => {
                        let isAlt = false;
                        if (zebraStriping === 'odd' && rIdx % 2 !== 0) isAlt = true;
                        if (zebraStriping === 'even' && rIdx % 2 === 0) isAlt = true;

                        return (
                          <tr
                            key={row.id}
                            style={{
                              backgroundColor: customColorsEnabled ? (isAlt ? altRowBgColor : rowBgColor) : undefined,
                              color: customColorsEnabled ? rowTextColor : undefined,
                            }}
                            className={`group border-b border-slate-100 dark:border-slate-800/40 transition-colors ${
                              !customColorsEnabled ? (isAlt ? 'bg-slate-50/50 dark:bg-slate-800/10' : 'bg-white dark:bg-slate-900') : ''
                            } ${hoverEffects ? 'hover:bg-slate-100/50 dark:hover:bg-slate-800/30' : ''}`}
                          >
                            {row.cells.map((cell, cIdx) => {
                              if (cell.isMerged) return null;

                              const isActive = activeCell?.r === rIdx && activeCell?.c === cIdx;
                              
                              const cellStyle: React.CSSProperties = {
                                padding: getPaddingPx(),
                                border: borderStyle === 'all' ? `1px solid ${customColorsEnabled ? borderColor : '#cbd5e1'}` : undefined,
                                borderBottom: borderStyle === 'horizontal' ? `1px solid ${customColorsEnabled ? borderColor : '#cbd5e1'}` : undefined,
                                borderLeft: borderStyle === 'vertical' && cIdx > 0 ? `1px solid ${customColorsEnabled ? borderColor : '#cbd5e1'}` : undefined,
                                borderRight: borderStyle === 'vertical' && cIdx < colsCount - 1 ? `1px solid ${customColorsEnabled ? borderColor : '#cbd5e1'}` : undefined,
                              };

                              return (
                                <td
                                  key={cell.id}
                                  colSpan={cell.colSpan}
                                  rowSpan={cell.rowSpan}
                                  style={cellStyle}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveCell({ r: rIdx, c: cIdx });
                                  }}
                                  className={`relative cursor-pointer transition-all ${
                                    isActive
                                      ? 'ring-2 ring-[#518231] bg-[#518231]/5 z-10'
                                      : 'hover:bg-slate-100/40 dark:hover:bg-slate-800/20'
                                  }`}
                                >
                                  {/* Inline direct cell content renderer */}
                                  <input
                                    type="text"
                                    value={cell.content}
                                    onChange={(e) => updateCellContent(rIdx, cIdx, e.target.value)}
                                    className="w-full bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-[#518231] rounded px-1 py-0.5 text-inherit"
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>

                    {/* Table Footer */}
                    {showFooter && (
                      <thead
                        style={{
                          backgroundColor: customColorsEnabled ? headerBgColor : undefined,
                          color: customColorsEnabled ? headerTextColor : undefined,
                        }}
                        className={`text-xs uppercase font-bold border-t border-slate-200 dark:border-slate-700 ${
                          !customColorsEnabled ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : ''
                        }`}
                      >
                        <tr>
                          {headers.map(h => (
                            <th
                              key={h.id}
                              style={{
                                padding: getPaddingPx(),
                                border: borderStyle === 'all' ? `1px solid ${customColorsEnabled ? borderColor : '#e2e8f0'}` : undefined,
                              }}
                            >
                              {h.text}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                  </table>
                </div>

              </div>
            </div>

            {/* Advance visual preview simulation logs (Sort, search filters) */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4 space-y-4">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Interactive Preview Simulation Features (Search / Paging / Sorting)
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search simulation input */}
                <div className="md:col-span-6 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={14} /></span>
                  <input
                    type="text"
                    placeholder="Search/Filter mock content rows..."
                    value={previewSearch}
                    onChange={(e) => {
                      setPreviewSearch(e.target.value);
                      setPreviewPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#518231] bg-slate-50 dark:bg-slate-950"
                  />
                </div>

                {/* Sort selector simulation */}
                <div className="md:col-span-3">
                  <select
                    value={previewSortCol !== null ? previewSortCol : ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPreviewSortCol(val === "" ? null : parseInt(val));
                    }}
                    className="w-full p-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none bg-slate-50 dark:bg-slate-950"
                  >
                    <option value="">Sort by: None</option>
                    {headers.map((h, idx) => (
                      <option key={idx} value={idx}>{h.text}</option>
                    ))}
                  </select>
                </div>
                
                {/* Toggle sort directions */}
                <div className="md:col-span-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setPreviewSortAsc(!previewSortAsc)}
                    disabled={previewSortCol === null}
                    className="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 disabled:opacity-40 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1 text-xs font-semibold"
                  >
                    <ArrowUpDown size={13} /> {previewSortAsc ? "Ascending" : "Descending"}
                  </button>
                </div>
              </div>

              {/* Rendered Live Simulation Container */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Simulated Live Render Result</span>
                
                {filteredAndSortedRows.length > 0 ? (
                  <div className="space-y-4">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-500">
                          {headers.map((h, idx) => (
                            <th key={idx} className="pb-2">{h.text}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                        {paginatedRows.map(row => (
                          <tr key={row.id} className="hover:bg-slate-100/30 dark:hover:bg-slate-800/20">
                            {row.cells.map(cell => {
                              if (cell.isMerged) return null;
                              return (
                                <td key={cell.id} colSpan={cell.colSpan} rowSpan={cell.rowSpan} className="py-2.5">
                                  {cell.content || <span className="text-slate-300 dark:text-slate-700 italic">Empty</span>}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination elements */}
                    {maxPages > 1 && (
                      <div className="flex items-center justify-between border-t border-slate-150 dark:border-slate-800 pt-2 text-[10px] text-slate-500 font-bold">
                        <span>Showing {((previewPage - 1) * itemsPerPage) + 1} - {Math.min(previewPage * itemsPerPage, filteredAndSortedRows.length)} of {filteredAndSortedRows.length} rows</span>
                        
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setPreviewPage(prev => Math.max(prev - 1, 1))}
                            disabled={previewPage === 1}
                            className="p-1 px-2 border rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40"
                          >
                            Prev
                          </button>
                          <span className="px-2">Page {previewPage} of {maxPages}</span>
                          <button
                            onClick={() => setPreviewPage(prev => Math.min(prev + 1, maxPages))}
                            disabled={previewPage === maxPages}
                            className="p-1 px-2 border rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 text-xs text-slate-400 dark:text-slate-500 italic">
                    No rows match your simulated filter.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Code outputs code blocks framework sections */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-[500px]">
            
            {/* Headers tabs controls */}
            <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {(['html', 'tailwind', 'jsx', 'bootstrap', 'markdown', 'csv', 'json'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all shrink-0 ${
                      activeTab === tab
                        ? 'bg-[#518231] text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab === 'jsx' ? 'React JSX' : tab}
                  </button>
                ))}
              </div>

              {/* Code buttons copy/download */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="text-green-500" size={14} /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="p-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                  title="Download File"
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Content display area */}
            <div className="flex-1 w-full p-4 overflow-auto custom-scrollbar font-mono text-xs text-slate-300 bg-slate-950">
              <pre className="whitespace-pre-wrap select-all">
                <code>{getCompiledCode()}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          IMPORT DATA MODAL DIALOG
          ──────────────────────────────────────────────────────── */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-950/65 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="text-[#518231]" /> Import Data Grid
              </h4>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Paste structured raw data. Accepts comma-separated values (CSV), tab-separated clipboard copies from Excel/Sheets (TSV), or arrays of JSON objects/rows.
              </span>
              <textarea
                rows={10}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={`Example JSON:\n[\n  {"Product": "Earbuds", "Price": "$59", "Stock": 150},\n  {"Product": "Speaker", "Price": "$99", "Stock": 45}\n]\n\nOr paste CSV:\nProduct, Price, Stock\nEarbuds, 59, 150\nSpeaker, 99, 45`}
                className="w-full p-3 font-mono text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-1 focus:ring-[#518231] text-slate-800 dark:text-slate-200"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportData}
                  disabled={!importText.trim()}
                  className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] disabled:opacity-40 text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Confirm Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
