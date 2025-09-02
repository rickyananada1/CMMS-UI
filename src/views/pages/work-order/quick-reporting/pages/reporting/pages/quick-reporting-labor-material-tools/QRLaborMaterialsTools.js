import React, { Fragment } from 'react'
import { DetailCard } from 'src/components/elements/cards'
import { useSelector } from 'react-redux'
import LaborList from './pages/labor/LaborList'
import MaterialsList from './pages/materials/MaterialsList'
import ToolsList from './pages/tools/ToolsList'
import LaborFormSingle from './pages/labor/LaborFormSingle'
import MaterialsFormSingle from './pages/materials/MaterialsFormSingle'
import ToolsFormSingle from './pages/tools/ToolsFormSingle'
import LaborForm from './pages/labor/LaborForm'
import MaterialsForm from './pages/materials/MaterialsForm'
import ToolsForm from './pages/tools/ToolsForm'
import CardHeader from 'src/components/elements/cards/CardHeader'

const QRLaborMaterialTools = ({ mode, setAction }) => {
  const selectedRow = useSelector((state) => state.quickReporting?.selectedWorkOrder)

  return (
    <DetailCard>
      {['Read', 'Delete Labor', 'Delete Materials', 'Delete Tools'].includes(mode) && (
        <Index mode={mode} setAction={setAction} selectedRow={selectedRow} />
      )}
      {mode === 'Create Labor' && <LaborForm mode={mode} setAction={setAction} />}
      {mode === 'Create Materials' && <MaterialsForm mode={mode} setAction={setAction} />}
      {mode === 'Create Tools' && <ToolsForm mode={mode} setAction={setAction} />}
      {mode === 'Update Labor' && <LaborFormSingle mode={mode} setAction={setAction} />}
      {mode === 'Update Materials' && <MaterialsFormSingle mode={mode} setAction={setAction} />}
      {mode === 'Update Tools' && <ToolsFormSingle mode={mode} setAction={setAction} />}
    </DetailCard>
  )
}

const Index = ({ selectedRow, mode, setAction }) => {
  return (
    <Fragment>
      <CardHeader
        description={selectedRow?.description}
        infoFields={[
          { label: 'Work Order', value: selectedRow?.work_order_code },
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

export default QRLaborMaterialTools
