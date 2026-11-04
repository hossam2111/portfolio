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
          background: "#0F1626",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F2A93B",
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          borderRadius: 8,
          border: "1.5px solid rgba(242, 169, 59, 0.5)",
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
