import React, { useEffect, useState } from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import { CDropdown, CFormCheck, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { TbFilter, TbSearch } from 'react-icons/tb'
import { IoDocumentTextOutline, IoCloseSharp } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { actionMenuSelector } from 'src/store/selectors/actionMenuSelector'

const ActionSubMenuItem = ({
  group,
  index,
  title,
  modul_name,
  app_group,
  app_name,
  app_action,
  disabled,
  onClick = () => {},
}) => {
  const isValidPermissionsParams = modul_name && app_group && app_name && app_action

  const isHavePermission = useSelector(
    actionMenuSelector({ modul_name, app_group, app_name, app_action }),
  )

  const isDisabled = isValidPermissionsParams ? !isHavePermission : false

  return (
    <button
      id={`btn-action-${group}-${index}`}
      key={`${group}-${index}`}
      disabled={isDisabled || disabled}
      onClick={onClick}
      className={`flex items-center rounded px-3 py-2 cursor-pointer hover:border hover:border-blue-400 hover:text-blue-800 text-[#7f7f80] ${
        isDisabled || disabled ? 'text-neutral-disabled' : ''
      }`}
    >
      <IoDocumentTextOutline /> <span className="ml-2">{title}</span>
    </button>
  )
}

const TabsActionSubMenu = (submenu, group, callback) => {
  return (
    <>
      {submenu.map((element, index) => {
        return (
          <ActionSubMenuItem
            key={`sub-menu-item-${group}-${index}`}
            index={index}
            group={group}
            title={element?.title}
            onClick={() => {
              callback(element?.action)
            }}
            disabled={element?.disabled}
            app_group={element?.app_group}
            modul_name={element?.modul_name}
            app_name={element?.app_name}
            app_action={element?.app_action}
          />
        )
      })}
    </>
  )
}

/* eslint-disable react/prop-types */ //prettier-ignore
const TabsActionMenu = ({actionMenu, callback}) => {
	const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState([])
  
  const [actions, setActions] = useState(actionMenu || [])

  const handleSearch = (event) => {
    const value = event?.target?.value

    setSearch(value)
  }

  const handleChangeFilter = (event) => {
    const isChecked = event.target?.checked;
    const value = event.target?.value

    if(isChecked){
      setActiveFilter(prevActiveFilter => [...prevActiveFilter, value])
    } else {
      setActiveFilter(prevActiveFilter => prevActiveFilter.filter(item => item !== value))
    }
  }

  useEffect(() => {
    if(search || activeFilter.length){
      if(activeFilter.length){
        setActions(actionMenu.filter(action =>
          activeFilter.includes(action.group)
        ));
      } 

      if(search){
        setActions(prevActions => {
          return prevActions.map(action => {
            // Filter menu items based on the search query
            const filteredMenu = action.menu.filter(item =>
              item.title.toLowerCase().includes(search.toLowerCase())
            );
  
            // Check if the action's group matches the search query or if any menu item matches the search query
            const matchesSearch = (
              action.group.toLowerCase().includes(search.toLowerCase()) ||
              filteredMenu.length > 0
            );
  
            // Return the action if it matches the search query
            if (matchesSearch) {
              return { ...action, menu: filteredMenu };
            } else {
              return null;
            }
            }).filter(Boolean); // Remove null entries from the array
         });
      }
    } else {
      setActions(actionMenu)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, activeFilter, actionMenu])

  return (
    <CDropdown alignment={{
      sm: 'end',
      md: 'end',
      lg: 'end',
      xl: 'end',
      xs: 'end',
      xxl: 'end'
    }} variant='dropdown' className='position-relative' autoClose="outside" visible={visible} onShow={() => {
			setVisible(true)
		}}>
			<CDropdownToggle color="primary">
				<div className="flex items-center">
					<MdOutlineMenu className="mr-2 text-white" />
					<span className="text-sm text-white">Choose Action</span>
				</div>
			</CDropdownToggle>
			<CDropdownMenu className='!w-[650px] mt-0 dropdown-menu-action'>
				<div className="px-4 py-2">
					<div className="flex justify-between">
						<p className="text-heading-medium ">Choose Actions</p>
						<IoCloseSharp onClick={() => {
							setVisible(false)
						}} className="cursor-pointer" size={24} />
					</div>
					<div className="row py-2">
            <div className="col-12 col-md-2">
              <CDropdown alignment={"start"} autoClose="outside">
                <CDropdownToggle color='transparent' className='btn btn-transparent dropdown-toggle p-0'> 
                  <div className="flex items-center border rounded border-solid px-3 py-2 text-body-medium">
                    <TbFilter className="text-primary-main mr-2" />
                    Filter
                  </div>
                </CDropdownToggle>
                <CDropdownMenu className='p-3'>
                  {Array.isArray(actionMenu) && actionMenu.length ? actionMenu.map(item => {
                    const isChecked = activeFilter.includes(item?.group)
                    return (
                      <li className='flex flex-row' key={`filter-action-${item?.group}`}>
                        <CFormCheck type='checkbox' id={`filter-action-${item?.group}`} name='filter-action' value={item?.group} checked={isChecked} onChange={handleChangeFilter} />
                        <label htmlFor={`filter-action-${item?.group}`} className='pl-2 text-body-medium'>{item?.group}</label>
                      </li>
                    )
                  }) : null}
                </CDropdownMenu>
              </CDropdown>
            </div>
            <div className="col-12 col-md-10">
              <div className="flex items-center border rounded border-solid px-4 py-2 mx-2 w-full">
                <input
                  placeholder="Search"
                  className="border-none text-body-medium w-full"
                  type="text"
                  onChange={handleSearch}
                  value={search}
                />
                <TbSearch className='text-primary-main' />
              </div>
            </div>
					</div>
					<div className="action-menu-scroll">
						{Array.isArray(actions) && actions.length ? 
							actions.map((el, i) => (
								<div key={i}>
									<div className="flex items-center mt-2 justify-between">
										<p className="mt-2 text-body-small text-neutral-text-field text-nowrap font-normal">{el.group}</p>
										<hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
									</div>
									<div className="text-body-medium grid grid-cols-2 gap-0 mb-2">
										{TabsActionSubMenu(el.menu, el.group, (val) => {
											setVisible(false)
											callback(val)
										})}
									</div>
								</div>
							)) : (
                <p className="mt-4 text-body-small text-neutral-text-field text-nowrap font-normal text-center">No Action Found</p>
              )
						}
					</div>
				</div>
			</CDropdownMenu>
		</CDropdown>
  )
}

export default TabsActionMenu
