import React, { useState } from 'react';
import FacebookAuth from './FacebookAuth';
import PhotoGallery from './PhotoGallery';
import GoogleVision from './GoogleVision';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <div>
      {!accessToken ? (
        <FacebookAuth onLogin={setAccessToken} />
      ) : (
        <PhotoGallery accessToken={accessToken} />
      )}
      <GoogleVision />
    </div>
  );
};

export default App;
