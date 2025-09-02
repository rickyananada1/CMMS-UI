import { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDeletePreventiveMaintenance, useGetPreventiveMaintenanceDropdown } from '../services'
import { preventiveMaintenanceActions } from '../../../slices/preventiveMaintenanceSlices'
import { useDispatch } from 'react-redux'

const usePreventiveMaintenanceDelete = ({ tableRef, setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const [textFields, setTextFields] = useState({
    preventive_maintenance_id: null,
  })

  const getPreventiveMaintenanceListService = useGetPreventiveMaintenanceDropdown({})

  const deletePreventiveMaintenance = useDeletePreventiveMaintenance({
    id: textFields?.preventive_maintenance_id?.value,
  })

  const handleDeletePreventiveMaintenance = async (values) => {
    setIsLoading(true)
    await deletePreventiveMaintenance
      .mutateAsync({
        id: values?.preventive_maintenance_id?.value,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Preventive Maintenance deleted successfully.`,
          }).then(() => {
            setTextFields({
              preventive_maintenance_id: null,
            })
            dispatch(preventiveMaintenanceActions.setSelectedPreventiveMaintenance(null))
            tableRef?.current?.update()
            setAction('Read')
          })
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `${err?.response?.data?.message}.`,
        }).then(() => {
          setAction('Read')
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    textFields,
    isLoading,
    errorMessage,
    handleDeletePreventiveMaintenance,
    getPreventiveMaintenanceListService,
  }
}

export default usePreventiveMaintenanceDelete
