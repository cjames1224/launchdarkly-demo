import React from 'react'
import { FiRefreshCw } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { useLDClient } from 'launchdarkly-react-client-sdk';

export const RefreshButton = ({ widgetName }:{widgetName:string}) => {
  const router = useRouter();
  const ldClient = useLDClient();

  const handleRefresh = () => {
    if (ldClient) {
      ldClient.track('UsageReportRefreshes', {
        customProperty: widgetName,
      });
    }

    router.refresh();
  };
  return (
    <button className="flex items-center justify-start gap-2 rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-stone-200 bg-transparent text-stone-500 shadow-none" onClick={handleRefresh}>
      <FiRefreshCw />
    </button>
  )
}

