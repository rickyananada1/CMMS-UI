import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { woTrackingActions } from '../../../slices/woTrackingSlices'
import { useDebounce } from 'src/hooks/useDebounce'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadWOTracking } from '../services'
import { woToolsActions } from '../../plans/pages/labor-materials-tools/slices/woToolsSlices'
import { woMaterialsActions } from '../../plans/pages/labor-materials-tools/slices/woMaterialsSlices'
import { woLaborActions } from '../../plans/pages/labor-materials-tools/slices/woLaborSlices'
import { woTaskActions as planTaskActions } from '../../plans/pages/task-for-wo/slices/woTaskSlices'
import { woTaskActions as actualsTaskActions } from '../../actuals/pages/task-for-wo/slices/woTaskSlices'
import { woChildernActions as plansChildrenActions } from '../../plans/pages/childern-of-wo/slices/woChildernSlices'
import { woChildernActions as actualsChildrenActions } from '../../actuals/pages/childern-of-wo/slices/woChildernSlices'

const useList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)

  const downloadWOTrackingService = useDownloadWOTracking({})

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(woTrackingActions.setSelectedWorkOrder(param))
    dispatch(woTrackingActions.setSelectedAppIndex(1))
  }

  const resetSelectedTaskEtc = () => {
    dispatch(woTrackingActions.setSelectedPlanTab(0))
    dispatch(woTrackingActions.setSelectedActualTab(0))
    dispatch(planTaskActions.resetState())
    dispatch(actualsTaskActions.resetState())
    dispatch(plansChildrenActions.resetState())
    dispatch(actualsChildrenActions.resetState())
    dispatch(woLaborActions.resetState())
    dispatch(woMaterialsActions.resetState())
    dispatch(woToolsActions.resetState())
  }

  const downloadWOTracking = async () => {
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
          'location',
          'location_description',
          'work_type',
          'assign_person',
          'asset_num',
          'asset_desc',
          'status',
          'failure_code',
          'scheduled_start',
          'scheduled_finish',
          'work_priority',
          'site',
          'site_desc',
        ]

        await downloadWOTrackingService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'wo_tracking.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `WO Tracking downloaded successfully.`,
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
    setSearch,
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadWOTracking,
    resetSelectedTaskEtc,
  }
}

export default useList
