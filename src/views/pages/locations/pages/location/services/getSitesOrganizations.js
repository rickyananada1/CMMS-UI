import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSiteOrganizations = async ({ id, params, signal }) => {
  return await axios.get(`/administration/${id}/sites`, {
    params,
    signal,
  })
}

const getAllSiteOrganizations = async ({ params, signal }) => {
  return await axios.get('/administration/organizations/all/sites', {
    params,
    signal,
  })
}

const useGetSiteOrganizations = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => getSiteOrganizations({ id, params, ...mutationProps }),
    ...config,
  })
}

const useGetAllSiteOrganizations = (props) => {
  return useMutation({
    mutationFn: getAllSiteOrganizations,
    ...props,
  })
}

export {
  getSiteOrganizations,
  getAllSiteOrganizations,
  useGetSiteOrganizations,
  useGetAllSiteOrganizations,
}
