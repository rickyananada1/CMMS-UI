import { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { woToolsActions } from '../../slices/woToolsSlices'
import { useDownloadTools, useGetTools_ } from '../../services/tools'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDebounce } from 'src/hooks/useDebounce'

const useToolsList = () => {
  const Notification = withReactContent(Swal)

  const tableRefLabor = useRef()
  const tableRefMaterials = useRef()
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const selectedToolsRow = useSelector((state) => state.woTools?.selectedGroup)
  const selectedTaskRow = useSelector((state) => state.woTask?.selectedGroup)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const getTools_ = useGetTools_({
    id: selectedRow?.work_order_id,
  })

  const downloadToolsService = useDownloadTools({
    id: selectedTaskRow?.work_order_task_id,
  })

  const setSelectedToolsRow = (param) => {
    dispatch(woToolsActions.setSelectedGroup(param))
  }

  const downloadTools = async () => {
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
        const column_names = ['task', 'tool', 'description', 'quantity', 'unit_cost', 'line_cost']

        await downloadToolsService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'tools_plan.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Work Order Plan - Tools downloaded successfully.`,
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
    tableRefLabor,
    tableRefMaterials,
    selectedRow,
    selectedToolsRow,
    setSelectedToolsRow,
    selectedTaskRow,
    getTools_,
    downloadTools,
    searchDebounce,
    setSearch,
  }
}

export default useToolsList
