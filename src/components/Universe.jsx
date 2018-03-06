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
    this.gameOfLife();
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

  // calculateNeighbors() {
  //  TODO: likely need to create a 2D array to properly calculate this...
  //        will refactor code as appropriate after the matrix gets figured out
  // }

  /*
    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overpopulation.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  */
  calculateStatuses() {
    const cellStatuses = this.props.universeData.universeCellStatuses;
    cellStatuses.forEach((status, cellId) => {
      const neighbors = Math.floor((Math.random() * 10) + 1);

      switch (true) {
        case (status && neighbors < 2):
        case (status && neighbors > 3):
        case (!status && neighbors === 3):
          this.props.actions.toggleStatus(cellId, cellStatuses);
          break;
        default:
          // live
      }
    });
  }

  gameOfLife() {
    setTimeout(() => {
      if (this.props.universeData.universeActive) {
        this.calculateStatuses();
        this.gameOfLife();
      }
    }, 500);
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
