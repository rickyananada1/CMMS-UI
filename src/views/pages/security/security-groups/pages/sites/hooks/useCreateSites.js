import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCreateSite } from '../services/createSites'
import { useSiteOrgDetail, useSiteOrgList } from '../services/orgSites'
import { useSelector, useDispatch } from 'react-redux'
import { securityGroupActions } from '../../../slices/securityGroupSlices'

const useCreateSites = ({ setAction, setTabIndex }) => {
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)
  const userOrgId = useSelector((state) => state.auth?.user?.organization_id)

  const Notification = withReactContent(Swal)
  const [idOrgSite, setIdOrgSite] = useState('')
  const [dataSiteOrg, setDataSite] = useState([])
  const [formValue] = useState({
    security_group_sites: [
      {
        site_id: {
          value: '',
          label: '',
        },
        is_authorized: false,
      },
    ],
  })

  const setSelectedRow = (param) => {
    dispatch(securityGroupActions.setSelectedGroup(param))
  }

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
          let responseData = res?.data
          setDataSite((prev) => [...prev, responseData?.data])
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

  const createSites = useCreateSite({
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
          await createSites
            .mutateAsync({
              data: {
                security_group_sites: newValues,
              },
            })
            .then((res) => {
              Notification.fire({
                icon: 'success',
                title: 'Success',
                text: 'Security Group Sites added successfully',
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
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  return {
    siteOrg,
    formValue,
    dataSiteOrg,
    handleSubmit,
    setSelectedRow,
    handleChangeSite,
    userOrgId,
    duplicateSiteError,
    selectedRow,
  }
}

export default useCreateSites
