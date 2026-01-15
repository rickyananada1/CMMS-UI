/* eslint-disable */
/* prettier-ignore-start */
import * as Yup from 'yup';

const fieldsToCheck = [
  'task',
  'craft',
  'frequency',
  'frequency_unit',
  'job_task',
  'post_maintenance_test',
  'maintenance_id',
];

const faDefendsSchema = Yup.object().shape({
  data: Yup.array()
    .of(
      Yup.object().shape({
        fdt_num: Yup.number().required('FDT Number is required'),
        task: Yup.string(),
        craft: Yup.string(),
        maintenance_id: Yup.string(),
        frequency: Yup.number().nullable(),
        frequency_unit: Yup.string(),
        job_task: Yup.string(),
        post_maintenance_test: Yup.string(),
      }).test(
        'at-least-one-field',
        'At least one field must be filled in this task',
        (obj) => {
          return fieldsToCheck.some((field) => {
            const val = obj[field];
            if (typeof val === 'string') return val.trim() !== '';
            if (typeof val === 'number') return val !== null && val !== undefined;
            return !!val; // fallback
          });
        }
      )
    )
    .min(1, 'At least one task is required'),
});

export { faDefendsSchema };
