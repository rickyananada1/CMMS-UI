import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDebounce } from 'src/hooks/useDebounce'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'
import { useDownloadMaterials } from '../services'

const useMaterialsList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedMaterialsRow = useSelector((state) => state.quickReporting?.selectedMaterial)
  const selectedTaskRow = useSelector((state) => state.quickReporting?.selectedTask)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadMaterialsService = useDownloadMaterials({
    id: selectedTaskRow?.work_order_task_id,
  })

  const setSelectedMaterialsRow = (param) => {
    dispatch(quickReportingActions.setSelectedMaterial(param))
  }

  const downloadMaterials = async () => {
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
          'sparepart',
          'description',
          'quantity',
          'issue_unit',
          'unit_cost',
          'line_cost',
          'store_room',
        ]

        await downloadMaterialsService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'quick_reporting_materials.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Quick Reporting - Materials downloaded successfully.`,
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err?.response?.data?.message,
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
          })
      }
    })
  }

  return {
    tableRef,
    selectedRow,
    selectedMaterialsRow,
    setSelectedMaterialsRow,
    selectedTaskRow,
    downloadMaterials,
    searchDebounce,
    setSearch,
  }
}

export default useMaterialsList
