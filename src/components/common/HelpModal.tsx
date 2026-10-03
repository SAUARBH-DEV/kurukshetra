import React, { useState } from 'react';
import { X, Headphones, Send, Mail, CheckCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('tournament-issue');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-sm border border-gold-500/40 bg-dark-900 p-6 sm:p-8 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Frame Corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close help modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold-500/20">
          <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-dark-950 flex items-center justify-center text-gold-400 flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-white tracking-wide uppercase">
              KURUKSHETRA SUPPORT DESK
            </h2>
            <p className="text-xs text-neutral-400">
              Assistance for colleges, teams, match disputes, and registrations.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3 bg-dark-950/80 rounded-sm border border-gold-500/30">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <div className="font-display font-bold text-lg text-white uppercase">
              Query Submitted Successfully
            </div>
            <p className="text-xs text-neutral-400">
              Our esports collegiate operations desk has received your ticket and will respond via your university email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label htmlFor="help-subject" className="block font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                INQUIRY TOPIC
              </label>
              <select
                id="help-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-3 py-2.5 text-neutral-200 focus:outline-none focus:border-gold-400"
              >
                <option value="tournament-issue">Tournament Registration / Eligibility</option>
                <option value="college-verification">College Verification & ID Proof</option>
                <option value="match-dispute">Match Result Dispute / Rules Inquiry</option>
                <option value="technical-support">Technical Issue or Bug Report</option>
                <option value="other">Other Inquiries</option>
              </select>
            </div>

            <div>
              <label htmlFor="help-email" className="block font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                YOUR EMAIL ADDRESS
              </label>
              <input
                id="help-email"
                type="email"
                required
                placeholder="player@college.ac.in"
                className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label htmlFor="help-message" className="block font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                DESCRIPTION OF QUERY
              </label>
              <textarea
                id="help-message"
                required
                rows={3}
                placeholder="Explain the issue or tournament UID..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-dark-950 border border-gold-500/30 rounded-sm p-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="mailto:support@kurukshetra-esports.in"
                className="text-[11px] text-gold-400 hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Mail: support@kurukshetra-esports.in</span>
              </a>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-sm font-semibold text-xs tracking-wider uppercase text-black bg-gold-gradient shadow-gold-glow hover:shadow-[0_0_20px_rgba(245,186,65,0.6)] transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT TICKET</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
