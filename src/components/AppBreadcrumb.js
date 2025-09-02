import React, { Fragment } from 'react'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useSelector } from 'react-redux'

const AppBreadcrumb = () => {
  const breadcrumbState = useSelector((state) => state.breadcrumb)
  const breadcrumbs = breadcrumbState.breadcrumb

  return (
    <Fragment>
      <h1 className="text-heading-medium ms-2 pb-0 pt-1">
        {breadcrumbs.length ? breadcrumbs[1].name : 'CMMS'}
      </h1>
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
