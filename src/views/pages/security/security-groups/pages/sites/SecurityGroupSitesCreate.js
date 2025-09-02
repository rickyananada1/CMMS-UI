import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CFooter,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CSpinner,
} from '@coreui/react'
import { Formik, Form, Field, FieldArray } from 'formik'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { SelectPagination } from 'src/components/elements/select'
import useCreateSites from './hooks/useCreateSites'
import { CiPaperplane } from 'react-icons/ci'
import { sitesSchema } from './schema'

const SecurityGroupSitesCreate = ({ setAction, setTabIndex }) => {
  const {
    formValue,
    handleSubmit,
    handleChangeSite,
    siteOrg,
    dataSiteOrg,
    userOrgId,
    duplicateSiteError,
    selectedRow,
  } = useCreateSites({
    setAction,
    setTabIndex,
  })

  return (
    <div className="p-3">
      <Formik
        enableReinitialize
        validationSchema={sitesSchema}
        initialValues={formValue}
        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
      >
        {({ setFieldValue, errors, isValid, dirty, isSubmitting, values }) => {
          return (
            <Form>
              <CCard className="card-b-left mb-3">
                <CCardBody className="p-5">
                  <h4 className="font-semibold">New Site</h4>
                  <div>
                    <p>Fill this column to add new site</p>
                  </div>
                  <hr />

                  <FieldArray
                    name="security_group_sites"
                    render={(arrayHelpers) =>
                      values.security_group_sites.map((item, index) => {
                        const detailSite = dataSiteOrg.find(
                          (res) => res.site_id === item.site_id.value,
                        )
                        return (
                          <div className="my-2" key={index}>
                            <div className="flex">
                              <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                <span className="text-white mb-1">{index + 1}</span>
                              </div>
                              {values.security_group_sites.length > 1 && (
                                <CButton
                                  color="danger"
                                  variant="outline"
                                  className="hover:text-white"
                                  onClick={() => {
                                    arrayHelpers.remove(index)
                                  }}
                                >
                                  <BsTrash />
                                </CButton>
                              )}
                            </div>
                            <div className="my-4">
                              <div className="row">
                                <div className="col-md-4 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Site <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`security_group_sites.${index}.site_id`}
                                    placeholder="Choose Site"
                                    value={item.site_id}
                                    apiController={siteOrg}
                                    parentId={userOrgId}
                                    query={{
                                      excludedSecurityGroupId: selectedRow.security_group_id,
                                    }}
                                    valueKey="site_id"
                                    labelKey="site"
                                    onChange={(val) => {
                                      if (
                                        !values.security_group_sites.some(
                                          (e, i) => e.site_id.value === val.value && i !== index,
                                        )
                                      ) {
                                        handleChangeSite(val.value)
                                        setFieldValue(`security_group_sites.${index}.site_id`, val)
                                      } else {
                                        duplicateSiteError()
                                      }
                                    }}
                                    as={SelectPagination}
                                  />
                                </div>
                                <div className="col-md-4 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name="description"
                                    placeholder="Enter Description"
                                    value={detailSite?.site_description}
                                    onChange={() => {}}
                                    disabled
                                    as={CFormTextarea}
                                  />
                                </div>
                                <div className="col-md-4 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Organization
                                  </CFormLabel>
                                  <Field
                                    name="organization"
                                    placeholder="Enter Organization"
                                    value={detailSite?.organization_name}
                                    onChange={() => {}}
                                    disabled
                                    as={CFormInput}
                                  />
                                </div>
                                <div className="col-md-4 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Active ?
                                  </CFormLabel>
                                  <div className="form-check">
                                    <Field
                                      name="active"
                                      id="active"
                                      value={item.active}
                                      onChange={() =>
                                        setFieldValue(
                                          `sites.${index}.active`,
                                          !detailSite.is_active,
                                        )
                                      }
                                      checked={detailSite?.is_active}
                                      size="lg"
                                      disabled
                                      as={CFormCheck}
                                    />
                                    <label className="form-check-label" htmlFor="active">
                                      Yes
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Authorized ?
                                  </CFormLabel>
                                  <div className="form-check">
                                    <Field
                                      name={`security_group_sites.${index}.is_authorized`}
                                      id="authorized"
                                      value={item.is_authorized}
                                      onChange={() =>
                                        setFieldValue(
                                          `security_group_sites.${index}.is_authorized`,
                                          !item.is_authorized,
                                        )
                                      }
                                      checked={item.is_authorized}
                                      size="lg"
                                      as={CFormCheck}
                                    />
                                    <label className="form-check-label" htmlFor="authorized">
                                      Yes
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <hr />
                              <div className="w-full">
                                {index + 1 === values.security_group_sites.length && (
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    className="hover:text-white"
                                    onClick={() => {
                                      arrayHelpers.push({
                                        site_id: '',
                                        is_authorized: false,
                                      })
                                    }}
                                  >
                                    <CIcon icon={cilPlus} className="me-2" /> Add new site
                                  </CButton>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  />
                </CCardBody>
              </CCard>
              <CFooter className="form-footer">
                <div className="ml-[80px] w-full my-2 flex items-center justify-between">
                  <CButton
                    color="danger"
                    variant="outline"
                    onClick={() => {
                      setAction('Read')
                    }}
                  >
                    Cancel
                  </CButton>
                  <CButton
                    color="primary"
                    className="hover:text-white"
                    type="submit"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    <div className="flex items-center">
                      {isSubmitting ? (
                        <>
                          Submit <CSpinner className="ms-2" color="light" size="sm" />
                        </>
                      ) : (
                        <>
                          Submit <CiPaperplane className="ms-2" />
                        </>
                      )}
                    </div>
                  </CButton>
                </div>
              </CFooter>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default SecurityGroupSitesCreate
