import React, { useState } from 'react';
import { X, Shield, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [collegeEmail, setCollegeEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-sm border border-gold-500/40 bg-dark-900 p-6 sm:p-8 shadow-2xl overflow-hidden"
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
          aria-label="Close login modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-gold-500/40 bg-dark-950 flex items-center justify-center mx-auto mb-3 shadow-[0_0_12px_rgba(229,166,45,0.3)]">
            <img src="/brand/emblem.png" alt="Kurukshetra Logo" className="w-7 h-7 object-contain" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white tracking-wider uppercase">
            ENTER THE ARENA
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Sign in with your verified Indian University or College credentials.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center space-y-3 bg-dark-950/80 rounded-sm border border-gold-500/30">
            <Shield className="w-10 h-10 text-gold-400 mx-auto animate-pulse" />
            <div className="font-display font-bold text-base text-gold-300 uppercase">
              Connecting to College Portal
            </div>
            <p className="text-xs text-neutral-400">
              Session initialization ready for backend authentication handoff.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                COLLEGE EMAIL / STUDENT UID
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="text"
                  required
                  placeholder="rollnumber@institute.ac.in"
                  value={collegeEmail}
                  onChange={(e) => setCollegeEmail(e.target.value)}
                  className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" aria-label="Password or Access Pass" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                PASSWORD / ACCESS KEY
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-dark-950 border border-gold-500/30 rounded-sm px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-sm font-semibold text-xs tracking-wider uppercase text-black bg-gold-gradient shadow-gold-glow hover:shadow-[0_0_20px_rgba(245,186,65,0.6)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>SIGN IN TO KURUKSHETRA</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-dark-900 px-3 text-neutral-400 uppercase tracking-widest text-[10px]">
                  OR PROCEED WITH
                </span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(true);
                setTimeout(() => {
                  setIsSubmitted(false);
                  onClose();
                }, 1500);
              }}
              className="w-full py-2.5 px-4 rounded-sm font-medium text-xs tracking-wider text-neutral-200 bg-dark-950 border border-white/10 hover:border-gold-500/40 hover:bg-dark-850 transition-colors flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>CONTINUE WITH GOOGLE CAMPUS ID</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
