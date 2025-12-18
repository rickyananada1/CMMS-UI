import React, { Fragment } from 'react'
import TicketEcpDetail from './TicketEcpDetails'
import TicketEcpForm from './TicketEcpForm'

const TicketEcpIndex = ({ mode, setAction, setTabIndex, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <TicketEcpDetail
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <TicketEcpForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
    </Fragment>
  )
}

export default TicketEcpIndex
