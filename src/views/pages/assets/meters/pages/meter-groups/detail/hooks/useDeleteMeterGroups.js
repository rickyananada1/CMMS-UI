import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useDeleteMeterGroup,
  useDeleteMeterInGroup,
  useGetMeterGroup,
  useGetMeterGroupSelect,
  useGetMeters,
} from '../services'

const useDeleteMeterGroups = ({ setVisible, deleteType, tableRef }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(true)

  const [formValue, setFormValue] = useState({
    meter_group_id: null,
    meter_in_group_ids: [],
  })
  const [meter_in_group_options, setMeterInGroupOptions] = useState([null])

  const getMeters = useGetMeters()
  const getMeterGroups = useGetMeterGroupSelect()

  const getMeterGroupService = useGetMeterGroup()
  const getMeterGroup = async (meter_group_id) => {
    setIsLoading(true)
    await getMeterGroupService
      .mutateAsync({
        id: meter_group_id,
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const fetchMeterInGroupOptions = (meter_group_id) => {
    getMeterGroup(meter_group_id)
  }

  useEffect(() => {
    if (!getMeterGroupService.data?.data?.data) return
    const { meter_in_groups } = getMeterGroupService.data.data.data
    setMeterInGroupOptions(
      meter_in_groups.map((mig) => ({
        value: mig?.meter_in_group_id,
        label: mig?.meter_name,
      })),
    )
  }, [getMeterGroupService.data])

  const deleteMeterGroupService = useDeleteMeterGroup()
  const deleteMeterInGroupService = useDeleteMeterInGroup()

  const handleDelete = async (values, formikHelpers) => {
    console.log('values', values)
    Notification.fire({
      icon: 'warning',
      html: `Do you want to delete ${
        deleteType === 'MeterInGroup' ? 'Meters in Group from<br>' : ''
      } ${values?.meter_group_id?.label}?`,
      title: 'Are you sure?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        switch (deleteType) {
          case 'MeterGroup':
            await deleteMeterGroupService
              .mutateAsync({
                id: values?.meter_group_id?.value,
              })
              .then((res) => {
                Notification.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'Meter Group deleted successfully.',
                  customClass: {
                    confirmButton: 'btn btn-primary hover:text-white',
                  },
                  buttonsStyling: false,
                })
                setFormValue({
                  meter_group_id: null,
                })
                tableRef?.current?.update()
                setVisible(false)
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
            break
          case 'MeterInGroup':
            const newValues = { ids: values.meter_in_group_ids.map((mig) => mig?.value) }
            console.log('NV', newValues)
            await deleteMeterInGroupService
              .mutateAsync({
                id: values?.meter_group_id?.value,
                data: newValues,
              })
              .then((res) => {
                Notification.fire({
                  icon: 'success',
                  title: 'Success',
                  text: 'Meters in Group deleted successfully.',
                  customClass: {
                    confirmButton: 'btn btn-primary hover:text-white',
                  },
                  buttonsStyling: false,
                })
                setFormValue({
                  meter_group_id: null,
                  meter_in_group_ids: [],
                })
                tableRef?.current?.update()
                setVisible(false)
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
            break
          default:
            return
        }
      }
    })
  }

  return {
    formValue,
    handleDelete,
    getMeters,
    getMeterGroups,
    meter_in_group_options,
    fetchMeterInGroupOptions,
    isLoading,
  }
}

export default useDeleteMeterGroups
