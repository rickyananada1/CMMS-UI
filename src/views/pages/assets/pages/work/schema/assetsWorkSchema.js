import * as Yup from 'yup'

const assetsWorkSchema = Yup.object().shape({
  work_order_code: Yup.string().required('Field is required'),
  description: Yup.string().required('Field is required'),
  work_priority: Yup.string().required('Field is required'),
  status: Yup.string().required('Field is required'),
  scheduled_start: Yup.string().required('Field is required'),
  scheduled_finish: Yup.string().required('Field is required'),
})

export { assetsWorkSchema }
