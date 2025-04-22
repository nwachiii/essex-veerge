import {Box} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import React from 'react';

const AuthTermsCheck = ({isOpen, onToggle, ...rest}) => {
  const boxVariants = {
    checked: {scale: 1, opacity: 1},
    unchecked: {scale: 0.4, opacity: 0},
    transition: {
      duration: 0.3,
    },
  };

  const checkVariants = {
    checked: {pathLength: 1, opacity: 1},
    unchecked: {pathLength: 0, opacity: 0},
  };
  return (
    <Box
      h="24px"
      w="24px"
      minH="24px"
      minW="24px"
      border="1px solid #e5e5e5"
      display="flex"
      justifyContent="center"
      alignContent="center"
      borderColor={isOpen ? 'transparent' : '#e5e5e5'}
      cursor="pointer"
      bg="#Fafafa"
      borderRadius="8px"
      transition="0.3s ease-in-out"
      onClick={onToggle}
      {...rest}
    >
      <AnimatePresence>
        {isOpen && (
          <Box
            as={motion.div}
            initial="unchecked"
            animate="checked"
            exit="unchecked"
            variants={boxVariants}
            h="24px"
            w="24px"
            {...rest}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="0.5"
                y="0.5"
                width="23"
                height="23"
                rx="7.5"
                fill="#242526"
                stroke="#FAFAFA"
              />
              <motion.path
                d="M6 12L10.0016 16L18.0017 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkVariants}
                transition={{delay: 0.2, duration: 0.3}}
              />
            </svg>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default AuthTermsCheck;
