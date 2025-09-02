import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { useGetLocations } from './services'
import useLocationsList from './hooks/useLocationsList'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import { useDeleteLocation } from '../location/services'

const columns = [
  {
    header: 'Location',
    accessorKey: 'location',
    qName: 'qLocation',
    size: 270,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'location_description',
    qName: 'qDescription',
    size: 445,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Type',
    accessorKey: 'location_type',
    qName: 'qLocationType',
    size: 105,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'location_status',
    qName: 'qLocationStatus',
    size: 105,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },

  {
    header: 'Priority',
    accessorKey: 'location_priority',
    qName: 'qLocationPriority',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Site',
    accessorKey: 'site',
    qName: 'qSite',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
]

const LocationsList = ({ mode, setAction, setTabIndex }) => {
  const { selectedRow, setSelectedRow, tableRef, handleSearch, searchDebounce, downloadLocations } =
    useLocationsList()

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
            onClick={downloadLocations}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetLocations}
          query={{
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) => row.original?.location_id === selectedRow?.location_id}
          onRowClicked={(row) => {
            setSelectedRow(row.original)
          }}
          isAutoSelectFirstRow={false}
          isWithSearchField
          hasAutoNumber
        />
        {mode === 'Delete' && (
          <DeleteConfirmation
            setAction={setAction}
            setTabIndex={setTabIndex}
            setSelectedRow={setSelectedRow}
            data_id={selectedRow?.location_id}
            data_name={selectedRow?.location}
            deleteService={useDeleteLocation}
            tableRef={tableRef}
          />
        )}
      </div>
    </div>
  )
}

export default LocationsList
