import React, { useEffect } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { TabsSubWrapper } from 'src/components/elements/tabs/TabsSubWrapper'
import { useSelector, useDispatch } from 'react-redux'
import { assetsSafetyActions } from './slices/assetsSafetySlices'
import AssetsSafetyHazardAndPrecautions from 'src/views/pages/assets/pages/safety/pages/assets-safety-hazard-and-precautions/AssetsSafetyHazardAndPrecautions'
import AssetsSafetyHazardousMaterials from 'src/views/pages/assets/pages/safety/pages/assets-safety-hazardous-materials/AssetsSafetyHazardousMaterials'
import AssetsSafetyLockOutTagOut from 'src/views/pages/assets/pages/safety/pages/assets-safety-lock-out-tag-out/AssetsSafetyLockOutTagOut'

const AssetsSafetyTab = () => {
  const dispatch = useDispatch()
  const assetsSafetyState = useSelector((state) => state.assetsSafety)

  const tabsContent = [
    {
      title: 'Hazard and Precautions',
      element: (
        <AssetsSafetyHazardAndPrecautions
          mode={assetsSafetyState?.selectedAppAction}
          setAction={(param) => dispatch(assetsSafetyActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetsSafetyActions.setSelectedAppIndex(param))}
          visible={assetsSafetyState?.visiblePopUp}
          setVisible={(param) => dispatch(assetsSafetyActions.setVisiblePopUp(param))}
          isRefetchList={assetsSafetyState?.isRefetchList}
          setIsRefetchList={(param) => dispatch(assetsSafetyActions.setIsRefetchList(param))}
        />
      ),
    },
    {
      title: 'Hazardous Materials',
      element: (
        <AssetsSafetyHazardousMaterials
          mode={assetsSafetyState?.selectedAppAction}
          setAction={(param) => dispatch(assetsSafetyActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetsSafetyActions.setSelectedAppIndex(param))}
          visible={assetsSafetyState?.visiblePopUp}
          setVisible={(param) => dispatch(assetsSafetyActions.setVisiblePopUp(param))}
          isRefetchList={assetsSafetyState?.isRefetchList}
          setIsRefetchList={(param) => dispatch(assetsSafetyActions.setIsRefetchList(param))}
        />
      ),
    },
    {
      title: 'Lock Out / Tag Out',
      element: (
        <AssetsSafetyLockOutTagOut
          mode={assetsSafetyState?.selectedAppAction}
          setAction={(param) => dispatch(assetsSafetyActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetsSafetyActions.setSelectedAppIndex(param))}
          visible={assetsSafetyState?.visiblePopUp}
          setVisible={(param) => dispatch(assetsSafetyActions.setVisiblePopUp(param))}
          isRefetchList={assetsSafetyState?.isRefetchList}
          setIsRefetchList={(param) => dispatch(assetsSafetyActions.setIsRefetchList(param))}
        />
      ),
    },
  ]

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(assetsSafetyActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CCard className="card rounded">
      <CCardBody>
        <TabsSubWrapper
          defaultIndex={assetsSafetyState.selectedAppIndex}
          selectedIndex={assetsSafetyState.selectedAppIndex}
          content={tabsContent}
          onSelect={(tabIndex) => {
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
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

export default AssetsSafetyTab
