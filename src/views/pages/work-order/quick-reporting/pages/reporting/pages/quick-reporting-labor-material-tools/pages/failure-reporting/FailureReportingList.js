import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import useFailureReportingList from './hooks/useFailureReportingList'
import { useDeleteFailureReporting, useGetFailureReportingList } from './services'
import FailureReportingDetail from './FailureReportingDetail'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'

const FailureReportingList = ({ mode, setAction }) => {
  const {
    tableRef,
    selectedRow,
    selectedFailureRow,
    setSelectedFailureRow,
    downloadFailureCodes,
    searchDebounce,
    setSearch,
    setDetailVisible,
  } = useFailureReportingList()

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h6 className="text-body-bold">Failure Reporting</h6>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <InputGlobalSearch onChange={setSearch} />
        <button
          className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
          onClick={downloadFailureCodes}
        >
          <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
          Download
        </button>
      </div>
      <Table
        tableRef={tableRef}
        columns={columns}
        apiController={useGetFailureReportingList}
        parentId={selectedRow?.work_order_id}
        query={{ search: searchDebounce || undefined }}
        hasAutoNumber
        selectableRowSelected={(row) =>
          row.original?.failure_code_id === selectedFailureRow?.failure_code_id
        }
        onRowClicked={(row) => {
          setSelectedFailureRow(row.original)
          setDetailVisible(true)
        }}
        isWithSearchField
        canRefetch
      />
      <FailureReportingDetail setVisible={setDetailVisible} />
      {mode === 'Delete Failure' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedFailureRow}
          data_id={selectedFailureRow?.work_order_failure_id}
          data_name={selectedFailureRow?.failure_code}
          data_parent_id={selectedRow?.work_order_id}
          deleteService={useDeleteFailureReporting}
          deleteBody={[
            {
              failure_code_id: selectedFailureRow?.failure_code_id,
              work_order_failure_id: selectedFailureRow?.work_order_failure_id,
            },
          ]}
          tableRef={tableRef}
        />
      )}
    </Fragment>
  )
}

const columns = [
  {
    header: 'Failure Class',
    accessorKey: 'failure_code',
    enableSorting: false,
    qName: 'qFailureClass',
  },
  {
    header: 'Description',
    accessorKey: 'description',
    enableSorting: false,
    qName: 'qDescription',
  },
  {
    header: 'Organization',
    accessorKey: 'organization_name',
    enableSorting: false,
    qName: 'qOrganizationName',
  },
]

export default FailureReportingList
