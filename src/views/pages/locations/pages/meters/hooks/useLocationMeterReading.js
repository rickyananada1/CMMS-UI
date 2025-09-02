import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { locationsActions } from '../../../slices/locationsSlices'
import { useAddLocationMeterMeasurements, useGetLocationMeter } from '../services'
import moment from 'moment'

const useLocationMeterReading = () => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedLocationMeter = useSelector((state) => state.locations?.selectedLocationMeter)
  const visible = useSelector((state) => state.locations?.visiblePopUpLocationMeter)
  const dispatch = useDispatch()
  const [locationMeterIds, setLocationMeterIds] = useState({})

  const [formValue, setFormValue] = useState({
    remarks: '',
    reading: '',
    reading_date: moment().format('YYYY-MM-DD'),
  })
  const [isLoading, setIsLoading] = useState(true)

  const setVisible = (visible) => {
    dispatch(locationsActions.setVisiblePopUpLocationMeter(visible))
  }

  const getLocationMeterService = useGetLocationMeter()

  useEffect(() => {
    visible && getLocationMeter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (!getLocationMeterService.data?.data?.data) return
    const meter = getLocationMeterService.data.data.data
    setFormValue((prev) => ({
      ...prev,
      last_remarks: meter?.remarks,
      last_reading: meter?.reading,
      last_reading_date: meter?.reading_date,
      last_reading_inspector: meter?.reading_inspector,
      meter_type: meter?.meter_type,
    }))
    setLocationMeterIds({ meter_id: meter?.meter_id, location_id: meter?.location_id })
    setIsLoading(false)
  }, [getLocationMeterService.data, selectedLocationMeter])

  const getLocationMeter = async (params) => {
    setIsLoading(true)
    await getLocationMeterService
      .mutateAsync({
        id: selectedLocationMeter?.location_meter_id,
        params: params,
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `failed to get location meter details: ${err.response.data.message}`,
        })
        setVisible(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const AddLocationMeterMeasurements = useAddLocationMeterMeasurements()

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
        formikHelpers.setSubmitting(true)
        const editedValues = {
          location_meter_id: selectedLocationMeter?.location_meter_id,
          measurement_date: moment().toISOString(true),
          remark: values.remarks,
          measurement: values.reading,
        }

        await AddLocationMeterMeasurements.mutateAsync({
          data: editedValues,
          location_id: locationMeterIds?.location_id,
          meter_id: locationMeterIds?.meter_id,
        })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Measurements added successfully.`,
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            }).then(() => {
              setVisible(false)
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
          })
          .finally(() => {
            formikHelpers.setSubmitting(false)
          })
      }
    })
  }

  return {
    visible,
    setVisible,
    selectedLocationMeter,
    selectedRow,
    formValue,
    handleSubmit,
    isLoading,
  }
}

export default useLocationMeterReading
