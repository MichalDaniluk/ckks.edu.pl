import Link from 'next/link';
import React from 'react';
import Header from '../components/Head';

const Cooperation = () => {
  return (
    <>
      <Header
        title="Współpraca z Centrum Kształcenia Kadr Sportowych"
        description="wspolpraca ckks"
        query="wspolpraca"
		keywords="wspolpraca zaprzyjaznione firmy"
		image=""
      />
      <div className="container">
        <h2>Współpraca</h2>
        <br />
        <ul>
          <li>
            <Link
              href="https://www.kursybp.pl/"
              passHref
            >
              Strona MedActive
            </Link>
          </li>
          <li>
            <Link
              href="https://lowiczsportacademy.pl/"
              passHref
            >
              Łowicka Akademia Sportu
            </Link>
          </li>
          <li>
            <Link
              href="https://przyspieszkraula.pl/"
              passHref
            >
              Przyśpiesz kraula
            </Link>
          </li>
          <li>
            <Link href="https://ckks.pl/o/iso_logo.jpg" passHref>
              ISO 9001
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Cooperation;
