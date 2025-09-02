import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { useDropzone } from 'react-dropzone'
import { FiTrash2 } from 'react-icons/fi'

const UploadFileModal = (props) => {
  const {
    visible,
    setVisible,
    setFieldValue,
    files = [],
    errorMessage = '',
    onDrop,
    removeFiles,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    mode,
    formId,
  } = props

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles, rejectedFiles) => onDrop(acceptedFiles, setFieldValue, rejectedFiles),
    accept: acceptedFileTypes,
    maxSize: MAX_FILE_SIZE,
    disabled: mode === 'Detail',
  })

  return (
    <CModal
      backdrop="static"
      alignment="center"
      size="md"
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="upload-file"
    >
      <CModalHeader>
        <CModalTitle>
          <h5 className="heading-small">Upload File</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-[#4a5565] p-3 text-center cursor-pointer bg-[#f3f4f6] transition rounded-lg"
        >
          <input {...getInputProps()} />
          {files.length === 0 ? (
            <span className="text-[#6a7282]">Drag & drop files here, or click to select</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {files.map(({ file }, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#f9fafb] shadow-md rounded-md px-2 py-1 w-100"
                >
                  <span>
                    {file?.name?.length > 30
                      ? file?.name?.substring(0, 15) + '...'
                      : file?.name || file.file_path.split('/')[2]}
                  </span>
                  <div>
                    {mode !== 'Detail' && (
                      <button
                        onClick={(event) =>
                          removeFiles(event, [index], setFieldValue, file.file_id, formId)
                        }
                        className="text-[#fb2c36] font-bold text-lg hover:text-[#0010c1] transition"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {errorMessage && <span className="text-[#fb2c36] mt-2">{errorMessage}</span>}
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="primary" onClick={() => setVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UploadFileModal
