import React from 'react'
import { GoSearch } from 'react-icons/go'
import { CiFilter } from 'react-icons/ci'
import { MdOutlineCloudDownload } from 'react-icons/md'
import useOrganizationList from '../hooks/useOrganizationList'
import { Table } from 'src/components/elements/table'
import { useServiceOrganizationList } from '../services'

const columns = [
  {
    header: 'Organization',
    accessorKey: 'organization_name',
    qName: 'qOrganization',
  },
  {
    header: 'Description',
    accessorKey: 'organization_description',
    qName: 'qDescription',
  },
]

const OrganizationList = ({ mode, setAction, setTabIndex }) => {
  const { handleSearch, tableRef, searchDebounce, setSelectedRow, selectedRow, download } =
    useOrganizationList(mode, setAction, setTabIndex)
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
            <button className="flex items-center border rounded border-solid px-3 py-2 text-sm hidden">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={download}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <div className="mt-3">
          <Table
            tableRef={tableRef}
            columns={columns}
            apiController={useServiceOrganizationList}
            query={{
              q: searchDebounce || undefined,
            }}
            selectableRowSelected={(row) =>
              row.original?.organization_id === selectedRow?.organization_id
            }
            onRowClicked={(row) => setSelectedRow(row.original)}
            hasAutoNumber
            isWithSearchField
          />
        </div>
      </div>
    </div>
  )
}

export default OrganizationList
