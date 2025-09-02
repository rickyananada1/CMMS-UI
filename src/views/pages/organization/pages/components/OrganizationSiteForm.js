import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFooter,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CSpinner,
} from '@coreui/react'
import { CiPaperplane } from 'react-icons/ci'
import { Form, Field, Formik, FieldArray } from 'formik'
import useOrganizationSiteForm from '../../hooks/useOrganizationSiteForm'
import { Select } from 'src/components/elements/select'
import { BsTrash } from 'react-icons/bs'
import { SelectPagination } from 'src/components/elements/select'

const OrganizationSiteForm = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    sitesSchema,
    handleSubmit,
    formSelectOpt,
    selectedSite,
    selectedRow,
    // getAddressList,
    getSitesSektor,
    getSitesKantorInduk,
    getAddressNonSiteList,
    duplicateAddressError,
  } = useOrganizationSiteForm(mode, setAction, setTabIndex)
  return (
    <Formik
      enableReinitialize
      validationSchema={sitesSchema}
      initialValues={formValue}
      onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
    >
      {({
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        setFieldTouched,
        values,
        isSubmitting,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <div className="w-full bg-white border border-gray-200 rounded-lg p-4">
              <CCard className="card-b-left pb-5">
                <CCardBody>
                  <div>
                    <p className="font-medium">{mode === 'Update' ? 'Edit' : 'New'} Site</p>
                    <p className="text-sm -mt-1 text-cmms-grey">
                      {selectedSite ? 'Update Site Details' : 'Fill this column to add new site'}
                    </p>
                  </div>
                  <hr />
                  <div className="container-fluid !-mx-3">
                    <div className="row my-3">
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="site">
                          Site <span className="text-red-main">*</span>
                        </CFormLabel>
                        {/* <Field
                          name="site"
                          placeholder="Choose Site"
                          onChange={(val) => {
                            setFieldValue('site', val)
                            setFieldValue('site_description', val?.address_code_description)
                            setFieldValue('addresses[0].site_address_name', {
                              ...val,
                              value: val.address_id,
                            })
                            setFieldValue(
                              'addresses[0].site_address_description',
                              val?.address_code_description,
                            )
                            // setAutofill(event, workOrder)
                          }}
                          size="md"
                          // required
                          value={values?.site}
                          as={SelectPagination}
                          disabled={mode === 'Update'}
                          apiController={getAddressList}
                          query={{
                            organization_id: selectedRow?.organization_id,
                          }}
                          valueKey="address_code"
                          labelKey="address_code"
                          otherKey={{
                            address_id: 'address_id',
                            address_code_description: 'address_code_description',
                          }}
                        /> */}
                        <Field
                          id="site"
                          size="sm"
                          className="px-3 py-2"
                          name="site"
                          placeholder="Enter Site Name"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.site && touched.site ? (
                          <div className="text-sm text-[#b03434] mt-1">{errors.site}</div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="site_description">
                          Site Description <span className="text-red-main">*</span>
                        </CFormLabel>
                        <Field
                          id="site_description"
                          size="sm"
                          className="px-3 py-2"
                          name="site_description"
                          placeholder="Enter Site Description"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.site_description && touched.site_description ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.site_description}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="unit_id">
                          Unit ID <span className="text-red-main">*</span>
                        </CFormLabel>
                        <Field
                          id="unit_id"
                          size="sm"
                          className="px-3 py-2"
                          name="unit_id"
                          disabled={mode === 'Update'}
                          placeholder="Enter Unit ID"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.unit_id && touched.unit_id ? (
                          <div className="text-sm text-[#b03434] mt-1">{errors.unit_id}</div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="is_active">
                          Active?
                        </CFormLabel>
                        <div className="flex items-center mt-2">
                          <div className="form-check">
                            <Field
                              name="is_active"
                              id="is_active"
                              value={values?.is_active}
                              onChange={handleChange}
                              checked={values.is_active}
                              size="lg"
                              as={CFormCheck}
                            />
                          </div>
                          <label className="form-check-label" htmlFor="isActivate">
                            {values.is_active ? 'Yes' : 'No'}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="site_contact">
                          Site Contact
                        </CFormLabel>
                        <Field
                          id="site_contact"
                          size="sm"
                          className="px-3 py-2"
                          value={values?.site_contact}
                          placeholder="Enter Site Contact"
                          name="site_contact"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.site_contact && touched.site_contact ? (
                          <div className="text-sm text-[#b03434] mt-1">{errors.site_contact}</div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="site_contact_description"
                        >
                          Site Contact Description
                        </CFormLabel>
                        <Field
                          id="site_contact_description"
                          size="sm"
                          className="px-3 py-2"
                          name="site_contact_description"
                          placeholder="Enter Site Content Description"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.site_contact_description && touched.site_contact_description ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.site_contact_description}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="site_type">
                          Site Type <span className="text-red-main">*</span>
                        </CFormLabel>
                        <Field
                          id="site_type"
                          size="sm"
                          name="site_type"
                          options={formSelectOpt.siteTypeOpt}
                          placeholder="Choose Item"
                          disabled={mode === 'Update' || values?.site === ''}
                          onChange={(val) => {
                            setFieldValue('site_type', val)
                            switch (val.value) {
                              case 'KANTOR INDUK':
                                setFieldValue('kantor_induk', {
                                  value: values?.site ?? '',
                                  label: values?.site ?? '',
                                })
                                setFieldValue('kantor_induk_description', values?.site_description)
                                setFieldValue('sektor', null)
                                setFieldValue('sektor_description', '')
                                break
                              case 'SEKTOR':
                                setFieldValue('kantor_induk', null)
                                setFieldValue('kantor_induk_description', '')
                                setFieldValue('sektor', {
                                  value: values?.site ?? '',
                                  label: values?.site ?? '',
                                })
                                setFieldValue('sektor_description', values?.site_description)
                                break
                              default:
                                setFieldValue('kantor_induk', null)
                                setFieldValue('kantor_induk_description', '')
                                setFieldValue('sektor', null)
                                setFieldValue('sektor_description', '')
                                break
                            }
                          }}
                          as={Select}
                        />
                        {errors.site_type && touched.site_type ? (
                          <div className="text-sm text-[#b03434] mt-1">{errors.site_type}</div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="kantor_induk">
                          Kantor Induk{' '}
                          {values?.site_type?.value === 'SEKTOR' && (
                            <span className="text-red-main">*</span>
                          )}
                        </CFormLabel>
                        <Field
                          id="kantor_induk"
                          name="kantor_induk"
                          placeholder="Choose Kantor Induk"
                          onChange={(val) => {
                            setFieldValue('kantor_induk', val)
                            setFieldValue('kantor_induk_description', val?.site_description)
                          }}
                          size="md"
                          value={values?.kantor_induk}
                          as={SelectPagination}
                          disabled={!['SEKTOR'].includes(values?.site_type?.value)}
                          apiController={getSitesKantorInduk}
                          query={{
                            organization_id: selectedRow?.organization_id,
                          }}
                          valueKey="site_id"
                          labelKey="site"
                          otherKey={{ site_description: 'site_description' }}
                        />
                        {errors.kantor_induk && touched.kantor_induk ? (
                          <div className="text-sm text-[#b03434] mt-1">{errors.kantor_induk}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="kantor_induk_description"
                        >
                          Kantor Induk Description
                        </CFormLabel>
                        <Field
                          id="kantor_induk_description"
                          name="kantor_induk_description"
                          size="sm"
                          className="px-3 py-2"
                          placeholder="Enter Kantor Induk Description"
                          onChange={handleChange}
                          value={values?.kantor_induk_description}
                          as={CFormInput}
                          disabled
                        />
                        {errors.kantor_induk_description && touched.kantor_induk_description ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.kantor_induk_description}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="sektor">
                          Sector{' '}
                          {values?.site_type?.value === 'PUSAT LISTRIK' && (
                            <span className="text-red-main">*</span>
                          )}
                        </CFormLabel>
                        <Field
                          name="sektor"
                          placeholder="Choose Sector"
                          onChange={(val) => {
                            setFieldValue('sektor', val)
                            setFieldValue('sektor_description', val?.site_description)
                            setFieldValue('kantor_induk', {
                              label: val?.kantor_induk,
                              value: val?.kantor_induk_id,
                            })
                            setFieldValue('kantor_induk_description', val?.kantor_induk_description)
                          }}
                          size="md"
                          value={values?.sektor}
                          as={SelectPagination}
                          disabled={!['PUSAT LISTRIK'].includes(values?.site_type?.value)}
                          apiController={getSitesSektor}
                          query={{
                            organization_id: selectedRow?.organization_id,
                          }}
                          valueKey="site_id"
                          labelKey="site"
                          otherKey={{
                            site_description: 'site_description',
                            kantor_induk: 'kantor_induk',
                            kantor_induk_id: 'kantor_induk_id',
                            kantor_induk_description: 'kantor_induk_description',
                          }}
                        />
                        {errors.sektor && touched.sektor ? (
                          <div className="text-sm text-[#b03434] mt-1">{errors.sektor}</div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="sektor_description"
                        >
                          Sector Description
                        </CFormLabel>
                        <Field
                          id="sektor_description"
                          name="sektor_description"
                          size="sm"
                          className="px-3 py-2"
                          placeholder="Enter Sector Description"
                          onChange={handleChange}
                          value={values?.sektor_description}
                          as={CFormInput}
                          disabled
                        />
                        {errors.sektor_description && touched.sektor_description ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.sektor_description}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="purchasing_organization"
                        >
                          Purchasing Organization
                        </CFormLabel>
                        <Field
                          id="purchasing_organization"
                          size="sm"
                          className="px-3 py-2"
                          name="purchasing_organization"
                          placeholder="Choose Item"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.purchasing_organization && touched.purchasing_organization ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.purchasing_organization}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="sap_company_code">
                          SAP Company Code
                        </CFormLabel>
                        <Field
                          id="sap_company_code"
                          size="sm"
                          name="sap_company_code"
                          placeholder="Choose Item"
                          className="px-3 py-2"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.sap_company_code && touched.sap_company_code ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.sap_company_code}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="sap_company_code_description"
                        >
                          SAP Company Code Description
                        </CFormLabel>
                        <Field
                          id="sap_company_code_description"
                          size="sm"
                          className="px-3 py-2"
                          name="sap_company_code_description"
                          placeholder="Enter SAP Company Code Description"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.sap_company_code_description &&
                        touched.sap_company_code_description ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.sap_company_code_description}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="sap_business_area"
                        >
                          SAP Business Area
                        </CFormLabel>
                        <Field
                          id="sap_business_area"
                          size="sm"
                          name="sap_business_area"
                          placeholder="Choose Item"
                          className="px-3 py-2"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.sap_business_area && touched.sap_business_area ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.sap_business_area}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="sap_business_area_description"
                        >
                          SAP Business Area Description
                        </CFormLabel>
                        <Field
                          id="sap_business_area_description"
                          size="sm"
                          className="px-3 py-2"
                          name="sap_business_area_description"
                          placeholder="Enter SAP Business Area Description"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.sap_business_area_description &&
                        touched.sap_business_area_description ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.sap_business_area_description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-md-3">
                        <CFormLabel className="text-primary fw-semibold" htmlFor="sap_plant">
                          SAP Plant
                        </CFormLabel>
                        <Field
                          id="sap_plant"
                          size="sm"
                          name="sap_plant"
                          options={formSelectOpt.sapPlantOpt}
                          placeholder="Choose Item"
                          className="px-3 py-2"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.sap_plant && touched.sap_plant ? (
                          <div className="text-sm text-[#b03434] mt-1">{errors.sap_plant}</div>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CFormLabel
                          className="text-primary fw-semibold"
                          htmlFor="sap_plant_description"
                        >
                          SAP Plant Description
                        </CFormLabel>
                        <Field
                          id="sap_plant_description"
                          size="sm"
                          className="px-3 py-2"
                          name="sap_plant_description"
                          placeholder="Enter SAP Plant Description"
                          onChange={handleChange}
                          as={CFormInput}
                        />
                        {errors.sap_plant_description && touched.sap_plant_description ? (
                          <div className="text-sm text-[#b03434] mt-1">
                            {errors.sap_plant_description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5">Address</p>
                  <hr />
                  <FieldArray
                    name="addresses"
                    render={(arrayHelpers) => (
                      <>
                        {values.addresses.length > 0 ? (
                          values.addresses?.map((item, index) => {
                            return (
                              <div key={index}>
                                <div className="flex">
                                  <p className="bg-cmms-blue px-3 py-2 text-white rounded">
                                    {index + 1}
                                  </p>
                                  <CButton
                                    color="danger"
                                    variant="outline"
                                    className="hover:text-white h-10 ml-2"
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                      index === 0 && setFieldValue('hasAddress', false)
                                    }}
                                  >
                                    <BsTrash />
                                  </CButton>
                                </div>
                                <div className="container-fluid !-mx-3">
                                  <div className="row my-3">
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold"
                                        htmlFor="site_address_name"
                                      >
                                        Address
                                      </CFormLabel>
                                      <Field
                                        name="site_address_name"
                                        placeholder="Choose Address"
                                        onChange={(val) => {
                                          if (
                                            !values.addresses.some(
                                              (e, i) =>
                                                e.site_address_name.value === val.value &&
                                                i !== index,
                                            )
                                          ) {
                                            setFieldValue(
                                              `addresses.${index}.site_address_name`,
                                              val,
                                            )
                                            setFieldValue(
                                              `addresses.${index}.site_address_description`,
                                              val?.address_code_description,
                                            )
                                          } else {
                                            duplicateAddressError()
                                          }
                                        }}
                                        size="md"
                                        value={item?.site_address_name}
                                        as={SelectPagination}
                                        apiController={getAddressNonSiteList}
                                        query={{
                                          organization_id: selectedRow?.organization_id,
                                        }}
                                        valueKey="address_id"
                                        labelKey="address_code"
                                        otherKey={{
                                          address_code_description: 'address_code_description',
                                        }}
                                        // disabled={index === 0}
                                      />
                                      {errors &&
                                      errors.addresses &&
                                      errors.addresses[index]?.site_address_name &&
                                      touched &&
                                      touched.addresses &&
                                      touched.addresses[index]?.site_address_name ? (
                                        <div className="text-sm text-[#b03434] mt-1">
                                          {errors.addresses[index]?.site_address_name}
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold"
                                        htmlFor="site_address_description"
                                      >
                                        Address Description
                                      </CFormLabel>
                                      <Field
                                        id="site_address_description"
                                        size="sm"
                                        value={item?.site_address_description}
                                        className="px-3 py-2"
                                        name="site_address_description"
                                        placeholder="Enter Address Description"
                                        onChange={(val) => {
                                          setFieldValue(
                                            `addresses.${index}.site_address_description`,
                                            val.target.value,
                                          )
                                        }}
                                        as={CFormInput}
                                        disabled
                                      />
                                      {errors &&
                                      errors.addresses &&
                                      errors.addresses[index]?.site_address_description &&
                                      touched &&
                                      touched.addresses &&
                                      touched.addresses[index]?.site_address_description ? (
                                        <div className="text-sm text-[#b03434] mt-1">
                                          {errors.addresses[index]?.site_address_description}
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold"
                                        htmlFor="bill_to_contact"
                                      >
                                        Bill To Contact
                                      </CFormLabel>
                                      <Field
                                        id="bill_to_contact"
                                        name="bill_to_contact"
                                        value={item?.bill_to_contact}
                                        placeholder="Enter Bill to Contact"
                                        onChange={(val) => {
                                          setFieldValue(
                                            `addresses.${index}.bill_to_contact`,
                                            val.target.value,
                                          )
                                        }}
                                        as={CFormInput}
                                      />
                                      {errors &&
                                      errors?.addresses &&
                                      errors?.addresses[index]?.bill_to_contact &&
                                      touched &&
                                      touched?.addresses &&
                                      touched?.addresses[index]?.bill_to_contact ? (
                                        <div className="text-sm text-[#b03434] mt-1">
                                          {errors.addresses[index]?.bill_to_contact}
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold"
                                        htmlFor="bill_to_contact_description"
                                      >
                                        Bill To Contact Description
                                      </CFormLabel>
                                      <Field
                                        id="bill_to_contact_description"
                                        size="sm"
                                        value={item?.bill_to_contact_description}
                                        className="px-3 py-2"
                                        name="bill_to_contact_description"
                                        placeholder="Enter Description"
                                        onChange={(val) => {
                                          setFieldValue(
                                            `addresses.${index}.bill_to_contact_description`,
                                            val.target.value,
                                          )
                                        }}
                                        as={CFormInput}
                                      />
                                      {errors &&
                                      errors?.addresses &&
                                      errors?.addresses[index]?.bill_to_contact_description &&
                                      touched &&
                                      touched?.addresses &&
                                      touched?.addresses[index]?.bill_to_contact_description ? (
                                        <div className="text-sm text-[#b03434] mt-1">
                                          {errors.addresses[index]?.bill_to_contact_description}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="row my-3">
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold w-full"
                                        htmlFor="bill_to"
                                      >
                                        Bill To?
                                      </CFormLabel>
                                      <div className="flex items-center">
                                        <div className="form-check">
                                          <Field
                                            name="bill_to"
                                            id="bill_to"
                                            value={item?.bill_to}
                                            onChange={(_) => {
                                              setFieldValue(
                                                `addresses.${index}.bill_to`,
                                                item?.bill_to ? false : true,
                                              )
                                            }}
                                            checked={item?.bill_to}
                                            size="lg"
                                            as={CFormCheck}
                                          />
                                        </div>
                                        <label className="form-check-label" htmlFor="isActivate">
                                          {item?.bill_to ? 'Yes' : 'No'}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold w-full"
                                        htmlFor="default_bill_to"
                                      >
                                        Default Bill To?
                                      </CFormLabel>
                                      <div className="flex items-center">
                                        <div className="form-check">
                                          <Field
                                            name="default_bill_to"
                                            id="default_bill_to"
                                            value={item?.default_bill_to}
                                            onChange={(_) => {
                                              setFieldValue(
                                                `addresses.${index}.default_bill_to`,
                                                item?.default_bill_to ? false : true,
                                              )
                                            }}
                                            checked={item?.default_bill_to}
                                            size="lg"
                                            as={CFormCheck}
                                          />
                                        </div>
                                        <label className="form-check-label" htmlFor="isActivate">
                                          {item?.default_bill_to ? 'Yes' : 'No'}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold w-full"
                                        htmlFor="ship_to"
                                      >
                                        Ship To?
                                      </CFormLabel>
                                      <div className="flex items-center">
                                        <div className="form-check">
                                          <Field
                                            name="ship_to"
                                            id="ship_to"
                                            value={item?.ship_to}
                                            onChange={(val) => {
                                              setFieldValue(
                                                `addresses.${index}.ship_to`,
                                                item?.ship_to ? false : true,
                                              )
                                            }}
                                            checked={item?.ship_to}
                                            size="lg"
                                            as={CFormCheck}
                                          />
                                        </div>
                                        <label className="form-check-label" htmlFor="isActivate">
                                          {item.ship_to ? 'Yes' : 'No'}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold w-full"
                                        htmlFor="default_ship_to"
                                      >
                                        Default Ship To?
                                      </CFormLabel>
                                      <div className="flex items-center">
                                        <div className="form-check">
                                          <Field
                                            name="default_ship_to"
                                            id="default_ship_to"
                                            value={item?.default_ship_to}
                                            onChange={(_) => {
                                              setFieldValue(
                                                `addresses.${index}.default_ship_to`,
                                                item?.default_ship_to ? false : true,
                                              )
                                            }}
                                            checked={item?.default_ship_to}
                                            size="lg"
                                            as={CFormCheck}
                                          />
                                        </div>
                                        <label className="form-check-label" htmlFor="isActivate">
                                          {item?.default_ship_to ? 'Yes' : 'No'}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row my-3">
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold"
                                        htmlFor="ship_to_contact"
                                      >
                                        Ship to Contact
                                      </CFormLabel>
                                      <Field
                                        id="ship_to_contact"
                                        name="ship_to_contact"
                                        value={item?.ship_to_contact}
                                        placeholder="Enter Ship to Contact"
                                        onChange={(val) => {
                                          setFieldValue(
                                            `addresses.${index}.ship_to_contact`,
                                            val.target.value,
                                          )
                                        }}
                                        as={CFormInput}
                                      />
                                      {errors &&
                                      errors.addresses &&
                                      errors.addresses[index]?.ship_to_contact &&
                                      touched &&
                                      touched.addresses &&
                                      touched.addresses[index]?.ship_to_contact ? (
                                        <div className="text-sm text-[#b03434] mt-1">
                                          {errors.addresses[index]?.ship_to_contact}
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="col-md-3">
                                      <CFormLabel
                                        className="text-primary fw-semibold"
                                        htmlFor="ship_to_contact_description"
                                      >
                                        Ship To Contact Description
                                      </CFormLabel>
                                      <Field
                                        id="ship_to_contact_description"
                                        name="ship_to_contact_description"
                                        placeholder="Contact Description"
                                        value={item?.ship_to_contact_description}
                                        onChange={(val) => {
                                          setFieldValue(
                                            `addresses.${index}.ship_to_contact_description`,
                                            val.target.value,
                                          )
                                        }}
                                        as={CFormInput}
                                      />
                                      {errors &&
                                      errors.addresses &&
                                      errors.addresses[index]?.ship_to_contact_description &&
                                      touched &&
                                      touched.addresses &&
                                      touched.addresses[index]?.ship_to_contact_description ? (
                                        <div className="text-sm text-[#b03434] mt-1">
                                          {errors.addresses[index]?.ship_to_contact_description}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            )
                          })
                        ) : (
                          <>
                            <div>No Address</div>
                            <hr />
                          </>
                        )}
                        <div>
                          <CButton
                            variant="outline"
                            onClick={() => {
                              arrayHelpers.push({
                                site_address_name: '',
                                site_address_description: '',
                                bill_to_contact: null,
                                bill_to_contact_description: null,
                                bill_to: false,
                                ship_to_contact: null,
                                ship_to_contact_description: '',
                                ship_to: false,
                                default_bill_to: false,
                                default_ship_to: false,
                              })
                              setFieldValue('hasAddress', true)
                            }}
                          >
                            Add New Address
                          </CButton>
                        </div>
                      </>
                    )}
                  />
                </CCardBody>
              </CCard>
            </div>
            <CFooter className="form-footer">
              <div className="w-full ml-[80px] bg-white flex items-center justify-between">
                <CButton
                  color="danger"
                  variant="outline"
                  onClick={() => {
                    setAction('view')
                  }}
                >
                  Cancel
                </CButton>
                <CButton color="primary" className="hover:text-white" type="submit">
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

export default OrganizationSiteForm
