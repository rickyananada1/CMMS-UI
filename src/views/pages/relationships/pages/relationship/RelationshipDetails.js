import React from 'react'
import { CContainer, CCol, CRow } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import useRelationship from './hooks/useRelationship'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const RelationshipDetails = ({ mode, setAction, setTabIndex }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useRelationship({
    mode,
    setAction,
    setTabIndex,
  })
  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.asset_description}
          infoFields={[{ label: 'Asset', value: data?.asset_num }]}
        />
        <hr />
        <CContainer fluid>
          <CRow>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Asset</label>
              <br />
              <span className="font-semibold">{data?.asset_num ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Asset Description</label>
              <br />
              <span className="font-semibold">{data?.asset_description ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Location</label>
              <br />
              <span className="font-semibold">{data?.location ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Location Description</label>
              <br />
              <span className="font-semibold">{data?.location_description ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol sm={3}>
              <label className="text-neutral-text-field">Relation to Asset</label>
              <br />
              <span className="font-semibold">{data?.related_asset_num ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Relation to Asset Description</label>
              <br />
              <span className="font-semibold">{data?.related_asset_description ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Relation to Location</label>
              <br />
              <span className="font-semibold">{data?.related_location ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Relation to Location Description</label>
              <br />
              <span className="font-semibold">{data?.related_location_description ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol sm={3}>
              <label className="text-neutral-text-field">Relation Name</label>
              <br />
              <span className="font-semibold">{data?.relation_name ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Relation Type</label>
              <br />
              <span className="font-semibold">{data?.relation_type ?? '-'}</span>
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

export default RelationshipDetails
