import * as Yup from 'yup'

const locationSafetyLockOutTagOutSchema = Yup.object().shape({
  location_safety_lock_out_tag_out: Yup.array().of(
    Yup.object().shape({
      hazard: Yup.object().shape({
        value: Yup.string().required('Field is required'),
      }),
      tag_out: Yup.object()
        .shape({
          value: Yup.string().notRequired(),
          /*
        apply_sequence: Yup.string().required('Field is required'),
        remove_sequence: Yup.string().required('Field is required'),
        */
        })
        .notRequired(),
    }),
  ),
})

const locationSafetyLockOutTagOutEditSchema = Yup.object().shape({
  location_safety_lock_out_tag_out: Yup.array().of(
    Yup.object().shape({
      hazard: Yup.object().shape({
        value: Yup.string().required('Field is required'),
      }),
    }),
  ),
})

const locationSafetyLockOutTagOutDeleteSchema = Yup.object().shape({
  safety_lexicon_ids: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
  ),
})

export {
  locationSafetyLockOutTagOutSchema,
  locationSafetyLockOutTagOutDeleteSchema,
  locationSafetyLockOutTagOutEditSchema,
}
