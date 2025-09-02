import * as Yup from 'yup'

const failureCodeSchema = Yup.object().shape({
  failure_class: Yup.object().shape({
    failure_code: Yup.string().required('Field is required'),
    // description: Yup.string().required('Field is required'),
  }),
  problem: Yup.object().shape({
    failure_code: Yup.string().required('Field is required'),
    description: Yup.string().required('Field is required'),
    cause: Yup.array().of(
      Yup.object().shape({
        failure_code: Yup.string().required('Field is required'),
        description: Yup.string().required('Field is required'),
      }),
    ),
  }),
})

const failureCodeDeleteSchema = Yup.object().shape({
  failure_class: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

const failureCodeRemediesAddSchema = Yup.object().shape({
  remedies: Yup.array().of(
    Yup.object().shape({
      failure_code: Yup.string().required('Field is required'),
      description: Yup.string().required('Field is required'),
    }),
  ),
})

export { failureCodeSchema, failureCodeDeleteSchema, failureCodeRemediesAddSchema }
