import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import * as actions from '../actions/universeActions';
import { getUniverseData } from '../reducers/universeReducer';
import UniverseCell from '../components/UniverseCell';

class UniverseRow extends React.Component {
  /**
    * Creates universe cells
    * @returns {array} all universe cells for the given row
    */
  createUniverseCells() {
    const universeCells = [];
    for (let i = 0; i < this.props.universeData.width; i += 1) {
      universeCells.push(<UniverseCell
        rowIndex={this.props.rowIndex}
        cellIndex={i}
        key={uuid.v4()}
      />);
    }
    return universeCells;
  }

  render() {
    return (
      <div className="universe-row">
        { this.createUniverseCells() }
      </div>
    );
  }
}

UniverseRow.propTypes = {
  // actions: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  universeData: PropTypes.object.isRequired,
};

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
)(UniverseRow);
