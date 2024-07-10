"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function TabsContainer({
  piechartChild,
  barchartChild,
}: {
  piechartChild: ReactNode;
  barchartChild: ReactNode;
}) {
  return (
    <div className="rounded-md p-2 shadow-sm bg-slate-100">
      <Tabs defaultValue="pie-chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pie-chart">Pie Chart</TabsTrigger>
          <TabsTrigger value="bar-chart">Bar Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="pie-chart">
          <Card>
            <CardHeader className="mb-0 pb-0">
              <CardTitle>Income Breakdown</CardTitle>
              <CardDescription>Income frequency by category</CardDescription>
            </CardHeader>
            <CardContent>{piechartChild}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bar-chart">{barchartChild}</TabsContent>
      </Tabs>
    </div>
  );
}
