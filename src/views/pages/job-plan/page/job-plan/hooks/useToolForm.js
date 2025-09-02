import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation as useLocationRouter } from 'react-router-dom'
import {
  useCreateTool,
  useGetDetailJobPlanTool,
  useGetJobPlanTaksDropdown,
  useUpdateTool,
} from '../services'
import { getTableLastCurrentParams } from 'src/utils/base'
import { jobPlanActions } from '../../../slices/jobPlanSlices'

const useToolForm = ({ mode, setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const location = useLocationRouter()
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.jobPlan?.selectedJobPlan)
  const selectedToolRow = useSelector((state) => state.jobPlan?.selectedTool)

  const [formValue, setFormValue] = useState({
    tool: [
      {
        work_order_task_id: null,
        tool: null,
        description: '',
        quantity: '',
        unit_cost: '',
        line_cost: '',
      },
    ],
  })

  const getWoTaskDropdown = useGetJobPlanTaksDropdown()

  const createTool = useCreateTool()
  const updateTool = useUpdateTool()

  const paramsFromStorage = getTableLastCurrentParams(location.pathname, 'jobplan-tool')
  const currentPage = paramsFromStorage.currentPage

  const getJobPlanToolDetail = useGetDetailJobPlanTool({
    id: selectedRow?.job_plan_id,
    params: {
      page: currentPage,
      limit: 10,
    },
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'CreateTool') getJobPlanToolDetail.refetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'CreateTool') return

    const dataTool = getJobPlanToolDetail.data?.data?.data
    const result = dataTool?.find(
      (tool) => tool.work_order_tool_id === selectedToolRow?.work_order_tool_id,
    )

    setFormValue((prev) => ({
      ...prev,
      tool: [
        {
          work_order_task_id: {
            value: result?.work_order_task_id,
            label: result?.task,
          },
          work_order_tool_id: result?.work_order_tool_id,
          tool: result?.tool,
          description: result?.description,
          quantity: result?.quantity,
          unit_cost: result?.unit_cost,
          line_cost: result?.line_cost,
        },
      ],
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getJobPlanToolDetail.data, mode])

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newValues = values.tool.map((res) => {
          const baseObject = {
            work_order_task_id: res.work_order_task_id.value,
            tool: res.tool,
            description: res.description,
            quantity: Number(res.quantity),
            unit_cost: Number(String(res?.unit_cost ?? '0').replace(/,/g, '.')),
            line_cost: Number(String(res?.line_cost ?? '0').replace(/,/g, '.')),
          }

          if (mode === 'UpdateTool') {
            return {
              ...baseObject,
              work_order_tool_id: res.work_order_tool_id,
            }
          }

          return baseObject
        })

        if (mode === 'CreateTool') {
          await createTool
            .mutateAsync({
              id: selectedRow?.job_plan_id,
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Create Tool successfully',
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                setTabIndex(1)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err.response.data.message,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              })
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
        if (mode === 'UpdateTool') {
          const newToolName = newValues[0]?.tool

          await updateTool
            .mutateAsync({
              id: selectedRow?.job_plan_id,
              idTask: null,
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update Tool successfully',
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                dispatch(jobPlanActions.setUpdateTool(newToolName))
                setTabIndex(1)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err.response.data.message,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              })
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
      }
    })
  }

  const isDisabled = getJobPlanToolDetail.isLoading || getJobPlanToolDetail.isFetching

  return {
    isDisabled,
    formValue,
    handleSubmit,
    selectedRow,
    getWoTaskDropdown,
  }
}

export default useToolForm
