import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSites = async ({ org_id, params, signal }) => {
  return await axios.get('/administration/organizations/' + org_id + '/sites', { params, signal })
}

const useGetSites = ({ org_id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getSites({ org_id, params, ...mutationProps }),
    ...config,
  })
}

export { getSites, useGetSites }
