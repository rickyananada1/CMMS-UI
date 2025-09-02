import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { useDownloadMaterials, useGetMaterials_ } from '../../services/materials'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { woMaterialsActions } from '../../../../../plans/pages/labor-materials-tools/slices/woMaterialsSlices'
import { useDebounce } from 'src/hooks/useDebounce'

const useMaterialsList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const selectedMaterialsRow = useSelector((state) => state.woMaterials?.selectedGroup)
  const selectedTaskRow = useSelector((state) => state.woTask?.selectedGroup)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const getMaterials_ = useGetMaterials_({
    id: selectedRow?.work_order_id,
  })

  const downloadMaterialsService = useDownloadMaterials({
    id: selectedTaskRow?.work_order_task_id,
  })

  const setSelectedMaterialsRow = (param) => {
    dispatch(woMaterialsActions.setSelectedGroup(param))
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
          'spare_part',
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
              fileName: 'materials_actuals.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Work Order Actuals - Materials downloaded successfully.`,
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
    getMaterials_,
    downloadMaterials,
    setSearch,
    searchDebounce,
  }
}

export default useMaterialsList
