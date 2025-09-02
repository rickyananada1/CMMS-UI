import React from 'react'
import useRecentReport from '../hooks/useRecentReport'
import { GoSearch } from 'react-icons/go'
import { CSpinner } from '@coreui/react'

const RecentReport = () => {
  const {
    dataRecentReports,
    isLoading,
    search,
    colorStatus,
    baseDelay,
    handleSearch,
    lastItemRef,
  } = useRecentReport()

  return (
    <div className="recent-report-container px-3 pt-2 pb-3 gap-2">
      <div className="flex items-center justify-between">
        <p className="mb-0 text-base text-neutral-text-field text-nowrap font-normal">
          Recent Report
        </p>
        <hr className="w-full ml-2 h-[1px] bg-neutral-stroke"></hr>
      </div>
      <div className="flex items-center border rounded border-solid bg-white">
        <input
          placeholder="Search..."
          className="border-none py-2 px-3 rounded w-full"
          type="text"
          onChange={(e) => handleSearch(e)}
          value={search}
        />
        <div className="px-3">
          <GoSearch color="blue" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-1 overflow-auto recent-report-list">
        {dataRecentReports.map((report, index) => (
          <div
            className="recent-report-item flex flex-col bg-white px-3 py-2 rounded"
            key={index}
            style={{ animationDelay: `${index.indexDelay * baseDelay}s` }}
            ref={dataRecentReports.length === index + 1 ? lastItemRef : null}
          >
            <div className="flex justify-between w-full">
              <div className="font-bold">{report?.ticket_id}</div>
              <div className="flex items-center gap-1">
                <span className={`recent-report-dot bg-${colorStatus[report?.status]}`}></span>
                <span className={`text-${colorStatus[report?.status]} text-sm`}>
                  {report?.status}
                </span>
              </div>
            </div>
            <div className="text-cmms-grey text-sm">Summary : {report?.description}</div>
          </div>
        ))}

        {isLoading && dataRecentReports.length > 0 && (
          <div className="flex justify-center items-center my-2 text-gray-600">
            <CSpinner size="sm" color="primary" />
            <span className="ml-2">Loading more...</span>
          </div>
        )}

        {isLoading && dataRecentReports.length === 0 && (
          <div className="flex justify-center my-4">
            <CSpinner color="primary" />
          </div>
        )}

        {!isLoading && dataRecentReports.length === 0 && (
          <div className="text-center text-primary my-4">Data Not Found</div>
        )}
      </div>
    </div>
  )
}

export default RecentReport
