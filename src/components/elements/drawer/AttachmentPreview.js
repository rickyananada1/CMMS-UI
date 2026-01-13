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
      // Track local state for logging (since setState is async)
      let url = null
      let localDocxHtml = ''
      let localError = null

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

        // Get arrayBuffer first for processing
        const arrayBuffer = await response.arrayBuffer()

        console.log(`File loaded: ${fileName}, size: ${arrayBuffer.byteLength} bytes`)

        // Debug: Check first few bytes and validate file
        if (arrayBuffer.byteLength > 0) {
          const uint8Array = new Uint8Array(arrayBuffer)
          const firstBytes = Array.from(uint8Array.slice(0, 4))
            .map((b) => '0x' + b.toString(16).padStart(2, '0'))
            .join(' ')
          const firstChars = Array.from(uint8Array.slice(0, 20))
            .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
            .join('')
          console.log(`First bytes: ${firstBytes}`)
          console.log(`First chars: "${firstChars}"`)

          // Check if response is HTML/XML/JSON/text instead of binary file
          if (uint8Array[0] === 0x3c || uint8Array[0] === 0x7b) {
            // 0x3c = '<' (HTML/XML), 0x7b = '{' (JSON)
            const text = new TextDecoder().decode(uint8Array.slice(0, 300))
            console.error('❌ Server returned text/XML instead of binary file:', text)
            setError(
              `File not found or invalid response from server. Expected ${extension.toUpperCase()} file but received text/XML. Please check if the file exists.`,
            )
            setIsLoading(false)
            return
          }

          // Check if response is plain text/HTML (starts with common text bytes)
          // 0x65-0x7A (lowercase letters), common in HTML/text responses
          const firstCharsLower = firstChars.toLowerCase()
          if (
            firstCharsLower.includes('html') ||
            firstCharsLower.includes('<!doctype') ||
            firstCharsLower.includes('example') ||
            firstCharsLower.includes('http')
          ) {
            const text = new TextDecoder().decode(uint8Array.slice(0, 500))
            console.error('❌ Server returned HTML/text page instead of binary file:', text)
            setError(
              `Cannot preview file: Server returned an HTML page instead of the actual ${extension.toUpperCase()} file. The file may not exist on the server or the URL is incorrect.`,
            )
            setIsLoading(false)
            return
          }

          // Validate DOCX file signature - must be ZIP format
          if (extension === 'docx' && (uint8Array[0] !== 0x50 || uint8Array[1] !== 0x4b)) {
            const text = new TextDecoder().decode(uint8Array.slice(0, 100))
            console.error(
              `❌ Invalid DOCX file: expected ZIP signature (0x50 0x4b), got (0x${uint8Array[0].toString(
                16,
              )} 0x${uint8Array[1].toString(16)}).`,
            )
            console.error('File content preview:', text)
            setError(
              `Invalid DOCX file format. The file appears to be corrupted or is not a valid DOCX file. Expected ZIP format but received: "${text.substring(
                0,
                50,
              )}..."`,
            )
            setIsLoading(false)
            return
          }
        }

        // Create blob for object URL
        let mimeType = response.headers.get('content-type') || 'application/octet-stream'
        if (extension === 'pdf') {
          mimeType = 'application/pdf'
        } else if (extension === 'docx') {
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        } else if (extension === 'doc') {
          mimeType = 'application/msword'
        }

        const blob = new Blob([arrayBuffer], { type: mimeType })
        url = URL.createObjectURL(blob)
        console.log(`✓ Object URL created for ${fileName}:`, url)
        setObjectUrl(url)

        // Only use mammoth for DOCX files (not old DOC format)
        if (extension === 'docx') {
          try {
            // Validate that arrayBuffer has content
            if (arrayBuffer.byteLength === 0) {
              console.warn('Empty arrayBuffer, skipping mammoth conversion')
            } else {
              // Check for ZIP signature (DOCX files are ZIP archives)
              const uint8Array = new Uint8Array(arrayBuffer)
              const isZip = uint8Array[0] === 0x50 && uint8Array[1] === 0x4b

              if (isZip) {
                const result = await mammoth.convertToHtml({ arrayBuffer })
                if (result.value && result.value.trim()) {
                  setDocxHtml(result.value)
                  localDocxHtml = result.value
                  console.log('✓ DOCX successfully converted with mammoth')
                } else {
                  console.warn('Mammoth returned empty content, will use DocViewer fallback')
                }
                if (result.messages && result.messages.length > 0) {
                  console.log('Mammoth conversion messages:', result.messages)
                }
              } else {
                console.warn(
                  `⚠️ File "${fileName}" does not have ZIP signature (got: 0x${uint8Array[0].toString(
                    16,
                  )} 0x${uint8Array[1].toString(16)}). Using DocViewer fallback.`,
                )
              }
            }
          } catch (docError) {
            console.warn(
              'Mammoth conversion failed, will use DocViewer fallback:',
              docError.message,
            )
            // Keep objectUrl for DocViewer fallback rendering
          }
        }

        if (extension === 'xls' || extension === 'xlsx' || extension === 'csv') {
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
        console.error('❌ Error loading file:', err)
        setError(err?.message || 'Failed to load file')
        localError = err?.message || 'Failed to load file'
      } finally {
        setIsLoading(false)
        console.log(
          `📊 Final state - hasObjectUrl: ${!!url}, hasDocxHtml: ${!!localDocxHtml}, error: ${localError}, extension: ${extension}`,
        )
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

      // Make grid read-only (tidak bisa diedit)
      grid.attributes.editable = false
      grid.attributes.allowColumnReordering = false
      grid.attributes.allowColumnResize = false
      grid.attributes.allowRowReordering = false
      grid.attributes.allowRowResize = false

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

  if (error) {
    console.log('❌ Rendering ErrorFallback due to error:', error)
    return <ErrorFallback extension={extension} message={error} />
  }

  if (extension === 'pdf' && objectUrl) {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <iframe
          src={objectUrl}
          title={fileName}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    )
  }

  // Show mammoth-converted HTML for DOCX only
  if (extension === 'docx' && docxHtml) {
    console.log('✓ Rendering DOCX with mammoth HTML')
    return (
      <div
        className="p-4 overflow-auto"
        style={{
          width: '100%',
          height: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
        dangerouslySetInnerHTML={{ __html: docxHtml }}
      />
    )
  }

  // Fallback for DOC/DOCX if mammoth conversion failed or returned empty
  if ((extension === 'docx' || extension === 'doc') && objectUrl) {
    console.log('✓ Rendering DOCX/DOC with DocViewer fallback')
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <DocViewer
          documents={[{ uri: objectUrl, fileName: fileName }]}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false,
            },
          }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
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

  console.log(
    '⚠️ No matching render condition, showing ErrorFallback. objectUrl:',
    !!objectUrl,
    'docxHtml:',
    !!docxHtml,
    'extension:',
    extension,
  )
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
