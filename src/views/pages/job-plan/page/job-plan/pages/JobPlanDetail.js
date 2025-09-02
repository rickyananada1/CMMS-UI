import React from 'react'
import moment from 'moment'
import { Fragment } from 'react'
import { CContainer, CRow, CCol } from '@coreui/react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { DetailCard } from 'src/components/elements/cards'
import { Table } from 'src/components/elements/table'
import useJobPlanDetail from '../hooks/useJobPlanDetail'
import StatusJobPlanComponent from '../../list/StatusJobPlanComponent'

import {
  useDeleteJobPlanTask,
  useDeleteJobPlanLabor,
  useDeleteJobPlanMaterial,
  useDeleteJobPlanTool,
  useGetDetailJobPlanLabor,
  useGetDetailJobPlanMaterial,
  useGetDetailJobPlanTask,
  useGetDetailJobPlanTool,
} from '../services'
import { GoSearch } from 'react-icons/go'
import detailJobPlanTask from './detailJobPlanTask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import { currencyFormat } from 'src/utils/helper'
import CardHeader from 'src/components/elements/cards/CardHeader'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'
import { FaPaperclip } from 'react-icons/fa'

const JobPlanDetail = ({ mode, setAction, setTabIndex }) => {
  const columnsJobPlanTask = [
    {
      header: ' ',
      size: 10,
      cell: ({ row }) => {
        return (
          <Fragment>
            {row.getCanExpand() && (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer', padding: '10px' },
                }}
              >
                {row.getIsExpanded() ? (
                  <IoIosArrowUp className="w-5 h-5" />
                ) : (
                  <IoIosArrowDown className="w-5 h-5" />
                )}
              </button>
            )}
          </Fragment>
        )
      },
    },
    {
      header: 'Sequence',
      accessorKey: 'sequence',
      qName: 'qSequence',
    },
    {
      header: 'Task',
      accessorKey: 'task',
      qName: 'qTask',
    },
    {
      header: 'Summary',
      accessorKey: 'summary',
      qName: 'qSummary',
    },
    {
      header: 'Estimated Duration',
      accessorKey: 'estimated_duration',
      qName: 'qEstimatedDuration',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      qName: 'qStatus',
    },
  ]

  const columnsLabor = [
    {
      header: 'Task',
      accessorKey: 'task',
      qName: 'qTask',
    },
    {
      header: 'Labor',
      accessorKey: 'labor',
      qName: 'qLabor',
    },
    {
      header: 'Name',
      accessorKey: 'name',
      qName: 'qName',
    },
    {
      header: 'Start Date',
      accessorKey: 'start_date',
      qName: 'qStartDate',
      cell: ({ getValue }) => {
        const date = getValue()
        if (!date) return '-'
        return moment(date).format('DD/MM/YYYY')
      },
    },
    {
      header: 'Regular Hours',
      accessorKey: 'regular_hours',
      enableSorting: false,
      qName: 'qRegularHours',
      meta: {
        className: 'text-center',
      },
      cell: ({ row }) => (
        <div className="text-center truncate">{`${row?.original?.regular_hours}` ?? '-'}</div>
      ),
    },
    {
      header: 'Rate',
      accessorKey: 'rate',
      qName: 'qRate',
      cell: ({ getValue }) => {
        const value = getValue()
        return (
          <div className="truncate text-end">{value !== null ? currencyFormat(value) : '-'}</div>
        )
      },
    },
    {
      header: 'Line Cost',
      accessorKey: 'line_cost',
      qName: 'qLineCost',
      cell: ({ getValue }) => {
        const value = getValue()
        return (
          <div className="truncate text-end">{value !== null ? currencyFormat(value) : '-'}</div>
        )
      },
    },
  ]

  const columnsMaterial = [
    { header: 'Task', accessorKey: 'task', qName: 'qTask' },
    { header: 'Item', accessorKey: 'item', qName: 'qItem' },
    { header: 'Description', accessorKey: 'description', qName: 'qDescription' },
    { header: 'Issue Unit', accessorKey: 'issue_unit', qName: 'qIssueUnit' },
    { header: 'Storeroom', accessorKey: 'store_room', qName: 'qStoreRoom' },
    { header: 'Quantity', accessorKey: 'quantity', qName: 'qQuantity' },
    {
      header: 'Unit Cost',
      accessorKey: 'unit_cost',
      qName: 'qUnitCost',
      cell: ({ getValue }) => {
        const value = getValue()
        return (
          <div className="truncate text-end">{value !== null ? currencyFormat(value) : '-'}</div>
        )
      },
    },
    {
      header: 'Line Cost',
      accessorKey: 'line_cost',
      qName: 'qLineCost',
      cell: ({ getValue }) => {
        const value = getValue()
        return (
          <div className="truncate text-end">{value !== null ? currencyFormat(value) : '-'}</div>
        )
      },
    },
  ]

  const columnsTools = [
    {
      header: 'Task',
      accessorKey: 'task',
      enableSorting: false,
      qName: 'qTask',
      cell: ({ row }) => (
        <div className="truncate">
          {row?.original?.work_order_task || row?.original?.task || '-'}
        </div>
      ),
    },
    {
      header: 'Tool',
      accessorKey: 'tool',
      enableSorting: false,
      qName: 'qTool',
    },
    {
      header: 'Description',
      accessorKey: 'description',
      enableSorting: false,
      qName: 'qDescription',
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      enableSorting: false,
      qName: 'qQuantity',
      meta: {
        className: 'text-center',
      },
      cell: ({ row }) => (
        <div className="text-center truncate">
          {row?.original?.quantity ? row?.original?.quantity : '-'}
        </div>
      ),
    },
    {
      header: 'Unit Cost',
      accessorKey: 'unit_cost',
      enableSorting: false,
      qName: 'qUnitCost',
      meta: {
        className: 'text-end',
      },
      cell: ({ row }) => (
        <div className="truncate text-end">
          {row?.original?.unit_cost !== null ? currencyFormat(row?.original?.unit_cost) : '-'}
        </div>
      ),
    },
    {
      header: 'Line Cost',
      accessorKey: 'line_cost',
      enableSorting: false,
      qName: 'qLineCost',
      meta: {
        className: 'text-end',
      },
      cell: ({ row }) => (
        <div className="truncate text-end">
          {row?.original?.line_cost !== null ? currencyFormat(row?.original?.line_cost) : '-'}
        </div>
      ),
    },
  ]

  const {
    data,
    dataFile,
    isLoading,
    selectedRow,
    tableRefTask,
    tableRefLabor,
    tableRefMaterial,
    tableRefTools,
    handleSearchTask,
    handleSearchLabor,
    handleSearchMaterial,
    handleSearchTool,
    searchTaskDebounce,
    searchLaborDebounce,
    searchMaterialDebounce,
    searchToolDebounce,
    selectedTaskRow,
    selectedLaborRow,
    selectedMaterialRow,
    selectedToolRow,
    setSelectedLaborRow,
    setSelectedTaskRow,
    setSelectedToolRow,
    setSelectedMaterialRow,
    downloadJobPlanTask,
    downloadJobPlanLabor,
    downloadJobPlanMaterial,
    downloadJobPlanTool,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useJobPlanDetail({ mode, setTabIndex })

  return (
    <Fragment>
      <DetailCard isLoading={isLoading} title="Job Plan">
        <CContainer fluid>
          <CardHeader
            description={data?.plan_description}
            infoFields={[
              { label: 'Job Plan', value: data?.job_plan },
              { label: 'Organization', value: data?.organization },
              { label: 'Site', value: data?.site },
            ]}
          />
          <hr />
          <CRow>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Job Plan</label>
              <br />
              <span className="font-semibold">{data?.job_plan !== '' ? data?.job_plan : '-'}</span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Job Plan Description</label>
              <br />
              <span className="font-semibold">
                {data?.plan_description !== '' ? data?.plan_description : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Organization</label>
              <br />
              <span className="font-semibold">
                {data?.organization !== '' ? data?.organization : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Site</label>
              <br />
              <span className="font-semibold">{data?.site !== '' ? data?.site : '-'}</span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field mb-2">Status</label>
              <br />
              <StatusJobPlanComponent status={data?.status} />
            </CCol>
          </CRow>
          <CRow className="my-3">
            <CCol md={12} className="mb-3">
              <label className="text-neutral-text-field">Attachments</label>
              <button
                onClick={handleOpenDrawer}
                className="flex items-center gap-1 text-[#2c74d6] hover:text-[#1b4a89] text-base font-medium underline"
              >
                <FaPaperclip className="w-4 h-4" />
                Attachments
              </button>
            </CCol>
          </CRow>
          <div className="mt-4">
            <hr />
            <CCol md={12} className="my-3">
              <h5 className="w-full font-semibold">Job Plan Tasks</h5>
            </CCol>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
                  <input
                    placeholder="Search"
                    className="border-none text-sm"
                    type="text"
                    onChange={(e) => {
                      handleSearchTask(e)
                    }}
                  />
                  <GoSearch color="blue" />
                </div>
              </div>
              <button
                className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
                onClick={downloadJobPlanTask}
              >
                <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
                Download
              </button>
            </div>
            <Table
              tableRef={tableRefTask}
              storeKey="jobplan-task"
              columns={columnsJobPlanTask}
              parentId={selectedRow?.job_plan_id}
              apiController={useGetDetailJobPlanTask}
              query={{
                q: searchTaskDebounce || undefined,
              }}
              canExpand={true}
              tableSubComponent={({ row }) => detailJobPlanTask({ row })}
              selectableRowSelected={(row) =>
                row.original?.work_order_task_id === selectedTaskRow?.work_order_task_id
              }
              onRowClicked={(row) => {
                setSelectedTaskRow(row.original)
              }}
              isWithSearchField
              isAutoSelectFirstRow={false}
            />
          </div>
          <div className="mt-4">
            <hr />
            <CCol md={12} className="my-3">
              <h5 className="w-full font-semibold">Labor</h5>
            </CCol>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
                  <input
                    placeholder="Search"
                    className="border-none text-sm"
                    type="text"
                    onChange={(e) => {
                      handleSearchLabor(e)
                    }}
                  />
                  <GoSearch color="blue" />
                </div>
              </div>
              <button
                className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
                onClick={downloadJobPlanLabor}
              >
                <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
                Download
              </button>
            </div>
            <Table
              tableRef={tableRefLabor}
              storeKey="jobplan-labor"
              columns={columnsLabor}
              parentId={selectedRow?.job_plan_id}
              apiController={useGetDetailJobPlanLabor}
              query={{
                q: searchLaborDebounce || undefined,
              }}
              selectableRowSelected={(row) =>
                row.original?.work_order_labor_id === selectedLaborRow?.work_order_labor_id
              }
              onRowClicked={(row) => {
                setSelectedLaborRow(row.original)
              }}
              isWithSearchField
              isAutoSelectFirstRow={false}
            />
          </div>
          <div className="mt-4">
            <hr />
            <CCol md={12} className="my-3">
              <h5 className="w-full font-semibold">Materials</h5>
            </CCol>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
                  <input
                    placeholder="Search"
                    className="border-none text-sm"
                    type="text"
                    onChange={(e) => {
                      handleSearchMaterial(e)
                    }}
                  />
                  <GoSearch color="blue" />
                </div>
              </div>
              <button
                className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
                onClick={downloadJobPlanMaterial}
              >
                <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
                Download
              </button>
            </div>
            <Table
              tableRef={tableRefMaterial}
              storeKey="jobplan-material"
              columns={columnsMaterial}
              parentId={selectedRow?.job_plan_id}
              apiController={useGetDetailJobPlanMaterial}
              query={{
                q: searchMaterialDebounce || undefined,
              }}
              selectableRowSelected={(row) =>
                row.original?.work_order_material_id === selectedMaterialRow?.work_order_material_id
              }
              onRowClicked={(row) => {
                setSelectedMaterialRow(row.original)
              }}
              isWithSearchField
              isAutoSelectFirstRow={false}
            />
          </div>
          <div className="mt-4">
            <hr />
            <CCol md={12} className="my-3">
              <h5 className="w-full font-semibold">Tools</h5>
            </CCol>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center border rounded border-solid px-4 py-2 mr-2">
                  <input
                    placeholder="Search"
                    className="border-none text-sm"
                    type="text"
                    onChange={(e) => {
                      handleSearchTool(e)
                    }}
                  />
                  <GoSearch color="blue" />
                </div>
              </div>
              <button
                className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
                onClick={downloadJobPlanTool}
              >
                <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
                Download
              </button>
            </div>
            <Table
              tableRef={tableRefTools}
              storeKey="jobplan-tool"
              columns={columnsTools}
              parentId={selectedRow?.job_plan_id}
              apiController={useGetDetailJobPlanTool}
              query={{
                q: searchToolDebounce || undefined,
              }}
              selectableRowSelected={(row) =>
                row.original?.work_order_tool_id === selectedToolRow?.work_order_tool_id
              }
              onRowClicked={(row) => {
                setSelectedToolRow(row.original)
              }}
              isAutoSelectFirstRow={false}
              isWithSearchField
            />
          </div>
        </CContainer>
      </DetailCard>
      {mode === 'DeleteJobPlanTask' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedTaskRow}
          data_id={selectedTaskRow?.work_order_task_id}
          data_name={selectedTaskRow?.task}
          deleteService={useDeleteJobPlanTask}
          tableRef={tableRefTask}
        />
      )}
      {mode === 'DeleteLabor' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedLaborRow}
          data_id={selectedLaborRow?.work_order_labor_id}
          data_name={selectedLaborRow?.labor}
          deleteService={useDeleteJobPlanLabor}
          tableRef={tableRefLabor}
        />
      )}
      {mode === 'DeleteMaterial' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedMaterialRow}
          data_id={selectedMaterialRow?.work_order_material_id}
          data_name={selectedMaterialRow?.sparepart_name}
          deleteService={useDeleteJobPlanMaterial}
          tableRef={tableRefMaterial}
        />
      )}
      {mode === 'DeleteTool' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedToolRow}
          data_id={selectedToolRow?.work_order_tool_id}
          data_name={selectedToolRow?.tool}
          deleteService={useDeleteJobPlanTool}
          tableRef={tableRefTools}
        />
      )}

      <AttachmentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        files={dataFile}
        selectedFile={selectedFile}
        onSelectFile={(file) => setSelectedFile(file)}
      />
    </Fragment>
  )
}

export default JobPlanDetail
