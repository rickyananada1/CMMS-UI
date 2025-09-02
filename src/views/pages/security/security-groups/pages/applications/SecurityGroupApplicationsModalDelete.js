import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormLabel,
  CModalFooter,
} from '@coreui/react'
import { Select } from 'src/components/elements/select'

const SecurityGroupApplicationsDelete = ({
  visible,
  setVisible,
  selectedRow,
  dataListApplication,
  dataRemovedApplication,
  deleteApplications,
  setDataRemovedApplication,
}) => {
  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>
          <h5 className="heading-small mb-0">Delete Application</h5>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="d-flex flex-column border-l-[4px] border-primary-main rounded-sm">
          <p className="ms-2 font-semibold text-body-medium mb-0">
            {selectedRow?.security_group_code ?? '-'}
          </p>
          <p className="ms-2 text-body-medium mb-0">
            <span className="font-light">Group : </span>
            <span className="font-semibold">{selectedRow?.security_group_code ?? '-'}</span>
          </p>
        </div>

        <div className="py-4">
          <CFormLabel className="text-primary fw-semibold">Application</CFormLabel>
          <Select
            placeholder="Select Applications"
            options={dataListApplication}
            value={dataRemovedApplication}
            onChange={(event) => setDataRemovedApplication(event)}
            size="md"
            isMulti
            required
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end">
          <CButton
            disabled={!dataRemovedApplication.length}
            color="danger"
            style={{ color: 'white' }}
            onClick={() => deleteApplications()}
          >
            Delete
          </CButton>
          <CButton
            onClick={() => setVisible(!visible)}
            color="primary"
            variant="ghost"
            className="ml-3"
          >
            Cancel
          </CButton>
        </div>
      </CModalFooter>
    </CModal>
  )
}

export default SecurityGroupApplicationsDelete
