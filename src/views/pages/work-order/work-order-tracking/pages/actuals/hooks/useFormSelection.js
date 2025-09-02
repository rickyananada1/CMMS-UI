import { useGetAsset, useGetLocation, useGetSpareparts, useGetWorkOrder } from '../services'
import { useEffect, useState } from 'react'

const useFormSelection = () => {
  const [location, setLocation] = useState([])
  const [asset, setAsset] = useState([])
  const [spareparts, setSpareparts] = useState([])
  const [workOrder, setWorkOrder] = useState([])

  const getLocation = useGetLocation()
  const getAsset = useGetAsset()
  const getSpareparts = useGetSpareparts()
  const getWorkOrder = useGetWorkOrder()

  const getLocationList = async (params) => {
    await getLocation
      .mutateAsync({
        params: params,
      })
      .then((response) => {
        if (response?.status === 200) {
          if (Array.isArray(response?.data?.data) && response?.data?.data?.length) {
            let responseData = response?.data
            setLocation(responseData?.data)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log()
      })
  }

  const getAssetList = async (params) => {
    await getAsset
      .mutateAsync({
        params: params,
      })
      .then((response) => {
        if (response?.status === 200) {
          if (Array.isArray(response?.data?.data) && response?.data?.data?.length) {
            let responseData = response?.data
            setAsset(responseData?.data)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log()
      })
  }

  const getSparepartsList = async (params) => {
    await getSpareparts
      .mutateAsync({
        params: params,
      })
      .then((response) => {
        if (response?.status === 200) {
          if (Array.isArray(response?.data?.data) && response?.data?.data?.length) {
            let responseData = response?.data
            setSpareparts(responseData?.data)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log()
      })
  }

  const getWorkOrderList = async (params) => {
    await getWorkOrder
      .mutateAsync({
        params: params,
      })
      .then((response) => {
        if (response?.status === 200) {
          if (Array.isArray(response?.data?.data) && response?.data?.data?.length) {
            let responseData = response?.data
            setWorkOrder(responseData?.data)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log()
      })
  }

  useEffect(() => {
    getLocationList({ q: null, page: 1, limit: 100 })
    getAssetList({ q: null, page: 1, limit: 100 })
    getSparepartsList({ q: null, page: 1, limit: 100 })
    getWorkOrderList({ q: null, page: 1, limit: 100 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    getLocation,
    getAsset,
    getWorkOrder,
    getSpareparts,
    location,
    asset,
    workOrder,
    spareparts,
  }
}

export default useFormSelection
