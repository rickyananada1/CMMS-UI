import * as Yup from 'yup'

const locationSafetyRelatedAssetsSchema = Yup.object().shape({
  related_assets_ids: Yup.array().of(
    Yup.object().shape({
      asset: Yup.object().shape({
        value: Yup.string().required('Field is required'),
      }),
    }),
  ),
})

const locationSafetyRelatedAssetsDeleteSchema = Yup.object().shape({
  safety_related_asset_ids: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
  ),
})

export { locationSafetyRelatedAssetsSchema, locationSafetyRelatedAssetsDeleteSchema }
