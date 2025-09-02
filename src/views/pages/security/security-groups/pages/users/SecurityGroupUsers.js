import React, { Fragment, useState } from 'react'
import clsx from 'clsx'
import { Table } from 'src/components/elements/table'
import { useGetUsers } from './services/getUsers'
import { useUsers } from './hooks'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import SecurityGroupUsersComponent from './SecurityGroupUsersComponent'
import useComponent from './hooks/useComponent'
import { useDispatch } from 'react-redux'
import { DetailCard } from 'src/components/elements/cards'
import CardHeader from 'src/components/elements/cards/CardHeader'

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

const columns = [
  {
    header: '',
    size: 10,
    id: 'toggle-security-group-users',
    cell: ({ row }) => {
      return (
        <Fragment>
          {row.getCanExpand() && (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer', padding: '10px' },
              }}
            >
              {row.getIsExpanded() ? (
                <IoIosArrowUp className="w-5 h-5" />
              ) : (
                <IoIosArrowDown className="w-5 h-5" />
              )}
            </button>
          )}
        </Fragment>
      )
    },
  },
  {
    header: 'Username',
    accessorKey: 'username',
    qName: 'qUsername',
  },
  {
    header: 'Person',
    accessorKey: 'person',
    qName: 'qPerson',
    cell: (row) => <div>{row.getValue() ?? '-'}</div>,
  },
  {
    header: 'Display Name',
    accessorKey: 'display_name',
    qName: 'qDisplayName',
  },
  {
    header: 'Status',
    accessorKey: 'is_active',
    qName: 'qIsActive',
    qType: 'select',
    qOptions: [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 },
    ],
    cell: (row) => (
      <div
        style={{ borderWidth: 1 }}
        className={clsx(
          'rounded-full text-center font-semibold self-center',
          row.getValue()
            ? 'border-green-border max-w-16 bg-green-surface text-green-main'
            : 'border-red-border max-w-[4.75rem] bg-red-surface text-red-main',
        )}
      >
        {row.getValue() ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    header: 'Type',
    accessorKey: 'type',
    qName: 'qType',
    qType: 'select',
    qOptions: type_options,
    cell: (row) => type_options.find((val) => val.value === row.getValue())?.label || '-',
  },
]

const SecurityGroupUsers = () => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const { selectedRow, tableRef, searchDebounce, downloadUsers } = useUsers()
  const { handleSubmit, goToUser } = useComponent(setIsEdit)

  return (
    <DetailCard>
      <div>
        <CardHeader
          description={selectedRow?.security_group_description}
          infoFields={[{ label: 'Group', value: selectedRow?.security_group_code }]}
          onDownload={downloadUsers}
        />
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetUsers}
          query={{
            search: searchDebounce || undefined,
          }}
          parentId={selectedRow?.security_group_id}
          tableSubComponent={({ row }) =>
            SecurityGroupUsersComponent(
              row,
              isEdit,
              setIsEdit,
              handleSubmit,
              type_options,
              goToUser,
              dispatch,
            )
          }
          canExpand
          hasAutoNumber
          isWithSearchField
        />
      </div>
    </DetailCard>
  )
}
export default SecurityGroupUsers
