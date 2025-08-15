import React from 'react';
import PropTypes from 'prop-types';
import { polishLettersToLatin } from '../Helpers';

const NewsItem = props => {
  const item = props.item || {};
  const { id, obrazek_nowa, link, opis, image, slug, content, excerpt, tytul, body } = item;
  
  // Use API fields with proper fallback
  const imageUrl = image || obrazek_nowa;
  const linkUrl = slug || link;
  const description = excerpt || content || body || opis;
  
  return (
    <div className="news__content-item">
      <div className="news__content-item-wrapper" style={{ overflow: 'hidden', marginBottom: '15px' }}>
        <div
          className="news__content-item-image"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl.startsWith('/') ? imageUrl : `/galeria/${imageUrl}`})` : 'none',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '200px',
            width: '40%',
            float: 'left',
            marginRight: '20px'
          }}
        />
        <div 
          className="news__content-item-text" 
          style={{ 
            overflow: 'hidden',
            wordWrap: 'break-word',
            display: 'block',
            maxHeight: '200px',
            height: '100%'
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: description || '' }} />
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
      <a
        className="news__more-button"
        href={`/news/${polishLettersToLatin(linkUrl || '')}`}
        style={{ 
          display: 'block', 
          clear: 'both',
          marginTop: '10px',
          textAlign: 'left'
        }}
      >
        CZYTAJ DALEJ
      </a>
    </div>
  );
};

export default NewsItem;

NewsItem.propTypes = {
  item: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

//TODO: Ostylowac komponent wyswietlajacy aktualnosc bo za duzo jest marginow np. na znacznikow P
