import React from 'react'
import { FaChevronRight, FaChevronLeft, FaEllipsisH } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

export const Pagination = (props) => {
  const { totalData, currentPage, onPageChange, limit, handleLimit, hidePerPage } = props
  const firstItemIndex = totalData === 0 ? 0 : (currentPage - 1) * limit + 1
  const lastItemIndex = Math.min(currentPage * limit)
  const pageCount = Math.ceil(totalData / limit)

  return (
    <>
      <div className="text-neutral-primary-text">
        Showing <span className="font-semibold">{firstItemIndex}</span> to{' '}
        <span className="font-semibold">
          {totalData < lastItemIndex ? totalData : lastItemIndex}
        </span>{' '}
        of <span className="font-semibold">{totalData}</span> data
      </div>
      <nav aria-label="Pagination" className="mt-4 md:m-0">
        {!hidePerPage && (
          <span className="self-end">
            <span>Items per page: </span>
            <select
              value={limit}
              onChange={(e) => handleLimit(e.target.value)}
              className="border px-1 h-8 mx-2 border-gray-300"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </span>
        )}
        <ReactPaginate
          pageClassName="mx-2"
          className="inline-flex -space-x-px text-md"
          pageCount={Math.max(1, pageCount)}
          onPageChange={onPageChange}
          nextLabel={<FaChevronRight className="h-5 w-5" />}
          previousLabel={<FaChevronLeft className="h-5 w-5" />}
          breakLabel={<FaEllipsisH />}
          nextLinkClassName="flex items-center justify-center px-[15px] py-[20px] h-8 leading-tight text-[#7F7F80] hover:text-[#2671D9]"
          previousLinkClassName="flex items-center justify-center px-[15px] py-[20px] h-8 ms-0 leading-tight text-[#7F7F80] hover:text-[#2671D9]"
          pageLinkClassName="flex items-center justify-center px-[15px] py-[20px] h-8 leading-tight no-underline hover:bg-gray-100 hover:text-gray-700"
          breakLinkClassName="flex items-center justify-center px-[15px] py-[20px] h-8 leading-tight no-underline hover:bg-gray-100 hover:text-gray-700"
          forcePage={currentPage > pageCount ? null : currentPage - 1}
          activeLinkClassName="z-10 flex items-center justify-center rounded-md px-[15px] h-8 leading-tight text-white bg-[#2671D9] no-underline"
          disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
          disabledLinkClassName="opacity-50 cursor-not-allowed pointer-events-none"
        />
      </nav>
    </>
  )
}
