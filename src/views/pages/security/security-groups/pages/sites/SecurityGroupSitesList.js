import React, { Fragment } from 'react'
import XTag from 'src/assets/icons/x-tag.svg'
import useListSites from './hooks/useListSites'
import CheckTag from 'src/assets/icons/check-tag.svg'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Table } from 'src/components/elements/table'
import { DetailCard } from 'src/components/elements/cards'
import { useSiteList } from './services/getSites'
import SecurityGroupSitesDeleteModal from './SecurityGroupSitesDeleteModal'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = (row) => {
  const data = row.row?.original
  return (
    <div className="px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-5 my-3">
        <div>
          <label className="text-slate-400">Site</label>
          <p className="font-bold">{data.site ? data.site : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Description</label>
          <p className="font-bold">{data.site_description ? data.site_description : '-'}</p>
        </div>
        {/* <div>
          <label className="text-slate-400">Organization</label>
          <p className="font-bold">{data.organization ? data.organization : '-'}</p>
        </div> */}
        <div>
          <label className="text-slate-400">Active ?</label>
          <img
            src={data.is_active ? CheckTag : XTag}
            width={20}
            height={20}
            alt={`${data.active}-${data.site}`}
          />
        </div>
        <div>
          <label className="text-slate-400">Authorized ?</label>
          <img
            src={data.is_authorized ? CheckTag : XTag}
            width={20}
            height={20}
            alt={`${data.is_authorized}-${data.site}`}
          />
        </div>
      </div>
    </div>
  )
}

const columns = [
  {
    header: ' ',
    size: 10,
    cell: ({ row }) => {
      return (
        <Fragment>
          {row.getCanExpand() && (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer', padding: '10px' },
              }}
            >
              {row.getIsExpanded() ? (
                <IoIosArrowUp className="w-5 h-5" />
              ) : (
                <IoIosArrowDown className="w-5 h-5" />
              )}
            </button>
          )}
        </Fragment>
      )
    },
  },
  {
    header: 'Site',
    accessorKey: 'site',
  },
  {
    header: 'Description',
    accessorKey: 'site_description',
  },
  /*
  {
    header: 'Organization',
    accessorKey: 'organization',
  },
  */
  {
    header: 'Active ?',
    accessorKey: 'is_active',
    cell: (row) => (
      <img src={row.getValue() ? CheckTag : XTag} width={20} height={20} alt={row.getValue()} />
    ),
  },
  {
    header: 'Authorized ?',
    accessorKey: 'is_authorized',
    sortable: true,
    cell: (row) => (
      <img src={row.getValue() ? CheckTag : XTag} width={20} height={20} alt={row.getValue()} />
    ),
  },
]

const SecurityGroupSitesList = ({ visible, setVisible }) => {
  const { tableRef, selectedRow, downloadSites } = useListSites()

  return (
    <Fragment>
      <DetailCard>
        <CardHeader
          description={selectedRow?.security_group_description}
          infoFields={[{ label: 'Group', value: selectedRow?.security_group_code }]}
          onDownload={downloadSites}
        />
        <hr />
        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.security_group_id}
          query={{}}
          apiController={useSiteList}
          canExpand={true}
          tableSubComponent={ExpandedComponent}
        />
      </DetailCard>
      <SecurityGroupSitesDeleteModal
        tableRef={tableRef}
        visible={visible}
        setVisible={setVisible}
      />
    </Fragment>
  )
}

export default SecurityGroupSitesList
