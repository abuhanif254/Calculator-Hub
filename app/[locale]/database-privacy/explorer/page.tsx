'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Database,
  Table2,
  Columns,
  Search,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

interface Connection { id: string; name: string; type: string; host: string; dbname: string; status: string; }
interface SchemaColumn { name: string; dataType: string; nullable: boolean; maxLength: number | null; }
interface SchemaTable { name: string; rowCount: number | null; columns: SchemaColumn[]; }

// Simple heuristic to detect PII columns by name
const PII_PATTERNS = /(email|phone|mobile|ssn|national_id|passport|dob|birth|name|address|zip|postal|credit_card|card_number|pan|iban|ip_address|latitude|longitude|gender|race|religion|salary|income)/i;
const RISK_LEVEL = (colName: string): 'High' | 'Medium' | null => {
  if (/(email|ssn|national_id|passport|credit_card|card_number|pan|iban)/i.test(colName)) return 'High';
  if (PII_PATTERNS.test(colName)) return 'Medium';
  return null;
};

export default function ExplorerPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConn, setSelectedConn] = useState<Connection | null>(null);
  const [tables, setTables] = useState<SchemaTable[]>([]);
  const [selectedTable, setSelectedTable] = useState<SchemaTable | null>(null);
  const [expandedConns, setExpandedConns] = useState<Set<string>>(new Set());
  const [loadingConns, setLoadingConns] = useState(true);
  const [loadingSchema, setLoadingSchema] = useState(false);
  const [schemaError, setSchemaError] = useState('');
  const [search, setSearch] = useState('');

  // Fetch connections on mount
  useEffect(() => {
    fetch('/api/privacy/connections')
      .then(r => r.json())
      .then(d => {
        const list: Connection[] = d.connections ?? [];
        setConnections(list);
        if (list.length > 0) {
          setSelectedConn(list[0]);
          setExpandedConns(new Set([list[0].id]));
          loadSchema(list[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingConns(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSchema = async (conn: Connection) => {
    setLoadingSchema(true);
    setSchemaError('');
    setTables([]);
    setSelectedTable(null);
    try {
      const res = await fetch(`/api/privacy/connections/${conn.id}/schema`);
      if (!res.ok) throw new Error('Failed to load schema');
      const data = await res.json();
      const list: SchemaTable[] = data.tables ?? [];
      setTables(list);
      if (list.length > 0) setSelectedTable(list[0]);
    } catch (e: any) {
      setSchemaError(e.message);
    } finally {
      setLoadingSchema(false);
    }
  };

  const handleConnClick = (conn: Connection) => {
    setSelectedConn(conn);
    const next = new Set(expandedConns);
    if (next.has(conn.id)) next.delete(conn.id); else next.add(conn.id);
    setExpandedConns(next);
    if (!expandedConns.has(conn.id)) loadSchema(conn);
  };

  const handleScanTable = () => {
    if (!selectedConn || !selectedTable) return;
    router.push(`/${locale}/database-privacy/scanner?connection_id=${selectedConn.id}&table=${selectedTable.name}`);
  };

  const filteredTables = tables.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  const displayTable = selectedTable ?? (filteredTables.length > 0 ? filteredTables[0] : null);
  const piiColumns = displayTable?.columns.filter(c => RISK_LEVEL(c.name)) ?? [];

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Schema Explorer</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Navigate connections and inspect table structures with PII detection.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter tables..."
            className="pl-10 pr-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 w-52 dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-5 overflow-hidden min-h-0">
        {/* Sidebar */}
        <motion.div
          className="w-72 glass-panel rounded-2xl flex flex-col overflow-hidden shrink-0 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Connections ({connections.length})
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {loadingConns ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 animate-spin text-violet-500" />
              </div>
            ) : connections.length === 0 ? (
              <div className="text-center py-10 text-sm text-slate-400">
                <Database className="w-8 h-8 mx-auto mb-2 opacity-30" />
                No connections yet.
              </div>
            ) : (
              connections.map(conn => (
                <div key={conn.id}>
                  <button
                    onClick={() => handleConnClick(conn)}
                    className={`w-full flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors text-left ${
                      selectedConn?.id === conn.id
                        ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Database className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="truncate flex-1">{conn.name}</span>
                    <span className="text-xs text-slate-400">{conn.type}</span>
                    <ChevronRight className={`h-3 w-3 shrink-0 transition-transform ${expandedConns.has(conn.id) ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedConns.has(conn.id) && (
                    <div className="pl-5 mt-1 space-y-0.5">
                      {loadingSchema && selectedConn?.id === conn.id ? (
                        <div className="px-3 py-2 text-xs text-slate-400 flex items-center gap-1.5">
                          <Loader2 className="w-3 h-3 animate-spin" /> Loading...
                        </div>
                      ) : (
                        filteredTables.map(table => (
                          <button
                            key={table.name}
                            onClick={() => setSelectedTable(table)}
                            className={`w-full flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-colors text-left ${
                              displayTable?.name === table.name
                                ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-medium'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            <Table2 className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{table.name}</span>
                            {table.columns.some(c => RISK_LEVEL(c.name)) && (
                              <ShieldAlert className="h-3 w-3 shrink-0 text-amber-500" />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Main Panel */}
        <motion.div
          className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 min-w-0"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {schemaError ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3 p-8">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-slate-600 dark:text-slate-400 text-sm text-center">{schemaError}</p>
              <button onClick={() => selectedConn && loadSchema(selectedConn)} className="text-xs text-violet-600 hover:underline flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
            </div>
          ) : loadingSchema ? (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500 mx-auto mb-3" />
                <p className="text-sm text-slate-500">Loading schema from database...</p>
              </div>
            </div>
          ) : !displayTable ? (
            <div className="flex items-center justify-center flex-1 text-slate-400">
              <div className="text-center">
                <Table2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">Select a table from the left panel to inspect its schema.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Table header */}
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                    <Table2 className="h-5 w-5 text-violet-500" />
                    {selectedConn?.dbname}.{displayTable.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span>{displayTable.columns.length} columns</span>
                    {displayTable.rowCount !== null && (
                      <span>~{displayTable.rowCount.toLocaleString()} rows</span>
                    )}
                    {piiColumns.length > 0 && (
                      <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        {piiColumns.length} PII column{piiColumns.length !== 1 ? 's' : ''} detected
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => selectedConn && loadSchema(selectedConn)}
                    className="p-2 text-slate-400 hover:text-violet-600 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Refresh schema"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleScanTable}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Scan This Table
                  </button>
                </div>
              </div>

              {/* Column table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                    <tr>
                      <th className="p-4 font-medium text-slate-500">Column Name</th>
                      <th className="p-4 font-medium text-slate-500">Data Type</th>
                      <th className="p-4 font-medium text-slate-500">Nullable</th>
                      <th className="p-4 font-medium text-slate-500">PII Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {displayTable.columns.map((col, idx) => {
                      const risk = RISK_LEVEL(col.name);
                      return (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
                            <div className="flex items-center gap-2">
                              <Columns className="h-4 w-4 text-slate-400 shrink-0" />
                              {col.name}
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                            {col.dataType}{col.maxLength ? `(${col.maxLength})` : ''}
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-400 text-xs">
                            {col.nullable ? 'YES' : 'NO'}
                          </td>
                          <td className="p-4">
                            {risk ? (
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                risk === 'High'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                              }`}>
                                <ShieldAlert className="h-3 w-3" /> {risk} Risk
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                                <ShieldCheck className="h-3 w-3" /> Clean
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
