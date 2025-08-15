import React from 'react';
import Image from "next/legacy/image";

import {HeaderTitle} from '../base/HeaderTitle';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

import { setDateTermFormat } from '../Helpers';

const TestimonySwiper = ({opinions}) => {

  return (
    <div>
      <HeaderTitle title="Opinie klientów"/>
      <div className="testimony-swiper-container">

          <Swiper
            className="swiper-testimonials"
            // install Swiper modules
			modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            pagination={{ clickable: true }}
            // autoplay={{
            //   delay: 3000,
            //   pauseOnMouseEnter: true,
            //   disableOnInteraction: false,
            // }}
            centeredSlides={true}
            centerInsufficientSlides={true}
            loop={true}
            loopedSlides={4}
            speed={2000}
            breakpoints={{
              300: {
                slidesPerView: 1.5,

                slidesPerGroup: 1,
              },

              600: {
                slidesPerView: 1.5,

                slidesPerGroup: 1,
              },

              800: {
                slidesPerView: 3.5,
                // spaceBetween: 20,

                slidesPerGroup: 3,
              },

              1440: {
                slidesPerView: 3.5,
                slidesPerGroup: 3,
              },
            }}
          >
            {opinions && opinions.map((opinion, index) => (
              <SwiperSlide key={index} className="testimony-card">

                <div className="decoration1">,,</div>
                <div className="decoration2">,,</div>
                <div className="card-body flex flex-direction-column">
                  <span className="testimony-name">
                    <div className="testimonyAvatar hidden">
                      <Image
                        src="/img/CKKS favicon.png"
                        height={50}
                        width={50}
                        className="tAvatar"
						alt=""
                      />
                    </div>
                    <span className="">{opinion.nazwa}</span>
                  </span>
                  <p className="text-md">
                    {opinion.kurs_osoba_uwagi && opinion.kurs_osoba_uwagi.length > 130
                      ? opinion.kurs_osoba_uwagi.substring(-1, 130) + '...'
                      : opinion.kurs_osoba_uwagi || ''}
                  </p>
                  <span className="testimony-details block text-xs absolute bottom-4">
                    {opinion.miejscowosc},{' '}
                    {setDateTermFormat(opinion.data_od, opinion.data_do)} r.
                  </span>
                </div>

              </SwiperSlide>
            ))}
          </Swiper>

      </div>
    </div>
  );
};

export default TestimonySwiper;
