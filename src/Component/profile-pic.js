import React, { useEffect, useState } from 'react';

const DisplayImage = ({ selectedImage }) => {
  const [localStorageImage, setLocalStorageImage] = useState(null);

  useEffect(() => {
    const image = localStorage.getItem('selectedImage');
    setLocalStorageImage(JSON.parse(image));
  }, [selectedImage]);

  return (
    <div style={{ textAlign: 'center' }}>
      {selectedImage || localStorageImage ? (
        <img
          className='rounded-full'
          src={`/${selectedImage || localStorageImage.src}`}
          alt={selectedImage || localStorageImage.src}
          style={{ width: '100px', height: '100px' }}
        />
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
};

export default DisplayImage;
