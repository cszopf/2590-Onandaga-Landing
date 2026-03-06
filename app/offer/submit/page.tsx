'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  CheckCircle, 
  FileText, 
  DollarSign, 
  Calendar, 
  ShieldCheck,
  Info,
  X,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

// --- Types ---

type Step = 'terms' | 'buyer' | 'uploads' | 'review';

// --- Components ---

const Input = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-widest text-black/40">{label}</label>
    <input 
      {...props}
      className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light text-sm"
    />
  </div>
);

const Checkbox = ({ label, checked, onChange }: any) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div className={`w-5 h-5 border flex items-center justify-center transition-all ${checked ? 'bg-black border-black' : 'border-black/10 group-hover:border-black'}`}>
      {checked && <CheckCircle className="w-3 h-3 text-white" />}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className="text-sm font-light text-black/70">{label}</span>
  </label>
);

export default function OfferSubmissionWizard() {
  const [step, setStep] = useState<Step>('terms');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [offerId, setOfferId] = useState('');

  const [formData, setFormData] = useState({
    offer_price: '9000000',
    earnest_money: '100000',
    earnest_money_holder: 'World Class Title',
    financing_type: 'conventional',
    loan_amount: '',
    down_payment: '',
    closing_date: '',
    possession_terms: 'At closing',
    inspection: true,
    inspection_days: '10',
    appraisal: true,
    financing: true,
    other_contingencies: '',
    escalation_enabled: false,
    escalation_cap: '',
    escalation_increment: '',
    buyer_names: [''],
    represented_by_agent: true,
    agent_name: '',
    agent_email: '',
    inclusions_exclusions: '',
    agent_notes: ''
  });

  const [files, setFiles] = useState<{ name: string; type: string }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as any).checked : value
    }));
  };

  const handleAddBuyer = () => {
    setFormData(prev => ({ ...prev, buyer_names: [...prev.buyer_names, ''] }));
  };

  const handleBuyerChange = (index: number, value: string) => {
    const newBuyers = [...formData.buyer_names];
    newBuyers[index] = value;
    setFormData(prev => ({ ...prev, buyer_names: newBuyers }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({ name: f.name, type: 'contract' }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const id = 'OFF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOfferId(id);
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 text-center shadow-sm border border-black/5"
        >
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-light mb-4">Offer Submitted</h1>
          <p className="text-black/60 font-light mb-8">
            Your offer for 2590 Onandaga Dr has been successfully received. 
            Receipt ID: <span className="font-mono text-black font-medium">{offerId}</span>
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.href = `/offer/status/${offerId}`}
              className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all"
            >
              Track Offer Status
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full py-4 border border-black/10 text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Return to Listing
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      {/* Header */}
      <header className="bg-white border-b border-black/5 px-4 md:px-8 py-4 md:py-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-6">
            <div className="text-[10px] md:text-xs font-serif tracking-widest uppercase">ENGEL & VÖLKERS</div>
            <div className="h-4 w-px bg-black/10" />
            <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-black/40">Offer Submission</div>
          </div>
          <button onClick={() => window.history.back()} className="text-black/40 hover:text-black transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-6 md:mt-12 px-4 md:px-6">
        {/* Property Summary (Locked) */}
        <div className="bg-black text-white p-6 md:p-8 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          <div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Property Details (Locked)</div>
            <h2 className="text-lg md:text-xl font-serif font-light">2590 Onandaga Dr, Columbus, OH 43221</h2>
            <p className="text-white/60 text-[10px] md:text-xs tracking-widest mt-1">MLS: 224012345 | LIST PRICE: $9,000,000</p>
          </div>
          <div className="md:text-right">
             <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Listing Agent</div>
             <p className="text-xs md:text-sm font-light">Susanne Horner</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex justify-between mb-8 md:mb-12 relative px-2">
          <div className="absolute top-4 left-0 w-full h-px bg-black/5 z-0" />
          {['terms', 'buyer', 'uploads', 'review'].map((s, i) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium transition-all duration-500 ${
                step === s ? 'bg-black text-white scale-110' : 
                ['terms', 'buyer', 'uploads', 'review'].indexOf(step) > i ? 'bg-emerald-500 text-white' : 'bg-white border border-black/10 text-black/40'
              }`}>
                {['terms', 'buyer', 'uploads', 'review'].indexOf(step) > i ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:block text-[10px] uppercase tracking-widest mt-3 ${step === s ? 'text-black font-medium' : 'text-black/30'}`}>{s}</span>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white p-6 md:p-12 shadow-sm border border-black/5">
          <AnimatePresence mode="wait">
            {step === 'terms' && (
              <motion.div 
                key="terms"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input 
                    label="Offer Price ($)" 
                    name="offer_price"
                    type="number"
                    value={formData.offer_price}
                    onChange={handleInputChange}
                    placeholder="9000000"
                  />
                  <Input 
                    label="Earnest Money ($)" 
                    name="earnest_money"
                    type="number"
                    value={formData.earnest_money}
                    onChange={handleInputChange}
                    placeholder="50000"
                  />
                  <div className="relative">
                    <Input 
                      label="Earnest Money Holder" 
                      name="earnest_money_holder"
                      value={formData.earnest_money_holder}
                      onChange={handleInputChange}
                    />
                    {formData.earnest_money_holder.toLowerCase().includes('world class title') && (
                      <div className="absolute right-0 bottom-3 flex items-center gap-1 text-[9px] text-emerald-600 font-medium uppercase tracking-tighter">
                        <ShieldCheck className="w-3 h-3" /> Verified by Smart
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-black/40">Financing Type</label>
                    <select 
                      name="financing_type"
                      value={formData.financing_type}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light text-sm appearance-none"
                    >
                      <option value="conventional">Conventional</option>
                      <option value="cash">Cash</option>
                      <option value="jumbo">Jumbo</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <Input 
                    label="Closing Date" 
                    name="closing_date"
                    type="date"
                    value={formData.closing_date}
                    onChange={handleInputChange}
                  />
                  <Input 
                    label="Possession Terms" 
                    name="possession_terms"
                    value={formData.possession_terms}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-6 pt-8 border-t border-black/5">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium">Contingencies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Checkbox 
                      label="Inspection Contingency" 
                      checked={formData.inspection}
                      onChange={() => setFormData(p => ({ ...p, inspection: !p.inspection }))}
                    />
                    {formData.inspection && (
                      <Input 
                        label="Inspection Days" 
                        name="inspection_days"
                        type="number"
                        value={formData.inspection_days}
                        onChange={handleInputChange}
                      />
                    )}
                    <Checkbox 
                      label="Appraisal Contingency" 
                      checked={formData.appraisal}
                      onChange={() => setFormData(p => ({ ...p, appraisal: !p.appraisal }))}
                    />
                    <Checkbox 
                      label="Financing Contingency" 
                      checked={formData.financing}
                      onChange={() => setFormData(p => ({ ...p, financing: !p.financing }))}
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-black/5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium">Escalation Clause</h3>
                    <Checkbox 
                      label="Enable Escalation" 
                      checked={formData.escalation_enabled}
                      onChange={() => setFormData(p => ({ ...p, escalation_enabled: !p.escalation_enabled }))}
                    />
                  </div>
                  {formData.escalation_enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <Input 
                        label="Cap Price ($)" 
                        name="escalation_cap"
                        type="number"
                        value={formData.escalation_cap}
                        onChange={handleInputChange}
                      />
                      <Input 
                        label="Increment ($)" 
                        name="escalation_increment"
                        type="number"
                        value={formData.escalation_increment}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'buyer' && (
              <motion.div 
                key="buyer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium">Representation</h3>
                    <Checkbox 
                      label="Represented by Real Estate Agent" 
                      checked={formData.represented_by_agent}
                      onChange={() => setFormData(p => ({ ...p, represented_by_agent: !p.represented_by_agent }))}
                    />
                  </div>
                  
                  {formData.represented_by_agent ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-[#F5F5F5] border border-black/5">
                      <Input 
                        label="Agent Full Name"
                        name="agent_name"
                        value={formData.agent_name}
                        onChange={handleInputChange}
                        placeholder="e.g. Michael Chen"
                      />
                      <Input 
                        label="Agent Email"
                        name="agent_email"
                        value={formData.agent_email}
                        onChange={handleInputChange}
                        placeholder="m.chen@brokerage.com"
                      />
                      <div className="col-span-full flex items-center gap-2 text-[10px] text-emerald-600 font-medium uppercase tracking-widest">
                        <UserCheck className="w-3 h-3" /> Verified via Smart SSO
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-red-50 border border-red-100 flex gap-4">
                      <Info className="w-5 h-5 text-red-600 shrink-0" />
                      <div>
                        <p className="text-xs text-red-800 font-medium uppercase tracking-widest mb-1">Unrepresented Buyer</p>
                        <p className="text-[11px] text-red-700 leading-relaxed">
                          Submitting an offer without professional representation may negatively impact your offer&apos;s verification score and perceived strength by the seller.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6 pt-8 border-t border-black/5">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium">Buyer Details</h3>
                  {formData.buyer_names.map((name, i) => (
                    <div key={i} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Input 
                          label={`Buyer ${i + 1} Full Name`}
                          value={name}
                          onChange={(e: any) => handleBuyerChange(i, e.target.value)}
                          placeholder="Legal Name as it appears on contract"
                        />
                      </div>
                      {i > 0 && (
                        <button 
                          onClick={() => setFormData(p => ({ ...p, buyer_names: p.buyer_names.filter((_, idx) => idx !== i) }))}
                          className="p-3 text-black/20 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    onClick={handleAddBuyer}
                    className="text-[10px] uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                  >
                    + Add Another Buyer
                  </button>
                </div>

                <div className="space-y-6 pt-8 border-t border-black/5">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium">Inclusions & Exclusions</h3>
                  <textarea 
                    name="inclusions_exclusions"
                    value={formData.inclusions_exclusions}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-transparent border border-black/10 p-4 focus:outline-none focus:border-black transition-colors font-light text-sm resize-none"
                    placeholder="e.g. Include all window treatments; Exclude primary bedroom chandelier."
                  />
                </div>

                <div className="space-y-6 pt-8 border-t border-black/5">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium">Agent Notes (Private)</h3>
                  <textarea 
                    name="agent_notes"
                    value={formData.agent_notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-transparent border border-black/10 p-4 focus:outline-none focus:border-black transition-colors font-light text-sm resize-none"
                    placeholder="Notes for Susanne Horner regarding this offer..."
                  />
                </div>
              </motion.div>
            )}

            {step === 'uploads' && (
              <motion.div 
                key="uploads"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 md:space-y-12"
              >
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium">Required Documents</h3>
                  <div className="border-2 border-dashed border-black/10 p-8 md:p-12 text-center hover:border-black/30 transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 text-black/20" />
                    <p className="text-sm font-light text-black/60">Drag and drop or click to upload</p>
                    <p className="text-[10px] uppercase tracking-widest text-black/30 mt-2">PDF, DOCX up to 20MB</p>
                  </div>

                  <div className="space-y-3">
                    {files.map((file, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F5F5F5] border border-black/5 gap-4">
                        <div className="flex items-center gap-4">
                          <FileText className="w-4 h-4 text-black/40" />
                          <div>
                            <p className="text-sm font-light truncate max-w-[200px]">{file.name}</p>
                            <select 
                              className="text-[10px] uppercase tracking-widest bg-transparent text-black/40 focus:outline-none"
                              value={file.type}
                              onChange={(e) => {
                                const newFiles = [...files];
                                newFiles[i].type = e.target.value;
                                setFiles(newFiles);
                              }}
                            >
                              <option value="contract">Purchase Contract</option>
                              <option value="addendum">Addendum</option>
                              <option value="proof_of_funds">Proof of Funds</option>
                              <option value="pre_approval">Pre-Approval Letter</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <button 
                          onClick={() => setFiles(p => p.filter((_, idx) => idx !== i))}
                          className="text-black/20 hover:text-red-500 transition-colors self-end sm:self-auto"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 md:p-6 bg-amber-50 border border-amber-100 flex gap-4">
                  <Info className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-[11px] md:text-xs text-amber-800 leading-relaxed">
                    Please ensure all signatures are present on the purchase contract before uploading. Susanne Horner requires a complete package for initial review.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'review' && (
              <motion.div 
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 md:space-y-12"
              >
                <div className="space-y-8">
                  <div className="p-6 md:p-8 bg-zinc-50 border border-black/5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-1">Offer Strength Score</h3>
                        <p className="text-[10px] text-black/40 uppercase tracking-widest">Verified by Smart Algorithm</p>
                      </div>
                      <div className="text-right w-full sm:w-auto">
                        <div className="text-3xl md:text-4xl font-serif">
                          {(() => {
                            let score = 85;
                            if (formData.earnest_money_holder.toLowerCase().includes('world class title')) score += 5;
                            else score -= 10;
                            if (formData.represented_by_agent) score += 5;
                            else score -= 15;
                            if (formData.financing_type === 'cash') score += 10;
                            if (!formData.inspection) score += 10;
                            return Math.min(100, Math.max(0, score));
                          })()}/100
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] md:text-[11px] uppercase tracking-widest gap-1">
                        <span className="flex items-center gap-2">
                          {formData.earnest_money_holder.toLowerCase().includes('world class title') ? (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          Title Company: {formData.earnest_money_holder}
                        </span>
                        <span className={formData.earnest_money_holder.toLowerCase().includes('world class title') ? 'text-emerald-600' : 'text-red-600'}>
                          {formData.earnest_money_holder.toLowerCase().includes('world class title') ? 'Verified (+5)' : 'Unverified (-10)'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] md:text-[11px] uppercase tracking-widest gap-1">
                        <span className="flex items-center gap-2">
                          {formData.represented_by_agent ? (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          Representation: {formData.represented_by_agent ? 'Agent Represented' : 'Unrepresented'}
                        </span>
                        <span className={formData.represented_by_agent ? 'text-emerald-600' : 'text-red-600'}>
                          {formData.represented_by_agent ? 'Verified (+5)' : 'Impact Score (-15)'}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] md:text-[11px] uppercase tracking-widest gap-1">
                        <span className="flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                          Buyer Verification
                        </span>
                        <span className="text-emerald-600">Verified (+5)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium border-b border-black/5 pb-2">Financial Terms</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Offer Price</span>
                        <span className="text-sm font-medium">${Number(formData.offer_price).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Earnest Money</span>
                        <span className="text-sm font-light">${Number(formData.earnest_money).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Financing</span>
                        <span className="text-sm font-light uppercase tracking-widest">{formData.financing_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Closing</span>
                        <span className="text-sm font-light">{formData.closing_date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium border-b border-black/5 pb-2">Contingencies</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Inspection</span>
                        <span className="text-sm font-light">{formData.inspection ? `${formData.inspection_days} Days` : 'Waived'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Appraisal</span>
                        <span className="text-sm font-light">{formData.appraisal ? 'Included' : 'Waived'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Financing</span>
                        <span className="text-sm font-light">{formData.financing ? 'Included' : 'Waived'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Escalation</span>
                        <span className="text-sm font-light">{formData.escalation_enabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium border-b border-black/5 pb-2">Documents ({files.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-[10px] md:text-xs text-black/60">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        {f.name} ({f.type})
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-black text-white space-y-4">
                  <Checkbox 
                    label="I certify that all information provided is accurate and matches the attached contract." 
                    checked={true}
                    onChange={() => {}}
                  />
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                    By submitting this offer, you authorize Susanne Horner to present these terms to the seller. This submission creates a digital record of the offer terms for audit purposes.
                  </p>
                </div>
              </div>
            </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <button 
              onClick={() => {
                if (step === 'buyer') setStep('terms');
                if (step === 'uploads') setStep('buyer');
                if (step === 'review') setStep('uploads');
              }}
              disabled={step === 'terms'}
              className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-black/40 hover:text-black transition-colors disabled:opacity-0 order-2 sm:order-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            {step === 'review' ? (
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto px-8 md:px-12 py-4 bg-[#D0112B] text-white text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#A00D21] transition-all disabled:opacity-50 flex items-center justify-center gap-3 order-1 sm:order-2"
              >
                {loading ? 'Submitting...' : 'Confirm and Submit Offer'}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <button 
                onClick={() => {
                  if (step === 'terms') setStep('buyer');
                  if (step === 'buyer') setStep('uploads');
                  if (step === 'uploads') setStep('review');
                }}
                className="w-full sm:w-auto px-8 md:px-12 py-4 bg-black text-white text-[10px] md:text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 order-1 sm:order-2"
              >
                Continue to {step === 'terms' ? 'Buyer' : step === 'buyer' ? 'Uploads' : 'Review'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
