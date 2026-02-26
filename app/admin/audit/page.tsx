'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Search, 
  Filter, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  Database,
  Lock,
  Terminal
} from 'lucide-react';

export default function AdminAuditPage() {
  const [loading, setLoading] = useState(true);

  // Mock data
  const [logs, setLogs] = useState<any[]>([
    {
      id: 'AUD-1001',
      actor: 'Susanne Horner',
      action: 'offer.viewed',
      entity: 'OFF-98765',
      status: 'success',
      timestamp: '2026-02-25T14:00:00Z',
      ip: '192.168.1.45'
    },
    {
      id: 'AUD-1002',
      actor: 'Estate Owner',
      action: 'offer.accepted',
      entity: 'OFF-98766',
      status: 'success',
      timestamp: '2026-02-25T15:30:00Z',
      ip: '192.168.1.1'
    },
    {
      id: 'AUD-1003',
      actor: 'System',
      action: 'smart.push_contract',
      entity: 'OFF-98766',
      status: 'pending',
      timestamp: '2026-02-25T15:30:05Z',
      ip: 'internal'
    },
    {
      id: 'AUD-1004',
      actor: 'Michael Smith',
      action: 'offer.submitted',
      entity: 'OFF-98765',
      status: 'success',
      timestamp: '2026-02-25T12:00:00Z',
      ip: '72.14.213.12'
    }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-white border-b border-black/5 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="w-5 h-5 text-[#D0112B]" />
            <div className="text-xs font-serif tracking-widest uppercase">Smart Admin Audit</div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-[10px] uppercase tracking-widest text-black/40">System Status: <span className="text-emerald-500 font-medium">Operational</span></div>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Total Events', value: '1,284', icon: Database },
            { label: 'Security Alerts', value: '0', icon: Lock },
            { label: 'Integration Success', value: '99.8%', icon: CheckCircle },
            { label: 'Avg. Latency', value: '142ms', icon: Clock },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 border border-black/5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <stat.icon className="w-4 h-4 text-black/20" />
                <span className="text-[8px] uppercase tracking-widest text-emerald-500 font-medium">+2.4%</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">{stat.label}</div>
              <div className="text-xl font-serif">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-black/5 shadow-sm">
          <div className="p-6 border-b border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
              <input 
                type="text" 
                placeholder="Search audit logs..."
                className="w-full bg-[#F5F5F5] border-none pl-12 pr-4 py-2 text-xs font-light focus:outline-none"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 bg-[#F5F5F5] text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <Filter className="w-3 h-3" /> Filter
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 bg-[#F5F5F5] text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Event ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Actor</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Action</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Entity</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Timestamp</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-black/5 hover:bg-[#F5F5F5]/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-[10px] text-black/40">{log.id}</td>
                    <td className="px-6 py-4 text-xs font-medium">{log.actor}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-black/5 text-[8px] uppercase tracking-widest font-medium rounded">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-black/60">{log.entity}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {log.status === 'success' ? (
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                        ) : log.status === 'pending' ? (
                          <Clock className="w-3 h-3 text-amber-500" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        )}
                        <span className="text-[10px] uppercase tracking-widest">{log.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-black/40">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-black/20 hover:text-black transition-colors">
                        <Terminal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 p-8 bg-black text-white/40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest">End-to-End Encryption Active</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest">
            Audit logs are immutable and stored for 7 years.
          </div>
        </div>
      </main>
    </div>
  );
}
