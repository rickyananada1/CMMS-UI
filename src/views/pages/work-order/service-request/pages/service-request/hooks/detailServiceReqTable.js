/* eslint-disable */
/* prettier-ignore-start */
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { woTrackingActions } from '../../../../work-order-tracking/slices/woTrackingSlices'
import { useNavigate } from 'react-router-dom'
import {
  useGetWorkOrder,
} from '../../../../work-order-tracking/pages/work-order/services'
import { breadcrumbActions } from '../../../../../../../store/slices/breadcrumbSlices'
import { useGetServiceReq } from '../services'
import { serviceRequestActions } from '../../../slices/serviceRequestSlice'


const detailServiceReqTable = () => {
  const dispatch = useDispatch()
  const detailTableRef = useRef()
  const navigate = useNavigate()
  const selectedServiceReq = useSelector(
    (state) => state.serviceRequest?.selectedServiceRequest
  )
  console.log(selectedServiceReq, 'selectedServiceReqselectedServiceReq');
  const serviceRequestDetailData = useSelector(
    (state) => state.serviceRequest?.setServiceRequestDetailData
  )

  const [selectedRow, setSelectedRowState] = useState(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  const { mutate } = useGetWorkOrder();
  const { mutate: getServiceReq } = useGetServiceReq()

  const setSelectedRow = (param) => {
    if (!param) return;

    setSelectedRowState(param)

    dispatch(woTrackingActions.setSelectedWorkOrder(param));
    dispatch(woTrackingActions.setSelectedAppIndex(1));

    dispatch(
      breadcrumbActions.setBreadcrumb([
        { name: 'Dashboard', path: '/' },
        { name: 'Work Order', path: '/page/work-order/work-order-tracking' },
        { name: 'Detail', path: '/page/work-order/work-order-tracking' }
      ])
    );

    navigate(`/page/work-order/work-order-tracking`);

    mutate(param.work_order_id, {
      onSuccess: (data) => {
        console.log('Work Order detail:', data);
      },
      onError: (err) => {
        console.error('Failed to fetch work order:', err);
      },
    });
  };

  const backToServiceRequestDetail = () => {
    dispatch(
      breadcrumbActions.setBreadcrumb([
        { name: 'Dashboard', path: '/' },
        { name: 'Service Request', path: '/page/work-order/service-request' },
        { name: 'Detail', path: '/page/work-order/service-request' },
      ])
    )
    navigate(`/page/work-order/service-request/${selectedServiceReq?.uuid || uuid}`)
    if (!serviceRequestDetailData || serviceRequestDetailData.length === 0) {
      getServiceReq.mutate({ id: selectedServiceReq.uuid }, {
        onSuccess: (data) => {
          console.log('Service Request Detail restored:', data)
          dispatch(serviceRequestActions.setServiceRequestDetailData(data))
        },
        onError: (err) => console.error('saayu:', err),
      })
    }
  }

  return {
    selectedServiceReq,
    setSelectedRow,
    serviceRequestDetailData,
    backToServiceRequestDetail,
    detailTableRef,
    selectedRow,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
  }
}

export default detailServiceReqTable
