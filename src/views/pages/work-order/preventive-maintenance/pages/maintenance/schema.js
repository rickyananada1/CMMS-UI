import * as Yup from 'yup'

const preventiveMaintenanceSchema = Yup.object()
  .required('Field is required')
  .shape({
    preventive_maintenance_name: Yup.string().required('Field is required and must be unique'),
    preventive_maintenance_description: Yup.string().required('Field is required'),
    location_id: Yup.object().required('Field is required'),
    asset_id: Yup.object().required('Field is required'),
    status: Yup.object().required('Field is required'),
    job_plan_id: Yup.object().required('Field is required'),
    gl_account: Yup.string().required('Field is required'),
    gl_account_desc: Yup.string().required('Field is required'),
    storeroom_site: Yup.string().required('Field is required'),
    storeroom_desc: Yup.string().required('Field is required'),
  })

const preventiveMaintenanceDeleteSchema = Yup.object().shape({
  preventive_maintenance_id: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

const workOrderSchema = Yup.object().shape({
  work_order_code: Yup.string().required('Work Order Code is required'),
  description: Yup.string().required('Work Order Description is required'),
  location_id: Yup.object().required('Location is Required'),
  asset_id: Yup.object().required('Asset is Required'),
  parent_wo_id: Yup.object().nullable(),
  site_id: Yup.object().required('Site is Required'),
  failure_code: Yup.object().required('Failure Class is Required'),
  classification: Yup.object().required('Classification is Required'),
  work_type: Yup.object().required('Work Type is Required'),
  work_priority: Yup.object().required('Work Priority is Required'),
  status: Yup.object().required('Status is Required'),
  // hazard_id: Yup.object().required('Hazard is Required'),

  configuration_item_id: Yup.number().typeError('Please enter number value only').nullable(),
  movement_type_id: Yup.number().typeError('Please enter number value only').nullable(),
  cost_center_id: Yup.number().typeError('Please enter number value only').nullable(),
  internal_order_id: Yup.number().typeError('Please enter number value only').nullable(),
  wbs_id: Yup.number().typeError('Please enter number value only').nullable(),
  vendor_id: Yup.number().typeError('Please enter number value only').nullable(),
  gl_account_id: Yup.number().typeError('Please enter number value only').nullable(),
})

export { preventiveMaintenanceSchema, preventiveMaintenanceDeleteSchema, workOrderSchema }
