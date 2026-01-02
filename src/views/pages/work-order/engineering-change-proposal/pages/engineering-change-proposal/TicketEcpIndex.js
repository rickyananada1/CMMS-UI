/* eslint-disable */
/* prettier-ignore-start */
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faTaskActions } from '../failure-analysis/slice/failureAnalysSlice'
import TicketEcpDetail from './TicketEcpDetails'
import TicketEcpForm from './TicketEcpForm'

const TicketEcpIndex = ({ mode, setAction, setTabIndex, setVisible }) => {
  const dispatch = useDispatch()
  const selectedTicket = useSelector((state) => state.ticketEcp?.selectedTicketEcp)
  
  useEffect(() => {
    if (!selectedTicket?.uuid) {
      dispatch(faTaskActions.setHasData(false))
      dispatch(faTaskActions.setFailureAnalysisData([]))
      return
    }
    
    const cacheKey = `failure_analysis_${selectedTicket.uuid}`
    const cached = localStorage.getItem(cacheKey)
    
    const hasData = cached === 'created' || cached === 'updated'
    
    dispatch(faTaskActions.setHasData(hasData))
    
    if (hasData) {
      dispatch(faTaskActions.setFailureAnalysisData([{
        ticket_uuid: selectedTicket.uuid,
        hasData: true,
        fromCache: true
      }]))
    } else {
      dispatch(faTaskActions.setFailureAnalysisData([]))
    }
    
  }, [dispatch, selectedTicket?.uuid])

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
