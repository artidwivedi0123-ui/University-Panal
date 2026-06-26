"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

interface BarChartData {
  name: string;
  value: number;
}

interface ReusableBarChartProps {
  data: BarChartData[];
  xAxisKey?: string;
  barColor?: string;
  height?: number;
  yAxisKey?:string;
}


export default function ReusableBarChart({
  data,
  xAxisKey = "name",
  barColor = "#330a4bff",
  height = 350,
yAxisKey= "value",
}: ReusableBarChartProps) {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisKey}
            angle={-10}
            textAnchor="end"
            interval={0}
            
          />

          <YAxis 
          dataKey={yAxisKey}
            stroke="#3a1b83ff"
           />

          <Tooltip />

          <Bar
            dataKey="value"
            fill={barColor}
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}