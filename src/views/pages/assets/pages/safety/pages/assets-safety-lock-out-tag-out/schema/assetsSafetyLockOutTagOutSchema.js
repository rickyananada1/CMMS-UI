import * as Yup from 'yup'

const assetsSafetyLockOutTagOutSchema = Yup.object().shape({
  safety_lock_out_tag_out: Yup.array().of(
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

const assetsSafetyLockOutTagOutDeleteSchema = Yup.object().shape({
  safety_lexicon_ids: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
  ),
})

export { assetsSafetyLockOutTagOutSchema, assetsSafetyLockOutTagOutDeleteSchema }
