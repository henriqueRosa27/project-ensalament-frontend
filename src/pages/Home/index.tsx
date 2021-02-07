/* eslint-disable react/button-has-type */
import React from 'react';

import history from '../../routes/history';

const Home: React.FC = () => {
  const onClick = () => {
    history.push('/predio');
  };

  return (
    <>
      <h1>Home</h1>
      <button type="button" onClick={onClick}>
        Prédios
      </button>
    </>
  );
};

export default Home;
