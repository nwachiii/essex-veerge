import React from 'react';
import {Button, Popup} from '../../../../../ui-lib/ui-lib.components';
import {Stack, VStack, Text, useDisclosure} from '@chakra-ui/react';
import {StarRating} from '../../../../../ui-lib/ui-lib.components/StarRating';

export default function CustomerReviewsPopUp() {
  const reviewModal = useDisclosure();
  return (
    <div>
      <Button
        mt={-3}
        onClick={reviewModal.onOpen}
        variant="default"
        color="green"
        border="1px solid green"
      >
        See review
      </Button>

      <Popup
        h="392px"
        pt="65px"
        pb="15px"
        minW={{base: '90%', md: '971px'}}
        color="#191919"
        isOpen={reviewModal.isOpen}
        onClose={reviewModal.onClose}
        isCentered
      >
        <Popup.Body>
          <Stack direction={{base: 'column', md: 'row'}} spacing="27px">
            <VStack w="150px">
              <Text fontSize="24px" fontWeight="600" color="white">
                date & time
              </Text>
              <Text>22/4/2022 11:00am</Text>
            </VStack>
            <VStack flex="1">
              <Text fontSize="24px" fontWeight="600">
                Feedback
              </Text>

              <Text maxW="547px">
                Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Quisque in nibh libero. <br />
                Nullam feugiat turpis vel varius laoreet. Nulla volutpat leo id elit convallis
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="24px" fontWeight="600">
                Rating
              </Text>
              <StarRating ratingNumber={1} isFeedback />
            </VStack>
          </Stack>
        </Popup.Body>
      </Popup>
    </div>
  );
}
