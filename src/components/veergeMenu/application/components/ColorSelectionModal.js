import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import selectedColorIcon from '/src/images/icons/selectedColorIcon.svg';
import {CreateToast} from '../../../../ui-lib';
import Link from 'next/link';
import {useState} from 'react';
import {lightenHex} from 'utils/lightenHEx';

export const ColorSelectionModal = ({
  modalDisclosure,
  screen,
  handleScreen,
  storeThemeColor,
  storeThemeName,
}) => {
  const router = useRouter();

  const {baseColor, themeName} = router.query;
  const [selectedColor, setSelectedColor] = useState(baseColor || '#2F2F2F');
  const defaultColor = selectedColor || baseColor || '#2F2F2F';
  const nextScreen = 'selectThemeColorMode';

  const toast = CreateToast();

  const setThemeColor = color => () => {
    return setSelectedColor(color);
  };

  const handleSelectedColor = e => {
    // if (storeThemeColor === defaultColor && storeThemeName === themeName) {
    //   toast('Your app is currently using this theme.');
    //   e.preventDefault();
    //   return e.stopPropagation();
    // }
    // return modalDisclosure.onClose();

    return 'selectColorOnly' === screen ? modalDisclosure.onClose() : handleScreen(nextScreen);
  };

  const numColors = ArrayOfColors.length;
  return (
    <Stack spacing="24px" p="24px" minW="404px" maxW="404px">
      <HStack py="0px" px="0px">
        <Stack spacing="4px">
          <Heading fontSize="24px" lineHeight="30.43px" color="#FFFFFF" fontWeight="700">
            Customise Template
          </Heading>
          <Text fontSize="16px" lineHeight="20.29px" fontWeight="400" color="#D6D6D6">
            Select your brand colour
          </Text>
        </Stack>
      </HStack>
      <ModalBody p="0px" m="0px" py="0px" px="0px" bg="transparent" h="fit-content">
        <Stack
          w="full"
          divider={<StackDivider border="none" h="1px" bg="#FFFFFF1A" mt="12px" mb="16px" />}
        >
          <Grid placeItems="center" templateColumns="repeat(4, 1fr)" gap="20px">
            {ArrayOfColors.map((item, idx) => {
              const isSecondToLast = idx === numColors - 2;
              const isLast = idx === numColors - 1;

              let colStart;
              let colSpan;

              if (isSecondToLast) {
                colStart = 2;
                colSpan = 1;
              } else if (isLast) {
                colStart = 3;
                colSpan = 1;
              } else {
                colStart = 'auto';
                colSpan = 1;
              }
              return (
                <GridItem colStart={colStart} colSpan={colSpan}>
                  <Box
                    w="74px"
                    h={defaultColor === item ? '32px' : '40px'}
                    p="4px"
                    onClick={setThemeColor(item)}
                    cursor="pointer"
                    key={idx}
                    transition="height ease-in-out 0.3s"
                    border={`1px solid ${lightenHex(20, item)}`}
                    bg={item}
                    placeItems="center"
                    display="grid"
                    borderRadius="50px"
                    position="relative"
                  >
                    <Image
                      opacity={defaultColor === item ? 1 : 0}
                      transition="opacity ease-in-out 0.3s 0.2s"
                      src={selectedColorIcon.src}
                      alt="selected color icon"
                    />
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Stack>
      </ModalBody>

      <ModalFooter w="full" py="0px" px="0px">
        <Box
          as={Link}
          href={{
            pathname: '/veerge_menu/application',
            query: {...router.query, baseColor: selectedColor},
          }}
          scroll={false}
          w="full"
        >
          <Button
            bg="#FFFFFF"
            variant="md-filled-radius"
            lineHeight="22.82px"
            w="full"
            fontSize="18px"
            fontWeight="400"
            color="#191919"
            _hover={{opacity: 1}}
            onClick={handleSelectedColor}
            h="55px"
            px="30px"
          >
            Proceed{' '}
          </Button>
        </Box>
      </ModalFooter>
    </Stack>
  );
};

export default ColorSelectionModal;

const ArrayOfColors = [
  '#2F2F2F',
  '#CA1611',
  '#362FD9',
  '#19518D',
  '#56C3CE',
  '#932128',
  '#FAB702',
  '#DDB057',
  '#9013FE',
  '#800080',
  '#719150',
  '#5B7D05',
  '#0C5738',
  '#CBCBCB',
  '#F77925',
  '#A37F26',
  '#A96C40',
  '#AD857E',
];
