import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GDPData } from "../types/gdp";

interface GDPChartProps {
  data: GDPData[];
}

const GDPChart: React.FC<GDPChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[500px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" padding={{ left: 30, right: 30 }} />
          <YAxis
            tickFormatter={(value) => `$${(value / 1_000_000_000).toFixed(2)}B`}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalGDP"
            stroke="#2563eb"
            name="PIB Total"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="gdpPerCapita"
            stroke="#16a34a"
            name="PIB per Capita"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GDPChart;
