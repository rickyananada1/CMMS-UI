import { useSelector, useDispatch } from 'react-redux'
import { organizationActions } from '../slices/organizationSlices'

const useOrganizationTab = () => {
  const dispatch = useDispatch()
  const selectedTab = useSelector((state) => state.organization?.selectedTabIndex)
  const selectedAction = useSelector((state) => state.organization?.selectedTabAction)
  const selectedOrganization = useSelector((state) => state.organization?.selectedGroup)
  const selectedSite = useSelector((state) => state.organization?.selectedSite)
  const selectedAddress = useSelector((state) => state.organization?.selectedAddress)

  const setSelectedTab = (param) => {
    dispatch(organizationActions.setSelectedTabIndex(param))
  }

  const setSelectedTabAction = (param) => {
    dispatch(organizationActions.setSelectedTabAction(param))
  }

  const setSelectedTabAndAction = (param) => {
    dispatch(organizationActions.setSelectedTabIndexAndAction(param))
  }

  return {
    selectedTab,
    selectedAction,
    setSelectedTab,
    setSelectedTabAction,
    setSelectedTabAndAction,
    selectedOrganization,
    selectedSite,
    selectedAddress,
  }
}

export default useOrganizationTab
