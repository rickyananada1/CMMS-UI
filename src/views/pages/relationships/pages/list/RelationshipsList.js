import React from 'react'
import { Table } from 'src/components/elements/table'
import useRelationshipsList from './hooks/useRelationshipsList'
import { useGetListRelationships } from './services'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputGlobalSearch from 'src/components/elements/input/InputSearch'
import DeleteConfirmation from 'src/components/elements/DeleteConfirmation/DeleteConfirmation'
import { useDeleteRelationship } from '../relationship/services'

const RelationshipsList = ({ mode, setAction, setTabIndex }) => {
  const {
    selectedRow,
    tableRef,
    setSelectedRow,
    setSearch,
    searchDebounce,
    downloadRelationships,
  } = useRelationshipsList()

  const columns = [
    {
      header: 'Relation Name',
      accessorKey: 'relation_name',
      qName: 'qRelationName',
    },
    {
      header: 'Asset',
      accessorKey: 'asset_description',
      qName: 'qAssetDescription',
    },
    {
      header: 'Related To',
      accessorKey: 'related_asset_description',
      qName: 'qRelatedAssetDescription',
    },
    {
      header: 'Type',
      accessorKey: 'relation_type',
      qName: 'qRelationType',
    },
  ]

  return (
    <>
      <div className="p-4 bg-white rounded">
        <div className="flex items-center justify-between">
          <InputGlobalSearch onChange={setSearch} />
          <button
            className={`flex items-center cursor-pointer text-body-bold text-primary-main`}
            onClick={downloadRelationships}
          >
            <MdOutlineCloudDownload className={`mr-2 text-primary-main`} />
            Download
          </button>
        </div>
        <Table
          tableRef={tableRef}
          columns={columns}
          apiController={useGetListRelationships}
          query={{ q: searchDebounce || undefined }}
          selectableRowSelected={(row) =>
            row.original?.asset_relation_id === selectedRow?.asset_relation_id
          }
          onRowClicked={(row) => setSelectedRow(row.original)}
          isAutoSelectFirstRow={false}
          hasAutoNumber
          isWithSearchField
        />
      </div>
      {mode === 'Delete' && (
        <DeleteConfirmation
          setAction={setAction}
          setTabIndex={setTabIndex}
          setSelectedRow={setSelectedRow}
          data_id={selectedRow?.asset_id}
          data_name={`${selectedRow?.asset_num} relation to ${selectedRow?.related_asset_num}`}
          deleteService={useDeleteRelationship}
          tableRef={tableRef}
          deleteBody={{
            asset_relation_ids: [selectedRow?.asset_relation_id],
          }}
        />
      )}
    </>
  )
}
export default RelationshipsList
