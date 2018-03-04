import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// import UniverseRow from '../components/UniverseRow';
import * as actions from '../actions/universeActions';
import { getUniverseData } from '../reducers/universeReducer';

class Universe extends React.Component {
  componentWillMount() {
    this.props.actions.discoverUniverse(
      3, // TODO: Fix when user input is added
      8, // TODO: Fix when user input is added
    );
  }

  createUniverseRows() {
    const universeRows = [];
    for (let i = 0; i < this.props.universeData.height; i += 1) {
      // universeRows.push(<UniverseRow />); TODO: Uncomment when UniverseRow is completed
      universeRows.push(<div>{ 'ROW ' + (i + 1) }</div>);
    }
    return universeRows;
  }

  render() {
    return (
      <div>
        { this.createUniverseRows() }
      </div>
    );
  }
}

Universe.propTypes = {
  // width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
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
)(Universe);
