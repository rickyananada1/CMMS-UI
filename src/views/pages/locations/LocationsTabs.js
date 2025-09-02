import React, { useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import { useSelector, useDispatch } from 'react-redux'
import { locationsActions } from './slices/locationsSlices'
import { locationSafetyActions } from './pages/safety/slices/locationSafetySlices'
import LocationsList from './pages/list/LocationsList'
import Location from './pages/location/Location'
import LocationAssets from './pages/assets/LocationAssets'
import LocationSafetyTab from './pages/safety/LocationSafetyTab'
import LocationsHistory from './pages/history/LocationsHistory'
import LocationMetersIndex from './pages/meters/LocationMetersIndex'
import { breadcrumbActions } from 'src/store/actions'

const LocationsTab = () => {
  const dispatch = useDispatch()
  const locationsState = useSelector((state) => state.locations)
  const locationSafetyState = useSelector((state) => state.locationSafety)

  const tabsContent = [
    {
      title: 'List',
      element: (
        <LocationsList
          mode={locationsState?.selectedAppAction}
          setAction={(param) => dispatch(locationsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationsActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Location',
      disabled: !locationsState?.selectedLocation,
      element: (
        <Location
          mode={locationsState?.selectedAppAction}
          setAction={(param) => dispatch(locationsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationsActions.setSelectedAppIndex(param))}
          visible={locationsState?.visiblePopUp}
          setVisible={(param) => dispatch(locationsActions.setVisiblePopUp(param))}
          visiblePopUpLocationParent={locationsState?.visiblePopUpLocationParent}
          setVisiblePopUpLocationParent={(param) =>
            dispatch(locationsActions.setVisiblePopUpLocationParent(param))
          }
          visiblePopUpLocationChild={locationsState?.visiblePopUpLocationChild}
          setVisiblePopUpLocationChild={(param) =>
            dispatch(locationsActions.setVisiblePopUpLocationChild(param))
          }
          isRefetchDetailLocation={locationsState?.isRefetchDetailLocation}
          setIsRefetchDetailLocation={(param) =>
            dispatch(locationsActions.setIsRefetchDetailLocation(param))
          }
          isRefetchChildLocation={locationsState?.isRefetchChildLocation}
          setIsRefetchChildLocation={(param) =>
            dispatch(locationsActions.setIsRefetchChildLocation(param))
          }
        />
      ),
    },
    {
      title: 'Assets',
      disabled: !locationsState?.selectedLocation,
      element: (
        <LocationAssets
          mode={locationsState?.selectedAppAction}
          setAction={(param) => dispatch(locationsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationsActions.setSelectedAppIndex(param))}
          visible={locationsState?.visiblePopUp}
          setVisible={(param) => dispatch(locationsActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Safety',
      disabled: !locationsState?.selectedLocation,
      element: (
        <LocationSafetyTab
          mode={locationsState?.selectedAppAction}
          setAction={(param) => dispatch(locationsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationsActions.setSelectedAppIndex(param))}
          visible={locationsState?.visiblePopUp}
          setVisible={(param) => dispatch(locationsActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'History',
      disabled: !locationsState?.selectedLocation,
      element: (
        <LocationsHistory
          mode={locationsState?.selectedAppAction}
          setAction={(param) => dispatch(locationsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationsActions.setSelectedAppIndex(param))}
          visible={locationsState?.visiblePopUp}
          setVisible={(param) => dispatch(locationsActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Meters',
      disabled: !locationsState?.selectedLocation,
      element: (
        <LocationMetersIndex
          mode={locationsState?.selectedAppAction}
          setAction={(param) => dispatch(locationsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(locationsActions.setSelectedAppIndex(param))}
          visible={locationsState?.visiblePopUp}
          setVisible={(param) => dispatch(locationsActions.setVisiblePopUp(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Location',
      menu: [
        {
          title: 'New Location',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Create',
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Location',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Location',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Delete',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
          },
        },
        {
          title: 'Add Parent Location',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Read',
              }),
            )
            dispatch(locationsActions.setVisiblePopUpLocationParent(true))
          },
        },
        {
          title: 'Add Child Location',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Read',
              }),
            )
            dispatch(locationsActions.setVisiblePopUpLocationChild(true))
          },
        },
      ],
    },
    /*
    {
      group: 'Assets',
      menu: [
        {
          title: 'New Asset',
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Asset',
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Asset',
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete',
              }),
            )
            dispatch(locationsActions.setVisiblePopUp(true))
          },
        },
      ],
    },
    */
    {
      group: 'Safety Hazard & Precautions',
      menu: [
        {
          title: 'New Hazard & Precautions ',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Create',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Hazard & Precautions',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationSafetyState?.selectedSafety || !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Hazard & Precautions',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Delete',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
            dispatch(locationSafetyActions.setVisiblePopUp(true))
          },
        },
      ],
    },
    {
      group: 'Safety Hazardous Materials',
      menu: [
        /*
        {
          title: 'New Hazard Materials',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Create',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        */
        {
          title: 'Update/Edit Hazardous Materials',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled:
            !locationSafetyState?.selectedSafetyMaterial || !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        /*
        {
          title: 'Delete Hazardous Materials',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Delete',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
            dispatch(locationSafetyActions.setVisiblePopUp(true))
          },
        },
        */
      ],
    },
    {
      group: 'Safety Lock Out / Tag Out',
      menu: [
        {
          title: 'New Lock Out / Tag Out',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Create',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Lock Out / Tag Out',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationSafetyState.selectedSafetyTagOut,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Lock Out / Tag Out',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationSafetyState.selectedSafetyTagOut,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Delete',
              }),
            )
            dispatch(
              locationSafetyActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Meters',
      menu: [
        {
          title: 'Add Meters',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocation,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 5,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Meters',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocationMeter,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 5,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Meters',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocationMeter,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 5,
                action: 'Delete',
              }),
            )
          },
        },
        {
          title: 'Add Measurements',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Locations',
          app_action: 'Update',
          disabled: !locationsState?.selectedLocationMeter,
          action: () => {
            dispatch(
              locationsActions.setSelectedAppIndexAndAction({
                index: 5,
                action: 'Read',
              }),
            )
            dispatch(locationsActions.setVisiblePopUpLocationMeter(true))
          },
        },
      ],
    },
  ]

  useEffect(() => {
    dispatch(
      breadcrumbActions.setBreadcrumbItem({
        name:
          locationsState.selectedAppIndex !== 1
            ? tabsContent[locationsState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationsState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(locationsActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={locationsState.selectedAppIndex}
      selectedIndex={locationsState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          locationsActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
        dispatch(
          breadcrumbActions.setBreadcrumbItem({
            name: tabsContent[tabIndex].title,
            index: 2,
          }),
        )
      }}
    />
  )
}

export default LocationsTab
