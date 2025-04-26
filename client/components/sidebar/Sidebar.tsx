import React from 'react'
import { SearchBar } from './SearchBar'
import { RouteSelect } from './RouteSelect'
import { MembershipStatus } from './MembershipStatus'
import { AccountManagement } from './AccountManagement'

export const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-auto scrollbar-hide sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountManagement />
        <SearchBar />
        <RouteSelect />
      </div>
      <MembershipStatus/>
    </div>
  )
}
