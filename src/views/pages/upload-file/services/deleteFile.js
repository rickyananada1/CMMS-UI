import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const deleteFile = async ({ id, params, signal }) => {
  return await axios.delete(`/files/${id}`, { params, signal })
}

const useDeleteFile = (props) => {
  return useMutation({
    mutationFn: deleteFile,
    ...props?.config,
  })
}

export { deleteFile, useDeleteFile }
