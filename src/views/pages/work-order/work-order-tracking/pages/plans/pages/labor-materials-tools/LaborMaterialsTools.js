import React, { Fragment } from 'react'
import LaborList from './components/labor/LaborList'
import { DetailCard } from 'src/components/elements/cards'
import useLaborMaterialsToolsList from './hooks/useLaborMaterialsToolsList'
import LaborFormSingle from './components/labor/LaborFormSingle'
import MaterialsFormSingle from './components/materials/MaterialsFormSingle'
import ToolsFormSingle from './components/tools/ToolsFormSingle'
import MaterialsList from './components/materials/MaterialsList'
import ToolsList from './components/tools/ToolsList'
import CardHeader from 'src/components/elements/cards/CardHeader'

const LaborMaterialTools = ({ mode, setAction }) => {
  const { selectedRow } = useLaborMaterialsToolsList()

  return (
    <DetailCard>
      {mode === 'Read' && (
        <DataDisplay mode={mode} setAction={setAction} selectedRow={selectedRow} />
      )}
      {mode === 'Delete Labor' && (
        <DataDisplay mode={mode} setAction={setAction} selectedRow={selectedRow} />
      )}
      {mode === 'Delete Materials' && (
        <DataDisplay mode={mode} setAction={setAction} selectedRow={selectedRow} />
      )}
      {mode === 'Delete Tools' && (
        <DataDisplay mode={mode} setAction={setAction} selectedRow={selectedRow} />
      )}
      {mode === 'Create Labor' && <LaborFormSingle mode={mode} setAction={setAction} />}
      {mode === 'Create Materials' && <MaterialsFormSingle mode={mode} setAction={setAction} />}
      {mode === 'Create Tools' && <ToolsFormSingle mode={mode} setAction={setAction} />}
      {mode === 'Update Labor' && <LaborFormSingle mode={mode} setAction={setAction} />}
      {mode === 'Update Materials' && <MaterialsFormSingle mode={mode} setAction={setAction} />}
      {mode === 'Update Tools' && <ToolsFormSingle mode={mode} setAction={setAction} />}
    </DetailCard>
  )
}

const DataDisplay = ({ mode, setAction, selectedRow }) => {
  return (
    <Fragment>
      <CardHeader
        description={selectedRow?.description}
        infoFields={[
          { label: 'Work Order', value: selectedRow?.work_order_code },
          { label: 'Parent WO', value: selectedRow?.parent_wo },
          { label: 'Site', value: selectedRow?.site },
          { label: 'Status', value: selectedRow?.status },
        ]}
      />
      <div className="mt-4">
        <LaborList mode={mode} setAction={setAction} />
      </div>
      <div className="mt-4">
        <MaterialsList mode={mode} setAction={setAction} />
      </div>
      <div className="mt-4">
        <ToolsList mode={mode} setAction={setAction} />
      </div>
    </Fragment>
  )
}

export default LaborMaterialTools
