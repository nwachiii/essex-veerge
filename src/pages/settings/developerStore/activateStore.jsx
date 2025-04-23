import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  Image,
  Button as Btn,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Button } from "../../../ui-lib/ui-lib.components";
import DeveloperStoreImage from "../../../images/developerStore.png";
import { EXTERNAL_ROUTES } from "../../../constants/routes";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import CreateStore from "../../../components/settings/createStore";
import QrCodeForManageStoreAndOnsuccesStoreCreation from "../../../components/settings/qrCodeForManageStoreAndOnsuccesStoreCreation";
import { useQuery } from "@tanstack/react-query";
import { fetchcreateStoreInfo } from "../../../apis/settings";

export const ActivateStore = ({ storeDomain }) => {
  const router = useRouter();
  const manageStoreforQr = useDisclosure();
  // const storeName =
  //   typeof window !== "undefined" &&
  //   localStorage &&
  //   localStorage.getItem("storeName")
  //     ? localStorage.getItem("storeName")
  //     : undefined;

  const storeInfo = useQuery(["store-info"], fetchcreateStoreInfo);

  //   console.log(
  //     storeInfo.data?.data?.requested_call,
  //     storeInfo.isError,
  //     storeInfo.error
  //   );
  const storeName = storeInfo.data?.data?.store_name;
  console.log(
    storeName,
    !!storeName,
    typeof storeName,
    storeName !== "undefined",
    storeInfo
  );

  return (
    <>
      {/* {storeName ? (
				<HStack mb='26px' mt='12vh' position='relative' overflow='hidden' px='10.5px' justify='flex-end'>
					<Btn
						_hover={{
              opacity: '0.9',
						}}
						h='55px'
						w='199px'
            color='#4545FE'
						fontSize='18px'
            bg='transparent'
						fontWeight='400'
            borderRadius='12px'
            border='1px solid #4545FE'
            onClick={manageStoreforQr.onOpen}
						background='rgba(69, 69, 254, 0.10)'
          >
						Manage Application
					</Btn>
				</HStack>
			) : ( */}
      <HStack
        mb="36px"
        mt="12vh"
        position="relative"
        overflow="hidden"
        borderRadius="20px"
        bg="#4545FE"
        px="60.5px"
        justify="space-between"
        h="128px"
      >
        <Box
          w="92px"
          h="92px"
          top="-0.37%"
          left="0%"
          position="absolute"
          bg="#FFFFFF"
          opacity="0.1"
        ></Box>
        <Box
          w="92px"
          h="92px"
          right="8%"
          top="40%"
          position="absolute"
          opacity="0.1"
          bg="#FFFFFF"
        ></Box>
        <Box
          w="46px"
          h="92px"
          borderTopRightRadius="full"
          borderBottomRightRadius="full"
          right="15%"
          top="30%"
          position="absolute"
          opacity="0.1"
          bg="#FFFFFF"
        ></Box>
        <Box
          borderRadius="full"
          w="92px"
          h="92px"
          right="0"
          bottom="-1%"
          position="absolute"
          opacity="0.1"
          bg="#FFFFFF"
        ></Box>
        <Box
          w="92px"
          h="46px"
          borderTopRightRadius="full"
          borderTopLeftRadius="full"
          top="-7%"
          right="7%"
          transform="rotate(180deg)"
          position="absolute"
          opacity="0.1"
          bg="#FFFFFF"
        ></Box>

        <Stack spacing="10px">
          <Text
            // fontFamily="Syne"
            fontWeight="700"
            fontSize="34px"
            lineHeight="46px"
            color="#FFFFFF"
            fontFamily="DM Sans"
          >
            {storeName !== 'undefined' && storeName ? 'Manage your' : 'Create'} Application
          </Text>
          {storeName !== 'undefined' && storeName ? (
            <Text></Text>
          ) : (
            <Text w="654px" fontWeight="400" fontSize="16px" lineHeight="20px" color="#FFFFFF">
              Revolutionalise your operations by providing transformational experience to buyers,
              <br /> with just click and not a single line of code
            </Text>
          )}
        </Stack>
        {storeName !== 'undefined' && storeName ? (
          <Btn
            onClick={manageStoreforQr.onOpen}
            bg="transparent"
            borderRadius="12px"
            border="1px solid #ffffff"
            fontWeight="400"
            fontSize="18px"
            h="55px"
            w="199px"
            _hover={{
              opacity: '0.8',
            }}
            color="#ffffff"
          >
            Manage Application
          </Btn>
        ) : (
          <CreateStore
            business_id={'VM_VE_5C6BAF'}
            demo_link={storeInfo.data?.data?.demo_link}
            hasBeenSchedule={storeInfo.data?.data?.requested_call}
          />
        )}
        <QrCodeForManageStoreAndOnsuccesStoreCreation
          manageStore={manageStoreforQr}
          manageClose={manageStoreforQr.onClose}
        />
      </HStack>
      {/* )} */}
    </>
  );
};
export default ActivateStore;
