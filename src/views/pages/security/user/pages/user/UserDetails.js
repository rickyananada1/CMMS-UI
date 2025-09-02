import React from 'react'
import { CContainer, CCol, CRow } from '@coreui/react'
import useUser from './hooks/useUser'
import { DetailCard } from 'src/components/elements/cards'
import CardHeader from 'src/components/elements/cards/CardHeader'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'
import { FaPaperclip } from 'react-icons/fa'

const UserDetails = ({ mode, setAction, setTabIndex }) => {
  const {
    data,
    isLoading,
    type_options,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useUser({
    mode,
    setAction,
    setTabIndex,
  })
  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.username}
          infoFields={[
            { label: 'User', value: data.display_name },
            { label: 'Status', value: data.is_active ? 'Active' : 'Inactive' },
            {
              label: 'Type',
              value: `${type_options.find((val) => val.value === data?.type)?.label}`,
            },
          ]}
        />
        <CContainer fluid>
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Login Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">Username</label>
              <br />
              <span className="font-semibold">{data.username ?? '-'}</span>
            </CCol>
          </CRow>
          <div className="flex items-center my-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Personal
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Person</label>
              <br />
              <span className="font-semibold">{data?.username ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Status</label>
              <br />
              <span className="font-semibold">{data?.is_active ? 'Active' : 'Inactive'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Supervisor</label>
              <br />
              <span className="font-semibold">{data?.supervisor ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol sm={3}>
              <label className="text-neutral-text-field">Display Name</label>
              <br />
              <span className="font-semibold">{data?.display_name ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Primary Phone</label>
              <br />
              <span className="font-semibold">{data?.phone_number ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Primary Email</label>
              <br />
              <span className="font-semibold">{data?.email ?? '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Organization</label>
              <br />
              <span className="font-semibold">{data?.organization_name ?? '-'}</span>
            </CCol>
          </CRow>
          <div className="flex items-center my-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              User Settings
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Default Insert Site</label>
              <br />
              <span className="font-semibold">{data?.site || data?.site_id || '-'}</span>
            </CCol>
            <CCol sm={3}>
              <label className="text-neutral-text-field">Default Insert Site Description</label>
              <br />
              <span className="font-semibold">{data?.site_description ?? '-'}</span>
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

export default UserDetails
