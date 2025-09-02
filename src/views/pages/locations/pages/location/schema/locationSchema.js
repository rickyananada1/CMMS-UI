import * as Yup from 'yup'

const locationSchema = Yup.object().shape({
  location: Yup.object({
    site_id: Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
    location: Yup.string().required('Field is required'),
    location_description: Yup.string().required('Field is requied'),
    location_type: Yup.string().required('Field is required'),
    location_status: Yup.string().required('Field is required'),
    location_priority: Yup.number().notRequired(),
    location_special_date: Yup.string().notRequired(),
    location_attachment_url: Yup.mixed().notRequired(),
    meter_group: Yup.object().shape({
      value: Yup.string().notRequired(),
      description: Yup.string().notRequired(),
    }),
    location_shift: Yup.number().notRequired(),
    failure_class: Yup.object().shape({
      value: Yup.string().notRequired(),
    }),
    location_gl_account: Yup.string().notRequired(),
    location_labor: Yup.string().notRequired(),
    location_address: Yup.string().notRequired(),
    location_bill_to: Yup.string().notRequired(),
    location_ship_to: Yup.string().notRequired(),
    hazard_group: Yup.string().notRequired(),
    hazard_group_description: Yup.string().notRequired(),
    rotating_item: Yup.string().optional().nullable(true),
    rotating_item_description: Yup.string().optional().nullable(true),
    /*
    hazard_group: Yup.object().shape({
      value: Yup.mixed().notRequired(),
      description: Yup.mixed().notRequired(),
    }),
    */
  }),
  /*
  location_associates: Yup.array(
    Yup.object({
      location_associate_location_id: Yup.object({
        value: Yup.number().required('Field is required'),
        label: Yup.string().required('Field is required'),
      }),
      location_associate_type: Yup.string().required('Field is required'),
    }),
  ).min(1, 'Field of at least one'),
  */
})

export { locationSchema }
