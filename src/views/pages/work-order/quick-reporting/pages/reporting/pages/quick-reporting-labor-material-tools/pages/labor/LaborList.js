import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import { currencyFormat } from 'src/utils/helper'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import useLaborList from './hooks/useLaborList'
import { useDeleteLabor, useGetLabor } from './services'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'

const LaborList = ({ mode, setAction }) => {
  const {
    tableRef,
    selectedLaborRow,
    setSelectedLaborRow,
    selectedTaskRow,
    downloadLabor,
    searchDebounce,
    setSearch,
  } = useLaborList()

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h6 className="text-body-bold">Labor</h6>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <InputGlobalSearch onChange={setSearch} />
        <button
          className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
          onClick={downloadLabor}
        >
          <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
          Download
        </button>
      </div>
      <Table
        tableRef={tableRef}
        columns={columns}
        apiController={useGetLabor}
        parentId={selectedTaskRow?.work_order_task_id}
        query={{ search: searchDebounce || undefined }}
        hasAutoNumber
        selectableRowSelected={(row) =>
          row.original?.work_order_labor_id === selectedLaborRow?.work_order_labor_id
        }
        onRowClicked={(row) => {
          setSelectedLaborRow(row.original)
        }}
        isWithSearchField
        storeKey="labor"
      />
      {mode === 'Delete Labor' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedLaborRow}
          data_id={selectedLaborRow?.work_order_labor_id}
          data_name={selectedLaborRow?.craft}
          data_parent_id={selectedTaskRow?.work_order_task_id}
          deleteService={useDeleteLabor}
          tableRef={tableRef}
        />
      )}
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
    header: 'Craft',
    accessorKey: 'craft',
    enableSorting: false,
    qName: 'qCraft',
  },
  {
    header: 'Skill Level',
    accessorKey: 'skill_level',
    enableSorting: false,
    qName: 'qSkillLevel',
  },
  {
    header: 'Vendor',
    accessorKey: 'vendor',
    enableSorting: false,
    qName: 'qVendor',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    enableSorting: false,
    qName: 'qQuantity',
    meta: {
      className: 'text-center',
    },
    cell: ({ row }) => <div className="text-center truncate">{row?.original?.quantity ?? '-'}</div>,
  },
  {
    header: 'Labor',
    accessorKey: 'labor',
    enableSorting: false,
    qName: 'qLabor',
    cell: ({ row }) => <div className="truncate">{row?.original?.labor || '-'}</div>,
  },
  {
    header: 'Regular Hours',
    accessorKey: 'regular_hours',
    enableSorting: false,
    qName: 'qRegularHours',
    meta: {
      className: 'text-center',
    },
    cell: ({ row }) => (
      <div className="text-center truncate">{row?.original?.regular_hours ?? '-'}</div>
    ),
  },
  {
    header: 'Rate',
    accessorKey: 'rate',
    enableSorting: false,
    qName: 'qRate',
    meta: {
      className: 'text-end',
    },
    cell: ({ row }) => (
      <div className="truncate text-end">
        {row?.original?.rate !== null ? currencyFormat(row?.original?.rate) : '-'}
      </div>
    ),
  },
  {
    header: 'Line Cost',
    accessorKey: 'line_cost',
    qName: 'qLineCost',
    enableSorting: false,
    meta: {
      className: 'text-end',
    },
    cell: ({ row }) => (
      <div className="truncate text-end">
        {row?.original?.line_cost !== null ? currencyFormat(row?.original?.line_cost) : '-'}
      </div>
    ),
  },
]

export default LaborList
