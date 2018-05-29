import React from "react";

const tableHeaders = (props) => {
    return (
            <th onClick={props.click}>
                {props.keys}
                {props.sortImg}
            </th>
    );
};
export default tableHeaders;