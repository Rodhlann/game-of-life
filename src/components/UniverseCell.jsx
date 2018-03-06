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
      this.props.actions.toggleStatus(this.props.id, this.props.universeData.universeCellStatuses);
    }
  }

  render() {
    return (
      <button
        className="universe-cell"
        style={this.props.universeData.universeCellStatuses[this.props.id] ? this.livingStyle : this.deadStyle}
        onClick={() => this.handleClick()}
      />
    );
  }
}

UniverseCell.propTypes = {
  actions: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
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
