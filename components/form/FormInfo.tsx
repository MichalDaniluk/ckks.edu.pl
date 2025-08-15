
import React from 'react';
import { setDateTermFormat } from '../Helpers';
import ShowPrice from '@components/base/ShowPrice';

//type Props = {
//	props: {
//		nazwa:string
//		data_od:string
//		data_do:string
//		miejscowosc:string
//		firstprice:string
//		cena:number
//		status:string
//		brakmiejsc:string
//		uwagi:string
//	}
//}

const FormInfo = (state) => {

	const {nazwa,data_od,data_do, miejscowosc, firstprice, cena, status, brakmiejsc, uwagi} = state.state;

	return (
		<div className="grid m-2">
			<div className="text-dark font-bold m-2 text-center text-xl">{nazwa}</div>
			<div className="ml-2 mr-2 text-center">
				Termin: {setDateTermFormat(data_od, data_do)}, Miejsce: {miejscowosc}, <ShowPrice date={data_od} price={cena} firstprice={firstprice} />
				{status === 'Rusza' && ' Kurs rusza na 100% '}
				{status === 'Oczekuje' && ' Kurs oczekuje na zabranie grupy'}
				{brakmiejsc === 'T' && ' Brak miejsc (rezerwacja miejsca)'}
			</div>
			<div className="text-xs text-center" dangerouslySetInnerHTML={{ __html: uwagi }} />
        </div>
	);
};

export default FormInfo;
