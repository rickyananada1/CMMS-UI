import React, { Fragment } from 'react'
import QRTasksList from './QRTasksList'
import QRTasksForm from './QRTasksForm'

const QRTasksIndex = ({ mode, setAction, setTabIndex, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <QRTasksList
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <QRTasksForm
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          setVisible={setVisible}
        />
      )}
    </Fragment>
  )
}

export default QRTasksIndex
