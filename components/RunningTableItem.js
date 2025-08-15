import React from 'react';
import { setDateTermFormat } from '../components/Helpers';

const RunningTableItem = ({ kurs, openForm, setKursInfoState }) => {
  const buttonHandler = () => {
    openForm();
    setKursInfoState(kurs);
  };
  return (
    <div className="border-black border-solid  border-b-2 md:ml-12 md:mr-12">
      <div
        className="runningItemsContainer1 grid grid-cols-3"
        key={kurs.termin_id}
      >
        <div>
          <p className="text-xl">{kurs.miejscowosc}</p>
        </div>
        <div>
          <p className="text-xl">
            {setDateTermFormat(kurs.data_od, kurs.data_do)}
          </p>
        </div>
        <div>
          <button className="see-more-btn m-2" onClick={buttonHandler}>
            zapisz się
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunningTableItem;
