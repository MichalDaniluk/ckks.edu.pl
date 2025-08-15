import React from 'react';
import Link from 'next/link';

import { SearchBar } from '../SearchBar';

const LogoCkks = () => {
	return(
		<div className="nav">
			<div className="nav__icons-logo">
				<div className="nav__logo">
					<Link href="/">
						<img src="/img/Logo_CKKS_gold.svg" alt="CKKS" width="150" height="150"/>
					</Link>
				</div>
				<div className="nav__logo-menu">
					<Link href="/">
						<img src="/img/Logo_CKKS_gold.svg" alt="CKKS" width="150" height="150"/>
					</Link>
				</div>
				<div className="nav__logo-text">Niepubliczna <br />Placówka<br />Doskonalenia<br /> Nauczycieli</div>
				<div className="nav__ako"><img src="/img/eagle.png" alt="Akredytacja Kuratorium Oświaty" width="150" height="150" /></div>
			</div>
			<div className="nav__search-bar"><SearchBar /></div>
			<div className="nav__icons">
				<div className="nav__iso"><img src="/img/9001.jpg" alt="Certyfikat ISO"  width="100" height="100"/></div>
			</div>
		</div>
	);
};

export default LogoCkks;
