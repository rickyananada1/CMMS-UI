import moment from 'moment'
import * as Yup from 'yup'

const workOrderSchema = Yup.object().shape({
  work_order_code: Yup.string().required('Work Order Code is required'),
  description: Yup.string().required('Work Order Description is required'),
  location_id: Yup.object()
    .nullable()
    .test(
      'location-required',
      'Location is required unless an Asset is selected.',
      function (value) {
        const assetSelected = this.resolve(Yup.ref('asset_id'))
        return !!value?.value || !!assetSelected?.value
      },
    ),
  asset_id: Yup.object()
    .nullable()
    .test('asset-required', 'Asset is required unless a Location is selected.', function (value) {
      const locationSelected = this.resolve(Yup.ref('location_id'))
      return !!value?.value || !!locationSelected?.value
    }),
  parent_wo_id: Yup.object().nullable(),
  site_id: Yup.object().required('Site is Required'),
  failure_code: Yup.object().required('Failure Class is Required'),
  classification: Yup.object().required('Classification is Required'),
  work_type: Yup.object().required('Work Type is Required'),
  work_priority: Yup.object().required('Work Priority is Required'),
  status: Yup.object().required('Status is Required'),
  // hazard_id: Yup.object().required('Hazard is Required'),

  configuration_item_id: Yup.string().required('Configuration Item is required'),
  configuration_item_description: Yup.string().required(
    'Configuration Item Description is required',
  ),
  movement_type_id: Yup.string().required('Movement Type is Required'),
  movement_type_description: Yup.string().required('Movement Type Description is Required'),
  cost_center_id: Yup.string().required('Cost Center is Required'),
  cost_center_description: Yup.string().required('Cost Center Description is Required'),
  internal_order_id: Yup.string().required('Internal Order is Required'),
  internal_order_description: Yup.string().required('Internal Order Description is Required'),
  wbs_id: Yup.string().required('WBS is Required'),
  wbs_description: Yup.string().required('WBS Description is Required'),
  vendor_id: Yup.string().required('Vendor is Required'),
  vendor_description: Yup.string().required('Vendor Description is Required'),
  gl_account_id: Yup.string().required('GL Account is Required'),
  job_plan_id: Yup.object().required('Job Plan is Required'),
  scheduled_start: Yup.date()
    .required('Scheduled Start is Required')
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === 'Invalid date' ? null : value,
    ),
  scheduled_finish: Yup.date()
    .required('Scheduled Finish is Required')
    .min(
      Yup.ref('scheduled_start'),
      ({ min }) => `Scheduled Finish must be later than ${moment(min).format('DD/MM/YYYY HH:mm')}`,
    )
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === 'Invalid date' ? null : value,
    ),
  actual_start: Yup.date()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === 'Invalid date' ? null : value,
    ),
  actual_finish: Yup.date()
    .min(
      Yup.ref('actual_start'),
      ({ min }) => `Actual Finish must be later than ${moment(min).format('DD/MM/YYYY HH:mm')}`,
    )
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === 'Invalid date' ? null : value,
    ),
})

export { workOrderSchema }
