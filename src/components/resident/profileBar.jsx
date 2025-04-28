import {HStack, Image, Box, Center, VStack, Text, Button as ChakraButton} from '@chakra-ui/react';

import {ChevronLeftIcon} from '@chakra-ui/icons';
// import {Button} from 'ui-lib/ui-lib.components';
import ralph from 'images/resident-profile/ralph.png';
import calling from 'images/resident-profile/calling.svg';
import plus from 'images/resident-profile/plus.svg';
import document from 'images/resident-profile/document.svg';
import {useRouter} from 'next/router';

const Button = ({children, ...rest}) => (
  <ChakraButton _hover={{opacity: 1}} _active={{opacity: 1}} h="55px" {...rest}>
    {children}
  </ChakraButton>
);

const ProfileBar = () => {
  const router = useRouter();

  return (
    <VStack align={'stretch'} w="35%" position={'sticky'} top={'148px'} spacing={'28px'}>
      <HStack spacing={'12px'}>
        <Center
          w="50px"
          h="50px"
          borderRadius={'full'}
          border={'1px solid #E4E4E7'}
          cursor={'pointer'}
          onClick={() => router.back('/transactions')}
        >
          <ChevronLeftIcon color={'#000000'} fontSize={25} />
        </Center>

        <Text fontSize="20px" fontStyle="normal" fontWeight="600" lineHeight="normal">
          Profile
        </Text>
      </HStack>

      <VStack
        w="full"
        p="16px"
        spacing={'16px'}
        align={'center'}
        bg="#fff"
        border={'0.5px solid #E4E4E4'}
        borderRadius={'16px'}
      >
        <VStack spacing={'17px'}>
          <Image alt="profile" w="124px" h="124px" borderRadius={'full'} src={ralph.src} />
          <Text color={'#191919'} fontSize="28px" fontWeight="600" lineHeight="normal">
            Ralph Edwards
          </Text>
        </VStack>

        <VStack
          align={'stretch'}
          w="full"
          divider={<Box w="full" borderBottom={'1px solid #F5F5F5'} />}
          spacing={'14px'}
        >
          <HStack justify={'space-between'} w="full">
            <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
              Phone
            </Text>

            <VStack>
              <Text fontSize="14px" fontWeight="600" lineHeight="normal">
                +1 415 555 2671
              </Text>
              <HStack mt="7px" spacing={'9px'} align={'center'}>
                <Button
                  borderRadius="full"
                  leftIcon={<Image alt="calling icon" boxSize={'16px'} src={calling.src} />}
                  color="#4545FE"
                  bg="rgba(69, 69, 254, 0.10)"
                  px="12px"
                  h="23px"
                  fontSize="12px"
                  fontWeight="500"
                  lineHeight="normal"
                >
                  Call now
                </Button>
                <Image alt="plus icon" src={plus.src} />
              </HStack>
            </VStack>
          </HStack>

          <HStack justify={'space-between'} w="full">
            <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
              Email
            </Text>
            <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#4545FE'}>
              ralpheds@gmail.com
            </Text>
          </HStack>
          <HStack justify={'space-between'} w="full">
            <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
              Gender
            </Text>
            <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#191919'}>
              Male
            </Text>
          </HStack>
          <HStack justify={'space-between'} w="full">
            <Text fontSize="14px" fontWeight="400" lineHeight="normal" color={'#191919'}>
              Preferred Contact
            </Text>
            <Text fontSize="14px" fontWeight="600" lineHeight="normal" color={'#191919'}>
              SMS
            </Text>
          </HStack>
          <Button
            leftIcon={<Image alt="document icon" src={document.src} />}
            h="49.87px"
            px="16px"
            bg="#E7FBF5"
            borderRadius="full"
            color="#064B38"
          >
            Notes
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ProfileBar;
