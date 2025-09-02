import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { SelectPagination } from 'src/components/elements/select'
import useJobPlanDelete from './hooks/useJobPlanDelete'
import * as Yup from 'yup'

const jobPlanDeleteSchema = Yup.object().shape({
  job_plan_id: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

const JobPlanDelete = ({ tableRef, setAction, initialVisible }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { textFields, handleDeleteJobPlan, getJobPlanListService } = useJobPlanDelete({
    tableRef,
    setAction,
  })

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => {
        setVisible(false)
        setAction('Read')
      }}
    >
      <CModalHeader>
        <CModalTitle>
          <h5 className="heading-small">Delete Job Plan</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          enableReinitialize
          initialValues={textFields}
          validationSchema={jobPlanDeleteSchema}
          onSubmit={handleDeleteJobPlan}
        >
          {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
            return (
              <Form>
                <CFormLabel className="fw-semibold">Job Plan</CFormLabel>
                <Field
                  name="job_plan_id"
                  placeholder="Choose Job Plan"
                  onChange={(value) => setFieldValue('job_plan_id', value)}
                  apiController={getJobPlanListService}
                  valueKey="job_plan_id"
                  labelKey="job_plan"
                  value={values?.job_plan_id}
                  as={SelectPagination}
                />
                <div className="d-flex justify-content-end mt-3">
                  <CButton
                    color="danger"
                    type="submit"
                    className="text-white"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    Delete
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    className="ml-3"
                    onClick={() => {
                      setVisible(false)
                      setAction('Read')
                    }}
                  >
                    Cancel
                  </CButton>
                </div>
              </Form>
            )
          }}
        </Formik>
      </CModalBody>
    </CModal>
  )
}

export default JobPlanDelete
