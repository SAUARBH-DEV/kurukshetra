import React, { useState, useEffect, useRef } from 'react';

interface SpeedTypingTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  triggerKey?: string | number | boolean;
  enabled?: boolean;
  onComplete?: () => void;
}

export const SpeedTypingText: React.FC<SpeedTypingTextProps> = ({
  text,
  delay = 0,
  speed = 28,
  className = '',
  cursorClassName = '',
  showCursor = true,
  triggerKey,
  enabled = true,
  onComplete,
}) => {
  const [displayedLength, setDisplayedLength] = useState<number>(0);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // If not enabled yet (e.g. waiting for inView/scroll), stay idle
    if (!enabled) {
      setDisplayedLength(0);
      setCursorVisible(false);
      setIsTyping(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (cursorTimerRef.current) clearTimeout(cursorTimerRef.current);
      return;
    }

    // If reduced motion is requested, render full text immediately
    if (prefersReducedMotion) {
      setDisplayedLength(text.length);
      setCursorVisible(false);
      setIsTyping(false);
      return;
    }

    // Reset state on trigger change
    setDisplayedLength(0);
    setCursorVisible(true);
    setIsTyping(false);

    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (cursorTimerRef.current) clearTimeout(cursorTimerRef.current);

    // Initial delay before typing starts
    timerRef.current = setTimeout(() => {
      setIsTyping(true);
      let currentLen = 0;

      intervalRef.current = setInterval(() => {
        currentLen += 1;
        setDisplayedLength(currentLen);

        if (currentLen >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsTyping(false);
          onComplete?.();

          // Keep cursor blinking for 700ms after completion, then fade out
          cursorTimerRef.current = setTimeout(() => {
            setCursorVisible(false);
          }, 700);
        }
      }, speed);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (cursorTimerRef.current) clearTimeout(cursorTimerRef.current);
    };
  }, [text, delay, speed, triggerKey, enabled, prefersReducedMotion]);

  const displayedText = text.slice(0, displayedLength);

  return (
    <span
      className={`inline will-change-transform ${className}`}
      aria-label={text}
      role="text"
    >
      <span>{displayedText}</span>

      {/* Tactical esports glowing gold cursor */}
      {showCursor && cursorVisible && (
        <span
          className={`inline-block w-[2.5px] sm:w-[3px] h-[0.8em] bg-gold-400 ml-1 translate-y-[0.08em] align-baseline rounded-xs shadow-[0_0_8px_#F5BA41] ${
            isTyping ? 'opacity-100' : 'animate-pulse'
          } ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
};
