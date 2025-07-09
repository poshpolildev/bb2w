import React from 'react';

// Import your specific icon images from the assets folder.
// Make sure the file names here EXACTLY match your actual file names.
import pythonIcon from '../assets/pyhton_icon.png';
import htmlIcon from '../assets/html5_icon.png';
import java_icon from '../assets/java_icon.png';
import reactIcon from '../assets/reactjs_icon.png';
import cppIcon from '../assets/c++_icon.png';


// An array to hold all the imported icons and their labels
const icons = [
  { src: pythonIcon, label: 'Python' },
  { src: htmlIcon, label: 'HTML5' },
  { src: java_icon, label: 'Java' },
  { src: reactIcon, label: 'React' },
  { src: cppIcon, label: 'C++' },
];

const TechIcons = () => {
  return (
    // The container for the icons
    <div className="flex space-x-4 items-center">
      {/* We loop through the icons array and create an <img> tag for each one */}
      {icons.map((icon) => (
        <img
          key={icon.label}
          src={icon.src}
          alt={icon.label}
          className="h-10 w-auto" // Using h-10 and w-auto to maintain aspect ratio
        />
      ))}
    </div>
  );
};

export default TechIcons;