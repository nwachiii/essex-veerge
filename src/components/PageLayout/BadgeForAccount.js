import {Image, Stack} from '@chakra-ui/react';

import pendingIcon from '/src/images/icons/pending_account.svg';
import acceptedIcon from '/src/images/icons/accepted_account.svg';

import React from 'react';

import underReviewBanner from '/src/images/bgs/account_under_review_banner.svg';
import completeRegistrationBanner from '/src/images/bgs/complete_reg_banner.svg';
import Link from 'next/link';
import {UserSettingsDrawer} from '../Drawers/userSettingsDrawer';

const BadgeForAccount = ({in_review, role, isExpected, initial_status}) => {
  const badgeState =
    initial_status == 'Accepted'
      ? 'accepted'
      : in_review
        ? 'review'
        : initial_status == 'Pending'
          ? 'pending'
          : null;

  const badgeIdentity = {
    pending: {
      image: pendingIcon.src,
      bg: '#FF91030D',
      color: '#FF9103',
      component: (
        <UserSettingsDrawer>
          <Link href="#">
            <Image
              h="128px"
              borderRadius={'20px'}
              w={{base: '80%', xl: 'full'}}
              src={completeRegistrationBanner.src}
              alt="complete_registration_banner"
            />
          </Link>
        </UserSettingsDrawer>
      ),
    },
    review: {
      image: pendingIcon.src,
      bg: '#FF91030D',
      color: '#FF9103',
      component: (
        <Image
          w="full"
          h="128px"
          mx="auto"
          borderRadius={'20px'}
          src={underReviewBanner.src}
          alt="account_under_review_banner"
        />
      ),
    },
    accepted: {
      image: acceptedIcon.src,
      bg: '#4545FE0D',
      color: '#4545FE',
      // component: (
      //   <Box
      //     as={Link}
      //     href="/billing"
      //     w="1284px"
      //     h="128px"
      //     borderRadius={'20px'}
      //     backgroundImage={whatNextBanner.src}
      //     backgroundPosition="center"
      //     backgroundRepeat="no-repeat"
      //     objectFit={'cover'}
      //     alt="account_under_review_banner"
      //   />
      // ),
      component: null,
    },
  };

  return role?.toLowerCase() === 'account owner' ? (
    badgeState === 'review' && isExpected === false ? null : (
      <Stack
        mb={badgeIdentity[badgeState]?.component ? '20px' : '0px'}
        px={{base: '16px', xl: '78px'}}
      >
        {badgeIdentity[badgeState]?.component}
      </Stack>
    )
  ) : null;
};

export default BadgeForAccount;
