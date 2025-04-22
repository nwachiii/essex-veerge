import React from 'react';
import {VStack, Text, Image} from '@chakra-ui/react';
import {themeStyles} from '/src/theme';
import Link from 'next/link';
import Success from '/src/images/icons/check-icon-unscreen.gif';

export const LeftComponent = ({domainUrl}) => {
  return (
    <VStack
      bg={themeStyles.color.matador__white}
      gap={'18px'}
      justify={'center'}
      w={'100%'}
      borderRadius={'38px 0px 0px 38px'}
    >
      <Image src={Success.src} height={'88px'} width={'108px'} alt="success" />
      <Text {...themeStyles.textStyles.sb3} maxW={'350px'} textAlign={'center'}>
        Congratulations your Online store is live 💃
      </Text>
      <a href={`${domainUrl}`}>
        <Text
          cursor={'pointer'}
          {...themeStyles.textStyles.l4}
          color={themeStyles.color.matador__green}
        >
          Visit your store
        </Text>
      </a>

      {/* <Link href='/listings/new_listing'>
				<Text cursor={'pointer'} {...themeStyles.textStyles.l4} color={themeStyles.color.matador__green}>
					Click here to add properties to your store
				</Text>
			</Link> */}
    </VStack>
  );
};

export default LeftComponent;
