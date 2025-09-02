import React, { useState, useEffect, useRef } from 'react'
import axios from '../../../libs/axios'
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
        const response = await axios.get(fileUrl, { responseType: 'blob' })
        const mimeType = response.headers['content-type'] || 'application/octet-stream'
        const blob = new Blob([response.data], { type: mimeType })
        const url = URL.createObjectURL(blob)
        setObjectUrl(url)

        if (extension === 'docx' || extension === 'doc') {
          const arrayBuffer = await blob.arrayBuffer()
          const result = await mammoth.convertToHtml({ arrayBuffer })
          setDocxHtml(result.value)
        }

        if (extension === 'xls' || extension === 'xlsx' || extension === 'csv') {
          const arrayBuffer = await blob.arrayBuffer()
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
