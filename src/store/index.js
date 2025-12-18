import { configureStore, combineReducers } from '@reduxjs/toolkit'

import storage from 'src/store/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'

import { appSlice } from 'src/store/slices/appSlices'
import { tableSlice } from 'src/components/elements/table/tableSlices'
import { breadcrumbSlice } from 'src/store/slices/breadcrumbSlices'
import { authSlice } from 'src/store/slices/authSlices'

import { securityGroupSlice } from 'src/views/pages/security/security-groups/slices/securityGroupSlices'
import { failureCodesSlice } from 'src/views/pages/failurecodes/slices/failureCodesSlices'
import { securityGroupApplicationsSlice } from 'src/views/pages/security/security-groups/pages/applications/slices/securityGroupApplicationsSlices'
import { locationsSlice } from 'src/views/pages/locations/slices/locationsSlices'
import { locationSafetySlices } from 'src/views/pages/locations/pages/safety/slices/locationSafetySlices'
import { assetsSafetySlices } from 'src/views/pages/assets/pages/safety/slices/assetsSafetySlices'
import { securityUserSlice } from 'src/views/pages/security/user/slices/securityUserSlices'
import { organizationSlice } from 'src/views/pages/organization/slices/organizationSlices'
import { assetSlice } from 'src/views/pages/assets/slices/assetSlices'
import { woTrackingSlice } from 'src/views/pages/work-order/work-order-tracking/slices/woTrackingSlices'
import { woChildernSlice } from 'src/views/pages/work-order/work-order-tracking/pages/plans/pages/childern-of-wo/slices/woChildernSlices'
import { woTaskSlice } from 'src/views/pages/work-order/work-order-tracking/pages/plans/pages/task-for-wo/slices/woTaskSlices'
import { woLaborSlice } from 'src/views/pages/work-order/work-order-tracking/pages/plans/pages/labor-materials-tools/slices/woLaborSlices'
import { woMaterialsSlice } from 'src/views/pages/work-order/work-order-tracking/pages/plans/pages/labor-materials-tools/slices/woMaterialsSlices'
import { woToolsSlice } from 'src/views/pages/work-order/work-order-tracking/pages/plans/pages/labor-materials-tools/slices/woToolsSlices'
import { conditionMonitoringSlice } from 'src/views/pages/condition-monitoring/slices/conditionMonitoringSlices'
import { metersSlice } from 'src/views/pages/assets/meters/pages/meters/slices/metersSlices'
import { subassembliesSlice } from 'src/views/pages/assets/pages/spare-parts/slices/subassembliesSlices'
import { relationshipsSlice } from 'src/views/pages/relationships/slices/relationshipsSlice'
import { jobPlanSlice } from 'src/views/pages/job-plan/slices/jobPlanSlices'
import { quickReportingSlice } from 'src/views/pages/work-order/quick-reporting/slices/quickReportingSlices'
import { preventiveMaintenanceSlice } from 'src/views/pages/work-order/preventive-maintenance/slices/preventiveMaintenanceSlices'
import { serviceRequestSlice } from 'src/views/pages/work-order/service-request/slices/serviceRequestSlice'
import { ticketEcpSlice } from 'src/views/pages/work-order/engineering-change-proposal/slices/ticketEcpSlice'

// Init Reducer
const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [breadcrumbSlice.name]: breadcrumbSlice.reducer,
  [securityGroupSlice.name]: securityGroupSlice.reducer,
  [failureCodesSlice.name]: failureCodesSlice.reducer,
  [securityGroupApplicationsSlice.name]: securityGroupApplicationsSlice.reducer,
  [securityUserSlice.name]: securityUserSlice.reducer,
  [organizationSlice.name]: organizationSlice.reducer,
  [locationsSlice.name]: locationsSlice.reducer,
  [locationSafetySlices.name]: locationSafetySlices.reducer,
  [assetsSafetySlices.name]: assetsSafetySlices.reducer,
  [assetSlice.name]: assetSlice.reducer,
  [serviceRequestSlice.name]: serviceRequestSlice.reducer,
  [ticketEcpSlice.name]: ticketEcpSlice.reducer,
  [woTrackingSlice.name]: woTrackingSlice.reducer,
  [woChildernSlice.name]: woChildernSlice.reducer,
  [woTaskSlice.name]: woTaskSlice.reducer,
  [woLaborSlice.name]: woLaborSlice.reducer,
  [woMaterialsSlice.name]: woMaterialsSlice.reducer,
  [woToolsSlice.name]: woToolsSlice.reducer,
  [conditionMonitoringSlice.name]: conditionMonitoringSlice.reducer,
  [metersSlice.name]: metersSlice.reducer,
  [subassembliesSlice.name]: subassembliesSlice.reducer,
  [tableSlice.name]: tableSlice.reducer,
  [relationshipsSlice.name]: relationshipsSlice.reducer,
  [jobPlanSlice.name]: jobPlanSlice.reducer,
  [quickReportingSlice.name]: quickReportingSlice.reducer,
  [preventiveMaintenanceSlice.name]: preventiveMaintenanceSlice.reducer,
})

// Save to localStorage
const persistConfig = {
  key: 'cmmsStore',
  storage,
  whitelist: [
    appSlice.name,
    authSlice.name,
    breadcrumbSlice.name,
    securityGroupSlice.name,
    failureCodesSlice.name,
    securityUserSlice.name,
    locationsSlice.name,
    locationSafetySlices.name,
    assetsSafetySlices.name,
    assetSlice.name,
    serviceRequestSlice.name,
    ticketEcpSlice.name,
    woTrackingSlice.name,
    woChildernSlice.name,
    woTaskSlice.name,
    woLaborSlice.name,
    woMaterialsSlice.name,
    woToolsSlice.name,
    conditionMonitoringSlice.name,
    metersSlice.name,
    subassembliesSlice.name,
    tableSlice.name,
    relationshipsSlice.name,
    jobPlanSlice.name,
    quickReportingSlice.name,
    preventiveMaintenanceSlice.name,
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

persistStore(store)

export const resetAllSlices = () => {
  store.dispatch(appSlice.actions.resetState())
  store.dispatch(authSlice.actions.resetState())
}

export default store
