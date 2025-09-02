import React, { Fragment, useEffect, useState } from 'react'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { CiLock, CiLogout } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import useLogin from 'src/views/pages/login/hooks/useLogin'
import { useSelector } from 'react-redux'
import { HiMiniArrowsRightLeft } from 'react-icons/hi2'
import ModalChangeSite from './ModalChangeSite'
import ModalChangePassword from './ModalChangePassword'

const AppHeaderDropdown = () => {
  const userState = useSelector((state) => state.auth?.user ?? null)
  const [visible, setVisible] = useState(false)
  const [changePasswordVisible, setChangePasswordVisible] = useState(false)
  useEffect(() => {
    const siteId = userState?.site_id
    const userType = userState?.type
    if (userState && (siteId === 0 || siteId === null) && userType < 4) {
      setVisible(true)
    }
  }, [userState])
  const { handleLogout } = useLogin()
  return (
    <Fragment>
      <CDropdown
        variant="nav-item"
        className="flex justify-center align-middle items-center w-[48px] h-[48px] rounded"
      >
        <CDropdownToggle>
          <FiUser size={20} />
        </CDropdownToggle>
        <CDropdownMenu placement="top-end" style={{ zIndex: 1035 }}>
          <div className="px-4 py-2">
            <Fragment>
              <div className="mb-2 d-flex align-items-center">
                <div className="circle-icon-dropdown">
                  <FiUser size={14} />
                </div>
                <div className="mx-2 text-neutral-primary-text text-body-bold">
                  Hai, {userState?.display_name || userState?.username}!
                </div>
              </div>
              <div className="flex items-center text-primary-main">
                {![4, 5].includes(userState?.type) && (
                  <Fragment>
                    <p className="m-0">
                      {`${userState?.site} - ${userState?.site_description}` || '-'}
                    </p>{' '}
                    <HiMiniArrowsRightLeft
                      className="ml-2 cursor-pointer"
                      onClick={() => setVisible(true)}
                    />
                  </Fragment>
                )}
              </div>
              <div className="font-light text-neutral-text-field text-body-medium">
                {userState?.email}
              </div>
              {/* <div className="font-light text-neutral-text-field text-body-medium">admin</div> */}
            </Fragment>
          </div>
          <CDropdownDivider />
          <CDropdownItem className="flex">
            <div className="text-black no-underline" onClick={() => setChangePasswordVisible(true)}>
              <div className="flex items-center text-body-bold">
                <CiLock size={14} />
                <span className="mx-2 font-light text-neutral-text-field text-body-bold">
                  Change Password
                </span>
              </div>
            </div>
          </CDropdownItem>
          <CDropdownItem className="flex cursor-pointer" onClick={handleLogout}>
            <div className="flex items-center">
              <CiLogout size={14} className="text-red-main" />
              <span className="mx-2 font-light text-red-main text-body-bold">Logout</span>
            </div>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <ModalChangeSite visible={visible} setVisible={setVisible} handleLogout={handleLogout} />
      <ModalChangePassword
        visible={changePasswordVisible}
        setVisible={setChangePasswordVisible}
        handleLogout={handleLogout}
      />
    </Fragment>
  )
}

export default AppHeaderDropdown
