/* eslint-disable */
/* prettier-ignore-start */

import React, { useState } from "react";
import { FaRegFileAlt } from 'react-icons/fa'
import FilePreview from "../../../../../../../src/components/preview/PreviewFile";
import {
  CContainer,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import clsx from "clsx";

function DetailFailureAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [active, setActive] = useState("details");
  const [btnActive, btnSetActive] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const activeStyle =
    "font-semibold  border border-0 rounded-[8px] bg-[#FFFFFF] pt-[8px] pb-[8px] pl-4 pr-4 w-[148px]";
  const inactiveStyle =
    "border border-0 rounded-[8px] bg-[#F3F3F3]  pt-[8px] pb-[8px] pl-4 pr-4 w-[148px]";
  {/* <div
  style={{ background: active ? "blue" : "red" }}
  onClick={() => setActive(!active)}
>
  {active ? "Active" : "Inactive"}
</div> */}

  return (
    <div style={{ background: "white", padding: 20 }}>
      {btnActive &&
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];

            console.log("FILE DARI INPUT:", file);
            console.log("TIPE:", file?.type);

            setSelectedFile(file);
          }}
        />
      }
      <div style={{ marginTop: 20, padding: 20, height: "800px", borderRadius: "8px" }}>
        <CContainer fluid>
          <CRow className="cursor-pointer mb-3 justify-content-around gap-8 rounded">
            <CCol className="border rounded-[8px] px-4 py-2" style={{ background: active ? "#E9F1FB" : "#FFFFFF" }}
              onClick={() => setActive(!active)}>
              <div className='flex flex-col gap-y-3'>
                <div className='border rounded border-0 max-w-[65px] font-semibold p-[8px] text-center' style={{ color: active ? "#ffffff" : "#2671D9", background: active ? "#2671D9" : "#E9F1FB" }}>
                  FMEA
                </div>
                <div className='font-semibold truncate w-80' style={{ color: active ? "#2671D9" : "#333333" }}>Analisis Mode Kegagalan</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Potensi Kegagalan:</div>
              </div>
            </CCol>
            <CCol className="border rounded-[8px] px-4 py-2">
              <div className='flex flex-col gap-y-3'>
                <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] font-semibold text-[#2671D9] p-[8px] text-center'>
                  RCFA
                </div>
                <div className='font-semibold truncate w-80'>Analisis Akar Penyebab Kegagalan Sehingga Perlu ECP</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Akar penyebab potensial:</div>
              </div>
            </CCol>
            <CCol className="border rounded-[8px] px-4 py-2">
              <div className='flex flex-col gap-y-3'>
                <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] font-semibold text-[#2671D9] p-[8px] text-center'>
                  CBA
                </div>
                <div className='font-semibold truncate w-80'>Analisis Biaya Manfaat</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Biaya:</div>
              </div>
            </CCol>
            <CCol className="border rounded-[8px] px-4 py-2">
              <div className='flex flex-col gap-y-3'>
                <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] font-semibold text-[#2671D9] p-[8px] text-center'>
                  LCCA
                </div>
                <div className='font-semibold truncate w-80'>Analisis Biaya Siklus Hidup</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Investasi awal: Rp 150 juta (estimasi).</div>
              </div>
            </CCol>
          </CRow>
        </CContainer>
        {active &&
          <div>
            <div className="flex justify-between items-center mt-[32px]">
              <div className="font-semibold mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                Failure Mode Effect Analysis (FMEA)
              </div>
              <div className="border border-0 rounded-[8px] bg-[#F3F3F3] py-2 px-[18px] w-[324px] flex justify-between gap-[8px] items-center">
                <button onClick={() => btnSetActive(!btnActive)} className={clsx(btnActive ? inactiveStyle : activeStyle)}>Details</button>
                <button onClick={() => btnSetActive(!btnActive)} className={clsx(btnActive ? activeStyle : inactiveStyle)}>Attachments</button>
              </div>
            </div>
            {btnActive &&
              <div className="flex flex-start gap-16 pl-2 mt-4">
                <div>
                  <div className="flex items-center mt-2 justify-between -mx-2 w-[500px]">
                    <p className="font-semibold mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                      File attached
                    </p>
                    <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                  </div>
                  <div className="flex flex-start gap-3 border rounded p-3 items-center w-[490px]">
                    <div className="bg-gradient-to-r from-[#2c74d6] to-[#1b4a89] w-14 h-14 rounded-full flex items-center justify-center">
                      <FaRegFileAlt className="text-neutral-white h-7 w-7" />
                    </div>
                    <div className="flex flex-col gap-2 mb-[-14px]">
                      <div className="font-semibold">PLTU.jpg</div>
                      <div className="flex flex-start gap-1">
                        <div className="font-semibold">1.8</div>
                        <p className="text-[#7F7F80] mr-2">MB</p>
                        <p className="font-semibold">2025-07-24 10:22</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {selectedFile && <FilePreview file={selectedFile} />}
                </div>
              </div>
            }
            {!btnActive &&
              <div className="py-4 px-8 border border-1 rounded-lg bg-[#FAFAFA] border-[#E5E7E9] mt-3">
                <div className="text-center font-semibold text-base">
                  Analisis Mode Kegagalan
                </div>
                <div className="mt-4 font-[14px]">
                  Potensi Kegagalan:
                  Struktur atap tidak kuat menahan beban angin atau hujan deras.
                  Bahan atap berkarat/rapuh lebih cepat dari perkiraan.
                  Kesalahan konstruksi (kemiringan salah → genangan air).

                  Dampak:
                  Kerusakan kendaraan akibat bocor/atap runtuh.
                  Biaya perbaikan mendadak lebih tinggi.
                  Gangguan operasional parkir.

                  Tindakan Pencegahan:
                  Menggunakan material sesuai standar SNI.
                  Perhitungan beban struktur oleh insinyur sipil.
                  Inspeksi berkala.
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default DetailFailureAnalysis;
