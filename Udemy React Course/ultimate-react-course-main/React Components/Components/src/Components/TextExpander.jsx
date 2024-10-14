import { useState } from "react";

const boxStyle = {
    padding: "1rem",
    border: "1px solid grey",
    margin: "0.5rem",
};

export default function TextExpander({
    collapsedNumWords = 10,
    expandButtonText = "show more",
    collapseButtonText = "show less",
    buttonColor = "#1f09cd",
    expanded = false,
    className = "",
    children,
}) {
    const [visible, setVisible] = useState(expanded);
    const [isHovered, setIsHovered] = useState(false);
    const displayText = visible
        ? children
        : `${children
              .split(" ")
              .slice(0, collapsedNumWords)
              .join(" ")
              .trim()}...`;

    const buttonStyle = {
        background: "none",
        border: "none",
        fornt: "inherit",
        cursor: "pointer",
        marginLeft: "6px",
        color: buttonColor,
        textDecoration: isHovered ? "underline" : "none",
    };
    return (
        <div style={boxStyle} className={className}>
            <span>{displayText}</span>
            <button
                style={buttonStyle}
                onClick={() => setVisible((curr) => !curr)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {visible ? collapseButtonText : expandButtonText}
            </button>
        </div>
    );
}
