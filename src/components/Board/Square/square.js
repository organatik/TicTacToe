import React from "react";


const squares = (props) => {
    return (
        <button className="square" style={props.color} onClick={props.onClick}>
            {props.value}
        </button>
    );
};
export default squares;