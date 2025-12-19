/* eslint-disable */
/* prettier-ignore-start */

import React from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { CContainer, CCol, CRow } from '@coreui/react'
import useServiceReq from '../service-request/hooks/useServiceReq'
import TableServiceReqDetail from './TableServiceReqDetail'
import useTimeFormatter from 'src/hooks/useTimeFormatter'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const ServiceRequestDetail = ({ mode, setAction, setTabIndex, setVisible }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useServiceReq({
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
            { label: 'Service Reques', value: data?.ticketid },
            { label: 'Status SR', value: data?.status },
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
              <label className="text-neutral-text-field">Service Request</label>
              <br />
              <span className="font-semibold">{data?.ticketid ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Summary Service Request</label>
              <br />
              <span className="font-semibold">{data?.description ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Status SR</label>
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
              Detail Service Request
            </p>
          </div>
          <CRow>
            <div rows={10}
              className="font-normal p-2 h-[300px] border rounded bg-white overflow-auto"
              dangerouslySetInnerHTML={{ __html: data?.detailsummary ?? '-' }}
            />
          </CRow>
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Service Request Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow className="mb-3">
            <CCol>
              <label className="text-neutral-text-field">Asset</label>
              <br />
              <span className="font-semibold">{data?.assetnum ?? '-'}</span>
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
          <CRow className="mb-3">
            {/* <CCol>
              <label className="text-neutral-text-field">Configuration Item</label>
              <br />
              <span className="font-semibold">(851) 080-9409</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Configuration Item Description</label>
              <br />
              <span className="font-semibold">99</span>
            </CCol> */}
            <CCol md={3}>
              <label className="text-neutral-text-field">GL Account</label>
              <br />
              <span className="font-semibold">{data?.glaccount ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Asset Site</label>
              <br />
              <span className="font-semibold">{data?.site ?? '-'}</span>
            </CCol>
          </CRow>
          {/* <CRow className="mb-3">
            <CCol md={3}>
              <label className="text-neutral-text-field">Classification</label>
              <br />
              <span className="font-semibold">(981) 266-5326</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Classification Description</label>
              <br />
              <span className="font-semibold">65</span>
            </CCol>
          </CRow> */}
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Date
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow className="mb-3">
            <CCol md={3}>
              <label className="text-neutral-text-field">Target Contact</label>
              <br />
              <span className="font-semibold">{data?.targetcontact ? formatDate(data?.targetcontact) : '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Target Start</label>
              <br />
              <span className="font-semibold">{data?.targetstart ? formatDate(data?.targetstart) : '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Target Finisih</label>
              <br />
              <span className="font-semibold">{data?.targetfinish ? formatDate(data?.targetfinish) : '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={3}>
              <label className="text-neutral-text-field">Actual Contact</label>
              <br />
              <span className="font-semibold">{data?.actualcontact ? formatDate(data?.actualcontact) : '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Actual Start</label>
              <br />
              <span className="font-semibold">{data?.actualstart ? formatDate(data?.actualstart) : '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Actual Finisih</label>
              <br />
              <span className="font-semibold">{data?.actualfinish ? formatDate(data?.actualfinish) : '-'}</span>
            </CCol>
          </CRow>
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Request Submited
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">Reported By</label>
              <br />
              <span className="font-semibold">{data?.reportedby ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Reported Date</label>
              <br />
              <span className="font-semibold">{data?.reportdate ? formatDate(data?.reportdate) : '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Affected User</label>
              <br />
              <span className="font-semibold">{data?.affectedperson ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Affected Date</label>
              <br />
              <span className="font-semibold">{data?.affecteddate ? formatDate(data?.affecteddate) : '-'}</span>
            </CCol>
          </CRow>
        </CContainer>
      </DetailCard>

      <TableServiceReqDetail />

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

export default ServiceRequestDetail
