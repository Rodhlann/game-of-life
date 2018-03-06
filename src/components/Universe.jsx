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
  componentDidMount() {
    this.props.actions.addUniverseCellStatuses(
      this.props.universeData.width,
      this.props.universeData.height,
    );
  }

  createUniverseRows() {
    const universeRows = [];
    for (let i = 0; i < this.props.universeData.height; i += 1) {
      universeRows.push(<UniverseRow iteration={i} key={uuid.v4()} />);
    }
    return universeRows;
  }

  handleClick() {
    this.props.actions.toggleActive(!this.props.universeData.universeActive);
  }

  handleWidthChange(event) {
    if (event.key === 'Enter') {
      this.props.actions.updateUniverseWidth(event.target.value, this.props.universeData.height);
    }
  }

  handleHeightChange(event) {
    if (event.key === 'Enter') {
      this.props.actions.updateUniverseHeight(this.props.universeData.width, event.target.value);
    }
  }

  render() {
    return (
      <div>
        <div className="actions">
          <label htmlFor="width">Width:
            <input
              id="width"
              type="text"
              defaultValue={this.props.universeData.width}
              disabled={this.props.universeData.universeActive}
              onKeyDown={event => this.handleWidthChange(event)}
            />
          </label><br />
          <label htmlFor="height">Height:
            <input
              id="height"
              type="text"
              defaultValue={this.props.universeData.height}
              disabled={this.props.universeData.universeActive}
              onKeyDown={event => this.handleHeightChange(event)}
            />
          </label><br />
          <button onClick={() => this.handleClick()}>
            {this.props.universeData.universeActive ? 'Stop' : 'Start'}
          </button>
        </div>
        <div className="universe">
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
