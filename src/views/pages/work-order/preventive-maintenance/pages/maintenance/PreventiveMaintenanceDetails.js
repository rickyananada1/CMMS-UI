import React from 'react'
import UsePreventiveMaintenance from './Hooks/usePreventiveMaintenance'
import { DetailCard } from 'src/components/elements/cards'
import { CCol, CContainer, CRow } from '@coreui/react'
import StatusComponent from '../list/components/StatusComponent'
import CardHeader from 'src/components/elements/cards/CardHeader'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'
import { FaPaperclip } from 'react-icons/fa'

const PreventiveMaintenanceDetails = ({ mode, setAction, setTabIndex }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = UsePreventiveMaintenance({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.preventive_maintenance_description}
          infoFields={[
            { label: 'PM', value: data?.preventive_maintenance_name },
            { label: 'Site', value: data?.site },
          ]}
        />
        <CContainer fluid>
          <div className="flex items-center justify-between mt-2 -mx-2">
            <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
              Details
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol md={3}>
              <label className="text-neutral-text-field">Preventive Maintenance</label>
              <br />
              <span className="font-semibold">{data?.preventive_maintenance_name ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Preventive Maintenance Description</label>
              <br />
              <span className="font-semibold">
                {data?.preventive_maintenance_description ?? '-'}
              </span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Location</label>
              <br />
              <span className="font-semibold">{data?.location ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Location Description</label>
              <br />
              <span className="font-semibold">{data?.location_description ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol md={3}>
              <label className="text-neutral-text-field">Asset</label>
              <br />
              <span className="font-semibold">{data?.asset_num ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Asset Description</label>
              <br />
              <span className="font-semibold">{data?.asset_description ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Status</label>
              <br />
              <StatusComponent status={data?.status} />
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

          <div className="flex items-center justify-between my-2 -mx-2">
            <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
              Work Order Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol md={3}>
              <label className="text-neutral-text-field">Job Plan</label>
              <br />
              <span className="font-semibold">{data?.plan_name ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Job Plan Description</label>
              <br />
              <span className="font-semibold">{data?.plan_description ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Work Type</label>
              <br />
              <span className="font-semibold">{data?.work_type ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Work Order Status</label>
              <br />
              <span className="font-semibold">{data?.work_order_status ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol md={3}>
              <label className="text-neutral-text-field">Last Start Date</label>
              <br />
              <span className="font-semibold">{data?.last_start_date ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Last Completion Date</label>
              <br />
              <span className="font-semibold">{data?.last_completion_date ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Earliest Next Date</label>
              <br />
              <span className="font-semibold">{data?.earliest_next_date ?? '-'}</span>
            </CCol>
          </CRow>
          <div className="flex items-center justify-between my-2 -mx-2">
            <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
              Resource Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol md={3}>
              <label className="text-neutral-text-field">GL Account</label>
              <br />
              <span className="font-semibold">{data?.gl_account ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">GL Account Description</label>
              <br />
              <span className="font-semibold">{data?.gl_account_desc ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Storeroom Site</label>
              <br />
              <span className="font-semibold">{data?.storeroom_site ?? '-'}</span>
            </CCol>
            <CCol md={3}>
              <label className="text-neutral-text-field">Storeroom Site Description</label>
              <br />
              <span className="font-semibold">{data?.storeroom_desc ?? '-'}</span>
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

export default PreventiveMaintenanceDetails
