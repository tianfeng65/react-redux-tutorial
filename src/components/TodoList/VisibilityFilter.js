import React from 'react'
import {connect} from 'react-redux'
import cx from 'classnames'
import '../../style.css'

const visibilityFilterSelector = ['all', 'completed', 'inCompleted']

function VisibilityFilter (props) {
  return (
    <div className="visibility-filter">
      {visibilityFilterSelector.map(selector => (
            <span 
              key={selector} 
              onClick={()=>{props.toggleFilter(selector)}} 
              className={cx('selector', props.filter === selector ? 'selector-active' : "")}
            >
              {selector}
            </span>
          )
        )
      }
    </div>
  )
}

const mapStateToProps = state => ({
  filter: state.visibilityFilter.filter
})

const mapActionsToProps = {
  toggleFilter(filter){
    return {
      type: 'toggleFilter',
      payload: {
        filter
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VisibilityFilter)