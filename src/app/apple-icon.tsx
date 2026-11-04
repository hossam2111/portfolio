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
          fontSize: 92,
          background: "#0F1626",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F2A93B",
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 40,
          border: "4px solid rgba(242, 169, 59, 0.5)",
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
