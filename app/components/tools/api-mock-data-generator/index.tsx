"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Plus, Trash2, Copy, ChevronDown, ChevronRight, Settings, Code,
  Database, Sparkles, Download, RefreshCw, Play, Check, Search,
  FileJson, FileSpreadsheet, Save, Clock, AlertTriangle, Terminal,
  Eye, Edit3, X, Sliders, PlayCircle
} from "lucide-react";
import { SchemaField, FieldType, FieldRules, ApiSimulationConfig, OutputFormat } from "./types";
import { PRESET_TEMPLATES } from "./presets";
import {
  generateMockData,
  convertToJSON,
  convertToCSV,
  convertToSQL,
  convertToJSObject,
  generateTypeScript,
  generateZodSchema,
  generateJSONSchema,
  generateGraphQL
} from "./generator";

// Helper to generate unique IDs
const makeId = () => Math.random().toString(36).substr(2, 9);

// Grouped Field Types for Selector
const FIELD_GROUPS = [
  {
    label: "Basic Types",
    types: [
      { value: "string", label: "String" },
      { value: "number", label: "Number" },
      { value: "boolean", label: "Boolean" },
      { value: "float", label: "Float" },
      { value: "integer", label: "Integer" },
      { value: "decimal", label: "Decimal" },
      { value: "null", label: "Null" },
      { value: "date", label: "Date" },
      { value: "time", label: "Time" },
      { value: "timestamp", label: "Timestamp" }
    ]
  },
  {
    label: "Identity Data",
    types: [
      { value: "fullname", label: "Full Name" },
      { value: "firstname", label: "First Name" },
      { value: "lastname", label: "Last Name" },
      { value: "username", label: "Username" },
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone Number" },
      { value: "password", label: "Password" },
      { value: "uuid", label: "UUID" }
    ]
  },
  {
    label: "Internet Data",
    types: [
      { value: "url", label: "URL" },
      { value: "domain", label: "Domain" },
      { value: "ip", label: "IP Address" },
      { value: "useragent", label: "User Agent" },
      { value: "avatar", label: "Avatar URL" }
    ]
  },
  {
    label: "Location Data",
    types: [
      { value: "country", label: "Country" },
      { value: "city", label: "City" },
      { value: "state", label: "State" },
      { value: "zip", label: "Zip Code" },
      { value: "latitude", label: "Latitude" },
      { value: "longitude", label: "Longitude" },
      { value: "address", label: "Full Address" }
    ]
  },
  {
    label: "Business Data",
    types: [
      { value: "company", label: "Company Name" },
      { value: "jobtitle", label: "Job Title" },
      { value: "currency", label: "Currency" },
      { value: "price", label: "Price" },
      { value: "productname", label: "Product Name" }
    ]
  },
  {
    label: "Developer Data",
    types: [
      { value: "apikey", label: "API Key" },
      { value: "jwt", label: "JWT Token" },
      { value: "slug", label: "Slug" },
      { value: "hexcolor", label: "Hex Color" },
      { value: "base64", label: "Base64 String" },
      { value: "hash", label: "Random Hash" }
    ]
  },
  {
    label: "Lorem Data",
    types: [
      { value: "sentence", label: "Sentence" },
      { value: "paragraph", label: "Paragraph" },
      { value: "description", label: "Description" },
      { value: "articlesnippet", label: "Article Snippet" }
    ]
  },
  {
    label: "Structural",
    types: [
      { value: "object", label: "Object (Nested)" },
      { value: "array", label: "Array (Nested)" }
    ]
  }
];

