import { css } from "@emotion/react";

const colors = {
  default: "#077EDA",
};
const hoverColors = {
  default: "#0b69b1",
};

export default function Button({ children, onClick, color = "default" }) {
  return (
    <button
      css={{
        borderRadius: "6px",
        border: "1px solid rgba(27, 31, 36, 0.15)",
        backgroundColor: "rgb(246, 248, 250)",
        color: colors[color],
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        fontWeight: "600",
        lineHeight: "20px",
        fontSize: "14px",
        padding: "5px 16px",
        textAlign: "center",
        cursor: "pointer",
        appearance: "none",
        userSelect: "none",
        transition: "all ease-in-out 0.1s",
        "&:hover": {
          backgroundColor: hoverColors[color],
          color: "white",
        },
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
