import { useState } from "react";
export default function TextExpander({
    collapsedNumWords = 10,
    expandButtonText = "show",
    collapseButtonText = "hide",
    buttonColor = "black",
    children,
}) {
    const [visible, setVisible] = useState(true);
    const txtContent = visible
        ? children
        : `${children
              .split(" ")
              .slice(0, collapsedNumWords)
              .join(" ")
              .trim()}...`;
    return (
        <div>
            <span>{txtContent}</span>
            <button
                style={{ color: buttonColor }}
                onClick={() => setVisible((curr) => !curr)}
            >
                {visible ? collapseButtonText : expandButtonText}
            </button>
        </div>
    );
}
