import React, { useEffect } from 'react'

import { breadcrumbActions } from 'src/store/actions'
import { useDispatch } from 'react-redux'
import TrendReport from './partials/TrendReport'
import DailyMonitoring from './partials/DailyMonitoring'
import OverviewWO from './partials/OverviewWO'
import AllAsset from './partials/AllAsset'

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(breadcrumbActions.resetState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="grid grid-cols-3 gap-4 h-auto mb-4">
        <div className="col-span-2 flex flex-col gap-4">
          <TrendReport />
          <AllAsset />
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <DailyMonitoring />
          <OverviewWO />
        </div>
      </div>
    </>
  )
}

export default Dashboard
