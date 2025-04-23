import {WarningIcon} from '@chakra-ui/icons';
import {Box, Container, Flex, Heading, HStack, Stack, Text} from '@chakra-ui/react';
import React from 'react';
import {motion} from 'framer-motion';

import {themeStyles} from '../../../../theme';
import {Button} from '../../../../ui-lib/ui-lib.components';
import Link from 'next/link';
import {ComingSoonModal} from '../../../../components/ComingSoonModal';

export const DiscountOverview = () => {
  return (
    <motion.div
      exit={{opacity: 0, x: '10vw'}}
      initial={{opacity: 0, x: '-10vw'}}
      animate={{opacity: [0, 0.2, 0.5, 1], x: 0}}
      transition={{
        type: 'spring',
        stiffness: '20',
        delay: 0.1,
      }}
    >
      <Container
        {...themeStyles.containerStyles}
        maxW="1284px"
        padding="19px 26px"
        minH="107px"
        bg="#191919"
        my="40px"
      >
        <Flex w="full" justify="space-between">
          <Box>
            <Heading {...themeStyles.textStyles.h3} color="#FFFFFF" fontSize="28px">
              Discounts and Deadline
            </Heading>
            <HStack color="#12D8A0" fontSize="14px">
              <WarningIcon h="24px" w="24px" />
              <Text>Learn more</Text>
            </HStack>
          </Box>

          <Text maxW="276px">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos orbi non justo vulputate.
          </Text>

          <HStack spacing="21px">
            <Link prefetch={false} href="listings/manage/discounts">
              <Button
                mt={0}
                w="132px"
                color="#12D8A0"
                bg="transparent"
                variant="default"
                borderRadius="12px"
                border="1px solid #12D8A0"
              >
                Manage
              </Button>
            </Link>
            {/* <Button
							variant='default'
							bg='transparent'
							w='166px'
							borderRadius='12px'
							border='1px solid #4545FE'
							color='#4545FE'>
							Create Discount
						</Button> */}
            <ComingSoonModal
              btnText={'Create Discount'}
              modalHeader="Create Discount"
              variant="default"
              bg="transparent"
              w="166px"
              border="1px solid #4545FE"
              color="#4545FE"
            />
          </HStack>
        </Flex>
      </Container>
    </motion.div>
  );
};

export default DiscountOverview;
