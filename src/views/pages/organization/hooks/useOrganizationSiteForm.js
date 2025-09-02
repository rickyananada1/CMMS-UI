import {
  useServiceSiteCreate,
  useServiceSiteDetail,
  useServiceSiteUpdate,
  useServiceSiteAddressesDetail,
} from '../services'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { organizationActions } from '../slices/organizationSlices'
import { useSelector, useDispatch } from 'react-redux'
import { useServiceListAddress, useServiceListAvailableSiteAddress } from '../services/addresses'
import { useGetSitesKantorInduk, useGetSitesSektor } from '../services/getSelectData'

const useOrganizationSiteForm = (mode, setAction, setTabIndex) => {
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.organization?.selectedGroup)
  const selectedSite = useSelector((state) => state.organization?.selectedSite)

  const setSelectedRow = (param) => {
    dispatch(organizationActions.setSelectedGroup(param))
  }

  const getAddressList = useServiceListAvailableSiteAddress()
  const getAddressNonSiteList = useServiceListAddress({
    id: selectedRow?.organization_id,
  })

  const [formValue, setFormValue] = useState({
    organization_id: selectedRow?.organization_id ?? '',
    site: '',
    site_description: '',
    unit_id: '',
    is_active: true,
    site_contact: null,
    site_contact_description: null,
    site_type: null,
    sektor: '',
    sektor_description: '',
    kantor_induk: '',
    kantor_induk_description: '',
    purchasing_organization: '',
    sap_company_code: '',
    sap_company_code_description: '',
    sap_business_area: '',
    sap_business_area_description: '',
    sap_plant: '',
    sap_plant_description: '',
    hasAddress: false,
    addresses: [],
  })

  const [formSelectOpt] = useState({
    siteContactOpt: [
      {
        label: '-',
        value: '-',
      },
    ],
    sapCompanyCodeOpt: [
      {
        label: '2000',
        value: '2000',
      },
    ],
    sapPlantOpt: [
      {
        label: '2011',
        value: '2011',
      },
    ],
    purchasingOrgOpt: [
      {
        label: '2000',
        value: '2000',
      },
    ],
    siteTypeOpt: [
      {
        label: 'KANTOR INDUK',
        value: 'KANTOR INDUK',
      },
      {
        label: 'SEKTOR',
        value: 'SEKTOR',
      },
      {
        label: 'PUSAT LISTRIK',
        value: 'PUSAT LISTRIK',
      },
    ],
    mainOfficeOpt: [
      {
        label: 'KIT001',
        value: 'KIT001',
      },
      {
        label: 'KIT002',
        value: 'KIT002',
      },
    ],
    SBAOpt: [
      {
        label: '2011',
        value: '2011',
      },
    ],
    sektorOpt: [
      {
        label: 'KIT001',
        value: 'KIT001',
      },
      {
        label: 'KIT002',
        value: 'KIT002',
      },
    ],
  })

  const Notification = withReactContent(Swal)

  const serviceCreate = useServiceSiteCreate()
  const serviceDetail = useServiceSiteDetail()
  const serviceAddressListBySite = useServiceSiteAddressesDetail()
  const serviceUpdate = useServiceSiteUpdate()

  const sitesSchema = Yup.object().shape({
    // site: Yup.object().required('Field is required'),
    site: Yup.string().required('Field is required'),
    site_description: Yup.string().required('Field is required'),
    unit_id: Yup.string().required('Field is required'),
    site_type: Yup.object().required('Field is required'),
    kantor_induk: Yup.object().when('site_type', {
      is: (value) => value?.value === 'SEKTOR',
      then: (schema) => schema.required('Field is required for this site type'),
      otherwise: (schema) => schema.notRequired(),
    }),
    sektor: Yup.object().when('site_type', {
      is: (value) => value?.value === 'PUSAT LISTRIK',
      then: (schema) => schema.required('Field is required for this site type'),
      otherwise: (schema) => schema.notRequired(),
    }),
    hasAddress: Yup.boolean().default(false),
    addresses: Yup.array().when('hasAddress', {
      is: true,
      then: (schema) =>
        schema.of(
          Yup.object().shape({
            site_address_name: Yup.object().required('Field is required'),
            site_address_description: Yup.string().required('Field is required'),
          }),
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
  })

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let payload = {
          ...values,
          // site: values.site?.value ?? '',
          site: values.site ?? '',
          site_description: values.site_description ?? '',
          // address_id: values.site?.address_id ?? '',
          site_contact: values.site_contact ?? '',
          sap_company_code: values.sap_company_code ?? '',
          sap_plant: values.sap_plant ?? '',
          purchasing_organization: values.purchasing_organization ?? '',
          site_type: values.site_type?.value ?? '',
          kantor_induk:
            values.site_type?.value !== 'KANTOR INDUK' ? values.kantor_induk?.value : null,
          sap_business_area: values.sap_business_area ?? '',
          sektor: values.site_type?.value !== 'SEKTOR' ? values.sektor?.value : null,
        }
        delete payload.addresses
        let siteAddress =
          values.addresses.length > 0
            ? values.addresses.map((address) => {
                return {
                  ...address,
                  address_id: address.site_address_name.value,
                  site_address_name: address.site_address_name.label,
                }
              })
            : []

        for (let key in payload) {
          if (payload[key] === '') {
            payload[key] = null
          }
        }

        let newPayload = {
          site: payload,
          site_addresses: siteAddress,
        }
        if (mode === 'Update') {
          await serviceUpdate
            .mutateAsync({
              orgId: selectedRow?.organization_id,
              body: newPayload,
            })
            .then((res) => {
              if (res.status === 200) {
                // eslint-disable-next-line array-callback-return
                Notification.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: `Site saved successfully.`,
                }).then(() => {
                  setTabIndex(3)
                  setAction('Read')
                })
              }
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err?.response?.data?.message,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              })
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        } else {
          await serviceCreate
            .mutateAsync({
              orgId: selectedRow?.organization_id,
              body: newPayload,
            })
            .then((res) => {
              if (res.status === 200) {
                // eslint-disable-next-line array-callback-return
                Notification.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: `Site saved successfully.`,
                }).then(() => {
                  setTabIndex(0)
                  setTabIndex(3)
                  setAction('Read')
                })
              }
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err?.response?.data?.message,
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              })
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
      }
    })
  }

  const getSite = async (params) => {
    await serviceDetail
      .mutateAsync({
        orgId: selectedRow?.organization_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          let responseData = res.data.data
          let newData = {
            ...responseData,
            site: responseData?.site,
            site_description: responseData?.site_description,
            site_type: formSelectOpt.siteTypeOpt.find((el) => el.value === responseData?.site_type),
            ...(responseData?.kantor_induk !== null && {
              kantor_induk: {
                value: responseData?.kantor_induk_id,
                label: responseData?.kantor_induk,
              },
            }),
            ...(responseData?.sektor !== null && {
              sektor: {
                value: responseData?.sektor_id,
                label: responseData?.sektor,
              },
            }),
          }

          setTimeout(async () => {
            await serviceAddressListBySite
              .mutateAsync({
                orgId: selectedRow?.organization_id,
                params: {
                  organization_id: selectedRow?.organization_id,
                  site_id: selectedSite?.site_id,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  let addressData = res.data.data
                  addressData.map((el) => {
                    el.site_address_name = {
                      label: el.address_code,
                      value: el.address_id,
                    }
                    el.site_address_description = el.address_code_description || null
                    // el.bill_to_contact = {
                    //   label: el.bill_to_contact,
                    //   value: el.bill_to_contact,
                    // }
                    // el.ship_to_contact = {
                    //   label: el.ship_to_contact,
                    //   value: el.ship_to_contact,
                    // }
                    return el
                  })
                  // if (addressData.length === 0) {
                  //   addressData = [
                  //     {
                  //       site_address_name: '',
                  //       site_address_description: '',
                  //       bill_to_contact: null,
                  //       bill_to_contact_description: null,
                  //       bill_to: true,
                  //       ship_to_contact: null,
                  //       ship_to_contact_description: null,
                  //       ship_to: true,
                  //       default_bill_to: true,
                  //       default_ship_to: true,
                  //     },
                  //   ]
                  // }
                  if (addressData.length > 0) {
                    newData = { ...newData, hasAddress: true }
                  }
                  setFormValue({ ...newData, ...{ addresses: addressData } })
                }
              })
              .catch((err) => {
                Notification.fire({
                  icon: 'error',
                  title: 'Oops...!',
                  text: err?.response?.data?.message,
                  customClass: {
                    confirmButton: 'btn btn-primary hover:text-white',
                  },
                  buttonsStyling: false,
                })
              })
              .finally(() => {})
          }, 0)
        }
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Oops...!',
          text: err?.response?.data?.message,
          customClass: {
            confirmButton: 'btn btn-primary hover:text-white',
          },
          buttonsStyling: false,
        })
      })
      .finally(() => {})
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (mode === 'Update') {
      getSite({ id: selectedSite?.site_id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const duplicateAddressError = () => {
    Notification.fire({
      icon: 'error',
      title: 'Error!',
      text: `Address already selected.`,
    })
  }

  const getSitesSektor = useGetSitesSektor()

  const getSitesKantorInduk = useGetSitesKantorInduk()

  return {
    sitesSchema,
    handleSubmit,
    formValue,
    setFormValue,
    formSelectOpt,
    selectedRow,
    setSelectedRow,
    selectedSite,
    getAddressList,
    duplicateAddressError,
    getSitesSektor,
    getSitesKantorInduk,
    getAddressNonSiteList,
  }
}

export default useOrganizationSiteForm
