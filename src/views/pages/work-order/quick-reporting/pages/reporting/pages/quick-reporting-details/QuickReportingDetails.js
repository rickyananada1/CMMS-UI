import React from 'react'
import { CContainer, CCol, CRow } from '@coreui/react'
import useWorkOrder from './hooks/useWorkOrder'
import { DetailCard } from 'src/components/elements/cards'
import moment from 'moment'
import FailureReportingList from '../quick-reporting-labor-material-tools/pages/failure-reporting/FailureReportingList'
import useTimeFormatter from 'src/hooks/useTimeFormatter'
import CardHeader from 'src/components/elements/cards/CardHeader'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'
import { FaPaperclip } from 'react-icons/fa'

const QuickReportingDetails = ({ mode, setAction, setTabIndex, setVisible }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useWorkOrder({
    mode,
    setAction,
    setTabIndex,
    setVisible,
  })
  const { formatDate, formatDuration } = useTimeFormatter()

  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.description}
          infoFields={[
            { label: 'Work Order', value: data?.work_order_code },
            { label: 'Site', value: data?.site },
            { label: 'Status', value: data?.status },
          ]}
        />
        <CContainer fluid>
          <div className="flex items-center justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              General
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">Work Order</label>
              <br />
              <span className="font-semibold">{data?.work_order_code || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Description</label>
              <br />
              <span className="font-semibold">{data?.description || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Location</label>
              <br />
              <span className="font-semibold">{data?.location || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Location Description</label>
              <br />
              <span className="font-semibold">{data?.location_desc || '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Asset</label>
              <br />
              <span className="font-semibold">{data?.asset_num || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Asset Description</label>
              <br />
              <span className="font-semibold">{data?.asset_desc || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Configuration Item</label>
              <br />
              <span className="font-semibold">{data?.configuration_item_id || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Configuration Item Description</label>
              <br />
              <span className="font-semibold">{data?.configuration_item_description || '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Classification</label>
              <br />
              <span className="font-semibold">{data?.classification || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Reported By</label>
              <br />
              <span className="font-semibold">{data?.created_by || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Reported Date</label>
              <br />
              <span className="font-semibold">
                {data?.created_at
                  ? moment(data?.created_at).format('DD/MM/YYYY HH:mm:ss [WIB]')
                  : '-'}
              </span>
            </CCol>
            <CCol>
              <br />
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Movement Type</label>
              <br />
              <span className="font-semibold">{data?.movement_type_id || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Movement Type Description</label>
              <br />
              <span className="font-semibold">{data?.movement_type_description || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Cost Center</label>
              <br />
              <span className="font-semibold">{data?.cost_center_id || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Cost Center Description</label>
              <br />
              <span className="font-semibold">{data?.cost_center_description || '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Internal Order</label>
              <br />
              <span className="font-semibold">{data?.internal_order_id || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Internal Order Description</label>
              <br />
              <span className="font-semibold">{data?.internal_order_description || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">WBS</label>
              <br />
              <span className="font-semibold">{data?.wbs_id || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">WBS Description</label>
              <br />
              <span className="font-semibold">{data?.wbs_description || '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Assign Person</label>
              <br />
              <span className="font-semibold">{data?.assign_person || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Lead</label>
              <br />
              <span className="font-semibold">{data?.lead || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Work Type</label>
              <br />
              <span className="font-semibold">{data?.work_type || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Work Group</label>
              <br />
              <span className="font-semibold">{data?.workgroup || '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol lg={12}>
              <label className="text-neutral-text-field">Work Priority</label>
              <br />
              <span className="font-semibold capitalize">{data?.work_priority || '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Status</label>
              <br />
              <span className="font-semibold">{data?.status || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Hazard Group</label>
              <br />
              <span className="font-semibold">{data?.hazard_code ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Hazard Group Description</label>
              <br />
              <span className="font-semibold">{data?.hazard_desc ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Site</label>
              <br />
              <span className="font-semibold">{data?.site || '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Parent WO</label>
              <br />
              <span className="font-semibold">{data?.parent_wo || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">GL Account</label>
              <br />
              <span className="font-semibold">{data?.gl_account_id || '-'}</span>
            </CCol>
            <CCol></CCol>
            <CCol></CCol>
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
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Job Details
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">Job Plan</label>
              <br />
              <span className="font-semibold">{data?.plan_name ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Job Plan Description</label>
              <br />
              <span className="font-semibold">{data?.plan_description || '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Preventive Maintenance</label>
              <br />
              <span className="font-semibold">{data?.preventive_maintenance_name ?? '-'}</span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">PM Description</label>
              <br />
              <span className="font-semibold">
                {data?.preventive_maintenance_description || '-'}
              </span>
            </CCol>
          </CRow>
          <div className="flex items-center mt-2 justify-between -mx-2">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Scheduling Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow>
            <CCol>
              <label className="text-neutral-text-field">Scheduled Start</label>
              <br />
              <span className="font-semibold">
                {data?.scheduled_start ? formatDate(data?.scheduled_start) : '-'}
              </span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Scheduled Finish</label>
              <br />
              <span className="font-semibold">
                {data?.scheduled_finish ? formatDate(data?.scheduled_finish) : '-'}
              </span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Actual Start</label>
              <br />
              <span className="font-semibold">
                {data?.actual_start ? formatDate(data?.actual_start) : '-'}
              </span>
            </CCol>
            <CCol>
              <label className="text-neutral-text-field">Actual Finish</label>
              <br />
              <span className="font-semibold">
                {data?.actual_finish ? formatDate(data?.actual_finish) : '-'}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <label className="text-neutral-text-field">Estimated Duration</label>
              <br />
              <span className="font-semibold">
                {data?.scheduled_finish
                  ? formatDuration(
                      moment(data?.scheduled_finish).diff(
                        moment(data?.scheduled_start),
                        'minutes',
                        true,
                      ),
                    )
                  : '-'}
              </span>
            </CCol>
            <CCol md={9}>
              <br />
            </CCol>
          </CRow>
        </CContainer>
      </DetailCard>
      <DetailCard>
        <FailureReportingList mode={mode} setAction={setAction} />
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

export default QuickReportingDetails
