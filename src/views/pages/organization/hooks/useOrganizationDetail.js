import { useServiceOrganizationDetail } from '../services'
import { useState, useEffect } from 'react'
import { organizationActions } from '../slices/organizationSlices'
import { useSelector, useDispatch } from 'react-redux'
import { useGetFileUploaded } from '../../upload-file/services/getFileUploaded'
import useFileUpload from '../../upload-file/hooks/useFileUpload'
import { useLocation } from 'react-router-dom'

const useOrganizationDetail = ({ mode, setTabIndex }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const selectedRow = useSelector((state) => state.organization?.selectedGroup)

  const [data, setData] = useState(null)
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const setSelectedRow = (param) => {
    dispatch(organizationActions.setSelectedGroup(param))
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const serviceDetail = useServiceOrganizationDetail({
    id: selectedRow?.organization_id,
    config: {
      enabled: false,
    },
  })

  const getDetailFile = useGetFileUploaded({
    url: `/administration/organizations/${selectedRow?.organization_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  const { handleDownload } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/administration/organizations/${selectedRow?.organization_id}/attachment`,
    mode,
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
      serviceDetail.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setData(serviceDetail.data?.data?.data)
  }, [serviceDetail.data, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const isLoading =
    serviceDetail.isFetching ||
    getDetailFile.isFetching ||
    serviceDetail.isLoading ||
    getDetailFile.isLoading

  return {
    data,
    setSelectedRow,
    dataFile,
    isLoading,
    handleDownload,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default useOrganizationDetail
