import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useCreateLabor,
  useGetCompeniesDropdown,
  useGetDetailJobPlanLabor,
  useGetJobPlanTaksDropdown,
  useUpdateLabor,
} from '../services'
import { useLocation as useLocationRouter } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { getTableLastCurrentParams } from 'src/utils/base'
import { jobPlanActions } from '../../../slices/jobPlanSlices'

const useLaborForm = ({ mode, setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const location = useLocationRouter()
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.jobPlan?.selectedJobPlan)
  const selectedLaborRow = useSelector((state) => state.jobPlan?.selectedLabor)

  const [formValue, setFormValue] = useState({
    labor: [
      {
        work_order_task_id: null,
        craft: '',
        skill_level: null,
        vendor: null,
        quantity: '',
        labor: null,
        regular_hours: '',
        rate: '',
      },
    ],
  })

  const optionsSkillLevel = [
    { label: 'FIRSTCLASS', value: 'FIRSTCLASS' },
    { label: 'SECONDCLASS', value: 'SECONDCLASS' },
    { label: 'APPRENTICE', value: 'APPRENTICE' },
  ]

  const getCompeniesDropdown = useGetCompeniesDropdown()
  const getWoTaskDropdown = useGetJobPlanTaksDropdown()

  const createLabor = useCreateLabor()
  const updateLabor = useUpdateLabor()

  const paramsFromStorage = getTableLastCurrentParams(location.pathname, 'jobplan-labor')
  const currentPage = paramsFromStorage.currentPage

  const getJobPlanLaborDetail = useGetDetailJobPlanLabor({
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
    if (mode !== 'CreateLabor') getJobPlanLaborDetail.refetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'CreateLabor') return

    const dataLabor = getJobPlanLaborDetail?.data?.data?.data

    const result = dataLabor?.find(
      (labor) => labor.work_order_labor_id === selectedLaborRow?.work_order_labor_id,
    )

    setFormValue((prev) => ({
      ...prev,
      labor: [
        {
          work_order_task_id: {
            value: result?.work_order_task_id,
            label: result?.task,
          },
          work_order_labor_id: result?.work_order_labor_id,
          craft: result?.name,
          skill_level: {
            value: result?.skill_level,
            label: result?.skill_level,
          },
          vendor: result?.vendor,
          quantity: result?.quantity,
          labor: result?.labor,
          regular_hours: result?.regular_hours,
          rate: result?.rate,
        },
      ],
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getJobPlanLaborDetail.data, mode])

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
        const newValues = values.labor.map((res) => {
          const baseObject = {
            work_order_task_id: res.work_order_task_id?.value,
            craft: res.craft,
            skill_level: res.skill_level?.value,
            vendor: res.vendor,
            quantity: Number(res.quantity),
            labor: res.labor,
            regular_hours: Number(res.regular_hours),
            rate: Number(res.rate),
            line_cost: Number(
              ((+res?.quantity || 0) * (+res?.rate || 1) * (+res?.regular_hours || 0)).toFixed(2),
            ),
          }

          if (mode === 'UpdateLabor') {
            return {
              ...baseObject,
              work_order_labor_id: res.work_order_labor_id,
            }
          }

          return baseObject
        })

        if (mode === 'CreateLabor') {
          await createLabor
            .mutateAsync({
              id: selectedRow?.job_plan_id,
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Create Labor successfully',
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
                text: err.response?.data?.error,
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
        if (mode === 'UpdateLabor') {
          const newLaborName = newValues[0]?.labor

          await updateLabor
            .mutateAsync({
              id: selectedRow?.job_plan_id,
              idTask: null,
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update Labor Successfully',
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                dispatch(jobPlanActions.setUpdateLabor(newLaborName))
                setTabIndex(1)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err.response.data.error,
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

  const isDisabled = getJobPlanLaborDetail.isLoading || getJobPlanLaborDetail.isFetching

  return {
    isDisabled,
    formValue,
    selectedRow,
    handleSubmit,
    getCompeniesDropdown,
    getWoTaskDropdown,
    optionsSkillLevel,
  }
}

export default useLaborForm
