import { useLocation as useLocationRouter } from 'react-router-dom'
import { useGetAssetChanges, useGetTrendReport } from '../services/getTrendReport'
import { useEffect, useState } from 'react'

const useTrendReport = () => {
  const location = useLocationRouter()
  const currentYear = new Date().getFullYear().toString()

  const [data, setData] = useState([])
  const [dataDownToNormal, setDataDownToNormal] = useState(0)
  const [dataNormalToDown, setDataNormalToDown] = useState(0)

  const getDataTrendReport = useGetTrendReport({
    config: {
      enable: false,
    },
  })
  const getDataAssetChanges = useGetAssetChanges()

  useEffect(() => {
    getDataTrendReport.refetch()
    getDataAssetChanges.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    const report = getDataTrendReport.data?.data

    if (report && Array.isArray(report.data)) {
      setData(report.data || [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDataTrendReport.data])

  useEffect(() => {
    const report = getDataAssetChanges.data?.data

    if (report && Array.isArray(report.data)) {
      setDataDownToNormal(report.data[0].normal || 0)
      setDataNormalToDown(report.data[0].down_or_alert || 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDataAssetChanges.data])

  const prepareChartData = () => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    // Ubah data awal menjadi Map untuk pencarian yang lebih cepat
    const dataMap = new Map(data.map((item) => [item.month, item]))

    const fullYearData = Array.from({ length: 12 }, (_, i) => {
      const monthNumber = i + 1
      const existingData = dataMap.get(monthNumber)

      if (existingData) {
        return {
          ...existingData,
          monthName: monthNames[i],
        }
      } else {
        return {
          month: monthNumber,
          monthName: monthNames[i],
          normal: 0,
          alert: 0,
          down: 0,
          total_asset: 0,
        }
      }
    })

    return fullYearData
  }

  return {
    data,
    currentYear,
    dataDownToNormal,
    dataNormalToDown,
    prepareChartData,
  }
}

export default useTrendReport
