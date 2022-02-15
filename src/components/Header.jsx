import React from "react";
import profileData from "../data/profile.json";
function Header({itemsInCart, credit}) {
  const { firstName } = profileData.profile;
  return (
    <div className="header">
      <a className="header__brand" href="/"><strong>Tienda de productos</strong></a>
      <nav className="header__navigation">
        <ul className="header__navigationList">
          <li>{firstName}</li>
          <li><a className="header__link" href="/carrito"><strong>Carrito({itemsInCart.length})</strong></a></li>
          <li>Crédito $ {credit}</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
