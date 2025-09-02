import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { CiCalendarDate } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import 'react-datepicker/dist/react-datepicker.css'

const CustomDatePickerInput = ({ value, onClick, onClear }) => (
  <div className="flex items-center gap-2 text-xs font-normal cursor-pointer" onClick={onClick}>
    <CiCalendarDate color="blue" />
    <span className="text-nowrap">{value || 'Select a date'}</span>
    {value && (
      <IoClose
        className="text-lg"
        color="red"
        onClick={(e) => {
          e.stopPropagation() // Prevent calendar from opening
          onClear()
        }}
      />
    )}
  </div>
)

const DatePicker = (props) => {
  const { isRange = false, onClear, ...rest } = props

  return (
    <ReactDatePicker
      selectsRange={isRange}
      dateFormat="dd-MM-yyyy"
      customInput={<CustomDatePickerInput onClear={onClear} />}
      {...rest}
    />
  )
}

export default DatePicker
