import { useMutation } from '@tanstack/react-query'
import { getAssets } from 'src/views/pages/assets/pages/list/services'
import { getJobPlanList } from 'src/views/pages/job-plan/page/list/services'
import { getListLocations } from 'src/views/pages/locations/pages/location/services'

const useGetLocationDropdown = (props) => {
  return useMutation({
    mutationFn: getListLocations,
    ...props?.config,
  })
}

const useGetAssetDropdown = (props) => {
  return useMutation({
    mutationFn: getAssets,
    ...props?.config,
  })
}

const useGetJobPlanDropdown = (props) => {
  return useMutation({
    mutationFn: getJobPlanList,
    ...props?.config,
  })
}

export { useGetLocationDropdown, useGetAssetDropdown, useGetJobPlanDropdown }
