import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { assetActions } from '../../../slices/assetSlices'
import { woTrackingActions } from 'src/views/pages/work-order/work-order-tracking/slices/woTrackingSlices'
import { useDebounce } from 'src/hooks/useDebounce'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadAssetsWork } from '../services'
import { appActions, breadcrumbActions } from 'src/store/actions'

const useAssetsWorkList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const permissionsState = useSelector((state) => state.auth.permissions)
  const workOrderPermission = permissionsState.find((item) => item.modul_name === 'Work Order')
  const workOrderApplication = workOrderPermission.applications.find(
    (item) => item.application_group === 'Work Order',
  )
  const workOrderReadPermission = workOrderApplication.permission.find(
    (item) => item.permission_name === 'Work Order Tracking Read',
  )

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadAssetsWorkService = useDownloadAssetsWork({
    id: selectedRow?.asset_id,
  })

  const handleRangeChange = (dates) => {
    setDateRange(dates)
  }

  const clearDates = () => {
    setDateRange([null, null])
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(assetActions.setSelectedAsset(param))
  }

  const handleNavigateToWorkOrder = (e, selectedData) => {
    e.stopPropagation()
    dispatch(appActions.setApplications(workOrderPermission.applications))
    dispatch(appActions.setSelectedApplications(workOrderPermission))

    dispatch(
      breadcrumbActions.setBreadcrumb([
        {
          name: workOrderApplication?.application_group,
        },
        {
          name: workOrderReadPermission?.app_name,
          link: workOrderReadPermission?.app_menu_link,
        },
      ]),
    )

    dispatch(woTrackingActions.setSelectedWorkOrder(selectedData))
    dispatch(
      woTrackingActions.setSelectedAppIndexAndAction({
        index: 1,
        action: 'Read',
      }),
    )
  }

  const downloadAssetsWork = async () => {
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
          'work_order_code',
          'description',
          'status',
          'status_date',
          'scheduled_start',
          'scheduled_finish',
          'actual_start',
          'actual_finish',
        ]

        await downloadAssetsWorkService
          .mutateAsync({
            id: selectedRow?.asset_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'assets_work.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Assets Work downloaded successfully.`,
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
    selectedRow,
    tableRef,
    searchDebounce,
    setSearch,
    setSelectedRow,
    handleSearch,
    handleNavigateToWorkOrder,
    downloadAssetsWork,
    startDate,
    endDate,
    handleRangeChange,
    clearDates,
  }
}

export default useAssetsWorkList
