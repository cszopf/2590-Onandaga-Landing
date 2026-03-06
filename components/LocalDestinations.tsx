'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Utensils, TreePine, GraduationCap, Coffee, ExternalLink } from 'lucide-react';

const CATEGORIES = [
  { id: 'restaurants', label: 'Fine Dining', icon: Utensils, query: 'fine dining restaurants near 2590 Onandaga Dr, Columbus, OH' },
  { id: 'parks', label: 'Parks & Nature', icon: TreePine, query: 'parks near 2590 Onandaga Dr, Columbus, OH' },
  { id: 'schools', label: 'Education', icon: GraduationCap, query: 'schools near 2590 Onandaga Dr, Columbus, OH' },
  { id: 'coffee', label: 'Cafés', icon: Coffee, query: 'coffee shops near 2590 Onandaga Dr, Columbus, OH' },
];

export default function LocalDestinations() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ text: string; links: { title: string; uri: string }[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDestinations = async (query: string, categoryId: string) => {
    setLoading(true);
    setActiveCategory(categoryId);
    setError(null);
    setResults(null); // Clear previous results

    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from API");
      }

      const data = await response.json();
      setResults({ text: data.text, links: data.links || [] });
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError("Failed to load local insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 bg-white px-8 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="block text-[10px] uppercase tracking-[0.3em] mb-4 text-black/40">The Neighborhood</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight text-black">Local Destinations</h2>
          <p className="mt-6 text-black/60 font-light max-w-2xl">
            Explore the refined surroundings of Upper Arlington. Select a category to discover curated local insights.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => fetchDestinations(cat.query, cat.id)}
              disabled={loading && activeCategory === cat.id}
              className={`flex flex-col items-center justify-center p-8 border transition-all duration-300 group ${
                activeCategory === cat.id 
                  ? 'bg-black text-white border-black' 
                  : 'bg-[#F5F5F5] border-black/5 hover:border-black/20 text-black/60 hover:text-black'
              }`}
            >
              <cat.icon className={`w-6 h-6 mb-4 transition-transform duration-300 ${activeCategory === cat.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="text-[10px] uppercase tracking-widest font-medium">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[300px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin mb-4" />
                <p className="text-[10px] uppercase tracking-widest text-black/40">Consulting Google Maps...</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 bg-red-50 text-red-800 text-center border border-red-100"
              >
                <p className="text-sm font-light">{error}</p>
              </motion.div>
            ) : results ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                <div className="prose prose-sm max-w-none">
                  <div className="text-black/70 font-light leading-relaxed text-lg whitespace-pre-wrap">
                    {results.text}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest text-black/40 mb-6">Featured Locations</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {results.links.length > 0 ? (
                      results.links.map((link, i) => (
                        <a 
                          key={i}
                          href={link.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-[#F5F5F5] border border-black/5 hover:border-black/20 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-black/20 group-hover:text-[#D0112B] transition-colors" />
                            <span className="text-sm font-light">{link.title}</span>
                          </div>
                          <ExternalLink className="w-3 h-3 text-black/20" />
                        </a>
                      ))
                    ) : (
                      <p className="text-xs text-black/40 italic">No direct map links returned for this query.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center p-20 border border-dashed border-black/10"
              >
                <Navigation className="w-10 h-10 text-black/10 mb-6" />
                <p className="text-sm font-light text-black/40">Select a category above to explore the local area.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
