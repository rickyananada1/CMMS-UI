import React, { Fragment } from 'react'
import FailureCodeDetail from './FailureCodeDetail'
import FailureCodeForm from './FailureCodeForm'
import FailureCodeRemediesForm from './FailureCodeRemediesForm'
import FailureCodeModalDelete from './FailureCodeModalDelete'

const FailureCode = ({ mode, setAction, setTabIndex, visible, setVisible }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <FailureCodeDetail mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <FailureCodeForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Delete' && (
        <FailureCodeModalDelete
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      {(mode === 'Remedies' || mode === 'UpdateRemedies') && (
        <FailureCodeRemediesForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default FailureCode
