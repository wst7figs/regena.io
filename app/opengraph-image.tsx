import { ImageResponse } from "next/og";

export const alt = "Regena patient-growth infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "76px 82px", background: "#081311", color: "#f6f4ed", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, letterSpacing: 8 }}>
        <span>REGENA</span><span style={{ color: "#9be7cb", fontSize: 18, letterSpacing: 2 }}>PATIENT-GROWTH INFRASTRUCTURE</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 950 }}>
        <span style={{ color: "#9be7cb", fontSize: 22, letterSpacing: 3, textTransform: "uppercase" }}>For regenerative and longevity clinics</span>
        <div style={{ marginTop: 24, fontSize: 78, fontWeight: 600, letterSpacing: -4, lineHeight: .98 }}>Turn more patient demand into recurring revenue.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#a9b7b2", fontSize: 22 }}>
        <span>Demand</span><span style={{ width: 110, height: 2, background: "#74c9af" }} /><span>Response</span><span style={{ width: 110, height: 2, background: "#74c9af" }} /><span>Booking</span><span style={{ width: 110, height: 2, background: "#9a7de2" }} /><span>Revenue</span>
      </div>
    </div>,
    size,
  );
}
