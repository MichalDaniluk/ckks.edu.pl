import React from 'react';
import { setDateTermFormat } from '../Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

import { setPriceFormat, setFirstPriceFormat, getDateNow } from '../Helpers';

const CourseScheduleItem = ({ course, buttonHandler, buttonHandlerMap }) => {
  return (
    <>
      {course !== undefined && (
        <div className="courses-card">
          <h5>
            {course.miejscowosc}{' '}
            {setDateTermFormat(course.data_od, course.data_do)}
          </h5>
          <ul>
            <li>
              <div className="flex gap-6">
                <div>
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="courses-card-icon w-12"
                  />
                </div>
                <div>
                  {course.imie_nazwisko !== 'nie wybrano' && (
                    <a
                      className="link-dark"
                      href={`/instruktor/${course.instruktor_id}`}
                    >
                      {course.imie_nazwisko}
                    </a>
                  )}
                  {course.imie_nazwisko == 'nie wybrano' && 'Nie wskazano'}
                </div>
              </div>
            </li>
            <li>
              <div className="flex gap-6">
                <div>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="courses-card-icon w-12"
                  />
                </div>
                <div>
                  {course.miejsce === 'Nie wybrany' ? (
                    'Nie określono'
                  ) : (
                    <span
                      className="link-dark"
                      onClick={() =>
                        buttonHandlerMap(course.miejsce_szkolenia_id)
                      }
                    >
                      {course.miejsce}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p dangerouslySetInnerHTML={{ __html: course.uwagi }} />
                {course.status === 'Rusza' && (
                  <p className="bold green">Kurs potwierdzony! Rusza na 100%</p>
                )}
                {course.status === 'Trwa' && <p className="bold green">TRWA</p>}
                {course.brakmiejsc === 'T' && (
                  <p className="bold green">Brak miejsc</p>
                )}
              </div>
            </li>
          </ul>
          <p className="course-info"></p>
          <p className="price-tag bold">
            Cena od:&nbsp;
            {course.firstprice === 'N' && setPriceFormat(course.cena)}
            {course.firstprice === 'T' &&
              setFirstPriceFormat(getDateNow(), course.data_od, course.cena)}
          </p>
          <button
            className="purchase-btn"
            onClick={() => {
              buttonHandler(course);
            }}
          >
            {course.brakmiejsc === 'T' ? 'Lista rezerwowa' : 'Zapisz się'}
          </button>
        </div>
      )}
      {course.miejscowosc === '' && <h2>Brak terminów</h2>}
    </>
  );
};

export default CourseScheduleItem;
