import React from 'react';
import Link from 'next/link';

const Copyright = () => {
	return(
		<div className="footerBg">
		<p className="m-0 pt-2 mb-2 p-2 text-center">
        Przedsiębiorca uzyskał subwencję finansową w ramach programu rządowego
        <span className="text-primary block mt-2 mb-2">
          "Tarcza Finansowa 2.0 Polskiego Funduszu Rozwoju dla Mikro, Małych i
          Średnich Firm"
        </span>
        udzieloną przez PFR S.A.
      </p>
        <p className="m-0 p-2 text-center text-xs">
          Wszytkie prawa zastrzeżonie. Copyright © 2014 r. “CKKS” Kopiowanie bez
          zgody właściciela serwisu surowo zabronione. Strona korzysta z plików
          Cookie, przebywając tutaj akceptujesz to, więcej w{' '}
          <Link href="/regulamin">regulaminie</Link>.
        </p>
	</div>
	);
};

export default Copyright;
