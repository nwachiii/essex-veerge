import React from 'react';
import {Box, Flex, Image, Text} from '@chakra-ui/react';
import workTogether from '../../../../images/loop/work-together.gif';
import {Button} from 'ui-lib/ui-lib.components';

export const WorkTogether = () => {
  return (
    <Box background="#010D13" py="70px">
      <Flex w="85%" h="90vh" align={'center'} mx="auto" justify={'space-between'}>
        <Box w="45%">
          <Text
            fontSize={'48px'}
            fontWeight={700}
            color="#fff"
            lineHeight={'normal'}
            fontFamily={'Syne'}
          >
            <Text as="span" color="#2ED3B7">
              Work together,
            </Text>{' '}
            no matter how you work
          </Text>
          <Text color="#fff" fontSize={'20px'} fontWeight={300} mt="8px">
            Space bring order and clarity to work — you can create them for every project, topic, or
            team. This helps focus on the conversations and work that matters most to you.
          </Text>
          <Box mt="39px">
            <Button h="55px" w="50%" bg="white" border=" 1px solid #FFF">
              <Text fontWeight={600} fontSize={'20px'} color={'#191919'}>
                Get Started
              </Text>
            </Button>
          </Box>
        </Box>
        <Box w="55%">
          <Image alt="work_together" w="full" h="auto" src={workTogether.src} />
        </Box>
      </Flex>
    </Box>
  );
};

export default WorkTogether;
