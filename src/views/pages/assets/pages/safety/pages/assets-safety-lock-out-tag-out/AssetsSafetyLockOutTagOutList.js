import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import { DetailCard } from 'src/components/elements/cards'
import { MdOutlineCloudDownload } from 'react-icons/md'
import useAssetsSafetyLockOutTagOutList from './hooks/useAssetsSafetyLockOutTagOutList'
import {
  useDeleteAssetsSafetyLockOutTagOut,
  useGetAssetsSafetyLockOutTagOutTableList,
} from './services'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GoSearch } from 'react-icons/go'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = ({ row, selectedRow }) => {
  const data = row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="flex items-center justify-between mt-3 mb-1">
        <p className="text-base font-normal text-neutral-text-field text-nowrap">Hazard</p>
        <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
      </div>
      <div className="grid grid-cols-4 mb-3">
        <div>
          <label className="font-light text-body-small">Code</label>
          <p className="text-body-bold">{data?.hazard?.hazard_code ?? '-'}</p>
        </div>
        <div>
          <label className="font-light text-body-small">Description</label>
          <p className="text-body-bold">{data?.hazard?.hazard_desc ?? '-'}</p>
        </div>
      </div>
      {Array.isArray(data?.tag_out_lock_outs) && data?.tag_out_lock_outs?.length ? (
        <Fragment>
          {data?.tag_out_lock_outs.map((item, indexTagOut) => {
            return (
              <Fragment key={`tag-out-${item?.tag_out?.tag_out_id}`}>
                <div className="flex items-center justify-between mt-3 mb-1">
                  <p className="text-base font-normal text-neutral-text-field text-nowrap">
                    Tag Out {indexTagOut + 1}
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <div className="grid grid-cols-4 mb-3">
                  <div>
                    <label className="font-light text-body-small">Code</label>
                    <p className="text-body-bold">{item?.tag_out?.tag_out_code ?? '-'}</p>
                  </div>
                  <div>
                    <label className="font-light text-body-small">Description</label>
                    <p className="text-body-bold">{item?.tag_out?.tag_out_desc ?? '-'}</p>
                  </div>
                  <div>
                    <label className="font-light text-body-small">Apply Sequence</label>
                    <p className="text-body-bold">{item?.tag_out?.apply_sequence ?? '-'}</p>
                  </div>
                  <div>
                    <label className="font-light text-body-small">Remove Sequence</label>
                    <p className="text-body-bold">{item?.tag_out?.remove_sequence ?? '-'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 mb-3">
                  <div>
                    <label className="font-light text-body-small">Asset</label>
                    <p className="text-body-bold">{selectedRow?.asset_num ?? '-'}</p>
                  </div>
                </div>

                {Array.isArray(item?.lock_outs) && item?.lock_outs?.length
                  ? item?.lock_outs?.map((lockOut, indexLockOut) => {
                      return (
                        <Fragment key={`lock-out-${lockOut?.id}`}>
                          <div className="flex items-center justify-between mt-3 mb-1">
                            <p className="text-base font-normal text-neutral-text-field text-nowrap">
                              Lock Out {indexLockOut + 1}
                            </p>
                            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                          </div>
                          <div className="grid grid-cols-4 mb-3">
                            <div>
                              <label className="font-light text-body-small">Description</label>
                              <p className="text-body-bold">{lockOut?.lock_out_desc ?? '-'}</p>
                            </div>
                            <div>
                              <label className="font-light text-body-small">Apply Sequence</label>
                              <p className="text-body-bold">{lockOut?.apply_sequence ?? '-'}</p>
                            </div>
                            <div>
                              <label className="font-light text-body-small">Remove Sequence</label>
                              <p className="text-body-bold">{lockOut?.remove_sequence ?? '-'}</p>
                            </div>
                          </div>
                        </Fragment>
                      )
                    })
                  : null}
                <hr />
              </Fragment>
            )
          })}
        </Fragment>
      ) : null}
    </div>
  )
}

