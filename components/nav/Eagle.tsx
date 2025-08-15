import React from 'react';

const Eagle = () => {
	return(
		<div className="eagle xs:invisible sm:ml-[10rem] sm:h-[5rem] sm:ml-15 md:ml-64 md:visible">
        <div>
          <p className="text-white">Niepubliczna <br />
          Placówka
          <br />
          Doskonalenia
          <br /> Nauczycieli</p>
        </div>
        <img src="/img/eagle.png" alt="Akredytacja Kuratorium Oświaty" width="150" height="150"/>
      </div>
	);
};

export default Eagle;
