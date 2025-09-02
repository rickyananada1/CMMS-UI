import { CButton, CCol, CContainer, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { Field, Formik, Form } from 'formik'
import React, { Fragment } from 'react'
import { Select } from 'src/components/elements/select'
import { userSchema } from './schema'
import { Link } from 'react-router-dom'
import { securityUserActions } from '../../../user/slices/securityUserSlices'

const SecurityGroupUsersComponent = (
  row,
  isEdit,
  setIsEdit,
  handleSubmit,
  type_options,
  goToUser,
  dispatch,
) => {
  const data = row?.original

  const formValue = {
    user_id: data?.user_id,
    display_name: data?.display_name,
    type: type_options.find((val) => val.value === data?.type),
    is_active: data?.is_active,
  }

  return (
    <CContainer className="my-3 mx-5">
      {isEdit ? (
        <Fragment>
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
                  <CRow>
                    <CCol>
                      <h5 className="font-semibold">Details</h5>
                    </CCol>
                    <CCol></CCol>
                    <CCol>
                      <CButton disabled={isSubmitting} color="primary" type="submit">
                        <div className="flex items-center justify-center">Save Data</div>
                      </CButton>
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <CFormLabel>Username</CFormLabel>
                      <br />
                      <span className="font-semibold">{data?.username ?? '-'}</span>
                      <Field name="user_id" value={values?.user_id} className="hidden" />
                    </CCol>
                    <CCol>
                      <CFormLabel>Person</CFormLabel>
                      <br />
                      <span className="font-semibold">{data?.person ?? '-'}</span>
                    </CCol>
                    <CCol></CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <CFormLabel>Display Name</CFormLabel>
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
                    <CCol>
                      <CFormLabel>Type</CFormLabel>
                      <Field
                        name="type"
                        placeholder="Select Type"
                        value={values?.type}
                        onChange={(val) => {
                          setFieldValue(`type`, val)
                        }}
                        onBlur={() => {
                          setFieldTouched('type')
                        }}
                        size="md"
                        options={type_options}
                        required
                        as={Select}
                      />
                      {errors.type && touched.type ? (
                        <div className="text-sm text-[#e55353] mt-1">{errors.type}</div>
                      ) : null}
                    </CCol>
                    <CCol>
                      <CFormLabel>Status</CFormLabel>
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
                  </CRow>
                </Form>
              )
            }}
          </Formik>
        </Fragment>
      ) : (
        <Fragment>
          <CRow>
            <CCol>
              <h5 className="font-semibold">Details</h5>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <CFormLabel>Username</CFormLabel>
              <br />
              <Link
                to={'../../page/security/users'}
                onClick={() => {
                  dispatch(securityUserActions.setSelectedAppAction('Read'))
                  dispatch(securityUserActions.setSelectedAppIndex(1))
                  dispatch(
                    securityUserActions.setSelectedGroup({
                      user_id: data?.user_id,
                      display_name: data?.display_name,
                      type: data?.type,
                      is_active: data?.is_active ?? false,
                    }),
                  )
                }}
              >
                <span className="font-semibold">{data?.username ?? '-'}</span>
              </Link>
            </CCol>
            <CCol>
              <CFormLabel>Person</CFormLabel>
              <br />
              <span className="font-semibold">{data?.person ?? '-'}</span>
            </CCol>
            <CCol></CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <CFormLabel>Display Name</CFormLabel>
              <br />
              <span className="font-semibold">{data?.display_name ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Type</CFormLabel>
              <br />
              <span className="font-semibold">
                {type_options.find((val) => val.value === data.type)?.label || '-'}
              </span>
            </CCol>
            <CCol>
              <CFormLabel>Status</CFormLabel>
              <br />
              <span className="font-semibold">{data?.is_active ? 'Active' : 'Inactive'}</span>
            </CCol>
          </CRow>
        </Fragment>
      )}
    </CContainer>
  )
}

export default SecurityGroupUsersComponent
