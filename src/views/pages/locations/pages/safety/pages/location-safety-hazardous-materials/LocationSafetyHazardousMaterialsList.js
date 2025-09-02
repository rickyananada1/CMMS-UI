import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import { DetailCard } from 'src/components/elements/cards'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { useGetLocationSafetyHazardousMaterialsTableList } from './services'
import useLocationSafetyHazardousMaterialsList from './hooks/useLocationSafetyHazardousMaterialsList'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GoSearch } from 'react-icons/go'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = (row) => {
  const data = row?.row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="text-body-small font-light">Hazard Code</label>
          <p className="text-body-bold">{data?.hazard?.hazard_code ?? '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Hazard Description</label>
          <p className="text-body-bold">{data?.hazard?.hazard_desc ?? '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">MSDS</label>
          <p className="text-body-bold">{data?.safety_extended_data?.msds_num ?? '-'}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="text-body-small font-light">Health</label>
          <p className="text-body-bold">{data?.safety_extended_data?.health_rating ?? '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Flammability</label>
          <p className="text-body-bold">{data?.safety_extended_data?.flammability_rating ?? '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Reactivity</label>
          <p className="text-body-bold">{data?.safety_extended_data?.reactivity_rating ?? '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Contact</label>
          <p className="text-body-bold">{data?.safety_extended_data?.contact_rating ?? '-'}</p>
        </div>
      </div>
    </div>
  )
}

const columns = [
  {
    header: '',
    size: 10,
    id: 'toggle-hazardous-materials',
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
    header: 'Hazard Code',
    id: 'hazard_code',
    accessorKey: 'hazard.hazard_code',
    qName: 'qHazardCode',
  },
  {
    header: 'Hazard',
    id: 'hazard_desc',
    accessorKey: 'hazard.hazard_desc',
    qName: 'qHazardDesc',
  },
  {
    header: 'MSDS',
    accessorKey: 'safety_extended_data.msds_num',
  },
  {
    header: 'Health',
    accessorKey: 'safety_extended_data.health_rating',
  },
  {
    header: 'Flammability',
    accessorKey: 'safety_extended_data.flammability_rating',
  },
  {
    header: 'Reactivity',
    accessorKey: 'safety_extended_data.reactivity_rating',
  },
  {
    header: 'Contact',
    accessorKey: 'safety_extended_data.contact_rating',
  },
]

const LocationSafetyHazardousMaterialsList = ({
  mode,
  setAction,
  setTabIndex,
  isRefetchList,
  setIsRefetchList,
}) => {
  const {
    tableRef,
    selectedRow,
    selectedSafetyMaterialRow,
    setSelectedSafetyMaterialRow,
    downloadLocationSafetyHazardousMaterials,
    handleSearch,
    searchDebounce,
  } = useLocationSafetyHazardousMaterialsList({
    mode,
    setAction,
    setTabIndex,
    isRefetchList,
    setIsRefetchList,
  })

  return (
    <div>
      <DetailCard>
        <CardHeader
          description={selectedRow?.location_description}
          infoFields={[
            { label: 'Location', value: selectedRow?.location },
            { label: 'Site', value: selectedRow?.site },
          ]}
        />
        <hr />
        <div className="flex justify-between items-center">
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
            onClick={downloadLocationSafetyHazardousMaterials}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.location_id}
          apiController={useGetLocationSafetyHazardousMaterialsTableList}
          query={{
            site: selectedRow?.site_id,
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.safety_lexicon_id === selectedSafetyMaterialRow?.safety_lexicon_id
          }
          onRowClicked={(row) => setSelectedSafetyMaterialRow(row?.original)}
          canExpand={true}
          tableSubComponent={ExpandedComponent}
          lengthColumnsHeader={8}
          hasAutoNumber
        />
      </DetailCard>
    </div>
  )
}

export default LocationSafetyHazardousMaterialsList
