import { CButton, CFooter, CFormInput, CFormLabel, CFormSwitch, CSpinner } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { CiPaperplane } from 'react-icons/ci'
import { Select, SelectPagination } from 'src/components/elements/select'
import { assetSchema } from '../schema'
import CurrencyInput from 'react-currency-input-field'
import { DetailCard } from 'src/components/elements/cards'
import useDuplicate from '../hooks/useDuplicate'

const AssetsDuplicate = ({ mode, setAction, setTabIndex }) => {
  const {
    formValue,
    handleSubmit,
    getLocationDropdown,
    getAssetDropdown,
    getConditionCodeDropdown,
    getFailureCodeDropdown,
    getCompeniesDropdown,
    getMeterGroupDropdown,
    getSiteDropdown,
    status,
    typeAsset,
    isLoading,
  } = useDuplicate({
    mode,
    setAction,
    setTabIndex,
  })

  return (
    <div className="bg-white p-3 rounded">
      <Formik
        enableReinitialize
        validationSchema={assetSchema}
        initialValues={formValue}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const {
            setFieldValue,
            isValid,
            dirty,
            isSubmitting,
            setFieldTouched,
            values,
            errors,
            touched,
          } = props
          return (
            <Form>
              <DetailCard isLoading={isLoading}>
                <h4 className="font-semibold">Duplicate Asset</h4>
                <div>
                  <p>Fill this column to add new asset</p>
                </div>

                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    General
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Asset</CFormLabel>
                      <Field
                        name="asset_num"
                        placeholder="Enter Asset"
                        value={values.asset_num}
                        onChange={(val) => {
                          setFieldValue('asset_num', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.asset_num && touched && touched.asset_num ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.asset_num}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Description</CFormLabel>
                      <Field
                        name="asset_description"
                        placeholder="Enter Description"
                        value={values.asset_description}
                        onChange={(val) => {
                          setFieldValue('asset_description', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors &&
                      errors.asset_description &&
                      touched &&
                      touched.asset_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.asset_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">KKS Number</CFormLabel>
                      <Field
                        name="kks_number"
                        placeholder="Enter KKS Number"
                        value={values.kks_number}
                        onChange={(val) => {
                          setFieldValue('kks_number', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.kks_number && touched && touched.kks_number ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.kks_number}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Existing Code</CFormLabel>
                      <Field
                        name="existing_code"
                        placeholder="Enter Existing Code"
                        value={values.existing_code}
                        onChange={(val) => {
                          setFieldValue('existing_code', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.existing_code && touched && touched.existing_code ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.existing_code}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Status</CFormLabel>
                      <Field
                        name="status"
                        size="sm"
                        placeholder="Choose Status"
                        options={status}
                        onChange={(val) => {
                          setFieldValue('status', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('status')
                        }}
                        isDisabled={isSubmitting}
                        as={Select}
                      />
                      {errors && errors.status && touched && touched.status ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.status}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Site</CFormLabel>
                      <Field
                        name="site_id"
                        placeholder="Enter Site"
                        value={values.site_id}
                        apiController={getSiteDropdown}
                        valueKey="site_id"
                        labelKey="site"
                        onChange={(val) => {
                          setFieldValue('site_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('site_id')
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.site_id && touched && touched.site_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.site_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Type</CFormLabel>
                      <Field
                        name="asset_type"
                        size="sm"
                        placeholder="Enter Type"
                        options={typeAsset}
                        onChange={(val) => {
                          setFieldValue('asset_type', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('asset_type')
                        }}
                        isDisabled={isSubmitting}
                        as={Select}
                      />
                      {errors && errors.asset_type && touched && touched.asset_type ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.asset_type}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Asset Template</CFormLabel>
                      <Field
                        name="asset_template"
                        placeholder="Enter Asset Template"
                        value={values.asset_template}
                        onChange={(val) => {
                          setFieldValue('asset_template', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.asset_template && touched && touched.asset_template ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.asset_template}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Details
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Parent</CFormLabel>
                      <Field
                        name="parent_id"
                        placeholder="Enter Parent"
                        value={values.parent_id}
                        apiController={getAssetDropdown}
                        valueKey="asset_id"
                        labelKey="asset_num"
                        onBlur={() => {
                          setFieldTouched('parent_id')
                        }}
                        otherKey={{
                          description: 'asset_description',
                        }}
                        onChange={(val) => {
                          setFieldValue('parent_id', val)
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.parent_id && touched && touched.parent_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.parent_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Parent Description
                      </CFormLabel>
                      <Field
                        name="parent_description"
                        placeholder="Enter Parent Description"
                        value={values?.parent_id?.description}
                        onChange={(val) => {
                          setFieldValue('parent_description', val.target.value)
                        }}
                        disabled
                        as={CFormInput}
                      />
                      {errors &&
                      errors.parent_description &&
                      touched &&
                      touched.parent_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.parent_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Location</CFormLabel>
                      <Field
                        name="location_id"
                        placeholder="Enter Location"
                        value={values.location_id}
                        apiController={getLocationDropdown}
                        valueKey="location_id"
                        labelKey="location"
                        otherKey={{
                          description: 'location_description',
                        }}
                        onBlur={() => {
                          setFieldTouched('location_id')
                        }}
                        onChange={(val) => {
                          setFieldValue('location_id', val)
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.location_id && touched && touched.location_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.location_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Location Description
                      </CFormLabel>
                      <Field
                        name="location_description"
                        placeholder="Enter Location Description"
                        value={values?.location_id?.description}
                        onChange={(val) => {
                          setFieldValue('location_description', val.target.value)
                        }}
                        disabled
                        as={CFormInput}
                      />
                      {errors &&
                      errors.location_description &&
                      touched &&
                      touched.location_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.location_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Bin</CFormLabel>
                      <Field
                        name="bin"
                        placeholder="Enter Bin"
                        value={values.bin}
                        onChange={(val) => {
                          setFieldValue('bin', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.bin && touched && touched.bin ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.bin}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Rotating Item</CFormLabel>
                      <Field
                        name="rotating_item"
                        placeholder="Enter Rotating Item"
                        value={values.rotating_item}
                        onChange={(val) => {
                          setFieldValue('rotating_item', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.rotating_item && touched && touched.rotating_item ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.rotating_item}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Rotating Item Description
                      </CFormLabel>
                      <Field
                        name="rotating_item_description"
                        placeholder="Enter Rotating Item Description"
                        value={values.rotating_item_description}
                        onChange={(val) => {
                          setFieldValue('rotating_item_description', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors &&
                      errors.rotating_item_description &&
                      touched &&
                      touched.rotating_item_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.rotating_item_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Usage</CFormLabel>
                      <Field
                        name="usage"
                        placeholder="Enter Usage"
                        value={values.usage}
                        onChange={(val) => {
                          setFieldValue('usage', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.usage && touched && touched.usage ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.usage}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Condition Code</CFormLabel>
                      <Field
                        name="condition_code_id"
                        placeholder="Enter Condition Code"
                        value={values.condition_code_id}
                        apiController={getConditionCodeDropdown}
                        valueKey="condition_code_id"
                        labelKey="condition_code"
                        otherKey={{
                          description: 'description',
                        }}
                        onChange={(val) => {
                          setFieldValue('condition_code_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('condition_code_id')
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors &&
                      errors.condition_code_id &&
                      touched &&
                      touched.condition_code_id ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.condition_code_id}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Condition Code Description
                      </CFormLabel>
                      <Field
                        name="condition_code_description"
                        placeholder="Enter Condition Code Description"
                        value={values.condition_code_id?.description}
                        onChange={(val) => {
                          setFieldValue('condition_code_description', val.target.value)
                        }}
                        disabled
                        as={CFormInput}
                      />
                      {errors &&
                      errors.condition_code_description &&
                      touched &&
                      touched.condition_code_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.condition_code_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Meter Group</CFormLabel>
                      <Field
                        name="meter_group_id"
                        placeholder="Enter Meter Group"
                        value={values.meter_group_id}
                        apiController={getMeterGroupDropdown}
                        valueKey="meter_group_id"
                        labelKey="meter_group"
                        otherKey={{
                          description: 'description',
                        }}
                        onChange={(val) => {
                          setFieldValue('meter_group_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('meter_group_id')
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.meter_group_id && touched && touched.meter_group_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.meter_group_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Meter Group Description
                      </CFormLabel>
                      <Field
                        name="meter_group_description"
                        placeholder="Enter Meter Group Description"
                        value={values?.meter_group_id?.description}
                        onChange={(val) => {
                          setFieldValue('meter_group_description', val.target.value)
                        }}
                        disabled
                        as={CFormInput}
                      />
                      {errors &&
                      errors.meter_group_description &&
                      touched &&
                      touched.meter_group_description ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.meter_group_description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">GL Account</CFormLabel>
                      <Field
                        name="gl_account"
                        placeholder="Enter GL Account"
                        value={values.gl_account}
                        onChange={(val) => {
                          setFieldValue('gl_account', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.gl_account && touched && touched.gl_account ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.gl_account}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Calendar</CFormLabel>
                      <Field
                        name="calendar"
                        placeholder="Enter Calendar"
                        value={values.calendar}
                        onChange={(val) => {
                          setFieldValue('calendar', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.calendar && touched && touched.calendar ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.calendar}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Shift</CFormLabel>
                      <Field
                        name="shift"
                        placeholder="Enter Shift"
                        value={values.shift}
                        onChange={(val) => {
                          setFieldValue('shift', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.shift && touched && touched.shift ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.shift}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Priority (MPI)</CFormLabel>
                      <Field
                        name="priority"
                        placeholder="Enter Priority (MPI)"
                        value={values.priority}
                        onChange={(val) => {
                          setFieldValue('priority', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.priority && touched && touched.priority ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.priority}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Serial #</CFormLabel>
                      <Field
                        name="serial"
                        placeholder="Enter Serial #"
                        value={values.serial}
                        onChange={(val) => {
                          setFieldValue('serial', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.serial && touched && touched.serial ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.serial}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Failure Class</CFormLabel>
                      <Field
                        name="failure_code_id"
                        placeholder="Enter Failure Class"
                        value={values.failure_code_id}
                        apiController={getFailureCodeDropdown}
                        valueKey="failure_code_id"
                        labelKey="failure_code"
                        onChange={(val) => {
                          setFieldValue('failure_code_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('failure_code_id')
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.failure_code_id && touched && touched.failure_code_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.failure_code_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Item Type</CFormLabel>
                      <Field
                        name="item_type"
                        placeholder="Enter Item Type"
                        value={values.item_type}
                        onChange={(val) => {
                          setFieldValue('item_type', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.item_type && touched && touched.item_type ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.item_type}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Tool Rate</CFormLabel>
                      <Field
                        name="tool_rate"
                        placeholder="Enter Tool Rate"
                        value={values.tool_rate}
                        onChange={(val) => {
                          setFieldValue('tool_rate', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.tool_rate && touched && touched.tool_rate ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.tool_rate}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Purchase Information
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Vendor</CFormLabel>
                      <Field
                        name="vendor_id"
                        placeholder="Enter Vendor"
                        value={values.vendor_id}
                        apiController={getCompeniesDropdown}
                        valueKey="company_id"
                        labelKey="name"
                        otherKey={{
                          description: 'company',
                        }}
                        onChange={(val) => {
                          setFieldValue('vendor_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('vendor_id')
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.vendor_id && touched && touched.vendor_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.vendor_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Detail Vendor</CFormLabel>
                      <Field
                        name="detail_vendor"
                        placeholder="Enter Detail Vendor"
                        value={values?.vendor_id?.description}
                        onChange={(val) => {
                          setFieldValue('detail_vendor', val.target.value)
                        }}
                        disabled
                        as={CFormInput}
                      />
                      {errors && errors.detail_vendor && touched && touched.detail_vendor ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.detail_vendor}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Manufacturer</CFormLabel>
                      <Field
                        name="manufacture_id"
                        placeholder="Enter Manucfacture"
                        value={values.manufacture_id}
                        apiController={getCompeniesDropdown}
                        valueKey="company_id"
                        labelKey="name"
                        otherKey={{
                          description: 'company',
                        }}
                        onChange={(val) => {
                          setFieldValue('manufacture_id', val)
                        }}
                        onBlur={() => {
                          setFieldTouched('manufacture_id')
                        }}
                        isDisabled={isSubmitting}
                        as={SelectPagination}
                      />
                      {errors && errors.manufacture_id && touched && touched.manufacture_id ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.manufacture_id}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">
                        Detail Manucfacturer
                      </CFormLabel>
                      <Field
                        name="detail_manufacturer"
                        placeholder="Enter Detail Manucfacturer"
                        value={values?.manufacture_id?.description}
                        onChange={(val) => {
                          setFieldValue('detail_manufacturer', val.target.value)
                        }}
                        disabled
                        as={CFormInput}
                      />
                      {errors &&
                      errors.detail_manufacturer &&
                      touched &&
                      touched.detail_manufacturer ? (
                        <div className="text-sm text-[#b03434] mt-1">
                          {errors.detail_manufacturer}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Instalation Date</CFormLabel>
                      <Field
                        name="instalation_date"
                        value={values.instalation_date}
                        type="date"
                        placeholder="Enter Instalation Date"
                        onChange={(val) => {
                          setFieldValue('instalation_date', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.instalation_date && touched && touched.instalation_date ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.instalation_date}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Purchase Price</CFormLabel>
                      <CurrencyInput
                        id="purchase_price"
                        name="purchase_price"
                        placeholder="Enter Purchase Price"
                        className="form-control"
                        allowNegativeValue={false}
                        defaultValue={0}
                        decimalsLimit={2}
                        step={500}
                        value={values.purchase_price}
                        onValueChange={(value) => {
                          setFieldValue('purchase_price', value)
                        }}
                        onBlur={() => {
                          setFieldTouched('purchase_price')
                        }}
                        prefix="Rp "
                        disabled={isSubmitting}
                      />
                      {errors && errors.purchase_price && touched && touched.purchase_price ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.purchase_price}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Replacement Cost</CFormLabel>
                      <CurrencyInput
                        id="replacement_cost"
                        name="replacement_cost"
                        placeholder="Enter Replacement Cost"
                        className="form-control"
                        allowNegativeValue={false}
                        defaultValue={0}
                        decimalsLimit={2}
                        step={500}
                        value={values.replacement_cost}
                        onValueChange={(value) => {
                          setFieldValue('replacement_cost', value)
                        }}
                        onBlur={() => {
                          setFieldTouched('replacement_cost')
                        }}
                        prefix="Rp. "
                        disabled={isSubmitting}
                      />
                      {errors && errors.replacement_cost && touched && touched.replacement_cost ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.replacement_cost}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">PO</CFormLabel>
                      <Field
                        name="po"
                        value={values.po}
                        placeholder="Enter PO"
                        onChange={(val) => {
                          setFieldValue('po', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.po && touched && touched.po ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.po}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Cost
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Total Cost</CFormLabel>
                      <CurrencyInput
                        id="total_cost"
                        name="total_cost"
                        placeholder="Enter Total Cost"
                        className="form-control"
                        allowNegativeValue={false}
                        defaultValue={0}
                        decimalsLimit={2}
                        step={500}
                        value={values.total_cost}
                        onValueChange={(value) => {
                          setFieldValue('total_cost', value)
                        }}
                        onBlur={() => {
                          setFieldTouched('total_cost')
                        }}
                        prefix="Rp. "
                        disabled={isSubmitting}
                      />
                      {errors && errors.total_cost && touched && touched.total_cost ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.total_cost}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">YTD Cost</CFormLabel>
                      <CurrencyInput
                        id="ytd_cost"
                        name="ytd_cost"
                        placeholder="Enter YTD Cost"
                        className="form-control"
                        allowNegativeValue={false}
                        defaultValue={0}
                        decimalsLimit={2}
                        step={500}
                        value={values.ytd_cost}
                        onValueChange={(value) => {
                          setFieldValue('ytd_cost', value)
                        }}
                        onBlur={() => {
                          setFieldTouched('ytd_cost')
                        }}
                        prefix="Rp. "
                        disabled={isSubmitting}
                      />
                      {errors && errors.ytd_cost && touched && touched.ytd_cost ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.ytd_cost}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Budgeted</CFormLabel>
                      <CurrencyInput
                        id="budgeted"
                        name="budgeted"
                        placeholder="Enter Budgeted"
                        className="form-control"
                        allowNegativeValue={false}
                        defaultValue={0}
                        decimalsLimit={2}
                        step={500}
                        value={values.budgeted}
                        onValueChange={(value) => {
                          setFieldValue('budgeted', value)
                        }}
                        onBlur={() => {
                          setFieldTouched('budgeted')
                        }}
                        prefix="Rp. "
                        disabled={isSubmitting}
                      />
                      {errors && errors.budgeted && touched && touched.budgeted ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.budgeted}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Inventory</CFormLabel>
                      <Field
                        name="inventory"
                        placeholder="Enter Inventory"
                        value={values.inventory}
                        onChange={(val) => {
                          setFieldValue('inventory', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.inventory && touched && touched.inventory ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.inventory}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Downtime
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Asset Up</CFormLabel>
                      <Field
                        name="asset_up"
                        placeholder="Enter Total Cost"
                        value={values.asset_up}
                        checked={values.asset_up}
                        size="lg"
                        onChange={(val) => {
                          setFieldValue('asset_up', val.target.checked)
                        }}
                        className="w-[2.5rem]"
                        as={CFormSwitch}
                        disabled={isSubmitting}
                      />
                      {errors && errors.asset_up && touched && touched.asset_up ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.asset_up}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Status Date</CFormLabel>
                      <Field
                        name="status_date"
                        placeholder="Enter Status Date"
                        value={values.status_date}
                        type="date"
                        onChange={(val) => {
                          setFieldValue('status_date', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.status_date && touched && touched.status_date ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.status_date}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Total Downtime</CFormLabel>
                      <Field
                        name="total_downtime"
                        placeholder="Enter Total Downtime"
                        value={values.total_downtime}
                        onChange={(val) => {
                          setFieldValue('total_downtime', val.target.value)
                        }}
                        type="number"
                        step="0.1"
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.total_downtime && touched && touched.total_downtime ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.total_downtime}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 justify-between">
                  <p className="mt-2 text-base text-neutral-text-field text-nowrap font-normal">
                    Modified
                  </p>
                  <hr className="w-full ml-2 h-[1px] mt-[8px] bg-neutral-stroke"></hr>
                </div>

                <div className="my-2">
                  <div className="row">
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Changed By</CFormLabel>
                      <Field
                        name="changed_by"
                        placeholder="Enter Changed By"
                        value={values.changed_by}
                        onChange={(val) => {
                          setFieldValue('changed_by', val.target.value)
                        }}
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.changed_by && touched && touched.changed_by ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.changed_by}</div>
                      ) : null}
                    </div>
                    <div className="col-md-3 mb-4">
                      <CFormLabel className="text-primary fw-semibold">Changed Date</CFormLabel>
                      <Field
                        name="changed_date"
                        placeholder="Enter Changed Date"
                        value={values.changed_date}
                        onChange={(val) => {
                          setFieldValue('changed_date', val.target.value)
                        }}
                        type="date"
                        disabled={isSubmitting}
                        as={CFormInput}
                      />
                      {errors && errors.changed_date && touched && touched.changed_date ? (
                        <div className="text-sm text-[#b03434] mt-1">{errors.changed_date}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </DetailCard>
              <CFooter className="form-footer">
                <CButton
                  onClick={() => {
                    setTabIndex(2)
                    setAction('Read')
                    setTimeout(() => {
                      setAction('Create')
                    }, 1000)
                  }}
                  color="primary"
                  variant="outline"
                  className="hover:text-white mr-2"
                  type="button"
                >
                  <div className="flex items-center justify-center">
                    <>Next</>
                  </div>
                </CButton>
                <CButton
                  color="primary"
                  className="hover:text-white"
                  type="submit"
                  disabled={!(isValid && dirty) || isSubmitting}
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
              </CFooter>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default AssetsDuplicate
