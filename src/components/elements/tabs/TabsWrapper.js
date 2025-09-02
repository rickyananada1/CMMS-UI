import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import TabsActionMenu from './TabsActionMenu'

/* eslint-disable react/prop-types */
const CustomTab = ({ children, disabled, ...otherProps }) => (
  <Tab
    className={`bg-white flex px-3 mt-4 pb-2 border-b-4 border-transparent hover:text-blue-600 hover:border-blue-600 focus:border-blue-600 ${
      disabled ? 'text-neutral-disabled' : 'cursor-pointer'
    }`}
    disabled={disabled}
    {...otherProps}
  >
    {children}
  </Tab>
)

CustomTab.tabsRole = 'Tab'

/* eslint-disable react/prop-types */ //prettier-ignore
export const TabsWrapper = ({ content, defaultIndex, selectedIndex, onSelect, chooseActionMenu, actionMenuCallback }) => {
  return (
    <Tabs
      defaultIndex={defaultIndex || 0}
			selectedIndex={selectedIndex || 0}
			onSelect={onSelect}
      selectedTabClassName="tab-active border-b-4 text-primary-main border-primary-main"
    >
      <div className="flex bg-white items-center px-4 pb-0 rounded mb-2 sticky top-[100px] z-50" style={{ boxShadow: '10px 10px 59px -26px rgba(0, 0, 0, 1)' }}>
        <TabList className="w-full flex flex-wrap text-body-bold text-center text-neutral-text-disabled">
          {content.map((value, index) => (
            <CustomTab key={index} disabled={!!value?.disabled}>{value.title}</CustomTab>
          ))}
        </TabList>
        <TabsActionMenu actionMenu={chooseActionMenu} callback={(action) => {
					actionMenuCallback(action)
				}} />
      </div>

      <div>
        {content.map((value, index) => (
          <TabPanel key={index}>{value.element}</TabPanel>
        ))}
      </div>
    </Tabs>
  )
}

TabsWrapper.displayName = 'TabsWrapper'
