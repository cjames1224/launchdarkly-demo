import React from "react";
import { ActivityGraph } from "./ActivityGraph";
import { UsageReport } from "./UsageReport";
import { DataCards } from "./DataCards";
import { TransactionHistory } from "./TransactionHistory";
import { useFlags } from 'launchdarkly-react-client-sdk';

const DashGrid = ({ldClient}:{ldClient:any}) => {
  
  const flags = useFlags();

  // console.log(flags)
  
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <DataCards />
      <ActivityGraph ldClient={ldClient}/>
      {flags.usageMetricsWidget && <UsageReport ldClient={ldClient}/>}
      {flags.userTransactionHistory && <TransactionHistory ldClient={ldClient}/>}
    
    </div>
  );
};

export default DashGrid