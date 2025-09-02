import React, { useMemo } from 'react'
import { CButton, CFooter, CSpinner, CFormCheck } from '@coreui/react'
import { Form, Formik } from 'formik'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import useApplicationsForm from './hooks/useApplicationsForm'
import { Table } from 'src/components/elements/table'
import { GoSearch } from 'react-icons/go'
import { useGetSecurityGroupsApplicationsPermissionsTableList } from './services'

const CellRenderer = ({ row, index, handleCheckboxChange, action, formValue }) => {
  return (
    <div id={`${index}-${action}`} className="flex justify-center items-center">
      <CFormCheck
        checked={
          !!formValue?.find((perm) => perm.application_name === row?.original.application_name)?.[
            action
          ]
        }
        disabled={
          !!formValue?.find((perm) => perm.application_name === row?.original.application_name)
            ?.disabled
        }
        onChange={(event) => {
          handleCheckboxChange({
            applicationName: row?.original.application_name,
            action: action,
            isChecked: event.target.checked,
          })
        }}
      />
    </div>
  )
}

const MemoizedColumns = ({ handleCheckboxChange, formValue }) => {
  const memoizedColumns = useMemo(
    () => columns(handleCheckboxChange, formValue),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleCheckboxChange],
  )

  return memoizedColumns
}

const columns = (handleCheckboxChange = () => {}, formValue = []) => {
  return [
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
        <CellRenderer
          row={row}
          index={index}
          handleCheckboxChange={handleCheckboxChange}
          action={item}
          formValue={formValue}
        />
      ),
    })),
  ]
}

// eslint-disable-next-line react/prop-types
const SecurityGroupApplicationsForm = ({ mode, setAction, setTabIndex }) => {
  const {
    tableRef,
    formValue,
    isLoading,
    isAnyChange,
    handleSubmit,
    handleCheckboxChange,
    selectedRow,
    handleSearch,
    searchDebounce,
  } = useApplicationsForm({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <Formik enableReinitialize initialValues={formValue} onSubmit={handleSubmit}>
      {({ isSubmitting, values, handleChange, dirty, isValid }) => {
        return (
          <Form>
            <DetailCard isLoading={isLoading}>
              <div>
                <h4 className="w-full font-semibold">Edit Permissions</h4>
                <p>Update Permissions Details</p>
              </div>
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
                  columns={MemoizedColumns({ handleCheckboxChange, formValue })}
                  parentId={selectedRow?.security_group_id}
                  apiController={useGetSecurityGroupsApplicationsPermissionsTableList}
                  query={{
                    search: searchDebounce || undefined,
                  }}
                  isWithSearchField={false}
                  hasAutoNumber
                  debounceSorting={9000}
                />
              </div>
            </DetailCard>

            <CFooter className="form-footer mt-20">
              <div className="ml-[80px] w-full my-2 flex items-center justify-between">
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => {
                    setAction('Read')
                  }}
                >
                  Cancel
                </CButton>
                <CButton
                  disabled={isSubmitting || !isAnyChange}
                  color="primary"
                  className="hover:text-white"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
                    Submit{' '}
                    {isSubmitting ? (
                      <CSpinner className="ms-2" color="light" size="sm" />
                    ) : (
                      <CiPaperplane className="ms-2" />
                    )}
                  </div>
                </CButton>
              </div>
            </CFooter>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SecurityGroupApplicationsForm
