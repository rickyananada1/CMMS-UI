import React, { useEffect } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { TabsSubWrapper } from 'src/components/elements/tabs/TabsSubWrapper'
import { useSelector, useDispatch } from 'react-redux'
import { locationSafetyActions } from './slices/locationSafetySlices'
import LocationSafetyHazardAndPrecautions from 'src/views/pages/locations/pages/safety/pages/location-safety-hazard-and-precautions/LocationSafetyHazardAndPrecautions'
import LocationSafetyHazardousMaterials from 'src/views/pages/locations/pages/safety/pages/location-safety-hazardous-materials/LocationSafetyHazardousMaterials'
import LocationSafetyLockOutTagOut from 'src/views/pages/locations/pages/safety/pages/location-safety-lock-out-tag-out/LocationSafetyLockOutTagOut'

const LocationSafetyTab = () => {
  const dispatch = useDispatch()
  const locationSafetyState = useSelector((state) => state.locationSafety)

  const tabsContent = [
    {
      title: 'Hazard and Precautions',
      element: (
        <LocationSafetyHazardAndPrecautions
          mode={locationSafetyState?.selectedAppAction}
          setAction={(param) => dispatch(locationSafetyActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationSafetyActions.setSelectedAppIndex(param))}
          visible={locationSafetyState?.visiblePopUp}
          setVisible={(param) => dispatch(locationSafetyActions.setVisiblePopUp(param))}
          isRefetchList={locationSafetyState?.isRefetchList}
          setIsRefetchList={(param) => dispatch(locationSafetyActions.setIsRefetchList(param))}
        />
      ),
    },
    {
      title: 'Hazardous Materials',
      element: (
        <LocationSafetyHazardousMaterials
          mode={locationSafetyState?.selectedAppAction}
          setAction={(param) => dispatch(locationSafetyActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationSafetyActions.setSelectedAppIndex(param))}
          visible={locationSafetyState?.visiblePopUp}
          setVisible={(param) => dispatch(locationSafetyActions.setVisiblePopUp(param))}
          isRefetchList={locationSafetyState?.isRefetchList}
          setIsRefetchList={(param) => dispatch(locationSafetyActions.setIsRefetchList(param))}
        />
      ),
    },
    {
      title: 'Lock Out / Tag Out',
      element: (
        <LocationSafetyLockOutTagOut
          mode={locationSafetyState?.selectedAppAction}
          setAction={(param) => dispatch(locationSafetyActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationSafetyActions.setSelectedAppIndex(param))}
          visible={locationSafetyState?.visiblePopUp}
          setVisible={(param) => dispatch(locationSafetyActions.setVisiblePopUp(param))}
          isRefetchList={locationSafetyState?.isRefetchList}
          setIsRefetchList={(param) => dispatch(locationSafetyActions.setIsRefetchList(param))}
        />
      ),
    },
  ]

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(locationSafetyActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CCard className="card rounded">
      <CCardBody>
        <TabsSubWrapper
          defaultIndex={locationSafetyState.selectedAppIndex}
          selectedIndex={locationSafetyState.selectedAppIndex}
          content={tabsContent}
          onSelect={(tabIndex) => {
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: tabIndex,
                action: 'Read',
              }),
            )
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default LocationSafetyTab
