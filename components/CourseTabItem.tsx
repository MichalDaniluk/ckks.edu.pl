import React from 'react';
import CourseGallery from '@components/gallery/CourseGallery';

const CourseTabItem = ({ id, data, children, absolwents, gallery, pid, courseTitle = null }: any) => {
  if (gallery) {
    return <CourseGallery pid={Array.isArray(pid) ? pid[0] : pid} />;
  } else {
    return (
      <div className="courseStaff">
        {id === 'tabOne' && courseTitle && (
          <div className="course-title-section">
            <h1 className="text-2xl font-bold mb-4 mt-2">{courseTitle}</h1>
          </div>
        )}
        <div className="mx-4 mt-4" dangerouslySetInnerHTML={{ __html: data }} />
        {children && <div className="courseStaffCards">{children}</div>}
        {id === 'tabFive' && (
          <a
            className="see-more-btn"
            href="/wazne-informacje-kwestionariusz-osobowy"
          >
            Ważne informacje
          </a>
        )}
        {id === 'tabOne' && <p>Absolwentów: {absolwents.absolwents}</p>}
      </div>
    );
  }
};

export default CourseTabItem;
