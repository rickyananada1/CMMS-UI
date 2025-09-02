import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation as useLocationRouter } from 'react-router-dom'
import {
  useCreateMaterial,
  useGetDetailJobPlanMaterial,
  useGetJobPlanTaksDropdown,
  useGetSpareparts,
  useUpdateMaterial,
} from '../services'
import { getTableLastCurrentParams } from 'src/utils/base'

const useMaterialForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const location = useLocationRouter()

  const selectedRow = useSelector((state) => state.jobPlan?.selectedJobPlan)
  const selectedMaterialRow = useSelector((state) => state.jobPlan?.selectedMaterial)

  const [formValue, setFormValue] = useState({
    material: [
      {
        work_order_task_id: null,
        sparepart_id: null,
        description: '',
        quantity: '',
        issue_unit: '',
        unit_cost: '',
        store_room: null,
      },
    ],
  })

  const getSparepartsService = useGetSpareparts()
  const getWoTaskDropdown = useGetJobPlanTaksDropdown()

  const createMaterial = useCreateMaterial()
  const updateMaterial = useUpdateMaterial()

  const paramsFromStorage = getTableLastCurrentParams(location.pathname, 'jobplan-material')
  const currentPage = paramsFromStorage.currentPage

  const getJobPlanMaterialDetail = useGetDetailJobPlanMaterial({
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
    if (mode !== 'CreateMaterial') getJobPlanMaterialDetail.refetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode === 'CreateMaterial') return

    const dataMaterial = getJobPlanMaterialDetail.data?.data?.data
    const result = dataMaterial?.find(
      (material) => material.work_order_material_id === selectedMaterialRow?.work_order_material_id,
    )

    setFormValue((prev) => ({
      ...prev,
      material: [
        {
          work_order_task_id: {
            value: result?.work_order_task_id,
            label: result?.task,
          },
          work_order_material_id: result?.work_order_material_id,
          sparepart_id: {
            value: result?.sparepart_id,
            label: result?.item,
          },
          description: result?.description,
          quantity: result?.quantity,
          issue_unit: result?.issue_unit,
          unit_cost: result?.unit_cost,
          store_room: result?.store_room,
        },
      ],
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getJobPlanMaterialDetail.data, mode])

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
        const newValues = values.material.map((res) => {
          const baseObject = {
            work_order_task_id: res.work_order_task_id?.value,
            sparepart_id: res.sparepart_id?.value,
            description: res.sparepart_id?.description,
            quantity: Number(res.quantity),
            issue_unit: res.issue_unit,
            unit_cost: Number(res.unit_cost),
            line_cost: Number(((+res?.quantity || 0) * (+res?.unit_cost || 0)).toFixed(2)),
            store_room: res.store_room,
          }

          if (mode === 'UpdateMaterial') {
            return {
              ...baseObject,
              work_order_material_id: res.work_order_material_id,
            }
          }

          return baseObject
        })

        if (mode === 'CreateMaterial') {
          await createMaterial
            .mutateAsync({
              id: selectedRow?.job_plan_id,
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Create Material successfully',
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
        if (mode === 'UpdateMaterial') {
          await updateMaterial
            .mutateAsync({
              id: selectedRow?.job_plan_id,
              idTask: null,
              data: newValues,
            })
            .then(() => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update Material Successfully',
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
      }
    })
  }

  const isDisabled = getJobPlanMaterialDetail.isLoading || getJobPlanMaterialDetail.isFetching

  return {
    isDisabled,
    formValue,
    selectedRow,
    handleSubmit,
    getWoTaskDropdown,
    getSparepartsService,
  }
}

export default useMaterialForm
