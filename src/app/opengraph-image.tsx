import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";

export const alt = `${PROFILE.name} — Human AI Trainer & AI Engineer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#07080a",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative grid/glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#00f0ff",
              boxShadow: "0 0 16px #00f0ff",
            }}
          />
          <span
            style={{
              color: "#00f0ff",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO // AI TRAINING & SYSTEMS
          </span>
        </div>

        {/* Center Name & Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {PROFILE.name}
          </h1>

          <div
            style={{
              width: "120px",
              height: "4px",
              backgroundColor: "#00f0ff",
              borderRadius: "2px",
            }}
          />

          <p
            style={{
              color: "#94a3b8",
              fontSize: "26px",
              fontWeight: 400,
              maxWidth: "960px",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {PROFILE.title}
          </p>
        </div>

        {/* Bottom meta strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "#64748b", fontSize: "18px" }}>
            {PROFILE.location} • {PROFILE.email}
          </span>
          <span style={{ color: "#00f0ff", fontSize: "18px", fontWeight: 600 }}>
            5+ Years • 10 Countries • 4 Languages
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
