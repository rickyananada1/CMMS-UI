import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDeleteSite } from '../services/deleteSites'
import { useSiteListOptions } from '../services/getSites'
import { useSelector } from 'react-redux'

const useDeleteSites = ({ setVisible, deleteType, tableRef }) => {
  const Notification = withReactContent(Swal)
  const [formValue, setFormValue] = useState({
    site_ids: [],
  })

  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)

  const getListSiteOptions = useSiteListOptions({ id: selectedRow?.security_group_id })

  const deleteSiteService = useDeleteSite()

  const handleDelete = async (values, formikHelpers) => {
    console.log('values', values)
    const newValues = { site_ids: values.site_ids.map((mig) => mig?.value) }

    Notification.fire({
      icon: 'warning',
      html: `Do you want to delete the Sites?`,
      title: 'Are you sure?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSiteService
          .mutateAsync({
            id: selectedRow?.security_group_id,
            data: newValues,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Security Group Site deleted successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              meter_group_id: null,
            })
            tableRef?.current?.update()
            setVisible(false)
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
    formValue,
    handleDelete,
    getListSiteOptions,
    selectedRow,
  }
}

export default useDeleteSites
