import * as Yup from 'yup'

const securityGroupSchema = Yup.object().shape({
  security_group_id: Yup.object().required('Group is required'),
})

const userGroupSchema = Yup.object().shape({
  security_groups: Yup.array(securityGroupSchema),
})

export { userGroupSchema }
