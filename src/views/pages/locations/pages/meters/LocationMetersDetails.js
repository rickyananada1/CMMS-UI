import { CCol, CContainer, CFormLabel, CRow, CSpinner } from '@coreui/react'
import React, { Fragment } from 'react'

const LocationMetersDetails = ({ row, CheckTag, XTag, editData, deleteData }) => {
  const data = row?.original
  return (
    <CContainer className="my-3 px-5">
      {data?.finished_loading || data?.is_error ? (
        <Fragment>
          <CRow>
            <CCol>
              <h5 className="font-semibold">Details</h5>
            </CCol>
          </CRow>
          <div className="flex items-center mt-2 justify-between">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Meters Details
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow className="mt-2">
            <CCol>
              <CFormLabel>Sequence</CFormLabel>
              <br />
              <span className="font-semibold">{data?.sequence ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Meter</CFormLabel>
              <br />
              <span className="font-semibold">{data?.meter ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Meter Description</CFormLabel>
              <br />
              <span className="font-semibold">{data?.meter_description ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Meter Type</CFormLabel>
              <br />
              <span className="font-semibold capitalize">{data?.meter_type ?? '-'}</span>
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <CFormLabel>Unit of Measure</CFormLabel>
              <br />
              <span className="font-semibold">{data?.uom ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Active</CFormLabel>
              <br />
              <img
                src={data?.is_active ? CheckTag : XTag}
                width={15}
                height={15}
                alt={data?.is_active}
              />
            </CCol>
            <CCol>
              <CFormLabel>Point</CFormLabel>
              <br />
              <span className="font-semibold">{data?.point ?? '-'}</span>
            </CCol>
            <CCol></CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <CFormLabel>Last Reading</CFormLabel>
              <br />
              <span className="font-semibold">{data?.reading || '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Last Reading Date</CFormLabel>
              <br />
              <span className="font-semibold">{data?.reading_date ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Last Reading Inspector</CFormLabel>
              <br />
              <span className="font-semibold">{data?.reading_inspector ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Remarks</CFormLabel>
              <br />
              <span className="font-semibold">{data?.remarks || '-'}</span>
            </CCol>
          </CRow>
          <div className="flex items-center mt-2 justify-between">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Continuous Meter Details
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CRow className="mt-2">
            <CCol>
              <CFormLabel>Average Calculation Method</CFormLabel>
              <br />
              <span className="font-semibold">{data?.average_calculation_method || '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Sliding Window Size</CFormLabel>
              <br />
              <span className="font-semibold">{data?.sliding_window_size || '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Average Units/day</CFormLabel>
              <br />
              <span className="font-semibold">{data?.static_average ?? '-'}</span>
            </CCol>
            <CCol></CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol>
              <CFormLabel>Life to Date for Location</CFormLabel>
              <br />
              <span className="font-semibold">{data?.life_to_date_for_location ?? '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Rollover</CFormLabel>
              <br />
              <span className="font-semibold">{data?.meter_rollover || '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Reading Type</CFormLabel>
              <br />
              <span className="font-semibold">{data?.reading_type || '-'}</span>
            </CCol>
            <CCol>
              <CFormLabel>Accept Rolldown From</CFormLabel>
              <br />
              <span className="font-semibold">{data?.accept_rolldown_from || '-'}</span>
            </CCol>
          </CRow>
        </Fragment>
      ) : (
        <div className="flex justify-center">
          <CSpinner color="primary" className="my-4" />
        </div>
      )}
    </CContainer>
  )
}

export default LocationMetersDetails
