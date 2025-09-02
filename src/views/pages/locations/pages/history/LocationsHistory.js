import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { useGetLocationsHistory } from './services'
import useLocationHistory from './hooks/useLocationHistory'
import { reformatTimeStamp } from 'src/utils/helper'
import { DatePicker } from 'src/components/elements/datepicker'
import moment from 'moment'

const columns = [
  {
    header: 'Asset',
    columns: [
      {
        header: 'Date',
        accessorKey: 'created_at',
        qName: 'qAssetCreatedAt',
        qType: 'date',
        size: 140,
        cell: (row) => (
          <div style={{ width: `${row.column.getSize()}px` }}>
            {row.getValue() ? reformatTimeStamp(row.getValue()) : '-'}
          </div>
        ),
      },
      { header: 'Asset', accessorKey: 'asset_num', qName: 'qAssetNum' },
      { header: 'Description', accessorKey: 'asset_description', qName: 'qAssetDescription' },
    ],
  },
  {
    header: 'Location',
    columns: [
      {
        header: 'From Location',
        accessorKey: 'from_location',
        qName: 'qLocationFrom',
      },
      {
        header: 'Description Location',
        accessorKey: 'from_location_description',
        qName: 'qLocationFromDescription',
      },
      {
        header: 'To Location',
        accessorKey: 'to_location',
        qName: 'qLocationTo',
      },
      {
        header: 'Description Location',
        accessorKey: 'to_location_description',
        qName: 'qLocationToDescription',
      },
    ],
  },
  {
    header: 'Site',
    columns: [
      {
        header: 'From Site',
        accessorKey: 'from_site',
        qName: 'qSiteFrom',
      },
      {
        header: 'Description Site',
        accessorKey: 'from_site_description',
        qName: 'qSiteFromDescription',
      },
      {
        header: 'To Site',
        accessorKey: 'to_site',
        qName: 'qSiteTo',
      },
      {
        header: 'Description Site',
        accessorKey: 'to_site_description',
        qName: 'qSiteToDescription',
      },
    ],
  },
  {
    header: 'Parent',
    columns: [
      {
        header: 'From Assets',
        accessorKey: 'from_parent_asset_num',
        qName: 'qParentFrom',
      },
      {
        header: 'Description Assets',
        accessorKey: 'from_parent_asset_description',
        qName: 'qParentFromDescription',
      },
      {
        header: 'To Assets',
        accessorKey: 'to_parent_asset_num',
        qName: 'qParentTo',
      },
      {
        header: 'Description Assets',
        accessorKey: 'to_parent_asset_description',
        qName: 'qParentToDescription',
      },
    ],
  },
]

const LocationsList = () => {
  const {
    selectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadLocationHistory,
    startDate,
    endDate,
    handleRangeChange,
    clearDates,
  } = useLocationHistory()

  return (
    <div>
      <div className="p-4 bg-white rounded">
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
            <button className="flex items-center hidden px-3 py-2 text-sm border border-solid rounded">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button>
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
            onClick={downloadLocationHistory}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.location_id}
          apiController={useGetLocationsHistory}
          query={{
            q: searchDebounce || undefined,
            qStartDate: startDate !== null ? moment(startDate).format('YYYY-MM-DD') : undefined,
            qEndDate: endDate !== null ? moment(endDate).format('YYYY-MM-DD') : undefined,
          }}
          lengthColumnsHeader={14}
          isAutoSelectFirstRow={false}
          isGrouped
          hasAutoNumber
          isWithSearchField
        />
      </div>
    </div>
  )
}

export default LocationsList
