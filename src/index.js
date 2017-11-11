import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {
  // This returns a React element -> lightweight description of what to render 
  render() {
    return (
      {
        //Set state schedules an update to the component. This causes React to merge
        //in the passed state update and rerender the components and its descendants.
      },
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}*/

/* 
  This is a funcitonal way of declaring the above object. Instead of creating 
  and object, we can create a function. These types of functions that only contain
  a render() function are called "functional components"
*/
function Square(props){
  return(
    {/* 
      onClick() will not work because it will call the onClick function immediately
      without passing it down.
    */},
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function checkWinner(sqrs){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++){
    /* 
      This seems similar to multi-assign in python. Just assigns
      values in each element to a,b,c for each iteration.
    */
    const [a,b,c] = lines[i];
    if (sqrs[a] && sqrs[a] === sqrs[b] && sqrs[b] === sqrs[c]){
      return sqrs[a]
    }
  }
  return null;
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
      /* initialize state to true*/
      isX: true,
      finisehd: false,
      turns: 0,
    }
  }

  handleClick(i) {
    /* 
      using slice to copy the squares array, update the array, then set the updated
      array as the new squares array. This is done to avoid mutating the existing
      array.
    */
    const squares = this.state.squares.slice();
    /*  */
    if (squares[i] || this.state.finished){
      return;
    }
    squares[i] = this.state.isX ? 'X' : 'O';
    this.setState({
      squares: squares, 
      isX: !this.state.isX,
      turns: this.state.turns + 1,
    });
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
    
    {/* Display whose turn it is */}
    const winner = checkWinner(this.state.squares);
    let status;
    if (winner){
      status = 'Winner: ' + winner;
      this.state.finished = true;
    } else if (this.state.turns == 9) {
      status = 'Ended in a Draw...';
      this.state.finished = true;
    } else {
      status = 'Next Player ' + (this.state.isX ? 'X' : 'O');
    }

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
  