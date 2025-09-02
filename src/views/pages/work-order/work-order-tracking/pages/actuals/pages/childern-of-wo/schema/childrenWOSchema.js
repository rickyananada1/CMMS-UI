import * as Yup from 'yup'

const childrenWOSchema = Yup.object().shape({
  record: Yup.string().required('Field is required'),
})

export { childrenWOSchema }
