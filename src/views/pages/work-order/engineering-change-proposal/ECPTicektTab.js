/* eslint-disable */
/* prettier-ignore-start */

import React, { useState, useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import TicketEcpList from '../engineering-change-proposal/pages/list/TicketEcpList'
import { useDispatch, useSelector } from 'react-redux'
import TicketEcpIndex from '../engineering-change-proposal/pages/engineering-change-proposal/TicketEcpIndex'
import { breadcrumbActions } from 'src/store/actions'
import { ticketEcpActions } from './slices/ticketEcpSlice'

const ECPTicektTab = () => {
  const dispatch = useDispatch()
  const ticketEcpState = useSelector((state) => state.ticketEcp)

    {
    console.log("SELECTED ECP:", ticketEcpState.selectedTicketEcp)
    console.log("ID YANG DIPAKAI:", ticketEcpState.selectedTicketEcp?.ticketid)
  }

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
        ` <div>adsa</div>>`
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

  // Cleanup function to dispatch reset action when component is unmounted
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