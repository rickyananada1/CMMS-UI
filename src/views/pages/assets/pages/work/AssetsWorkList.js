import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { DetailCard } from 'src/components/elements/cards'
import useAssetsWorkList from './hooks/useAssetsWorkList'
import { useGetAssetsWorkTableList } from './services'
import { reformatTimeStamp } from 'src/utils/helper'
import { GoSearch } from 'react-icons/go'
import { DatePicker } from 'src/components/elements/datepicker'
import moment from 'moment'
import CardHeader from 'src/components/elements/cards/CardHeader'

const columns = (handleNavigateToWorkOrder) => [
  {
    header: 'Work Order',
    accessorKey: 'work_order_code',
    qName: 'qWorkOrderCode',
    cell: (row) => (
      <NavLink
        to={'/page/work-order/work-order-tracking'}
        onClick={(e) => handleNavigateToWorkOrder(e, row?.row?.original)}
      >
        {row.getValue() || '-'}
      </NavLink>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'description',
    qName: 'qDescription',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    qName: 'qStatus',
    size: 125,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Status Date',
    accessorKey: 'status_date',
    qName: 'qStatusDate',
    qType: 'date',
    cell: (row) => <div>{row.getValue() ? reformatTimeStamp(row.getValue()) : '-'}</div>,
  },
  {
    header: 'Scheduled Start',
    accessorKey: 'scheduled_start',
    qName: 'qScheduledStart',
    qType: 'date',
    cell: (row) => <div>{row.getValue() ? reformatTimeStamp(row.getValue()) : '-'}</div>,
  },
  {
    header: 'Scheduled Finish',
    accessorKey: 'scheduled_finish',
    qName: 'qScheduledFinish',
    qType: 'date',
    cell: (row) => <div>{row.getValue() ? reformatTimeStamp(row.getValue()) : '-'}</div>,
  },
  {
    header: 'Actual Start',
    accessorKey: 'actual_start',
    qName: 'qActualStart',
    qType: 'date',
    cell: (row) => <div>{row.getValue() ? reformatTimeStamp(row.getValue()) : '-'}</div>,
  },
  {
    header: 'Actual Finish',
    accessorKey: 'actual_finish',
    qName: 'qActualFinish',
    qType: 'date',
    cell: (row) => <div>{row.getValue() ? reformatTimeStamp(row.getValue()) : '-'}</div>,
  },
]

const AssetsWorkList = ({
  mode,
  setAction,
  setTabIndex,
  visible,
  setVisible,
  visibleDownload,
  setVisibleDowload,
}) => {
  const {
    selectedRow,
    tableRef,
    searchDebounce,
    handleSearch,
    handleNavigateToWorkOrder,
    downloadAssetsWork,
    startDate,
    endDate,
    handleRangeChange,
    clearDates,
  } = useAssetsWorkList({
    mode,
    setAction,
    setTabIndex,
    visible,
    setVisible,
    visibleDownload,
    setVisibleDowload,
  })

  return (
    <DetailCard>
      <CardHeader
        description={selectedRow?.asset_description}
        infoFields={[
          { label: 'Assets ID', value: selectedRow?.asset_num },
          { label: 'Site', value: selectedRow?.site },
        ]}
      />
      <hr />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center px-4 py-2 mr-2 border border-solid rounded">
            <input
              placeholder="Search"
              className="text-sm border-none"
              type="text"
              onChange={(e) => {
                handleSearch(e)
              }}
            />
            <GoSearch color="blue" />
          </div>
          <div className="flex items-center px-3 py-2 mr-2 text-sm border border-solid rounded">
            <DatePicker
              isRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleRangeChange}
              onClear={clearDates}
            />
          </div>
        </div>
        <button
          className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
          onClick={downloadAssetsWork}
        >
          <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
          Download
        </button>
      </div>

      <Table
        tableRef={tableRef}
        columns={columns(handleNavigateToWorkOrder)}
        parentId={selectedRow?.asset_id}
        apiController={useGetAssetsWorkTableList}
        query={{
          search: searchDebounce || undefined,
          startDate: startDate !== null ? moment(startDate).format('YYYY-MM-DD') : undefined,
          endDate: endDate !== null ? moment(endDate).format('YYYY-MM-DD') : undefined,
        }}
        isAutoSelectFirstRow={false}
        perPage={25}
        hasAutoNumber
        isWithSearchField
      />
    </DetailCard>
  )
}

export default AssetsWorkList
