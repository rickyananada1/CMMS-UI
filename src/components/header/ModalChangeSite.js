import React, { Fragment } from 'react'
import {
  CButton,
  CCol,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from '../elements/select'
import useChangeSite from './hooks/useChangeSite'

const ModalChangeSite = (props) => {
  const { visible, setVisible, handleLogout } = props
  const { handleChangeSite, getSitesService, formValue, handleClose } = useChangeSite({
    visible,
    setVisible,
    handleLogout,
  })

  return (
    <Fragment>
      <CModal
        backdrop="static"
        alignment="center"
        size="md"
        visible={visible}
        onClose={() => handleClose()}
        aria-labelledby="switchsite"
      >
        <CModalHeader>
          <CModalTitle id="switchsite">
            <h5 className="heading-small">Switch Site</h5>
          </CModalTitle>
        </CModalHeader>
        <Formik enableReinitialize initialValues={formValue} onSubmit={handleChangeSite}>
          {(props) => {
            const { setFieldValue, isValid, dirty, isSubmitting, setFieldTouched, values } = props
            return (
              <Form>
                <CModalBody>
                  <CCol sm={12}>
                    <CFormLabel className="text-primary fw-semibold">Site</CFormLabel>
                    <Field
                      name="site_id"
                      placeholder="Choose Site"
                      value={values?.site_id}
                      apiController={getSitesService}
                      valueKey="site_id"
                      labelKey={(item) => `${item.site} - ${item.site_description} `}
                      otherKey={{
                        site: 'site',
                        site_description: 'site_description',
                      }}
                      onChange={(val) => {
                        setFieldValue(`site_id`, val)
                      }}
                      onBlur={() => {
                        setFieldTouched('site_id')
                      }}
                      query={{
                        access: 'true',
                      }}
                      size="md"
                      as={SelectPagination}
                    />
                  </CCol>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    Change
                  </CButton>
                </CModalFooter>
              </Form>
            )
          }}
        </Formik>
      </CModal>
    </Fragment>
  )
}

export default ModalChangeSite
