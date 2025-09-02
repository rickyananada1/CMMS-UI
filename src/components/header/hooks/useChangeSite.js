import { useDispatch, useSelector } from 'react-redux'
import { tableActions } from 'src/components/elements/table/tableSlices'
import { authActions } from 'src/store/actions'
import { useGetSites } from 'src/views/pages/security/user/pages/user/services'
import { useUpdateUser } from 'src/views/pages/security/user/pages/user/services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useChangeSite = ({ visible, setVisible, handleLogout }) => {
  const dispatch = useDispatch()
  const Notification = withReactContent(Swal)
  const user = useSelector((state) => state.auth?.user)

  const getSitesService = useGetSites({
    org_id: 'all',
  })

  const handleTableRefresh = () => {
    dispatch(tableActions.triggerRefresh())
  }

  const formValue = user
    ? {
        site_id: {
          value: user.site_id,
          label: user.label,
          site_description: user.site_description,
          site: user.site,
        },
      }
    : null

  const updateUser = useUpdateUser()
  const handleChangeSite = async (values, formikHelpers) => {
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
          user_id: user.user_id,
          organization_id: user.organization_id,
          display_name: user.display_name,
          phone_number: `${user.phone_number}`,
          email: user.email,
          site_id: values?.site_id.value,
          type: user.type,
          is_active: user.is_active,
        }

        await updateUser
          .mutateAsync({
            id: user.user_id,
            data: newValues,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Updated successfully.`,
            }).then(() => {
              setVisible(false)
              dispatch(
                authActions.setNecessaryUserData({
                  site_id: values.site_id.value,
                  site: values.site_id.site,
                  site_description: values.site_id.site_description,
                }),
              )
              handleTableRefresh()
              // window.location.reload()
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Error!',
              text: err?.response?.data?.message || 'Failed to change site! Reason: Unknown',
            })
          })
          .finally(() => {
            formikHelpers.setSubmitting(false)
          })
      }
    })
  }

  const handleClose = () => {
    setVisible(false)
    if (!user?.site_id && user?.type < 4) {
      Notification.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please choose your site first or contact the admin if no sites are available to select.',
        confirmButtonText: 'Log Out',
        confirmButtonColor: '#FF5656',
        showCloseButton: true,
        willClose: () => setVisible(true),
      }).then(async (result) => {
        if (result.isConfirmed) {
          setVisible(false)
          handleLogout()
        }
      })
    }
  }

  return {
    visible,
    setVisible,
    handleChangeSite,
    getSitesService,
    formValue,
    handleClose,
  }
}

export default useChangeSite
