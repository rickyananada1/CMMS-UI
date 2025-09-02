import { CContainer, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { Fragment } from 'react'
import { Table, TableClient } from 'src/components/elements/table'
import useFailureReportingDetail from './hooks/useFailureReportingDetail'
import { useGetFailureCodesRemediesTableList } from './services'

const columns = [
  {
    header: 'Problem',
    accessorKey: 'failure_code',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
]

const columnsCauses = [
  {
    header: 'Causes',
    accessorKey: 'failure_code',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
]

const columnsRemedies = [
  {
    header: 'Remedy',
    accessorKey: 'failure_code',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
]

const FailureReportingDetail = ({ setVisible }) => {
  const {
    data,
    selectedRow,
    tableRefProblems,
    tableRefCauses,
    tableRefRemedies,
    selectedCausesRow,
    setSelectedCauses,
    visible,
  } = useFailureReportingDetail()

  return (
    <CModal size="xl" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>
          <h5 className="heading-small">Failure Class Details</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <h4 className="w-full font-semibold">{selectedRow?.description ?? ''}</h4>
          <div className="d-flex flex-row items-center">
            <p>
              Failure Class :{' '}
              <span className="font-semibold">{selectedRow?.failure_code ?? '-'}</span>
            </p>

            {/* <p>
            <span className="text-neutral-text-disabled mx-2">/</span>
          </p>
          <p>
            <span className="text-neutral-text-disabled">Failure Description : </span>
            <span className="text-body-medium text-neutral-primary-text font-medium">
              {selectedRow?.description ?? ''}
            </span>
          </p> */}
          </div>
        </div>
        <hr />
        <CContainer fluid>
          <h4 className="w-full font-semibold">Problem</h4>
          <TableClient
            tableRef={tableRefProblems}
            columns={columns}
            content={data?.problems || []}
          />
          <hr />
          <h4 className="w-full font-semibold">Causes</h4>
          <TableClient
            tableRef={tableRefCauses}
            columns={columnsCauses}
            content={data?.causes || []}
            selectableRowSelected={(row) =>
              row.original?.failure_code_id === selectedCausesRow?.failure_code_id
            }
            onRowClicked={(row) => {
              setSelectedCauses(row.original)
            }}
          />

          <Fragment>
            <hr />
            <div className="d-flex justify-between">
              <h4 className="font-semibold">Remedies</h4>
            </div>
            <Table
              tableRef={tableRefRemedies}
              columns={columnsRemedies}
              parentId={selectedCausesRow?.failure_code_id ?? 0}
              apiController={useGetFailureCodesRemediesTableList}
              hasAutoNumber
            />
          </Fragment>
        </CContainer>
      </CModalBody>
    </CModal>
  )
}

export default FailureReportingDetail
