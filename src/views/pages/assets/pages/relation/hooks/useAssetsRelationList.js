import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assetActions } from '../../../slices/assetSlices'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDeleteRelation, useDownloadRelation } from '../services'

const useAssetsRelationList = () => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedRowRelation = useSelector((state) => state.assets?.selectedRelation)

  const downloadRelationService = useDownloadRelation({
    id: selectedRow?.asset_id,
  })

  const deleteRelation = useDeleteRelation({
    id: selectedRowRelation?.asset_relation_id,
  })

  const setSelectedRow = (param) => {
    dispatch(assetActions.setSelectedRelation(param))
  }

  const downloadRelation = async () => {
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
          'related_asset_num',
          'related_asset_description',
          'location',
          'location_description',
          'relation_name',
          'relation_type',
        ]

        await downloadRelationService
          .mutateAsync({
            id: selectedRow?.asset_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'assets_relation.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Assets Relation downloaded successfully.`,
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
    tableRef,
    selectedRow,
    setSelectedRow,
    selectedRowRelation,
    downloadRelation,
    deleteRelation,
  }
}

export default useAssetsRelationList
