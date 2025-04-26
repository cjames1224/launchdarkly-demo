import React from "react";
import { ActivityGraph } from "./ActivityGraph";
import { UsageReport } from "./UsageReport";
import { DataCards } from "./DataCards";

export const DashGrid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <DataCards />
      <ActivityGraph />
      <UsageReport />
    </div>
  );
};
