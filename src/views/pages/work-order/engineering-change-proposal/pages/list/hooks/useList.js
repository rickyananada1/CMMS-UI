/* eslint-disable */
/* prettier-ignore-start */
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ticketEcpActions } from '../../../slices/ticketEcpSlice'
import { useDebounce } from 'src/hooks/useDebounce'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadTicketEcp } from '../services'

const useList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.ticketEcp?.selectedTicketEcp)

  const downloadTicketEcpService = useDownloadTicketEcp({})

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedRow = (param) => {
    dispatch(ticketEcpActions.setSelectedTicketEcp(param))
    dispatch(ticketEcpActions.setSelectedAppIndex(1))
  }

  const resetSelectedTaskEtc = () => {
    // dispatch(ticketEcpActions.resetState(0))
    // dispatch(planTaskActions.resetState())
    // dispatch(actualsTaskActions.resetState())
    // dispatch(plansChildrenActions.resetState())
    // dispatch(actualsChildrenActions.resetState())
    // dispatch(woLaborActions.resetState())
    // dispatch(woMaterialsActions.resetState())
    // dispatch(woToolsActions.resetState())
  }

  const downloadTicketEcp = async () => {
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
          'display_name',
          'status',
          'site',
        ]

        await downloadTicketEcpService
          .mutateAsync({
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'Engineering Change Proposal.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Engineering Change Proposal downloaded successfully.`,
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
    downloadTicketEcp,
    resetSelectedTaskEtc,
  }
}

export default useList
