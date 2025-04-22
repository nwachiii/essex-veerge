import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Heading,
  VStack,
  DrawerOverlay,
  Drawer,
  useDisclosure,
  useToast,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react';
import {GroupBuyersView} from './GroupBuyersDrawer';
import {useState} from 'react';
import {motion} from 'framer-motion';

export const FractionalGrouping = ({
  customScrollbarStyles,
  handleScreen,
  fractional_grouping_data,
  unitInfo,
  DrawerDisclosure,
}) => {
  const toast = useToast();
  const GroupBuyersDisclosure = useDisclosure();
  const [selectedGroup, setSelectedGroup] = useState({});

  const handleClose = () => {
    handleScreen('options');
    return DrawerDisclosure.onClose();
  };

  const serialNumbering = arg => {
    return `${arg <= 9 ? 0 : ''}${arg}`;
  };

  const handleSelectGroup = (indx, grp) => {
    const copy = [...fractional_grouping_data];
    for (let i = 0; i < copy.length; i++) {
      if (i == indx) {
        setSelectedGroup({id: serialNumbering(indx + 1), group: grp});
      }
    }
    GroupBuyersDisclosure.onOpen();
  };

  //   console.log('FRACTIONAL_GROUPING_QUERY', fractional_grouping_data);

  return (
    <>
      <Drawer
        autoFocus={false}
        borderRadius="16px"
        onClose={handleClose}
        isOpen={DrawerDisclosure.isOpen}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent
          p="0px"
          // bg="#fff"
          // zIndex={100}
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
            fontFamily="Euclid Circular B"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Fractional Grouping
            </Heading>
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
                <DrawerCloseButton
                  right="0px"
                  left="0px"
                  my="auto"
                  color="#000"
                  top="0"
                  bottom="0"
                />
              </VStack>
            </HStack>
          </HStack>
          <DrawerBody sx={customScrollbarStyles} py="1rem">
            {fractional_grouping_data ? (
              <Stack spacing="18px">
                {fractional_grouping_data.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={variants}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                  >
                    <Flex
                      width="350px"
                      padding="24px"
                      cursor={'pointer'}
                      alignItems="center"
                      borderRadius="8px"
                      background="#F8F8F8"
                      justify="space-between"
                      onClick={() => handleSelectGroup(idx, item?.fractional_cowners)}
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
                        {serialNumbering(item?.fractional_cowners?.length)}
                      </Text>
                    </Flex>
                  </motion.div>
                ))}
              </Stack>
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <GroupBuyersView
        unitInfo={unitInfo}
        handleScreen={handleScreen}
        selectedGroup={selectedGroup}
        customScrollbarStyles={customScrollbarStyles}
        DrawerDisclosure={GroupBuyersDisclosure}
      />
    </>
  );
};

export default FractionalGrouping;

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
