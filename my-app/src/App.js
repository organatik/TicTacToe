import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function Square(props) {
    return (
        <button className="square" style={props.color} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends Component {
    renderSquare(i) {
        const winnerSquares = getWinner(this.props.squares);
        if(winnerSquares) {
            if(i === winnerSquares[0] || i === winnerSquares[1] || i === winnerSquares[2]) {
                return <Square
                    key={i}
                    value = {this.props.squares[i]}
                    onClick = {() => this.props.onClick(i)}
                    color = {{backgroundColor: 'green'}}
                />;
            } else {
                return <Square
                    key={i}
                    value = {this.props.squares[i]}
                    onClick = {() => this.props.onClick(i)}
                />;
            }

        } else {
            return <Square
                key={i}
                value = {this.props.squares[i]}
                onClick = {() => this.props.onClick(i)} />;
        }


    }

    render() {

        let row = [], boardRow =[];
        for(let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                row.push(this.renderSquare(j + i * 3));
            };
            boardRow.push(<div key={i} className="board-row">{row}</div>);
            row = [];
        }
        const board = <div> {boardRow} </div>;


        return board;
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            isDesk: true
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            winnerLine: calculateWinner(current.squares)
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber : step,
            xIsNext: (step % 2) === 0,
        })
    }

    sort() {
        this.setState({
            isDesk: !this.state.isDesk
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);


        const moves = history.map((step,move) => {
            const desc = move ? 'Go to move #' + move : 'Go to the game start';
            if (move === this.state.stepNumber) {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)} style={{color: 'red'}}>{desc}</button>
                    </li>
                );
            } else {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }

        });

        if(!this.state.isDesk) {
            moves.reverse()
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner.winner;
        } else if ( winner && winner === 'draw') {
            status = 'It is a ' + winner.winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <button onClick={() => this.sort()}>Sort</button>
                </div>
            </div>
        );
    }
}

// ========================================




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Game/>
      </div>
    );
  }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log([a,b,c]);
            return {
                winner: squares[a],
                winnerLine: [a, b, c]
            }
        } else if (!squares.includes(null)) {
            return {
                winner: 'draw'
            }
        }
    }
    return null;
}

function getWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c]
        }
    }
    return null;
}


export default App;
