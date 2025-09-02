import { CCard, CCardBody } from '@coreui/react'
import React, { Fragment } from 'react'
import CreateIndex from './pages/CreateIndex'
import Subassemblies from './pages/subassemblies/Subassemblies'
import SpareParts from './pages/spare-parts/SpareParts'
import DeleteSpareParts from './pages/spare-parts/DeleteSpareParts'
import EditIndex from './pages/EditIndex'

const AssetsSpareParts = ({ mode, setAction }) => {
  return (
    <div className="mb-3">
      <CCard className="rounded card">
        <CCardBody>
          {mode === 'Read' && (
            <Fragment>
              <div className="mb-3">
                <Subassemblies />
              </div>
              <div className="mb-3">
                <SpareParts />
              </div>
              <DeleteSpareParts initialVisible={false} setAction={setAction} />
            </Fragment>
          )}
          {mode === 'Delete' && (
            <Fragment>
              <div className="mb-3">
                <Subassemblies />
              </div>
              <div className="mb-3">
                <SpareParts />
              </div>
              <DeleteSpareParts initialVisible={true} setAction={setAction} />
            </Fragment>
          )}
          {mode === 'Create' && <CreateIndex setAction={setAction} />}
          {mode === 'Update' && <EditIndex setAction={setAction} mode={mode} />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default AssetsSpareParts
