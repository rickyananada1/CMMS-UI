import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import { Table } from 'src/components/elements/table'
import { useGetConditionMonitoring } from './services'
import useConditionMonitoring from './hooks/useConditionMonitoringList'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import { useDeleteCM } from '../cm/services'

const columns = [
  {
    header: 'Point',
    accessorKey: 'point_num',
    qName: 'qPointNum',
  },
  {
    header: 'Description',
    accessorKey: 'point_description',
    qName: 'qPointDesc',
  },
  {
    header: 'Location',
    accessorKey: 'location',
    qName: 'qLocation',
  },
  {
    header: 'Asset',
    accessorKey: 'asset_num',
    qName: 'qAssetNum',
  },
  {
    header: 'Meter',
    accessorKey: 'meter_name',
    qName: 'qMeterName',
  },
  {
    header: 'Site',
    accessorKey: 'site',
    qName: 'qSite',
  },
]

const ConditionMonitoringList = ({ mode, setAction, setTabIndex }) => {
  const {
    selectedRow,
    setSelectedRow,
    tableRef,
    handleSearch,
    searchDebounce,
    downloadConditionMonitoring,
  } = useConditionMonitoring()

  return (
    <div>
      <div className="bg-white p-4 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
              <input
                placeholder="Search"
                className="border-none text-sm"
                type="text"
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
              <GoSearch color="blue" />
            </div>
            <button className="flex items-center border rounded border-solid px-3 py-2 text-sm hidden">
              <CiFilter className="mr-2" color="blue" />
              Filter
            </button>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadConditionMonitoring}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetConditionMonitoring}
          query={{
            qAll: searchDebounce || undefined,
          }}
          selectableRowSelected={(row) =>
            row.original?.condition_monitoring_id === selectedRow?.condition_monitoring_id
          }
          onRowClicked={(row) => {
            setSelectedRow(row.original)
          }}
          isAutoSelectFirstRow={false}
          isWithSearchField
          hasAutoNumber
        />
      </div>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setTabIndex={setTabIndex}
          setSelectedRow={setSelectedRow}
          data_id={selectedRow?.condition_monitoring_id}
          data_name={selectedRow?.point_num}
          deleteService={useDeleteCM}
          tableRef={tableRef}
          deleteBody={{ condition_monitoring_ids: [selectedRow?.condition_monitoring_id] }}
        />
      )}
    </div>
  )
}

export default ConditionMonitoringList
