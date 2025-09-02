import React from 'react'
import { TabsSubWrapper } from 'src/components/elements/tabs/TabsSubWrapper'
import useSparePartsTab from '../hooks/useSparePartsTab'
import CreateSpareParts from './spare-parts/CreateSpareParts'
import CreateSubassemblies from './subassemblies/CreateSubassemblies'

const CreateIndex = ({ setAction }) => {
  const { tabIndex, setTabIndex } = useSparePartsTab()

  const tabsContent = [
    {
      title: 'Subassemblies',
      element: <CreateSubassemblies setAction={setAction} />,
    },
    {
      title: 'Spare Parts',
      element: <CreateSpareParts setAction={setAction} />,
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

export default CreateIndex
