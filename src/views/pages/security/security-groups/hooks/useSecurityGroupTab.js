import { useState } from 'react'

const useSecurityGroupTab = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [action, setAction] = useState('view')
  return {
    tabIndex,
    setTabIndex,
    action,
    setAction,
  }
}

export default useSecurityGroupTab
