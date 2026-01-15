import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFailureDefends = async ({ id, params, signal }) => {
  return await axios.get('/ticketecp/failure-defend-tasks/' + id, { params, signal })
}

const useGetFailureDefends = (props) => {
  return useMutation({
    mutationFn: getFailureDefends,
    ...props?.config,
  })
}

const getMaintenance = async ({ params, signal }) => {
  return await axios.get('/ticketecp/maintenance-type', { params, signal })
}

const useGetMaintenance = (props) => {
  return useMutation({
    mutationFn: getMaintenance,
    ...props?.config,
  })
}

export { getFailureDefends, useGetFailureDefends, useGetMaintenance }
