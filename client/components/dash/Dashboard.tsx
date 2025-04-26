import React from 'react'
import { DashGrid } from './DashGrid'
import { TopBar } from './TopBar'

export const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow h-[125vh]">
      <TopBar />
      <DashGrid />
    </div>
  )
}
