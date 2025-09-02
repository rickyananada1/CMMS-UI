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
import { BsTrash } from 'react-icons/bs'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { CiPaperplane } from 'react-icons/ci'
import { SelectPagination } from 'src/components/elements/select'
import useSparePartsCreate from '../../hooks/spare-parts/useSparePartsCreate'
import ListData from '../layout/ListSpareParts'
import useSpareParts from '../../hooks/spare-parts/useSparePartsList'
import { useGetSpareParts } from '../../services/spare-parts'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { assetSchema } from '../../../assets/schema'

const CreateSpareParts = ({ setAction }) => {
  const {
    textFields,
    initialValue,
    handleAddTextField,
    handleRemoveTextField,
    setChange,
    setFieldValue,
    data,
    getSparePartsOption,
    handleCreateSpareParts,
    totalPage,
    isSubmitting,
    selectedRow,
    hasNull,
    isAnyChange,
    setIsAnyChange,
  } = useSparePartsCreate({ setAction })
  const { tableRef } = useSpareParts()

  return (
    <div className="mt-3">
      <Formik enableReinitialize initialValues={initialValue} validationSchema={assetSchema}>
        {(props) => {
          const { setFieldTouched, values, errors, touched } = props
          return (
            <Fragment>
              <DetailCard>
                <Form>
                  <CTable>
                    <CTableBody>
                      <CTableRow>
                        <CTableDataCell>
                          <h4 className="text-body-bold">Spare Parts</h4>
                          <p className="text-neutral-text-disabled">
                            Fill this column to add New Spare Parts
                          </p>
                        </CTableDataCell>
                      </CTableRow>
                      {textFields.map((textField, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell scope="row">
                            <div className="mt-3">
                              {textFields.length === 1 ? null : (
                                <div className="mb-3">
                                  <div className="flex">
                                    <div className="bg-primary-main rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                      <span className="text-white mb-1">{index + 1}</span>
                                    </div>
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => handleRemoveTextField(index)}
                                    >
                                      <BsTrash />
                                    </CButton>
                                  </div>
                                </div>
                              )}
                              <div className="mb-3">
                                <CRow>
                                  <CCol>
                                    <CFormLabel className="text-primary fw-semibold">
                                      Spare Parts <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name="sparepart"
                                      placeholder="Enter Spare Part"
                                      onChange={(event) => {
                                        setFieldValue(index, event, data)
                                        setIsAnyChange(true)
                                      }}
                                      onBlur={() => {
                                        setFieldTouched('sparepart')
                                      }}
                                      size="md"
                                      required
                                      apiController={getSparePartsOption}
                                      valueKey="sparepart_id"
                                      labelKey="item_num"
                                      searchKey="qAssetNum"
                                      value={values?.sparepart}
                                      as={SelectPagination}
                                    />
                                    {errors && errors.asset_num && touched && touched.asset_num ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.sparepart}
                                      </div>
                                    ) : null}
                                  </CCol>
                                  <CCol>
                                    <CFormLabel className="text-primary fw-semibold">
                                      Description <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name="description"
                                      value={textField?.description}
                                      placeholder="Enter Description"
                                      onChange={(event) => {
                                        setChange(index, event)
                                        setIsAnyChange(true)
                                      }}
                                      onBlur={() => {
                                        setFieldTouched('description')
                                      }}
                                      size="md"
                                      required
                                      as={CFormTextarea}
                                      disabled
                                    />
                                    {errors && errors.asset_num && touched && touched.asset_num ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.description}
                                      </div>
                                    ) : null}
                                  </CCol>
                                  <CCol>
                                    <CFormLabel className="text-primary fw-semibold">
                                      Quantity <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name="quantity"
                                      placeholder="Enter Quantity"
                                      onChange={(event) => {
                                        setChange(index, event)
                                        setIsAnyChange(true)
                                      }}
                                      onBlur={() => {
                                        setFieldTouched('quantity')
                                      }}
                                      size="md"
                                      required
                                      as={CFormInput}
                                      type="number"
                                      min={0}
                                    />
                                    {errors && errors.asset_num && touched && touched.asset_num ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.quantity}
                                      </div>
                                    ) : null}
                                  </CCol>
                                </CRow>
                              </div>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                  <div className="mb-3">
                    {textFields.length === totalPage ? (
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={handleAddTextField}
                        disabled
                      >
                        <div className="flex items-center">
                          <CIcon icon={cilPlus} className="me-2" />
                          <span>Add Spare Part</span>
                        </div>
                      </CButton>
                    ) : (
                      <CButton color="primary" variant="outline" onClick={handleAddTextField}>
                        <div className="flex items-center">
                          <CIcon icon={cilPlus} className="me-2" />
                          <span>Add Spare Part</span>
                        </div>
                      </CButton>
                    )}
                  </div>
                </Form>
                <p className="text-body-bold ml-3 mt-3">List</p>
                <ListData
                  tableRef={tableRef}
                  columns={columns}
                  apiController={useGetSpareParts}
                  query={{}}
                  hasAutoNumber
                  tableSubComponent={ExpandedComponent}
                  canExpand={true}
                  parentId={selectedRow?.asset_id}
                />
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
                    disabled={isSubmitting || hasNull(textFields, 'quantity') || !isAnyChange}
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    onClick={handleCreateSpareParts}
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
            </Fragment>
          )
        }}
      </Formik>
    </div>
  )
}

const ExpandedComponent = (row) => {
  const data = row?.row?.original
  return (
    <div className="bg-[#E9F1FB80] px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-5 my-3">
        <div>
          <label className="text-body-small font-light">Item</label>
          <p className="text-body-bold">{data?.item_num ? data.item_num : '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Description</label>
          <p className="text-body-bold">{data?.description ? data.description : '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Location</label>
          <p className="text-body-bold">{data?.location_id ? data.location_id : '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Description</label>
          <p className="text-body-bold">{data?.description ? data.description : '-'}</p>
        </div>
        <div>
          <label className="text-body-small font-light">Remarks</label>
          <p className="text-body-bold">{data?.asset_remarks ? data.asset_remarks : '-'}</p>
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
    accessorKey: 'item_num',
    enableSorting: true,
  },
  {
    header: 'Description',
    accessorKey: 'description',
    enableSorting: true,
  },
  {
    header: 'Quantity',
    accessorKey: 'quantity',
    enableSorting: true,
  },
  {
    header: 'Remarks',
    accessorKey: 'remark',
    enableSorting: true,
  },
]

export default CreateSpareParts
