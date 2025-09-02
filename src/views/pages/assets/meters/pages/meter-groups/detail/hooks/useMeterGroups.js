import { useEffect, useState } from 'react'
import {
  useCreateMeterGroup,
  useGetMeterGroup,
  useUpdateMeterGroup,
  useGetMeters,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { metersActions } from '../../../meters/slices/metersSlices'

const useMeterGroups = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.meters?.selectedMeterGroup)

  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [selectedMeterId, setSelectedMeterId] = useState('')
  const [dataMeterInGroup, setDataMeterInGroup] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleChangeSelectedMeter = (val) => {
    setSelectedMeterId(val)
  }

  const setSelectedRow = (param) => {
    dispatch(metersActions.setSelectedMeterGroup(param))
  }

  const getMeterGroupService = useGetMeterGroup()
  const location = useLocation()

  const [formValue, setFormValue] = useState({
    meter_group: data?.meter_group,
    description: data?.description,
    meter_in_groups: data?.meter_in_groups ?? [{}],
  })

  useEffect(() => {
    mode !== 'Create' ? getMeterGroup() : setIsLoading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const getMeters = useGetMeters()

  const getMeterGroup = async (params) => {
    setIsLoading(true)
    await getMeterGroupService
      .mutateAsync({
        id: selectedRow?.meter_group_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        setAction('Read')
        setTabIndex(2)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!getMeterGroupService.data?.data?.data) return
    const { meter_group, meter_in_groups } = getMeterGroupService.data.data.data
    setFormValue((prev) => ({
      ...prev,
      meter_group: meter_group.meter_group,
      description: meter_group.description,
      ...(meter_in_groups.length > 0
        ? {
            meter_in_groups: meter_in_groups.map((meter) => ({
              meter_group_id: meter?.meter_group_id,
              meter_in_group_id: meter?.meter_in_group_id,
              sequence: meter?.sequence,
              meter_rollover: meter?.meter_rollover,
              ...(meter?.average_calculation_method !== null && {
                average_calculation_method: {
                  value: meter?.average_calculation_method,
                  label: meter?.average_calculation_method,
                },
              }),
              sliding_window_size: meter?.sliding_window_size,
              static_average: meter?.static_average,
              meter_id: {
                value: meter?.meter_id,
                label: meter?.meter_name,
                meter_description: meter?.meter_description,
                meter_type: meter?.meter_type,
                uom_description: meter?.uom_name,
                domain: meter?.domain,
              },
              apply_meter: meter?.apply_meter,
            })),
          }
        : {}),
    }))
  }, [getMeterGroupService.data])

  const createMeterGroup = useCreateMeterGroup()
  const updateMeterGroup = useUpdateMeterGroup()

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
        const modifiedFormData = {
          meter_group: {
            ...(mode !== 'Create' && { meter_group_id: selectedRow.meter_group_id }),
            meter_group: values.meter_group,
            description: values.description,
          },
          ...(mode === 'Update-MeterInGroup' && {
            meter_in_groups: values?.meter_in_groups?.map((meter) => {
              return {
                ...meter,
                meter_id: meter?.meter_id.value,
                average_calculation_method: meter?.average_calculation_method?.value,
              }
            }),
          }),
        }
        if (mode === 'Create') {
          await createMeterGroup
            .mutateAsync({
              data: modifiedFormData,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Meter Group added successfully.`,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                setTabIndex(2)
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
          await updateMeterGroup
            .mutateAsync({
              id: selectedRow.meter_group_id,
              data: modifiedFormData,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Meter Group updated successfully.`,
              }).then(() => {
                setTabIndex(3)
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
    setSelectedRow,
    handleSubmit,
    dataMeterInGroup,
    setDataMeterInGroup,
    getMeters,
    selectedMeterId,
    handleChangeSelectedMeter,
    avg_calc_types,
  }
}

var avg_calc_types = [
  { value: 'ALL', label: 'ALL' },
  { value: 'SLIDING-DAYS', label: 'SLIDING-DAYS' },
  { value: 'SLIDING-READINGS', label: 'SLIDING-READINGS' },
  { value: 'STATIC', label: 'STATIC' },
]

export default useMeterGroups
