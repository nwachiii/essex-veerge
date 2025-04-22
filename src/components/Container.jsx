import {Box, Flex} from '@chakra-ui/react';

export const Container = props => {
  return (
    <Box
      px={6}
      bg="gray.50"
      h="100vh"
      color="black"
      _dark={{
        bg: 'gray.900',
        color: 'white',
      }}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        transition="all 0.15s ease-out"
        {...props}
      />
    </Box>
  );
};
