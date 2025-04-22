import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Image,
  ScaleFade,
  Stack,
  StackDivider,
  Switch,
  Text,
  VStack,
  useBoolean,
} from '@chakra-ui/react';
import React from 'react';

import infoCircle from '/src/images/icons/blueInfoCircle.svg';
import {JoinBeta} from './joinBeta';
import bgPattern from '/src/images/brand/bg-pattern.svg';
import switchIsTrue from '/src/images/icons/switch-icon-true.svg';
import switchIsFalse from '/src/images/icons/switch-icon-off.svg';
import PhoneCallIcon from '../assets/PhoneCallIcon';
import {useMutation} from '@tanstack/react-query';
import {deleteStore} from '../../apis/settings';

export const LeftForManageStore = () => {
  const [CO_OWNERSHIP_SWITCH, setCO_OWNERSHIP_SWITCH] = useBoolean();
  const [AGENT_PORTAL, setAGENT_PORTAL] = useBoolean();

  return (
    <VStack spacing="0" py="37px" borderLeftRadius="20px" h="full" w="50%">
      <Box>
        <Stack spacing="7px" px="38px">
          <Heading fontSize="28px" fontWeight="500" color="#000000">
            Manage Application
          </Heading>
          <Text fontSize="14px" fontWeight="300" color="#191919">
            Customize Your Web Application Experience to Suit Your Preferences.
          </Text>
        </Stack>
        <Divider color={'#E9E9E9'} w="99%" mx="auto" mt={4} />
      </Box>
      <Stack
        py={'30px'}
        w="full"
        px="38px"
        spacing="29px"
        bgImage={bgPattern.src}
        backgroundPosition="center"
        backgroundRepeat="repeat"
        objectFit={'cover'}
        h="full"
      >
        <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="18px" fontWeight="400" color="#191919">
              Co-ownership
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#4545FE" fontSize="12px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <Box
            _hover={{
              scale: '1.2',
            }}
            animateOpacity={true}
            transform={'auto'}
            transition={'0.3s ease-in 0.2s'}
            cursor={'pointer'}
          >
            {CO_OWNERSHIP_SWITCH ? (
              <Image
                alt=""
                h="18px"
                w="34px"
                onClick={setCO_OWNERSHIP_SWITCH.toggle}
                src={switchIsTrue.src}
              />
            ) : (
              <Image
                alt=""
                h="18px"
                w="34px"
                onClick={setCO_OWNERSHIP_SWITCH.toggle}
                src={switchIsFalse.src}
              />
            )}
          </Box>
        </HStack>
        <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="18px" fontWeight="400" color="#191919">
              Agent Portal
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#4545FE" fontSize="12px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <Box
            _hover={{
              scale: '1.2',
            }}
            animateOpacity={true}
            transform={'auto'}
            transition={'0.3s ease-in 0.2s'}
            cursor={'pointer'}
          >
            {AGENT_PORTAL ? (
              <Image
                alt=""
                h="18px"
                w="34px"
                onClick={setAGENT_PORTAL.toggle}
                src={switchIsTrue.src}
              />
            ) : (
              <Image
                alt=""
                h="18px"
                w="34px"
                onClick={setAGENT_PORTAL.toggle}
                src={switchIsFalse.src}
              />
            )}
          </Box>
        </HStack>

        <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="18px" fontWeight="400" color="#191919">
              Secondary Market
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#4545FE" fontSize="12px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <JoinBeta />
        </HStack>
        <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="18px" fontWeight="400" color="#191919">
              Smart Payment Plan
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#4545FE" fontSize="12px" cursor="pointer" fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <JoinBeta />
        </HStack>

        <HStack w="full" justify="space-between">
          <Stack spacing="none">
            <Heading as="h2" fontSize="18px" fontWeight="400" color="#191919">
              International Transactions
            </Heading>
            <HStack spacing="5px">
              <Image alt="learn more icon" src={infoCircle.src} />

              <Text color="#4545FE" fontSize="14px" cursor={'pointer'} fontWeight="300">
                learn more
              </Text>
            </HStack>
          </Stack>
          <Button
            display={'flex'}
            gap="10px"
            variant="dark"
            borderRadius="9.56px"
            color="#4545FE"
            bg="transparent"
            border="1px solid #4545FE"
            fontSize="12.748px"
            px="8.76px"
            h="33.528px"
            fontWeight="500"
          >
            <PhoneCallIcon /> <span>Contact Support</span>
          </Button>
        </HStack>
      </Stack>
    </VStack>
  );
};

export default LeftForManageStore;
