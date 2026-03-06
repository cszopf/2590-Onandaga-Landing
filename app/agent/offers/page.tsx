'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Star, 
  MessageSquare, 
  FileText, 
  ArrowUpRight,
  ChevronDown,
  LayoutGrid,
  List,
  TrendingUp,
  ShieldCheck,
  Download,
  Sparkles,
  Loader2,
  X,
  RotateCw
} from 'lucide-react';

export default function AgentDashboard() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [summaries, setSummaries] = useState<Record<string, { text: string; loading: boolean }>>({});
  const [rejections, setRejections] = useState<Record<string, { text: string; loading: boolean }>>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Mock data
  const [offers, setOffers] = useState<any[]>([
    {
      id: 'OFF-98765',
      buyer: 'John & Jane Doe',
      agent: 'Michael Smith (Sotheby\'s)',
      price: 9100000,
      status: 'under_review',
      score: 8.2,
      submittedAt: '2026-02-25T10:00:00Z',
      financing: 'Conventional',
      contingencies: 3
    },
    {
      id: 'OFF-98766',
      buyer: 'Sterling Holdings LLC',
      agent: 'Sarah Johnson (Coldwell Banker)',
      price: 9250000,
      status: 'submitted',
      score: 9.1,
      submittedAt: '2026-02-25T11:30:00Z',
      financing: 'Cash',
      contingencies: 0
    },
    {
      id: 'OFF-98767',
      buyer: 'Robert Chen',
      agent: 'David Lee (RE/MAX)',
      price: 8950000,
      status: 'needs_clarification',
      score: 7.5,
      submittedAt: '2026-02-24T16:00:00Z',
      financing: 'Conventional',
      contingencies: 5
    }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const summarizeOffer = async (offer: any) => {
    const isExpanded = expandedIds.has(offer.id);
    
    if (isExpanded) {
      const newExpanded = new Set(expandedIds);
      newExpanded.delete(offer.id);
      setExpandedIds(newExpanded);
      return;
    }

    const newExpanded = new Set(expandedIds);
    newExpanded.add(offer.id);
    setExpandedIds(newExpanded);

    if (summaries[offer.id]?.text) {
      return;
    }

    await fetchSummary(offer);
  };

  const fetchSummary = async (offer: any) => {
    setSummaries(prev => ({ ...prev, [offer.id]: { text: '', loading: true } }));
    
    try {
      const prompt = `Analyze and summarize this real estate offer for a listing agent. 
      Highlight strengths, weaknesses, and potential risks. 
      Offer Details:
      Buyer: ${offer.buyer}
      Price: $${offer.price.toLocaleString()}
      Financing: ${offer.financing}
      Contingencies: ${offer.contingencies}
      Score: ${offer.score}
      
      Provide a concise, professional summary in 3-4 bullet points.`;

      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error Response:', data);
        throw new Error(data.error || (typeof data.details === 'string' ? data.details : JSON.stringify(data.details)) || "Failed to fetch from API");
      }

      setSummaries(prev => ({ ...prev, [offer.id]: { text: data.text, loading: false } }));
    } catch (error: any) {
      console.error("AI Summary Error:", error);
      setSummaries(prev => ({ ...prev, [offer.id]: { text: `Analysis Unavailable: ${error.message || "Connection error"}. Please ensure API keys are configured correctly.`, loading: false } }));
    }
  };

  const generateRejection = async (offer: any) => {
    if (rejections[offer.id]?.text) return;

    setRejections(prev => ({ ...prev, [offer.id]: { text: '', loading: true } }));

    try {
      const prompt = `Write a professional and polite rejection email to the buyer's agent for this real estate offer.
      The seller has decided not to accept the offer at this time.
      
      Reason for rejection: The price is lower than other competitive offers we have received, and the number of contingencies presents too much risk for the seller's timeline.
      
      Offer Details:
      Buyer: ${offer.buyer}
      Agent: ${offer.agent}
      Price: $${offer.price.toLocaleString()}
      Financing: ${offer.financing}
      Contingencies: ${offer.contingencies}
      
      The email should be encouraging but firm, thanking them for their interest.`;

      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.details || "Failed to generate rejection");

      setRejections(prev => ({ ...prev, [offer.id]: { text: data.text, loading: false } }));
    } catch (error: any) {
      console.error("Rejection Generation Error:", error);
      setRejections(prev => ({ ...prev, [offer.id]: { text: `Error: ${error.message || "Failed to generate response"}. Please try again.`, loading: false } }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-500 bg-blue-50';
      case 'under_review': return 'text-amber-500 bg-amber-50';
      case 'accepted': return 'text-emerald-500 bg-emerald-50';
      case 'declined': return 'text-red-500 bg-red-50';
      case 'needs_clarification': return 'text-purple-500 bg-purple-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Sidebar Nav (Desktop) */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white p-8 hidden lg:flex flex-col">
        <div className="text-xs font-serif tracking-[0.3em] uppercase mb-12">ENGEL & VÖLKERS</div>
        <nav className="space-y-8 flex-1">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-widest text-white/30">Management</div>
            <a href="#" className="flex items-center gap-3 text-xs uppercase tracking-widest hover:text-white transition-colors text-white">
              <LayoutGrid className="w-4 h-4" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 text-xs uppercase tracking-widest hover:text-white/60 transition-colors text-white/40">
              <TrendingUp className="w-4 h-4" /> Analytics
            </a>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-widest text-white/30">Properties</div>
            <a href="#" className="flex items-center gap-3 text-xs uppercase tracking-widest hover:text-white transition-colors text-white">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D0112B]" /> 2590 Onandaga
            </a>
          </div>
        </nav>
        <div className="pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px]">SH</div>
            <div className="text-[10px] uppercase tracking-widest">Susanne Horner</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-8 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-2">Listing Agent Dashboard</div>
            <h1 className="text-3xl font-serif font-light">2590 Onandaga Dr Offers</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 border border-black/10 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export All
            </button>
            <button className="px-6 py-3 bg-[#D0112B] text-white text-[10px] uppercase tracking-widest hover:bg-[#A00D21] transition-all flex items-center gap-2">
              Generate Seller Packet
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Offers', value: '12', icon: FileText },
            { label: 'Avg. Price', value: '$9.12M', icon: TrendingUp },
            { label: 'Highest Offer', value: '$9.45M', icon: Star },
            { label: 'Days Active', value: '8', icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 border border-black/5 shadow-sm">
              <stat.icon className="w-5 h-5 mb-4 text-black/20" />
              <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">{stat.label}</div>
              <div className="text-2xl font-serif">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
            <input 
              type="text" 
              placeholder="Search by buyer, agent, or ID..."
              className="w-full bg-white border border-black/5 pl-12 pr-4 py-3 text-sm font-light focus:outline-none focus:border-black/20 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-3 bg-white border border-black/5 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
              <Filter className="w-4 h-4" /> Filter <ChevronDown className="w-3 h-3" />
            </button>
            <div className="flex border border-black/5 bg-white">
              <button 
                onClick={() => setView('list')}
                className={`p-3 transition-colors ${view === 'list' ? 'bg-black text-white' : 'text-black/20 hover:text-black'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('grid')}
                className={`p-3 transition-colors ${view === 'grid' ? 'bg-black text-white' : 'text-black/20 hover:text-black'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Offers List */}
        <div className="bg-white border border-black/5 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 bg-[#F5F5F5]">
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Buyer / Agent</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Price</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Terms</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Score</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium">Status</th>
                <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-black/40 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <React.Fragment key={offer.id}>
                  <tr className={`border-b border-black/5 hover:bg-[#F5F5F5]/50 transition-colors group ${expandedIds.has(offer.id) ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-8 py-6">
                      <div className="text-sm font-medium mb-1">{offer.buyer}</div>
                      <div className="text-[10px] text-black/40 uppercase tracking-widest">{offer.agent}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-medium">${offer.price.toLocaleString()}</div>
                      <div className="text-[10px] text-black/40 uppercase tracking-widest">Feb 25, 2026</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] uppercase tracking-widest text-black/60 mb-1">{offer.financing}</div>
                      <div className="text-[10px] text-black/40 uppercase tracking-widest">{offer.contingencies} Contingencies</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full border-2 border-black/5 flex items-center justify-center text-xs font-serif">
                          {offer.score}
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-2.5 h-2.5 ${s <= Math.round(offer.score / 2) ? 'text-amber-400 fill-current' : 'text-black/10'}`} />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium ${getStatusColor(offer.status)}`}>
                        {offer.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button 
                          onClick={() => summarizeOffer(offer)}
                          disabled={summaries[offer.id]?.loading}
                          className={`p-2 transition-colors ${summaries[offer.id]?.loading ? 'text-amber-500 animate-pulse' : (expandedIds.has(offer.id) ? 'text-amber-600' : 'text-black/20 hover:text-amber-500')}`}
                          title="AI Summarize"
                        >
                          {summaries[offer.id]?.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        </button>
                        <button className="p-2 text-black/20 hover:text-black transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => window.location.href = `/offer/status/${offer.id}`}
                          className="p-2 text-black/20 hover:text-black transition-colors"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-black/20 hover:text-black transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedIds.has(offer.id) && (
                      <motion.tr 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-amber-50/30 border-b border-black/5 overflow-hidden"
                      >
                        <td colSpan={6} className="px-8 py-6">
                          <div className="flex justify-between items-start gap-8">
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12">
                              {/* Analysis Column */}
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Sparkles className="w-3 h-3 text-amber-600" />
                                    <span className="text-[10px] uppercase tracking-widest font-medium text-amber-900">AI Strategic Analysis</span>
                                  </div>
                                  <button 
                                    onClick={() => fetchSummary(offer)}
                                    disabled={summaries[offer.id]?.loading}
                                    className="p-1 text-amber-900/40 hover:text-amber-900 transition-colors disabled:opacity-50"
                                    title="Regenerate Analysis"
                                  >
                                    <RotateCw className={`w-3 h-3 ${summaries[offer.id]?.loading ? 'animate-spin' : ''}`} />
                                  </button>
                                </div>
                                {summaries[offer.id]?.loading ? (
                                  <div className="flex items-center gap-3 text-black/40">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span className="text-xs font-light italic">Synthesizing offer terms...</span>
                                  </div>
                                ) : (
                                  <div className="text-sm font-light leading-relaxed text-black/70 whitespace-pre-wrap">
                                    {summaries[offer.id]?.text}
                                  </div>
                                )}
                              </div>

                              {/* Response Column */}
                              <div className="lg:border-l border-black/5 lg:pl-12">
                                <div className="flex items-center gap-2 mb-4">
                                  <MessageSquare className="w-3 h-3 text-black/40" />
                                  <span className="text-[10px] uppercase tracking-widest font-medium text-black/60">Response Draft</span>
                                </div>
                                
                                {!rejections[offer.id] ? (
                                  <div className="space-y-4">
                                    <p className="text-xs font-light text-black/40">Generate a professional rejection response based on offer terms.</p>
                                    <button 
                                      onClick={() => generateRejection(offer)}
                                      className="px-4 py-3 bg-white border border-black/10 text-[10px] uppercase tracking-widest hover:border-black/30 hover:bg-black/5 transition-all flex items-center gap-2"
                                    >
                                      <Sparkles className="w-3 h-3" /> Generate Rejection Draft
                                    </button>
                                  </div>
                                ) : rejections[offer.id].loading ? (
                                  <div className="flex items-center gap-3 text-black/40">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span className="text-xs font-light italic">Drafting response...</span>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <textarea 
                                      className="w-full h-64 p-4 bg-white border border-black/5 text-sm font-light leading-relaxed focus:outline-none focus:border-black/20 resize-none"
                                      value={rejections[offer.id].text}
                                      onChange={(e) => setRejections(prev => ({ ...prev, [offer.id]: { ...prev[offer.id], text: e.target.value } }))}
                                    />
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={() => navigator.clipboard.writeText(rejections[offer.id].text)}
                                        className="px-4 py-2 bg-black text-white text-[10px] uppercase tracking-widest hover:bg-black/80 transition-all"
                                      >
                                        Copy to Clipboard
                                      </button>
                                      <button 
                                        onClick={() => setRejections(prev => {
                                          const newState = { ...prev };
                                          delete newState[offer.id];
                                          return newState;
                                        })}
                                        className="px-4 py-2 bg-white border border-black/10 text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                                      >
                                        Discard
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <button 
                              onClick={() => {
                                const newExpanded = new Set(expandedIds);
                                newExpanded.delete(offer.id);
                                setExpandedIds(newExpanded);
                              }}
                              className="p-2 text-black/20 hover:text-black transition-colors"
                              title="Close Analysis"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex justify-between items-center text-[10px] uppercase tracking-widest text-black/40">
          <div>Showing 3 of 12 offers</div>
          <div className="flex gap-4">
            <button className="hover:text-black transition-colors">Previous</button>
            <div className="flex gap-2">
              <button className="w-6 h-6 bg-black text-white flex items-center justify-center">1</button>
              <button className="w-6 h-6 hover:bg-black/5 flex items-center justify-center transition-colors">2</button>
              <button className="w-6 h-6 hover:bg-black/5 flex items-center justify-center transition-colors">3</button>
            </div>
            <button className="hover:text-black transition-colors">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}
