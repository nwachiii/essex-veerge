import React from 'react';
import {CustomAccordion, Widget} from '../../../ui-lib';
import {Box, Flex, Image, Slide, Text} from '@chakra-ui/react';

import veergeAssistanceHeaderImg from '/src/images/icons/veerge-assistance-header-blue.svg';

import {WidgetTopRightCorner} from '../../../ui-lib/ui-lib.components/CustomWidget/WidgetTopRightCorner';
import WhyYouNeedLongAndLat from './WhyYouNeedLongAndLat';
import {FaRegLightbulb} from 'react-icons/fa';
import {themeStyles} from '../../../theme';

export const CreateListingAssistance = ({WIDGET_MODAL}) => {
  const handleOpenWidget = () => {
    WIDGET_MODAL.onOpen();
  };

  return (
    <div>
      {WIDGET_MODAL.isOpen ? null : (
        <Box
          position={'absolute'}
          color="#FFFFFF"
          left={'82%'}
          top={'8.3%'}
          cursor={'pointer'}
          onClick={handleOpenWidget}
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
        </Box>
      )}
      <Slide direction="top" in={WIDGET_MODAL.isOpen}>
        <WidgetTopRightCorner
          minH="fit-content"
          h="560px"
          minW="386px"
          isOpen={WIDGET_MODAL?.isOpen}
          onClose={WIDGET_MODAL?.onClose}
        >
          <WidgetTopRightCorner.Header mx={0} px={0}>
            <Image
              src={veergeAssistanceHeaderImg.src}
              alt=""
              objectFit={'cover'}
              h={'93px'}
              w="full"
            />
          </WidgetTopRightCorner.Header>
          <WidgetTopRightCorner.Body
            bg="#F5F5F5"
            h="605px"
            pb={'30px'}
            borderRadius="20px 20px 16px 16px"
          >
            <CustomAccordion
              defaultCheckedIndex={0}
              header={'Why do you need longitude & latitude?'}
            >
              <WhyYouNeedLongAndLat />
            </CustomAccordion>
          </WidgetTopRightCorner.Body>
        </WidgetTopRightCorner>
      </Slide>
    </div>
  );
};

export default CreateListingAssistance;
