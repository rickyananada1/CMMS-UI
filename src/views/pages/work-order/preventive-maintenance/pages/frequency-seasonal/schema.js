import * as Yup from 'yup'

const frequencySchema = Yup.object()
  .required('Field is required')
  .shape({
    frequency: Yup.number().required('Field is required'),
    frequency_unit: Yup.object().required('Field is required'),
    estimated_next_schedule: Yup.string().required('Field is required'),
    start_month: Yup.object().required('Field is required'),
    start_date: Yup.object().required('Field is required'),
    end_month: Yup.object().required('Field is required'),
    end_date: Yup.object().required('Field is required'),
  })

export { frequencySchema }
