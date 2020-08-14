import React from 'react';

import history from '../../routes/history';

const Building: React.FC = () => {
  const onClick = () => {
    history.push('/');
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

export default Building;
