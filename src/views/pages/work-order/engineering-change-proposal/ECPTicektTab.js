/* eslint-disable */
/* prettier-ignore-start */

import React, { useState, useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import TicketEcpList from '../engineering-change-proposal/pages/list/TicketEcpList'
import { useDispatch, useSelector } from 'react-redux'
import TicketEcpIndex from '../engineering-change-proposal/pages/engineering-change-proposal/TicketEcpIndex'
import FailureAnalysIndex from '../engineering-change-proposal/pages/failure-analysis/FailureAnalysIndex'
import { breadcrumbActions } from 'src/store/actions'
import { ticketEcpActions } from './slices/ticketEcpSlice'
import { faTaskActions } from '../engineering-change-proposal/pages/failure-analysis/slice/failureAnalysSlice'

const ECPTicektTab = () => {
  const dispatch = useDispatch()
  const ticketEcpState = useSelector((state) => state.ticketEcp)
  const faTaskState = useSelector((state) => state.faTask)

  const [activeTabIndex, setActiveTabIndex] = useState(ticketEcpState.selectedAppIndex)

  const hasFailureAnalysisData = React.useMemo(() => {
    if (faTaskState?.data?.length > 0) {
      const firstItem = faTaskState.data[0]

      const hasContent =
        (firstItem.fmea_summary && firstItem.fmea_summary.trim() !== '' && firstItem.fmea_summary.trim() !== '-') ||
        (firstItem.fmea_desc && firstItem.fmea_desc.trim() !== '' && firstItem.fmea_desc.trim() !== '-') ||
        (firstItem.rcfa_summary && firstItem.rcfa_summary.trim() !== '' && firstItem.rcfa_summary.trim() !== '-') ||
        (firstItem.rcfa_desc && firstItem.rcfa_desc.trim() !== '' && firstItem.rcfa_desc.trim() !== '-') ||
        (firstItem.cba_summary && firstItem.cba_summary.trim() !== '' && firstItem.cba_summary.trim() !== '-') ||
        (firstItem.cba_desc && firstItem.cba_desc.trim() !== '' && firstItem.cba_desc.trim() !== '-') ||
        (firstItem.lcca_summary && firstItem.lcca_summary.trim() !== '' && firstItem.lcca_summary.trim() !== '-') ||
        (firstItem.lcca_desc && firstItem.lcca_desc.trim() !== '' && firstItem.lcca_desc.trim() !== '-')

      return hasContent
    }

    return false
  }, [faTaskState])

  useEffect(() => {
    setActiveTabIndex(ticketEcpState.selectedAppIndex)
  }, [ticketEcpState.selectedAppIndex])

  const tabsContent = [
    {
      title: 'List',
      element: <TicketEcpList />,
    },
    {
      title: 'Engineering Change Proposal',
      disabled: !ticketEcpState?.selectedTicketEcp,
      element: (
        <TicketEcpIndex
          mode={ticketEcpState?.selectedAppAction}
          setAction={(param) => dispatch(ticketEcpActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(ticketEcpActions.setSelectedAppIndex(param))}
          setVisible={(param) => dispatch(ticketEcpActions.setVisiblePopUp(param))}
        />
      ),
    },
    {
      title: 'Failure Analysis',
      disabled: !ticketEcpState?.selectedTicketEcp,
      element: (
        <FailureAnalysIndex
          mode={ticketEcpState?.selectedAppAction}
          setAction={(param) => dispatch(ticketEcpActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(ticketEcpActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Failure Defense Task',
      disabled: !ticketEcpState?.selectedTicketEcp,
      element: (
        ` <div>hahaha</div>>`
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Engineering Change Proposal',
      menu: [
        {
          title: 'New Engineering Change Proposal',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Engineering Change Proposal',
          app_action: 'Create',
          action: () => {
            dispatch(
              ticketEcpActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Engineering Change Proposal',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Engineering Change Proposal',
          app_action: 'Update',
          disabled: !ticketEcpState?.selectedTicketEcp,
          action: () => {
            dispatch(
              ticketEcpActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Engineering Change Proposal',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Engineering Change Proposal',
          app_action: 'Delete',
          disabled: !ticketEcpState?.selectedTicketEcp,
          action: () => {
            dispatch(
              ticketEcpActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
    {
      group: 'Failure Analysis',
      menu: [
        {
          title: 'Create Failure Analysis',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Engineering Change Proposal',
          app_action: 'Create',
         disabled: !ticketEcpState?.selectedTicketEcp || 
                   activeTabIndex !== 2 || 
                   hasFailureAnalysisData,
          action: () => {
            dispatch(
              ticketEcpActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update Failure Analysis',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Engineering Change Proposal',
          app_action: 'Update',
         disabled: !ticketEcpState?.selectedTicketEcp || 
                   activeTabIndex !== 2 || 
                   !hasFailureAnalysisData,
          action: () => {
            dispatch(
              ticketEcpActions.setSelectedAppIndexAndAction({
                index: 2,
                action: 'Update',
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
          ticketEcpState.selectedAppIndex !== 1
            ? tabsContent[ticketEcpState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketEcpState.selectedAppIndex])

  useEffect(() => {
    return () => {
      dispatch(ticketEcpActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <TabsWrapper
      defaultIndex={ticketEcpState.selectedAppIndex}
      selectedIndex={ticketEcpState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          ticketEcpActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default ECPTicektTab