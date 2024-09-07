"use client";

import { useState, useEffect } from "react";
import axiosClient from "../../../app/utills/axiosclient.js";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.js";
import {
  ChartContainer,
  ChartTooltipContent,
} from "../ui/chart.js";

export const description = "A bar chart";

export function BarChartComp() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from Django API using Axios
    async function fetchData() {
      try {
        const response = await axiosClient.get('/bar-chart-data/');
        const data = response.data;

        // Convert data to the format required by BarChart
        const formattedData = data.labels.map((label, index) => ({
          month: label,
          desktop: data.data[index],
        }));
        console.log("Formatted data:", formattedData); 

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }

    fetchData();
  }, []);
  console.log("chart data:", chartData); 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>Showing data for products</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing data for products
        </div>
      </CardFooter>
    </Card>
  );
}
