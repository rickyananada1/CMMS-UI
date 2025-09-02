import * as Yup from 'yup'

const userSchema = Yup.object().shape({
  display_name: Yup.string().required('Display Name is required'),
  type: Yup.object().required('Type is required'),
})

export { userSchema }
