import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const addAssetMeterMeasurements = async ({ asset_id, meter_id, data, signal }) => {
  return await axios.post(`/asset/${asset_id}/meter/${meter_id}/measurement`, data, { signal })
}

const useAddAssetMeterMeasurements = (props) => {
  return useMutation({
    mutationFn: addAssetMeterMeasurements,
    ...props?.config,
  })
}

export { addAssetMeterMeasurements, useAddAssetMeterMeasurements }
