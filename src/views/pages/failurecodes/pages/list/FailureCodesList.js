import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { useGetFailureCodesTableList } from './services'
import useFailureCodesList from './hooks/useFailureCodesList'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import { useDeleteFailureCode } from '../failurecode/services'

const columns = [
  {
    header: 'Failure Class',
    accessorKey: 'failure_code',
    qName: 'qFailureClass',
  },
  {
    header: 'Description',
    accessorKey: 'description',
    qName: 'qDescription',
  },
  {
    header: 'Organization',
    accessorKey: 'organization_name',
    qName: 'qOrganizationName',
  },
]

const FailureCodesList = ({ mode, setAction, setTabIndex }) => {
  const {
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadFailureCodes,
  } = useFailureCodesList()

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
                onChange={(e) => {
                  handleSearch(e)
                }}
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
            onClick={downloadFailureCodes}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetFailureCodesTableList}
          query={{
            search: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.failure_code_id === selectedRow?.failure_code_id
          }
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
          data_id={selectedRow?.failure_code_id}
          data_name={selectedRow?.failure_code}
          deleteService={useDeleteFailureCode}
          tableRef={tableRef}
        />
      )}
    </div>
  )
}

export default FailureCodesList
