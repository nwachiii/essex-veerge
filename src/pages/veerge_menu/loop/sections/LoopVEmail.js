import { Box, Flex, Image, Text } from '@chakra-ui/react';
import mail from '../../../../images/loop/mail.gif';

export const LoopVEmail = () => {

  return (
    <Box background="#010D13">
      <Flex w='85%' gap='10px' h='90vh' align={'center'} mx='auto' justify={'space-between'}>
        <Box w='47%'>
          <Text fontSize={'48px'} fontWeight={700} color='#fff' lineHeight={'normal'} fontFamily={'Syne'}>
            Loop Vs <Text as='span' color='#2ED3B7'> Email </Text>
          </Text>
          <Text color='#fff' fontSize={'20px'} fontWeight={300} mt='20px'>
            The inbox had its prime, but contemporary work requires an evolution beyond the ordinary. Its not that email is ineffective, but rather, it has its limitations. Just as we have transitioned from landlines to smartphones for enhanced efficiency, Loop provides similar advantages in the workplace, we can accelerate our pace, achieve more, and connect effortlessly. Loop empowers seamless communication and collaboration, while the conventional inbox remains ensnared in a loop of refresh and reply.
          </Text>
        </Box>
        <Box w='35%'>
          <Image alt='mail' w='full' h='auto' src={mail.src} />
        </Box>
      </Flex>
    </Box>
  );
};

export default LoopVEmail;
