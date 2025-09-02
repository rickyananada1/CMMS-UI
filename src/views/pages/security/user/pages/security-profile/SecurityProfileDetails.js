import React from 'react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CContainer,
  CFormCheck,
  CSpinner,
} from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import useSecurityProfile from './hooks/useSecurityProfile'
import { TableClient } from 'src/components/elements/table'
import CardHeader from 'src/components/elements/cards/CardHeader'

const CellRenderer = ({ key, row, index }) => {
  return (
    <div key={key} className="text-center">
      {row?.original?.permissions?.[index] ? (
        <CFormCheck
          id={`${index}-${row?.original?.permissions?.[index]?.app_action}`}
          checked={!!row?.original?.permissions?.[index]?.is_active}
          readOnly
        />
      ) : null}
    </div>
  )
}

const columns = (dataSecurityHeader = []) => {
  return [
    {
      header: 'Application',
      accessorKey: 'application',
      isGrouped: true,
    },
    ...dataSecurityHeader.map((item, index) => ({
      id: `security-group-${index}-${item?.name}`,
      header: () => (
        <div id={`header-security-group-${index}-${item?.name}`} className="text-center">
          {item?.name}
        </div>
      ),
      cell: ({ row }) => (
        <CellRenderer key={`row-security-group-${index}-${item?.name}`} row={row} index={index} />
      ),
    })),
  ]
}

const SecurityProfileDetails = () => {
  const {
    tableRef,
    securityGroupsData,
    isLoading,
    isPermissionsLoading,
    selectedRow,
    applicationPerms,
  } = useSecurityProfile()

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
      />
      <hr />
      <CContainer fluid>
        <div className="flex items-center my-2 justify-between -mx-3">
          <p className="mt-2 text-base font-semibold text-nowrap">Permissions</p>
          <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
        </div>
        {securityGroupsData.length > 0 ? (
          <CAccordion className="-mx-3">
            {securityGroupsData.map((group, index) => (
              <CAccordionItem key={`accordion-` + index} itemKey={index}>
                <CAccordionHeader>{group.security_group_description}</CAccordionHeader>
                <CAccordionBody>
                  <div>
                    {isPermissionsLoading && (
                      <div className="m-3">
                        <CSpinner color="primary" />
                      </div>
                    )}
                    <TableClient
                      tableRef={tableRef}
                      columns={columns(dataSecurityHeader)}
                      content={applicationPerms[index]}
                    />
                  </div>
                </CAccordionBody>
              </CAccordionItem>
            ))}
          </CAccordion>
        ) : (
          <div className="border rounded border-solid text-center -mx-3 py-4">No Permissions</div>
        )}
      </CContainer>
    </DetailCard>
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

const dataSecurityHeader = [
  {
    no: 1,
    name: 'Create',
  },
  {
    no: 2,
    name: 'Read',
  },
  {
    no: 3,
    name: 'Update',
  },
  {
    no: 4,
    name: 'Delete',
  },
]

export default SecurityProfileDetails
