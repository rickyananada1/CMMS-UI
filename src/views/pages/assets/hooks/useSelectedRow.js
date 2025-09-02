import React, { useContext, useState } from 'react'

const SelectedRowContext = React.createContext(1)

// eslint-disable-next-line react/prop-types
export const SelectedRowProvider = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState(null) // Selected Row ID

  return (
    <SelectedRowContext.Provider value={{ selectedRow, setSelectedRow }}>
      {children}
    </SelectedRowContext.Provider>
  )
}

export const useSelectedRow = () => {
  const { selectedRow, setSelectedRow } = useContext(SelectedRowContext)
  return { selectedRow, setSelectedRow }
}
