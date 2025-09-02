import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useUpdateSite } from '../services/updateSites'
import { useSiteOrgDetail, useSiteOrgList } from '../services/orgSites'
import { useSelector, useDispatch } from 'react-redux'
import { securityGroupActions } from '../../../slices/securityGroupSlices'
import { useSiteList } from '../services/getSites'

const useEditSites = ({ setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)
  const userOrgId = useSelector((state) => state.auth?.user?.organization_id)

  const Notification = withReactContent(Swal)
  const [idOrgSite, setIdOrgSite] = useState('')
  const [dataSiteOrg, setDataSite] = useState([])
  const [formValue, setFormValue] = useState({
    security_group_sites: [
      {
        site_id: {
          value: '',
          label: '',
        },
        site_description: '',
        is_active: false,
        is_authorized: false,
      },
    ],
  })

  const setSelectedRow = (param) => {
    dispatch(securityGroupActions.setSelectedGroup(param))
  }

  const siteList = useSiteList({
    id: selectedRow?.security_group_id,
    config: {
      enabled: false,
    },
    params: {
      page: 1,
      limit: 100,
    },
  })

  useEffect(() => {
    siteList.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!siteList.data?.data.data) return
    const responseData = siteList.data.data.data
    const dataDetailSite = responseData.map((item) => ({
      site_id: {
        value: item.site_id,
        label: item.site,
      },
      site_description: item.site_description,
      is_active: item.is_active,
      is_authorized: item.is_authorized,
    }))
    setFormValue((prev) => ({
      ...prev,
      security_group_sites: dataDetailSite,
    }))
  }, [siteList.data])

  const handleChangeSite = (val) => {
    setIdOrgSite(val)
  }

  const siteOrg = useSiteOrgList({
    id: userOrgId,
    excludedSecurityGroupId: selectedRow?.security_group_id,
  })

  const siteOrgDetail = useSiteOrgDetail({
    id: userOrgId,
    secondId: idOrgSite,
  })

  const getDataSiteOrg = async (params) => {
    await siteOrgDetail
      .mutateAsync({
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          let responseData = res.data
          setDataSite((prev) => [...prev, responseData.data])
          setIdOrgSite('')
        }
      })
  }

  useEffect(() => {
    if (idOrgSite !== '') {
      getDataSiteOrg()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOrgSite])

  const updateSites = useUpdateSite({
    id: selectedRow?.security_group_id,
  })

  const duplicateSiteError = () => {
    Notification.fire({
      icon: 'error',
      title: 'Error!',
      text: `Site already selected.`,
    })
  }

  const handleSubmit = (values, formikHelpers) => {
    const newValues = values.security_group_sites.map((e) => {
      return {
        site_id: e.site_id.value,
        is_authorized: e.is_authorized,
      }
    })
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await updateSites
            .mutateAsync({
              data: {
                security_group_sites: newValues,
              },
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Security Group Sites updated successfully',
                customClass: {
                  confirmButton: 'btn btn-primary hover:text-white',
                },
                buttonsStyling: false,
              }).then(() => {
                setTabIndex(2)
                setAction('Read')
              })
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Oops...!',
                text: err.response?.data.message,
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
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  return {
    userOrgId,
    siteOrg,
    formValue,
    dataSiteOrg,
    handleSubmit,
    setSelectedRow,
    handleChangeSite,
    duplicateSiteError,
    selectedRow,
  }
}

export default useEditSites
