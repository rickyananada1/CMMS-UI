import React, { Fragment } from 'react'
import {
  CButton,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import useAssetsRelationDelete from './hooks/useAssetsRelationDelete'

const AssetsRelationDelete = ({ mode, initialVisible, setVisible, setAction, setTabIndex }) => {
  const { formValue, getAssetRelationDropdown, handleDelete, setRelationFieldValue } =
    useAssetsRelationDelete({
      setAction,
      setTabIndex,
      setVisible,
      initialVisible,
    })
  return (
    <CModal
      backdrop="static"
      alignment="center"
      size="lg"
      visible={mode === 'Delete'}
      onClose={() => setVisible(mode !== 'Delete')}
      aria-labelledby="movemodifyasset"
    >
      <CModalHeader>
        <CModalTitle id="movemodifyasset">
          <h5 className="heading-small">Delete Relation Update </h5>
        </CModalTitle>
      </CModalHeader>
      <Formik enableReinitialize initialValues={formValue} onSubmit={handleDelete}>
        {(props) => {
          const { isSubmitting, values } = props

          return (
            <Fragment>
              <Form>
                <CModalBody>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                      <Field
                        name="asset_relation_ids"
                        placeholder="Enter Asset"
                        valueKey="asset_relation_id"
                        labelKey="related_asset_num"
                        value={values.asset_relation_ids}
                        isMulti
                        apiController={getAssetRelationDropdown}
                        onChange={(val) => {
                          setRelationFieldValue(val)
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                    </div>
                  </div>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Delete
                  </CButton>
                </CModalFooter>
              </Form>
            </Fragment>
          )
        }}
      </Formik>
    </CModal>
  )
}

export default AssetsRelationDelete
