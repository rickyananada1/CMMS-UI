import React, { useEffect } from 'react'
import { useImperativeHandle, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getTableLastCurrentParams } from '../../../utils/base'
import TableWrapper from './TableWrapper'
import { useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'

export const Table = (props) => {
  const {
    columns,
    keyId = 'id',
    keyName = 'name',
    perPage = 10,
    debounceSorting = 400,
    hasAutoNumber = false,
    // onClickRow,
    apiController,
    actions,
    customActions,
    tableRef,
    query = {},
    // access,
    isDetail,
    isWithSearchField,
    filterSearchKey = true,
    defaultSort,
    // getDataCallback,
    // isNoActionDetail = false,
    parentId,
    parentName,
    apiParentKey,
    canExpand,
    tableSubComponent,
    filterData,
    hidePagination = false,
    hideHeader = false,
    hidePerPage = false,
    tableClass = 'min-w-full',
    canRefetch,
    onRowClicked,
    selectableRowSelected,
    isAutoSelectFirstRow = false,
    lengthColumnsHeader,
    storeKey = 'default',
    enableStickyHeader,
    enableStickyFooter,
    ...rest
  } = props

  const location = useLocation().pathname
  const paramsFromStorage = getTableLastCurrentParams(location, storeKey)
  const refreshToggle = useSelector((state) => state.table?.refreshToggle)

  const filteredKeySearchField = Object.keys(
    typeof paramsFromStorage.query === 'object' ? paramsFromStorage.query : {},
  ).filter((key) => (filterSearchKey ? key.startsWith('q') : true))

  const filteredObjectSearchField = filteredKeySearchField.reduce((acc, key) => {
    acc[key] = paramsFromStorage.query[key]
    return acc
  }, {})

  const [limit, setLimit] = useState(perPage)
  const [currentPage, setCurrentPage] = useState(paramsFromStorage.currentPage)

  const handleLimit = (val) => {
    if (pageCount < val * currentPage) {
      setCurrentPage(1)
    }
    setLimit(val)
  }

  const { data, isFetching, isError, error, refetch, isLoading } = apiController({
    id: parentId,
    name: parentName,
    params: {
      page: currentPage,
      limit: limit,
      sorting: useDebounce([], debounceSorting) || defaultSort,
      sort: paramsFromStorage.sort || null,
      order: paramsFromStorage.order || null,
      ...(isWithSearchField ? { ...filteredObjectSearchField, ...query } : query ? query : {}),
    },
  })

  useImperativeHandle(tableRef, () => ({
    update: () => {
      refetch()
    },
    setPage: (page) => {
      setCurrentPage(page)
    },
  }))

  const getError = error
  const pageCount = data?.data?.total || 0
  const content = data?.data?.data || []
  const totalData = data?.data?.total || 0

  useEffect(() => {
    if (!isFetching) {
      if (currentPage > Math.ceil(totalData / limit)) {
        setCurrentPage(1)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToggle])

  return (
    <TableWrapper
      limit={limit}
      handleLimit={handleLimit}
      columns={columns}
      content={content}
      perPage={perPage}
      hasAutoNumber={hasAutoNumber}
      keyId={keyId}
      keyName={keyName}
      query={query}
      actions={actions}
      customActions={customActions}
      pageCount={pageCount}
      messageError={getError?.response?.data?.message || getError?.message}
      isError={isError}
      isLoading={isLoading}
      isFetching={isFetching}
      isDetail={isDetail}
      isWithSearchField={isWithSearchField}
      canExpand={canExpand}
      tableSubComponent={tableSubComponent}
      filterData={filterData}
      hideHeader={hideHeader}
      tableClass={tableClass}
      setPage={setCurrentPage}
      localPagination={pageCount === 0}
      onRowClicked={onRowClicked}
      selectableRowSelected={selectableRowSelected}
      isAutoSelectFirstRow={isAutoSelectFirstRow}
      hidePagination={hidePagination}
      hidePerPage={hidePerPage}
      lengthColumnsHeader={lengthColumnsHeader}
      storeKey={storeKey}
      enableStickyHeader={enableStickyHeader}
      enableStickyFooter={enableStickyFooter}
      {...rest}
    />
  )
}
