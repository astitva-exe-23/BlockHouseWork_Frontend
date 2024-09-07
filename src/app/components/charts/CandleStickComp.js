"use client";

import { useEffect, useState } from "react";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import axiosClient from "@/app/utills/axiosclient";

export const description = "A candlestick chart showing stock prices";

export function CandleStickChartComp() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosClient.get("/candlestick-data/");
        const { data } = response.data;

        // Transform the API response data
        setChartData(data);
      } catch (error) {
        console.error("Error fetching candlestick chart data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Candlestick Chart</CardTitle>
        <CardDescription>January 2023</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
              left: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Using Bar for candlestick representation */}
            <Bar
              dataKey="high"
              fill="#8884d8" // Color for high prices
              name="High"
            />
            <Bar
              dataKey="low"
              fill="#82ca9d" // Color for low prices
              name="Low"
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#ff7300" // Orange for close price
              name="Close"
            />
            <Line
              type="monotone"
              dataKey="open"
              stroke="#ff0000" // Red for open price
              name="Open"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing stock price movements for January 2023 
        </div>
      </CardFooter>
    </Card>
  );
}
