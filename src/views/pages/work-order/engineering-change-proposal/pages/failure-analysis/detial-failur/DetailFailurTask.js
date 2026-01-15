/* eslint-disable */
/* prettier-ignore-start */
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { MdClose } from 'react-icons/md'
import { FaRegFileAlt } from 'react-icons/fa'
import AttachmentPreview from '../../../../../../../components/elements/drawer/AttachmentPreview'
import moment from 'moment'

const DetailFailurTask = ({tasks, isOpen, onClose, files, selectedFile, onSelectFile, type }) => {
  const [btnActive, btnSetActive] = useState(false);

  const allTabs = React.useMemo(() => {
    if (!tasks) return [];

    return [
      {
        key: 'fmea',
        name: 'Failure Mode Effect Analysis (FMEA)',
        title: tasks?.fmea_summary || '',
        content: tasks?.fmea_desc || ''
      },
      {
        key: 'rcfa',
        name: 'Root Cause Failure Analysis (RCFA)',
        title: tasks?.rcfa_summary || '',
        content: tasks?.rcfa_desc || ''
      },
      {
        key: 'cba',
        name: 'Cost Benefit Analysis (CBA)',
        title: tasks?.cba_summary || '',
        content: tasks?.cba_desc || ''
      },
      {
        key: 'lcca',
        name: 'Life Cycle Cost Analysis (LCCA)',
        title: tasks?.lcca_summary || '',
        content: tasks?.lcca_desc || ''
      }
    ];
  }, [tasks]);

  const [activeTab, setActiveTab] = useState(type || 'fmea');

  const activeTabData = React.useMemo(() => {
    return allTabs.find(tab => tab.key === activeTab) || allTabs[0];
  }, [activeTab, allTabs]);

  useEffect(() => {
    if (type) {
      setActiveTab(type.toLowerCase());
    }
  }, [type]);

  useEffect(() => {
    if (!isOpen) {
      setActiveTab('');
    }
  }, [isOpen]);

  const activeStyle =
    "font-semibold  border border-0 rounded-[8px] bg-[#FFFFFF] pt-[8px] pb-[8px] pl-4 pr-4 w-[148px]";
  const inactiveStyle =
    "border border-0 rounded-[8px] bg-[#F3F3F3]  pt-[8px] pb-[8px] pl-4 pr-4 w-[148px]";
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
          'fixed top-0 right-0 w-[1200px] bg-white shadow-lg z-[1100] transform transition-transform duration-300 flex flex-col rounded-tl-2xl rounded-bl-2xl',
          {
            'translate-x-0': isOpen,
            'translate-x-full': !isOpen,
          },
        )}
        style={{ height: "100%", minHeight: "928px", overflow: "scroll" }}
      >
        <div className="flex justify-between items-center w-[1200px] px-4 py-3 border-[#E5E7E9] flex-shrink-0">
          <span className="text-2xl font-semibold">Detail Failure Analysis</span>
          <button onClick={onClose}>
            <MdClose className="w-8 h-8" />
          </button>
        </div>
        <div style={{ padding: 20, borderRadius: "8px" }}>
          <div className="cursor-pointer mb-3 flex justify-start gap-2 rounded">
            {allTabs.map((tab) => {
              const tabctive = activeTab === tab.key;
              const isEmpty = (!tab.title || tab.title.trim() === '' || tab.title.trim() === 'gak') &&
                (!tab.content || tab.content.trim() === '' || tab.content.trim() === 'oke');
              const title = tab.title ? tab.title : '-';
              const content = tab.content ? tab.content : '-';
              return (
                <div
                  key={tab.key}
                  onClick={() => {
                    if (!isEmpty) {
                      setActiveTab(tab.key);
                    }
                  }}
                  className={`cursor-pointer ${tabctive ? 'bg-blue-100' : 'bg-white'}`}
                  data-disabled={isEmpty}
                >
                  <div className="w-[285px] border rounded-[8px] px-4 py-2" style={{ background: tabctive ? "#E9F1FB" : "#FFFFFF" }}>
                    <div className='flex flex-col gap-y-3'>
                      <div className='border rounded border-0 max-w-[65px] font-semibold p-[8px] text-center' style={{
                        color: tabctive ? "#ffffff" : isEmpty ? "#7F7F80" : "#2671D9",
                        background: tabctive ? "#2671D9" : isEmpty ? "#E0E0E0" : "#E9F1FB"
                      }}>
                        {tab.key.toUpperCase()}
                      </div>
                      <div className='font-semibold truncate w-100' style={{ color: tabctive ? "#2671D9" : "#333333" }}>{title ?? '-'}</div>
                      <div className='font-normal text-[#7F7F80] text-sm truncate overflow-hidden w-full min-h-[36px]' dangerouslySetInnerHTML={{ __html: content ?? '-' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {activeTabData &&
          <div>
            <div className="flex justify-between items-center mt-[32px] p-4">
              <div className="font-semibold mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                {activeTabData.name}
              </div>
              <div className="border border-0 rounded-[8px] bg-[#F3F3F3] py-2 px-[18px] w-[324px] flex justify-between gap-[8px] items-center">
                <button onClick={() => btnSetActive(!btnActive)} className={clsx(btnActive ? inactiveStyle : activeStyle)}>Details</button>
                <button onClick={() => btnSetActive(!btnActive)} className={clsx(btnActive ? activeStyle : inactiveStyle)}>Attachments</button>
              </div>
            </div>
            {btnActive &&
              <div className="h-[525px] flex flex-1 overflow-hidden">
                <div className="w-1/3 overflow-y-auto">
                  <div className="flex items-center justify-between px-4 py-2 sticky top-0 bg-white z-10">
                    <div className="text-lg text-neutral-text-field text-nowrap font-semibold">
                      File attached
                    </div>
                    <hr className="flex-1 ml-2 h-[1px] bg-neutral-stroke" />
                  </div>

                  <div className="flex flex-col gap-3 mt-2 px-4 pb-4">
                    {Array.isArray(files) && files.length > 0 ? (
                      files.map((file, idx) => {
                        const fileName = file?.file_path?.split('/')
                        const dateFile = moment(file.created_at).format('YYYY-MM-DD HH:mm')

                        return (
                          <div
                            key={idx}
                            onClick={() => onSelectFile(file)}
                            className={clsx(
                              'flex items-center p-3 border rounded-xl shadow-sm w-full space-x-4 hover:bg-[#e5e5e5] hover:cursor-pointer',
                              selectedFile?.file_path === file?.file_path ? 'bg-[#e9f1fb]' : 'bg-white',
                            )}
                          >
                            <div className="bg-gradient-to-r from-[#2c74d6] to-[#1b4a89] w-14 h-14 rounded-full flex items-center justify-center">
                              <FaRegFileAlt className="text-neutral-white h-7 w-7" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-lg font-semibold text-neutral-primary-text truncate mb-1">
                                {fileName[2]}
                              </p>
                              <p className="text-base text-neutral-text-field truncate mb-0">
                                <span className="font-semibold text-neutral-primary-text">
                                  {file?.size_mb ?? 0}
                                </span>
                                MB &nbsp;
                                <span className="font-semibold text-neutral-primary-text">
                                  {dateFile}
                                </span>
                              </p>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-gray-400 text-center text-lg mt-3 font-semibold">
                        No files to show
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-2/3 p-4 flex flex-col overflow-hidden">
                  {selectedFile && (
                    <div className="flex items-center justify-between mb-2 flex-shrink-0">
                      <h2 className="text-lg font-semibold text-gray-700 truncate">
                        {selectedFile?.file_path?.split('/')[2]}
                      </h2>
                      <button
                        onClick={(event) =>
                          handleDownload(event, selectedFile?.url, selectedFile?.file_path?.split('/')[2])
                        }
                        className="inline-block py-1.5 text-sm font-medium text-primary-main hover:text-primary-hover underline"
                      >
                        Download
                      </button>
                    </div>
                  )}

                  <div className="flex-1 overflow-hidden border rounded border-[#E5E7E9] flex items-center justify-center">
                    {selectedFile ? (
                      <AttachmentPreview
                        fileUrl={selectedFile?.preview}
                        fileName={selectedFile?.file_path?.split('/')[2]}
                      />
                    ) : (
                      <p className="text-gray-500 text-center font-semibold">No preview available.</p>
                    )}
                  </div>
                </div>
              </div>
            }
            {!btnActive && activeTabData && (
              <div className="p-4">
                <div className="py-4 px-8 border border-1 rounded-lg bg-[#FAFAFA] border-[#E5E7E9] mt-3">
                  <div className="text-center font-semibold text-base">
                    {activeTabData.title}
                  </div>
                  <div className="mt-4 font-[14px]" dangerouslySetInnerHTML={{ __html: activeTabData.content ?? '-' }}>
                  </div>
                </div>
              </div>
             )
            }
          </div>
        }
      </div>
    </>
  )
}

export default DetailFailurTask
