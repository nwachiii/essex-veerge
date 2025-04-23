import React from 'react';
import {themeStyles} from '/src/theme';
import {ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Button, Container, Heading, Image, Text, Flex} from '@chakra-ui/react';
import docIcon from '/src/images/icons/doc_icon.svg';

export const UnitOutrightContract = ({unitDetail}) => {
  return (
    <div>
      {unitDetail?.outright_contract ? (
        <Box mt="60px">
          <Heading fontSize="28px" fontWeight="500" color="#191919" lineHeight="11px">
            Unit Document
          </Heading>
          <Container {...themeStyles.containerStyles} maxW="1284px" padding="19px 36px" mt="20px">
            <Flex gap="23px">
              <Box w="277px" h="150px" border="1px solid lightgray" borderRadius="14px" p="23px">
                <Image alt="" src={docIcon.src} h="33.8px" w="40px" />
                <Text pt={2}>Purchase agreement</Text>
                <Button
                  target="_blank"
                  as="a"
                  href={unitDetail?.outright_contract}
                  mt={4}
                  variant="link"
                  color="#4545FE"
                >
                  View {<ChevronRightIcon />}
                </Button>
              </Box>
            </Flex>
          </Container>
        </Box>
      ) : null}
    </div>
  );
};

export default UnitOutrightContract;
