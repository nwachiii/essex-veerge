import {
  Button,
  CheckboxGroup,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import filter_icon from '/src/images/icons/filter_icon.svg';
import cancelIcon from '/src/images/icons/closeIconForFilter.svg';
import {CheckboxForStar} from './CheckboxForStar';
import {CheckBoxForFeedBackTypes} from './CheckBoxForFeedBackTypes';
import {useRouter} from 'next/router';

export const FilterForFeedBack = ({}) => {
  const filtered = useDisclosure();
  const router = useRouter();

  const defaultValueArray = queryKey => {
    const filterArray = router.query?.filter ? router.query?.filter.split('&') : [];
    const defaultArray = filterArray.flatMap((keyValue, idx) => {
      const key = keyValue.split('=')[0];
      const value = keyValue.split('=')[1];
      if (key === queryKey) {
        return value;
      } else {
        return [];
      }
    });

    return defaultArray;
  };

  const [radioStar, setStar] = useState([]);
  const [feedbackType, setFeedBackType] = useState([]);

  useEffect(() => {
    setFeedBackType(defaultValueArray('filter[]'));
    setStar(defaultValueArray('rating[]'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleApply = () => {
    const defaultQuery = {
      filter: `${radioStar?.length ? radioStar.map(item => `rating[]=${item}`).join('&') : ''}${
        radioStar?.length && feedbackType?.length ? '&' : ''
      }${feedbackType?.length ? feedbackType.map(item => `filter[]=${item}`).join('&') : ''}`,
    };

    const mergedQuery = {
      ...router.query,
      ...defaultQuery,
      page: 1,
    };

    const {filter, rating, ...rest} = mergedQuery;

    router.push({
      pathname: router.pathname,
      query: !radioStar?.length && !feedbackType?.length ? rest : mergedQuery,
    });

    return handleClose();
  };

  const handleClose = () => {
    // setFeedBackType(null);
    // setStar(null);
    return filtered.onClose();
  };

  const isValid = radioStar || feedbackType;

  return (
    <Menu
      placement="auto-start"
      autoSelect={false}
      isOpen={filtered.isOpen}
      onClose={handleClose}
      closeOnSelect={false}
    >
      <Tooltip
        placeContent="center"
        px="5.2px"
        h="29.6px"
        bg="black"
        borderRadius="3.62px"
        label="Filter"
      >
        <MenuButton
          as={Button}
          alignSelf="flex-end"
          bg="#fff"
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="#191919"
          p="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="36px"
          w="36px"
          minW="36px"
          border="0.5px solid #E4E4E4"
          borderRadius="8.12px"
          _hover={{
            bg: 'rgba(0,0,0,0.1)',
            borderColor: '#919191',
            img: {opacity: '0.5'},
          }}
          onClick={filtered.onOpen}
        >
          <HStack justify="center" spacing="9px">
            <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />{' '}
          </HStack>
        </MenuButton>
      </Tooltip>
      <MenuList
        // w="267px"

        w="388px"
        position="relative"
        zIndex="2"
        minH="591px"
        px="26px"
        py="20px"
        boxShadow="3px 20px 30px rgba(0, 0, 0, 0.1),-10px -10px 60px #ffffff"
        borderRadius="16px"
        bg="#ffffff"
      >
        <MenuItem cursor="default" p="0px" bg="transparent">
          <HStack mb="21px" justify="space-between" w="full">
            <Heading fontSize="16px" fontWeight="500" color="#000">
              Filter by rating
            </Heading>
            <Image
              src={cancelIcon.src}
              cursor="pointer"
              onClick={handleClose}
              alt="cancel button"
            />
          </HStack>
        </MenuItem>
        <MenuItem cursor="default" p="0px" bg="transparent">
          <CheckboxGroup w="full" onChange={setStar} value={radioStar}>
            <Stack spacing="27px">
              <CheckboxForStar radioStar={radioStar} setStar={setStar} />
            </Stack>
          </CheckboxGroup>
        </MenuItem>

        <MenuItem cursor="default" p="0px" bg="transparent">
          <Heading fontSize="16px" mt="25px" mb="21px" fontWeight="500" color="#000">
            Feedback type
          </Heading>
        </MenuItem>
        <MenuItem cursor="default" p="0px" bg="transparent">
          <CheckBoxForFeedBackTypes feedbackType={feedbackType} setFeedBackType={setFeedBackType} />
        </MenuItem>
        <MenuItem cursor="default" p="0px" bg="transparent">
          <Button
            mt="38px"
            cursor="pointer"
            h="55px"
            mx="auto"
            _hover={{
              opacity: 1,
            }}
            w="296px"
            borderRadius="12px"
            // isDisabled={!isValid}
            onClick={handleApply}
            color="#fff"
            bg="#4545FE"
            fontSize="18px"
            fontWeight="400"
          >
            Apply
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
