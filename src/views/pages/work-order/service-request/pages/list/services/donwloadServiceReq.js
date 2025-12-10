/* eslint-disable */
/* prettier-ignore-start */
import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadServiceReq = async ({ data, signal }) => {
  return await axios.post(`/quick-reporting/download`, data, { signal })
}

const useDownloadServiceReq = ({ data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) => downloadServiceReq({ data, ...mutationProps }),
    ...config,
  })
}

export { downloadServiceReq, useDownloadServiceReq }
