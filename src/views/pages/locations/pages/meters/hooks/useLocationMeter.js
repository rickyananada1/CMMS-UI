import { useEffect, useState } from 'react'
import {
  useCreateLocationMeter,
  useUpdateLocationMeter,
  useGetMeters,
  useGetLocationMeter,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import {
  useGetReadingTypes,
  useGetUoms,
} from 'src/views/pages/assets/meters/pages/meters/detail/services'
import { locationsActions } from '../../../slices/locationsSlices'

const useLocationMeter = ({ mode, setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedLocationMeter = useSelector((state) => state.locations?.selectedLocationMeter)

  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [selectedMeterId, setSelectedMeterId] = useState('')
  const [dataMeterInGroup, setDataMeterInGroup] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleChangeSelectedMeter = (val) => {
    setSelectedMeterId(val)
  }

  const location = useLocation()

  const [formValue, setFormValue] = useState({
    meter_in_groups: data?.meter_in_groups ?? [{ is_active: true, new_reading: null }],
  })

  useEffect(() => {
    mode !== 'Create' ? getLocationMeter() : setIsLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const getLocationMeterService = useGetLocationMeter()

  const getLocationMeter = async (params) => {
    setIsLoading(true)
    await getLocationMeterService
      .mutateAsync({
        id: selectedLocationMeter?.location_meter_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: err.response.data.message,
        })
        setAction('Read')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!getLocationMeterService.data?.data?.data) return
    const meter = getLocationMeterService.data.data.data
    setFormValue((prev) => ({
      ...prev,
      meter_in_groups: [
        {
          sequence: meter?.sequence,
          meter_id: {
            value: meter?.meter_id,
            label: selectedLocationMeter?.meter,
            meter_description: meter?.meter_description,
            meter_type: meter?.meter_type,
            uom_description: meter?.uom,
          },

          asset_up: meter?.asset_up,
          point: meter?.point,
          is_active: meter?.is_active,

          remarks: meter?.remarks,
          reading: meter?.reading,
          reading_date: meter?.reading_date,
          reading_inspector: meter?.reading_inspector,
          new_reading: null,

          ...(meter?.average_calculation_method !== null && {
            average_calculation_method: {
              value: meter?.average_calculation_method,
              label: meter?.average_calculation_method,
            },
          }),
          sliding_window_size: meter?.sliding_window_size,
          static_average: meter?.static_average,
          meter_rollover: meter?.meter_rollover,
          life_to_date_for_location: meter?.life_to_date_for_location,
          ...(meter?.reading_type !== null && {
            reading_type: {
              value: meter?.reading_type,
              label: meter?.reading_type,
            },
          }),
          ...(meter?.accept_rolldown_from !== null && {
            accept_rolldown_from: {
              value: meter?.accept_rolldown_from,
              label: meter?.accept_rolldown_from,
            },
          }),
        },
      ],
    }))
  }, [getLocationMeterService.data, selectedLocationMeter])

  const populateFields = async (setFieldValue, index, val) => {
    await setFieldValue(`meter_in_groups.${index}.meter_rollover`, '')
    setFieldValue(`meter_in_groups.${index}.meter_rollover`, null)
    setFieldValue(`meter_in_groups.${index}.average_calculation_method`, null)
    await setFieldValue(`meter_in_groups.${index}.sliding_window_size`, '')
    setFieldValue(`meter_in_groups.${index}.sliding_window_size`, null)
    await setFieldValue(`meter_in_groups.${index}.static_average`, '')
    setFieldValue(`meter_in_groups.${index}.static_average`, null)
    await setFieldValue(`meter_in_groups.${index}.reading_type`, '')
    setFieldValue(`meter_in_groups.${index}.reading_type`, null)
    await setFieldValue(`meter_in_groups.${index}.accept_rolldown_from`, '')
    setFieldValue(`meter_in_groups.${index}.accept_rolldown_from`, null)
  }

  const getMeters = useGetMeters()
  const getUomsService = useGetUoms()
  const getReadingTypesService = useGetReadingTypes()

  const createLocationMeter = useCreateLocationMeter()
  const updateLocationMeter = useUpdateLocationMeter()

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to submit?`,
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const modifiedFormData = values?.meter_in_groups?.map((meter) => {
          return {
            ...meter,
            location_id: selectedRow.location_id,
            meter_id: meter?.meter_id.value,
            meter_description: meter?.meter_id.meter_description ?? null,
            average_calculation_method: meter?.average_calculation_method?.value ?? null,
            meter_type: meter?.meter_id.meter_type ?? null,
            uom: meter?.meter_id.uom_description ?? null,
            reading_type: meter?.reading_type?.label ?? null,
            accept_rolldown_from: meter?.accept_rolldown_from?.label ?? null,
            is_active: meter?.is_active ?? false,
            asset_up: meter?.asset_up ?? false,
            ...(meter?.point !== null && { point: Number(meter?.point) }),
            ...(meter?.life_to_date_for_location !== null && {
              life_to_date_for_location: Number(meter?.life_to_date_for_location),
            }),
            ...(meter?.static_average !== null && {
              static_average: Number(meter?.static_average),
            }),
          }
        })[0]

        if (mode === 'Create') {
          await createLocationMeter
            .mutateAsync({
              data: modifiedFormData,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Location Meter added successfully.`,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                setTabIndex(5)
                setAction('Read')
              })
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
              setErrorMessage(err.response.data.message)
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        } else if (mode !== 'Create') {
          const newMeterName = values?.meter_in_groups[0]?.meter_id?.label
          await updateLocationMeter
            .mutateAsync({
              id: selectedLocationMeter?.location_meter_id,
              data: modifiedFormData,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Location Meter updated successfully.`,
              }).then(() => {
                dispatch(locationsActions.setUpdateLocationMeter(newMeterName))
                setTabIndex(5)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Error!',
                text: err.response.data.message,
              })
              setErrorMessage(err.response.data.message)
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
      }
    })
  }

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    handleSubmit,
    dataMeterInGroup,
    setDataMeterInGroup,
    getMeters,
    selectedMeterId,
    handleChangeSelectedMeter,
    avg_calc_types,
    accept_rolldown_options,
    meter_type_options,
    getUomsService,
    getReadingTypesService,
    populateFields,
  }
}

var avg_calc_types = [
  { value: 'ALL', label: 'ALL' },
  { value: 'SLIDING-DAYS', label: 'SLIDING-DAYS' },
  { value: 'SLIDING-READINGS', label: 'SLIDING-READINGS' },
  { value: 'STATIC', label: 'STATIC' },
]

var accept_rolldown_options = [
  { value: 'ASSET', label: 'ASSET' },
  { value: 'LOCATION', label: 'LOCATION' },
  { value: 'NONE', label: 'NONE' },
]

const meter_type_options = [
  {
    value: 'gauge',
    label: 'Gauge',
    description: 'Gauge',
  },
  {
    value: 'continuous',
    label: 'Continuous',
    description: 'Continuous',
  },
  {
    value: 'characteristic',
    label: 'Characteristic',
    description: 'Characteristic',
  },
]

export default useLocationMeter
