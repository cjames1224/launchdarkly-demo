"use client"

import React from "react";
import { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";

export const TopBar = () => {

  const [accountData, setAccountData] = useState({ result: { accountId:"", accountName:"" }});

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
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
        <span className="text-sm font-bold block">Application: Candy Bash Online ({accountData.result.accountId})</span>
          <span className="text-xs block text-stone-500">
            {
            new Date(Date.now()).toLocaleDateString('en-US', {
              weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
              })
            }
          </span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Prev 6 Months</span>
        </button>
      </div>
    </div>
  );
};
