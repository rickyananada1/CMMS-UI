import * as Yup from 'yup'

const meterGroupSchema = Yup.object().shape({
  meter_group: Yup.string().required('Meter Group Name is required'),
  description: Yup.string().required('Meter Group Description is required'),
})

const meterInGroupSchema = Yup.object().shape({
  meter_group: Yup.string().required('Meter Group Name is required'),
  description: Yup.string().required('Meter Group Description is required'),
  meter_in_groups: Yup.array().of(
    Yup.object()
      .shape({
        sequence: Yup.number()
          .required('Sequence is required')
          .typeError('Please enter number value only'),
        meter_id: Yup.object().required('Meter is required'),
        meter_rollover: Yup.string().when('meter_id', {
          is: (value) => value?.meter_type === 'continuous',
          then: (schema) => schema.required('Meter Rollover is required for this meter'),
          otherwise: (schema) => schema.notRequired(),
        }),
        average_calculation_method: Yup.object().when('meter_id', {
          is: (value) => value?.meter_type === 'continuous',
          then: (schema) =>
            schema.required('Average Calculation Method is required for this meter'),
          otherwise: (schema) => schema.notRequired(),
        }),
        sliding_window_size: Yup.number().when('average_calculation_method', {
          is: (value) => value?.value === 'SLIDING-READINGS',
          then: (schema) =>
            schema
              .required('Sliding Window Size is required')
              .typeError('Please enter number value only'),
          otherwise: (schema) => schema.notRequired(),
        }),
        static_average: Yup.number().when('average_calculation_method', {
          is: (value) => value?.value === 'STATIC',
          then: (schema) =>
            schema
              .required('Static Average is required')
              .typeError('Please enter number value only'),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
      .nullable(),
  ),
})

export { meterGroupSchema, meterInGroupSchema }
