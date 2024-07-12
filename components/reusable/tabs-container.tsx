"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function TabsContainer({
  piechartChild,
  barchartChild,
  cardTitle,
  cardDescription,
}: {
  piechartChild: ReactNode;
  barchartChild: ReactNode;
  cardTitle: string;
  cardDescription: string;
}) {
  return (
    <div className="rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-800">
      <Tabs defaultValue="pie-chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pie-chart">Pie Chart</TabsTrigger>
          <TabsTrigger value="bar-chart">Bar Chart</TabsTrigger>
        </TabsList>
        <TabsContent value="pie-chart">
          <Card className="border-none shadow-none">
            <CardHeader className="mb-0 pb-0">
              <CardTitle>{cardTitle}</CardTitle>
              <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>{piechartChild}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bar-chart">
          <Card className="border-none shadow-none">
            <CardHeader className="mb-0 pb-0">
              <CardTitle>{cardTitle}</CardTitle>
              <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>{barchartChild}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
