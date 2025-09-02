import React from 'react'
import useOverviewWO from './hooks/useOverviewWO'
import { formatThousands } from 'src/utils/helper'
import Card from '../../card/Card'
import moment from 'moment'
import { CSpinner } from '@coreui/react'

const OverviewWO = () => {
  const { data, isLoading } = useOverviewWO()

  const renderItems = (data) => {
    return data.map((item, index) => {
      return (
        <div key={index} className="flex">
          <img className="h-8" src={item?.icon} alt={item.statusLong} />
          <div className="flex flex-col ml-2">
            <span className="font-bold text-lg">{formatThousands(item.value)}</span>
            <span>{item.statusLong}</span>
          </div>
        </div>
      )
    })
  }

  return (
    <Card
      title="Overview Work Order"
      subtitle={moment().locale('en').format('DD MMMM YYYY')}
      cardClass="h-[calc(31vh-72px)]"
    >
      <div className="flex w-full mt-3">
        <div className="flex w-full overflow-auto">
          {!isLoading ? (
            <div className="border border-x-cmms-grey rounded-lg flex flex-col items-center justify-center text-gray-700 p-3 w-full min-h-fit">
              <div className="grid grid-cols-2 gap-3 w-full">{renderItems(data)}</div>
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <CSpinner color="primary" className="my-4" />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default OverviewWO
