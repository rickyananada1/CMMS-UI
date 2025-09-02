import React, { Fragment } from 'react'
import {
  CContainer,
  CFormLabel,
  CCol,
  CRow,
  CFooter,
  CButton,
  CSpinner,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import useUser from './hooks/useUser'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import { Field, Form, Formik } from 'formik'
import { Select, SelectPagination } from 'src/components/elements/select'
import { userSchema } from './schema'
import UploadFileModal from 'src/views/pages/upload-file/components/UploadFileModal'

const UserForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    isLoading,
    handleSubmit,
    getSitesSerivce,
    selectRef,
    selectOptions,
    selectedRow,
    getOrganizationService,
    typeOptions,
    currentUser,
    handleDataConfirmation,
    isModalOpen,
    setIsModalOpen,
    uploadModalProps,
  } = useUser({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      {({
        handleChange,
        setFieldValue,
        setFieldTouched,
        errors,
        isValid,
        dirty,
        isSubmitting,
        values,
        touched,
      }) => {
        return (
          <Form>
            <DetailCard isLoading={isLoading}>
              {mode === 'Update' ? (
                <div>
                  <h4 className="w-font-semibold">Update User</h4>
                  <p>Update User Details</p>
                </div>
              ) : (
                <div>
                  <h4 className="w-font-semibold">New User</h4>
                  <p>Fill this column to add new user</p>
                </div>
              )}
              <CContainer fluid>
                <div className="flex items-center justify-between my-2 -mx-2">
                  <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                    Personal
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>
                <CRow>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Display Name <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="display_name"
                      placeholder="Enter Display Name"
                      value={values?.display_name}
                      invalid={touched.display_name && errors.display_name}
                      onChange={handleChange}
                      size="md"
                      required
                      as={CFormInput}
                    />
                    {errors.display_name && touched.display_name ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.display_name}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Primary Phone <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="phone_number"
                      placeholder="Enter Phone Number"
                      type="number"
                      value={values?.phone_number}
                      invalid={touched.phone_number && errors.phone_number}
                      onChange={handleChange}
                      size="md"
                      required
                      as={CFormInput}
                    />
                    {errors.phone_number && touched.phone_number ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.phone_number}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Primary Email <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="email"
                      placeholder="Enter Email Address"
                      type="email"
                      value={values?.email}
                      invalid={touched.email && errors.email}
                      onChange={handleChange}
                      size="md"
                      required
                      as={CFormInput}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.email}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Type <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="type"
                      placeholder="Select Type"
                      value={values?.type}
                      onChange={(val) => {
                        setFieldValue(`type`, val)
                        handleDataConfirmation(val)
                      }}
                      onBlur={() => {
                        setFieldTouched('type')
                      }}
                      size="md"
                      options={typeOptions}
                      required
                      as={Select}
                    />
                    {errors.type && touched.type ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.type}</div>
                    ) : null}
                  </CCol>
                </CRow>
                <CRow className="mt-4">
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">
                      Organization <span className="text-red-main">*</span>
                    </CFormLabel>
                    <Field
                      name="organization_id"
                      placeholder="Select Organization"
                      apiController={getOrganizationService}
                      value={values?.organization_id}
                      valueKey="organization_id"
                      labelKey="organization_name"
                      onChange={(val) => {
                        setFieldValue(`organization_id`, val)
                      }}
                      onBlur={() => {
                        setFieldTouched('organization_id')
                      }}
                      size="md"
                      required
                      as={SelectPagination}
                    />
                    {errors.site_id && touched.site_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.site_id}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">Supervisor</CFormLabel>
                    <Field
                      name="Supervisor"
                      placeholder="Select Supervisor"
                      value={values?.supervisor_id}
                      invalid={touched.supervisor_id && errors.supervisor_id}
                      onChange={handleChange}
                      size="md"
                      as={CFormInput}
                    />
                    {errors.supervisor_id && touched.supervisor_id ? (
                      <div className="text-sm text-[#e55353] mt-1">{errors.supervisor_id}</div>
                    ) : null}
                  </CCol>
                  <CCol sm={3}>
                    <CFormLabel className="text-primary fw-semibold">Status</CFormLabel>
                    <Field
                      className="mt-2"
                      name="is_active"
                      id="is_active"
                      value={values?.is_active}
                      size="md"
                      label={values?.is_active ? 'Active' : 'Inactive'}
                      checked={values?.is_active}
                      as={CFormCheck}
                    />
                  </CCol>
                  <CCol sm={3}>
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
                    {errors && errors.data?.attachment && touched && touched.data?.attachment ? (
                      <div className="text-sm text-[#b03434] mt-1">{errors.data.attachment}</div>
                    ) : null}
                  </CCol>
                </CRow>
                {currentUser?.type !== 5 && (
                  <Fragment>
                    <div className="flex items-center justify-between my-2 -mx-2">
                      <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
                        User Settings
                      </p>
                      <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                    </div>
                    <CRow>
                      <CCol sm={3}>
                        <CFormLabel className="text-primary fw-semibold">
                          Default Insert Site
                        </CFormLabel>
                        <Field
                          selectRef={selectRef}
                          name="site_id"
                          placeholder="Select Site"
                          apiController={getSitesSerivce}
                          query={{
                            access: 'true',
                            user_id: selectedRow?.user_id ?? null,
                          }}
                          value={values?.site_id}
                          valueKey="site_id"
                          labelKey="site"
                          isAllData
                          onChange={(val) => {
                            setFieldValue(`site_id`, val)
                          }}
                          onBlur={() => {
                            setFieldTouched('site_id')
                          }}
                          size="md"
                          disabled={mode === 'Create' || selectOptions?.length < 1}
                          as={SelectPagination}
                        />
                        {errors.site_id && touched.site_id ? (
                          <div className="text-sm text-[#e55353] mt-1">{errors.site_id}</div>
                        ) : null}
                        {mode === 'Create' || selectOptions?.length < 1 ? (
                          <div className="text-sm text-[#e55353] mt-1">
                            Please assign sites on user’s security group.
                          </div>
                        ) : null}
                      </CCol>
                      <CCol sm={3}>
                        <CFormLabel className="text-primary fw-semibold">
                          Default Insert Site Description
                        </CFormLabel>
                        <Field
                          name="site_descriptions"
                          placeholder="No Descriptions"
                          value={values?.site_id?.site_description}
                          onChange={handleChange}
                          size="md"
                          disabled
                          as={CFormInput}
                        />
                      </CCol>
                    </CRow>
                  </Fragment>
                )}
              </CContainer>
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
                  disabled={isSubmitting || !(dirty && isValid)}
                  color="primary"
                  className="hover:text-white"
                  type="submit"
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
          </Form>
        )
      }}
    </Formik>
  )
}

export default UserForm
