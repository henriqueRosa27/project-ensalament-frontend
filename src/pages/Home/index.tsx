import React from 'react';

import history from '../../routes/history';

const Home: React.FC = () => {
  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => {
          history.push('/predio');
        }}
      >
        Prédios
      </button>
    </>
  );
};

export default Home;
