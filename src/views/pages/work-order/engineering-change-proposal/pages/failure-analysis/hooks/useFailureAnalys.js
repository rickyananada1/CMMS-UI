/* eslint-disable */
/* prettier-ignore-start */
import React, { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState, useCallback } from 'react'
import Swal from 'sweetalert2'
import {
  useGetFailureAnalys,
  useCreateFailureAnalysis,
} from '../services'
import useFileUpload from 'src/views/pages/upload-file/hooks/useFileUpload'
import withReactContent from 'sweetalert2-react-content'
import { ticketEcpActions } from '../../../slices/ticketEcpSlice'
import { useGetFileUploaded } from 'src/views/pages/upload-file/services/getFileUploaded'
import { faTaskActions } from '../../failure-analysis/slices/failureAnalysSlice'

const useFailureAnalys = ({ mode, setAction, setTabIndex, setVisible }) => {
  const Notification = withReactContent(Swal)
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState({})
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [dataFile, setDataFile] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const selectedRow = useSelector((state) => state.ticketEcp?.selectedTicketEcp)
  const ticketEcpState = useSelector((state) => state.ticketEcp)

  const [hasExistingData, setHasExistingData] = useState(false)
  const [existingData, setExistingData] = useState(null)
  const [disableEdit, setDisableEdit] = useState(false)

  const fetchFailureAnalysis = useCallback(async () => {
    if (!selectedRow?.uuid) {
      return
    }

    try {
      const response = await getFailureAnalysData.mutateAsync({
        id: selectedRow?.uuid,
        params: {},
      })

      if (response.status === 200 && response.data?.data) {
        const faData = response.data?.data[0]

        setHasExistingData(true)
        setExistingData(faData)
        setData(faData)

        setFormValue({
          fmea_summary: faData.fmea_summary || "",
          fmea_desc: faData.fmea_desc || "",
          rcfa_summary: faData.rcfa_summary || "",
          rcfa_desc: faData.rcfa_desc || "",
          cba_summary: faData.cba_summary || "",
          cba_desc: faData.cba_desc || "",
          lcca_summary: faData.lcca_summary || "",
          lcca_desc: faData.lcca_desc || "",
          detailsummary: faData.detailsummary || ""
        })

        dispatch({
          type: 'faTask/setCurrentFailureAnalysis',
          payload: faData
        })
        dispatch({
          type: 'faTask/setHasFailureAnalysis',
          payload: true
        })

        localStorage.setItem(
          `failure_analysis_${selectedRow.uuid}`,
          JSON.stringify({ exists: true, id: faData.uuid })
        )
      } else {
        setHasExistingData(false)
        setExistingData(null)

        setFormValue({
          fmea_summary: "",
          fmea_desc: "",
          rcfa_summary: "",
          rcfa_desc: "",
          cba_summary: "",
          cba_desc: "",
          lcca_summary: "",
          lcca_desc: "",
          detailsummary: ""
        })

        localStorage.removeItem(`failure_analysis_${selectedRow.uuid}`)
      }
    } catch (error) {
      setHasExistingData(false)
      setExistingData(null)
    } finally {
      setIsLoading(false)
    }
  }, [dispatch, selectedRow?.uuid])

  useEffect(() => {
    if (selectedRow?.uuid) {
      const cachedData = localStorage.getItem(`failure_analysis_${selectedRow.uuid}`)
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData)
          if (parsed.exists) {
            setHasExistingData(true)
          }
        } catch (e) {
        }
      }
      fetchFailureAnalysis()
    }
  }, [selectedRow?.uuid, fetchFailureAnalysis])

  const visiblePopUp = useSelector((state) => state.faTask?.visiblePopUp)
  const handleOpenDrawer = () => {
    setDrawerOpen(true)
    setSelectedFile(null)
  }

  const [isUploadSummaryModalOpen, setIsUploadSummaryModalOpen] = useState(false)
  const [uploadSummary, setUploadSummary] = useState({ successfulUploads: [], failedUploads: [] })

  const getFailureAnalysData = useGetFailureAnalys()

  const setSelectedFailureAnalysRow = (param) => {
    dispatch(ticketEcpActions.setSelectedGroup(param))
  }

  const [activeDetailType, setActiveDetailType] = useState(null);

  const [formValue, setFormValue] = useState({
    fmea_summary: "",
    fmea_desc: "",
    rcfa_summary: "",
    rcfa_desc: "",
    cba_summary: "",
    cba_desc: "",
    lcca_summary: "",
    lcca_desc: "",
    detailsummary: ""
  });

  const [oldStatus, setOldStatus] = useState('')
  const setSelectedRow = (param) => {
    dispatch(ticketEcpActions.setSelectedTicketEcp(param))
  }

  useEffect(() => {
    if (mode === 'Create' && hasExistingData) {
    }

    if (mode !== 'Create') {
      getFailure()
    } else {
      setIsLoading(false)
    }

    if (mode === 'Update') {
      validateEdit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, hasExistingData])

  const validateEdit = async () => {
    var isValidUpdate = await validateEditDelete('edit')
    if (!isValidUpdate) {
      setSelectedRow(null)
      setTabIndex(0)
      setAction('Read')
      return
    }
    if (selectedRow?.reportedby === null) {
      setDisableEdit(true)
    } else {
      setDisableEdit(false)
    }
  }

  const validateEditDelete = async (type = 'edit') => {
    const notifTitle = `Unable to ${type} Failure Anaysis`
    return new Promise((resolve) => {
      if (!selectedRow) {
        resolve(false)
        return
      }

      // 1) Jika punya parent -> tidak boleh hapus
      if (selectedRow.reportedby != null) {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Failure Anaysis has a parent`,
        }).then(() => resolve(false))
        return
      }

      // 2) Jika sudah dibatalkan atau ditutup -> tidak boleh hapus
      if (selectedRow.status === 'CANCEL') {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Failure Analysis already cancelled`,
        }).then(() => resolve(false))
        return
      }
      if (selectedRow.status === 'CLOSE') {
        Notification.fire({
          icon: 'error',
          title: notifTitle,
          html: `Failure Analysis already closed`,
        }).then(() => resolve(false))
        return
      }

      if (type === 'edit' && selectedRow.reportedby === null) {
        resolve(true)
        return
      }

      resolve(true)
    })
  }

  useEffect(() => {
    visiblePopUp && mode === 'Read'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setVisible])

  const getFailure = async (params) => {
    setIsLoading(true)
    await getFailureAnalysData
      .mutateAsync({
        id: selectedRow?.uuid,
        params: params,
      })
      .then((res) => {
        if (res.status === 200) {
          const faData = res.data.data
          setData(faData)

          if (faData && Object.keys(faData).length > 0) {
            setHasExistingData(true)
            setExistingData(faData)
          }
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

  const fieldName = 'files'
  const { uploadUrl, fetchUrl } = useMemo(() => {
    if (mode === 'Update' && selectedRow?.uuid) {
      const woId = selectedRow.uuid
      return {
        uploadUrl: `/ticketecp/failuefmea/${woId}/attachment`,
        fetchUrl: `/ticketecp/failuefmea/${woId}/attachment`,
      }
    }
    return {
      uploadUrl: '',
      fetchUrl: '',
    }
  }, [mode, selectedRow])


  const [files, setFiles] = useState([])
  const formId = useMemo(() => selectedRow?.uuid, [selectedRow])

  const {
    errorMessage: messageError,
    onDrop,
    removeFiles,
    MAX_FILE_SIZE,
    acceptedFileTypes,
    uploadFiles,
    handleDownload,
    setDeletedFiles,
    deletePendingFiles,
    deletedFiles,
    tempFiles,
    setTempFiles,
    isModalOpen,
    setIsModalOpen,
    handleModalClose,
    handleFileSelect,
    duplicateFileError,
  } = useFileUpload({ uploadUrl, fetchUrl, mode, files, setFiles, formId })

  const [formDeletedFiles, setFormDeletedFiles] = useState([])
  const [isNewFiles, setIsNewFiles] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState('')

  useEffect(() => {
    const hasNewFiles = files?.some((item) => item instanceof File)
    const hasDeletedFiles = deletedFiles?.length > 0
    setIsNewFiles(hasNewFiles || hasDeletedFiles)

    const message =
      hasNewFiles || hasDeletedFiles
        ? '& attachment document saved successfully'
        : 'saved successfully'
    setMessageSuccess(message)
  }, [files, deletedFiles])

  useEffect(() => {
    setFormDeletedFiles(deletedFiles)
  }, [deletedFiles])

  useEffect(() => {
    if (!getFailureAnalysData.data?.data?.data) return

    const faData = getFailureAnalysData.data.data.data

    if (faData.length > 0) {
      const firstItem = faData[0]
      const hasValidContent =
        (firstItem.fmea_summary && firstItem.fmea_summary.trim() !== '') ||
        (firstItem.fmea_desc && firstItem.fmea_desc.trim() !== '') ||
        (firstItem.rcfa_summary && firstItem.rcfa_summary.trim() !== '') ||
        (firstItem.rcfa_desc && firstItem.rcfa_desc.trim() !== '') ||
        (firstItem.cba_summary && firstItem.cba_summary.trim() !== '') ||
        (firstItem.cba_desc && firstItem.cba_desc.trim() !== '') ||
        (firstItem.lcca_summary && firstItem.lcca_summary.trim() !== '') ||
        (firstItem.lcca_desc && firstItem.lcca_desc.trim() !== '')

      if (hasValidContent) {
        setHasExistingData(true)

        dispatch(faTaskActions.setFailureAnalysisData(faData))
        dispatch(faTaskActions.setHasData(true))
        dispatch(faTaskActions.setCurrentFailureAnalysis(firstItem))

        if (ticketEcpState?.selectedTicketEcp?.uuid) {
          localStorage.setItem(
            `failure_analysis_${ticketEcpState.selectedTicketEcp.uuid}`,
            'created'
          )
        }

      } else {
        setHasExistingData(false)
        dispatch(faTaskActions.setHasData(false))
        dispatch(faTaskActions.setFailureAnalysisData([]))
        dispatch(faTaskActions.setCurrentFailureAnalysis(null))
      }
    } else {
      setHasExistingData(false)
      dispatch(faTaskActions.setHasData(false))
      dispatch(faTaskActions.setFailureAnalysisData([]))
      dispatch(faTaskActions.setCurrentFailureAnalysis(null))
    }
  }, [dispatch, getFailureAnalysData.data, ticketEcpState?.selectedTicketEcp?.uuid])

  const createFailureAnalysis = useCreateFailureAnalysis()
  const updateFailureAnalysis = useCreateFailureAnalysis()

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
        const modifiedFormData = {
          ...values,
          uuid: selectedRow?.uuid ?? null,
          fmea_summary: values?.fmea_summary ?? null,
          fmea_desc: values?.fmea_desc ?? ßnull,
          rcfa_summary: values?.rcfa_summary ?? null,
          rcfa_desc: values?.rcfa_desc ?? null,
          cba_summary: values?.cba_summary ?? null,
          cba_desc: values?.cba_desc ?? null,
          lcca_summary: values?.lcca_summary ?? null,
          lcca_desc: values?.lcca_desc ?? null,
          detailsummary: values?.detailsummary ?? null,
        };

        let woId
        let fileUploadUrl
        let isUpdateOperation = false

        try {
          if (hasExistingData && existingData?.uuid) {
            isUpdateOperation = true

            const updateRes = await updateFailureAnalysis.mutateAsync({
              data: {
                ...modifiedFormData,
                uuid: existingData.uuid,
              }
            })

            woId = existingData.uuid
            fileUploadUrl = `/ticketecp/failurefmea/${woId}/attachment`

            if (!updateRes) {
              throw new Error('Update failed')
            }
          } else {
            const response = await createFailureAnalysis.mutateAsync({ data: modifiedFormData })
            woId = response?.data?.data?.uuid

            if (!woId) {
              throw new Error('Failure Analysis ID not returned')
            }

            fileUploadUrl = `/ticketecp/failurefmea/${woId}/attachment`

            if (response?.data?.data) {
              const newData = response.data.data

              dispatch(faTaskActions.setFailureAnalysisData([newData]))
              dispatch(faTaskActions.setSelectedFailureAnalysis(newData))

              if (ticketEcpState?.selectedTicketEcp?.uuid) {
                localStorage.setItem(
                  `failure_analysis_${ticketEcpState.selectedTicketEcp.uuid}`,
                  'created'
                )
              }
              setHasExistingData(true)
            }
          }

          if (hasExistingData && deletedFiles?.length > 0) {
            await deletePendingFiles(deletedFiles)
          }

          if (files?.length > 0 && woId) {
            const uploadResult = await uploadFiles(files, fileUploadUrl)
            setUploadSummary(uploadResult)

            if (uploadResult.failedUploads.length > 0) {
              setIsUploadSummaryModalOpen(true)
              return
            }
          }

          if (selectedRow?.uuid) {
            localStorage.setItem(
              `failure_analysis_${selectedRow.uuid}`,
              JSON.stringify({ exists: true, id: woId })
            )
          }

          Notification.fire({
            icon: 'success',
            title: 'Success',
            text: `Failure Analysis ${isUpdateOperation ? 'updated' : 'created'} ${messageSuccess}`,
            customClass: { confirmButton: 'btn btn-primary hover:text-white' },
            buttonsStyling: false,
          }).then(() => {
            fetchFailureAnalysis()

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

  const handleRetryUpload = async (fileToRetry) => {
    const fileUploadUrl = `/ticketecp/failurefmea/${selectedRow?.uuid}/attachment`

    setUploadSummary((prevSummary) => ({
      ...prevSummary,
      failedUploads: prevSummary.failedUploads.filter((item) => item.file !== fileToRetry),
    }))

    const result = await uploadFiles([fileToRetry], fileUploadUrl, formId)

    setUploadSummary((prevSummary) => ({
      successfulUploads: [...prevSummary.successfulUploads, ...result.successfulUploads],
      failedUploads: [...prevSummary.failedUploads, ...result.failedUploads],
    }))
  }

  const handleOK = () => {
    setTabIndex(0)
    setAction('Read')
  }

  const getDetailFile = useGetFileUploaded({
    url: `/ticketecp/failurefmea/${selectedRow?.uuid}/attachment`,
    config: {
      enabled: false,
    },
  })

  useEffect(() => {
    if (mode !== 'Create') {
      getDetailFile.refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, mode])

  useEffect(() => {
    if (mode !== 'Create' && selectedRow?.uuid) {
      getFailure()
    }
  }, [selectedRow, mode])

  useEffect(() => {
    if (mode === 'Create') return
    setDataFile(getDetailFile.data?.data?.data)
  }, [getDetailFile.data, mode])

  const uploadModalProps = useMemo(
    () => ({
      files: files || [],
      messageError,
      onDrop,
      setFiles,
      mode,
      removeFiles,
      mode: hasExistingData ? 'Update' : 'Create',
      MAX_FILE_SIZE,
      acceptedFileTypes,
      handleDownload,
      setDeletedFiles,
      uploadFiles,
      tempFiles,
      setTempFiles,
      isModalOpen,
      setIsModalOpen,
      handleModalClose,
      handleFileSelect,
      duplicateFileError,
      isSubmitting: false,
      isError: false,
    }),
    [
      files,
      messageError,
      onDrop,
      removeFiles,
      MAX_FILE_SIZE,
      acceptedFileTypes,
      setFiles,
      handleDownload,
      setDeletedFiles,
      tempFiles,
      uploadFiles,
      setTempFiles,
      isModalOpen,
      setIsModalOpen,
      handleModalClose,
      handleFileSelect,
      duplicateFileError,
      mode,
    ],
  )
  const actualMode = hasExistingData ? 'Update' : mode
  return {
    selectedRow,
    formValue,
    handleSubmit,
    handleRetryUpload,
    handleOK,
    uploadFiles,
    uploadSummary,
    files,
    isNewFiles,
    isModalOpen,
    uploadModalProps,
    setIsModalOpen,
    isUploadSummaryModalOpen,
    setIsUploadSummaryModalOpen,
    fieldName,
    isLoading,
    data,
    dataFile,
    selectedFile,
    isDrawerOpen,
    setDrawerOpen,
    handleOpenDrawer,
    setSelectedFailureAnalysRow,
    activeDetailType,
    hasExistingData,
    actualMode: hasExistingData ? 'Update' : mode,
    disableEdit,
    errorMessage,
  }
}

export default useFailureAnalys
