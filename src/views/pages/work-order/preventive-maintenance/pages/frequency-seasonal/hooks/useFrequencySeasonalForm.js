import { useEffect, useState } from 'react'
import { useGetFrequencySeasonalDetail, useUpdateFrequencySeasonal } from '../services'
import { useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import moment from 'moment'
import { useLocation } from 'react-router-dom'

const useFrequencySeasonalForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(true)
  const [disabledDate, setDisabledDate] = useState(false)
  const location = useLocation()

  const selectedRow = useSelector(
    (state) => state.preventiveMaintenances?.selectedPreventiveMaintenance,
  )

  const frequencySeasonalUpdateService = useUpdateFrequencySeasonal()
  const getFrequencySeasonalDetail = useGetFrequencySeasonalDetail()

  const getFrequencySeasonal = async (params) => {
    setIsLoading(true)
    await getFrequencySeasonalDetail
      .mutateAsync({
        id: selectedRow?.preventive_maintenance_id,
        params: params,
      })
      .then((res) => {})
      .catch((err) => {
        setTabIndex(0)
        setAction('Read')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getFrequencySeasonal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const [formValue, setFormValue] = useState({
    frequency_id: null,
    frequency: null,
    frequency_unit: '',
    estimated_next_schedule: '',
    auto_create_work_order: false,
    start_month: '',
    start_date: '',
    end_month: '',
    end_date: '',
    working_day_sunday: false,
    working_day_monday: false,
    working_day_tuesday: false,
    working_day_wednesday: false,
    working_day_thursday: false,
    working_day_friday: false,
    working_day_saturday: false,
  })

  useEffect(() => {
    if (!getFrequencySeasonalDetail.data?.data?.data) return
    const data = getFrequencySeasonalDetail?.data?.data?.data

    const startMonth = monthOptions.find((x) => x.value === data.start_month)?.label
    const endMonth = monthOptions.find((x) => x.value === data.end_month)?.label

    setFormValue((prev) => ({
      ...prev,
      ...data,
      start_month: { value: data.start_month, label: startMonth },
      start_date: { value: data.start_date, label: data.start_date },
      end_month: { value: data.end_month, label: endMonth },
      end_date: { value: data.end_date, label: data.end_date },
      frequency_unit: { value: data.frequency_unit, label: data.frequency_unit },
    }))

    updateDates('start', startMonth)
    updateDates('end', endMonth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFrequencySeasonalDetail.data])

  const handleDisabledDate = () => {
    const month = formValue.start_month?.value
    const day = formValue.start_date?.value
    const year = moment().year()
    const targetDate = moment({ year, month: month - 1, day: day })
    const isPast = targetDate.isBefore(moment())
    setDisabledDate(formValue.estimated_next_schedule === '0001-01-01 00:00:00' ? false : isPast)
  }

  useEffect(() => {
    handleDisabledDate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue])

  const isEndGreaterThanStart = (startMonth, startDate, endMonth, endDate) => {
    if (!startMonth || !startDate || !endMonth || !endDate) return false
    if (startMonth === endMonth && startDate === endDate) return false
    if (startMonth > endMonth) return false
    if (startMonth === endMonth && startDate > endDate) return false
    return true
  }

  const handleSubmit = (values, formikHelpers) => {
    const newValues = {
      ...values,
      frequency: parseInt(values.frequency),
      frequency_unit: values.frequency_unit?.value,
      estimated_next_schedule: moment(values.estimated_next_schedule).format('YYYY-MM-DD HH:mm:ss'),
      start_month: values.start_month?.value,
      start_date: values.start_date?.value,
      end_month: values.end_month?.value,
      end_date: values.end_date?.value,
    }

    if (
      !isEndGreaterThanStart(
        newValues.start_month,
        newValues.start_date,
        newValues.end_month,
        newValues.end_date,
      )
    ) {
      Notification.fire({
        icon: 'error',
        title: 'Error',
        text: 'End Date must be greater than Start Date',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2671D9',
      })
      formikHelpers.setSubmitting(false)
      return
    }

    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          if (mode === 'Update') {
            await frequencySeasonalUpdateService
              .mutateAsync({
                id: selectedRow?.preventive_maintenance_id,
                data: newValues,
              })
              .then((res) => {
                Notification.fire({
                  icon: 'success',
                  title: 'Success',
                  text: res.data.message,
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
                  text: err.response?.data.message,
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
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  const frequencyUnitOptions = [
    {
      label: 'DAYS',
      value: 'DAYS',
    },
    {
      label: 'WEEKS',
      value: 'WEEKS',
    },
    {
      label: 'MONTHS',
      value: 'MONTHS',
    },
    {
      label: 'YEARS',
      value: 'YEARS',
    },
  ]

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const monthOptions = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ]

  const [startDateOptions, setStartDateOptions] = useState([])
  const [endDateOptions, setEndDateOptions] = useState([])

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  // Fungsi untuk menghitung jumlah hari dalam bulan
  const getDaysInMonth = (month, year) => {
    switch (month) {
      case 2: // Februari
        return isLeapYear(year) ? 29 : 28
      case 4:
      case 6:
      case 9:
      case 11: // April, Juni, September, November
        return 30
      default: // Sisanya
        return 31
    }
  }

  const updateDates = (type, month) => {
    const currentYear = new Date().getFullYear()
    const days = getDaysInMonth(month, currentYear)
    const dateOptions = Array.from({ length: days }, (_, i) => ({ label: i + 1, value: i + 1 })) // [1, 2, ..., days]
    type === 'start' ? setStartDateOptions(dateOptions) : setEndDateOptions(dateOptions)
  }

  return {
    formValue,
    handleSubmit,
    frequencyUnitOptions,
    daysOfWeek,
    isLoading,
    monthOptions,
    startDateOptions,
    endDateOptions,
    updateDates,
    disabledDate,
  }
}

export default useFrequencySeasonalForm
