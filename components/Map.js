import React, { useRef, useEffect, useState } from 'react';

const Map = ({ placeId }) => {
  const wrapperRef = useRef(null);
  const [dataMap, setDataMap] = useState({
    mapa: '',
    nazwa: '',
    adres: '',
    miejscowosc: '',
  });

  useEffect(() => {
    fetch(`/api/course/map/${placeId}`)
      .then(response => response.json())
      .then(response => setDataMap(response));
  }, []);

  return (
    <div className="sign-up-form-container" ref={wrapperRef}>
      {dataMap.mapa === null && 'Brak mapy'}
      {dataMap.mapa && (
        <div className="placeMap">
          <iframe
            src={dataMap.mapa}
            className="placeMapFrame"
            style={{ width: '100%', height: '100%' }}
          ></iframe>
        </div>
      )}
      <div className="placeMapInfo">
        {dataMap.nazwa && <p>{dataMap.nazwa}</p>}
        {dataMap.adres && <p>{dataMap.adres}</p>}
        {dataMap.miejscowosc && <p>{dataMap.miejscowosc}</p>}
      </div>
    </div>
  );
};

export default Map;
