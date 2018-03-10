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
  /**
    * Ensure user input is desired format
    * @param {?} value user input
    * @returns {bool} product of tested input
    */
  static validateInput(value) {
    return /^\d+$/.test(value);
  }

  /**
    * Perform action after component mounts
    */
  componentDidMount() {
    this.props.actions.addUniverseCellStatuses(
      this.props.universeData.width,
      this.props.universeData.height,
    );
    window.addEventListener('resize', () => this.props.actions.computeGridSize(
      this.props.universeData.baseDimension,
      this.props.universeData.width,
      this.props.universeData.height,
    ));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.props.actions.computeGridSize(
      this.props.universeData.baseDimension,
      this.props.universeData.width,
      this.props.universeData.height,
    ));
  }

  /**
    * Generates universe rows and columns
    * @returns universe rows, with columns
    */
  createUniverseRows() {
    const universeRows = [];
    for (let i = 0; i < this.props.universeData.height; i += 1) {
      universeRows.push(<UniverseRow rowIndex={i} key={uuid.v4()} />);
    }
    return universeRows;
  }

  /**
    * Triggered when Start/Stop button is clicked
    * Activates game and toggles universe on/off
    */
  handleClick() {
    this.props.actions.toggleActive(!this.props.universeData.universeActive);
    this.gameOfLife();
  }

  /**
    * Update width based on user input
    * @param {object} event user input event
    */
  handleWidthChange(event) {
    if (event.key === 'Enter') {
      const value = Universe.validateInput(event.target.value) ? event.target.value : this.props.universeData.width;
      this.props.actions.updateUniverseWidth(
        Number(value),
        this.props.universeData.height,
      );
      this.props.actions.computeGridSize(
        this.props.universeData.baseDimension,
        Number(value),
        this.props.universeData.height,
      );
    }
  }

  /**
    * Update height based on user input
    * @param {object} event user input event
    */
  handleHeightChange(event) {
    if (event.key === 'Enter') {
      const value = Universe.validateInput(event.target.value) ? event.target.value : this.props.universeData.height;
      this.props.actions.updateUniverseHeight(
        this.props.universeData.width,
        Number(value),
      );
      this.props.actions.computeGridSize(
        this.props.universeData.baseDimension,
        this.props.universeData.width,
        Number(value),
      );
    }
  }

  /**
    * Checks if row index passes bottom of universe during neightbor
    * check and wraps back to top
    * @param {number} rowIndex y index of specific cell in the universe
    * @returns {number} appropriate rowIndex (wrapped to top if necessary)
    */
  wrapToTopChecker(rowIndex) {
    let tmpRowIndex = rowIndex + 1;
    if (tmpRowIndex > (this.props.universeData.height - 1)) {
      tmpRowIndex = 0;
    }
    return tmpRowIndex;
  }

  /**
    * Checks if row index passes top of universe during neightbor
    * check and wraps back to bottom
    * @param {number} rowIndex y index of specific cell in the universe
    * @returns {number} appropriate rowIndex (wrapped to bottom if necessary)
    */
  wrapToBottomChecker(rowIndex) {
    let tmpRowIndex = rowIndex - 1;
    if (tmpRowIndex < 0) {
      tmpRowIndex = this.props.universeData.height - 1;
    }
    return tmpRowIndex;
  }

  /**
    * Checks if cell index passes right of universe during neightbor
    * check and wraps back to left
    * @param {number} cellIndex x index of specific cell in the universe
    * @returns {number} appropriate cellIndex (wrapped to left if necessary)
    */
  wrapToLeftChecker(cellIndex) {
    let tmpCellIndex = cellIndex + 1;
    if (tmpCellIndex > (this.props.universeData.width - 1)) {
      tmpCellIndex = 0;
    }
    return tmpCellIndex;
  }

  /**
    * Checks if cell index passes left of universe during neightbor
    * check and wraps back to right
    * @param {number} cellIndex x index of specific cell in the universe
    * @returns {number} appropriate cellIndex (wrapped to right if necessary)
    */
  wrapToRightChecker(cellIndex) {
    let tmpCellIndex = cellIndex - 1;
    if (tmpCellIndex < 0) {
      tmpCellIndex = this.props.universeData.width - 1;
    }
    return tmpCellIndex;
  }

  /**
    * Checks 8 neighbors of individual cell
    * @param {array} cellStatuses 2D array representing state of universe
    * @param {number} rowIndex y index of specific cell in the universe
    * @param {number} cellIndex x index of specific cell in the universe
    * @returns {number} number of active neighbors
    */
  calculateNeighbors(cellStatuses, rowIndex, cellIndex) {
    let neighbors = 0;
    if (cellStatuses[this.wrapToBottomChecker(rowIndex)][this.wrapToRightChecker(cellIndex)]) { // NW
      neighbors += 1;
    } if (cellStatuses[this.wrapToBottomChecker(rowIndex)][cellIndex]) { // N
      neighbors += 1;
    } if (cellStatuses[this.wrapToBottomChecker(rowIndex)][this.wrapToLeftChecker(cellIndex)]) { // NE
      neighbors += 1;
    } if (cellStatuses[rowIndex][this.wrapToLeftChecker(cellIndex)]) { // E
      neighbors += 1;
    } if (cellStatuses[this.wrapToTopChecker(rowIndex)][this.wrapToLeftChecker(cellIndex)]) { // SE
      neighbors += 1;
    } if (cellStatuses[this.wrapToTopChecker(rowIndex)][cellIndex]) { // S
      neighbors += 1;
    } if (cellStatuses[this.wrapToTopChecker(rowIndex)][this.wrapToRightChecker(cellIndex)]) { // SW
      neighbors += 1;
    } if (cellStatuses[rowIndex][this.wrapToRightChecker(cellIndex)]) { // W
      neighbors += 1;
    }
    return neighbors;
  }

  /**
    * Checks all cells based on these rules and updates all statuses simultaniously
    *   - Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    *   - Any live cell with two or three live neighbours lives on to the next generation.
    *   - Any live cell with more than three live neighbours dies, as if by overpopulation.
    *   - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    */

  calculateStatuses() {
    const cellStatuses = this.props.universeData.universeCellStatuses;
    const previouslyAffectedCells = this.props.universeData.affectedCellStatuses;
    const tmpCellStatuses = [...Array(this.props.universeData.height).fill(false)]
      .map(() => Array(this.props.universeData.width).fill(false));
    const newlyAffectedCells = [...Array(this.props.universeData.height).fill(false)]
      .map(() => Array(this.props.universeData.width).fill(false));

    const canCheckAffectedCells = !!previouslyAffectedCells
      .map(affectedRow => affectedRow
        .filter(cell => cell).length > 0)
      .filter(result => result).length;

    cellStatuses.forEach((row, rowIndex) => {
      row.forEach((status, cellIndex) => {
        if (!canCheckAffectedCells || previouslyAffectedCells[rowIndex][cellIndex]) {
          const neighbors = this.calculateNeighbors(cellStatuses, rowIndex, cellIndex);
          newlyAffectedCells[rowIndex][cellIndex] = !!neighbors;
          switch (true) {
            case (status && neighbors < 2):
            case (status && neighbors > 3):
            case (!status && neighbors === 3):
              tmpCellStatuses[rowIndex][cellIndex] = !cellStatuses[rowIndex][cellIndex];
              break;
            default:
              tmpCellStatuses[rowIndex][cellIndex] = !!cellStatuses[rowIndex][cellIndex];
          }
        }
      });
    });
    const trulyNewlyNewNew = [...Array(this.props.universeData.height).fill(false)]
      .map(() => Array(this.props.universeData.width).fill(false));
    newlyAffectedCells
      .map((affectedRow, y) => affectedRow
        .map((cell, x) => {
          if (cell) {
            trulyNewlyNewNew[y][x] = true;
            trulyNewlyNewNew[this.wrapToBottomChecker(y)][this.wrapToRightChecker(x)] = true;
            trulyNewlyNewNew[this.wrapToBottomChecker(y)][x] = true;
            trulyNewlyNewNew[this.wrapToBottomChecker(y)][this.wrapToLeftChecker(x)] = true;
            trulyNewlyNewNew[y][this.wrapToLeftChecker(x)] = true;
            trulyNewlyNewNew[this.wrapToTopChecker(y)][this.wrapToLeftChecker(x)] = true;
            trulyNewlyNewNew[this.wrapToTopChecker(y)][x] = true;
            trulyNewlyNewNew[this.wrapToTopChecker(y)][this.wrapToRightChecker(x)] = true;
            trulyNewlyNewNew[y][this.wrapToRightChecker(x)] = true;
          }
        }));
    this.props.actions.updateAllStatuses(tmpCellStatuses);
    this.props.actions.updateAffectedCells(trulyNewlyNewNew);
  }

  /**
    * Game loop. Triggers when universe is active
    */
  gameOfLife() {
    setTimeout(() => {
      if (this.props.universeData.universeActive) {
        this.calculateStatuses();
        this.gameOfLife();
      }
    }, 300);
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
