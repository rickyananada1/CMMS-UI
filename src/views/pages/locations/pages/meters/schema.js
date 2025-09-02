import * as Yup from 'yup'

const locationMetersSchema = Yup.object().shape({
  meter_in_groups: Yup.array().of(
    Yup.object()
      .shape({
        sequence: Yup.number()
          .typeError('Please enter number value only')
          .nullable()
          .moreThan(0, 'Sequence cannot be negative'),
        meter_id: Yup.object().required('Meter is required'),
        new_reading: Yup.string().when('meter_id', {
          is: (value) => value?.meter_type !== 'characteristic',
          then: () =>
            Yup.number().typeError('Reading Value must be number for this meter ').notRequired(),
          otherwise: (schema) => schema.notRequired(),
        }),
        point: Yup.number().typeError('Please enter number value only').notRequired(),

        meter_rollover: Yup.string().when('meter_id', {
          is: (value) => value?.meter_type === 'continuous',
          then: (schema) => schema.typeError('Please enter number value only').notRequired(),
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
              .typeError('Please enter number value only')
              .notRequired()
              .integer('Sliding Window Size cannot be decimal')
              .moreThan(0, 'Sliding Window Size cannot be negative'),
          otherwise: (schema) => schema.notRequired(),
        }),
        static_average: Yup.number().when('average_calculation_method', {
          is: (value) => value?.value === 'STATIC',
          then: (schema) => schema.typeError('Please enter number value only').notRequired(),
          otherwise: (schema) => schema.notRequired(),
        }),
        life_to_date_for_location: Yup.number().when('average_calculation_method', {
          is: (value) => value?.value === 'STATIC',
          then: (schema) => schema.typeError('Please enter number value only').notRequired(),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
      .nullable(),
  ),
})

const measurementsSchema = Yup.object().shape({
  reading: Yup.string().when('meter_type', {
    is: (value) => value !== 'characteristic',
    then: () =>
      Yup.number()
        .typeError('Reading Value must be number for this meter ')
        .required('New Reading is required'),
    otherwise: (schema) => schema.required('New Reading is required'),
  }),
})

export { locationMetersSchema, measurementsSchema }
