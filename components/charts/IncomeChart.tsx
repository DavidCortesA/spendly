import * as React from "react";

function IncomeChart() {
  const cols = 32;
  const rows = 8;

  // Generate a realistic-looking dot matrix
  const dots = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => {
      const progress = col / cols;
      const threshold = 0.3 + progress * 0.5 + (row / rows) * 0.2;
      const active = Math.random() > threshold;
      const brightness = active ? Math.random() * 0.6 + 0.4 : Math.random() * 0.15;
      return brightness;
    })
  );

  return (
    <div className="w-full overflow-hidden rounded-lg">
      <svg
        viewBox={`0 0 ${cols * 6} ${rows * 6}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {dots.map((row, ri) =>
          row.map((brightness, ci) => (
            <circle
              key={`${ri}-${ci}`}
              cx={ci * 6 + 3}
              cy={ri * 6 + 3}
              r="1.5"
              fill={`rgba(255, 255, 255, ${brightness})`}
            />
          ))
        )}
      </svg>
    </div>
  );
}

export { IncomeChart };
