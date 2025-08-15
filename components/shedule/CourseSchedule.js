import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Scrollbar } from 'swiper';

import CourseScheduleItem from './CourseScheduleItem';

const CourseSchedule = ({
  city,
  week,
  weekend,
  openForm,
  openFormMap,
  setKursInfoState,
  courseName,
  coursePrice,
  courseFirstPrice,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [cityState, setCityState] = useState('Warszawa');

  // Set default city when city data loads
  useEffect(() => {
    if (city && city.length > 0 && cityState === 'Warszawa') {
      setCityState(city[0].miejscowosc);
    }
  }, [city]);

  const buttonHandler = id => {
    console.log(id);
    openForm();
    setKursInfoState(id);
  };

  const buttonHandlerMap = id => {
    openFormMap(id);
    setKursInfoState(id);
  };

  return (
    <>
      <div className="container w-3/4 m-auto">
        <h2 className="ml-4 terms">Terminarz w poszczególnych miastach:</h2>
      </div>
      <div className="course-table-header">
        <div className="course-city-title">
          <h3 style={{ fontSize: '1.5rem' }}>{courseName}</h3>
          <h3>
            Terminy dla miasta <span>{}</span>
          </h3>
        </div>
        <div className="course-type-title">
          <h4>Terminy Weekendowe:</h4>
          <h4>Terminy Tygodniowe:</h4>
        </div>
      </div>
      <div className="schedule-wrapper">
        <Swiper
          className="city-tabs"
          modules={[Thumbs, Scrollbar]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress // direction: "vertical",
          slidesPerView={15}
          spaceBetween={0}
          mousewheel={{ sensitivity: 2 }}
          allowTouchMove={true}
          scrollbar={{ draggable: true }}
          // scrollbar: {
          //   el: ".city-tabs-scrollbar",
          //   clickable: true,
          // },
          edgeSwipeDetection={true}
          breakpoints={{
            100: {
              direction: 'horizontal',
              slidesPerView: 2.4,
              // slidesPerGroup: 2,
              speed: 100,
              freeMode: {
                enabled: true,
                sticky: false,
                momentum: true,
                momentumRatio: 0.5,
              },
            },

            600: {
              direction: 'vertical',
              // slidesPerView: 15,
              // slidesPerGroup: 5,
              // freeMode: {
              //   enabled: true,
              //   sticky: false,
              //   momentum: false,
              //   momentumRatio: 0.5,
              // },
            },
          }}
        >
          {city.map((cit, key) => (
            <SwiperSlide
              className="city-tabs-slide"
              key={key}
              onClick={() => setCityState(cit.miejscowosc)}
            >
              {cit.miejscowosc}
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          className="city-schedule"
          modules={[Thumbs]}
          spaceBetween={0}
          slidesPerView={1}
          allowTouchMove={false}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
          // scrollbar={{ draggable: true }}
          speed={2000}
          // thumbs={
          //   swiper: cityTabs,
          // autoScrollOffset: "1",
        >
          <SwiperSlide className="city-schedule-slide">
            <div className="courses-wrapper">
              <div className="weekend-courses">
                <h4>Terminy Weekendowe:</h4>
                {(!weekend || weekend.length === 0) && <h2>Brak terminów</h2>}
                {weekend && weekend
                  .filter(kurs => kurs.miejscowosc == cityState)
                  .map(course => (
                    <CourseScheduleItem
                      key={course.termin_id || course.szkolenie_id}
                      course={{...course, cena: coursePrice, firstprice: courseFirstPrice || 'N'}}
                      openForm={openForm}
                      openFormMap={openFormMap}
                      setKursInfoState={setKursInfoState}
                      buttonHandler={buttonHandler}
                      buttonHandlerMap={buttonHandlerMap}
                    />
                  ))}
              </div>
              <div className="week-courses">
                <h4>Terminy Tygodniowe:</h4>
                {(!week || week.length === 0) && <h2>Brak terminów</h2>}
                {week && week
                  .filter(kurs => kurs.miejscowosc == cityState)
                  .map((course, key) => (
                    <CourseScheduleItem
                      key={key}
                      course={{...course, cena: coursePrice, firstprice: courseFirstPrice || 'N'}}
                      openForm={openForm}
                      openFormMap={openFormMap}
                      setKursInfoState={setKursInfoState}
                      buttonHandler={buttonHandler}
                      buttonHandlerMap={buttonHandlerMap}
                    />
                  ))}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default CourseSchedule;
//TODO: Sformatowac cene kursu
//TODO: sformatowac date kursu i przesunac na prawo
