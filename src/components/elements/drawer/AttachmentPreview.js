import React, { useState, useEffect, useRef } from 'react'
import { CSpinner } from '@coreui/react'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import canvasDatagrid from 'canvas-datagrid'

const AttachmentPreview = ({ fileUrl, fileName }) => {
  const [objectUrl, setObjectUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [docxHtml, setDocxHtml] = useState('')
  const [excelData, setExcelData] = useState(null)
  const [sheets, setSheets] = useState([])
  const [selectedSheet, setSelectedSheet] = useState('')

  const workbookRef = useRef(null)
  const gridRef = useRef(null) // container div
  const gridInstance = useRef(null) // datagrid instance

  const extension = fileName?.split('.').pop()?.toLowerCase()

  useEffect(() => {
    if (!fileUrl) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setDocxHtml('')
    setExcelData(null)
    setError(null)
    setObjectUrl(null)

    const fetchFile = async () => {
      try {
        // Build full URL tanpa /api - eksplisit remove /api dari baseURL
        let baseURL = process.env.REACT_APP_API_BASE_URL || ''
        // Remove /api jika ada di baseURL
        baseURL = baseURL.replace(/\/api\/?$/, '')

        // Remove /api dari fileUrl juga jika fileUrl adalah full URL
        let cleanFileUrl = fileUrl
        if (fileUrl.includes('/api/')) {
          cleanFileUrl = fileUrl.replace(/\/api\//, '/')
        }

        const fullUrl = cleanFileUrl.startsWith('http') ? cleanFileUrl : `${baseURL}${cleanFileUrl}`

        const token = localStorage.getItem('access_token')
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            Authorization: token,
            Accept: '*/*',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const blob = await response.blob()
        let mimeType = response.headers.get('content-type') || 'application/octet-stream'
        if (extension === 'pdf') {
          mimeType = 'application/pdf'
        }
        const blobWithType = new Blob([blob], { type: mimeType })
        const url = URL.createObjectURL(blobWithType)
        setObjectUrl(url)

        if (extension === 'docx' || extension === 'doc') {
          const arrayBuffer = await blobWithType.arrayBuffer()
          const result = await mammoth.convertToHtml({ arrayBuffer })
          setDocxHtml(result.value)
        }

        if (extension === 'xls' || extension === 'xlsx' || extension === 'csv') {
          const arrayBuffer = await blobWithType.arrayBuffer()
          const workbook = XLSX.read(arrayBuffer, { type: 'array' })
          workbookRef.current = workbook
          setSheets(workbook.SheetNames)
          setSelectedSheet(workbook.SheetNames[0])
          const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
            header: 1,
          })
          setExcelData(sheetData)
        }
      } catch (err) {
        setError(err?.message || 'Failed to load file')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFile()

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl, fileName, extension])

  // Reset datagrid when file changes
  useEffect(() => {
    gridInstance.current = null
  }, [fileUrl, fileName])

  // Recreate grid whenever excelData changes
  useEffect(() => {
    if (excelData && gridRef.current) {
      // cleanup old grid if exists
      if (gridInstance.current) {
        gridInstance.current.parentNode?.removeChild(gridInstance.current)
        gridInstance.current = null
      }

      const grid = canvasDatagrid({ parentNode: gridRef.current })
      grid.style.width = '100%'
      grid.style.height = '100%'
      grid.style.gridBackgroundColor = '#fff'
      grid.style.gridBorderColor = '#ccc'
      grid.style.columnHeaderBackgroundColor = '#eee'
      grid.style.columnHeaderColor = '#000'
      grid.style.activeCellBorderColor = 'blue'

      const headers = excelData[0]
      const rows = excelData
        .slice(1)
        .map((row) => Object.fromEntries(headers.map((h, i) => [h, row[i]])))

      grid.data = rows
      gridInstance.current = grid

      return () => {
        grid.parentNode?.removeChild(grid)
      }
    }
  }, [excelData])

  if (isLoading)
    return (
      <div className="p-4 text-center text-gray-500">
        <CSpinner color="primary" className="mb-2" />
        <p className="font-semibold">Loading file preview...</p>
      </div>
    )

  if (error) return <ErrorFallback extension={extension} message={error} />

  if (extension === 'pdf' && objectUrl) {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <DocViewer
          documents={[{ uri: objectUrl, fileType: 'pdf' }]}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: { disableHeader: true, disableFileName: true },
            pdfVerticalScrollByDefault: true,
            pdfjsWorkerSrc: 'https://unpkg.com/pdfjs-dist@4.3.136/build/pdf.worker.min.mjs',
          }}
          style={{ height: '100%' }}
        />
      </div>
    )
  }

  if ((extension === 'docx' || extension === 'doc') && docxHtml) {
    return (
      <div
        className="p-4 overflow-auto"
        style={{ width: '100%', height: '80vh' }}
        dangerouslySetInnerHTML={{ __html: docxHtml }}
      />
    )
  }

  if ((extension === 'xls' || extension === 'xlsx' || extension === 'csv') && excelData) {
    return (
      <>
        {(extension === 'xls' || extension === 'xlsx') && sheets.length > 1 && (
          <div className="mb-2">
            <label className="mr-2 font-semibold">Select Sheet:</label>
            <select
              value={selectedSheet}
              onChange={(e) => {
                const sheetName = e.target.value
                setSelectedSheet(sheetName)
                const sheetData = XLSX.utils.sheet_to_json(workbookRef.current.Sheets[sheetName], {
                  header: 1,
                })
                setExcelData(sheetData)
              }}
              className="border rounded px-2 py-1"
            >
              {sheets.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div ref={gridRef} style={{ width: '100%', height: '100%', border: '1px solid #ccc' }} />
      </>
    )
  }

  if (['jpg', 'jpeg', 'png'].includes(extension) && objectUrl) {
    return <img src={objectUrl} alt={fileName} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
  }

  return <ErrorFallback extension={extension} />
}

const ErrorFallback = ({ extension }) => (
  <div className="p-4 text-center text-gray-500">
    <p className="font-semibold mb-2">File can’t be viewed.</p>
    <p className="text-sm">
      Preview is not available for <strong>.{extension}</strong> files.
    </p>
  </div>
)

export default AttachmentPreview
