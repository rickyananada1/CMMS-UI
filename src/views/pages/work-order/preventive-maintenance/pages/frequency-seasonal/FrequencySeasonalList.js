import React from 'react'
import { Table } from 'src/components/elements/table'
import { FaCheck, FaCogs, FaHandPaper } from 'react-icons/fa'
import { RiCloseLargeLine } from 'react-icons/ri'
import { useGetFrequencySeasonalList } from './services'
import useFrequencySeasonalList from './hooks/useFrequencySeasonalList'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import moment from 'moment'
import CheckTag from 'src/assets/icons/check-tag.svg'
import XTag from 'src/assets/icons/x-tag.svg'
import CardHeader from 'src/components/elements/cards/CardHeader'

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const FrequencySeasonalList = ({ mode, setAction, setTabIndex }) => {
  const { tableRef, data, selectedRow, searchDebounce } = useFrequencySeasonalList({
    mode,
    setAction,
    setTabIndex,
  })

  const columns = [
    {
      header: 'Start Date',
      accessorKey: 'start_date',
      qName: 'qStartDate',
      qType: 'date',
      cell: (row) => {
        const isDateValid = moment(row.getValue()).isValid()
        const date = isDateValid ? moment(row.getValue()).format('DD/MM/YYYY') : '-'
        return <div style={{ width: `${row.column.getSize()}px` }}>{date}</div>
      },
    },
    {
      header: 'Work Order',
      accessorKey: 'work_order_code',
      qName: 'qWorkOrderCode',
    },
    {
      header: () => <div className="flex justify-center items-center">Type</div>,
      accessorKey: 'type',
      cell: (row) => (
        <div className="flex justify-center items-center">
          {row.getValue() === 'automatic' ? (
            <FaCogs size={24} title="Automatic" />
          ) : (
            <FaHandPaper size={24} title="Manual" />
          )}
        </div>
      ),
      qName: 'qType',
      qType: 'select',
      qOptions: [
        { label: 'Automatic', value: 'automatic' },
        { label: 'Manual', value: 'manual' },
      ],
    },
  ]

  return (
    <div>
      <CCard className="card-b-left">
        <CCardBody className="p-4">
          <CardHeader
            description={selectedRow?.preventive_maintenance_description}
            infoFields={[
              { label: 'PM', value: selectedRow?.preventive_maintenance_name },
              { label: 'Site', value: selectedRow?.site },
            ]}
          />
          <hr />
          <div className="border-2 border-solid border-[#E5E7E9] rounded-lg p-3">
            <h6 className="mb-3 font-semibold">Active Days</h6>
            <div className="flex items-center">
              {days.map((day) => {
                var dayBadge = <></>
                if (data[`working_day_${day}`]) {
                  dayBadge = (
                    <span
                      key={day}
                      className="bg-[#E9F1FB] text-[#2671D9] text-xs font-medium inline-flex items-center me-2 px-2.5 py-1 rounded-full border-1 border-[#BAD1F3] capitalize"
                    >
                      <FaCheck className="me-1" /> {day}
                    </span>
                  )
                } else {
                  dayBadge = (
                    <span
                      key={day}
                      className="bg-[#FFE5E6] text-[#FF5656] text-xs font-medium inline-flex items-center me-2 px-2.5 py-1 rounded-full border-1 border-[#FD8A8A] capitalize"
                    >
                      <RiCloseLargeLine className="me-1" /> {day}
                    </span>
                  )
                }
                return dayBadge
              })}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="mt-2 text-base font-normal text-neutral-text-field text-nowrap">
              Time Based Frequency
            </p>
            <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
          </div>
          <div>
            <CRow>
              <CCol>
                <label className="text-neutral-text-field">Frequency</label>
                <br />
                <span className="font-semibold">{data?.frequency || '-'}</span>
              </CCol>
              <CCol>
                <label className="text-neutral-text-field">Frequency Units</label>
                <br />
                <span className="font-semibold">{data?.frequency_unit || '-'}</span>
              </CCol>
              <CCol>
                <label className="text-neutral-text-field">Est Next Due Date</label>
                <br />
                <span className="font-semibold">
                  {data?.estimated_next_schedule
                    ? moment(data?.estimated_next_schedule).format('D/M/YY')
                    : '-'}
                </span>
              </CCol>
              <CCol>
                <label className="text-neutral-text-field">Auto-Creation of Work Orders?</label>
                <br />
                <img
                  className="mt-0.5"
                  src={data?.auto_create_work_order ? CheckTag : XTag}
                  width={20}
                  height={20}
                  alt={data?.auto_create_work_order}
                />
              </CCol>
            </CRow>
            <CRow className="my-3">
              <CCol md="3">
                <label className="text-neutral-text-field">Start Date</label>
                <br />
                <span className="font-semibold">{data?.start_date || '-'}&nbsp;</span>
                <span className="font-semibold uppercase">
                  {data?.start_month
                    ? moment()
                        .month(data?.start_month - 1)
                        .format('MMMM')
                    : '-'}
                </span>
              </CCol>
              <CCol md="3">
                <label className="text-neutral-text-field">End Date</label>
                <br />
                <span className="font-semibold">{data?.end_date || '-'}&nbsp;</span>
                <span className="font-semibold uppercase">
                  {data?.end_month
                    ? moment()
                        .month(data?.end_month - 1)
                        .format('MMMM')
                    : '-'}
                </span>
              </CCol>
            </CRow>
          </div>

          <Table
            tableRef={tableRef}
            columns={columns}
            apiController={useGetFrequencySeasonalList}
            query={{ q: searchDebounce || undefined }}
            parentId={selectedRow.preventive_maintenance_id}
            isAutoSelectFirstRow={false}
            isWithSearchField
            hasAutoNumber
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default FrequencySeasonalList
