import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const downloadFile = async ({ link, params, signal }) => {
  return await axios.get(`${link}`, {
    responseType: 'blob',
    params,
    signal,
  })
}

const useDownloadFile = (props) => {
  return useMutation({
    mutationFn: downloadFile,
    ...props?.config,
  })
}

export { downloadFile, useDownloadFile }
