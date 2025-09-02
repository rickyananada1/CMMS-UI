import * as Yup from 'yup'

const QRTaskSchema = Yup.object().shape({
  task: Yup.string().required('Field is required'),
  status: Yup.string().required('Field is required'),
})

const QRTaskDeleteSchema = Yup.object().shape({
  work_order_task_id: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

export { QRTaskSchema, QRTaskDeleteSchema }
