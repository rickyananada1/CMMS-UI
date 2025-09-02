import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useEffect, useMemo, useState } from 'react'
import withReactContent from 'sweetalert2-react-content'
import {
  useOrganizationAddressesCreate,
  useOrganizationAddressesDetailByAddressId,
  useOrganizationAddressesUpdateByAddressId,
  useProvinceList,
  useCityist,
} from '../services/addresses'
import { useSelector } from 'react-redux'
import useFileUpload from '../../upload-file/hooks/useFileUpload'

const useAddressesForm = (mode, setAction, setTabIndex) => {
  const selectedOrganization = useSelector((state) => state.organization?.selectedGroup)
  const selectedOrganizationAddresss = useSelector((state) => state.organization?.selectedAddress)

  const fieldName = 'files'
  const orgId = selectedOrganization?.organization_id
  const addressId = selectedOrganizationAddresss?.address_id
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (
      mode === 'UpdateAddress' &&
      selectedOrganization?.organization_id &&
      selectedOrganizationAddresss?.address_id
    ) {
      return {
        uploadUrl: `/administration/organizations/${orgId}/addresses/${addressId}/attachments`,
        fetchUrl: `/administration/organizations/${orgId}/addresses/${addressId}/attachments`,
      }
    }
    // For create mode, return empty strings
    return {
      uploadUrl: '',
      fetchUrl: '',
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, addressId, orgId])

  const fileUploadProps = useMemo(
    () => ({
      fieldName,
      uploadUrl,
      fetchUrl,
      mode,
    }),
    [fieldName, uploadUrl, fetchUrl, mode],
  )

  const {
    files,
    errorMessage: messageError,
    onDrop,
    removeFiles,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    handleDownload,
    deletePendingFiles,
    deletedFiles,
  } = useFileUpload(fileUploadProps)

  const [formDeletedFiles, setFormDeletedFiles] = useState([])

  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [provinceData, setProvinceData] = useState([])
  const [cityData, setCityData] = useState([])
  const [formValue, setFormValue] = useState({
    address: [
      {
        organization_id: selectedOrganization?.organization_id ?? '',
        address_code: '',
        address_code_description: '',
        address: '',
        province_id: null,
        city_id: null,
        postal_code: null,
        country: 'Indonesia',
        tax_code: null,
      },
    ],
  })

  const Notification = withReactContent(Swal)

  const addressesCreate = useOrganizationAddressesCreate()
  const addressesUpdate = useOrganizationAddressesUpdateByAddressId()
  const addressesDetail = useOrganizationAddressesDetailByAddressId()
  const provinceList = useProvinceList()
  const cityList = useCityist()

  const addressesSchema = Yup.object().shape({
    address: Yup.array().of(
      Yup.object().shape({
        address_code: Yup.string().required('Field is required'),
        // address_code_description: Yup.string().required('Field is required'),
        address: Yup.string().required('Field is required'),
        province_id: Yup.object().required('Field is required'),
        city_id: Yup.object().required('Field is required'),
        postal_code: Yup.string().required('Field is required'),
        country: Yup.string().required('Field is required'),
        // tax_code: Yup.string().required('Field is required'),
      }),
    ),
  })

  const hasDuplicateAddressCode = (arr) => {
    const seenValues = new Set()

    return arr.some(({ address_code }) => {
      if (seenValues.has(address_code)) return true
      seenValues.add(address_code)
      return false
    })
  }

  const checkDuplicates = (arr) => {
    if (hasDuplicateAddressCode(arr)) {
      Notification.fire({
        icon: 'error',
        title: 'Oops...!',
        text: 'Address Codes must be unique',
        customClass: {
          confirmButton: 'btn btn-primary hover:text-white',
        },
        buttonsStyling: false,
      })
      return true
    }
    return false
  }

  const handleSubmit = async (values, formikHelpers) => {
    if (checkDuplicates(values?.address)) {
      return
    }

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
        let payload = values

        try {
          let orgId
          let addressId
          let fileUploadUrl

          if (mode === 'CreateAddress') {
            let bodyPayload = payload.address.map((el) => ({
              ...el,
              province_id: el.province_id.value,
              city_id: el.city_id.value,
              organization_id: selectedOrganization?.organization_id,
            }))

            const response = await addressesCreate.mutateAsync({
              id: selectedOrganization?.organization_id,
              body: bodyPayload,
            })

            orgId = selectedOrganization?.organization_id
            addressId = response?.data?.data[0]?.address_id

            if (!orgId && !addressId) {
              throw new Error('Addreses ID not returned')
            }

            fileUploadUrl = `/administration/organizations/${orgId}/addresses/${addressId}/attachments`
          } else {
            let bodyPayload = payload.address[0]
            bodyPayload.province_id = bodyPayload.province_id.value
            bodyPayload.city_id = bodyPayload.city_id.value

            const updateRes = await addressesUpdate.mutateAsync({ body: bodyPayload })
            orgId = selectedOrganization?.organization_id
            addressId = selectedOrganizationAddresss?.address_id
            fileUploadUrl = uploadUrl

            if (!updateRes || (!orgId && !addressId)) {
              throw new Error('Update failed or missing ID')
            }
          }

          if (mode === 'UpdateAddress' && deletedFiles?.length > 0) {
            await deletePendingFiles()
          }

          if (files?.length > 0 && orgId && addressId) {
            try {
              await uploadFiles(files, fileUploadUrl)
            } catch (err) {
              // Handle Nginx 413 or general upload error
              const status = err?.response?.status
              if (status === 413) {
                throw new Error('Upload failed: File size exceeds server limit (Nginx)')
              }
              throw new Error('Upload failed: ' + (err.message || 'Unknown error'))
            }
          }

          Notification.fire({
            icon: 'success',
            title: 'Success',
            text: 'Organization Address saved successfully',
            customClass: { confirmButton: 'btn btn-primary hover:text-white' },
            buttonsStyling: false,
          }).then(() => {
            setTabIndex(2)
            setAction('Read')
          })
        } catch (error) {
          Notification.fire({
            icon: 'error',
            title: 'Oops...!',
            text: error.response?.data?.message || error.message || 'Something went wrong!',
          })
        } finally {
          formikHelpers.setSubmitting(false)
        }
      }
    })
  }

  const getAddresses = async (params) => {
    await addressesDetail
      .mutateAsync({
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          let responseData = res.data.data
          let addressList = []
          getCities({ province_id: responseData.province_id })
          responseData.city_id = { label: responseData.city_name, value: responseData.city_id }
          responseData.province_id = {
            label: responseData.province_name,
            value: responseData.province_id,
          }
          addressList.push(responseData)

          setFormValue({ address: addressList })
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {})
  }

  const getProvince = async (params) => {
    await provinceList
      .mutateAsync({
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          let responseData = res.data.data
          const list = responseData.map((e) => {
            return {
              value: e.province_id,
              label: e.province_name,
            }
          })
          setProvinceData(list)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {})
  }

  const getCities = async (params) => {
    await cityList
      .mutateAsync({
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          let responseData = res.data.data
          const list = responseData.map((e) => {
            return {
              value: e.city_id,
              label: e.city_name,
            }
          })
          setCityData(list)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {})
  }

  useEffect(() => {
    getProvince()

    if (mode === 'UpdateAddress') {
      getAddresses({
        organization_id: selectedOrganization?.organization_id,
        address_id: selectedOrganizationAddresss?.address_id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const uploadModalProps = useMemo(
    () => ({
      files: files || [],
      messageError,
      onDrop,
      mode,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      isSubmitting: false,
      isError: false,
    }),
    [
      files,
      messageError,
      onDrop,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      mode,
    ],
  )

  return {
    errorMessage,
    handleSubmit,
    formValue,
    setFormValue,
    provinceData,
    addressesSchema,
    getCities,
    cityData,
    selectedOrganizationAddresss,
    mode,
    isModalOpen,
    setIsModalOpen,
    fieldName,
    uploadUrl,
    fetchUrl,
    formDeletedFiles,
    uploadModalProps,
  }
}

export default useAddressesForm
