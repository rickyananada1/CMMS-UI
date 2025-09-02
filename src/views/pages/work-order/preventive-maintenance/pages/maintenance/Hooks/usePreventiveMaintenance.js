import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetDetailPreventiveMaintenance } from '../services'
import { useSelector } from 'react-redux'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const UsePreventiveMaintenance = ({ mode, setAction, setTabIndex }) => {
  const location = useLocation()
  const selectedRow = useSelector(
    (state) => state.preventiveMaintenances?.selectedPreventiveMaintenance,
  )

  const [data, setData] = useState({})
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const getPreventiveMaintenance = useGetDetailPreventiveMaintenance({
    id: selectedRow?.preventive_maintenance_id,
    config: {
      enabled: false,
    },
  })

  const getDetailFile = useGetFileUploaded({
    url: `/preventive-maintenance/${selectedRow?.preventive_maintenance_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/preventive-maintenance/${selectedRow?.preventive_maintenance_id}/attachment`,
    mode,
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
      getPreventiveMaintenance.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setData(getPreventiveMaintenance.data?.data?.data)
  }, [getPreventiveMaintenance.data, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const errorMessage = getPreventiveMaintenance.error
  const isLoading =
    getPreventiveMaintenance.isFetching ||
    getDetailFile.isLoading ||
    getPreventiveMaintenance.isLoading ||
    getDetailFile.isLoading

  return {
    data,
    errorMessage,
    isLoading,
    dataFile,
    handleDownload,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default UsePreventiveMaintenance
