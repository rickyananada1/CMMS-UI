import { CCol, CContainer, CRow } from '@coreui/react'
import React, { Fragment } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import useConditionMonitoringDetail from './hooks/useConditionMonitoringDetail'
import { TableClient } from 'src/components/elements/table'
import { CiWarning } from 'react-icons/ci'
import moment from 'moment'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const ExpandedComponentMeasurement = (row) => {
  const data = row.row?.original
  return (
    <div className="flex p-5">
      <div className="col-12">
        <CRow>
          <CCol md={12} className="mb-3">
            <h5 className="w-full font-semibold">Details</h5>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <label className="text-neutral-text-field">Measurement Date</label>
            <br />
            <span className="font-semibold">
              {data?.measurement_date !== ''
                ? moment(data?.measurement_date).format('DD-MM-YYYY HH:mm:ss')
                : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <label className="text-neutral-text-field">Measurement</label>
            <br />
            <span className="font-semibold">
              {data?.measurement !== '' ? data?.measurement : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <label className="text-neutral-text-field">Observation</label>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.observation !== '' ? data?.observation : '-'}
            </span>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

const ExpandedComponentHistory = (row) => {
  const data = row.row?.original
  return (
    <div className="flex p-5">
      <div className="col">
        <CRow>
          <CCol md={12} className="mb-3">
            <h5 className="w-full font-semibold">Details</h5>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <label className="text-neutral-text-field">Work Order</label>
            <br />
            <span className="font-semibold">
              {data?.work_order_code !== '' ? data?.work_order_code : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <label className="text-neutral-text-field">Description</label>
            <br />
            <span className="font-semibold">
              {data?.work_order_desc !== '' ? data?.work_order_desc : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <label className="text-neutral-text-field">Effective Date</label>
            <br />
            <span className="font-semibold">
              {data?.effective_date !== ''
                ? moment(data?.effective_date).format('DD-MM-YYYY HH:mm:ss')
                : '-'}
            </span>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

const ExpandedComponentCharacter = (row) => {
  const data = row.row?.original
  return (
    <div className="col-12 p-5">
      <CRow>
        <CCol md={12} className="mb-3">
          <h5 className="w-full font-semibold">Details</h5>
        </CCol>
        <CCol sm={12} md={3} className="mb-3">
          <label className="text-neutral-text-field">Value</label>
          <br />
          <span className="font-semibold">{data?.value ? data?.value : '-'}</span>
        </CCol>
        <CCol sm={12} md={3} className="mb-3">
          <label className="text-neutral-text-field">PM</label>
          <br />
          <span className="font-semibold">{data?.pm ? data?.pm : '-'} </span>
        </CCol>
        <CCol sm={12} md={3} className="mb-3">
          <label className="text-neutral-text-field">Job Plan</label>
          <br />
          <span className="font-semibold text-capitalize">
            {data?.job_plan ? data?.job_plan : '-'}
          </span>
        </CCol>
        <CCol sm={12} md={3} className="mb-3">
          <label className="text-neutral-text-field">Priority</label>
          <br />
          <span className="font-semibold">{data?.priority ? data?.priority : '-'}</span>
        </CCol>
      </CRow>
    </div>
  )
}

const ConditionMonitoringDetail = ({ mode, setTabIndex }) => {
  const {
    tableRef,
    data,
    isLoading,
    selectedRow,
    tableRefCharacter,
    isError,
    errorMessage,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useConditionMonitoringDetail({
    mode,
    setTabIndex,
  })

  const columnsMeasurement = [
    {
      header: ' ',
      size: 10,
      cell: ({ row }) => {
        return (
          <Fragment>
            {row.getCanExpand() && (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer', padding: '10px' },
                }}
              >
                {row.getIsExpanded() ? (
                  <IoIosArrowUp className="w-5 h-5" />
                ) : (
                  <IoIosArrowDown className="w-5 h-5" />
                )}
              </button>
            )}
          </Fragment>
        )
      },
    },
    {
      header: 'Measurements Date',
      accessorKey: 'measurement_date',
      cell: (row) => {
        return <span>{moment(row.getValue()).format('DD-MM-YYYY HH:mm:ss')}</span>
      },
    },
    {
      header: 'Measurements',
      accessorKey: 'measurement',
    },
    {
      header: 'Observation',
      accessorKey: 'observation',
    },
  ]

  const columnsHistory = [
    {
      header: ' ',
      size: 10,
      cell: ({ row }) => {
        return (
          <Fragment>
            {row.getCanExpand() && (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer', padding: '10px' },
                }}
              >
                {row.getIsExpanded() ? (
                  <IoIosArrowUp className="w-5 h-5" />
                ) : (
                  <IoIosArrowDown className="w-5 h-5" />
                )}
              </button>
            )}
          </Fragment>
        )
      },
    },
    {
      header: 'Work Order',
      accessorKey: 'work_order_code',
    },
    {
      header: 'Description',
      accessorKey: 'work_order_desc',
    },
    {
      header: 'Effective Date',
      accessorKey: 'effective_date',
      cell: (row) => {
        return <span>{moment(row.getValue()).format('DD-MM-YYYY HH:mm:ss')}</span>
      },
    },
  ]

  const columnsCharacter = [
    {
      header: ' ',
      size: 10,
      cell: ({ row }) => {
        return (
          <Fragment>
            {row.getCanExpand() && (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer', padding: '10px' },
                }}
              >
                {row.getIsExpanded() ? (
                  <IoIosArrowUp className="w-5 h-5" />
                ) : (
                  <IoIosArrowDown className="w-5 h-5" />
                )}
              </button>
            )}
          </Fragment>
        )
      },
    },
    {
      header: 'Value',
      accressorKey: 'value',
      cell: (row) => {
        const data = row.row.original
        return data.value ? data.value : '-'
      },
    },
    {
      header: 'PM',
      accressorKey: 'pm',
      cell: (row) => {
        const data = row.row.original
        return data.pm_name ? data.pm_name : '-'
      },
    },
    {
      header: 'Job Plan',
      accressorKey: 'job_plan',
      cell: (row) => {
        const data = row.row.original
        return data.job_plan_name ? data.job_plan_name : '-'
      },
    },
    {
      header: 'Priority',
      accressorKey: 'priority',
      cell: (row) => {
        const data = row.row.original
        return data.priority ? data.priority : '-'
      },
    },
  ]

  return (
    <>
      <DetailCard isLoading={isLoading}>
        {isError ? (
          <CContainer fluid>
            <div className="flex justify-center items-center text-lg font-bold text-[#b03434]">
              <CiWarning className="h-10 w-10" />
              {errorMessage}
            </div>
          </CContainer>
        ) : (
          <CContainer fluid>
            <CardHeader
              description={selectedRow?.point_description}
              infoFields={[{ label: 'Points', value: selectedRow?.point_num }]}
            />
            <hr />
            <CRow>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Point</label>
                <br />
                <span className="font-semibold">
                  {data?.condition_monitoring_detail?.point_num !== ''
                    ? data?.condition_monitoring_detail?.point_num
                    : '-'}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Description Point</label>
                <br />
                <span className="font-semibold">
                  {data?.condition_monitoring_detail?.point_description !== ''
                    ? data?.condition_monitoring_detail?.point_description
                    : '-'}{' '}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Location</label>
                <br />
                <span className="font-semibold text-capitalize">
                  {data?.condition_monitoring_detail?.location !== ''
                    ? data?.condition_monitoring_detail?.location
                    : '-'}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Description Location</label>
                <br />
                <span className="font-semibold text-capitalize">
                  {data?.condition_monitoring_detail?.location_description !== ''
                    ? data?.condition_monitoring_detail?.location_description
                    : '-'}
                </span>
              </CCol>

              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Asset</label>
                <br />
                <span className="font-semibold">
                  {data?.condition_monitoring_detail?.asset_num !== ''
                    ? data?.condition_monitoring_detail?.asset_num
                    : '-'}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Description Asset</label>
                <br />
                <span className="font-semibold">
                  {data?.condition_monitoring_detail?.asset_description !== ''
                    ? data?.condition_monitoring_detail?.asset_description
                    : '-'}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Meter</label>
                <br />
                <span className="font-semibold text-capitalize">
                  {data?.condition_monitoring_detail?.meter_name !== ''
                    ? data?.condition_monitoring_detail?.meter_name
                    : '-'}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Description Meter</label>
                <br />
                <span className="font-semibold text-capitalize">
                  {data?.condition_monitoring_detail?.meter_description !== ''
                    ? data?.condition_monitoring_detail?.meter_description
                    : '-'}
                </span>
              </CCol>

              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Site</label>
                <br />
                <span className="font-semibold">
                  {data?.condition_monitoring_detail?.site !== ''
                    ? data?.condition_monitoring_detail?.site
                    : '-'}{' '}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Meter Type</label>
                <br />
                <span className="font-semibold">
                  {data?.condition_monitoring_detail?.meter_type !== ''
                    ? data?.condition_monitoring_detail?.meter_type
                    : '-'}
                </span>
              </CCol>
              <CCol sm={12} md={3} className="mb-3">
                <label className="text-neutral-text-field">Unit Of Measure</label>
                <br />
                <span className="font-semibold text-capitalize">
                  {data?.condition_monitoring_detail?.uom_name !== ''
                    ? data?.condition_monitoring_detail?.uom_name
                    : '-'}
                </span>
              </CCol>
              <CCol sm={12} className="mb-3">
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
            {(data?.condition_monitoring_detail?.meter_type === 'gauge' ||
              data?.condition_monitoring_detail?.meter_type === 'continuous') && (
              <Fragment>
                <hr />
                <CRow>
                  <CCol md={12} className="mb-3">
                    <h5 className="w-full font-semibold">Upper Limits</h5>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Upper Warning Limit</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.upper_warning_limit !== ''
                        ? data?.limit_point_data?.upper_warning_limit
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Upper Action Limit</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.upper_action_limit !== ''
                        ? data?.limit_point_data?.upper_action_limit
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Upper Limit PM</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.upper_pm_name !== ''
                        ? data?.limit_point_data?.upper_pm_name
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Upper Limit PM Description</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.upper_limit_pm_description !== ''
                        ? data?.limit_point_data?.upper_limit_pm_description
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Upper Limit Job Plan</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.upper_plan_name !== ''
                        ? data?.limit_point_data?.upper_plan_name
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">
                      Upper Limit Job Plan Description
                    </label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.upper_limit_job_plan_description !== ''
                        ? data?.limit_point_data?.upper_limit_job_plan_description
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Upper Limit Priority</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.upper_limit_priority !== ''
                        ? data?.limit_point_data?.upper_limit_priority
                        : '-'}
                    </span>
                  </CCol>
                </CRow>
                <hr />
                <CRow>
                  <CCol md={12} className="mb-3">
                    <h5 className="w-full font-semibold">Lower Limits</h5>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Lower Warning Limit</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.lower_warning_limit !== ''
                        ? data?.limit_point_data?.lower_warning_limit
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Lower Action Limit</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.lower_action_limit !== ''
                        ? data?.limit_point_data?.lower_action_limit
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Lower Limit PM</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.lower_pm_name !== ''
                        ? data?.limit_point_data?.lower_pm_name
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Lower Limit PM Description</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.lower_limit_pm_description !== ''
                        ? data?.limit_point_data?.lower_limit_pm_description
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Lower Limit Job Plan</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.lower_plan_name !== ''
                        ? data?.limit_point_data?.lower_plan_name
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">
                      Lower Limit Job Plan Description
                    </label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.lower_limit_job_plan_description !== ''
                        ? data?.limit_point_data?.lower_limit_job_plan_description
                        : '-'}
                    </span>
                  </CCol>
                  <CCol sm={12} md={3} className="mb-3">
                    <label className="text-neutral-text-field">Lower Limit Priority</label>
                    <br />
                    <span className="font-semibold text-capitalize">
                      {data?.limit_point_data?.lower_limit_priority !== ''
                        ? data?.limit_point_data?.lower_limit_priority
                        : '-'}
                    </span>
                  </CCol>
                </CRow>
              </Fragment>
            )}
            {data?.condition_monitoring_detail?.meter_type === 'characteristic' && (
              <Fragment>
                <hr />
                <CCol md={12} className="mb-3">
                  <h5 className="w-full font-semibold">Characteristic Action</h5>
                </CCol>
                <TableClient
                  tableRef={tableRefCharacter}
                  columns={columnsCharacter}
                  content={data?.characteristic_action_values}
                  canExpand={true}
                  tableSubComponent={ExpandedComponentCharacter}
                />
              </Fragment>
            )}
            <Fragment>
              <hr />
              <CCol md={12} className="my-3">
                <h5 className="w-full font-semibold">Measurements</h5>
              </CCol>
              <TableClient
                tableRef={tableRef}
                columns={columnsMeasurement}
                content={data?.measurement}
                canExpand={true}
                tableSubComponent={ExpandedComponentMeasurement}
              />
            </Fragment>
            <Fragment>
              <CCol md={12} className="my-3">
                <h5 className="w-full font-semibold">History</h5>
              </CCol>
              <TableClient
                tableRef={tableRef}
                columns={columnsHistory}
                content={data?.history}
                canExpand={true}
                tableSubComponent={ExpandedComponentHistory}
              />
            </Fragment>
          </CContainer>
        )}
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

export default ConditionMonitoringDetail
