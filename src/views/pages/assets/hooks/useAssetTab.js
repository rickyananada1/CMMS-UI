import { useState } from 'react'

const useAssetTab = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [action, setAction] = useState('view')
  const [selectedAsset, setSelectedAsset] = useState(null)
  return {
    tabIndex,
    setTabIndex,
    action,
    setAction,
    selectedAsset,
    setSelectedAsset,
  }
}

export default useAssetTab
