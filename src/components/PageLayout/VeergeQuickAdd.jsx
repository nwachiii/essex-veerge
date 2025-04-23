import {
  Box,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import veergeAddIcon from '/src/images/icons/Iconly/Light/Iconly/Bold/Plus.svg';
import createListingIcon from '/src/images/icons/create-new-listing-icon.svg';
import createCustomerIcon from '/src/images/icons/create-customer-acct-icon.svg';
import userAccountIcon from '/src/images/icons/importUserAccountIcon.svg';
import Link from 'next/link';
import {VeergeQuickAddIcon} from './navbar/svgs';
import DataMigrationModal from '../dashboard/dataMigration';
import {keyframes} from '@emotion/react';

const fadeIn = keyframes`
0% { opacity: 0;scale:0 },
  

100% { opacity: 1 }
`;

const fadeOut = keyframes`
  from { opacity: 1;  }
  to { opacity: 0;  }
`;
export const VeergeQuickAdd = ({isPending}) => {
  const dataMigrationDisclosure = useDisclosure();
  return (
    <Menu placement="bottom-start" autoSelect={false}>
      {({isOpen, onClose}) => (
        <>
          <MenuButton
            position="relative"
            transition="all 0.2s"
            _expanded={{bg: ''}}
            _focus={{boxShadow: ''}}
          >
            <VeergeQuickAddIcon color={isOpen ? 'gray' : '#FFFFFF'} />
            <Box
              position={'absolute'}
              zIndex={20000}
              bottom={{base: 'calc(-100% + 0.2rem)', xl: 'calc(-100% + 0.7rem)'}}
              mx="auto"
              right="0"
              left="0"
              width="0"
              height="0"
              borderLeft="16px solid transparent"
              borderRight="8px solid transparent"
              borderRightWidth={{base: '8px', xl: '16px'}}
              borderBottom="20px solid #FFFFFF"
              opacity={isOpen ? '1' : '0'}
              pointerEvents={'none'}
              transformOrigin="bottom"
              transitionDuration={isOpen ? '0.6s' : '0s'}
              animation={`${isOpen ? fadeIn : fadeOut} ${isOpen ? '0.6s' : '0s'}  ease`}
            />
          </MenuButton>
          <MenuList
            borderRadius={'16px'}
            mt={{base: '7px', xl: '10px'}}
            w={310}
            right={{base: '0px', xl: '10px'}}
            position={'relative'}
            py="13px"
            sx={{transition: 'opacity 0.001s  ease, transform 0.1s ease'}}
          >
            {/* <Box
              position={'absolute'}
              zIndex={-100}
              top={'-.8rem'}
              right={'10.1rem'}
              width="0"
              height="0"
              borderLeft="70px solid transparent"
              borderRight="70px solid transparent"
              borderBottom="80px solid #FFFFFF"
            /> */}
            <MenuItem
              cursor={isPending ? 'not-allowed' : 'pointer'}
              px="42px"
              _hover={{bg: '#F5F5F5'}}
              py="15px"
              // borderRadius={'xl'}
            >
              <HStack
                onClick={isPending ? null : dataMigrationDisclosure.onOpen}
                gap="20px"
                cursor={isPending ? 'not-allowed' : 'pointer'}
              >
                <Image src={userAccountIcon.src} alt="add_icon" />
                <Text
                  color="#191919"
                  fontFamily="Euclid Circular B"
                  fontSize="18px"
                  fontStyle="normal"
                  font-weight="400"
                  line-height=" 22.82px"
                  fontWeight={isPending ? 300 : 400}
                  opacity={isPending ? 0.5 : 1}
                  lineHeight="normal"
                >
                  Import User Account
                </Text>
              </HStack>
            </MenuItem>
            <MenuDivider my="0px" />

            <MenuItem
              cursor={isPending ? 'not-allowed' : 'pointer'}
              px="42px"
              _hover={{bg: '#F5F5F5'}}
              py="15px"
              // borderRadius={'xl'}
            >
              <Link href={isPending ? '#' : '/listings/create'}>
                <HStack gap="20px" cursor={isPending ? 'not-allowed' : 'pointer'}>
                  <Image src={createListingIcon.src} alt="add_icon" />
                  <Text
                    color="#191919"
                    fontFamily="Euclid Circular B"
                    fontSize="18px"
                    fontStyle="normal"
                    fontWeight={isPending ? 300 : 400}
                    opacity={isPending ? 0.5 : 1}
                    lineHeight="normal"
                  >
                    Create New Listing
                  </Text>
                </HStack>
              </Link>
            </MenuItem>
            <MenuDivider my="0px" />
            <MenuItem
              px="42px"
              py="15px"
              _hover={{bg: '#F5F5F5'}}
              // borderRadius={'xl'}
              cursor={isPending ? 'not-allowed' : 'pointer'}
            >
              <Link href={isPending ? '#' : '/residents/create_account'}>
                <HStack gap="20px" cursor={isPending ? 'not-allowed' : 'pointer'}>
                  <Image src={createCustomerIcon.src} alt="add_icon" />
                  <Text
                    color="#191919"
                    fontFamily="Euclid Circular B"
                    fontSize="18px"
                    fontStyle="normal"
                    fontWeight={isPending ? 300 : 400}
                    opacity={isPending ? 0.5 : 1}
                    lineHeight="normal"
                  >
                    Create User Account
                  </Text>
                </HStack>
              </Link>
            </MenuItem>
          </MenuList>
          <DataMigrationModal modalDisclosure={dataMigrationDisclosure} />
        </>
      )}
    </Menu>
  );
};

export default VeergeQuickAdd;
