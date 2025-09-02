import * as Yup from 'yup'

const securityGroupSchema = Yup.object().shape({
  security_group_code: Yup.string().required('Group Code is required'),
  security_group_desc: Yup.string().required('Group Description is required'),
  // start_center_template: Yup.number()
  //   .typeError('Start Center Template must be a number')
  //   .required('Start Center Template is required'),
  // start_center_template_desc: Yup.string().required(
  //   'Start Center Template Description is required',
  // ),
})

export { securityGroupSchema }
