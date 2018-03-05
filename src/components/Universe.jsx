import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import UniverseRow from '../components/UniverseRow';
import * as actions from '../actions/universeActions';
import { getUniverseData } from '../reducers/universeReducer';
import '../styles/universe.css';

class Universe extends React.Component {
  componentWillMount() {
    this.props.actions.discoverUniverse(
      3, // TODO: Fix when user input is added
      3, // TODO: Fix when user input is added
    );
  }

  createUniverseRows() {
    const universeRows = [];
    for (let i = 0; i < this.props.universeData.height; i += 1) {
      universeRows.push(<UniverseRow key={uuid.v4()} />);
    }
    return universeRows;
  }

  handleClick() { 
    this.props.actions.toggleActive(!this.props.universeData.universeActive);
  }

  render() {
    return (
      <div>
        <div className='actions'>
          <button onClick={ () => this.handleClick() }>{ this.props.universeData.universeActive ? 'Stop' : 'Start' }</button>
        </div>
        <div className='universe'>
          {this.createUniverseRows()}
        </div>
      </div>
    );
  }
}

Universe.propTypes = {
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
