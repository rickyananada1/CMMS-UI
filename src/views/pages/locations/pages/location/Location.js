import React, { Fragment } from 'react'
import LocationDetail from './LocationDetail'
import LocationForm from './LocationForm'
import LocationsModalDelete from './LocationModalDelete'
import LocationModalChooseParent from './LocationModalChooseParent'
import LocationModalChooseChild from './LocationModalChooseChild'

const Location = ({
  mode,
  setAction,
  setTabIndex,
  visible,
  setVisible,
  visiblePopUpLocationParent,
  setVisiblePopUpLocationParent,
  visiblePopUpLocationChild,
  setVisiblePopUpLocationChild,
  isRefetchDetailLocation,
  setIsRefetchDetailLocation,
  isRefetchChildLocation,
  setIsRefetchChildLocation,
}) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <LocationDetail
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visiblePopUpLocationParent={visiblePopUpLocationParent}
          setVisiblePopUpLocationParent={setVisiblePopUpLocationParent}
          visiblePopUpLocationChild={visiblePopUpLocationChild}
          setVisiblePopUpLocationChild={setVisiblePopUpLocationChild}
          isRefetchDetailLocation={isRefetchDetailLocation}
          setIsRefetchDetailLocation={setIsRefetchDetailLocation}
          isRefetchChildLocation={isRefetchChildLocation}
          setIsRefetchChildLocation={setIsRefetchChildLocation}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <LocationForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Delete' && (
        <LocationsModalDelete
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      {mode === 'Read' && visiblePopUpLocationParent && (
        <LocationModalChooseParent
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visiblePopUpLocationParent={visiblePopUpLocationParent}
          setVisiblePopUpLocationParent={setVisiblePopUpLocationParent}
          setIsRefetchDetailLocation={setIsRefetchDetailLocation}
        />
      )}
      {mode === 'Read' && visiblePopUpLocationChild && (
        <LocationModalChooseChild
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visiblePopUpLocationChild={visiblePopUpLocationChild}
          setVisiblePopUpLocationChild={setVisiblePopUpLocationChild}
          setIsRefetchChildLocation={setIsRefetchChildLocation}
        />
      )}
    </Fragment>
  )
}

export default Location
