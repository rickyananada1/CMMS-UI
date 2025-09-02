import * as Yup from 'yup'

const relationSchema = Yup.object().shape({
  data: Yup.array(
    Yup.object({
      asset_id: Yup.number().required('Field is required'),
      related_asset_id: Yup.object().required('Field is required'),
      relation_name: Yup.string().required('Field is required'),
      relation_type: Yup.object().required('Field is required'),
    }),
  ),
})

export { relationSchema }
