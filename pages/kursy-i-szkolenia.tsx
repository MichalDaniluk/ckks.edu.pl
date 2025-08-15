import React, { useEffect, useState } from 'react';
import { useQueryState } from 'next-usequerystate';

import PageTop from '@components/PageTop';
import Header from '@components/Head';
import { FilteredCourses } from '@components/FilteredCourses';
import {courseType, SearchCourse} from '@interfaces/Course';

export async function getServerSideProps() {
	const apiUrl = process.env.CKKS_API_URL || 'http://localhost:3001';

	const resAll = await fetch(`${apiUrl}/api/course/all`);
	const all = await resAll.json();

  const resSport = await fetch(`${apiUrl}/api/course/sport`);
  const sport = await resSport.json();

  const resOnline = await fetch(`${apiUrl}/api/course/online`);
  const online = await resOnline.json();

  const resInstructor = await fetch(`${apiUrl}/api/course/instructor`);
  const instructor = await resInstructor.json();

  const resOswiata = await fetch(`${apiUrl}/api/course/education`);
  const oswiata = await resOswiata.json();

  const resFizjo = await fetch(`${apiUrl}/api/course/fizjo`);
  const fizjo = await resFizjo.json();

  const resresSportTrainer = await fetch(`${apiUrl}/api/course/trainer`);
  const trainer = await resresSportTrainer.json();

  if (!all || !sport || !online || !instructor || !oswiata || !fizjo || !trainer) {
    return {
      notFound: true,
    };
  }

  return {
    props: { all, sport, online, instructor, fizjo, oswiata, trainer },
  };
}


const CoursesAndTrainings = ({
	all,
	online,
	instructor,
	fizjo,
	oswiata,
	sport,
	trainer
}) => {
  const [searchQuery, setSearchQuery] = useQueryState('search');

  const [filteredCourses, setFilteredCourses] = useState([] as Array<SearchCourse>);
  const [inputValue, setInputValue] = useState('');

  const setFilerFromSearchQuery = (search:string) => {
    switch (search) {
		case courseType.FIZJOTERAPIA:
			setFilteredCourses(fizjo);
			break;
		case courseType.TRENERSKIE:
			setFilteredCourses(trainer);
			break;
		case courseType.OSWIATA:
			setFilteredCourses(oswiata);
			break;
		case courseType.ONLINE:
			setFilteredCourses(online);
			break;
		case courseType.INSTRUKTORSKIE:
			setFilteredCourses(instructor);
			break;
		case courseType.SPORT:
			setFilteredCourses(sport);
			break;
		case courseType.ALL:
			setFilteredCourses(all);
			break;
		case courseType.FIND: {
			// Local search since API returns 403
			const searchResults = all.filter(course => 
				course.specjalizacja?.toLowerCase().includes(inputValue.toLowerCase()) ||
				course.kategoria?.toLowerCase().includes(inputValue.toLowerCase()) ||
				course.nazwa?.toLowerCase().includes(inputValue.toLowerCase()) ||
				course.zajawka?.toLowerCase().includes(inputValue.toLowerCase())
			);
			setFilteredCourses(searchResults);
			break;
		}
		default:
			setFilteredCourses(all);
			break;
    }
  };

//useEffect(() => {
//	const allCourses = [...sport, ...instructor, ...fizjo, ...oswiata, ...trainer]
//	setAllCoursesList(allCourses)
//	setSportList(sport)
//	setTrainerList(trainer)
//	setFizjoList(fizjo)
//	setOswiataList(oswiata)
//	setOnlineList(online)
//	setInstructorList(instructor)
//	setFilerFromSearchQuery(searchQuery)
//	setFilter(true)
//},[])

useEffect(() => {
	setFilerFromSearchQuery(searchQuery || '');
}, [searchQuery]);

const clickHandler = (event: React.MouseEvent) => {
	event.preventDefault();
	setFilerFromSearchQuery('find');

	//szukanie po nazwie kursu
};

  return (
    <>
      <Header
        title="Kursy i szkolenia Centrum Kształcenia Kadr Sportowych"
        description="kursy i szkolenia ckks"
        query="kursy-i-szkolenia"
        image="/img/header/kursy_szkolenia.jpg"
		keywords="kursy szkolenia w ckks"
      />
	<PageTop title="Kursy i szkolenia Centrum Kształcenia Kadr Sportowych" bgImage="/img/header/kursy_szkolenia.jpg" />
      <div className="container">
      </div>

      <div className="filterButtonContainer" style={{ maxWidth: '120rem',backgroundColor: '#eee',borderColor: '#333'}}>
        <div
          onClick={() => {
            setSearchQuery('');
            //  setSearchQuery(null, { scroll: false, shallow: true })
          }}
          className={
            searchQuery === 'all' ? 'filterButton active' : 'filterButton'
          }
        >
          Wszystkie
        </div>
        <div
          onClick={() => {
            setSearchQuery('trenerskie');
            //setSearchQuery('trenerskie', { scroll: false, shallow: true })
          }}
          className={
            searchQuery == 'trenerskie' ? 'filterButton active' : 'filterButton'
          }
        >
          Trenerskie
        </div>
        <div
          onClick={() => {
            setSearchQuery('instruktorskie');
			//setFilteredCourses(trainerList)
            //  setSearchQuery('instruktorskie', { scroll: false, shallow: true })
          }}
          className={
            searchQuery == 'instruktorskie'
              ? 'filterButton active'
              : 'filterButton'
          }
        >
          Instruktorskie
        </div>
        <div
          onClick={() => {
            setSearchQuery('fizjo');
            //  setSearchQuery('fizjoterapia', { scroll: false, shallow: true })
          }}
          className={
            searchQuery == 'fizjo'
              ? 'filterButton active'
              : 'filterButton'
          }
        >
          Fizjoterapia
        </div>
        <div
          onClick={() => {
			setSearchQuery('sport');
			//setFilteredCourses(sportList)
            //setSearchQuery('sport', { scroll: false, shallow: true })
          }}
          className={
            searchQuery == 'sport'
              ? 'filterButton active'
              : 'filterButton'
          }
        >
          Sport
        </div>
        <div
          onClick={() => {
            setSearchQuery('online');

            //setSearchQuery('on-line', { scroll: false, shallow: true })
          }}
          className={
            searchQuery == 'online'
              ? 'filterButton active'
              : 'filterButton'
          }
        >
          On-Line
        </div>
        <div
          onClick={() => {
            setSearchQuery('oswiata');
            //  setSearchQuery('oświata', { scroll: false, shallow: true })
          }}
          className={
            searchQuery == 'oswiata'
              ? 'filterButton active'
              : 'filterButton'
          }
        >
          Oświata
        </div>

          <input 
            onChange={e => setInputValue(e.target.value)} 
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setFilerFromSearchQuery('find');
              }
            }}
            style={{borderColor:'#aaa'}}
          />
          <button className="see-more-btn"onClick={ clickHandler }>Szukaj</button>
      </div>
	{filteredCourses && <FilteredCourses filteredCourses={filteredCourses} />}
	{!filteredCourses && <div className="section-courses">Brak danych</div>}
    </>
  );
};


export default CoursesAndTrainings;
