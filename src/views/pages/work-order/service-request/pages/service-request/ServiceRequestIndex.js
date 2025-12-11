import React, { Fragment } from 'react'
import ServiceRequestDetails from './ServiceRequestDetail'
import ServiceRequestForm from './ServiceRequestForm'

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
    </Fragment>
  )
}

export default QuickServiceRequestIndex
