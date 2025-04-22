import React, {useRef} from 'react';
import {
  Box,
  Text,
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  Stack,
  Image,
} from '@chakra-ui/react';

import {AnimatePresence, motion} from 'framer-motion';

import cancelBlueIcon from '/src/images/icons/cancel-icon-blue.svg';
import {scrollBarStyles} from '../../../components/common/ScrollbarStyling';

export const WidgetTopRightCorner = ({
  isOpen,
  size,
  onClose,
  hideCloseBtn,
  closeOnOverlayClick,
  children,
  ...restModalProps
}) => {
  return (
    <Modal
      blockScrollOnMount={true}
      closeOnOverlayClick={false}
      scrollBehavior="inside"
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      minH="fit-content"
      h="fit-content"
      minW={{base: '90%', md: '838px'}}
      px="30px"
      color="#191919"
    >
      <ModalOverlay bg="rgba(0,0,0,0.1)" />

      <ModalContent
        px={0}
        pb={0}
        pt={'0'}
        border="1px solid lightgray"
        shadow="lg"
        borderRadius="20px 20px 16px 16px"
        minW={{md: '400px'}}
        maxW={{base: '90%', md: '400px'}}
        left={'28%'}
        top="27%"
        {...restModalProps}
      >
        <Box position={'absolute'} left={'83%'} top={'-11.3%'}>
          <Image
            cursor={'pointer'}
            onClick={onClose}
            src={cancelBlueIcon.src}
            alt=""
            objectFit={'cover'}
            h={'46px'}
            w="48px"
          />
        </Box>
        {children}
      </ModalContent>
    </Modal>
  );
};

const WidgetTopRightCornerHeader = ({children, ...rest}) => {
  return (
    <ModalHeader p={0} m={0} {...rest}>
      {children}
    </ModalHeader>
  );
};

const WidgetTopRightCornerDescription = ({children, ...rest}) => {
  return (
    <Text textStyle="p" {...rest}>
      {children}
    </Text>
  );
};

const WidgetTopRightCornerBody = ({children, ...rest}) => {
  return (
    <AnimatePresence>
      <Box as={motion.div} mx="auto" overflowY="auto" css={scrollBarStyles} w="full" {...rest}>
        <Stack w="full" align="center" pt={3} h="fit-content" mx="auto">
          {children}
        </Stack>
      </Box>
    </AnimatePresence>
  );
};

WidgetTopRightCorner.Body = WidgetTopRightCornerBody;
WidgetTopRightCorner.Header = WidgetTopRightCornerHeader;
WidgetTopRightCorner.Description = WidgetTopRightCornerDescription;

const widgetVariant = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};
