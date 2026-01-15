/* eslint-disable */
/* prettier-ignore-start */
import React, { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState, useCallback } from 'react'
import Swal from 'sweetalert2'
import {
  useGetFailureDefends,
  useCreateFailureDefends,
  useDeleteFailureDefends,
  useUpdateFailureDefends,
  useGetMaintenance
} from '../services'
import withReactContent from 'sweetalert2-react-content'
import { faTaskActions } from '../../failure-analysis/slices/failureAnalysSlice'

var failure_defends_statuses = [
  { value: 'HOURS', label: 'HOURS' },
  { value: 'DAYS', label: 'DAYS' },
  { value: 'WEEKS', label: 'WEEKS' },
  { value: 'MONTHS', label: 'MONTHS' },
  { value: 'YEARS', label: 'YEARS' },
  { value: 'CYCLES', label: 'CYCLES' },
  { value: 'M', label: 'M' },
  { value: 'KM', label: 'KM' },
]

function updateFailureDefStatuses(currentStatus) {
  const validStatuses = ['HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS', 'CYCLES', 'M', 'KM'];

  if (!validStatuses.includes(currentStatus)) {
    return;
  }

  failure_defends_statuses.length = 0;

  validStatuses.forEach(status => {
    work_order_statuses.push({
      value: status,
      label: status,
    });
  });
}

