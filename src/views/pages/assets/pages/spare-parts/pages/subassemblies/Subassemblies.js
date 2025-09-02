import { CCol, CRow, CTable, CTableBody, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { Fragment } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import useSubassemblies from '../../hooks/subassemblies/useSubassembliesList'
import { useGetSubassemblies } from '../../services/subassemblies'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import ListData from '../layout/ListSpareParts'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'

const Subassemblies = () => {
  const {
    tableRef,
    selectedRow,
    selectedSubassembliesRow,
    setSelectedSubassembliesRow,
    searchDebounce,
    handleSearch,
  } = useSubassemblies()

  return (
    <Fragment>
      <DetailCard>
        <CTable>
          <CTableRow>
            <CTableHeaderCell scope="row">
              <div className="mt-3">
                <CRow>
                  <CCol>
                    <p className="text-body-medium">Asset</p>
                    <p className="text-body-bold">
                      {selectedRow?.asset_num ? selectedRow?.asset_num : '-'}
                    </p>
                  </CCol>
                  <CCol>
                    <p className="text-body-medium">Description</p>
                    <p className="text-body-bold">
                      {selectedRow?.asset_description ? selectedRow?.asset_description : '-'}
                    </p>
                  </CCol>
                  <CCol>
                    <p className="text-body-medium">Parent</p>
                    <p className="text-body-bold">
                      {selectedRow?.parent_asset_num ? selectedRow?.parent_asset_num : '-'}
                    </p>
                  </CCol>
                  <CCol>
                    <p className="text-body-medium">Description</p>
                    <p className="text-body-bold">
                      {selectedRow?.parent_asset_description
                        ? selectedRow?.parent_asset_description
                        : '-'}
                    </p>
                  </CCol>
                </CRow>
              </div>
            </CTableHeaderCell>
          </CTableRow>
        </CTable>
      </DetailCard>
      <DetailCard>
        <CTable>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell>
                <p className="text-body-bold">Subassemblies</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center px-4 py-2 mr-2 border border-solid rounded">
                      <input
                        placeholder="Search"
                        className="text-sm font-normal border-none"
                        type="text"
                        onChange={(e) => handleSearch(e)}
                      />
                      <GoSearch color="blue" />
                    </div>
                  </div>
                  <button
                    className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
                    onClick={() => {}}
                  >
                    <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
                    Download
                  </button>
                </div>
              </CTableHeaderCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        <p className="ml-3 text-body-bold">List</p>
        <ListData
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.asset_id}
          apiController={useGetSubassemblies}
          query={{
            q: searchDebounce || undefined,
          }}
          isWithSearchField={true}
          hasAutoNumber
          tableSubComponent={ExpandedComponent}
          canExpand={true}
          selectableRowSelected={(row) =>
            row.original?.asset_id === selectedSubassembliesRow?.asset_id
          }
          onRowClicked={(row) => {
            setSelectedSubassembliesRow(row.original)
          }}
        />
      </DetailCard>
    </Fragment>
  )
}

const ExpandedComponent = (row) => {
  const data = row.row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="font-light text-body-small">Item</label>
          <p className="text-body-bold">{data?.asset_num ? data.asset_num : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Description</label>
          <p className="text-body-bold">{data?.asset_description ? data.asset_description : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Location</label>
          <p className="text-body-bold">{data?.location_id ? data.location_id : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Description</label>
          <p className="text-body-bold">{data?.asset_description ? data.asset_description : '-'}</p>
        </div>
      </div>
    </div>
  )
}

const columns = [
  {
    header: ' ',
    size: 10,
    cell: ({ row }) => {
      return (
        <Fragment>
          {row.getCanExpand() && (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer', padding: '10px' },
              }}
            >
              {row.getIsExpanded() ? (
                <IoIosArrowUp className="w-5 h-5" />
              ) : (
                <IoIosArrowDown className="w-5 h-5" />
              )}
            </button>
          )}
        </Fragment>
      )
    },
  },
  {
    header: 'Item',
    accessorKey: 'asset_num',
    qName: 'qAssetNumber',
  },
  {
    header: 'Description',
    accessorKey: 'asset_description',
    qName: 'qAssetDesc',
  },
  {
    header: 'Location',
    accessorKey: 'location',
    qName: 'qLocation',
  },
  {
    header: 'Description',
    accessorKey: 'location_description',
    qName: 'qLocationDesc',
  },
]

export default Subassemblies
