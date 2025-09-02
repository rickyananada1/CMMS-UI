import * as Yup from 'yup'

const laborSchema = Yup.object().shape({
  work_order_task_id: Yup.mixed().required('Field is required'),
  craft: Yup.string().required('Field is required'),
  skill_level: Yup.string().required('Field is required'),
  vendor: Yup.string().notRequired(),
  quantity: Yup.number().min(1, 'Minimal Quantity is 1').required('Field is required'),
  labor: Yup.string().required('Field is required'),
  regular_hours: Yup.number().min(0, 'Minimal Hours is 0').required('Field is required'),
  rate: Yup.number()
    .transform((_value, originalValue) => Number(String(originalValue ?? '0').replace(/,/, '.')))
    .min(0, 'Minimal Rate is 0')
    .required('Field is required'),
})
const laborSchemaMulti = Yup.object().shape({
  labors: Yup.array().of(
    Yup.object().shape({
      work_order_task_id: Yup.mixed().required('Field is required'),
      craft: Yup.string().required('Field is required'),
      skill_level: Yup.string().required('Field is required'),
      vendor: Yup.string().notRequired(),
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

const materialsSchema = Yup.object().shape({
  work_order_task_id: Yup.mixed().required('Field is required'),
  sparepart_id: Yup.mixed().required('Field is required'),
  description: Yup.string().notRequired(),
  quantity: Yup.number().min(1, 'Minimal Quantity is 1').required(),
  issue_unit: Yup.string().required('Field is required'),
  unit_cost: Yup.number()
    .transform((_value, originalValue) => Number(String(originalValue ?? '0').replace(/,/, '.')))
    .min(0, 'Minimal Unit Cost is 0')
    .required('Field is required'),
  store_room: Yup.string().notRequired(),
})
const materialsSchemaMulti = Yup.object().shape({
  materials: Yup.array().of(
    Yup.object().shape({
      work_order_task_id: Yup.mixed().required('Field is required'),
      sparepart_id: Yup.mixed().required('Field is required'),
      description: Yup.string().notRequired(),
      quantity: Yup.number().min(1, 'Minimal Quantity is 1').required(),
      issue_unit: Yup.string().required('Field is required'),
      unit_cost: Yup.number()
        .transform((_value, originalValue) =>
          Number(String(originalValue ?? '0').replace(/,/, '.')),
        )
        .min(0, 'Minimal Unit Cost is 0')
        .required('Field is required'),
      store_room: Yup.string().notRequired(),
    }),
  ),
})

const toolsSchema = Yup.object().shape({
  work_order_task_id: Yup.mixed().required('Field is required'),
  tool: Yup.string().required('Field is required'),
  description: Yup.string().notRequired(),
  quantity: Yup.number().min(1, 'Minimal Quantity is 1').required('Field is required'),
  unit_cost: Yup.number()
    .transform((_value, originalValue) => Number(String(originalValue ?? '0').replace(/,/, '.')))
    .min(0, 'Minimal Unit Cost is 0')
    .required('Field is required'),
  line_cost: Yup.number()
    .transform((_value, originalValue) => Number(String(originalValue ?? '0').replace(/,/, '.')))
    .min(0, 'Minimal Line Cost is 0')
    .required('Field is required'),
})
const toolsSchemaMulti = Yup.object().shape({
  tools: Yup.array().of(
    Yup.object().shape({
      work_order_task_id: Yup.mixed().required('Field is required'),
      tool: Yup.string().required('Field is required'),
      description: Yup.string().notRequired(),
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

const laborDeleteSchema = Yup.object().shape({
  work_order_labor_id: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

const materialsDeleteSchema = Yup.object().shape({
  work_order_material_id: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

const toolsDeleteSchema = Yup.object().shape({
  work_order_tool_id: Yup.object().shape({
    value: Yup.string().required('Field is required'),
  }),
})

export {
  laborSchema,
  laborSchemaMulti,
  materialsSchema,
  materialsSchemaMulti,
  toolsSchema,
  toolsSchemaMulti,
  laborDeleteSchema,
  materialsDeleteSchema,
  toolsDeleteSchema,
}
