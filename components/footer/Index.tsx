import React from 'react';

import FooterMenu from './FooterMenu';
import Copyright from './Copyright';
import SocialIcons from '@components/icons/SocialIcons';

const Footer = () => {
  return (
    <>
      <footer className="footerContainer">
        <div className="footerLeft">
          <img src="/img/Logo_CKKS_silver.svg" alt="CKKS" className="scale-100" width="100" height="100"/>
          <div className="listy">
            <ul
              aria-label="Obsługa Klientów i&nbsp;Kursów"
              className="listLeft mt-4"
            >
              <li>
                <a href="mailto:sekretariat@ckks.pl">sekretariat@ckks.pl</a>
              </li>
              <li>
                <a href="tel:+48713071211">tel. 71 307 12 11</a>
              </li>
              <li>
                <a href="tel:+48733 330 303">tel. 733 330 303</a>
              </li>
            </ul>

            <ul
              aria-label="Zaświadczenia i&nbsp;Marketing"
              className="listRight mt-4"
            >
              <li>
                <a href="mailto:zaswiadczenia@ckks.pl">zaswiadczenia@ckks.pl</a>
              </li>
              <li>
                <a href="mailto:marketing@ckks.pl">marketing@ckks.pl</a>
              </li>
              <li>
                <a href="tel:+48833070170">tel. 83 307 01 70</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerRight">
          <div className="p-6 md:p-[4rem] md:ml-[4rem] place-items-center">
            <SocialIcons fill="white" />
          </div>
        </div>
      </footer>

      <FooterMenu />
      <Copyright />
    </>
  );
};

export default Footer;
