import React, { Fragment } from 'react'
import * as TablerIcon from 'react-icons/tb'

const AppSidebarModuleLink = ({ modul_icon, onClick }) => {
  const IconComponent = TablerIcon[modul_icon]
  return (
    <Fragment>
      {IconComponent && <IconComponent onClick={onClick} size={20} strokeWidth="2" />}
    </Fragment>
  )
}

export default AppSidebarModuleLink
