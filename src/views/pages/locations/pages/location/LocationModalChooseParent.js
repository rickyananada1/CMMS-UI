import React, { Fragment } from 'react'
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react'
import useChooseParentLocation from './hooks/useChooseParentLocation'
import { Form, Formik } from 'formik'
import { Table } from 'src/components/elements/table'
import { useGetLocations } from '../list/services'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GoSearch } from 'react-icons/go'

const ExpandedComponent = (row) => {
  const data = row?.row?.original
  return (
    <div className="px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-3 my-3">
        <div>
          <label className="text-slate-400">Location</label>
          <p className="font-bold">{data.location ? data.location : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Description</label>
          <p className="font-bold">{data.location_description ? data.location_description : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Type</label>
          <p className="font-bold capitalize">{data.location_type ? data.location_type : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Status</label>
          <p className="font-bold capitalize">
            {data.location_status ? data.location_status : '-'}
          </p>
        </div>
        <div>
          <label className="text-slate-400">Priority</label>
          <p className="font-bold">{data.location_priority ? data.location_priority : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Site</label>
          <p className="font-bold">{data.site ? data.site : '-'}</p>
        </div>
      </div>
    </div>
  )
}

const columns = [
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
    header: 'Location',
    accessorKey: 'location',
  },
  {
    header: 'Description',
    accessorKey: 'location_description',
  },
]

const LocationModalChooseParent = ({
  mode,
  setAction,
  setTabIndex,
  visiblePopUpLocationParent,
  setVisiblePopUpLocationParent,
  setIsRefetchDetailLocation,
}) => {
  const { tableRef, formValue, searchDebounce, selectedRow, handleSubmit, handleSearch } =
    useChooseParentLocation({
      mode,
      setTabIndex,
      setAction,
      visiblePopUpLocationParent,
      setVisiblePopUpLocationParent,
      setIsRefetchDetailLocation,
    })
  return (
    <CModal
      alignment="center"
      size="lg"
      visible={visiblePopUpLocationParent}
      onClose={() => setVisiblePopUpLocationParent(false)}
    >
      <Formik enableReinitialize initialValues={formValue} onSubmit={handleSubmit}>
        {({ isSubmitting, values, setFieldValue }) => {
          return (
            <Form>
              <CModalHeader>
                <CModalTitle>Choose Parent Location</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <div className="d-flex flex-column border-l-[4px] border-primary-main rounded-sm mb-2">
                  <p className="ms-2 font-semibold text-body-medium mb-0">
                    {selectedRow?.location ?? '-'}
                  </p>
                  <p className="ms-2 text-body-medium mb-0">
                    <span className="font-light">Site : </span>
                    <span className="font-semibold">{selectedRow?.site ?? '-'}</span>
                  </p>
                </div>
                <hr />
                <div className="d-flex flex-column border-l-[4px] border-orange-border rounded-sm mb-2">
                  <p className="ms-2 font-semibold mb-0">
                    You can’t assign location as a parent, if you have assigned the location as a
                    child in the same location.
                  </p>
                </div>
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
                  </div>
                </div>
                <Table
                  tableRef={tableRef}
                  columns={columns}
                  apiController={useGetLocations}
                  query={{
                    search: searchDebounce || undefined,
                    qExcludedLocationId: selectedRow?.location_id,
                    qAddLocationType: 'parent',
                  }}
                  selectableRowSelected={(row) =>
                    row.original?.location_id === values?.parent_id?.location_id
                  }
                  onRowClicked={(row) => {
                    setFieldValue('parent_id', row?.original)
                  }}
                  canExpand={true}
                  tableSubComponent={ExpandedComponent}
                  hasAutoNumber
                />
              </CModalBody>
              <CModalFooter>
                <CButton
                  type="submit"
                  color="primary"
                  className="hover:text-white"
                  disabled={isSubmitting || !values?.parent_id}
                >
                  Submit
                </CButton>
                <CButton
                  color=""
                  onClick={() => {
                    setVisiblePopUpLocationParent(false)
                  }}
                >
                  <span className="text-[#2671D9]">Cancel</span>
                </CButton>
              </CModalFooter>
            </Form>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default LocationModalChooseParent
