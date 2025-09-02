import React from 'react'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import { Table } from 'src/components/elements/table'
import usePreventiveMaintenanceList from './hooks/usePreventiveMaintenanceList'
import { useDeletePreventiveMaintenance, useGetListPreventiveMaintenances } from './services'
import StatusComponent from './components/StatusComponent'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'

const PreventiveMaintenanceList = ({ mode, setAction }) => {
  const {
    selectedRow,
    tableRef,
    setSelectedRow,
    setSearch,
    searchDebounce,
    downloadPreventiveMaintenances,
  } = usePreventiveMaintenanceList()

  const columns = [
    {
      header: 'PM',
      accessorKey: 'preventive_maintenance_name',
      qName: 'qPreventiveMaintenanceName',
    },
    {
      header: 'Description',
      accessorKey: 'preventive_maintenance_description',
      qName: 'qPreventiveMaintenanceDescription',
    },
    {
      header: 'Work Type',
      accessorKey: 'work_type',
      qName: 'qWorkType',
    },
    {
      header: 'WO Status',
      accessorKey: 'work_order_status',
      qName: 'qWorkOrderStatus',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      qName: 'qStatus',
      qType: 'select',
      qOptions: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
      cell: ({ row }) => {
        return <StatusComponent status={row.original?.status} />
      },
    },
    {
      header: 'Organization',
      accessorKey: 'organization_name',
      qName: 'qOrganizationName',
    },
    {
      header: 'Site',
      accessorKey: 'site',
      qName: 'qSite',
    },
  ]

  return (
    <>
      <div className="p-4 bg-white rounded">
        <div className="flex items-center justify-between">
          <InputGlobalSearch onChange={setSearch} />
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadPreventiveMaintenances}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetListPreventiveMaintenances}
          query={{ q: searchDebounce || undefined }}
          selectableRowSelected={(row) =>
            row.original?.preventive_maintenance_id === selectedRow?.preventive_maintenance_id
          }
          onRowClicked={(row) => setSelectedRow(row.original)}
          hasAutoNumber
          isWithSearchField
        />
      </div>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedRow}
          data_id={selectedRow?.preventive_maintenance_id}
          data_name={selectedRow?.preventive_maintenance_name}
          deleteService={useDeletePreventiveMaintenance}
          tableRef={tableRef}
        />
      )}
    </>
  )
}

export default PreventiveMaintenanceList
