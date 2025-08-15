import React, { useState } from 'react';
import Link from 'next/link';

import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTimes, faHouse } from '@fortawesome/free-solid-svg-icons';

import MenuBtnSticky from '@components/ui/MenuBtnSticky';
import SocialIcons from '@components/icons/SocialIcon';

import NavItems from './nav/NavItems';

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="">
        <NavItems />
        <div onClick={() => setOpen(true)}>
          <MenuBtnSticky />
        </div>
      </div>

      <div>
        {/*<div className="" onClick={() => setOpen(true)}></div>*/}

        <CSSTransition
          in={open}
          timeout={700}
          classNames="menu-Overlay"
          unmountOnExit
        >
          <div className="menuOverlay">
            <div className="menuOverlayButtons">
              <a href="/" className="home-btn" id="home-btn">
                <FontAwesomeIcon
                  icon={faHouse}
                  height={30}
                  id="home-btn"
                  onClick={() => setOpen(false)}
                />
              </a>
              <div className="leftSideButtons" onClick={() => setOpen(!open)}>
                <ul className="bigBtns">
                  <li className="goingBtn">
                    <a href="/kursy-ruszajace">Rusza na 100%</a>
                  </li>
                  <li className="studiaBtn">
                    <a href="/podyplomowe">Studia Podyplomowe</a>
                  </li>
                  <li className="coursesBtn">
                    <a href="/kursy-i-szkolenia?search=">Kursy i Szkolenia</a>
                    <ul className="sublistOne">
                      <li className="item1">
                        <a href="/kursy-i-szkolenia?search=trenerskie">
                          Trenerskie
                        </a>
                      </li>
                      <li className="item2">
                        <a href="/kursy-i-szkolenia?search=instruktorskie">
                          Instruktorskie
                        </a>
                      </li>
                      <li className="item3">
                        <a href="/kursy-i-szkolenia?search=fizjo">
                          Fizjoterapuetyczne
                        </a>
                      </li>
                      <li className="item4">
                        <a href="/kursy-i-szkolenia?search=on-line">On-line</a>
                      </li>
                      <li className="item5">
                        <a href="/kursy-i-szkolenia?search=sport">Sportowe</a>
                      </li>
                      <li className="item6">
                        <a href="/kursy-i-szkolenia?search=oswiata">Oświata</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="rightSideButtons" onClick={() => setOpen(!open)}>
                <ul>
                  <a href="/dofinansowania">
                    <li>Dofinansowania</li>
                  </a>
                  <a href="/kadra">
                    <li>Nasza Kadra</li>
                  </a>
                  <a href="/kontakt">
                    <li>Kontakt</li>
                  </a>
                  <a href="/onas">
                    <li>O Nas</li>
                  </a>
                  <Link href="/blog">
                    <li>Blog</li>
                  </Link>
                  <a href="https://partner.ckks.pl/login.html">
                    <li>Logowanie</li>
                  </a>
                </ul>
              </div>
              <FontAwesomeIcon
                id="menu-close"
                icon={faTimes}
                onClick={() => setOpen(!open)}
                height={50}
              />
              <div className="absolute bottom-0 left-0">
                <SocialIcons fill="#e2c62f" />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </nav>
  );
};

export default Nav;
