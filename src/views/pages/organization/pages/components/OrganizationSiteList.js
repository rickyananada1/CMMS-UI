import React from 'react'
import { CCard, CCardBody } from '@coreui/react'
import { Table } from 'src/components/elements/table'
import { useServiceSiteList, useServiceSiteAddressList } from '../../services'
import useOrganizationSite from '../../hooks/useOrganizationSite'
// import DataTable from 'react-data-table-component'
import { OrganizationSiteDetail, OrganizationSiteAddressDetail } from '../components'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { GoSearch } from 'react-icons/go'
import CardHeader from 'src/components/elements/cards/CardHeader'

const OrganizationSiteList = ({ mode, setAction, setTabIndex }) => {
  const {
    columns,
    columnsAddress,
    selectedRow,
    selectedSite,
    setSelectedSite,
    tableRef,
    tableAddressessRef,
    searchDebounce,
    setSearch,
    searchDebounceAddress,
    setSearchAddress,
    downloadSitesList,
  } = useOrganizationSite(mode, setAction, setTabIndex)
  return (
    <div className="w-full p-4 mb-5 bg-white border border-gray-200 rounded-b-lg">
      <CCard className="card-b-left">
        <CCardBody className="p-5">
          <CardHeader
            description={selectedRow?.organization_description}
            infoFields={[{ label: 'Organization', value: selectedRow?.organization_name }]}
          />
          <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center px-4 py-2 mr-2 border border-solid rounded">
                <input
                  placeholder="Search"
                  className="text-sm border-none"
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
              onClick={downloadSitesList}
            >
              <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
              Download
            </button>
          </div>
          <Table
            tableRef={tableRef}
            columns={columns}
            apiController={useServiceSiteList}
            query={{
              q: searchDebounce || undefined,
              organization_id: selectedRow?.organization_id,
            }}
            selectableRowSelected={(row) => row.original?.site_id === selectedSite?.site_id}
            tableSubComponent={OrganizationSiteDetail}
            canExpand={true}
            onRowClicked={(row) => {
              setSelectedSite(row.original)
            }}
            hasAutoNumber
            isWithSearchField
          />
          <hr />
          <h5 className="font-semibold">Address for Site</h5>
          <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center px-4 py-2 mr-2 border border-solid rounded">
                <input
                  placeholder="Search"
                  className="text-sm border-none"
                  type="text"
                  onChange={(val) => {
                    setSearchAddress(val.target.value)
                  }}
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
          <Table
            tableRef={tableAddressessRef}
            columns={columnsAddress}
            apiController={useServiceSiteAddressList}
            query={{
              q: searchDebounceAddress || undefined,
              organization_id: selectedRow?.organization_id,
              site_id: selectedSite?.site_id,
            }}
            selectableRowSelected={(row) => false}
            tableSubComponent={OrganizationSiteAddressDetail}
            canExpand={true}
            onRowClicked={(row) => {
              setSelectedSite(row.original)
            }}
            hasAutoNumber
            isWithSearchField
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default OrganizationSiteList
