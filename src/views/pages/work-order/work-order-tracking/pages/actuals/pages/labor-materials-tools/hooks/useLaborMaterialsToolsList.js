import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useGetChildOfWorkOrder_ } from '../../childern-of-wo/services'

const useLaborMaterialsToolsList = () => {
  const tableRef = useRef()
  const selectedRow = useSelector((state) => state.woTracking?.selectedWorkOrder)
  const selectedTaskRow = useSelector((state) => state.woTask?.selectedGroup)
  const getChildOfWorkOrder_ = useGetChildOfWorkOrder_({
    id: selectedRow?.work_order_id,
  })

  return {
    tableRef,
    selectedRow,
    selectedTaskRow,
    getChildOfWorkOrder_,
  }
}

export default useLaborMaterialsToolsList
