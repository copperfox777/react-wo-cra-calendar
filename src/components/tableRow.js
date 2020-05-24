import React from "react";

export default function TableRow({ rowData }) {
  return (
    <tr>{
        rowData && rowData.map((item, idx) => <td key={idx}>{item}</td>)
    }</tr>
  );
}
