import React, { useEffect } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { TabsSubWrapper } from 'src/components/elements/tabs/TabsSubWrapper'
import useActualTab from './hooks/useActualsTab'
import ChildernOfWorkOrder from './pages/childern-of-wo/ChildernOfWorkOrder'
import TaskForWorkOrder from './pages/task-for-wo/TaskForWorkOrder'
import LaborMaterialTools from './pages/labor-materials-tools/LaborMaterialsTools'
import { useDispatch, useSelector } from 'react-redux'
import { woLaborActions } from '../plans/pages/labor-materials-tools/slices/woLaborSlices'
import { woToolsActions } from '../plans/pages/labor-materials-tools/slices/woToolsSlices'
import { woMaterialsActions } from '../plans/pages/labor-materials-tools/slices/woMaterialsSlices'

const WOActualsTab = (props) => {
  const dispatch = useDispatch()

  const { selectedTab, setSelectedTab } = useActualTab()

  const woTrackingState = useSelector((state) => state.woTracking)
  const woTaskState = useSelector((state) => state.woTask)

  const tabsContent = [
    {
      title: 'Children of Work Order',
      disabled: woTrackingState?.selectedAppAction !== 'Read',
      element: <ChildernOfWorkOrder mode={props?.mode} setAction={props?.setAction} />,
    },
    {
      title: 'Task for Work Order',
      disabled: woTrackingState?.selectedAppAction !== 'Read',
      element: <TaskForWorkOrder mode={props?.mode} setAction={props?.setAction} />,
    },
    {
      title: 'Labor, Materials, and Tools',
      disabled: woTrackingState?.selectedAppAction !== 'Read' || !woTaskState?.selectedGroup,
      element: <LaborMaterialTools mode={props?.mode} setAction={props?.setAction} />,
    },
  ]

  // Cleanup function to dispatch reset action when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(woLaborActions.resetState())
      dispatch(woMaterialsActions.resetState())
      dispatch(woToolsActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CCard className="card rounded mb-8">
      <CCardBody>
        <TabsSubWrapper
          defaultIndex={selectedTab}
          selectedIndex={selectedTab}
          content={tabsContent}
          onSelect={(tabIndex) => {
            setSelectedTab(tabIndex)
          }}
        />
      </CCardBody>
    </CCard>
  )
}

export default WOActualsTab
