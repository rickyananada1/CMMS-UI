import { useRef, useState } from 'react'
import { useGetSubassemblies_ } from '../../services/subassemblies'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'src/hooks/useDebounce'
import { subassembliesActions } from '../../slices/subassembliesSlices'

const useSubassemblies = () => {
  const tableRef = useRef()
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const selectedRow = useSelector((state) => state.assets?.selectedAsset)
  const selectedSubassembliesRow = useSelector((state) => state.subassemblies?.selectedGroup)
  const getSubassemblies = useGetSubassemblies_({
    id: selectedRow?.asset_id,
  })

  const setSelectedSubassembliesRow = (param) => {
    dispatch(subassembliesActions.setSelectedGroup(param))
  }

  const searchDebounce = useDebounce(search, 400)
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return {
    tableRef,
    selectedRow,
    getSubassemblies,
    handleSearch,
    searchDebounce,
    selectedSubassembliesRow,
    setSelectedSubassembliesRow,
  }
}

export default useSubassemblies
