import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useCreateAsset,
  useGetAssetDetail,
  useGetAssetDropdown,
  useGetCompeniesDropdown,
  useGetConditionCodeDropdown,
  useGetFailureCodeDropdown,
  useGetLocationDropdown,
  useGetMeterGroupDropdown,
  useSiteDropdown,
} from '../services'
import { useLocation, useNavigate } from 'react-router-dom'
import { assetActions } from '../../../slices/assetSlices'

const useDuplicate = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const auth = useSelector((state) => state.auth?.user)

  const [data, setData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  const getAsset = useGetAssetDetail()
  const createAsset = useCreateAsset()

  const status = [
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'inactive',
      label: 'Inactive',
    },
    {
      value: 'not_ready',
      label: 'Not Ready',
    },
    {
      value: 'limited_use',
      label: 'Limited Use',
    },
    {
      value: 'broken',
      label: 'Broken',
    },
    {
      value: 'missing',
      label: 'Missing',
    },
    {
      value: 'sealed',
      label: 'Sealed',
    },
  ]

  const typeAsset = [
    {
      value: 'Component',
      label: 'Component',
    },
    {
      value: 'Facilities',
      label: 'Facilities',
    },
    {
      value: 'Fleet',
      label: 'Fleet',
    },
    {
      value: 'IT',
      label: 'IT',
    },
    {
      value: 'Production',
      label: 'Production',
    },
  ]

  const [formValue, setFormValue] = useState({
    asset_num: '',
    asset_description: '',
    kks_number: '',
    existing_code: '',
    status: null,
    site_id: null,
    asset_type: '',
    asset_template: '',
    parent_id: null,
    location_id: null,
    bin: null,
    rotating_item: null,
    rotating_item_description: null,
    usage: null,
    meter_group_id: null,
    gl_account: null,
    calendar: null,
    shift: null,
    priority: null,
    serial: null,
    item_type: null,
    tool_rate: null,
    vendor_id: null,
    manufacture_id: null,
    instalation_date: null,
    purchase_price: null,
    replacement_cost: null,
    po: null,
    total_cost: null,
    ytd_cost: null,
    budgeted: null,
    inventory: null,
    asset_up: true,
    status_date: null,
    total_downtime: null,
    changed_by: null,
    changed_date: '',
    children_id: null,
    condition_code_id: null,
    failure_code_id: null,
  })

  const setSelectedRow = (param) => {
    dispatch(assetActions.setSelectedAsset(param))
  }

  const getLocationDropdown = useGetLocationDropdown()
  const getAssetDropdown = useGetAssetDropdown()
  const getConditionCodeDropdown = useGetConditionCodeDropdown()
  const getFailureCodeDropdown = useGetFailureCodeDropdown()
  const getCompeniesDropdown = useGetCompeniesDropdown()
  const getMeterGroupDropdown = useGetMeterGroupDropdown()
  const getSiteDropdown = useSiteDropdown({
    id: auth?.organization_id,
  })

  const getDetailAsset = async (params) => {
    setIsLoading(true)
    await getAsset
      .mutateAsync({
        id: selectedRow?.asset_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        navigate('../assets')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    mode !== 'Create' ? getDetailAsset() : setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    const currentDate = getCurrentDateAsString()
    setFormValue((prevState) => ({
      ...prevState,
      changed_date: currentDate,
    }))
  }, [])

  const getCurrentDateAsString = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    month = month < 10 ? '0' + month : month // Ensure two digits
    let day = currentDate.getDate()
    day = day < 10 ? '0' + day : day // Ensure two digits
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (!getAsset.data?.data?.data) return

    const dataAsset = getAsset.data.data.data
    setFormValue((prev) => ({
      ...prev,
      status: {
        value: dataAsset.status,
        label: dataAsset.status,
      },
      site_id: {
        value: dataAsset.site_id,
        label: dataAsset.site,
      },
      asset_type: {
        value: dataAsset.asset_type,
        label: dataAsset.asset_type,
      },
      asset_template: dataAsset.asset_template,
      parent_id: {
        value: dataAsset.parent_id,
        label: dataAsset.parent_asset_num,
        description: dataAsset.parent_asset_description,
      },
      location_id: {
        value: dataAsset.location_id,
        label: dataAsset.location,
        description: dataAsset.location_description,
      },
      bin: dataAsset.bin,
      rotating_item: dataAsset.rotating_item,
      rotating_item_description: dataAsset.rotating_item_description,
      usage: dataAsset.useAsset,
      meter_group_id: {
        value: dataAsset.meter_group_id,
        label: dataAsset.meter_group,
        description: dataAsset.meter_group_description,
      },
      calendar: dataAsset.calendar,
      shift: dataAsset.shift,
      priority: dataAsset.priority,
      item_type: dataAsset.item_type,
      tool_rate: dataAsset.tool_rate,
      vendor_id: {
        value: dataAsset.vendor_id,
        label: dataAsset.vendor_name,
        description: dataAsset.vendor_company,
      },
      manufacture_id: {
        value: dataAsset.manufacture_id,
        label: dataAsset.manufacture_name,
        description: dataAsset.manufacture_company,
      },
      instalation_date: dataAsset.instalation_date,
      purchase_price: dataAsset.purchase_price,
      replacement_cost: dataAsset.replacement_cost,
      po: dataAsset.po,
      total_cost: dataAsset.total_cost,
      ytd_cost: dataAsset.ytd_cost,
      budgeted: dataAsset.budgeted,
      inventory: dataAsset.inventory,
      asset_up: dataAsset.asset_up,
      total_downtime: dataAsset.total_downtime,
      changed_by: dataAsset.changed_by,
      changed_date: dataAsset.changed_date,
      children_id: dataAsset.children_id,
      condition_code_id: {
        value: dataAsset.condition_code_id,
        label: dataAsset.condition_code,
        description: dataAsset.condition_code_description,
      },
      failure_code_id: {
        value: dataAsset.failure_code_id,
        label: dataAsset.failure_code,
        description: dataAsset.failure_code_description,
      },
    }))
  }, [getAsset.data, mode])

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
        const newValues = {
          asset_num: values.asset_num,
          asset_description: values.asset_description,
          kks_number: values.kks_number,
          existing_code: values.existing_code,
          status: values.status.value,
          site_id: values.site_id.value,
          asset_type: values.asset_type.value,
          asset_template: values.asset_template,
          parent_id: values.parent_id?.value ? values.parent_id?.value : null,
          location_id: values.location_id.value,
          bin: values.bin,
          rotating_item: values.rotating_item,
          rotating_item_description: values.rotating_item_description,
          usage: values.useAsset,
          meter_group_id: values.meter_group_id?.value ? values.meter_group_id?.value : null,
          gl_account: values.gl_account,
          calendar: values.calendar,
          shift: values.shift,
          priority: values.priority,
          serial: values.serial,
          item_type: values.item_type,
          tool_rate: values.tool_rate,
          vendor_id: values.vendor_id?.value ? values.vendor_id?.value : null,
          manufacture_id: values.manufacture_id?.value ? values.manufacture_id?.value : null,
          instalation_date: values.instalation_date,
          purchase_price: Number(values.purchase_price),
          replacement_cost: Number(values.replacement_cost),
          po: values.po,
          total_cost: Number(values.total_cost),
          ytd_cost: Number(values.ytd_cost),
          budgeted: Number(values.budgeted),
          inventory: values.inventory,
          asset_up: values.asset_up,
          status_date: values.status_date,
          total_downtime: Number(values.total_downtime),
          changed_by: values.changed_by,
          changed_date: values.changed_date,
          children_id: values.children_id?.value ? values.children_id?.value : null,
          condition_code_id: values.condition_code_id?.value
            ? values.condition_code_id?.value
            : null,
          failure_code_id: values.failure_code_id?.value ? values.failure_code_id?.value : null,
        }

        await createAsset
          .mutateAsync({
            data: newValues,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: 'Asset added successfully',
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            }).then(() => {
              setTabIndex(0)
              setAction('Read')
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err.response.data.message,
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
    })
  }

  return {
    data,
    errorMessage,
    status,
    typeAsset,
    formValue,
    isLoading,
    selectedRow,
    handleSubmit,
    setSelectedRow,
    getLocationDropdown,
    getAssetDropdown,
    getConditionCodeDropdown,
    getFailureCodeDropdown,
    getCompeniesDropdown,
    getMeterGroupDropdown,
    getSiteDropdown,
  }
}

export default useDuplicate
