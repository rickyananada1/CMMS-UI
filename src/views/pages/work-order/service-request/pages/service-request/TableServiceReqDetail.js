/* eslint-disable */
/* prettier-ignore-start */
import React, { useState, useEffect } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { CContainer } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { Table } from 'src/components/elements/table'
import { useGetTableServiceWO } from '../service-request/services/getServiceReq'
import detailServiceReqTable from '../service-request/hooks/detailServiceReqTable'

const TableServiceReqDetail = ({ mode, setAction, setTabIndex, setVisible }) => {
  const {
    selectedRow,
    setSelectedRow,
    detailTableRef,
    serviceRequestDetailData,
    selectedServiceReq,
    searchDebounce,
  } = detailServiceReqTable({
    mode,
    setAction,
    setTabIndex,
    setVisible,
  })

  const columns = [
    {
      header: 'Work Order',
      accessorKey: 'work_order_id',
      size: 120,
      cell: ({ row, getValue, column }) => (
        <div
          style={{
            width: `${column.getSize()}px`,
            cursor: getValue() ? 'pointer' : 'default',
            color: getValue() ? '#007bff' : '#000',
            textDecoration: getValue() ? 'underline' : 'none',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedRow(row.original)
          }}
        >
          {getValue() || '-'}
        </div>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
      size: 450,
      cell: ({ getValue, column }) => (
        <div
          style={{
            width: `${column.getSize()}px`,
            pointerEvents: 'none',
          }}
        >
          {getValue() || '-'}
        </div>
      ),
    },
    {
      header: 'Work Type',
      accessorKey: 'work_type',
      size: 110,
      cell: ({ getValue, column }) => (
        <div
          style={{
            width: `${column.getSize()}px`,
            pointerEvents: 'none',
          }}
        >
          {getValue() || '-'}
        </div>
      ),
    },
    {
      header: 'Status',
      accessorFn: (row) => row.status?.work_order_status_enum,
      size: 110,
      cell: ({ getValue, column }) => (
        <div
          style={{
            width: `${column.getSize()}px`,
            pointerEvents: 'none',
          }}
        >
          {getValue() || '-'}
        </div>
      ),
    },
  ]

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { uuid } = useParams()
  useEffect(() => {
    if (!selectedServiceReq && uuid) {
      getServiceReq.mutate({ id: uuid }, {
        onSuccess: (data) => dispatch(serviceRequestActions.setServiceRequestDetailData(data))
      })
    }
  }, [uuid])

  return (
    <DetailCard className='mt-[-50px] mb-[20px]'>
      <CContainer fluid>
        <p className="mt-2 text-xl font-bold">
          Work Order Related to Service Request
        </p>
        <hr className="w-full h-[1px] mt-[8px] bg-neutral-stroke" />
        <Table
          storeKey="service-request-detail"
          data={serviceRequestDetailData}
          tableRef={detailTableRef}
          columns={columns}
          apiController={useGetTableServiceWO}
          getRowId={(row) => String(row.work_order_id)}
          query={{
            id: selectedServiceReq?.uuid,
            page,
            limit,
            search: searchDebounce,
          }}
          selectableRowSelected={(row) =>
            row.original?.work_order_id === selectedRow?.work_order_id
          }
          onRowClicked={(row) => setSelectedRow(row.original)}
          isAutoSelectFirstRow={false}
          hasAutoNumber
          isWithSearchField
        />
      </CContainer>
    </DetailCard>
  )
}

export default TableServiceReqDetail
