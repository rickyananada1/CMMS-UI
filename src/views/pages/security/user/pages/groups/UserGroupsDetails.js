import React from 'react'
import useGroups from './hooks/useGroups'
import { CCol, CContainer, CRow, CSpinner } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import DataTable from 'react-data-table-component'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = ({ data }) => {
  return (
    <CContainer fluid className="my-4 mx-5">
      <CRow>
        <h5 className="font-semibold">Details</h5>
      </CRow>
      <CRow className="mt-3">
        <CCol>
          <label className="text-neutral-text-field">Group</label>
          <br />
          <span className="font-semibold">{data?.security_group_code ?? '-'}</span>
        </CCol>
        <CCol>
          <label className="text-neutral-text-field">Description</label>
          <br />
          <span className="font-semibold">{data?.security_group_description ?? '-'}</span>
        </CCol>
        <CCol>
          <label className="text-neutral-text-field">Is Authorized</label>
          <br />
          <img
            src={data?.is_authorized ? CheckTag : XTag}
            width={15}
            height={15}
            alt={data?.is_authorized}
          />
        </CCol>
      </CRow>
    </CContainer>
  )
}

const type_options = [
  {
    value: 1,
    label: 'Daily User',
  },
  {
    value: 2,
    label: 'Secondary User',
  },
  {
    value: 3,
    label: 'Requester',
  },
  {
    value: 4,
    label: 'Admin',
  },
  {
    value: 5,
    label: 'Super Admin',
  },
]

const UserGroupsDetails = ({ mode, setAction, setTabIndex }) => {
  const { data, isLoading, selectedRow, downloadGroups } = useGroups({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <DetailCard isLoading={isLoading}>
      <CardHeader
        description={selectedRow?.username}
        infoFields={[
          { label: 'User', value: selectedRow.display_name },
          { label: 'Status', value: selectedRow.is_active ? 'Active' : 'Inactive' },
          {
            label: 'Type',
            value: `${type_options.find((val) => val.value === selectedRow?.type)?.label}`,
          },
        ]}
        onDownload={downloadGroups}
      />
      <hr />
      <CContainer fluid>
        <div className="border rounded border-solid mt-3">
          <DataTable
            columns={columns}
            data={data}
            pagination
            expandableRows={true}
            expandableRowsComponent={ExpandedComponent}
            progressPending={isLoading}
            progressComponent={
              <div className="m-3">
                <CSpinner color="primary" />
              </div>
            }
          />
        </div>
      </CContainer>
    </DetailCard>
  )
}

const columns = [
  {
    name: 'Group',
    selector: (row) => row?.security_group_code ?? '-',
    sortable: true,
    filterable: true,
  },
  {
    name: 'Description',
    selector: (row) => row?.security_group_description ?? '-',
    sortable: true,
    filterable: true,
  },
  {
    name: 'Is Authorized',
    selector: 'is_authorized',
    enableSorting: true,
    cell: (row) => (
      <img
        src={row?.is_authorized ? CheckTag : XTag}
        width={15}
        height={15}
        alt={row?.is_authorized}
      />
    ),
  },
]

export default UserGroupsDetails
