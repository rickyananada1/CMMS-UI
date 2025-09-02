import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFooter,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import { CiPaperplane } from 'react-icons/ci'
import { Form, Field, Formik } from 'formik'
import useOrganizationForm from '../../hooks/useOrganizationForm'
import { Select } from 'src/components/elements/select'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const OrganizationForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    sitesSchema,
    handleSubmit,
    formSelectOpt,
    uploadModalProps,
    isModalOpen,
    setIsModalOpen,
  } = useOrganizationForm(mode, setAction, setTabIndex)
  return (
    <div className="w-full bg-white border border-gray-200 rounded-b-lg p-4">
      <Formik
        enableReinitialize
        validationSchema={sitesSchema}
        initialValues={formValue}
        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
      >
        {({ errors, touched, handleSubmit, handleChange, setFieldValue, values, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <CCard className="card-b-left">
                <CCardBody className="p-5">
                  <div className="w-full p-2">
                    <h4 className="font-semibold">
                      {mode === 'Update' ? 'Edit' : 'New'} Organization
                    </h4>
                    <div>
                      <p className="text-base">
                        {mode === 'Update'
                          ? 'Update Organization Details'
                          : 'Fill this column to add new organization'}
                      </p>
                    </div>
                    <hr />
                    <div className="grid grid-cols-4 gap-3">
                      <div className="w-full">
                        <div className="mb-4">
                          <CFormLabel className="text-primary fw-semibold">
                            Organization <span className="text-red-main">*</span>
                          </CFormLabel>
                          <Field
                            id="organization"
                            size="sm"
                            value={values?.organization_name}
                            className="px-3 py-2"
                            name="organization_name"
                            placeholder="Enter Organization"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.organization_name && touched.organization_name ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.organization_name}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel className="text-primary fw-semibold" htmlFor="itemSet">
                            Item Set
                          </CFormLabel>
                          <Field
                            id="itemSet"
                            name="item_set"
                            // options={formSelectOpt.itemSetOpt}
                            placeholder="Enter Item Set"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.item_set && touched.item_set ? (
                            <div className="text-sm text-[#b03434] mt-1">{errors.item_set}</div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel
                            className="text-primary fw-semibold"
                            htmlFor="defaultItemStatus"
                          >
                            Default Item Status
                          </CFormLabel>
                          <Field
                            id="defaultItemStatus"
                            size="sm"
                            name="default_item_status"
                            options={formSelectOpt.defaultItemStatusOpt}
                            value={values?.default_item_status}
                            placeholder="Choose Item"
                            onChange={(val) => {
                              setFieldValue('default_item_status', val)
                            }}
                            as={Select}
                          />
                          {errors.default_item_status && touched.default_item_status ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.default_item_status}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
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
                      <div className="w-full">
                        <div className="mb-4">
                          <CFormLabel
                            className="text-primary fw-semibold"
                            htmlFor="organizationDesc"
                          >
                            Organization Description <span className="text-red-main">*</span>
                          </CFormLabel>
                          <Field
                            id="organizationDesc"
                            size="sm"
                            className="px-3 py-2"
                            name="organization_description"
                            placeholder="Enter Organization Description"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.organization_description && touched.organization_description ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.organization_description}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel className="text-primary fw-semibold" htmlFor="itemSetDesc">
                            Item Set Description
                          </CFormLabel>
                          <Field
                            id="itemSetDesc"
                            size="sm"
                            className="px-3 py-2"
                            name="item_set_description"
                            placeholder="Enter Item Set Description"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.item_set_description && touched.item_set_description ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.item_set_description}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel
                            className="text-primary fw-semibold"
                            htmlFor="defaultStockCategory"
                          >
                            Default Stock Category
                          </CFormLabel>
                          <Field
                            id="defaultStockCategory"
                            //size="sm"
                            name="default_stock_category"
                            //options={formSelectOpt.defaultStockCategoryOpt}
                            placeholder="Enter Default Stock Category"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.default_stock_category && touched.default_stock_category ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.default_stock_category}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="mb-4">
                          <CFormLabel className="text-primary fw-semibold" htmlFor="baseCurrency1">
                            Base Currency 1
                          </CFormLabel>
                          <Field
                            id="baseCurrency1"
                            size="sm"
                            name="base_currency"
                            options={formSelectOpt.baseCurrencyOpt}
                            placeholder="Choose Item"
                            onChange={(val) => {
                              setFieldValue('base_currency', val)
                            }}
                            as={Select}
                          />
                          {errors.base_currency && touched.base_currency ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.base_currency}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel className="text-primary fw-semibold" htmlFor="companySet">
                            Company Set
                          </CFormLabel>
                          <Field
                            id="companySet"
                            //size="sm"
                            name="company_set"
                            value={values?.company_set}
                            //options={formSelectOpt.companySetOpt}
                            placeholder="Enter Company Set"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.company_set && touched.company_set ? (
                            <div className="text-sm text-[#b03434] mt-1">{errors.company_set}</div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel
                            className="text-primary fw-semibold"
                            htmlFor="clearingAccount"
                          >
                            Clearing Account
                          </CFormLabel>
                          <Field
                            id="clearingAccount"
                            //size="sm"
                            name="clearing_account"
                            //options={formSelectOpt.clearingAccountOpt}
                            placeholder="Enter Clearing Account"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.clearing_account && touched.clearing_account ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.clearing_account}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="mb-4">
                          <CFormLabel
                            className="text-primary fw-semibold"
                            htmlFor="baseCurrency1Desc"
                          >
                            Base Currency 1 Description
                          </CFormLabel>
                          <Field
                            id="baseCurrency1Desc"
                            size="sm"
                            disabled={true}
                            className="px-3 py-2"
                            name="base_currency_description"
                            placeholder="Enter Base Currency Description"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.base_currency_description && touched.base_currency_description ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.base_currency_description}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel className="text-primary fw-semibold" htmlFor="companySetDesc">
                            Company Set Description
                          </CFormLabel>
                          <Field
                            id="companySetDesc"
                            size="sm"
                            className="px-3 py-2"
                            name="company_set_description"
                            placeholder="Enter Company Set Description"
                            onChange={handleChange}
                            as={CFormInput}
                          />
                          {errors.company_set_description && touched.company_set_description ? (
                            <div className="text-sm text-[#b03434] mt-1">
                              {errors.company_set_description}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <CFormLabel
                            className="text-primary fw-semibold w-full"
                            htmlFor="isActivate"
                          >
                            Active?
                          </CFormLabel>
                          <div className="flex items-center">
                            <div className="form-check">
                              <Field
                                name="is_active"
                                id="isActivate"
                                value={values?.is_active}
                                onChange={handleChange}
                                checked={values.is_active}
                                size="lg"
                                as={CFormCheck}
                              />
                            </div>
                            <label className="form-check-label" htmlFor="isActivate">
                              {values.is_active ? 'Yes' : 'No'}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
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
                  <div>
                    {process.env.REACT_APP_HIDE_FEATURE !== 'true' && (
                      <CButton
                        onClick={() => {
                          setTabIndex(2)
                          setAction('view')
                          setTimeout(() => {
                            setAction('edit')
                          }, 1000)
                        }}
                        color="primary"
                        variant="outline"
                        className="hover:text-white mr-2 hidden"
                        type="button"
                      >
                        <div className="flex items-center justify-center">
                          <>Next</>
                        </div>
                      </CButton>
                    )}
                    <CButton color="primary" className="hover:text-white" type="submit">
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
                </div>
              </CFooter>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default OrganizationForm
