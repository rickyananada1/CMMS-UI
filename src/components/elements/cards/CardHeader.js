import React from 'react'
import { FaRegFileAlt } from 'react-icons/fa'
import { MdOutlineCloudDownload } from 'react-icons/md'

const CardHeader = ({ description, infoFields = [], onDownload }) => {
  return (
    <div className="bg-[#e9f1fb] w-full p-3 rounded-lg flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-[#2c74d6] to-[#1b4a89] w-14 h-14 rounded-lg flex items-center justify-center">
          <FaRegFileAlt className="text-neutral-white h-7 w-7" />
        </div>
        <div className="flex-1">
          <span className="w-full font-semibold text-2xl block mb-1">{description ?? '-'}</span>
          <div className="text-base text-neutral-text-field flex flex-wrap gap-x-1">
            {infoFields.map((field, index) => (
              <span key={index} className="flex gap-1">
                {field.label}:{' '}
                <span className="font-semibold text-neutral-primary-text">
                  {field.value ?? '-'}
                </span>
                {index < infoFields.length - 1 && <span>/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
      {onDownload && (
        <div>
          <button
            onClick={onDownload}
            className="flex items-center gap-1 px-3 py-1.5 text-base bg-[#2c74d6] hover:bg-[#1b4a89] text-white rounded-md ml-4"
          >
            Download <MdOutlineCloudDownload className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default CardHeader
