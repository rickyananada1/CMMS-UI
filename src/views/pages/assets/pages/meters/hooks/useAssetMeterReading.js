import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { assetActions } from '../../../slices/assetSlices'
import { useAddAssetMeterMeasurements, useGetAssetMeter } from '../services'
import moment from 'moment'

const useAssetMeterReading = () => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedAssetMeter = useSelector((state) => state.assets?.selectedAssetMeter)
  const visible = useSelector((state) => state.assets?.visiblePopUpAssetMeter)
  const dispatch = useDispatch()
  const [assetMeterIds, setAssetMeterIds] = useState({})

  const [formValue, setFormValue] = useState({
    remarks: '',
    reading: '',
    reading_date: moment().format('YYYY-MM-DD'),
  })
  const [isLoading, setIsLoading] = useState(true)

  const setVisible = (visible) => {
    dispatch(assetActions.setVisiblePopUpAssetMeter(visible))
  }

  const getAssetMeterService = useGetAssetMeter()

  useEffect(() => {
    visible && getAssetMeter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useEffect(() => {
    if (!getAssetMeterService.data?.data?.data) return
    const meter = getAssetMeterService.data.data.data
    setFormValue((prev) => ({
      ...prev,
      last_remarks: meter?.remarks,
      last_reading: meter?.reading,
      last_reading_date: meter?.reading_date,
      last_reading_inspector: meter?.reading_inspector,
      meter_type: meter?.meter_type,
    }))
    setAssetMeterIds({ meter_id: meter?.meter_id, asset_id: meter?.asset_id })
    setIsLoading(false)
  }, [getAssetMeterService.data, selectedAssetMeter])

  const getAssetMeter = async (params) => {
    setIsLoading(true)
    await getAssetMeterService
      .mutateAsync({
        id: selectedAssetMeter?.asset_meter_id,
        params: params,
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `failed to get asset meter details: ${err.response.data.message}`,
        })
        setVisible(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const AddAssetMeterMeasurements = useAddAssetMeterMeasurements()

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
          asset_meter_id: selectedAssetMeter?.asset_meter_id,
          measurement_date: moment().toISOString(true),
          remark: values.remarks,
          measurement: values.reading,
        }

        await AddAssetMeterMeasurements.mutateAsync({
          data: editedValues,
          asset_id: assetMeterIds?.asset_id,
          meter_id: assetMeterIds?.meter_id,
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
    selectedAssetMeter,
    selectedRow,
    formValue,
    handleSubmit,
    isLoading,
  }
}

export default useAssetMeterReading
