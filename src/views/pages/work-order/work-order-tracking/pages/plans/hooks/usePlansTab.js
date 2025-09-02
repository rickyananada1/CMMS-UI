import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { woTrackingActions } from '../../../slices/woTrackingSlices'

const usePlansTab = () => {
  const dispatch = useDispatch()
  const selectedTab = useSelector((state) => state.woTracking?.selectedPlanTab)

  const setSelectedTab = (param) => {
    dispatch(woTrackingActions.setSelectedPlanTab(param))
  }
  const [action, setAction] = useState('view')
  return {
    selectedTab,
    setSelectedTab,
    action,
    setAction,
  }
}

export default usePlansTab
