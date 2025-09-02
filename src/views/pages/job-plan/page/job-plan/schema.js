import * as Yup from 'yup'

const jobPlanSchema = Yup.object()
  .required('Field is required')
  .shape({
    plan_name: Yup.string().required('Field is required and must be unique'),
    plan_description: Yup.string().required('Field is required'),
    organization_id: Yup.object().required('Field is required'),
    site_id: Yup.object().required('Field is required'),
    status: Yup.object().required('Field is required'),
  })

const laborSchema = Yup.object().shape({
  labor: Yup.array().of(
    Yup.object().shape({
      work_order_task_id: Yup.object().required('Field is required'),
      craft: Yup.string().required('Field is required'),
      skill_level: Yup.object().required('Field is required'),
      vendor: Yup.string().required('Field is required'),
      quantity: Yup.number().min(1, 'Minimal Quantity is 1').required('Field is required'),
      labor: Yup.string().required('Field is required'),
      regular_hours: Yup.number().min(0, 'Minimal Hours is 0').required('Field is required'),
      rate: Yup.number()
        .transform((_value, originalValue) =>
          Number(String(originalValue ?? '0').replace(/,/, '.')),
        )
        .min(0, 'Minimal Rate is 0')
        .required('Field is required'),
    }),
  ),
})

const materialSchema = Yup.object().shape({
  material: Yup.array().of(
    Yup.object().shape({
      work_order_task_id: Yup.object().required('Field is required'),
      sparepart_id: Yup.object().required('Field is required'),
      quantity: Yup.number().min(1, 'Minimal Quantity is 1').required(),
      issue_unit: Yup.string().required('Field is required'),
      unit_cost: Yup.number()
        .transform((_value, originalValue) =>
          Number(String(originalValue ?? '0').replace(/,/, '.')),
        )
        .min(0, 'Minimal Unit Cost is 0')
        .required('Field is required'),
      store_room: Yup.string().required('Field is required'),
    }),
  ),
})

const toolSchema = Yup.object().shape({
  tool: Yup.array().of(
    Yup.object().shape({
      work_order_task_id: Yup.object().required('Field is required'),
      tool: Yup.string().required('Field is required'),
      description: Yup.string().required('Field is required'),
      quantity: Yup.number().min(1, 'Minimal Quantity is 1').required('Field is required'),
      unit_cost: Yup.number()
        .transform((_value, originalValue) =>
          Number(String(originalValue ?? '0').replace(/,/, '.')),
        )
        .min(0, 'Minimal Unit Cost is 0')
        .required('Field is required'),
      line_cost: Yup.number()
        .transform((_value, originalValue) =>
          Number(String(originalValue ?? '0').replace(/,/, '.')),
        )
        .min(0, 'Minimal Line Cost is 0')
        .required('Field is required'),
    }),
  ),
})

const jobPlanTaskSchema = Yup.object().shape({
  job_plan_task: Yup.array().of(
    Yup.object().shape({
      sequence: Yup.number()
        .required('Field is required')
        .typeError('Please enter number value only'),
      task: Yup.string().required('Field is required'),
      description: Yup.string().required('Field is required'),
      status: Yup.object().required('Field is required'),
      location_id: Yup.object().nullable(),
      asset_id: Yup.object().nullable(),
      inspector: Yup.string().nullable(),
      measurement_point: Yup.string().nullable(),
      measurement_value: Yup.string().nullable(),
      measurement_date: Yup.string().nullable(),
      target_start: Yup.string().nullable(),
      target_finish: Yup.string().nullable(),
      scheduled_start: Yup.string().nullable(),
      scheduled_finish: Yup.string().nullable(),
      start_no_earlier_than: Yup.string().nullable(),
      finish_no_later_than: Yup.string().nullable(),
      actual_start: Yup.string().nullable(),
      actual_finish: Yup.string().nullable(),
      duration_in_minute: Yup.number().nullable(),
    }),
  ),
})

export { jobPlanSchema, laborSchema, materialSchema, toolSchema, jobPlanTaskSchema }
