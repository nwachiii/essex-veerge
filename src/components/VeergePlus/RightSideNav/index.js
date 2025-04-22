import React, {} from 'react';
import {HStack, Image, Stack, Text} from '@chakra-ui/react';
// import file from '../../assets/icons/file.png';
import styles from './Rightsidenav.module.css';
import Link from 'next/link';
import relatedContentIcon from '/src/images/icons/related-content-icon.svg';

export const VeergePlusRightSideNav = ({currentPage, addPageInfo}) => {
  const rightNavData = [
    {
      pageTitle: 'Veerge theme',
      pageUrl: '/veerge_plus/veerge_theme',
    },

    {
      pageTitle: 'How you are protected',
      pageUrl: '/veerge_plus/how_we_protect_you',
    },
    {
      pageTitle: 'Why veerge instead of building',
      pageUrl: '/veerge_plus/why_veerge',
    },

    {
      pageTitle: 'Veerge plus',
      pageUrl: '/veerge_plus',
    },
    {
      pageTitle: 'Veerge: The new era of real estate',
      pageUrl: 'https://medium.com/@ahmed.ibraheem/the-new-era-of-real-estate-31a4186a0bbb',
      external: true,
    },
  ];

  if (addPageInfo) {
    rightNavData.push(addPageInfo);
  }

  return (
    <div className={styles.rightsidenav}>
      <Stack
        spacing="18px"
        bg="#FFFFFF"
        border={'1px solid #F3F3F3'}
        borderRadius={'8px'}
        mt="10vh"
        mr={6}
        p="16px 14px"
      >
        <Text
          color="#000"
          fontFamily="Euclid Circular B"
          fontSize="20px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
        >
          Related Content
        </Text>
        {rightNavData
          .filter(entry => entry.pageTitle !== currentPage)
          .map((item, idx) => (
            <>
              {item.external == 'true' ? (
                <a target="_blank" key={idx} href={item.pageUrl}>
                  <HStack gap="8px" w="full">
                    <Image h="18px" w="13.5px" src={relatedContentIcon.src} alt="" />
                    <Text
                      color="#4545FE"
                      fontSize="12px"
                      fontFamily="Euclid Circular B"
                      fontStyle="normal"
                      fontWeight="400"
                      lineHeight="normal"
                    >
                      {item?.pageTitle}
                    </Text>
                  </HStack>
                </a>
              ) : (
                <Link key={idx} href={item.pageUrl}>
                  <HStack gap="8px" w="full">
                    <Image h="18px" w="13.5px" src={relatedContentIcon.src} alt="" />
                    <Text
                      color="#4545FE"
                      fontSize="12px"
                      fontFamily="Euclid Circular B"
                      fontStyle="normal"
                      fontWeight="400"
                      lineHeight="normal"
                    >
                      {item?.pageTitle}
                    </Text>
                  </HStack>
                </Link>
              )}
            </>
          ))}
      </Stack>
    </div>
  );
};

export default VeergePlusRightSideNav;
