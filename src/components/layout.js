import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../styles/styles.css";

export default function Layout({ children, title }) {
  return (
    <div>
      <Navbar />
      {title && ( <div className="page-header"> <h1>{title}</h1> </div> )}

      <div className="flex-cont">
        <div className="flex-box">{children}</div>
      </div>
    </div>
  );
}
