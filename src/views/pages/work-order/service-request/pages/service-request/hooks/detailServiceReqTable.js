/* eslint-disable */
/* prettier-ignore-start */
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serviceRequestActions } from '../../../slices/serviceRequestSlice'
import { useDebounce } from 'src/hooks/useDebounce'

const detailServiceReqTable = () => {
  const dispatch = useDispatch()
  const tableRef = useRef()

  const selectedRow = useSelector((state) => state.serviceRequest?.selectedServiceRequest)
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
    console.log("SEARCH INPUT:", value);
  };

  const setSelectedRow = (param) => {
    dispatch(serviceRequestActions.setSelectedServiceReq(param))
    dispatch(serviceRequestActions.setSelectedAppIndex(1))
  }

  return {
    setSearch,
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
  }
}

export default detailServiceReqTable
