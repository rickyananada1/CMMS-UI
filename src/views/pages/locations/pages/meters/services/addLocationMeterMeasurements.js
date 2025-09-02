import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const addLocationMeterMeasurements = async ({ location_id, meter_id, data, signal }) => {
  return await axios.post(`/location/${location_id}/meter/${meter_id}/measurement`, data, {
    signal,
  })
}

const useAddLocationMeterMeasurements = (props) => {
  return useMutation({
    mutationFn: addLocationMeterMeasurements,
    ...props?.config,
  })
}

export { addLocationMeterMeasurements, useAddLocationMeterMeasurements }
