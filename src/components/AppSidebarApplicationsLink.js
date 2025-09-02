import React from 'react'
import { NavLink } from 'react-router-dom'

const AppSidebarModuleLink = ({ to, name, onClick, isDisabled }) => {
  return (
    <NavLink
      end
      to={to}
      onClick={onClick}
      className={`mt-2 text-body-medium ${
        isDisabled
          ? `text-neutral-disabled hover:text-neutral-disabled`
          : `text-neutral-primary-text hover:text-primary-main`
      } no-underline`}
    >
      {({ isActive }) => {
        return <p className={isActive ? 'font-bold text-primary-main' : ''}>{name}</p>
      }}
    </NavLink>
  )
}

export default AppSidebarModuleLink
