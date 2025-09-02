import React, { Fragment } from 'react'
import useToolsList from '../hooks/tools/useToolsList'
import useMaterialsList from '../hooks/materials/useMaterialsList'
import useLaborList from '../hooks/labor/useLaborList'
import { Table } from 'src/components/elements/table'
import { useGetLabor } from '../services/labor'
import { useGetMaterials } from '../services/materials'

const Tables = () => {
  const { selectedRow } = useToolsList()
  const {
    tableRef: tableRefMaterials,
    selectedMaterialsRow,
    setSelectedMaterialsRow,
  } = useMaterialsList()
  const { tableRef: tableRefLabor, selectedLaborRow, setSelectedLaborRow } = useLaborList()

  return (
    <Fragment>
      <div className="mt-4">
        <h6 className="text-body-bold">Labor</h6>
        <Table
          tableRef={tableRefLabor}
          columns={columns_labor}
          apiController={useGetLabor}
          parentId={selectedRow?.work_order_id}
          query={{}}
          hasAutoNumber
          selectableRowSelected={(row) =>
            row.original?.work_order_labor_id === selectedLaborRow?.work_order_labor_id
          }
          onRowClicked={(row) => {
            setSelectedLaborRow(row.original)
          }}
        />
      </div>
      <div className="mt-4">
        <h6 className="text-body-bold">Materials</h6>
        <Table
          tableRef={tableRefMaterials}
          columns={columns_materials}
          apiController={useGetMaterials}
          parentId={selectedRow?.work_order_id}
          query={{}}
          hasAutoNumber
          selectableRowSelected={(row) =>
            row.original?.work_order_material_id === selectedMaterialsRow?.work_order_material_id
          }
          onRowClicked={(row) => {
            setSelectedMaterialsRow(row.original)
          }}
        />
      </div>
    </Fragment>
  )
}

const columns_labor = [
  {
    header: 'Task',
    accessorKey: 'work_order_task_id',
    enableSorting: false,
  },
  {
    header: 'Craft',
    accessorKey: 'craft',
    enableSorting: false,
  },
  {
    header: 'Skill Level',
    accessorKey: 'skill_level',
    enableSorting: false,
  },
  {
    header: 'Vendor',
    accessorKey: 'vendor',
    enableSorting: false,
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    enableSorting: false,
  },
  {
    header: 'Labor',
    accessorKey: 'labor',
    enableSorting: false,
  },
  {
    header: 'Regular Hours',
    accessorKey: 'regular_hours',
    enableSorting: false,
  },
  {
    header: 'Rate',
    accessorKey: 'rate',
    enableSorting: false,
  },
  {
    header: 'Line Cost',
    accessorKey: 'line_cost',
    enableSorting: false,
  },
]

const columns_materials = [
  {
    header: 'Task',
    accessorKey: 'work_order_task_id',
    enableSorting: false,
  },
  {
    header: 'Item',
    accessorKey: 'sparepart_id',
    enableSorting: false,
  },
  {
    header: 'Description',
    accessorKey: 'description',
    enableSorting: false,
  },
  {
    header: 'Summary',
    accessorKey: 'remark',
    enableSorting: false,
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    enableSorting: false,
  },
  {
    header: 'Issue Unit',
    accessorKey: 'issue_unit',
    enableSorting: false,
  },
  {
    header: 'Unit Cost',
    accessorKey: 'unit_cost',
    enableSorting: false,
  },
  {
    header: 'Line Cost',
    accessorKey: 'line_cost',
    enableSorting: false,
  },
  {
    header: 'Storeroom',
    accessorKey: 'store_room',
    enableSorting: false,
  },
]

export default Tables
