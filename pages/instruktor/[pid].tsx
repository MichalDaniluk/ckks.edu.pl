import React from 'react';

import Image from "next/legacy/image";
import ActualCourses from './ActualCourses';
import Header from '@components/Head';
import PageTop from '@components/PageTop';
import LoremIpsumBold from '@components/base/LoremIpsumBold';
import LoremIpsum from '@components/base/LoremIpsum';

interface IQuery {
	query: {
		pid: number;
	}
}

export async function getServerSideProps({query}:IQuery) {
  const data = await fetch(`https://api.ckks.pl/api/instructor/${query.pid}`).then(inst=>inst.json());

  const resImg = await fetch(`https://api.ckks.pl/api/instructor/images/${query.pid}`);
  const images = await resImg.json();

  const res2 = await fetch(
    `https://api.ckks.pl/api/instructor/actualcourses/${query.pid}`
  );
  const actualCourses = await res2.json();

  if (!data || !actualCourses || !images) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, actualCourses, images },
  };
}

const InstructorItem = ({ data, actualCourses, images }) => {

  return (
    <>
      <Header
        title={`Instruktor CKKS ${data[0].imie_nazwisko}`}
        description={`Instruktor ckks ${data[0].imie_nazwisko}`}
        query={`instruktor/${data[0].instruktor_id}`}
        image={`/o/instruktor/${images[0]?.plik}`}
		keywords={`instruktor ckks ${data[0].imie_nazwisko}`}
      />
      <PageTop title={data[0].imie_nazwisko} bgImage={`/o/instruktor/zdjecia/${images[0]?.plik}`} />

        <div className="grid md:grid-cols-2 md:w-3/4 m-auto">
          <div className="m-2 md:mr-24 md:mt-12 md:mb-4 drop-shadow-md bg-slate-200">
            <Image
				src={`/o/instruktor/zdjecia/${images[0]?.plik}`}
				priority
				height="2000"
				width="1414"
				alt=""
            />
          </div>
		{data[0].zajawka === null ? <LoremIpsumBold /> : <div dangerouslySetInnerHTML={{ __html: data[0].zajawka }} style={{paddingTop:'2rem', fontWeight:'600', fontSize:'1.2rem', lineHeight:'3rem'}} />}
        {data[0].kwalifikacje === null ? <LoremIpsum /> : <div dangerouslySetInnerHTML={{ __html: data[0].kwalifikacje }} style={{paddingTop:'2rem',lineHeight:'1.8rem'}}/>}
          <div className="m-2 md:m-6 drop-shadow-md bg-slate-200">
            <Image
				src={`/o/instruktor/zdjecia/${images[1]?.plik}`}
				priority
				height="2000"
				width="1414"
				alt=""
            />
          </div>
            <div className="m-2 md:mt-12 md:mr-24 md:mb-4 drop-shadow-md bg-slate-200">
              <Image
                src={`/o/instruktor/zdjecia/${images[2]?.plik}`}
				height="2000"
				width="1414"
				priority
				alt=""
              />
            </div>
			{data[0].odsiebie === null ? <LoremIpsum /> : <div dangerouslySetInnerHTML={{ __html: data[0].odsiebie }} style={{paddingTop:'2rem',lineHeight:'1.8rem'}}/>}
    </div>
	<div className="m-auto md:w-3/4">{ actualCourses.length > 0 && <ActualCourses courses={actualCourses} />}</div>
	</>
  );
};

export default InstructorItem; // TODO: image styles
