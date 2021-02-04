import React from 'react';
import "./Table.css";

function Table({countriesData}) {
    return (
        <div className="table">
            {countriesData.map((data) =>
            <tr>
                <td>{data.country}</td>
                <td><strong>{data.cases}</strong></td>
            </tr>
            )}
        </div>
    )
}

export default Table
