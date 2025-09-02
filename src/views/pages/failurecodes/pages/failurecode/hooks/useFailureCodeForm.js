import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useCreateFailureCode, useUpdateFailureCode, useGetFailureCode } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useFailureCodeForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.failureCodes?.selectedFailureCode)

  const [isLoading, setIsLoading] = useState(false)

  const [formValue, setFormValue] = useState({
    failure_class: {
      failure_code: '',
      description: '',
    },
    problem: {
      failure_code: '',
      description: '',
      cause: [{ failure_code: '', description: '' }],
    },
  })

  const createFailureCodeService = useCreateFailureCode({
    id: selectedRow?.failure_code_id,
  })

  const updateFailureCodeService = useUpdateFailureCode({
    id: selectedRow?.failure_code_id,
  })

  const getFailureCodeDetailService = useGetFailureCode({
    id: selectedRow?.failure_code_id,
  })

  const getFailureCodeDetail = async () => {
    setIsLoading(true)
    await getFailureCodeDetailService
      .mutateAsync({
        id: selectedRow?.failure_code_id,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res?.data?.data

          setFormValue((prevValue) => {
            let problem = {
              failure_code: '',
              description: '',
            }

            let cause = []

            if (Array.isArray(data?.problems) && data?.problems?.length) {
              problem.failure_code = data?.problems?.[0]?.failure_code
              problem.description = data?.problems?.[0]?.description
            }

            if (Array.isArray(data?.causes) && data?.causes?.length) {
              data?.causes.forEach((item) =>
                cause.push({
                  failure_code: item?.failure_code,
                  description: item?.description,
                }),
              )
            } else {
              cause.push({
                failure_code: '',
                description: '',
              })
            }

            return {
              ...prevValue,
              failure_class: {
                failure_code: data?.failure_class?.failure_code,
                description: data?.failure_class?.description,
              },
              problem: {
                failure_code: problem.failure_code,
                description: problem.description,
                cause: cause,
              },
            }
          })
        }
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (mode === 'Update' && selectedRow?.failure_code_id) {
      getFailureCodeDetail()
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
          const payload = {
            failure_class: {
              failure_code: values?.failure_class?.failure_code,
              description: values?.failure_class?.description,
            },
            problem: {
              failure_code: values?.problem?.failure_code,
              description: values?.problem?.description,
              cause: values?.problem?.cause,
            },
          }

          await createFailureCodeService
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Failure Codes added successfully.`,
              }).then(() => {
                setTabIndex(0)
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
          const payload = {
            failure_class: {
              failure_code: values?.failure_class?.failure_code,
              description: values?.failure_class?.description,
            },
            problem: {
              failure_code: values?.problem?.failure_code,
              description: values?.problem?.description,
              cause: values?.problem?.cause,
            },
          }

          await updateFailureCodeService
            .mutateAsync({
              id: selectedRow?.failure_code_id,
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Failure Codes updated successfully.`,
              }).then(() => {
                setTabIndex(0)
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
    handleSubmit,
    isLoading,
  }
}

export default useFailureCodeForm
