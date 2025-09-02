import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  // useGetSecurityGroupsApplications,
  useGetSecurityGroupsApplicationsPermissions,
  // useCreateSecurityGroupsApplications,
  useUpdateSecurityGroupsApplications,
} from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useGetPermissions } from 'src/views/pages/login/services'
import { authActions } from 'src/store/actions'
import { useDebounce } from 'src/hooks/useDebounce'

const useApplicationsForm = ({ mode, setAction, setTabIndex }) => {
  const tableRef = useRef()
  const dispatch = useDispatch()
  const Notification = withReactContent(Swal)

  const selectedRow = useSelector((state) => state.securityGroup?.selectedGroup)
  const selectedGroupApplication = useSelector(
    (state) => state.securityGroupApplications?.selectedGroupApplication,
  )
  const currentUser = useSelector((state) => state.auth?.user)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAnyChange, setIsAnyChange] = useState(false)

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const [formValue, setFormValue] = useState([])

  const getPermissionsService = useGetPermissions()

  const getSecurityGroupsApplicationsPermissionsService =
    useGetSecurityGroupsApplicationsPermissions({
      id: selectedRow?.security_group_id,
      params: {
        limit: 100,
      },
    })

  const getSecurityGroupsApplicationsPermissions = async () => {
    setIsLoading(true)
    await getSecurityGroupsApplicationsPermissionsService
      .mutateAsync({})
      .then((res) => {
        if (res.status === 200) {
          const data = res?.data?.data
          const dataFiltered = data?.map((item) => ({
            ...item,
            disabled: item.application_name === 'Organization' && currentUser?.type <= 3,
          }))
          setFormValue((prevData) => [...dataFiltered])
        }
      })
      .catch((err) => {
        setErrorMessage(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleGetPermissions = async () => {
    await getPermissionsService.mutateAsync({}).then((res) => {
      const permissions = res.data?.data || []
      dispatch(authActions.setPermissions(permissions))
    })
  }

  useEffect(() => {
    getSecurityGroupsApplicationsPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow?.security_group_id, mode])

  const updateSecurityGroupsApplications = useUpdateSecurityGroupsApplications({
    id: selectedRow?.security_group_id,
  })

  const handleCheckboxChange = ({ applicationName, action, isChecked }) => {
    let updatedPermission = [...formValue]
    updatedPermission.find((perm) => perm?.application_name === applicationName)[action] = isChecked
    setFormValue(() => [...updatedPermission])
    setIsAnyChange(true)
  }

  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'warning',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedValues = values.map(({ disabled, ...rest }) => rest)
        await updateSecurityGroupsApplications
          .mutateAsync({
            id: selectedRow?.security_group_id,
            data: { application: [...updatedValues] },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Security Groups Applications updated successfully.`,
            }).then(() => {
              setTabIndex(3)
              setAction('Read')
              handleGetPermissions()
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err?.response?.data?.message,
              customClass: {
                confirmButton: 'btn btn-danger hover:text-white',
              },
              buttonsStyling: false,
            })
            setErrorMessage(err.response.data.message)
          })
          .finally(() => {
            formikHelpers.setSubmitting(false)
          })
      }
    })
  }

  return {
    tableRef,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    selectedGroupApplication,
    isAnyChange,
    setIsAnyChange,
    handleSubmit,
    handleCheckboxChange,
    setSearch,
    handleSearch,
    searchDebounce,
  }
}

export default useApplicationsForm
