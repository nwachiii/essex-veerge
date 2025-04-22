import {Box, Flex, Icon, VStack} from '@chakra-ui/react';
import React from 'react';

export const EquityFileUpload = () => {
  return (
    <Box
      minW={{base: '90%', xl: '580px'}}
      h="201px"
      border="1.5px solid #4545FE"
      borderRadius="32px"
      {...rest}
      mt="67px"
    >
      {files && files.length > 0 ? (
        <Flex align={'center'} p={6}>
          {thumbs}
          <input {...getInputProps()} />
          <div {...getRootProps({className: 'dropzone'})}>
            <Icon ml="33px" as={AddIcon} color="#4545FE" fontWeight={900} fontSize="70px" />
          </div>
        </Flex>
      ) : (
        <VStack
          cursor="pointer"
          h="100%"
          spacing={6}
          justify="center"
          pos="relative"
          {...getRootProps({className: 'dropzone'})}
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              {`Drag 'n' drop your investors packet here`}
            </p>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default EquityFileUpload;
