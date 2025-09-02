import { useEffect, useState } from 'react'
import {
  useCreateFailureReporting,
  useGetFailureCodeList,
  useUpdateFailureReporting,
} from '../services'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'

const useFailureReportingForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)
  const selectedFailure = useSelector((state) => state.quickReporting?.selectedFailure)

  const [errorMessage] = useState('')
  const [selectedMeterId, setSelectedMeterId] = useState('')
  const [dataMeterInGroup, setDataMeterInGroup] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getFailureCodeList = useGetFailureCodeList()

  const handleChangeSelectedMeter = (val) => {
    setSelectedMeterId(val)
  }

  const location = useLocation()

  const [formValue, setFormValue] = useState({
    failure_reporting: [{}],
  })

  useEffect(() => {
    mode !== 'Create Failure' ? getFailureReporting() : setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const duplicateFailureCodeError = () => {
    Notification.fire({
      icon: 'error',
      title: 'Error!',
      text: `Failure Class already selected.`,
    })
  }

  const getFailureReporting = () => {
    setIsLoading(true)
    setFormValue((prev) => ({
      ...prev,
      ...{
        failure_reporting: [
          {
            failure_code_id: {
              label: selectedFailure.failure_code,
              value: selectedFailure.failure_code_id,
              description: selectedFailure.description,
              organization_name: selectedFailure.organization_name ?? '-',
            },
            work_order_failure_id: selectedFailure.work_order_failure_id ?? null,
          },
        ],
      },
    }))
    setIsLoading(false)
  }

  const createFailureReporting = useCreateFailureReporting()
  const updateFailureReporting = useUpdateFailureReporting()

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
        var modifiedFormData = []

        if (mode === 'Create Failure') {
          modifiedFormData = values.failure_reporting.map((item) => item.failure_code_id.value)
          console.log('mfd', modifiedFormData)

          await createFailureReporting
            .mutateAsync({
              id: selectedRow.work_order_id,
              data: modifiedFormData,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Failure Reporting added successfully.`,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                setTabIndex(1)
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
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        } else if (mode === 'Update Failure') {
          modifiedFormData = values.failure_reporting.map((item) => ({
            work_order_failure_id: item.work_order_failure_id,
            failure_code_id: item.failure_code_id.value,
          }))
          console.log('mfd', modifiedFormData)
          await updateFailureReporting
            .mutateAsync({
              id: selectedRow.work_order_id,
              data: modifiedFormData,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Failure Reporting updated successfully.`,
              }).then(() => {
                setTabIndex(1)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Error!',
                text: err.response.data.message,
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
    // data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    handleSubmit,
    dataMeterInGroup,
    setDataMeterInGroup,
    selectedMeterId,
    handleChangeSelectedMeter,
    getFailureCodeList,
    duplicateFailureCodeError,
  }
}

export default useFailureReportingForm
