import { useState, useEffect } from 'react'
import {
  useGetLocationSafetyTagOut,
  useCreateLocationSafetyLockOutTagOut,
  useUpdateLocationSafetyLockOutTagOut,
  useGetDetailLocationSafetyLockOutTagOut,
  useGetLocationSafetyHazardsTagOut,
} from '../services'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useLocationSafetyLockOutTagOutForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedSafetyTagOutRow = useSelector((state) => state.locationSafety?.selectedSafetyTagOut)

  const getLocationSafetyHazardsTagOut = useGetLocationSafetyHazardsTagOut({
    id: selectedRow?.location_id,
  })
  const getLocationSafetyTagOut = useGetLocationSafetyTagOut()

  const [formValue, setFormValue] = useState({
    location_safety_lock_out_tag_out: [
      {
        hazard: {
          value: '',
          label: '',
          hazard_desc: '',
          hazard_type: '',
          msds: '',
        },
        tag_out: {
          value: '',
          label: '',
          description: '',
          required_state: '',
          asset: '',
          location: '',
        },
        lock_out: {
          value: '',
          label: '',
          description: '',
          apply_sequence: '',
          remove_sequence: '',
        },
      },
    ],
  })

  const createLocationSafetyLockOutTagOut = useCreateLocationSafetyLockOutTagOut({
    id: selectedRow?.location_id,
  })

  const getDetailLocationSafetyLockOutTagOut = useGetDetailLocationSafetyLockOutTagOut({
    id: selectedSafetyTagOutRow?.safety_lexicon_id,
    params: {
      site: selectedRow?.site_id,
    },
  })

  const updateLocationSafetyLockOutTagOut = useUpdateLocationSafetyLockOutTagOut({
    id: selectedRow?.location_id,
  })

  const getLockOutTagOutDetail = async () => {
    await getDetailLocationSafetyLockOutTagOut
      .mutateAsync({
        id: selectedSafetyTagOutRow?.safety_lexicon_id,
        params: {
          site: selectedRow?.site_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data?.data

          const hazard = data?.hazard || {}

          let value = {
            hazard: {
              value: hazard.hazard_id,
              label: hazard.hazard_code,
              hazard_desc: hazard.hazard_desc,
              hazard_type: hazard.hazard_type,
              hazard_code: hazard.hazard_code,
              hazard: { ...hazard },
              ...hazard,
            },
          }

          if (Array.isArray(data?.tag_out_lock_outs) && data?.tag_out_lock_outs?.length) {
            let tag_out = { value: '', label: '' }
            let apply_sequence = 0
            let remove_sequence = 0

            tag_out = { tag_out: { ...data?.tag_out_lock_outs[0]?.tag_out } }

            apply_sequence = data?.tag_out_lock_outs[0]?.tag_out?.apply_sequence
            remove_sequence = data?.tag_out_lock_outs[0]?.tag_out?.remove_sequence

            value.tag_out = {
              label: tag_out.tag_out.tag_out_desc,
              value: tag_out.tag_out.tag_out_id,
              apply_sequence: apply_sequence,
              remove_sequence: remove_sequence,
              ...tag_out,
            }
          }

          setFormValue({
            location_safety_lock_out_tag_out: [value],
          })
        }
      })
  }

  useEffect(() => {
    if (mode === 'Update') {
      getLockOutTagOutDetail()
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
          let hazard_tag_lock = []

          if (
            Array.isArray(values?.location_safety_lock_out_tag_out) &&
            values?.location_safety_lock_out_tag_out?.length
          ) {
            values?.location_safety_lock_out_tag_out.forEach((item) =>
              hazard_tag_lock.push({
                hazard_id: item?.hazard?.value,
                tag_out_id: item?.tag_out?.value,
                apply_sequence: +item?.tag_out?.apply_sequence,
                remove_sequence: +item?.tag_out?.remove_sequence,
              }),
            )
          }

          const payload = {
            site_id: selectedRow?.site_id,
            hazard_tag_lock: hazard_tag_lock,
          }

          await createLocationSafetyLockOutTagOut
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Lock Out / Tag Out added successfully.`,
              }).then(() => {
                setTabIndex(2)
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
          let hazard_tag_lock = []

          if (
            Array.isArray(values?.location_safety_lock_out_tag_out) &&
            values?.location_safety_lock_out_tag_out?.length
          ) {
            values?.location_safety_lock_out_tag_out.forEach((item) =>
              hazard_tag_lock.push({
                hazard_id: item?.hazard?.value,
                tag_out_id: item?.tag_out?.value || null,
                apply_sequence: +item?.tag_out?.apply_sequence || null,
                remove_sequence: +item?.tag_out?.remove_sequence || null,
                safety_lexicon_id: selectedSafetyTagOutRow?.safety_lexicon_id,
              }),
            )
          }

          const payload = {
            site_id: selectedRow?.site_id,
            safety_lexicon_id: selectedSafetyTagOutRow?.safety_lexicon_id,
            hazard_tag_lock: hazard_tag_lock,
          }

          await updateLocationSafetyLockOutTagOut
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Lock Out / Tag Out updated successfully.`,
              }).then(() => {
                setTabIndex(2)
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
    getLocationSafetyTagOut,
    getLocationSafetyHazardsTagOut,
    handleSubmit,
  }
}

export default useLocationSafetyLockOutTagOutForm
