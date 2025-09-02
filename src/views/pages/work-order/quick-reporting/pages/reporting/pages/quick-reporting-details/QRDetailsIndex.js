import React, { Fragment } from 'react'
import QuickReportingDetails from './QuickReportingDetails'
import QuickReportingForm from './QuickReportingForm'
import FailureReportingsForm from '../quick-reporting-labor-material-tools/pages/failure-reporting/FailureReportingForm'

const QRDetailsIndex = ({ mode, setAction, setTabIndex, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete' || mode === 'Delete Failure') && (
        <QuickReportingDetails
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <QuickReportingForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Create Failure' || mode === 'Update Failure') && (
        <FailureReportingsForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default QRDetailsIndex
