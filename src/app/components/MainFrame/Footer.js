"use client";

import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa'; 

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= documentHeight - 50) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer 
      className={`bg-gray-800 text-white p-4 fixed bottom-0 left-0 right-0 z-50 transition-opacity duration-300 ${showFooter ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-center justify-between">
        <span>Astitva Singh</span>
        <a
          href="https://github.com/astitva-exe-23"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <FaGithub className="h-5 w-5" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
