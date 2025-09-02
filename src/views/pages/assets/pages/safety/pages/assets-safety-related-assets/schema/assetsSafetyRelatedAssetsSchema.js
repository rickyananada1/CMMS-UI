import * as Yup from 'yup'

const assetsSafetyRelatedAssetsSchema = Yup.object().shape({
  related_assets_ids: Yup.array().of(
    Yup.object().shape({
      asset: Yup.object().shape({
        value: Yup.string().required('Field is required'),
      }),
    }),
  ),
})

const assetsSafetyRelatedAssetsDeleteSchema = Yup.object().shape({
  safety_related_asset_ids: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
  ),
})

export { assetsSafetyRelatedAssetsSchema, assetsSafetyRelatedAssetsDeleteSchema }
