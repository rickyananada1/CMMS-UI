import React from 'react'
import TableWrapper from './TableWrapper'

export const TableClient = (props) => {
  const {
    columns,
    content,
    perPage = 10,
    hasAutoNumber = false,
    keyId = 'id',
    keyName = 'name',
    query,
    actions,
    customActions,
    messageError,
    isError,
    isLoading,
    isFetching,
    isDetail,
    canExpand,
    tableSubComponent,
    filterData,
    hideHeader = false,
    tableClass = 'min-w-full',
    useBorder = true,
    isGrouped = false,
    disableLocalPagination = true,
    setPage = () => {},
    totalData = 0,
    onRowClicked,
    selectableRowSelected,
    isAutoSelectFirstRow = false,
    ...rest
  } = props
  const pageCount = content?.length || 0

  return (
    <>
      <TableWrapper
        columns={columns}
        content={content}
        perPage={perPage}
        hasAutoNumber={hasAutoNumber}
        keyId={keyId}
        keyName={keyName}
        query={query}
        actions={actions}
        customActions={customActions}
        pageCount={totalData === 0 ? pageCount : totalData}
        messageError={messageError}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        isDetail={isDetail}
        canExpand={canExpand}
        tableSubComponent={tableSubComponent}
        filterData={filterData}
        hideHeader={hideHeader}
        tableClass={tableClass}
        useBorder={useBorder}
        isGrouped={isGrouped}
        disableLocalPagination={disableLocalPagination}
        setPage={setPage}
        localPagination={totalData === 0}
        onRowClicked={onRowClicked}
        selectableRowSelected={selectableRowSelected}
        isAutoSelectFirstRow={isAutoSelectFirstRow}
        {...rest}
      />
    </>
  )
}
