/* eslint-disable */
/* prettier-ignore-start */

import React from 'react'
import {
  CContainer,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import { DetailCard } from 'src/components/elements/cards'
import { Form, Formik } from 'formik'

const ServiceGrid = () => {
  return (
    <>
      <DetailCard>
        <CContainer fluid>
          <CRow className="flex mb-3 justify-content-around gap-8 rounded">
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] font-semibold text-[#2671D9] p-[8px] text-center'>
                  FMEA
                </div>
                <div className='font-semibold truncate w-80'>Analisis Mode Kegagalan</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Potensi Kegagalan:</div>
                <div className='font-normal text-[#7F7F80] text-sm mt-1 truncate w-80'>Struktur atap tidak kuat menahan beban angin atau hujan deras.</div>
                <CButton type='botton' color="primary" className='text-white hover:text-white border rounded-md border-0 pt-3 pb-3'>View Details</CButton>
              </div>
            </CCol>
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] font-semibold text-[#2671D9] p-[8px] text-center'>
                  RCFA
                </div>
                <div className='font-semibold truncate w-80'>Analisis Akar Penyebab Kegagalan Sehingga Perlu ECP</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Akar penyebab potensial:</div>
                <div className='font-normal text-[#7F7F80] text-sm mt-1 truncate w-80'>Pemilihan material tidak sesuai lingkungan (misal, besi tidak dilapisi anti karat).</div>
                <CButton type='botton' color="primary" className='text-white hover:text-white border rounded-md border-0 pt-3 pb-3'>View Details</CButton>
              </div>
            </CCol>
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] font-semibold text-[#2671D9] p-[8px] text-center'>
                  CBA
                </div>
                <div className='font-semibold truncate w-80'>Analisis Biaya Manfaat</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Biaya:</div>
                <div className='font-normal text-[#7F7F80] text-sm mt-1 truncate w-80'>Investasi awal konstruksi: Rp 100 – 200 juta (tergantung luas).</div>
                <CButton type='botton' color="primary" className='text-white hover:text-white border rounded-md border-0 pt-3 pb-3'>View Details</CButton>
              </div>
            </CCol>
            <CCol className="border rounded p-4">
              <div className='flex flex-col gap-y-4'>
                <div className='border rounded border-0 bg-[#E9F1FB] max-w-[65px] font-semibold text-[#2671D9] p-[8px] text-center'>
                  LCCA
                </div>
                <div className='font-semibold truncate w-80'>Analisis Biaya Siklus Hidup</div>
                <div className='font-normal text-[#7F7F80] text-sm truncate w-80'>Investasi awal: Rp 150 juta (estimasi).</div>
                <div className='font-normal text-[#7F7F80] text-sm mt-1 truncate w-80'>Umur pakai: 15–20 tahun (dengan perawatan rutin).</div>
                <CButton type='botton' color="primary" className='text-white hover:text-white border rounded-md border-0 pt-3 pb-3'>View Details</CButton>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </DetailCard>
    </>
  )
}

export default ServiceGrid
