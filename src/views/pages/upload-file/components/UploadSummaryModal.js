import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { FiRefreshCcw } from 'react-icons/fi'

const UploadSummaryModal = ({
  visible,
  setVisible,
  successfulUploads,
  failedUploads,
  onRetryUpload,
  onOK,
}) => {
  return (
    <CModal size="lg" alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Upload Summary</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {successfulUploads.length > 0 && (
          <div className="mb-3">
            {successfulUploads.map((fileObj, index) => (
              <div key={index} className="flex items-center justify-between mb-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-cmms-grey">
                    {fileObj.name ||
                      (fileObj.file.file_path && fileObj.file.file_path.split('/').pop())}
                  </span>
                  <span className="text-medium text-cmms-grey">
                    {fileObj.size
                      ? (fileObj.size / 1024 / 1024).toFixed(2)
                      : fileObj.file.size_mb || '0.00'}{' '}
                    MB
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-cmms-green font-semibold flex items-center">
                    <span className="h-2 w-2 bg-cmms-green rounded-full inline-block mr-2"></span>
                    Success
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {failedUploads.length > 0 && (
          <>
            {failedUploads.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2 text-sm text-danger"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-cmms-grey">
                    {item.file.name ||
                      (item.file.file.file_path && item.file.file.file_path.split('/').pop())}
                  </span>
                  <span className="text-medium text-cmms-grey">
                    {item.file.size
                      ? (item.file.size / 1024 / 1024).toFixed(2)
                      : item.file.size_mb || '0.00'}{' '}
                    MB
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-danger font-semibold">
                    <span className="h-2 w-2 bg-cmms-red rounded-full inline-block mr-2"></span>
                    {item.error ? 'Failed' : ''}
                  </span>
                  <button
                    onClick={() => onRetryUpload(item.file)} // Pass the original file object
                    className="w-6 h-6 bg-primary-border rounded-full flex items-center justify-center text-cmms-blue hover:text-neutral-white hover:bg-primary-hover"
                  >
                    <FiRefreshCcw />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {successfulUploads.length === 0 && failedUploads.length === 0 && (
          <p>No files were processed.</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={onOK ? onOK : () => setVisible(false)}>
          Ok
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default UploadSummaryModal
