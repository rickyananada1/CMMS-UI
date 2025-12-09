import React, { useMemo, useRef } from 'react'
import moment from 'moment'
import { FiX, FiTrash2 } from 'react-icons/fi'
import { FaPaperclip } from 'react-icons/fa'

const UploadFileModal = (props) => {
  const {
    isModalOpen,
    handleModalClose,
    tempFiles = [],
    setTempFiles,
    deletedFiles = [],
    setDeletedFiles,
    MAX_FILE_SIZE,
    handleFileSelect,
    duplicateFileError,
  } = props

  const fileInputRef = useRef(null)

  const acceptedTypes = useMemo(
    () =>
      [
        '.doc',
        '.docx',
        '.pdf',
        '.xls',
        '.xlsx',
        '.ppt',
        '.pptx',
        '.csv',
        '.zip',
        '.rar',
        '.jpg',
        '.jpeg',
        '.png',
      ].join(','),
    [],
  )

  const handleRemoveFile = (index) => {
    const fileToRemove = tempFiles[index]
    if (!fileToRemove.isNew && !(fileToRemove instanceof File)) {
      setDeletedFiles([...deletedFiles, fileToRemove.file?.file_id])
    }
    const newFiles = [...tempFiles]
    newFiles.splice(index, 1)
    setTempFiles(newFiles)
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000066] z-[9999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3">
          <span className="text-lg font-semibold flex items-center gap-2">
            <FaPaperclip className="w-5 h-5" />
            Attachment
          </span>
          <button
            onClick={() => handleModalClose(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={30} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-3">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="No file chosen"
              className="flex-1 px-3 py-2 text-sm focus:outline-none border-none"
              readOnly
              value={tempFiles.length > 0 ? tempFiles[tempFiles.length - 1]?.name : ''}
            />

            <label
              htmlFor="customFileInput"
              className="bg-[#2563eb] text-white px-4 py-2 text-sm font-medium cursor-pointer hover:bg-[#1d4ed8]"
            >
              Choose File
            </label>

            <input
              id="customFileInput"
              type="file"
              accept={acceptedTypes}
              ref={fileInputRef}
              className="hidden"
              onChange={(event) => {
                handleFileSelect(event)
                event.target.value = null // Clear the input value
              }}
            />
          </div>

          {/* Info */}
          <div className="flex justify-between text-xs text-cmms-grey">
            <span>Preview works with: .pdf, .docx, .xls, .xlsx, .csv, .jpeg, .jpg, .png</span>
            <span>Maximum upload file size: {MAX_FILE_SIZE / 1024 / 1024} MB</span>
          </div>

          {duplicateFileError && <div className="text-sm text-cmms-red">{duplicateFileError}</div>}

          {/* File List */}
          <div className="h-1/3 overflow-y-auto">
            {tempFiles.length === 0 ? (
              <div className="w-full my-2 py-2"></div>
            ) : (
              tempFiles.map((f, idx) => {
                const file = f.file || f
                return (
                  <div key={idx} className="flex items-center justify-between mb-2 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-cmms-grey">
                        {file?.name || file?.file_path?.split('/')[2]}
                      </span>
                      <span className="text-medium text-cmms-grey">
                        {file?.size
                          ? (file.size / 1024 / 1024).toFixed(2)
                          : file?.size_mb || '0.00'}{' '}
                        MB
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {file?.created_at ? (
                        <span className="text-sm text-cmms-blue font-semibold flex items-center">
                          <span className="h-2 w-2 bg-cmms-blue rounded-full inline-block mr-2"></span>
                          Uploaded at {moment(file?.created_at).format('MMM DD, YYYY')}
                        </span>
                      ) : (
                        ''
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="w-6 h-6 bg-[#FECACA] rounded-full flex items-center justify-center text-[#EF4444] hover:text-[#DC2626]"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-t-neutral-stroke px-6 py-3 space-x-2">
          <button
            onClick={() => handleModalClose(false)}
            className="px-4 py-2 text-sm font-medium text-primary-main hover:text-primary-hover"
          >
            Cancel
          </button>
          <button
            onClick={() => handleModalClose(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-cmms-blue hover:bg-primary-hover rounded"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadFileModal
