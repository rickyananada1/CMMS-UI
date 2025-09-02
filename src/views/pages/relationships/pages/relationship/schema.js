import * as Yup from 'yup'

const relationshipSchema = Yup.object().shape({
  asset_id: Yup.object().required('Field is required'),
  related_asset_id: Yup.object().required('Field is required'),
  relation_name: Yup.string().required('Field is required'),
  relation_type: Yup.object().required('Field is required'),
})

export { relationshipSchema }
