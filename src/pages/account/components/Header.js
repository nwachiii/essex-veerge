import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'ui-lib/ui-lib.components';
import backArrow from '/src/images/icons/back-arrow.png';
import sortByIcon from '/src/images/icons/sort-by-icon.svg';

import Filter from './filter';
import {Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text} from '@chakra-ui/react';
import sortIdentityIcon from '/src/images/icons/sortByIdentifier.png';
import downloadIcon from '/src/images/icons/download-icon.svg';
import {Flex, HStack, Image} from '@chakra-ui/react';
import {CSVLink} from 'react-csv';

const Header = ({name, data}) => {
  const router = useRouter();
  const [addedParam, setAddedParam] = useState({
    sort: '',
    filter: '',
    param: '',
  });
  const forFilter = {
    max_price: 100,
    min_price: 10,
  };

  return (
    <Flex w="full" justify="space-between" mt="30px" mb={4}>
      <Flex
        w="full"
        alignItems="center"
        justifyContent="start"
        direction="row"
        onClick={router.back}
      >
        <Image
          style={{cursor: 'pointer'}}
          mr={2}
          height="50px"
          src={backArrow.src}
          alt="back_arrow"
        />
        <Text color="#191919" fontWeight="800" fontSize="19px" lineHeight="26px">
          {name}
        </Text>
      </Flex>
      <Flex justify="flex-end" w="full" align="center">
        <Flex justify="flex-end" w="full" align="center">
          <HStack spacing={6} align="flex-end" h="48px">
            <Menu autoSelect={false}>
              <MenuButton
                alignSelf="flex-end"
                bg="transparent"
                fontWeight="400"
                fontSize="14px"
                lineHeight="18px"
                color="#191919"
                width="144px"
                height="48px"
                border="1px solid #E4E4E4"
                borderRadius="12px"
              >
                <HStack justify="center" spacing="9px">
                  <Image
                    w="18px"
                    h="18px"
                    src={sortByIcon.src}
                    alt="sort by icon"
                    fontSize="10px"
                  />
                  <Text>Sort By</Text>
                </HStack>
              </MenuButton>
              <MenuList
                position="relative"
                zIndex="2"
                pr="18px"
                boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
                borderRadius="16px"
                bg="#ffffff"
              >
                <MenuItem as="button" onClick={() => {}} name="none" fontSize="14px">
                  <Image
                    _hover={{background: '#EDF2F7'}}
                    h="11px"
                    src={sortIdentityIcon.src}
                    alt=" identifier for sort"
                    mr="10px"
                  />
                  None
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  // key={idx}
                  // onClick={handleSort}
                  // name={item.replace(/[-\s]/g, "_")}
                  fontSize="14px"
                  mb="10px"
                >
                  <Image
                    _hover={{background: '#EDF2F7'}}
                    mr="10px"
                    h="11px"
                    src={sortIdentityIcon.src}
                    alt=" identifier for sort"
                  />{' '}
                  Name
                </MenuItem>
              </MenuList>
            </Menu>

            <Filter forFilter={forFilter} url={addedParam} setUrl={setAddedParam} />

            <CSVLink data={data}>
              <Button
                variant="primary"
                display="flex"
                gap="3px"
                w="177px"
                height="46px"
                border="1px solid #4545FE"
                borderRadius="12px"
                fontWeight="500"
                fontSize="12px"
                lineHeight="15px"
                textAlign="center"
                color="#4545FE"
                bg="transparent"
              >
                <Image w="18px" h="18px" src={downloadIcon.src} alt="" />
                Download Csv
              </Button>
            </CSVLink>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
