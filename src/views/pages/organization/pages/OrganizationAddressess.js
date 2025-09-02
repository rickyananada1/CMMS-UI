/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { Table } from 'src/components/elements/table'
import useListAddresess from '../hooks/useAddresses'
import { GoSearch } from 'react-icons/go'
import { useServiceAddressList } from '../services/addresses'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdOutlineCloudDownload } from 'react-icons/md'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const ExpandedComponent = ({ row, openDrawer }) => {
  const data = row?.original
  return (
    <div className="bg-gray-100 px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="text-slate-400">Address Code</label>
          <p className="font-bold">{data.address_code ? data.address_code : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Address Code Description</label>
          <p className="font-bold">
            {data?.address_code_description ? data?.address_code_description : '-'}
          </p>
        </div>
        <div>
          <label className="text-slate-400">Address</label>
          <p className="font-bold">{data.address ? data.address : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">City</label>
          <p className="font-bold">{data.city_name ? data.city_name : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">State / Province</label>
          <p className="font-bold">{data.province_name ? data.province_name : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">ZIP / Postal Code</label>
          <p className="font-bold">{data.postal_code ? data.postal_code : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Country</label>
          <p className="font-bold">{data.country ? data.country : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Tax Code</label>
          <p className="font-bold">{data.tax_code ? data.tax_code : '-'}</p>
        </div>
      </div>
      <div>
        <label className="text-slate-400">Attachments</label>
        <button
          onClick={openDrawer}
          className="flex items-center gap-1 text-[#2c74d6] hover:text-[#1b4a89] text-base font-medium underline"
        >
          <FaPaperclip className="w-4 h-4" />
          Attachments
        </button>
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
    header: 'Address Code',
    accessorKey: 'address_code',
    qName: 'qAddressCode',
  },
  {
    header: 'Address',
    accessorKey: 'address',
    qName: 'qAddress',
  },
  {
    header: 'City',
    accessorKey: 'city_name',
    qName: 'qCityName',
  },
  {
    header: 'State / Province',
    accessorKey: 'province_name',
    qName: 'qProvinceName',
  },
]
const AddressesList = ({ mode, setTabIndex, setAction }) => {
  const {
    setSearch,
    selectedOrganization,
    searchDebounce,
    tableRef,
    setSelectedAddress,
    selectedAddress,
    downloadAddressesList,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useListAddresess(setAction, setTabIndex, mode)

  return (
    <Fragment>
      <div className="bg-white p-4 rounded">
        <CCard className="card-b-left">
          <CCardBody className="p-5">
            <CardHeader
              description={selectedOrganization?.organization_description}
              infoFields={[
                { label: 'Organization', value: selectedOrganization?.organization_name },
              ]}
            />

            <hr />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
                  <input
                    placeholder="Search"
                    className="border-none text-sm"
                    type="text"
                    onChange={(val) => {
                      setSearch(val.target.value)
                    }}
                  />
                  <GoSearch color="blue" />
                </div>
              </div>
              <button
                className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
                onClick={downloadAddressesList}
              >
                <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
                Download
              </button>
            </div>
            <Table
              tableRef={tableRef}
              columns={columns}
              apiController={useServiceAddressList}
              query={{
                q: searchDebounce || undefined,
                organization_id: selectedOrganization?.organization_id,
                // site_id: selectedSite?.site_id,
              }}
              selectableRowSelected={(row) =>
                row.original?.address_code === selectedAddress?.address_code
              }
              tableSubComponent={({ row }) => (
                <ExpandedComponent row={row} openDrawer={handleOpenDrawer} />
              )}
              canExpand={true}
              onRowClicked={(row) => {
                setSelectedAddress(row.original)
              }}
              hasAutoNumber
              isWithSearchField
            />
          </CCardBody>
        </CCard>
      </div>

      <AttachmentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        files={dataFile}
        selectedFile={selectedFile}
        onSelectFile={(file) => setSelectedFile(file)}
      />
    </Fragment>
  )
}
export default AddressesList
