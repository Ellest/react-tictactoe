import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  /* This returns a React element -> lightweight description of what to render */
  render() {
    return (
      {/* 
        Set state schedules an update to the component. This causes React to merge
        in the passed state update and rerender the components and its descendants.
      */},
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  /* 
    Constructor for a class. Base class must be initialized through super() when 
    defining a constructor in JS. 
  */
  constructor (props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }

  handleClick(i) {
    /* 
      using slice to copy the squares array, update the array, then set the updated
      array as the new squares array. This is done to avoid mutating the existing
      array.
    */
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares})
  }
  /* parameters = props */
  renderSquare(i) {
    {/* 
      This renders the square. The Square element will call render() to render
      the element and return it. 

      We gain component and overall application performance by not mutating 
      the underlying directly.

      This is because by enforcing an immutable nature, we can avoid heavy 
      computation for checking if a object has changed as a newly created
      object will have a different reference. 

      Immutability best benefits pure components. Due to optimally being able
      to identify what has changed, React can easily determine which components
      need re-rendering.
    */}
    return (
      /* 
        The onClick passes down a function (as a prop) to be called. onClick is a prop
        on the built-in DOM <button> component. Thus passing this in tells React
        to setup an event listener. 

        This basically defines an onClick method and has the Square call it in a
        level below. 

        By React convention, on* names are used for attritubtes and handle* names 
        are used for handler methods
      */
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  