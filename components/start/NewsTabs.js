import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NewsItem from '../start/NewsItem';
import { CSSTransition } from 'react-transition-group';

const NewsTabs = ({ news }) => {
  const [newsToggleState, setNewsToggleState] = useState(1);
  const toggleNews = index => {
    setNewsToggleState(index);
  };

  return (
    <div className="m-2">
      <section className="news grid grid-cols-2">
        <div className="p-2">
          <h2 className="text-xl ml-4 hidden md:block">Aktualności</h2>
          <div className="news-container md:max-width-[90rem] md:m-auto">
            <div className="tab-news">
              <div className="tab-news-shadow">
                <button
                  className={
                    newsToggleState === 1
                      ? 'tablinks-news active'
                      : 'tablinks-news'
                  }
                  onClick={() => toggleNews(1)}
                >
                  {news[0].tytul}
                </button>
                <button
                  className={
                    newsToggleState === 2
                      ? 'tablinks-news active'
                      : 'tablinks-news'
                  }
                  onClick={() => toggleNews(2)}
                >
                  {news[1].tytul}
                </button>
                <button
                  className={
                    newsToggleState === 3
                      ? 'tablinks-news active'
                      : 'tablinks-news'
                  }
                  onClick={() => toggleNews(3)}
                >
                  {news[2].tytul}
                </button>
                <button
                  className={
                    newsToggleState === 4
                      ? 'tablinks-news active'
                      : 'tablinks-news'
                  }
                  onClick={() => toggleNews(4)}
                >
                  {news[3].tytul}
                </button>
                <button
                  className={
                    newsToggleState === 5
                      ? 'tablinks-news active'
                      : 'tablinks-news'
                  }
                  onClick={() => toggleNews(5)}
                >
                  {news[4].tytul}
                </button>
                <button
                  className={
                    newsToggleState === 6
                      ? 'tablinks-news active'
                      : 'tablinks-news'
                  }
                  onClick={() => toggleNews(6)}
                >
                  {news[5].tytul}
                </button>
              </div>
            </div>
            <div className="m-2 w-full mr-2">
              <CSSTransition
                in={newsToggleState == 1}
                timeout={0}
                classNames="newsTabOne"
                unmountOnExit
              >
                <NewsItem id="newsOne" item={news[0]} />
              </CSSTransition>
              <CSSTransition
                in={newsToggleState == 2}
                timeout={0}
                classNames="newsTabOne"
                unmountOnExit
              >
                <NewsItem id="newsTwo" item={news[1]} />
              </CSSTransition>

              <CSSTransition
                in={newsToggleState == 3}
                timeout={0}
                classNames="newsTabOne"
                unmountOnExit
              >
                <NewsItem id="newsThree" item={news[2]} />
              </CSSTransition>
              <CSSTransition
                in={newsToggleState == 4}
                timeout={0}
                classNames="newsTabOne"
                unmountOnExit
              >
                <NewsItem id="newsFour" item={news[3]} />
              </CSSTransition>
              <CSSTransition
                in={newsToggleState == 5}
                timeout={0}
                classNames="newsTabOne"
                unmountOnExit
              >
                <NewsItem id="newsFive" item={news[4]} />
              </CSSTransition>
              <CSSTransition
                in={newsToggleState == 6}
                timeout={0}
                classNames="newsTabOne"
                unmountOnExit
              >
                <NewsItem id="newsSix" item={news[5]} />
              </CSSTransition>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

NewsTabs.propTypes = {
  news: PropTypes.array.isRequired,
};

export default NewsTabs; //TODO: button: show past news
