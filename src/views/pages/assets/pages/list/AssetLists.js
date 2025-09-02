import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { useGetAssets } from './services'
import useList from './hooks/useList'
import { toTitleCase } from 'src/utils/helper'

const assetStatusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Operating', value: 'operating' },
  { label: 'Limited Use', value: 'limited_use' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Not Ready', value: 'not_ready' },
  { label: 'Broken', value: 'broken' },
  { label: 'Missing', value: 'missing' },
  { label: 'Sealed', value: 'sealed' },
]

const columns = [
  {
    accessorKey: 'asset_num',
    header: 'Assets',
    qName: 'qAssetNum',
    size: 200,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    accessorKey: 'asset_description',
    header: 'Description',
    qName: 'qAssetDescription',
    size: 385,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    qName: 'qLocation',
    size: 250,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    accessorKey: 'kks_number',
    header: 'KKS Number',
    qName: 'qKksNumber',
  },
  {
    accessorKey: 'parent_asset_num',
    header: 'Parent',
    qName: 'qParentAssetNum',
    size: 200,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  // {
  //   accessorKey: 'rotating_item',
  //   header: 'Rotating Item',
  //   qName: 'qRotatingItem',
  // },
  {
    accessorKey: 'status',
    header: 'Status',
    qName: 'qStatus',
    qType: 'select',
    qOptions: assetStatusOptions,
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>
        {toTitleCase(row.getValue()) || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'site',
    header: 'Site',
    qName: 'qSite',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
]

const AssetLists = () => {
  const { selectedRow, setSelectedRow, tableRef, handleSearch, searchDebounce, downloadAssets } =
    useList()

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
                onChange={(val) => handleSearch(val)}
              />
              <GoSearch color="blue" />
            </div>
            <button className="flex items-center border rounded border-solid px-3 py-2 text-sm hidden">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadAssets}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetAssets}
          query={{
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) => row.original?.asset_id === selectedRow?.asset_id}
          onRowClicked={(row) => setSelectedRow(row.original)}
          isAutoSelectFirstRow={false}
          isWithSearchField
          hasAutoNumber
        />
      </div>
    </div>
  )
}

export default AssetLists
