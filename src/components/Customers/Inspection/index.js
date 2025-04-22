import {
  Box,
  Button,
  HStack,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Carousel, {consts} from 'react-elastic-carousel';
import {themeStyles} from '../../../theme';
import rightArrow from '/src/images/icons/angledArrowRight.svg';
import threeDots from '/src/images/icons/threeDotsIcon.svg';
import arrowForCarousel from '/src/images/icons/ArrowForCarousel.svg';

import {Container2} from '../../common/containers';
import {NoInspectionRequest} from './NoInspectionRequest';
import InspectionHistoryDrawer from '@/components/Drawers/inspectionHistory';
import HoverText from 'ui-lib/ui-lib.components/hoverOnText/hoverOnText';
import CancelInspection from '@/components/Modals/cancelInspection';
import PendingInspectionCarousel from './pendingInspectionCarousel';

export const Inspection = ({id, data, closedRequests, refetch, isClosed}) => {
  const router = useRouter();
  const inspectionHistoryDisclosure = useDisclosure();

  return (
    <div>
      {!data?.length ? (
        <NoInspectionRequest
          drawerDisclosure={inspectionHistoryDisclosure}
          isClosed={isClosed}
          id={id}
          router={router}
        />
      ) : (
        data &&
        data.length && (
          <Stack spacing="24px">
            <HStack>
              <Text fontSize="18px" color="#191919" fontWeight="500">
                Inspection
              </Text>
              <Stack direction={{base: 'column', md: 'row'}} w="full" justify="flex-end">
                <Button
                  onClick={inspectionHistoryDisclosure.onOpen}
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
            </HStack>
            <PendingInspectionCarousel data={data} refetch={refetch} />
          </Stack>
        )
      )}

      <InspectionHistoryDrawer
        historyList={closedRequests}
        drawerDisclosure={inspectionHistoryDisclosure}
        refetch={refetch}
      />
    </div>
  );
};
