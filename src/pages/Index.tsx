
import React, { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Contact from '../components/Contact';

const Index: React.FC = () => {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
          
          // Update URL without page reload
          window.history.pushState({}, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <MainLayout>
      <Hero />
      <Features />
      <About />
      <Contact />
    </MainLayout>
  );
};

export default Index;
