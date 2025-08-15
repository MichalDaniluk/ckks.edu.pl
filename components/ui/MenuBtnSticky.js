import React, { useState, useEffect } from 'react';

const MenuBtnSticky = () => {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 140) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <div className="nav__menu-container">
      <div className={scrolled ? 'nav__menu nav__menu--sticky' : 'nav__menu'}>
        <span>MENU</span>
      </div>
    </div>
  );
};

export default MenuBtnSticky;
