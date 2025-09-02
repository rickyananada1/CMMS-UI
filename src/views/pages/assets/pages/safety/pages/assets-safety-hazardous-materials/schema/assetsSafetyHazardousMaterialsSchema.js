import * as Yup from 'yup'

const assetsSafetyHazardousMaterialsSchema = Yup.object().shape({
  hazardous_materials: Yup.array().of(
    Yup.object().shape({
      hazard: Yup.object().shape({
        value: Yup.string().required('Field is required'),
        hazard_desc: Yup.string().required('Field is required'),
        msds_num: Yup.number().required('Field is required').min(0, 'Minimal value is 0'),
        health_rating: Yup.number().required('Field is required').min(0, 'Minimal value is 0'),
        flammability_rating: Yup.number()
          .required('Field is required')
          .min(0, 'Minimal value is 0'),
        reactivity_rating: Yup.number().required('Field is required').min(0, 'Minimal value is 0'),
        contact_rating: Yup.number().required('Field is required').min(0, 'Minimal value is 0'),
      }),
    }),
  ),
})

const assetsSafetyHazardousMaterialsDeleteSchema = Yup.object().shape({
  safety_lexicon_ids: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
  ),
})

export { assetsSafetyHazardousMaterialsSchema, assetsSafetyHazardousMaterialsDeleteSchema }
