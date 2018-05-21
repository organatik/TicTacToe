import React, {Component} from "react";

import './board.css'


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

export default Board;