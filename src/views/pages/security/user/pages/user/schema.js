import * as Yup from 'yup'

const userSchema = Yup.object().shape({
  display_name: Yup.string().required('Display Name is required'),
  phone_number: Yup.string()
    .matches(/^\+?([0-9]+)$/, 'Please enter a valid phone number')
    .min(10, 'Phone Number must have at least 10 digits')
    .required('Phone Number is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
  type: Yup.object().required('Type is required'),
  organization_id: Yup.object().required('Organization is required'),
})

export { userSchema }
