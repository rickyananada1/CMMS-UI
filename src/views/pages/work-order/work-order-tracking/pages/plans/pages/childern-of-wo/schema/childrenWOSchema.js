import * as Yup from 'yup'

const childrenWOSchema = Yup.object().shape({
  record: Yup.object().required('Field is required'),
  scheduled_start: Yup.string().required('Field is required'),
  scheduled_finish: Yup.string().required('Field is required'),
})

export { childrenWOSchema }
