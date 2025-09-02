import React from 'react'
import clsx from 'clsx'
import { MdClose } from 'react-icons/md'
import { FaRegFileAlt } from 'react-icons/fa'
import AttachmentPreview from './AttachmentPreview'
import moment from 'moment'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'

const AttachmentDrawer = ({ isOpen, onClose, files, selectedFile, onSelectFile }) => {
  const { handleDownload } = useFileUpload({
    fieldName: 'files',
    uploadUrl: '',
    fetchUrl: selectedFile?.url,
  })

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-50 z-[1090] transition-opacity duration-300',
          { 'opacity-100 visible': isOpen, 'opacity-0 invisible': !isOpen },
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          'fixed top-0 right-0 h-screen w-[1200px] bg-white shadow-lg z-[1100] transform transition-transform duration-300 flex flex-col rounded-tl-2xl rounded-bl-2xl',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          },
        )}
      >
        <div className="flex justify-between items-center px-4 py-3 border-[#E5E7E9] flex-shrink-0">
          <span className="text-2xl font-semibold">Attachment</span>
          <button onClick={onClose}>
            <MdClose className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-2 sticky top-0 bg-white z-10">
              <p className="text-lg text-neutral-text-field text-nowrap font-semibold">
                File attached
              </p>
              <hr className="flex-1 ml-2 h-[1px] bg-neutral-stroke" />
            </div>

            <div className="flex flex-col gap-3 mt-2 px-4 pb-4">
              {Array.isArray(files) && files.length > 0 ? (
                files.map((file, idx) => {
                  const fileName = file?.file_path?.split('/')
                  const dateFile = moment(file.created_at).format('YYYY-MM-DD HH:mm')

                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectFile(file)}
                      className={clsx(
                        'flex items-center p-3 border rounded-xl shadow-sm w-full space-x-4 hover:bg-[#e5e5e5] hover:cursor-pointer',
                        selectedFile?.file_path === file?.file_path ? 'bg-[#e9f1fb]' : 'bg-white',
                      )}
                    >
                      <div className="bg-gradient-to-r from-[#2c74d6] to-[#1b4a89] w-14 h-14 rounded-full flex items-center justify-center">
                        <FaRegFileAlt className="text-neutral-white h-7 w-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-neutral-primary-text truncate mb-1">
                          {fileName[2]}
                        </p>
                        <p className="text-base text-neutral-text-field truncate mb-0">
                          <span className="font-semibold text-neutral-primary-text">
                            {file?.size_mb ?? 0}
                          </span>
                          MB &nbsp;
                          <span className="font-semibold text-neutral-primary-text">
                            {dateFile}
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-gray-400 text-center text-lg mt-3 font-semibold">
                  No files to show
                </p>
              )}
            </div>
          </div>

          <div className="w-2/3 p-4 flex flex-col overflow-hidden">
            {selectedFile && (
              <div className="flex items-center justify-between mb-2 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-700 truncate">
                  {selectedFile?.file_path?.split('/')[2]}
                </h2>
                <button
                  onClick={(event) =>
                    handleDownload(event, selectedFile?.url, selectedFile?.file_path?.split('/')[2])
                  }
                  className="inline-block py-1.5 text-sm font-medium text-primary-main hover:text-primary-hover underline"
                >
                  Download
                </button>
              </div>
            )}

            <div className="flex-1 overflow-hidden border rounded border-[#E5E7E9] flex items-center justify-center">
              {selectedFile ? (
                <AttachmentPreview
                  fileUrl={selectedFile?.preview}
                  fileName={selectedFile?.file_path?.split('/')[2]}
                />
              ) : (
                <p className="text-gray-500 text-center font-semibold">No preview available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7E9] px-4 py-3 bg-neutral-white rounded-bl-2xl flex-shrink-0">
          <div className="text-right mx-5">
            <button
              onClick={onClose}
              className="text-lg font-semibold text-primary-main hover:text-primary-hover"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AttachmentDrawer
