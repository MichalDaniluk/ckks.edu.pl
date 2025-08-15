import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Course = {
  nazwa: string;
  zajawka: string;
  href: string;
  obrazek: string;
}

type BlogPost = {
  nazwa?: string;
  zajawka?: string;
  href?: string;
  obrazek?: string;
  title?: string;
  excerpt?: string;
  slug?: string;
  image?: string;
}

type NewsItem = {
  tytul?: string;
  opis?: string;
  link?: string;
  obrazek?: string;
  title?: string;
  excerpt?: string;
  slug?: string;
  image?: string;
}

type TopSwiperProps = {
  courses: Course[];
  blog: BlogPost[];
  news: NewsItem[];
  error?: string;
}

export const TopSwiper = ({ courses, blog, news, error }: TopSwiperProps) => {
  const getImageUrl = (imagePath: string, type: 'course' | 'blog' | 'news') => {
    if (!imagePath) return getDefaultImage(type);
    
    // Remove domain if present and ensure proper path formatting
    let processedPath = imagePath;
    if (processedPath.startsWith('http')) {
      processedPath = processedPath.replace(/^https?:\/\/[^/]+/, '');
    }
    
    // Ensure path starts with /
    if (!processedPath.startsWith('/')) {
      processedPath = '/' + processedPath;
    }
    
    // Handle different image types for both development and production
    switch (type) {
      case 'course':
        return processedPath.startsWith('/img/') ? processedPath : `/img/${processedPath.replace(/^\//, '')}`;
      case 'blog':
        return processedPath.startsWith('/blog/files/') ? processedPath : `/blog/files/${processedPath.replace(/^\//, '')}`;
      case 'news':
        return processedPath.startsWith('/galeria/') ? processedPath : `/galeria/${processedPath.replace(/^\//, '')}`;
      default:
        return processedPath;
    }
  };

  const getDefaultImage = (type: 'course' | 'blog' | 'news') => {
    switch (type) {
      case 'course':
        return '/img/default-course.jpg';
      case 'blog':
        return '/img/default-blog.jpg';
      case 'news':
        return '/img/default-news.jpg';
      default:
        return '/img/default-placeholder.jpg';
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLElement>, type: 'course' | 'blog' | 'news') => {
    const target = e.target as HTMLElement;
    (target as HTMLDivElement).style.backgroundImage = `url(${getDefaultImage(type)})`;
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <Swiper
        className="top-swiper"
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        //  spaceBetween={50}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={false}
        // autoplay={{
        //   delay: 300000,
        //   pauseOnMouseEnter: true,
        //   disableOnInteraction: false,
        // }}
        speed={1000}
      >
        {courses.length > 0 &&
          courses.map((item, index) => (
            <SwiperSlide
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${getImageUrl(item.obrazek, 'course')})`,
              }}
              key={`course-${index}`}
              onError={(e) => handleImageError(e, 'course')}
            >
              <div className="swiper-courses">
                <div className="swiper-courses__category">Kursy</div>
                <div className="swiper-courses__title">{item.nazwa}</div>
                <div className="swiper-courses__description">
                  <div dangerouslySetInnerHTML={{ __html: item.zajawka }} />
                </div>
                <div className="swiper-courses__button">
                  <a href={`/kurs/${item.href}`}>
                    <button className="see-more-btn">Więcej</button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}

        {blog.length > 0 &&
          blog.map((item, index) => (
            <SwiperSlide
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${getImageUrl(item.image || item.obrazek || '', 'blog')})`,
              }}
              key={`blog-${index}`}
              onError={(e) => handleImageError(e, 'blog')}
            >
              <div className="swiper-courses">
                <div className="swiper-courses__category">Blog</div>
                <div className="swiper-courses__title">{item.title || item.nazwa}</div>
                <div className="swiper-courses__description">
                  <div dangerouslySetInnerHTML={{ __html: item.excerpt || item.zajawka || '' }} />
                </div>
                <div className="swiper-courses__button">
                  <a href={`/blog/${item.slug || item.href}`}>
                    <button className="see-more-btn">Więcej</button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}

        {news.length > 0 &&
          news.map((item, index) => (
            <SwiperSlide
              style={{
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${getImageUrl(item.image || item.obrazek || '', 'news')})`,
              }}
              key={`news-${index}`}
              onError={(e) => handleImageError(e, 'news')}
            >
              <div className="swiper-courses">
                <div className="swiper-courses__category">Aktualności</div>
                <div className="swiper-courses__title">{item.title || item.tytul}</div>
                <div className="swiper-courses__description">
                  <div dangerouslySetInnerHTML={{ __html: item.excerpt || item.opis || '' }} />
                </div>
                <div className="swiper-courses__button">
                  <a href={`/news/${item.slug || item.link}`}>
                    <button className="see-more-btn">Więcej</button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default TopSwiper;