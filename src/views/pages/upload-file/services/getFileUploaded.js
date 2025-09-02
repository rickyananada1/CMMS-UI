import { useQuery } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const getFileUploaded = async ({ url, params, signal }) => {
  return await axios.get(url, { params, signal })
}

const useGetFileUploaded = ({ url, config, params } = {}) => {
  return useQuery({
    ...config,
    queryKey: [
      'detail-get-file-uploaded',
      url,
      ...(params ? Object.values(params).filter(Boolean) : []),
    ],
    queryFn: ({ signal }) => getFileUploaded({ url, params, signal }),
  })
}

export { getFileUploaded, useGetFileUploaded }
