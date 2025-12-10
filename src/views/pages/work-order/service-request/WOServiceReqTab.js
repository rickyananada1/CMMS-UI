/* eslint-disable */
/* prettier-ignore-start */

import React, { useState, useEffect } from 'react'
import { TabsWrapper } from 'src/components/elements/tabs'
import ServiceRequestList from './pages/list/ServiceRequestList'
import { serviceRequestActions } from './slices/serviceRequestSlice'

import { useDispatch, useSelector } from 'react-redux'
import ServiceRequestIndex from './pages/service-request/ServiceRequestIndex'
import { breadcrumbActions } from 'src/store/actions'

const WOServiceReqTab = () => {
  const dispatch = useDispatch()
  const serviceRequestState = useSelector((state) => state.serviceRequest)
  console.log("MODE:", serviceRequestState.selectedAppAction)
  console.log("SELECTED SR:", serviceRequestState.selectedServiceRequest)
  console.log(serviceRequestState, 'serviceRequestState');
  console.log("SERVICE REQUEST STATE:", serviceRequestState);
  const permissions = useSelector((state) => state.auth.permissions)
  console.log('DEBUG permissions:', permissions)
  const handleSimpleCreate = () => {
    console.log("✅ SIMPLE CREATE CLICKED!");
    console.log("Before:", {
      index: serviceRequestState.selectedAppIndex,
      action: serviceRequestState.selectedAppAction
    });

    dispatch(
      serviceRequestActions.setSelectedAppIndexAndAction({
        index: 1,
        action: 'Create',
      }),
    );

    // Check after
    setTimeout(() => {
      console.log("After:", {
        index: serviceRequestState.selectedAppIndex,
        action: serviceRequestState.selectedAppAction
      });
    }, 100);
  };

  const openNewServiceRequest = () => {
    console.log("🎯 Opening New Service Request");
    dispatch(
      serviceRequestActions.setSelectedAppIndexAndAction({
        index: 1,
        action: 'Create',
      }),
    );
  };

  const [activeTab, setActiveTab] = useState(0);

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

  const simpleChooseActionMenu = [
    {
      group: 'TEST',
      menu: [
        {
          title: 'SIMPLE NEW SR',
          action: handleSimpleCreate, // Pakai fungsi yang sama
        },
      ],
    },
  ];

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
  // useEffect(() => {
  //   return () => {
  //     dispatch(serviceRequestActions.resetState())
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])


  return (
    <div>
      <button
        onClick={handleSimpleCreate}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '15px',
          backgroundColor: 'red',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 99999
        }}
      >
        🔴 TEST BUTTON (LUAR MENU)
      </button>

      {/* SIMPLE DEBUG INFO */}
      {/* <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'transparant',
        color: 'white',
        padding: '15px',
        zIndex: 99999,
        border: '3px solid yellow'
      }}>
        <h3>DEBUG INFO</h3>
        <p>Tab Index: {serviceRequestState.selectedAppIndex}</p>
        <p>Action: {serviceRequestState.selectedAppAction}</p>
        <p>Has SR: {serviceRequestState.selectedServiceRequest ? 'YES' : 'NO'}</p>
      </div> */}

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
    </div>
  )
}

export default WOServiceReqTab