export function ApiMockDataGeneratorTool() {
  // General Schema States
  const [schema, setSchema] = useState<SchemaField[]>([]);
  const [recordCount, setRecordCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"builder" | "simulation" | "types">("builder");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("json");
  const [typeFormat, setTypeFormat] = useState<"typescript" | "zod" | "graphql" | "json_schema">("typescript");

  // Preset state & templates
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>(PRESET_TEMPLATES[0].name);

  // Simulation State
  const [simulationConfig, setSimulationConfig] = useState<ApiSimulationConfig>({
    delay: 800,
    statusCode: 200,
    usePagination: false,
    page: 1,
    limit: 10,
    totalRecords: 100
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<any>(null);
  const [simulatedTime, setSimulatedTime] = useState<number | null>(null);

  // Search/Filter state for Field Types
  const [searchTerm, setSearchTerm] = useState("");

  // History & Custom Saved Schemas
  const [history, setHistory] = useState<{ name: string; timestamp: number; schema: SchemaField[] }[]>([]);
  const [saveSchemaName, setSaveSchemaName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Output generated data cache
  const [generatedRecords, setGeneratedRecords] = useState<any[]>([]);

  // Expanded fields in schema editor
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("api-mock-generator-history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to load schema history", e);
    }
    // Initialize default schema
    setSchema(JSON.parse(JSON.stringify(PRESET_TEMPLATES[0].schema)));
  }, []);

  // Generate mock data based on schema and count
  const handleGenerate = useCallback(() => {
    if (schema.length === 0) return;
    try {
      const data = generateMockData(schema, recordCount);
      setGeneratedRecords(data);
    } catch (e) {
      console.error("Failed generating records", e);
      showToast("Generation failed. Check field keys.");
    }
  }, [schema, recordCount, showToast]);

  // Re-generate automatically when schema or recordCount change
  useEffect(() => {
    handleGenerate();
  }, [schema, recordCount, handleGenerate]);

  // Handle preset change
  const loadPreset = (name: string) => {
    const preset = PRESET_TEMPLATES.find(p => p.name === name);
    if (preset) {
      setSchema(JSON.parse(JSON.stringify(preset.schema)));
      setSelectedTemplateName(name);
      showToast(`Loaded ${name} template`);
    }
  };

  // Schema Modifier Helpers
  const updateFieldInTree = (fields: SchemaField[], id: string, updater: (f: SchemaField) => SchemaField): SchemaField[] => {
    return fields.map((f) => {
      if (f.id === id) {
        return updater(f);
      }
      if (f.fields && f.fields.length > 0) {
        return { ...f, fields: updateFieldInTree(f.fields, id, updater) };
      }
      return f;
    });
  };

  const deleteFieldFromTree = (fields: SchemaField[], id: string): SchemaField[] => {
    return fields.filter(f => f.id !== id).map((f) => {
      if (f.fields && f.fields.length > 0) {
        return { ...f, fields: deleteFieldFromTree(f.fields, id) };
      }
      return f;
    });
  };

  // Field change handlers
  const handleFieldNameChange = (id: string, name: string) => {
    setSchema(prev => updateFieldInTree(prev, id, f => ({ ...f, name })));
  };

  const handleFieldTypeChange = (id: string, type: FieldType) => {
    setSchema(prev => updateFieldInTree(prev, id, f => {
      const isNested = type === "object" || type === "array";
      return {
        ...f,
        type,
        // Reset subfields list if not object/array
        fields: isNested ? (f.fields || [{ id: makeId(), name: "newField", type: "string", rules: {} }]) : undefined
      };
    }));
  };

  const handleRuleChange = (id: string, ruleKey: keyof FieldRules, value: any) => {
    setSchema(prev => updateFieldInTree(prev, id, f => ({
      ...f,
      rules: { ...f.rules, [ruleKey]: value }
    })));
  };

  const handleAddEnum = (id: string, inputVal: string) => {
    if (!inputVal.trim()) return;
    setSchema(prev => updateFieldInTree(prev, id, f => {
      const existing = f.rules.enumValues || [];
      if (existing.includes(inputVal.trim())) return f;
      return {
        ...f,
        rules: { ...f.rules, enumValues: [...existing, inputVal.trim()] }
      };
    }));
  };

  const handleRemoveEnum = (id: string, valToRemove: string) => {
    setSchema(prev => updateFieldInTree(prev, id, f => {
      const existing = f.rules.enumValues || [];
      return {
        ...f,
        rules: { ...f.rules, enumValues: existing.filter(x => x !== valToRemove) }
      };
    }));
  };

  const handleDeleteField = (id: string) => {
    setSchema(prev => deleteFieldFromTree(prev, id));
  };

  const handleAddField = (parentId?: string) => {
    const newField: SchemaField = {
      id: makeId(),
      name: "new_field_" + makeId().substring(0, 3),
      type: "string",
      rules: {}
    };

    if (parentId) {
      // Find parent, verify it can hold fields, and insert
      const insertRecursive = (fields: SchemaField[]): SchemaField[] => {
        return fields.map(f => {
          if (f.id === parentId) {
            return { ...f, fields: [...(f.fields || []), newField] };
          }
          if (f.fields && f.fields.length > 0) {
            return { ...f, fields: insertRecursive(f.fields) };
          }
          return f;
        });
      };
      setSchema(prev => insertRecursive(prev));
      setExpandedFields(prev => ({ ...prev, [parentId]: true }));
    } else {
      setSchema(prev => [...prev, newField]);
    }
  };

  const handleDuplicateField = (id: string) => {
    // Recursive duplication helper
    const duplicateInTree = (fields: SchemaField[]): SchemaField[] => {
      const foundIdx = fields.findIndex(f => f.id === id);
      if (foundIdx !== -1) {
        const item = fields[foundIdx];
        const copy: SchemaField = JSON.parse(JSON.stringify(item));
        copy.id = makeId();
        copy.name = `${copy.name}_copy`;
        // Deep reset child IDs to avoid conflicts
        const resetIds = (fList: SchemaField[]) => {
          fList.forEach(c => {
            c.id = makeId();
            if (c.fields) resetIds(c.fields);
          });
        };
        if (copy.fields) resetIds(copy.fields);

        const newFields = [...fields];
        newFields.splice(foundIdx + 1, 0, copy);
        return newFields;
      }
      return fields.map(f => {
        if (f.fields && f.fields.length > 0) {
          return { ...f, fields: duplicateInTree(f.fields) };
        }
        return f;
      });
    };
    setSchema(prev => duplicateInTree(prev));
    showToast("Field duplicated");
  };

  const toggleExpand = (id: string) => {
    setExpandedFields(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Schema Validation Check
  const validationWarnings = useMemo(() => {
    const warnings: string[] = [];
    const checkNames = (fields: SchemaField[], path = "") => {
      const seen = new Set<string>();
      fields.forEach(f => {
        const fullPath = path ? `${path}.${f.name}` : f.name;
        if (!f.name.trim()) {
          warnings.push(`Field ID ${f.id} has an empty name.`);
        }
        if (seen.has(f.name)) {
          warnings.push(`Duplicate key name "${f.name}" detected in the same tier.`);
        }
        seen.add(f.name);
        
        if (f.type === "object" && (!f.fields || f.fields.length === 0)) {
          warnings.push(`Nested object "${fullPath}" does not define any child fields.`);
        }
        if (f.type === "array" && (!f.fields || f.fields.length === 0)) {
          warnings.push(`Nested array "${fullPath}" does not define any child fields.`);
        }
        if (f.fields) {
          checkNames(f.fields, fullPath);
        }
      });
    };
    checkNames(schema);
    return warnings;
  }, [schema]);

  // Clipboard Copier
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
    } catch (e) {
      console.error(e);
      showToast("Failed to copy");
    }
  };

  // File Downloader
  const handleDownloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  };

  // Get current generated format content
  const previewContent = useMemo(() => {
    switch (outputFormat) {
      case "json":
        return convertToJSON(generatedRecords, false);
      case "json_min":
        return convertToJSON(generatedRecords, true);
      case "csv":
        return convertToCSV(generatedRecords, schema);
      case "sql":
        return convertToSQL(generatedRecords, schema, "mock_users");
      case "js_object":
        return convertToJSObject(generatedRecords);
      default:
        return convertToJSON(generatedRecords, false);
    }
  }, [generatedRecords, outputFormat, schema]);

  // Types preview content
  const typesPreviewContent = useMemo(() => {
    switch (typeFormat) {
      case "typescript":
        return generateTypeScript(schema, "MockResponse");
      case "zod":
        return generateZodSchema(schema, "mockResponseSchema");
      case "graphql":
        return generateGraphQL(schema, "MockResponse");
      case "json_schema":
        return generateJSONSchema(schema, "MockResponseSchema");
      default:
        return generateTypeScript(schema);
    }
  }, [schema, typeFormat]);

  // Simulation Response Handler
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulatedResponse(null);
    setSimulatedTime(null);

    const startTime = performance.now();

    setTimeout(() => {
      setIsSimulating(false);
      const endTime = performance.now();
      setSimulatedTime(Math.round(endTime - startTime));

      if (simulationConfig.statusCode >= 400) {
        setSimulatedResponse({
          error: true,
          status: simulationConfig.statusCode,
          message: simulationConfig.statusCode === 401 ? "Unauthorized access token" :
                   simulationConfig.statusCode === 404 ? "Endpoint not found" :
                   simulationConfig.statusCode === 403 ? "Forbidden Resource" :
                   "Internal Server Error simulation"
        });
      } else {
        const records = generateMockData(schema, simulationConfig.limit);
        if (simulationConfig.usePagination) {
          setSimulatedResponse({
            info: {
              total: simulationConfig.totalRecords,
              page: simulationConfig.page,
              limit: simulationConfig.limit,
              pages: Math.ceil(simulationConfig.totalRecords / simulationConfig.limit)
            },
            results: records
          });
        } else {
          setSimulatedResponse(records);
        }
      }
    }, simulationConfig.delay);
  };

  // Local Storage Preset Saver
  const saveCustomSchema = () => {
    if (!saveSchemaName.trim()) {
      showToast("Please enter a name for the schema.");
      return;
    }
    const newEntry = {
      name: saveSchemaName.trim(),
      timestamp: Date.now(),
      schema: JSON.parse(JSON.stringify(schema))
    };
    const updated = [newEntry, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem("api-mock-generator-history", JSON.stringify(updated));
    setSaveSchemaName("");
    setShowSaveDialog(false);
    showToast(`Saved "${newEntry.name}" to history`);
  };

  const deleteHistoryItem = (timestamp: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(h => h.timestamp !== timestamp);
    setHistory(updated);
    localStorage.setItem("api-mock-generator-history", JSON.stringify(updated));
    showToast("Schema deleted");
  };

  // Filtered field types list based on search bar query
  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return FIELD_GROUPS;
    const term = searchTerm.toLowerCase();
    return FIELD_GROUPS.map(g => {
      const types = g.types.filter(t => 
        t.label.toLowerCase().includes(term) || t.value.toLowerCase().includes(term)
      );
      return { ...g, types };
    }).filter(g => g.types.length > 0);
  }, [searchTerm]);

  return (
    <div className="w-full space-y-6 text-slate-800 dark:text-slate-200">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 bg-[#518231] text-white rounded-xl shadow-lg text-sm font-semibold animate-in fade-in slide-in-from-top-3 duration-200">
          {toast}
        </div>
      )}

      {/* Preset templates selector & Bulk controls */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Preset Template</label>
          <div className="flex items-center gap-2">
            <select
              value={selectedTemplateName}
              onChange={e => loadPreset(e.target.value)}
              className="px-4 py-2.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#518231]"
            >
              {PRESET_TEMPLATES.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
            <button
              onClick={handleGenerate}
              title="Refresh generation payload"
              className="p-2.5 bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm text-slate-600 dark:text-slate-300 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Record count selector */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Record Count</label>
            <div className="flex items-center gap-1.5">
              {[5, 10, 50, 100].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => { setRecordCount(cnt); setCustomCountInput(""); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${recordCount === cnt ? "bg-[#518231] border-[#518231] text-white shadow-sm" : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-350 hover:border-slate-350"}`}
                >
                  {cnt}
                </button>
              ))}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-850 ml-1">
                <input
                  type="number"
                  min="1"
                  max="5000"
                  placeholder="Custom"
                  value={customCountInput}
                  onChange={e => {
                    setCustomCountInput(e.target.value);
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      setRecordCount(Math.min(val, 5000));
                    }
                  }}
                  className="w-16 px-2 py-1 bg-transparent text-xs text-center outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-end gap-2.5">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-750 dark:text-slate-200 rounded-xl text-sm font-bold shadow-sm transition-all"
          >
            <Save size={16} /> Save Schema
          </button>
        </div>
      </div>

      {/* Save Dialog Popup */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold">Save Current Schema</h3>
            <p className="text-sm text-slate-500">Provide a name to recall this schema layout from history later.</p>
            <input
              type="text"
              placeholder="e.g. User Profile Custom"
              value={saveSchemaName}
              onChange={e => setSaveSchemaName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => { setShowSaveDialog(false); setSaveSchemaName(""); }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-250 rounded-lg text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomSchema}
                className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg text-sm font-bold shadow-md shadow-green-950/10"
              >
                Save Schema
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main workspace Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("builder")}
          className={`px-5 py-3 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${activeTab === "builder" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
        >
          <Sliders size={15} /> Schema Builder
        </button>
        <button
          onClick={() => setActiveTab("types")}
          className={`px-5 py-3 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${activeTab === "types" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
        >
          <Code size={15} /> Type Definitions
        </button>
        <button
          onClick={() => setActiveTab("simulation")}
          className={`px-5 py-3 text-sm font-bold transition-all flex items-center gap-2 border-b-2 ${activeTab === "simulation" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
        >
          <PlayCircle size={15} /> API Simulation Mode
        </button>
      </div>

      {/* Workspace content grids */}
      {activeTab === "builder" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Builder Panel */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                Schema Fields
                <span className="text-xs font-normal bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 px-2.5 py-0.5 rounded-full text-slate-500 dark:text-slate-400">
                  {schema.length} fields
                </span>
              </h3>
              <button
                onClick={() => handleAddField()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#518231]/10 text-[#518231] dark:bg-[#518231]/20 dark:text-green-450 hover:bg-[#518231]/20 rounded-xl text-xs font-bold transition-colors"
              >
                <Plus size={14} /> Add Root Field
              </button>
            </div>

            {/* Validation warnings inline */}
            {validationWarnings.length > 0 && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-sm font-bold text-amber-800 dark:text-amber-400">Schema Configuration Warning</span>
                  <ul className="list-disc pl-4 text-xs text-amber-700 dark:text-amber-500 space-y-0.5">
                    {validationWarnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Fields list builder */}
            <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1.5 custom-scrollbar">
              {schema.length === 0 ? (
                <div className="text-center p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
                  <Sparkles className="mx-auto mb-3 opacity-40" size={32} />
                  <p className="text-sm">No schema fields configured.</p>
                  <button
                    onClick={() => handleAddField()}
                    className="mt-3 px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl text-xs font-bold"
                  >
                    Add Your First Field
                  </button>
                </div>
              ) : (
                schema.map(f => (
                  <FieldRow
                    key={f.id}
                    field={f}
                    onNameChange={handleFieldNameChange}
                    onTypeChange={handleFieldTypeChange}
                    onRuleChange={handleRuleChange}
                    onDelete={handleDeleteField}
                    onDuplicate={handleDuplicateField}
                    onAddChild={handleAddField}
                    onToggleExpand={toggleExpand}
                    isExpanded={!!expandedFields[f.id]}
                    onAddEnum={handleAddEnum}
                    onRemoveEnum={handleRemoveEnum}
                  />
                ))
              )}
            </div>

            {/* Saved configurations listing */}
            {history.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={14} /> Saved Custom Schemas ({history.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {history.map(item => (
                    <div
                      key={item.timestamp}
                      onClick={() => { setSchema(JSON.parse(JSON.stringify(item.schema))); setSelectedTemplateName(""); showToast(`Loaded custom: ${item.name}`); }}
                      className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md cursor-pointer flex items-center justify-between transition-all group"
                    >
                      <div className="truncate">
                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 block truncate">{item.name}</span>
                        <span className="text-[10px] text-slate-400">{new Date(item.timestamp).toLocaleDateString()} &bull; {item.schema.length} fields</span>
                      </div>
                      <button
                        onClick={(e) => deleteHistoryItem(item.timestamp, e)}
                        className="text-slate-400 hover:text-red-500 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete saved schema"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Editor Preview Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Terminal size={16} className="text-[#518231]" /> Response Preview
              </h3>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border dark:border-slate-750">
                {(["json", "json_min", "csv", "sql", "js_object"] as OutputFormat[]).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setOutputFormat(fmt)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all ${outputFormat === fmt ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-850"}`}
                  >
                    {fmt.replace("json_min", "minified").replace("js_object", "js")}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Mock Preview Window */}
            <div className="relative border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-950 text-slate-200 p-4 font-mono text-sm overflow-hidden flex flex-col h-[520px]">
              <div className="absolute right-4 top-4 flex items-center gap-1.5 z-10">
                <button
                  onClick={() => handleCopyText(previewContent)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white rounded-lg transition-colors"
                  title="Copy formatted result"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() => handleDownloadFile(
                    previewContent,
                    `mock_data.${outputFormat === "json_min" ? "json" : outputFormat === "js_object" ? "js" : outputFormat}`,
                    outputFormat.includes("json") ? "application/json" : outputFormat === "csv" ? "text/csv" : "text/plain"
                  )}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white rounded-lg transition-colors"
                  title="Download result file"
                >
                  <Download size={14} />
                </button>
              </div>
              <textarea
                readOnly
                value={previewContent}
                className="w-full h-full bg-transparent outline-none resize-none overflow-y-auto text-emerald-450 custom-scrollbar pr-8 border-none select-all"
              />
            </div>
            <p className="text-xs text-slate-400 text-right italic">
              Mock generation occurs entirely client-side for maximum developer privacy.
            </p>
          </div>
        </div>
      )}

      {/* Workspace dynamic Types View */}
      {activeTab === "types" && (
        <div className="space-y-4 max-w-4xl mx-auto py-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Automatic Type Generation</h3>
              <p className="text-sm text-slate-500">Compile types and validation structures matching your mock schema instantly.</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-105 dark:bg-slate-800 p-0.5 rounded-lg border dark:border-slate-750">
              {(["typescript", "zod", "graphql", "json_schema"] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setTypeFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${typeFormat === fmt ? "bg-white dark:bg-slate-900 text-slate-850 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  {fmt === "json_schema" ? "JSON Schema" : fmt.charAt(0).toUpperCase() + fmt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="relative border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-950 text-slate-200 p-4 font-mono text-sm h-[520px] flex flex-col">
            <div className="absolute right-4 top-4 z-10 flex gap-2">
              <button
                onClick={() => handleCopyText(typesPreviewContent)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Copy types content"
              >
                <Copy size={15} />
              </button>
              <button
                onClick={() => handleDownloadFile(
                  typesPreviewContent,
                  typeFormat === "typescript" ? "types.ts" : typeFormat === "zod" ? "schema.zod.ts" : typeFormat === "graphql" ? "schema.graphql" : "schema.json",
                  "text/plain"
                )}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Download types file"
              >
                <Download size={15} />
              </button>
            </div>
            <textarea
              readOnly
              value={typesPreviewContent}
              className="w-full h-full bg-transparent text-blue-400 outline-none resize-none overflow-y-auto custom-scrollbar border-none select-all"
            />
          </div>
        </div>
      )}

      {/* Workspace API Simulation view */}
      {activeTab === "simulation" && (
        <div className="space-y-6 max-w-4xl mx-auto py-2">
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Fake REST API Endpoint Simulator</h3>
            <p className="text-sm text-slate-500">Test how your applications interface with simulated network requests, custom HTTP response status codes, and latency spikes.</p>
          </div>

          {/* Endpoint controls dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Response Latency ({simulationConfig.delay}ms)</label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={simulationConfig.delay}
                onChange={e => setSimulationConfig(prev => ({ ...prev, delay: parseInt(e.target.value) }))}
                className="w-full accent-[#518231] h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Simulates network lag or database query overhead.</span>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">HTTP Status Code</label>
              <select
                value={simulationConfig.statusCode}
                onChange={e => setSimulationConfig(prev => ({ ...prev, statusCode: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              >
                <option value="200">200 OK</option>
                <option value="201">201 Created</option>
                <option value="400">400 Bad Request</option>
                <option value="401">401 Unauthorized</option>
                <option value="403">403 Forbidden</option>
                <option value="404">404 Not Found</option>
                <option value="500">500 Internal Server Error</option>
              </select>
              <span className="text-[10px] text-slate-400 block">Simulates server state responses.</span>
            </div>

            <div className="space-y-2 flex flex-col justify-center">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${simulationConfig.usePagination ? "bg-[#518231] border-[#518231]" : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-650"}`}>
                  {simulationConfig.usePagination && <Check size={14} className="text-white" />}
                </div>
                <span className="text-sm font-semibold">Simulate Pagination</span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={simulationConfig.usePagination}
                  onChange={e => setSimulationConfig(prev => ({ ...prev, usePagination: e.target.checked }))}
                />
              </label>
              <span className="text-[10px] text-slate-400 block mt-1">Wraps data inside a paginated meta envelope.</span>
            </div>
          </div>

          {/* Test URL block */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm font-mono text-sm overflow-x-auto">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-bold uppercase shrink-0">GET</span>
            <span className="text-slate-400 shrink-0">https://nexuscalculator.net/api/v1/mock-endpoint</span>
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-bold text-xs shadow-sm transition-all disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw size={12} className="animate-spin" /> Simulating...
                </>
              ) : (
                <>
                  <Play size={12} fill="currentColor" /> Send Request
                </>
              )}
            </button>
          </div>

          {/* Simulated API Output block */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950 flex flex-col h-[380px]">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
              <span>RESPONSE PAYLOAD</span>
              {simulatedTime !== null && (
                <span className="text-green-500 font-bold">
                  Status: {simulationConfig.statusCode} &bull; Time: {simulatedTime}ms
                </span>
              )}
            </div>
            <div className="p-4 overflow-y-auto flex-1 custom-scrollbar text-sm font-mono">
              {isSimulating ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                  <RefreshCw size={32} className="animate-spin text-[#518231]" />
                  <span className="text-xs">Waiting for simulated delay ({simulationConfig.delay}ms)...</span>
                </div>
              ) : simulatedResponse ? (
                <pre className="text-emerald-400">
                  <code>{JSON.stringify(simulatedResponse, null, 2)}</code>
                </pre>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                  Click &ldquo;Send Request&rdquo; to test endpoint latency and response.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================
// INTERNAL ROW COMPONENT (SchemaField row element)
// ====================================================

interface FieldRowProps {
  field: SchemaField;
  onNameChange: (id: string, name: string) => void;
  onTypeChange: (id: string, type: FieldType) => void;
  onRuleChange: (id: string, ruleKey: keyof FieldRules, value: any) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onToggleExpand: (id: string) => void;
  isExpanded: boolean;
  onAddEnum: (id: string, val: string) => void;
  onRemoveEnum: (id: string, val: string) => void;
}

function FieldRow({
  field,
  onNameChange,
  onTypeChange,
  onRuleChange,
  onDelete,
  onDuplicate,
  onAddChild,
  onToggleExpand,
  isExpanded,
  onAddEnum,
  onRemoveEnum
}: FieldRowProps) {
  const [enumInput, setEnumInput] = useState("");
  const isNested = field.type === "object" || field.type === "array";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 space-y-3 transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Expand nesting trigger */}
        {isNested && (
          <button
            onClick={() => onToggleExpand(field.id)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
            title="Expand nested fields"
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        )}

        {/* Field key name input */}
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={field.name}
            placeholder="field_key"
            onChange={e => onNameChange(field.id, e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold outline-none focus:ring-1 focus:ring-[#518231] focus:border-[#518231]"
          />
        </div>

        {/* Field Type Selector Dropdown */}
        <div className="w-full sm:w-48">
          <select
            value={field.type}
            onChange={e => onTypeChange(field.id, e.target.value as FieldType)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none"
          >
            {FIELD_GROUPS.map(g => (
              <optgroup key={g.label} label={g.label}>
                {g.types.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0 justify-end">
          {isNested && (
            <button
              onClick={() => onAddChild(field.id)}
              className="p-2 text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title="Add child nested field"
            >
              <Plus size={16} />
            </button>
          )}
          <button
            onClick={() => onDuplicate(field.id)}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition-colors"
            title="Duplicate field"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="p-2 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
            title="Delete field"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Rules Editor details pane */}
      <details className="group border-t border-slate-100 dark:border-slate-800 pt-3">
        <summary className="list-none flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider cursor-pointer select-none">
          <span className="flex items-center gap-1.5">
            <Settings size={12} /> Validation Rules
          </span>
          <ChevronDown size={12} className="transform group-open:rotate-180 transition-transform" />
        </summary>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 text-xs">
          {/* Rule: Nullability */}
          <div className="space-y-2 p-2 bg-slate-50/50 dark:bg-slate-950/20 border dark:border-slate-800 rounded-xl flex flex-col justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!field.rules.nullable}
                onChange={e => onRuleChange(field.id, "nullable", e.target.checked)}
                className="rounded text-[#518231] focus:ring-[#518231]"
              />
              <span className="font-semibold text-slate-750 dark:text-slate-350">Nullable Field</span>
            </label>
            {field.rules.nullable && (
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Null Chance ({field.rules.nullProbability ?? 20}%)</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={field.rules.nullProbability ?? 20}
                  onChange={e => onRuleChange(field.id, "nullProbability", parseInt(e.target.value))}
                  className="w-full accent-[#518231] h-1 rounded"
                />
              </div>
            )}
          </div>

          {/* Rule: Required state */}
          <div className="p-2 bg-slate-50/50 dark:bg-slate-950/20 border dark:border-slate-800 rounded-xl flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.rules.required !== false}
                onChange={e => onRuleChange(field.id, "required", e.target.checked)}
                className="rounded text-[#518231] focus:ring-[#518231]"
              />
              <span className="font-semibold text-slate-750 dark:text-slate-350">Required Field</span>
            </label>
          </div>

          {/* Rule: Unique constraint */}
          <div className="p-2 bg-slate-50/50 dark:bg-slate-950/20 border dark:border-slate-800 rounded-xl flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!field.rules.unique}
                disabled={field.type === "object" || field.type === "array" || field.type === "boolean"}
                onChange={e => onRuleChange(field.id, "unique", e.target.checked)}
                className="rounded text-[#518231] focus:ring-[#518231] disabled:opacity-50"
              />
              <span className="font-semibold text-slate-750 dark:text-slate-350">Unique Values</span>
            </label>
          </div>

          {/* Rule: Number Limits (Min/Max/Precision) */}
          {(field.type === "number" || field.type === "integer" || field.type === "float" || field.type === "decimal" || field.type === "price") && (
            <>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Min Value</span>
                <input
                  type="number"
                  value={field.rules.min ?? ""}
                  placeholder="e.g. 0"
                  onChange={e => onRuleChange(field.id, "min", e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Max Value</span>
                <input
                  type="number"
                  value={field.rules.max ?? ""}
                  placeholder="e.g. 100"
                  onChange={e => onRuleChange(field.id, "max", e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                />
              </div>
              {(field.type === "float" || field.type === "decimal" || field.type === "price") && (
                <div className="space-y-1">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Decimal Places</span>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    value={field.rules.precision ?? 2}
                    onChange={e => onRuleChange(field.id, "precision", Number(e.target.value))}
                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                  />
                </div>
              )}
            </>
          )}

          {/* Rule: String limits */}
          {field.type === "string" && (
            <>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Min Length</span>
                <input
                  type="number"
                  min="1"
                  value={field.rules.min ?? ""}
                  placeholder="e.g. 5"
                  onChange={e => onRuleChange(field.id, "min", e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Max Length</span>
                <input
                  type="number"
                  value={field.rules.maxLength ?? ""}
                  placeholder="e.g. 50"
                  onChange={e => onRuleChange(field.id, "maxLength", e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                />
              </div>
            </>
          )}

          {/* Rule: Date/Timestamp Ranges */}
          {(field.type === "date" || field.type === "timestamp") && (
            <>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Start Date</span>
                <input
                  type="date"
                  value={field.rules.startDate ?? ""}
                  onChange={e => onRuleChange(field.id, "startDate", e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">End Date</span>
                <input
                  type="date"
                  value={field.rules.endDate ?? ""}
                  onChange={e => onRuleChange(field.id, "endDate", e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs font-mono"
                />
              </div>
            </>
          )}

          {/* Rule: Array Limits */}
          {field.type === "array" && (
            <>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Min Items</span>
                <input
                  type="number"
                  min="0"
                  value={field.rules.min ?? 1}
                  onChange={e => onRuleChange(field.id, "min", Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Max Items</span>
                <input
                  type="number"
                  min="1"
                  value={field.rules.max ?? 5}
                  onChange={e => onRuleChange(field.id, "max", Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                />
              </div>
            </>
          )}

          {/* Rule: Enum Values list */}
          {field.type !== "object" && field.type !== "array" && field.type !== "null" && (
            <div className="space-y-1 sm:col-span-2">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Enum Options</span>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Press enter to add option..."
                  value={enumInput}
                  onChange={e => setEnumInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onAddEnum(field.id, enumInput);
                      setEnumInput("");
                    }
                  }}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs"
                />
              </div>
              {field.rules.enumValues && field.rules.enumValues.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1.5">
                  {field.rules.enumValues.map(v => (
                    <span
                      key={v}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-[10px] font-semibold flex items-center gap-1 select-none"
                    >
                      {v}
                      <X
                        size={10}
                        className="cursor-pointer text-slate-450 hover:text-red-500 shrink-0"
                        onClick={() => onRemoveEnum(field.id, v)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </details>

      {/* Recursive nested fields children renderer */}
      {isNested && isExpanded && field.fields && (
        <div className="pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-3 pt-3">
          {field.fields.map(childField => (
            <FieldRow
              key={childField.id}
              field={childField}
              onNameChange={onNameChange}
              onTypeChange={onTypeChange}
              onRuleChange={onRuleChange}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onAddChild={onAddChild}
              onToggleExpand={onToggleExpand}
              isExpanded={isExpanded}
              onAddEnum={onAddEnum}
              onRemoveEnum={onRemoveEnum}
            />
          ))}
        </div>
      )}
    </div>
  );
}
