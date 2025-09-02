import React from 'react'
import Card from '../../card/Card'
import AssetChart from './components/AssetChart'
import moment from 'moment'
import RecentReport from './components/RecentReport'

const DailyMonitoring = () => {
  const currentDate = moment()

  return (
    <Card
      title="Daily Monitoring"
      subtitle={currentDate.format('DD MMMM YYYY')}
      cardClass="h-[calc(68vh-72px)]"
    >
      <div className="flex flex-col w-full gap-3 grow">
        <AssetChart />
        <RecentReport />
      </div>
    </Card>
  )
}

export default DailyMonitoring
