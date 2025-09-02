import React from 'react'
// import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import useLists from './hooks/useLists'
import { useGetMeters } from './services'
import { Table } from 'src/components/elements/table'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import { useDeleteMeter } from '../detail/services'

const MetersLists = ({ mode, setAction }) => {
  const {
    selectedRow,
    setSelectedRow,
    setTabIndex,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadMeters,
  } = useLists()

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
                onChange={(e) => handleSearch(e)}
              />
              <GoSearch color="blue" />
            </div>
            {/* <button className="flex items-center border rounded border-solid px-3 py-2 text-sm hidden">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button> */}
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadMeters}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetMeters}
          query={{
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) => row.original?.meter_id === selectedRow?.meter_id}
          onRowClicked={(row) => {
            setSelectedRow(row.original)
            setTabIndex(1)
          }}
          hasAutoNumber
          isWithSearchField
          filterSearchKey={false}
        />
      </div>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedRow}
          data_id={selectedRow?.meter_id}
          data_name={selectedRow?.meter_name}
          deleteService={useDeleteMeter}
          tableRef={tableRef}
        />
      )}
    </div>
  )
}

const columns = [
  {
    header: 'Meter',
    accessorKey: 'meter_name',
    qName: 'name',
    // enableSorting: true,
  },
  {
    header: 'Description',
    accessorKey: 'meter_description',
    qName: 'description',
    // enableSorting: true,
  },
  {
    header: 'Meter Type',
    accessorKey: 'meter_type',
    qName: 'type',
    // enableSorting: true,
    cell: (row) => <div className="capitalize">{row.getValue()}</div>,
  },
]
export default MetersLists
