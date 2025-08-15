import StartTabsItem from './StartTabsItem';
import { CSSTransition } from 'react-transition-group';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StartTabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [startTabs, setStartTabs] = useState([]);
  const [error, setError] = useState('');
  const [tabHeight, setTabHeight] = useState(100);

  useEffect(() => {
    axios
      .get('/api/start/tabs?_limit=6')
      .then(response => {
        setStartTabs(response.data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const toggleTab = index => {
    setToggleState(index);
  };

  function calcHeight(el) {
    setTabHeight(el.offsetHeight);
  }

  return (
    <>
      {error && <div className="error">{{ error }}</div>}
      {startTabs.length > 0 && (
        <div className="componentContainer">
          <div className="container w-3/4 m-auto">
            <h2 className="">Centrum Kształcenia Kadr Sportowych</h2>
          </div>
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
                Kim jesteśmy
              </button>
              <button
                className={
                  toggleState === 2
                    ? 'tablinks tabstyle2 active'
                    : 'tablinks tabstyle2'
                }
                onClick={() => toggleTab(2)}
              >
                Dlaczego My
              </button>
              <button
                className={
                  toggleState === 3
                    ? 'tablinks tabstyle3 active'
                    : 'tablinks tabstyle3'
                }
                onClick={() => toggleTab(3)}
              >
                Oferta
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
                  toggleState === 5
                    ? 'tablinks tabstyle5 active'
                    : 'tablinks tabstyle5'
                }
                onClick={() => toggleTab(5)}
              >
                Uprawnienia
              </button>
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
                    onEnter={calcHeight}
                  >
                    <StartTabsItem
                      id="tabOne"
                      body={startTabs[23].body}
                      href=""
                    />
                  </CSSTransition>
                  <CSSTransition
                    in={toggleState == 2}
                    timeout={700}
                    classNames="tabTwo"
                    unmountOnExit
                    onEnter={calcHeight}
                  >
                    <StartTabsItem
                      id="tabTwo"
                      body={startTabs[24].body}
                      href=""
                    />
                  </CSSTransition>
                  <CSSTransition
                    in={toggleState == 3}
                    timeout={700}
                    classNames="tabThree"
                    unmountOnExit
                    onEnter={calcHeight}
                  >
                    <StartTabsItem
                      id="tabThree"
                      body={startTabs[25].body}
                      href=""
                    />
                  </CSSTransition>
                  <CSSTransition
                    in={toggleState == 4}
                    timeout={700}
                    classNames="tabFour"
                    unmountOnExit
                    onEnter={calcHeight}
                  >
                    <StartTabsItem
                      id="tabFour"
                      body={startTabs[26].body}
                      href="https://ckks.pl/kadra"
                    />
                  </CSSTransition>
                  <CSSTransition
                    in={toggleState == 5}
                    timeout={700}
                    classNames="tabFive"
                    unmountOnExit
                    onEnter={calcHeight}
                  >
                    <StartTabsItem
                      id="tabFive"
                      body={startTabs[27].body}
                      href=""
                    />
                  </CSSTransition>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default StartTabs;
