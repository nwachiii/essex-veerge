import React, {useRef} from 'react';
import {
  Box,
  Text,
  Modal,
  ModalProps,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useColorModeValue,
  VStack,
  Stack,
  Image,
} from '@chakra-ui/react';
import {AnimatePresence, motion} from 'framer-motion';
import cancelBlackIcon from '/src/images/icons/cancel-icon-black.svg';
import {scrollBarStyles} from '../../../components/common/ScrollbarStyling';

export const Widget = ({
  isOpen,
  size,
  onClose,
  hideCloseBtn,
  closeOnOverlayClick,
  children,
  ...restModalProps
}) => {
  const bg = useColorModeValue('#4545FE.80', 'gray.800');

  return (
    <Modal
      blockScrollOnMount={true}
      closeOnOverlayClick={false}
      scrollBehavior="inside"
      // motionPreset='slideInBottom'
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
        position={'fixed'}
        px={0}
        pb={0}
        pt={'0'}
        border="1px solid rgba(0,0,0,0.85)"
        shadow="lg"
        bgColor={bg}
        borderRadius="20px 20px 16px 16px"
        minW={{md: '400px'}}
        maxW={{base: '90%', md: '386px'}}
        right={'4%'}
        bottom="14%"
        transition="ease-in-out 0.5s"
        {...restModalProps}
      >
        {children}
        <Box position={'absolute'} right={'3%'} bottom={'-11%'}>
          <Image
            cursor={'pointer'}
            onClick={onClose}
            src={cancelBlackIcon.src}
            alt=""
            objectFit={'cover'}
            h={'46px'}
            w="48px"
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

const WidgetHeader = ({children, ...rest}) => {
  return (
    <ModalHeader p={0} m={0} {...rest}>
      {children}
    </ModalHeader>
  );
};

const WidgetDescription = ({children, ...rest}) => {
  return (
    <Text textStyle="p" {...rest}>
      {children}
    </Text>
  );
};

const WidgetBody = ({children, ...rest}) => {
  return (
    <Box mx="auto" overflowY="auto" css={scrollBarStyles} w="full" {...rest}>
      <Stack w="full" align="center" pt={3} h="fit-content" mx="auto">
        {children}
      </Stack>
    </Box>
  );
};

Widget.Body = WidgetBody;
Widget.Header = WidgetHeader;
Widget.Description = WidgetDescription;
