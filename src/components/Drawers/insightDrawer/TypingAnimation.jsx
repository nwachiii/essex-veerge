import {useEffect, useState} from 'react';

export const TypingAnimation = ({text, interval = 10, delay = 100, show_cursor = false}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      if (currentIndex === 0) {
        setTimeout(() => {
          const timeout = setTimeout(() => {
            setCurrentText(prevText => prevText + text[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
          }, interval);

          return () => clearTimeout(timeout);
        }, delay);
      } else {
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, interval);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, interval, text, delay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(!showCursor);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span>
      {currentText}
      {show_cursor && (
        <span
          style={{
            display: showCursor ? 'inline' : 'none',
          }}
        >
          {' '}
          |
        </span>
      )}
    </span>
  );
};
