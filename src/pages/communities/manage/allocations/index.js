import {useEffect, useState} from 'react';
import {Image, extendTheme, Heading, HStack, Progress, Stack, Text, Box} from '@chakra-ui/react';
import {theme} from '../../../../theme';
import {LayoutView} from '../../../../components/PageLayout/LayoutView';
import backArrow from '../../../../images/icons/back-arrow.png';
import ScrollToTop from '../../../../utils/scrollToTop';
import UploadAllocations from './upload_allocation_diagram';
import ManageAllocatedUnits from './manage_allocated_units';
import Publish from './publish';
import {useRouter} from 'next/router';

const styles = extendTheme({...theme});

export default function CreateAllocations() {
  const router = useRouter();
  const totalArchived = router?.query?.archive;
  const [uploads, setUploads] = useState([]);
  const [isPersisting, setIsPersisting] = useState(false);
  let subPages = [];
  const [step, setStep] = useState(0);
  const handleProgress = value => {
    setStep(value);
  };

  subPages = [
    <UploadAllocations
      key={0}
      handleProgress={handleProgress}
      uploads={uploads}
      setUploads={setUploads}
      subPages={subPages}
      isPersisting={isPersisting}
      setIsPersisting={setIsPersisting}
    />,

    <ManageAllocatedUnits
      key={1}
      handleProgress={handleProgress}
      setIsPersisting={setIsPersisting}
      uploads={uploads}
      subPages={subPages}
    />,
    <Publish
      key={2}
      handleProgress={handleProgress}
      uploads={uploads}
      subPages={subPages}
      setIsPersisting={setIsPersisting}
    />,
  ];

  const progressValue = (step / (subPages.length - 1)) * 67 + 33;

  useEffect(() => {
    ScrollToTop();
  }, [step]);

  const handleClick = () => {
    if (step === 0) {
      router.back(-1);
    } else if (step === 2 && parseInt(totalArchived) < 1) {
      setStep(0);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <Box minH={'100vh'} bg="#FAFAFA" pb="55px">
      <LayoutView activePage={'listings'} />
      <Box overflow="auto" mx="auto" maxW={'1285px'} mt="-84vh" className="main-app">
        <HStack mb={2} onClick={handleClick}>
          <Image
            style={{cursor: 'pointer'}}
            mr={2}
            height="50px"
            w="50px"
            src={backArrow.src}
            alt="back_arrow"
          />
          <Heading {...styles.textStyles.h3}>
            {totalArchived > 1 ? 'Back' : 'Create Allocation'}{' '}
          </Heading>
        </HStack>
        {totalArchived > 1 && (
          <Stack
            mt="3rem"
            pb="1rem"
            pt="1rem"
            mx="auto"
            px="42px"
            bg="#FFFFFF"
            spacing={1}
            justify="center"
            borderRadius="16px"
            border={'1px solid #E4E4E4'}
          >
            <HStack spacing={6} justify="space-between">
              {links.map((link, index) => {
                // Skip the second link if totalArchived < 1
                if (totalArchived < 1 && index === 1) {
                  return null;
                }
                return (
                  <Text
                    fontWeight={step === index ? '600' : '400'}
                    fontSize="18px"
                    color={step === index ? '#191919' : '#919191'}
                    lineHeight="23px"
                    key={index}
                  >
                    {link}
                  </Text>
                );
              })}
            </HStack>
            <Progress value={progressValue} {...styles.progressBar} />
          </Stack>
        )}
        {subPages[step]}
      </Box>
    </Box>
  );
}

const links = ['Upload Allocation Diagram', 'Manage Archived Units', 'Summary'];
