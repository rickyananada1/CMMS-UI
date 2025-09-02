import React, { Fragment } from 'react'
import {
  CButton,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import useConditionMonitoringDelete from './hooks/useConditionMonitoringDelete'

const ConditionMonitoringDelete = ({ mode, setAction, setTabIndex }) => {
  const { handleDelete, formValue, setDeleteCMValue, getConditionMonitoringDropdown } =
    useConditionMonitoringDelete({
      mode,
      setAction,
      setTabIndex,
    })
  return (
    <CModal
      backdrop="static"
      alignment="center"
      size="lg"
      visible={mode === 'Delete'}
      onClose={() => setAction('Read')}
      aria-labelledby="deleteconditionmonitoring"
    >
      <CModalHeader>
        <CModalTitle id="movemodifyasset">
          <h5 className="heading-small">Delete Relation Update </h5>
        </CModalTitle>
      </CModalHeader>
      <Formik enableReinitialize initialValues={formValue} onSubmit={handleDelete}>
        {(props) => {
          const { isSubmitting, values } = props

          return (
            <Fragment>
              <Form>
                <CModalBody>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                      <Field
                        name="asset_relation_ids"
                        placeholder="Enter Asset"
                        valueKey="condition_monitoring_id"
                        labelKey="point_num"
                        value={values.condition_monitoring_ids}
                        isMulti
                        apiController={getConditionMonitoringDropdown}
                        onChange={(val) => {
                          setDeleteCMValue(val)
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                    </div>
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Delete
                  </CButton>
                </CModalFooter>
              </Form>
            </Fragment>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default ConditionMonitoringDelete
