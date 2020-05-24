import React from "react";
function TableHead({tableSortHandler }) {
  console.log('table head render')
  return (
      <thead>
        <tr onClick={tableSortHandler} style={{cursor:'pointer'}}>
          <th name="summary">Название </th>
          <th name="start" >Дата начала</th>
          <th name="end" >Дата окончания</th>
          <th name="location" >Место проведения </th>
        </tr>
      </thead>
 
  );
}
export default React.memo(TableHead);