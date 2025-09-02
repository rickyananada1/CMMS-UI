import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useDeleteAssetsSafetyRelatedAssets,
  useGetAssetsSafetyRelatedAssetsList,
} from '../services'
import { useSelector } from 'react-redux'

const useAssetsSafetyRelatedAssetsDelete = ({
  setAction,
  setTabIndex,
  setVisible,
  setIsRefetchList,
}) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const [formValue, setFormValue] = useState({
    safety_related_asset_ids: [],
  })

  const listSafetyRelatedAssets = useGetAssetsSafetyRelatedAssetsList({
    id: selectedRow?.asset_id,
  })

  const deleteAssetsSafetyRelatedAssetsService = useDeleteAssetsSafetyRelatedAssets({
    id: selectedRow?.asset_id,
  })

  const handleDelete = async (values, formikHelpers) => {
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
        let safety_related_asset_ids = []

        if (
          Array.isArray(values?.safety_related_asset_ids) &&
          values?.safety_related_asset_ids?.length
        ) {
          values?.safety_related_asset_ids.forEach((item) =>
            safety_related_asset_ids.push(item?.value),
          )
        }

        await deleteAssetsSafetyRelatedAssetsService
          .mutateAsync({
            data: {
              site: selectedRow?.site_id,
              safety_related_asset_ids,
            },
          })
          .then(() => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Safety - Related Assets deleted successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              safety_related_asset_ids: [],
            })
            setTabIndex(3)
            setAction('Read')
            setVisible(false)
            setIsRefetchList(true)
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
    selectedRow,
    handleDelete,
    listSafetyRelatedAssets,
  }
}

export default useAssetsSafetyRelatedAssetsDelete
