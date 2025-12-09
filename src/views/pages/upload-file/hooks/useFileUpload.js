import { useState, useEffect, useMemo } from 'react'
import { useUploadFile } from '../services/uploadFile'
import { useGetFileUploaded } from '../services/getFileUploaded'
import { useDeleteFile } from '../services/deleteFile'
import { useToast } from 'src/context/ToastContext'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const useFileUpload = ({ uploadUrl, fetchUrl, mode, formId, files, setFiles }) => {
  const { showToast } = useToast()

  const [deletedFiles, setDeletedFiles] = useState([])
  const [tempFiles, setTempFiles] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [duplicateFileError, setDuplicateFileError] = useState(null)

  useEffect(() => {
    if (isModalOpen) {
      setTempFiles(files)
    }
  }, [isModalOpen, files, setTempFiles])

  // Move acceptedFileTypes into useMemo
  const acceptedFileTypes = useMemo(
    () => ({
      'application/msword': ['.doc', '.docx'],
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
      'text/csv': ['.csv'],
      'application/zip': ['.zip'],
      'application/x-rar-compressed': ['.rar'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    }),
    [],
  )

  const isModeUpdate = /update/i.test(mode)
  const token = localStorage.getItem('access_token')

  const getFileUploaded = useGetFileUploaded({
    url: fetchUrl,
    config: {
      enabled: false,
    },
  })
  const uploadingFile = useUploadFile()
  const deletingFile = useDeleteFile()

  useEffect(() => {
    if (isModeUpdate) {
      getFileUploaded.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModeUpdate, fetchUrl])

  useEffect(() => {
    if (isModeUpdate) {
      const data = getFileUploaded?.data?.data?.data

      if (!data || data.length === 0) {
        return
      }

      const formattedFiles = data?.map((file) => ({
        file,
        preview: file.url,
        isNew: false,
        formId,
      }))

      if (setFiles) setFiles(formattedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFileUploaded.data])

  const uploadFiles = async (uploadedFiles, overrideUrl = null, formId = null) => {
    const finalUploadUrl = overrideUrl || uploadUrl
    const successfulUploads = []
    const failedUploads = []

    if (!finalUploadUrl || !uploadedFiles?.length) {
      return { successfulUploads, failedUploads }
    }

    for (const fileObj of uploadedFiles) {
      const actualFile = fileObj.file || fileObj
      const isNew = fileObj.isNew ?? true
      const fileFormId = fileObj.formId ?? formId

      if (isNew && fileFormId === formId) {
        const formData = new FormData()
        formData.append('files', actualFile)

        try {
          await uploadingFile.mutateAsync({
            url: finalUploadUrl,
            data: formData,
          })
          successfulUploads.push(fileObj)
        } catch (err) {
          failedUploads.push({ file: fileObj, error: err.message || 'Upload failed' })
        }
      }
    }
    return { successfulUploads, failedUploads }
  }

  const handleDownload = async (event, fileUrl, fileName = 'download') => {
    event.stopPropagation()
    if (!fileUrl) {
      showToast('error', 'Download Failed, No download URL available.')
      return
    }

    try {
      const response = await fetch(fileUrl, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })

      // Check for error status codes
      if (!response.ok) {
        let errorMessage = 'Failed to download file'

        switch (response.status) {
          case 401:
            errorMessage = 'Unauthorized access. Please login again.'
            break
          case 403:
            errorMessage = 'You do not have permission to download this file.'
            break
          case 404:
            errorMessage = 'File not found.'
            break
          case 500:
            errorMessage = 'Server error occurred while downloading file.'
            break
          default:
            errorMessage = `Error downloading file: ${response.statusText}`
        }

        showToast('error', errorMessage)
        return
      }

      const blob = await response.blob()

      // ✅ Create a temporary URL for the file
      const blobUrl = window.URL.createObjectURL(blob)

      // ✅ Create an <a> element and trigger download
      const link = document.createElement('a')
      link.href = blobUrl
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()

      // ✅ Cleanup: Remove the link & revoke the object URL
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)

      showToast('success', 'File downloaded successfully!')
    } catch (error) {
      showToast('error', 'An error occurred while downloading the file. Please try again.')
    }
  }

  const deletePendingFiles = async (filesToDelete = deletedFiles) => {
    if (!filesToDelete || filesToDelete.length === 0) {
      return
    }

    try {
      const uniqueDeletedFiles = [...new Set(filesToDelete)].filter(Boolean)

      await Promise.all(
        uniqueDeletedFiles.map(async (fileId) => {
          await deletingFile.mutateAsync({ id: fileId })
        }),
      )
    } catch (error) {
      throw error
    } finally {
      setDeletedFiles([])
    }
  }

  const handleModalClose = (saveChanges) => {
    if (saveChanges) {
      setFiles(tempFiles)
    } else {
      setTempFiles(files)
    }
    setIsModalOpen(false)
    setDuplicateFileError(null) // Clear error on modal close
  }

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : []
    const newFiles = selectedFiles.filter((file) => {
      const isDuplicate = tempFiles.some((tempFile) => {
        const tempFileName =
          tempFile.file?.name || tempFile.name || tempFile.file?.file_path?.split('/').pop()
        return tempFileName === file.name
      })
      return !isDuplicate
    })

    if (newFiles.length < selectedFiles.length) {
      setDuplicateFileError(`Uploaded document can't be the same as an existing document.`)
    } else {
      setDuplicateFileError(null)
    }

    if (newFiles.length > 0) {
      setTempFiles([...tempFiles, ...newFiles])
    }
  }

  const isLoading = getFileUploaded.isLoading || getFileUploaded.isFetching

  return {
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    isLoading,
    handleDownload,
    deletePendingFiles,
    deletedFiles,
    setDeletedFiles,
    tempFiles,
    setTempFiles,
    isModalOpen,
    setIsModalOpen,
    handleModalClose,
    handleFileSelect,
    duplicateFileError,
  }
}

export default useFileUpload
