import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import useChildOfWorkOrderList from './hooks/useChildOfWorkOrderList'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { DetailCard } from 'src/components/elements/cards'
import CheckTag from '../../../../../../../../assets/icons/check-tag.svg'
import XTag from '../../../../../../../../assets/icons/x-tag.svg'
import useTimeFormatter from 'src/hooks/useTimeFormatter'
import { useDeleteChildOfWorkOrder, useGetChildOfWorkOrder } from './services'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ChildernOfWorkOrderList = ({ mode, setAction }) => {
  const {
    tableRef,
    selectedRow,
    selectedChildernRow,
    setSelectedChildernRow,
    downloadChildren,
    setSearch,
    searchDebounce,
  } = useChildOfWorkOrderList()

  return (
    <>
      <DetailCard>
        <CardHeader
          description={selectedRow?.description}
          infoFields={[
            { label: 'Work Order', value: selectedRow?.work_order_code },
            { label: 'Parent WO', value: selectedRow?.parent_wo },
            { label: 'Site', value: selectedRow?.site },
            { label: 'Status', value: selectedRow?.status },
          ]}
        />
        <div className="flex items-center justify-between mt-3">
          <InputGlobalSearch onChange={setSearch} />
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadChildren}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetChildOfWorkOrder}
          parentId={selectedRow?.work_order_id}
          query={{ search: searchDebounce || undefined }}
          hasAutoNumber
          tableSubComponent={ExpandedComponent}
          canExpand={true}
          selectableRowSelected={(row) =>
            row.original?.work_order_plan_id === selectedChildernRow?.work_order_plan_id
          }
          onRowClicked={(row) => {
            setSelectedChildernRow(row.original)
          }}
          isWithSearchField
        />
      </DetailCard>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedChildernRow}
          data_id={selectedChildernRow?.work_order_plan_id}
          data_name={selectedChildernRow?.work_order_code}
          data_parent_id={selectedRow?.work_order_id}
          deleteService={useDeleteChildOfWorkOrder}
        />
      )}
    </>
  )
}

const ExpandedComponent = (row) => {
  const data = row.row?.original
  const { formatDate, formatDuration } = useTimeFormatter()

  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="flex items-center justify-between mt-2">
        <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
          Child information
        </p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="font-light text-body-small">Sequence</label>
          <p className="text-body-bold">{data?.sequence ? data.sequence : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Record</label>
          <p className="text-body-bold">{data?.work_order_code ? data.work_order_code : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Record Description</label>
          <p className="text-body-bold">{data?.description ? data.description : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Priority</label>
          <p className="text-body-bold">{data?.work_priority ? data.work_priority : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Location</label>
          <p className="text-body-bold">{data?.location_id ? data.location : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Location Description</label>
          <p className="text-body-bold">{data?.location_desc ? data.location_desc : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Asset</label>
          <p className="text-body-bold">{data?.asset_id ? data.asset_num : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Asset Description</label>
          <p className="text-body-bold">{data?.asset_desc ? data.asset_desc : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Job Plan</label>
          <p className="text-body-bold">{data?.job_plan_id ? data.job_plan_name : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Job Plan Description</label>
          <p className="text-body-bold">
            {data?.job_plan_description ? data.job_plan_description : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Status</label>
          <p className="text-body-bold">{data?.status ? data.status : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">GL Account</label>
          <p className="text-body-bold">{data?.gl_account_id ? data.gl_account_id : '-'}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
          Scheduling information
        </p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4 my-3">
        {/* <div>
          <label className="font-light text-body-small">Target Start</label>
          <p className="text-body-bold">
            {data?.target_start ? formatDate(data.target_start) : '-'}
          </p>
        </div> */}
        {/* <div>
          <label className="font-light text-body-small">Target Finish</label>
          <p className="text-body-bold">
            {data?.target_finish ? formatDate(data.target_finish) : '-'}
          </p>
        </div> */}
        <div>
          <label className="font-light text-body-small">Scheduled Start</label>
          <p className="text-body-bold">
            {data?.scheduled_start ? formatDate(data.scheduled_start) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Scheduled Finish</label>
          <p className="text-body-bold">
            {data?.scheduled_finish ? formatDate(data.scheduled_finish) : '-'}
          </p>
        </div>
        {/* <div>
          <label className="font-light text-body-small">Start No Earlier Than</label>
          <p className="text-body-bold">
            {data?.start_no_earlier_than ? formatDate(data.start_no_earlier_than) : '-'}
          </p>
        </div> */}
        {/* <div>
          <label className="font-light text-body-small">Finish No Later Than</label>
          <p className="text-body-bold">
            {data?.finish_no_later_than ? formatDate(data.finish_no_later_than) : '-'}
          </p>
        </div> */}
        <div>
          <label className="font-light text-body-small">Actual Start</label>
          <p className="text-body-bold">
            {data?.actual_start ? formatDate(data.actual_start) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Actual Finish</label>
          <p className="text-body-bold">
            {data?.actual_finish ? formatDate(data.actual_finish) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Duration</label>
          <p className="text-body-bold">
            {data?.duration_in_minute ? formatDuration(data.duration_in_minute) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Time Remaining</label>
          <p className="text-body-bold">
            {data?.time_remaining ? formatDate(data.time_remaining) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Predecessor</label>
          <p className="text-body-bold">
            {data?.predecessor ? formatDuration(data.predecessor) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Include Tasks in Schedule</label>
          <div className="mt-2">
            <img
              src={data?.include_tasks_in_schedule ? CheckTag : XTag}
              width={15}
              height={15}
              alt={data?.assets_have_hazard_materials}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const columns = [
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
    header: 'Sequence',
    accessorKey: 'sequence',
    enableSorting: false,
    qName: 'qSequence',
  },
  {
    header: 'Record',
    accessorKey: 'work_order_code',
    enableSorting: false,
    qName: 'qWorkOrderCode',
  },
  {
    header: 'Record Class',
    accessorKey: 'classification',
    enableSorting: false,
    qName: 'qClassification',
  },
  {
    header: 'Summary',
    accessorKey: 'description',
    enableSorting: false,
    qName: 'qDescription',
  },
  {
    header: 'Location',
    accessorKey: 'location',
    enableSorting: false,
    qName: 'qLocation',
  },
  {
    header: 'Asset',
    accessorKey: 'asset_num',
    enableSorting: false,
    qName: 'qAssetNum',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    qName: 'qStatus',
  },
]

export default ChildernOfWorkOrderList
