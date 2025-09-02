import React from 'react'
import { useState, useEffect, useRef, Fragment } from 'react'
import XTag from 'src/assets/icons/x-tag.svg'
import CheckTag from 'src/assets/icons/check-tag.svg'
import { useDebounce } from 'src/hooks/useDebounce'
import { organizationActions } from '../slices/organizationSlices'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation } from 'react-router-dom'
import { useDownloadSitesList, useServiceSiteDelete } from '../services/sites'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { downloadFileContentDisposition } from 'src/utils/helper'

const useOrganizationSite = (mode, setAction, setTabIndex) => {
  const dispatch = useDispatch()
  const selectedRow = useSelector((state) => state.organization?.selectedGroup)
  const selectedSite = useSelector((state) => state.organization?.selectedSite)
  const Notification = withReactContent(Swal)
  const location = useLocation()
  // const navigate = useNavigate()

  const setSelectedRow = (param) => {
    dispatch(organizationActions.setSelectedGroup(param))
  }

  const setSelectedSite = (param) => {
    dispatch(organizationActions.setSelectedSite(param))
  }

  const tableRef = useRef()
  const tableAddressessRef = useRef()
  const [detailData] = useState(null)
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search, 400)
  const [searchAddress, setSearchAddress] = useState('')
  const searchDebounceAddress = useDebounce(searchAddress, 400)

  const serviceSiteDelete = useServiceSiteDelete()
  const deleteAction = async () => {
    // setSelectedSiteRow(selectedSiteRow)
    Notification.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${selectedSite?.site}?`,
      showDenyButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await serviceSiteDelete
          .mutateAsync({
            params: {
              id: selectedSite?.site_id,
            },
          })
          .then((res) => {
            Notification.fire({
              icon: 'success',
              title: 'Success',
              text: `${selectedSite?.site} deleted successfully`,
            }).then(() => {
              setSelectedSite(null)
              setSearch('')
              setAction('Read')
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err.response.data.message,
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
            setAction('Read')
          })
      } else {
        setAction('Read')
      }
    })
  }

  useEffect(() => {
    mode === 'Delete' && deleteAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname, mode])

  const columns = [
    {
      header: ' ',
      size: 10,
      cell: ({ row }) => {
        return (
          <Fragment>
            {row.getCanExpand() && (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer', padding: '10px' },
                }}
              >
                {row.getIsExpanded() ? (
                  <IoIosArrowUp className="w-5 h-5" />
                ) : (
                  <IoIosArrowDown className="w-5 h-5" />
                )}
              </button>
            )}
          </Fragment>
        )
      },
    },
    {
      header: 'Site',
      size: 100,
      accessorKey: 'site',
      qName: 'qSite',
    },
    {
      header: 'Unit ID',
      size: 100,
      accessorKey: 'unit_id',
      qName: 'qUnitId',
    },
    {
      header: 'Description',
      accessorKey: 'site_description',
      qName: 'qSiteDescription',
      size: 150,
    },
    {
      header: 'Sektor',
      accessorKey: 'sektor',
      qName: 'qSektor',
      size: 100,
    },
    {
      header: 'Kantor Induk',
      accessorKey: 'kantor_induk',
      qName: 'qKantorInduk',
    },
    {
      header: 'Site Type',
      size: 250,
      accessorKey: 'site_type',
      qName: 'qSiteType',
    },
    {
      header: 'Purchasing Organization',
      accessorKey: 'purchasing_organization',
      qName: 'qPurchasingOrganization',
    },
    {
      header: 'SAP Company Code',
      accessorKey: 'sap_company_code',
      qName: 'qSapCompanyCode',
    },
    {
      header: 'SAP Bussiness Area',
      accessorKey: 'sap_business_area',
      qName: 'qSapBusinessArea',
    },
    {
      header: 'SAP Plant',
      accessorKey: 'sap_plant',
      qName: 'qSapPlant',
    },
    {
      header: 'Site Contact',
      accessorKey: 'site_contact',
      qName: 'qSiteContact',
    },
  ]

  const columnsAddress = [
    {
      header: ' ',
      size: 10,
      cell: ({ row }) => {
        return (
          <Fragment>
            {row.getCanExpand() && (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer', padding: '10px' },
                }}
              >
                {row.getIsExpanded() ? (
                  <IoIosArrowUp className="w-5 h-5" />
                ) : (
                  <IoIosArrowDown className="w-5 h-5" />
                )}
              </button>
            )}
          </Fragment>
        )
      },
    },
    {
      header: 'Address',
      accessorKey: 'address',
      qName: 'qAddress',
    },
    {
      header: 'Description',
      accessorKey: 'address_code_description',
      qName: 'qAddressCodeDescription',
    },
    {
      header: 'Bill To?',
      accessorKey: 'bill_to',
      qName: 'qBillTo',
      cell: (row) => (
        <img src={row?.getValue() ? CheckTag : XTag} width={15} height={15} alt={''} />
      ),
    },
    {
      header: 'Def.Bill To?',
      accessorKey: 'default_bill_to',
      qName: 'qDefaultBillTo',
      cell: (row) => (
        <img src={row?.getValue() ? CheckTag : XTag} width={15} height={15} alt={''} />
      ),
    },
    {
      header: 'Bill To Contact',
      accessorKey: 'bill_to_contact',
      qName: 'qBillToContact',
    },
    {
      header: 'Ship To?',
      accessorKey: 'ship_to',
      qName: 'qShipTo',
      cell: (row) => (
        <img src={row?.getValue() ? CheckTag : XTag} width={15} height={15} alt={''} />
      ),
    },
    {
      header: 'Def.Ship To?',
      accessorKey: 'default_ship_to',
      qName: 'qDefaultShipTo',
      cell: (row) => (
        <img src={row?.getValue() ? CheckTag : XTag} width={15} height={15} alt={''} />
      ),
    },
    {
      header: 'Ship To Contact',
      accessorKey: 'ship_to_contact',
      qName: 'qShipToContact',
    },
  ]

  const sampleDataAddress = [
    {
      id: 1,
      address: '10',
      description: 'VIB BR A-H',
      billTo: false,
      defBillTo: false,
      billToContent: 'VIB BR A-H',
      shipTo: false,
      ShipToContent: 'VIB BR A-H',
    },
  ]

  const downloadAddressesListService = useDownloadSitesList({
    id: selectedRow?.organization_id,
  })

  const downloadSitesList = async () => {
    Notification.fire({
      icon: 'info',
      text: 'Are you sure to download ?',
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes! Confirm',
      confirmButtonColor: '#2671D9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const column_names = [
          'site',
          'unit_id',
          'site_description',
          'sektor',
          'kantor_induk',
          'site_type',
          'purchasing_organization',
          'sap_company_code',
          'sap_business_area',
          'sap_plant',
          'site_contact',
        ]

        await downloadAddressesListService
          .mutateAsync({
            id: selectedRow?.organization_id,
            data: {
              column_names,
            },
          })
          .then((res) => {
            downloadFileContentDisposition({
              data: res?.data,
              fileName: 'organization_sites.csv',
            })

            Notification.fire({
              icon: 'success',
              title: 'Success!',
              text: `Organization Sites downloaded successfully.`,
            })
          })
          .catch((err) => {
            Notification.fire({
              icon: 'error',
              title: 'Oops...!',
              text: err?.response?.data?.message,
              customClass: {
                confirmButton: 'btn btn-primary hover:text-white',
              },
              buttonsStyling: false,
            })
          })
      }
    })
  }

  return {
    columns,
    columnsAddress,
    sampleDataAddress,
    detailData,
    setSearch,
    selectedRow,
    setSelectedRow,
    tableRef,
    tableAddressessRef,
    searchDebounce,
    selectedSite,
    setSelectedSite,
    downloadSitesList,
    searchDebounceAddress,
    setSearchAddress,
  }
}

export default useOrganizationSite
