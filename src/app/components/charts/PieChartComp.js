"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import axiosClient from "@/app/utills/axiosclient";

export const description = "A simple pie chart";

export function PieChartComp() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from Django API
    async function fetchData() {
      try {
        const response = await axiosClient.get("/pie-chart-data/");
        const { labels, data } = response.data;

        // Transform the API response data
        const transformedData = labels.map((label, index) => ({
          name: label,
          value: data[index],
          fill: getColorForLabel(label), // Assign colors based on labels if needed
        }));

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    }

    fetchData();
  }, []);

  // Function to assign colors based on labels
  function getColorForLabel(label) {
    const colors = {
        Red: "#FF0000",    // Red
        Blue: "#0000FF",   // Blue
        Yellow: "#FFFF00", // Yellow
        Green: "#00FF00",  // Green
        Purple: "#800080", // Purple
    };
    return colors[label] || "#8884d8"; // Default color if label is not found
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}} // You can adjust or use the config if necessary
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart width={600} height={300}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="name"  fill={(entry) => entry.fill} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