const useFailurreDefends = ({ mode, setAction, setTabIndex, setVisible }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.ticketEcp?.selectedTicketEcp)
  const visiblePopUp = useSelector((state) => state.serviceRequest?.visiblePopUp)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [disableEdit, setDisableEdit] = useState(false)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null);
  const [details, setDetails] = useState([])

  const getFailureDefendsDetail = useGetFailureDefends()

  useEffect(() => {
    if (getFailureDefendsDetail.data?.data?.data?.tasks?.length) {
      setDetails(getFailureDefendsDetail.data.data.data.tasks)
    }
  }, [getFailureDefendsDetail.data])


  const [tasks, setTasks] = useState([])
  const [activeTaskIndex, setActiveTaskIndex] = useState(0)

  const activeTask = useMemo(() => {
    return tasks[activeTaskIndex] || null
  }, [tasks, activeTaskIndex])

  const emptyRow = {
    maintenance_id: null,
    maintenance_type: '',
    fdt_num: 1,
    task: '',
    craft: '',
    frequency: '',
    frequency_unit: '',
    job_task: '',
    post_maintenance_test: '',
  };

  const [formValue, setFormValue] = useState({
    data: data?.data?.length ? data.data : [emptyRow],
  });


  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const [oldStatus, setOldStatus] = useState('')

  const setSelectedRow = (param) => {
    dispatch(serviceRequestActions.setSelectedServiceReq(param))
  }

  useEffect(() => {
    mode !== 'Create' ? getDetailDefTask() : setIsLoading(false)
    mode === 'Delete' && validateEdit()
    mode === 'Deleting' && validateEdit()
    mode === 'Update' && validateEdit()
    mode === 'Change' && validateEdit()
    mode === 'Sending' && validateEdit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  const validateEdit = async () => {
    var isValidUpdate = await validateEditDelete('edit')
    if (!isValidUpdate) {
      setSelectedRow(null)
      setTabIndex(0)
      setAction('Read')
      return
    }
  }

  useEffect(() => {
    if (mode === 'Sending' && data?.tasks) {
      setTasks(data.tasks)
    }
  }, [mode, data])

  const getMaintenance = useGetMaintenance()

  const getDetailDefTask = async (params) => {
    setIsLoading(true)
    await getFailureDefendsDetail
      .mutateAsync({
        id: selectedRow?.uuid,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data)
        }
      })
      .catch((err) => {
        setErrorMessage(err)
        setTabIndex(0)
        setAction('Read')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const formId = useMemo(() => selectedRow?.uuid, [selectedRow])

  const [formDeletedFiles, setFormDeletedFiles] = useState([])
  const [messageSuccess, setMessageSuccess] = useState('')

  useEffect(() => {
    if (mode !== 'Change' && mode !== 'Update') return;

    const detail = getFailureDefendsDetail.data?.data?.data;
    if (!detail) return;

    validateEdit();

    setOldStatus(detail.status);

    if (detail.status) {
      updateFailureDefStatuses(detail.status);
    }

    setFormValue((prev) => ({
      ...prev,
      description: detail.description ?? '',
      status: detail.status ?? '',
      ticket: detail.ticket ?? '',
      data: (detail.tasks || []).map((t, index) => ({
        id: t.id,
        fdt_num: t.fdt_num ?? index + 1,
        task: t.task ?? '',
        craft: t.craft ?? '',
        frequency: t.frequency ?? '',
        frequency_unit: t.frequency_unit ?? '',
        job_task: t.job_task ?? '',
        post_maintenance_test: t.post_maintenance_test ?? '',
        maintenance_id: t?.maintenance_id ?? null,
        maintenance_type: t?.maintenance_type ?? '',
      })),
    }));
  }, [getFailureDefendsDetail.data, mode]);


  const createFailureDefends = useCreateFailureDefends()
  const updateFailureDefends = useUpdateFailureDefends()


  const handleSubmit = async (values, formikHelpers) => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to submit ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const modifiedFormData = values?.data?.map((item, index) => {
          return {
            id: item?.id,
            ecp_id: String(selectedRow.uuid),
            fdt_num: item?.fdt_num ?? index + 1,
            task: item?.task ?? '',
            craft: item?.craft ?? '',
            frequency: Number(item?.frequency ?? 0),
            frequency_unit: item?.frequency_unit ?? '',
            job_task: item?.job_task ?? '',
            post_maintenance_test: item?.post_maintenance_test ?? '',
            maintenance_id:
              typeof item?.maintenance_id === 'object'
                ? (
                  item?.maintenance_id?.value ??
                  item?.maintenance_id?.id ??
                  null
                )
                : item?.maintenance_id ?? null,
            maintenance_type:
              typeof item?.maintenance_type === 'object'
                ? (
                  item?.maintenance_type?.label ??
                  item?.maintenance_type?.maintenance_type ??
                  null
                )
                : item?.maintenance_type ?? null,

          }
        })

        let woId
        try {
          if (mode === 'Create') {
            const response = await createFailureDefends.mutateAsync({ data: modifiedFormData })
            woId = response?.data?.data?.map(item => item.id)

            if (!woId) {
              throw new Error('Failure Defends Task ID not returned')
            }
          } else if (mode === 'Change' || mode === 'Update') {
            const updateRes = await updateFailureDefends.mutateAsync({
              data: modifiedFormData,
            })
            woId = selectedRow?.uuid
            if (!updateRes || !woId) {
              throw new Error('Update failed or missing ID')
            }
          } else {
            console.warn('Unhandled mode for submit:', mode);
          }
          Notification.fire({
            icon: 'success',
            title: 'Success',
            text: `Failure Defends Task ${messageSuccess}`,
            customClass: { confirmButton: 'btn btn-primary hover:text-white' },
            buttonsStyling: false,
          }).then(() => {
            setTabIndex(0)
            setAction('Read')
          })
        } catch (error) {
          Notification.fire({
            icon: 'error',
            title: 'Oops...!',
            text: error.response?.data?.message || error.message || 'Something went wrong!',
          })
        } finally {
          formikHelpers.setSubmitting(false)
        }
      }
    })
  }


  const handleOK = () => {
    setTabIndex(0)
    setAction('Read')
  }

  const deleteFailureDefends = useDeleteFailureDefends()

  const validateEditDelete = async () => {
    return new Promise((resolve) => {
      if (!selectedRow) {
        resolve(false);
        return;
      }

      resolve(true);
    });
  };


  const deleteFailurDefends = async (activeTask) => {
    if (!activeTask) return;

    let items = [];

    if (Array.isArray(activeTask)) {
      items = activeTask.map((item) => ({
        id: item.id,
      }));
    } else if (activeTask?.id) {
      items = [{ id: activeTask.id }];
    } else {
      return;
    }

    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Deleting Failure Defense Task cannot be undone. This action will permanently remove the selected items from your account.`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
      customClass: {
        container: 'z-[1200]'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFailureDefends.mutateAsync({
            items,
          });

          await Notification.fire({
            icon: 'success',
            title: 'Success',
            text: `Task deleted successfully`,
            customClass: {
              container: 'z-[1200]'
            }
          });

          setDrawerOpen(false);

          await getDetailDefTask();

          setAction('Read');
          return true;
        } catch (err) {
          Notification.fire({
            icon: 'error',
            title: 'Error!',
            text: err?.response?.data?.message || 'Delete failed',
            customClass: {
              container: 'z-[1200]'
            }
          });
        }
      }
    });
  };

  return {
    data,
    isLoading,
    errorMessage,
    formValue,
    selectedRow,
    setSelectedRow,
    handleSubmit,
    setDrawerOpen,
    handleOpenDrawer,
    handleOK,
    disableEdit,
    failure_defends_statuses,
    getMaintenance,
    selectedFile,
    isDrawerOpen,
    handleOpenDrawer,
    tasks,
    deleteFailurDefends,
    activeTask,
    activeTaskIndex,
    setActiveTaskIndex,
    setSelectedTask,
    selectedTask,
    details,
  }
}

export default useFailurreDefends
