import * as Yup from 'yup'

const serviceReqSchema = Yup.object().shape({
  ticketid: Yup.string().required('Service Request is required'),
  description: Yup.string().required('Summary is required'),
  asset_id: Yup.object()
    .nullable()
    .test('asset-required', 'Asset is required unless a Location is selected.', function (value) {
      const locationSelected = this.resolve(Yup.ref('location_id'))
      return !!value?.value || !!locationSelected?.value
    }),
  // user_id: Yup.object().required('Affected User is Required'),
  affectedperson: Yup.object().required('Affected User is Required'),
  detailsummary: Yup.string()
    .transform((value) => value.replace(/<[^>]*>?/gm, '').trim())
    .required('Detail Service Request is Required'),
  affecteddate: Yup.date()
    .required('Affected Date is Required')
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === 'Invalid date' ? null : value,
    ),
})

export { serviceReqSchema }
