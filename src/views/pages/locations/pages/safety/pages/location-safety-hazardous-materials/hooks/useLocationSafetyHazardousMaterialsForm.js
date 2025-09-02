import { useState, useEffect } from 'react'
import {
  useGetLocationSafetyHazards,
  useCreateLocationSafetyHazardousMaterial,
  useUpdateLocationSafetyHazardousMaterials,
  useGetDetailLocationSafetyHazardousMaterials,
} from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useLocationSafetyHazardAndPrecautionsForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedSafetyRow = useSelector((state) => state.locationSafety?.selectedSafety)
  const selectedSafetyMaterialRow = useSelector(
    (state) => state.locationSafety?.selectedSafetyMaterial,
  )

  const getLocationSafetyHazards = useGetLocationSafetyHazards()

  const [formValue, setFormValue] = useState({
    location_hazardous_materials: [
      {
        hazard: {
          value: '',
          label: '',
          hazard_desc: '',
          msds_num: '',
          health_rating: '',
          flammability_rating: '',
          reactivity_rating: '',
          contact_rating: '',
        },
      },
    ],
  })

  const createLocationSafetyHazardousMaterials = useCreateLocationSafetyHazardousMaterial({
    id: selectedRow?.location_id,
  })

  const getDetailLocationSafetyHazardousMaterials = useGetDetailLocationSafetyHazardousMaterials({
    id: selectedSafetyMaterialRow?.safety_lexicon_id,
    params: {
      site: selectedRow?.site_id,
    },
  })

  const updateLocationSafetyHazardousMaterials = useUpdateLocationSafetyHazardousMaterials({
    id: selectedRow?.location_id,
  })

  const isLoading = getDetailLocationSafetyHazardousMaterials.isPending

  const getHazardousMaterialDetail = async () => {
    await getDetailLocationSafetyHazardousMaterials
      .mutateAsync({
        id: selectedSafetyMaterialRow?.safety_lexicon_id,
        params: {
          site: selectedRow?.site_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data?.data

          setFormValue({
            location_hazardous_materials: [
              {
                hazard: {
                  label: data?.hazard?.hazard_code,
                  value: data?.hazard?.hazard_id,
                  hazard_desc: data?.hazard?.hazard_desc,
                  contact_rating: data?.safety_extended_data?.contact_rating,
                  flammability_rating: data?.safety_extended_data?.flammability_rating,
                  health_rating: data?.safety_extended_data?.health_rating,
                  msds_num: data?.safety_extended_data?.msds_num,
                  reactivity_rating: data?.safety_extended_data?.reactivity_rating,
                },
              },
            ],
          })
        }
      })
  }

  useEffect(() => {
    if (mode === 'Update') {
      getHazardousMaterialDetail()
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
            Array.isArray(values?.location_hazardous_materials) &&
            values?.location_hazardous_materials?.length
          ) {
            values?.location_hazardous_materials?.forEach((item) =>
              hazards?.push({
                hazard_id: item?.hazard?.value,
                hazard_desc: item?.hazard?.hazard_desc,
                msds_num: +item?.hazard?.msds_num,
                health_rating: +item?.hazard?.health_rating,
                flammability_rating: +item?.hazard?.flammability_rating,
                reactivity_rating: +item?.hazard?.reactivity_rating,
                contact_rating: +item?.hazard?.contact_rating,
              }),
            )
          }

          const payload = {
            site_id: selectedRow?.site_id,
            hazard_materials: hazards,
          }

          await createLocationSafetyHazardousMaterials
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Hazardous Materials added successfully.`,
              }).then(() => {
                setTabIndex(1)
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
            Array.isArray(values?.location_hazardous_materials) &&
            values?.location_hazardous_materials?.length
          ) {
            values?.location_hazardous_materials?.forEach((item) =>
              hazards?.push({
                hazard_id: item?.hazard?.value,
                hazard_desc: item?.hazard?.hazard_desc,
                msds_num: +item?.hazard?.msds_num,
                health_rating: +item?.hazard?.health_rating,
                flammability_rating: +item?.hazard?.flammability_rating,
                reactivity_rating: +item?.hazard?.reactivity_rating,
                contact_rating: +item?.hazard?.contact_rating,
                SafetyLexiconId: selectedSafetyMaterialRow?.safety_lexicon_id,
              }),
            )
          }

          const payload = {
            site_id: selectedRow?.site_id,
            hazard_materials: hazards,
          }

          await updateLocationSafetyHazardousMaterials
            .mutateAsync({
              hazard_id: selectedSafetyRow?.hazard?.hazard_id,
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Hazardous Materials updated successfully.`,
              }).then(() => {
                setTabIndex(1)
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
    getLocationSafetyHazards,
    isLoading,
    handleSubmit,
  }
}

export default useLocationSafetyHazardAndPrecautionsForm
