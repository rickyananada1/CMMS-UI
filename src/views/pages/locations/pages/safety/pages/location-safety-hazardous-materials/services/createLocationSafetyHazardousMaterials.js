import { useMutation } from '@tanstack/react-query'
import axios from 'src/libs/axios'

const createLocationSafetyHazardousMaterial = async ({ id, data, signal }) => {
  return await axios.post(`/locations/${id}/hazard-material`, data, { signal })
}

const useCreateLocationSafetyHazardousMaterial = ({ id, data, config }) => {
  return useMutation({
    mutationFn: (mutationProps) =>
      createLocationSafetyHazardousMaterial({ id, data, ...mutationProps }),
    ...config,
  })
}

export { createLocationSafetyHazardousMaterial, useCreateLocationSafetyHazardousMaterial }
