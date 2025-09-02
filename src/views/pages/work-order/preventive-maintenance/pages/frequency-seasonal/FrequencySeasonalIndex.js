import React, { Fragment } from 'react'
import FrequencySeasonalList from './FrequencySeasonalList'
import FrequencySeasonalForm from './FrequencySeasonalForm'

const FrequencySeasonalIndex = ({ mode, setAction, setTabIndex }) => {
  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete' || mode === 'Create PM WO') && (
        <FrequencySeasonalList mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Update') && (
        <FrequencySeasonalForm mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
    </Fragment>
  )
}

export default FrequencySeasonalIndex
