import CourseTabItem from './CourseTabItem';
import Instructor from './kadra/instructor';
import { CSSTransition } from 'react-transition-group';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { polishLettersToLatin } from './Helpers';

const CourseTabs = ({ data, query, absolwents = 0 }) => {

type InstructorType = {
	instruktor_id:number,
	imie_nazwisko:string,
	opis:string
}

  const [toggleState, setToggleState] = useState(1);
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [, setError] = useState('');

  useEffect(() =>  {

	axios.get(`/api/instructor/course/${query.pid}`)
	.then((response) => {
		setInstructors(response.data);
	})
	.catch((err) => {
		setError(err.message);
	});

  }, []);

  const toggleTab = index => {
    setToggleState(index);
  };

  return (
    <div className="componentContainer">
      {/* <div className="container"></div> */}
      <section className="tabs">
        <div className="tabbuttons">
          <button
            className={
              toggleState === 1
                ? 'tablinks tabstyle1 active'
                : 'tablinks tabstyle1'
            }
            onClick={() => toggleTab(1)}
          >
            Dlaczego warto
          </button>
          <button
            className={
              toggleState === 2
                ? 'tablinks tabstyle2 active'
                : 'tablinks tabstyle2'
            }
            onClick={() => toggleTab(2)}
          >
            Program kursu
          </button>
          <button
            className={
              toggleState === 4
                ? 'tablinks tabstyle4 active'
                : 'tablinks tabstyle4'
            }
            onClick={() => toggleTab(4)}
          >
            Wykładowcy
          </button>
          <button
            className={
              toggleState === 3
                ? 'tablinks tabstyle3 active'
                : 'tablinks tabstyle3'
            }
            onClick={() => toggleTab(3)}
          >
            Cena
          </button>
          <button
            className={
              toggleState === 5
                ? 'tablinks tabstyle5 active'
                : 'tablinks tabstyle5'
            }
            onClick={() => toggleTab(5)}
          >
            Ważne informacje
          </button>
          <button
            className={
              toggleState === 7
                ? 'tablinks tabstyle7 active'
                : 'tablinks tabstyle7'
            }
            onClick={() => toggleTab(7)}
          >
            Galeria
          </button>
          {data.inne && (
            <button
              className={
                toggleState === 6
                  ? 'tablinks tabstyle6 active'
                  : 'tablinks tabstyle6'
              }
              onClick={() => toggleTab(6)}
            >
              Inne
            </button>
          )}
        </div>
        <div className="container-tabs">
          <div className="container-tabs2">
            <div className="tab"></div>
            <div
              className="tabcontent-container"
              style={{ height: 'fit-content' }}
            >
              <CSSTransition
                in={toggleState == 1}
                timeout={700}
                classNames="tabOne"
                unmountOnExit
              >
                <>
                  <CourseTabItem
                    id="tabOne"
                    data={data.zajawka || data.tresc || ''}
                    absolwents={absolwents}
                    gallery={false} 
                    pid={[]}
                    courseTitle={data.title}
                  >
                  </CourseTabItem>
                </>
              </CSSTransition>
              <CSSTransition
                in={toggleState == 2}
                timeout={700}
                classNames="tabTwo"
                unmountOnExit
              >
                <CourseTabItem id="tabTwo" data={data.tresc || ''} gallery={false} pid={[]} absolwents={[]} courseTitle={null}>
				</CourseTabItem>
              </CSSTransition>
              <CSSTransition
                in={toggleState == 3}
                timeout={700}
                classNames="tabThree"
                unmountOnExit
              >
                <CourseTabItem id="tabThree" data={`<p><strong>Cena kursu: ${data.cena || 'Brak danych'} zł</strong></p>`} gallery={false} pid={[]} absolwents={[]} courseTitle={null}>
				</CourseTabItem>
              </CSSTransition>
              <CSSTransition
                in={toggleState == 4}
                timeout={700}
                classNames="tabFour"
                unmountOnExit
              >
                <>
                  <CourseTabItem id="tabFour" data={`<h3>Wykładowcy kursu:</h3>`} gallery={false} pid={[]} absolwents={[]} courseTitle={null}>
                    <div className="w-[90rem] max-w-[90rem] grid grid-cols-4 gap-2">
                      {
                        instructors.map((item,key) => (
                            <Instructor
                            item = {item}
							image={`${polishLettersToLatin(item.imie_nazwisko || '')}.jpg`}
							key={key}
                            />
                          ))
						}
                    </div>
                  </CourseTabItem>
                </>
              </CSSTransition>
              <CSSTransition
                in={toggleState == 5}
                timeout={700}
                classNames="tabFive"
                unmountOnExit
              >
                <CourseTabItem id="tabFive" data="<p>Wszystkie ważne informacje dotyczące kursu znajdziesz poniżej:</p>" pid={[]} gallery={false} absolwents={[]} courseTitle={null}>
				</CourseTabItem>
              </CSSTransition>
              <CSSTransition
                in={toggleState == 7}
                timeout={700}
                classNames="tabSeven"
                unmountOnExit
              >
                <CourseTabItem id="tabSeven" gallery={true} pid={query.pid} absolwents={[]} data='' courseTitle={null}>
				</CourseTabItem>
              </CSSTransition>
              {data.inne && (
                <CSSTransition
                  in={toggleState == 6}
                  timeout={700}
                  classNames="tabSix"
                  unmountOnExit
                >
                  <CourseTabItem id="tabSix" gallery={false} pid={[]} absolwents={[]} data={data.inne} courseTitle={null}>
                  </CourseTabItem>
                </CSSTransition>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

CourseTabs.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CourseTabs;
