import { CTooltip } from '@coreui/react'
import React from 'react'

const InputFile = ({ setIsModalOpen, files }) => {
  return (
    <div className="flex items-center justify-between border border-cmms-grey p-1 rounded-md">
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="p-2 bg-[#f7f7f7] text-[#7F7F80] rounded-md hover:bg-[#e0e0e0] hover:text-[#2c2c2c] text-xs"
      >
        Choose File
      </button>

      {files?.length > 0 && (
        <CTooltip
          content={
            <div className="text-left">
              {files?.slice(0, 3).map((file, idx) => (
                <div key={idx} className="truncate">
                  {file?.name || (file?.file?.file_path && file?.file?.file_path.split('/').pop())}
                </div>
              ))}
              {files?.length > 3 && <div className="text-gray-400">....</div>}
            </div>
          }
          placement="top"
        >
          <span className="px-3 py-1 text-sm rounded-md bg-primary-border text-cmms-blue hover:bg-primary-main hover:text-neutral-white transition cursor-default">
            <b>{files?.length}</b> Files Uploaded
          </span>
        </CTooltip>
      )}
    </div>
  )
}

export default InputFile
