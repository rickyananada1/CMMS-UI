import * as Yup from 'yup'

const ChangePasswordSchema = Yup.object().shape({
  new_password: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm password is required'),
})

export { ChangePasswordSchema }
