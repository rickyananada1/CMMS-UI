import * as Yup from 'yup'

const ticketEcpSchema = Yup.object().shape({
  ticketid: Yup.string().required('Ticket ECP is required'),
  description: Yup.string().required('Summary is required'),
  status: Yup.object().required('Status is Required'),
  // site_id: Yup.string().required('Site is required'),
  // organization: Yup.string().required('Organization is required'),
  // reportedemail: Yup.string().required('Email is required'),
  // reportedphone: Yup.string().required('Phone Number is required'),
  // reporteddate: Yup.string().required('Reported Date is Required'),
  // reportedby: Yup.object()
  //   .shape({
  //     value: Yup.string().required('Reportedby is required'),
  //   })
  //   .required('Reportedby is required'),
  location_id: Yup.object()
    .nullable()
    .test(
      'location-required',
      'Location is required unless an Asset is selected.',
      function (value) {
        const assetSelected = this.resolve(Yup.ref('asset_id'))
        return !!value?.value || !!assetSelected?.value
      },
    ),
  // asset_description: Yup.string().required('Asset Description Date is required'),
  asset_id: Yup.object()
    .nullable()
    .test('asset-required', 'Asset is required unless a Location is selected.', function (value) {
      const locationSelected = this.resolve(Yup.ref('location_id'))
      return !!value?.value || !!locationSelected?.value
    }),
  // user_id: Yup.object().required('Affected User is Required'),
  detailsummary: Yup.string()
    .transform((value) => (value || '').replace(/<[^>]*>?/gm, '').trim())
    .required('Detail Service Request is Required'),
})

export { ticketEcpSchema }
