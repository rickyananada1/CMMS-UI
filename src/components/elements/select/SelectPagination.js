/* eslint-disable react/prop-types */
import React, { useImperativeHandle } from 'react'
import clsx from 'clsx'
import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { emptyValueLabel } from 'src/utils/components'

export const SelectPagination = (props) => {
  const {
    classname,
    isMulti = false,
    perPage = 10,
    debounceTimeout = 1000,
    valueKey = 'id',
    labelKey = 'name',
    nestedValueKey = '',
    nestedLabelKey = '',
    otherKey = {},
    searchKey = 'q',
    apiController,
    isNestedValueKey = false,
    isNestedLabelKey = false,
    isAllData = false,
    hasNoKey = false,
    query,
    value,
    cahceUniqs,
    parentId,
    disabled = false,
    selectRef,
    isLocalSearch = false,
    ...rest
  } = props
  const fetchApi = apiController
  const [search, setSearch] = useState('')
  const queryData = {
    ...(searchKey !== '' && search !== '' ? { [searchKey]: search } : {}),
    ...query,
  }

  const formatOptionLabel = (option) => {
    // If labelKey is a function, use it to format the label
    if (typeof labelKey === 'function') {
      return labelKey(option)
    }

    // If option already has a formatted label (from the map below), use it
    if (option.label) {
      return option.label
    }

    // Default label formatting
    return hasNoKey
      ? option
      : isNestedLabelKey
      ? option?.[labelKey]?.[nestedLabelKey]
      : option?.[labelKey]
  }

  const loadOptions = async (search, loadedOptions, { page }) => {
    setSearch(search)
    const getData = await fetchApi
      .mutateAsync({
        id: parentId,
        params: {
          limit: perPage,
          page,
          ...(searchKey !== '' && search !== '' ? { [searchKey]: search } : {}),
          ...query,
        },
      })
      .catch(() => {
        return {}
      })

    var filteredData = []
    if (isLocalSearch) {
      filteredData = getData?.data.data.filter((val) => {
        return hasNoKey
          ? val.toLowerCase().includes(search.toLowerCase())
          : val[labelKey].toLowerCase().includes(search.toLowerCase())
      })
    } else {
      filteredData = getData?.data.data
    }

    const totalData = getData?.data.total || 0
    const resultData = (filteredData || []).map((val) => {
      const newObj = {
        ...(isAllData ? val : {}),
        value: hasNoKey
          ? val
          : isNestedValueKey
          ? val?.[valueKey]?.[nestedValueKey]
          : val?.[valueKey],
        // Handle label formatting
        label:
          typeof labelKey === 'function'
            ? labelKey(val)
            : hasNoKey
            ? val
            : isNestedLabelKey
            ? val?.[labelKey]?.[nestedLabelKey]
            : val?.[labelKey],
      }

      if (otherKey && Object.keys(otherKey).length > 0) {
        Object.entries(otherKey).forEach(([key, prop]) => {
          if (val[prop] !== undefined) {
            newObj[key] = val[prop]
          }
        })
      }

      return newObj
    })

    return {
      options: resultData,
      hasMore: totalData > perPage * page,
      additional: {
        page: page + 1,
      },
    }
  }

  useImperativeHandle(selectRef, () => ({
    getOptions: async () => {
      const options = await loadOptions(null, null, { page: 1 })
      return options
    },
  }))

  const cacheKeys = cahceUniqs || Object.values(queryData)
  const newValue = emptyValueLabel(value)

  return (
    <AsyncPaginate
      additional={{
        page: 1,
      }}
      value={newValue}
      isDisabled={disabled}
      isMulti={isMulti}
      loadOptions={loadOptions}
      debounceTimeout={debounceTimeout}
      className={clsx('w-full', classname)}
      cahceUniqs={cacheKeys}
      components={{
        IndicatorSeparator: () => null,
      }}
      formatOptionLabel={formatOptionLabel}
      {...rest}
    />
  )
}
