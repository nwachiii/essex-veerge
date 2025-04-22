import {OnboardingBg} from '../../../components';
import {FormControl, Flex, Heading, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import Link from 'next/link';

export const Form = ({children, noBckgrnd, ...rest}) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      position="relative"
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      {...rest}
    >
      {noBckgrnd ? null : <OnboardingBg />}
      <Stack
        p={6}
        pb={10}
        my={12}
        zIndex="1"
        w={'full'}
        spacing={4}
        maxW={'md'}
        rounded={'xl'}
        color="#F4F4F4"
        className="main-app"
        background="rgba(255, 255, 255, 0.1)"
        boxShadow="0px 8px 48px rgba(0, 0, 0, 0.04)"
        {...rest}
      >
        {/* This children is any extra form info asides 'FormHeader', 'FormDescription', 'FormBody', and 'FormFooter'  */}
        {children}
      </Stack>
    </Flex>
  );
};

const FormHeader = ({children, ...rest}) => {
  return (
    <Heading
      fontWeight="700"
      align="left"
      lineHeight="35.5px"
      fontSize={{base: 'xl', md: '28px'}}
      {...rest}
    >
      {children}
    </Heading>
  );
};

const FormDescription = ({children}) => {
  return (
    <Text
      align="center"
      fontWeight={500}
      fontSize={{base: 'sm', sm: '18px'}}
      lineHeight="22.82px"
      color={useColorModeValue('#919191', 'gray.400')}
    >
      {children}
    </Text>
  );
};

const FormBody = ({children}) => {
  return (
    <FormControl align="center" w={'100%'}>
      {children}
    </FormControl>
  );
};

const FormFooter = ({pageUrl, children}) => {
  return (
    <Stack spacing={6}>
      {pageUrl ? (
        <Link prefetch={false} href={pageUrl ?? '/'}>
          {children}
        </Link>
      ) : (
        children
      )}
    </Stack>
  );
};

Form.Header = FormHeader;
Form.Description = FormDescription;
Form.Body = FormBody;
Form.Footer = FormFooter;

export default Form;
