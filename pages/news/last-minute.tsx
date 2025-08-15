import React from 'react';
import Header from '../../components/Head';

const LastMinute = () => {
  return(
	<>
	<Header
		title="Last minute - najblizsze 7 dni"
		description="Kursy które ruszają za mniej niz 7 dni"
		query="news/last-minute"
		image=""
		keywords="last minute kursy"
	/>
	<div className="container">
		<h1>Najbliższe 7 dni</h1>
		<p>Poniżej przedstawiamy wszystkie kursy ruszające w całej Polsce w ciągu najbliższych 7 dni.</p>
		<p>Zapraszamy do zapisów tam gdzie jeszcze są wolne miejsca.</p>
		<p>--funkcjonalnosc jeszcze nie dziala--</p>
	</div>
	</>
  );
};

export default LastMinute; //TODO: Add terms where is to less 7 days to start course
