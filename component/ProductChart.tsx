"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

type WeeklyProductData = {
  week: string;
  products: number;
};

type ProductChartProps = {
  data: WeeklyProductData[];
};

const CHART_CONFIG = {
  margin: { top: 5, right: 30, left: 20, bottom: 5 },
  grid: { strokeDasharray: "3 3", stroke: "#f0f0f0" },
  axis: { stroke: "#666", fontSize: 12 },
  area: {
    stroke: "#8b5cf6",
    fill: "#8b5cf6",
    opacity: 0.2,
    strokeWidth: 2,
  },
};

const TOOLTIP_STYLE = {
  content: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  label: { 
    color: "#374151", 
    fontWeight: "500" 
  },
};

export default function ProductChart({ data }: ProductChartProps) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={CHART_CONFIG.margin}>
          <CartesianGrid 
            strokeDasharray={CHART_CONFIG.grid.strokeDasharray} 
            stroke={CHART_CONFIG.grid.stroke} 
          />
          
          <XAxis
            dataKey="week"
            stroke={CHART_CONFIG.axis.stroke}
            fontSize={CHART_CONFIG.axis.fontSize}
            tickLine={false}
            axisLine={false}
          />
          
          <YAxis
            stroke={CHART_CONFIG.axis.stroke}
            fontSize={CHART_CONFIG.axis.fontSize}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={TOOLTIP_STYLE.content}
            labelStyle={TOOLTIP_STYLE.label}
          />
          
          <Area
            type="monotone"
            dataKey="products"
            stroke={CHART_CONFIG.area.stroke}
            fill={CHART_CONFIG.area.fill}
            fillOpacity={CHART_CONFIG.area.opacity}
            strokeWidth={CHART_CONFIG.area.strokeWidth}
            dot={{ fill: CHART_CONFIG.area.stroke, r: 2 }}
            activeDot={{ fill: CHART_CONFIG.area.fill, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}