import { useRef, useState } from 'react'
import { useDownloadChildren, useGetChildOfWorkOrder_ } from '../services'
import { useDispatch, useSelector } from 'react-redux'
import { woChildernActions } from '../slices/woChildernSlices'
import { downloadFileContentDisposition } from 'src/utils/helper'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDebounce } from 'src/hooks/useDebounce'

const useChildOfWorkOrderList = () => {
  const Notification = withReactContent(Swal)

  const tableRef = useRef()
  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const selectedChildernRow = useSelector((state) => state.woChildern?.selectedGroup)
  const getChildOfWorkOrder_ = useGetChildOfWorkOrder_({
    id: selectedRow?.work_order_id,
  })
  const setSelectedChildernRow = (param) => {
    dispatch(woChildernActions.setSelectedGroup(param))
  }

  const downloadChildrenService = useDownloadChildren({
    id: selectedRow?.work_order_id,
  })

  const downloadChildren = async () => {
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
          'sequence',
          'record',
          'classification',
          'summary',
          'location',
          'asset',
          'status',
        ]

        await downloadChildrenService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'children_actuals.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Work Order Actuals - Children downloaded successfully.`,
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
    getChildOfWorkOrder_,
    selectedRow,
    selectedChildernRow,
    setSelectedChildernRow,
    downloadChildren,
    setSearch,
    searchDebounce,
  }
}

export default useChildOfWorkOrderList
