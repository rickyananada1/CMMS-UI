import * as Yup from 'yup'

const metersSchema = Yup.object().shape({
  meter_name: Yup.string().required('Meter Name is required'),
  meter_description: Yup.string().required('Meter Description is required'),
  meter_type: Yup.object().required('Meter Type is required'),
  uom_id: Yup.object().required('Unit of Measure is required'),
  meter_reading_type_id: Yup.object().when('meter_type', {
    is: (type) => type?.value === 'continuous',
    then: (schema) => schema.required('Meter Reading Type is required for continuous meter type'),
    otherwise: (schema) => schema.notRequired(),
  }),
})

export { metersSchema }
