import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  HStack,
  Heading,
  Image,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import AssignInspectionForm from '../components/assignInspectionForm';

const AssignInspection = ({
  handleScreen,
  navigateMainDrawer,
  isValid,
  setTimeZone,
  formik,
  roles,
  customScrollbarStyles,
}) => {
  return (
    <>
      <HStack
        py="30px"
        h="49.699px"
        bg="#F5F5F5"
        px="25px"
        justify="space-between"
        align="center"
        position="relative"
      >
        {' '}
        <HStack>
          <Image
            src={backIcon.src}
            cursor="pointer"
            onClick={() => navigateMainDrawer()}
            alt="back icon"
          />
          <Heading fontSize="18.9px" fontWeight="700">
            Schedule Inspection
          </Heading>
        </HStack>
        <HStack spacing="15px">
          <VStack
            position="relative"
            justify="center"
            align="center"
            w="30px"
            h="30px"
            borderRadius="5px"
            transition="0.3s ease-in-out"
            _hover={{
              width: '30px',
              height: '30px',
            }}
          >
            <DrawerCloseButton right="0px" left="0px" my="auto" color="#000" top="0" bottom="0" />
          </VStack>
        </HStack>
      </HStack>
      <DrawerBody
        sx={customScrollbarStyles()}
        maxW="400px"
        minW="400px"
        mr="4px"
        p="0px"
        overflowX="hidden"
        pt="24px"
        pr="2px"
      >
        <AssignInspectionForm
          formik={formik}
          setTimeZone={setTimeZone}
          customScrollbarStyles={customScrollbarStyles}
          roles={roles}
        />
      </DrawerBody>
      <DrawerFooter p="24px">
        <Button
          w="full"
          h="45px"
          bg="#191919"
          borderRadius="full"
          onClick={handleScreen('summary')}
          isDisabled={!isValid()}
          color="#fff"
          _focus={{
            opacity: 1,
          }}
          _hover={{
            opacity: 1,
          }}
          _active={{opacity: 1}}
          _focusVisible={{
            opacity: 1,
          }}
          fontSize="16px"
          fontWeight={400}
        >
          Proceed
        </Button>
      </DrawerFooter>
    </>
  );
};

export default AssignInspection;
