import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  useDownloadJobPlanLabor,
  useDownloadJobPlanMaterial,
  useDownloadJobPlanTask,
  useDownloadJobPlanTool,
  useGetDetailJobPlan,
} from '../services'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDebounce } from 'src/hooks/useDebounce'
import { jobPlanActions } from '../../../slices/jobPlanSlices'
import { downloadFileContentDisposition } from 'src/utils/helper'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'

const useJobPlanDetail = ({ mode, setTabIndex }) => {
  const location = useLocation()
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()

  const selectedRow = useSelector((state) => state.jobPlan?.selectedJobPlan)
  const selectedTaskRow = useSelector((state) => state.jobPlan?.selectedTask)
  const selectedLaborRow = useSelector((state) => state.jobPlan?.selectedLabor)
  const selectedMaterialRow = useSelector((state) => state.jobPlan?.selectedMaterial)
  const selectedToolRow = useSelector((state) => state.jobPlan?.selectedTool)

  const setSelectedTaskRow = (param) => {
    dispatch(jobPlanActions.setSelectedTask(param))
  }
  const setSelectedLaborRow = (param) => {
    dispatch(jobPlanActions.setSelectedLabor(param))
  }
  const setSelectedMaterialRow = (param) => {
    dispatch(jobPlanActions.setSelectedMaterial(param))
  }
  const setSelectedToolRow = (param) => {
    dispatch(jobPlanActions.setSelectedTool(param))
  }

  const tableRefTask = useRef()
  const tableRefLabor = useRef()
  const tableRefMaterial = useRef()
  const tableRefTools = useRef()

  const [searchTask, setSearchTask] = useState('')
  const [searchLabor, setSearchLabor] = useState('')
  const [searchMaterial, setSearchMaterial] = useState('')
  const [searchTool, setSearchTool] = useState('')
  const [data, setData] = useState('')
  const [dataFile, setDataFile] = useState([])
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const searchTaskDebounce = useDebounce(searchTask, 400)
  const searchLaborDebounce = useDebounce(searchLabor, 400)
  const searchMaterialDebounce = useDebounce(searchMaterial, 400)
  const searchToolDebounce = useDebounce(searchTool, 400)

  const handleSearchTask = (event) => {
    setSearchTask(event.target.value)
  }
  const handleSearchLabor = (event) => {
    setSearchLabor(event.target.value)
  }
  const handleSearchMaterial = (event) => {
    setSearchMaterial(event.target.value)
  }
  const handleSearchTool = (event) => {
    setSearchTool(event.target.value)
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const getJobPlanDetail = useGetDetailJobPlan({
    id: selectedRow?.job_plan_id,
    config: {
      enabled: false,
    },
  })

  const getDetailFile = useGetFileUploaded({
    url: `/planning/job-planning/${selectedRow?.job_plan_id}/attachment`,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
      getJobPlanDetail.refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setData(getJobPlanDetail.data?.data?.data)
  }, [getJobPlanDetail.data, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const isLoading =
    getJobPlanDetail.isFetching ||
    getDetailFile.isLoading ||
    getJobPlanDetail.isLoading ||
    getDetailFile.isLoading

  const downloadJobPlanTaskService = useDownloadJobPlanTask()
  const downloadJobPlanLaborService = useDownloadJobPlanLabor()
  const downloadJobPlanMaterialService = useDownloadJobPlanMaterial()
  const downloadJobPlanToolService = useDownloadJobPlanTool()

  const { handleDownload } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: `/planning/job-planning/${selectedRow?.job_plan_id}/attachment`,
    mode,
  })

  const downloadJobPlanTask = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to download ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const column_names = ['sequence', 'task', 'summary', 'estimated_duration', 'status']

        const storedParams = localStorage.getItem('tableParams-jobplan-task')
        const params = storedParams ? JSON.parse(storedParams) : { query: {} }

        await downloadJobPlanTaskService
          .mutateAsync({
            id: selectedRow?.job_plan_id,
            data: {
              column_names,
            },
            params: params?.query,
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'job_plan_task.csv',
            })
          })
          .finally(() => {})
      }
    })
  }

  const downloadJobPlanLabor = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to download ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const column_names = [
          'task',
          'labor',
          'name',
          'start_date',
          'start_time',
          'end_time',
          'end_time',
          'regular_hours',
          'rate',
        ]

        const storedParams = localStorage.getItem('tableParams-jobplan-labor')
        const params = storedParams ? JSON.parse(storedParams) : { query: {} }

        await downloadJobPlanLaborService
          .mutateAsync({
            id: selectedRow?.job_plan_id,
            data: {
              column_names,
            },
            params: params?.query,
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'job_plan_labor.csv',
            })
          })
          .finally(() => {})
      }
    })
  }

  const downloadJobPlanMaterial = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to download ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const column_names = ['task', 'item', 'description', 'store_room', 'quantity']

        const storedParams = localStorage.getItem('tableParams-jobplan-material')
        const params = storedParams ? JSON.parse(storedParams) : { query: {} }

        await downloadJobPlanMaterialService
          .mutateAsync({
            id: selectedRow?.job_plan_id,
            data: {
              column_names,
            },
            params: params?.query,
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'job_plan_material.csv',
            })
          })
          .finally(() => {})
      }
    })
  }

  const downloadJobPlanTool = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to download ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const column_names = [
          'task',
          'tool',
          'description',
          'quantity',
          'total_hours',
          'rate',
          'line_cost',
          'location',
        ]

        const storedParams = localStorage.getItem('tableParams-jobplan-tool')
        const params = storedParams ? JSON.parse(storedParams) : { query: {} }

        await downloadJobPlanToolService
          .mutateAsync({
            id: selectedRow?.job_plan_id,
            data: {
              column_names,
            },
            params: params?.query,
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'job_plan_tool.csv',
            })
          })
          .finally(() => {})
      }
    })
  }

  // const data = getJobPlanDetail.data?.data?.data
  // const isLoading = getJobPlanDetail.isLoading

  return {
    data,
    dataFile,
    isLoading,
    selectedRow,
    tableRefTask,
    tableRefLabor,
    tableRefMaterial,
    tableRefTools,
    handleDownload,
    handleSearchTask,
    handleSearchLabor,
    handleSearchMaterial,
    handleSearchTool,
    searchTaskDebounce,
    searchLaborDebounce,
    searchMaterialDebounce,
    searchToolDebounce,
    selectedTaskRow,
    selectedLaborRow,
    selectedMaterialRow,
    selectedToolRow,
    setSelectedLaborRow,
    setSelectedTaskRow,
    setSelectedToolRow,
    setSelectedMaterialRow,
    downloadJobPlanTask,
    downloadJobPlanLabor,
    downloadJobPlanMaterial,
    downloadJobPlanTool,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  }
}

export default useJobPlanDetail
