import {Flex, Heading, Icon, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {PiWarningCircle} from 'react-icons/pi';
import {RxCross2} from 'react-icons/rx';

const Uploadalert = ({alertHeading, alertText}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);
  return isVisible ? (
    <Flex
      alignItems="start"
      justifyContent="space-between"
      w="full"
      padding="12px 16px"
      borderRadius="8px"
      border="1px solid #fca5a5"
      bg="#fef6f6"
    >
      <Flex gap="12px">
        <Icon fontSize="20px" as={PiWarningCircle} color="#cd2626" />
        <Stack spacing="4px">
          <Heading fontSize="16px" fontWeight="500" color="#991919">
            {alertHeading || 'Upload failed!'}
          </Heading>
          <Text fontSize="13px" fontWeight="400" color="#991919">
            {alertText}
          </Text>
        </Stack>
      </Flex>
      {/* <Icon as={RxCross2} color="#cd2626" /> */}
    </Flex>
  ) : null;
};

export default Uploadalert;
