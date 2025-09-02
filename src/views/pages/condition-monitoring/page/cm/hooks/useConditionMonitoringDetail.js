import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation as useLocationRouter } from 'react-router-dom'
import { useDetailCM } from '../services'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

const useConditionMonitoringDetail = ({ mode, setTabIndex }) => {
  const tableRef = useRef()
  const tableRefCharacter = useRef()
  const location = useLocationRouter()

  const selectedRow = useSelector((state) => state.conditionMonitoring?.selectedConditionMonitoring)

  const [data, setData] = useState({})
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const getConditionMonitoring = useDetailCM({
    id: selectedRow?.condition_monitoring_id,
    config: {
      enabled: false,
    },
  })

  const getDetailFile = useGetFileUploaded({
    url: `/asset/condition-monitoring/${selectedRow?.condition_monitoring_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/asset/condition-monitoring/${selectedRow?.condition_monitoring_id}/attachment`,
    mode,
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getConditionMonitoring.refetch()
      getDetailFile.refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setData(getConditionMonitoring.data?.data?.data)
  }, [getConditionMonitoring.data, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const isLoading =
    getConditionMonitoring.isLoading ||
    getConditionMonitoring.isFetching ||
    getDetailFile.isLoading ||
    getDetailFile.isFetching

  const isError = getConditionMonitoring.isError || getDetailFile.isError
  const errorMessage = getConditionMonitoring.error

  return {
    data,
    dataFile,
    tableRef,
    isError,
    errorMessage,
    isLoading,
    selectedRow,
    handleDownload,
    tableRefCharacter,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default useConditionMonitoringDetail
