import React from 'react';

interface messageObject {
	message:string;
}

function ErrorMessage({message}:messageObject) {
  return (
	<div className="text-red text-center">{`${message}`}</div>
  );
}

export default ErrorMessage;
