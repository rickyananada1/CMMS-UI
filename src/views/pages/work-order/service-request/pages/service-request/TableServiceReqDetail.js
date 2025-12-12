/* eslint-disable */
/* prettier-ignore-start */
import React from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { CContainer, CCol, CRow, CFormTextarea } from '@coreui/react'
import { Table } from 'src/components/elements/table'
import { useGetWOTracking } from '../service-request/services/getServiceReq'
import detailServiceReqTable from '../service-request/hooks/detailServiceReqTable'
import useTimeFormatter from 'src/hooks/useTimeFormatter'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'


const columns = [
  {
    header: 'Work Order',
    accessorKey: 'work_order_id',
    size: 120,
    cell: ({ row, getValue, column }) => (
      <div
        style={{
          width: `${column.getSize()}px`,
          cursor: 'pointer',
          color: '#007bff',
          textDecoration: 'underline'
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedRow(row.original);
          // resetSelectedTaskEtc();
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
    accessorKey: 'status',
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

const TableServiceReqDetail = ({ mode, setAction, setTabIndex, setVisible }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadWOTracking,
    // resetSelectedTaskEtc,
  } = detailServiceReqTable({
    mode,
    setAction,
    setTabIndex,
    setVisible,
  })

  const { formatDate, formatDuration } = useTimeFormatter()
  return (
    <>
      <DetailCard className='mt-[-50px] mb-[20px]'>
        <CContainer fluid>
          <div className="flex items-center justify-between -mx-2">
            <p className="mt-2 text-xl font-bold">
              Work Order Related to Service Request
            </p>
          </div>
          <hr className="w-full h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          <Table
            tableRef={tableRef}
            columns={columns}
            apiController={useGetWOTracking}
            query={{
              search: searchDebounce || undefined,
            }}
            selectableRowSelected={(row) =>
              row.original?.work_order_id === selectedRow?.work_order_id
            }
            onRowClicked={(row) => {
              setSelectedRow(row.original)
              // resetSelectedTaskEtc()
            }}
            isAutoSelectFirstRow={false}
            hasAutoNumber
            isWithSearchField
          />
        </CContainer>
      </DetailCard>
    </>
  )
}

export default TableServiceReqDetail
