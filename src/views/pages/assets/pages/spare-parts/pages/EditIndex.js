import React from 'react'
import { TabsSubWrapper } from 'src/components/elements/tabs/TabsSubWrapper'
import useSparePartsTab from '../hooks/useSparePartsTab'
import EditSpareParts from './spare-parts/EditSpareParts'
import UpdateSubassemblies from './subassemblies/UpdateSubassemblies'

const EditIndex = ({ mode, setAction }) => {
  const { tabIndex, setTabIndex } = useSparePartsTab()

  const tabsContent = [
    {
      title: 'Subassemblies',
      element: <UpdateSubassemblies setAction={setAction} mode={mode} />,
    },
    {
      title: 'Spare Parts',
      element: <EditSpareParts setAction={setAction} />,
    },
  ]

  return (
    <TabsSubWrapper
      defaultIndex={tabIndex}
      selectedIndex={tabIndex}
      content={tabsContent}
      onSelect={(tabIndex) => {
        setTabIndex(tabIndex)
      }}
    />
  )
}

export default EditIndex
