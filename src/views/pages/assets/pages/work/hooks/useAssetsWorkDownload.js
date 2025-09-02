import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDownloadAssetsWork } from '../services'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useAssetsWorkDownload = ({ setVisibleDownload }) => {
  const Notification = withReactContent(Swal)
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)

  const [formValue, setFormValue] = useState({
    start_date: null,
    end_date: null,
    all_data: false,
  })

  const downloadAssetsWork = useDownloadAssetsWork({
    id: selectedRow?.asset_id,
  })

  const handleDownload = async (values, formikHelpers) => {
    await downloadAssetsWork
      .mutateAsync({
        id: selectedRow?.asset_id,
        params: {
          start_date: values.start_date,
          end_date: values.end_date,
          all_data: values.all_data,
        },
      })
      .then((res) => {
        Notification.fire({
          icon: 'success',
          title: 'Success',
          text: 'Download data successfully.',
          customClass: {
            confirmButton: 'btn btn-primary hover:text-white',
          },
          buttonsStyling: false,
        })
        setFormValue({
          start_date: null,
          end_date: null,
          all_data: false,
        })
        setVisibleDownload(false)
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
      .finally(() => {
        formikHelpers.setSubmitting(false)
      })
  }

  return {
    selectedRow,
    formValue,
    handleDownload,
  }
}

export default useAssetsWorkDownload
