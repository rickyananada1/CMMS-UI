import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getSitesSektor = async ({ params, signal }) => {
  return await axios.get(
    `/administration/organizations/${params.organization_id}/sites/type/SEKTOR`,
    {
      params,
      signal,
    },
  )
}

const useGetSitesSektor = (props) => {
  return useMutation({
    mutationFn: getSitesSektor,
    ...props,
  })
}

const getSitesKantorInduk = async ({ params, signal }) => {
  return await axios.get(
    `/administration/organizations/${params.organization_id}/sites/type/KANTOR INDUK`,
    {
      params,
      signal,
    },
  )
}

const useGetSitesKantorInduk = (props) => {
  return useMutation({
    mutationFn: getSitesKantorInduk,
    ...props,
  })
}

export { useGetSitesSektor, useGetSitesKantorInduk }
