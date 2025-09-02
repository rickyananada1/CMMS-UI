import { useState, useRef } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSetLocationParent } from '../services'
import { useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'

const useChooseParentLocation = ({
  setAction,
  setTabIndex,
  setVisiblePopUpLocationParent,
  setIsRefetchDetailLocation,
}) => {
  const Notification = withReactContent(Swal)
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)

  const [formValue, setFormValue] = useState({
    parent_id: null,
  })

  const setLocationParentService = useSetLocationParent({ id: selectedRow?.location_id })

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = async (values, formikHelpers) => {
    const textNotification = selectedRow?.parent_id
      ? '<span>You will change Parent for This Location. <span><br /> <span>Are you sure to submit? </span>'
      : '<span>Are you sure to submit ?</span>'

    Notification.fire({
      icon: 'info',
      html: textNotification,
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        formikHelpers.setSubmitting(true)
        await setLocationParentService
          .mutateAsync({
            id: selectedRow.location_id,
            data: {
              parent_id: +values?.parent_id?.location_id,
              location_id: selectedRow?.location_id,
              update_type: 'add-parent',
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Set Parent Location successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              parent_id: null,
            })
            setTabIndex(1)
            setAction('Read')
            setVisiblePopUpLocationParent(false)
            setIsRefetchDetailLocation(true)
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
          .finally(() => {
            formikHelpers.setSubmitting(false)
          })
      }
    })
  }

  return {
    tableRef,
    selectedRow,
    formValue,
    searchDebounce,
    handleSearch,
    handleSubmit,
  }
}

export default useChooseParentLocation
