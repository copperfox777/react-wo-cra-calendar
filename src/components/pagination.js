import React from "react";
// import { div } from "react-router-dom";
export default function Pagination({ page, pages, pageChangeHandler }) {
  return (
    <nav
      className="pagination is-small"
      role="navigation"
      aria-label="pagination"
    >
      <div className="pagination-previous" onClick={()=>pageChangeHandler(-1)}>Предыдущая</div>
      <div className="pagination-next" onClick={()=>pageChangeHandler(1)}>Следующая</div>
      <ul className="pagination-list">
        <li>
          <div className="pagination-link is-current" aria-label={`Page ${page}`} aria-current="page" >
            {page}
          </div>
        </li>
        <li>
          <div className="pagination-link" aria-label="all">
            {`Всего: ${pages}`}
          </div>
        </li>
      </ul>
    </nav>
  );
}
