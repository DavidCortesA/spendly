"use client";

import * as React from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { formatCurrency } from "@/lib/format";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function RevenueChart() {
  const { expenses, income } = useFinanceStore();

  // Build per-month income totals
  const data = MONTHS.map((month, index) => {
    const total = income
      .filter((i) => new Date(i.date).getMonth() === index)
      .reduce((s, i) => s + i.amount, 0);
    return { month, value: total };
  });

  // Only show months with data, fallback to at least current month window
  const nonZero = data.filter((d) => d.value > 0);
  const chartData = nonZero.length >= 2 ? data : [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 11000 },
    { month: "Apr", value: 18000 },
    { month: "May", value: 14000 },
    { month: "Jun", value: 19270 },
    { month: "Jul", value: 17000 },
  ];

  const [tooltip, setTooltip] = React.useState<{
    x: number; y: number; month: string; value: number;
    pxX: number; pxY: number; flipLeft: boolean;
  } | null>(null);

  const svgRef = React.useRef<SVGSVGElement>(null);

  const width = 600;
  const height = 80;
  const pad = { top: 8, right: 8, bottom: 20, left: 8 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(...chartData.map((d) => d.value), 1);

  const points = chartData.map((d, i) => ({
    x: pad.left + (i / (chartData.length - 1)) * chartW,
    y: pad.top + chartH - (d.value / max) * chartH,
    ...d,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD =
    pathD +
    ` L ${points[points.length - 1].x} ${pad.top + chartH} L ${points[0].x} ${pad.top + chartH} Z`;

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = width / rect.width;
    const mx = (e.clientX - rect.left) * scaleX;

    // Find closest point
    let closest = points[0];
    let minDist = Infinity;
    for (const p of points) {
      const d = Math.abs(p.x - mx);
      if (d < minDist) { minDist = d; closest = p; }
    }

    const scaleY = height / rect.height;
    const pxX = (closest.x / width) * rect.width;
    const pxY = (closest.y / height) * rect.height;
    const flipLeft = pxX > rect.width * 0.65;
    setTooltip({
      x: closest.x / scaleX + rect.left - rect.left,
      y: closest.y / scaleY,
      month: closest.month,
      value: closest.value,
      pxX,
      pxY,
      flipLeft,
    });
  }

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full cursor-crosshair"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C6FF00" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={pad.left}
            x2={width - pad.right}
            y1={pad.top + chartH * (1 - t)}
            y2={pad.top + chartH * (1 - t)}
            stroke="#1C1D22"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={areaD} fill="url(#revenueGrad)" />
        {/* Line */}
        <path d={pathD} fill="none" stroke="#C6FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {points.map((p) => (
          <g key={p.month}>
            <circle cx={p.x} cy={p.y} r="4" fill="#0B0B0F" stroke="#C6FF00" strokeWidth="2" />
          </g>
        ))}

        {/* Hover dot highlight */}
        {tooltip && (() => {
          const hp = points.find((p) => p.month === tooltip.month);
          return hp ? (
            <circle cx={hp.x} cy={hp.y} r="6" fill="#C6FF00" opacity="0.9" />
          ) : null;
        })()}

        {/* Vertical hover line */}
        {tooltip && (() => {
          const hp = points.find((p) => p.month === tooltip.month);
          return hp ? (
            <line
              x1={hp.x} y1={pad.top}
              x2={hp.x} y2={pad.top + chartH}
              stroke="#C6FF00" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"
            />
          ) : null;
        })()}

        {/* Month labels */}
        {points.map((p) => (
          <text
            key={p.month + "-label"}
            x={p.x}
            y={height - 4}
            textAnchor="middle"
            fontSize="9"
            fill={tooltip?.month === p.month ? "#C6FF00" : "#94a3b8"}
            fontWeight={tooltip?.month === p.month ? "600" : "400"}
          >
            {p.month}
          </text>
        ))}
      </svg>

      {/* Tooltip bubble */}
      {tooltip && (() => {
        const hp = points.find((p) => p.month === tooltip.month);
        if (!hp) return null;
        return (
          <div
            className="pointer-events-none absolute z-10 rounded-xl border border-border bg-card px-3 py-2 shadow-xl"
            style={{
              left: tooltip.flipLeft ? tooltip.pxX - 110 : tooltip.pxX + 12,
              top: Math.max(4, tooltip.pxY - 20),
            }}
          >
            <p className="text-[10px] font-medium text-muted-foreground">{tooltip.month}</p>
            <p className="text-sm font-bold text-[#C6FF00]">{formatCurrency(tooltip.value)}</p>
          </div>
        );
      })()}
    </div>
  );
}

export { RevenueChart };
