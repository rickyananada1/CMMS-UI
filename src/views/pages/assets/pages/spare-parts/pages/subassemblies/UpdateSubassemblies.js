import {
  CButton,
  CCol,
  CFooter,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CFormTextarea,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import ListData from '../layout/ListSpareParts'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import useSubassemblies from '../../hooks/subassemblies/useSubassembliesList'
import { useGetSubassemblies } from '../../services/subassemblies'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import useSubassembliesForm from '../../hooks/subassemblies/useSubassembliesForm'

const UpdateSubassemblies = ({ setAction, mode }) => {
  const {
    getSubassembliesOption,
    setFieldValue,
    textFields,
    setChange,
    handleUpdateSubassemblies,
    isSubmitting,
    selectedRow,
    isAnyChange,
    setIsAnyChange,
  } = useSubassembliesForm({ setAction })
  const { tableRef } = useSubassemblies()

  return (
    <div className="mt-3">
      <DetailCard>
        <div>
          <Formik>
            {({ values }) => {
              return (
                <Form>
                  <CTable>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>
                          <h4 className="text-body-bold">
                            {mode === 'edit' ? 'Edit Subassemblies' : 'Subassemblies'}
                          </h4>
                          <p className="text-neutral-text-disabled">
                            {mode === 'edit'
                              ? 'Update Subassemblies Detail'
                              : 'Fill this column to add New Subassemblies'}
                          </p>
                        </CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableDataCell scope="row">
                          <div className="mt-3">
                            <div className="mb-3">
                              <CRow>
                                <CCol>
                                  <CFormLabel className="text-primary fw-semibold">
                                    Asset <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name="asset"
                                    placeholder="Enter Asset"
                                    onChange={(event) => {
                                      setFieldValue(0, event)
                                      setIsAnyChange(true)
                                    }}
                                    size="md"
                                    required
                                    as={SelectPagination}
                                    apiController={getSubassembliesOption}
                                    valueKey="asset_id"
                                    labelKey="asset_num"
                                    value={values?.asset}
                                  />
                                </CCol>
                                <CCol>
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name="description_asset"
                                    placeholder="Enter Description"
                                    onChange={(event) => {
                                      setChange(event)
                                      setIsAnyChange(true)
                                    }}
                                    size="md"
                                    required
                                    value={textFields[0]?.asset_description}
                                    as={CFormTextarea}
                                    disabled
                                  />
                                </CCol>
                                <CCol>
                                  <CFormLabel className="text-primary fw-semibold">
                                    Parent
                                  </CFormLabel>
                                  <Field
                                    name="parent"
                                    placeholder="Enter Parent"
                                    onChange={(event) => {
                                      setChange(event)
                                      setIsAnyChange(true)
                                    }}
                                    size="md"
                                    required
                                    value={selectedRow?.asset_num}
                                    as={CFormInput}
                                    disabled
                                  />
                                </CCol>
                                <CCol>
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name="description_parent"
                                    placeholder="Enter Description"
                                    onChange={(event) => {
                                      setChange(event)
                                      setIsAnyChange(true)
                                    }}
                                    size="md"
                                    required
                                    value={selectedRow?.asset_description}
                                    as={CFormTextarea}
                                    disabled
                                  />
                                </CCol>
                              </CRow>
                            </div>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </Form>
              )
            }}
          </Formik>
          <p className="text-body-bold ml-3 mt-3">List</p>
          <ListData
            tableRef={tableRef}
            columns={columns}
            apiController={useGetSubassemblies}
            query={{}}
            hasAutoNumber
            tableSubComponent={ExpandedComponent}
            canExpand={true}
            parentId={selectedRow?.asset_id}
          />
        </div>
      </DetailCard>
      <CFooter className="form-footer">
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
            onClick={handleUpdateSubassemblies}
          >
            <div className="flex items-center justify-center">
              {isSubmitting ? (
                <>
                  Submit <CSpinner className="ms-2" color="light" size="sm" />
                </>
              ) : (
                <>
                  Submit <CiPaperplane className="ms-2" />
                </>
              )}
            </div>
          </CButton>
        </div>
      </CFooter>
    </div>
  )
}

const ExpandedComponent = (row) => {
  const data = row?.row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="text-body-small font-light">Item</label>
          <p className="text-body-bold">{data?.asset_num ? data.asset_num : '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Description</label>
          <p className="text-body-bold">{data?.asset_description ? data.asset_description : '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Location</label>
          <p className="text-body-bold">{data?.location_id ? data.location_id : '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Description</label>
          <p className="text-body-bold">{data?.asset_description ? data.asset_description : '-'}</p>
        </div>
      </div>
    </div>
  )
}

const columns = [
  {
    header: ' ',
    size: 10,
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
    header: 'Item',
    accessorKey: 'asset_num',
    enableSorting: true,
  },
  {
    header: 'Description',
    accessorKey: 'asset_description',
    enableSorting: true,
  },
  {
    header: 'Location',
    accessorKey: 'location_id',
    enableSorting: true,
  },
  {
    header: 'Description',
    accessorKey: 'location_description',
    enableSorting: true,
  },
]

export default UpdateSubassemblies
