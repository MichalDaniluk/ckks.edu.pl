import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../components/Head';

export async function getServerSideProps({ query }) {
  const res = await fetch(`https://api.ckks.pl/api/funding/${query.pid}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, query },
  };
}

const FundItem = ({ data, query }) => {
  return (
    <>
      <Header
        title={data.title}
        description={data.title}
        query={`szkolenia-dofinansowane/${query.pid}`}
        image={data.obrazek}
		keywords="szkolenia dofinansowane w ckks"
      />
      <div className="course-header">
        <div
          style={{
            backgroundImage: 'url(`https://ckks.pl/blog/files/${data.obrazek}`)',
          }}
          // layout="fill"
          className="course-header-bg"
        ></div>
      </div>

        <div className=" md:w-[90rem] md:m-auto m-4HELP">
			<h1 className="text-xl">{data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>

    </>
  );
};

FundItem.propTypes = {
  data: PropTypes.object.isRequired,
  //  tytul: PropTypes.string.isRequired,
};

export default FundItem;
