"use client";

import React from "react";
import {useState, useEffect} from "react";
import { FiEye } from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { RefreshButton } from "./RefreshButton";

export const UsageReport = ({ldClient}:{ldClient:any}) => {


  const [accountData, setAccountData] = useState({ result: {
    metrics: [{
      usage: []
    }] 
  }});

  useEffect(() => {
    fetch("http://localhost:3001/api/metrics/1")
      .then(data => {
        return data.json();
      })
      .then(data => {
        setAccountData(data)
        // console.log(data)
      })
      .catch(error => {
        console.error("ERROR", error);
      })
  }, []);

  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye /> Usage
          <RefreshButton widgetName="UsageReport" ldClient={ldClient}/>
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={accountData.result.metrics[accountData.result.metrics.length-1].usage}>
            <PolarGrid />
            <PolarAngleAxis className="text-xs font-bold" dataKey="feature" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mobile"
              dataKey="mobile"
              stroke="#18181b"
              fill="#18181b"
              fillOpacity={0.2}
            />
            <Radar
              name="Desktop"
              dataKey="desktop"
              stroke="#5b21b6"
              fill="#5b21b6"
              fillOpacity={0.2}
            />
            <Radar
              name="Console"
              dataKey="console"
              stroke="#5b21b6"
              fill="#5b21b6"
              fillOpacity={0.2}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
