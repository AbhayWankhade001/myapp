import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./NavBar"
const ImageSelector = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([
        { id: 1, src: 'images/pexels-jack-winbow-1559486.jpg' },
        { id: 2, src: 'images/pexels-masha-raymers-2726111.jpg' },
        { id: 3, src: 'images/pexels-pixabay-220453.jpg' },
        { id: 4, src: 'images/pexels-matheus-bertelli-1906157.jpg' },
        { id: 5, src: 'images/pexels-jack-winbow-1559486.jpg' },
        { id: 6, src: 'images/pexels-pixabay-220453.jpg' },
        { id: 7, src: 'images/pexels-jack-winbow-1559486.jpg' },
        { id: 8, src: 'images/pexels-masha-raymers-2726111.jpg' },
        { id: 9, src: 'images/pexels-pixabay-220453.jpg' },
        { id: 10, src: 'images/pexels-matheus-bertelli-1906157.jpg' }
    ]);

    const handleImageSelection = (image) => {
        setSelectedImage(image);
        localStorage.setItem('selectedImage', JSON.stringify(image));
    };

    const handleResetSelection = () => {
        setSelectedImage(null);
        localStorage.removeItem('selectedImage');
    };

    return (
        <div>
            <NavBar />



            <div className='abc' style={{ textAlign: 'center' }}>
                {selectedImage ? (
                    <img className='rounded-full  beat'
                        src={`/${selectedImage.src}`}
                        alt={selectedImage.src}
                        style={{ width: '25%', height: 'auto' }}
                    />
                ) : (
                    <p>No image selected</p>
                )}
            </div>
            <hr />
            <div>
                {images.map((image) => (
                    <div key={image.id} style={{ display: 'inline-block' }}>
                        <img
                            src={`/${image.src}`}
                            alt={image.src}
                            style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                            onClick={() => handleImageSelection(image)}
                        />
                    </div>
                ))}
            </div>
            <hr />
            <button onClick={handleResetSelection} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 align-content: center;"> Reset Selection</button>
 <Link to="/MainoPage" >             <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 align-content: center;"> Reset Selection</button>
</Link> 

        </div>
    );
};

export default ImageSelector;

