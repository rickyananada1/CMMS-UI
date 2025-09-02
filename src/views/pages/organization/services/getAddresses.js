import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const organizationAddressesList = async ({ id, params, signal }) => {
  return await axios.get(`/administration/organizations/${id}/addresses`, {
    params,
    signal,
  })
}

const useOrganizationAddressesList = ({ id, config, params }) => {
  return useMutation({
    mutationFn: (mutationProps) => organizationAddressesList({ id, params, ...mutationProps }),
    ...config,
  })
}

export { organizationAddressesList, useOrganizationAddressesList }
