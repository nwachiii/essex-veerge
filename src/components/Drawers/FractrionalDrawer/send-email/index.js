import {AnimatedLoader} from '@/components/common/loaders';
import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {useQuery} from '@tanstack/react-query';
import {fetchFractionalGrouping} from 'apis/listings';
import {toastForError} from 'utils/toastForErrors';
import {Button} from 'ui-lib/ui-lib.components';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import {motion} from 'framer-motion';
import {EmailDrawer} from './EmailDrawer';

export const SendEmailDrawer = ({handleScreen, customScrollbarStyles, unitInfo}) => {
  const FRACTIONAL_GROUPING_QUERY = useQuery(['fractional-grouping'], () =>
    fetchFractionalGrouping(Number(unitInfo?.id))
  );
  const emailDrawer = useDisclosure();

  const serialNumbering = arg => {
    return `${arg <= 9 ? 0 : ''}${arg}`;
  };

  const FRACTIONAL_GROUPING_DATA =
    FRACTIONAL_GROUPING_QUERY?.data && FRACTIONAL_GROUPING_QUERY?.data?.data?.data?.length
      ? FRACTIONAL_GROUPING_QUERY?.data?.data?.data
      : [];

  return (
    <DrawerContent
      p="0px"
      bg="#fff"
      zIndex={100}
      mt="65.12px"
      position="relative"
      minW="fit-content"
      sx={customScrollbarStyles}
    >
      <HStack
        py="30px"
        px="25px"
        h="49.699px"
        bg="#F5F5F5"
        align="center"
        position="relative"
        justify="space-between"
      >
        <Flex gap="5px" align={'center'}>
          <Image
            alt="back icon"
            cursor="pointer"
            src={backIcon.src}
            onClick={handleScreen('options')}
          />
          <Heading fontSize="18.9px" fontWeight="700">
            Send E-mail
          </Heading>
        </Flex>
        <HStack spacing="15px">
          <VStack
            w="30px"
            h="30px"
            _hover={{
              width: '30px',
              height: '30px',
            }}
            align="center"
            justify="center"
            position="relative"
            borderRadius="5px"
            transition="0.3s ease-in-out"
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody
        sx={customScrollbarStyles}
        paddingTop="1rem"
        // mr="2px"
        w="400px"
        position={'relative'}
      >
        {FRACTIONAL_GROUPING_QUERY?.isLoading ? (
          <AnimatedLoader />
        ) : FRACTIONAL_GROUPING_QUERY?.isError ? (
          err => toastForError(err, true, toast)
        ) : FRACTIONAL_GROUPING_DATA ? (
          <Stack h="82%" overflowY={'auto'}>
            {FRACTIONAL_GROUPING_DATA.map((item, idx) => (
              <motion.div
                key={idx}
                variants={variants}
                style={{scale: 0.95}}
                whileHover={{scale: 1}}
                whileTap={{scale: 0.85}}
              >
                <Flex
                  // key={idx}
                  width="350px"
                  mx={'auto'}
                  padding="24px"
                  cursor={'pointer'}
                  alignItems="center"
                  borderRadius="8px"
                  background="#F8F8F8"
                  justify="space-between"
                >
                  <Text
                    color="#191919"
                    fontSize="14px"
                    fontWeight="500"
                    fontStyle="normal"
                    lineHeight="normal"
                  >{`Unit ${serialNumbering(idx + 1)}`}</Text>
                  <Text
                    color="#3D3D3D"
                    fontSize="14px"
                    fontWeight="400"
                    fontStyle="normal"
                    lineHeight="normal"
                  >
                    {item?.allocation ? item.allocation : 'Not Allocated Yet'}
                  </Text>
                </Flex>
              </motion.div>
            ))}
          </Stack>
        ) : null}
        <Button
          bottom="8%"
          color="#000"
          width="350px"
          fontWeight="400"
          fontStyle="normal"
          position="absolute"
          fontSize="14.617px"
          variant={'secondary'}
          borderRadius="9.745px"
          border="1px solid #000"
          onClick={emailDrawer.onOpen}
        >
          Send To All
        </Button>
      </DrawerBody>
      <EmailDrawer isOpen={emailDrawer.isOpen} onClose={emailDrawer.onClose} />
    </DrawerContent>
  );
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {stiffness: 1000, velocity: -100},
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {stiffness: 1000},
    },
  },
};
