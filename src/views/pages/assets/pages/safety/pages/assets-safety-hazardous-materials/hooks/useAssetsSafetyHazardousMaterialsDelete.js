import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useDeleteAssetsSafetyHazardousMaterials,
  useGetAssetsSafetyHazardousMaterialsList,
} from '../services'
import { useSelector } from 'react-redux'

const useAssetsSafetyHazardousMaterialsDelete = ({
  setAction,
  setTabIndex,
  setVisible,
  setIsRefetchList,
}) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const [formValue, setFormValue] = useState({
    safety_lexicon_ids: [],
  })

  const listHazardAndPrecautionService = useGetAssetsSafetyHazardousMaterialsList({
    id: selectedRow?.asset_id,
  })

  const deleteAssetsSafetyHazardousMaterialsService = useDeleteAssetsSafetyHazardousMaterials({
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
        let safety_lexicon_ids = []

        if (Array.isArray(values?.safety_lexicon_ids) && values?.safety_lexicon_ids?.length) {
          values?.safety_lexicon_ids.forEach((item) => safety_lexicon_ids.push(item?.value))
        }

        await deleteAssetsSafetyHazardousMaterialsService
          .mutateAsync({
            data: {
              safety_lexicon_ids,
            },
          })
          .then(() => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Hazardous Materials deleted successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setFormValue({
              safety_lexicon_ids: [],
            })
            setTabIndex(1)
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
    listHazardAndPrecautionService,
  }
}

export default useAssetsSafetyHazardousMaterialsDelete
