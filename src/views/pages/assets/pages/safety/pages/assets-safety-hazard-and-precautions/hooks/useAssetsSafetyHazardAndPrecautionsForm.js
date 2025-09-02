import { useState, useEffect } from 'react'
import {
  useGetAssetsSafetyPrecautions,
  useCreateAssetsSafetyHazardAndPrecautions,
  useUpdateAssetsSafetyHazardAndPrecautions,
  useGetDetailAssetsSafetyHazardAndPrecautions,
} from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useAssetsSafetyHazardAndPrecautionsForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedSafetyRow = useSelector((state) => state.assetsSafety?.selectedSafety)

  const getAssetsSafetyHazards = useGetAssetsSafetyPrecautions()

  const [formValue, setFormValue] = useState({
    hazard_and_precautions: [
      {
        hazard: {
          value: '',
          label: '',
          hazard: {
            hazmate_enabled: false,
            hazard_type: '',
          },
        },
      },
    ],
  })

  const createAssetsSafetyHazardAndPrecautions = useCreateAssetsSafetyHazardAndPrecautions({
    id: selectedRow?.asset_id,
  })

  const getDetailAssetsSafetyHazardAndPrecautions = useGetDetailAssetsSafetyHazardAndPrecautions({
    id: selectedSafetyRow?.safety_lexicon_id,
    params: {
      site: selectedRow?.site_id,
    },
  })

  const updateAssetsSafetyHazardAndPrecautions = useUpdateAssetsSafetyHazardAndPrecautions({
    id: selectedRow?.asset_id,
  })

  const getHazardDetail = async () => {
    await getDetailAssetsSafetyHazardAndPrecautions
      .mutateAsync({
        id: selectedSafetyRow?.safety_lexicon_id,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data?.data

          setFormValue({
            hazard_and_precautions: [
              {
                hazard: {
                  value: data?.hazard?.hazard_id,
                  label: data?.hazard?.hazard_code,
                  hazard: {
                    hazard_desc: data?.hazard?.hazard_desc,
                    hazmate_enabled: data?.safety_extended_data?.hazmate_enabled,
                    hazard_type: data?.safety_extended_data?.hazard_type,
                  },
                },
              },
            ],
          })
        }
      })
  }

  const isLoading = getDetailAssetsSafetyHazardAndPrecautions.isPending

  useEffect(() => {
    if (mode === 'Update') {
      getHazardDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (mode === 'Create') {
          const hazards = []

          if (
            Array.isArray(values?.hazard_and_precautions) &&
            values?.hazard_and_precautions?.length
          ) {
            values?.hazard_and_precautions?.forEach((item) =>
              hazards?.push({
                hazard_id: item?.hazard?.value,
                has_hazard_material: !!item?.hazard?.hazard?.hazmate_enabled,
                hazard_type: item?.hazard?.hazard?.hazard_type,
              }),
            )
          }

          const payload = {
            site_id: selectedRow?.site_id,
            hazards: hazards,
          }

          await createAssetsSafetyHazardAndPrecautions
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Hazard and Precautions added successfully.`,
              }).then(() => {
                setTabIndex(0)
                setAction('Read')
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
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        } else if (mode === 'Update') {
          const hazards = []

          if (
            Array.isArray(values?.hazard_and_precautions) &&
            values?.hazard_and_precautions?.length
          ) {
            values?.hazard_and_precautions?.forEach((item) =>
              hazards?.push({
                hazard_id: item?.hazard?.value,
                has_hazard_material: !!item?.hazard?.hazard?.hazmate_enabled,
                hazard_type: item?.hazard?.hazard?.hazard_type,
                safety_lexicon_id: selectedSafetyRow?.safety_lexicon_id,
              }),
            )
          }

          const payload = {
            site_id: selectedRow?.site_id,
            hazards: hazards,
          }

          await updateAssetsSafetyHazardAndPrecautions
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Hazard and Precautions updated successfully.`,
              }).then(() => {
                setTabIndex(0)
                setAction('Read')
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
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
      }
    })
  }

  return {
    formValue,
    selectedRow,
    getAssetsSafetyHazards,
    isLoading,
    handleSubmit,
  }
}

export default useAssetsSafetyHazardAndPrecautionsForm
