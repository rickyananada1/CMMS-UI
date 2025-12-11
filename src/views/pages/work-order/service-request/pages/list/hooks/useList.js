/* eslint-disable */
/* prettier-ignore-start */
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serviceRequestActions } from '../../../slices/serviceRequestSlice'
import { useDebounce } from 'src/hooks/useDebounce'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadServiceReq } from '../services'
import { getWoServiceRequest } from '../../service-request/services/getServiceReq'

const useList = () => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const tableRef = useRef()

  const selectedRow = useSelector((state) => state.serviceRequest?.selectedServiceRequest)
  const downloadServiceReqService = useDownloadServiceReq({})
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };
  const setSelectedRow = (param) => {
    dispatch(serviceRequestActions.setSelectedServiceReq(param))
    dispatch(serviceRequestActions.setSelectedAppIndex(1))
  }

  const resetSelectedTaskEtc = () => {
    dispatch(serviceRequestActions.resetTabs())
    // dispatch(serviceRequestActions.resetState())
  }

  const downloadServiceReq = async () => {
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
        const column_names = [
          'ticketid',
          'description',
          'status',
          'display_name',
          'assetnum',
          'asset_description',
          'location',
          'location_description',
        ]

        await downloadServiceReqService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'service_request.csv',
            })
            console.log(res, 'resss');
            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Service Request downloaded successfully.`,
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
    setSearch,
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadServiceReq,
    resetSelectedTaskEtc,
  }
}

export default useList
