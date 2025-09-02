import * as Yup from 'yup'

const failureReportingSchema = Yup.object().shape({
  failure_reporting: Yup.array().of(
    Yup.object()
      .shape({
        failure_code_id: Yup.object().required('Failure Class is required'),
      })
      .nullable(),
  ),
})

const failureReportingDeleteSchema = Yup.object().shape({
  work_order_failure_id: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

export { failureReportingSchema, failureReportingDeleteSchema }
