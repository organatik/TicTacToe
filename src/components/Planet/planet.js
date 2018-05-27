import React from "react";




const planet = (props) => {
    return (

                <tr>
                    {
                        props.keys.map(key => {
                            return (
                                <td key={key}>
                                    {props.planet[key]}
                                </td>
                            )
                        })
                    }
                </tr>

    );
};
export default planet;