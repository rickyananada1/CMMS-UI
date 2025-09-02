import React from 'react'
import useGroups from './hooks/useMeters'
import { CCol, CContainer, CRow } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const MetersDetails = ({ mode, setAction, setTabIndex }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useGroups({ mode, setAction, setTabIndex })

  return (
    <>
      <DetailCard className="pb-0 mb-0" isLoading={isLoading}>
        <CardHeader
          description={data?.meter_description}
          infoFields={[
            { label: 'Meter', value: data?.meter_name },
            { label: 'Meter Type', value: data?.meter_type },
          ]}
        />
        <hr />
        <CContainer fluid>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">Meter</label>
              <br />
              <span className="font-semibold">{data?.meter_name ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Meter Description</label>
              <br />
              <span className="font-semibold">{data?.meter_description ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Meter Type</label>
              <br />
              <span className="font-semibold capitalize">{data?.meter_type ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Meter Type Description</label>
              <br />
              <span className="font-semibold capitalize">{data?.meter_type ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol sm={3}>
              <label className="text-neutral-text-field">Reading Type</label>
              <br />
              <span className="font-semibold">{data?.meter_reading_type_value ?? '-'}</span>
            </CCol>
            <CCol sm={9}>
              <label className="text-neutral-text-field">Reading Type Description</label>
              <br />
              <span className="font-semibold">{data?.meter_reading_type_description ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Domain</label>
              <br />
              <span className="font-semibold">{data?.domain ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Domain Description</label>
              <br />
              <span className="font-semibold">{data?.domain_description ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Unit of Meassure</label>
              <br />
              <span className="font-semibold">{data?.uom_name ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Unit of Meassure Description</label>
              <br />
              <span className="font-semibold">{data?.uom_description ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol md={12} className="mb-3">
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

export default MetersDetails