const AssetsSafetyLockOutTagOutList = ({
  mode,
  setAction,
  setTabIndex,
  isRefetchList,
  setIsRefetchList,
}) => {
  const {
    tableRef,
    selectedRow,
    selectedSafetyTagOutRow,
    setSelectedSafetyTagOutRow,
    downloadAssetsSafetyLockOutTagOut,
    handleSearch,
    searchDebounce,
  } = useAssetsSafetyLockOutTagOutList({
    mode,
    setAction,
    setTabIndex,
    isRefetchList,
    setIsRefetchList,
  })

  const columns = [
    {
      header: '',
      size: 10,
      id: 'toggle-lock-out-tag-out',
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
          header: 'Description',
          accessorKey: 'hazard.hazard_desc',
          qName: 'qhazardDesc',
          cell: ({ row }) => (
            <div className="truncate">{row?.original?.hazard?.hazard_desc || '-'}</div>
          ),
        },
        {
          header: 'MSDS',
          accessorKey: 'hazard.msds_num',
          qName: 'qhazardMsds',
          cell: ({ row }) => (
            <div className="text-center">{row?.original?.hazard?.msds_num ?? '-'}</div>
          ),
        },
      ],
    },
    {
      header: 'Tag Out Procedures',
      columns: [
        {
          header: 'Tag Out',
          accessorKey: 'tag_out_lock_outs_tag_out',
          cell: ({ row }) => {
            const isHasLength =
              Array.isArray(row?.original?.tag_out_lock_outs) &&
              row?.original?.tag_out_lock_outs?.length

            return (
              <ol start={1} type="1" style={{ listStyleType: isHasLength ? 'decimal' : 'none' }}>
                {isHasLength ? (
                  row?.original?.tag_out_lock_outs.map((item, index) => {
                    return (
                      <Fragment key={`tag_out_code-${index}`}>
                        <li
                          key={`tag_out_code-${item?.tag_out?.tag_out_id}-${index}`}
                          className="truncate"
                        >
                          <span>{item?.tag_out?.tag_out_code}</span>
                        </li>
                        {item?.lock_outs?.slice(0, -1)?.length > 0 &&
                          item.lock_outs.slice(0, -1).map((itemLock, indexLock) => (
                            <li
                              key={`tag_out_code-${item?.tag_out?.tag_out_id}-${index}-space-${indexLock}`}
                              className="truncate"
                            >
                              <span> </span>
                            </li>
                          ))}
                      </Fragment>
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
          header: 'Description',
          accessorKey: 'tag_out_lock_outs_description',
          cell: ({ row }) => {
            const isHasLength =
              Array.isArray(row?.original?.tag_out_lock_outs) &&
              row?.original?.tag_out_lock_outs?.length

            return (
              <ol start={1} type="1" style={{ listStyleType: isHasLength ? 'decimal' : 'none' }}>
                {isHasLength ? (
                  row?.original?.tag_out_lock_outs.map((item, index) => {
                    return (
                      <Fragment key={`tag_out_desc-${index}`}>
                        <li
                          key={`tag_out_desc-${item?.tag_out?.tag_out_id}-${index}`}
                          className="truncate"
                        >
                          <span>{item?.tag_out?.tag_out_desc}</span>
                        </li>
                        {item?.lock_outs?.slice(0, -1)?.length > 0 &&
                          item.lock_outs.slice(0, -1).map((itemLock, indexLock) => (
                            <li
                              key={`tag_out_desc-${item?.tag_out?.tag_out_id}-${index}-space-${indexLock}`}
                              className="truncate"
                            >
                              <span> </span>
                            </li>
                          ))}
                      </Fragment>
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
          header: 'Asset',
          accessorKey: 'tag_out_lock_outs_asset',
          cell: ({ row }) => {
            const isHasLength =
              Array.isArray(row?.original?.tag_out_lock_outs) &&
              row?.original?.tag_out_lock_outs?.length

            return (
              <ol start={1} type="1" style={{ listStyleType: isHasLength ? 'decimal' : 'none' }}>
                {isHasLength ? (
                  row?.original?.tag_out_lock_outs.map((item, index) => {
                    return (
                      <Fragment key={`tag_out_asset-${index}`}>
                        <li
                          key={`tag_out_asset-${item?.tag_out?.tag_out_id}-${index}`}
                          className="truncate"
                        >
                          <span>{selectedRow?.asset_num}</span>
                        </li>
                        {item?.lock_outs?.slice(0, -1)?.length > 0 &&
                          item.lock_outs.slice(0, -1).map((itemLock, indexLock) => (
                            <li
                              key={`tag_out_asset-${item?.tag_out?.tag_out_id}-${index}-space-${indexLock}`}
                              className="truncate"
                            >
                              <span> </span>
                            </li>
                          ))}
                      </Fragment>
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
    {
      header: 'Lock Out Procedures',
      columns: [
        {
          header: 'Lock Out',
          accessorKey: 'tag_out_lock_outs_lock_out',
          cell: ({ row }) => {
            const isHasLength =
              Array.isArray(row?.original?.tag_out_lock_outs) &&
              row?.original?.tag_out_lock_outs?.length

            return (
              <ol start={1} type="1" style={{ listStyleType: 'none' }}>
                {isHasLength ? (
                  row?.original?.tag_out_lock_outs.map((item, index) => {
                    if (Array.isArray(item?.lock_outs) && item?.lock_outs?.length) {
                      return item?.lock_outs.map((lock) => {
                        return (
                          <li
                            key={`lock_out_desc-${item?.tag_out?.tag_out_id}-${index}-${lock?.lock_out_id}`}
                            className="truncate"
                          >
                            <span>{lock?.lock_out_desc}</span>
                          </li>
                        )
                      })
                    } else {
                      return (
                        <li
                          key={`lock-out-none-${item?.tag_out?.tag_out_id}-${index}`}
                          className="text-center"
                        >
                          -
                        </li>
                      )
                    }
                  })
                ) : (
                  <li className="text-center">-</li>
                )}
              </ol>
            )
          },
        },
        {
          header: 'Apply Sequence',
          accessorKey: 'tag_out_lock_outs_apply',
          cell: ({ row }) => {
            const isHasLength =
              Array.isArray(row?.original?.tag_out_lock_outs) &&
              row?.original?.tag_out_lock_outs?.length

            return (
              <ol style={{ listStyleType: 'none' }}>
                {isHasLength ? (
                  row?.original?.tag_out_lock_outs.map((item, index) => {
                    if (Array.isArray(item?.lock_outs) && item?.lock_outs?.length) {
                      return item?.lock_outs.map((lock) => {
                        return (
                          <li
                            key={`apply_sequence-${item?.tag_out?.tag_out_id}-${index}-${lock?.lock_out_id}`}
                            className="text-center truncate"
                          >
                            <span>{lock?.apply_sequence}</span>
                          </li>
                        )
                      })
                    } else {
                      return (
                        <li
                          key={`lock-out-none-${item?.tag_out?.tag_out_id}-${index}`}
                          className="text-center"
                        >
                          0
                        </li>
                      )
                    }
                  })
                ) : (
                  <li className="text-center">0</li>
                )}
              </ol>
            )
          },
        },
        {
          header: 'Remove Sequence',
          accessorKey: 'tag_out_lock_outs_remove',
          cell: ({ row }) => {
            const isHasLength =
              Array.isArray(row?.original?.tag_out_lock_outs) &&
              row?.original?.tag_out_lock_outs?.length

            return (
              <ol style={{ listStyleType: 'none' }}>
                {isHasLength ? (
                  row?.original?.tag_out_lock_outs.map((item, index) => {
                    if (Array.isArray(item?.lock_outs) && item?.lock_outs?.length) {
                      return item?.lock_outs.map((lock) => {
                        return (
                          <li
                            key={`remove_sequence-${item?.tag_out?.tag_out_id}-${index}-${lock?.lock_out_id}`}
                            className="text-center truncate"
                          >
                            <span>{lock?.remove_sequence}</span>
                          </li>
                        )
                      })
                    } else {
                      return (
                        <li
                          key={`lock-out-none-${item?.tag_out?.tag_out_id}-${index}`}
                          className="text-center"
                        >
                          0
                        </li>
                      )
                    }
                  })
                ) : (
                  <li className="text-center">0</li>
                )}
              </ol>
            )
          },
        },
      ],
    },
  ]

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
            onClick={downloadAssetsSafetyLockOutTagOut}
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
          apiController={useGetAssetsSafetyLockOutTagOutTableList}
          query={{
            site: selectedRow?.site_id,
            q: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.safety_lexicon_id === selectedSafetyTagOutRow?.safety_lexicon_id
          }
          onRowClicked={(row) => {
            setSelectedSafetyTagOutRow(row?.original)
          }}
          tableSubComponent={({ row }) => ExpandedComponent({ row, selectedRow })}
          lengthColumnsHeader={12}
          canExpand
          isGrouped
          hasAutoNumber
        />
      </DetailCard>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedSafetyTagOutRow}
          data_id={selectedRow?.asset_id}
          data_name={`Hazard ${selectedSafetyTagOutRow?.hazard?.hazard_code} Tag Outs and Lock Outs`}
          deleteService={useDeleteAssetsSafetyLockOutTagOut}
          tableRef={tableRef}
          deleteBody={{
            safety_lexicon_ids: [selectedSafetyTagOutRow?.safety_lexicon_id],
          }}
        />
      )}
    </div>
  )
}

export default AssetsSafetyLockOutTagOutList
