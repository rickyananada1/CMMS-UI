import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { woTrackingActions } from '../../../slices/woTrackingSlices'

const useActualTab = () => {
  const dispatch = useDispatch()
  const selectedTab = useSelector((state) => state.woTracking?.selectedActualTab)

  const setSelectedTab = (param) => {
    dispatch(woTrackingActions.setSelectedActualTab(param))
  }
  const [action, setAction] = useState('view')
  return {
    selectedTab,
    setSelectedTab,
    action,
    setAction,
  }
}

export default useActualTab
