"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/profile";

export function StatusChip() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeString(`${formatted} Cairo`);
      } catch {
        const now = new Date();
        setTimeString(`${now.toLocaleTimeString("en-GB")} Local`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-surface-subtle/80 px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.08)]">
      <span className="relative flex h-2 w-2">
        {PROFILE.isAvailableForWork && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#00f0ff]" />
      </span>
      <span className="font-mono text-[11px] text-accent tracking-wide font-medium">
        {timeString || "Syncing clock..."}
      </span>
      <span className="h-2.5 w-[1px] bg-white/10" aria-hidden="true" />
      <span className="text-slate-300 font-medium">
        {PROFILE.statusText}
      </span>
    </div>
  );
}
