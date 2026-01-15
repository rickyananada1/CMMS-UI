/* eslint-disable */
/* prettier-ignore-start */
import React, { useState, useEffect } from 'react'
import { CCol, CRow } from '@coreui/react'
import clsx from 'clsx'
import { MdClose } from 'react-icons/md'

const DetailFailureDefends = ({ setSelectedTask, mode, setAction, deleteFailurDefends, tasks = [], activeIndex, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(activeIndex ?? 0);
  const activeTask = React.useMemo(() => {
    return tasks[activeTab] || null;
  }, [activeTab, tasks]);

  useEffect(() => {
    if (isOpen && activeIndex !== null) {
      setActiveTab(activeIndex);
    }
  }, [isOpen, activeIndex]);

  if (!isOpen) return null;
  
  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-50 z-[1090] transition-opacity duration-300',
          { 'opacity-100 visible': isOpen, 'opacity-0 invisible': !isOpen },
        )}
        onClick={onClose}
      />

      <div
        className={clsx(
          'fixed top-0 right-0 h-screen w-[1200px] bg-white shadow-lg z-[1100] transform transition-transform duration-300 flex flex-col rounded-tl-2xl rounded-bl-2xl',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          },
        )}
      >
        <div className="flex justify-between items-center w-[1200px] px-4 py-3 border-[#E5E7E9] flex-shrink-0">
          <span className="text-2xl font-semibold">Failure Defense Task</span>
          <button onClick={onClose}>
            <MdClose className="w-8 h-8" />
          </button>
        </div>
        <div style={{ padding: 20, borderRadius: "8px", height: "100%", minHeight: "928px", overflow: "scroll" }}>
          <div className="flex flex-start items-center gap-8 w-full">
            <div className="flex items-center justify-between py-2 sticky top-0 bg-white z-10 w-[320px]">
              <div className="text-lg text-neutral-text-field text-nowrap font-semibold">
                FDT Number
              </div>
              <hr className="flex-1 ml-2 h-[1px] bg-neutral-stroke" />
            </div>
            <div className="flex items-center justify-between py-2 sticky top-0 bg-white z-10 w-[815px]">
              <div className="text-sm text-neutral-text-field text-nowrap">
                Details
              </div>
              <hr className="flex-1 ml-2 h-[1px] bg-neutral-stroke" />
            </div>
          </div>
          <div className='flex flex-start gap-8'>
            <div className="cursor-pointer mb-3 flex flex-col gap-y-2 rounded">
              {tasks.map((task, index) => {
                const tabctive = activeTab === index;
                return (
                  <div
                    key={`${task.fdt_num}-${index}`}
                    onClick={() => setActiveTab(index)}
                    className={`cursor-pointer flex flex-col gap-y-2 rounded ${tabctive ? 'bg-blue-100' : 'bg-white'}`}
                  >
                    <div className='mt-2'>
                      <div className='w-[320px] border rounded-[8px] px-4 py-2'>
                        <div className='flex gap-2 items-center'>
                          <div className="border border-1 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: tabctive ? "linear-gradient(to right, #2c74d6, #1b4a89)" : "#fff" }}>
                            <div className="font-semibold" style={{ color: tabctive ? "#fff" : "#333" }}>{task.fdt_num}</div>
                          </div>
                          <div className={`text-lg flex flex-col flex-1 min-w-0 ${tabctive ? 'font-semibold' : ''
                            }`} >
                            <div className='truncate [&_p]:m-0' dangerouslySetInnerHTML={{ __html: task.task.trim() || '-' }} />
                            <div className='truncate [&_p]:m-0' dangerouslySetInnerHTML={{ __html: task.post_maintenance_test.trim() || '-' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {activeTask &&
              <div className='w-full'>
                <div>
                  <div className="text-lg text-neutral-text-field text-nowrap">
                    Failure Defense Task
                  </div>
                  <div className='text-lg w-[815px] h-[135px] text-justify border rounded-[8px] px-4 py-2'>
                    <div className='overflow-auto h-[110px] [&_p]:m-0' dangerouslySetInnerHTML={{ __html: activeTask.task.trim() || '-' }} />
                  </div>
                  <CRow className="mt-3 mb-3">
                    <CCol md={4}>
                      <label className="text-neutral-text-field">Craft (M\L\K)</label>
                      <br />
                      <span className="font-semibold">{activeTask.craft || '-'}</span>
                    </CCol>
                    <CCol md={4}>
                      <label className="text-neutral-text-field">Maintenance Type</label>
                      <br />
                      <span className="font-semibold break-words">{activeTask.maintenance_type || '-'}</span>
                    </CCol>
                    <CCol md={4}>
                      <label className="text-neutral-text-field">Schedule Frequency</label>
                      <br />
                      <span className="font-semibold">{activeTask.frequency || '-'}</span> <span className="font-semibold">{activeTask.frequency_unit || '-'}</span>
                    </CCol>
                  </CRow>
                  <div className="text-lg text-neutral-text-field text-nowrap">
                    Job/Task Instruction
                  </div>
                  <div className='text-lg w-[815px] h-[135px] text-justify border rounded-[8px] px-4 py-2 mb-3'>
                    <div className='overflow-auto h-[110px] [&_p]:m-0' dangerouslySetInnerHTML={{ __html: activeTask.job_task.trim() || '-' }} />
                  </div>
                  <div className="text-lg text-neutral-text-field text-nowrap">
                    Post Maintenance Testing
                  </div>
                  <div className='text-lg w-[815px] h-[135px] text-justify border rounded-[8px] px-4 py-2 mb-3'>
                    <div className='overflow-auto h-[110px] [&_p]:m-0' dangerouslySetInnerHTML={{ __html: activeTask.post_maintenance_test.trim() || '-' }} />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="border-t border-[#E5E7E9] px-4 py-3 bg-neutral-white rounded-bl-2xl flex-shrink-0">
          <div className="text-right mx-5">
            <button
              onClick={() => {
                setAction('Read')
                deleteFailurDefends(activeTask)
              }}
              className="text-lg text-red-main hover:text-primary-hover mr-12"
            >
              Delete
            </button>
            <button
              onClick={() => {
                // setSelectedTask(activeTask)
                setAction('Change')
              }}
              className="text-lg text-primary-main hover:text-primary-hover"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailFailureDefends
