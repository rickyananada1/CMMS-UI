import React from 'react'
import { Table } from 'src/components/elements/table'
import useLocationAssetsList from './hooks/useLocationAssetsList'
import { useGetLocationAssetsTableList } from './services'
import { DetailCard } from 'src/components/elements/cards'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { GoSearch } from 'react-icons/go'
import { DatePicker } from 'src/components/elements/datepicker'
import moment from 'moment'
import CardHeader from 'src/components/elements/cards/CardHeader'

const columns = [
  {
    header: 'Assets',
    accessorKey: 'asset_num',
    qName: 'qAssetNum',
  },
  {
    header: 'Description',
    accessorKey: 'asset_description',
    qName: 'qAssetDescription',
  },
  {
    header: 'Parent',
    accessorKey: 'parent_asset_num',
    qName: 'qParentAssetNum',
  },
  {
    header: 'Parent Description',
    accessorKey: 'parent_asset_description',
    qName: 'qParentAssetDescription',
  },
  {
    header: 'Rotating Item',
    accessorKey: 'rotating_item',
    qName: 'qRotatingItem',
    cell: (row) => <div>{row.getValue() || '-'}</div>,
  },
  {
    header: 'Rotating Item Description',
    accessorKey: 'rotating_item_description',
    qName: 'qRotatingItemDescription',
    cell: (row) => <div>{row.getValue() || '-'}</div>,
  },
  {
    header: 'Asset Up ?',
    accessorKey: 'asset_up',
    qName: 'qAssetUp',
    qType: 'select',
    qOptions: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    cell: ({ row }) => {
      const isChecked = row.original?.asset_up
      return (
        <div className="flex items-center justify-center">
          <img src={isChecked ? CheckTag : XTag} width={20} height={20} alt={'checked-asset-up'} />
        </div>
      )
    },
  },
  {
    header: 'Calendar',
    accessorKey: 'calendar',
    qName: 'qCalendar',
    qType: 'date',
    cell: (row) => <div>{row.getValue() || '-'}</div>,
  },
]

const LocationAssetsList = () => {
  const {
    selectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadLocationAssets,
    startDate,
    endDate,
    handleRangeChange,
    clearDates,
  } = useLocationAssetsList()

  return (
    <DetailCard>
      <CardHeader
        description={selectedRow?.location_description}
        infoFields={[
          { label: 'Location', value: selectedRow?.location },
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
          onClick={downloadLocationAssets}
        >
          <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
          Download
        </button>
      </div>
      <Table
        tableRef={tableRef}
        columns={columns}
        parentId={selectedRow?.location_id}
        apiController={useGetLocationAssetsTableList}
        query={{
          q: searchDebounce || undefined,
          qStartDate: startDate !== null ? moment(startDate).format('YYYY-MM-DD') : undefined,
          qEndDate: endDate !== null ? moment(endDate).format('YYYY-MM-DD') : undefined,
        }}
        hasAutoNumber
        isWithSearchField
      />
    </DetailCard>
  )
}

export default LocationAssetsList
