/* eslint-disable */
/* prettier-ignore-start */
import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailCard } from 'src/components/elements/cards'
import CardHeader from 'src/components/elements/cards/CardHeader'
import useFailurreDefends from './hooks/useFailurreDefends'
import DetailFailureDefends from './detail-defends/DetailFailureDefends'
import { faTaskActions } from '../failure-analysis/slices/failureAnalysSlice'

const FailureAnalysDetail = ({ mode, setAction, setTabIndex, setVisible }) => {
  const {
    data,
    isLoading,
    dataFile,
    selectedFile,
    setSelectedFile,
    setDrawerOpen,
    deleteFailurDefends,
    setSelectedTask,
    handleOpenDrawer,
    selectedRow,
    selectedFailureAnalysRow,
    setSelectedFailureAnalysRow,
    isDrawerOpen,
  } = useFailurreDefends(({
    mode,
    setAction,
    setTabIndex,
    setVisible,
  }))

  const [activeIndex, setActiveIndex] = useState(null);

  const handleOpenDetails = (index) => {
    setActiveIndex(index);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setActiveIndex(null);
  };

  return (
    <>
      <DetailCard isLoading={isLoading}>
        <CardHeader
          description={data?.description}
          infoFields={[
            { label: 'ECP Number', value: data?.ticket },
            { label: 'Status ECP', value: data?.status },
          ]}
        />
        <CContainer fluid>
          <CRow className="flex mt-4 mb-3 justify-content-around gap-8 rounded cursor-pointer">
            <div className="flex flex-wrap justify-start w-full gap-3">
              {data?.tasks?.map((item, index) => (
                <div className="border rounded p-4 w-[565px] h-[165px]" onClick={() => handleOpenDetails(index)}>
                  <div className='flex flex-col gap-y-4'>
                    <div className="flex flex-start w-full gap-2" style={{ alignItems: 'center' }}>
                      <div className="border rounded min-w-[40px] font-semibold p-[8px] text-center bg-white text-[#333333]">
                        {item.fdt_num}
                      </div>
                      <div className='font-semibold truncate [&_p]:m-0' dangerouslySetInnerHTML={{ __html: item.task ?? '-' }} />
                    </div>
                    <div className='pl-[58px] flex flex-start gap-4'>
                      <div className='w-[220px]'>
                        <div className='text-[#7F7F80] font-normal pb-2'>
                          Craft (M\L\K)
                        </div>
                        <div className='font-semibold truncate'>{item.craft ?? '-'}</div>
                      </div>
                      <div className='w-[220px]'>
                        <div className='text-[#7F7F80] font-normal pb-2'>
                          Maintenance Type
                        </div>
                        <div className='font-semibold truncate'>{item.maintenance_type ?? '-'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CRow>
          <DetailFailureDefends
            key={`detail-${activeIndex || 'closed'}`}
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            files={dataFile}
            selectedFile={selectedFile}
            onSelectFile={(file) => setSelectedFile(file)}
            data={data}
            tasks={data?.tasks || []}
            activeIndex={activeIndex}
            setTabIndex={setTabIndex}
            setAction={setAction}
            deleteFailurDefends={deleteFailurDefends}
            setSelectedTask={setSelectedTask}
          />
        </CContainer>
      </DetailCard>
    </>
  )
}

export default FailureAnalysDetail