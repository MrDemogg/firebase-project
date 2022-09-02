import React from 'react';

const MyButton = ({children, btnType, ...props}) => {
  return (
    <button {...props} className={`btn btn-${btnType}`}>{children}</button>
  );
};

export default MyButton;