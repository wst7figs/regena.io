import { ImageResponse } from "next/og";

export const alt = "Regena: patients in your chair, not just leads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "76px 82px", background: "#081311", color: "#f6f4ed", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, letterSpacing: 8 }}>
        <span>REGENA</span><span style={{ color: "#9be7cb", fontSize: 18, letterSpacing: 2 }}>FOR LASER CLINICS & MED SPAS</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 950 }}>
        <span style={{ color: "#9be7cb", fontSize: 22, letterSpacing: 3, textTransform: "uppercase" }}>We own everything after the click</span>
        <div style={{ marginTop: 24, fontSize: 78, fontWeight: 600, letterSpacing: -4, lineHeight: .98 }}>Patients in your chair, not just leads.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#a9b7b2", fontSize: 22 }}>
        <span>Ads</span><span style={{ width: 110, height: 2, background: "#74c9af" }} /><span>Call in 5 min</span><span style={{ width: 110, height: 2, background: "#74c9af" }} /><span>Booked</span><span style={{ width: 110, height: 2, background: "#9a7de2" }} /><span>Showed</span>
      </div>
    </div>,
    size,
  );
}
