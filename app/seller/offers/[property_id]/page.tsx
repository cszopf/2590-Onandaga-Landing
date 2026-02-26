'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Star, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Info,
  Lock,
  ChevronRight,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';

export default function SellerPortal() {
  const params = useParams();
  const propertyId = params.property_id as string;
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [decisionModal, setDecisionModal] = useState<'accept' | 'counter' | 'decline' | null>(null);
  const [esignName, setEsignName] = useState('');
  const [consents, setConsents] = useState({
    accuracy: false,
    smart: false,
    sharing: false
  });

  // Mock data
  const [offers, setOffers] = useState<any[]>([
    {
      id: 'OFF-98766',
      buyer: 'Sterling Holdings LLC',
      price: 9250000,
      score: 9.1,
      financing: 'Cash',
      closing: '21 Days',
      contingencies: 'None',
      earnest: '$200,000',
      notes: 'Strongest certainty. All cash, no contingencies. Ready to close in 3 weeks.'
    },
    {
      id: 'OFF-98765',
      buyer: 'John & Jane Doe',
      price: 9300000,
      score: 8.2,
      financing: 'Conventional (20% Down)',
      closing: '45 Days',
      contingencies: 'Inspection, Appraisal',
      earnest: '$100,000',
      notes: 'Highest price, but includes standard contingencies. Buyers are very motivated.'
    },
    {
      id: 'OFF-98767',
      buyer: 'Robert Chen',
      price: 8950000,
      score: 7.5,
      financing: 'Conventional (10% Down)',
      closing: '60 Days',
      contingencies: 'Inspection, Appraisal, Financing',
      earnest: '$50,000',
      notes: 'Highest gross offer, but highest risk due to low down payment and multiple contingencies.'
    }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleDecision = () => {
    setLoading(true);
    // Simulate Smart push
    setTimeout(() => {
      window.location.href = `/offer/status/${selectedOffer.id}?accepted=true`;
    }, 2500);
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
      <header className="bg-black text-white px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="text-xs font-serif tracking-widest uppercase">ENGEL & VÖLKERS</div>
            <div className="h-4 w-px bg-white/20" />
            <div className="text-[10px] uppercase tracking-widest text-white/40">Seller Portal</div>
          </div>
          <div className="text-center md:text-right">
            <h1 className="text-xl font-serif font-light">2590 Onandaga Dr</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Managed by Susanne Horner</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Offers List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-serif font-light">Ranked Offers</h2>
                <p className="text-black/40 text-xs uppercase tracking-widest mt-2">Sorted by Susanne&apos;s Strategic Score</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40">
                <TrendingUp className="w-4 h-4" /> Comparison View
              </div>
            </div>

            <div className="space-y-6">
              {offers.map((offer, i) => (
                <motion.div 
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedOffer(offer)}
                  className={`group cursor-pointer bg-white p-8 border transition-all duration-300 ${selectedOffer?.id === offer.id ? 'border-black shadow-md' : 'border-black/5 hover:border-black/20 shadow-sm'}`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-serif">
                          {offer.score}
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-black/40">Rank #{i + 1}</div>
                          <h3 className="text-lg font-serif">{offer.buyer}</h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Price</div>
                          <div className="text-sm font-medium">${offer.price.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Financing</div>
                          <div className="text-sm font-light">{offer.financing.split(' ')[0]}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Closing</div>
                          <div className="text-sm font-light">{offer.closing}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Contingencies</div>
                          <div className="text-sm font-light">{offer.contingencies}</div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-48 flex flex-col justify-center items-end border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-8">
                      <button className="text-[10px] uppercase tracking-widest font-medium flex items-center gap-2 group-hover:text-[#D0112B] transition-colors">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Selection Detail / Action Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              {selectedOffer ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-8 border border-black shadow-lg"
                >
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-xl font-serif">Offer Details</h3>
                    <button onClick={() => setSelectedOffer(null)} className="text-black/20 hover:text-black">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6 mb-12">
                    <div className="p-4 bg-[#F5F5F5] border border-black/5">
                      <div className="text-[10px] uppercase tracking-widest text-black/40 mb-2">Advisor&apos;s Note</div>
                      <p className="text-xs font-light leading-relaxed text-black/70 italic">
                        &quot;{selectedOffer.notes}&quot;
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-black/5">
                        <span className="text-[10px] uppercase tracking-widest text-black/40">Buyer</span>
                        <span className="text-xs font-medium">{selectedOffer.buyer}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-black/5">
                        <span className="text-[10px] uppercase tracking-widest text-black/40">Offer Price</span>
                        <span className="text-xs font-medium">${selectedOffer.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-black/5">
                        <span className="text-[10px] uppercase tracking-widest text-black/40">Earnest Money</span>
                        <span className="text-xs font-light">{selectedOffer.earnest}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-black/5">
                        <span className="text-[10px] uppercase tracking-widest text-black/40">Financing</span>
                        <span className="text-xs font-light">{selectedOffer.financing}</span>
                      </div>
                    </div>

                    <button className="w-full py-3 border border-black/10 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all">
                      <FileText className="w-4 h-4" /> View Full Contract
                    </button>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => setDecisionModal('accept')}
                      className="w-full py-4 bg-emerald-600 text-white text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                    >
                      Accept Offer <CheckCircle className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setDecisionModal('counter')}
                        className="py-3 border border-black/10 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                      >
                        Counter
                      </button>
                      <button 
                        onClick={() => setDecisionModal('decline')}
                        className="py-3 border border-black/10 text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white p-12 border border-dashed border-black/10 text-center">
                  <Info className="w-10 h-10 mx-auto mb-4 text-black/10" />
                  <p className="text-sm font-light text-black/40">Select an offer to view details and take action.</p>
                </div>
              )}

              <div className="bg-black text-white p-8">
                <Lock className="w-8 h-8 mb-4 opacity-50" />
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">Secure Authorization</h3>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
                  Accepting an offer will initiate the Smart Transaction Space and push all contract terms to the closing team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decision Modal */}
      <AnimatePresence>
        {decisionModal === 'accept' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDecisionModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white max-w-2xl w-full p-12 shadow-2xl"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-serif font-light mb-4">Seller Authorization</h2>
                <p className="text-black/60 font-light text-sm">
                  You are accepting the offer from <span className="font-medium text-black">{selectedOffer.buyer}</span> for <span className="font-medium text-black">${selectedOffer.price.toLocaleString()}</span>.
                </p>
              </div>

              <div className="space-y-6 mb-12">
                <div className="space-y-4">
                  <label className="flex gap-4 cursor-pointer group">
                    <div 
                      onClick={() => setConsents(p => ({ ...p, accuracy: !p.accuracy }))}
                      className={`w-6 h-6 shrink-0 border flex items-center justify-center transition-all ${consents.accuracy ? 'bg-black border-black' : 'border-black/10 group-hover:border-black'}`}
                    >
                      {consents.accuracy && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-xs font-light text-black/60 leading-relaxed">
                      I confirm that I have reviewed the full contract and all terms are accurate as presented.
                    </span>
                  </label>
                  <label className="flex gap-4 cursor-pointer group">
                    <div 
                      onClick={() => setConsents(p => ({ ...p, smart: !p.smart }))}
                      className={`w-6 h-6 shrink-0 border flex items-center justify-center transition-all ${consents.smart ? 'bg-black border-black' : 'border-black/10 group-hover:border-black'}`}
                    >
                      {consents.smart && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-xs font-light text-black/60 leading-relaxed">
                      I authorize the creation of a Smart Transaction Space and the sharing of these terms with the closing team.
                    </span>
                  </label>
                  <label className="flex gap-4 cursor-pointer group">
                    <div 
                      onClick={() => setConsents(p => ({ ...p, sharing: !p.sharing }))}
                      className={`w-6 h-6 shrink-0 border flex items-center justify-center transition-all ${consents.sharing ? 'bg-black border-black' : 'border-black/10 group-hover:border-black'}`}
                    >
                      {consents.sharing && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-xs font-light text-black/60 leading-relaxed">
                      I acknowledge that this action will notify the buyer agent and move other offers to declined status.
                    </span>
                  </label>
                </div>

                <div className="pt-8 border-t border-black/5 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-black/40">Type Full Legal Name to Authorize</label>
                    <input 
                      type="text" 
                      value={esignName}
                      onChange={(e) => setEsignName(e.target.value)}
                      placeholder="Estate Owner Name"
                      className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-black transition-colors font-serif text-xl italic"
                    />
                  </div>
                  <div className="flex justify-between text-[8px] uppercase tracking-widest text-black/30">
                    <span>IP: 192.168.1.1</span>
                    <span>TS: {new Date().toISOString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setDecisionModal(null)}
                  className="flex-1 py-4 border border-black/10 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={!consents.accuracy || !consents.smart || !consents.sharing || !esignName}
                  onClick={handleDecision}
                  className="flex-2 py-4 bg-black text-white text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
                >
                  Confirm Acceptance <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
