import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ accessToken }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://graph.facebook.com/me/photos?fields=id,name,created_time,picture,images&access_token=${accessToken}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          setPhotos(data.data);
        }
      })
      .catch(error => console.error('Error fetching photos:', error));
  }, [accessToken]);

  console.log(photos);
  return (
    <div className="photo-gallery">
      <h1>Your Facebook Photos</h1>
      <div className="photos">
        {photos.map(photo => (
          <div key={photo.id} className="photo">
            <img src={photo.images[0].source} alt={photo.name || 'Photo'} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
