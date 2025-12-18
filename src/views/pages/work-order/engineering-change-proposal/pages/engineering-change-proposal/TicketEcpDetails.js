/* eslint-disable */
/* prettier-ignore-start */
import { useSelector } from 'react-redux'
import React from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { CContainer, CCol, CRow } from '@coreui/react'
import useTicketEcp from './hooks/useTicketEcp'
import useTimeFormatter from 'src/hooks/useTimeFormatter'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const TicketEcpDetails = ({ mode, setAction, setTabIndex, setVisible }) => {
   const selectedTicket = useSelector(state => state.ticketEcp.selectedTicketEcp)

  console.log("🟦 SELECTED TICKET:", selectedTicket)
  console.log("🟩 ID DI DETAIL:", selectedTicket?.uuid)
  console.log("🟩 MODE:", mode)
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useTicketEcp({
    mode,
    setAction,
    setTabIndex,
    setVisible,
  })
  const { formatDate } = useTimeFormatter()

  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.description}
          infoFields={[
            { label: 'Service ECP Number', value: data?.ticketid },
            { label: 'Status ECP', value: data?.status },
          ]}
        />
        <CContainer fluid>
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Details
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">ECP Number</label>
              <br />
              <span className="font-semibold">{data?.ticketid ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Summary ECP</label>
              <br />
              <span className="font-semibold">{data?.description ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Status ECP</label>
              <br />
              <span className="font-semibold">{data?.status ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Attachments</label>
              <button
                onClick={handleOpenDrawer}
                className="flex items-center gap-1 text-[#2c74d6] hover:text-[#1b4a89] text-base font-medium underline"
              >
                <FaPaperclip className="w-4 h-4" />
                Attachments
              </button>
            </CCol>
          </CRow>
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Detail Engineering Change Proposal
            </p>
          </div>
          <CRow className="mb-3">
            <div rows={10}
              className="font-normal p-2 h-[300px] border rounded bg-white"
              dangerouslySetInnerHTML={{ __html: data?.detailsummary ?? '-' }}
            />
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <label className="text-neutral-text-field">Asset</label>
              <br />
              <span className="font-semibold">{data?.asset_num ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Asset Description</label>
              <br />
              <span className="font-semibold break-words">{data?.asset_description ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Location</label>
              <br />
              <span className="font-semibold">{data?.location ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Location Description</label>
              <br />
              <span className="font-semibold">{data?.location_description ?? '-'}</span>
            </CCol>
          </CRow>
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Request Submitted
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow className="mb-3">
            <CCol>
              <label className="text-neutral-text-field">Reported By</label>
              <br />
              <span className="font-semibold">{data?.display_name ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Reported Date</label>
              <br />
              <span className="font-semibold">{data?.reportdate ? formatDate(data?.reportdate) : '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Reported Phone</label>
              <br />
              <span className="font-semibold">{data?.phone_number ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Reported E-mail</label>
              <br />
              <span className="font-semibold">{data?.email ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow>
            <CCol md={3}>
              <label className="text-neutral-text-field">Organization</label>
              <br />
              <span className="font-semibold">{data?.organization_name ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Asset Site</label>
              <br />
              <span className="font-semibold">{data?.site ? data?.siteid : '-'}</span>
            </CCol>
          </CRow>
        </CContainer>
      </DetailCard>

      <AttachmentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        files={dataFile}
        selectedFile={selectedFile}
        onSelectFile={(file) => setSelectedFile(file)}
      />
    </>
  )
}

export default TicketEcpDetails
