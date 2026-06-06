export function GpaPreview() {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-background p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground">Cumulative GPA</p>
          <p className="text-3xl font-bold tabular-nums text-foreground">3.42</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground">Projected</p>
          <p className="text-lg font-semibold text-success">3.55</p>
        </div>
      </div>

      <svg viewBox="0 0 220 60" className="w-full" aria-hidden>
        <defs>
          <linearGradient id="gpa-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.49 0.195 258)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.49 0.195 258)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M20,15 C50,15 50,35 80,35 C110,35 110,42 140,42 C165,42 180,30 200,28 L200,60 L20,60 Z"
          fill="url(#gpa-grad)"
        />
        <path
          d="M20,15 C50,15 50,35 80,35 C110,35 110,42 140,42 C165,42 180,30 200,28"
          stroke="oklch(0.49 0.195 258)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M140,42 C165,42 180,30 200,28"
          stroke="oklch(0.527 0.154 150)"
          strokeWidth="2"
          strokeDasharray="4 3"
          fill="none"
          strokeLinecap="round"
        />
        {[
          { x: 20, y: 15, label: "3.80" },
          { x: 80, y: 35, label: "3.50" },
          { x: 140, y: 42, label: "3.42" },
        ].map(({ x, y, label }) => (
          <g key={x}>
            <circle cx={x} cy={y} r="3.5" fill="oklch(0.49 0.195 258)" />
            <text x={x} y={y - 7} textAnchor="middle" fontSize="8" fill="oklch(0.52 0.03 264)" fontFamily="monospace">
              {label}
            </text>
          </g>
        ))}
        <circle cx={200} cy={28} r="3.5" fill="oklch(0.527 0.154 150)" />
        <text x={200} y={21} textAnchor="middle" fontSize="8" fill="oklch(0.527 0.154 150)" fontFamily="monospace">
          3.55
        </text>
        {["S1", "S2", "S3", "S4*"].map((s, i) => (
          <text key={s} x={20 + i * 60} y={57} textAnchor="middle" fontSize="7.5" fill="oklch(0.52 0.03 264)" fontFamily="monospace">
            {s}
          </text>
        ))}
      </svg>

      <div className="grid grid-cols-3 gap-2 pt-1">
        {[
          { label: "Best semester", value: "3.80", sub: "Sem 1" },
          { label: "Current", value: "3.42", sub: "Sem 3" },
          { label: "Target", value: "3.55", sub: "At grad" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-lg bg-muted/50 px-2 py-1.5 text-center">
            <p className="font-mono text-xs font-semibold text-foreground">{value}</p>
            <p className="text-[9px] text-muted-foreground">{label}</p>
            <p className="text-[9px] text-primary">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
