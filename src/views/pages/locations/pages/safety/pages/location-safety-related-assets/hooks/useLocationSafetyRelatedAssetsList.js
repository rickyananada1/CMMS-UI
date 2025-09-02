import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { locationSafetyActions } from '../../../slices/locationSafetySlices'

const useLocationSafetyRelatedAssetsList = ({ isRefetchList, setIsRefetchList }) => {
  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.locations?.selectedLocation)
  const selectedSafetyRow = useSelector((state) => state.locationSafety?.selectedSafety)

  const setSelectedSafetyRow = (param) => {
    dispatch(locationSafetyActions.setSelectedSafety(param))
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
    selectedSafetyRow,
    setSelectedSafetyRow,
  }
}

export default useLocationSafetyRelatedAssetsList
