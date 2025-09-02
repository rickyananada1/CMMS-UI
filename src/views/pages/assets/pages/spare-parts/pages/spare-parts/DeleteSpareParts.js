import { CButton, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { Fragment, useState } from 'react'
import { TabsSubWrapper } from 'src/components/elements/tabs/TabsSubWrapper'
import useSparePartsTab from '../../hooks/useSparePartsTab'
import { Field, Form, Formik } from 'formik'
import { SelectPagination } from 'src/components/elements/select'
import useSpareParts from '../../hooks/spare-parts/useSparePartsList'
import useSparePartsDelete from '../../hooks/spare-parts/useSparePartsDelete'
import useSubassemblies from '../../hooks/subassemblies/useSubassembliesList'
import useSubassembliesDelete from '../../hooks/subassemblies/useSubassembliesDelete'
import { useSelector } from 'react-redux'

const DeleteSpareParts = ({ initialVisible, setAction }) => {
  const [visible, setVisible] = useState(initialVisible)
  const { tabIndex, setTabIndex } = useSparePartsTab()

  const DeleteSparePart = ({ mode }) => {
    const { getSpareParts } = useSpareParts()
    const { getSubassemblies } = useSubassemblies()
    const { initialValue, setFieldValue, handleDeleteSpareParts } = useSparePartsDelete({
      setAction,
    })
    const { setSubassenbliesFieldValue, handleDeleteSubassemblies } = useSubassembliesDelete({
      setAction,
    })

    const selectedRow = useSelector((state) => state.assets?.selectedAsset)

    return (
      <div className="mt-3 mb-3">
        <Formik initialValues={initialValue}>
          {({ handleChange, values }) => {
            return (
              <Form initialValues={initialValue}>
                <CFormLabel className="fw-semibold">List</CFormLabel>
                <Field
                  name="spareparts"
                  placeholder="Enter Asset"
                  onChange={(event) =>
                    mode === 'subassemblies'
                      ? setSubassenbliesFieldValue(event)
                      : setFieldValue(event)
                  }
                  size="md"
                  required
                  className="w-100"
                  apiController={mode === 'subassemblies' ? getSubassemblies : getSpareParts}
                  valueKey={mode === 'subassemblies' ? 'asset_id' : 'sparepart_id'}
                  labelKey={mode === 'subassemblies' ? 'asset_num' : 'item_num'}
                  value={values?.spareparts}
                  parentId={selectedRow.asset_id}
                  as={SelectPagination}
                />
                <div className="d-flex justify-content-end mt-3">
                  <CButton
                    color="danger"
                    style={{ color: 'white' }}
                    onClick={
                      mode === 'subassemblies'
                        ? () => handleDeleteSubassemblies()
                        : handleDeleteSpareParts
                    }
                  >
                    Delete
                  </CButton>
                  {/* <CButton
                    color="primary"
                    variant="ghost"
                    className="ml-3"
                    onClick={() => setVisible(!visible)}
                  >
                    Cancel
                  </CButton> */}
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    )
  }

  const tabsContent = [
    {
      title: 'Subassemblies',
      element: <DeleteSparePart mode="subassemblies" />,
    },
    {
      title: 'Spare Parts',
      element: <DeleteSparePart mode="spare-parts" />,
    },
  ]

  return (
    <Fragment>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(!visible)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">
            <h5 className="heading-small">Delete Spare Parts</h5>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="fw-semibold">Type</p>
          <TabsSubWrapper
            defaultIndex={tabIndex}
            selectedIndex={tabIndex}
            content={tabsContent}
            onSelect={(tabIndex) => {
              setTabIndex(tabIndex)
            }}
          />
        </CModalBody>
      </CModal>
    </Fragment>
  )
}

export default DeleteSpareParts
