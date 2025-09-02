import React, { Fragment, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useLocation } from 'react-router-dom'
import { getTableLastCurrentParams, setTableLastParams } from '../../../utils/base'
import { HiExclamationCircle } from 'react-icons/hi2'
import { GoSearch } from 'react-icons/go'
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDebouncedCallback } from 'src/hooks/useDebounce'

import { Pagination } from './Pagination'
import { LuArrowDownUp } from 'react-icons/lu'
import { DatePicker } from '../datepicker'
import moment from 'moment'
import { FaRegFileAlt } from 'react-icons/fa'

const TableWrapper = (props) => {
  const {
    columns,
    content,
    perPage = 2,
    hasAutoNumber = false,
    query,
    actions,
    actionsPath,
    customActions,
    pageCount = 0,
    messageError,
    isError,
    isLoading,
    isFetching,
    isDetail,
    isWithSearchField,
    canExpand,
    tableSubComponent,
    filterData,
    hidePagination = false,
    hideHeader = false,
    hidePerPage = false,
    tableClass = 'min-w-full',
    isGrouped,
    setPage = () => {},
    localPagination = false,
    disableLocalPagination = false,
    limit,
    handleLimit,
    onRowClicked,
    selectableRowSelected,
    isAutoSelectFirstRow,
    lengthColumnsHeader,
    storeKey = 'default',
    enableStickyHeader = false,
    enableStickyFooter = false,
    ...rest
  } = props

  const location = useLocation().pathname
  const paramsFromStorage = getTableLastCurrentParams(location, storeKey)
  const [currentPage, setCurrentPage] = useState(paramsFromStorage.currentPage)
  const [sort, setSort] = useState(paramsFromStorage.sort)
  const [order, setOrder] = useState(paramsFromStorage.order)
  const [expanded, setExpanded] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [searchField, setSearchField] = useState({})

  const handleSearchField = ({ value, key }) => {
    const updatedSearchField = { ...searchField, [key]: value }
    setSearchField(updatedSearchField)
    const dataToStore = {
      currentPage: currentPage,
      pathname: location,
      query: { ...query, ...updatedSearchField },
      sort: sort,
      order: order,
    }

    setTableLastParams(dataToStore, storeKey)
  }

  const debouncedHandleSearchField = useDebouncedCallback(handleSearchField, 500)

  const storeCurrentParams = () => {
    const dataToStore = {
      currentPage: currentPage,
      pathname: location,
      query: query,
      sort: sort,
      order: order,
    }
    setTableLastParams(dataToStore, storeKey)
  }

  const handleClickSort = ({ orderParam, sortParam }) => {
    setSort(sortParam)
    setOrder(orderParam)
  }

  const clearDates = (qName) => {
    debouncedHandleSearchField({
      value: null,
      key: qName,
    })
  }

  const renderSearchField = (qName, qType = 'string', qOptions = []) => {
    switch (qType) {
      case 'select':
        return (
          <div className="flex items-center justify-between py-2 pl-4 pr-2 border border-solid rounded">
            <select
              className="w-full border-none text-body-small fw-normal"
              onChange={(event) => {
                debouncedHandleSearchField({
                  value: event?.target?.value,
                  key: qName,
                })
              }}
            >
              <option key={`${qName}-option-all`} value={''}>
                All
              </option>
              {qOptions.map((option, index) => (
                <option
                  key={`${qName}-option-${index}`}
                  value={option?.value}
                  selected={
                    paramsFromStorage?.query &&
                    paramsFromStorage?.query[`q${qName}`] === option?.value
                  }
                >
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        )
      case 'bool':
        return (
          <div className="flex items-center justify-center py-2 pl-4 pr-2">
            <input
              className="scale-125"
              type="checkbox"
              defaultValue={
                paramsFromStorage?.query && qName ? paramsFromStorage?.query[`q${qName}`] : ''
              }
              onChange={(event) =>
                debouncedHandleSearchField({
                  value: event?.target?.checked,
                  key: qName,
                })
              }
            />
          </div>
        )
      case 'date':
        return (
          <div className="flex items-center px-3 py-2 mr-2 text-sm font-normal border border-solid rounded">
            <DatePicker
              selected={paramsFromStorage?.query && qName ? paramsFromStorage?.query[qName] : ''}
              onChange={(date) => {
                debouncedHandleSearchField({
                  value: moment(date).format('YYYY-MM-DD'),
                  key: qName,
                })
              }}
              onClear={() => clearDates(qName)}
            />
          </div>
        )
      case 'none':
        return <div></div>
      default:
        return (
          <div className="flex items-center justify-between py-2 pl-4 pr-2 border border-solid rounded">
            <input
              placeholder="Search"
              className="w-full border-none text-body-small fw-normal"
              type="text"
              defaultValue={
                paramsFromStorage?.query && qName ? paramsFromStorage?.query[`q${qName}`] : ''
              }
              onChange={(event) => {
                debouncedHandleSearchField({
                  value: event?.target?.value,
                  key: qName,
                })
              }}
            />
            <GoSearch color="blue" />
          </div>
        )
    }
  }

  useEffect(() => {
    if (!localPagination) {
      setPage(currentPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, setPage])

  useEffect(() => {
    storeCurrentParams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order])

  const hasAction = customActions

  const memoizedData = useMemo(() => {
    if (onRowClicked !== undefined && isAutoSelectFirstRow) {
      onRowClicked({ original: content[0] })
    }

    return content?.map((val, idx) => {
      return {
        ...val,
        ...(hasAutoNumber && {
          autoNumber: idx + 1 + (currentPage - 1) * perPage,
        }),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, filterData])

  const memoizedColumns = useMemo(
    () => [...columns], // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns],
  )

  const localPagedData = memoizedData?.slice(
    (currentPage - 1) * perPage,
    Math.min(currentPage * perPage),
  )

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: !localPagination || disableLocalPagination ? memoizedData : localPagedData,
    columns: memoizedColumns,
    state: {
      expanded,
      rowSelection,
    },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => {
      return canExpand === true
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    defaultColumn: {
      enableSorting: false,
    },
    manualPagination: true,
    pageCount,
    manualSorting: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
  })

  const noDataFound = !isFetching && (!memoizedData || memoizedData.length === 0)
  const stickyFooterBodyHeight = '!h-[calc(100%-95px)]'

  return (
    <div className="flex flex-col h-full overflow-visible bg-white rounded-md min-w-full" {...rest}>
      <div
        className={clsx(
          // isDetailScreen && "is-detail"
          'table-view h-full relative border-2 border-solid border-[#E5E7E9] mt-3 rounded-lg',
          enableStickyFooter && stickyFooterBodyHeight,
        )}
      >
        {isError && !isLoading ? (
          <div
            className={clsx(
              // isDetailScreen && "is-detail"
              'table-view flex w-full flex-col items-center justify-center text-gray-500 m-5',
            )}
          >
            <HiExclamationCircle className="w-12 h-12" />
            <h3 className="mt-1 font-semibold">
              {isError ? (messageError ? messageError : 'No Data Found') : 'No Data Found'}
            </h3>
          </div>
        ) : (
          <div className="overflow-auto table-view h-full">
            <table className={`${tableClass}`}>
              <thead
                className={clsx(
                  hideHeader && 'hidden',
                  'text-[#4D5E80] border-b-4 border-[#E5E7E9]',
                  enableStickyHeader && 'sticky top-0 bg-white z-10',
                )}
              >
                {getHeaderGroups().map((headerGroup) => (
                  <Fragment key={headerGroup.id}>
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => {
                        const isLastInGroup =
                          header?.depth > 0 &&
                          header?.column?.parent &&
                          header?.column?.parent?.columns[
                            header?.column?.parent?.columns.length - 1
                          ]?.id === header?.id

                        const dividerOnEachGroupHeader =
                          header.colSpan === headerGroup.headers[index]?.column?.columns?.length

                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className={clsx(
                              'whitespace-nowrap px-3 py-3 text-base font-semibold tracking-wider',
                              isDetail && 'is-detail',
                              isGrouped &&
                                (header.column.columns?.length || !header.column.columnDef.header)
                                ? 'border-b-2 text-center bg-gray-200'
                                : 'text-left',
                              header.column.columnDef.meta?.className || '',
                              `w-[${
                                header.column.columnDef.size ? header.column.columnDef.size : 175
                              }px]`,
                              // Border Header Divider on Each Group Header
                              dividerOnEachGroupHeader && 'border-r-2',
                              isLastInGroup && 'border-r-2',
                            )}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={clsx([
                                  'items-center',
                                  header.column.getCanSort() &&
                                    'flex justify-between cursor-pointer select-none',
                                  isGrouped && 'w-full',
                                  `w-[${
                                    header.column.columnDef.size
                                      ? header.column.columnDef.size
                                      : 100
                                  }px]`,
                                ])}
                                role="presentation"
                                {...{
                                  onClick: header.column.getToggleSortingHandler(),
                                }}
                              >
                                <span>
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </span>
                                {header.column.getCanSort() && (
                                  <div>
                                    {{
                                      asc: (
                                        <HiOutlineSortAscending
                                          className="h-5 w-5 text-[#93B8EC]"
                                          onClick={() =>
                                            handleClickSort({
                                              orderParam: 'desc',
                                              sortParam:
                                                header.column.columnDef?.sortName ||
                                                header.column.columnDef.header.toLowerCase(),
                                            })
                                          }
                                        />
                                      ),
                                      desc: (
                                        <HiOutlineSortDescending
                                          className="h-5 w-5 text-[#93B8EC]"
                                          onClick={() =>
                                            handleClickSort({
                                              orderParam: null,
                                              sortParam: null,
                                            })
                                          }
                                        />
                                      ),
                                    }[header.column.getIsSorted()] ??
                                      (header.column.getCanSort() ? (
                                        <LuArrowDownUp
                                          className="h-5 w-5 text-[#93B8EC]"
                                          onClick={() =>
                                            handleClickSort({
                                              orderParam: 'asc',
                                              sortParam:
                                                header.column.columnDef?.sortName ||
                                                header.column.columnDef.header.toLowerCase(),
                                            })
                                          }
                                        />
                                      ) : null)}
                                  </div>
                                )}
                              </div>
                            )}
                          </th>
                        )
                      })}
                    </tr>
                    <tr>
                      {isWithSearchField &&
                        headerGroup.headers.map((header) => {
                          const isLastInGroup =
                            header?.depth > 0 &&
                            header?.column?.parent &&
                            header?.column?.parent?.columns[
                              header?.column?.parent?.columns.length - 1
                            ]?.id === header?.id

                          return (
                            <th
                              key={`search-header-${header?.id}`}
                              className={isLastInGroup ? 'border-r-2' : ''}
                            >
                              {!header?.column?.columns?.length &&
                              header?.column?.columnDef?.qName ? (
                                <div className="px-3 pb-3">
                                  {renderSearchField(
                                    header?.column?.columnDef?.qName,
                                    header?.column?.columnDef?.qType ?? 'string',
                                    header?.column?.columnDef?.qOptions ?? [],
                                  )}
                                  {/* <div className="flex items-center justify-between py-2 pl-4 pr-2 border border-solid rounded">
                                    <input
                                      placeholder="Search"
                                      className="w-full border-none text-body-small fw-normal"
                                      type="text"
                                      defaultValue={
                                        paramsFromStorage?.query && header?.column?.columnDef?.qName
                                          ? paramsFromStorage.query[
                                              `q${header.column.columnDef.qName}`
                                            ]
                                          : ''
                                      }
                                      onChange={(event) =>
                                        debouncedHandleSearchField({
                                          event,
                                          key: header?.column?.columnDef?.qName,
                                        })
                                      }
                                    />
                                    <GoSearch color="blue" />
                                  </div> */}
                                </div>
                              ) : null}
                            </th>
                          )
                        })}
                    </tr>
                  </Fragment>
                ))}
              </thead>
              <tbody className="text-[#4D5E80] divide-y-2 divide-[#E5E7E9]">
                {noDataFound && !isFetching ? (
                  <tr>
                    <td
                      colSpan={
                        (typeof lengthColumnsHeader === 'number'
                          ? lengthColumnsHeader
                          : isGrouped
                          ? getAllColumns().reduce((maxLength, col) => {
                              return Math.max(maxLength, col.columns.length)
                            }, 0)
                          : getAllColumns().length) + (canExpand ? 2 : 0)
                      }
                    >
                      <div className="flex flex-col items-center justify-center w-full p-3 text-gray-500 table-view">
                        <FaRegFileAlt className="w-9 h-9" />
                        <h4 className="mt-2 font-semibold">
                          Currently, there is no data to display.
                        </h4>
                      </div>
                    </td>
                  </tr>
                ) : !noDataFound && !isFetching ? (
                  getRowModel().rows?.map((row) => {
                    const rows = row.getVisibleCells()

                    return (
                      <Fragment key={row.id}>
                        <tr
                          className={clsx(
                            'table-data-cell selected-row',
                            typeof selectableRowSelected === 'function' &&
                              selectableRowSelected(row)
                              ? 'row-active cursor-pointer'
                              : null,
                          )}
                          onClick={() => {
                            if (onRowClicked !== undefined) onRowClicked(row)
                          }}
                        >
                          {rows?.map((cell, idx) => (
                            <td
                              role="presentation"
                              className={clsx(
                                'px-3',
                                hasAction && idx !== rows.length - 1 && 'py-3',
                                isDetail && 'py-3',
                                !hasAction && 'py-3',
                                cell.column.columnDef?.size
                                  ? `w-[${cell.column.columnDef?.size}px]`
                                  : 'w-[100px]',
                                // isGrouped && 'border-solid border-2 border-gray-400',
                              )}
                              onClick={(event) => {
                                event.preventDefault()
                                storeCurrentParams()
                              }}
                              key={cell.id}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                        {canExpand && tableSubComponent && row.getIsExpanded() && (
                          <tr className="bg-[#f3f4f6]">
                            <td colSpan={row.getVisibleCells().length}>
                              {tableSubComponent({ row })}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })
                ) : (
                  <tr>
                    {Array.from({ length: getAllColumns().length }, (x, i) => i)?.map((elm) => (
                      <td key={elm} className="px-3 py-1 animate-pulse">
                        <Skeleton className="w-full h-full p-2 my-4 bg-slate-200" />
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {!(hidePagination || isError || (localPagination && disableLocalPagination)) && (
        <div
          className={clsx(
            'flex flex-col items-center justify-center md:flex-row md:justify-between',
            enableStickyFooter && 'sticky bottom-0 bg-neutral-white z-10',
          )}
        >
          {!isFetching ? (
            <Pagination
              limit={limit}
              handleLimit={(val) => {
                if (pageCount < val * currentPage) {
                  setCurrentPage(1)
                }
                handleLimit(val)
              }}
              totalData={!localPagination ? pageCount : memoizedData.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={(val) => setCurrentPage(val.selected + 1)}
              hidePerPage={hidePerPage}
            />
          ) : (
            <>
              <div className="h-full w-full max-w-[220px] animate-pulse bg-slate-200 p-3" />
              <div className="h-full w-full max-w-[320px] animate-pulse bg-slate-200 p-4" />
            </>
          )}
        </div>
      )}
    </div>
  )
  // return null
}

export default TableWrapper
