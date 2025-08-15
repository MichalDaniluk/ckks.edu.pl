import React, { useState } from 'react';

import NewsItem from '@components/start/NewsItem';
import { CSSTransition } from 'react-transition-group';

const NewsTabsNew = ({news}) => {

  const [newsToggleState, setNewsToggleState] = useState(1);
  const toggleNews = index => {
    setNewsToggleState(index);
  };

  return (
    news && news.length > 0 && <>
		<h2 className="news__main-title">Najnowsze wieści z naszej placówki</h2>
        <div className="news">
          <div className="news__title">
            <h2 className="">{news[newsToggleState-1]?.title || news[newsToggleState-1]?.tytul}</h2>
          </div>

          <div className="news__tabs">
                {news[0] && <button
                  className={
                    newsToggleState === 1
                      ? 'news__tab--active'
                      : 'news__tab'
                  }
                  onClick={() => toggleNews(1)}
                >
                  <a href={`news/${news[0]?.slug || news[0]?.link}`}>{news[0]?.title || news[0]?.tytul}</a>
                </button>}
                {news[1] && <button
                  className={
                    newsToggleState === 2
                      ? 'news__tab--active'
                      : 'news__tab'
                  }
                  onClick={() => toggleNews(2)}
                >
                  <a href={`news/${news[1]?.slug || news[1]?.link}`}>{news[1]?.title || news[1]?.tytul}</a>
                </button>}
                {news[2] && <button
                  className={
                    newsToggleState === 3
                      ? 'news__tab--active'
                      : 'news__tab'
                  }
                  onClick={() => toggleNews(3)}
                >
                  <a href={`news/${news[2]?.slug || news[2]?.link}`}>{news[2]?.title || news[2]?.tytul}</a>
                </button>}
                {news[3] && <button
                  className={
                    newsToggleState === 4
                      ? 'news__tab--active'
                      : 'news__tab'
                  }
                  onClick={() => toggleNews(4)}
                >
                  <a href={`news/${news[3]?.slug || news[3]?.link}`}>{news[3]?.title || news[3]?.tytul}</a>
                </button>}
                {news[4] && <button
                  className={
                    newsToggleState === 5
                      ? 'news__tab--active'
                      : 'news__tab'
                  }
                  onClick={() => toggleNews(5)}
                >
                  <a href={`news/${news[4]?.slug || news[4]?.link}`}>{news[4]?.title || news[4]?.tytul}</a>
                </button>}
                {news[5] && <button
                  className={
                    newsToggleState === 6
                      ? 'news__tab--active'
                      : 'news__tab'
                  }
                  onClick={() => toggleNews(6)}
                >
                  <a href={`news/${news[5]?.slug || news[5]?.link}`}>{news[5]?.title || news[5]?.tytul}</a>
                </button>}
              </div>

              {news[0] && <CSSTransition
                in={newsToggleState == 1}
                timeout={0}
                classNames="news__content-item"
                unmountOnExit
              >
                <NewsItem id="newsOne" item={news[0]} />
              </CSSTransition>}
              {news[1] && <CSSTransition
                in={newsToggleState == 2}
                timeout={0}
                classNames="news__content-item"
                unmountOnExit
              >
                <NewsItem id="newsTwo" item={news[1]} />
              </CSSTransition>}

              {news[2] && <CSSTransition
                in={newsToggleState == 3}
                timeout={0}
                classNames="news__content-item"
                unmountOnExit
              >
                <NewsItem id="newsThree" item={news[2]} />
              </CSSTransition>}
              {news[3] && <CSSTransition
                in={newsToggleState == 4}
                timeout={0}
                classNames="news__content-item"
                unmountOnExit
              >
                <NewsItem id="newsFour" item={news[3]} />
              </CSSTransition>}
              {news[4] && <CSSTransition
                in={newsToggleState == 5}
                timeout={0}
                classNames="news__content-item"
                unmountOnExit
              >
                <NewsItem id="newsFive" item={news[4]} />
              </CSSTransition>}
              {news[5] && <CSSTransition
                in={newsToggleState == 6}
                timeout={0}
                classNames="news__content-item"
                unmountOnExit
              >
                <NewsItem id="newsSix" item={news[5]} />
              </CSSTransition>}
            </div>
    </>
  );
};

export default NewsTabsNew;
