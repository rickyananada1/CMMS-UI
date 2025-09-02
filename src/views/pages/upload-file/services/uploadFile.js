import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const uploadFile = async ({ url, data, signal }) => {
  return await axios.post(url, data, {
    signal,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

const useUploadFile = (props) => {
  return useMutation({
    mutationFn: uploadFile,
    ...props?.config,
  })
}

export { uploadFile, useUploadFile }
