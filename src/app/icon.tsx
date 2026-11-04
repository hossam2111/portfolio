import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#07080a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00f0ff",
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 6,
          border: "1px solid rgba(0, 240, 255, 0.4)",
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
