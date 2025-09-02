import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TabsWrapper } from 'src/components/elements/tabs'
import { failureCodesActions } from './slices/failureCodesSlices'
import FailureCodesList from './pages/list/FailureCodesList'
import FailureCode from './pages/failurecode/FailureCode'
import { breadcrumbActions } from 'src/store/actions'

const FailureCodesTabs = () => {
  const dispatch = useDispatch()
  const failureCodesState = useSelector((state) => state.failureCodes)

  const tabsContent = [
    {
      title: 'List',
      element: (
        <FailureCodesList
          mode={failureCodesState?.selectedAppAction}
          setAction={(param) => dispatch(failureCodesActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(failureCodesActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Failure Code',
      disabled: !failureCodesState?.selectedFailureCode,
      element: (
        <FailureCode
          mode={failureCodesState?.selectedAppAction}
          setAction={(param) => dispatch(failureCodesActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(failureCodesActions.setSelectedAppIndex(param))}
          visible={failureCodesState?.visiblePopUp}
          setVisible={(param) => dispatch(failureCodesActions.setVisiblePopUp(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Failure Codes',
      menu: [
        {
          title: 'New Failure Codes',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Failure Codes',
          app_action: 'Create',
          action: () => {
            dispatch(
              failureCodesActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Failure Codes',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Failure Codes',
          app_action: 'Update',
          disabled: !failureCodesState?.selectedFailureCode,
          action: () => {
            dispatch(
              failureCodesActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Failure Codes',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Failure Codes',
          app_action: 'Delete',
          disabled: !failureCodesState?.selectedFailureCode,
          action: () => {
            dispatch(
              failureCodesActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
          },
        },
        {
          title: 'Create Remedy',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Failure Codes',
          app_action: 'Update',
          disabled: !failureCodesState?.selectedCauses,
          action: () => {
            dispatch(
              failureCodesActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Remedies',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Remedy',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Failure Codes',
          app_action: 'Update',
          disabled: !failureCodesState?.selectedRemedies,
          action: () => {
            dispatch(
              failureCodesActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'UpdateRemedies',
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
          failureCodesState.selectedAppIndex !== 1
            ? tabsContent[failureCodesState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failureCodesState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(failureCodesActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={failureCodesState.selectedAppIndex}
      selectedIndex={failureCodesState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          failureCodesActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default FailureCodesTabs
