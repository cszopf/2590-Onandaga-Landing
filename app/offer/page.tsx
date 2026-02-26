'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Mail, Key, ArrowRight, UserCheck } from 'lucide-react';

export default function OfferPortalEntry() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSmartSSO = () => {
    setLoading(true);
    // Simulate SSO redirect/auth
    setTimeout(() => {
      // In a real app, this would redirect to Smart or handle a token
      window.location.href = '/offer/submit';
    }, 1500);
  };

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate magic link request
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 shadow-sm border border-black/5"
      >
        <div className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.3em] text-black/40 mb-4">
            Engel & Völkers | Private Office
          </div>
          <h1 className="text-3xl font-serif font-light mb-4">Offer Portal</h1>
          <p className="text-black/60 font-light text-sm">
            Secure access for agents and sellers to manage property offers for 2590 Onandaga Dr.
          </p>
        </div>

        <div className="space-y-6">
          <button 
            onClick={handleSmartSSO}
            disabled={loading}
            className="w-full flex items-center justify-between px-6 py-4 bg-black text-white text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50"
          >
            <span className="flex items-center gap-3">
              <Shield className="w-4 h-4" />
              Agent Login via Smart SSO
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-white px-4 text-black/30">Or via Magic Link</span>
            </div>
          </div>

          {sent ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-6 bg-emerald-50 text-emerald-700 text-sm font-light"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 opacity-50" />
              <p>Magic link sent to your email. Please check your inbox to continue.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-black/40">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@brokerage.com"
                  className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light text-sm"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-black/10 text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Request Magic Link'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-black/5 flex flex-col gap-4">
          <button 
            onClick={() => window.location.href = '/agent/offers'}
            className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors flex items-center gap-2"
          >
            <Key className="w-3 h-3" /> Listing Agent Dashboard
          </button>
          <button 
            onClick={() => window.location.href = '/seller/offers/prop_2590_onandaga'}
            className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors flex items-center gap-2"
          >
            <UserCheck className="w-3 h-3" /> Seller Portal Access
          </button>
        </div>
      </motion.div>
    </div>
  );
}
