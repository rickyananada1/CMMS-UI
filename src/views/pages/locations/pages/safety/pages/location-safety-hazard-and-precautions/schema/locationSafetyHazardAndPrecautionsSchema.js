import * as Yup from 'yup'

const locationSafetyHazardAndPrecautionsSchema = Yup.object().shape({
  location_hazard_and_precautions: Yup.array().of(
    Yup.object().shape({
      hazard: Yup.object().shape({
        value: Yup.string().required('Field is required'),
        hazard: Yup.object().shape({
          hazard_type: Yup.string().required('Field is required'),
        }),
      }),
    }),
  ),
})

const locationSafetyHazardAndPrecautionsDeleteSchema = Yup.object().shape({
  safety_lexicon_ids: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
  ),
})

export { locationSafetyHazardAndPrecautionsSchema, locationSafetyHazardAndPrecautionsDeleteSchema }
