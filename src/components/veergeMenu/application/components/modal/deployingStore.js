import React, {useEffect, useState} from 'react';
import patternImage from '/src/images/bgs/patternImage.png';
import processing from '/src/images/processing.gif';

import {Box, Image, ModalBody, Text, VStack, useToast} from '@chakra-ui/react';
import {fetchDeploymentStatus} from 'apis/settings';
import {useQuery, useQueryClient} from '@tanstack/react-query';

export const DeployingStore = ({handleScreen, refetch}) => {
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const queryClient = useQueryClient();
  const toast = useToast();

  const deploymentInfo = useQuery(['store-deployment'], fetchDeploymentStatus, {
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const status = deploymentInfo?.data?.data?.status;
    
    if (status === 'deployed' || status === 'failed') {
      setProgress(100);

      const timeoutId = setTimeout(() => {
        handleScreen('successScreen');
        if (status === 'failed') {
          toast({
            status: 'warning',
            title: `Deployment may take some time to reflect. If you have any concerns, please contact support.`,
            variant: 'subtle',
            duration: 8000,
            isClosable: false,
            position: 'top',
          });
        }
      }, 700);

      return () => {
        queryClient.removeQueries('store-deployment');
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line no-unused-vars
  }, [deploymentInfo]);

  // Array of progress texts for different stages

  useEffect(() => {
    const targetProgress = 85;

    const getRandomIncrement = () => Math.random() * 3;

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + getRandomIncrement();
        if (newProgress >= targetProgress) {
          clearInterval(interval);

          return targetProgress;
        }

        return newProgress;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressStages = [
      {value: 10, text: 'Initializing deployment...'},
      {value: 30, text: 'Building project...'},
      {value: 50, text: 'Optimizing assets...'},
      {value: 70, text: 'Deploying to server...'},
      {value: 85, text: 'Finalizing deployment...'},
      {value: 100, text: 'Deployment successful!'},
    ];
    const stage = progressStages.find(stage => progress <= stage.value);
    if (stage) {
      setProgressText(stage.text);
    }
  }, [progress]);

  return (
    <ModalBody h="507px" minH="507px" borderRadius="15px" p="0px" w="601px">
      <VStack
        bgImage={`url(${patternImage.src})`}
        backgroundSize="cover"
        backgroundPosition="center"
        justify="center"
        align="center"
        backgroundRepeat="no-repeat"
        spacing="24px"
        w="full"
        h="full"
        minH="507px"
      >
        <Image src={processing.src} boxSize="100px" alt="icon for processing deployment" />
        <Box
          w="320px"
          position="relative"
          h="8px"
          bg="#354958"
          overflow="hidden"
          borderRadius="48px"
          _before={{
            content: '""',
            position: 'absolute',
            borderRadius: '48px',
            h: 'full',
            w: `${progress}%`,
            transition: '0.8s ease-in-out',
            bg: '#fff',
          }}
        />
        <VStack justify="center" spacing="12px">
          <Text fontSize="16px" lineHeight="15.42px" fontWeight="500" color="#ffffff">
            {/* Deploying your app */}
            {progressText}
          </Text>

          <Text fontSize="12px" lineHeight="15px" fontWeight="400" color="#DDDDDD">
            Your app will be live in few minutes...
          </Text>
        </VStack>
      </VStack>
    </ModalBody>
  );
};
