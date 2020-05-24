import React from "react";
import { NavLink } from "react-router-dom";

// Memoized navbar. Rerenders rarely
function Navbar() {
// console.log('navbar rerenders  ')
  return (
    <nav className="mynavbar" role="navigation" aria-label="main navigation">
      <div className="mynavitem">
        <NavLink activeStyle={{ fontWeight: "bold" }} to="/page-one">
          Page1
        </NavLink>
      </div>
      <div className="mynavitem">
        <NavLink activeStyle={{ fontWeight: "bold" }} to="/page-two">
          Page2
        </NavLink>
      </div>
    </nav>
  );
}

export default React.memo(Navbar)