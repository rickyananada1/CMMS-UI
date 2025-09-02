import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  useCreateFailureCodeRemedies,
  useUpdateFailureCodeRemedies,
  useGetDetailFailureCodeRemedies,
} from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useFailureCodeRemediesForm = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.failureCodes?.selectedFailureCode)
  const selectedProblemRow = useSelector((state) => state.failureCodes?.selectedProblem)
  const selectedCausesRow = useSelector((state) => state.failureCodes?.selectedCauses)
  const selectedRemediesRow = useSelector((state) => state.failureCodes?.selectedRemedies)

  const [isLoading, setIsLoading] = useState(false)
  const [formValue, setFormValue] = useState({
    remedies: [
      {
        failure_code: '',
        remedies: '',
      },
    ],
  })

  const createFailureCodeRemediesService = useCreateFailureCodeRemedies({
    id: selectedRow?.failure_code_id,
  })

  const updateFailureCodeRemediesService = useUpdateFailureCodeRemedies({
    cause_id: selectedCausesRow?.failure_code_id,
    remedies_id: selectedRemediesRow?.failure_code_id,
  })

  const getFailureCodeRemediesDetailService = useGetDetailFailureCodeRemedies({
    id: selectedRemediesRow?.failure_code_id,
  })

  const getFailureCodeRemediesDetail = async () => {
    setIsLoading(true)
    await getFailureCodeRemediesDetailService
      .mutateAsync({
        id: selectedRemediesRow?.failure_code_id,
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res?.data?.data

          setFormValue({
            remedies: [
              {
                failure_code: data?.failure_code,
                description: data?.description,
              },
            ],
          })
        }
      })
      .finally(() => setIsLoading(false))
  }

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
        if (mode === 'Remedies') {
          const payload = values.remedies?.map((res) => ({
            failure_code: res?.failure_code,
            description: res?.description,
            parent_id: selectedCausesRow?.failure_code_id,
            root_id: selectedRow?.failure_code_id,
          }))

          await createFailureCodeRemediesService
            .mutateAsync({
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Failure Codes Remedy added successfully.`,
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
        } else if (mode === 'UpdateRemedies') {
          const payload = {
            failure_code: values?.remedies[0].failure_code,
            description: values?.remedies[0].description,
          }

          await updateFailureCodeRemediesService
            .mutateAsync({
              cause_id: selectedCausesRow?.failure_code_id,
              remedies_id: selectedRemediesRow?.failure_code_id,
              data: payload,
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success!',
                text: `Failure Codes Remedy updated successfully.`,
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

  useEffect(() => {
    if (mode === 'UpdateRemedies' && selectedRemediesRow?.failure_code_id) {
      getFailureCodeRemediesDetail()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  return {
    isLoading,
    selectedRow,
    selectedCausesRow,
    selectedProblemRow,
    formValue,
    handleSubmit,
  }
}

export default useFailureCodeRemediesForm
