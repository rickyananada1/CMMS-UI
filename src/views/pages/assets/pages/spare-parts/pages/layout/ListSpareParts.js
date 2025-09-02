import React from 'react'
import { Table } from 'src/components/elements/table'

const ListData = (props) => {
  return (
    <Table
      tableRef={props?.tableRef}
      columns={props?.columns}
      parentId={props?.parentId}
      apiController={props?.apiController}
      query={props?.query}
      tableSubComponent={props?.tableSubComponent}
      canExpand={props?.canExpand}
      selectableRowSelected={props?.selectableRowSelected}
      onRowClicked={props?.onRowClicked}
      isWithSearchField={props?.isWithSearchField}
      hasAutoNumber
    />
  )
}

export default ListData
