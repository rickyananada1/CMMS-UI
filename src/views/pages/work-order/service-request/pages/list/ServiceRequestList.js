/* eslint-disable */
/* prettier-ignore-start */
import React, { useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import { Table } from 'src/components/elements/table'
import { useList } from './hooks'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { useGetServiceRequest } from './services/getServiceRequest'
import { CiFilter } from 'react-icons/ci'
import clsx from 'clsx'
import moment from 'moment'
import { serviceRequestActions } from '../../slices/serviceRequestSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getWoServiceRequests, useGetServiceRequestDetail } from 'src/views/pages/work-order/service-request/pages/service-request/services/serviceReqReuirement'
import { getWoServiceRequest } from '../service-request/services/getServiceReq'



// import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
// import { useDeleteWorkOrder } from '../reporting/pages/quick-reporting-details/services'
const STATUS_STYLES = {
  NEW: {
    label: "NEW",
    class: "border-[#7F7F80] text-[#7F7F80] max-w-[6.5rem]",
  },
  QUEUED: {
    label: "QUEUED",
    class: "border-[#F5BBDE] bg-[#FDF2F9] text-[#7A1D36] max-w-[7rem]",
  },
  WAPPR: {
    label: "WAPPR",
    class: "border-[#F1AEAC] bg-[#F9ECEC] text-[#D46391] max-w-[6rem]",
  },
  IN_PROGRESS: {
    label: "In Progress",
    class: "border-[#BAD1F3] bg-[#E9F1FB] text-[#2671D9] max-w-[8rem]",
  },
  WOCREATED: {
    label: "WO Created",
    class: "border-[#ABB5DC] bg-[#F4F5FA] text-[#2E3368] max-w-[9rem]",
  },
  REVISED: {
    label: "Revised",
    class: "border-[#FFD6AD] bg-[#FFF3E6] text-[#FF8000] max-w-[6.5rem]",
  },
  RESOLVED: {
    label: "Resolved",
    class: "border-[#8ADFC3] bg-[#E2FCF3] text-[#0EA976] max-w-[7rem]",
  },
  CLOSED: {
    label: "Closed",
    class: "border-[#7FB1B1] bg-[#EBF4F5] text-[#2D6A61] max-w-[6rem]",
  },
  CANCEL: {
    label: "Cancel",
    class: "border-[#FD8A8A] bg-[#FFE5E6] text-[#FF5656] max-w-[6rem]",
  },
};

const columns = [
  {
    header: 'Service Request',
    accessorKey: 'ticketid',
    qName: 'qTicketId',
    size: 200,
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
    header: 'Status SR',
    accessorKey: 'status',
    qName: 'qStatus',
    qType: 'select',
    cell: (row) => {
      const value = row.getValue();
      const status = STATUS_STYLES[value] || {
        label: value,
        class: "border-gray-300 bg-gray-100 text-gray-600",
      };

      return (
        <div
          className={clsx(
            "rounded-full text-center font-semibold self-center px-3 py-1 border",
            status.class
          )}
        >
          {status.label}
        </div>
      );
    },

    qOptions: [
      { label: "NEW", value: "NEW" },
      { label: "Queued", value: "QUEUED" },
      { label: "Waiting Approval", value: "WAPPR" },
      { label: "In Progress", value: "IN_PROGRESS" },
      { label: "WO Created", value: "WOCREATED" },
      { label: "Revised", value: "REVISED" },
      { label: "Resolved", value: "RESOLVED" },
      { label: "Closed", value: "CLOSED" },
      { label: "Cancel", value: "CANCEL" },
    ],
  },
  {
    header: 'Reported By',
    accessorKey: 'display_name',
    qName: 'qDisplayName',
    size: 100,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Asset',
    accessorKey: 'asset_num',
    qName: 'qAssetNum',
    size: 250,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
  {
    header: 'Asset Description',
    accessorKey: 'asset_description',
    qName: 'qAssetDescription',
    size: 250,
    cell: (row) => (
      <div style={{ width: `${row.column.getSize()}px` }}>{row.getValue() || '-'}</div>
    ),
  },
]
const ServiceRequestList = ({ mode, setAction }) => {
  const {
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadServiceReq,
    resetSelectedTaskEtc,
  } = useList()


  //   // fetch detail ketika selectedRow berubah
  //  const { data: detailSR, isLoading: isDetailLoading } = useGetServiceRequestDetail({
  //     id: selectedRow?.ticketid,
  //     config: {
  //       enabled: !!selectedRow?.ticketid, // penting agar tidak fetch undefined
  //     },
  //   })

  //   useEffect(() => {
  //     if (detailSR) {
  //       // simpan data lengkap ke Redux
  //       dispatch(serviceRequestActions.setselectedServiceReq(detailSR.data))
  //     }
  //   }, [detailSR, dispatch])

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
            <button className="flex items-center border rounded border-solid px-3 py-2 text-sm">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadServiceReq}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetServiceRequest}
          query={{
            search: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.ticketid === selectedRow?.ticketid
          }
          // onRowClicked={(row) => {
          //     console.log('row.original:', row.original)
          //   setSelectedRow(row.original)
          //   resetSelectedTaskEtc()
          // }}

          // onRowClicked={async (row) => {
          //   const ticketid = row.original?.ticketid
          //   resetSelectedTaskEtc()

          //   if (!ticketid) return

          //   getWoServiceRequest({ id: ticketid })
          //     .then((res) => dispatch(serviceRequestActions.setselectedServiceReq(res.data.data)))
          //     .catch((err) => console.error(err))
          // }}

          onRowClicked={async (row) => {
            // const ticketid = row.original?.ticketid
            // if (!ticketid) return
            setSelectedRow(row.original)
            resetSelectedTaskEtc()
            // try {
            //   const res = await getWoServiceRequest({ id: ticketid })
            //   dispatch(
            //     serviceRequestActions.setSelectedServiceReq(res.data.data)
            //   )
            // } catch (err) {
            //   console.error(err)
            // }
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

export default ServiceRequestList
