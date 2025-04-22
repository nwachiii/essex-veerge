import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  HStack,
  Heading,
  Image,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import backIcon from '/src/images/icons/backArrowForDrawer.svg';
import AssigneesDetails from '../components/assigneeDetails';
import InspectionInfo from '../components/inspectionInfo';

const InspectionSummary = ({
  handleScreen,
  convertToISOString,
  isValid,
  timeZone,
  formik,
  mutation,
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
            onClick={handleScreen('setInspection')}
            alt="back icon"
          />
          <Heading fontSize="18.9px" fontWeight="700">
            Summary
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
        pt="10px"
        sx={customScrollbarStyles()}
        maxW="400px"
        minW="400px"
        mr="4px"
        pr="2px"
        p="24px"
      >
        <Stack
          p="12px 8px"
          borderRadius="8px"
          border="1px solid #E4E4E4"
          divider={<StackDivider my="10px" />}
        >
          <InspectionInfo
            timeZone={timeZone}
            convertToISOString={convertToISOString}
            formik={formik}
          />
          <AssigneesDetails formik={formik} />
        </Stack>
      </DrawerBody>
      <DrawerFooter p="0px" mt="10px" pl="28px" pr="22px" mb="10.3vh">
        <Button
          w="full"
          h="45px"
          bg="#191919"
          borderRadius="72px"
          isDisabled={!isValid()}
          isLoading={mutation.isLoading}
          color="#fff"
          onClick={formik.handleSubmit}
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
        >
          Proceed
        </Button>
      </DrawerFooter>
    </>
  );
};

export default InspectionSummary;
