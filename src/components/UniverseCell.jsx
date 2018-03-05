import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/universeActions';
import { getUniverseData } from '../reducers/universeReducer';

class UniverseCell extends React.Component {
  livingStyle = { 
    backgroundColor: 'black',
  }

  deadStyle = { 
    backgroundColor: 'white',
  }

  handleClick() { 
    if (!this.props.universeData.universeActive) { 
      console.log("woah"); // TODO: implement manual status change logic 
      // this.actions.toggleLife(id);
    }
  }

  determineStatus() { 
    // TODO: Determine if cell is living or dead based on 8 surrounding cell statuses
    //       - Research existing algorithms for this logic
  }

  render() {
    return (
      <div
        className='universe-cell'
        style={ this.props.alive ? this.livingStyle : this.deadStyle }
        onClick={ () => this.handleClick() }
      />
    );
  }
}

UniverseCell.propTypes = {
  actions: PropTypes.object.isRequired,
  universeData: PropTypes.object.isRequired,
  alive: PropTypes.bool.isRequired,
};

UniverseCell.defaultProps = {
  alive: true,
}

function mapStateToProps(state) {
  return {
    universeData: getUniverseData(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UniverseCell);
