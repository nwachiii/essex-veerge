import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {BusinessProfile} from './businessProfile/businessprofile';
import VeergeCompanyProfile from './VeergeCompanyProfile';
import {DocumentBox} from './companyDocuments/documentBox';
import {fetchDeveloperComplaince} from '../../../apis/settings.js';
import {AnimatedLoader} from '../../../components';
import {Stack, VStack} from '@chakra-ui/react';
import {isRoleRestricted} from 'ui-lib/ui-lib.components';
import {IsRoleRestricted} from 'ui-lib/ui-lib.components/IsRoleRestricted';

export default function Compliance() {
  const router = useRouter();

  const {data, isError, isLoading, refetch} = useQuery(
    ['developerCompliance'],
    fetchDeveloperComplaince
  );

  // localStorage.setItem(
  //   "compliance_isCompleted",
  //   JSON.stringify(data?.data?.completed)
  // );

  const user =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON?.parse(localStorage.getItem('loggedinUser')) !== undefined &&
    JSON?.parse(localStorage.getItem('loggedinUser'));

  // if (isRoleRestricted(user?.role, 'compliance')) {
  //   return <IsRoleRestricted />;
  // }

  if (isError) {
    return;
  }

  if (data) {
    const dev = data?.data.developer;
    console.log('dev_compliance', dev);
    localStorage.setItem(
      'loggedinUser',
      JSON.stringify({...user, company_image: dev?.company_image})
    );

    return (
      <Stack position="relative">
        {isLoading ? (
          <VStack position="relative" mt="10vh">
            <AnimatedLoader />
          </VStack>
        ) : (
          <>
            <BusinessProfile
              img={dev?.company_image}
              name={dev?.business_name}
              type={dev?.business_type}
              email={dev?.business_mail}
              website={dev?.website}
              cacNumber={dev?.cac_number}
              phone={dev?.phone}
              location={dev?.location}
              bio={dev?.bio}
              firstName={dev?.first_name}
              lastName={dev?.last_name}
              refetch={refetch}
            />
            {/* <BioBox bio={dev?.bio} refetch={refetch} />
						<SocialMedialLinks fb={dev?.social_links_facebook} ins={dev?.social_links_instagram} li={dev?.social_links_linkedIn} tw={dev?.social_links_twitter} refetch={refetch} /> */}
            <VeergeCompanyProfile
              bio={dev?.bio}
              refetch={refetch}
              fb={dev?.social_links_facebook}
              ins={dev?.social_links_instagram}
              li={dev?.social_links_linkedIn}
              tw={dev?.social_links_twitter}
            />
            <DocumentBox />
          </>
        )}
      </Stack>
    );
  }
}
