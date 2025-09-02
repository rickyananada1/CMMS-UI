import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import { useGetMaterials } from '../../services/materials'
import useMaterialsList from '../../hooks/materials/useMaterialsList'
import { currencyFormat } from 'src/utils/helper'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'

const MaterialsList = () => {
  const {
    tableRef,
    selectedTaskRow,
    selectedMaterialsRow,
    setSelectedMaterialsRow,
    downloadMaterials,
    searchDebounce,
    setSearch,
  } = useMaterialsList()

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h6 className="text-body-bold">Materials</h6>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <InputGlobalSearch onChange={setSearch} />
        <button
          className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
          onClick={downloadMaterials}
        >
          <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
          Download
        </button>
      </div>
      <Table
        tableRef={tableRef}
        columns={columns}
        apiController={useGetMaterials}
        parentId={selectedTaskRow?.work_order_task_id}
        query={{ search: searchDebounce || undefined }}
        hasAutoNumber
        selectableRowSelected={(row) =>
          row.original?.work_order_material_id === selectedMaterialsRow?.work_order_material_id
        }
        onRowClicked={(row) => {
          setSelectedMaterialsRow(row.original)
        }}
        // isWithSearchField
      />
    </Fragment>
  )
}

const columns = [
  {
    header: 'Task',
    accessorKey: 'task',
    enableSorting: false,
    qName: 'qTask',
    cell: ({ row }) => (
      <div className="truncate">{row?.original?.work_order_task || row?.original?.task || '-'}</div>
    ),
  },
  {
    header: 'Item',
    accessorKey: 'sparepart_id',
    enableSorting: false,
    qName: 'qSparepartId',
    cell: ({ row }) => (
      <div className="truncate">
        {row?.original?.item_num || row?.original?.sparepart_id || '-'}
      </div>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'description',
    enableSorting: false,
    qName: 'qDescription',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    enableSorting: false,
    qName: 'qQuantity',
    meta: {
      className: 'text-center',
    },
    cell: ({ row }) => (
      <div className="text-center truncate">
        {row?.original?.quantity ? row?.original?.quantity : '-'}
      </div>
    ),
  },
  {
    header: 'Issue Unit',
    accessorKey: 'issue_unit',
    enableSorting: false,
    qName: 'qIssueUnit',
  },
  {
    header: 'Unit Cost',
    accessorKey: 'unit_cost',
    enableSorting: false,
    qName: 'qUnitCost',
    meta: {
      className: 'text-end',
    },
    cell: ({ row }) => (
      <div className="truncate text-end">
        {row?.original?.unit_cost !== null ? currencyFormat(row?.original?.unit_cost) : '-'}
      </div>
    ),
  },
  {
    header: 'Line Cost',
    accessorKey: 'line_cost',
    enableSorting: false,
    qName: 'qLineCost',
    meta: {
      className: 'text-end',
    },
    cell: ({ row }) => (
      <div className="truncate text-end">
        {row?.original?.line_cost !== null ? currencyFormat(row?.original?.line_cost) : '-'}
      </div>
    ),
  },
  {
    header: 'Storeroom',
    accessorKey: 'store_room',
    qName: 'qStoreRoom',
    enableSorting: false,
    cell: ({ row }) => <div className="truncate">{row?.original?.store_room || '-'}</div>,
  },
]

export default MaterialsList
