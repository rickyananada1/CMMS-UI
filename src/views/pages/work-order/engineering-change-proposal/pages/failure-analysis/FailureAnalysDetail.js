/* eslint-disable */
/* prettier-ignore-start */
import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailCard } from 'src/components/elements/cards'
import CardHeader from 'src/components/elements/cards/CardHeader'
import useFailureAnalys from './hooks/useFailureAnalys'
import DetailFailurTask from './detial-failur/DetailFailurTask'
import { faTaskActions } from '../failure-analysis/slice/failureAnalysSlice'

const FailureAnalysDetail = ({ mode, setAction, setTabIndex, setVisible }) => {
  const dispatch = useDispatch()
  const ticketEcpState = useSelector((state) => state.ticketEcp)

  const {
    data,
    isLoading,
    dataFile,
    selectedFile,
    setSelectedFile,
    setDrawerOpen,
    handleOpenDrawer,
    selectedRow,
    selectedFailureAnalysRow,
    setSelectedFailureAnalysRow,
    isDrawerOpen,
  } = useFailureAnalys(({
    mode,
    setAction,
    setTabIndex,
    setVisible,
  }))

  const [activeDetailType, setActiveDetailType] = useState(null);
  const [drawerType, setDrawerType] = useState(null);

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setActiveDetailType(null);
  };

  const handleOpenDetails = (type) => {
    setActiveDetailType(type);
    handleOpenDrawer();
  };

  useEffect(() => {
    if (activeDetailType) {
      setDrawerType(activeDetailType);
      handleOpenDrawer();
    }
  }, [activeDetailType]);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(faTaskActions.setFailureAnalysisData(data))

      dispatch(faTaskActions.setSelectedFailureAnalysis(data[0]))

      const ticketUuid = selectedRow?.uuid || ticketEcpState?.selectedTicketEcp?.uuid
      if (ticketUuid) {
        localStorage.setItem(
          `failure_analysis_${ticketUuid}`,
          'created'
        )
      }
    } else if (data && data.length === 0) {
      dispatch(faTaskActions.resetFailureAnalysisData())
    }
  }, [data, dispatch, selectedRow?.uuid, ticketEcpState?.selectedTicketEcp?.uuid])

  const fmeaEmpty = !data?.[0]?.fmea_summary && !data?.[0]?.fmea_desc
  const rcfaEmpty = !data?.[0]?.rcfa_summary && !data?.[0]?.rcfa_desc
  const cbaEmpty = !data?.[0]?.cba_summary && !data?.[0]?.cba_desc
  const lccaEmpty = !data?.[0]?.lcca_summary && !data?.[0]?.lcca_desc

  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.[0]?.summary}
          infoFields={[
            { label: 'ECP Number', value: data?.[0]?.ticketid },
            { label: 'Status ECP', value: data?.[0]?.status },
          ]}
        />
        <CContainer fluid>
          <CRow className="flex mt-4 mb-3 justify-content-around gap-8 rounded">
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className={`border rounded max-w-[65px] font-semibold p-[8px] text-center
        ${fmeaEmpty ? 'bg-[#E0E0E0] text-[#7F7F80]' : 'bg-[#E9F1FB] text-[#2671D9]'}
      `}>
                  FMEA
                </div>
                <div className='font-semibold truncate w-80'>{(data?.[0]?.fmea_summary ?? '').trim() || '-'}</div>
                <div className='font-normal text-[#7F7F80] text-sm w-80 h-[60px] overflow-hidden leading-5 line-clamp-3' dangerouslySetInnerHTML={{ __html: (data?.[0]?.fmea_desc ?? '').trim() || '-' }} />
                <CButton disabled={fmeaEmpty} onClick={() => handleOpenDetails('fmea')} className={`border rounded-md border-0 pt-3 pb-3 font-semibold
        ${fmeaEmpty
                    ? '!bg-[#E0E0E0] !text-[#7F7F80] cursor-not-allowed'
                    : 'bg-primary text-white hover:text-white'
                  }
      `}>View Details</CButton>
              </div>
            </CCol>
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className={`border rounded max-w-[65px] font-semibold p-[8px] text-center
        ${rcfaEmpty ? 'bg-[#E0E0E0] text-[#7F7F80]' : 'bg-[#E9F1FB] text-[#2671D9]'}
      `}>
                  RCFA
                </div>
                <div className='font-semibold truncate w-80'>{(data?.[0]?.rcfa_summary ?? '').trim() || '-'}</div>
                <div className='font-normal text-[#7F7F80] text-sm w-80 h-[60px] overflow-hidden leading-5 line-clamp-3' dangerouslySetInnerHTML={{ __html: (data?.[0]?.rcfa_desc ?? '').trim() || '-' }} />
                <CButton disabled={rcfaEmpty} onClick={() => handleOpenDetails('rcfa')} className={`border rounded-md border-0 pt-3 pb-3 font-semibold
        ${rcfaEmpty
                    ? '!bg-[#E0E0E0] !text-[#7F7F80] cursor-not-allowed'
                    : 'bg-primary text-white hover:text-white'
                  }
      `}>View Details</CButton>
              </div>
            </CCol>
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className={`border rounded max-w-[65px] font-semibold p-[8px] text-center
        ${cbaEmpty ? 'bg-[#E0E0E0] text-[#7F7F80]' : 'bg-[#E9F1FB] text-[#2671D9]'}
      `}>
                  CBA
                </div>
                <div className='font-semibold truncate w-80'>{(data?.[0]?.cba_summary ?? '').trim() || '-'}</div>
                <div className='font-normal text-[#7F7F80] text-sm w-80 h-[60px] overflow-hidden leading-5 line-clamp-3' dangerouslySetInnerHTML={{ __html: (data?.[0]?.cba_desc ?? '').trim() || '-' }} />
                <CButton disabled={cbaEmpty} onClick={() => handleOpenDetails('cba')} className={`border rounded-md border-0 pt-3 pb-3 font-semibold
        ${cbaEmpty
                    ? '!bg-[#E0E0E0] !text-[#7F7F80] cursor-not-allowed'
                    : 'bg-primary text-white hover:text-white'
                  }
      `}>View Details</CButton>
              </div>
            </CCol>
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className={`border rounded max-w-[65px] font-semibold p-[8px] text-center
        ${lccaEmpty ? 'bg-[#E0E0E0] text-[#7F7F80]' : 'bg-[#E9F1FB] text-[#2671D9]'}
      `}>
                  LCCA
                </div>
                <div className='font-semibold truncate w-80'>{(data?.[0]?.lcca_summary ?? '').trim() || '-'}</div>
                <div className='font-normal text-[#7F7F80] text-sm w-80 h-[60px] overflow-hidden leading-5 line-clamp-3' dangerouslySetInnerHTML={{ __html: (data?.[0]?.lcca_desc ?? '').trim() || '-' }} />
                <CButton disabled={lccaEmpty} onClick={() => handleOpenDetails('lcca')} className={`border rounded-md border-0 pt-3 pb-3 font-semibold
        ${lccaEmpty
                    ? '!bg-[#E0E0E0] !text-[#7F7F80] cursor-not-allowed'
                    : 'bg-primary text-white hover:text-white'
                  }
      `}>View Details</CButton>
              </div>
            </CCol>
          </CRow>
          <DetailFailurTask
            key={`detail-${activeDetailType || 'closed'}`}
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            files={dataFile}
            selectedFile={selectedFile}
            onSelectFile={(file) => setSelectedFile(file)}
            type={activeDetailType}
            data={data?.[0]} />
        </CContainer>
      </DetailCard>
    </>
  )
}

export default FailureAnalysDetail