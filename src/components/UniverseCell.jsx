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

  /**
    * Toggle cell status
    */
  handleClick() {
    if (!this.props.universeData.universeActive) {
      this.props.actions.toggleStatus(
        this.props.rowIndex,
        this.props.cellIndex,
        this.props.universeData.universeCellStatuses,
      );
    }
  }

  /**
    * Set cell styles based on cell status
    * @returns {object} appropriate cell style
    */
  checkStyles() {
    if (
      this.props.universeData.universeCellStatuses.length &&
      this.props.universeData.universeCellStatuses[this.props.rowIndex] &&
      this.props.universeData.universeCellStatuses[this.props.rowIndex][this.props.cellIndex]
    ) {
      const status = this.props.universeData.universeCellStatuses[this.props.rowIndex][this.props.cellIndex];
      return status ? this.livingStyle : this.deadStyle;
    }
    return this.deadStyle;
  }

  render() {
    return (
      <button
        className="universe-cell"
        style={Object.assign(this.checkStyles(), {
          height: this.props.universeData.universeDimension,
          width: this.props.universeData.universeDimension,
        })}
        onClick={() => this.handleClick()}
      />
    );
  }
}

UniverseCell.propTypes = {
  actions: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired,
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
)(UniverseCell);
