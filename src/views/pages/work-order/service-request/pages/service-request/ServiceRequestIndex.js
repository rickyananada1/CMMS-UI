/* eslint-disable */
/* prettier-ignore-start */

import React, { Fragment } from 'react'
// import useServiceRequestIndex from './'
import ServiceRequestDetails from './ServiceRequestDetail'
import ServiceRequestForm from './ServiceRequestForm'
import ServiceGrid from './ServiceGrid'
import PreviewFile from './DetailFailureAnalysis'

const QuickServiceRequestIndex = ({ mode, setAction, setTabIndex, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <ServiceRequestDetails
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <ServiceRequestForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
      {/* <ServiceGrid />
      <PreviewFile /> */}
    </Fragment>
  )
}

export default QuickServiceRequestIndex
