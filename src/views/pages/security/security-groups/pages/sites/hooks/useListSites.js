import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { securityGroupActions } from '../../../slices/securityGroupSlices'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDeleteSite } from '../services/deleteSites'
import { useDownloadSites } from '../services/downloadSites'
import { downloadFileContentDisposition } from 'src/utils/helper'

const useListSites = () => {
  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)

  const Notification = withReactContent(Swal)
  const [formValue, setFormValue] = useState({
    site_ids: [],
  })

  const setSelectedRow = (param) => {
    dispatch(securityGroupActions.setSelectedGroup(param))
  }

  const handleChangeSiteIds = (selectedValues) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      site_ids: selectedValues,
    }))
  }

  useEffect(() => {
    tableRef?.current?.setPage(1)
  }, [selectedRow])

  const deleteSite = useDeleteSite({
    id: selectedRow?.security_group_id,
  })

  const downloadSitesService = useDownloadSites({
    id: selectedRow?.security_group_id,
  })

  const downloadSites = async () => {
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
        const column_names = ['site', 'site_description', 'is_active', 'is_authorized']

        await downloadSitesService
          .mutateAsync({
            id: selectedRow?.security_group_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'security_groups_sites.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Sites downloaded successfully.`,
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

  const handleDelete = async (values, formikHelpers, setVisible) => {
    Notification.fire({
      icon: 'warning',
      text: 'Are you sure to delete ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newValues = values.site_ids.map((item) => item.value)
        await deleteSite
          .mutateAsync({
            data: {
              site_ids: newValues,
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: res.data.message,
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              site_ids: [],
            })
            setVisible(false)
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err.response.data.message,
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
    selectedRow,
    setSelectedRow,
    handleChangeSiteIds,
    handleDelete,
    downloadSites,
    tableRef,
  }
}

export default useListSites
