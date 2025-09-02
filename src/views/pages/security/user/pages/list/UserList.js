/* eslint-disable react/prop-types */
import React from 'react'
import { GoSearch } from 'react-icons/go'
// import { CiFilter } from 'react-icons/ci'
import clsx from 'clsx'
import { Table } from 'src/components/elements/table'
import { useGetUsers } from './services/getUsers'
import { useList } from './hooks'
import { MdOutlineCloudDownload } from 'react-icons/md'

const type_options = [
  { label: 'Daily User', value: 1 },
  { label: 'Secondary User', value: 2 },
  { label: 'Requester', value: 3 },
  { label: 'Admin', value: 4 },
  { label: 'Super Admin', value: 5 },
]

const columns = [
  {
    header: 'Username',
    accessorKey: 'username',
    qName: 'qUsername',
  },
  {
    header: 'Email',
    accessorKey: 'email',
    qName: 'qEmail',
  },
  {
    header: 'Display Name',
    accessorKey: 'display_name',
    qName: 'qDisplayName',
  },
  {
    header: 'Status',
    accessorKey: 'is_active',
    cell: (row) => (
      <div
        style={{ borderWidth: 1 }}
        className={clsx(
          'rounded-full text-center font-semibold self-center',
          row.getValue()
            ? 'border-green-border max-w-16 bg-green-surface text-green-main'
            : 'border-red-border max-w-[4.75rem] bg-red-surface text-red-main',
        )}
      >
        {row.getValue() ? 'Active' : 'Inactive'}
      </div>
    ),
    qName: 'qIsActive',
    qType: 'select',
    qOptions: [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 },
    ],
  },
  {
    header: 'Type',
    accessorKey: 'type',
    cell: (row) => type_options.find((val) => val.value === row.getValue())?.label || '-',
    qName: 'qType',
    qType: 'select',
    qOptions: type_options,
  },
  {
    header: 'Organization',
    accessorKey: 'organization_name',
    qName: 'qOrganization',
    cell: (row) => (
      <div style={{ width: `${row?.column?.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
]
const UserList = () => {
  const { selectedRow, setSelectedRow, tableRef, handleSearch, searchDebounce, downloadUsers } =
    useList()

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
            onClick={downloadUsers}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetUsers}
          query={{
            search: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) => row.original?.user_id === selectedRow?.user_id}
          onRowClicked={(row) => {
            setSelectedRow(row.original)
          }}
          isAutoSelectFirstRow={false}
          isWithSearchField
          hasAutoNumber
        />
      </div>
    </div>
  )
}
export default UserList
