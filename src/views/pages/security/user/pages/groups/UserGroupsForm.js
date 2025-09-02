import { CButton, CFooter, CFormCheck, CFormLabel, CFormTextarea, CSpinner } from '@coreui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import useGroups from './hooks/useGroups'
import { DetailCard } from 'src/components/elements/cards'
import { CiPaperplane } from 'react-icons/ci'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { BsTrash } from 'react-icons/bs'
import { SelectPagination } from 'src/components/elements/select'
import { userGroupSchema } from './schema'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

// eslint-disable-next-line react/prop-types
const UserGroupsForm = ({ mode, setAction, setTabIndex }) => {
  const { formValue, isLoading, getSecurityGroupsService, handleSubmit, getOrgs } = useGroups({
    mode,
    setAction,
    setTabIndex,
  })
  const Notification = withReactContent(Swal)

  return (
    <Formik
      enableReinitialize
      initialValues={formValue}
      onSubmit={handleSubmit}
      validationSchema={userGroupSchema}
    >
      {({
        handleChange,
        setFieldValue,
        setFieldTouched,
        errors,
        isValid,
        dirty,
        touched,
        isSubmitting,
        values,
      }) => {
        return (
          <Form className="mb-3">
            <DetailCard isLoading={isLoading}>
              <div>
                <h4 className="w-font-semibold">Edit Groups</h4>
                <p>Update Groups Details</p>
              </div>
              <hr />
              <div className="container-fluid">
                {values.security_groups && (
                  <FieldArray
                    name="security_groups"
                    render={(arrayHelpers) =>
                      values?.security_groups?.map((item, index) => {
                        return (
                          <div className="my-2" key={index}>
                            <div className="flex">
                              <div className="bg-[#2671D9] rounded w-[35px] h-[40px] p-2 text-center mr-3">
                                <span className="text-white mb-1">{index + 1}</span>
                              </div>
                              {values?.security_groups.length > 1 && (
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
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Group <span className="text-red-main">*</span>
                                  </CFormLabel>
                                  <Field
                                    name={`security_groups.${index}.security_group_id`}
                                    placeholder="Select Security Group"
                                    apiController={getSecurityGroupsService}
                                    isAllData
                                    value={item?.security_group_id}
                                    valueKey="security_group_id"
                                    labelKey="security_group_code"
                                    onChange={(val) => {
                                      if (
                                        values.security_groups.find((group, idx) => {
                                          if (idx !== values.security_groups.length - 1) {
                                            return group?.security_group_id?.value === val?.value
                                          }
                                          return undefined
                                        }) !== undefined
                                      ) {
                                        Notification.fire({
                                          icon: 'error',
                                          title: 'Error!',
                                          text: 'Security Group already picked.',
                                        })
                                        setFieldValue(
                                          `security_groups.${index}.security_group_id`,
                                          null,
                                        )
                                      } else {
                                        setFieldValue(
                                          `security_groups.${index}.security_group_id`,
                                          val,
                                        )
                                        getOrgs({ security_groups: [{ security_group_id: val }] })
                                      }
                                    }}
                                    onBlur={() => {
                                      setFieldTouched(`security_groups.${index}.security_group_id`)
                                    }}
                                    size="md"
                                    required
                                    as={SelectPagination}
                                  />
                                  {errors?.security_groups?.[index]?.security_group_id &&
                                  touched?.security_groups?.[index]?.security_group_id ? (
                                    <div className="text-sm text-[#e55353] mt-1">
                                      {errors?.security_groups?.[index]?.security_group_id}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Description
                                  </CFormLabel>
                                  <Field
                                    name={`security_groups.${index}.security_group_description`}
                                    placeholder="No Description"
                                    value={item?.security_group_id?.security_group_description}
                                    disabled
                                    size="md"
                                    as={CFormTextarea}
                                  />
                                </div>
                                <div className="col">
                                  <CFormLabel className="text-primary fw-semibold">
                                    Is Authorized
                                  </CFormLabel>
                                  <Field
                                    className="mt-2"
                                    name={`security_groups.${index}.is_authorized`}
                                    id={`security_groups.${index}.is_authorized`}
                                    value={item?.is_authorized}
                                    size="md"
                                    label={item?.is_authorized ? 'Yes' : 'No'}
                                    checked={item?.is_authorized}
                                    as={CFormCheck}
                                  />
                                </div>
                              </div>
                              <hr />
                              <div className="w-full">
                                {index + 1 === values.security_groups.length && (
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    className="hover:text-white"
                                    onClick={() => {
                                      arrayHelpers.push({})
                                    }}
                                  >
                                    <CIcon icon={cilPlus} className="me-2" /> Add Group
                                  </CButton>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  />
                )}
              </div>
            </DetailCard>
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
                  disabled={isSubmitting || !(dirty && isValid)}
                  color="primary"
                  className="hover:text-white"
                  type="submit"
                >
                  <div className="flex items-center justify-center">
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
  )
}

export default UserGroupsForm
