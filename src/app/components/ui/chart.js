import React from 'react';
import { Tooltip } from 'recharts';

export function ChartContainer({ config, children }) {
  return <div className="chart-container">{children}</div>;
}

export function ChartTooltip({ cursor, content }) {
  return <Tooltip cursor={cursor} content={content} />;
}

export function ChartTooltipContent({ hideLabel }) {
  return <div>{hideLabel ? 'Tooltip Content' : 'Detailed Tooltip Content'}</div>;
}
