/* eslint-disable */
/* prettier-ignore-start */

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function FilePreview({ file }) {
  const [excelHTML, setExcelHTML] = useState("");

  if (!file || !(file instanceof File)) {
    return <div>File tidak valid</div>;
  }

  const fileUrl = URL.createObjectURL(file);
  const fileType = file.type;

  const isExcel =
    fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    fileType === "application/vnd.ms-excel";

  useEffect(() => {
    if (!isExcel) return;

    (async () => {
      try {
        const buf = await file.arrayBuffer();
        const workbook = XLSX.read(buf);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        let html = XLSX.utils.sheet_to_html(sheet);

        html = `
          <style>
            table {
              border-collapse: collapse;
              font-family: Arial, sans-serif;
              width: max-content;
            }

            td, th {
              border: 1px solid #bfbfbf;
              padding: 6px 10px;
              font-size: 13px;
              white-space: nowrap;
            }

            table thead tr th {
              position: sticky;
              top: 0;
              background: #e6e6e6;
              z-index: 2;
            }

            th[style*="background"] {
              position: sticky !important;
              top: 0;
              z-index: 3;
            }

            table col {
              width: auto !important;
            }

            tbody tr:nth-child(even) {
              background-color: #fafafa;
            }

            .excel-wrapper {
              overflow: auto;
              scroll-behavior: smooth;
            }

            .excel-wrapper::-webkit-scrollbar {
              height: 8px;
            }
            .excel-wrapper::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            .excel-wrapper::-webkit-scrollbar-thumb {
              background: #c1c1c1;
              border-radius: 4px;
            }
          </style>

          <div class="excel-wrapper">
            ${html}
          </div>
        `;

        setExcelHTML(html);
      } catch (err) {
        console.error("Excel error:", err);
      }
    })();
  }, [file, isExcel]);


  return (
    <div style={{ maxWidth: "120%" }}>
      {/* <button
        onClick={() => {
          const a = document.createElement("a");
          a.href = fileUrl;
          a.download = file.name;
          a.click();
        }}
        style={{ width: "100%", padding: "10px", background: "#D9D9D9" }}
      >
        <img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zIDE1QzMgMTcuODI4NCAzIDE5LjI0MjYgMy44Nzg2OCAyMC4xMjEzQzQuNzU3MzYgMjEgNi4xNzE1NyAyMSA5IDIxSDE1QzE3LjgyODQgMjEgMTkuMjQyNiAyMSAyMC4xMjEzIDIwLjEyMTNDMjEgMTkuMjQyNiAyMSAxNy44Mjg0IDIxIDE1IiBzdHJva2U9IiMxQzI3NEMiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxwYXRoIGQ9Ik0xMiAzVjE2TTEyIDE2TDE2IDExLjYyNU0xMiAxNkw4IDExLjYyNSIgc3Ryb2tlPSIjMUMyNzRDIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4="
          className="w-[24px]" style={{ position: "relative", float: "right", right: "8px", top: "-3px" }} />
      </button> */}
      {fileType.startsWith("image/") && (
        <div>
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = fileUrl;
              a.download = file.name;
              a.click();
            }}
            style={{ width: "100%", padding: "10px", background: "#E9F1FB", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
          >
            <img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zIDE1QzMgMTcuODI4NCAzIDE5LjI0MjYgMy44Nzg2OCAyMC4xMjEzQzQuNzU3MzYgMjEgNi4xNzE1NyAyMSA5IDIxSDE1QzE3LjgyODQgMjEgMTkuMjQyNiAyMSAyMC4xMjEzIDIwLjEyMTNDMjEgMTkuMjQyNiAyMSAxNy44Mjg0IDIxIDE1IiBzdHJva2U9IiMxQzI3NEMiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxwYXRoIGQ9Ik0xMiAzVjE2TTEyIDE2TDE2IDExLjYyNU0xMiAxNkw4IDExLjYyNSIgc3Ryb2tlPSIjMUMyNzRDIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4="
              className="w-[24px]" style={{ position: "relative", float: "right", right: "8px", top: "-3px" }} />
          </button>
          {fileType.startsWith("image/") && (
            <div>
              <img src={fileUrl} style={{ width: "1200px" }} alt="preview" />
            </div>
          )}
          {/* <img src={fileUrl} style={{ width: "200%" }} alt="preview" /> */}
        </div>
      )}

      {fileType === "application/pdf" && (
        <div>
          <iframe
            src={fileUrl}
            title="pdf-preview"
            style={{ width: "360%", height: "800px", border: "none", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
          />
        </div>
      )}

      {isExcel && (
        <>
          {!excelHTML ? (
            <p>Loading Excel…</p>
          ) : (
            <div
              style={{
                background: "white",
                padding: 10,
                border: "1px solid #ddd",
                maxHeight: 800,
                overflow: "auto",
                maxWidth: "1080px",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px"
              }}
            >
              <button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = fileUrl;
                  a.download = file.name;
                  a.click();
                }}
                style={{ width: "100%", padding: "10px", background: "#E9F1FB", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
              >
                <img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zIDE1QzMgMTcuODI4NCAzIDE5LjI0MjYgMy44Nzg2OCAyMC4xMjEzQzQuNzU3MzYgMjEgNi4xNzE1NyAyMSA5IDIxSDE1QzE3LjgyODQgMjEgMTkuMjQyNiAyMSAyMC4xMjEzIDIwLjEyMTNDMjEgMTkuMjQyNiAyMSAxNy44Mjg0IDIxIDE1IiBzdHJva2U9IiMxQzI3NEMiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxwYXRoIGQ9Ik0xMiAzVjE2TTEyIDE2TDE2IDExLjYyNU0xMiAxNkw4IDExLjYyNSIgc3Ryb2tlPSIjMUMyNzRDIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4="
                  className="w-[24px]" style={{ position: "relative", float: "right", right: "8px", top: "-3px" }} />
              </button>
              {/* {fileType.startsWith("image/") && (
                <div>
                  <img src={fileUrl} style={{ width: "200%" }} alt="preview" />
                </div>
              )} */}
              <div dangerouslySetInnerHTML={{ __html: excelHTML }} />
            </div>

          )}
        </>
      )}

      {!fileType.startsWith("image/") &&
        fileType !== "application/pdf" &&
        !isExcel && <div>Format tidak didukung</div>}
    </div>
  );
}
