'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Group: PanelGroup, Panel, Separator: PanelResizeHandle } = require('react-resizable-panels');
import { Database, FolderTree, Table2, LayoutList, GripVertical, ChevronRight, ChevronDown, Key, Search, FileJson } from 'lucide-react';
import { StatusBadge } from '../ui/PlatformUI';
import { apiUrl } from '../../../lib/api';

// Mock types
interface ColumnDef {
  name: string;
  type: string;
  is_primary: boolean;
}

interface TableDef {
  name: string;
  rows: number;
  size_mb: number;
  columns: ColumnDef[];
}

interface Schema {
  tables: TableDef[];
}

interface Connection {
  id: string;
  name: string;
  db_type: string;
}

export function ExplorerModule() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConn, setSelectedConn] = useState<string | null>(null);
  const [schema, setSchema] = useState<Schema | null>(null);
  const [selectedTable, setSelectedTable] = useState<TableDef | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [loadingSchema, setLoadingSchema] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(apiUrl('/api/connections'))
      .then(res => res.json())
      .then(data => setConnections(data))
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    if (selectedConn) {
      setLoadingSchema(true);
      fetch(apiUrl(`/api/connections/${selectedConn}/schema`))
        .then(res => res.json())
        .then(data => {
          setSchema(data);
          setLoadingSchema(false);
          // auto expand tables node
          setExpandedNodes(prev => new Set(prev).add(`${selectedConn}-tables`));
        });
    } else {
      setSchema(null);
    }
  }, [selectedConn]);

  useEffect(() => {
    if (selectedConn && selectedTable) {
      setLoadingPreview(true);
      fetch(apiUrl(`/api/connections/${selectedConn}/preview/${selectedTable.name}`))
        .then(res => res.json())
        .then(data => {
          setPreviewData(data);
          setLoadingPreview(false);
        });
    } else {
      setPreviewData([]);
    }
  }, [selectedConn, selectedTable]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId);
      return next;
    });
  };

  const dbIcons: Record<string, string> = { postgres: '🐘', mysql: '🐬', mongodb: '🍃' };

  return (
    <div className="h-[calc(100vh-120px)] bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden flex shadow-2xl">
      <PanelGroup direction="horizontal">
        {/* Sidebar */}
        <Panel defaultSize={25} minSize={20} maxSize={40} className="bg-[#080D18] flex flex-col">
          <div className="p-4 border-b border-white/10 shrink-0">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-violet-400" /> Object Explorer
            </h3>
            <div className="mt-3 relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="text" 
                placeholder="Search schemas..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-violet-500/50"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            {connections.length === 0 ? (
              <p className="text-xs text-white/30 text-center mt-10">No connections available</p>
            ) : (
              connections.map(conn => (
                <div key={conn.id} className="mb-2">
                  <button 
                    onClick={() => { setSelectedConn(conn.id); toggleNode(conn.id); }}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left transition-colors ${selectedConn === conn.id ? 'bg-violet-500/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    {expandedNodes.has(conn.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    <span className="text-base">{dbIcons[conn.db_type] || '🗄️'}</span>
                    <span className="font-medium truncate">{conn.name}</span>
                  </button>

                  <AnimatePresence>
                    {expandedNodes.has(conn.id) && selectedConn === conn.id && schema && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pl-6 border-l border-white/10 ml-4 mt-1 space-y-1">
                          {/* Tables Node */}
                          <button onClick={() => toggleNode(`${conn.id}-tables`)} className="w-full flex items-center gap-2 px-2 py-1 text-xs text-white/50 hover:text-white/80 transition-colors">
                            {expandedNodes.has(`${conn.id}-tables`) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                            <FolderTree className="w-3.5 h-3.5" /> Tables ({schema.tables.length})
                          </button>
                          
                          {expandedNodes.has(`${conn.id}-tables`) && schema.tables.map(table => (
                            <div key={table.name} className="pl-4">
                              <button 
                                onClick={() => { setSelectedTable(table); toggleNode(`table-${table.name}`); }}
                                className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs text-left transition-colors ${selectedTable?.name === table.name ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                              >
                                {expandedNodes.has(`table-${table.name}`) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                <Table2 className="w-3.5 h-3.5" /> {table.name}
                              </button>
                              
                              {/* Columns */}
                              {expandedNodes.has(`table-${table.name}`) && (
                                <div className="pl-6 space-y-1 mt-1">
                                  {table.columns.map(col => (
                                    <div key={col.name} className="flex items-center justify-between px-2 py-0.5 text-[10px] font-mono text-white/40">
                                      <span className="flex items-center gap-1.5">
                                        {col.is_primary ? <Key className="w-2.5 h-2.5 text-amber-400" /> : <LayoutList className="w-2.5 h-2.5 text-blue-400" />}
                                        {col.name}
                                      </span>
                                      <span className="text-white/20">{col.type}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
        </Panel>
        
        <PanelResizeHandle className="w-1 bg-white/5 hover:bg-violet-500/50 cursor-col-resize flex items-center justify-center transition-colors">
          <GripVertical className="w-3 h-3 text-white/30" />
        </PanelResizeHandle>

        {/* Main Content */}
        <Panel className="bg-[#0E1628] flex flex-col">
          {selectedTable ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Table2 className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedTable.name}</h3>
                    <p className="text-xs text-white/40">~{selectedTable.rows.toLocaleString()} rows • {selectedTable.size_mb} MB</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium text-white/70 bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors">
                    <FileJson className="w-3.5 h-3.5" /> Export Mock
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center gap-2 transition-colors">
                    <Database className="w-3.5 h-3.5" /> Sync Schema
                  </button>
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="flex-1 overflow-auto p-4 scrollbar-thin">
                {loadingPreview ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
                  </div>
                ) : previewData.length > 0 ? (
                  <div className="border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead className="bg-[#080D18]">
                        <tr>
                          {selectedTable.columns.map(c => (
                            <th key={c.name} className="px-4 py-3 font-semibold text-white/60 border-b border-white/10">
                              {c.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {previewData.map((row, i) => (
                          <tr key={i} className="hover:bg-white/[0.02]">
                            {selectedTable.columns.map(c => (
                              <td key={c.name} className="px-4 py-3 font-mono text-white/70">
                                {String(row[c.name])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-white/30 text-sm mt-10">No data found in this table.</div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <Database className="w-16 h-16 text-white/5 mb-4" />
              <h3 className="text-lg font-semibold text-white/60">No Object Selected</h3>
              <p className="text-sm text-white/30 mt-2 max-w-sm">Select a connection and a table from the Object Explorer to view its schema and data preview.</p>
            </div>
          )}
        </Panel>
      </PanelGroup>
    </div>
  );
}
