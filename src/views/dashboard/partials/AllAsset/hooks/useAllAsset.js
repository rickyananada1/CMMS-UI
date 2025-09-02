import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { appActions, breadcrumbActions } from 'src/store/actions'

import { assetActions } from 'src/views/pages/assets/slices/assetSlices'

const useAllAsset = () => {
  const dispatch = useDispatch()
  const tableRef = useRef(null)
  const permissionsState = useSelector((state) => state?.auth?.permissions)
  const user = useSelector((state) => state.auth?.user)

  const assetPermission = permissionsState.find((item) => item.modul_name === 'Assets')
  const assetApplication = assetPermission?.applications?.find(
    (item) => item.application_group === 'Assets',
  )
  const assetReadPermission = assetApplication?.permission?.find(
    (item) => item.permission_name === 'Assets Read',
  )

  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)

  const handleNavigateToAsset = (e, selectedData) => {
    e.stopPropagation()
    dispatch(appActions.setSidebarApplications(false))
    dispatch(appActions.setApplications(assetPermission?.applications))
    dispatch(appActions.setSelectedApplications(assetPermission))

    dispatch(
      breadcrumbActions.setBreadcrumb([
        {
          name: assetApplication?.application_group,
        },
        {
          name: assetReadPermission?.app_name,
          link: assetReadPermission?.app_menu_link,
        },
      ]),
    )

    dispatch(assetActions.setSelectedAsset(selectedData))
    dispatch(
      assetActions.setSelectedAppIndexAndAction({
        index: 1,
        action: 'Read',
      }),
    )
  }

  return {
    tableRef,
    setSearch,
    searchDebounce,
    handleNavigateToAsset,
    user,
  }
}

export default useAllAsset
