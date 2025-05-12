
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { gsap } from 'gsap';

interface DataPoint {
  date: string;
  value: number;
}

interface ActivityChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
  animateOnMount?: boolean;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neuropen-surface p-2 border border-neuropen-border rounded-md text-xs">
        <p className="text-neuropen-text font-medium">{`${label}`}</p>
        <p className="text-neuropen-accent-blue">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const ActivityChart = ({ 
  title, 
  data, 
  color = "#1EAEDB",
  animateOnMount = true
}: ActivityChartProps) => {
  useEffect(() => {
    if (animateOnMount) {
      gsap.fromTo(
        ".chart-line",
        { opacity: 0, strokeDashoffset: 1000 },
        { 
          opacity: 1, 
          strokeDashoffset: 0, 
          duration: 1.5,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
  }, [animateOnMount]);

  return (
    <Card className="bg-neuropen-surface border-neuropen-border">
      <CardHeader>
        <CardTitle className="text-neuropen-text">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#888888' }}
                stroke="#333333"
              />
              <YAxis 
                tick={{ fill: '#888888' }}
                stroke="#333333"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#fff', stroke: color }}
                className="chart-line"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
