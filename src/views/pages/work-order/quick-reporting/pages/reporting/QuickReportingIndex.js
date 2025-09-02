import React from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { TabsSubWrapper } from 'src/components/elements/tabs/TabsSubWrapper'
import { useSelector } from 'react-redux'
import useQuickReportingIndex from './hooks/useQuickReportingIndex'
import QRDetailsIndex from './pages/quick-reporting-details/QRDetailsIndex'
import QRTasksIndex from './pages/quick-reporting-tasks/QRTasksIndex'
import QRLaborMaterialTools from './pages/quick-reporting-labor-material-tools/QRLaborMaterialsTools'

const QuickReportingIndex = (props) => {
  const { selectedTab, setSelectedTab } = useQuickReportingIndex()

  const quickReportingState = useSelector((state) => state.quickReporting)

  const tabsContent = [
    {
      title: 'Details',
      disabled: quickReportingState?.selectedAppAction !== 'Read',
      element: (
        <QRDetailsIndex
          mode={props?.mode}
          setAction={props?.setAction}
          setTabIndex={props?.setTabIndex}
        />
      ),
    },
    {
      title: 'Tasks',
      disabled: quickReportingState?.selectedAppAction !== 'Read',
      element: <QRTasksIndex mode={props?.mode} setAction={props?.setAction} />,
    },
    {
      title: 'Labor, Materials, and Tools',
      disabled:
        quickReportingState?.selectedAppAction !== 'Read' || !quickReportingState?.selectedTask,
      element: <QRLaborMaterialTools mode={props?.mode} setAction={props?.setAction} />,
    },
  ]

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

export default QuickReportingIndex
