import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import useToolsList from '../../hooks/tools/useToolsList'
import { useDeleteTools, useGetTools } from '../../services/tools'
import { currencyFormat } from 'src/utils/helper'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'

const ToolsList = ({ mode, setAction }) => {
  const {
    tableRef,
    selectedTaskRow,
    selectedToolsRow,
    setSelectedToolsRow,
    downloadTools,
    searchDebounce,
    setSearch,
  } = useToolsList()

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h6 className="text-body-bold">Tools</h6>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <InputGlobalSearch onChange={setSearch} />
        <button
          className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
          onClick={downloadTools}
        >
          <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
          Download
        </button>
      </div>
      <Table
        tableRef={tableRef}
        columns={columns}
        apiController={useGetTools}
        parentId={selectedTaskRow?.work_order_task_id}
        query={{ search: searchDebounce || undefined }}
        hasAutoNumber
        selectableRowSelected={(row) =>
          row.original?.work_order_tool_id === selectedToolsRow?.work_order_tool_id
        }
        onRowClicked={(row) => {
          setSelectedToolsRow(row.original)
        }}
        // isWithSearchField
      />
      {mode === 'Delete Tools' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedToolsRow}
          data_id={selectedToolsRow?.work_order_tool_id}
          data_name={selectedToolsRow?.tool}
          data_parent_id={selectedTaskRow?.work_order_task_id}
          deleteService={useDeleteTools}
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
    header: 'Tool',
    accessorKey: 'tool',
    enableSorting: false,
    qName: 'qTool',
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
]

export default ToolsList
