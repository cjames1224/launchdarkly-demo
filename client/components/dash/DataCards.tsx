"use client"

import React from "react";
import {useEffect, useState} from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

// TODO - update this data so it is valid against db
export const DataCards = () => {

  const [accountData, setAccountData] = useState({ result: {
    metrics: [{
      grossRevenue:0,
      trailingYear:0,
      averageOrder:0
    }] 
  }});

  useEffect(() => {
    fetch("http://localhost:3001/api/metrics/1")
      .then(data => {
        return data.json();
      })
      .then(data => {
        setAccountData(data)
        console.log(data)
      })
      .catch(error => {
        console.log("ERROR", error);
      })
  }, []);

  return (
    <>
      <Card
        title="Gross Revenue"
        value={
          Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format( 
            accountData.result.metrics[accountData.result.metrics.length-1].grossRevenue
          )
         }
        pillText="2.75%"
        trend="up"
        period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Avg Order"
        value={
          Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format( 
            accountData.result.metrics[accountData.result.metrics.length-1].averageOrder
          )
         }
        pillText="1.01%"
        trend="down"
        period="From Jan 1st - Jul 31st"
      />
      <Card
        title="Trailing Year"
        value={
          Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format( 
            accountData.result.metrics[accountData.result.metrics.length-1].trailingYear
          )
         }
        pillText="60.75%"
        trend="up"
        period="Previous 365 days"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
