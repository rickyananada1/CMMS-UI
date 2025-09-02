import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TabsWrapper } from 'src/components/elements/tabs'
import { relationshipsActions } from './slices/relationshipsSlice'
import RelationshipsList from './pages/list/RelationshipsList'
import RelationshipIndex from './pages/relationship/RelationshipIndex'
import { breadcrumbActions } from 'src/store/actions'

const RelationshipsTab = () => {
  const dispatch = useDispatch()
  const relationshipsState = useSelector((state) => state.relationships)

  const tabsContent = [
    {
      title: 'List',
      element: (
        <RelationshipsList
          mode={relationshipsState?.selectedAppAction}
          setAction={(param) => dispatch(relationshipsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(relationshipsActions.setSelectedAppIndex(param))}
        />
      ),
    },
    {
      title: 'Relationship',
      disabled: !relationshipsState?.selectedRelationship,
      element: (
        <RelationshipIndex
          mode={relationshipsState?.selectedAppAction}
          setAction={(param) => dispatch(relationshipsActions.setSelectedAppAction(param))}
          setTabIndex={(param) => dispatch(relationshipsActions.setSelectedAppIndex(param))}
          visible={relationshipsState?.visiblePopUp}
          setVisible={(param) => dispatch(relationshipsActions.setVisiblePopUp(param))}
        />
      ),
    },
  ]

  const chooseActionMenu = [
    {
      group: 'Relationships',
      menu: [
        {
          title: 'New Relationship',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Relationships',
          app_action: 'Create',
          action: () => {
            dispatch(
              relationshipsActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Create',
              }),
            )
          },
        },
        {
          title: 'Update/Edit Relationship',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Relationships',
          app_action: 'Update',
          disabled: !relationshipsState?.selectedRelationship,
          action: () => {
            dispatch(
              relationshipsActions.setSelectedAppIndexAndAction({
                index: 1,
                action: 'Update',
              }),
            )
          },
        },
        {
          title: 'Delete Relationship',
          modul_name: 'Assets',
          app_group: 'Assets',
          app_name: 'Relationships',
          app_action: 'Delete',
          disabled: !relationshipsState?.selectedRelationship,
          action: () => {
            dispatch(
              relationshipsActions.setSelectedAppIndexAndAction({
                index: 0,
                action: 'Delete',
              }),
            )
          },
        },
      ],
    },
  ]

  useEffect(() => {
    dispatch(
      breadcrumbActions.setBreadcrumbItem({
        name:
          relationshipsState.selectedAppIndex !== 1
            ? tabsContent[relationshipsState.selectedAppIndex].title
            : 'Detail',
        index: 2,
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationshipsState.selectedAppIndex])

  useEffect(() => {
    return () => {
      dispatch(relationshipsActions.resetState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TabsWrapper
      defaultIndex={relationshipsState.selectedAppIndex}
      selectedIndex={relationshipsState.selectedAppIndex}
      content={tabsContent}
      chooseActionMenu={chooseActionMenu}
      actionMenuCallback={(action) => {
        action()
      }}
      onSelect={(tabIndex) => {
        dispatch(
          relationshipsActions.setSelectedAppIndexAndAction({
            index: tabIndex,
            action: 'Read',
          }),
        )
      }}
    />
  )
}

export default RelationshipsTab
