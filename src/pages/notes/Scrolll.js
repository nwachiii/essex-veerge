import styled from '@emotion/styled';
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai';
import React from 'react';
import {motion} from 'framer-motion';

export const Scrolll = () => {
  const [upOrDown, setUpOrDown] = React.useState(true);

  const handle = () => {
    const currentPosition = window.scrollY;
    const pageHeight = document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    console.log(currentPosition, pageHeight, clientHeight);
    if (currentPosition >= pageHeight * 0.5) {
      setUpOrDown(false);
    } else if (currentPosition + clientHeight <= pageHeight * 0.8) {
      setUpOrDown(true);
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', handle);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      window.removeEventListener('scroll', handle);
    };
  });

  function scrollToTopOrBottom() {
    const currentPosition = window.scrollY;
    const pageHeight = document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (currentPosition <= pageHeight * 0.5) {
      window.scrollTo(0, pageHeight - clientHeight);
    } else if (currentPosition + clientHeight <= pageHeight) {
      window.scrollTo(0, 0);
    }
  }

  return (
    <ArrowWrap>
      <Wrap
        animate={{scale: [1.1, 0.8, 0.6, 0.8, 1.1]}}
        transition={{ease: 'easeInOut', repeat: Infinity, duration: 1}}
      >
        {upOrDown ? (
          <ArrDwn onClick={scrollToTopOrBottom} />
        ) : (
          <ArrUp onClick={scrollToTopOrBottom} />
        )}
      </Wrap>
    </ArrowWrap>
  );
};

export default Scrolll;

const ArrDwn = styled(AiOutlineArrowDown)`
  color: black;
  color: white;
  font-size: 22px;
`;
const ArrUp = styled(AiOutlineArrowUp)`
  color: black;
  color: white;
  font-size: 22px;
`;

const Wrap = styled(motion.div)`
  transition-property: scale;
`;

const ArrowWrap = styled.div`
  position: fixed;
  right: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #f4f4f4;
  background: #3d3d3d;
  z-index: 9999999;

  :hover {
    cursor: pointer;
  }
`;
