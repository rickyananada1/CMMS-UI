import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { preventiveMaintenanceActions } from '../../../slices/preventiveMaintenanceSlices'
import { useDownloadPreventiveMaintenances } from '../services'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { downloadFileContentDisposition } from 'src/utils/helper'

const usePreventiveMaintenanceList = () => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector(
    (state) => state.preventiveMaintenances?.selectedPreventiveMaintenance,
  )

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadPreventiveMaintenancesService = useDownloadPreventiveMaintenances({})

  const setSelectedRow = (param) => {
    dispatch(preventiveMaintenanceActions.setSelectedPreventiveMaintenance(param))
    dispatch(preventiveMaintenanceActions.setSelectedAppIndex(1))
  }

  const downloadPreventiveMaintenances = async () => {
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
          'preventive_maintenance_name',
          'preventive_maintenance_description',
          'work_type',
          'work_order_status',
          'status',
          'organization_name',
          'site',
        ]

        await downloadPreventiveMaintenancesService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'preventive-maintenances.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Preventive Maintenances downloaded successfully.`,
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
    setSelectedRow,
    setSearch,
    searchDebounce,
    downloadPreventiveMaintenances,
  }
}

export default usePreventiveMaintenanceList
