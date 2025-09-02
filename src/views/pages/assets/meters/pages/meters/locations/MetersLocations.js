import React from 'react'
import useMetersLocations from './hooks/useMetersLocations'
import { CCol, CContainer, CRow } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { Table } from 'src/components/elements/table'
import { useGetMeterLocations } from './services'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { GoSearch } from 'react-icons/go'
import CardHeader from 'src/components/elements/cards/CardHeader'

const MetersLocations = ({ mode, setAction, setTabIndex }) => {
  const { tableRef, selectedRow, downloadMeterLocations, searchDebounce, handleSearch } =
    useMetersLocations({
      mode,
      setAction,
      setTabIndex,
    })

  const columns = [
    {
      header: 'Location',
      accessorKey: 'location',
      qName: 'qLocation',
    },
    {
      header: 'Description',
      accessorKey: 'location_description',
      qName: 'qLocationDescription',
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
            onClick={downloadMeterLocations}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.meter_id}
          apiController={useGetMeterLocations}
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

export default MetersLocations
