import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const uploadFile = async ({ data, signal }) => {
  return await axios.post('/files/upload', data, {
    signal,
  })
}

const useUploadFile = (props) => {
  return useMutation({
    mutationFn: uploadFile,
    ...props?.config,
  })
}

export { uploadFile, useUploadFile }
