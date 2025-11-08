import React, { useEffect } from "react";

export default function Toast({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!duration) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  // Tạo hiệu ứng keyframes rung nhẹ & fade-in
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes toastShakeSoft {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        50% { transform: translateX(2px); }
        75% { transform: translateX(-1px); }
      }
      @keyframes toastFadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes toastFadeOut {
        from { opacity: 1; }
        to { opacity: 0; transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "100px", // hiển thị ngang header
        right: "20px",
        zIndex: 9999,
        background:
          "linear-gradient(135deg, #0f141b 0%, #d23948 50%, #db4e5c 100%)",
        color: "#fff",
        padding: "14px 18px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontWeight: "600",
        fontSize: "15px",
        maxWidth: "360px",
        backdropFilter: "blur(4px)",
        animation: `
          toastFadeIn 0.5s ease forwards,
          toastShakeSoft 2s ease-in-out infinite,
          toastFadeOut 0.5s ease ${duration - 500}ms forwards
        `,
      }}
    >
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        style={{
          border: "none",
          background: "rgba(255,255,255,0.18)",
          color: "#fff",
          width: "28px",
          height: "28px",
          borderRadius: "999px",
          cursor: "pointer",
          fontSize: "18px",
          lineHeight: "28px",
          textAlign: "center",
        }}
      >
        &times;
      </button>
    </div>
  );
}
