import React from 'react'
import useMetersAssets from './hooks/useMetersAssets'
import { CCol, CContainer, CRow } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { useGetMeterAssets } from './services'
import { GoSearch } from 'react-icons/go'
import CardHeader from 'src/components/elements/cards/CardHeader'

const MetersAssets = ({ mode, setAction, setTabIndex }) => {
  const { selectedRow, tableRef, downloadMeterAssets, searchDebounce, handleSearch } =
    useMetersAssets({
      mode,
      setAction,
      setTabIndex,
    })

  const columns = [
    {
      header: 'Asset',
      accessorKey: 'asset_num',
      qName: 'qAssetNum',
    },
    {
      header: 'Description',
      accessorKey: 'asset_description',
      qName: 'qAssetDescription',
    },
    {
      header: 'Site',
      accessorKey: 'site_description',
      qName: 'qSiteDescription',
    },
  ]

  return (
    <DetailCard>
      <CardHeader
        description={selectedRow?.meter_description}
        infoFields={[
          { label: 'Meter', value: selectedRow?.meter_name },
          { label: 'Meter Type', value: selectedRow?.meter_type },
        ]}
      />
      <hr />
      <CContainer fluid>
        <CRow>
          <CCol>
            <label className="text-neutral-text-field">Meter</label>
            <br />
            <span className="font-semibold">{selectedRow?.meter_name ?? '-'}</span>
          </CCol>
          <CCol>
            <label className="text-neutral-text-field">Meter Description</label>
            <br />
            <span className="font-semibold">{selectedRow?.meter_description ?? '-'}</span>
          </CCol>
          <CCol>
            <label className="text-neutral-text-field">Meter Type</label>
            <br />
            <span className="font-semibold uppercase">{selectedRow?.meter_type ?? '-'}</span>
          </CCol>
        </CRow>
        <hr />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center px-4 py-2 mr-2 border border-solid rounded">
              <input
                placeholder="Search"
                className="text-sm border-none"
                type="text"
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
              <GoSearch color="blue" />
            </div>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadMeterAssets}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.meter_id}
          apiController={useGetMeterAssets}
          query={{
            q: searchDebounce || undefined,
          }}
          hasAutoNumber
          isWithSearchField
        />
      </CContainer>
    </DetailCard>
  )
}
export default MetersAssets
