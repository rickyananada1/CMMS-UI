/* eslint-disable */
/* prettier-ignore-start */
import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem, CButton } from '@coreui/react'
import { breadcrumbActions } from 'src/store/slices/breadcrumbSlices'
import { TbArrowBackUp } from 'react-icons/tb'


const AppBreadcrumb = () => {
  const dispatch = useDispatch()
  const breadcrumbState = useSelector((state) => state.breadcrumb)
  const breadcrumbs = breadcrumbState.breadcrumb
  const navigate = useNavigate()
  const showBackButton =
    breadcrumbs.length === 3 && breadcrumbs[1].name === 'Work Order'

  const handleBack = () => {
    navigate('/page/work-order/service-request')

    dispatch(
      breadcrumbActions.setBreadcrumb([
        { name: 'Dashboard', path: '/' },
        { name: 'Service Request', path: '/page/work-order/service-request' },
        { name: 'Detail', path: '/page/work-order/service-request' }
      ])
    )
  }

  return (
   <Fragment>
      <div className="d-flex align-items-center flex items-center">
        {showBackButton && (
          <div>
            <TbArrowBackUp onClick={handleBack} className="text-gray-400 h-6 w-6" />
          </div>
        )}
        <h1 className="text-heading-medium ms-2 pb-0 pt-1">
          {breadcrumbs.length ? breadcrumbs[1].name : 'CMMS'}
        </h1>
      </div>
      <CBreadcrumb className="m-0 ms-2 pb-1">
        {breadcrumbs.length > 0 ? (
          breadcrumbs.map((item, index) => (
            <CBreadcrumbItem key={index}>
              {index === breadcrumbs.length - 1 ? item.name : <Fragment>{item.name}</Fragment>}
            </CBreadcrumbItem>
          ))
        ) : (
          <CBreadcrumbItem>Dashboard</CBreadcrumbItem>
        )}
      </CBreadcrumb>
    </Fragment>
  )
}

export default React.memo(AppBreadcrumb)
