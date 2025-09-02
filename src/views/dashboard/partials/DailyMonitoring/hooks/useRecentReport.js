import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'src/hooks/useDebounce'
import { useGetRecentReport } from '../services'

const useRecentReport = () => {
  const LIMIT = 10
  const [dataRecentReports, setDataRecentReport] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const baseDelay = 0.15
  const colorStatus = {
    WOCREATED: 'primary',
    QUEUED: 'orange-main',
    RESOLVED: 'green-main',
    CLOSED: 'green-main',
    CANCEL: 'red-main',
    REVISED: 'orange-main',
    NEW: 'primary',
  }

  const getRecentReportService = useGetRecentReport()
  const observer = useRef()

  useEffect(() => {
    setDataRecentReport([])
    setPage(1)
    setHasMore(true)
  }, [searchDebounce])

  const getRecentReport = useCallback(
    async (currentPage) => {
      setIsLoading(true)
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 200)
      })
      await getRecentReportService
        .mutateAsync({
          params: {
            page: currentPage,
            limit: LIMIT,
            search: searchDebounce || null,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const { data, total } = res.data

            const newData = data.map((item, index) => ({
              ...item,
              indexDelay: index,
            }))

            setDataRecentReport((prevData) =>
              currentPage === 1 ? newData : [...prevData, ...newData],
            )
            setHasMore(currentPage * LIMIT < total)
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getRecentReportService, searchDebounce, LIMIT],
  )

  useEffect(() => {
    getRecentReport(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchDebounce])

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore],
  )

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return {
    dataRecentReports,
    isLoading,
    search,
    colorStatus,
    baseDelay,
    handleSearch,
    lastItemRef,
  }
}

export default useRecentReport
