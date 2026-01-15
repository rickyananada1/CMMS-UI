/* eslint-disable */
/* prettier-ignore-start */
import React, { Fragment } from 'react'
import FailureDefendsDetail from './FailureDefendsDetail'
import FailureDefendsForm from './FailureDefendsForm'
import DetailFailureDefends from './detail-defends/DetailFailureDefends'
import PopUpDeleteDefends from './detail-defends/PopUpDeleteDefends'
import useFailureDefends from './hooks/useFailurreDefends'


const FailureDefendsIndex = ({ mode, setAction, setTabIndex }) => {
  const { details, tasks, isDrawerOpen, setDrawerOpen, deleteFailurDefends, setSelectedTask, selectedTask } = useFailureDefends({
    mode,
    setAction,
    setTabIndex,
  })
  React.useEffect(() => {
    if (mode === 'Sending' && tasks.length > 0) {
      setDrawerOpen(true)
    }
  }, [mode, tasks])


  return (
    <Fragment>
      {(mode === 'Read' || mode === 'Delete') && (
        <FailureDefendsDetail mode={mode === 'Read' ? mode : 'Read'} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {(mode === 'Create' || mode === 'Change' || mode === 'Update') && (
        <FailureDefendsForm selectedTask={selectedTask} mode={mode} setAction={setAction} setTabIndex={setTabIndex} />
      )}
      {mode === 'Sending' && tasks.length > 0 && (
        <DetailFailureDefends
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          tasks={tasks}
          activeIndex={0}
          isOpen={isDrawerOpen}
          onClose={() => {
            setDrawerOpen(false)
            setAction('Read')
          }}
          deleteFailurDefends={deleteFailurDefends}
          setSelectedTask={setSelectedTask}
        />
      )}
      {mode === 'Delete' && (
        <PopUpDeleteDefends
          mode={mode}
          setAction={setAction}
          setTabIndex={setTabIndex}
          details={details}
          activeIndex={0}
          isOpen={mode === 'Delete'}
          onClose={() => {
            setDrawerOpen(false)
            setAction('Read')
          }}
          deleteFailurDefends={deleteFailurDefends}
          setSelectedTask={setSelectedTask}
        />
      )}

    </Fragment>
  )
}

export default FailureDefendsIndex
