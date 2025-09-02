import React, { Fragment } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { CFormCheck } from '@coreui/react'
import useApplicationsLists from './hooks/useApplicationsLists'
import { Table } from 'src/components/elements/table'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { useGetSecurityGroupsApplicationsPermissionsTableList } from './services'
import { GoSearch } from 'react-icons/go'

const columns = [
  {
    header: 'Application',
    accessorKey: 'application_name',
  },
  ...['create', 'read', 'update', 'delete'].map((item, index) => ({
    id: `security-group-${index}-${item}`,
    header: () => (
      <div id={`header-security-group-${index}-${item}`} className="text-center capitalize">
        {item}
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <CFormCheck checked={row?.original?.[item]} readOnly />
      </div>
    ),
  })),
]

const SecurityGroupApplicationsLists = ({ mode, setAction, visible, setVisible }) => {
  const {
    tableRef,
    selectedRow,
    downloadSecurityGroupsApplications,
    isLoading,
    searchDebounce,
    handleSearch,
  } = useApplicationsLists({
    mode,
    setAction,
    visible,
    setVisible,
  })

  return (
    <Fragment>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={selectedRow?.security_group_description}
          infoFields={[{ label: 'Group', value: selectedRow?.security_group_code }]}
          onDownload={downloadSecurityGroupsApplications}
        />
        <hr />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
              <input
                placeholder="Search"
                className="border-none text-sm"
                type="text"
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
              <GoSearch color="blue" />
            </div>
          </div>
          <div />
        </div>
        <div>
          <Table
            tableRef={tableRef}
            columns={columns}
            parentId={selectedRow?.security_group_id}
            apiController={useGetSecurityGroupsApplicationsPermissionsTableList}
            query={{
              search: searchDebounce || undefined,
            }}
            isWithSearchField={false}
            hasAutoNumber
          />
        </div>
      </DetailCard>
    </Fragment>
  )
}

export default SecurityGroupApplicationsLists
