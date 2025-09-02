import { useState, useEffect } from 'react'
import {
  useGetAssets,
  useCreateLocationSafetyRelatedAssets,
  useUpdateLocationSafetyRelatedAssets,
  useGetDetailLocationSafetyRelatedAssets,
} from '../services'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useLocationSafetyRelatedAssetsForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedSafetyRow = useSelector((state) => state.locationSafety?.selectedSafety)

  const getAssets = useGetAssets()

  const [formValue, setFormValue] = useState({
    related_assets_ids: [
      {
        asset: {
          value: '',
          label: '',
        },
      },
    ],
  })

  const createLocationSafetyRelatedAssets = useCreateLocationSafetyRelatedAssets({
    id: selectedRow?.location_id,
  })

  const getDetailLocationSafetyRelatedAssets = useGetDetailLocationSafetyRelatedAssets({
    id: selectedRow?.location_id,
    params: {
      site: selectedRow?.site_id,
    },
  })

  const updateLocationSafetyRelatedAssets = useUpdateLocationSafetyRelatedAssets({
    id: selectedRow?.location_id,
  })

  const getLocationSafetyRelatedAssetsDetail = async () => {
    await getDetailLocationSafetyRelatedAssets
      .mutateAsync({
        id: selectedRow?.location_id,
        params: {
          site: selectedRow?.site_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setFormValue({
            related_assets_ids: res.data?.data,
          })
        }
      })
  }

  useEffect(() => {
    if (mode === 'Update') {
      getLocationSafetyRelatedAssetsDetail()
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
        let related_assets_ids = []

        if (Array.isArray(values?.related_assets_ids) && values?.related_assets_ids?.length) {
          values?.related_assets_ids.forEach((item) =>
            related_assets_ids.push({
              asset_id: item?.asset?.value,
              location_id: item?.asset?.location_id,
            }),
          )
        }

        const payload = {
          site_id: selectedRow?.site_id,
          related_assets_ids: related_assets_ids,
        }

        if (mode === 'Create') {
          await createLocationSafetyRelatedAssets
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Safety - Related Assets added successfully.`,
              }).then(() => {
                setTabIndex(3)
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
          await updateLocationSafetyRelatedAssets
            .mutateAsync({
              related_assets_id: selectedSafetyRow?.asset?.id,
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Safety - Related Assets updated successfully.`,
              }).then(() => {
                setTabIndex(3)
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
    selectedRow,
    formValue,
    getAssets,
    handleSubmit,
  }
}

export default useLocationSafetyRelatedAssetsForm
