import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRegLightbulb } from "react-icons/fa";
import { themeStyles } from "theme";
import { useSmallerLaptopsBreakpoint } from "ui-lib/ui-lib.hooks";

export const NeedHelpForListings = () => {
  const isSmallerLaptop = useSmallerLaptopsBreakpoint()
  return (
    <Box
      position={'absolute'}
      color="#FFFFFF"
      left={isSmallerLaptop ? '87%' : {base: '85%', '2xl': '82%'}}
      top={isSmallerLaptop ? '2%' : {base: '7%', '2xl': '8.3%'}}
      cursor={'pointer'}
    >
      <a
        href="https://veerge-support.myxellia.io/listings/create_listing"
        target="_blank"
        rel="noreferrer"
      >
        <Flex
          align={'center'}
          justifyContent={'flex-end'}
          display={'flex'}
          gap="2px"
          mt="5px"
          cursor="pointer"
          fontSize={'24px'}
          color="#4545FE"
        >
          <FaRegLightbulb
            fontSize={'24px'}
            fontWeight={'600'}
            color={themeStyles.color.matador__primary}
          />
          <Text>
            <small>Need help?</small>
          </Text>
        </Flex>
      </a>
    </Box>
  );
};

export default NeedHelpForListings;