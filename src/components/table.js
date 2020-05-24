import React from "react";
import TableRow from './tableRow'
import TableHead from "./tableHead";
export default function Table({ data,tableSortHandler }) {
  return (
    <table className="table">
      <TableHead tableSortHandler={tableSortHandler}/>
      <tbody>
      {data &&
          data.map((item) => {
            let rowArr=[item.summary,item.end,item.start,item.location];
            return (
              <TableRow key={item.uid} rowData={rowArr}/>
            );
          })}
      </tbody>
    </table>
  );
}
