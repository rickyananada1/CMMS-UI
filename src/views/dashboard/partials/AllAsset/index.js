import React from 'react'
import useAllAsset from './hooks/useAllAsset'
import { Table } from 'src/components/elements/table'
import { useGetAssets } from './services'
import { NavLink } from 'react-router-dom'
import Card from '../../card/Card'
import moment from 'moment'
import { toTitleCase } from 'src/utils/helper'

const statusTextColorMap = {
  Normal: 'text-green-main',
  Warning: 'text-orange-main',
  Danger: 'text-red-main',
}

const statusCircleColorMap = {
  Normal: 'bg-green-main',
  Warning: 'bg-orange-main',
  Danger: 'bg-red-main',
}

const assetStatusOptions = [
  { label: 'Normal', value: 'Normal' },
  { label: 'Warning', value: 'Warning' },
  { label: 'Danger', value: 'Danger' },
]

const columns = (handleNavigateToWorkOrder, user) => [
  {
    accessorKey: 'asset_num',
    header: 'Asset',
    qName: 'qAssetNum',
    size: 200,
    cell: (row) =>
      user?.type < 4 ? (
        <NavLink
          to={'/page/assets'}
          onClick={(e) => handleNavigateToWorkOrder(e, row?.row?.original)}
          style={{ width: `${row?.column?.getSize()}px` }}
        >
          {row.getValue() || '-'}
        </NavLink>
      ) : (
        <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
      ),
  },
  {
    accessorKey: 'asset_description',
    header: 'Asset Description',
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
    accessorKey: 'status',
    header: 'Last Wellness',
    qName: 'qStatus',
    qType: 'select',
    qOptions: assetStatusOptions,
    size: 100,
    cell: (row) => {
      const status = row.getValue() || '-'
      return (
        <div
          className={`${statusTextColorMap[status] || 'text-red-main'}`}
          style={{ width: `${row?.column?.getSize()}px` }}
        >
          <span
            className={`inline-block rounded-full w-2 h-2 mr-1 ${
              statusCircleColorMap[status] || 'bg-red-main'
            }`}
          />
          {toTitleCase(status)}
        </div>
      )
    },
  },
]

const AllAsset = () => {
  const { tableRef, searchDebounce, handleNavigateToAsset, user } = useAllAsset()

  return (
    <Card
      title="All Asset"
      subtitle={
        <div>
          <span className="text-gray-300">Information displayed for year: </span>
          <span className="text-black font-bold">{moment().format('YYYY')}</span>
        </div>
      }
      cardClass="h-[calc(52vh-72px)]"
    >
      <div className="flex-1 overflow-hidden">
        <Table
          tableRef={tableRef}
          columns={columns(handleNavigateToAsset, user)}
          apiController={useGetAssets}
          query={{
            q: searchDebounce || undefined,
            // year: moment().format('YYYY'),
          }}
          isAutoSelectFirstRow={false}
          isWithSearchField
          hasAutoNumber
          tableClass="min-w-full table-fixed"
          enableStickyHeader
          enableStickyFooter
        />
      </div>
    </Card>
  )
}

export default AllAsset
