import { useEffect, useState } from 'react'
import { useGetAssetChart } from '../services'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const initialData = [
  { key: 'Normal', label: 'Normal', color: 'rgba(14, 169, 118, 1)' },
  { key: 'Alert', label: 'Warning', color: 'rgba(255, 162, 41, 1)' },
  { key: 'Down', label: 'Danger', color: 'rgba(255, 86, 86, 1)' },
]

const useAssetChart = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [totalData, setTotalData] = useState(0)
  const [data, setData] = useState([])

  const getAssetChartService = useGetAssetChart()
  const getAssetChart = async () => {
    setIsLoading(true)
    await getAssetChartService
      .mutateAsync({
        params: {
          startDate: moment().format('DD-MM-YYYY'),
          endDate: moment().format('DD-MM-YYYY'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const dataWithValue = initialData.map((configItem) => {
            return {
              ...configItem,
              value: res.data[configItem.key],
            }
          })
          setData(dataWithValue)

          const valuesDataMonitoring = Object.values(res.data)
          const totalValue = valuesDataMonitoring.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          )
          setTotalData(totalValue)
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
    getAssetChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const getLegendItemClass = (label) => {
    if (label.toLowerCase() === 'normal') return 'normal'
    if (label.toLowerCase() === 'alert') return 'alert'
    if (label.toLowerCase() === 'down') return 'down'
    return ''
  }

  return {
    data,
    totalData,
    isLoading,
    getLegendItemClass,
  }
}

export default useAssetChart
