import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/profile";

export const alt = `${PROFILE.name} — Human AI Trainer & Evaluator`;
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
          backgroundColor: "#0F1626",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Soft amber signal radial background glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242, 169, 59, 0.18) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#F2A93B",
              boxShadow: "0 0 16px #F2A93B",
            }}
          />
          <span
            style={{
              color: "#F2A93B",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            Human in the loop — Turning noise into signal
          </span>
        </div>

        {/* Center Name & Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h1
            style={{
              color: "#ECE8DF",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            {PROFILE.name}
          </h1>

          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#F2A93B",
              borderRadius: "2px",
            }}
          />

          <p
            style={{
              color: "#9AA3B5",
              fontSize: "26px",
              fontWeight: 400,
              maxWidth: "960px",
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            {PROFILE.title}
          </p>
        </div>

        {/* Bottom meta strip (clean sentence case, no middle dots) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(236, 232, 223, 0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "#9AA3B5", fontSize: "18px" }}>
            {PROFILE.location} / {PROFILE.email}
          </span>
          <span style={{ color: "#F2A93B", fontSize: "18px", fontWeight: 600 }}>
            5+ years experience / 10 countries / 4 languages
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
