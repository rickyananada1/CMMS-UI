import * as Yup from 'yup'

const taskWOSchema = Yup.object().shape({
  task: Yup.string().required('Field is required'),
})

export { taskWOSchema }
