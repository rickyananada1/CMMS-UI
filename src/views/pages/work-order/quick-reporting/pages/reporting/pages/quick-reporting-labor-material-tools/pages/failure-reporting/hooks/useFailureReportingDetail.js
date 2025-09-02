import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetFailureCode } from '../services'
import { quickReportingActions } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'

const useFailureReportingDetail = () => {
  const dispatch = useDispatch()

  const tableRefProblems = useRef()
  const tableRefCauses = useRef()
  const tableRefRemedies = useRef()

  const selectedRow = useSelector((state) => state.quickReporting?.selectedFailure)
  const selectedCausesRow = useSelector((state) => state.quickReporting?.selectedFailureCauses)

  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const visible = useSelector((state) => state.quickReporting?.detailFailureVisible)

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
          const resData = res?.data?.data

          setData(resData)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const setSelectedCauses = (cause) => {
    dispatch(quickReportingActions.setSelectedFailureCauses(cause))
  }

  useEffect(() => {
    !visible && setSelectedCauses(null)
    visible && selectedRow?.failure_code_id && getFailureCodeDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

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
    setSelectedCauses,
    visible,
  }
}

export default useFailureReportingDetail
