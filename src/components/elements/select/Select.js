/* eslint-disable react/prop-types */
import React from 'react'
import clsx from 'clsx'
import { HiOutlineChevronDown } from 'react-icons/hi'
import ReactSelect from 'react-select'
import { emptyValueLabel } from 'src/utils/components'

import { components } from 'react-select'
import { CFormCheck } from '@coreui/react'

const CheckboxOptions = (props) => (
  <components.Option {...props} className="form-check px-5">
    <CFormCheck id={props.label} checked={props.isSelected} readOnly />
    <label htmlFor={props.label} className="form-check-label">
      {props.label}
    </label>
  </components.Option>
)

const selectStyles = {
  option: (style, { isDisabled, isFocused, isSelected }) => {
    const getBackgroundColor = () => {
      if (isDisabled) return undefined
      if (isSelected) return '#3b82f6'
      if (isFocused) return '#dbeafe'
      return undefined
    }

    return {
      ...style,
      color: isSelected ? '#fff' : style.color,
      backgroundColor: getBackgroundColor(),
      '&:hover': {
        color: '#000',
        backgroundColor: '#dbeafe',
      },
      '&:active': {
        color: '#000',
        backgroundColor: '#93c5fd',
      },
    }
  },
  control: (style, { isFocused }) => ({
    ...style,
    boxShadow: isFocused ? '0 0 0 1px #3b82f6' : '',
    borderColor: isFocused ? '#3b82f6' : '#CED4DA',
    '&:hover': {
      borderColor: isFocused ? '#3b82f6' : '#CED4DA',
    },
  }),
  multiValue: (style) => {
    return {
      ...style,
      backgroundColor: '#3b82f6',
    }
  },
  multiValueLabel: (style) => ({
    ...style,
    color: '#fff',
  }),
  multiValueRemove: (style) => ({
    ...style,
    color: '#fff',
    ':hover': {
      backgroundColor: '#2563eb',
      color: '#fff',
    },
  }),
}

const DropdownIndicator = () => {
  return (
    <div className="px-2">
      <HiOutlineChevronDown className="h-5 w-5 text-[#2671D9]" />
    </div>
  )
}

const Select = (props) => {
  const { disabled = false, className, value, isMulti = false, ...rest } = props
  const newValue = emptyValueLabel(value)
  return (
    <ReactSelect
      isMulti={isMulti}
      value={newValue}
      isDisabled={disabled}
      components={{
        DropdownIndicator,
        IndicatorSeparator: () => null,
        Option: isMulti ? CheckboxOptions : components.Option,
      }}
      styles={selectStyles}
      className={clsx('w-full', className)}
      {...rest}
    />
  )
}

export default Select

export { DropdownIndicator, Select, selectStyles }
