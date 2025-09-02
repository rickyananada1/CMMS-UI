import React from 'react'
import useGroups from './hooks/useGroups'
import { CCol, CContainer, CRow } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const SecurityGroupGroupDetails = ({ mode, setAction, setTabIndex }) => {
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
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.security_group_description}
          infoFields={[{ label: 'Group', value: data?.security_group_code }]}
        />
        <hr />
        <CContainer fluid>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">Group</label>
              <br />
              <span className="font-semibold">{data?.security_group_code ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Group Description</label>
              <br />
              <span className="font-semibold">{data?.security_group_description ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Start Center Template</label>
              <br />
              <span className="font-semibold">{data?.start_center_template ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Start Center Template Description</label>
              <br />
              <span className="font-semibold">{data?.start_center_template_desc || '-'}</span>
            </CCol>
          </CRow>

          <CRow className="mt-4">
            <CCol sm={3}>
              <label className="text-neutral-text-field mb-2">Independent of Other Groups?</label>
              <br />
              <img
                src={data?.independent_group ? CheckTag : XTag}
                width={15}
                height={15}
                alt={data?.independent_group}
              />
            </CCol>
            <CCol sm={9}>
              <label className="text-neutral-text-field mb-2">Authorize Group for All Sites?</label>
              <br />
              <img
                src={data?.authorized_all_sites ? CheckTag : XTag}
                width={15}
                height={15}
                alt={data?.authorized_all_sites}
              />
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

export default SecurityGroupGroupDetails
