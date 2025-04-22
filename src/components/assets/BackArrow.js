import backArrow from '../../images/icons/back-arrow.png';
import {Heading, HStack, Image} from '@chakra-ui/react';
import {themeStyles} from '../../theme';
import {useRouter} from 'next/router';

export const BackArrowWithText = ({handleClick, text, ...rest}) => {
  const router = useRouter();
  return (
    <HStack
      maxW={'300px'}
      minW="fit-content"
      onClick={() => (handleClick ? handleClick() : router.back(-1))}
      {...rest}
    >
      <Image
        mr={2}
        w="50px"
        height="50px"
        zIndex={1000}
        alt="back_arrow"
        src={backArrow.src}
        style={{cursor: 'pointer'}}
      />
      <Heading
        minW={'fit-content'}
        maxW={'300px'}
        w="full"
        zIndex="9"
        {...themeStyles.textStyles.h3}
      >
        {text}
      </Heading>
    </HStack>
  );
};
