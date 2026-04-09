import * as React from "react";
import { revenueChartData } from "@/lib/mock-data";

function RevenueChart() {
  const max = Math.max(...revenueChartData.map((d) => d.value));
  const width = 400;
  const height = 120;
  const padding = { top: 10, right: 10, bottom: 24, left: 10 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = revenueChartData.map((d, i) => ({
    x: padding.left + (i / (revenueChartData.length - 1)) * chartW,
    y: padding.top + chartH - (d.value / max) * chartH,
    ...d,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD =
    pathD +
    ` L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C6FF00" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={areaD} fill="url(#revenueGrad)" />
      {/* Line */}
      <path d={pathD} fill="none" stroke="#C6FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {points.map((p) => (
        <circle key={p.month} cx={p.x} cy={p.y} r="3" fill="#C6FF00" />
      ))}
      {/* Month labels */}
      {points.map((p) => (
        <text
          key={p.month + "-label"}
          x={p.x}
          y={height - 4}
          textAnchor="middle"
          fontSize="9"
          fill="#94a3b8"
        >
          {p.month}
        </text>
      ))}
    </svg>
  );
}

export { RevenueChart };
