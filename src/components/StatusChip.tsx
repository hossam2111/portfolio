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
    <div className="inline-flex items-center gap-2.5 rounded-full border border-ink-border bg-ink-raised/85 px-3.5 py-1.5 text-xs text-paper backdrop-blur-md shadow-sm">
      <span className="relative flex h-2 w-2">
        {PROFILE.isAvailableForWork && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal shadow-[0_0_8px_#F2A93B]" />
      </span>
      <span className="font-mono text-[11px] text-signal font-medium">
        {timeString || "Syncing clock..."}
      </span>
      <span className="h-2.5 w-[1px] bg-paper/15" aria-hidden="true" />
      <span className="text-paper-dim text-xs font-sans">
        {PROFILE.statusText}
      </span>
    </div>
  );
}
