import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import useLists from './hooks/useLists'
import { Table } from 'src/components/elements/table'
import { useGetSecurityGroups } from './services'

const columns = [
  {
    header: 'Group',
    accessorKey: 'security_group_code',
    qName: 'qGroup',
    /*
    sortName: 'code',
    enableSorting: true,
    */
  },
  {
    header: 'Description',
    accessorKey: 'security_group_description',
    qName: 'qDescription',
    /*
    sortName: 'description',
    enableSorting: true,
    */
  },
  {
    header: () => (
      <div className="flex justify-center items-center">Independent of Other Groups?</div>
    ),
    accessorKey: 'independent_group',
    cell: (row) => (
      <div className="flex justify-center items-center">
        <img src={row.getValue() ? CheckTag : XTag} width={20} height={20} alt={'meters-active'} />
      </div>
    ),
    qName: 'qIndependentGroup',
    qType: 'none',
  },
  {
    header: () => (
      <div className="flex justify-center items-center">Authorize Group for all Sites?</div>
    ),
    accessorKey: 'authorized_all_sites',
    cell: (row) => (
      <div className="flex justify-center items-center">
        <img src={row.getValue() ? CheckTag : XTag} width={20} height={20} alt={'meters-active'} />
      </div>
    ),
    qName: 'qAuthorizedAllSites',
    qType: 'none',
  },
]

const SecurityGroupLists = () => {
  const {
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadSecurityGroups,
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
            <button className="flex items-center border rounded border-solid px-3 py-2 text-sm hidden">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadSecurityGroups}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetSecurityGroups}
          query={{
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.security_group_id === selectedRow?.security_group_id
          }
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

export default SecurityGroupLists
