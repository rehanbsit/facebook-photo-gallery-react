import React, { useState } from 'react';
import axios from 'axios';

const GoogleVision = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [labels, setLabels] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    // Convert image file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        const response = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCN_QrytE6nj0e1MgwblYepSmdEk-jPLi8`,
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: 'LABEL_DETECTION',
                    maxResults: 10,
                  },
                ],
              },
            ],
          }
        );

        const labels = response.data.responses[0].labelAnnotations.map(
          (label) => label.description
        );
        setLabels(labels);
      } catch (error) {
        console.error('Error fetching labels:', error);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <h1>Google Vision Label Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload and Detect Labels</button>
      </form>
      {labels.length > 0 && (
        <div>
          <h2>Detected Labels:</h2>
          <ul>
            {labels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleVision;