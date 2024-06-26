import React, { useState } from 'react';
import FacebookAuth from './FacebookAuth';
import PhotoGallery from './PhotoGallery';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <div>
      {!accessToken ? (
        <FacebookAuth onLogin={setAccessToken} />
      ) : (
        <PhotoGallery accessToken={accessToken} />
      )}
    </div>
  );
};

export default App;
