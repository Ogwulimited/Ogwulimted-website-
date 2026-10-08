import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Clock, MapPin, ArrowUpRight, MessageSquare, ShieldCheck, Copy, Check } from 'lucide-react';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'ogwufrancis2002@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-12 md:py-16 relative px-6 sm:px-10 md:px-12 lg:px-14 bg-gradient-to-b from-[#111522] via-[#0E121D] to-[#0A0D15] rounded-[28px] border border-[#1E2638] shadow-2xl overflow-hidden font-sans mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 pb-6 border-b border-[#1E2638]">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1.5 font-display font-semibold">
            <Mail size={14} />
            <span>Direct Inquiry & Collaboration Desk</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-xl font-sans leading-relaxed">
            Directly reach Francis Ogwu for trading consultations, architecture commissions, media collaborations, or partnership inquiries.
          </p>
        </div>

        {/* Systematic Inquiry Card */}
        <div className="border border-[#1E273A] bg-[#111624] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 rounded-2xl shadow-xl">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2 text-xs font-display font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct Founder Inbox</span>
            </div>
            
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans">
              Currently accepting selected architectural commissions and private prop trading research inquiries. Typical response time is within 24 hours.
            </p>

            {/* Email Address Capsule with 1-Click Copy */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0C101A] border border-[#1F293F] text-xs sm:text-sm font-mono text-emerald-300">
                <Mail size={13} className="text-emerald-400 shrink-0" />
                <span className="select-all font-semibold">{email}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141A28] hover:bg-[#1D263B] border border-[#232F47] hover:border-emerald-500/40 text-xs font-display font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-emerald-400" />
                <span>Lagos, Nigeria · Global UTC+1</span>
              </div>
              <span className="text-neutral-600">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-sky-400" />
                <span>Verified Direct Line</span>
              </div>
            </div>
          </div>

          <a 
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.02] shrink-0 w-full md:w-auto justify-center cursor-pointer"
          >
            <Mail size={16} />
            <span>Send Direct Email</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
