import React, { useState, useEffect } from 'react';
import bgImage from '../assets/AR-Background.jpg';
import wizCube from '../assets/WiizzkidCube.png';
import mathLogo from '../assets/MathLogo.jpg';
import vertebLogo from '../assets/vertebrates.png';
import { Link } from 'react-router-dom';

interface ApkFile {
  name: string;
  url: string;
  icon: string;
}

// Mock APK links
const apkFiles: ApkFile[] = [
  {
    name: 'MathShapes.apk',
    url: 'https://drive.google.com/uc?export=download&id=1nGV1DyQWc5pGNq7z0ne9aI8nyUWnU7pr',
    icon: mathLogo,
  },
  {
    name: 'Vertebrates.apk',
    url: 'https://drive.google.com/uc?export=download&id=10XLAiS2ZtJPrmeZE7SWpw7BsYvCbx7dE',
    icon: vertebLogo,
  },
  {
    name: 'WiizzKid QR Cube',
    url: 'https://drive.google.com/uc?export=download&id=1G1XaY8EYFqZDu0GSbBBVyek3dI1rJ-4p',
    icon: wizCube,
  },
];

const ARFeaturePage: React.FC = () => {
  // Start with video showing by default
  const [showVideo, setShowVideo] = useState(true);
  
  // Cloudinary parameters
  const cloudName = 'dvlktxrnx';
  const publicId = 'IMG_2837_ivgwyf';

  // Set up auto-play when component mounts
  useEffect(() => {
    // You could add any additional initialization logic here
    // For example, handling URL parameters to control autoplay behavior
    const urlParams = new URLSearchParams(window.location.search);
    const autoplayParam = urlParams.get('autoplay');
    
    if (autoplayParam === 'false') {
      setShowVideo(false);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center text-white overflow-hidden bg-black">

      {/* Dynamic Background - visible when video is closed */}
      <div
        className="absolute inset-0 bg-cover bg-center transform animate-zoomPan"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      
      {/* Main Content - visible when video is closed */}
      {!showVideo && (
        <div className="relative z-10 text-center max-w-3xl mt-8 bg-white bg-opacity-5 backdrop-blur-lg rounded-3xl shadow-lg w-auto h-auto flex flex-col items-center p-6">
          <Link to="/" className="w-5 h-5 mx-auto font-semibold rounded-md">
            <button className="absolute left-7 justify-items-start underline text-white">
              Back
            </button>
          </Link>
          {/* Caption Section */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore Our Augmented Reality Features
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover the cutting-edge features of our AR technology, designed to redefine your learning experience.
          </p>

          {/* APK Download Section */}
          <div className="flex flex-col items-center gap-4 w-full mt-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg max-w-xs p-4">
            {apkFiles.map((file, index) => (
              <a
                key={index}
                href={file.url}
                className="w-48 text-center py-2 px-4 bg-blue-500 hover:bg-pink-500 rounded-lg shadow-md transition"
                download
              >
                <img
                  src={file.icon}
                  alt={file.name}
                  className="w-5 h-5 justify-between items-center mx-auto rounded-md"
                />
                {file.name} Download
              </a>
            ))}
          </div>

          {/* Watch Video button */}
          <button
            onClick={() => setShowVideo(true)}
            className="mt-6 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-900 transition"
          >
            ▼ Watch Video
          </button>
        </div>
      )}

      {/* Video Overlay - shown by default */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20">
          <div className="relative max-w-4xl w-full">
            <iframe
              src={`https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${publicId}&fluid=true&controls=true&autoplay=true&loop=false&muted=false`}
              width="100%"
              height="480"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title="AR Demo Video"
              className="rounded-lg"
            />
            <div className="absolute top-4 right-4 flex gap-4">
              <button
                onClick={() => setShowVideo(false)}
                className="text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARFeaturePage;
