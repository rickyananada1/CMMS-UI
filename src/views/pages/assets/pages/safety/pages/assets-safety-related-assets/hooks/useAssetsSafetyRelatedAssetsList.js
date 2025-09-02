import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { assetsSafetyActions } from '../../../slices/assetsSafetySlices'

const useAssetsSafetyRelatedAssetsList = ({ isRefetchList, setIsRefetchList }) => {
  const dispatch = useDispatch()
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedSafetyRow = useSelector((state) => state.assetsSafety?.selectedSafety)

  const setSelectedSafetyRow = (param) => {
    dispatch(assetsSafetyActions.setSelectedSafety(param))
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

export default useAssetsSafetyRelatedAssetsList
