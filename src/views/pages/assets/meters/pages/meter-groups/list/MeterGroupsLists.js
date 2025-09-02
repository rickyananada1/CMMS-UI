import React from 'react'
// import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import useLists from './hooks/useLists'
import { Table } from 'src/components/elements/table'
import { useGetMeterGroups } from './services'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import { useDeleteMeterGroup } from '../detail/services'

const columns = [
  {
    header: 'Meter Group',
    accessorKey: 'meter_group',
    qName: 'meter_group',
    // enableSorting: true,
  },
  {
    header: 'Description',
    accessorKey: 'description',
    qName: 'description',
    // enableSorting: true,
  },
]

const MeterGroupsLists = ({ mode, setAction }) => {
  const {
    selectedRow,
    setSelectedRow,
    setTabIndex,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadMeterGroups,
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
            onClick={downloadMeterGroups}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetMeterGroups}
          query={{
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.meter_group_id === selectedRow?.meter_group_id
          }
          onRowClicked={(row) => {
            setSelectedRow(row.original)
            setTabIndex(3)
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
          data_id={selectedRow?.meter_group_id}
          data_name={selectedRow?.meter_group}
          deleteService={useDeleteMeterGroup}
          tableRef={tableRef}
        />
      )}
    </div>
  )
}
export default MeterGroupsLists
