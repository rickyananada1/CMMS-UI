import { useEffect, useState } from 'react'
import { useGetSubassemblies } from '../services/subassemblies'

const useSubassemblies = () => {
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([])

  const getSubassemblies = useGetSubassemblies()

  const getSubassembliesList = async (params) => {
    setIsLoading(true)
    await getSubassemblies
      .mutateAsync({
        params: params,
      })
      .then((response) => {
        if (response?.status === 200) {
          if (Array.isArray(response?.data?.data) && response?.data?.data?.length) {
            let responseData = response?.data
            setData(responseData?.data)
            setTotalPage(responseData?.total)
          }
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handlePageChange = (page) => {
    getSubassembliesList({ q: search, page: page, limit: limit })
    setPage(page)
  }

  const handlePerRowsChange = (newPerPage, page) => {
    getSubassembliesList({ q: search, page: page, limit: newPerPage })
    setPage(page)
    setLimit(newPerPage)
  }

  useEffect(() => {
    getSubassembliesList({ q: search, page: page, limit: limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getSubassembliesList({ q: search, page: page, limit: limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, setSearch])

  return {
    data,
    isLoading,
    search,
    page,
    errorMessage,
    totalPage,
    setSearch,
    handlePageChange,
    handlePerRowsChange,
  }
}

export default useSubassemblies
