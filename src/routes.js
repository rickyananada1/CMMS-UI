import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Redirect = React.lazy(() => import('./components/Redirect'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// // Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// // Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

// //Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// // Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// // Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Profile
const ChangePassword = React.lazy(() => import('./views/pages/profile/ChangePassword'))

// Assets
const MetersTab = React.lazy(() => import('./views/pages/assets/meters/pages/MetersTabs'))

// Organizations
const OrganizationTab = React.lazy(() => import('./views/pages/organization/pages/OrganizationTab'))

// Security
const SecurityGroupTab = React.lazy(() =>
  import('./views/pages/security/security-groups/pages/SecurityGroupTabs'),
)
// User
const UserTab = React.lazy(() => import('./views/pages/security/user/UserTab'))

// Assets
const AssetTab = React.lazy(() => import('./views/pages/assets/AssetsTabs'))

// Work Order Tracking
const WOTrackingTab = React.lazy(() =>
  import('./views/pages/work-order/work-order-tracking/WOTrackingTab'),
)
const QuickReportingTab = React.lazy(() =>
  import('./views/pages/work-order/quick-reporting/QuickReportingTabs'),
)
const WOServiceReqTab = React.lazy(() =>
  import('./views/pages/work-order/service-request/WOServiceReqTab'),
)
const ECPTicektTab = React.lazy(() =>
  import('./views/pages/work-order/engineering-change-proposal/ECPTicektTab'),
)

// Failure Code Tab
const FailureCodesTab = React.lazy(() => import('./views/pages/failurecodes/FailureCodesTabs'))

// Locations
const LocationsTab = React.lazy(() => import('./views/pages/locations/LocationsTabs'))

// Condition Monitoring
const ConditionMonitoringTab = React.lazy(() =>
  import('./views/pages/condition-monitoring/ConditionMonitoringTabs'),
)

// Relationships
const RelationshipsTab = React.lazy(() => import('./views/pages/relationships/RelationshipsTabs'))

// Job Plan
const JobPlanTab = React.lazy(() => import('./views/pages/job-plan/JobPlanTabs'))

// Preventive Maintenance
const PreventiveMaintenanceTab = React.lazy(() =>
  import('./views/pages/work-order/preventive-maintenance/PreventiveMaintenanceTabs'),
)

const routes = [
  { path: '', exact: true, name: 'Redirect', element: Redirect },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/change-password', name: 'Change Password', element: ChangePassword },
  { path: '/colors', exact: true, name: 'Colors', element: Colors },
  { path: '/administration/organization', name: 'Organizations', element: OrganizationTab },
  {
    path: '/security-groups',
    name: 'Security Groups',
    parent: 'Security',
    element: SecurityGroupTab,
  },
  { path: '/security/users', name: 'Users', parent: 'Security', element: UserTab },
  { path: '/assets', name: 'Assets', element: AssetTab },
  {
    path: '/assets/meters-&-groups',
    parent: 'Assets',
    exact: true,
    name: 'Meters & Groups',
    element: MetersTab,
  },
  {
    path: '/assets/condition-monitoring',
    exact: true,
    parent: 'Assets',
    name: 'Condition Monitoring',
    element: ConditionMonitoringTab,
  },
  {
    path: '/assets/relationships',
    exact: true,
    parent: 'Assets',
    name: 'Relationships',
    element: RelationshipsTab,
  },
  {
    path: '/work-order/work-order-tracking',
    exact: true,
    parent: 'Work Order',
    name: 'Work Order Tracking',
    element: WOTrackingTab,
  },
  {
    path: '/work-order/quick-reporting',
    exact: true,
    parent: 'Work Order',
    name: 'Quick Reporting',
    element: QuickReportingTab,
  },
  {
    path: '/work-order/service-request',
    exact: true,
    parent: 'Work Order',
    name: 'Service Request',
    element: WOServiceReqTab,
  },
  {
    path: '/work-order/engineering-change-proposal',
    exact: true,
    parent: 'Work Order',
    name: 'Engineering Change Proposal',
    element: ECPTicektTab,
  },
  {
    path: '/preventive-maintenance/preventive-maintenance',
    exact: true,
    parent: 'Work Order',
    name: 'Preventive Maintenance',
    element: PreventiveMaintenanceTab,
  },
  {
    path: '/failure-codes',
    exact: true,
    parent: 'Assets',
    name: 'Failure Codes',
    element: FailureCodesTab,
  },
  { path: '/locations', exact: true, parent: 'Assets', name: 'Locations', element: LocationsTab },
  {
    path: '/planning/job-plan',
    exact: true,
    parent: 'Work Order',
    name: 'Job Plan',
    element: JobPlanTab,
  },
]

export default routes
