import React, { Fragment } from 'react'
import { Table } from 'src/components/elements/table'
import { DetailCard } from 'src/components/elements/cards'
import useAssetsRelationList from './hooks/useAssetsRelationList'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useDeleteRelation, useGetListRelation } from './services'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import CardHeader from 'src/components/elements/cards/CardHeader'

const ExpandedComponent = (row) => {
  const data = row.row?.original
  return (
    <div className="px-5 py-3">
      <h5 className="font-bold">Details</h5>
      <div className="grid grid-cols-4 my-3">
        <div>
          <label className="text-slate-400">Relation to Asset</label>
          <p className="font-bold">{data.related_asset_num ? data.related_asset_num : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Description</label>
          <p className="font-bold">
            {data.related_asset_description ? data.related_asset_description : '-'}
          </p>
        </div>
        <div>
          <label className="text-slate-400">Location</label>
          <p className="font-bold">{data.location ? data.location : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Description</label>
          <p className="font-bold">{data.location_description ? data.location_description : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Relation Name</label>
          <p className="font-bold">{data.relation_name ? data.relation_name : '-'}</p>
        </div>
        <div>
          <label className="text-slate-400">Relation Type</label>
          <p className="font-bold">{data.relation_type ? data.relation_type : '-'}</p>
        </div>
      </div>
    </div>
  )
}

const AssetsRelaionList = ({ mode, setAction }) => {
  const { selectedRow, tableRef, selectedRowRelation, setSelectedRow, downloadRelation } =
    useAssetsRelationList()

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
      header: 'Relation to Assets',
      accessorKey: 'related_asset_num',
    },
    {
      header: 'Description',
      accessorKey: 'related_asset_description',
    },
    {
      header: 'Location',
      accessorKey: 'location',
    },
    {
      header: 'Description',
      accessorKey: 'location_description',
    },
    {
      header: 'Relation Name',
      accessorKey: 'relation_name',
    },
    {
      header: 'Relation Type',
      accessorKey: 'relation_type',
    },
  ]

  return (
    <>
      <DetailCard>
        <CardHeader
          description={selectedRow?.asset_description}
          infoFields={[
            { label: 'Assets ID', value: selectedRow?.asset_num },
            { label: 'Site', value: selectedRow?.site },
          ]}
          onDownload={downloadRelation}
        />
        <hr />
        <Table
          tableRef={tableRef}
          columns={columns}
          parentId={selectedRow?.asset_id}
          apiController={useGetListRelation}
          canExpand={true}
          tableSubComponent={ExpandedComponent}
          selectableRowSelected={(row) =>
            row.original?.asset_relation_id === selectedRowRelation?.asset_relation_id
          }
          onRowClicked={(row) => setSelectedRow(row.original)}
          hasAutoNumber
        />
      </DetailCard>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setSelectedRow={setSelectedRow}
          data_id={selectedRow?.asset_id}
          data_name={`${selectedRowRelation?.asset_num} relation to ${selectedRowRelation?.related_asset_num}`}
          deleteService={useDeleteRelation}
          tableRef={tableRef}
          deleteBody={{
            asset_relation_ids: [selectedRowRelation?.asset_relation_id],
          }}
        />
      )}
    </>
  )
}
export default AssetsRelaionList
