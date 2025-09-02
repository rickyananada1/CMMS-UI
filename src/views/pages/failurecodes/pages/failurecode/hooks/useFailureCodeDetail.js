import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetFailureCode, useDeleteFailureCodeRemedies } from '../services'
import { failureCodesActions } from '../../../slices/failureCodesSlices'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useFailureCodeDetail = ({ mode, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()

  const tableRefProblems = useRef()
  const tableRefCauses = useRef()
  const tableRefRemedies = useRef()

  const selectedRow = useSelector((state) => state.failureCodes?.selectedFailureCode)
  const selectedProblemRow = useSelector((state) => state.failureCodes?.selectedProblem)
  const selectedCausesRow = useSelector((state) => state.failureCodes?.selectedCauses)
  const selectedRemediesRow = useSelector((state) => state.failureCodes?.selectedRemedies)

  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getFailureCodeDetailService = useGetFailureCode({
    id: selectedRow?.failure_code_id,
  })

  const deleteFailureCodeRemediesService = useDeleteFailureCodeRemedies({
    cause_id: selectedCausesRow?.failure_code_id,
    remedies_id: selectedRemediesRow?.failure_code_id,
  })

  const getFailureCodeDetail = async () => {
    setIsLoading(true)
    await getFailureCodeDetailService
      .mutateAsync({
        id: selectedRow?.failure_code_id,
      })
      .then((res) => {
        if (res.status === 200) {
          const resData = res?.data?.data

          setData(resData)

          if (Array.isArray(resData?.problems) && resData?.problems?.length) {
            dispatch(failureCodesActions.setSelectedProblem(resData?.problems[0]))
          }

          dispatch(failureCodesActions.setResetSelectedCauses())
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        setTabIndex(0)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const setSelectedProblem = (problem) => {
    dispatch(failureCodesActions.setSelectedProblem(problem))
  }

  const setSelectedCauses = (cause) => {
    dispatch(failureCodesActions.setSelectedCauses(cause))
  }

  const setSelectedRemedies = (remedies) => {
    dispatch(failureCodesActions.setSelectedRemedies(remedies))
  }

  const handleNavigateToCreateRemedies = () => {
    dispatch(
      failureCodesActions.setSelectedAppIndexAndAction({
        index: 1,
        action: 'Remedies',
      }),
    )
  }

  const handleDeleteRemedies = (remedies) => {
    Notification.fire({
      icon: 'warning',
      text: 'Are you sure to delete ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFailureCodeRemediesService
          .mutateAsync({
            cause_id: selectedCausesRow?.failure_code_id,
            remedies_id: remedies?.failure_code_id,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Delete Remedy successfully.',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setSelectedRemedies(null)
            tableRefRemedies.current?.update()
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
      }
    })
  }

  useEffect(() => {
    if (mode !== 'Create') {
      getFailureCodeDetail()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  useEffect(() => {
    if (selectedCausesRow?.failure_code_id) {
      tableRefRemedies?.current?.update()
    }
  }, [selectedCausesRow?.failure_code_id])

  return {
    tableRefCauses,
    tableRefProblems,
    tableRefRemedies,
    data,
    isLoading,
    errorMessage,
    selectedRow,
    selectedCausesRow,
    selectedProblemRow,
    selectedRemediesRow,
    setSelectedRemedies,
    setSelectedProblem,
    setSelectedCauses,
    handleNavigateToCreateRemedies,
    handleDeleteRemedies,
  }
}

export default useFailureCodeDetail
