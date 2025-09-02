import { CTable, CTableBody, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { Fragment } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import useSpareParts from '../../hooks/spare-parts/useSparePartsList'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useGetSpareParts } from '../../services/spare-parts'
import ListData from '../layout/ListSpareParts'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'

const SpareParts = () => {
  const { tableRef, selectedRow, handleSearch, searchDebounce, downloadAssetsSpareparts } =
    useSpareParts()
  return (
    <DetailCard>
      <CTable>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell>
              <p className="text-body-bold">Spare Parts</p>
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
                  onClick={downloadAssetsSpareparts}
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
        apiController={useGetSpareParts}
        parentId={selectedRow?.asset_id}
        query={{
          q: searchDebounce || undefined,
        }}
        isWithSearchField={true}
        hasAutoNumber
        tableSubComponent={ExpandedComponent}
        canExpand={true}
      />
    </DetailCard>
  )
}

const ExpandedComponent = (row) => {
  const data = row.row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-5 my-3">
        <div>
          <label className="font-light text-body-small">Item</label>
          <p className="text-body-bold">{data?.item_num ? data.item_num : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Description</label>
          <p className="text-body-bold">{data?.description ? data.description : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Location</label>
          <p className="text-body-bold">{data?.location_id ? data.location_id : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Description</label>
          <p className="text-body-bold">{data?.description ? data.description : '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Remarks</label>
          <p className="text-body-bold">{data?.asset_remarks ? data.asset_remarks : '-'}</p>
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
    accessorKey: 'item_num',
    qName: 'qItemNum',
  },
  {
    header: 'Description',
    accessorKey: 'description',
    qName: 'qDescription',
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    qName: 'qQuantity',
  },
  {
    header: 'Remarks',
    accessorKey: 'remark',
    qName: 'qRemark',
  },
]

export default SpareParts
