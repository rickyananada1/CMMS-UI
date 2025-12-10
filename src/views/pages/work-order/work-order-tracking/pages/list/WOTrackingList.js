import React from 'react'
import { GoSearch } from 'react-icons/go'
import { Table } from 'src/components/elements/table'
import { useList } from './hooks'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { useGetWOTracking } from './services/getWOTracking'
import moment from 'moment'

const columns = [
  {
    header: 'Work Order',
    accessorKey: 'work_order_code',
    qName: 'qWorkOrderCode',
    size: 200,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'description',
    qName: 'qDescription',
    size: 250,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Location',
    accessorKey: 'location',
    qName: 'qLocation',
    size: 250,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Work Type',
    accessorKey: 'work_type',
    qName: 'qWorkType',
  },
  {
    header: 'Assign Person',
    accessorKey: 'assign_person',
    qName: 'qAssignPerson',
    size: 150,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Asset',
    accessorKey: 'asset_num',
    qName: 'qAssetNum',
    size: 250,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'status',
    qName: 'qStatus',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Failure Code',
    accessorKey: 'failure_code',
    qName: 'qFailureCode',
    size: 200,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Scheduled Start',
    accessorKey: 'scheduled_start',
    qName: 'qScheduledStart',
    qType: 'date',
    cell: (row) => {
      const isDateValid = moment(row.getValue()).isValid()
      const date = isDateValid ? moment(row.getValue()).format('DD/MM/YYYY') : '-'
      return <div style={{ width: `${row.column.getSize()}px` }}>{date}</div>
    },
  },
  {
    header: 'Scheduled Finish',
    accessorKey: 'scheduled_finish',
    qName: 'qScheduledFinish',
    qType: 'date',
    cell: (row) => {
      const isDateValid = moment(row.getValue()).isValid()
      const date = isDateValid ? moment(row.getValue()).format('DD/MM/YYYY') : '-'
      return <div style={{ width: `${row.column.getSize()}px` }}>{date}</div>
    },
  },
  {
    header: 'Work Priority',
    accessorKey: 'work_priority',
    qName: 'qWorkPriority',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Site',
    accessorKey: 'site',
    qName: 'qSite',
    size: 150,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
]
const WOTrackingList = () => {
  const {
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadWOTracking,
    resetSelectedTaskEtc,
  } = useList()

  return (
    <div>
      <div className="bg-white p-4 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
              <input
                placeholder="Search"
                className="border-none text-sm"
                type="text"
                onChange={(e) => handleSearch(e)}
              />
              <GoSearch color="blue" />
            </div>
            {/* <button className="flex items-center border rounded border-solid px-3 py-2 text-sm hidden">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button> */}
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadWOTracking}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetWOTracking}
          query={{
            search: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.work_order_id === selectedRow?.work_order_id
          }
          onRowClicked={(row) => {
            console.log('hehehe:', row.original)
            setSelectedRow(row.original)
            resetSelectedTaskEtc()
          }}
          isAutoSelectFirstRow={false}
          hasAutoNumber
          isWithSearchField
        />
      </div>
    </div>
  )
}

export default WOTrackingList
