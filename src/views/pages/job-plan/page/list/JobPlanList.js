import React, { Fragment } from 'react'
// import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { useDeleteJobPlan, useGetJobPlanList } from './services'
import useJobPlanList from './hooks/useJobPlanList'
import StatusJobPlanComponent from './StatusJobPlanComponent'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'

const columns = [
  {
    header: 'Job Plan',
    accessorKey: 'job_plan',
    qName: 'qJobPlan',
  },
  {
    header: 'Description',
    accessorKey: 'plan_description',
    qName: 'qPlanDescription',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    qName: 'qStatus',
    cell: ({ row }) => {
      return <StatusJobPlanComponent status={row.original?.status} />
    },
    qType: 'select',
    qOptions: [
      { label: 'Active', value: 'Active' },
      { label: 'InActive', value: 'InActive' },
      { label: 'Cancel', value: 'Cancel' },
      { label: 'Revised', value: 'Revised' },
      { label: 'PndRev', value: 'PndRev' },
    ],
  },
  {
    header: 'Organization',
    accessorKey: 'organization',
    qName: 'qOrganization',
  },
  {
    header: 'Site',
    accessorKey: 'site',
    qName: 'qSite',
  },
]

const JobPlanList = ({ mode, setAction, setTabIndex }) => {
  const { selectedRow, setSelectedRow, tableRef, handleSearch, searchDebounce, downloadJobPlan } =
    useJobPlanList()

  return (
    <Fragment>
      <div className="bg-white p-4 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
              <input
                placeholder="Search"
                className="border-none text-sm"
                type="text"
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
              <GoSearch color="blue" />
            </div>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadJobPlan}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetJobPlanList}
          query={{
            search: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) => row.original?.job_plan_id === selectedRow?.job_plan_id}
          onRowClicked={(row) => {
            setSelectedRow(row.original)
          }}
          isAutoSelectFirstRow={false}
          isWithSearchField
          hasAutoNumber
        />
      </div>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setTabIndex={setTabIndex}
          setSelectedRow={setSelectedRow}
          data_id={selectedRow?.job_plan_id}
          data_name={selectedRow?.job_plan}
          deleteService={useDeleteJobPlan}
          tableRef={tableRef}
        />
      )}
    </Fragment>
  )
}

export default JobPlanList
