import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLocationSafetyHazardAndPrecautions = async ({ id, data, signal }) => {
  return await axios.post(`/locations/${id}/hazard-precaution`, data, { signal })
}

const useCreateLocationSafetyHazardAndPrecautions = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      createLocationSafetyHazardAndPrecautions({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createLocationSafetyHazardAndPrecautions, useCreateLocationSafetyHazardAndPrecautions }
