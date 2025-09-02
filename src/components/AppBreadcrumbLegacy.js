import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find(
      (route) => route?.path?.toLowerCase() === pathname?.toLowerCase(),
    )
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      // const currentPathname = `${prev}/${curr}`
      const currentPathname = `${curr}`
      const routeName = getRouteName(currentPathname, routes)
      if (currentPathname === 'page' || currentPathname === 'dashboard') {
        return `${prev}/${curr}`
      }
      routeName
        ? breadcrumbs.push({
            pathname: currentPathname,
            name: routeName,
            active: index + 1 === array.length ? true : false,
          })
        : breadcrumbs.push({
            pathname: currentPathname,
            name: currentPathname.charAt(0).toUpperCase() + currentPathname.slice(1),
            active: index + 1 === array.length ? true : false,
          })
      return `${prev}/${curr}`
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  const title = currentLocation.split('/').pop()
  const result = getRouteName(currentLocation.split('/').pop(), routes)

  return (
    <Fragment>
      <h1 className="text-heading-medium ms-2 pb-0 pt-1">{result ? result : 'Dashboard'}</h1>
      <CBreadcrumb className="m-0 ms-2 pb-1">
        {title === 'dashboard' && <CBreadcrumbItem>Dashboard</CBreadcrumbItem>}
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem {...(breadcrumb.active && { active: true })} key={index}>
              <Link
                {...(!breadcrumb.active
                  ? { to: `../${breadcrumb.pathname}` }
                  : { className: 'pointer-events-none no-underline text-black' })}
                replace
              >
                {breadcrumb.name}
              </Link>
            </CBreadcrumbItem>
          )
        })}
      </CBreadcrumb>
    </Fragment>
  )
}

export default React.memo(AppBreadcrumb)
