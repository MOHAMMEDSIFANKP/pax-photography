'use client';
import { useId } from "react";

export function InstagramIcon({ size = 17 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`ig-grad-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="30%" stopColor="#FF543E" />
          <stop offset="60%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#5B51D8" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#ig-grad-${id})`} />
      <rect
        x="6.5" y="6.5" width="11" height="11" rx="3.5"
        stroke="#fff" strokeWidth="1.4" fill="none"
      />
      <circle cx="12" cy="12" r="3.2" stroke="#fff" strokeWidth="1.4" fill="none" />
      <circle cx="16.2" cy="7.8" r="1.1" fill="#fff" />
    </svg>
  );
}

export function FacebookIcon({ size = 17 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`fb-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1877F2" />
          <stop offset="100%" stopColor="#0C5DC7" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#fb-grad-${id})`} />
      <path
        d="M13.6 21.8v-7.6h2.55l.38-2.96h-2.93V9.34c0-.86.24-1.44 1.47-1.44h1.57V5.25c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H8v2.96h2.56v7.6c.5.08 1.01.13 1.52.13.47 0 .94-.05 1.52-.11z"
        fill="#fff"
      />
    </svg>
  );
}
