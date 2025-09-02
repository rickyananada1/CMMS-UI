import React, { Fragment } from 'react'
import WOTrackingDetails from './WOTrackingDetails'
import WOTrackingForm from './WOTrackingForm'

const WOTrackingIndex = ({ mode, setAction, setTabIndex, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <WOTrackingDetails
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <WOTrackingForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
    </Fragment>
  )
}

export default WOTrackingIndex
