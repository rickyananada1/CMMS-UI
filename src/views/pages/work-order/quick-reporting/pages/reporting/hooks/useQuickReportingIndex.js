import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quickReportingActions } from '../../../slices/quickReportingSlices'

const useQuickReportingIndex = () => {
  const dispatch = useDispatch()
  const selectedTab = useSelector((state) => state.quickReporting?.selectedDetailTab)

  const setSelectedTab = (param) => {
    dispatch(quickReportingActions.setSelectedDetailTab(param))
  }
  const [action, setAction] = useState('view')
  return {
    selectedTab,
    setSelectedTab,
    action,
    setAction,
  }
}

export default useQuickReportingIndex
