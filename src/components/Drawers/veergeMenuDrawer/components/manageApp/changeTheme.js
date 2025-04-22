import {Box, HStack, Image, Stack, Text} from '@chakra-ui/react';
import rightArrow from '/src/images/icons/bluearrowRight.svg';

import React from 'react';
import Link from 'next/link';
import themeConstant from '../../constant/themeConstant';

export const ChangeTheme = ({themeColor, themeName, closeDrawer}) => {
  const themes = themeConstant();

  const defaultTheme = themes.find(item => item.themeName === 'modernMinimalism');
  // find the theme based on its subTheme name or theme name
  const findStoretheme = themes.find(
    item => item.themeName === themeName || item.subTheme === themeName
  );
  return (
    <Stack spacing="8px" w="full">
      <HStack justify="flex-end" w="full">
        <Link href="/veerge_menu/application" scroll={false}>
          <HStack spacing="2px" onClick={closeDrawer}>
            <Text color="#4545FE" fontSize="12px" fontWeight="500">
              Explore Templates
            </Text>
            <Image src={rightArrow.src} alt="right arrow" />
          </HStack>
        </Link>
      </HStack>
      <HStack h="73px" w="full" bg="#061520" borderRadius="4px" justify="space-between" px="16px">
        <Stack gap={`3.5px`}>
          <Text fontSize="10px" fontWeight="300" color="#DDDDDD" m={`0px`}>
            Current Template
          </Text>
          <Text fontSize="12px" fontWeight="300" color="#fff" m={`0px`}>
            {findStoretheme?.name || defaultTheme?.name}
          </Text>
        </Stack>
        <HStack spacing="8px">
          {findStoretheme &&
            findStoretheme?.themeColorArray.map((item, idx) => (
              <Box
                key={idx}
                bg={idx === 0 ? themeColor || '#2f2f2f' : item}
                boxSize="25px"
                borderRadius="8px"
                border={`1px solid ${idx === 0 ? '#4545FE' : 'transparent'}`}
              ></Box>
            ))}
        </HStack>
      </HStack>
    </Stack>
  );
};

export default ChangeTheme;
