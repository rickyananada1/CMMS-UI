import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { locationSafetyActions } from '../../../slices/locationSafetySlices'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { downloadFileContentDisposition } from 'src/utils/helper'
import { useDownloadLocationSafetyHazardousMaterials } from '../services'
import { useDebounce } from 'src/hooks/useDebounce'

const useLocationSafetyHazardousMaterialsList = ({ isRefetchList, setIsRefetchList }) => {
  const Notification = withReactContent(Swal)

  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedSafetyMaterialRow = useSelector(
    (state) => state.locationSafety?.selectedSafetyMaterial,
  )

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const downloadLocationSafetyHazardousMaterialsService =
    useDownloadLocationSafetyHazardousMaterials({
      id: selectedRow?.location_id,
    })

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const setSelectedSafetyMaterialRow = (param) => {
    dispatch(locationSafetyActions.setSelectedSafetyMaterial(param))
  }

  const downloadLocationSafetyHazardousMaterials = async () => {
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
        const column_names = ['hazard']

        await downloadLocationSafetyHazardousMaterialsService
          .mutateAsync({
            id: selectedRow?.location_id,
            data: {
              column_names,
              site: selectedRow?.site_id,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'hazardous_materials.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Hazardous Materials downloaded successfully.`,
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

  useEffect(() => {
    if (isRefetchList) {
      tableRef.current?.update()
      setIsRefetchList(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchList])

  return {
    tableRef,
    selectedRow,
    selectedSafetyMaterialRow,
    setSelectedSafetyMaterialRow,
    downloadLocationSafetyHazardousMaterials,
    searchDebounce,
    handleSearch,
  }
}

export default useLocationSafetyHazardousMaterialsList
