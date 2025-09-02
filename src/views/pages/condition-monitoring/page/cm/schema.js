import * as Yup from 'yup'

const conditionMonitoringSchema = Yup.object().shape({
  data: Yup.object({
    condition_monitoring: Yup.object({
      point_num: Yup.string().required('Field is required'),
      point_description: Yup.string().required('Field is required'),
      meter_id: Yup.object().required('Field is required'),
      site_id: Yup.object().required('Field is required'),
      asset_id: Yup.object()
        .nullable()
        .test(
          'asset-or-location',
          'Asset is required if Location is not selected',
          function (value) {
            const locationId = this.parent.location_id
            return !!value?.value || !!locationId?.value
          },
        ),
      location_id: Yup.object()
        .nullable()
        .test(
          'location-or-asset',
          'Location is required if Asset is not selected',
          function (value) {
            const assetId = this.parent.asset_id
            return !!value?.value || !!assetId?.value
          },
        ),
      attachment: Yup.mixed(),
    }),
    measure_point: Yup.object().when('condition_monitoring.meter_type', {
      is: (value) => value === 'continuous' || value === 'gauge',
      then: () =>
        Yup.object({
          upper_warning_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0')
            .required('Field is required'),
          upper_action_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0')
            .required('Field is required'),
          upper_limit_pm: Yup.mixed()
            .nullable()
            .test(
              'upper-limit-pm-required',
              'Either Upper Limit PM or Upper Limit Job Plan is required',
              function (value) {
                const { upper_limit_job_plan, condition_monitoring } = this.parent
                if (['continuous', 'gauge'].includes(condition_monitoring?.meter_type)) {
                  return (
                    (typeof value === 'object' && value?.value !== undefined) ||
                    (typeof upper_limit_job_plan === 'object' &&
                      upper_limit_job_plan?.value !== undefined)
                  )
                }
                return true
              },
            ),
          upper_limit_job_plan: Yup.object()
            .nullable()
            .test(
              'upper-limit-job-plan-required',
              'Either Upper Limit PM or Upper Limit Job Plan is required',
              function (value) {
                const { upper_limit_pm, condition_monitoring } = this.parent
                if (['continuous', 'gauge'].includes(condition_monitoring?.meter_type)) {
                  return (
                    (typeof value === 'object' && value?.value !== undefined) ||
                    (typeof upper_limit_pm === 'object' && upper_limit_pm?.value !== undefined)
                  )
                }
                return true
              },
            ),
          upper_limit_priority: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0')
            .required('Field is required'),
          lower_warning_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0')
            .required('Field is required'),
          lower_action_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0')
            .required('Field is required'),
          lower_limit_pm: Yup.mixed()
            .nullable()
            .test(
              'lower-limit-pm-required',
              'Either Lower Limit PM or Lower Limit Job Plan is required',
              function (value) {
                const { lower_limit_job_plan, condition_monitoring } = this.parent
                if (['continuous', 'gauge'].includes(condition_monitoring?.meter_type)) {
                  return (
                    (typeof value === 'object' && value?.value !== undefined) ||
                    (typeof lower_limit_job_plan === 'object' &&
                      lower_limit_job_plan?.value !== undefined)
                  )
                }
                return true
              },
            ),
          lower_limit_job_plan: Yup.object()
            .nullable()
            .test(
              'lower-limit-job-plan-required',
              'Either Lower Limit PM or Lower Limit Job Plan is required',
              function (value) {
                const { lower_limit_pm, condition_monitoring } = this.parent
                if (['continuous', 'gauge'].includes(condition_monitoring?.meter_type)) {
                  return (
                    (typeof value === 'object' && value?.value !== undefined) ||
                    (typeof lower_limit_pm === 'object' && lower_limit_pm?.value !== undefined)
                  )
                }
                return true
              },
            ),
          lower_limit_priority: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0')
            .required('Field is required'),
        }),
      otherwise: () =>
        Yup.object({
          upper_warning_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0'),
          upper_action_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0'),
          upper_limit_pm: Yup.mixed().nullable(),
          upper_limit_job_plan: Yup.mixed().nullable(),
          upper_limit_priority: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0'),
          lower_warning_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0'),
          lower_action_limit: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0'),
          lower_limit_pm: Yup.mixed().nullable(),
          lower_limit_job_plan: Yup.mixed().nullable(),
          lower_limit_priority: Yup.number()
            .typeError('Must be a valid number')
            .min(0, 'Minimum value is 0'),
        }),
    }),
    characteristic_action_values: Yup.array().when('condition_monitoring.meter_type', {
      is: (value) => value === 'characteristic',
      then: (schema) =>
        schema.of(
          Yup.object({
            ca_value: Yup.string().required('Field is required'),
            pm: Yup.object()
              .nullable()
              .when(['job_plan', 'condition_monitoring.meter_type'], {
                is: (job_plan, meter_type) => meter_type === 'characteristic' && !job_plan?.value,
                then: (schema) => schema.required('PM is required'),
                otherwise: (schema) => schema.nullable(),
              }),
            job_plan_id: Yup.object()
              .nullable()
              .when(['pm', 'condition_monitoring.meter_type'], {
                is: (pm, meter_type) => meter_type === 'characteristic' && !pm?.value,
                then: (schema) => schema.required('Job Plan is required'),
                otherwise: (schema) => schema.nullable(),
              }),
            priority: Yup.number()
              .typeError('Must be a valid number')
              .min(0, 'Minimum value is 0')
              .required('Field is required'),
          }),
        ),
      otherwise: (schema) =>
        schema.of(
          Yup.object({
            ca_value: Yup.string(),
            pm: Yup.object().nullable(),
            job_plan_id: Yup.object().nullable(),
            priority: Yup.number().typeError('Must be a valid number').min(0, 'Minimum value is 0'),
          }),
        ),
    }),
  }),
})

export { conditionMonitoringSchema }
