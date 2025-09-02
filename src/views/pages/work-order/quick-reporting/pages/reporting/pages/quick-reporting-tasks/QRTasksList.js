import React, { Fragment } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Table } from 'src/components/elements/table'
import { useDeleteQRTask, useGetQRTask } from './services'
import useTaskForWorkOrderList from './hooks/useQRTaskList'
import { DetailCard } from 'src/components/elements/cards'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import useTimeFormatter from 'src/hooks/useTimeFormatter'
import moment from 'moment'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import CardHeader from 'src/components/elements/cards/CardHeader'

const QRTasksList = ({ mode, setAction }) => {
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
    <>
      <DetailCard>
        <CardHeader
          description={selectedRow?.description}
          infoFields={[
            { label: 'Work Order', value: selectedRow?.work_order_code },
            { label: 'Site', value: selectedRow?.site },
            { label: 'Status', value: selectedRow?.status },
          ]}
        />
        <div className="flex items-center justify-between mt-3">
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
          apiController={useGetQRTask}
          parentId={selectedRow?.work_order_id}
          query={{ search: searchDebounce || undefined }}
          hasAutoNumber
          tableSubComponent={(row) => ExpandedComponent(row, selectedRow)}
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
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedTaskRow}
          data_id={selectedTaskRow?.work_order_task_id}
          data_name={selectedTaskRow?.task}
          data_parent_id={selectedRow?.work_order_id}
          deleteService={useDeleteQRTask}
          tableRef={tableRef}
        />
      )}
    </>
  )
}

const ExpandedComponent = (row, selectedRow) => {
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
          <p className="text-body-bold">{data?.sequence || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Task</label>
          <p className="text-body-bold">{data?.task || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Task Description</label>
          <p className="text-body-bold">{data?.description || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Status</label>
          <p className="text-body-bold">{data?.status || '-'}</p>
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
          <p className="text-body-bold">{data?.location || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Location Description</label>
          <p className="text-body-bold">{data?.location_description || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Asset</label>
          <p className="text-body-bold">{data?.asset_num || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Asset Description</label>
          <p className="text-body-bold">{data?.asset_description || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Inspector</label>
          <p className="text-body-bold">{data?.inspector || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Measurement Point</label>
          <p className="text-body-bold">{data?.measurement_point || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Measurement Value</label>
          <p className="text-body-bold">{data?.measurement_value || '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Measurement Date</label>
          <p className="text-body-bold">
            {data?.measurement_date ? formatDate(data?.measurement_date) : '-'}
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
            {data?.target_start ? formatDate(data?.target_start) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Target Finish</label>
          <p className="text-body-bold">
            {data?.target_finish ? formatDate(data?.target_finish) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Scheduled Start</label>
          <p className="text-body-bold">
            {data?.scheduled_start ? formatDate(data?.scheduled_start) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Scheduled Finish</label>
          <p className="text-body-bold">
            {data?.scheduled_finish ? formatDate(data?.scheduled_finish) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Start No Earlier Than</label>
          <p className="text-body-bold">
            {data?.start_no_earlier_than ? formatDate(data?.start_no_earlier_than) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Finish No Later Than</label>
          <p className="text-body-bold">
            {data?.finish_no_later_than ? formatDate(data?.finish_no_later_than) : '-'}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4">
        <div>
          <label className="font-light text-body-small">Actual Start</label>
          <p className="text-body-bold">
            {data?.actual_start ? formatDate(data?.actual_start) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Actual Finish</label>
          <p className="text-body-bold">
            {data?.actual_finish ? formatDate(data?.actual_finish) : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Estimated Duration</label>
          <p className="text-body-bold">
            {data?.duration_in_minute ? formatDuration(data?.duration_in_minute) : '-'}
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
    accessorKey: 'description',
    enableSorting: false,
    qName: 'qSummary',
  },
  {
    header: 'Estimated Duration',
    accessorKey: 'duration_in_minute',
    enableSorting: false,
    qName: 'qDurationInMinute',
    cell: (row) => {
      return <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue()} minutes</div>
    },
  },
  {
    header: 'Measurement Point',
    accessorKey: 'measurement_point',
    enableSorting: false,
    qName: 'qMeasurementPoint',
  },
  {
    header: 'Measurement Value',
    accessorKey: 'measurement_value',
    enableSorting: false,
    qName: 'qMeasurementValue',
  },
  {
    header: 'Measurement Date',
    accessorKey: 'measurement_date',
    enableSorting: false,
    qName: 'qMeasurementDate',
    type: 'date',
    size: 200,
    cell: (row) => {
      const isDateValid = moment(row.getValue()).isValid()
      const date = isDateValid ? moment(row.getValue()).format('DD/MM/YYYY hh:mm [WIB]') : '-'
      return <div style={{ width: `${row.column.getSize()}px` }}>{date}</div>
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    enableSorting: false,
    qName: 'qStatus',
  },
]

export default QRTasksList
