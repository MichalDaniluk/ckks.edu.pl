import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/legacy/image';

import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
const BlogSwiper = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/bloglimit/8')
      .then(response => {
        setBlog(response.data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const blogArr = blog.slice(0, 5);
  return (
    <>
      {error && <div className="error">{{ error }}</div>}
      {blog.length > 0 && (
        <div className="blog overflow-hidden">
          <div className="container"></div>
          <div className="blog-swiper-container">
            <Swiper
              className="blog-top"
              // install Swiper modules
              modules={[Thumbs, Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            >
              {blogArr.map((art, index) => (
                <SwiperSlide
                  key={index}
                  className="swiper-slide"
                  style={{
                    backgroundImage: art.obrazek ? `url(/blog/files/${art.obrazek})` : 'url(/img/default-blog.jpg)',
                  }}
                >
                  <h3>
                    <a href={`/blog/${art.href}`}>{art.nazwa}</a>
                  </h3>
                  <p>{art.zajawka}</p>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              className="blog-thumbs"
              modules={[Navigation, Pagination, Thumbs]}
              navigation
              pagination={{ clickable: true }}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              slidesPerView={4.5}
              loop
              freeMode
              spaceBetween={40}
              breakpoints={{
                300: {
                  slidesPerView: 1.2,
                },

                600: {
                  slidesPerView: 1.5,
                },

                800: {
                  slidesPerView: 3,
                },

                1440: {
                  slidesPerView: 5,
                },
              }}
            >
              {blogArr.map((art, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    backgroundImage: art.obrazek ? `url(/blog/files/${art.obrazek})` : 'url(/img/default-blog.jpg)',
                  }}
                >
                  <h4>
                    <a href={`/blog/${art.href}`}>{art.nazwa}</a>
                  </h4>
                  <Image
                    className="blog-slide-bg"
                    src={art.obrazek ? `/blog/files/${art.obrazek}` : '/img/default-blog.jpg'}
                    priority
                    width="100"
                    height="100"
                  ></Image>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogSwiper;
