import axios from 'axios';
import React, { useState, useEffect } from 'react';

import RunningTableItem from './RunningTableItem';

const UpcomingCourses = ({ query, openForm, setKursInfoState }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!query?.pid) {
      return;
    }
    
    axios
      .get(`/api/course/runningcourse/${query.pid}`)
      .then(res => {
        setCourses(res.data || []);
      })
      .catch(error => {
        console.error('UpcomingCourses API error:', error);
        setCourses([]);
      });
  }, [query?.pid]);

  return (
    <div className="componentContainer1">
      <div className="upcomingWrapper1">
        {courses.length > 0 && (
          <p className="pt-12 ml-24 text-2xl">Terminy ruszające na 100%</p>
        )}
        <div className="runningTable1 gid grid-cols-3 mt-2 mb-12 m-6 p-2">
          {courses &&
            courses.map(course => (
              <RunningTableItem
                kurs={course}
                key={course.termin_id}
                openForm={openForm}
                setKursInfoState={setKursInfoState}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingCourses;
