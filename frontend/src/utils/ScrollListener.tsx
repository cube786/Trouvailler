"use client"
import { myContext, MyContext } from '@/context/Context';
import { useContext, useEffect } from 'react';

const ScrollListener = () => {
  const { setScrolled } = useContext(MyContext) as myContext;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolled]);

  return null;
};

export default ScrollListener;
