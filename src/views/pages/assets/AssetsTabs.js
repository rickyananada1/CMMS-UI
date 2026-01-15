import React, { useState, useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import AssetLists from './pages/list/AssetLists'
import AssetsInfo from './pages/assets/page/AssetsInfo'
import AssetsSafetyTab from './pages/safety/AssetsSafetyTab'
import AssetsSpareParts from './pages/spare-parts/AssetsSpareParts'
import AssetsRelation from './pages/relation/AssetsRelation'
import AssetsWork from './pages/work/AssetsWork'
import { useDispatch, useSelector } from 'react-redux'
import { assetActions } from './slices/assetSlices'
import { assetsSafetyActions } from './pages/safety/slices/assetsSafetySlices'
import AssetsMetersIndex from './pages/meters/AssetsMetersIndex'
import { breadcrumbActions } from 'src/store/actions'

const AssetsTabs = () => {
  const dispatch = useDispatch()
  const assetState = useSelector((state) => state.assets)
  const assetsSafetyState = useSelector((state) => state.assetsSafety)
  const [visible, setVisible] = useState(false)
  const [visibleDownload, setVisibleDownload] = useState(false)

  const tabsContent = [
    {
      title: 'List',
      element: <AssetLists />,
    },
    {
      title: 'Assets',
      disabled: !assetState?.selectedAsset,
      element: (
        <AssetsInfo
          mode={assetState?.selectedAppAction}
          setAction={(param) => dispatch(assetActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetActions.setSelectedAppIndex(param))}
          visible={visible}
          setVisible={setVisible}
        />
      ),
    },
    {
      title: 'Spare Parts',
      disabled: !assetState?.selectedAsset,
      element: (
        <AssetsSpareParts
          mode={assetState?.selectedAppAction}
          setAction={(param) => dispatch(assetActions.setSelectedAppAction(param))}
        />
      ),
    },
    {
      title: 'Safety',
      disabled: !assetState?.selectedAsset,
      element: (
        <AssetsSafetyTab
          action={assetState?.selectedAppAction}
          setAction={(param) => dispatch(assetActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetActions.setSelectedAppIndex(param))}
          visible={visible}
          setVisible={setVisible}
        />
      ),
    },
    {
      title: 'Meters',
      disabled: !assetState?.selectedAsset,
      element: (
        <AssetsMetersIndex
          mode={assetState?.selectedAppAction}
          setAction={(param) => dispatch(assetActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetActions.setSelectedAppIndex(param))}
          visible={assetState?.visiblePopUp}
          setVisible={(param) => dispatch(assetActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Relation',
      disabled: !assetState?.selectedAsset,
      element: (
        <AssetsRelation
          mode={assetState?.selectedAppAction}
          setAction={(param) => dispatch(assetActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetActions.setSelectedAppIndex(param))}
          visible={visible}
          setVisible={setVisible}
        />
      ),
    },
    {
      title: 'Work',
      disabled: !assetState?.selectedAsset,
      element: (
        <AssetsWork
          mode={assetState?.selectedAppAction}
          setAction={(param) => dispatch(assetActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(assetActions.setSelectedAppIndex(param))}
          visible={assetState.visiblePopUp}
          setVisible={(param) => dispatch(assetActions.setVisiblePopUp(param))}
          visibleDownload={visibleDownload}
          setVisibleDownload={setVisibleDownload}
          isRefetchList={assetState.isRefetchList}
          setIsRefetchList={(param) => dispatch(assetActions.setIsRefetchList(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Assets',
      menu: [
        {
          title: 'New Assets',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Create',
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Assets',
          disabled: !assetState?.selectedAsset,
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Assets',
          disabled: !assetState?.selectedAsset,
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Delete',
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
          },
        },
        {
          title: 'Duplicate Assets',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Create',
          disabled: !assetState?.selectedAsset,
          action: () => {
            setVisible(true)
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Duplicate',
              }),
            )
          },
        },
        {
          title: 'Move/Modify Assets',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            setVisible(true)
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Move',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Spare Parts',
      menu: [
        {
          title: 'New Spare Parts',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Spare Parts',
          to: 'create',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Spare Parts',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Safety Hazard & Precautions',
      menu: [
        {
          title: 'New Hazard & Precautions',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Create',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
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
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetsSafetyState?.selectedSafety,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
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
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetsSafetyState?.selectedSafety,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Delete',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
            dispatch(assetsSafetyActions.setVisiblePopUp(true))
          },
        },
      ],
    },
    /*
    {
      group: 'Safety Hazard Materials',
      menu: [
        {
          title: 'New Hazard Materials',
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Create',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Hazard Materials',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetsSafetyState?.selectedSafetyMaterial,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Hazard Materials',
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Delete',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
            dispatch(assetsSafetyActions.setVisiblePopUp(true))
          },
        },
      ],
    },
    */
    {
      group: 'Safety Lock Out Tag Out',
      menu: [
        {
          title: 'New Lock Out Tag Out',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Create',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Lock Out Tag Out',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetsSafetyState?.selectedSafetyTagOut,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Update',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Lock Out Tag Out',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetsSafetyState?.selectedSafetyTagOut,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 3,
                action: 'Delete',
              }),
            )
            dispatch(
              assetsSafetyActions.setSelectedAppIndexAndAction({
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
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 4,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Meters',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAssetMeter,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 4,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Meters',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAssetMeter,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 4,
                action: 'Delete',
              }),
            )
          },
        },
        {
          title: 'Add Measurements',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAssetMeter,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 4,
                action: 'Read',
              }),
            )
            dispatch(assetActions.setVisiblePopUpAssetMeter(true))
          },
        },
      ],
    },
    {
      group: 'Relation',
      menu: [
        {
          title: 'New Relation',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 5,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Relation',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedRelation,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 5,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Relation',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedRelation,
          action: () => {
            setVisible(true)
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 5,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Work',
      menu: [
        {
          title: 'New Work',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Assets',
          app_action: 'Update',
          disabled: !assetState?.selectedAsset,
          action: () => {
            dispatch(
              assetActions.setSelectedAppIndexAndAction({
                index: 6,
                action: 'Create',
              }),
            )
          },
        },
      ],
    },
  ]

  useEffect(() => {
    dispatch(
      breadcrumbActions.setBreadcrumbItem({
        name:
          assetState.selectedAppIndex !== 1
            ? tabsContent[assetState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(assetActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={assetState.selectedAppIndex}
      selectedIndex={assetState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          assetActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default AssetsTabs
