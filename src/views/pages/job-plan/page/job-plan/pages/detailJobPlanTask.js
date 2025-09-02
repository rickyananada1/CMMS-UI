import React from 'react'
import { CRow, CCol, CFormLabel } from '@coreui/react'
import moment from 'moment'

const detailJobPlanTask = ({ row }) => {
  const data = row?.original

  return (
    <div className="p-5">
      <div className="col-12">
        <CRow>
          <CCol md={12}>
            <h5 className="w-full font-semibold">Details</h5>
          </CCol>
          {/* START::Task Information */}
          <div className="flex items-center mt-2 justify-between">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Task Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Sequence</CFormLabel>
            <br />
            <span className="font-semibold">{data?.sequence ? data?.sequence : '-'}</span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Task</CFormLabel>
            <br />
            <span className="font-semibold">{data?.task ? data?.task : '-'}</span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Task Description</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.summary ? data?.summary : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Status</CFormLabel>
            <br />
            <span className="font-semibold">{data?.status ? data?.status : '-'}</span>
          </CCol>
          {/* END::Task Information */}

          {/* START::Work Reference Information */}
          <div className="flex items-center mt-2 justify-between">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Work Reference Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Location</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.location ? data?.location : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Location Description</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.location_description ? data?.location_description : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Asset</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.asset_num ? data?.asset_num : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Asset Description</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.asset_description ? data?.asset_description : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Inspector</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.inspector ? data?.inspector : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Measurement Point</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.measurement_point ? data?.measurement_point : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Measurement Value</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.measurement_value ? data?.measurement_value : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Measurement Date</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.measurement_date
                ? moment(data?.measurement_date).format('YYYY-MM-DD hh:mm:ss')
                : '-'}
            </span>
          </CCol>
          {/* END::Work Reference Information */}

          {/* START:Scheduling Information */}
          <div className="flex items-center mt-2 justify-between">
            <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
              Scheduling Information
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Target Start</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.target_start ? moment(data?.target_start).format('YYYY-MM-DD hh:mm:ss') : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Target Finish</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.target_finish
                ? moment(data?.target_finish).format('YYYY-MM-DD hh:mm:ss')
                : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Scheduled Start</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.scheduled_start
                ? moment(data?.scheduled_start).format('YYYY-MM-DD hh:mm:ss')
                : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Scheduled Finish</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.scheduled_finish
                ? moment(data?.scheduled_finish).format('YYYY-MM-DD hh:mm:ss')
                : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Start No Earlier Than</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.start_no_earlier_than
                ? moment(data?.start_no_earlier_than).format('YYYY-MM-DD hh:mm:ss')
                : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Finish No Earlier Than</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.finish_no_later_than
                ? moment(data?.finish_no_later_than).format('YYYY-MM-DD hh:mm:ss')
                : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Actual Start</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.actual_start ? moment(data?.actual_start).format('YYYY-MM-DD hh:mm:ss') : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Actual Finish</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.actual_finish
                ? moment(data?.actual_finish).format('YYYY-MM-DD hh:mm:ss')
                : '-'}
            </span>
          </CCol>
          <CCol sm={12} md={4} className="mb-3">
            <CFormLabel>Estimated Duration</CFormLabel>
            <br />
            <span className="font-semibold text-capitalize">
              {data?.estimated_duration
                ? `${moment.duration(data.estimated_duration, 'minutes').hours()} hours ${moment
                    .duration(data.estimated_duration, 'minutes')
                    .minutes()} minutes`
                : 0}
            </span>
          </CCol>
          {/* END:Scheduling Information */}
        </CRow>
      </div>
    </div>
  )
}

export default detailJobPlanTask
