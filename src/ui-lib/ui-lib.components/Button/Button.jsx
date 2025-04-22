import {useState} from 'react';
import {AddIcon} from '@chakra-ui/icons';
import {themeStyles} from '../../../theme';
import {
  Button as ChakraButton,
  Spinner,
  HStack,
  ButtonGroup,
  Box,
  Icon,
  Text,
  Image,
} from '@chakra-ui/react';

import btnStyles from './Btn.module.css';

import bulbIcon from '/src/images/icons/bulb_veerge_assistance.svg';

const sharedProps = {
  mt: 4,
  py: 6,
  h: '55px',
  px: 10,
  w: '100%',
  maxW: 391,
  fontWeight: 600,
  fontSize: '16px',
  borderRadius: 'xl',
  _active: {
    opacity: 0.8,
  },
};

export const Button = ({variant, children, notes, withoutLoader, ...rest}) => {
  const [isClicked, setIsClicked] = useState(false);

  switch (variant) {
    case 'primary':
      return (
        <ChakraButton
          {...sharedProps}
          bg="#4545FE"
          w="192px"
          color="white"
          fontSize={'14px'}
          fontWeight={'500'}
          borderRadius={12}
          _hover={{
            background: '',
          }}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'btn-outline':
      return (
        <ChakraButton
          _hover={{
            background: '',
          }}
          {...sharedProps}
          h="48px"
          w="192px"
          color="#191919"
          borderRadius={12}
          fontSize={'14px'}
          fontWeight={'400'}
          border="1px solid #e4e4e4"
          bg="transparent"
          {...rest}
        >
          {children}
        </ChakraButton>
      );

    case 'secondary':
      return (
        <ChakraButton
          _hover={{
            background: '',
          }}
          mt={0}
          size="lg"
          color="#121212"
          {...sharedProps}
          bg="transparent"
          fontSize={'14px'}
          fontWeight={'500'}
          borderRadius="60px"
          disabled={isClicked}
          border="1px solid #121212"
          onClick={() => setIsClicked(!isClicked)}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'outline-radius':
      return (
        <ChakraButton
          fontSize="18px"
          maxW={'195px'}
          color="#242526"
          fontWeight="400"
          borderColor="#a3a3a3"
          _hover={{opacity: '1'}}
          variant="outline-radius"
          fontFamily="Euclid Circular B"
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'tertiary':
      return (
        <ChakraButton
          {...sharedProps}
          mt={6}
          as="button"
          bg="#FFFFFF"
          fontSize="xl"
          borderRadius="xl"
          color={'#191919'}
          fontFamily={'heading'}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'normal':
      return (
        <ChakraButton
          {...sharedProps}
          mt={6}
          as="button"
          bg="#FFFFFF"
          fontSize="xl"
          borderRadius="xl"
          color={'#191919'}
          fontFamily={'heading'}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'violet':
      return (
        <ChakraButton
          w={'100%'}
          minH={'55px'}
          bg={'#4545FE'}
          color={'#FFFFFF'}
          fontSize={'18px'}
          fontWeight={'400'}
          lineHeight={'23px'}
          borderRadius="12px"
          disabled={isClicked}
          onClick={() => setIsClicked(!isClicked)}
          {...rest}
        >
          {children}
        </ChakraButton>
      );
    case 'dark':
      return (
        <ChakraButton
          color="white"
          bg="black"
          w="160px"
          fontSize={'14px'}
          fontWeight={'500'}
          {...sharedProps}
          // disabled={isClicked}
          borderRadius={'xl'}
          // _hover={{
          // 	shadow: 'md',
          // 	border: secondaryHoverBorder,
          // }}
          _hover={{
            background: '',
          }}
          // onClick={() => setIsClicked(!isClicked)}
          {...rest}
        >
          {children}
        </ChakraButton>
      );

    default:
      return (
        <ChakraButton
          _hover={{
            background: '',
          }}
          mt={6}
          h="55px"
          w={'full'}
          as="button"
          bg="#FFFFFF"
          fontSize="xl"
          borderRadius="xl"
          color={'#191919'}
          fontFamily={'heading'}
          onClick={() => !notes && !withoutLoader && setIsClicked(!isClicked)}
          {...rest}
        >
          {isClicked ? <Spinner colorScheme="whitesmoke" /> : children}
        </ChakraButton>
      );
  }
};

export const AddMoreBtn = ({btnText, iconStyle, clickFunction, hideSymbol, justify, ...rest}) => {
  return (
    <HStack justify={justify ? justify : 'flex-start'}>
      <ButtonGroup isAttached variant="outline">
        <Box
          variant="default"
          border="1px solid #a3a3a3"
          borderColor={'#a3a3a3'}
          type="button"
          cursor="pointer"
          display="flex"
          fontWeight="400"
          align="center"
          px={4}
          borderRadius="72px"
          h="55px"
          color={'#191919'}
          fontSize="16px"
          onClick={clickFunction}
          {...rest}
        >
          {hideSymbol ? null : <Icon alignSelf="center" as={AddIcon} mr="10px" {...iconStyle} />}
          <Text my="auto">{btnText}</Text>
        </Box>
      </ButtonGroup>
    </HStack>
  );
};

export const VeergeAssistantButton = ({...rest}) => {
  return (
    <Box
      w="202px"
      position={'absolute'}
      color="#FFFFFF"
      right={'3%'}
      bottom={'3%'}
      cursor={'pointer'}
      {...rest}
    >
      <Box position="relative">
        <Box
          position="absolute"
          left="40%"
          top="20%"
          zIndex={'15'}
          w="40px"
          h="40px"
          bg="gray.300"
          pointerEvents="none"
          opacity="0"
          borderRadius="50%"
          animation={`${btnStyles?.pulseAnimation} 2.5s 0.5s 3 forwards `}
        />
        <Image
          animation={`${btnStyles?.wobbleAnimation} 4s  infinite`}
          position={'absolute'}
          zIndex={'10'}
          left="11%"
          bottom="27%"
          alt="bulb icon"
          src={bulbIcon.src}
        />
        <Button
          variant="dark"
          bg="#222222"
          border="1px solid gray"
          borderRadius={'14px'}
          alt=""
          objectFit={'cover'}
          h={'43px'}
          w="202px"
          fontSize="16px"
          fontWeight="500"
          pr={'6px'}
        >
          Veerge Assistant
        </Button>
      </Box>
    </Box>
  );
};
