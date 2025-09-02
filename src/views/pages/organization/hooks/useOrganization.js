import { useState } from 'react'

const useOrganization = () => {
  const [selectedRow, setSelectedRow] = useState(null)

  return {
    selectedRow,
    setSelectedRow,
  }
}

export default useOrganization
