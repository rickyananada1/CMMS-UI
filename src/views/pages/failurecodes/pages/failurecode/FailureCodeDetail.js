import React, { Fragment } from 'react'
import useFailureCodeDetail from './hooks/useFailureCodeDetail'
import { CContainer } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { TableClient, Table } from 'src/components/elements/table'
import { useGetFailureCodesRemediesTableList } from './services'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = (row) => {
  const data = row?.row?.original
  return (
    <div className="px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-5 my-3">
        <div>
          <label className="text-slate-400">Cause</label>
          <p className="font-bold">{data?.failure_code ? data.failure_code : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Description</label>
          <p className="font-bold">{data?.description ? data.description : '-'}</p>
        </div>
      </div>
    </div>
  )
}

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

const columnsRemedies = (handleDeleteRemedies) => [
  {
    header: 'Remedy',
    accessorKey: 'failure_code',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Action',
    id: 'action-remedies',
    size: 10,
    cell: ({ row }) => {
      return (
        <button
          style={{ cursor: 'pointer', padding: '10px' }}
          onClick={() => handleDeleteRemedies(row?.original)}
        >
          <CIcon icon={cilTrash} customClassName="w-5 h-5 text-red-main" />
        </button>
      )
    },
  },
]

const FailureCodeDetail = ({ mode, setAction, setTabIndex }) => {
  const {
    data,
    isLoading,
    selectedRow,
    tableRefProblems,
    tableRefCauses,
    tableRefRemedies,
    selectedCausesRow,
    selectedRemediesRow,
    setSelectedCauses,
    setSelectedRemedies,
    handleDeleteRemedies,
  } = useFailureCodeDetail({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <DetailCard isLoading={isLoading}>
      <CardHeader
        description={selectedRow?.description}
        infoFields={[{ label: 'Failure Class', value: selectedRow?.failure_code }]}
      />
      <hr />
      <CContainer fluid>
        <h4 className="w-full font-semibold">Problem</h4>
        <TableClient
          tableRef={tableRefProblems}
          columns={columns}
          content={data?.problems || []}
          canExpand={true}
          tableSubComponent={ExpandedComponent}
        />
        <hr />
        <h4 className="w-full font-semibold">Causes</h4>
        <TableClient
          tableRef={tableRefCauses}
          storeKey="causes"
          columns={columnsCauses}
          content={data?.causes || []}
          canExpand={true}
          selectableRowSelected={(row) =>
            row.original?.failure_code_id === selectedCausesRow?.failure_code_id
          }
          onRowClicked={(row) => {
            setSelectedCauses(row.original)
            setSelectedRemedies(null)
          }}
          tableSubComponent={ExpandedComponent}
        />

        <Fragment>
          <hr />
          <div className="d-flex justify-between">
            <h4 className="font-semibold">Remedies</h4>
          </div>
          {}
          <Table
            tableRef={tableRefRemedies}
            storeKey="remedies"
            columns={columnsRemedies(handleDeleteRemedies)}
            parentId={selectedCausesRow?.failure_code_id ?? 0}
            apiController={useGetFailureCodesRemediesTableList}
            selectableRowSelected={(row) =>
              row.original?.failure_code_id === selectedRemediesRow?.failure_code_id
            }
            onRowClicked={(row) => {
              setSelectedRemedies(row.original)
            }}
            hasAutoNumber
          />
        </Fragment>
      </CContainer>
    </DetailCard>
  )
}

export default FailureCodeDetail
