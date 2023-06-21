import React from 'react'
import DownloadApp from '../homepage/sidebar/downloadApp'
import TrendingPosts from '../homepage/sidebar/trendingPosts'
import DiscoverPeople from '../homepage/sidebar/discoverPeople'
import CompanyInfo from '../homepage/sidebar/companyInfo'
import { useAtomValue } from 'jotai'
import { userDetails } from '@/store'

function MainSidebar() {
    const user:any = useAtomValue(userDetails)
  return (
    <aside
      id="no-scroll"
      className="w-full overflow-auto pb-[80px] flex flex-col gap-6"
    >
      <DownloadApp />
      {user?.token && (
        <>
          <TrendingPosts />
          <DiscoverPeople />
        </>
      )}
      <CompanyInfo />
    </aside>
  )
}

export default MainSidebar