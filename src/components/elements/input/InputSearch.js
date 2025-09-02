import React from 'react'
import { GoSearch } from 'react-icons/go'

export default function InputGlobalSearch({ onChange }) {
  return (
    <div className="flex items-center">
      <div className="flex items-center px-4 py-2 mr-2 border border-solid rounded">
        <input
          placeholder="Search"
          className="text-sm border-none"
          type="text"
          onChange={(val) => onChange(val.target.value)}
        />
        <GoSearch color="blue" />
      </div>
    </div>
  )
}
