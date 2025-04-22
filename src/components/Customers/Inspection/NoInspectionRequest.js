import {Button, HStack, Image, Stack, Tag, TagLabel, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {Container2} from '../../common/containers';
import {EmptyState} from '../../common/Table';
import rightArrow from '/src/images/icons/angledArrowRight.svg';
import {HouseSVG} from 'pages/users/profile/customer_equities';
import locationIcon from '/src/images/icons/locationAsEmptyState.svg';
export const NoInspectionRequest = ({id, router, drawerDisclosure, isClosed}) => {
  return (
    <Stack>
      <HStack>
        <Text fontSize="18px" color="#191919" fontWeight="500">
          Inspection
        </Text>
        {isClosed ? (
          <Stack direction={{base: 'column', md: 'row'}} w="full" justify="flex-end">
            <Button
              onClick={drawerDisclosure.onOpen}
              h="fit-content"
              w="fit-content"
              p="0px"
              _hover={{bg: 'transparent'}}
              _active={{bg: 'transparent'}}
              _focus={{bg: 'transparent'}}
              fontSize="14px"
              color="#191919"
              fontWeight="600"
              variant="ghost"
              iconSpacing="none"
              rightIcon={<Image src={rightArrow.src} alt="doc icon" />}
            >
              View Inspection History
            </Button>
          </Stack>
        ) : null}
      </HStack>

      <Container2 h="225px">
        <EmptyState
          iconSrc={locationIcon.src}
          description="No inspection has been scheduled yet"
          py="52px"
        />
      </Container2>
    </Stack>
  );
};
