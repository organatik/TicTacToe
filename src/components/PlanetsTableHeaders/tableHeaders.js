import React from "react";




const tableHeaders = (props) => {
    return (
            <th onClick={props.click}>
                {props.keys}
            </th>
    );
};
export default tableHeaders;