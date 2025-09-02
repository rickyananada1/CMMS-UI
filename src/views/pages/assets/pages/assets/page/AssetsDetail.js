import React from 'react'
import { DetailCard } from 'src/components/elements/cards'
import useAsset from '../hooks/useAsset'
import StatusComponent from './StatusComponent'
import { CCol, CRow } from '@coreui/react'
import moment from 'moment'
import CardHeader from 'src/components/elements/cards/CardHeader'
import { FaPaperclip } from 'react-icons/fa'
import AttachmentDrawer from 'src/components/elements/drawer/AttachmentDrawer'

const AssetsDetail = ({ mode, setAction, setTabIndex }) => {
  const {
    data,
    isLoading,
    dataFile,
    isDrawerOpen,
    setDrawerOpen,
    selectedFile,
    setSelectedFile,
    handleOpenDrawer,
  } = useAsset({ mode, setAction, setTabIndex })

  return (
    <>
      <div className="bg-white p-3 rounded">
        <CRow>
          <CCol md="9">
            <DetailCard isLoading={isLoading}>
              <CardHeader
                description={data.asset_description}
                infoFields={[
                  { label: 'Assets ID', value: data.asset_num },
                  { label: 'Site', value: data.site },
                ]}
              />
              <div className="flex items-center mt-2 justify-between">
                <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                  General
                </p>
                <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
              </div>
              <div className="grid grid-cols-3 my-3">
                <div className="mb-3">
                  <label className="text-neutral-text-field">Asset</label>
                  <br />
                  <span className="font-semibold">{data.asset_num ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Description</label>
                  <br />
                  <span className="font-semibold">{data.asset_description ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">KKS Number</label>
                  <br />
                  <span className="font-semibold">{data.kks_number ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Existing Code</label>
                  <br />
                  <span className="font-semibold">{data.existing_code ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field mb-2">Status</label>
                  <br />
                  <StatusComponent status={data.status} />
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Site</label>
                  <br />
                  <span className="font-semibold">{data.site ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Type</label>
                  <br />
                  <span className="font-semibold">{data.asset_type ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Asset Template</label>
                  <br />
                  <span className="font-semibold">{data.asset_template ?? '-'}</span>
                </div>
              </div>
              <div className="flex items-center mt-2 justify-between">
                <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                  Details
                </p>
                <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
              </div>
              <div className="grid grid-cols-3 my-3">
                <div className="mb-3">
                  <label className="text-neutral-text-field">Parent</label>
                  <br />
                  <span className="font-semibold">{data.parent_asset_num ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Parent Description</label>
                  <br />
                  <span className="font-semibold">{data.parent_asset_description ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Location</label>
                  <br />
                  <span className="font-semibold">{data.location ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Location Description</label>
                  <br />
                  <span className="font-semibold">{data.location_description ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Bin</label>
                  <br />
                  <span className="font-semibold">{data.bin ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Rotating Item</label>
                  <br />
                  <span className="font-semibold">{data.rotating_item ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Rotating Item Description</label>
                  <br />
                  <span className="font-semibold">{data.rotating_item_description ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Usage</label>
                  <br />
                  <span className="font-semibold">{data.usage ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Condition Code</label>
                  <br />
                  <span className="font-semibold">{data.condition_code ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Condition Code Description</label>
                  <br />
                  <span className="font-semibold">{data.condition_code_description ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Meter Group</label>
                  <br />
                  <span className="font-semibold">{data.meter_group ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Meter Group Description</label>
                  <br />
                  <span className="font-semibold">{data.meter_group_description ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">GL Account</label>
                  <br />
                  <span className="font-semibold">{data.gl_account ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Calendar</label>
                  <br />
                  <span className="font-semibold">{data.calendar ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Shift</label>
                  <br />
                  <span className="font-semibold">{data.shift ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Priority (MPI)</label>
                  <br />
                  <span className="font-semibold">{data.priority ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Serial #</label>
                  <br />
                  <span className="font-semibold">{data.serial ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Failure Class</label>
                  <br />
                  <span className="font-semibold">{data.failure_code ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Item Type</label>
                  <br />
                  <span className="font-semibold">{data.item_type ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Tool Rate</label>
                  <br />
                  <span className="font-semibold">{data.tool_rate ?? '-'}</span>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-3 my-3">
                <div className="mb-3">
                  <label className="text-neutral-text-field">Vendor</label>
                  <br />
                  <span className="font-semibold">{data.vendor_name ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Detail Vendor</label>
                  <br />
                  <span className="font-semibold">{data.vendor_company ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Manufacturer</label>
                  <br />
                  <span className="font-semibold">{data.manufacture_name ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Detail Manufacturer</label>
                  <br />
                  <span className="font-semibold">{data.manufacture_company ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Instalation Date</label>
                  <br />
                  <span className="font-semibold">{data.instalation_date ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Purchase Price</label>
                  <br />
                  <span className="font-semibold">{data.purchase_price ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Replacement Cost</label>
                  <br />
                  <span className="font-semibold">{data.replacement_cost ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">PO</label>
                  <br />
                  <span className="font-semibold">{data.po ?? '-'}</span>
                </div>
              </div>
            </DetailCard>
          </CCol>
          <CCol md="3">
            <DetailCard isLoading={isLoading}>
              <div className="mb-5">
                <h4 className="w-full font-semibold">Detail</h4>
              </div>
              <CRow>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Status Date</label>
                  <br />
                  <span className="font-semibold">{data.status_date ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Move</label>
                  <br />
                  <span className="font-semibold">
                    {data.is_moved === null ? '-' : data.is_moved ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Changed By</label>
                  <br />
                  <span className="font-semibold">{data.updated_by ?? '-'}</span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Changed Date</label>
                  <br />
                  <span className="font-semibold">
                    {moment(data.updated_at).format('DD/MM/YYYY HH:mm:ss [WIB]') ?? '-'}
                  </span>
                </div>
                <div className="mb-3">
                  <label className="text-neutral-text-field">Attachments</label>
                  <br />
                  <button
                    onClick={handleOpenDrawer}
                    className="flex items-center gap-1 text-[#2c74d6] hover:text-[#1b4a89] text-base font-medium underline"
                  >
                    <FaPaperclip className="w-4 h-4" />
                    Attachments
                  </button>
                </div>
              </CRow>
            </DetailCard>
          </CCol>
        </CRow>
      </div>
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

export default AssetsDetail
