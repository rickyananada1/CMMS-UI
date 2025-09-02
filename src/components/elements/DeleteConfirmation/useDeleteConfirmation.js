import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useDeleteConfirmation = ({
  setAction,
  setTabIndex,
  setSelectedRow,
  data_id,
  data_name,
  data_parent_id = null,
  deleteService,
  viewMode = 'Read',
  tableRef = null,
  deleteBody = null,
}) => {
  const Notification = withReactContent(Swal)

  const deleteDataService = deleteService({})

  const [isDeleting, setIsDeleting] = useState(false)

  if (!isDeleting) {
    setIsDeleting(true)
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${data_name}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDataService
          .mutateAsync({
            id: data_id,
            parent_id: data_parent_id,
            data: deleteBody,
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `${data_name} deleted successfully`,
            }).then(() => {
              setIsDeleting(false)
              setSelectedRow(null)
              setTabIndex && setTabIndex(0)
              tableRef && tableRef?.current?.update()
              setAction(viewMode)
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Error!',
              text: err.response.data.message,
            }).then(() => {
              setAction(viewMode)
              setIsDeleting(false)
            })
          })
      } else {
        setAction(viewMode)
        setIsDeleting(false)
      }
    })
  }
}

export default useDeleteConfirmation
