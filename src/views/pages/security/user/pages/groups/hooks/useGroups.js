import { useEffect, useState } from 'react'
import { useUpdateGroups, useGetGroups, useGetSecurityGroups, useDownloadGroups } from '../services'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from 'react-redux'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useGetGroupPerms } from 'src/views/pages/security/security-groups/pages/applications/services'

const useGroups = ({ mode, setAction, setTabIndex }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.securityUser?.selectedGroup)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [dataMeterInGroup, setDataMeterInGroup] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getSecurityGroupsService = useGetSecurityGroups()
  const navigate = useNavigate()
  const location = useLocation()

  const [formValue, setFormValue] = useState({
    security_groups: [{}],
  })
  const [hasOrganization, setHasOrganization] = useState([])

  useEffect(() => {
    if (selectedRow?.user_id !== undefined) {
      mode !== 'Create' ? getGroups() : setIsLoading(false)
    } else {
      setTabIndex(0)
      setAction('Read')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const downloadGroupsService = useDownloadGroups({
    id: selectedRow?.user_id,
  })

  const getGroupsService = useGetGroups()

  const getSecurityGroupApplicationsService = useGetGroupPerms()

  const getGroups = async (params) => {
    setIsLoading(true)
    await getGroupsService
      .mutateAsync({
        id: selectedRow?.user_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data)
        }
      })
      .catch((err) => {
        Notification.fire({
          icon: 'error',
          title: 'Error!',
          text: err.response.data.message,
        })
        setErrorMessage(err)
        navigate('../users')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!getGroupsService.data?.data?.data) return
    const data = getGroupsService.data.data.data
    setFormValue((prev) => ({
      ...prev,
      ...(data.length > 0
        ? {
            security_groups: data?.map((group) => ({
              security_group_id: {
                value: group.security_group_id,
                label: group.security_group_code,
                security_group_description: group.security_group_description,
              },
              is_authorized: group.is_authorized,
            })),
          }
        : { security_groups: [{}] }),
    }))
  }, [getGroupsService.data])

  useEffect(() => {
    if (formValue.security_groups.length > 0) {
      getOrgs(formValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue])

  const getOrgs = async (data) => {
    if (mode !== 'Read') {
      var filteredData = data?.security_groups?.filter(
        (group) => !hasOrganization.map((ho) => ho?.id).includes(group?.security_group_id?.value),
      )
      const hasOrg = await Promise.all(
        filteredData?.map(async (group) => {
          var orgData = {}
          await getSecurityGroupApplicationsService
            .mutateAsync({
              id: group?.security_group_id?.value,
            })
            .then((res) => {
              if (res.status === 200) {
                console.log('rdd', res?.data?.data)
                orgData = {
                  id: group?.security_group_id?.value,
                  hasOrg: res?.data?.data?.some((item) => item?.application === 'Organization'),
                }
              }
            })
            .catch((err) => {
              orgData = { id: group?.security_group_id?.value, hasOrg: false }
            })

          return orgData
        }),
      )
      setHasOrganization((prev) => [...prev, ...hasOrg])
    }
  }

  const updateMeterGroup = useUpdateGroups()

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
        const modifiedFormData = {
          security_groups: values.security_groups.map((group) => {
            return {
              ...group,
              security_group_id: group.security_group_id.value,
            }
          }),
        }

        if (mode === 'Update') {
          await updateMeterGroup
            .mutateAsync({
              id: selectedRow.user_id,
              data: modifiedFormData,
            })
            .then((res) => {
              if (selectedRow?.type <= 3) {
                var hasOrgIds = hasOrganization
                  .map((org) => org?.hasOrg && org?.id)
                  .filter((i) => i !== false)
                console.log('check org id hoi', hasOrgIds)
                console.log('vals', values?.security_groups)
                if (
                  values?.security_groups?.some((group) =>
                    hasOrgIds?.includes(group?.security_group_id?.value),
                  )
                ) {
                  Notification.fire({
                    icon: 'warning',
                    title: 'Organization Restriction',
                    text: `Daily/Secondary User & Requester can't access organization module`,
                  }).then(() => {
                    Notification.fire({
                      icon: 'success',
                      title: 'Success!',
                      text: `Groups updated successfully.`,
                    }).then(() => {
                      setTabIndex(2)
                      setAction('Read')
                    })
                  })
                } else {
                  Notification.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `Groups updated successfully.`,
                  }).then(() => {
                    setTabIndex(2)
                    setAction('Read')
                  })
                }
              } else {
                Notification.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: `Groups updated successfully.`,
                }).then(() => {
                  setTabIndex(2)
                  setAction('Read')
                })
              }
            })
            .catch((err) => {
              Notification.fire({
                icon: 'error',
                title: 'Error!',
                text: err?.response?.data?.message,
              })
              setErrorMessage(err?.response?.data?.message)
            })
            .finally(() => {
              formikHelpers.setSubmitting(false)
            })
        }
      }
    })
  }

  const downloadGroups = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to download ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const column_names = ['security_group_code', 'security_group_description', 'is_authorized']

        await downloadGroupsService
          .mutateAsync({
            id: selectedRow?.user_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'groups.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Groups downloaded successfully.`,
            })
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
      }
    })
  }

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    handleSubmit,
    dataMeterInGroup,
    setDataMeterInGroup,
    getGroups,
    getSecurityGroupsService,
    downloadGroups,
    getOrgs,
  }
}

export default useGroups
