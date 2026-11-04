import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: "#07080a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00f0ff",
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 36,
          border: "4px solid rgba(0, 240, 255, 0.4)",
        }}
      >
        HA
      </div>
    ),
    {
      ...size,
    }
  );
}
