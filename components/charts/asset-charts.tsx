"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type TooltipEntry = { value: number; name: string; color: string };

// Minimal tooltip shared across charts
function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
  formatter?: (v: number, name: string) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-card px-3 py-2 text-xs shadow-sm">
      {label ? <p className="mb-1 font-medium text-muted-foreground">{label}</p> : null}
      {payload.map((p) => (
        <p key={p.name} className="font-medium" style={{ color: p.color }}>
          {formatter ? formatter(p.value, p.name) : p.value}
        </p>
      ))}
    </div>
  );
}

// Small sparkline-style area chart embedded in asset cards
function AssetAreaChart({
  data,
  color,
  gradientId,
  positive = true,
}: {
  data: { month: string; value: number }[];
  color: string;
  gradientId: string;
  positive?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <AreaChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.18} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltip
              active={active}
              payload={payload as unknown as TooltipEntry[]}
              formatter={(v) => `£${v.toLocaleString("en-GB")}`}
            />
          )}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 3, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Donut / pie chart for portfolio allocation
function AllocationPieChart({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={52}
          outerRadius={78}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => (
            <ChartTooltip
              active={active}
              payload={payload as unknown as TooltipEntry[]}
              formatter={(v, name) => `${name}: ${v}%`}
            />
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Combined line chart showing all asset values over time
function PortfolioLineChart({
  data,
  lines,
}: {
  data: Record<string, number | string>[];
  lines: { key: string; color: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          strokeOpacity={0.06}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: "currentColor", opacity: 0.4 }}
          axisLine={false}
          tickLine={false}
          interval={1}
        />
        <Tooltip
          content={({ active, payload, label }) => (
            <ChartTooltip
              active={active}
              payload={payload as unknown as TooltipEntry[]}
              label={label as string}
              formatter={(v, name) => `${name}: £${v.toLocaleString("en-GB")}`}
            />
          )}
        />
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            stroke={l.color}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export { AllocationPieChart, AssetAreaChart, PortfolioLineChart };
