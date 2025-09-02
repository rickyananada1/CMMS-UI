import React from 'react'
import CheckTag from '../../../../../assets/icons/check-1-tag.svg'
import XTag from '../../../../../assets/icons/x-tag.svg'
import { CRow, CCol, CFormLabel } from '@coreui/react'
import useOrganizationDetail from '../../hooks/useOrganizationDetail'
import { DetailCard } from 'src/components/elements/cards'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const OrganizationDetail = ({ mode, setTabIndex }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useOrganizationDetail({ mode, setTabIndex })

  return (
    <>
      <DetailCard isLoading={isLoading}>
        <div className="w-full p-2">
          <CardHeader
            description={data?.organization_description}
            infoFields={[{ label: 'Organization', value: data?.organization_name }]}
          />
          <hr />
          <div className="grid grid-cols-4 gap-1">
            <div className="w-full">
              <div className="mb-2">
                <p className="text-cmms-grey">Organization</p>
                <p className="font-medium -mt-2">{data?.organization_name}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Item Set</p>
                <p className="font-medium -mt-2">{data?.item_set || '-'}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Default Item Status</p>
                <p className="font-medium -mt-2">{data?.default_item_status || '-'}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <p className="text-cmms-grey">Organization Description</p>
                <p className="font-medium -mt-2">{data?.organization_description ?? '-'}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Item Set Description</p>
                <p className="font-medium -mt-2">{data?.item_set_description || '-'}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Default Stock Category</p>
                <p className="font-medium -mt-2">{data?.default_stock_category || '-'}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-2">
                <p className="text-cmms-grey">Base Currency 1</p>
                <p className="font-medium -mt-2">{data?.base_currency || '-'}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Company Set</p>
                <p className="font-medium -mt-2">{data?.company_set || '-'}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Clearing Account</p>
                <p className="font-medium -mt-2">{data?.clearing_account || '-'}</p>
              </div>
            </div>
            <div className="w-full ">
              <div className="mb-2">
                <p className="text-cmms-grey">Base Currency Description</p>
                <p className="font-medium -mt-2">{data?.base_currency_description || '-'}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Company Set Description</p>
                <p className="font-medium -mt-2">{data?.company_set_description || '-'}</p>
              </div>
              <div className="mb-2">
                <p className="text-cmms-grey">Active</p>
                <p className="font-medium -mt-2">
                  <img src={data?.is_active ? CheckTag : XTag} width={15} height={15} alt={''} />
                </p>
              </div>
            </div>
          </div>
          <CRow className="mt-4 w-full">
            <CCol lg={12} className="mb-3">
              <CFormLabel>Attachments</CFormLabel>
              <button
                onClick={handleOpenDrawer}
                className="flex items-center gap-1 text-[#2c74d6] hover:text-[#1b4a89] text-base font-medium underline"
              >
                <FaPaperclip className="w-4 h-4" />
                Attachments
              </button>
            </CCol>
          </CRow>
        </div>
      </DetailCard>

      <AttachmentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        files={dataFile}
        selectedFile={selectedFile}
        onSelectFile={(file) => setSelectedFile(file)}
      />
    </>
  )
}

export default OrganizationDetail
