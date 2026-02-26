'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  FileText, 
  ArrowLeft,
  ChevronRight,
  Shield,
  Download
} from 'lucide-react';

export default function OfferStatusPage() {
  const params = useParams();
  const offerId = params.offer_id as string;
  const [loading, setLoading] = useState(true);

  // Mock data
  const [offer, setOffer] = useState<any>({
    id: offerId,
    status: 'under_review',
    property: '2590 Onandaga Dr',
    submittedAt: '2026-02-25T12:00:00Z',
    price: 4300000,
    agent: 'Susanne Horner',
    messages: [
      { id: 1, sender: 'Susanne Horner', body: 'Thank you for your offer. We have received the documents and are currently reviewing them with the seller.', timestamp: '2026-02-25T12:30:00Z' }
    ],
    versions: [
      { number: 1, date: '2026-02-25T12:00:00Z', status: 'submitted' }
    ]
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-500 bg-blue-50';
      case 'under_review': return 'text-amber-500 bg-amber-50';
      case 'accepted': return 'text-emerald-500 bg-emerald-50';
      case 'declined': return 'text-red-500 bg-red-50';
      case 'revision_requested': return 'text-purple-500 bg-purple-50';
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
      <header className="bg-white border-b border-black/5 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-xs font-serif tracking-widest uppercase">Offer Status</div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Status Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-12 shadow-sm border border-black/5">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-2">Offer ID: {offerId}</div>
                  <h1 className="text-3xl font-serif font-light">{offer.property}</h1>
                </div>
                <div className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-medium ${getStatusColor(offer.status)}`}>
                  {offer.status.replace('_', ' ')}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-black/5">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Price</div>
                  <div className="text-sm font-medium">${offer.price.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Submitted</div>
                  <div className="text-sm font-light">{new Date(offer.submittedAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Listing Agent</div>
                  <div className="text-sm font-light">{offer.agent}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Versions</div>
                  <div className="text-sm font-light">{offer.versions.length}</div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-8 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Timeline
                </h3>
                <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-black/5">
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                    <div className="text-xs font-medium uppercase tracking-widest">Offer Submitted</div>
                    <div className="text-[10px] text-black/40 mt-1">Feb 25, 2026 • 12:00 PM</div>
                  </div>
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-sm" />
                    <div className="text-xs font-medium uppercase tracking-widest">Under Review</div>
                    <div className="text-[10px] text-black/40 mt-1">Feb 25, 2026 • 12:45 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white p-12 shadow-sm border border-black/5">
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-8 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Messages
              </h3>
              <div className="space-y-6">
                {offer.messages.map((msg: any) => (
                  <div key={msg.id} className="p-6 bg-[#F5F5F5] border border-black/5">
                    <div className="flex justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-medium">{msg.sender}</span>
                      <span className="text-[10px] text-black/30">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm font-light text-black/70 leading-relaxed">{msg.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-black/5">
                <textarea 
                  placeholder="Send a message to Susanne Horner..."
                  className="w-full bg-transparent border border-black/10 p-4 focus:outline-none focus:border-black transition-colors font-light text-sm resize-none mb-4"
                  rows={3}
                />
                <button className="px-8 py-3 bg-black text-white text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all">
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 shadow-sm border border-black/5">
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-6">Documents</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#F5F5F5] border border-black/5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-black/40" />
                    <span className="text-[10px] uppercase tracking-widest">Purchase Contract</span>
                  </div>
                  <Download className="w-3 h-3 text-black/20 hover:text-black cursor-pointer" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F5F5F5] border border-black/5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-black/40" />
                    <span className="text-[10px] uppercase tracking-widest">Proof of Funds</span>
                  </div>
                  <Download className="w-3 h-3 text-black/20 hover:text-black cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-8">
              <Shield className="w-8 h-8 mb-4 opacity-50" />
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-4">Security Notice</h3>
              <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
                This portal is encrypted and monitored for security. All actions are logged for audit purposes.
              </p>
            </div>

            {offer.status === 'revision_requested' && (
              <button 
                onClick={() => window.location.href = `/offer/submit?revision=${offerId}`}
                className="w-full py-4 bg-[#D0112B] text-white text-xs uppercase tracking-widest hover:bg-[#A00D21] transition-all flex items-center justify-center gap-2"
              >
                Submit Revised Offer <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
