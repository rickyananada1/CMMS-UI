import { useState } from 'react'

const useSparePartsTab = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [action, setAction] = useState('view')
  return {
    tabIndex,
    setTabIndex,
    action,
    setAction,
  }
}

export default useSparePartsTab
