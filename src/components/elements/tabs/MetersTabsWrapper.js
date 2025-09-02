import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { VscTriangleDown } from 'react-icons/vsc'
import TabsActionMenu from './TabsActionMenu'
import clsx from 'clsx'

/* eslint-disable react/prop-types */
const CustomTab = ({
  index,
  children,
  dropdownList,
  setTabIndex,
  selectedDropdown,
  setSelectedDropdown,
  selectedParent,
  setSelectedParent,
  ...otherProps
}) => (
  <div className="group flex flex-col relative" onMouseEnter={() => setSelectedDropdown(0)}>
    <Tab
      className={`bg-white cursor-pointer flex px-3 mt-4 pb-2 border-b-4 border-transparent hover:text-blue-600 hover:border-blue-600 focus:border-blue-600  ${
        (index === 0 && selectedParent === 'Meter') ||
        (index === 2 && selectedParent === 'MeterGroup')
          ? 'tab-active border-b-4 text-primary-main border-primary-main'
          : ''
      }`}
      {...otherProps}
    >
      {children}
    </Tab>
    <div className="w-80 hidden shadow-lg absolute top-[3.8rem] py-3 bg-neutral-white border rounded group-hover:flex flex-row text-left z-10">
      <div className="flex flex-col max-w-36">
        {dropdownList?.map((list, idx) => {
          return (
            <div
              onMouseEnter={() => setSelectedDropdown(idx)}
              key={`parent-${list?.name}`}
              className={`px-3 py-2 ${
                selectedDropdown === idx ? 'bg-info-main text-neutral-white' : ''
              }`}
            >
              {list?.name}
            </div>
          )
        })}
      </div>
      <div className="w-0.5 bg-neutral-disabled" />
      <div className="flex flex-col flex-grow">
        {dropdownList[selectedDropdown]?.children?.map((child) => {
          return (
            <div
              key={`child-${child?.name}`}
              // className="px-3 py-2 hover:bg-info-main hover:text-neutral-white"
              className={clsx(
                'px-3 py-2',
                child?.disabled
                  ? 'text-neutral-disabled'
                  : 'hover:bg-info-main hover:text-neutral-white',
              )}
              onClick={() => {
                if (child.disabled) {
                  return
                }
                setTabIndex(child?.tab)
                setSelectedParent(index === 0 ? 'Meter' : 'MeterGroup')
              }}
            >
              {child?.name}
            </div>
          )
        })}
      </div>
    </div>
  </div>
)

CustomTab.tabsRole = 'Tab'

/* eslint-disable react/prop-types */ //prettier-ignore
export const MetersTabsWrapper = ({ content, defaultIndex, selectedIndex, chooseActionMenu, actionMenuCallback, setTabIndex, selectedParent, setSelectedParent }) => {
  const [selectedDropdown, setSelectedDropdown] = useState(0)

  return (
    <Tabs
      defaultIndex={defaultIndex || 0}
			selectedIndex={selectedIndex || 0}
    >
      <div className="flex bg-white items-center px-4 pb-0 rounded mb-2">
        <TabList className="w-full flex flex-wrap text-body-bold text-center text-neutral-text-disabled">
          {content?.map((value, index) => (
            !value.isChild && 
            <CustomTab 
              key={index} 
              dropdownList={value.dropdownList} 
              index={index}
              setTabIndex={setTabIndex}
              selectedDropdown={selectedDropdown} 
              setSelectedDropdown={setSelectedDropdown} 
              selectedParent={selectedParent}
              setSelectedParent={setSelectedParent}
            >
              {value.title} <VscTriangleDown size='1.5em' className='ml-2' /> 
            </CustomTab>
          ))}
        </TabList>
        <TabsActionMenu actionMenu={chooseActionMenu} callback={(action) => {
					actionMenuCallback(action)
				}} />
      </div>

      <div>
        {content?.map((value, index) => (
          <TabPanel key={index}>{value.element}</TabPanel>
        ))}
      </div>
    </Tabs>
  )
}

MetersTabsWrapper.displayName = 'MetersTabsWrapper'
