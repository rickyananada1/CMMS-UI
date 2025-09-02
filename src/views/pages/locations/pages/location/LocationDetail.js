import React, { Fragment } from 'react'
import useDetailLocation from './hooks/useDetailLocation'
import { CCol, CContainer, CRow } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { Table, TableClient } from 'src/components/elements/table'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useGetLocationChild } from './services'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { GoSearch } from 'react-icons/go'
import { MdOutlineCloudDownload } from 'react-icons/md'
import CardHeader from 'src/components/elements/cards/CardHeader'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'
import { FaPaperclip } from 'react-icons/fa'

const ExpandedComponentParents = (row) => {
  const data = row?.row?.original
  return (
    <div className="px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="text-slate-400">Parent</label>
          <p className="font-bold">{data.location ? data.location : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Description</label>
          <p className="font-bold">{data.location_description ? data.location_description : '-'}</p>
        </div>
      </div>
    </div>
  )
}

const ExpandedComponentChild = (row) => {
  const data = row?.row?.original
  return (
    <div className="px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="text-slate-400">Location</label>
          <p className="font-bold">{data.location ? data.location : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Description</label>
          <p className="font-bold">{data.location_description ? data.location_description : '-'}</p>
        </div>
      </div>
    </div>
  )
}

const columnsParent = (handleDeleteParent) => {
  return [
    {
      header: ' ',
      size: 10,
      id: 'toggle-parent',
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
      header: 'Parent',
      accessorKey: 'location',
    },
    {
      header: 'Description',
      accessorKey: 'location_description',
    },
    {
      header: 'Action',
      id: 'action-parent',
      size: 10,
      cell: ({ row }) => {
        return (
          <button
            style={{ cursor: 'pointer', padding: '10px' }}
            onClick={() => handleDeleteParent(row?.original)}
          >
            <CIcon icon={cilTrash} customClassName="w-5 h-5 text-red-main" />
          </button>
        )
      },
    },
  ]
}

const columnsChild = (handleDeleteChild) => {
  return [
    {
      header: ' ',
      size: 10,
      id: 'toggle-child',
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
      header: 'Location',
      accessorKey: 'location',
    },
    {
      header: 'Description',
      accessorKey: 'location_description',
    },
    {
      header: 'Action',
      id: 'action-child',
      size: 10,
      cell: ({ row }) => {
        return (
          <button
            style={{ cursor: 'pointer', padding: '10px' }}
            onClick={() => handleDeleteChild(row?.original)}
          >
            <CIcon icon={cilTrash} customClassName="w-5 h-5 text-red-main" />
          </button>
        )
      },
    },
  ]
}

const LocationDetail = ({
  mode,
  setAction,
  setTabIndex,
  setVisiblePopUpLocationParent,
  setVisiblePopUpLocationChild,
  isRefetchDetailLocation,
  setIsRefetchDetailLocation,
  isRefetchChildLocation,
  setIsRefetchChildLocation,
}) => {
  const {
    tableChildrenRef,
    data,
    parentData,
    isLoading,
    selectedRow,
    handleDeleteParent,
    handleDeleteChild,
    handleSearch,
    searchDebounce,
    downloadLocationChildren,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useDetailLocation({
    mode,
    setAction,
    setTabIndex,
    setVisiblePopUpLocationParent,
    setVisiblePopUpLocationChild,
    isRefetchDetailLocation,
    setIsRefetchDetailLocation,
    isRefetchChildLocation,
    setIsRefetchChildLocation,
  })

  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={selectedRow?.location_description}
          infoFields={[
            { label: 'Location', value: selectedRow?.location },
            { label: 'Site', value: selectedRow?.site },
          ]}
        />
        <hr />
        <CContainer fluid>
          <CRow className="mt-4">
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Location</label>
              <br />
              <span className="font-semibold">{data?.location ? data?.location : '-'}</span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Description</label>
              <br />
              <span className="font-semibold">
                {data?.location_description ? data?.location_description : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Type</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.location_type ? data?.location_type : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Rotating Item</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.rotating_item ? data?.rotating_item : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Description Rotating Item</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.rotating_item_description ? data?.rotating_item_description : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Meter Group</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.meter_group ? data?.meter_group : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Description Meter Group</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.description ? data?.description : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Calendar</label>
              <br />
              <span className="font-semibold">
                {data?.location_special_date ? data?.location_special_date : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Shift</label>
              <br />
              <span className="font-semibold">{data?.shift ? data?.shift : '-'}</span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Site</label>
              <br />
              <span className="font-semibold">{data?.site ? data?.site : '-'}</span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Priority</label>
              <br />
              <span className="font-semibold">
                {data?.location_priority ? data?.location_priority : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Failure Class</label>
              <br />
              <span className="font-semibold">
                {data?.failure_class ? data?.failure_class : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">GL Account</label>
              <br />
              <span className="font-semibold">{data?.gl_account ? data?.gl_account : '-'}</span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Internal Labor Account</label>
              <br />
              <span className="font-semibold">{data?.labor ? data?.labor : '-'}</span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Status</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.location_status ? data?.location_status : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Address</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.address ? data?.address : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Bill to Address</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.bill_to ? data?.bill_to : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Ship to Address</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.ship_to ? data?.ship_to : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Hazard Group</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.hazard_group ? data?.hazard_group : '-'}
              </span>
            </CCol>
            <CCol sm={12} md={3} className="mb-3">
              <label className="text-neutral-text-field">Hazard Group Description</label>
              <br />
              <span className="font-semibold text-capitalize">
                {data?.hazard_group_description ? data?.hazard_group_description : '-'}
              </span>
            </CCol>
          </CRow>
          <CCol md={12} className="mb-3">
            <label className="text-neutral-text-field mb-2">Attachments</label>
            <button
              onClick={handleOpenDrawer}
              className="flex items-center gap-1 text-[#2c74d6] hover:text-[#1b4a89] text-base font-medium underline"
            >
              <FaPaperclip className="w-4 h-4" />
              Attachments
            </button>
          </CCol>
        </CContainer>
        <hr />
        <h4 className="w-full font-semibold">Location’s Parent</h4>
        <div>
          <TableClient
            columns={columnsParent(handleDeleteParent)}
            content={parentData}
            canExpand={true}
            tableSubComponent={ExpandedComponentParents}
          />
        </div>
        <hr />
        <h4 className="w-full font-semibold">Location’s Child</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center px-4 py-2 mr-2 border border-solid rounded">
              <input
                placeholder="Search"
                className="text-sm border-none"
                type="text"
                onChange={(e) => {
                  handleSearch(e)
                }}
              />
              <GoSearch color="blue" />
            </div>
          </div>
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadLocationChildren}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <div>
          <Table
            tableRef={tableChildrenRef}
            columns={columnsChild(handleDeleteChild)}
            parentId={selectedRow?.location_id}
            apiController={useGetLocationChild}
            query={{
              q: searchDebounce || undefined,
            }}
            canExpand={true}
            tableSubComponent={ExpandedComponentChild}
          />
        </div>
      </DetailCard>

      <AttachmentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        files={dataFile}
        selectedFile={selectedFile}
        onSelectFile={(file) => setSelectedFile(file)}
      />
    </>
  )
}

export default LocationDetail
