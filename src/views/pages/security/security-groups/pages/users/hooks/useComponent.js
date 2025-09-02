import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useUpdateUser } from '../services'
import { useSelector } from 'react-redux'

const useComponent = (setIsEdit) => {
  const Notification = withReactContent(Swal)
  const userOrgId = useSelector((state) => state.auth?.user?.organization_id)
  const updateUserService = useUpdateUser()

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
          user_id: values?.user_id,
          display_name: values?.display_name,
          type: values?.type?.value,
          organization_id: userOrgId,
          is_active: values?.is_active ?? false,
        }

        await updateUserService
          .mutateAsync({
            id: values?.user_id,
            data: modifiedFormData,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `User edited successfully.`,
            }).then(() => {
              setIsEdit(false)
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Error!',
              text: err.response.data.message,
            })
          })
          .finally(() => {
            formikHelpers.setSubmitting(false)
          })
      }
    })
  }

  return {
    handleSubmit,
  }
}

export default useComponent
