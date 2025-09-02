import { useState, useCallback, useEffect, useMemo } from 'react'
import { useUploadFile } from '../services/uploadFile'
import { useGetFileUploaded } from '../services/getFileUploaded'
import { useDeleteFile } from '../services/deleteFile'
import { useToast } from 'src/context/ToastContext'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const useFileUpload = ({ fieldName, uploadUrl, fetchUrl, mode, onDeletedFilesChange, formId }) => {
  const { showToast } = useToast()

  const [files, setFiles] = useState([])
  const [deletedFiles, setDeletedFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  // Reset states when URL changes
  useEffect(() => {
    if (!uploadUrl) {
      setFiles([])
      setDeletedFiles([])
      setErrorMessage('')
    }
  }, [uploadUrl])

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

      setFiles(formattedFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFileUploaded.data])

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles, setFieldValue, rejectedFiles, formId) => {
      setErrorMessage('')

      const validFiles = acceptedFiles.filter((file) => {
        const isValidType = Object.values(acceptedFileTypes)
          .flat()
          .includes(`.${file.name.split('.').pop().toLowerCase()}`)
        const isValidSize = file.size <= MAX_FILE_SIZE

        return isValidType && isValidSize
      })

      if (rejectedFiles.length > 0 || validFiles.length !== acceptedFiles.length) {
        setErrorMessage('Some files were rejected. Please check file type and size (max 10MB).')
      }

      const newFiles = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isNew: true,
        formId,
      }))

      setFiles((prevFiles) => {
        // Filter files for the current form
        const currentFormFiles = prevFiles.filter((f) => f.formId === formId)
        const otherFormFiles = prevFiles.filter((f) => f.formId !== formId)

        // Check for duplicates within the current form
        const updatedFiles = [...currentFormFiles]

        newFiles.forEach((newFile) => {
          const isDuplicate = updatedFiles.some(
            (existingFile) => existingFile.file.name === newFile.file.name,
          )

          if (!isDuplicate) {
            updatedFiles.push(newFile)
          }
        })

        // Combine with files from other forms
        const allFiles = [...otherFormFiles, ...updatedFiles]

        // Update Formik field value with files for the current form
        setFieldValue(
          fieldName || 'files',
          updatedFiles.map((f) => f.file),
        )

        return allFiles
      })
    },
    [acceptedFileTypes, fieldName],
  )

  const uploadFiles = async (uploadedFiles, overrideUrl = null, formId = null) => {
    const finalUploadUrl = overrideUrl || uploadUrl

    if (!finalUploadUrl || !uploadedFiles?.length) {
      return
    }

    const formData = new FormData()

    uploadedFiles.forEach((fileObj) => {
      const actualFile = fileObj.file || fileObj
      const isNew = fileObj.isNew ?? true
      const fileFormId = fileObj.formId ?? formId

      if (isNew && fileFormId === formId) {
        formData.append('files', actualFile)
      }
    })

    if ([...formData.entries()].length === 0) {
      return
    }

    try {
      await uploadingFile.mutateAsync({
        url: finalUploadUrl,
        data: formData,
      })
    } catch (err) {
      throw err
    }
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

  const removeFiles = (event, selectedIndexes, setFieldValue, file_id, formId) => {
    event.stopPropagation()

    if (!Array.isArray(selectedIndexes) || selectedIndexes.length === 0) return

    let filesToDelete = []

    setFiles((prevFiles) => {
      const currentFormFiles = prevFiles.filter((f) => f.formId === formId)
      const otherFormFiles = prevFiles.filter((f) => f.formId !== formId)
      const filesToKeep = []

      currentFormFiles.forEach((file, index) => {
        if (selectedIndexes.includes(index)) {
          if (!file.isNew) {
            filesToDelete.push(file.file.file_id)
          }
        } else {
          filesToKeep.push(file)
        }
      })

      setFieldValue(
        fieldName || 'files',
        filesToKeep.map((f) => f.file),
      )

      return [...otherFormFiles, ...filesToKeep]
    })

    setDeletedFiles((prev) => {
      const updatedDeletedFiles = [...new Set([...prev, ...filesToDelete])]
      return updatedDeletedFiles
    })
  }

  // Update useEffect to notify parent component of changes
  useEffect(() => {
    if (deletedFiles.length > 0) {
      onDeletedFilesChange?.(deletedFiles) // Notify parent component
    }
  }, [deletedFiles, onDeletedFilesChange])

  const deletePendingFiles = async (filesToDelete = deletedFiles) => {
    if (!filesToDelete || filesToDelete.length === 0) {
      return
    }

    try {
      const uniqueDeletedFiles = [...new Set(filesToDelete)]

      await Promise.all(
        uniqueDeletedFiles.map(async (fileId) => {
          await deletingFile.mutateAsync({ id: fileId })
        }),
      )
    } catch (error) {
      throw error
    } finally {
      setDeletedFiles([])
      onDeletedFilesChange?.([]) // Clear parent's state as well
    }
  }

  const isLoading = getFileUploaded.isLoading || getFileUploaded.isFetching

  return {
    files: files.filter((f) => f.formId === formId),
    errorMessage,
    onDrop,
    removeFiles,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    isLoading,
    handleDownload,
    deletePendingFiles,
    deletedFiles,
  }
}

export default useFileUpload
