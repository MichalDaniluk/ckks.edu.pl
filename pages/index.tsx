import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '@components/Head';
import { DynamicTopSwiper } from '@components/swipers/DynamicSwiper';
import StartTabs from '@components/start/StartTabs';
import CardsSectionCourse from '@components/cards/CardsSectionCourse';
import NewApplications from '@components/start/NewApplications/NewApplications';
import { NumbersSection } from '@components/Numbers/NumbersSection';
import { CourseElement } from '@interfaces/Course';
//import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

//SwiperCore.use([Navigation, Pagination, Autoplay]);
//import 'swiper/css';
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';

 const Home = () => {

	const [blog, setBlog] = useState([]);
	const [news, setNews] = useState([]);
	const [courses, setCourses] = useState([]);
	const [runningCourses, setRunningCourses] = useState<CourseElement[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		axios
			.get('/api/course/running/4')
			.then(response => {
			setCourses(response.data);
			})
			.catch(err => {
			setError(err.message);
		});

		axios
			.get('/api/blog')
			.then(response => {
				setBlog(response.data ? response.data.slice(0, 3) : []);
			})
			.catch(err => {
				setError(err.message);
		});

		// Get news articles
		axios
			.get('/api/news')
			.then(response => {
				const newsData = response.data || [];
				setNews(newsData.slice(0, 5));
			})
			.catch(err => {
				setError(err.message);
		});

    axios
			.get('/api/course/running/100')
			.then(response => {
				const runningCoursesData = response.data || [];
				setRunningCourses(runningCoursesData);
				
				// If we have fewer than 8 running courses, fetch additional regular courses
				if (runningCoursesData.length < 8) {
					axios.get('/api/course')
						.then(allCoursesResponse => {
							const allCoursesData = allCoursesResponse.data || [];
							
							// Filter out courses that are already in running courses
							const runningCourseIds = runningCoursesData.map((course: any) => course.kurs_id);
							const additionalCourses = allCoursesData.filter((course: any) => 
								!runningCourseIds.includes(course.kurs_id)
							).slice(0, 8 - runningCoursesData.length);
							
							// Combine running courses with additional courses
							const combinedCourses = [...runningCoursesData, ...additionalCourses];
							setRunningCourses(combinedCourses);
						})
						.catch(err => {
							console.error('Error fetching additional courses:', err.message);
						});
				}
			})
			.catch(err => {
				setError(err.message);
		});

	}, []);

  return (
    <>
		<Header
		title="Centrum Kształcenia Kadr Sportowych"
		description="Strona startowa ckks.pl"
		query="/"
		image=""
		keywords="ckks start strona startowa witamy w ckks kursy szkolenia"
		/>

		<DynamicTopSwiper blog={blog} news={news} courses={courses} error={error}/>
		<StartTabs />
		<NumbersSection/>
		<NewApplications />
		<CardsSectionCourse list={runningCourses || []} title=""/>

    </>
  );
};

export default Home;
