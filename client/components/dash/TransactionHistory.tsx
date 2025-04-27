"use client"

import React from "react";
import {useState,useEffect} from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import { RefreshButton } from "./RefreshButton";

export const TransactionHistory = () => {

  const [accountData, setAccountData] = useState({ result: {
    transactionHistory: [{
      id:"",
      sku:"",
      date:"",
      price:0
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
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> User Transaction History
          <RefreshButton widgetName="TransactionHistory" />
        </h3>
        <button className="text-sm text-violet-500 hover:underline">
          See all
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          {
            accountData.result.transactionHistory.map((item, index) => (
              <TableRow
                cusId={item.id}
                sku={item.sku}
                date={item.date}
                price={
                  Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format( 
                    item.price
                  )
                 }
                order={index+1}
                key={index}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Customer ID</th>
        <th className="text-start p-1.5">Product</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Price</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  cusId,
  sku,
  date,
  price,
  order,
}: {
  cusId: string;
  sku: string;
  date: string;
  price: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {cusId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
