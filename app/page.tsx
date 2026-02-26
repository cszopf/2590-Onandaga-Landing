'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Eye,
  Clock,
  User,
  MessageSquare,
  AlertTriangle,
  Lock
} from 'lucide-react';

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const baseStyles = "px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 font-medium";
  const variants = {
    primary: "bg-[#D0112B] text-white hover:bg-[#A00D21]",
    secondary: "bg-black text-white hover:bg-zinc-800",
    outline: "border border-black/20 text-black hover:bg-black hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-16">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`block text-[10px] uppercase tracking-[0.3em] mb-4 ${light ? 'text-white/60' : 'text-black/40'}`}
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-serif font-light leading-tight ${light ? 'text-white' : 'text-black'}`}
    >
      {children}
    </motion.h2>
  </div>
);

import LocalDestinations from '@/components/LocalDestinations';

export const dynamic = "force-dynamic";

// --- Page Sections ---

export default function LandingPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [mounted, setMounted] = useState(false);
  const [isRepresented, setIsRepresented] = useState<'yes' | 'no'>('yes');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('idle');
      alert('There was an error processing your request. Please try again or contact Susanne directly.');
    }
  };

  return (
    <main className="min-h-screen">
      {/* Verification Modal for Unrepresented Buyers */}
      <AnimatePresence>
        {showVerificationModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white max-w-lg w-full p-12 shadow-2xl border border-black/5 text-center"
            >
              <div className="w-16 h-16 bg-[#D0112B] text-white rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif mb-6">Verification Required</h2>
              <div className="space-y-6 text-left mb-10">
                <div className="flex gap-4">
                  <AlertTriangle className="w-5 h-5 text-[#D0112B] shrink-0" />
                  <p className="text-sm text-black/70 leading-relaxed">
                    <span className="font-medium text-black">Agent Safety Protocol:</span> To ensure the security of our private office listings and the safety of our advisors, all unrepresented buyers must undergo a formal identity and financial verification process.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Lock className="w-5 h-5 text-black/40 shrink-0" />
                  <p className="text-sm text-black/70 leading-relaxed">
                    <span className="font-medium text-black">Confidentiality:</span> This property is part of an exclusive private collection. Access is restricted to verified individuals to maintain the highest level of discretion for the seller.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-[#F5F5F5] border border-black/5 mb-8">
                <p className="text-xs text-black/40 uppercase tracking-widest leading-relaxed">
                  Our verification system is currently processing high volume. You will be notified once the portal is available for unrepresented access.
                </p>
              </div>
              <p className="text-[10px] text-black/30 uppercase tracking-[0.2em]">
                Verification in progress • Do not close this window
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <Image
          src="https://www.dropbox.com/scl/fi/vhdn0nkx4imi1sqd52p11/DJI_20250918195323_0562_D.jpg?rlkey=d5e0gop4rd7rbzv2ehvzd9y8j&st=zdxw8w0r&dl=1"
          alt="Estate Twilight"
          fill
          className="object-cover opacity-60 grayscale blur-[2px]"
          priority
          unoptimized
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <div className="absolute top-12 left-0 w-full px-8 md:px-16 flex justify-between items-center z-20">
          <div className="text-white text-xl font-serif tracking-widest uppercase">
            ENGEL & VÖLKERS
          </div>
          <div className="hidden md:block text-white/60 text-[10px] uppercase tracking-[0.3em]">
            Private Office | Susanne Horner
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white font-light tracking-tight mb-4 max-w-5xl">
              The Architecture of Permanence
            </h1>
            <p className="text-white/60 text-xs md:text-sm tracking-[0.4em] uppercase mb-12">
              2590 Onandaga Dr, Columbus, OH 43221
            </p>
            <p className="text-white/70 text-sm md:text-lg tracking-[0.1em] max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              An estate designed not for the transient, but for those who choose their environment with the same discipline they applied to their achievements.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                Request Confidential Showing
                <ChevronRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/offer'}
                className="group !border-white/20 !text-white hover:!bg-white hover:!text-black"
              >
                Submit an Offer
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-0 w-full flex justify-center z-20">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-white/30"
          />
        </div>
      </section>

      {/* 2. Identity Filter Section */}
      <section className="py-32 bg-white px-8 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <SectionHeading subtitle="Selection Criteria">
            This Home Is For Someone Who
          </SectionHeading>
          
          <div className="space-y-12">
            {[
              "Values the discretion of a private sanctuary over the visibility of a public display.",
              "Understands that true luxury is found in the silence of exceptional engineering.",
              "Prefers the weight of generational stone to the lightness of contemporary trends.",
              "Entertains with intention, curating experiences for the few rather than the many.",
              "Seeks an environment that serves as a catalyst for clarity and focused leadership.",
              "Recognizes that a residence is not just a shelter, but a physical manifestation of identity.",
              "Demands a level of privacy that is absolute and uncompromising."
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start group"
              >
                <span className="text-black/20 font-serif text-2xl italic group-hover:text-[#D0112B] transition-colors">0{i + 1}</span>
                <p className="text-lg md:text-xl text-black/80 font-light leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Arrival Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="https://www.dropbox.com/scl/fi/vveh14ptqeay2e9c97e3q/DSC06106.jpg?rlkey=lng5kiub78rrk5v72ieluzy5e&st=2fph0sun&dl=1"
          alt="Architectural Arrival"
          fill
          className="object-cover grayscale"
          unoptimized
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm p-12 md:p-20 max-w-3xl text-center"
          >
            <h3 className="text-2xl md:text-4xl font-serif mb-8 font-light">The Arrival Experience</h3>
            <p className="text-black/70 leading-relaxed font-light text-lg">
              The approach is defined by a deliberate transition from the external world to a realm of absolute symmetry. Natural light is harnessed not merely for visibility, but to emphasize the permanence of the structure. Every angle has been calculated to instill a sense of immediate, profound calm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Architecture and Living Section */}
      <section className="py-32 bg-[#F5F5F5] px-8 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="The Composition">
            A Study in Living
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Structure",
                desc: "Built with materials selected for their ability to age with dignity. The engineering prioritizes acoustic isolation and thermal stability, ensuring the interior remains a constant in a changing world.",
                img: "https://www.dropbox.com/scl/fi/muzkkscviy6398cgryhmb/DSC06127.jpg?rlkey=mcn5woutyqxgfmexjs7sivfb2&st=xp0yza8f&dl=1"
              },
              {
                title: "Entertaining",
                desc: "Spaces designed for the art of conversation. The flow is intuitive, allowing for intimate gatherings that feel both expansive and private, supported by a professional-grade culinary suite.",
                img: "https://www.dropbox.com/scl/fi/rmzq9cr8q2tsspuniop2a/DSC06133.jpg?rlkey=clhwhlx7qi307dea8oi3k16dw&st=h3j13m65&dl=1"
              },
              {
                title: "Retreat",
                desc: "The private quarters are positioned to capture the first light of dawn. A dedicated wellness wing provides a sanctuary for physical and mental restoration, away from the demands of the day.",
                img: "https://www.dropbox.com/scl/fi/qrki29j841xrtim67gy1r/DSC06154.jpg?rlkey=mjbqc4dhnxbyfo6bch7z3etf6&st=ry59bz22&dl=1"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <div className="relative aspect-[4/5] mb-8 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover grayscale hover:scale-105 transition-transform duration-700"
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-serif mb-4 uppercase tracking-widest">{item.title}</h4>
                <p className="text-black/60 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Who This Residence Serves */}
      <section className="py-32 bg-black text-white px-8 md:px-16 lg:px-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900/50 -skew-x-12 translate-x-1/4" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading subtitle="Purpose" light>
            The Environment of Leadership
          </SectionHeading>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-white/90">
              This residence serves those whose lives are defined by the weight of decision-making and the pursuit of clarity. It is an environment shaped for the individual who understands that their surroundings either deplete or restore their focus. 
            </p>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              In a world of noise, this estate offers a rare continuity. It is a place where legacy is not just spoken of, but lived. The architecture doesn&apos;t demand attention; it commands respect through its restraint. It is a vessel for a life lived with intention, providing the silence necessary for profound thought and the space required for genuine connection. This is not merely a home; it is a strategic asset for the preservation of one&apos;s energy and the cultivation of one&apos;s future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. Cinematic Experience Section */}
      <section className="py-32 bg-white px-8 md:px-16 lg:px-32 text-center">
        <div className="max-w-5xl mx-auto">
          <SectionHeading subtitle="Visual Narrative">
            A Cinematic Perspective
          </SectionHeading>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-zinc-100 mb-12 group cursor-pointer overflow-hidden"
          >
            <Image
              src="https://www.dropbox.com/scl/fi/39dzhnqt1kyj8hcts5tss/DJI_20250918195429_0574_D.jpg?rlkey=6vj3qyba94a1pxbv89i32n4mp&st=tl6v62z6&dl=1"
              alt="Film Placeholder"
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale"
              unoptimized
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300">
                <Play className="w-6 h-6 text-black group-hover:text-white fill-current ml-1" />
              </div>
            </div>
          </motion.div>
          
          <p className="text-black/60 font-light mb-12 max-w-2xl mx-auto">
            We invite you to experience the estate through a curated 90-second film, capturing the interplay of light and shadow across the grounds.
          </p>
          
          <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Schedule Private Viewing
          </Button>
        </div>
      </section>

      {/* 6.5 Local Destinations Section */}
      <LocalDestinations />

      {/* 7. Advisor Section */}
      <section className="py-32 bg-[#F5F5F5] px-8 md:px-16 lg:px-32 border-t border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden grayscale">
              <Image
                src="https://eva-personnel-service-prod-uploader.s3.us-west-2.amazonaws.com/advisorphoto/2A902FBB-0F7E-42B6-B1BB-B5E55345D31F/advisorphoto-HornerSusanne-s-web-large.jpg"
                alt="Susanne Horner"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <SectionHeading subtitle="The Representative">
              Susanne Horner
            </SectionHeading>
            <p className="text-xl font-serif mb-8 font-light text-black/80">
              Advisor, Principal Broker, RSD
            </p>
            <div className="space-y-6 mb-12">
              <p className="text-black/60 leading-relaxed font-light">
                Susanne Horner represents the intersection of strategic real estate advisory and absolute discretion. With a focus on high-net-worth acquisitions, she operates with a disciplined approach that mirrors the expectations of her clientele. Her methodology is rooted in market intelligence, privacy, and the seamless execution of complex transactions.
              </p>
              <div className="flex flex-col gap-4 pt-4 border-t border-black/10">
                <a href="mailto:susanne.horner@evrealestate.com" className="flex items-center gap-4 text-sm tracking-widest hover:text-[#D0112B] transition-colors">
                  <Mail className="w-4 h-4" /> SUSANNE.HORNER@EVREALESTATE.COM
                </a>
                <a href="tel:+16142845200" className="flex items-center gap-4 text-sm tracking-widest hover:text-[#D0112B] transition-colors">
                  <Phone className="w-4 h-4" /> +1 (614) 284-5200
                </a>
                <div className="flex items-center gap-4 text-sm tracking-widest text-black/40">
                  <MapPin className="w-4 h-4" /> 1040 N. 4TH ST., COLUMBUS, OH 43201
                </div>
              </div>
            </div>
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Direct Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Final Close & Form Section */}
      <section id="contact" className="py-32 bg-white px-8 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <SectionHeading subtitle="Next Steps">
              Request Private Access
            </SectionHeading>
            <p className="text-lg text-black/60 font-light leading-relaxed mb-12">
              Access to this estate is managed with the utmost care for the privacy of all parties involved. We invite qualified inquiries to request a confidential showing or a private offering memo. This is an invitation to step into an environment designed for the exceptional.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 border border-black/5 bg-[#F5F5F5]">
                <ShieldCheck className="w-6 h-6 mb-4 text-black/40" />
                <h5 className="text-xs uppercase tracking-widest mb-2">Discretion</h5>
                <p className="text-[10px] text-black/40 leading-relaxed">All communications are strictly confidential.</p>
              </div>
              <div className="p-8 border border-black/5 bg-[#F5F5F5]">
                <Eye className="w-6 h-6 mb-4 text-black/40" />
                <h5 className="text-xs uppercase tracking-widest mb-2">Exclusivity</h5>
                <p className="text-[10px] text-black/40 leading-relaxed">Showings are by appointment only.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#F5F5F5] p-12 md:p-16">
            {!mounted ? (
              <div className="h-64 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin" />
              </div>
            ) : formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif mb-4">Inquiry Received</h3>
                <p className="text-black/60 font-light">Susanne Horner will contact you directly to discuss your interest.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" suppressHydrationWarning>
                <div className="space-y-2" suppressHydrationWarning>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Full Name</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="Johnathan Sterling"
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-2" suppressHydrationWarning>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Email Address</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="j.sterling@private.com"
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-2" suppressHydrationWarning>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Preferred Showing Time</label>
                  <input 
                    name="preferredTime"
                    type="text" 
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light"
                    placeholder="e.g. Thursday Afternoon"
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-2" suppressHydrationWarning>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Are you working with a real estate agent?</label>
                  <div className="flex gap-8 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="represented" 
                        value="yes" 
                        className="accent-black" 
                        checked={isRepresented === 'yes'}
                        onChange={() => {
                          setIsRepresented('yes');
                          setShowVerificationModal(false);
                        }}
                      />
                      <span className="text-xs font-light text-black/60 group-hover:text-black transition-colors">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="represented" 
                        value="no" 
                        className="accent-black"
                        checked={isRepresented === 'no'}
                        onChange={() => {
                          setIsRepresented('no');
                          setShowVerificationModal(true);
                        }}
                      />
                      <span className="text-xs font-light text-black/60 group-hover:text-black transition-colors">No (Unrepresented)</span>
                    </label>
                  </div>
                </div>

                <AnimatePresence>
                  {isRepresented === 'yes' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/5">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Agent Name</label>
                          <input 
                            required={isRepresented === 'yes'}
                            name="agentName"
                            type="text" 
                            className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light"
                            placeholder="Michael Chen"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Brokerage</label>
                          <input 
                            required={isRepresented === 'yes'}
                            name="agentBrokerage"
                            type="text" 
                            className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light"
                            placeholder="Luxury Plus Realty"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Agent Email</label>
                          <input 
                            required={isRepresented === 'yes'}
                            name="agentEmail"
                            type="email" 
                            className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light"
                            placeholder="m.chen@brokerage.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Agent Cell</label>
                          <input 
                            required={isRepresented === 'yes'}
                            name="agentCell"
                            type="tel" 
                            className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light"
                            placeholder="(614) 555-0123"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2" suppressHydrationWarning>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-black/40">Message (Optional)</label>
                  <textarea 
                    name="message"
                    rows={3}
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors font-light resize-none"
                    placeholder="Specific requirements or questions..."
                    suppressHydrationWarning
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? 'Processing...' : 'Request Private Access'}
                  </Button>
                  <p className="mt-6 text-[10px] text-center text-black/30 tracking-wider uppercase">
                    Your information is handled with absolute discretion.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* World Class Title Section */}
      <section className="py-16 bg-white border-t border-black/5 px-8 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="relative w-48 h-16 mb-6 grayscale opacity-60 hover:opacity-100 transition-opacity duration-500">
            <Image
              src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeogmngGomxzemwy7JvO8Owwxc5xp_wwjpyWvZsBXUW-hcft_x2j2NcAJ0NI3eOPZhVh1EbBdsMfiY8Az7A-OPQFYU_U22FvJP1Y1bBVHhj9yhTCCgAET88DsEhBiN2578Mxrt8fmsZClAaueo4atNYOUXvHw?key=kl0MF71HcvaAWt9zvK_MLQ"
              alt="World Class Title"
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Designed by World Class Title, Luxury Plus
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white/30 px-8 md:px-16 lg:px-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-xs tracking-[0.3em] uppercase text-white/60">
                ENGEL & VÖLKERS
              </div>
              <div className="text-[10px] tracking-widest uppercase">
                2590 Onandaga Dr, Columbus, OH 43221
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative w-8 h-8 bg-white/10 flex items-center justify-center rounded-sm p-1.5 opacity-40 grayscale hover:opacity-100 transition-all duration-500">
                <div className="relative w-full h-full">
                  <Image
                    src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdcD73hGzxeBPx7xxN1Tj2_dk9XkwQeBkhaTnycCdGwDEugRZ-n_KQBWWONkmPv5KyRqhhjChTEIilNSwJE_n0v9pGJdv4g5JrGMTVyTAMfZXYlsT-8OeNr7ir6_rSsg2EOaAHypQ5EysjuNOzb-o-piUtFRm0?key=kl0MF71HcvaAWt9zvK_MLQ"
                    alt="Fair Housing Logo"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="relative w-8 h-8 bg-white/10 flex items-center justify-center rounded-sm p-1.5 opacity-40 grayscale hover:opacity-100 transition-all duration-500">
                <div className="relative w-full h-full">
                  <Image
                    src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXevCwPWOPVCnfkSxZZEIyHUKgPHrjPkd04sul1z9kKywyydzcI4cdPYf7qNOKxhWLBb3fM0MPtYOKu1xelMeR2DeipqjWJXLV3ofDO5U0anKzTmF0kx_qlMCuP9_rKOXfI5LbMLP-Y0-s2LVdCY2PZvrKKohTY?key=kl0MF71HcvaAWt9zvK_MLQ"
                    alt="Realtor Logo"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-[10px] tracking-widest uppercase text-center md:text-right">
            © 2026 Susanne Horner. All Rights Reserved. <br className="md:hidden" />
            Licensed Real Estate Broker. Equal Housing Opportunity.
          </div>
        </div>
      </footer>
    </main>
  );
}
