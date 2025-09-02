import * as Yup from 'yup'

const sitesSchema = Yup.object().shape({
  security_group_sites: Yup.array(
    Yup.object({
      site_id: Yup.object({
        value: Yup.number().required('Field is required'),
        label: Yup.string().required('Field is required'),
      }),
      is_authorized: Yup.boolean().required('Field is required'),
    }),
  ).min(1, 'Field of at least one'),
})

const sitesDeleteSchema = Yup.object().shape({
  site_ids: Yup.array(
    Yup.object({
      value: Yup.number().required('Field is required'),
      label: Yup.string().required('Field is required'),
    }),
  ),
})

export { sitesSchema, sitesDeleteSchema }
