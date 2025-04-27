"use client";

import React from "react";
import { useState, useEffect } from 'react';
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { RefreshButton } from "./RefreshButton";

export const ActivityGraph = ({ldClient}:{ldClient:any}) => {

  const [accountData, setAccountData] = useState({ result: {
    metrics: [] 
  }});

  useEffect(() => {
    fetch("http://localhost:3001/api/metrics/1")
      .then(data => {
        return data.json();
      })
      .then(data => {
        setAccountData(data)
      })
      .catch(error => {
        console.error("ERROR", error);
      })
  }, []);


  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> User Activity
          <RefreshButton widgetName="ActivityGraph" ldClient={ldClient}/>
          
        </h3>

      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={accountData.result.metrics}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="new"
              stroke="#18181b"
              fill="#18181b"
            />
            <Line
              type="monotone"
              dataKey="returning"
              stroke="#5b21b6"
              fill="#5b21b6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
