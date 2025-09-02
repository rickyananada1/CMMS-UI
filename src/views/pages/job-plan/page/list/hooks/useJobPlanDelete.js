import { useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useDeleteJobPlan, useGetJobPlanDropdown } from '../services'
import { jobPlanActions } from '../../../slices/jobPlanSlices'
import { useDispatch } from 'react-redux'

const useJobPlanDelete = ({ tableRef, setAction }) => {
  const Notification = withReactContent(Swal)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const [textFields, setTextFields] = useState({
    job_plan_id: null,
  })

  const getJobPlanListService = useGetJobPlanDropdown({})

  const deleteJobPlan = useDeleteJobPlan({
    id: textFields?.job_plan_id?.value,
  })

  const handleDeleteJobPlan = async (values) => {
    setIsLoading(true)
    await deleteJobPlan
      .mutateAsync({
        id: values?.job_plan_id?.value,
      })
      .then((response) => {
        if (response?.status === 200) {
          Notification.fire({
            icon: 'success',
            title: 'Success!',
            text: `Job Plan deleted successfully.`,
          }).then(() => {
            setTextFields({
              job_plan_id: null,
            })
            tableRef?.current?.update()
            dispatch(jobPlanActions.setSelectedJobPlan(null))
            setAction('Read')
          })
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: `${err?.response?.data?.message}.`,
        }).then(() => {
          setAction('Read')
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    textFields,
    isLoading,
    errorMessage,
    handleDeleteJobPlan,
    getJobPlanListService,
  }
}

export default useJobPlanDelete
