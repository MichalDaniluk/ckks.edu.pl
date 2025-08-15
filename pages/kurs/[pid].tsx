//#region Imports
import Link from 'next/link';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Header from '@components/Head';
import PageTop from '@components/PageTop';
import CourseTabs from '@components/CourseTabs';
import UpcomingCourses from '@components/UpcomingCourses';
import Backdrop from '@components/Backdrop';
import Form from '@components/Form';
import Map from '@components/Map';
import CourseSchedule from '@components/shedule/CourseSchedule';
import { getFileNameFromPath } from '@components/Helpers';
//#endregion

export async function getServerSideProps({ query, req }) {
  try {
    // Get base URL for API calls
    const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http');
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    // First get course data by href to obtain course ID
    const courseResponse = await fetch(`${baseUrl}/api/course/kurs/${query.pid}`);
    
    if (!courseResponse.ok) {
      console.error(`Course API error: ${courseResponse.status}`);
      return { notFound: true };
    }
    
    const data = await courseResponse.json();

    if (!data || !data.kurs_id) {
      console.error('Course data missing or invalid:', data);
      return { notFound: true };
    }

    // Now use the course ID for other API calls with error handling
    const courseId = data.kurs_id;

    const [lastApli, courseCity, weekendSchedule, weekSchedule, absolwents] = await Promise.allSettled([
      fetch(`${baseUrl}/api/course/lastapplictions/${courseId}`).then(r => r.ok ? r.json() : []),
      fetch(`${baseUrl}/api/course/terms/cites/${courseId}`).then(r => r.ok ? r.json() : []),
      fetch(`${baseUrl}/api/course/terms/weekends/${courseId}`).then(r => r.ok ? r.json() : []),
      fetch(`${baseUrl}/api/course/terms/week/${courseId}`).then(r => r.ok ? r.json() : []),
      fetch(`${baseUrl}/api/course/absolwent/${courseId}`).then(r => r.ok ? r.json() : [])
    ]);

    return {
      props: {
        data,
        lastApli: lastApli.status === 'fulfilled' ? (lastApli.value || []) : [],
        courseCity: courseCity.status === 'fulfilled' ? (courseCity.value || []) : [],
        weekSchedule: weekSchedule.status === 'fulfilled' ? (weekSchedule.value || []) : [],
        weekendSchedule: weekendSchedule.status === 'fulfilled' ? (weekendSchedule.value || []) : [],
        query,
        absolwents: absolwents.status === 'fulfilled' ? (absolwents.value || []) : []
      },
    };
  } catch (error) {
    console.error('Course page error:', error);
    return { notFound: true };
  }
}

const CourseItem = ({
  data,
  weekSchedule,
  courseCity,
  weekendSchedule,
  query,
  absolwents
}) => {

  const [kursInfoState, setKursInfoState] = useState('');
  const [placeId, setPlaceId] = useState(0);

  const [modalIsOpen, setModalOpen] = useState(false);
  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const [modalIsOpenMap, setModalOpenMap] = useState(false);
  const openModalHandlerMap = (id) => {
    setModalOpenMap(true);
	setPlaceId(id);
  };

  const closeModalHandlerMap = () => {
    setModalOpenMap(false);
  };

  const img = data.obrazek_trzy ? '/o/f/'+getFileNameFromPath(data.obrazek_trzy) : '/default-course-image.jpg';
  return (
    <>
      <Header
        title={data.title || 'Kurs CKKS'}
        description={`kursy kurs ckks.pl ${data.title || ''}`}
        query={`kurs/${query.pid}`}
        image={img}
		keywords={`szkolenie kurs ${data.title || ''}`}
      />
      <PageTop title={data.title || 'Kurs'} bgImage={img} hideTitle={true} />
      <UpcomingCourses
		query={query}
		openForm={openModalHandler}
		setKursInfoState={setKursInfoState}
      />
	<div className="allCourses allCoursesBtn md:w-1/4 m-auto">
        <Link href={`/kurs/${query.pid}/#all`} >
          Zobacz <span>wszystkie</span> terminy
		</Link>
      </div>

      <CourseTabs data={data} absolwents={absolwents} query={query} />

	<div id="all">
        <CourseSchedule
			week={weekSchedule || []}
			city={courseCity || []}
			weekend={weekendSchedule || []}
			openForm={openModalHandler}
			openFormMap={openModalHandlerMap}
			setKursInfoState={setKursInfoState}
			courseName={data.nazwa || data.title || 'Kurs'}
			coursePrice={data.cena}
			courseFirstPrice={data.first_price}
        />
      </div>
		<CSSTransition
			in={modalIsOpen}
			timeout={700}
			classNames="showFormField"
			unmountOnExit>
        <Backdrop closeForm={closeModalHandler} closeFormMap={closeModalHandler} />
      </CSSTransition>

		<CSSTransition
			in={modalIsOpen}
			timeout={700}
			classNames="showFormField"
			unmountOnExit>
        <Form kursInfoState={kursInfoState} closeForm={closeModalHandler} />
      </CSSTransition>
		<CSSTransition
			in={modalIsOpenMap}
			timeout={700}
			classNames="showFormField"
			unmountOnExit>
        <Backdrop closeForm={closeModalHandlerMap} closeFormMap={closeModalHandlerMap} />
      </CSSTransition>
		<CSSTransition
			in={modalIsOpenMap}
			timeout={700}
			classNames="showFormField"
			unmountOnExit>
        <Map placeId={placeId}/>
      </CSSTransition>
      {/*<TestimonySwiper opinions={opinions} />*/}
    </>
  );
};

export default CourseItem;
