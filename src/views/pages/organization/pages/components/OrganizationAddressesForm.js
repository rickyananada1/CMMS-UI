import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { BsTrash } from 'react-icons/bs'
import { Form, Formik, FieldArray, Field } from 'formik'
import { CButton, CCard, CCardBody, CFormInput, CFormLabel, CFooter } from '@coreui/react'
import { Select } from 'src/components/elements/select'
import useAddressesForm from '../../hooks/useAddressesForm'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const OrganizationAddressesForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    handleSubmit,
    addressesSchema,
    provinceData,
    getCities,
    cityData,
    selectedOrganizationAddresss,
    isModalOpen,
    setIsModalOpen,
    uploadModalProps,
  } = useAddressesForm(mode, setAction, setTabIndex)
  return (
    <div>
      <div className="bg-white p-4 rounded mb-5">
        <Formik
          enableReinitialize
          validationSchema={addressesSchema}
          initialValues={formValue}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const { setFieldValue, setFieldTouched, values, errors, touched } = props

            return (
              <Form>
                <CCard className="card-b-left">
                  <CCardBody className="p-5">
                    <h4 className="font-semibold">
                      {mode === 'UpdateAddress' ? 'Edit' : 'New'} Address
                    </h4>
                    <div>
                      <p>
                        {selectedOrganizationAddresss
                          ? 'Update Address Details'
                          : 'Fill this column to add new address'}
                      </p>
                    </div>
                    <hr />

                    <FieldArray
                      name="address"
                      render={(arrayHelpers) =>
                        values.address?.map((item, index) => {
                          return (
                            <div className="my-2" key={index}>
                              {mode === 'add' && (
                                <div className="flex">
                                  <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                    <span className="text-white mb-1">{index + 1}</span>
                                  </div>
                                  {values.address.length > 1 && (
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      className="hover:text-white"
                                      onClick={() => {
                                        arrayHelpers.remove(index)
                                      }}
                                    >
                                      <BsTrash />
                                    </CButton>
                                  )}
                                </div>
                              )}

                              <div className="my-4">
                                <div className="row">
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Address Code <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.address_code`}
                                      placeholder="Enter Address Code"
                                      value={item?.address_code}
                                      onChange={(val) => {
                                        setFieldValue(
                                          `address.${index}.address_code`,
                                          val.target.value,
                                        )
                                      }}
                                      as={CFormInput}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.address_code &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.address_code ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.address_code}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Address Code Description{' '}
                                      <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.address_code_description`}
                                      placeholder="Enter Address Code Description"
                                      value={item?.address_code_description}
                                      onChange={(val) => {
                                        setFieldValue(
                                          `address.${index}.address_code_description`,
                                          val.target.value,
                                        )
                                      }}
                                      as={CFormInput}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.address_code_description &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.address_code_description ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.address_code_description}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Address <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.address`}
                                      placeholder="Enter Address"
                                      value={item?.address}
                                      onChange={(val) => {
                                        setFieldValue(`address.${index}.address`, val.target.value)
                                      }}
                                      as={CFormInput}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.address &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.address ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.address}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      State / Province <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.province_id`}
                                      options={provinceData}
                                      placeholder="Select Province"
                                      value={item?.province_id}
                                      onBlur={() => {
                                        setFieldTouched(`address.${index}.province_id`)
                                      }}
                                      onChange={(val) => {
                                        setFieldValue(`address.${index}.province_id`, val)
                                        setFieldValue(`address.${index}.city_id`, null)
                                        getCities({ province_id: val.value })
                                      }}
                                      as={Select}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.province_id &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.province_id ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.province_id}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      City <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.city_id`}
                                      placeholder="Select city"
                                      options={cityData}
                                      value={item?.city_id}
                                      isDisabled={!(item?.province_id !== null)}
                                      onBlur={() => {
                                        setFieldTouched(`address.${index}.city_id`)
                                      }}
                                      onChange={(val) => {
                                        setFieldValue(`address.${index}.city_id`, val)
                                      }}
                                      as={Select}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.city_id &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.city_id ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.city_id}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      ZIP / Postal Code <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.postal_code`}
                                      placeholder="Enter ZIP / Postal Code"
                                      value={item?.postal_code}
                                      onChange={(val) => {
                                        setFieldValue(
                                          `address.${index}.postal_code`,
                                          val.target.value,
                                        )
                                      }}
                                      as={CFormInput}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.postal_code &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.postal_code ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.postal_code}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Country <span className="text-red-main">*</span>
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.country`}
                                      placeholder="Enter Country"
                                      value={item?.country}
                                      disabled={true}
                                      onChange={(val) => {
                                        setFieldValue(`address.${index}.country`, val.target.value)
                                      }}
                                      as={CFormInput}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.country &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.country ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.country}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="col-md-3 mb-4">
                                    <CFormLabel className="text-primary fw-semibold">
                                      Tax Code
                                    </CFormLabel>
                                    <Field
                                      name={`address.${index}.tax_code`}
                                      placeholder="Enter Tax Code"
                                      value={item?.tax_code}
                                      onChange={(val) => {
                                        setFieldValue(`address.${index}.tax_code`, val.target.value)
                                      }}
                                      as={CFormInput}
                                    />
                                    {errors &&
                                    errors.address &&
                                    errors.address[index]?.tax_code &&
                                    touched &&
                                    touched.address &&
                                    touched.address[index]?.tax_code ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.address[index]?.tax_code}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="mb-4 col-md-3">
                                    <div className="flex-row">
                                      <CFormLabel className="text-primary fw-semibold w-100">
                                        Attachments
                                      </CFormLabel>
                                      <CButton
                                        color="primary"
                                        className="hover:text-white"
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                      >
                                        Upload File
                                      </CButton>
                                    </div>
                                    <UploadFileModal
                                      visible={isModalOpen}
                                      setVisible={setIsModalOpen}
                                      setFieldValue={setFieldValue}
                                      {...uploadModalProps}
                                    />
                                    {errors &&
                                    errors.data?.attachment &&
                                    touched &&
                                    touched.data?.attachment ? (
                                      <div className="text-sm text-[#b03434] mt-1">
                                        {errors.data.attachment}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <hr />
                                {mode === 'add' && (
                                  <div className="w-full">
                                    {index + 1 === values?.address.length && (
                                      <CButton
                                        color="primary"
                                        variant="outline"
                                        className="hover:text-white"
                                        onClick={() => {
                                          arrayHelpers.push({
                                            organization_id: null,
                                            address_code: '',
                                            address: '',
                                            province_id: null,
                                            city_id: null,
                                            postal_code: null,
                                            country: 'Indonesia',
                                            tax_code: null,
                                          })
                                        }}
                                      >
                                        <CIcon icon={cilPlus} className="me-2" /> Add New Address
                                      </CButton>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })
                      }
                    />
                  </CCardBody>
                </CCard>
                <CFooter className="form-footer">
                  <div className="w-full ml-[80px] bg-white flex items-center justify-between">
                    <CButton
                      color="danger"
                      variant="outline"
                      onClick={() => {
                        setAction('view')
                      }}
                    >
                      Cancel
                    </CButton>
                    <CButton
                      type="submit"
                      // onClick={() => {
                      //   // setAction('view')
                      // }}
                    >
                      Submit
                    </CButton>
                  </div>
                </CFooter>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default OrganizationAddressesForm
