/* eslint-disable */
/* prettier-ignore-start */
import React, { useMemo, useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { BsChevronDown, BsChevronUp, BsSearch } from 'react-icons/bs'

const PopUpDeleteDefends = ({
  mode,
  setAction,
  setTabIndex,
  details = [],
  activeIndex = 0,
  isOpen,
  onClose,
  deleteFailurDefends,
  setSelectedTask,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  const filteredTasks = useMemo(() => {
    return details.filter((t) =>
      t.task.toLowerCase().includes(search.toLowerCase())
    )
  }, [details, search])

  useEffect(() => {
    if (isOpen) {
      setOpenDropdown(false)
    }
  }, [isOpen])


  const handleSelectAll = (checked) => {
    if (checked) {
      const ids = filteredTasks.map((t) => t.id)
      setSelectedIds(ids)
      setSelectedTask(ids)
    } else {
      setSelectedIds([])
      setSelectedTask([])
    }
  }

  const handleSelectItem = (id) => {
    setSelectedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]

      setSelectedTask(updated)
      return updated
    })
  }
  const handleDelete = () => {
    if (!selectedIds.length) return

    const payload = selectedIds.map((id) => ({ id }))

    setAction('Delete')
    deleteFailurDefends(payload)

    setSelectedIds([])
    setSelectedTask([])
  }

  return (
    <CModal
      visible={isOpen}
      size="lg"
      alignment="center"
      backdrop="static"
      keyboard={false}
      onClose={onClose}>
      <CModalHeader>
        <span className="text-2xl font-semibold">Delete Failure Defense Task</span>
      </CModalHeader>

      <CModalBody>
        <label className="fw-semibold mb-2 color-[#4D5E80]">Failure Defense Task</label>

        {/* Dropdown Header */}
        <div
          className="border rounded px-3 py-2 d-flex justify-content-between align-items-center cursor-pointer"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          <span className="text-muted">
            {selectedIds.length
              ? `${selectedIds.length} task selected`
              : 'Choose Failure Defense Task'}
          </span>
          {openDropdown ? <BsChevronUp  style={{ color: '#2671D9'}} /> : <BsChevronDown  style={{ color: '#2671D9'}} />}
        </div>

        {/* Dropdown Content */}
        {openDropdown && (
          <div
            className="mt-2 p-2"
            style={{ maxHeight: 280, overflowY: 'auto' }}
          >
            {/* Search */}
            <CInputGroup className="mb-2 border-0">
              <CInputGroupText className="border-0 bg-transparent">
                <BsSearch style={{ color: '#2671D9'}}/>
              </CInputGroupText>
              <CFormInput
                className="border-0 shadow-none"
                placeholder="Search Failure Defense Task"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </CInputGroup>
            <hr className="flex-1 ml-2 h-[1px] bg-neutral-stroke" />

            {/* Select All */}
            <CFormCheck
              label="Select All"
              className="mb-2"
              checked={
                filteredTasks.length > 0 &&
                selectedIds.length === filteredTasks.length
              }
              onChange={(e) => handleSelectAll(e.target.checked)}
            />

            {/* List */}
            {filteredTasks.map((item) => (
              <CFormCheck
                key={item.id}
                className="mb-2"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
                label={
                  <span className="d-block text-truncate w-[740px]" title={item.task}>
                    {item.fdt_num} - {item.task?.replace(/<\/?[^>]+(>|$)/g, "") || '-'}
                  </span>
                }
              />
            ))}
          </div>
        )}

      </CModalBody>

      <CModalFooter>
        <button
          disabled={!selectedIds.length}
          className="px-8 py-2 text-[#fff] border border-1 rounded bg-[#FF5656]"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button className="px-3 text-[#2671D9]" onClick={onClose}>
          Cancel
        </button>
      </CModalFooter>
    </CModal>
  )
}

export default PopUpDeleteDefends
