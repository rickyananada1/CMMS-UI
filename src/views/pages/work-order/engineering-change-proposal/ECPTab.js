/* eslint-disable */
/* prettier-ignore-start */

import React, { useState, useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import ServiceRequestList from '../service-request/pages/list/ServiceRequestList'
import { serviceRequestActions } from '../service-request/slices/serviceRequestSlice'

import { useDispatch, useSelector } from 'react-redux'
import ServiceRequestIndex from '../service-request/pages/service-request/ServiceRequestIndex'
import { breadcrumbActions } from 'src/store/actions'

const ECPTab = () => {
  const dispatch = useDispatch()
  const serviceRequestState = useSelector((state) => state.serviceRequest)

  const tabsContent = [
    {
      title: 'List',
      // element: <ServiceRequestList  onGoToServiceRequest={() => setActiveTab(1)} />,
      element: <ServiceRequestList />,
    },
    {
      title: 'Service Request',
      // element: <ServiceRequestIndex />,
      disabled: !serviceRequestState?.selectedServiceRequest,
      element: (
        <ServiceRequestIndex
          mode={serviceRequestState?.selectedAppAction}
          setAction={(param) => dispatch(serviceRequestActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(serviceRequestActions.setSelectedAppIndex(param))}
          setVisible={(param) => dispatch(serviceRequestActions.setVisiblePopUp(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Service Request',
      menu: [
        {
          title: 'New Service Request',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Service Request',
          app_action: 'Create',
          action: () => {
            console.log("CREATE CLICKED!")
            dispatch(
              serviceRequestActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Service Request',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Service Request',
          app_action: 'Update',
          disabled: !serviceRequestState?.selectedServiceRequest,
          action: () => {
            dispatch(
              serviceRequestActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Service Request',
          modul_name: 'Work Order',
          app_group: 'Work Order',
          app_name: 'Service Request',
          app_action: 'Delete',
          disabled: !serviceRequestState?.selectedServiceRequest,
          action: () => {
            dispatch(
              serviceRequestActions.setSelectedAppIndexAndAction({
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
          serviceRequestState.selectedAppIndex !== 1
            ? tabsContent[serviceRequestState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceRequestState.selectedAppIndex])

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(serviceRequestActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <TabsWrapper
      defaultIndex={serviceRequestState.selectedAppIndex}
      selectedIndex={serviceRequestState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          serviceRequestActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default ECPTab