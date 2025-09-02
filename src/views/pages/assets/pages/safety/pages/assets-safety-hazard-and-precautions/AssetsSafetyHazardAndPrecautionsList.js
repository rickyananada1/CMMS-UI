import React, { Fragment } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useGetAssetsSafetyHazardAndPrecautionsTableList } from './services'
import useAssetsSafetyHazardAndPrecautionsList from './hooks/useAssetsSafetyHazardAndPrecautionsList'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import { GoSearch } from 'react-icons/go'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = (row) => {
  const data = row?.row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="flex items-center justify-between">
        <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
          Hazard
        </p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4 mb-3">
        <div>
          <label className="font-light text-body-small">Hazard</label>
          <p className="text-body-bold">
            {data?.hazard?.hazard_code ? data.hazard?.hazard_code : '-'}
          </p>
        </div>
        <div>
          <label className="font-light text-body-small">Description</label>
          <p className="text-body-bold">
            {data?.hazard?.hazard_desc ? data.hazard?.hazard_desc : '-'}
          </p>
        </div>
        <div>
          <label className="mb-2 font-light text-body-small">Can Have Hazardous Materials ?</label>
          <img
            src={data?.safety_extended_data?.hazmate_enabled ? CheckTag : XTag}
            width={22}
            height={22}
            alt={`${data?.safety_extended_data?.hazmate_enabled}-${data?.safety_extended_data?.hazard_code}`}
          />
        </div>
        <div>
          <label className="font-light text-body-small">Type</label>
          <p className="text-body-bold">
            {data?.safety_extended_data?.hazard_type ? data.safety_extended_data?.hazard_type : '-'}
          </p>
        </div>
      </div>

      {Array.isArray(data?.precautions) && data?.precautions?.length ? (
        <Fragment>
          <div className="flex items-center justify-between">
            <p className="mt-2 font-normal text-body-small text-neutral-text-field text-nowrap">
              Precautions
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          {data?.precautions.map((item, index) => (
            <div key={`precautions-${item?.precaution_id}`} className="grid grid-cols-4 mb-3">
              <div>
                <label className="font-light text-body-small">Precautions Code {index + 1}</label>
                <p className="text-body-bold">
                  {item?.precaution_code ? item?.precaution_code : '-'}
                </p>
              </div>
              <div>
                <label className="font-light text-body-small">
                  Precautions Description {index + 1}
                </label>
                <p className="text-body-bold">
                  {item?.precaution_desc ? item?.precaution_desc : '-'}
                </p>
              </div>
            </div>
          ))}
        </Fragment>
      ) : null}
    </div>
  )
}

const columns = [
  {
    header: '',
    id: 'toggle-collapse-hazard-precautions',
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
    header: 'Hazard',
    columns: [
      {
        header: 'Hazard',
        accessorKey: 'hazard.hazard_code',
        qName: 'qHazardCode',
      },
      {
        header: 'Hazard Description',
        accessorKey: 'hazard.hazard_desc',
        qName: 'qHazardDesc',
      },
      {
        header: 'Can Have Hazardous Materials ?',
        accessorKey: 'safety_extended_data.hazmate_enabled',
        meta: {
          className: 'text-center',
        },
        cell: ({ row }) => {
          const isChecked = row.original?.safety_extended_data?.hazmate_enabled
          return (
            <div className="flex items-center justify-center">
              <img
                src={isChecked ? CheckTag : XTag}
                width={20}
                height={20}
                alt={'checked-hazardous'}
              />
            </div>
          )
        },
      },
      {
        header: 'Type',
        accessorKey: 'safety_extended_data.hazard_type',
        cell: ({ row }) => (
          <div className="truncate">{row?.original?.safety_extended_data?.hazard_type || '-'}</div>
        ),
      },
    ],
  },
  /*
  {
    header: 'Precautions',
    columns: [
      {
        header: 'Precautions Code',
        accessorKey: 'precautions',
        cell: ({ row }) => {
          const isHasLength =
            Array.isArray(row?.original?.precautions) && row?.original?.precautions?.length

          return (
            <ol start={1} type="1" style={{ listStyleType: isHasLength ? 'decimal' : 'none' }}>
              {isHasLength ? (
                row?.original?.precautions.map((item) => {
                  return (
                    <li key={`precautions-${item?.precaution_id}-${item?.precaution_code}`}>
                      <span>{item?.precaution_code}</span>
                    </li>
                  )
                })
              ) : (
                <li className="text-center">-</li>
              )}
            </ol>
          )
        },
      },
      {
        header: 'Precautions Description',
        accessorKey: 'precautions',
        cell: ({ row }) => {
          const isHasLength =
            Array.isArray(row?.original?.precautions) && row?.original?.precautions?.length

          return (
            <ol start={1} type="1" style={{ listStyleType: isHasLength ? 'decimal' : 'none' }}>
              {isHasLength ? (
                row?.original?.precautions.map((item) => {
                  return (
                    <li key={`precautions-${item?.precaution_id}-${item?.precaution_code}`}>
                      <span>{item?.precaution_desc}</span>
                    </li>
                  )
                })
              ) : (
                <li className="text-center">-</li>
              )}
            </ol>
          )
        },
      },
    ],
  },
  */
]

const AssetsSafetyHazardAndPrecautionsList = ({
  mode,
  setAction,
  setTabIndex,
  isRefetchList,
  setIsRefetchList,
}) => {
  const {
    tableRef,
    selectedRow,
    selectedSafetyRow,
    setSelectedSafetyRow,
    downloadAssetsSafetyHazardAndPrecautions,
    handleSearch,
    searchDebounce,
  } = useAssetsSafetyHazardAndPrecautionsList({
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
          description={selectedRow?.asset_description}
          infoFields={[
            { label: 'Assets ID', value: selectedRow?.asset_num },
            { label: 'Site', value: selectedRow?.site },
          ]}
        />
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
            onClick={downloadAssetsSafetyHazardAndPrecautions}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>

        <hr className="py-1" />

        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.asset_id}
          apiController={useGetAssetsSafetyHazardAndPrecautionsTableList}
          query={{
            site: selectedRow?.site_id,
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.safety_lexicon_id === selectedSafetyRow?.safety_lexicon_id
          }
          onRowClicked={(row) => {
            setSelectedSafetyRow(row?.original)
          }}
          canExpand={true}
          tableSubComponent={ExpandedComponent}
          lengthColumnsHeader={7}
          hasAutoNumber
          isGrouped
        />
      </DetailCard>
    </div>
  )
}

export default AssetsSafetyHazardAndPrecautionsList
