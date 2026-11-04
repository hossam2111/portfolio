"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export function TechStackSection() {
  return (
    <div className="space-y-6">
      {PROFILE.technicalStack.map((group) => (
        <div
          key={group.category}
          className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 border-b border-ink-border pb-5 last:border-b-0"
        >
          {/* Category label in sentence case */}
          <div className="sm:col-span-4">
            <h3 className="text-sm font-semibold text-paper font-sans">
              {group.category}
            </h3>
          </div>

          {/* Plain list of skills */}
          <div className="sm:col-span-8 flex flex-wrap gap-2 items-center">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center text-xs sm:text-sm text-paper-dim font-sans after:content-[','] last:after:content-[''] pr-1"
              >
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
