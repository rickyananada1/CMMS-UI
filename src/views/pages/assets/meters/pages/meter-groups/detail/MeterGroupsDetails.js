import React from 'react'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import useGroups from './hooks/useMeterGroups'
import { CCol, CContainer, CFormLabel, CRow, CSpinner } from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import DataTable from 'react-data-table-component'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = ({ data }) => {
  return (
    <CContainer fluid className="mx-5 my-4">
      <CRow>
        <h5 className="font-semibold">Details</h5>
      </CRow>
      <CRow className="mt-3">
        <CCol>
          <CFormLabel>Sequence</CFormLabel>
          <br />
          <span className="font-semibold">{data?.sequence ?? '-'}</span>
        </CCol>
        <CCol>
          <CFormLabel>Meter</CFormLabel>
          <br />
          <span className="font-semibold">{data?.meter_name ?? '-'}</span>
        </CCol>
        <CCol>
          <CFormLabel>Description</CFormLabel>
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
          <CFormLabel>Meter Rollover</CFormLabel>
          <br />
          <span className="font-semibold">{data?.meter_rollover ?? '-'}</span>
        </CCol>
        <CCol>
          <CFormLabel>Average Calculation Method</CFormLabel>
          <br />
          <span className="font-semibold">{data?.average_calculation_method ?? '-'}</span>
        </CCol>
        <CCol>
          <CFormLabel>Unit of Meassure</CFormLabel>
          <br />
          <span className="font-semibold">{data?.uom_name ?? '-'}</span>
        </CCol>
        <CCol>
          <CFormLabel>Domain</CFormLabel>
          <br />
          <span className="font-semibold">{data?.domain ?? '-'}</span>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol sm={3}>
          <CFormLabel>Sliding Window Size</CFormLabel>
          <br />
          <span className="font-semibold">{data?.sliding_window_size ?? '-'}</span>
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Static Average</CFormLabel>
          <br />
          <span className="font-semibold">{data?.static_average ?? '-'}</span>
        </CCol>
        <CCol sm={6}>
          <CFormLabel>Apply this meter where group is used?</CFormLabel>
          <br />
          <img
            src={data?.apply_meter ? CheckTag : XTag}
            width={15}
            height={15}
            alt={data?.apply_meter}
          />
        </CCol>
      </CRow>
    </CContainer>
  )
}

const MeterGroupsDetails = ({ mode, setAction, setTabIndex }) => {
  const {
    data,
    isLoading,
    // selectedRow,
  } = useGroups({ mode, setAction, setTabIndex })

  return (
    <DetailCard isLoading={isLoading} className="p-0 mb-0">
      <CardHeader
        description={data?.meter_group?.description}
        infoFields={[{ label: 'Meter Group', value: data?.meter_group?.meter_group }]}
      />
      <hr />
      <CContainer fluid>
        <div className="mt-3 border border-solid rounded">
          <DataTable
            columns={columns}
            data={data?.meter_in_groups}
            pagination
            // paginationServer
            // paginationTotalRows={totalPage}
            // onChangeRowsPerPage={handlePerRowsChange}
            // onChangePage={handlePageChange}
            expandableRows={true}
            expandableRowsComponent={ExpandedComponent}
            progressPending={isLoading}
            progressComponent={
              <div className="m-3">
                <CSpinner color="primary" />
              </div>
            }
          />
        </div>
      </CContainer>
    </DetailCard>
  )
}

const columns = [
  {
    name: 'Sequence',
    selector: (row) => row?.sequence ?? '-',
    sortable: true,
    filterable: true,
  },
  {
    name: 'Meter',
    selector: (row) => row?.meter_name ?? '-',
    sortable: true,
    filterable: true,
  },
  {
    name: 'Description',
    selector: (row) => row?.meter_description ?? '-',
    sortable: true,
    filterable: true,
  },
  {
    name: 'Meter Type',
    selector: (row) => row?.meter_type ?? '-',
    sortable: true,
    filterable: true,
    style: { textTransform: 'capitalize' },
  },
  {
    name: 'Unit of Measure',
    selector: (row) => row?.uom_name ?? '-',
    sortable: true,
    filterable: true,
  },
]

export default MeterGroupsDetails
