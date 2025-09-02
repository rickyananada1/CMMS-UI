import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

/* eslint-disable react/prop-types */
const CustomTab = ({ children, disabled, ...otherProps }) => (
  <Tab
    className={`w-full text-center cursor-pointer px-10 py-3 mx-2 rounded ${
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
export const TabsSubWrapper = ({ content, defaultIndex, selectedIndex, onSelect }) => {
  return (
    <Tabs
      defaultIndex={defaultIndex || 0}
			selectedIndex={selectedIndex || 0}
			onSelect={onSelect}
      selectedTabClassName="tab-active border-1 border-primary-border text-primary-main font-semibold"
    >
      <div className="flex bg-[#E9F1FB80] items-center rounded py-1 px-1 mb-3">
        <TabList className="w-full flex justify-center text-xs font-normal text-center p-0 m-0 text-neutral-text-disabled">
          {content.map((value, index) => (
            <CustomTab key={index} disabled={!!value?.disabled}>{value.title}</CustomTab>
          ))}
        </TabList>
      </div>

      <div>
        {content.map((value, index) => (
          <TabPanel key={index}>{value.element}</TabPanel>
        ))}
      </div>
    </Tabs>
  )
}

TabsSubWrapper.displayName = 'TabsSubWrapper'
