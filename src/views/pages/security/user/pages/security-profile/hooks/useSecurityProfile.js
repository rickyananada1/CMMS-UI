import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetGroups, useGetSecurityProfile } from '../services'

const useSecurityProfile = () => {
  const selectedRow = useSelector((state) => state.securityUser?.selectedGroup)

  const [errorMessage, setErrorMessage] = useState('')
  const [securityGroupsData, setSecurityGroupsData] = useState({})
  const [applicationPerms, setApplicationPerms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPermissionsLoading, setIsPermissionsLoading] = useState(true)

  const tableRef = useRef()

  const navigate = useNavigate()
  const location = useLocation()

  const dataSecurityHeader = [
    {
      no: 1,
      name: 'Create',
    },
    {
      no: 2,
      name: 'Read',
    },
    {
      no: 3,
      name: 'Update',
    },
    {
      no: 4,
      name: 'Delete',
    },
  ]

  useEffect(() => {
    getGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const getGroupsService = useGetGroups()

  const getGroups = async (params) => {
    setIsLoading(true)
    await getGroupsService
      .mutateAsync({
        user_id: selectedRow?.user_id,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setSecurityGroupsData(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        navigate('../users')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getSecurityProfile = useGetSecurityProfile()

  const setPermissions = async (params) => {
    setIsPermissionsLoading(true)
    var appPermissions = []
    for (const group of securityGroupsData) {
      await getSecurityProfile
        .mutateAsync({
          user_id: selectedRow?.user_id,
          group_id: group.security_group_id,
          params: params,
        })
        .then((res) => {
          if (res.status === 200) {
            const currentAppPermission = res?.data?.data?.flatMap(({ sub_menu }) =>
              sub_menu.map(({ application_id, application_name, permission }) => ({
                application_id,
                application: application_name,
                permissions: permission.map(
                  ({ permission_name, app_action, is_active = false }) => ({
                    permission_name,
                    application_id,
                    application_name,
                    application_desc: '',
                    application_action: app_action,
                    is_active: getIsActive(application_name, permission_name, is_active),
                  }),
                ),
              })),
            )
            appPermissions.push(sortPermissions(currentAppPermission))
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    setApplicationPerms(appPermissions)
    setIsPermissionsLoading(false)
  }

  const sortPermissions = (data) => {
    const order = ['Create', 'Read', 'Update', 'Delete']

    data.forEach((item) => {
      if (item.permissions) {
        item.permissions.sort((a, b) => {
          const actionA = a.application_action.trim()
          const actionB = b.application_action.trim()
          return order.indexOf(actionA) - order.indexOf(actionB)
        })
      }
    })

    return data
  }

  const getIsActive = (application_name, permission_name, is_active) => {
    var newActive = is_active
    switch (selectedRow?.type) {
      case 4:
        switch (permission_name) {
          case 'Organization Read':
          case 'Organization Update':
            newActive = true
            break
          default:
            newActive = false
            break
        }
        break
      case 5:
        break
      default:
        if (application_name === 'Organization') {
          newActive = false
        }
        break
    }
    return newActive
  }

  useEffect(() => {
    securityGroupsData.length > 0 && setPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [securityGroupsData])

  return {
    isLoading,
    errorMessage,
    selectedRow,
    isPermissionsLoading,
    securityGroupsData,
    tableRef,
    dataSecurityHeader,
    applicationPerms,
  }
}

export default useSecurityProfile
