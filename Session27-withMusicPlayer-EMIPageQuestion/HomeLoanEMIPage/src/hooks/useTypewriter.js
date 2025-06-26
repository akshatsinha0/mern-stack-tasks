import { useState, useEffect, useRef } from 'react';

const useTypewriter = (text, speed = 150) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          setIndex(prev => prev + 1);
        } else {
          
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
          return;
        }
      } else {
        
        if (index > 0) {
          setDisplayedText(text.substring(0, index - 1));
          setIndex(prev => prev - 1);
        } else {
          
          setIsDeleting(false);
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, index, isDeleting, speed]);

  return displayedText;
};

export default useTypewriter;
