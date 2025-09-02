import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { jobPlanActions } from 'src/views/pages/job-plan/slices/jobPlanSlices'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadJobPlan } from '../services'

const useJobPlanList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.jobPlan?.selectedJobPlan)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const downloadJobPlanService = useDownloadJobPlan({})

  const setSelectedRow = (param) => {
    dispatch(jobPlanActions.setSelectedJobPlan(param))
    dispatch(jobPlanActions.setSelectedAppIndex(1))
  }

  const downloadJobPlan = async () => {
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
        const column_names = ['job_plan', 'plan_description', 'status', 'organization', 'site']

        const storedParams = localStorage.getItem('tableParams-default')
        const params = storedParams ? JSON.parse(storedParams) : { query: {} }

        await downloadJobPlanService
          .mutateAsync({
            data: {
              column_names,
            },
            params: params?.query,
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'job_plan.csv',
            })
          })
          .finally(() => {})
      }
    })
  }

  return {
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadJobPlan,
  }
}

export default useJobPlanList
