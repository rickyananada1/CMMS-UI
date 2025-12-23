/* eslint-disable */
/* prettier-ignore-start */
import React, { useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import { Table } from 'src/components/elements/table'
import { useList } from './hooks'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { useGetTicketEcp } from './services/getTicketEcp'
import { CiFilter } from 'react-icons/ci'
import clsx from 'clsx'

const STATUS_STYLES = {
  NEW: {
    label: "NEW",
    class: "border-[#7F7F80] text-[#7F7F80] max-w-[6.5rem]",
  },
  WAPPR: {
    label: "WAPPR",
    class: "border-[#F1AEAC] bg-[#F9ECEC] text-[#D46391] max-w-[6rem]",
  },
  APPR: {
    label: "APPR",
    class: "border-[#3B858E] bg-[#225360] text-[#DBF0F0] max-w-[6rem]",
  },
  REJECT: {
    label: "REJECT",
    class: "border-[#6C1E3C] bg-[#AF2A4F] text-[#F5D6DE] max-w-[6.5rem]",
  },
  WSCH: {
    label: "WSCH",
    class: "border-[#748BF4] bg-[#D0D8FB] text-[#3E4678] max-w-[6rem]",
  },
  INPRG: {
    label: "INPRG",
    class: "border-[#BAD1F3] bg-[#E9F1FB] text-[#2671D9] max-w-[6rem]",
  },
  RESOLVED: {
    label: "Resolved",
    class: "border-[#8ADFC3] bg-[#E2FCF3] text-[#0EA976] max-w-[7rem]",
  },
  COMP: {
    label: "COMP",
    class: "border-[#0695C6] bg-[#FBFBFB] text-[#097FEB] max-w-[6.5rem]",
  },
  CLOSED: {
    label: "Closed",
    class: "border-[#7FB1B1] bg-[#EBF4F5] text-[#2D6A61] max-w-[6rem]",
  },
  CAN: {
    label: "Can",
    class: "border-[#FD8A8A] bg-[#FFE5E6] text-[#FF5656] max-w-[6rem]",
  },
};

const columns = [
  {
    header: 'ECP Number',
    accessorKey: 'ticketid',
    qName: 'qTicketId',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Summary',
    accessorKey: 'description',
    qName: 'qDescription',
    size: 250,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Reported By',
    accessorKey: 'display_name',
    qName: 'qReportedBy',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Status ECP',
    accessorKey: 'status',
    qName: 'qStatus',
    qType: 'select',
    size: 100,
    cell: (row) => {
      const value = row.getValue();
      const status = STATUS_STYLES[value] || {
        label: value,
        class: "border-gray-300 bg-gray-100 text-gray-600",
      };

      return (
        <div
          className={clsx(
            "rounded-full text-center font-semibold self-center px-3 py-1 border-1",
            status.class
          )}
          style={{ width: `${row.column.getSize()}px` }}
        >
          {status.label}
        </div>
      );
    },

    qOptions: [
      { label: "NEW", value: "NEW" },
      { label: "WAPPR", value: "WAPPR" },
      { label: "APPR", value: "APPR" },
      { label: "REJECT", value: "REJECT" },
      { label: "WSCH", value: "WSCH" },
      { label: "INPRG", value: "INPRG" },
      { label: "RESOLVED", value: "RESOLVED" },
      { label: "COMP", value: "COMP" },
      { label: "CLOSED", value: "CLOSED" },
      { label: "CAN", value: "CAN" },
    ],
  },
  {
    header: 'Site',
    accessorKey: 'site',
    qName: 'qSite',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
]
const TicketEcpList = () => {
  const {
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadTicketEcp,
    resetSelectedTaskEtc,
  } = useList()

  return (
    <div>
      <div className="bg-white p-4 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
              <input
                placeholder="Search"
                className="border-none text-sm"
                type="text"
                onChange={(e) => handleSearch(e)}
              />
              <GoSearch color="blue" />
            </div>
            {/* <button className="flex items-center border rounded border-solid px-3 py-2 text-sm">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button> */}
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadTicketEcp}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetTicketEcp}
          query={{
            search: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.ticketid === selectedRow?.ticketid
          }

          onRowClicked={async (row) => {
            setSelectedRow(row.original)
            resetSelectedTaskEtc()
          }}
          isAutoSelectFirstRow={false}
          hasAutoNumber
          isWithSearchField
        />
      </div>
      {/* {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedRow}
          data_id={selectedRow?.ticketid}
          data_name={selectedRow?.work_order_code}
          deleteService={useDeleteWorkOrder}
          tableRef={tableRef}
        />
      )} */}
    </div>
  )
}

export default TicketEcpList
