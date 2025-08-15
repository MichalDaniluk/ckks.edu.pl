import React from 'react';

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.closeForm}></div>;
};

export default Backdrop;
