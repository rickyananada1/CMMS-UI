import WaitingApprovalIcon from 'src/assets/icons/waiting-approval.svg'
import OnScheduledIcon from 'src/assets/icons/on-scheduled.svg'
import InProgressIcon from 'src/assets/icons/in-progress.svg'
import CompletedIcon from 'src/assets/icons/completed.svg'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetOverview } from '../services'
import moment from 'moment'

const useOverviewWO = () => {
  const location = useLocation()

  const [data, setData] = useState([
    {
      value: 0,
      statusLong: 'Waiting Approval',
      icon: WaitingApprovalIcon,
    },
    {
      value: 0,
      statusLong: 'On Scheduled',
      icon: OnScheduledIcon,
    },
    {
      value: 0,
      statusLong: 'In Progress',
      icon: InProgressIcon,
    },
    {
      value: 0,
      statusLong: 'Completed',
      icon: CompletedIcon,
    },
  ])
  const [isLoading, setIsLoading] = useState(true)

  const getOverviewService = useGetOverview()
  const getOverviewWO = async () => {
    setIsLoading(true)
    await getOverviewService
      .mutateAsync({
        params: {
          startDate: moment().format('DD-MM-YYYY'),
          endDate: moment().format('DD-MM-YYYY'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const newData = [
            {
              value: res?.data?.waitingApproval || 0,
              statusLong: 'Waiting Approval',
              icon: WaitingApprovalIcon,
            },
            {
              value: res?.data?.onScheduled || 0,
              statusLong: 'On Scheduled',
              icon: OnScheduledIcon,
            },
            {
              value: res?.data?.inProgress || 0,
              statusLong: 'In Progress',
              icon: InProgressIcon,
            },
            {
              value: res?.data?.completed || 0,
              statusLong: 'Completed',
              icon: CompletedIcon,
            },
          ]
          setData([...newData])
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getOverviewWO()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return {
    data,
    isLoading,
  }
}

export default useOverviewWO
