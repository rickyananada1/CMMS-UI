import { useEffect, useRef, useState } from 'react'
import {
  useCreateWOManual,
  useGetFrequencySeasonalDetail,
  useResetFrequencySeasonal,
} from '../services'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDebounce } from 'src/hooks/useDebounce'
import { preventiveMaintenanceActions } from '../../../slices/preventiveMaintenanceSlices'

const useFrequencySeasonalList = ({ mode, setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const Notification = withReactContent(Swal)
  const tableRef = useRef(null)
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const location = useLocation()

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const selectedRow = useSelector(
    (state) => state.preventiveMaintenances?.selectedPreventiveMaintenance,
  )

  const createWOManualService = useCreateWOManual()
  const frequencySeasonalResetService = useResetFrequencySeasonal()
  const getFrequencySeasonalDetail = useGetFrequencySeasonalDetail()

  const getFrequencySeasonal = async (params) => {
    setIsLoading(true)
    await getFrequencySeasonalDetail
      .mutateAsync({
        id: selectedRow?.preventive_maintenance_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data)
          dispatch(preventiveMaintenanceActions.setSelectedFrequencySeasonal(res.data.data))
        }
      })
      .catch((err) => {
        setTabIndex(0)
        setAction('Read')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const resetFrequencySeasonal = async () => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to reset frequency & seasonal ${selectedRow.preventive_maintenance_name}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await frequencySeasonalResetService
          .mutateAsync({
            id: selectedRow.preventive_maintenance_id,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `Frequency & seasonal ${selectedRow.preventive_maintenance_name} reset successfully`,
            }).then(() => {
              setTabIndex(2)
              setAction('Read')
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Error!',
              text: err.response.data.message,
            })
            setErrorMessage(err.response.data.message)
          })
      } else {
        setAction('Read')
      }
    })
  }

  const createWOManual = () => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want create WO manual?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createWOManualService
          .mutateAsync({
            id: selectedRow.preventive_maintenance_id,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: res.data.message,
            }).then(() => {
              tableRef.current?.update()
              setTabIndex(2)
              setAction('Read')
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Error!',
              text: err.response.data.message,
            })
            setErrorMessage(err.response.data.message)
          })
      } else {
        setAction('Read')
      }
    })
  }

  useEffect(() => {
    getFrequencySeasonal()
    mode === 'Delete' && resetFrequencySeasonal()
    mode === 'Create PM WO' && createWOManual()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  return {
    tableRef,
    data,
    isLoading,
    errorMessage,
    setSearch,
    searchDebounce,
    selectedRow,
  }
}

export default useFrequencySeasonalList
