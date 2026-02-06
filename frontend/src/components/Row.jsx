import React from "react";

export default function Row({ cells = [] }) {
    const baseText = "text-gray-700";
    const secondaryText = "text-gray-500";

    const rowClass =
        "transition-colors duration-150 even:bg-gray-50 hover:bg-gray-100";

    return (
        <tr className={rowClass}>
            {cells.map((cell, i) => {
                const isSecondary = i === 1; // Date/time column styled slightly lighter
                let textCls = isSecondary ? secondaryText : baseText;
                const numeric =
                    typeof cell === "number" || /[0-9]/.test(String(cell));

                // color percent change column: + => green, - => red
                if (typeof cell === "string" && cell.includes("%")) {
                    if (cell.trim().startsWith("+"))
                        textCls = "text-emerald-600 font-medium";
                    else if (cell.trim().startsWith("-"))
                        textCls = "text-rose-500 font-medium";
                }

                return (
                    <td
                        key={i}
                        className={`px-4 py-3 text-sm ${textCls} ${numeric ? "tabular-nums" : ""}`}
                    >
                        {cell}
                    </td>
                );
            })}
        </tr>
    );
}
