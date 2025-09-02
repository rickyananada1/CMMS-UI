import React, { Fragment } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Table } from 'src/components/elements/table'
import { useGetTaskForWorkOrder } from './services'
import useTaskForWorkOrderList from './hooks/useTaskForWorkOrderList'
import { DetailCard } from 'src/components/elements/cards'
import useTimeFormatter from '../../hooks/useTimeFormatter'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import CardHeader from 'src/components/elements/cards/CardHeader'

const TaskForWorkOrderList = () => {
  const {
    tableRef,
    selectedRow,
    selectedTaskRow,
    setSelectedTaskRow,
    downloadTask,
    setSearch,
    searchDebounce,
  } = useTaskForWorkOrderList()

  return (
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
      <div className="flex items-center justify-between">
        <InputGlobalSearch onChange={setSearch} />
        <button
          className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
          onClick={downloadTask}
        >
          <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
          Download
        </button>
      </div>
      <Table
        tableRef={tableRef}
        columns={columns}
        apiController={useGetTaskForWorkOrder}
        parentId={selectedRow?.work_order_id}
        query={{ search: searchDebounce || undefined }}
        hasAutoNumber
        tableSubComponent={ExpandedComponent}
        canExpand={true}
        selectableRowSelected={(row) =>
          row.original?.work_order_task_id === selectedTaskRow?.work_order_task_id
        }
        onRowClicked={(row) => {
          setSelectedTaskRow(row.original)
        }}
        isWithSearchField
      />
    </DetailCard>
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
          Task information
        </p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4">
        <div>
          <label className="font-light text-body-small">Sequence</label>
          <p className="text-body-bold">{data?.sequence ? data.sequence : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Task</label>
          <p className="text-body-bold">{data?.task ? data.task : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Task Description</label>
          <p className="text-body-bold">{data?.description ? data.description : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Status</label>
          <p className="text-body-bold">{data?.status ? data.status : '-'}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
          Work Reference information
        </p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4">
        <div>
          <label className="font-light text-body-small">Location</label>
          <p className="text-body-bold">{data?.location_id ? data.location_id : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Location Description</label>
          <p className="text-body-bold">
            {data?.location_description ? data.location_description : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Asset</label>
          <p className="text-body-bold">{data?.asset_id ? data.asset_id : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Asset Description</label>
          <p className="text-body-bold">{data?.asset_description ? data.asset_description : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Inspector</label>
          <p className="text-body-bold">{data?.inspector ? data.inspector : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Measurement Point</label>
          <p className="text-body-bold">{data?.measurement_point ? data.measurement_point : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Measurement Value</label>
          <p className="text-body-bold">{data?.measurement_value ? data.measurement_value : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Measurement Date</label>
          <p className="text-body-bold">
            {data?.measurement_date ? formatDate(data.measurement_date) : '-'}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
          Scheduling information
        </p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4">
        <div>
          <label className="font-light text-body-small">Target Start</label>
          <p className="text-body-bold">
            {data?.target_start ? formatDate(data.target_start) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Target Finish</label>
          <p className="text-body-bold">
            {data?.target_finish ? formatDate(data.target_finish) : '-'}
          </p>
        </div>
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
        <div>
          <label className="font-light text-body-small">Start No Earlier Than</label>
          <p className="text-body-bold">
            {data?.start_no_earlier_than ? formatDate(data.start_no_earlier_than) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Finish No Later Than</label>
          <p className="text-body-bold">
            {data?.finish_no_later_than ? formatDate(data.finish_no_later_than) : '-'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4">
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
          <label className="font-light text-body-small">Estimated Duration</label>
          <p className="text-body-bold">
            {data?.duration_in_minute ? formatDuration(data.duration_in_minute) : '-'}
          </p>
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
    header: 'Task',
    accessorKey: 'task',
    enableSorting: false,
    qName: 'qTask',
  },
  {
    header: 'Summary',
    accessorKey: 'summary',
    enableSorting: false,
    qName: 'qSummary',
  },
  {
    header: 'Estimated Duration',
    accessorKey: 'duration_in_minute',
    enableSorting: false,
    qName: 'qDurationInMinute',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    qName: 'qStatus',
  },
]

export default TaskForWorkOrderList
